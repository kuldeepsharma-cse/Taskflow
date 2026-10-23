import { Navigate, useLocation } from 'react-router'
import AuthLoadingScreen from '../components/AuthLoadingScreen.jsx'
import { useAuth } from '../context/authContext.js'
import { getAuthRedirectPath } from '../utils/authRedirect.js'

function RedirectIfAuthenticated({ children }) {
  const { status, sessionError, retrySession } = useAuth()
  const location = useLocation()

  if (status === 'checking' || status === 'error') {
    return <AuthLoadingScreen error={sessionError} onRetry={retrySession} />
  }

  if (status === 'authenticated') {
    return <Navigate to={getAuthRedirectPath(location.state)} replace />
  }

  return children
}

export default RedirectIfAuthenticated
