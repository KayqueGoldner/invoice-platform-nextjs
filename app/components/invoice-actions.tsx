import Link from "next/link";
import {
  CheckCircleIcon,
  DownloadCloudIcon,
  MailIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceActionsProps {
  id: string;
}

export const InvoiceActions = ({ id }: InvoiceActionsProps) => {
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
        <DropdownMenuItem asChild>
          <Link href="">
            <MailIcon className="mr-2 size-4" />
            Reminder Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <TrashIcon className="mr-2 size-4" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <CheckCircleIcon className="mr-2 size-4" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
