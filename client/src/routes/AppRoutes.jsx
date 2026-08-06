import { Routes, Route } from 'react-router'
import LandingPage from '../pages/LandingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import ProjectsPage from '../pages/ProjectsPage.jsx'
import TasksPage from '../pages/TasksPage.jsx'
import CalendarPage from '../pages/CalendarPage.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
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

      {/* Protected dashboard - layout shell (sidebar + header) around the pages */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
