"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/use-product";
import { useCategory } from "@/hooks/use-category";
import type { ProductInput } from "@/actions/product";
import { MediaPicker } from "@/components/dashboard/product/MediaPicker";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { uploadMedia } from "@/actions/uploadthing-action";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  FileText,
  X,
  ImageIcon,
} from "lucide-react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const STOCK_OPTIONS = [
  { value: "IN_STOCK", label: "In stock" },
  { value: "OUT_OF_STOCK", label: "Out of stock" },
] as const;

const emptyForm: ProductInput = {
  name: "",
  slug: "",
  image: "",
  partNo: "",
  nksCode: "",
  stock: "IN_STOCK",
  categoryId: "",
  pdfUrl: null,
};

export default function ProductListing() {
  const {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProduct();
  const { categories } = useCategory();
  const pdfUploadFor = useRef<"add" | "edit">("add");
  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: async (res) => {
      const file = res?.[0];
      if (!file?.url) return;
      try {
        await uploadMedia({
          file: {
            name: file.name,
            url: file.url,
            key: file.key,
            type: file.type,
            size: file.size,
          },
          category: "pdf",
        });
        if (pdfUploadFor.current === "add")
          setAddForm((p) => ({ ...p, pdfUrl: file.url }));
        else setEditForm((p) => ({ ...p, pdfUrl: file.url }));
      } catch (e) {
        console.error(e);
      }
    },
  });
  const triggerPdfUpload = (forForm: "add" | "edit") => {
    pdfUploadFor.current = forForm;
  };

  const [imagePickerFor, setImagePickerFor] = useState<"add" | "edit" | null>(
    null,
  );
  const [pdfPickerFor, setPdfPickerFor] = useState<"add" | "edit" | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<ProductInput>(emptyForm);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductInput>(emptyForm);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const [addFormError, setAddFormError] = useState<string | null>(null);
  const [editFormError, setEditFormError] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddFormError(null);
    const name = addForm.name.trim();
    const image = addForm.image.trim();
    const partNo = addForm.partNo.trim();
    const nksCode = addForm.nksCode.trim();
    const missing: string[] = [];
    if (!name) missing.push("Name");
    if (!image) missing.push("Product image");
    if (!partNo) missing.push("Part No");
    if (!nksCode) missing.push("NKS Code");
    if (!addForm.categoryId) missing.push("Category");
    if (missing.length > 0) {
      setAddFormError(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    createProduct.mutate(
      {
        ...addForm,
        name,
        image,
        partNo,
        nksCode,
        pdfUrl: addForm.pdfUrl || undefined,
      },
      {
        onSuccess: () => {
          setAddForm(emptyForm);
          setAddFormError(null);
          setAddOpen(false);
        },
      },
    );
  };

  const openEdit = (product: (typeof products)[0]) => {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      slug: product.slug,
      image: product.image,
      partNo: product.partNo,
      nksCode: product.nksCode,
      stock: product.stock,
      categoryId: product.categoryId,
      pdfUrl: product.pdfs[0]?.url ?? null,
    });
    setEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError(null);
    if (!editId) return;
    const name = editForm.name.trim();
    const slug = editForm.slug?.trim();
    const image = editForm.image.trim();
    const partNo = editForm.partNo.trim();
    const nksCode = editForm.nksCode.trim();
    const missing: string[] = [];
    if (!name) missing.push("Name");
    if (!image) missing.push("Product image");
    if (!partNo) missing.push("Part No");
    if (!nksCode) missing.push("NKS Code");
    if (!editForm.categoryId) missing.push("Category");
    if (missing.length > 0) {
      setEditFormError(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    updateProduct.mutate(
      {
        id: editId,
        input: {
          ...editForm,
          name,
          slug,
          image,
          partNo,
          nksCode,
          pdfUrl: editForm.pdfUrl ?? undefined,
        },
      },
      {
        onSuccess: () => {
          setEditId(null);
          setEditForm(emptyForm);
          setEditFormError(null);
          setEditOpen(false);
        },
      },
    );
  };

  const openDelete = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deleteProduct.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        setDeleteName("");
        setDeleteOpen(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex lg:flex-row flex-col w-full items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products here</CardDescription>
        </div>
        <Dialog
          open={addOpen}
          onOpenChange={(open) => {
            setAddOpen(open);
            if (!open) setAddFormError(null);
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full lg:w-auto">
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            {(addFormError || createProduct.isError) && (
              <p className="text-sm text-destructive font-medium rounded-md bg-destructive/10 px-3 py-2">
                {addFormError ??
                  (createProduct.error instanceof Error
                    ? createProduct.error.message
                    : String(createProduct.error ?? "Something went wrong"))}
              </p>
            )}
            <form
              onSubmit={handleAddSubmit}
              className="space-y-4 h-[500px] overflow-y-auto"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Name</Label>
                  <Input
                    id="add-name"
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Product name"
                    required
                    disabled={createProduct.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-slug">
                    Slug (optional, auto from name)
                  </Label>
                  <Input
                    id="add-slug"
                    value={addForm.slug ?? ""}
                    onChange={(e) =>
                      setAddForm((p) => ({ ...p, slug: e.target.value }))
                    }
                    placeholder="Leave empty to auto-generate from name"
                    disabled={createProduct.isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product image</Label>
                <div className="flex flex-col gap-2">
                  {addForm.image ? (
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                      <div className="relative h-14 w-14 shrink-0 rounded overflow-hidden bg-muted">
                        <Image
                          src={addForm.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="56px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">
                          Selected from media
                        </p>
                        <Button
                          type="button"
                          variant="link"
                          className="h-auto p-0 text-xs"
                          onClick={() => setImagePickerFor("add")}
                          disabled={createProduct.isPending}
                        >
                          Change image
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAddForm((p) => ({ ...p, image: "" }))}
                        disabled={createProduct.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setImagePickerFor("add")}
                      disabled={createProduct.isPending}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Choose image from media
                    </Button>
                  )}
                  <Input
                    id="add-image"
                    type="url"
                    value={addForm.image}
                    onChange={(e) =>
                      setAddForm((p) => ({ ...p, image: e.target.value }))
                    }
                    placeholder="Or paste image URL"
                    disabled={createProduct.isPending}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-partNo">Part No</Label>
                  <Input
                    id="add-partNo"
                    value={addForm.partNo}
                    onChange={(e) =>
                      setAddForm((p) => ({ ...p, partNo: e.target.value }))
                    }
                    placeholder="Part number"
                    required
                    disabled={createProduct.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-nksCode">NKS Code</Label>
                  <Input
                    id="add-nksCode"
                    value={addForm.nksCode}
                    onChange={(e) =>
                      setAddForm((p) => ({ ...p, nksCode: e.target.value }))
                    }
                    placeholder="NKS code"
                    required
                    disabled={createProduct.isPending}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 w-full">
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Select
                    value={addForm.stock}
                    onValueChange={(v) =>
                      setAddForm((p) => ({
                        ...p,
                        stock: v as ProductInput["stock"],
                      }))
                    }
                    disabled={createProduct.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STOCK_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={addForm.categoryId}
                    onValueChange={(v) =>
                      setAddForm((p) => ({ ...p, categoryId: v }))
                    }
                    disabled={createProduct.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* PDF (optional) - Add: media picker + upload */}
              <div className="rounded-xl border border-dashed bg-muted/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Product PDF (optional)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Choose from media or upload. Max 16MB.
                    </p>
                  </div>
                </div>
                {addForm.pdfUrl ? (
                  <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5">
                    <FileText className="h-8 w-8 shrink-0 text-red-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        PDF attached
                      </p>
                      <a
                        href={addForm.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Open in new tab
                      </a>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() =>
                        setAddForm((p) => ({ ...p, pdfUrl: null }))
                      }
                      disabled={createProduct.isPending}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : null}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPdfPickerFor("add")}
                    disabled={createProduct.isPending}
                  >
                    Choose PDF from media
                  </Button>
                  <label className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm cursor-pointer hover:bg-muted/50">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      id="add-pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          triggerPdfUpload("add");
                          startUpload([file]);
                        }
                        e.target.value = "";
                      }}
                      disabled={createProduct.isPending || isUploading}
                    />
                    {isUploading ? "Uploading…" : "Upload new PDF"}
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  disabled={createProduct.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createProduct.isPending}>
                  {createProduct.isPending ? "Adding…" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-muted-foreground text-sm py-4">Loading…</p>
        )}
        {error && (
          <p className="text-destructive text-sm py-4">
            Error: {error.message}
          </p>
        )}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-muted-foreground text-sm py-4">
            No products yet. Add one above.
          </p>
        )}
        {!isLoading && !error && products.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Part No</TableHead>
                <TableHead>NKS Code</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>PDF</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        unoptimized
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm font-mono">
                    {product.slug}
                  </TableCell>
                  <TableCell>{product.partNo}</TableCell>
                  <TableCell>{product.nksCode}</TableCell>
                  <TableCell>{product.stock.replace("_", " ")}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    {product.pdfs.length > 0 ? (
                      <a
                        href={product.pdfs[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline truncate block"
                      >
                        View PDF
                      </a>
                    ) : (
                      "No PDF"
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDelete(product.id, product.name)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Edit dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditFormError(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {(editFormError || updateProduct.isError) && (
            <p className="text-sm text-destructive font-medium rounded-md bg-destructive/10 px-3 py-2">
              {editFormError ??
                (updateProduct.error instanceof Error
                  ? updateProduct.error.message
                  : String(updateProduct.error ?? "Something went wrong"))}
            </p>
          )}
          <form onSubmit={handleEditSubmit} className="space-y-3  ">
            <div className="space-y-2 ">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Product name"
                required
                disabled={updateProduct.isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug (optional, auto from name)</Label>
              <Input
                id="edit-slug"
                value={editForm.slug ?? ""}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, slug: e.target.value }))
                }
                placeholder="Leave empty to auto-generate from name"
                disabled={updateProduct.isPending}
              />
            </div>
            <div className="space-y-2">
              <Label>Product image</Label>
              <div className="flex flex-col gap-2">
                {editForm.image ? (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                    <div className="relative h-14 w-14 shrink-0 rounded overflow-hidden bg-muted">
                      <Image
                        src={editForm.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">
                        Selected from media
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-xs"
                        onClick={() => setImagePickerFor("edit")}
                        disabled={updateProduct.isPending}
                      >
                        Change image
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditForm((p) => ({ ...p, image: "" }))}
                      disabled={updateProduct.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setImagePickerFor("edit")}
                    disabled={updateProduct.isPending}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Choose image from media
                  </Button>
                )}
                <Input
                  id="edit-image"
                  type="url"
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, image: e.target.value }))
                  }
                  placeholder="Or paste image URL"
                  disabled={updateProduct.isPending}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-partNo">Part No</Label>
                <Input
                  id="edit-partNo"
                  value={editForm.partNo}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, partNo: e.target.value }))
                  }
                  placeholder="Part number"
                  required
                  disabled={updateProduct.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nksCode">NKS Code</Label>
                <Input
                  id="edit-nksCode"
                  value={editForm.nksCode}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, nksCode: e.target.value }))
                  }
                  placeholder="NKS code"
                  required
                  disabled={updateProduct.isPending}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 w-full">
              <div className="space-y-2">
                <Label>Stock</Label>
                <Select
                  value={editForm.stock}
                  onValueChange={(v) =>
                    setEditForm((p) => ({
                      ...p,
                      stock: v as ProductInput["stock"],
                    }))
                  }
                  disabled={updateProduct.isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STOCK_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={editForm.categoryId}
                  onValueChange={(v) =>
                    setEditForm((p) => ({ ...p, categoryId: v }))
                  }
                  disabled={updateProduct.isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* PDF (optional) - Edit: current + choose from media + upload */}
            <div className="rounded-xl border border-dashed bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Product PDF (optional)</p>
                  <p className="text-xs text-muted-foreground">
                    Choose from media or upload. Max 16MB.
                  </p>
                </div>
              </div>
              {editForm.pdfUrl ? (
                <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5">
                  <FileText className="h-8 w-8 shrink-0 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <a
                      href={editForm.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline truncate block"
                    >
                      View PDF
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Opens in new tab
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => setEditForm((p) => ({ ...p, pdfUrl: null }))}
                    disabled={updateProduct.isPending}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : null}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPdfPickerFor("edit")}
                  disabled={updateProduct.isPending}
                >
                  {editForm.pdfUrl
                    ? "Replace with media"
                    : "Choose PDF from media"}
                </Button>
                <label className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm cursor-pointer hover:bg-muted/50">
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id="edit-pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        triggerPdfUpload("edit");
                        startUpload([file]);
                      }
                      e.target.value = "";
                    }}
                    disabled={updateProduct.isPending || isUploading}
                  />
                  {isUploading ? "Uploading…" : "Upload new PDF"}
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                disabled={updateProduct.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateProduct.isPending}>
                {updateProduct.isPending ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{deleteName}&quot;? This
            cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteProduct.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image picker from media manager */}
      <MediaPicker
        kind="image"
        open={imagePickerFor !== null}
        onOpenChange={(open) => !open && setImagePickerFor(null)}
        value={imagePickerFor === "add" ? addForm.image : editForm.image}
        onSelect={(url) => {
          if (imagePickerFor === "add")
            setAddForm((p) => ({ ...p, image: url }));
          else setEditForm((p) => ({ ...p, image: url }));
          setImagePickerFor(null);
        }}
        disabled={createProduct.isPending || updateProduct.isPending}
      />

      {/* PDF picker from media manager */}
      <MediaPicker
        kind="pdf"
        open={pdfPickerFor !== null}
        onOpenChange={(open) => !open && setPdfPickerFor(null)}
        value={
          pdfPickerFor === "add"
            ? (addForm.pdfUrl ?? null)
            : (editForm.pdfUrl ?? null)
        }
        onSelect={(url) => {
          if (pdfPickerFor === "add")
            setAddForm((p) => ({ ...p, pdfUrl: url }));
          else setEditForm((p) => ({ ...p, pdfUrl: url }));
          setPdfPickerFor(null);
        }}
        disabled={createProduct.isPending || updateProduct.isPending}
      />
    </Card>
  );
}
