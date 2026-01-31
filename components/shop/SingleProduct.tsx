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
    <div className="space-y-6">
      {/* BACK */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* IMAGE CARD */}
        <Card className="overflow-hidden rounded-2xl border bg-muted">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />

            {/* STOCK BADGE */}
            <Badge
              className={`absolute left-4 top-4 ${
                inStock
                  ? "bg-green-600 text-white"
                  : "bg-zinc-900 text-white"
              }`}
            >
              {product.stock.replace("_", " ")}
            </Badge>
          </div>
        </Card>

        {/* DETAILS CARD */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              {product.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {product.slug}
            </p>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">
                {product.category.name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Part No</span>
              <span className="font-medium">{product.partNo}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">NKS Code</span>
              <span className="font-medium">{product.nksCode}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock</span>
              <span
                className={`font-medium ${
                  inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock.replace("_", " ")}
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <Button
              variant="outline"
              className="w-full"
            >
              Contact for Enquiry
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
