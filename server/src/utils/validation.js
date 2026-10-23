import AppError from './AppError.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_BYTES = 72
const MAX_TITLE_LENGTH = 200
const MAX_DESCRIPTION_LENGTH = 2000
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const MAX_CALENDAR_RANGE_DAYS = 42
const TASK_STATUSES = new Set(['TODO', 'IN_PROGRESS', 'DONE'])
const TASK_PRIORITIES = new Set(['LOW', 'MEDIUM', 'HIGH'])
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

function fail(details) {
  throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', details)
}

function toObject(body) {
  return body && typeof body === 'object' && !Array.isArray(body) ? body : {}
}

function hasField(input, field) {
  return Object.prototype.hasOwnProperty.call(input, field)
}

function validateDescription(value, details) {
  if (typeof value !== 'string') {
    details.push({
      field: 'description',
      message: 'Description must be a string or null',
    })
    return undefined
  }

  const description = value.trim()

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    details.push({
      field: 'description',
      message: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`,
    })
    return undefined
  }

  return description || null
}

function validateDateOnly(value, details) {
  if (!DATE_ONLY_PATTERN.test(value)) {
    details.push({
      field: 'dueDate',
      message: 'Due date must use YYYY-MM-DD',
    })
    return undefined
  }

  const date = new Date(`${value}T00:00:00.000Z`)

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    details.push({
      field: 'dueDate',
      message: 'Due date must be a valid calendar date',
    })
    return undefined
  }

  return date
}

function parseCalendarDate(value, details) {
  if (!DATE_ONLY_PATTERN.test(value)) {
    details.push({
      field: 'from',
      message: 'From must use YYYY-MM-DD',
    })
    details.push({
      field: 'to',
      message: 'To must use YYYY-MM-DD',
    })
    return undefined
  }

  const date = new Date(`${value}T00:00:00.000Z`)

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    details.push({
      field: 'from',
      message: 'From must be a valid calendar date',
    })
    details.push({
      field: 'to',
      message: 'To must be a valid calendar date',
    })
    return undefined
  }

  return date
}

export function validateCalendarRangeInput(query) {
  const { from, to } = query ?? {}
  const details = []

  if (!from) {
    details.push({ field: 'from', message: 'From is required' })
  }

  if (!to) {
    details.push({ field: 'to', message: 'To is required' })
  }

  if (details.length > 0) {
    fail(details)
  }

  const fromDate = parseCalendarDate(from, details)
  const toDate = parseCalendarDate(to, details)
  const rangeDays = Math.round((toDate - fromDate) / MILLISECONDS_PER_DAY)

  if (toDate < fromDate) {
    details.push({
      field: 'range',
      message: 'From must not be after To',
    })
    details.push({
      field: 'range',
      message: 'The calendar range must be inclusive',
    })
  } else if (rangeDays >= MAX_CALENDAR_RANGE_DAYS) {
    details.push({
      field: 'range',
      message: 'The calendar range must be 42 days or fewer',
    })
  }

  if (details.length > 0) {
    fail(details)
  }

  return { fromDate, toDate }
}

function validateAssigneeId(value, details) {
  if (!Number.isInteger(value) || value <= 0) {
    details.push({
      field: 'assigneeId',
      message: 'Assignee ID must be a positive integer or null',
    })
    return undefined
  }

  return value
}

export function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value)
}

export function validateRegisterInput(body) {
  const input = body && typeof body === 'object' ? body : {}
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = normalizeEmail(input.email)
  const password = typeof input.password === 'string' ? input.password : ''
  const details = []

  if (!name) {
    details.push({ field: 'name', message: 'Name is required' })
  } else if (name.length > MAX_NAME_LENGTH) {
    details.push({
      field: 'name',
      message: `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
    })
  }

  if (!email) {
    details.push({ field: 'email', message: 'Email is required' })
  } else if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    details.push({ field: 'email', message: 'Enter a valid email address' })
  }

  if (!password) {
    details.push({ field: 'password', message: 'Password is required' })
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    details.push({
      field: 'password',
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    })
  } else if (Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES) {
    details.push({ field: 'password', message: 'Password is too long' })
  }

  if (details.length > 0) {
    fail(details)
  }

  return { name, email, password }
}

export function validateLoginInput(body) {
  const input = body && typeof body === 'object' ? body : {}
  const email = normalizeEmail(input.email)
  const password = typeof input.password === 'string' ? input.password : ''
  const details = []

  if (!email) {
    details.push({ field: 'email', message: 'Email is required' })
  } else if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    details.push({ field: 'email', message: 'Enter a valid email address' })
  }

  if (!password) {
    details.push({ field: 'password', message: 'Password is required' })
  } else if (Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES) {
    details.push({ field: 'password', message: 'Password is too long' })
  }

  if (details.length > 0) {
    fail(details)
  }

  return { email, password }
}

