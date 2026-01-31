"use server";

import prisma from "@/lib/prisma";

export async function postCategory(name: string) {
    try {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return { success: false, error: "Category name is required" };
        }

        const existingCategory = await prisma.category.findFirst({
            where: {
                name: {
                    equals: trimmedName,
                    mode: "insensitive",
                },
            },
        });

        if (existingCategory) {
            return { success: false, error: "Category already exists" };
        }

        const category = await prisma.category.create({
            data: { name: trimmedName },
        });

        return { success: true, category };
    } catch (error) {
        console.error("postCategory error:", error);
        return { success: false, error: "Failed to create category" };
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });

        return { success: true, categories };
    } catch (error) {
        console.error("getCategories error:", error);
        return { success: false, error: "Failed to get categories" };
    }
}

export async function updateCategory(id: string, name: string) {
    try {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return { success: false, error: "Category name is required" };
        }

        // check duplicate (exclude current id)
        const existingCategory = await prisma.category.findFirst({
            where: {
                name: {
                    equals: trimmedName,
                    mode: "insensitive",
                },
                id: { not: id },
            },
        });

        if (existingCategory) {
            return { success: false, error: "Category already exists" };
        }

        const category = await prisma.category.update({
            where: { id },
            data: { name: trimmedName },
        });

        return { success: true, category };
    } catch (error) {
        console.error("updateCategory error:", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        const productCount = await prisma.product.count({
            where: { categoryId: id },
        });

        if (productCount > 0) {
            return {
                success: false,
                error: "Cannot delete category with products",
            };
        }

        await prisma.category.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error("deleteCategory error:", error);
        return { success: false, error: "Failed to delete category" };
    }
}
