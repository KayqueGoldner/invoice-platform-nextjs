import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WarningGif from "@/public/warning-gif.gif";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/submit-buttons";
import { deleteInvoice } from "@/app/actions";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

const DeleteInvoicePage = async ({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) => {
  const session = await requireUser();
  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="warning gif" className="rounded-lg" />
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

              await deleteInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Delete invoice" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteInvoicePage;
