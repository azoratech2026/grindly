import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const sql = getSql();
  await sql`
    INSERT INTO waitlist_signups (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
  `;

  return NextResponse.json({ ok: true });
}
