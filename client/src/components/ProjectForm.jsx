import { useRef, useState } from 'react'
import FormAlert from './FormAlert.jsx'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import {
  mapFieldErrors,
  validateDescription,
  validateName,
} from '../utils/validate.js'

function ProjectForm({ mode, project, onSubmit, onCancel }) {
  const [name, setName] = useState(project?.name || '')
  const [description, setDescription] = useState(project?.description || '')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)

  function handleChange(field, value) {
    if (field === 'name') {
      setName(value)
    } else {
      setDescription(value)
    }

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

    setFormError('')
  }

  function validate() {
    const nextErrors = {}
    const nameError = validateName(name)
    const descriptionError = validateDescription(description)

    if (nameError) {
      nextErrors.name = nameError
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
        name: name.trim(),
        description: description.trim() || null,
      })
    } catch (submitError) {
      const fieldErrors = mapFieldErrors(submitError?.details)

      if (fieldErrors.name || fieldErrors.description) {
        setErrors((current) => ({
          ...current,
          name: fieldErrors.name,
          description: fieldErrors.description,
        }))
      } else {
        setFormError(submitError?.message || 'Unable to save this project.')
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
      <h3 className="text-lg font-semibold text-slate-900">
        {mode === 'edit' ? 'Edit project' : 'New project'}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {mode === 'edit'
          ? 'Update the project name or description.'
          : 'Add a project to the selected workspace.'}
      </p>

      <div className="mt-4 space-y-4">
        <FormAlert message={formError} />
        <Input
          label="Name"
          id="project-name"
          name="projectName"
          value={name}
          onChange={(event) => handleChange('name', event.target.value)}
          placeholder="Project name"
          autoComplete="off"
          error={errors.name}
        />
        <Textarea
          label="Description"
          id="project-description"
          name="projectDescription"
          value={description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="What is this project about?"
          error={errors.description}
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
              : 'Create project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
