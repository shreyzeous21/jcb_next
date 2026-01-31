import { useQuery } from "@tanstack/react-query";
import { getContacts } from "@/actions/contact";

export const useContact = () => {
  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await getContacts();
      if (!res.success) throw new Error(res.error);
      return res.contacts;
    },
  });

  return {
    contacts: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};
