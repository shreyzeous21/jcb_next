"use server";

import prisma from "@/lib/prisma";
import transporter from "@/lib/nodemailer";
import { authSession } from "@/lib/auth-utils";

export async function getEnquiries() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { id: true, name: true, slug: true, partNo: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return { success: true, data: enquiries };
  } catch (error) {
    console.error("getEnquiries error:", error);
    return { success: false, message: "Failed to fetch enquiries." };
  }
}

export async function createEnquiry(
  productId: string,
  quantity: number,
  message?: string
) {
  try {
    const session = await authSession();
    if (!session?.user?.id) {
      return { success: false, message: "Please sign in to send an enquiry." };
    }

    if (!productId) {
      return { success: false, message: "Product is required." };
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      return { success: false, message: "Quantity must be at least 1." };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    await prisma.enquiry.create({
      data: {
        productId,
        userId: session.user.id,
        quantity: qty,
        message: message?.trim() || null,
      },
    });

    // Send email to owner when new enquiry is created
    const ownerEmail = process.env.NODEMAILER_USER;
    if (ownerEmail) {
      try {
        await transporter.sendMail({
          from: `"Website Enquiry" <${ownerEmail}>`,
          to: ownerEmail,
          replyTo: session.user.email ?? undefined,
          subject: "📦 New Product Enquiry",
          html: `
            <h3>New Product Enquiry</h3>
            <p><b>Product:</b> ${product.name}</p>
            <p><b>Part No:</b> ${product.partNo}</p>
            <p><b>Customer:</b> ${session.user.name ?? "—"}</p>
            <p><b>Email:</b> ${session.user.email ?? "—"}</p>
            <p><b>Quantity:</b> ${qty}</p>
            ${message?.trim() ? `<p><b>Message:</b><br/>${message.trim()}</p>` : ""}
            <br/>
            <p><small>Reply to this email to respond to the customer.</small></p>
          `,
        });
      } catch (mailError) {
        console.error("Enquiry email error:", mailError);
        // Enquiry was saved; don't fail the request if email fails
      }
    }

    return { success: true, message: "Enquiry sent successfully." };
  } catch (error) {
    console.error("createEnquiry error:", error);
    return { success: false, message: "Failed to send enquiry." };
  }
}

export async function deleteEnquiry(id: string) {
  try {
    if (!id) {
      return { success: false, message: "ID is required." };
    }
    await prisma.enquiry.delete({
      where: { id },
    });
    return { success: true, message: "Enquiry deleted." };
  } catch (error) {
    console.error("deleteEnquiry error:", error);
    return { success: false, message: "Failed to delete enquiry." };
  }
}
