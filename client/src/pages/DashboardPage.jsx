import { FolderKanban, ListTodo, CheckCircle2, Clock, FolderOpen } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyState from '../components/EmptyState.jsx'

// Mock statistics - one card per item, rendered with .map()
const stats = [
  {
    icon: FolderKanban,
    title: 'Total Projects',
    value: 12,
    description: 'Across 3 workspaces',
  },
  { icon: ListTodo, title: 'Total Tasks', value: 48, description: 'All projects combined' },
  { icon: CheckCircle2, title: 'Completed Tasks', value: 31, description: '68% of all tasks' },
  { icon: Clock, title: 'Pending Tasks', value: 17, description: 'To do and in progress' },
]

// Mock projects - hardcoded data, replaced by the API in Phase 11
const projects = [
  {
    name: 'Website Redesign',
    description: 'New marketing site for the client launch.',
    progress: 72,
    tasks: 12,
    dueDate: 'Aug 28',
    status: 'On Track',
  },
  {
    name: 'Mobile App MVP',
    description: 'Core screens and navigation for the beta release.',
    progress: 45,
    tasks: 24,
    dueDate: 'Sep 12',
    status: 'At Risk',
  },
  {
    name: 'Backend Migration',
    description: 'Moving the services to the new stack.',
    progress: 90,
    tasks: 8,
    dueDate: 'Aug 15',
    status: 'Behind',
  },
]

// Mock recent activity - dot color + text + time, same style as the landing preview
const activities = [
  { dot: 'bg-indigo-400', text: "Created project 'Website Redesign'", time: '2h ago' },
  { dot: 'bg-green-400', text: "Completed task 'Deploy landing page'", time: '5h ago' },
  { dot: 'bg-slate-300', text: 'Added 3 tasks to Mobile App MVP', time: 'Yesterday' },
  { dot: 'bg-amber-400', text: "Moved 'API docs' to In Progress", time: '2 days ago' },
]

function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page header - generic greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back!</h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Here is a quick overview of your workspaces, projects, and tasks.
        </p>
      </div>

      {/* Statistics - 4 cards: 1 column mobile, 2 tablet, 4 desktop */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      {/* Recent projects - reusable EmptyState shows when there are none */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Projects</h2>
        {projects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Projects you create will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Recent activity */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.text} className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${activity.dot}`} />
                <p className="flex-1 text-sm text-slate-600">{activity.text}</p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
