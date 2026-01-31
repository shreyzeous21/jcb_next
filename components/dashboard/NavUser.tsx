"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
};

export default function NavUser({ user }: Props) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <Avatar className="h-9 w-9">
        <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
        <AvatarFallback className="text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{user?.name ?? "User"}</span>

          {user?.role && (
            <Badge variant="secondary" className="text-xs">
              {user.role}
            </Badge>
          )}
        </div>

        <span className="text-xs text-muted-foreground">{user?.email}</span>
      </div>
    </div>
  );
}
