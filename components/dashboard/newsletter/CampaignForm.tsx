"use client";

import { useTransition, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SendHorizonal, Package, Users, User } from "lucide-react";
import { useNewsletter } from "@/hooks/use-newsletter";
import { useProduct } from "@/hooks/use-product";
import { sendCampaign } from "@/actions/campaign";
import { toast } from "sonner";

export default function CampaignForm() {
  const [isPending, startTransition] = useTransition();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientMode, setRecipientMode] = useState<"all" | "specific">("all");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const { newsletters, isLoading: subsLoading } = useNewsletter();
  const { products, isLoading: productsLoading } = useProduct();

  const toggleEmail = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const recipientCount =
    recipientMode === "all" ? newsletters.length : selectedEmails.length;

  const handleSend = () => {
    startTransition(async () => {
      const result = await sendCampaign({
        subject,
        message,
        productIds: selectedProductIds,
        recipients: recipientMode === "all" ? "all" : selectedEmails,
      });

      if (!result.success) {
        toast.error(result.error ?? "Failed to send campaign");
        return;
      }

      toast.success(`Campaign sent to ${result.count} subscriber${result.count !== 1 ? "s" : ""}`);
      setSubject("");
      setMessage("");
      setSelectedProductIds([]);
      setSelectedEmails([]);
      setRecipientMode("all");
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* LEFT — Compose */}
      <div className="xl:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compose Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g. New Product Launch — JCB Parts"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your campaign message here…"
                className="min-h-[160px] resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Product selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Attach Products
              {selectedProductIds.length > 0 && (
                <Badge variant="secondary">{selectedProductIds.length} selected</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <p className="text-sm text-muted-foreground">Loading products…</p>
            ) : products.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {products.map((product) => (
                  <label
                    key={product.id}
                    className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedProductIds.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                      className="mt-0.5"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Part No: {product.partNo}
                      </p>
                      <Badge
                        variant={product.stock === "IN_STOCK" ? "default" : "destructive"}
                        className="mt-1 text-[10px] px-1.5 py-0"
                      >
                        {product.stock === "IN_STOCK" ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT — Recipients & Send */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={recipientMode}
              onValueChange={(v) => setRecipientMode(v as "all" | "specific")}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all" className="cursor-pointer">
                  All subscribers
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({newsletters.length})
                  </span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="specific" id="r-specific" />
                <Label htmlFor="r-specific" className="cursor-pointer">
                  Select specific
                </Label>
              </div>
            </RadioGroup>

            {recipientMode === "specific" && (
              <>
                <Separator />
                {subsLoading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : newsletters.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {newsletters.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-2 rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          checked={selectedEmails.includes(sub.email)}
                          onCheckedChange={() => toggleEmail(sub.email)}
                        />
                        <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{sub.email}</span>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="text-sm space-y-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>Recipients</span>
                <span className="font-medium text-foreground">{recipientCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Products attached</span>
                <span className="font-medium text-foreground">{selectedProductIds.length}</span>
              </div>
            </div>
            <Separator />
            <Button
              className="w-full"
              onClick={handleSend}
              disabled={
                isPending ||
                !subject.trim() ||
                !message.trim() ||
                recipientCount === 0
              }
            >
              <SendHorizonal className="h-4 w-4 mr-2" />
              {isPending
                ? "Sending…"
                : `Send to ${recipientCount} subscriber${recipientCount !== 1 ? "s" : ""}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
