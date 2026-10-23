import { Router } from 'express'
import { getPrisma } from '../db/prisma.js'
import requireAuth from '../middleware/requireAuth.js'
import AppError from '../utils/AppError.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { publicUserSelect } from '../utils/selects.js'
import {
  validatePasswordChangeInput,
  validateProfileUpdateInput,
} from '../utils/validation.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: publicUserSelect,
  })

  if (!user) {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentication required')
  }

  res.json({ data: user })
})

router.patch('/', requireAuth, async (req, res) => {
  const { data, currentPassword } = validateProfileUpdateInput(req.body)
  const prisma = getPrisma()

  const currentUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { ...publicUserSelect, passwordHash: true },
  })

  if (!currentUser) {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentication required')
  }

  const emailChanged =
    data.email !== undefined && data.email !== currentUser.email

  if (emailChanged) {
    if (!currentPassword) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', [
        {
          field: 'currentPassword',
          message: 'Current password is required to change your email',
        },
      ])
    }

    if (!(await verifyPassword(currentPassword, currentUser.passwordHash))) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', [
        {
          field: 'currentPassword',
          message: 'Current password is incorrect',
        },
      ])
    }
  }

  let user

  try {
    user = await prisma.user.update({
      where: { id: currentUser.id },
      data,
      select: publicUserSelect,
    })
  } catch (error) {
    if (error && error.code === 'P2002') {
      throw new AppError(
        409,
        'EMAIL_IN_USE',
        'An account with this email already exists',
      )
    }

    throw error
  }

  res.json({ data: user })
})

router.patch('/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = validatePasswordChangeInput(req.body)
  const prisma = getPrisma()

  const currentUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, passwordHash: true },
  })

  if (!currentUser) {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentication required')
  }

  if (!(await verifyPassword(currentPassword, currentUser.passwordHash))) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', [
      {
        field: 'currentPassword',
        message: 'Current password is incorrect',
      },
    ])
  }

  const passwordHash = await hashPassword(newPassword)

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { passwordHash },
    select: publicUserSelect,
  })

  res.json({ data: user })
})

export default router
