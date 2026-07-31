import type { Prisma } from '@generated/client';

export type PrismaUser = Prisma.UserGetPayload<{ omit: { password: true } }>;
