// Health check route - the backend's "is it alive?" endpoint.
// Development uses it to confirm the server started; deployment platforms
// (Phase 13) will use it the same way.
// Living in its own file establishes the routes/ pattern: one file per
// resource, mounted in src/server.js.

import { Router } from 'express'

const healthRouter = Router()

// GET /api/health -> { "status": "ok" }
// (server.js mounts this router at /api, so the path inside is '/health')
healthRouter.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default healthRouter
