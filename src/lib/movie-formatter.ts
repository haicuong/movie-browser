export const movieCardClassName =
  "relative flex flex-col motion-safe:hover:scale-[1.02] text-start rounded-md bg-card p-4 shadow-secondary-foreground shadow-md transition-[box-shadow,scale] duration-300 hover:shadow-lg";
export const layoutClass = (variant: "grid" | "carousel" = "carousel") => {
  return variant === "carousel"
    ? "w-[78vw] max-w-72 shrink-0"
    : "w-full min-w-64 md:max-w-[25vw]";
};
