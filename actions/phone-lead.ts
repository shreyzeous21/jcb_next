"use server";

import prisma from "@/lib/prisma";
import { authSession } from "@/lib/auth-utils";

export async function savePhoneLead(phone: string) {
  try {
    const cleaned = phone.trim();
    if (!cleaned || cleaned.length < 10) {
      return { success: false, error: "Please enter a valid phone number" };
    }

    const session = await authSession();
    if (!session?.user?.id) {
      // Not logged in — nothing to save, client handles localStorage
      return { success: true };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: cleaned },
    });

    return { success: true };
  } catch (error) {
    console.error("savePhoneLead error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
