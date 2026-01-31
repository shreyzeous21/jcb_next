"use server";

import prisma from "@/lib/prisma";

export type ProductInput = {
    name: string;
    slug?: string;
    image: string;
    partNo: string;
    nksCode: string;
    stock: "IN_STOCK" | "OUT_OF_STOCK";
    categoryId: string;
};

/** Generate URL-friendly slug from name (e.g. "My Product" → "my-product") */
function slugify(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "product";
}

/** Return a slug that is unique in DB, optionally excluding a product id (for update) */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
    let slug = baseSlug;
    let n = 0;
    while (true) {
        const existing = await prisma.product.findFirst({
            where: {
                slug,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
        });
        if (!existing) return slug;
        n += 1;
        slug = `${baseSlug}-${n}`;
    }
}

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: {
                    select: { id: true, name: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, products };
    } catch (error) {
        console.error("getProducts error:", error);
        return { success: false, error: "Failed to fetch products" };
    }
}

async function validateProductInput(data: ProductInput) {
    const name = data.name?.trim();
    const image = data.image?.trim();
    const partNo = data.partNo?.trim();
    const nksCode = data.nksCode?.trim();
    const slug = data.slug?.trim() || (name ? slugify(name) : "product");
    if (!name) return { ok: false, error: "Name is required" };
    if (!image) return { ok: false, error: "Image URL is required" };
    if (!partNo) return { ok: false, error: "Part number is required" };
    if (!nksCode) return { ok: false, error: "NKS code is required" };
    if (!data.categoryId) return { ok: false, error: "Category is required" };
    if (data.stock !== "IN_STOCK" && data.stock !== "OUT_OF_STOCK") {
        return { ok: false, error: "Invalid stock status" };
    }
    return {
        ok: true as const,
        data: { name, slug, image, partNo, nksCode, stock: data.stock, categoryId: data.categoryId },
    };
}

export async function createProduct(input: ProductInput) {
    try {
        const validated = await validateProductInput(input);
        if (!validated.ok) return { success: false, error: validated.error };
        const data = validated.ok ? validated.data : undefined;
        if (!data) return { success: false, error: "Validation failed" };

        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!category) {
            return { success: false, error: "Category not found" };
        }

        const uniqueSlug = await ensureUniqueSlug(data.slug);

        const product = await prisma.product.create({
            data: { ...data, slug: uniqueSlug },
            include: {
                category: { select: { id: true, name: true } },
            },
        });
        return { success: true, product };
    } catch (error) {
        console.error("createProduct error:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(id: string, input: ProductInput) {
    try {
        const validated = await validateProductInput(input);
        if (!validated.ok) return { success: false, error: validated.error };
        const data = validated.ok ? validated.data : undefined;
        if (!data) return { success: false, error: "Validation failed" };

        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!category) {
            return { success: false, error: "Category not found" };
        }

        const uniqueSlug = await ensureUniqueSlug(data.slug, id);

        const product = await prisma.product.update({
            where: { id },
            data: { ...data, slug: uniqueSlug },
            include: {
                category: { select: { id: true, name: true } },
            },
        });
        return { success: true, product };
    } catch (error) {
        console.error("updateProduct error:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error("deleteProduct error:", error);
        return { success: false, error: "Failed to delete product" };
    }
}
