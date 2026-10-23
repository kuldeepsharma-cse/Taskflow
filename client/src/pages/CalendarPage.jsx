import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { listTasksInRange } from '../services/tasks.js'
import {
  WEEKDAYS,
  addMonths,
  buildMonthGrid,
  getCalendarRange,
  getMonthKey,
  getMonthLabel,
  getTasksForDate,
  isOverdueTask,
  parseDateKey,
  getTodayKey,
  parseMonthKey,
} from '../utils/calendar.js'

function CalendarPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const todayKey = getTodayKey()
  const monthParam = searchParams.get('month') || getMonthKey(new Date())
  const monthKey = parseMonthKey(monthParam) || getMonthKey(new Date())
  const dateParam = parseDateKey(searchParams.get('date') || '') || todayKey
  const monthLabel = useMemo(() => getMonthLabel(new Date(`${monthKey}-01T00:00:00.000Z`)), [monthKey])
  const grid = useMemo(() => buildMonthGrid(monthKey), [monthKey])
  const range = useMemo(() => getCalendarRange(monthKey), [monthKey])
  const [tasks, setTasks] = useState([])
  const [meta, setMeta] = useState({ undatedCount: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryToken, setRetryToken] = useState(0)

  const selectedTasks = useMemo(
    () => getTasksForDate(tasks, dateParam),
    [tasks, dateParam],
  )

  useEffect(() => {
    let isStale = false
    setError(null)
    setIsLoading(true)

    listTasksInRange(range)
      .then((response) => {
        if (isStale) {
          return
        }

        setTasks(response.data)
        setMeta(response.meta)
      })
      .catch(() => {
        if (isStale) {
          return
        }

        setError('Could not load calendar tasks. Please try again.')
      })
      .finally(() => {
        if (!isStale) {
          setIsLoading(false)
        }
      })

    return () => {
      isStale = true
    }
  }, [range, retryToken])

  function updateParams({ month, date }) {
    const next = new URLSearchParams(searchParams)

    if (month) {
      next.set('month', month)
    }

    if (date) {
      next.set('date', date)
    }

    setSearchParams(next)
  }

  function handleMonthChange(delta) {
    const nextMonth = addMonths(monthKey, delta)
    updateParams({ month: nextMonth })
  }

  function handleToday() {
    updateParams({ month: getMonthKey(new Date()), date: todayKey })
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Calendar
          </h1>
          <p className="text-sm text-slate-500">
            Read-only deadlines across all workspaces.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleMonthChange(-1)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleToday}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleMonthChange(1)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <span className="text-base font-semibold text-slate-900">{monthLabel}</span>
        <span className="text-sm text-slate-500">
          {meta.undatedCount} tasks without due dates
        </span>
      </div>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-slate-500">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading calendar
        </div>
      ) : error ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-medium text-slate-900">{error}</p>
          <button
            type="button"
            onClick={() => setRetryToken((token) => token + 1)}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-1 sm:grid-cols-7">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium uppercase text-slate-500"
              >
                {day}
              </div>
            ))}
            {grid.map((cell) => {
              const dayTasks = getTasksForDate(tasks, cell.dateKey)
              const visibleTasks = dayTasks.slice(0, 2)
              const overflowCount = dayTasks.length - visibleTasks.length

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  onClick={() => updateParams({ date: cell.dateKey })}
                  className={
                    `min-h-20 rounded-lg border p-2 text-left text-xs transition-colors ` +
                    (cell.dateKey === dateParam
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-dashed border-slate-200 bg-white hover:bg-slate-50')
                  }
                >
                  <span
                    className={
                      cell.isOutsideMonth ? 'text-slate-400' : 'text-slate-600'
                    }
                  >
                    {cell.date.getUTCDate()}
                  </span>
                  {visibleTasks.length > 0 ? (
                    <span className="mt-1 flex flex-col items-start gap-0.5">
                      {visibleTasks.map((task) => {
                        const done = task.status === 'DONE'
                        const overdue = isOverdueTask(task, todayKey)

                        return (
                          <span
                            key={task.id}
                            aria-label={
                              done
                                ? `Completed: ${task.title}`
                                : overdue
                                  ? `Overdue: ${task.title}`
                                  : task.title
                            }
                            className={
                              'w-full truncate rounded px-1 py-0.5 text-[10px] font-medium ' +
                              (done
                                ? 'bg-slate-100 text-slate-400 line-through'
                                : overdue
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-indigo-50 text-indigo-700')
                            }
                          >
                            {task.title}
                          </span>
                        )
                      })}
                      {overflowCount > 0 ? (
                        <span className="text-[10px] text-slate-500">
                          +{overflowCount} more
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {dateParam ? dateParam : 'No date selected'}
            </h2>
            {selectedTasks.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">
                No tasks due on this day.
              </p>
            ) : (
              selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className="mt-3 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-3"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {task.title}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{task.dueDate}</span>
                    <span>{task.status}</span>
                    <span>{task.priority}</span>
                    {isOverdueTask(task, todayKey) ? (
                      <span className="rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600">
                        Overdue
                      </span>
                    ) : null}
                    {task.status === 'DONE' ? (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-500">
                        Completed
                      </span>
                    ) : null}
                    <span>{task.project?.name}</span>
                    <span>{task.project?.workspace?.name}</span>
                  </div>
                  {task.description ? (
                    <p className="text-xs text-slate-600">{task.description}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CalendarPage