export function validateProfileUpdateInput(body) {
  const input = toObject(body)
  const details = []
  const data = {}
  let currentPassword

  if (!hasField(input, 'name') && !hasField(input, 'email')) {
    fail([
      {
        field: 'body',
        message: 'Provide at least one of name or email',
      },
    ])
  }

  if (hasField(input, 'name')) {
    const name = typeof input.name === 'string' ? input.name.trim() : ''

    if (!name) {
      details.push({ field: 'name', message: 'Name is required' })
    } else if (name.length > MAX_NAME_LENGTH) {
      details.push({
        field: 'name',
        message: `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
      })
    } else {
      data.name = name
    }
  }

  if (hasField(input, 'email')) {
    const email = normalizeEmail(input.email)

    if (!email) {
      details.push({ field: 'email', message: 'Email is required' })
    } else if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      details.push({ field: 'email', message: 'Enter a valid email address' })
    } else {
      data.email = email
    }
  }

  if (hasField(input, 'currentPassword')) {
    if (typeof input.currentPassword !== 'string') {
      details.push({
        field: 'currentPassword',
        message: 'Current password must be a string',
      })
    } else {
      currentPassword = input.currentPassword

      if (Buffer.byteLength(currentPassword, 'utf8') > MAX_PASSWORD_BYTES) {
        details.push({
          field: 'currentPassword',
          message: 'Current password is too long',
        })
      }
    }
  }

  if (details.length > 0) {
    fail(details)
  }

  return { data, currentPassword }
}

export function validatePasswordChangeInput(body) {
  const input = toObject(body)
  const details = []
  const currentPassword =
    typeof input.currentPassword === 'string' ? input.currentPassword : ''
  const newPassword =
    typeof input.newPassword === 'string' ? input.newPassword : ''

  if (!currentPassword) {
    details.push({
      field: 'currentPassword',
      message: 'Current password is required',
    })
  } else if (Buffer.byteLength(currentPassword, 'utf8') > MAX_PASSWORD_BYTES) {
    details.push({
      field: 'currentPassword',
      message: 'Current password is too long',
    })
  }

  if (!newPassword) {
    details.push({ field: 'newPassword', message: 'New password is required' })
  } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
    details.push({
      field: 'newPassword',
      message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    })
  } else if (Buffer.byteLength(newPassword, 'utf8') > MAX_PASSWORD_BYTES) {
    details.push({ field: 'newPassword', message: 'New password is too long' })
  }

  if (details.length > 0) {
    fail(details)
  }

  return { currentPassword, newPassword }
}

export function parseId(value) {
  const id =
    typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : Number.NaN

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new AppError(404, 'NOT_FOUND', 'Resource not found')
  }

  return id
}

export function validateWorkspaceInput(body) {
  const input = toObject(body)
  const details = []
  const name = typeof input.name === 'string' ? input.name.trim() : ''

  if (!name) {
    details.push({ field: 'name', message: 'Name is required' })
  } else if (name.length > MAX_NAME_LENGTH) {
    details.push({
      field: 'name',
      message: `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
    })
  }

  if (details.length > 0) {
    fail(details)
  }

  return { name }
}

export function validateProjectCreateInput(body) {
  const input = toObject(body)
  const details = []
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  let description = null

  if (!name) {
    details.push({ field: 'name', message: 'Name is required' })
  } else if (name.length > MAX_NAME_LENGTH) {
    details.push({
      field: 'name',
      message: `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
    })
  }

  if (input.description !== undefined && input.description !== null) {
    description = validateDescription(input.description, details)
  }

  if (details.length > 0) {
    fail(details)
  }

  return { name, description }
}

export function validateProjectUpdateInput(body) {
  const input = toObject(body)
  const details = []
  const data = {}

  if (!hasField(input, 'name') && !hasField(input, 'description')) {
    fail([
      {
        field: 'body',
        message: 'Provide at least one of name or description',
      },
    ])
  }

  if (hasField(input, 'name')) {
    const name = typeof input.name === 'string' ? input.name.trim() : ''

    if (!name) {
      details.push({ field: 'name', message: 'Name is required' })
    } else if (name.length > MAX_NAME_LENGTH) {
      details.push({
        field: 'name',
        message: `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
      })
    } else {
      data.name = name
    }
  }

  if (hasField(input, 'description')) {
    if (input.description === null) {
      data.description = null
    } else {
      const description = validateDescription(input.description, details)

      if (description !== undefined) {
        data.description = description
      }
    }
  }

  if (details.length > 0) {
    fail(details)
  }

  return data
}

