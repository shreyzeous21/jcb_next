"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "../ui/sidebar";
import Image from "next/image";
import { DASHBOARD_MENU_ITEMS, WEBSITE_LOGO } from "../layout/constant";
import { Separator } from "../ui/separator";
import NavUser from "./NavUser";
import LogoutButton from "../LogoutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function AppSidebar({ session }: { session: any }) {
  const pathname = usePathname();

  const filteredMenuItems = DASHBOARD_MENU_ITEMS.filter(
    (item) => !item.role || item.role === session?.user?.role,
  );

  return (
    <Sidebar className="border-r">
      {/* Logo */}
      <SidebarHeader className="flex items-center justify-center ">
        <Link href="/dashboard">
          <Image
            src={WEBSITE_LOGO}
            alt="Logo"
            width={100}
            height={100}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </SidebarHeader>

      <Separator />

      {/* Menu */}
      <SidebarContent className="px-2 py-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <SidebarMenuButton
              key={item.name}
              asChild
              className={clsx(
                "justify-start rounded-md px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </SidebarMenuButton>
          );
        })}
      </SidebarContent>

      <Separator />

      {/* Footer */}
      <SidebarFooter className="px-4 py-4 space-y-3">
        <NavUser user={session?.user} />
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
