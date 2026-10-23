import { useNavigate } from 'react-router'
import PasswordForm from '../components/PasswordForm.jsx'
import ProfileForm from '../components/ProfileForm.jsx'
import { useAuth } from '../context/authContext.js'

function SettingsPage() {
  const navigate = useNavigate()
  const { user, updateProfile, changePassword, logout } = useAuth()

  function handlePasswordChanged() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile details and account password.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProfileForm user={user} onSubmit={updateProfile} />
        <PasswordForm
          onSubmit={changePassword}
          onPasswordChanged={handlePasswordChanged}
        />
      </div>
    </div>
  )
}

export default SettingsPage
