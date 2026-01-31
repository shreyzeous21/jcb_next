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

        // 1️⃣ Save to DB
        await prisma.contact.create({
            data: {
                name: validated.name,
                email: validated.email,
                phone: validated.phone,
                message: validated.message,
            },
        });

        // 2️⃣ Mail to OWNER
        await transporter.sendMail({
            from: `"Website Contact" <${process.env.NODEMAILER_USER}>`,
            to: process.env.NODEMAILER_USER, // OWNER EMAIL
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

        // 3️⃣ Confirmation mail to USER
        await transporter.sendMail({
            from: `"Your Company" <${process.env.NODEMAILER_USER}>`,
            to: validated.email, // USER EMAIL
            subject: "✅ We received your message",
            html: `
        <p>Hi ${validated.name},</p>
        <p>Thanks for contacting us! We’ve received your message and will get back to you shortly.</p>
        <br />
        <p><b>Your Message:</b></p>
        <blockquote>${validated.message}</blockquote>
        <br />
        <p>Regards,<br/>Team</p>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, error: "Failed to send message" };
    }
}

export async function getContacts() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, contacts };
    } catch (error) {
        console.error("Get contacts error:", error);
        return { success: false, error: "Failed to get contacts" };
    }
}