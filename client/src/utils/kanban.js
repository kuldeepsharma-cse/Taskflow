// Kanban workflow helpers - pure functions, no React, no side effects.
// The column order and API status mapping are the single source of truth
// for how tasks flow between the board and the backend.

export const COLUMN_ORDER = ['todo', 'in-progress', 'done']

const COLUMN_STATUS = {
  todo: 'TODO',
  'in-progress': 'IN_PROGRESS',
  done: 'DONE',
}

const BOARD_COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    emptyTitle: 'Nothing to do yet',
    emptyDescription: 'New tasks will land here.',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    emptyTitle: 'Nothing in progress',
    emptyDescription: 'Tasks being worked on will move here.',
  },
  {
    id: 'done',
    title: 'Done',
    emptyTitle: 'Nothing completed yet',
    emptyDescription: 'Finished tasks will show up here.',
  },
]

// Returns the adjacent column id in the given direction, or null at the
// board edges (To Do has no backward column, Done has no forward column).
export function getAdjacentColumnId(columnId, direction) {
  const index = COLUMN_ORDER.indexOf(columnId)
  const nextIndex = index + (direction === 'forward' ? 1 : -1)
  return nextIndex >= 0 && nextIndex < COLUMN_ORDER.length
    ? COLUMN_ORDER[nextIndex]
    : null
}

// Converts a board column id to the API status stored by the backend.
export function getStatusForColumn(columnId) {
  return COLUMN_STATUS[columnId] || null
}

// Builds the three board lanes from the flat, API-ordered task list.
// Task order is preserved, so the board matches the server's oldest-first
// ordering after every refresh.
export function buildBoardColumns(tasks = []) {
  return BOARD_COLUMNS.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === COLUMN_STATUS[column.id]),
  }))
}
