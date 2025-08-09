import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const LogSchema = z.object({
  date: z.string(), // ISO
  minutes: z.number().int().min(1).max(1440),
  vocab: z.number().int().min(0).max(10000).default(0),
  activity: z.string().min(1).max(50),
  notes: z.string().max(500).optional()
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const logs = await prisma.studyLog.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 200
  });
  return Response.json({ logs });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const json = await req.json();
  const parsed = LogSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { date, minutes, vocab, activity, notes } = parsed.data;
  const log = await prisma.studyLog.create({
    data: { date: new Date(date), minutes, vocabularyCount: vocab, activity, notes, userId: session.user.id }
  });
  return Response.json({ ok: true, log });
}