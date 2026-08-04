// Shared validation helpers used by both auth pages.
// Rule: an email must have text before @, text after @, then a dot and more text
// (e.g. you@example.com).
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
