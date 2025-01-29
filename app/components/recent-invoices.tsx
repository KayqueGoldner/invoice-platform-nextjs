import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export const RecentInvoices = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Avatar className="hidden size-9 sm:flex">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {item.clientName}
              </p>
              <p className="text-sm text-muted-foreground">{item.clientName}</p>
            </div>
            <div className="ml-auto font-medium">
              +{formatCurrency({ amount: item.total, currency: item.currency })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
