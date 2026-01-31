"use server";

import prisma from "@/lib/prisma";

const ALLOWED_ROLES = ["SUPERADMIN", "ADMIN", "USER"] as const;
type UserRole = (typeof ALLOWED_ROLES)[number];

// 🔹 Get all users
export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            success: true,
            users,
        };
    } catch (error) {
        console.error("getUsers error:", error);
        return {
            success: false,
            error: "Failed to fetch users",
        };
    }
}

// 🔹 Update user role
export async function updateUserRole(id: string, role: UserRole) {
    try {
        if (!ALLOWED_ROLES.includes(role)) {
            return {
                success: false,
                error: "Invalid role",
            };
        }

        const user = await prisma.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return {
            success: true,
            user,
        };
    } catch (error) {
        console.error("updateUserRole error:", error);
        return {
            success: false,
            error: "Failed to update user role",
        };
    }
}
