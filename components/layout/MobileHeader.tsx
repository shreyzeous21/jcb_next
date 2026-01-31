import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Mail, MenuIcon, Phone } from "lucide-react";
import { navLinks } from "./constant";
import Link from "next/link";
import { ModeToggle } from "../ThemeToggle";
import GoogleButton from "../GoogleButton";
import LogoutButton from "../LogoutButton";

export default function MobileHeader({
  pathname,
  session,
}: {
  pathname?: string;
  session?: any;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="border-b border-primary">
          <SheetTitle>JCV Parts</SheetTitle>
          <SheetDescription>
            Reliable automotive & industrial solutions
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col ">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors
          ${
            isActive
              ? "bg-primary/10 text-primary border-l-4 border-primary"
              : "text-muted-foreground hover:bg-muted hover:text-primary"
          }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <SheetFooter className="flex flex-col gap-4 border-t border-primary pt-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <ModeToggle />
            {!session?.user ? <GoogleButton /> : <LogoutButton />}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="mailto:niksspares2023@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
