import { Skeleton } from "@/components/ui/skeleton.tsx";

export function MovieModalSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading movie details"
      className="animate-pulse space-y-5"
    >
      <div className="flex items-start">
        <div className="flex items-center gap-2">
          <div className="space-y-2">
            <Skeleton className="h-6 w-56 rounded" />
            <Skeleton className="h-4 w-40 rounded" />
          </div>
          <Skeleton className="size-6 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="aspect-2/3 w-full rounded md:h-64 md:w-48" />
        <Skeleton className="aspect-video w-full rounded md:w-96" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      <Skeleton className="h-6 w-3/4 rounded" />

      <div className="space-y-2">
        <Skeleton className="h-6 w-28 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-11/12 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-20 rounded" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-24 shrink-0 space-y-2">
              <Skeleton className="aspect-2/3 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
