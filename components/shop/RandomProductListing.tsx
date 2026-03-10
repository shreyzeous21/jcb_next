"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useProduct } from "@/hooks/use-product";
import ProductCard, { type ProductCardProduct } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const RANDOM_COUNT = 3;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card p-2 shadow-sm">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="mt-2 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export default function RandomProductListing() {
  const { products, isLoading, error } = useProduct();

  const randomProducts = useMemo(() => {
    if (!products.length) return [];
    const shuffled = shuffle(products);
    return shuffled.slice(0, Math.min(RANDOM_COUNT, products.length));
  }, [products]);

  if (error) return null;

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4">
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </section>
    );
  }

  if (randomProducts.length === 0) return null;

  const cardProducts: ProductCardProduct[] = randomProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    stock: p.stock,
    partNo: p.partNo,
    nksCode: p.nksCode,
    category: p.category,
  }));

  return (
    <section className="mx-auto w-full  px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Featured Products
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {cardProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          asChild
          size="sm"
          className="rounded-full bg-primary px-5 font-medium shadow-sm hover:bg-primary/90"
        >
          <Link href="/products" className="inline-flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" />
            View Shop
          </Link>
        </Button>
      </div>
    </section>
  );
}
