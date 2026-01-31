import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappButton from "@/components/layout/WhatsappButton";
import QueryProvider from "./QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niksparts.com"),

  title: {
    default: "Niks Spares | Quality JCB Spare Parts & Accessories",
    template: "%s | Niks Spares",
  },

  description:
    "Niks Spares is a trusted platform for buying high-quality JCB spare parts and accessories at competitive prices across India.",

  keywords: [
    "Niks Spares",
    "JCB Spare Parts",
    "Auto Parts India",
    "JCB Accessories",
    "Vehicle Spare Parts",
    "Automobile Parts Supplier",
  ],

  authors: [{ name: "Niks Spares" }],
  creator: "Niks Spares",
  publisher: "Niks Spares",

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
    icon: "/jcblogo.jpg",
    apple: "/jcblogo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.niksparts.com",
    siteName: "Niks Parts",
    title: "Niks Parts | Quality Car Spare Parts & Accessories",
    description:
      "Buy genuine car spare parts and accessories from Niks Parts. Trusted by customers across India.",
    images: [
      {
        url: "/jcblogo.jpg",
        width: 1200,
        height: 630,
        alt: "Niks Parts - Car Spare Parts Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Niks Parts | Quality Car Spare Parts",
    description:
      "Your trusted destination for car spare parts and accessories.",
    images: ["/jcblogo.jpg"],
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
            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
