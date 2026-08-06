import { Settings } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'

function SettingsPage() {
  return (
    <EmptyState
      icon={Settings}
      title="Settings Coming Soon"
      description="Manage your account and workspace preferences. This feature will be implemented in a later phase."
    />
  )
}

export default SettingsPage
