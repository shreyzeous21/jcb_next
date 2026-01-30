import nodemailer from "nodemailer";

if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_APP_PASSWORD) {
  throw new Error("NODEMAILER_USER or NODEMAILER_APP_PASSWORD is not set");
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

export default transporter;
