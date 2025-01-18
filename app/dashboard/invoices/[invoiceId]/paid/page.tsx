import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaidGif from "@/public/paid-gif.gif";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/submit-buttons";
import { markAsPaidInvoice } from "@/app/actions";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId,
    },
  });

  if (!data) return redirect("/dashboard/invoices");
}

const PaidInvoicePage = async ({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) => {
  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as Paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="Paid gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";

              await markAsPaidInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Mark as paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaidInvoicePage;
