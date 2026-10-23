import api from './api.js'

export async function listTasks(projectId) {
  const response = await api.get(`/projects/${projectId}/tasks`)
  return response.data.data
}

export async function listTasksInRange({ from, to }) {
  const response = await api.get('/tasks', { params: { from, to } })
  return response.data
}


export async function createTask(projectId, payload) {
  const response = await api.post(`/projects/${projectId}/tasks`, payload)
  return response.data.data
}

export async function updateTask(taskId, payload) {
  const response = await api.patch(`/tasks/${taskId}`, payload)
  return response.data.data
}

export async function deleteTask(taskId) {
  await api.delete(`/tasks/${taskId}`)
}
