import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["consumer", "distributor", "oem"]),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  country: z.string().min(1).max(120),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill every required field." },
      { status: 422 },
    );
  }

  // V1: log to server console. Swap for Resend / Postmark / SES later.
  console.log("[contact] inquiry received", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
