export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
}

export const workspaceSelect = {
  id: true,
  name: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
}

export const projectSelect = {
  id: true,
  name: true,
  description: true,
  workspaceId: true,
  createdAt: true,
  updatedAt: true,
}

export const assigneeSelect = {
  id: true,
  name: true,
}

export const taskSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  assigneeId: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
  assignee: {
    select: assigneeSelect,
  },
}

export const calendarTaskSelect = {
  ...taskSelect,
  project: {
    select: {
      id: true,
      name: true,
      workspaceId: true,
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
}

export function serializeTask(task) {
  return {
    ...task,
    dueDate: task.dueDate ? task.dueDate.toISOString().slice(0, 10) : null,
  }
}
