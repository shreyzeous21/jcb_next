"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      toast.loading("Redirecting to Google...");

      await authClient.signIn.social({
        provider: "google",
      });

      toast.dismiss();
      toast.success("Signed in successfully 🎉");
    } catch (error) {
      toast.dismiss();
      toast.error("Google sign-in failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      disabled={loading}
      className=" flex items-center justify-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="h-4 w-4" />
      )}
      <span className="text-sm">Login</span>
    </Button>
  );
}
