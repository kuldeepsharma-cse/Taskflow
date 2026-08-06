import { Calendar, ListTodo } from 'lucide-react'

// Status badge colors - soft background + strong text per design system §6.
// Each status maps to one token set; unknown statuses fall back to neutral.
const statusStyles = {
  'On Track': 'bg-green-50 text-green-700',
  'At Risk': 'bg-amber-50 text-amber-700',
  Behind: 'bg-red-50 text-red-700',
}

// Reusable project card - takes one project object as a single prop.
function ProjectCard({ project }) {
  const badgeClass = statusStyles[project.status] || 'bg-slate-100 text-slate-600'

  return (
    <div className="cursor-default rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Name + status badge */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
        >
          {project.status}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-slate-600">{project.description}</p>

      {/* Progress bar - width comes from the mock data via an inline style */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500">Progress</span>
          <span className="text-slate-900">{project.progress}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            role="progressbar"
            aria-label="Progress"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full rounded-full bg-indigo-600"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Meta row - task count and due date */}
      <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ListTodo className="h-4 w-4" />
          {project.tasks} tasks
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Due {project.dueDate}
        </span>
      </div>
    </div>
  )
}

export default ProjectCard
