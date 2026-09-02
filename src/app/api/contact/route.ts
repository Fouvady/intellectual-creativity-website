import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  try {
    const record = await db.contactMessage.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone ?? null,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    })
    return NextResponse.json({ ok: true, id: record.id })
  } catch (err) {
    console.error('[contact] DB error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to store message' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const count = await db.contactMessage.count()
    return NextResponse.json({ count })
  } catch (err) {
    console.error('[contact] DB error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch count' },
      { status: 500 },
    )
  }
}
