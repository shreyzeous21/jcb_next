import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteContact, getContacts } from "@/actions/contact";
import { toast } from "sonner";

export const useContact = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await getContacts();
      if (!res.success) throw new Error(res.error);
      return res.contacts;
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => await deleteContact(id),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Contact deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    contacts: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    deleteContactMutation,
  };
};
