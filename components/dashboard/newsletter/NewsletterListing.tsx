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
import { useNewsletter } from "@/hooks/use-newsletter";
import { Trash2 } from "lucide-react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NewsletterListing() {
  const { newsletters, isLoading, error, deleteNewsletterMutation } =
    useNewsletter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="whitespace-nowrap">Subscribed</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-destructive"
                >
                  Error: {error.message}
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && newsletters.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  No newsletter subscribers yet.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !error &&
              newsletters.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {formatDate(sub.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteNewsletterMutation.mutate(sub.id)}
                      disabled={deleteNewsletterMutation.isPending}
                      aria-label="Delete subscriber"
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
