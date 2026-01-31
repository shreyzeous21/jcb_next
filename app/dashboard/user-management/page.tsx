import UserTable from "@/components/dashboard/user-management/UserTable";
import { authSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await authSession();
  if (!session || session.user.role !== "SUPERADMIN") {
    redirect("/dashboard");
  }
  return <UserTable />;
}
