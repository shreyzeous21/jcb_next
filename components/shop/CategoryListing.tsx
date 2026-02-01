"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Filter, FilterX } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useCategory } from "@/hooks/use-category";
import { useProduct } from "@/hooks/use-product";
import FilterContent from "./FilterContent";
import ProductCard from "./ProductCard";

const STOCK_FILTER_MAP = {
  "in-stock": "IN_STOCK" as const,
  "out-of-stock": "OUT_OF_STOCK" as const,
  "on-sale": null, // show all
};

export default function CategoryListing() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [stockStatus, setStockStatus] = useState("in-stock");
  const [categoryId, setCategoryIdState] = useState(categoryFromUrl);

  // Sync category filter when URL changes (e.g. coming from home category link)
  useEffect(() => {
    setCategoryIdState(categoryFromUrl);
  }, [categoryFromUrl]);

  const setCategoryId = (id: string) => {
    setCategoryIdState(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("category", id);
    else params.delete("category");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
