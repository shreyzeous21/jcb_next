import { deleteMedia, getMedia, uploadMedia, type UploadMediaProps } from "@/actions/uploadthing-action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMediaManager = () => {
    const queryClient = useQueryClient();
    const { data: media, isLoading, error } = useQuery({
        queryKey: ["media"],
        queryFn: async () => await getMedia(),
    });

    const createMediaMutation = useMutation({
        mutationFn: async (data: UploadMediaProps) => await uploadMedia(data),
        onSuccess: () => {
            toast.success("Media uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ["media"] });
        },
        onError: (error: any) => {
            console.error(error);
            toast.error(error.message || "Failed to upload media");
        },
    });

    const deleteMediaMutation = useMutation({
        mutationFn: async (id: string) => await deleteMedia(id),
        onSuccess: () => {
            toast.success("Media deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["media"] });
        },
        onError: (error: any) => {
            console.error(error);
            toast.error(error.message || "Failed to delete media");

        },
    });

    return { media, isLoading, error, createMediaMutation, deleteMediaMutation };
}