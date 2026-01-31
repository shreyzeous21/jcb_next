import { deleteNewsletter, getNewsletter, postNewsletter } from "@/actions/newsletter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => await getNewsletter(),
  });

  const newsletters = data?.data || [];

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
