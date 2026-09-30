import { Skeleton } from "@/components/ui/skeleton.tsx";

export function MovieCardSkeleton({
  variant = "grid",
}: {
  variant?: "grid" | "carousel";
}) {
  const layoutClass =
    variant === "carousel"
      ? "w-[78vw] max-w-72 shrink-0"
      : "w-full min-w-64 md:max-w-[25vw]";

  return (
    <article
      aria-hidden="true"
      className={`relative flex flex-col rounded-md bg-card p-4 shadow-shadow shadow-md ${layoutClass}`}
    >
      <div>
        <Skeleton className="aspect-2/3 w-full rounded-sm" />
        <Skeleton className="mt-3 h-5 w-4/5 rounded" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-5/6 rounded" />
        </div>
      </div>
      <div className="absolute -top-2 right-4 w-10 h-10 rounded-lg bg-card p-1 shadow-shadow shadow-md">
        <Skeleton className="w-full h-full" />
      </div>
    </article>
  );
}
