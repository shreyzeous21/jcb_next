import CategoryListing from "@/components/shop/CategoryListing";
import { Suspense } from "react";

function ShopFallback() {
  return (
    <div className="mx-auto px-4 min-h-screen py-6 flex items-center justify-center">
      <p className="text-muted-foreground">Loading shop…</p>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="mx-auto px-4 min-h-screen py-6">
      <Suspense fallback={<ShopFallback />}>
        <CategoryListing />
      </Suspense>
    </div>
  );
}
