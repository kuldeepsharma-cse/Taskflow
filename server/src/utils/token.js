import jwt from 'jsonwebtoken'
import AppError from './AppError.js'

const DEFAULT_EXPIRES_IN = '7d'
const MIN_SECRET_LENGTH = 32

function getJwtSecret() {
  const secret = process.env.JWT_SECRET

  if (typeof secret !== 'string' || secret.length < MIN_SECRET_LENGTH) {
    throw new AppError(
      500,
      'SERVER_MISCONFIGURED',
      'Server authentication is not configured',
    )
  }

  return secret
}

export function signToken(userId) {
  return jwt.sign({ sub: String(userId) }, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN,
  })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] })
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token')
  }
}
