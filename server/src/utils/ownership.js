import { getPrisma } from '../db/prisma.js'
import AppError from './AppError.js'
import { projectSelect, taskSelect, workspaceSelect } from './selects.js'

function notFound(resource) {
  return new AppError(404, 'NOT_FOUND', `${resource} not found`)
}

export async function getOwnedWorkspace(workspaceId, ownerId) {
  const workspace = await getPrisma().workspace.findFirst({
    where: { id: workspaceId, ownerId },
    select: workspaceSelect,
  })

  if (!workspace) {
    throw notFound('Workspace')
  }

  return workspace
}

export async function getOwnedProject(projectId, ownerId) {
  const project = await getPrisma().project.findFirst({
    where: {
      id: projectId,
      workspace: { ownerId },
    },
    select: projectSelect,
  })

  if (!project) {
    throw notFound('Project')
  }

  return project
}

export async function getOwnedTask(taskId, ownerId) {
  const task = await getPrisma().task.findFirst({
    where: {
      id: taskId,
      project: {
        workspace: { ownerId },
      },
    },
    select: taskSelect,
  })

  if (!task) {
    throw notFound('Task')
  }

  return task
}

export function assertValidAssignee(assigneeId, ownerId) {
  if (assigneeId === undefined || assigneeId === null) {
    return
  }

  if (assigneeId !== ownerId) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', [
      {
        field: 'assigneeId',
        message: 'Assignee must be the workspace owner',
      },
    ])
  }
}
