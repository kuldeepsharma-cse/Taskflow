import { Routes, Route } from 'react-router'
import LandingPage from '../pages/LandingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import DashboardPlaceholder from '../pages/DashboardPlaceholder.jsx'
import RequireAuth from './RequireAuth.jsx'
import RedirectIfAuthenticated from './RedirectIfAuthenticated.jsx'

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth pages - hidden when already logged in */}
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuthenticated>
            <RegisterPage />
          </RedirectIfAuthenticated>
        }
      />

      {/* Protected page - requires the mock login flag */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPlaceholder />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default AppRoutes
