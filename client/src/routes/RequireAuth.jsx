import { Navigate } from 'react-router'

// Route guard: shows the wrapped page only when the mock auth flag is set.
// Used to protect /dashboard from unauthenticated visitors.
function RequireAuth({ children }) {
  // Mock authentication: localStorage holds a simple "logged in" flag
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  // Not logged in - send the user to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Logged in - show the protected page
  return children
}

export default RequireAuth
