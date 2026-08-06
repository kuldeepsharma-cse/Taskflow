import { Calendar } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'

function CalendarPage() {
  return (
    <EmptyState
      icon={Calendar}
      title="Calendar Coming Soon"
      description="View your tasks and deadlines on a calendar. This feature will be implemented in a later phase."
    />
  )
}

export default CalendarPage
