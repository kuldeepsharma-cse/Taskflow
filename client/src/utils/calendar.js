export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function pad(value) {
  return String(value).padStart(2, '0')
}

export function formatDateKey(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
}

function isSameMonth(date, reference) {
  return (
    date.getUTCFullYear() === reference.getUTCFullYear() &&
    date.getUTCMonth() === reference.getUTCMonth()
  )
}

export function getMonthLabel(date) {
  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export function getMonthKey(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}`
}

const MONTH_KEY_PATTERN = /^\d{4}-\d{2}$/

export function parseMonthKey(value) {
  if (!MONTH_KEY_PATTERN.test(value)) {
    return null
  }

  const [year, month] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, 1))

  return date.getUTCMonth() === month - 1 ? value : null
}

export function addMonths(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, 1))
  date.setUTCMonth(date.getUTCMonth() + delta)

  return getMonthKey(date)
}

function getMonthStart(monthKey) {
  const [year, month] = monthKey.split('-')
  return new Date(Date.UTC(Number(year), Number(month) - 1, 1))
}

function getWeekdayFromMonday(date) {
  return date.getUTCDay() === 0 ? 7 : date.getUTCDay()
}

export function buildMonthGrid(monthKey) {
  const monthStart = getMonthStart(monthKey)
  const weekdayIndex = getWeekdayFromMonday(monthStart) - 1
  const gridStart = new Date(monthStart)
  gridStart.setUTCDate(monthStart.getUTCDate() - weekdayIndex)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setUTCDate(gridStart.getUTCDate() + index)

    return {
      date,
      dateKey: formatDateKey(date),
      isOutsideMonth: !isSameMonth(date, monthStart),
    }
  })
}

export function getCalendarRange(monthKey) {
  const grid = buildMonthGrid(monthKey)
  return {
    from: grid[0].dateKey,
    to: grid[grid.length - 1].dateKey,
  }
}

export function getTodayKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateKey(value) {
  if (!DATE_KEY_PATTERN.test(value)) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return formatDateKey(date)
}

export function isCurrentMonth(monthKey, date = new Date()) {
  return monthKey === getMonthKey(date)
}

export function isOutsideMonth(date, monthKey) {
  return !isSameMonth(date, getMonthStart(monthKey))
}

export function isDateKeyWithinGrid(dateKey, monthKey) {
  const grid = buildMonthGrid(monthKey)
  return grid.some((cell) => cell.dateKey === dateKey)
}

export function groupTasksByDate(tasks = []) {
  return tasks.reduce((groups, task) => {
    const dateKey = task.dueDate

    if (!dateKey) {
      return groups
    }

    if (!Object.prototype.hasOwnProperty.call(groups, dateKey)) {
      groups[dateKey] = []
    }

    groups[dateKey].push(task)
    return groups
  }, {})
}

export function getTasksForDate(tasks = [], dateKey) {
  const grouped = groupTasksByDate(tasks)
  return grouped[dateKey] ?? []
}

export function isOverdueTask(task, todayKey = getTodayKey()) {
  if (!task?.dueDate || task.status === 'DONE') {
    return false
  }

  return task.dueDate < todayKey
}

export function countUndatedTasks(tasks = []) {
  return tasks.filter((task) => !task.dueDate).length
}
