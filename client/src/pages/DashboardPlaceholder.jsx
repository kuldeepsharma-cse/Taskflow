import { useNavigate } from 'react-router'

function DashboardPlaceholder() {
  // Programmatic navigation after logout
  const navigate = useNavigate()

  // Mock logout: clear the auth flag, then send the user to the login page
  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50">
      <p className="text-lg font-medium text-slate-600">Dashboard coming in Phase 7.</p>

      {/* Logout button - ghost variant per the design system (§12) */}
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardPlaceholder