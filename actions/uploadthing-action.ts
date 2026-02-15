"use server";

import prisma from "@/lib/prisma";
import { MediaCategory } from "@/lib/generated/prisma/enums";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export type UploadMediaProps = {
    file: {
        name: string;
        url: string;
        key: string;
        type: string;
        size: number;
    };
    category: MediaCategory;
};

export async function uploadMedia(props: UploadMediaProps) {
    try {
        const { file, category } = props;

        if (!file || !category) {
            throw new Error("File and category are required");
        }

        if (!Object.values(MediaCategory).includes(category)) {
            throw new Error("Invalid category");
        }

        const media = await prisma.mediaManager.create({
            data: {
                name: file.name,
                url: file.url,
                key: file.key,
                type: file.type,
                size: file.size,
                category,
            },
        });
        return media;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to upload media");
    }
}

export async function getMedia() {
    try {
        const media = await prisma.mediaManager.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return media;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch media");
    }
}

export async function deleteMedia(id: string) {
    try {
        const media = await prisma.mediaManager.findUnique({
            where: { id },
        });
        if (!media) {
            throw new Error("Media not found");
        }
        await utapi.deleteFiles(media.key);
        const deletedMedia = await prisma.mediaManager.delete({
            where: { id },
        });
        return deletedMedia;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Failed to delete media");
    }
}
