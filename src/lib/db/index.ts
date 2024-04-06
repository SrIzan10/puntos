import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const pgAdapter = new PrismaPg(pool)
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter: pgAdapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}


const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export const adapter = new PrismaAdapter(prisma.session, prisma.user);

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma