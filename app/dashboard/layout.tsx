import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MenuIcon, User2Icon } from "lucide-react";

import Logo from "@/public/logo.png";
import { requireUser } from "@/app/utils/hooks";
import { DashboardLinks } from "@/app/components/dashboard-links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { Toaster } from "@/components/ui/sonner";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data.lastName || !data.address) {
    redirect("/onboarding");
  }
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser();
  const data = await getUser(session.user?.id as string);

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex flex-1 items-center gap-2">
                <Image src={Logo} alt="logo" className="size-7" />
                <p className="text-lg font-bold">
                  Invoice <span className="text-blue-600">Platform</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-10 grid gap-2">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                  >
                    <User2Icon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";

                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton theme="light" />
    </>
  );
};

export default DashboardLayout;
