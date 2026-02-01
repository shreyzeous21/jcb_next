import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type SingleProductProps = {
  product: {
    name: string;
    slug: string;
    image: string;
    stock: string;
    partNo: string;
    nksCode: string;
    category: { name: string };
  };
};

export default function SingleProduct({ product }: SingleProductProps) {
  const inStock = product.stock === "IN_STOCK";

  return (
    <section className="mx-auto max-w-6xl space-y-8">
      {/* BACK LINK */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* IMAGE HERO */}
        <Card className="group relative overflow-hidden rounded-3xl border bg-muted shadow-sm">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />

            {/* SUBTLE GRADIENT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            {/* STOCK BADGE */}
            <Badge
              className={cn(
                "absolute left-5 top-5 rounded-full px-4 py-1 text-xs font-semibold tracking-wide shadow-lg backdrop-blur",
                inStock
                  ? "bg-emerald-600/90 text-white"
                  : "bg-zinc-900/90 text-white"
              )}
            >
              {product.stock.replace("_", " ")}
            </Badge>
          </div>
        </Card>

        {/* PRODUCT DETAILS */}
        <Card className="rounded-3xl border bg-card shadow-sm">
          <CardHeader className="space-y-2 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {product.category.name}
            </span>

            <CardTitle className="text-3xl font-bold leading-tight">
              {product.name}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {product.slug}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
              <span className="text-muted-foreground">Part No</span>
              <span className="font-semibold">{product.partNo}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
              <span className="text-muted-foreground">NKS Code</span>
              <span className="font-semibold">{product.nksCode}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
              <span className="text-muted-foreground">Availability</span>
              <span
                className={cn(
                  "font-semibold",
                  inStock ? "text-emerald-600" : "text-red-500"
                )}
              >
                {product.stock.replace("_", " ")}
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            <Button
              variant="default"
              size="lg"
              className="w-full"
            >
              Contact for Enquiry
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
