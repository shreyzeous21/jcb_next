import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProductCardProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  stock: string;
  partNo: string;
  nksCode: string;
  category: { id: string; name: string };
};

export default function ProductCard({
  product,
}: {
  product: ProductCardProduct;
}) {
  const inStock = product.stock === "IN_STOCK";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative overflow-hidden rounded-2xl border bg-card p-3
                 shadow-sm transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50
                 hover:ring-1 hover:ring-primary/20"
    >
      {/* IMAGE */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />

        {/* SOFT OVERLAY (always visible) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

        {/* STOCK BADGE */}
        <Badge
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow",
            inStock ? "bg-green-600 text-white" : "bg-zinc-900 text-white",
          )}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-1.5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Part No:</span> {product.partNo}
          <span className="mx-1.5">•</span>
          <span className="font-medium">NKS:</span> {product.nksCode}
        </p>

        {/* CATEGORY PILL */}
        <div>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Category: {product.category.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
