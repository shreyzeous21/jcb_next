"use client";

import React from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useMediaManager } from "@/hooks/use-media-manager";
import { MediaCategory } from "@/lib/generated/prisma/enums";

export default function MediaUploader() {
  const { createMediaMutation } = useMediaManager();

  return (
    <div className="border-dashed border-2 rounded-lg p-6 text-center">
      <UploadButton<OurFileRouter, "mediaUploader">
        endpoint="mediaUploader"
        onClientUploadComplete={(files) => {
          if (!files) return;

          files.forEach((file) => {
            createMediaMutation.mutate({
              file: {
                name: file.name,
                url: file.url,
                key: file.key,
                type: file.type,
                size: file.size,
              },
              category: getCategory(file.type),
            });
          });
        }}
        onUploadError={(error) => {
          console.error(error);
        }}
        appearance={{
          button: "bg-primary text-primary-foreground hover:bg-primary/90",
          container: "w-full",
        }}
      />

      <p className="text-sm text-muted-foreground mt-2">
        Upload images, videos, audio, PDFs & text files
      </p>
    </div>
  );
}

/* Helper */
function getCategory(type: string): MediaCategory {
  if (type.startsWith("image")) return "image";
  if (type.startsWith("video")) return "video";
  if (type.startsWith("audio")) return "audio";
  if (type === "application/pdf") return "pdf";
  if (type.startsWith("text")) return "text";
  return "other";
}
