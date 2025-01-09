import { notFound } from "next/navigation";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EditInvoice } from "@/app/components/edit-invoice";

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId,
    },
  });

  if (!data) return notFound();

  return data;
}

interface EditInvoicePageProps {
  params: Promise<{ invoiceId: string }>;
}

const EditInvoicePage = async ({ params }: EditInvoicePageProps) => {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getData(invoiceId, session.user?.id as string);

  return <EditInvoice data={data} />;
};

export default EditInvoicePage;
