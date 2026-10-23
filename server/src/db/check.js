import 'dotenv/config'
import { getPrisma } from './prisma.js'

let prisma

try {
  prisma = getPrisma()
  await prisma.$queryRaw`SELECT 1 AS ok`
  console.log('Database connection OK')
} catch {
  console.error(
    'Database connection failed. Check DATABASE_URL and that PostgreSQL is running.',
  )
  process.exitCode = 1
} finally {
  if (prisma) {
    await prisma.$disconnect()
  }
}
