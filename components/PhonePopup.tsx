"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, X, Lock } from "lucide-react";
import { savePhoneLead } from "@/actions/phone-lead";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface PhonePopupProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialPhone?: string | null;
  isLoggedIn: boolean;
}

export default function PhonePopup({
  open,
  onClose,
  onSuccess,
  initialPhone,
  isLoggedIn,
}: PhonePopupProps) {
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [isPending, startTransition] = useTransition();

  // Sync when initialPhone changes (e.g. session loads after mount)
  useEffect(() => {
    setPhone(initialPhone ?? "");
  }, [initialPhone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    startTransition(async () => {
      const result = await savePhoneLead(phone);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Phone number saved successfully!");
      // Refresh session so user.phone updates immediately
      await authClient.getSession({ fetchOptions: { cache: "no-store" } });
      onSuccess?.();
      onClose();
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Banner */}
        <div className="relative bg-[#F7C000] px-8 pt-8 pb-6 flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition text-black"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative h-16 w-32 mb-4">
            <Image
              src="/logo1.jpeg"
              alt="Niksparts logo"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-black leading-tight">
            Get Exclusive Deals
          </h2>
          <p className="text-sm text-black/70 mt-1 font-medium">
            on JCB Spare Parts & Accessories
          </p>

          {/* Decorative stripes */}
          <div className="absolute bottom-0 left-0 right-0 h-2 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? "bg-black" : "bg-[#F7C000]"}`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-zinc-900 px-8 py-7">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center gap-3 py-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Login to save your number</p>
              <p className="text-xs text-muted-foreground">
                Sign in to your account so we can reach you with exclusive offers and deals.
              </p>
              <div className="relative w-full mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Login to enable this field"
                  className="pl-9 cursor-not-allowed opacity-50"
                  disabled
                />
              </div>
              <button
                onClick={onClose}
                className="mt-1 w-full text-xs text-muted-foreground hover:text-foreground transition text-center"
              >
                Maybe later
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-5 text-center">
                {initialPhone
                  ? "Update your phone number below."
                  : "Drop your phone number and our team will reach out with the best offers, new arrivals, and exclusive deals."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-9"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={15}
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F7C000] hover:bg-[#e5b200] text-black font-bold"
                  disabled={isPending}
                >
                  {isPending
                    ? "Saving…"
                    : initialPhone
                    ? "Update Number"
                    : "Get Exclusive Deals"}
                </Button>
              </form>

              <button
                onClick={onClose}
                className="mt-4 w-full text-xs text-muted-foreground hover:text-foreground transition text-center"
              >
                No thanks, maybe later
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
