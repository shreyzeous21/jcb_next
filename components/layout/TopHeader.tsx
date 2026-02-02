import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="hidden lg:block w-full bg-background border-b">
      <div className=" mx-auto px-4">
        <nav className="flex h-10 items-center justify-between text-sm">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6 text-muted-foreground">
            <Link
              href="mailto:niksspares2023@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              niksspares2023@gmail.com
            </Link>

            <Link
              href="tel:+919990013518"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              +91 9990013518
            </Link>
            <Link
              href="tel:+918351069465"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              +91 8351069465
            </Link>
          </div>

          {/* Right: Tagline */}
          <span className="text-muted-foreground">
            Trusted JCB Spare Parts Supplier
          </span>
        </nav>
      </div>
    </div>
  );
}
