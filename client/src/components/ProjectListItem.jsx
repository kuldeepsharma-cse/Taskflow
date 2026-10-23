import { useRef, useState } from 'react'
import { Calendar, Pencil, Trash2 } from 'lucide-react'
import FormAlert from './FormAlert.jsx'

const actionButtonClass =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

function formatCreatedDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function ProjectListItem({ project, onEdit, onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const isDeletingRef = useRef(false)

  function startDelete() {
    setDeleteError('')
    setIsConfirming(true)
  }

  function cancelDelete() {
    if (isDeletingRef.current) {
      return
    }

    setDeleteError('')
    setIsConfirming(false)
  }

  async function confirmDelete() {
    if (isDeletingRef.current) {
      return
    }

    isDeletingRef.current = true
    setIsDeleting(true)
    setDeleteError('')

    try {
      await onDelete(project.id)
    } catch (error) {
      setDeleteError(error?.message || 'Unable to delete this project.')
    } finally {
      isDeletingRef.current = false
      setIsDeleting(false)
    }
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-slate-900">
            {project.name}
          </h3>
          <p className="mt-1.5 break-words text-sm text-slate-600">
            {project.description || 'No description provided.'}
          </p>
        </div>

        {!isConfirming && (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onEdit(project)}
              aria-label={`Edit ${project.name}`}
              className={actionButtonClass}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              type="button"
              onClick={startDelete}
              aria-label={`Delete ${project.name}`}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/25"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <Calendar className="h-4 w-4" />
        <span>Created {formatCreatedDate(project.createdAt)}</span>
      </div>

      {isConfirming && (
        <div
          role="group"
          aria-label="Confirm project deletion"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <p className="break-words text-sm font-medium text-red-800">
            Delete “{project.name}”?
          </p>
          <p className="mt-1 text-xs text-red-700">
            All tasks in this project will also be permanently deleted. This
            cannot be undone.
          </p>
          <FormAlert message={deleteError} />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={cancelDelete}
              disabled={isDeleting}
              className={actionButtonClass}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isDeleting}
              aria-busy={isDeleting}
              className="inline-flex h-8 items-center justify-center rounded-lg bg-red-600 px-3 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? 'Deleting…' : 'Delete project'}
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

export default ProjectListItem
