// Shared validation helpers used by both auth pages.
// Rule: an email must have text before @, text after @, then a dot and more text
// (e.g. you@example.com).
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const MAX_NAME_LENGTH = 100
export const MAX_TASK_TITLE_LENGTH = 200
export const MAX_DESCRIPTION_LENGTH = 2000

export function validateName(value) {
  const name = typeof value === 'string' ? value.trim() : ''

  if (!name) {
    return 'Name is required'
  }

  if (name.length > MAX_NAME_LENGTH) {
    return `Name must be ${MAX_NAME_LENGTH} characters or fewer`
  }

  return ''
}

export function validateTaskTitle(value) {
  const title = typeof value === 'string' ? value.trim() : ''

  if (!title) {
    return 'Title is required'
  }

  if (title.length > MAX_TASK_TITLE_LENGTH) {
    return `Title must be ${MAX_TASK_TITLE_LENGTH} characters or fewer`
  }

  return ''
}

export function validateDescription(value) {
  const description = typeof value === 'string' ? value.trim() : ''

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`
  }

  return ''
}

export function mapFieldErrors(details) {
  if (!Array.isArray(details)) {
    return {}
  }

  return details.reduce((errors, detail) => {
    if (
      detail &&
      typeof detail.field === 'string' &&
      typeof detail.message === 'string'
    ) {
      errors[detail.field] = detail.message
    }

    return errors
  }, {})
}
