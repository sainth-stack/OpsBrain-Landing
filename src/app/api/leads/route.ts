import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { leadFormSchema } from "@/lib/schemas/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadFormSchema.parse(body);

    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: "opsbrain-landing",
    };

    console.log("[leads] New submission:", JSON.stringify(payload, null, 2));

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        console.error("[leads] Webhook failed:", webhookRes.status);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("[leads] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
