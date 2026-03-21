import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import PhoneFloatingButton from "@/components/PhoneFloatingButton";
import QueryProvider from "./QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niksparts.com"),

  title: {
    default: "Niksparts | Quality JCB Spare Parts & Accessories",
    template: "%s | Niks Spares",
  },

  description:
    "Niksparts is a trusted platform for buying high-quality JCB spare parts and accessories at competitive prices across India.",

  keywords: [
    "Niksparts",
    "JCB Spare Parts",
    "Auto Parts India",
    "JCB Accessories",
    "Vehicle Spare Parts",
    "Automobile Parts Supplier",
  ],

  authors: [{ name: "Niksparts" }],
  creator: "Niksparts",
  publisher: "Niksparts",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo1.jpeg",
    apple: "/logo1.jpeg",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.niksparts.com",
    siteName: "Niks Parts",
    title: "Niksparts | Quality JCB Spare Parts & Accessories",
    description:
      "Buy genuine JCB spare parts and accessories from Niksparts. Trusted by customers across India.",
    images: [
      {
        url: "/logo1.jpeg",
        width: 1200,
        height: 630,
        alt: "Niksparts - JCB Spare Parts Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Niksparts | Quality JCB Spare Parts",
    description:
      "Your trusted destination for JCB spare parts and accessories.",
    images: ["/logo1.jpeg"],
    creator: "@niksparts", // optional
  },

  alternates: {
    canonical: "https://www.niksparts.com",
  },

  category: "Automotive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable}  antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <WhatsappButton />
            <PhoneFloatingButton />

            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
