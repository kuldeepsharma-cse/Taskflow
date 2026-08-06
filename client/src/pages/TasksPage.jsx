import { ListTodo } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'

function TasksPage() {
  return (
    <EmptyState
      icon={ListTodo}
      title="Tasks Coming Soon"
      description="Create and track tasks across your projects. This feature will be implemented in a later phase."
    />
  )
}

export default TasksPage
