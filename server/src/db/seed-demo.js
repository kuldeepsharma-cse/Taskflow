import 'dotenv/config'
import prismaClientPackage from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hashPassword } from '../utils/password.js'

const { PrismaClient } = prismaClientPackage
const ALLOWED_DATABASES = new Set(['taskflow_demo', 'taskflow_test'])

function getDatabaseName(value) {
  const parsed = new URL(value)
  return decodeURIComponent(parsed.pathname.replace(/^\//, ''))
}

function dateOnly(value) {
  return new Date(`${value}T00:00:00.000Z`)
}

function assertSafeDemoDatabase(value) {
  if (!value) {
    throw new Error(
      'DEMO_DATABASE_URL is required. Add it to server/.env (see server/.env.example).',
    )
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Demo seeding must not run in production')
  }

  if (value === process.env.DATABASE_URL) {
    throw new Error('DEMO_DATABASE_URL must differ from DATABASE_URL')
  }

  let databaseName

  try {
    databaseName = getDatabaseName(value)
  } catch {
    throw new Error('DEMO_DATABASE_URL must be a valid PostgreSQL URL')
  }

  if (databaseName === 'taskflow_dev') {
    throw new Error('Demo seeding must never target taskflow_dev')
  }

  if (!ALLOWED_DATABASES.has(databaseName)) {
    throw new Error(
      'DEMO_DATABASE_URL must target taskflow_demo (or taskflow_test for verification)',
    )
  }

  return databaseName
}

function createDemoWorkspaces(assigneeId) {
  return [
    {
      name: 'Product Studio',
      projects: {
        create: [
          {
            name: 'Website Refresh',
            description: 'Rebuild the marketing site with a clearer product story.',
            tasks: {
              create: [
                {
                  title: 'Audit the current landing page',
                  description: 'List the sections, messages, and conversion gaps.',
                  status: 'DONE',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-02'),
                  assigneeId,
                },
                {
                  title: 'Build the new hero section',
                  description: 'Ship the headline, supporting copy, and primary call to action.',
                  status: 'IN_PROGRESS',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-08'),
                  assigneeId,
                },
                {
                  title: 'Add responsive navigation',
                  description: 'Make the desktop and mobile navigation consistent.',
                  status: 'IN_PROGRESS',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-10'),
                  assigneeId,
                },
                {
                  title: 'Write the launch announcement',
                  description: 'Prepare the short announcement for the release.',
                  status: 'TODO',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-15'),
                },
              ],
            },
          },
          {
            name: 'Mobile App MVP',
            description: 'Deliver the first usable mobile project and task flow.',
            tasks: {
              create: [
                {
                  title: 'Define the onboarding flow',
                  description: 'Document the first-run experience and empty states.',
                  status: 'DONE',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-01'),
                  assigneeId,
                },
                {
                  title: 'Implement the project list screen',
                  description: 'Load workspaces and projects from the API.',
                  status: 'IN_PROGRESS',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-12'),
                  assigneeId,
                },
                {
                  title: 'Add the task detail screen',
                  description: 'Show task fields and status actions.',
                  status: 'TODO',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-18'),
                },
                {
                  title: 'Test push notification copy',
                  description: 'Review tone and length for assignment reminders.',
                  status: 'TODO',
                  priority: 'LOW',
                  dueDate: dateOnly('2026-11-22'),
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Client Work',
      projects: {
        create: [
          {
            name: 'Brand Sprint',
            description: 'Create a compact identity system for a new client.',
            tasks: {
              create: [
                {
                  title: 'Collect moodboard references',
                  description: 'Agree on the visual direction with the client.',
                  status: 'DONE',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-10-30'),
                  assigneeId,
                },
                {
                  title: 'Draft logo concepts',
                  description: 'Prepare three distinct directions for review.',
                  status: 'IN_PROGRESS',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-06'),
                  assigneeId,
                },
                {
                  title: 'Prepare brand guidelines',
                  description: 'Document colors, type, and usage examples.',
                  status: 'TODO',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-20'),
                },
                {
                  title: 'Schedule the client review',
                  description: 'Book the review and share the concept deck.',
                  status: 'TODO',
                  priority: 'LOW',
                  dueDate: dateOnly('2026-11-05'),
                },
              ],
            },
          },
          {
            name: 'Marketing Site',
            description: 'Launch a focused site for the next campaign.',
            tasks: {
              create: [
                {
                  title: 'Map the content sections',
                  description: 'Confirm the page structure and owners.',
                  status: 'DONE',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-03'),
                  assigneeId,
                },
                {
                  title: 'Build the pricing page',
                  description: 'Implement the plans and comparison table.',
                  status: 'IN_PROGRESS',
                  priority: 'HIGH',
                  dueDate: dateOnly('2026-11-14'),
                  assigneeId,
                },
                {
                  title: 'Add the contact form',
                  description: 'Connect the form to the approved inbox.',
                  status: 'TODO',
                  priority: 'MEDIUM',
                  dueDate: dateOnly('2026-11-19'),
                },
                {
                  title: 'Review analytics events',
                  description: 'Confirm the campaign conversion events.',
                  status: 'TODO',
                  priority: 'LOW',
                  dueDate: dateOnly('2026-11-25'),
                },
              ],
            },
          },
        ],
      },
    },
  ]
}

async function seedDemoData() {
  const databaseUrl = process.env.DEMO_DATABASE_URL
  const databaseName = assertSafeDemoDatabase(databaseUrl)

  if (!process.argv.includes('--confirm')) {
    throw new Error('Refusing to seed without the explicit --confirm flag')
  }

  const name = process.env.DEMO_USER_NAME?.trim() || 'Demo User'
  const email = process.env.DEMO_USER_EMAIL?.trim().toLowerCase()
  const password = process.env.DEMO_USER_PASSWORD

  if (!email || !password) {
    throw new Error('DEMO_USER_EMAIL and DEMO_USER_PASSWORD are required')
  }

  if (password.length < 6) {
    throw new Error('DEMO_USER_PASSWORD must be at least 6 characters')
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl })
  const prisma = new PrismaClient({ adapter })

  try {
    const target = await prisma.$queryRaw`
      SELECT current_database() AS database_name, current_schema() AS schema_name
    `

    if (target[0]?.database_name !== databaseName || target[0]?.schema_name !== 'public') {
      throw new Error('The connected database does not match DEMO_DATABASE_URL')
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        _count: { select: { workspaces: true } },
      },
    })

    if (existingUser && existingUser._count.workspaces > 0) {
      console.log(`Demo data already exists for ${email} in ${databaseName}. No changes made.`)
      return
    }

    const demoUser =
      existingUser ||
      (await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: await hashPassword(password),
        },
        select: { id: true },
      }))

    for (const workspace of createDemoWorkspaces(demoUser.id)) {
      await prisma.workspace.create({
        data: {
          name: workspace.name,
          ownerId: demoUser.id,
          projects: workspace.projects,
        },
      })
    }

    console.log(`Seeded demo data for ${email} in ${databaseName}.`)
  } finally {
    await prisma.$disconnect()
  }
}

try {
  await seedDemoData()
} catch (error) {
  console.error(`Demo seed failed: ${error.message}`)
  process.exitCode = 1
}
