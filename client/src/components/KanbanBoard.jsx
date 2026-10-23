import KanbanColumn from './KanbanColumn.jsx'

// Reusable Kanban board - renders one KanbanColumn per entry in the
// columns array (same data-driven recipe as Features / StatCard).
// Below md the columns keep their fixed width and the row scrolls
// horizontally instead of stacking - design system §18.
// onMoveTask is a callback passed straight through to the columns -
// the board itself owns no state.
function KanbanBoard({
  columns,
  onMoveTask,
  onEditTask,
  onDeleteTask,
  pendingMove,
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          columns={columns}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          pendingMove={pendingMove}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
