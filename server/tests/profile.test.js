import assert from 'node:assert/strict'
import test from 'node:test'
import 'dotenv/config'

const testDatabaseUrl = process.env.TEST_DATABASE_URL
const developmentDatabaseUrl = process.env.DATABASE_URL

function assertSafeTestDatabase(value) {
  if (!value) {
    throw new Error('TEST_DATABASE_URL is required to run integration tests')
  }

  if (value === developmentDatabaseUrl) {
    throw new Error('TEST_DATABASE_URL must be different from DATABASE_URL')
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Integration tests must not run in production')
  }

  let parsed

  try {
    parsed = new URL(value)
  } catch {
    throw new Error('TEST_DATABASE_URL must be a valid PostgreSQL URL')
  }

  const databaseName = decodeURIComponent(parsed.pathname.replace(/^\//, ''))
  const schema = parsed.searchParams.get('schema')

  if (databaseName !== 'taskflow_test') {
    throw new Error('TEST_DATABASE_URL must target the taskflow_test database')
  }

  if (schema && schema !== 'public') {
    throw new Error('TEST_DATABASE_URL must use the public schema')
  }
}

assertSafeTestDatabase(testDatabaseUrl)

process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = testDatabaseUrl

const { default: app } = await import('../src/app.js')
const { getPrisma } = await import('../src/db/prisma.js')

const prisma = getPrisma()

async function callApi(baseUrl, method, path, options = {}) {
  const headers = {}

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  const text = await response.text()
  let body = null

  if (text) {
    body = JSON.parse(text)
  }

  return { status: response.status, body }
}

function assertStatus(response, expected, label) {
  assert.equal(
    response.status,
    expected,
    `${label}: expected ${expected}, received ${response.status} ${JSON.stringify(response.body)}`,
  )
}

function assertSafeUser(user, label) {
  assert.equal(typeof user?.id, 'number', label)
  assert.equal(typeof user?.name, 'string', label)
  assert.equal(typeof user?.email, 'string', label)
  assert.equal(Object.hasOwn(user, 'passwordHash'), false, label)
}

function assertFieldError(response, field, label) {
  assertStatus(response, 400, label)
  assert.equal(response.body?.error?.code, 'VALIDATION_ERROR', label)
  assert.ok(
    response.body?.error?.details?.some((detail) => detail.field === field),
    label,
  )
}

async function closeServer(server) {
  if (!server) {
    return
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
    server.closeAllConnections?.()
  })
}

test('profile and password updates require the current password where needed', async (t) => {
  const userIds = new Set()
  let server
  let testError

  try {
    const target = await prisma.$queryRaw`
      SELECT current_database() AS database_name, current_schema() AS schema_name
    `

    assert.equal(target[0]?.database_name, 'taskflow_test')
    assert.equal(target[0]?.schema_name, 'public')

    server = app.listen(0)
    await new Promise((resolve) => server.once('listening', resolve))

    const address = server.address()
    assert.ok(address && typeof address === 'object')

    const baseUrl = `http://127.0.0.1:${address.port}`
    const suffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
    const originalPassword = 'ProfilePass123!'
    const newPassword = 'ProfilePass456!'
    const emailA = `taskflow-profile-${suffix}-a@example.test`
    const emailB = `taskflow-profile-${suffix}-b@example.test`
    const changedEmailA = `taskflow-profile-${suffix}-a-updated@example.test`

    await t.test('creates two isolated users', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/register', {
        body: { name: 'Profile Owner A', email: emailA, password: originalPassword },
      })
      assertStatus(userA, 201, 'register user A')
      assertSafeUser(userA.body.data.user, 'safe registered user A')
      userIds.add(userA.body.data.user.id)

      const userB = await callApi(baseUrl, 'POST', '/api/auth/register', {
        body: { name: 'Profile Owner B', email: emailB, password: originalPassword },
      })
      assertStatus(userB, 201, 'register user B')
      assertSafeUser(userB.body.data.user, 'safe registered user B')
      userIds.add(userB.body.data.user.id)
    })

    const loginA = await callApi(baseUrl, 'POST', '/api/auth/login', {
      body: { email: emailA, password: originalPassword },
    })
    assertStatus(loginA, 200, 'log in user A')
    const tokenA = loginA.body.data.token

    await t.test('requires authentication for profile and password changes', async () => {
      const profile = await callApi(baseUrl, 'PATCH', '/api/me', {
        body: { name: 'No Token' },
      })
      assertStatus(profile, 401, 'update profile without a token')

      const password = await callApi(baseUrl, 'PATCH', '/api/me/password', {
        body: { currentPassword: originalPassword, newPassword },
      })
      assertStatus(password, 401, 'change password without a token')
    })

    await t.test('updates the name without a current password', async () => {
      const updated = await callApi(baseUrl, 'PATCH', '/api/me', {
        token: tokenA,
        body: { name: 'Profile Owner A Updated' },
      })
      assertStatus(updated, 200, 'update name')
      assertSafeUser(updated.body.data, 'safe profile update')
      assert.equal(updated.body.data.name, 'Profile Owner A Updated')
      assert.equal(updated.body.data.email, emailA)

      const current = await callApi(baseUrl, 'GET', '/api/me', { token: tokenA })
      assertStatus(current, 200, 'read updated profile')
      assert.equal(current.body.data.name, 'Profile Owner A Updated')
    })

    await t.test('requires the current password to change the email', async () => {
      const missing = await callApi(baseUrl, 'PATCH', '/api/me', {
        token: tokenA,
        body: { email: changedEmailA },
      })
      assertFieldError(missing, 'currentPassword', 'change email without password')

      const wrong = await callApi(baseUrl, 'PATCH', '/api/me', {
        token: tokenA,
        body: { email: changedEmailA, currentPassword: 'WrongPass123!' },
      })
      assertFieldError(wrong, 'currentPassword', 'change email with wrong password')

      const current = await callApi(baseUrl, 'GET', '/api/me', { token: tokenA })
      assertStatus(current, 200, 'read email after failed changes')
      assert.equal(current.body.data.email, emailA)
    })

    await t.test('rejects a duplicate email without changing the profile', async () => {
      const duplicate = await callApi(baseUrl, 'PATCH', '/api/me', {
        token: tokenA,
        body: { email: emailB, currentPassword: originalPassword },
      })
      assertStatus(duplicate, 409, 'change email to a duplicate')
      assert.equal(duplicate.body?.error?.code, 'EMAIL_IN_USE')
      assert.equal(Object.hasOwn(duplicate.body ?? {}, 'data'), false)

      const current = await callApi(baseUrl, 'GET', '/api/me', { token: tokenA })
      assertStatus(current, 200, 'read email after duplicate attempt')
      assert.equal(current.body.data.email, emailA)
    })

    await t.test('changes the email with the current password', async () => {
      const updated = await callApi(baseUrl, 'PATCH', '/api/me', {
        token: tokenA,
        body: {
          name: 'Profile Owner A Updated',
          email: `  ${changedEmailA.toUpperCase()}  `,
          currentPassword: originalPassword,
        },
      })
      assertStatus(updated, 200, 'change email')
      assertSafeUser(updated.body.data, 'safe email update')
      assert.equal(updated.body.data.email, changedEmailA)

      const oldLogin = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: { email: emailA, password: originalPassword },
      })
      assertStatus(oldLogin, 401, 'log in with the old email')
      assert.equal(oldLogin.body?.error?.code, 'INVALID_CREDENTIALS')

      const newLogin = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: { email: changedEmailA, password: originalPassword },
      })
      assertStatus(newLogin, 200, 'log in with the new email')

      const stillValid = await callApi(baseUrl, 'GET', '/api/me', { token: tokenA })
      assertStatus(stillValid, 200, 'existing token remains valid after email change')
      assert.equal(stillValid.body.data.email, changedEmailA)
    })

    await t.test('validates and changes the password with the current password', async () => {
      const missing = await callApi(baseUrl, 'PATCH', '/api/me/password', {
        token: tokenA,
        body: { newPassword },
      })
      assertFieldError(missing, 'currentPassword', 'change password without current password')

      const wrong = await callApi(baseUrl, 'PATCH', '/api/me/password', {
        token: tokenA,
        body: { currentPassword: 'WrongPass123!', newPassword },
      })
      assertFieldError(wrong, 'currentPassword', 'change password with wrong current password')

      const weak = await callApi(baseUrl, 'PATCH', '/api/me/password', {
        token: tokenA,
        body: { currentPassword: originalPassword, newPassword: 'short' },
      })
      assertFieldError(weak, 'newPassword', 'change password with a weak new password')

      const updated = await callApi(baseUrl, 'PATCH', '/api/me/password', {
        token: tokenA,
        body: { currentPassword: originalPassword, newPassword },
      })
      assertStatus(updated, 200, 'change password')
      assertSafeUser(updated.body.data, 'safe password update')

      const oldLogin = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: { email: changedEmailA, password: originalPassword },
      })
      assertStatus(oldLogin, 401, 'log in with the old password')
      assert.equal(oldLogin.body?.error?.code, 'INVALID_CREDENTIALS')

      const newLogin = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: { email: changedEmailA, password: newPassword },
      })
      assertStatus(newLogin, 200, 'log in with the new password')

      const existingToken = await callApi(baseUrl, 'GET', '/api/me', {
        token: tokenA,
      })
      assertStatus(existingToken, 200, 'existing token remains valid after password change')
    })
  } catch (error) {
    testError = error
  }

  let cleanupError

  try {
    const ids = [...userIds]

    if (ids.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: ids } } })
    }

    const remaining =
      ids.length === 0 ? 0 : await prisma.user.count({ where: { id: { in: ids } } })

    assert.equal(remaining, 0)
  } catch (error) {
    cleanupError = error
    console.error(error.message)
  }

  try {
    await closeServer(server)
  } catch (error) {
    if (!cleanupError) {
      cleanupError = error
    }
    console.error(`Server shutdown failed: ${error.message}`)
  }

  try {
    await prisma.$disconnect()
  } catch (error) {
    if (!cleanupError) {
      cleanupError = error
    }
    console.error(`Prisma disconnect failed: ${error.message}`)
  }

  if (cleanupError) {
    throw new AggregateError(
      testError ? [cleanupError, testError] : [cleanupError],
      'Test cleanup or shutdown failed',
    )
  }

  if (testError) {
    throw testError
  }
})
