import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="text-lg font-medium">Page not found</p>
          <p className="text-sm text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/contact-us">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
