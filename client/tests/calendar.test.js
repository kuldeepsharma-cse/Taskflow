import assert from 'node:assert/strict'
import test from 'node:test'
import {
  WEEKDAYS,
  buildMonthGrid,
  groupTasksByDate,
  isOverdueTask,
  parseDateKey,
  getTasksForDate,
} from '../src/utils/calendar.js'

test('builds a Monday-first 42-cell calendar grid', () => {
  const grid = buildMonthGrid('2027-01')
  assert.equal(grid.length, 42)
  assert.equal(WEEKDAYS.length, 7)

  const mondayIndexes = grid
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell }) => cell.date.getUTCDay() === 1)

  assert.ok(mondayIndexes.length > 0)
  assert.equal(
    mondayIndexes.every(
      ({ cell }) => WEEKDAYS.includes(WEEKDAYS[cell.date.getUTCDay() - 1]),
    ),
    true,
  )
  assert.equal(
    mondayIndexes.every(
      ({ index }, position) => position === 0 || index - mondayIndexes[position - 1].index === 7,
    ),
    true,
  )
})

test('groups tasks by exact date key', () => {
  const grouped = groupTasksByDate([
    { id: 1, dueDate: '2027-01-05' },
    { id: 2, dueDate: '2027-01-10' },
    { id: 3, dueDate: null },
  ])

  assert.deepEqual(Object.keys(grouped).sort(), ['2027-01-05', '2027-01-10'])
  assert.equal(grouped['2027-01-05'].length, 1)
  assert.equal(grouped['2027-01-10'].length, 1)
  assert.equal(Object.hasOwn(grouped, 'null'), false)
  assert.equal(getTasksForDate(Object.values(grouped).flat(), '2027-01-05').length, 1)
})

test('rejects invalid date keys', () => {
  assert.equal(parseDateKey('2027-02-30'), null)
  assert.equal(parseDateKey('2027-1-1'), null)
  assert.equal(parseDateKey('not-a-date'), null)
  assert.equal(parseDateKey('2027-01-05'), '2027-01-05')
})

test('marks non-done tasks with a past due date as overdue', () => {
  assert.equal(isOverdueTask({ dueDate: '2026-01-01', status: 'TODO' }, '2026-06-01'), true)
  assert.equal(isOverdueTask({ dueDate: '2026-01-01', status: 'IN_PROGRESS' }, '2026-06-01'), true)
  assert.equal(isOverdueTask({ dueDate: '2026-01-01', status: 'DONE' }, '2026-06-01'), false)
  assert.equal(isOverdueTask({ dueDate: '2027-01-01', status: 'TODO' }, '2026-06-01'), false)
  assert.equal(isOverdueTask({ dueDate: null, status: 'TODO' }, '2026-06-01'), false)
  assert.equal(isOverdueTask(null, '2026-06-01'), false)
})
