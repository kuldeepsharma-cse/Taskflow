import { Router } from 'express'
import { getPrisma } from '../db/prisma.js'
import requireAuth from '../middleware/requireAuth.js'
import { getOwnedWorkspace } from '../utils/ownership.js'
import { projectSelect, workspaceSelect } from '../utils/selects.js'
import {
  parseId,
  validateProjectCreateInput,
  validateWorkspaceInput,
} from '../utils/validation.js'

const router = Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  const prisma = getPrisma()
  const workspaces = await prisma.workspace.findMany({
    where: { ownerId: req.user.id },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: workspaceSelect,
  })

  res.json({ data: workspaces })
})

router.post('/', async (req, res) => {
  const { name } = validateWorkspaceInput(req.body)
  const prisma = getPrisma()
  const workspace = await prisma.workspace.create({
    data: { name, ownerId: req.user.id },
    select: workspaceSelect,
  })

  res.status(201).json({ data: workspace })
})

router.get('/:workspaceId/projects', async (req, res) => {
  const workspaceId = parseId(req.params.workspaceId)

  await getOwnedWorkspace(workspaceId, req.user.id)

  const prisma = getPrisma()
  const projects = await prisma.project.findMany({
    where: { workspaceId },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: projectSelect,
  })

  res.json({ data: projects })
})

router.post('/:workspaceId/projects', async (req, res) => {
  const workspaceId = parseId(req.params.workspaceId)

  await getOwnedWorkspace(workspaceId, req.user.id)

  const { name, description } = validateProjectCreateInput(req.body)
  const prisma = getPrisma()
  const project = await prisma.project.create({
    data: { name, description, workspaceId },
    select: projectSelect,
  })

  res.status(201).json({ data: project })
})

router.get('/:workspaceId', async (req, res) => {
  const workspaceId = parseId(req.params.workspaceId)
  const workspace = await getOwnedWorkspace(workspaceId, req.user.id)

  res.json({ data: workspace })
})

router.patch('/:workspaceId', async (req, res) => {
  const workspaceId = parseId(req.params.workspaceId)

  await getOwnedWorkspace(workspaceId, req.user.id)

  const { name } = validateWorkspaceInput(req.body)
  const prisma = getPrisma()
  const workspace = await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name },
    select: workspaceSelect,
  })

  res.json({ data: workspace })
})

router.delete('/:workspaceId', async (req, res) => {
  const workspaceId = parseId(req.params.workspaceId)

  await getOwnedWorkspace(workspaceId, req.user.id)

  const prisma = getPrisma()
  await prisma.workspace.delete({ where: { id: workspaceId } })

  res.status(204).end()
})

export default router
