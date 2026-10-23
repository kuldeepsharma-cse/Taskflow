const TOKEN_KEY = 'taskflow_token'
const LEGACY_AUTH_KEY = 'isAuthenticated'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(LEGACY_AUTH_KEY)
}

export function clearLegacyAuthFlag() {
  localStorage.removeItem(LEGACY_AUTH_KEY)
}
