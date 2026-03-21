"use server";

import prisma from "@/lib/prisma";
import transporter from "@/lib/nodemailer";

export type CampaignInput = {
  subject: string;
  message: string;
  productIds: string[];
  recipients: "all" | string[];
};

export async function sendCampaign(input: CampaignInput) {
  try {
    const { subject, message, productIds, recipients } = input;

    if (!subject.trim()) return { success: false, error: "Subject is required" };
    if (!message.trim()) return { success: false, error: "Message is required" };

    let emails: string[] = [];
    if (recipients === "all") {
      const subs = await prisma.newsletter.findMany({ select: { email: true } });
      emails = subs.map((s) => s.email);
    } else {
      emails = recipients;
    }

    if (emails.length === 0) {
      return { success: false, error: "No recipients selected" };
    }

    let productsHtml = "";
    if (productIds.length > 0) {
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        include: { category: { select: { name: true } } },
      });

      productsHtml = `
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
        <h3 style="font-family:sans-serif;color:#111827;margin-bottom:16px;">Featured Products</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${products
            .map(
              (p) => `
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:12px 0;font-family:sans-serif;font-size:14px;">
                <strong style="color:#111827;">${p.name}</strong><br/>
                <span style="color:#6b7280;">Part No: ${p.partNo} &nbsp;·&nbsp; ${p.category.name}</span>
              </td>
              <td style="padding:12px 0;text-align:right;font-family:sans-serif;font-size:12px;color:${
                p.stock === "IN_STOCK" ? "#16a34a" : "#dc2626"
              };">
                ${p.stock === "IN_STOCK" ? "✅ In Stock" : "❌ Out of Stock"}
              </td>
            </tr>`
            )
            .join("")}
        </table>
      `;
    }

    const html = `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;color:#374151;">
        <div style="background:#1d4ed8;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:22px;">${subject}</h1>
        </div>
        <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
          <div style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</div>
          ${productsHtml}
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
          <p style="font-size:12px;color:#9ca3af;">You are receiving this because you subscribed to our newsletter.</p>
        </div>
      </div>
    `;

    await Promise.all(
      emails.map((to) =>
        transporter.sendMail({
          from: `"Newsletter" <${process.env.NODEMAILER_USER}>`,
          to,
          subject,
          html,
        })
      )
    );

    return { success: true, count: emails.length };
  } catch (error) {
    console.error("sendCampaign error:", error);
    return { success: false, error: "Failed to send campaign" };
  }
}
