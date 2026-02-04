"use client";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ThemeToggle";

import { navLinks } from "./constant";
import MobileHeader from "./MobileHeader";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import TopHeader from "./TopHeader";
import GoogleButton from "../GoogleButton";
import { authClient } from "@/lib/auth-client";
import LogoutButton from "../LogoutButton";

export default function Header() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const isDashboard = pathname.startsWith("/dashboard");
  if (isDashboard) {
    return null;
  }
  return (
    <div className="sticky top-0 z-50 w-full">
      <TopHeader />
      <header className=" mx-auto flex h-18 items-center justify-between px-4 border-b-2 border-primary bg-background/80 backdrop-blur rounded-b-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/jcblogo.png"
            alt="JCV Parts Logo"
            width={180}
            height={60}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                isActive(item.href) && "text-primary",
                isActive(item.href) && "after:w-full",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex space-x-2">
          <ModeToggle />
          {!session?.user ? <GoogleButton /> : <LogoutButton />}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MobileHeader pathname={pathname} session={session} />
        </div>
      </header>
    </div>
  );
}
