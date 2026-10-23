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

function createIds() {
  return {
    users: new Set(),
    workspaces: new Set(),
    projects: new Set(),
    tasks: new Set(),
  }
}

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

function track(ids, resource, response) {
  const id = response.body?.data?.id

  if (Number.isInteger(id)) {
    ids[resource].add(id)
  }

  return id
}

function assertStatus(response, expected, label) {
  assert.equal(
    response.status,
    expected,
    `${label}: expected ${expected}, received ${response.status} ${JSON.stringify(response.body)}`,
  )
}

function assertValidationError(response, label) {
  assertStatus(response, 400, label)
  assert.equal(response.body?.error?.code, 'VALIDATION_ERROR', label)
}

async function cleanupTrackedRows(ids) {
  const taskIds = [...ids.tasks]
  const projectIds = [...ids.projects]
  const workspaceIds = [...ids.workspaces]
  const userIds = [...ids.users]

  if (taskIds.length > 0) {
    await prisma.task.deleteMany({ where: { id: { in: taskIds } } })
  }

  if (projectIds.length > 0) {
    await prisma.project.deleteMany({ where: { id: { in: projectIds } } })
  }

  if (workspaceIds.length > 0) {
    await prisma.workspace.deleteMany({ where: { id: { in: workspaceIds } } })
  }

  if (userIds.length > 0) {
    await prisma.user.deleteMany({ where: { id: { in: userIds } } })
  }

  const remaining = {}

  if (taskIds.length > 0) {
    const count = await prisma.task.count({ where: { id: { in: taskIds } } })

    if (count > 0) {
      remaining.tasks = { ids: taskIds, count }
    }
  }

  if (projectIds.length > 0) {
    const count = await prisma.project.count({ where: { id: { in: projectIds } } })

    if (count > 0) {
      remaining.projects = { ids: projectIds, count }
    }
  }

  if (workspaceIds.length > 0) {
    const count = await prisma.workspace.count({
      where: { id: { in: workspaceIds } },
    })

    if (count > 0) {
      remaining.workspaces = { ids: workspaceIds, count }
    }
  }

  if (userIds.length > 0) {
    const count = await prisma.user.count({ where: { id: { in: userIds } } })

    if (count > 0) {
      remaining.users = { ids: userIds, count }
    }
  }

  if (Object.keys(remaining).length > 0) {
    throw new Error(`Cleanup failed: ${JSON.stringify(remaining)}`)
  }
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

test('calendar range endpoint is owner-scoped and validated', async (t) => {
  const ids = createIds()
  let server
  let testError
  let cleanupError

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
    const password = 'TestPass123!'

    await t.test('registers two isolated users', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/register', {
        body: {
          name: 'Calendar Owner A',
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 201, 'register calendar owner A')
      assert.ok(Number.isInteger(userA.body?.data?.user?.id))
      ids.users.add(userA.body.data.user.id)

      const userB = await callApi(baseUrl, 'POST', '/api/auth/register', {
        body: {
          name: 'Calendar Owner B',
          email: `taskflow-calendar-${suffix}-b@example.test`,
          password,
        },
      })
      assertStatus(userB, 201, 'register calendar owner B')
      assert.ok(Number.isInteger(userB.body?.data?.user?.id))
      ids.users.add(userB.body.data.user.id)

      assert.notEqual(userA.body.data.user.id, userB.body.data.user.id)
    })

    await t.test('requires authentication', async () => {
      const unauthorized = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-01-15',
      )
      assertStatus(unauthorized, 401, 'calendar list without a token')
    })

    await t.test('logs owners in', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in calendar owner A')

      const userB = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-b@example.test`,
          password,
        },
      })
      assertStatus(userB, 200, 'log in calendar owner B')
      assert.ok(userA.body.data.token)
      assert.ok(userB.body.data.token)
    })

    await t.test('creates calendar fixtures', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for fixture creation')

      const userB = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-b@example.test`,
          password,
        },
      })
      assertStatus(userB, 200, 'log in owner B for fixture creation')

      const tokenA = userA.body.data.token
      const tokenB = userB.body.data.token

      const workspaceA = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: tokenA,
        body: { name: 'Calendar Workspace A' },
      })
      track(ids, 'workspaces', workspaceA)
      assertStatus(workspaceA, 201, 'create workspace A')

      const workspaceB = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: tokenB,
        body: { name: 'Calendar Workspace B' },
      })
      track(ids, 'workspaces', workspaceB)
      assertStatus(workspaceB, 201, 'create workspace B')

      const projectA = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceA.body.data.id}/projects`,
        {
          token: tokenA,
          body: {
            name: 'Calendar Project A',
            description: 'Calendar project one',
          },
        },
      )
      track(ids, 'projects', projectA)
      assertStatus(projectA, 201, 'create project A')

      const projectB = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceB.body.data.id}/projects`,
        { token: tokenB, body: { name: 'Calendar Project B' } },
      )
      track(ids, 'projects', projectB)
      assertStatus(projectB, 201, 'create project B')

      const taskOne = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.body.data.id}/tasks`,
        {
          token: tokenA,
          body: {
            title: 'Calendar Task One',
            description: 'Calendar task one',
            status: 'TODO',
            priority: 'HIGH',
            dueDate: '2027-01-05',
          },
        },
      )
      track(ids, 'tasks', taskOne)
      assertStatus(taskOne, 201, 'create task one')

      const taskTwo = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.body.data.id}/tasks`,
        {
          token: tokenA,
          body: {
            title: 'Calendar Task Two',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            dueDate: '2027-01-10',
          },
        },
      )
      track(ids, 'tasks', taskTwo)
      assertStatus(taskTwo, 201, 'create task two')

      const taskThree = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.body.data.id}/tasks`,
        {
          token: tokenA,
          body: {
            title: 'Calendar Task Three',
            status: 'DONE',
            priority: 'LOW',
            dueDate: '2027-01-20',
          },
        },
      )
      track(ids, 'tasks', taskThree)
      assertStatus(taskThree, 201, 'create task three')

      const undatedOne = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.body.data.id}/tasks`,
        { token: tokenA, body: { title: 'Undated Task A One' } },
      )
      track(ids, 'tasks', undatedOne)
      assertStatus(undatedOne, 201, 'create undated task one')

      const undatedTwo = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.body.data.id}/tasks`,
        { token: tokenA, body: { title: 'Undated Task A Two' } },
      )
      track(ids, 'tasks', undatedTwo)
      assertStatus(undatedTwo, 201, 'create undated task two')

      const taskB = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectB.body.data.id}/tasks`,
        { token: tokenB, body: { title: 'Calendar Task B' } },
      )
      track(ids, 'tasks', taskB)
      assertStatus(taskB, 201, 'create task B')
    })

    await t.test('validates date ranges', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for validation')

      const missingFrom = await callApi(baseUrl, 'GET', '/api/tasks?to=2027-01-15', {
        token: userA.body.data.token,
      })
      assertValidationError(missingFrom, 'missing from date')
      assert.ok(missingFrom.body.error.details.some((detail) => detail.field === 'from'))

      const missingTo = await callApi(baseUrl, 'GET', '/api/tasks?from=2027-01-01', {
        token: userA.body.data.token,
      })
      assertValidationError(missingTo, 'missing to date')
      assert.ok(missingTo.body.error.details.some((detail) => detail.field === 'to'))

      const invalidDate = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-02-30&to=2027-01-15',
        { token: userA.body.data.token },
      )
      assertValidationError(invalidDate, 'invalid from date')
      assert.ok(invalidDate.body.error.details.some((detail) => detail.field === 'from'))

      const reverseOrder = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-15&to=2027-01-01',
        { token: userA.body.data.token },
      )
      assertValidationError(reverseOrder, 'from after to')
      assert.ok(
        reverseOrder.body.error.details.some((detail) => detail.field === 'range'),
      )

      const tooLongRange = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-02-12',
        { token: userA.body.data.token },
      )
      assertValidationError(tooLongRange, 'range over 42 days')
      assert.ok(
        tooLongRange.body.error.details.some((detail) => detail.field === 'range'),
      )
    })

    await t.test('returns owner-scoped tasks only', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for list')

      const response = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-01-15',
        { token: userA.body.data.token },
      )
      assertStatus(response, 200, 'calendar list as owner A')
      assert.deepEqual(response.body.meta, { undatedCount: 2 })

      const tasks = response.body.data
      assert.equal(tasks.length, 2)
      assert.equal(tasks[0].title, 'Calendar Task One')
      assert.equal(tasks[0].dueDate, '2027-01-05')
      assert.equal(tasks[0].status, 'TODO')
      assert.equal(tasks[0].priority, 'HIGH')
      assert.equal(tasks[0].description, 'Calendar task one')
      assert.equal(tasks[0].assigneeId, null)
      assert.equal(tasks[0].assignee, null)

      assert.equal(tasks[1].title, 'Calendar Task Two')
      assert.equal(tasks[1].dueDate, '2027-01-10')
      assert.equal(tasks[1].status, 'IN_PROGRESS')
      assert.equal(tasks[1].priority, 'MEDIUM')
      assert.equal(tasks[1].description, null)
      assert.equal(
        tasks.every((task) => task.dueDate >= '2027-01-01' && task.dueDate <= '2027-01-15'),
        true,
      )
    })

    await t.test('keeps foreign owner tasks invisible', async () => {
      const userB = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-b@example.test`,
          password,
        },
      })
      assertStatus(userB, 200, 'log in owner B for list')

      const response = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-01-15',
        { token: userB.body.data.token },
      )
      assertStatus(response, 200, 'calendar list as owner B')
      assert.deepEqual(response.body.meta, { undatedCount: 1 })
      assert.deepEqual(response.body.data, [])
    })

    await t.test('returns context on each task', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for context')

      const response = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-01-15',
        { token: userA.body.data.token },
      )
      assertStatus(response, 200, 'calendar list with context')

      const workspaceA = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: userA.body.data.token,
        body: { name: 'Calendar Workspace A' },
      })
      track(ids, 'workspaces', workspaceA)
      assertStatus(workspaceA, 201, 'create workspace A')

      const task = response.body.data[0]
      assert.equal(task.project?.id, task.project?.id)
      assert.equal(task.project.name, 'Calendar Project A')
      assert.equal(task.project.workspace?.name, workspaceA.body.data.name)
    })

    await t.test('rejects the exact 42-day maximum when crossed', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for boundary')

      const response = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-02-12',
        { token: userA.body.data.token },
      )
      assertValidationError(response, '42-day boundary crossed')
      assert.ok(
        response.body.error.details.some((detail) => detail.field === 'range'),
      )
    })

    await t.test('supports the 42-day inclusive maximum', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for boundary support')

      const response = await callApi(
        baseUrl,
        'GET',
        '/api/tasks?from=2027-01-01&to=2027-02-11',
        { token: userA.body.data.token },
      )
      assertStatus(response, 200, 'calendar list at 42-day maximum')
      assert.ok(Array.isArray(response.body.data))
      assert.deepEqual(response.body.meta, { undatedCount: 2 })
    })

    await t.test('rejects list methods other than GET', async () => {
      const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
        body: {
          email: `taskflow-calendar-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 200, 'log in owner A for method guard')

      const post = await callApi(baseUrl, 'POST', '/api/tasks', {
        token: userA.body.data.token,
        body: {},
      })
      assertStatus(post, 404, 'calendar endpoint rejects POST')

      const patch = await callApi(baseUrl, 'PATCH', '/api/tasks', {
        token: userA.body.data.token,
        body: { title: 'Invalid title' },
      })
      assertStatus(patch, 404, 'calendar endpoint rejects PATCH')

      const remove = await callApi(baseUrl, 'DELETE', '/api/tasks', {
        token: userA.body.data.token,
      })
      assertStatus(remove, 404, 'calendar endpoint rejects DELETE')
    })
  } catch (error) {
    testError = error
  }

  try {
    await cleanupTrackedRows(ids)
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
