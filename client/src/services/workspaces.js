import api from './api.js'

export async function listWorkspaces() {
  const response = await api.get('/workspaces')
  return response.data.data
}

export async function createWorkspace(payload) {
  const response = await api.post('/workspaces', payload)
  return response.data.data
}

export async function renameWorkspace(workspaceId, payload) {
  const response = await api.patch(`/workspaces/${workspaceId}`, payload)
  return response.data.data
}

export async function deleteWorkspace(workspaceId) {
  await api.delete(`/workspaces/${workspaceId}`)
}
