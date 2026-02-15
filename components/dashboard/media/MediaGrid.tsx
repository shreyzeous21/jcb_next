"use client";

import { Button } from "@/components/ui/button";
import { TOTAL_LIMIT_BYTES } from "@/components/layout/constant";
import { useMediaManager } from "@/hooks/use-media-manager";
import {
  File,
  FileText,
  Film,
  Music,
  Image as ImageIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export default function MediaGrid() {
  const { media, isLoading, deleteMediaMutation } = useMediaManager();

  if (isLoading) return <p>Loading media...</p>;

  const totalUsedBytes =
    media?.reduce((acc: number, item: any) => acc + item.size, 0) || 0;

  const remainingBytes = TOTAL_LIMIT_BYTES - totalUsedBytes;
  const usagePercent = Math.min(
    (totalUsedBytes / TOTAL_LIMIT_BYTES) * 100,
    100,
  );

  return (
    <div>
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Storage Used</span>
          <span>{formatFileSize(totalUsedBytes)} / 2 GB</span>
        </div>

        <Progress value={usagePercent} />

        <p className="text-xs text-muted-foreground">
          {remainingBytes > 0
            ? `${formatFileSize(remainingBytes)} remaining`
            : "Storage limit reached"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media?.map((item: any) => (
          <div
            key={item.id}
            className="w-auto border rounded-md p-2 text-center relative"
          >
            {/* IMAGE */}
            {item.type.startsWith("image") && (
              <Image
                src={item.url}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-auto object-contain rounded-md"
              />
            )}

            {/* VIDEO */}
            {item.type.startsWith("video") && (
              <div className="h-24 flex items-center justify-center">
                <Film className="w-8 h-8 text-muted-foreground" />
              </div>
            )}

            {/* AUDIO */}
            {item.type.startsWith("audio") && (
              <div className="h-24 flex items-center justify-center">
                <Music className="w-8 h-8 text-muted-foreground" />
              </div>
            )}

            {/* PDF */}
            {item.type === "application/pdf" && (
              <div className="h-24 flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
            )}

            {/* TEXT / OTHER */}
            {!item.type.startsWith("image") &&
              !item.type.startsWith("video") &&
              !item.type.startsWith("audio") &&
              item.type !== "application/pdf" && (
                <div className="h-24 flex items-center justify-center">
                  <File className="w-8 h-8 text-muted-foreground" />
                </div>
              )}

            {/* FILE NAME */}
            <p className="mt-2 text-xs truncate">{item.name}</p>

            {/* FILE TYPE BADGE */}
            <p className="text-[10px] text-muted-foreground">
              {getReadableType(item.type)} • {formatFileSize(item.size)}
            </p>

            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => deleteMediaMutation.mutate(item.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Helper to show readable type */
function getReadableType(type: string) {
  if (type.startsWith("image")) return "Image";
  if (type.startsWith("video")) return "Video";
  if (type.startsWith("audio")) return "Audio";
  if (type === "application/pdf") return "PDF";
  if (type.startsWith("text")) return "Text";
  return "File";
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 KB";

  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}
