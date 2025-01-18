"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  DownloadCloudIcon,
  MailIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceActionsProps {
  id: string;
  status: string;
}

export const InvoiceActions = ({ id, status }: InvoiceActionsProps) => {
  const handleReminderEmail = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sendind reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email",
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <PencilIcon className="mr-2 size-4" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloudIcon className="mr-2 size-4" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReminderEmail}>
          <MailIcon className="mr-2 size-4" />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <TrashIcon className="mr-2 size-4" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${id}/paid`}>
              <CheckCircleIcon className="mr-2 size-4" />
              Mark as Paid
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
