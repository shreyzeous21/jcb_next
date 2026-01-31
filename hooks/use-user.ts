import { getUsers, updateUserRole as updateUserRoleAction } from "@/actions/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser = () => {
    const queryClient = useQueryClient();

    // 🔹 Get users
    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await getUsers();
            if (!res.success) {
                throw new Error(res.error);
            }
            return res.users;
        },
    });

    // 🔹 Update user role
    const updateUserRole = useMutation({
        mutationFn: async ({
            id,
            role,
        }: {
            id: string;
            role: "SUPERADMIN" | "ADMIN" | "USER";
        }) => {
            const res = await updateUserRoleAction(id, role);
            if (!res.success) {
                toast.error(res.error);
                throw new Error(res.error);
            }
            return res.user;
        },
        onSuccess: () => {
            // refresh users list
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User role updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        data: usersQuery.data ?? [],
        isLoading: usersQuery.isLoading,
        error: usersQuery.error,
        updateUserRole,
    };
};
