"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import PhonePopup from "./PhonePopup";

export default function PhoneFloatingButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !!session?.user;
  const userPhone = (session?.user as { phone?: string })?.phone ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-open: only when session has loaded and user has no phone saved
  useEffect(() => {
    if (!mounted || isPending) return;
    if (isLoggedIn && !userPhone) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, [mounted, isPending, isLoggedIn, userPhone]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-[88px] right-6 z-50 group flex flex-col items-end gap-2">

        {/* Tooltip */}
        <span className="pointer-events-none mr-1 mb-0.5 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
          {isLoggedIn && userPhone ? "Update your number" : "Get exclusive deals!"}
        </span>

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Phone lead capture"
          className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none"
          style={{ background: "#F7C000" }}
        >
          {/* Pulse — only when logged in and no phone yet */}
          {isLoggedIn && !userPhone && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#F7C000] animate-ping opacity-40" />
              <span className="absolute inset-[-6px] rounded-full border-2 border-[#F7C000]/50 animate-pulse" />
            </>
          )}

          <Phone className="h-5 w-5 text-black fill-black" />
        </button>
      </div>

      <PhonePopup
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
        initialPhone={userPhone}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
