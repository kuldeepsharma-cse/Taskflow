import { useRef, useState } from 'react'
import FormAlert from './FormAlert.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'
import Textarea from './Textarea.jsx'
import {
  mapFieldErrors,
  validateDescription,
  validateTaskTitle,
} from '../utils/validate.js'

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

const fieldNames = ['title', 'description', 'priority', 'dueDate', 'assigneeId']

function TaskForm({ mode, task, currentUser, onSubmit, onCancel }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState(task?.priority || 'MEDIUM')
  const [dueDate, setDueDate] = useState(task?.dueDate || '')
  const [assigneeId, setAssigneeId] = useState(
    task?.assigneeId && currentUser?.id === task.assigneeId
      ? String(task.assigneeId)
      : '',
  )
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)

  const assigneeOptions = [{ value: '', label: 'Unassigned' }]

  if (currentUser) {
    assigneeOptions.push({
      value: String(currentUser.id),
      label: currentUser.name,
    })
  }

  function handleChange(field, value) {
    if (field === 'title') {
      setTitle(value)
    } else if (field === 'description') {
      setDescription(value)
    } else if (field === 'priority') {
      setPriority(value)
    } else if (field === 'dueDate') {
      setDueDate(value)
    } else {
      setAssigneeId(value)
    }

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

    setFormError('')
  }

  function validate() {
    const nextErrors = {}
    const titleError = validateTaskTitle(title)
    const descriptionError = validateDescription(description)

    if (titleError) {
      nextErrors.title = titleError
    }

    if (descriptionError) {
      nextErrors.description = descriptionError
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmittingRef.current || !validate()) {
      return
    }

    isSubmittingRef.current = true
    setIsSubmitting(true)
    setFormError('')

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        priority,
        dueDate: dueDate || null,
        assigneeId: assigneeId ? Number(assigneeId) : null,
      })
    } catch (submitError) {
      const fieldErrors = mapFieldErrors(submitError?.details)
      const nextFieldErrors = {}

      fieldNames.forEach((field) => {
        if (fieldErrors[field]) {
          nextFieldErrors[field] = fieldErrors[field]
        }
      })

      if (Object.keys(nextFieldErrors).length > 0) {
        setErrors((current) => ({ ...current, ...nextFieldErrors }))
      } else {
        setFormError(submitError?.message || 'Unable to save this task.')
      }
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {mode === 'edit' ? 'Edit task' : 'New task'}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {mode === 'edit'
          ? 'Update the task details. Use the board buttons to change status.'
          : 'Add a task to the selected project. New tasks start in To Do.'}
      </p>

      <div className="mt-4 space-y-4">
        <FormAlert message={formError} />
        <Input
          label="Title"
          id="task-title"
          name="taskTitle"
          value={title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="Task title"
          autoComplete="off"
          error={errors.title}
        />
        <Textarea
          label="Description"
          id="task-description"
          name="taskDescription"
          value={description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="What needs to be done?"
          error={errors.description}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Priority"
            id="task-priority"
            name="taskPriority"
            value={priority}
            onChange={(event) => handleChange('priority', event.target.value)}
            options={priorityOptions}
            error={errors.priority}
          />
          <Input
            label="Due date"
            id="task-due-date"
            name="taskDueDate"
            type="date"
            value={dueDate}
            onChange={(event) => handleChange('dueDate', event.target.value)}
            error={errors.dueDate}
          />
        </div>
        <Select
          label="Assignee"
          id="task-assignee"
          name="taskAssignee"
          value={assigneeId}
          onChange={(event) => handleChange('assigneeId', event.target.value)}
          options={assigneeOptions}
          error={errors.assigneeId}
        />
      </div>

      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? 'Saving…'
            : mode === 'edit'
              ? 'Save changes'
              : 'Create task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
