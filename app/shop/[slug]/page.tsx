import SingleProduct from "@/components/shop/SingleProduct";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: { select: { id: true, name: true } },
    },
  });
  if (!product) notFound();
  return (
    <div className=" mx-auto px-4 py-6">
      <SingleProduct product={product} />
    </div>
  );
}
