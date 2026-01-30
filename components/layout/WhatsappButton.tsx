"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/919990013518"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
      >
        <FaWhatsapp className="size-10 text-white" />
      </Button>
    </Link>
  );
}
