"use client";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ThemeToggle";

import { navLinks, WEBSITE_LOGO } from "./constant";
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
      <header className=" mx-auto flex h-18 items-center justify-between px-4 border-b-2 border-primary bg-yellow-400 backdrop-blur rounded-b-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={WEBSITE_LOGO}
            alt="JCV Parts Logo"
            width={1000}
            height={1000}
            className="h-20 w-40 object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((item) => (
           <Link
           key={item.name}
           href={item.href}
           className={cn(
             "relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300",
         
             // default state
             "text-black hover:text-yellow-600",
         
             // hover underline (subtle)
             "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all hover:after:w-6",
         
             // 🔥 active glass effect
             isActive(item.href) &&
               "text-yellow-700 bg-white/40 backdrop-blur-md border border-yellow-300/40 shadow-md shadow-yellow-200/40 after:w-0"
           )}
         >
           {item.name}
         </Link>
          ))}
        </nav>

        <div className="hidden md:flex space-x-2">
          {/* <ModeToggle /> */}
          {!session?.user ? <GoogleButton /> : <LogoutButton />}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MobileHeader pathname={pathname} session={session} />
        </div>
      </header>
    </div>
  );
}
