import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory,
} from "@/actions/category";
import { toast } from "sonner";

export const useCategory = () => {
    const queryClient = useQueryClient();

    // 🔹 GET categories
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await getCategories();
            if (!res.success) {
                throw new Error(res.error);
            }
            return res.categories;
        },
    });

    // 🔹 CREATE category
    const createCategory = useMutation({
        mutationFn: async (name: string) => {
            const res = await postCategory(name);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return res.category;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created successfully");
        },
    });

    // 🔹 UPDATE category
    const updateCategoryMutation = useMutation({
        mutationFn: async ({
            id,
            name,
        }: {
            id: string;
            name: string;
        }) => {
            const res = await updateCategory(id, name);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return res.category;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category updated successfully");
        },
    });

    // 🔹 DELETE category
    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteCategory(id);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
    });

    return {
        // Query
        categories: categoriesQuery.data ?? [],
        isLoading: categoriesQuery.isLoading,
        error: categoriesQuery.error,

        // Mutations
        createCategory,
        updateCategory: updateCategoryMutation,
        deleteCategory: deleteCategoryMutation,
    };
};
