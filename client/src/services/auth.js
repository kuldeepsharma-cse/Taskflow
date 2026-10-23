import api from './api.js'

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials)
  return response.data.data
}

export async function registerUser(payload) {
  const response = await api.post('/auth/register', payload)
  return response.data.data
}

export async function getCurrentUser() {
  const response = await api.get('/me')
  return response.data.data
}

export async function updateCurrentUser(payload) {
  const response = await api.patch('/me', payload)
  return response.data.data
}

export async function changeCurrentPassword(payload) {
  const response = await api.patch('/me/password', payload)
  return response.data.data
}
