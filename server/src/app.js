import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.js'
import authRouter from './routes/auth.js'
import meRouter from './routes/me.js'
import workspacesRouter from './routes/workspaces.js'
import projectsRouter from './routes/projects.js'
import tasksRouter from './routes/tasks.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || origin === CLIENT_ORIGIN)
    },
  }),
)

app.use(express.json())

app.use('/api', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/me', meRouter)
app.use('/api/workspaces', workspacesRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/tasks', tasksRouter)

app.use(notFound)
app.use(errorHandler)

export default app
