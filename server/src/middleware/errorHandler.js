import AppError from '../utils/AppError.js'

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const error = err || {}

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON body',
      },
    })
  }

  if (error.code === 'P2002') {
    return res.status(409).json({
      error: {
        code: 'EMAIL_IN_USE',
        message: 'An account with this email already exists',
      },
    })
  }

  const statusCode = error.statusCode || error.status || 500
  const isServerError = statusCode >= 500

  if (isServerError) {
    const name = error.name || 'Error'
    const code = error.code ? ` (${error.code})` : ''

    console.error(`[${req.method} ${req.path}] ${name}${code}`)

    if (error instanceof AppError) {
      console.error(error.message)
    }

    if (error.stack && process.env.NODE_ENV !== 'production') {
      const frames = error.stack.split('\n').slice(1).join('\n')
      console.error(frames)
    }
  }

  const payload = {
    code: isServerError ? 'INTERNAL_ERROR' : error.code || 'REQUEST_ERROR',
    message: isServerError
      ? 'Internal server error'
      : error.message || 'Request failed',
  }

  if (
    !isServerError &&
    Array.isArray(error.details) &&
    error.details.length > 0
  ) {
    payload.details = error.details
  }

  res.status(statusCode).json({ error: payload })
}

export default errorHandler
