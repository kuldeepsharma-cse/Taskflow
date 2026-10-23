import api from './api.js'

export async function listProjects(workspaceId) {
  const response = await api.get(`/workspaces/${workspaceId}/projects`)
  return response.data.data
}

export async function createProject(workspaceId, payload) {
  const response = await api.post(
    `/workspaces/${workspaceId}/projects`,
    payload,
  )
  return response.data.data
}

export async function updateProject(projectId, payload) {
  const response = await api.patch(`/projects/${projectId}`, payload)
  return response.data.data
}

export async function deleteProject(projectId) {
  await api.delete(`/projects/${projectId}`)
}
