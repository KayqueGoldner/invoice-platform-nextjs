"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { requireUser } from "@/app/utils/hooks";
import { invoiceSchema, onboardingSchema } from "@/app/utils/zodSchemas";
import prisma from "@/app/utils/db";
import { emailClient } from "@/app/utils/mailtrap";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const values = submission.value;

  const data = await prisma.invoice.create({
    data: {
      ...values,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Invoice Platform",
  };

  emailClient.send({
    from: sender,
    to: [
      {
        email: process.env.MAILTRAP_DEMO_EMAIL!, // change to client email "submission.value.clientEmail"
      },
    ],
    template_uuid: process.env.MAILTRAP_TEMPLATE_UUID!,
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(submission.value.date),
      ),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      ...submission.value,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Invoice Platform",
  };

  emailClient.send({
    from: sender,
    to: [
      {
        email: process.env.MAILTRAP_DEMO_EMAIL!, // change to client email "submission.value.clientEmail"
      },
    ],
    template_uuid: process.env.MAILTRAP_EDIT_TEMPLATE_UUID!,
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(submission.value.date),
      ),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function markAsPaidInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices");
}
