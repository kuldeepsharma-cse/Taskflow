import { useRef, useState } from 'react'
import FormAlert from './FormAlert.jsx'
import Input from './Input.jsx'
import { mapFieldErrors } from '../utils/validate.js'

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_BYTES = 72
const fieldNames = ['currentPassword', 'newPassword']

function passwordByteLength(value) {
  return new TextEncoder().encode(value).length
}

function PasswordForm({ onSubmit, onPasswordChanged }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)

  function handleChange(field, value) {
    if (field === 'currentPassword') {
      setCurrentPassword(value)
    } else if (field === 'newPassword') {
      setNewPassword(value)
    } else {
      setConfirmPassword(value)
    }

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

    setFormError('')
  }

  function validate() {
    const nextErrors = {}

    if (!currentPassword) {
      nextErrors.currentPassword = 'Current password is required'
    }

    if (!newPassword) {
      nextErrors.newPassword = 'New password is required'
    } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
      nextErrors.newPassword = `New password must be at least ${MIN_PASSWORD_LENGTH} characters`
    } else if (passwordByteLength(newPassword) > MAX_PASSWORD_BYTES) {
      nextErrors.newPassword = 'New password is too long'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your new password'
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
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
    let passwordChanged = false

    try {
      await onSubmit({ currentPassword, newPassword })
      passwordChanged = true
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
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
        setFormError(submitError?.message || 'Unable to change your password.')
      }
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }

    if (passwordChanged) {
      onPasswordChanged()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Password</h2>
      <p className="mt-1 text-sm text-slate-500">
        Choose a new password. You will be signed out after changing it.
      </p>

      <div className="mt-4 space-y-4">
        <FormAlert message={formError} />
        <Input
          label="Current password"
          type="password"
          id="password-current"
          name="passwordCurrent"
          value={currentPassword}
          onChange={(event) =>
            handleChange('currentPassword', event.target.value)
          }
          placeholder="Enter your current password"
          autoComplete="current-password"
          error={errors.currentPassword}
        />
        <Input
          label="New password"
          type="password"
          id="password-new"
          name="passwordNew"
          value={newPassword}
          onChange={(event) => handleChange('newPassword', event.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          error={errors.newPassword}
        />
        <Input
          label="Confirm new password"
          type="password"
          id="password-confirm"
          name="passwordConfirm"
          value={confirmPassword}
          onChange={(event) =>
            handleChange('confirmPassword', event.target.value)
          }
          placeholder="Repeat your new password"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Changing…' : 'Change password'}
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
