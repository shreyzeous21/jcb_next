import prisma from "@/lib/prisma";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  return <div className=" mx-auto px-4 py-6">{product?.name}</div>;
}
