import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEnquiries, deleteEnquiry } from "@/actions/enquiry";
import { toast } from "sonner";

export const useEnquiry = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await getEnquiries();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });

  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: string) => await deleteEnquiry(id),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });

  return {
    enquiries: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    deleteEnquiryMutation,
  };
};
