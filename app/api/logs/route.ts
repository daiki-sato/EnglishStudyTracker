// app/api/logs/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const LogSchema = z.object({
  date: z.string(),                 // ISO 文字列
  minutes: z.number().int().min(1),
  vocab: z.number().int().min(0).default(0),
  activity: z.string().min(1),
  notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = LogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { date, minutes, vocab, activity, notes } = parsed.data;

  const log = await prisma.studyLog.create({
    data: {
      userId: session.user.id,
      date: new Date(date),
      minutes,
      vocabularyCount: vocab,
      activity,
      notes,
    },
  });

  return NextResponse.json(log, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const logs = await prisma.studyLog.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(logs);
}
