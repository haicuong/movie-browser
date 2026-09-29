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
            <div className="h-6 w-56 rounded bg-gray-400 dark:bg-[#232323]" />
            <div className="h-4 w-40 rounded bg-gray-400 dark:bg-[#232323]" />
          </div>
          <div className="size-6 rounded-lg bg-gray-400 dark:bg-[#232323]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="aspect-2/3 w-full rounded bg-gray-400 dark:bg-[#232323] md:h-64 md:w-48" />
        <div className="aspect-video w-full rounded bg-gray-400 dark:bg-[#232323] md:w-96" />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="h-4 w-24 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="h-4 w-32 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="h-4 w-20 rounded bg-gray-400 dark:bg-[#232323]" />
      </div>

      <div className="h-6 w-3/4 rounded bg-gray-400 dark:bg-[#232323]" />

      <div className="space-y-2">
        <div className="h-6 w-28 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="h-4 w-full rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="h-4 w-11/12 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="h-4 w-4/5 rounded bg-gray-400 dark:bg-[#232323]" />
      </div>

      <div className="space-y-2">
        <div className="h-6 w-20 rounded bg-gray-400 dark:bg-[#232323]" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-24 shrink-0 space-y-2">
              <div className="aspect-2/3 rounded bg-gray-400 dark:bg-[#232323]" />
              <div className="h-3 w-full rounded bg-gray-400 dark:bg-[#232323]" />
              <div className="h-3 w-2/3 rounded bg-gray-400 dark:bg-[#232323]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
