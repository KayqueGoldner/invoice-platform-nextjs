import { NextResponse } from "next/server";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: { id: invoiceId, userId: session.user?.id },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Invoice Platform",
    };

    emailClient.send({
      from: sender,
      to: [
        {
          email: process.env.MAILTRAP_DEMO_EMAIL!, // change to client email
        },
      ],
      template_uuid: process.env.MAILTRAP_REMINDER_TEMPLATE_UUID!,
      template_variables: {
        first_name: invoiceData.clientName,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 500 },
    );
  }
}
