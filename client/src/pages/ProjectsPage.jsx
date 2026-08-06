import { FolderKanban } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'

function ProjectsPage() {
  return (
    <EmptyState
      icon={FolderKanban}
      title="Projects Coming Soon"
      description="Create and manage projects inside your workspaces. This feature will be implemented in a later phase."
    />
  )
}

export default ProjectsPage
