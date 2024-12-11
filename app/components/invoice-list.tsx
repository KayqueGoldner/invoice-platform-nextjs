import { InvoiceActions } from "@/app/components/invoice-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const InvoiceList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>$25.00</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>10/12/2024</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
