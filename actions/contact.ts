"use server";

import prisma from "@/lib/prisma";
import transporter from "@/lib/nodemailer";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    message: z.string().min(5),
});

export async function sendContactEmail(
    data: z.infer<typeof contactSchema>
) {
    try {
        const validated = contactSchema.parse(data);

        // Save to DB
        const contact = await prisma.contact.create({
            data: validated,
        });

        // Email config
        await transporter.sendMail({
            from: `"Website Contact" <${process.env.NODEMAILER_USER}>`,
            to: process.env.NODEMAILER_USER,
            replyTo: validated.email,
            subject: "📩 New Contact Form Submission",
            html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${validated.name}</p>
        <p><b>Email:</b> ${validated.email}</p>
        <p><b>Phone:</b> ${validated.phone}</p>
        <p><b>Message:</b> ${validated.message}</p>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, error: "Failed to send message" };
    }
}
