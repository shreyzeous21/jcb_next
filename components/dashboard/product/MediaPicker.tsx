"use client";

import { useMediaManager } from "@/hooks/use-media-manager";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FileText } from "lucide-react";
import { useCallback } from "react";

export type MediaPickerType = "image" | "pdf";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
};

function filterMedia(media: MediaItem[] | undefined, kind: MediaPickerType): MediaItem[] {
  if (!media) return [];
  if (kind === "image") return media.filter((m) => m.type.startsWith("image/"));
  return media.filter((m) => m.type === "application/pdf");
}

export type MediaPickerProps = {
  kind: MediaPickerType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string | null;
  onSelect: (url: string) => void;
  disabled?: boolean;
};

export function MediaPicker({
  kind,
  open,
  onOpenChange,
  value,
  onSelect,
  disabled,
}: MediaPickerProps) {
  const { media, isLoading } = useMediaManager();
  const items = filterMedia(media as MediaItem[] | undefined, kind);
  const label = kind === "image" ? "Image" : "PDF";

  const handleSelect = useCallback(
    (url: string) => {
      onSelect(url);
      onOpenChange(false);
    },
    [onSelect, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose {label} from Media</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="text-sm text-muted-foreground py-6">Loading media…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6">
            No {kind === "image" ? "images" : "PDFs"} in media library. Upload some in Media Manager first.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-auto min-h-0 py-2">
            {items.map((item) => {
              const isSelected = value === item.url;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(item.url)}
                  className={`rounded-lg border-2 p-2 text-left transition-colors hover:border-primary hover:bg-muted/50 ${
                    isSelected ? "border-primary bg-primary/10" : "border-muted"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {kind === "image" ? (
                    <div className="relative aspect-square rounded overflow-hidden bg-muted">
                      <Image
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="120px"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center rounded bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <p className="mt-1.5 text-xs truncate" title={item.name}>
                    {item.name}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
