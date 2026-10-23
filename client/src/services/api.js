import axios from 'axios'
import { getToken } from '../utils/authStorage.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function normalizeApiError(error) {
  if (error.response) {
    const payload = error.response.data?.error

    return {
      status: error.response.status,
      code: payload?.code || 'REQUEST_ERROR',
      message: payload?.message || 'Request failed',
      details: Array.isArray(payload?.details) ? payload.details : [],
    }
  }

  if (error.code === 'ECONNABORTED') {
    return {
      status: 0,
      code: 'TIMEOUT',
      message: 'The server took too long to respond. Please try again.',
      details: [],
    }
  }

  return {
    status: 0,
    code: 'NETWORK_ERROR',
    message:
      'Unable to connect to the server. Please check your connection and try again.',
    details: [],
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
)

export default api
