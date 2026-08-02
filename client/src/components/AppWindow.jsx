// Sidebar navigation items
const navItems = ['Dashboard', 'Projects', 'Tasks', 'Calendar', 'Settings']

// Status summary cards - shown in the detailed view only
const statusCards = [
  { label: 'To Do', count: 12 },
  { label: 'In Progress', count: 7 },
  { label: 'Completed', count: 19 },
]

// Kanban preview columns - each has its own list of task titles
const kanbanColumns = [
  {
    title: 'To Do',
    tasks: ['Draft project brief', 'Collect team feedback', 'Update task statuses'],
  },
  {
    title: 'In Progress',
    tasks: ['Design dashboard mockup', 'Build Kanban board UI', 'Write API routes'],
  },
  {
    title: 'Done',
    tasks: ['Set up workspace', 'Create project backlog', 'Ship landing page'],
  },
]

// Recent activity items (dot color + text + time) - detailed view only
const activities = [
  { dot: 'bg-green-400', text: "Moved 'Ship landing page' to Done", time: '2m ago' },
  { dot: 'bg-indigo-400', text: "Created task 'Write API routes'", time: '1h ago' },
  { dot: 'bg-slate-300', text: 'Updated project due date', time: '3h ago' },
  { dot: 'bg-amber-400', text: "Added 'Design dashboard mockup'", time: 'Yesterday' },
]

// Shared realistic app window mockup - pure visual, no real functionality.
// The Hero shows the compact window; the Dashboard Preview section shows the
// same window with the `detailed` prop (browser header, status cards, activity).
function AppWindow({ detailed = false }) {
  return (
    <div
      className={
        detailed
          ? 'mx-auto max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'
          : 'mx-auto max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg'
      }
    >
      {/* Browser-style header with three dots and the app title - detailed view only */}
      {detailed && (
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-2 text-sm font-medium text-slate-600">
            TaskFlow
          </span>
        </div>
      )}

      {/* Top bar with search, notifications, and profile - visual only */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-2.5">
        <div className="flex h-9 w-40 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-400 sm:w-56">
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="truncate">Search tasks…</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            A
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar with navigation items - hidden on mobile */}
        <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-slate-200 p-3 sm:flex">
          <span className="mb-2 text-sm font-semibold text-slate-900">
            Task<span className="text-indigo-600">Flow</span>
          </span>
          {navItems.map((item, index) => (
            <span
              key={item}
              className={
                index === 0
                  ? 'flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600'
                  : 'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600'
              }
            >
              <span
                className={
                  index === 0
                    ? 'h-2 w-2 rounded-full bg-indigo-500'
                    : 'h-2 w-2 rounded-full bg-slate-300'
                }
              />
              {item}
            </span>
          ))}
        </aside>

        {/* Main content area */}
        <div className="flex-1 space-y-3 p-3 sm:p-4">
          {/* Project header with a visual-only "New Task" button - detailed view only */}
          {detailed && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Active project</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Website Redesign
                </h3>
              </div>
              {/* Visual UI element only - not clickable */}
              <span className="inline-flex h-10 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white">
                New Task
              </span>
            </div>
          )}

          {/* Status summary cards - detailed view only */}
          {detailed && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {statusCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="text-xs font-medium text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {card.count}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Kanban preview columns */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {kanbanColumns.map((column) => (
              <div key={column.title} className="rounded-lg bg-slate-50 p-2.5">
                <p className="text-xs font-semibold text-slate-500">
                  {column.title}
                </p>
                <div className="mt-2 space-y-2">
                  {column.tasks.map((task) => (
                    <div
                      key={task}
                      className="truncate rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity panel - hidden below desktop, detailed view only */}
        {detailed && (
          <aside className="hidden w-60 shrink-0 flex-col border-l border-slate-200 p-3 lg:flex">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recent Activity
            </p>
            <div className="mt-3 space-y-3">
              {activities.map((activity) => (
                <div key={activity.text} className="flex gap-2">
                  <span
                    className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${activity.dot}`}
                  />
                  <div>
                    <p className="text-xs text-slate-600">{activity.text}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default AppWindow
