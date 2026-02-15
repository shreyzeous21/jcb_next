import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MediaUploader from "./MediaUploader";
import MediaGrid from "./MediaGrid";

export default function MediaManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Manager</CardTitle>
        <CardDescription>
          Upload, manage, and organize your media files here.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 w-full">
        {" "}
        <MediaUploader />
        <MediaGrid />
      </CardContent>
    </Card>
  );
}
