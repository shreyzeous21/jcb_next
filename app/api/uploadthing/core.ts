import { authSession } from "@/lib/auth-utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    video: { maxFileSize: "256MB", maxFileCount: 2 },
    audio: { maxFileSize: "32MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    text: { maxFileSize: "8MB", maxFileCount: 5 },
    blob: { maxFileSize: "512MB", maxFileCount: 5 },
  }).middleware(async () => {
    const session = await authSession();
    if (!session?.user?.id) {
      throw new UploadThingError("Unauthorized");
    }

    return { userId: session.user.id };
  })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.url,
        key: file.key,
        name: file.name,
        size: file.size,
        type: file.type,
        userId: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
