import { Navigate, useLocation } from 'react-router'
import AuthLoadingScreen from '../components/AuthLoadingScreen.jsx'
import { useAuth } from '../context/authContext.js'

function RequireAuth({ children }) {
  const { status, sessionError, retrySession } = useAuth()
  const location = useLocation()

  if (status === 'checking' || status === 'error') {
    return <AuthLoadingScreen error={sessionError} onRetry={retrySession} />
  }

  if (status === 'unauthenticated') {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return children
}

export default RequireAuth
