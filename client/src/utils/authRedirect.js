export function getAuthRedirectPath(state) {
  const from = state?.from

  if (
    typeof from === 'string' &&
    (from === '/dashboard' || from.startsWith('/dashboard/'))
  ) {
    return from
  }

  return '/dashboard'
}
