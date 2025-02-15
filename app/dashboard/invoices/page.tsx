import Link from "next/link";
import { Suspense } from "react";
import { PlusIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceList } from "@/app/components/invoice-list";
import { Skeleton } from "@/components/ui/skeleton";

const InvoicesPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon /> Create invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default InvoicesPage;
