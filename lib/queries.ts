import { prisma } from './prisma';

export async function getLogs(userId: string) {
  return prisma.studyLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 200
  });
}