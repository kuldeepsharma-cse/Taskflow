import { useRef, useState } from 'react'
import FormAlert from './FormAlert.jsx'
import Input from './Input.jsx'
import {
  isValidEmail,
  mapFieldErrors,
  validateName,
} from '../utils/validate.js'

const MAX_EMAIL_LENGTH = 254
const fieldNames = ['name', 'email', 'currentPassword']

function ProfileForm({ user, onSubmit }) {
  const originalEmail = user?.email || ''
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const emailChanged =
    email.trim().toLowerCase() !== originalEmail.trim().toLowerCase()

  function handleChange(field, value) {
    if (field === 'name') {
      setName(value)
    } else if (field === 'email') {
      setEmail(value)

      if (value.trim().toLowerCase() === originalEmail.trim().toLowerCase()) {
        setCurrentPassword('')
      }
    } else {
      setCurrentPassword(value)
    }

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

    setFormError('')
    setSuccess('')
  }

  function validate() {
    const nextErrors = {}
    const nameError = validateName(name)
    const trimmedEmail = email.trim()

    if (nameError) {
      nextErrors.name = nameError
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Email is required'
    } else if (
      trimmedEmail.length > MAX_EMAIL_LENGTH ||
      !isValidEmail(trimmedEmail)
    ) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (emailChanged && !currentPassword) {
      nextErrors.currentPassword =
        'Current password is required to change your email'
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
    setSuccess('')

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        ...(emailChanged ? { currentPassword } : {}),
      })
      setCurrentPassword('')
      setSuccess('Profile updated.')
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
        setFormError(submitError?.message || 'Unable to update your profile.')
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
      <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
      <p className="mt-1 text-sm text-slate-500">
        Update your account details. Changing your email requires your current
        password.
      </p>

      <div className="mt-4 space-y-4">
        <FormAlert message={formError} />

        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        <Input
          label="Name"
          id="profile-name"
          name="profileName"
          value={name}
          onChange={(event) => handleChange('name', event.target.value)}
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          id="profile-email"
          name="profileEmail"
          value={email}
          onChange={(event) => handleChange('email', event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />

        {emailChanged && (
          <>
            <Input
              label="Current password"
              type="password"
              id="profile-current-password"
              name="profileCurrentPassword"
              value={currentPassword}
              onChange={(event) =>
                handleChange('currentPassword', event.target.value)
              }
              placeholder="Enter your current password"
              autoComplete="current-password"
              error={errors.currentPassword}
            />
            <p className="text-xs text-slate-500">
              Required to confirm your email change.
            </p>
          </>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : 'Save profile'}
        </button>
      </div>
    </form>
  )
}

export default ProfileForm
