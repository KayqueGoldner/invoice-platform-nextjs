"use client";

import { HomeIcon, Users2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2Icon,
  },
];

export const DashboardLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            pathname === link.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
};
