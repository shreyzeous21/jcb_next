"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { createEnquiry } from "@/actions/enquiry";
import { toast } from "sonner";
import { MessageCircle, LogIn, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const enquirySchema = z.object({
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  message: z.string().max(1000).optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

type ContactEnquiryProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    partNo: string;
    category: { name: string };
  };
};

export default function ContactEnquiry({ product }: ContactEnquiryProps) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { quantity: 1, message: "" },
  });

  async function onSubmit(values: EnquiryFormValues) {
    if (!session?.user) return;
    setIsSubmitting(true);
    try {
      const res = await createEnquiry(
        product.id,
        values.quantity,
        values.message,
      );
      if (res.success) {
        toast.success(res.message);
        form.reset({ quantity: 1, message: "" });
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="space-y-4">
        <Separator />
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20 p-6 text-center">
          <MessageCircle className="mx-auto h-10 w-10 text-amber-600 dark:text-amber-500 mb-3" />
          <h3 className="font-semibold text-foreground mb-1">
            Send an enquiry
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign in to request a quote or ask about this product. Only logged-in
            users can submit enquiries.
          </p>
          <Button asChild variant="default" className="gap-2">
            <Link href="/" className="inline-flex items-center">
              <LogIn className="h-4 w-4" />
              Sign in to send enquiry
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Separator />
      <div className="rounded-xl border bg-muted/30 p-6 space-y-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Request a quote</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Submit an enquiry for <strong>{product.name}</strong> (Part no.{" "}
          {product.partNo}). We&apos;ll get back to you soon.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      className="max-w-[120px]"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requirements or questions..."
                      className="min-h-[80px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send enquiry"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
