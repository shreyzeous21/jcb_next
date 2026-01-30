import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Filter, FilterX } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

/* Reusable Filter UI */
function FilterContent() {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stock Status
        </Label>

        <RadioGroup defaultValue="in-stock" className="space-y-1">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="in-stock" id="in-stock" />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="out-of-stock" id="out-of-stock" />
            <Label htmlFor="out-of-stock">Out of Stock</Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="on-sale" id="on-sale" />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Products Type
        </Label>

        <RadioGroup defaultValue="in-stock" className="space-y-1">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="in-stock" id="in-stock" />
            <Label htmlFor="in-stock">All Products</Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="out-of-stock" id="out-of-stock" />
            <Label htmlFor="out-of-stock">4 WD Items</Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="on-sale" id="on-sale" />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default function CategoryListing() {
  return (
    <div className="flex lg:flex-row flex-col gap-6 w-full">
      {/* DESKTOP FILTER */}
      <Card className="hidden lg:block w-full lg:max-w-xs rounded-xl h-fit ">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            Filters
            <FilterX className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary transition" />
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <FilterContent />
        </CardContent>
      </Card>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-[85%] sm:w-[360px]">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* PRODUCTS AREA */}
      <Card className="w-full min-h-screen rounded-xl flex items-center justify-center text-muted-foreground">
        Products Listing
      </Card>
    </div>
  );
}
