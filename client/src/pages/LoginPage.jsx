import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import AuthLayout from '../layouts/AuthLayout.jsx'
import FormAlert from '../components/FormAlert.jsx'
import Input from '../components/Input.jsx'
import { useAuth } from '../context/authContext.js'
import { getAuthRedirectPath } from '../utils/authRedirect.js'
import { isValidEmail, mapFieldErrors } from '../utils/validate.js'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  function handleChange(field, value) {
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    if (formError) {
      setFormError('')
    }
  }

  function validate() {
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (isSubmitting || !validate()) {
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      await login({ email, password })
      navigate(getAuthRedirectPath(location.state), { replace: true })
    } catch (error) {
      const fieldErrors = mapFieldErrors(error.details)

      if (Object.keys(fieldErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }))
      } else {
        setFormError(error.message || 'Unable to log in. Please try again.')
      }

      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormAlert message={formError} />

        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-700">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
