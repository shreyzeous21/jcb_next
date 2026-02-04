import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import ContactEnquiry from "../ContactEnquiry";

type SingleProductProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
    stock: string;
    partNo: string;
    nksCode: string;
    category: { name: string };
    pdfs?: { id: string; url: string }[];
  };
};

export default function SingleProduct({ product }: SingleProductProps) {
  const inStock = product.stock === "IN_STOCK";

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      {/* BACK */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="flex flex-col gap-8 p-6">
          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-64 aspect-square overflow-hidden rounded-xl border bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="256px"
                unoptimized
              />

              <Badge
                className={cn(
                  "absolute left-3 top-3 px-3 py-1 text-xs",
                  inStock
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 text-white",
                )}
              >
                {product.stock.replace("_", " ")}
              </Badge>
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {product.category.name}
            </p>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.slug}</p>
          </div>

          {/* SPEC TABLE */}
          <div className="overflow-hidden rounded-xl border">
            <div className="divide-y">
              <SpecRow label="Part Number" value={product.partNo} />
              <SpecRow label="NKS Code" value={product.nksCode} />
              <SpecRow
                label="Availability"
                value={product.stock.replace("_", " ")}
                valueClass={inStock ? "text-emerald-600" : "text-red-500"}
              />
            </div>
          </div>

          {/* PDF DOWNLOAD (optional) */}
          {product.pdfs?.[0]?.url && (
            <div className="rounded-xl border bg-muted/30 p-4">
              <a
                href={product.pdfs[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <FileText className="h-4 w-4" />
                Download product PDF
              </a>
            </div>
          )}

          <ContactEnquiry product={product} />
        </CardContent>
      </Card>
    </section>
  );
}

/* SMALL HELPER COMPONENT */
function SpecRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", valueClass)}>{value}</span>
    </div>
  );
}
