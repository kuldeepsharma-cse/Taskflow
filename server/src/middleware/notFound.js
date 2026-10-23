// 404 middleware - runs when no route matched the request.
// Returns the same JSON error shape as every other API error
// (docs/02 §3: { error: { code, message } }), so clients only ever
// need to handle one error format.

function notFound(req, res) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  })
}

export default notFound
