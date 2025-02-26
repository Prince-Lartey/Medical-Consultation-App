import { PrismaClient } from "@prisma/client";

declare global {
    const prisma: PrismaClient | undefined;
}

export const prismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;