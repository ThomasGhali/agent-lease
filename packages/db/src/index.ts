import 'dotenv/config'
import { PrismaClient } from './generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`

// 1. Create a standard Postgres connection pool
const pool = new Pool({ connectionString })

// 2. Wrap it in the Prisma adapter
const adapter = new PrismaPg(pool)

// 3. Singleton pattern to prevent connection limits in development
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

export * from './generated/client/client'
