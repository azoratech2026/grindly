import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PLANS = new Set(["one-time", "subscribe"]);

export async function POST(req: NextRequest) {
  const { email, flavor, quantity, plan, totalCents } = await req.json();

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (typeof quantity !== "number" || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
  }
  if (typeof plan !== "string" || !ALLOWED_PLANS.has(plan)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }
  if (typeof totalCents !== "number" || totalCents < 0) {
    return NextResponse.json({ error: "Invalid total." }, { status: 400 });
  }

  const sql = getSql();
  const rows = await sql`
    INSERT INTO demo_orders (email, flavor, quantity, plan, total_cents)
    VALUES (${email}, ${flavor ?? "blue-raspberry"}, ${quantity}, ${plan}, ${totalCents})
    RETURNING id
  `;

  return NextResponse.json({ ok: true, orderId: rows[0].id });
}
