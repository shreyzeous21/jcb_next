"use client";

import React from "react";
import Link from "next/link";
import { useCategory } from "@/hooks/use-category";
import { ChevronRight, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CategoryListHome() {
  const { categories, isLoading, error } = useCategory();

  if (isLoading) {
    return (
      <Card className="p-0">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !categories?.length) return null;

  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
              Shop by Category
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Browse genuine parts by category
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group flex items-center gap-2
                     rounded-md border border-border
                     bg-background px-4 py-2
                     text-sm font-medium
                     transition-all duration-200
                     hover:border-primary hover:bg-primary/5
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="whitespace-nowrap text-foreground group-hover:text-primary">
                {category.name}
              </span>

              <ChevronRight
                className="h-4 w-4 text-muted-foreground transition-transform
                       group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
