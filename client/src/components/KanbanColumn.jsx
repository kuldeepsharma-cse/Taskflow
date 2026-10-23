import { ListTodo } from 'lucide-react'
import EmptyState from './EmptyState.jsx'
import TaskCard from './TaskCard.jsx'
import { getAdjacentColumnId } from '../utils/kanban.js'

// Reusable Kanban column - one status lane on the board.
// Takes one column object { id, title, tasks } as a single prop.
// The header count is always derived from column.tasks.length -
// never stored separately, so it can never drift from the cards.
function KanbanColumn({
  column,
  columns,
  onMoveTask,
  onEditTask,
  onDeleteTask,
  pendingMove,
}) {
  // Compute this lane's movement actions from the board workflow
  // (utils/kanban.js). Edge columns only get one button (or none).
  // TaskCard stays fully presentational: it renders whatever it receives.
  const forwardId = getAdjacentColumnId(column.id, 'forward')
  const backwardId = getAdjacentColumnId(column.id, 'backward')
  const columnTitle = (id) => columns.find((column) => column.id === id).title

  // Short, direction-led labels: the icon already carries the meaning, so
  // the label only names the destination. Completing a task is special -
  // "Mark Done" stays a full phrase so it feels distinct from plain moves.
  // Each move also carries an icon name (back/forward/done) so TaskCard
  // never needs to know column rules.
  const moves = []
  if (backwardId) {
    moves.push({
      toId: backwardId,
      direction: 'back',
      icon: 'back',
      label: 'Back',
    })
  }
  if (forwardId) {
    moves.push({
      toId: forwardId,
      direction: 'forward',
      icon: forwardId === 'done' ? 'done' : 'forward',
      label: forwardId === 'done' ? 'Mark Done' : columnTitle(forwardId),
    })
  }

  return (
    // Lane surface: slate-100 per design system §4 ("kanban lanes").
    // Fixed width (w-72) + shrink-0 so columns never squeeze - the board
    // scrolls horizontally instead (see KanbanBoard). min-h-52 keeps
    // empty lanes visually balanced next to card columns.
    <section className="flex min-h-52 w-72 shrink-0 flex-col rounded-xl bg-slate-100">
      {/* Column header - title + task count pill; padding matches the card
          area (px-2.5) so the title aligns with the cards beneath it */}
      <header className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-2.5">
        <h2 className="text-sm font-medium text-slate-700">{column.title}</h2>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500">
          {column.tasks.length}
        </span>
      </header>

      {/* Card area - task cards when the column has tasks, otherwise the
          shared EmptyState with this column's contextual copy */}
      <div className="px-2.5 pb-2.5">
        {column.tasks.length === 0 ? (
          <EmptyState
            compact
            icon={ListTodo}
            title={column.emptyTitle}
            description={column.emptyDescription}
          />
        ) : (
          <div className="space-y-2.5">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={column.id}
                moves={moves}
                onMoveTask={onMoveTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                pendingMove={pendingMove}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default KanbanColumn
