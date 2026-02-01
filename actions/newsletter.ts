"use server";

import prisma from "@/lib/prisma";

export async function postNewsletter(email: string) {
  try {
    if (!email) {
      return { success: false, message: "Email is required" };
    }

    const existingNewsletter = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingNewsletter) {
      return {
        success: false,
        message: "You are already subscribed to our newsletter",
      };
    }

    const newsletter = await prisma.newsletter.create({
      data: { email },
    });

    return { success: true, data: newsletter };
  } catch (error) {
    console.log("postNewsletter error:", error);
    return { success: false, message: "Failed to subscribe to newsletter" };
  }
}

export async function getNewsletter() {
  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: newsletters };
  } catch (error) {
    console.log("getNewsletter error:", error);
    return { success: false, message: "Failed to get newsletters" };
  }
}

export async function deleteNewsletter(id: string) {
  try {
    if (!id) {
      return { success: false, message: "ID is required" };
    }

    const newsletter = await prisma.newsletter.delete({
      where: { id },
    });

    return { success: true, data: newsletter };
  } catch (error) {
    console.log("deleteNewsletter error:", error);
    return { success: false, message: "Failed to delete newsletter" };
  }
}
