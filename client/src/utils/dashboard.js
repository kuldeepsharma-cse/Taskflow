function toTimestamp(value) {
  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function groupTasksByProject(tasks) {
  const grouped = new Map()

  tasks.forEach((task) => {
    const projectTasks = grouped.get(task.projectId) || []
    projectTasks.push(task)
    grouped.set(task.projectId, projectTasks)
  })

  return grouped
}

export function formatShortDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function buildDashboardData(workspaces = [], projects = [], tasks = []) {
  const workspaceMap = new Map(
    workspaces.map((workspace) => [workspace.id, workspace]),
  )
  const projectMap = new Map(projects.map((project) => [project.id, project]))
  const tasksByProject = groupTasksByProject(tasks)

  const projectsWithStats = projects.map((project) => {
    const projectTasks = tasksByProject.get(project.id) || []
    const doneCount = projectTasks.filter((task) => task.status === 'DONE').length
    const taskCount = projectTasks.length
    const progress = taskCount === 0 ? 0 : Math.round((doneCount / taskCount) * 100)

    return {
      ...project,
      workspaceName:
        workspaceMap.get(project.workspaceId)?.name || 'Unknown workspace',
      taskCount,
      doneCount,
      progress,
    }
  })

  const recentProjects = [...projectsWithStats]
    .sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt))
    .slice(0, 3)

  const recentTasks = tasks
    .map((task) => {
      const project = projectMap.get(task.projectId)
      const workspace = project ? workspaceMap.get(project.workspaceId) : null

      return {
        ...task,
        projectName: project?.name || 'Unknown project',
        workspaceName: workspace?.name || 'Unknown workspace',
      }
    })
    .sort((a, b) => toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt))
    .slice(0, 5)

  const todo = tasks.filter((task) => task.status === 'TODO').length
  const inProgress = tasks.filter((task) => task.status === 'IN_PROGRESS').length
  const done = tasks.filter((task) => task.status === 'DONE').length
  const completionPercentage =
    tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100)

  return {
    stats: {
      workspaces: workspaces.length,
      projects: projects.length,
      total: tasks.length,
      todo,
      inProgress,
      done,
      completionPercentage,
    },
    recentProjects,
    recentTasks,
  }
}
