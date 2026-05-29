import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { sendLeadToBitrix24 } from "@/lib/bitrix24";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = leadSchema.parse(body);
    const result = await sendLeadToBitrix24(lead);
    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid lead request";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