export function validateTaskCreateInput(body) {
  const input = toObject(body)
  const details = []
  const title = typeof input.title === 'string' ? input.title.trim() : ''
  const data = { description: null }

  if (!title) {
    details.push({ field: 'title', message: 'Title is required' })
  } else if (title.length > MAX_TITLE_LENGTH) {
    details.push({
      field: 'title',
      message: `Title must be ${MAX_TITLE_LENGTH} characters or fewer`,
    })
  } else {
    data.title = title
  }

  if (input.description !== undefined && input.description !== null) {
    const description = validateDescription(input.description, details)

    if (description !== undefined) {
      data.description = description
    }
  }

  if (input.status !== undefined) {
    if (!TASK_STATUSES.has(input.status)) {
      details.push({
        field: 'status',
        message: 'Status must be TODO, IN_PROGRESS, or DONE',
      })
    } else {
      data.status = input.status
    }
  }

  if (input.priority !== undefined) {
    if (!TASK_PRIORITIES.has(input.priority)) {
      details.push({
        field: 'priority',
        message: 'Priority must be LOW, MEDIUM, or HIGH',
      })
    } else {
      data.priority = input.priority
    }
  }

  if (input.dueDate !== undefined) {
    if (input.dueDate === null) {
      data.dueDate = null
    } else if (typeof input.dueDate !== 'string') {
      details.push({
        field: 'dueDate',
        message: 'Due date must use YYYY-MM-DD',
      })
    } else {
      const dueDate = validateDateOnly(input.dueDate, details)

      if (dueDate !== undefined) {
        data.dueDate = dueDate
      }
    }
  }

  if (input.assigneeId !== undefined) {
    if (input.assigneeId === null) {
      data.assigneeId = null
    } else {
      const assigneeId = validateAssigneeId(input.assigneeId, details)

      if (assigneeId !== undefined) {
        data.assigneeId = assigneeId
      }
    }
  }

  if (details.length > 0) {
    fail(details)
  }

  return data
}

export function validateTaskUpdateInput(body) {
  const input = toObject(body)
  const details = []
  const data = {}
  const fields = [
    'title',
    'description',
    'status',
    'priority',
    'dueDate',
    'assigneeId',
  ]

  if (!fields.some((field) => hasField(input, field))) {
    fail([
      {
        field: 'body',
        message:
          'Provide at least one of title, description, status, priority, dueDate, or assigneeId',
      },
    ])
  }

  if (hasField(input, 'title')) {
    const title = typeof input.title === 'string' ? input.title.trim() : ''

    if (!title) {
      details.push({ field: 'title', message: 'Title is required' })
    } else if (title.length > MAX_TITLE_LENGTH) {
      details.push({
        field: 'title',
        message: `Title must be ${MAX_TITLE_LENGTH} characters or fewer`,
      })
    } else {
      data.title = title
    }
  }

  if (hasField(input, 'description')) {
    if (input.description === null) {
      data.description = null
    } else {
      const description = validateDescription(input.description, details)

      if (description !== undefined) {
        data.description = description
      }
    }
  }

  if (hasField(input, 'status')) {
    if (!TASK_STATUSES.has(input.status)) {
      details.push({
        field: 'status',
        message: 'Status must be TODO, IN_PROGRESS, or DONE',
      })
    } else {
      data.status = input.status
    }
  }

  if (hasField(input, 'priority')) {
    if (!TASK_PRIORITIES.has(input.priority)) {
      details.push({
        field: 'priority',
        message: 'Priority must be LOW, MEDIUM, or HIGH',
      })
    } else {
      data.priority = input.priority
    }
  }

  if (hasField(input, 'dueDate')) {
    if (input.dueDate === null) {
      data.dueDate = null
    } else if (typeof input.dueDate !== 'string') {
      details.push({
        field: 'dueDate',
        message: 'Due date must use YYYY-MM-DD',
      })
    } else {
      const dueDate = validateDateOnly(input.dueDate, details)

      if (dueDate !== undefined) {
        data.dueDate = dueDate
      }
    }
  }

  if (hasField(input, 'assigneeId')) {
    if (input.assigneeId === null) {
      data.assigneeId = null
    } else {
      const assigneeId = validateAssigneeId(input.assigneeId, details)

      if (assigneeId !== undefined) {
        data.assigneeId = assigneeId
      }
    }
  }

  if (details.length > 0) {
    fail(details)
  }

  return data
}
