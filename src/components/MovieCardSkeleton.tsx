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
      className={`relative flex flex-col rounded-md bg-gray-300 p-4 shadow-gray-400 shadow-md dark:bg-[#343434] dark:shadow-gray-600 ${layoutClass}`}
    >
      <div className="animate-pulse">
        <div className="aspect-2/3 w-full rounded-sm bg-gray-400 dark:bg-[#232323]" />
        <div className="mt-3 h-5 w-4/5 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded bg-gray-400 dark:bg-[#232323]" />
          <div className="h-3 w-5/6 rounded bg-gray-400 dark:bg-[#232323]" />
          <div className="h-3 w-2/3 rounded bg-gray-400 dark:bg-[#232323]" />
        </div>
      </div>
      <div className="absolute -top-2 right-4 w-14 h-16 md:w-8 md:h-10 rounded-lg bg-amber-50 p-1 shadow-gray-400 shadow-md dark:bg-[#232323] dark:shadow-gray-600" />
    </article>
  );
}
