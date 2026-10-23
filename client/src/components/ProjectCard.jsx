import { Calendar, CheckCircle2, ListTodo } from 'lucide-react'
import { formatShortDate } from '../utils/dashboard.js'

function ProjectCard({ project }) {
  return (
    <div className="cursor-default rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 break-words text-lg font-semibold text-slate-900">
          {project.name}
        </h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {project.workspaceName}
        </span>
      </div>
      <p className="mt-1.5 break-words text-sm text-slate-600">
        {project.description || 'No description provided.'}
      </p>

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

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ListTodo className="h-4 w-4" />
          {project.taskCount} tasks
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4" />
          {project.doneCount} done
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Created {formatShortDate(project.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ProjectCard
