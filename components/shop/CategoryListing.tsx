"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Filter, FilterX } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCategory } from "@/hooks/use-category";
import { useProduct } from "@/hooks/use-product";

/* Reusable Filter UI */
function FilterContent({
  stockStatus,
  setStockStatus,
  categoryId,
  setCategoryId,
}: {
  stockStatus: string;
  setStockStatus: (v: string) => void;
  categoryId: string;
  setCategoryId: (v: string) => void;
}) {
  const { categories, isLoading } = useCategory();

  return (
    <div className="space-y-6 p-4">
      {/* STOCK STATUS */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stock Status
        </Label>

        <RadioGroup
          value={stockStatus}
          onValueChange={setStockStatus}
          className="space-y-1"
        >
          {[
            { value: "in-stock", label: "In Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
          ].map((item) => (
            <div key={item.value} className="flex items-center gap-3">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CATEGORY */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Product Type
        </Label>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        ) : (
          <RadioGroup
            value={categoryId}
            onValueChange={setCategoryId}
            className="space-y-1"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="" id="category-all" />
              <Label htmlFor="category-all">All</Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  );
}

const STOCK_FILTER_MAP = {
  "in-stock": "IN_STOCK" as const,
  "out-of-stock": "OUT_OF_STOCK" as const,
  "on-sale": null, // show all
};

export default function CategoryListing() {
  const [stockStatus, setStockStatus] = useState("in-stock");
  const [categoryId, setCategoryId] = useState("");

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
  } = useProduct();
  const { categories } = useCategory();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchStock =
        STOCK_FILTER_MAP[stockStatus as keyof typeof STOCK_FILTER_MAP] ===
          null ||
        product.stock ===
          STOCK_FILTER_MAP[stockStatus as keyof typeof STOCK_FILTER_MAP];
      const matchCategory = !categoryId || product.categoryId === categoryId;
      return matchStock && matchCategory;
    });
  }, [products, stockStatus, categoryId]);

  const clearFilters = () => {
    setStockStatus("in-stock");
    setCategoryId("");
  };

  const selectedCategoryName = categoryId
    ? (categories.find((c) => c.id === categoryId)?.name ?? "All")
    : "All";

  return (
    <div className="flex lg:flex-row flex-col gap-6 w-full">
      {/* DESKTOP FILTER */}
      <Card className="hidden lg:block w-full lg:max-w-xs rounded-xl h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            Filters
            <FilterX
              onClick={clearFilters}
              className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary transition"
            />
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <FilterContent
            stockStatus={stockStatus}
            setStockStatus={setStockStatus}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </CardContent>
      </Card>

      {/* MOBILE FILTER */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-[85%] sm:w-[360px]">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <FilterContent
              stockStatus={stockStatus}
              setStockStatus={setStockStatus}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* PRODUCTS */}
      <Card className="w-full min-h-[400px] rounded-xl p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>
            Stock:{" "}
            <b className="text-foreground">{stockStatus.replace("-", " ")}</b>
          </span>
          <span>·</span>
          <span>
            Category: <b className="text-foreground">{selectedCategoryName}</b>
          </span>
          <span>·</span>
          <span>
            <b className="text-foreground">{filteredProducts.length}</b> product
            {filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {productsLoading && (
          <p className="text-sm text-muted-foreground py-8">
            Loading products...
          </p>
        )}
        {productsError && (
          <p className="text-sm text-destructive py-8">
            Error: {productsError.message}
          </p>
        )}
        {!productsLoading &&
          !productsError &&
          filteredProducts.length === 0 && (
            <p className="text-sm text-muted-foreground py-8">
              No products match the selected filters.
            </p>
          )}
        {!productsLoading && !productsError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition hover:shadow-md hover:border-primary/50"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product.partNo} · {product.nksCode}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.category.name}
                </p>
                <Badge
                  variant={
                    product.stock === "IN_STOCK" ? "default" : "secondary"
                  }
                  className="mt-2"
                >
                  {product.stock === "IN_STOCK" ? "In stock" : "Out of stock"}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
