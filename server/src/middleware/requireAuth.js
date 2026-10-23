import AppError from '../utils/AppError.js'
import { verifyToken } from '../utils/token.js'

const unauthorized = () =>
  new AppError(401, 'UNAUTHORIZED', 'Authentication required')

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return next(unauthorized())
  }

  const match = /^Bearer\s+(.+)$/i.exec(authorization)

  if (!match) {
    return next(unauthorized())
  }

  try {
    const payload = verifyToken(match[1].trim())

    if (typeof payload !== 'object' || payload === null) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token')
    }

    const userId = Number(payload.sub)

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token')
    }

    req.user = { id: userId }
    return next()
  } catch (error) {
    if (error instanceof AppError) {
      return next(error)
    }

    return next(unauthorized())
  }
}

export default requireAuth
