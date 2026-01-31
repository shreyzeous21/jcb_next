"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You’ve logged out. See you soon!");
          router.push("/");
        },
      },
    });
  }

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="destructive"
      disabled={isPending}
      className="cursor-pointer"
    >
      Sign out <FaSignOutAlt />
    </Button>
  );
}
