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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-7 w-48" />
          </div>
          <Skeleton className="h-4 w-64 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !categories?.length) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-primary/10">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl sm:text-2xl tracking-tight">
            Shop by Category
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pl-11">
          Browse our products by type
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
