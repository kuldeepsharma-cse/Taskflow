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

function assertNotFound(response, label) {
  assertStatus(response, 404, label)
  assert.equal(response.body?.error?.code, 'NOT_FOUND', label)
  assert.equal(Object.hasOwn(response.body ?? {}, 'data'), false, label)
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

test('workspace, project, and task CRUD are owner-scoped', async (t) => {
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
          name: 'CRUD Owner A',
          email: `taskflow-crud-${suffix}-a@example.test`,
          password,
        },
      })
      assertStatus(userA, 201, 'register user A')
      assert.ok(Number.isInteger(userA.body?.data?.user?.id))
      ids.users.add(userA.body.data.user.id)

      const userB = await callApi(baseUrl, 'POST', '/api/auth/register', {
        body: {
          name: 'CRUD Owner B',
          email: `taskflow-crud-${suffix}-b@example.test`,
          password,
        },
      })
      assertStatus(userB, 201, 'register user B')
      assert.ok(Number.isInteger(userB.body?.data?.user?.id))
      ids.users.add(userB.body.data.user.id)

      assert.notEqual(userA.body.data.user.id, userB.body.data.user.id)
    })

    const userA = await callApi(baseUrl, 'POST', '/api/auth/login', {
      body: {
        email: `taskflow-crud-${suffix}-a@example.test`,
        password,
      },
    })
    assertStatus(userA, 200, 'log in user A')

    const userB = await callApi(baseUrl, 'POST', '/api/auth/login', {
      body: {
        email: `taskflow-crud-${suffix}-b@example.test`,
        password,
      },
    })
    assertStatus(userB, 200, 'log in user B')

    const tokenA = userA.body.data.token
    const tokenB = userB.body.data.token
    const userIdA = userA.body.data.user.id
    const userIdB = userB.body.data.user.id

    let workspaceA
    let workspaceB
    let projectA
    let projectB
    let taskOne
    let taskTwo
    let taskB

    await t.test('supports workspace CRUD and derives the owner from the token', async () => {
      const unauthorized = await callApi(baseUrl, 'GET', '/api/workspaces')
      assertStatus(unauthorized, 401, 'list workspaces without a token')

      const invalid = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: tokenA,
        body: { name: '   ' },
      })
      assertValidationError(invalid, 'create workspace with blank name')

      const created = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: tokenA,
        body: { name: '  Workspace A  ', ownerId: userIdB },
      })
      track(ids, 'workspaces', created)
      assertStatus(created, 201, 'create workspace A')
      assert.equal(created.body.data.name, 'Workspace A')
      assert.equal(created.body.data.ownerId, userIdA)
      workspaceA = created.body.data

      const detail = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}`,
        { token: tokenA },
      )
      assertStatus(detail, 200, 'get workspace A')
      assert.equal(detail.body.data.id, workspaceA.id)

      const updated = await callApi(
        baseUrl,
        'PATCH',
        `/api/workspaces/${workspaceA.id}`,
        {
          token: tokenA,
          body: { name: 'Workspace A Renamed', ownerId: userIdB },
        },
      )
      assertStatus(updated, 200, 'update workspace A')
      assert.equal(updated.body.data.name, 'Workspace A Renamed')
      assert.equal(updated.body.data.ownerId, userIdA)

      const listA = await callApi(baseUrl, 'GET', '/api/workspaces', {
        token: tokenA,
      })
      assertStatus(listA, 200, 'list workspaces as A')
      assert.ok(listA.body.data.some((workspace) => workspace.id === workspaceA.id))
    })

    await t.test('enforces workspace ownership in both directions', async () => {
      const createdB = await callApi(baseUrl, 'POST', '/api/workspaces', {
        token: tokenB,
        body: { name: 'Workspace B' },
      })
      track(ids, 'workspaces', createdB)
      assertStatus(createdB, 201, 'create workspace B')
      assert.equal(createdB.body.data.ownerId, userIdB)
      workspaceB = createdB.body.data

      const listA = await callApi(baseUrl, 'GET', '/api/workspaces', {
        token: tokenA,
      })
      assertStatus(listA, 200, 'list workspaces as A')
      assert.equal(
        listA.body.data.some((workspace) => workspace.id === workspaceB.id),
        false,
      )

      const listB = await callApi(baseUrl, 'GET', '/api/workspaces', {
        token: tokenB,
      })
      assertStatus(listB, 200, 'list workspaces as B')
      assert.equal(
        listB.body.data.some((workspace) => workspace.id === workspaceA.id),
        false,
      )

      const getForeign = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}`,
        { token: tokenB },
      )
      assertNotFound(getForeign, 'B reads workspace A')

      const patchForeign = await callApi(
        baseUrl,
        'PATCH',
        `/api/workspaces/${workspaceA.id}`,
        { token: tokenB, body: { name: 'Stolen Workspace' } },
      )
      assertNotFound(patchForeign, 'B updates workspace A')

      const deleteForeign = await callApi(
        baseUrl,
        'DELETE',
        `/api/workspaces/${workspaceA.id}`,
        { token: tokenB },
      )
      assertNotFound(deleteForeign, 'B deletes workspace A')

      const stillThere = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}`,
        { token: tokenA },
      )
      assertStatus(stillThere, 200, 'workspace A survives B')
      assert.equal(stillThere.body.data.name, 'Workspace A Renamed')

      const reverse = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceB.id}`,
        { token: tokenA },
      )
      assertNotFound(reverse, 'A reads workspace B')
    })

    await t.test('supports project CRUD under owned workspaces', async () => {
      const invalidParent = await callApi(
        baseUrl,
        'GET',
        '/api/workspaces/not-a-number/projects',
        { token: tokenA },
      )
      assertNotFound(invalidParent, 'list projects with invalid workspace ID')

      const invalidBody = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceA.id}/projects`,
        { token: tokenA, body: { name: '   ' } },
      )
      assertValidationError(invalidBody, 'create project with blank name')

      const created = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceA.id}/projects`,
        {
          token: tokenA,
          body: {
            name: '  Project A  ',
            description: '  Project A description  ',
            workspaceId: workspaceB.id,
          },
        },
      )
      track(ids, 'projects', created)
      assertStatus(created, 201, 'create project A')
      assert.equal(created.body.data.name, 'Project A')
      assert.equal(created.body.data.description, 'Project A description')
      assert.equal(created.body.data.workspaceId, workspaceA.id)
      projectA = created.body.data

      const list = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}/projects`,
        { token: tokenA },
      )
      assertStatus(list, 200, 'list projects in workspace A')
      assert.ok(list.body.data.some((project) => project.id === projectA.id))

      const updated = await callApi(
        baseUrl,
        'PATCH',
        `/api/projects/${projectA.id}`,
        {
          token: tokenA,
          body: {
            name: 'Project A Renamed',
            description: null,
            workspaceId: workspaceB.id,
          },
        },
      )
      assertStatus(updated, 200, 'update project A')
      assert.equal(updated.body.data.name, 'Project A Renamed')
      assert.equal(updated.body.data.description, null)
      assert.equal(updated.body.data.workspaceId, workspaceA.id)

      const emptyPatch = await callApi(
        baseUrl,
        'PATCH',
        `/api/projects/${projectA.id}`,
        { token: tokenA, body: {} },
      )
      assertValidationError(emptyPatch, 'update project with no fields')

      const tooLongDescription = await callApi(
        baseUrl,
        'PATCH',
        `/api/projects/${projectA.id}`,
        { token: tokenA, body: { description: 'x'.repeat(2001) } },
      )
      assertValidationError(tooLongDescription, 'update project with long description')
    })

    await t.test('hides projects and nested routes from other owners', async () => {
      const createdB = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceB.id}/projects`,
        { token: tokenB, body: { name: 'Project B' } },
      )
      track(ids, 'projects', createdB)
      assertStatus(createdB, 201, 'create project B')
      projectB = createdB.body.data

      const listForeign = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}/projects`,
        { token: tokenB },
      )
      assertNotFound(listForeign, 'B lists projects in workspace A')

      const createForeign = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceA.id}/projects`,
        { token: tokenB, body: { name: 'Foreign Project' } },
      )
      assertNotFound(createForeign, 'B creates project in workspace A')

      const patchForeign = await callApi(
        baseUrl,
        'PATCH',
        `/api/projects/${projectA.id}`,
        { token: tokenB, body: { name: 'Stolen Project' } },
      )
      assertNotFound(patchForeign, 'B updates project A')

      const deleteForeign = await callApi(
        baseUrl,
        'DELETE',
        `/api/projects/${projectA.id}`,
        { token: tokenB },
      )
      assertNotFound(deleteForeign, 'B deletes project A')

      const stillThere = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceA.id}/projects`,
        { token: tokenA },
      )
      assertStatus(stillThere, 200, 'A lists projects after B attempts')
      assert.ok(
        stillThere.body.data.some(
          (project) =>
            project.id === projectA.id && project.name === 'Project A Renamed',
        ),
      )

      const reverseList = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceB.id}/projects`,
        { token: tokenA },
      )
      assertNotFound(reverseList, 'A lists projects in workspace B')

      const reversePatch = await callApi(
        baseUrl,
        'PATCH',
        `/api/projects/${projectB.id}`,
        { token: tokenA, body: { name: 'Stolen Project B' } },
      )
      assertNotFound(reversePatch, 'A updates project B')
    })

    await t.test('supports task CRUD, dueDate normalization, and ownership', async () => {
      const created = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.id}/tasks`,
        {
          token: tokenA,
          body: {
            title: '  Task One  ',
            description: '  Task One description  ',
            status: 'TODO',
            priority: 'HIGH',
            dueDate: '2028-02-29',
            assigneeId: userIdA,
            projectId: projectB.id,
            workspaceId: workspaceB.id,
          },
        },
      )
      track(ids, 'tasks', created)
      assertStatus(created, 201, 'create task one')
      assert.equal(created.body.data.title, 'Task One')
      assert.equal(created.body.data.description, 'Task One description')
      assert.equal(created.body.data.status, 'TODO')
      assert.equal(created.body.data.priority, 'HIGH')
      assert.equal(created.body.data.dueDate, '2028-02-29')
      assert.equal(created.body.data.assigneeId, userIdA)
      assert.deepEqual(created.body.data.assignee, {
        id: userIdA,
        name: 'CRUD Owner A',
      })
      assert.equal(created.body.data.projectId, projectA.id)
      taskOne = created.body.data

      const defaults = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.id}/tasks`,
        { token: tokenA, body: { title: 'Task Two' } },
      )
      track(ids, 'tasks', defaults)
      assertStatus(defaults, 201, 'create task two with defaults')
      assert.equal(defaults.body.data.status, 'TODO')
      assert.equal(defaults.body.data.priority, 'MEDIUM')
      assert.equal(defaults.body.data.description, null)
      assert.equal(defaults.body.data.dueDate, null)
      assert.equal(defaults.body.data.assigneeId, null)
      assert.equal(defaults.body.data.assignee, null)
      taskTwo = defaults.body.data

      const list = await callApi(
        baseUrl,
        'GET',
        `/api/projects/${projectA.id}/tasks`,
        { token: tokenA },
      )
      assertStatus(list, 200, 'list tasks in project A')
      const taskIds = list.body.data.map((task) => task.id)
      assert.ok(taskIds.indexOf(taskOne.id) < taskIds.indexOf(taskTwo.id))

      const updated = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskOne.id}`,
        {
          token: tokenA,
          body: {
            title: 'Task One Updated',
            description: null,
            status: 'IN_PROGRESS',
            priority: 'LOW',
            dueDate: null,
            assigneeId: null,
            projectId: projectB.id,
            workspaceId: workspaceB.id,
          },
        },
      )
      assertStatus(updated, 200, 'update task one')
      assert.equal(updated.body.data.title, 'Task One Updated')
      assert.equal(updated.body.data.description, null)
      assert.equal(updated.body.data.status, 'IN_PROGRESS')
      assert.equal(updated.body.data.priority, 'LOW')
      assert.equal(updated.body.data.dueDate, null)
      assert.equal(updated.body.data.assigneeId, null)
      assert.equal(updated.body.data.assignee, null)
      assert.equal(updated.body.data.projectId, projectA.id)

      const updatedDate = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskOne.id}`,
        {
          token: tokenA,
          body: { dueDate: '2027-01-01', assigneeId: userIdA },
        },
      )
      assertStatus(updatedDate, 200, 'update task due date and assignee')
      assert.equal(updatedDate.body.data.dueDate, '2027-01-01')
      assert.equal(updatedDate.body.data.assigneeId, userIdA)

      const foreignList = await callApi(
        baseUrl,
        'GET',
        `/api/projects/${projectA.id}/tasks`,
        { token: tokenB },
      )
      assertNotFound(foreignList, 'B lists tasks in project A')

      const foreignCreate = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectA.id}/tasks`,
        {
          token: tokenB,
          body: { title: 'Foreign Task', assigneeId: userIdA },
        },
      )
      assertNotFound(foreignCreate, 'B creates task assigned to A')

      const foreignPatch = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskOne.id}`,
        { token: tokenB, body: { title: 'Stolen Task' } },
      )
      assertNotFound(foreignPatch, 'B updates task A')

      const foreignDelete = await callApi(
        baseUrl,
        'DELETE',
        `/api/tasks/${taskOne.id}`,
        { token: tokenB },
      )
      assertNotFound(foreignDelete, 'B deletes task A')

      const stillThere = await callApi(
        baseUrl,
        'GET',
        `/api/projects/${projectA.id}/tasks`,
        { token: tokenA },
      )
      assertStatus(stillThere, 200, 'A lists tasks after B attempts')
      assert.ok(
        stillThere.body.data.some(
          (task) => task.id === taskOne.id && task.title === 'Task One Updated',
        ),
      )

      const createdB = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${projectB.id}/tasks`,
        { token: tokenB, body: { title: 'Task B' } },
      )
      track(ids, 'tasks', createdB)
      assertStatus(createdB, 201, 'create task B')
      taskB = createdB.body.data

      const reverseList = await callApi(
        baseUrl,
        'GET',
        `/api/projects/${projectB.id}/tasks`,
        { token: tokenA },
      )
      assertNotFound(reverseList, 'A lists tasks in project B')

      const reversePatch = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskB.id}`,
        { token: tokenA, body: { title: 'Stolen Task B' } },
      )
      assertNotFound(reversePatch, 'A updates task B')

      const deleted = await callApi(
        baseUrl,
        'DELETE',
        `/api/tasks/${taskTwo.id}`,
        { token: tokenA },
      )
      assertStatus(deleted, 204, 'delete task two')
      assert.equal(deleted.body, null)

      const afterDelete = await callApi(
        baseUrl,
        'GET',
        `/api/projects/${projectA.id}/tasks`,
        { token: tokenA },
      )
      assertStatus(afterDelete, 200, 'list tasks after delete')
      assert.equal(
        afterDelete.body.data.some((task) => task.id === taskTwo.id),
        false,
      )
    })

    await t.test('rejects invalid task input and foreign assignees', async () => {
      const invalidPayloads = [
        { body: { title: '   ' }, label: 'blank title' },
        { body: { title: 'x'.repeat(201) }, label: 'long title' },
        {
          body: { title: 'Valid title', description: 'x'.repeat(2001) },
          label: 'long description',
        },
        {
          body: { title: 'Valid title', status: 'done' },
          label: 'lowercase status',
        },
        {
          body: { title: 'Valid title', priority: 'URGENT' },
          label: 'invalid priority',
        },
        {
          body: { title: 'Valid title', dueDate: '2026-02-30' },
          label: 'invalid calendar date',
        },
        {
          body: { title: 'Valid title', dueDate: '2026-12-31T00:00:00.000Z' },
          label: 'datetime due date',
        },
        {
          body: { title: 'Valid title', dueDate: '12/31/2026' },
          label: 'non-ISO due date',
        },
        {
          body: { title: 'Valid title', assigneeId: userIdB },
          label: 'foreign assignee on create',
        },
        {
          body: { title: 'Valid title', assigneeId: '1' },
          label: 'string assignee ID',
        },
      ]

      for (const payload of invalidPayloads) {
        const response = await callApi(
          baseUrl,
          'POST',
          `/api/projects/${projectA.id}/tasks`,
          { token: tokenA, body: payload.body },
        )
        assertValidationError(response, `create task with ${payload.label}`)
      }

      const foreignAssigneeUpdate = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskOne.id}`,
        { token: tokenA, body: { assigneeId: userIdB } },
      )
      assertValidationError(foreignAssigneeUpdate, 'assign task to another user')

      const emptyPatch = await callApi(
        baseUrl,
        'PATCH',
        `/api/tasks/${taskOne.id}`,
        { token: tokenA, body: {} },
      )
      assertValidationError(emptyPatch, 'update task with no fields')

      const missingProject = await callApi(
        baseUrl,
        'POST',
        '/api/projects/999999999/tasks',
        { token: tokenA, body: { title: 'Missing project' } },
      )
      assertNotFound(missingProject, 'create task under missing project')

      const invalidTaskId = await callApi(
        baseUrl,
        'PATCH',
        '/api/tasks/not-a-number',
        { token: tokenA, body: { title: 'Invalid ID' } },
      )
      assertNotFound(invalidTaskId, 'update task with invalid ID')
    })

    await t.test('cascades project and workspace deletion', async () => {
      const projectCascadeWorkspace = await callApi(
        baseUrl,
        'POST',
        '/api/workspaces',
        { token: tokenA, body: { name: 'Project Cascade Workspace' } },
      )
      track(ids, 'workspaces', projectCascadeWorkspace)
      assertStatus(projectCascadeWorkspace, 201, 'create project cascade workspace')

      const cascadeProject = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${projectCascadeWorkspace.body.data.id}/projects`,
        { token: tokenA, body: { name: 'Cascade Project' } },
      )
      track(ids, 'projects', cascadeProject)
      assertStatus(cascadeProject, 201, 'create cascade project')

      const cascadeTask = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${cascadeProject.body.data.id}/tasks`,
        { token: tokenA, body: { title: 'Cascade Project Task' } },
      )
      track(ids, 'tasks', cascadeTask)
      assertStatus(cascadeTask, 201, 'create cascade project task')

      const deleteProject = await callApi(
        baseUrl,
        'DELETE',
        `/api/projects/${cascadeProject.body.data.id}`,
        { token: tokenA },
      )
      assertStatus(deleteProject, 204, 'delete cascade project')

      const deletedTask = await prisma.task.findUnique({
        where: { id: cascadeTask.body.data.id },
        select: { id: true },
      })
      assert.equal(deletedTask, null)

      const workspaceCascade = await callApi(
        baseUrl,
        'POST',
        '/api/workspaces',
        { token: tokenA, body: { name: 'Workspace Cascade' } },
      )
      track(ids, 'workspaces', workspaceCascade)
      assertStatus(workspaceCascade, 201, 'create workspace cascade workspace')

      const workspaceCascadeProject = await callApi(
        baseUrl,
        'POST',
        `/api/workspaces/${workspaceCascade.body.data.id}/projects`,
        { token: tokenA, body: { name: 'Workspace Cascade Project' } },
      )
      track(ids, 'projects', workspaceCascadeProject)
      assertStatus(workspaceCascadeProject, 201, 'create workspace cascade project')

      const workspaceCascadeTask = await callApi(
        baseUrl,
        'POST',
        `/api/projects/${workspaceCascadeProject.body.data.id}/tasks`,
        { token: tokenA, body: { title: 'Workspace Cascade Task' } },
      )
      track(ids, 'tasks', workspaceCascadeTask)
      assertStatus(workspaceCascadeTask, 201, 'create workspace cascade task')

      const deleteWorkspace = await callApi(
        baseUrl,
        'DELETE',
        `/api/workspaces/${workspaceCascade.body.data.id}`,
        { token: tokenA },
      )
      assertStatus(deleteWorkspace, 204, 'delete workspace cascade workspace')

      const deletedWorkspace = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceCascade.body.data.id}`,
        { token: tokenA },
      )
      assertNotFound(deletedWorkspace, 'read deleted workspace')

      const deletedCascadeProject = await callApi(
        baseUrl,
        'GET',
        `/api/workspaces/${workspaceCascade.body.data.id}/projects`,
        { token: tokenA },
      )
      assertNotFound(deletedCascadeProject, 'list projects in deleted workspace')

      const remainingTask = await prisma.task.findUnique({
        where: { id: workspaceCascadeTask.body.data.id },
        select: { id: true },
      })
      assert.equal(remainingTask, null)
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
