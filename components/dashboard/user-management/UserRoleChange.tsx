"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";

const ROLES = ["SUPERADMIN", "ADMIN", "USER"] as const;
type Role = (typeof ROLES)[number];

type UserRoleChangeProps = {
  userId: string;
  currentRole: Role;
};

export default function UserRoleChange({
  userId,
  currentRole,
}: UserRoleChangeProps) {
  const { updateUserRole } = useUser();
  const isPending = updateUserRole.isPending;

  const handleValueChange = (value: Role) => {
    if (value === currentRole) return;
    updateUserRole.mutate({ id: userId, role: value });
  };

  return (
    <Select
      value={currentRole}
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger size="sm" className="w-[120px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
