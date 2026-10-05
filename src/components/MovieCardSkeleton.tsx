import { Skeleton } from "@/components/ui/skeleton";
import { layoutClass, movieCardClassName } from "@/lib/movie-formatter";
import { cn } from "cn";
import { Star } from "lucide-react";

export default function MovieCardSkeleton({
  variant = "grid",
}: {
  variant?: "grid" | "carousel";
}) {
  return (
    <article
      aria-hidden="true"
      className={cn(`${movieCardClassName} ${layoutClass(variant)}`)}
    >
      <div>
        <Skeleton className="aspect-2/3 w-full rounded-sm" />
        <Skeleton className="mt-4 h-5 w-4/5 rounded" />
        <div className="mt-3 mb-1 space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      </div>
      <div className="absolute flex aspect-square items-center justify-center -top-2 right-4 sm:w-10 sm:h-10 w-12 h-12 rounded-lg bg-card p-1 shadow-shadow shadow-md">
        <Star className="size-8 sm:size-6 fill-thirdary text-thirdary animate-pulse" />
      </div>
    </article>
  );
}
