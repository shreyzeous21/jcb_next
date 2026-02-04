"use server";

import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/** Delete a product PDF by id (dashboard only). Optionally removes file from UploadThing if key was stored. */
export async function deleteProductPdf(pdfId: string) {
  const session = await authSession();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const pdf = await prisma.productPdf.findUnique({
    where: { id: pdfId },
  });

  if (!pdf) {
    return { success: false, error: "PDF not found" };
  }

  await prisma.productPdf.delete({
    where: { id: pdfId },
  });

  return { success: true };
}
