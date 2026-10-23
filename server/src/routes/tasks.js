import { Router } from 'express'
import { getPrisma } from '../db/prisma.js'
import requireAuth from '../middleware/requireAuth.js'
import {
  assertValidAssignee,
  getOwnedTask,
} from '../utils/ownership.js'
import {
  calendarTaskSelect,
  serializeTask,
  taskSelect,
} from '../utils/selects.js'
import {
  parseId,
  validateCalendarRangeInput,
  validateTaskUpdateInput,
} from '../utils/validation.js'

const router = Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  const range = validateCalendarRangeInput(req.query)
  const prisma = getPrisma()
  const ownerWhere = {
    project: { workspace: { ownerId: req.user.id } },
  }
  const [tasks, undatedCount] = await Promise.all([
    prisma.task.findMany({
      where: {
        ...ownerWhere,
        dueDate: { gte: range.fromDate, lte: range.toDate },
      },
      orderBy: [{ dueDate: 'asc' }, { id: 'asc' }],
      select: calendarTaskSelect,
    }),
    prisma.task.count({
      where: { ...ownerWhere, dueDate: null },
    }),
  ])

  res.json({
    data: tasks.map(serializeTask),
    meta: { undatedCount: undatedCount },
  })
})

router.patch('/:taskId', async (req, res) => {
  const taskId = parseId(req.params.taskId)

  await getOwnedTask(taskId, req.user.id)

  const data = validateTaskUpdateInput(req.body)

  if (Object.prototype.hasOwnProperty.call(data, 'assigneeId')) {
    assertValidAssignee(data.assigneeId, req.user.id)
  }

  const prisma = getPrisma()
  const task = await prisma.task.update({
    where: { id: taskId },
    data,
    select: taskSelect,
  })

  res.json({ data: serializeTask(task) })
})

router.delete('/:taskId', async (req, res) => {
  const taskId = parseId(req.params.taskId)

  await getOwnedTask(taskId, req.user.id)

  const prisma = getPrisma()
  await prisma.task.delete({ where: { id: taskId } })

  res.status(204).end()
})

export default router
