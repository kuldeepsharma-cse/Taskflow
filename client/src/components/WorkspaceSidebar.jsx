import { useRef, useState } from 'react'
import {
  FolderKanban,
  FolderOpen,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import EmptyState from './EmptyState.jsx'
import FormAlert from './FormAlert.jsx'
import Input from './Input.jsx'
import { mapFieldErrors, validateName } from '../utils/validate.js'

const secondaryButtonClass =
  'inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

const primaryButtonClass =
  'inline-flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

const dangerButtonClass =
  'inline-flex h-8 items-center justify-center rounded-lg bg-red-600 px-3 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/25 disabled:cursor-not-allowed disabled:opacity-50'

function WorkspaceSidebar({
  workspaces,
  selectedWorkspaceId,
  status,
  error,
  onSelect,
  onCreate,
  onRename,
  onDelete,
  onRetry,
}) {
  const [editor, setEditor] = useState(null)
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const isSavingRef = useRef(false)
  const isDeletingRef = useRef(false)

  function closeEditor() {
    setEditor(null)
    setName('')
    setErrors({})
    setFormError('')
  }

  function openCreate() {
    setEditor({ mode: 'create' })
    setName('')
    setErrors({})
    setFormError('')
    setDeleteTarget(null)
    setDeleteError('')
  }

  function openRename(workspace) {
    setEditor({ mode: 'rename', workspace })
    setName(workspace.name)
    setErrors({})
    setFormError('')
    setDeleteTarget(null)
    setDeleteError('')
  }

  function handleSelect(workspaceId) {
    if (workspaceId === selectedWorkspaceId) {
      return
    }

    closeEditor()
    setDeleteTarget(null)
    setDeleteError('')
    onSelect(workspaceId)
  }

  function handleNameChange(value) {
    setName(value)
    setErrors((current) => ({ ...current, name: undefined }))
    setFormError('')
  }

  async function handleSave(event) {
    event.preventDefault()

    if (isSavingRef.current) {
      return
    }

    const trimmedName = name.trim()
    const nameError = validateName(trimmedName)

    if (nameError) {
      setErrors({ name: nameError })
      return
    }

    isSavingRef.current = true
    setIsSaving(true)
    setErrors({})
    setFormError('')

    try {
      if (editor.mode === 'create') {
        await onCreate({ name: trimmedName })
      } else {
        await onRename(editor.workspace.id, { name: trimmedName })
      }

      closeEditor()
    } catch (saveError) {
      const fieldErrors = mapFieldErrors(saveError?.details)

      if (fieldErrors.name) {
        setErrors({ name: fieldErrors.name })
      } else {
        setFormError(saveError?.message || 'Unable to save this workspace.')
      }
    } finally {
      isSavingRef.current = false
      setIsSaving(false)
    }
  }

  function requestDelete(workspace) {
    setEditor(null)
    setName('')
    setErrors({})
    setFormError('')
    setDeleteTarget(workspace)
    setDeleteError('')
  }

  function cancelDelete() {
    if (isDeletingRef.current) {
      return
    }

    setDeleteTarget(null)
    setDeleteError('')
  }

  async function confirmDelete() {
    if (!deleteTarget || isDeletingRef.current) {
      return
    }

    isDeletingRef.current = true
    setIsDeleting(true)
    setDeleteError('')

    try {
      await onDelete(deleteTarget.id)
      setDeleteTarget(null)
    } catch (deleteRequestError) {
      setDeleteError(
        deleteRequestError?.message || 'Unable to delete this workspace.',
      )
    } finally {
      isDeletingRef.current = false
      setIsDeleting(false)
    }
  }

  return (
    <aside
      aria-labelledby="workspaces-heading"
      className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:self-start"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="workspaces-heading" className="text-lg font-semibold text-slate-900">
          Workspaces
        </h2>
        <button
          type="button"
          onClick={openCreate}
          disabled={status !== 'ready' || isSaving}
          className={primaryButtonClass}
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          New
        </button>
      </div>

      <div className="mt-4">
        {status === 'loading' && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-500"
          >
            <LoaderCircle className="h-4 w-4 shrink-0 animate-spin" />
            Loading workspaces…
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <FormAlert
              message={error?.message || 'Unable to load your workspaces.'}
            />
            <button type="button" onClick={onRetry} className={secondaryButtonClass}>
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && workspaces.length === 0 && (
          <EmptyState
            compact
            icon={FolderOpen}
            title="No workspaces yet"
            description="Create one to start organizing projects."
          />
        )}

        {status === 'ready' && workspaces.length > 0 && (
          <ul className="space-y-1">
            {workspaces.map((workspace) => {
              const isSelected = workspace.id === selectedWorkspaceId
              const isDeleteTarget = deleteTarget?.id === workspace.id

              return (
                <li key={workspace.id}>
                  <div
                    className={`flex items-center gap-1 rounded-lg p-1 ${
                      isSelected ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(workspace.id)}
                      aria-pressed={isSelected}
                      title={workspace.name}
                      className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 ${
                        isSelected ? 'text-indigo-700' : 'text-slate-600'
                      }`}
                    >
                      <FolderKanban className="h-4 w-4 shrink-0" />
                      <span className="truncate">{workspace.name}</span>
                    </button>

                    {isSelected && (
                      <div className="flex shrink-0 items-center">
                        <button
                          type="button"
                          onClick={() => openRename(workspace)}
                          aria-label={`Rename ${workspace.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors duration-150 hover:bg-white hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(workspace)}
                          aria-label={`Delete ${workspace.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 transition-colors duration-150 hover:bg-white hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/25"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isDeleteTarget && (
                    <div
                      role="group"
                      aria-label="Confirm workspace deletion"
                      className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3"
                    >
                      <p className="break-words text-sm font-medium text-red-800">
                        Delete “{workspace.name}”?
                      </p>
                      <p className="mt-1 text-xs text-red-700">
                        All projects and tasks in this workspace will be
                        permanently deleted. This cannot be undone.
                      </p>
                      <FormAlert message={deleteError} />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={cancelDelete}
                          disabled={isDeleting}
                          className={secondaryButtonClass}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={confirmDelete}
                          disabled={isDeleting}
                          aria-busy={isDeleting}
                          className={dangerButtonClass}
                        >
                          {isDeleting ? 'Deleting…' : 'Delete workspace'}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {editor && (
        <form
          onSubmit={handleSave}
          noValidate
          className="mt-4 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
        >
          <p className="text-sm font-semibold text-slate-900">
            {editor.mode === 'create' ? 'New workspace' : 'Rename workspace'}
          </p>
          <FormAlert message={formError} />
          <Input
            label="Name"
            id="workspace-name"
            name="workspaceName"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Workspace name"
            autoComplete="off"
            error={errors.name}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={closeEditor}
              disabled={isSaving}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              aria-busy={isSaving}
              className={primaryButtonClass}
            >
              {isSaving
                ? 'Saving…'
                : editor.mode === 'create'
                  ? 'Create workspace'
                  : 'Save name'}
            </button>
          </div>
        </form>
      )}
    </aside>
  )
}

export default WorkspaceSidebar
