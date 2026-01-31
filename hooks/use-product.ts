import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getProducts,
    createProduct as createProductAction,
    updateProduct as updateProductAction,
    deleteProduct as deleteProductAction,
    type ProductInput,
} from "@/actions/product";
import { toast } from "sonner";

export const useProduct = () => {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await getProducts();
            if (!res.success) throw new Error(res.error);
            return res.products;
        },
    });

    const createProduct = useMutation({
        mutationFn: async (input: ProductInput) => {
            const res = await createProductAction(input);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return res.product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product created successfully");
        },
    });

    const updateProduct = useMutation({
        mutationFn: async ({ id, input }: { id: string; input: ProductInput }) => {
            const res = await updateProductAction(id, input);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return res.product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product updated successfully");
        },
    });

    const deleteProduct = useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteProductAction(id);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted successfully");
        },
    });

    return {
        products: productsQuery.data ?? [],
        isLoading: productsQuery.isLoading,
        error: productsQuery.error,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
