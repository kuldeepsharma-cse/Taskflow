import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  LoaderCircle,
  Pencil,
  Trash2,
  UserRound,
} from 'lucide-react'
import FormAlert from './FormAlert.jsx'

// Priority badge colors - soft background + strong text per design system §6.
// API priorities are uppercase; labels keep the card's existing title case.
const priorityStyles = {
  HIGH: 'bg-red-50 text-red-700',
  MEDIUM: 'bg-amber-50 text-amber-700',
  LOW: 'bg-green-50 text-green-700',
}

const priorityLabels = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

// Movement button variants - subtle tinted secondary actions (§12/§17).
const moveButtonStyles = {
  forward:
    'border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100',
  back: 'border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-200',
}

const moveButtonBase =
  'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

const iconButtonBase =
  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

const moveIcons = {
  back: ArrowLeft,
  forward: ArrowRight,
  done: CheckCircle2,
}

function getInitials(name) {
  const parts = typeof name === 'string' ? name.trim().split(/\s+/).filter(Boolean) : []

  if (parts.length === 0) {
    return '?'
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function formatDueDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function TaskCard({
  task,
  columnId,
  moves,
  onMoveTask,
  onEditTask,
  onDeleteTask,
  pendingMove,
}) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const isDeletingRef = useRef(false)

  const priorityClass = priorityStyles[task.priority] || 'bg-slate-100 text-slate-600'
  const priorityLabel = priorityLabels[task.priority] || task.priority || 'None'
  const dueDateLabel = formatDueDate(task.dueDate)
  const boardIsPending = pendingMove !== null
  const isThisTaskPending = pendingMove?.taskId === task.id

  function startDelete() {
    setDeleteError('')
    setIsConfirmingDelete(true)
  }

  function cancelDelete() {
    if (isDeletingRef.current) {
      return
    }

    setDeleteError('')
    setIsConfirmingDelete(false)
  }

  async function confirmDelete() {
    if (isDeletingRef.current) {
      return
    }

    isDeletingRef.current = true
    setIsDeleting(true)
    setDeleteError('')

    try {
      await onDeleteTask(task.id)
    } catch (error) {
      setDeleteError(error?.message || 'Unable to delete this task.')
    } finally {
      isDeletingRef.current = false
      setIsDeleting(false)
    }
  }

  return (
    <div className="cursor-default rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-slate-400">
          TF-{task.id}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityClass}`}
        >
          {priorityLabel}
        </span>
      </div>

      <h3 className="mt-1.5 truncate text-sm font-medium text-slate-900">
        {task.title}
      </h3>

      <div className="mt-3 flex items-center justify-between gap-2">
        {task.assignee ? (
          <span
            title={task.assignee.name}
            className="flex h-6 w-6 select-none items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white"
          >
            {getInitials(task.assignee.name)}
          </span>
        ) : (
          <span
            title="Unassigned"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400"
          >
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}

        {dueDateLabel && (
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="h-4 w-4" />
            Due {dueDateLabel}
          </span>
        )}
      </div>

      {isConfirmingDelete ? (
        <div
          role="group"
          aria-label="Confirm task deletion"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3"
        >
          <p className="break-words text-xs font-medium text-red-800">
            Delete “{task.title}”?
          </p>
          <p className="mt-1 text-xs text-red-700">This cannot be undone.</p>
          <FormAlert message={deleteError} />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
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
              {isDeleting ? 'Deleting…' : 'Delete task'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-1.5 border-t border-slate-100 pt-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEditTask(task)}
              disabled={boardIsPending}
              aria-label={`Edit ${task.title}`}
              title="Edit task"
              className={iconButtonBase}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={startDelete}
              disabled={boardIsPending}
              aria-label={`Delete ${task.title}`}
              title="Delete task"
              className={`${iconButtonBase} text-red-500 hover:bg-red-50`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {moves.length > 0 && (
            <div className="flex items-center gap-1.5">
              {moves.map((move) => {
                const Icon = moveIcons[move.icon]
                const isThisMovePending =
                  isThisTaskPending && pendingMove.columnId === move.toId

                return (
                  <button
                    key={move.toId}
                    type="button"
                    onClick={() => onMoveTask(task.id, columnId, move.toId)}
                    disabled={boardIsPending || isDeleting}
                    aria-busy={isThisMovePending || undefined}
                    className={`${moveButtonBase} ${moveButtonStyles[move.direction]}`}
                  >
                    {isThisMovePending ? (
                      <LoaderCircle
                        className="h-3.5 w-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {move.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskCard
