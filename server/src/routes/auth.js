import { Router } from 'express'
import { getPrisma } from '../db/prisma.js'
import AppError from '../utils/AppError.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { publicUserSelect } from '../utils/selects.js'
import { signToken } from '../utils/token.js'
import { validateLoginInput, validateRegisterInput } from '../utils/validation.js'

const router = Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = validateRegisterInput(req.body)
  const prisma = getPrisma()

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (existingUser) {
    throw new AppError(
      409,
      'EMAIL_IN_USE',
      'An account with this email already exists',
    )
  }

  const passwordHash = await hashPassword(password)

  let user

  try {
    user = await prisma.user.create({
      data: { name, email, passwordHash },
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

  res.status(201).json({
    data: {
      token: signToken(user.id),
      user,
    },
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = validateLoginInput(req.body)
  const prisma = getPrisma()

  const user = await prisma.user.findUnique({
    where: { email },
    select: { ...publicUserSelect, passwordHash: true },
  })

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new AppError(
      401,
      'INVALID_CREDENTIALS',
      'Invalid email or password',
    )
  }

  const safeUser = { ...user }
  delete safeUser.passwordHash

  res.json({
    data: {
      token: signToken(safeUser.id),
      user: safeUser,
    },
  })
})

export default router
