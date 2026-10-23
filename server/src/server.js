import app from './app.js'

const PORT = Number(process.env.PORT) || 3000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.listen(PORT, () => {
  console.log(`TaskFlow API running at http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  console.log(`Allowed client origin: ${CLIENT_ORIGIN}`)
})
