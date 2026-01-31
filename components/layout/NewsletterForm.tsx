"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/use-newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { postNewsletterMutation } = useNewsletter();
  const isPending = postNewsletterMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("idle");
    postNewsletterMutation.mutate(trimmed, {
      onSuccess: (result) => {
        if (result.success) {
          setEmail("");
          setStatus("success");
        } else {
          setStatus("error");
        }
      },
      onError: () => setStatus("error"),
    });
  }

  return (
    <div className="space-y-2 w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          disabled={isPending}
          className="h-10 flex-1 min-w-0 bg-background"
          required
          aria-label="Email for newsletter"
        />
        <Button
          type="submit"
          size="lg"
          className="h-10 shrink-0 px-6"
          disabled={isPending}
        >
          {isPending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      {status === "success" && (
        <p className="text-sm text-primary">
          Thanks! You’re subscribed to our newsletter.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">
          {postNewsletterMutation.error?.message}
        </p>
      )}
    </div>
  );
}
