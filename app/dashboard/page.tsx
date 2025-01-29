import { Suspense } from "react";

import prisma from "@/app/utils/db";
import { DashboardBlocks } from "@/app/components/dashboard-blocks";
import { EmptyState } from "@/app/components/empty-state";
import { InvoiceGraph } from "@/app/components/Invoice-graph";
import { RecentInvoices } from "@/app/components/recent-invoices";
import { requireUser } from "@/app/utils/hooks";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

const DashboardPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No analytics available!"
          description="There are no invoices to analyze. Create at least one invoice to view
          analytics."
          buttonText="Create invoice"
          href="/"
        />
      ) : (
        <Suspense fallback={<Skeleton className="h-full w-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default DashboardPage;
