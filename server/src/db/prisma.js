import 'dotenv/config'
import prismaClientPackage from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const { PrismaClient } = prismaClientPackage

let prismaClient

export function getPrisma() {
  if (prismaClient) {
    return prismaClient
  }

  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is missing. Add it to server/.env (see server/.env.example).',
    )
  }

  const adapter = new PrismaPg({ connectionString })
  prismaClient = new PrismaClient({ adapter })

  return prismaClient
}
