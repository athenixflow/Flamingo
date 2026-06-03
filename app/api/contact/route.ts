import { NextResponse } from "next/server";
import { z } from "zod";
import { INQUIRY_OPTIONS } from "@/content/contact";

const baseFields = {
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(4).max(40),
  message: z.string().min(10).max(4000),
};

const generalSchema = z.object({
  type: z.literal("general"),
  subject: z.string().min(1).max(200),
  ...baseFields,
});

const distributorSchema = z.object({
  type: z.literal("distributor"),
  company: z.string().min(1).max(200),
  country: z.string().min(1).max(120),
  city: z.string().min(1).max(120),
  businessType: z.string().min(1).max(120),
  ...baseFields,
});

const schema = z.discriminatedUnion("type", [generalSchema, distributorSchema]);

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

  const option = INQUIRY_OPTIONS.find((o) => o.id === parsed.data.type);
  const subjectLine =
    parsed.data.type === "general" && parsed.data.subject
      ? parsed.data.subject
      : (option?.emailSubject ?? "New Inquiry from Flamingo Website");

  // V1: log to server console. Swap for Resend / Postmark / SES later — at
  // that point, send to sales@flamingocarcaretech.com with `subjectLine` and
  // a body composed from `parsed.data`.
  console.log("[contact] inquiry received", {
    subject: subjectLine,
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
