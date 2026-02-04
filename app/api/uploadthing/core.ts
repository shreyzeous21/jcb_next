import { authSession } from "@/lib/auth-utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  /** PDF upload for product attachment (dashboard only, optional per product) */
  pdfUploader: f({
    "application/pdf": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await authSession();
      if (!session?.user?.id) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),
} satisfies FileRouter;

// This gives you a TypeScript type that describes all endpoints.
// You’ll use this type in React to make sure endpoint="imageUploader" is valid and type-safe.
export type OurFileRouter = typeof ourFileRouter;
