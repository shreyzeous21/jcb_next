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
import { useCategory } from "@/hooks/use-category";
import { useProduct } from "@/hooks/use-product";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function CategoryChart() {
  const { categories, isLoading, error } = useCategory();
  const { products } = useProduct();

  const { chartData, chartConfig, totalCategories } = React.useMemo(() => {
    const productCountByCategory: Record<string, number> = {};
    for (const cat of categories) {
      productCountByCategory[cat.id] = 0;
    }
    for (const p of products) {
      productCountByCategory[p.categoryId] =
        (productCountByCategory[p.categoryId] ?? 0) + 1;
    }
    const config: ChartConfig = {
      count: { label: "Categories" },
    };
    const data: {
      categoryId: string;
      categoryName: string;
      count: number;
      fill: string;
    }[] = [];
    categories.forEach((cat, i) => {
      const key = cat.id;
      config[key] = {
        label: cat.name,
        color: CHART_COLORS[i % CHART_COLORS.length],
      };
      data.push({
        categoryId: key,
        categoryName: cat.name,
        count: productCountByCategory[cat.id] ?? 0,
        fill: CHART_COLORS[i % CHART_COLORS.length],
      });
    });
    return {
      chartData: data,
      chartConfig: config,
      totalCategories: categories.length,
    };
  }, [categories, products]);

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Total categories · products per category
          </CardDescription>
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
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Total categories · products per category
          </CardDescription>
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
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Total categories · products per category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="categoryName" />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="categoryName"
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
                          {totalCategories.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Categories
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
          {totalCategories} categor{totalCategories !== 1 ? "ies" : "y"} total ·
          slice size = products in that category
        </div>
      </CardFooter>
    </Card>
  );
}
