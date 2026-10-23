import { NavLink, Outlet, Link, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Calendar,
  Settings,
  Search,
  Bell,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/authContext.js'

// Sidebar navigation items (design system §15: lucide icons, stroke 2, 16px inline).
// Every item points to a real route under /dashboard (see AppRoutes) -
// the paths must stay nested (/dashboard/...) or the router matches nothing.
const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/dashboard/projects', icon: FolderKanban },
  { label: 'Tasks', to: '/dashboard/tasks', icon: ListTodo },
  { label: 'Calendar', to: '/dashboard/calendar', icon: Calendar },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
]

// Shared classes for every nav row - active states differ only by color.
// 150ms = micro feedback for hovers, per design system §17.
const navRowClasses =
  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25'

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function DashboardLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const displayName = user?.name || 'TaskFlow user'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - chrome is white with a border per design system §4; hidden below lg */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        {/* Logo lockup, same temporary text mark as the landing navbar (§16) */}
        <div className="flex h-14 shrink-0 items-center border-b border-slate-200 px-6">
          <Link
            to="/dashboard"
            className="rounded-lg text-lg font-semibold text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
          >
            Task<span className="text-indigo-600">Flow</span>
          </Link>
        </div>

        {/* Navigation - rendered from the data array with .map(); NavLink
            highlights the item matching the current URL */}
        <nav aria-label="Main navigation" className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  `${navRowClasses} ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Right column: top header + page content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header - chrome: white, bottom border, sticky */}
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          {/* Search field - a real input styled per §13, but inert: typing
              does nothing until Phase 11 wires the search logic */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search tasks"
              placeholder="Search tasks…"
              className="h-10 w-48 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors duration-150 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/25 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bell - visual only, notifications are not built yet */}
            <span
              aria-hidden="true"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500"
            >
              <Bell className="h-4 w-4" />
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400"
              />
            </span>

            <span
              role="img"
              aria-label={`Signed in as ${displayName}`}
              title={displayName}
              className="flex h-10 w-10 select-none items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
            >
              {getInitials(displayName)}
            </span>

            {/* Logout - danger ghost variant per design system §12;
                label hidden on small screens (icon-only + aria-label) */}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 sm:px-4"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main content area - responsive page padding per design system §9 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
