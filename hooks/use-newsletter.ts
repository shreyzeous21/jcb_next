import { deleteNewsletter, getNewsletter, postNewsletter } from "@/actions/newsletter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const res = await getNewsletter();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });

  const newsletters = query.data ?? [];
  const isLoading = query.isLoading;
  const error = query.error;

  const postNewsletterMutation = useMutation({
    mutationFn: async (email: string) => await postNewsletter(email),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Subscribed successfully");
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });

  const deleteNewsletterMutation = useMutation({
    mutationFn: async (id: string) => await deleteNewsletter(id),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });

  return {
    newsletters,
    isLoading,
    error,
    postNewsletterMutation,
    deleteNewsletterMutation,
  };
};
