"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/hooks/use-enquiry";
import { Trash2 } from "lucide-react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function EnquiryListing() {
  const { enquiries, isLoading, error, deleteEnquiryMutation } = useEnquiry();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Enquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="whitespace-nowrap">Submitted</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-destructive"
                >
                  Error: {error.message}
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && enquiries.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No enquiries yet.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !error &&
              enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">
                    <span className="block">{enquiry.product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {enquiry.product.partNo}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="block">{enquiry.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {enquiry.user.email}
                    </span>
                  </TableCell>
                  <TableCell>{enquiry.quantity}</TableCell>
                  <TableCell className="max-w-[240px]">
                    {enquiry.message ? (
                      <span
                        className="line-clamp-2 text-sm"
                        title={enquiry.message}
                      >
                        {enquiry.message}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {formatDate(enquiry.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteEnquiryMutation.mutate(enquiry.id)}
                      disabled={deleteEnquiryMutation.isPending}
                      aria-label="Delete enquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
