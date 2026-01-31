"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCategory } from "@/hooks/use-category";

export type FilterContentProps = {
  stockStatus: string;
  setStockStatus: (v: string) => void;
  categoryId: string;
  setCategoryId: (v: string) => void;
};

export default function FilterContent({
  stockStatus,
  setStockStatus,
  categoryId,
  setCategoryId,
}: FilterContentProps) {
  const { categories, isLoading } = useCategory();

  return (
    <div className="space-y-6 p-4">
      {/* STOCK STATUS */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stock Status
        </Label>

        <RadioGroup
          value={stockStatus}
          onValueChange={setStockStatus}
          className="space-y-1"
        >
          {[
            { value: "in-stock", label: "In Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
          ].map((item) => (
            <div key={item.value} className="flex items-center gap-3">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CATEGORY */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Product Type
        </Label>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        ) : (
          <RadioGroup
            value={categoryId}
            onValueChange={setCategoryId}
            className="space-y-1"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="" id="category-all" />
              <Label htmlFor="category-all">All</Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  );
}
