import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CategoryListing() {
  return (
    <div className="flex lg:flex-row flex-col gap-4 w-full">
      <Card className="lg:max-w-xs w-full flex flex-col gap-3">
        <CardHeader>
          <CardTitle>Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">In Stock</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">In Sales</Label>
            </div>
          </RadioGroup>
        </CardContent>

        <CardHeader>
          <CardTitle>Product Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">In Stock</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">In Sales</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Card className="w-full">Category</Card>
    </div>
  );
}
