import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./constant";
import NewsletterForm from "./NewsletterForm";
import { Mail, Map, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            >
              <Image
                src="/jcblogo.jpg"
                alt="Niks Spares – JCB Parts"
                width={140}
                height={140}
                className="h-24 w-auto object-contain rounded-md"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Worldwide quality supplier of new replacement parts for JCB®
              equipment and engines. Premium parts, exceptional service, fast
              fulfillment.
            </p>
            <span className="flex flex-col gap-2">
              Address:
              <p className="text-sm  dark:text-white leading-relaxed max-w-xs">
                Village Deha Bhupani, Near Harold Public School, Near Police
                Station, Faridabad, Haryana-121002
              </p>
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="sr-only">Location</span>
                <span className="flex items-center gap-2">
                  <Map className="h-4 w-4" /> India
                </span>
              </li>
              <li className="">
                <a
                  href="tel:+919990013518"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" /> +91 99900 13518
                </a>
              </li>
              <li>
                <a
                  href="mailto:niksspares2023@gmail.com"
                  className="hover:text-foreground transition-colors break-all flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" /> niksspares2023@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Get updates on new parts, offers, and industry news. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Niks Spares. All rights reserved.</p>
          <p className="text-muted-foreground/80">
            JCB® is a registered trademark. We are not affiliated with J C
            Bamford Excavators Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
