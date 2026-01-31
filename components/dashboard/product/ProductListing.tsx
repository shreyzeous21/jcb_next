"use client";

import { useState } from "react";
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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const STOCK_OPTIONS = [
  { value: "IN_STOCK", label: "In stock" },
  { value: "OUT_OF_STOCK", label: "Out of stock" },
] as const;

const emptyForm: ProductInput = {
  name: "",
  image: "",
  partNo: "",
  nksCode: "",
  stock: "IN_STOCK",
  categoryId: "",
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

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<ProductInput>(emptyForm);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductInput>(emptyForm);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = addForm.name.trim();
    const image = addForm.image.trim();
    const partNo = addForm.partNo.trim();
    const nksCode = addForm.nksCode.trim();
    if (!name || !image || !partNo || !nksCode || !addForm.categoryId) return;
    createProduct.mutate(
      { ...addForm, name, image, partNo, nksCode },
      {
        onSuccess: () => {
          setAddForm(emptyForm);
          setAddOpen(false);
        },
      },
    );
  };

  const openEdit = (product: (typeof products)[0]) => {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      image: product.image,
      partNo: product.partNo,
      nksCode: product.nksCode,
      stock: product.stock,
      categoryId: product.categoryId,
    });
    setEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    const name = editForm.name.trim();
    const image = editForm.image.trim();
    const partNo = editForm.partNo.trim();
    const nksCode = editForm.nksCode.trim();
    if (!name || !image || !partNo || !nksCode || !editForm.categoryId) return;
    updateProduct.mutate(
      { id: editId, input: { ...editForm, name, image, partNo, nksCode } },
      {
        onSuccess: () => {
          setEditId(null);
          setEditForm(emptyForm);
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
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full lg:w-auto">
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
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
                <Label htmlFor="add-image">Image URL</Label>
                <Input
                  id="add-image"
                  type="url"
                  value={addForm.image}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, image: e.target.value }))
                  }
                  placeholder="https://..."
                  required
                  disabled={createProduct.isPending}
                />
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
                <TableHead>Part No</TableHead>
                <TableHead>NKS Code</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
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
                  <TableCell>{product.partNo}</TableCell>
                  <TableCell>{product.nksCode}</TableCell>
                  <TableCell>{product.stock.replace("_", " ")}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
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
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
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
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                type="url"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, image: e.target.value }))
                }
                placeholder="https://..."
                required
                disabled={updateProduct.isPending}
              />
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
    </Card>
  );
}
