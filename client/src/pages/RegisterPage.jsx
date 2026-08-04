import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Input from '../components/Input.jsx'
import { isValidEmail } from '../utils/validate.js'

function RegisterPage() {
  // Form state: field values + per-field error messages
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  // Programmatic navigation after a successful registration
  const navigate = useNavigate()

  // One shared change handler: updates the field value and clears its error as the user types
  function handleChange(field, value) {
    if (field === 'name') setName(value)
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)
    if (field === 'confirmPassword') setConfirmPassword(value)
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Runs on submit - collects every problem into an errors object
  function validate() {
    const newErrors = {}

    // Rule 1: name is required
    if (!name) {
      newErrors.name = 'Name is required'
    }

    // Rule 2: email is required
    if (!email) {
      newErrors.email = 'Email is required'
    }
    // Rule 3: email must look like a real address
    else if (!isValidEmail(email)) {
      newErrors.email = 'Enter a valid email address'
    }

    // Rule 4: password is required and must be at least 6 characters
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Rule 5: confirm password is required and must match the password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    // The form is valid only when no errors were collected
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) {
      // Form is valid - mock registration: remember the user and go to the dashboard
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout title="Create your account">
      {/* noValidate: our own validation handles errors, not the browser */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Name"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
        />
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
          placeholder="Create a password"
          autoComplete="new-password"
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirm-password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
        >
          Create Account
        </button>

        {/* Switch between the two auth pages */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-700">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
