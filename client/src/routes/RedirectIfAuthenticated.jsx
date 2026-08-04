import { Navigate } from 'react-router'

// Inverse guard: hides the login/register pages when already logged in and
// sends the user straight to the dashboard.
function RedirectIfAuthenticated({ children }) {
  // Mock authentication: localStorage holds a simple "logged in" flag
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  // Already logged in - no need to see the login or register form again
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Not logged in - show the public auth page
  return children
}

export default RedirectIfAuthenticated
