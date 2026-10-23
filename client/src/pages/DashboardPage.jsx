import { useEffect, useMemo, useState } from 'react'
import { FolderKanban, FolderOpen, ListTodo, CheckCircle2, Clock } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorPanel from '../components/ErrorPanel.jsx'
import LoadingPanel from '../components/LoadingPanel.jsx'
import { useAuth } from '../context/authContext.js'
import { listWorkspaces } from '../services/workspaces.js'
import { listProjects } from '../services/projects.js'
import { listTasks } from '../services/tasks.js'
import { buildDashboardData, formatShortDate } from '../utils/dashboard.js'

const taskStatusStyles = {
  TODO: 'bg-slate-100 text-slate-600',
  IN_PROGRESS: 'bg-indigo-50 text-indigo-700',
  DONE: 'bg-green-50 text-green-700',
}

const taskStatusLabels = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

function pluralize(count, singular) {
  return `${count} ${singular}${count === 1 ? '' : 's'}`
}

function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.trim().split(/\s+/)[0]
  const [workspaces, setWorkspaces] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    setStatus('loading')
    setError(null)

    async function loadDashboard() {
      try {
        const nextWorkspaces = await listWorkspaces()
        const projectLists = await Promise.all(
          nextWorkspaces.map((workspace) => listProjects(workspace.id)),
        )
        const nextProjects = projectLists.flat()
        const taskLists = await Promise.all(
          nextProjects.map((project) => listTasks(project.id)),
        )
        const nextTasks = taskLists.flat()

        if (!active) {
          return
        }

        setWorkspaces(nextWorkspaces)
        setProjects(nextProjects)
        setTasks(nextTasks)
        setStatus('ready')
      } catch (loadError) {
        if (!active) {
          return
        }

        setStatus('error')
        setError(loadError)
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [reloadKey])

  const dashboard = useMemo(
    () => buildDashboardData(workspaces, projects, tasks),
    [workspaces, projects, tasks],
  )

  const statCards = [
    {
      icon: FolderKanban,
      title: 'Workspaces',
      value: dashboard.stats.workspaces,
      description: pluralize(dashboard.stats.projects, 'project'),
    },
    {
      icon: ListTodo,
      title: 'Total Tasks',
      value: dashboard.stats.total,
      description: `${dashboard.stats.todo} to do · ${dashboard.stats.inProgress} in progress`,
    },
    {
      icon: CheckCircle2,
      title: 'Completed Tasks',
      value: dashboard.stats.done,
      description: `${dashboard.stats.completionPercentage}% of all tasks`,
    },
    {
      icon: Clock,
      title: 'Pending Tasks',
      value: dashboard.stats.todo + dashboard.stats.inProgress,
      description: 'To do and in progress',
    },
  ]

  function retryDashboard() {
    setReloadKey((key) => key + 1)
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back{firstName ? `, ${firstName}` : ''}!
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Here is a quick overview of your workspaces, projects, and tasks.
        </p>
      </div>

      {status === 'loading' && <LoadingPanel label="Loading dashboard…" />}

      {status === 'error' && (
        <ErrorPanel
          message={
            error?.message ||
            'Unable to load your dashboard. Please try again.'
          }
          onRetry={retryDashboard}
          label="Try again"
        />
      )}

      {status === 'ready' && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => (
              <StatCard
                key={stat.title}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Projects
            </h2>
            {dashboard.recentProjects.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No projects yet"
                description="Create a workspace and project to see it here."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {dashboard.recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Tasks</h2>
            {dashboard.recentTasks.length === 0 ? (
              <EmptyState
                icon={ListTodo}
                title="No tasks yet"
                description="Tasks you create will appear here."
              />
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="divide-y divide-slate-100">
                  {dashboard.recentTasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {task.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {task.projectName} · {task.workspaceName}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          taskStatusStyles[task.status] ||
                          'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {taskStatusLabels[task.status] || task.status}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">
                        Updated {formatShortDate(task.updatedAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default DashboardPage
