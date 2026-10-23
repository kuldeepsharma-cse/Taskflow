import { useEffect, useState } from 'react'
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  registerUser,
  updateCurrentUser,
} from '../services/auth.js'
import {
  clearAuthStorage,
  clearLegacyAuthFlag,
  getToken,
  saveToken,
} from '../utils/authStorage.js'
import { AuthContext } from './authContext.js'

function requireAuthPayload(data) {
  if (!data || typeof data.token !== 'string' || !data.user) {
    throw new Error('The server returned an unexpected response.')
  }

  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(() =>
    getToken() ? 'checking' : 'unauthenticated',
  )
  const [sessionError, setSessionError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    clearLegacyAuthFlag()

    if (!getToken()) {
      setUser(null)
      setSessionError(null)
      setStatus('unauthenticated')
      return
    }

    let active = true

    async function loadSession() {
      setStatus('checking')
      setSessionError(null)

      try {
        const currentUser = await getCurrentUser()

        if (!active) {
          return
        }

        setUser(currentUser)
        setStatus('authenticated')
      } catch (error) {
        if (!active) {
          return
        }

        if (error.status === 401) {
          clearAuthStorage()
          setUser(null)
          setSessionError(null)
          setStatus('unauthenticated')
          return
        }

        setSessionError(error)
        setStatus('error')
      }
    }

    loadSession()

    return () => {
      active = false
    }
  }, [retryCount])

  async function login(credentials) {
    const data = requireAuthPayload(await loginUser(credentials))

    saveToken(data.token)
    setUser(data.user)
    setSessionError(null)
    setStatus('authenticated')

    return data.user
  }

  async function register(payload) {
    const data = requireAuthPayload(await registerUser(payload))

    saveToken(data.token)
    setUser(data.user)
    setSessionError(null)
    setStatus('authenticated')

    return data.user
  }

  async function updateProfile(payload) {
    const updatedUser = await updateCurrentUser(payload)
    setUser(updatedUser)
    return updatedUser
  }

  async function changePassword(payload) {
    const updatedUser = await changeCurrentPassword(payload)
    setUser(updatedUser)
    return updatedUser
  }

  function logout() {
    clearAuthStorage()
    setUser(null)
    setSessionError(null)
    setStatus('unauthenticated')
  }

  function retrySession() {
    if (!getToken()) {
      setUser(null)
      setSessionError(null)
      setStatus('unauthenticated')
      return
    }

    setRetryCount((count) => count + 1)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        sessionError,
        login,
        register,
        updateProfile,
        changePassword,
        logout,
        retrySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
