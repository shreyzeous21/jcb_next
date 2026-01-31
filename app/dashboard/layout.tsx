import AppSidebar from "@/components/dashboard/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authSession();
  if (!session || session.user.role === "USER") {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar session={session} />

      <SidebarInset className="flex min-h-screen flex-col bg-card">
        <header className="flex h-14 sticky top-0 z-10 items-center justify-between border-b bg-card/40 backdrop-blur-md px-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
