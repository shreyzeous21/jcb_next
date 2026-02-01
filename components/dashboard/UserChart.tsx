"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useUser } from "@/hooks/use-user";

const ROLES = ["SUPERADMIN", "ADMIN", "USER"] as const;
const chartConfig = {
  count: {
    label: "Users",
  },
  SUPERADMIN: {
    label: "Super Admin",
    color: "var(--chart-1)",
  },
  ADMIN: {
    label: "Admin",
    color: "var(--chart-2)",
  },
  USER: {
    label: "User",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function UserChart() {
  const { data: users, isLoading, error } = useUser();

  const chartData = React.useMemo(() => {
    const counts: Record<string, number> = {
      SUPERADMIN: 0,
      ADMIN: 0,
      USER: 0,
    };
    for (const user of users) {
      if (ROLES.includes(user.role as (typeof ROLES)[number])) {
        counts[user.role] = (counts[user.role] ?? 0) + 1;
      }
    }
    return ROLES.map((role) => ({
      role,
      count: counts[role] || 0,
      fill: chartConfig[role].color,
    }));
  }, [users]);

  const totalUsers = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.count, 0),
    [chartData],
  );

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Users by role</CardTitle>
          <CardDescription>Total registered users</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Users by role</CardTitle>
          <CardDescription>Total registered users</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center py-12">
          <p className="text-sm text-destructive">Error: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users by role</CardTitle>
        <CardDescription>Total registered users</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="role" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {totalUsers} user{totalUsers !== 1 ? "s" : ""} total · breakdown by
          role (Super Admin, Admin, User)
        </div>
      </CardFooter>
    </Card>
  );
}
