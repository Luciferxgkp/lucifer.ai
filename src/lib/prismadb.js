import { PrismaClient } from '@prisma/client';

// const prisma = globalThis.prisma || new PrismaClient();
const prismaDb = new PrismaClient();
// if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

export default prismaDb;
