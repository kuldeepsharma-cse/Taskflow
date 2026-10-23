import { Router } from 'express'
import { getPrisma } from '../db/prisma.js'
import requireAuth from '../middleware/requireAuth.js'
import {
  assertValidAssignee,
  getOwnedProject,
} from '../utils/ownership.js'
import {
  projectSelect,
  serializeTask,
  taskSelect,
} from '../utils/selects.js'
import {
  parseId,
  validateProjectUpdateInput,
  validateTaskCreateInput,
} from '../utils/validation.js'

const router = Router()

router.use(requireAuth)

router.get('/:projectId/tasks', async (req, res) => {
  const projectId = parseId(req.params.projectId)

  await getOwnedProject(projectId, req.user.id)

  const prisma = getPrisma()
  const tasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    select: taskSelect,
  })

  res.json({ data: tasks.map(serializeTask) })
})

router.post('/:projectId/tasks', async (req, res) => {
  const projectId = parseId(req.params.projectId)

  await getOwnedProject(projectId, req.user.id)

  const input = validateTaskCreateInput(req.body)

  assertValidAssignee(input.assigneeId, req.user.id)

  const prisma = getPrisma()
  const task = await prisma.task.create({
    data: { ...input, projectId },
    select: taskSelect,
  })

  res.status(201).json({ data: serializeTask(task) })
})

router.patch('/:projectId', async (req, res) => {
  const projectId = parseId(req.params.projectId)

  await getOwnedProject(projectId, req.user.id)

  const data = validateProjectUpdateInput(req.body)
  const prisma = getPrisma()
  const project = await prisma.project.update({
    where: { id: projectId },
    data,
    select: projectSelect,
  })

  res.json({ data: project })
})

router.delete('/:projectId', async (req, res) => {
  const projectId = parseId(req.params.projectId)

  await getOwnedProject(projectId, req.user.id)

  const prisma = getPrisma()
  await prisma.project.delete({ where: { id: projectId } })

  res.status(204).end()
})

export default router
