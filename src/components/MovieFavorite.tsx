import { useFavoritesStore } from "../types/movie";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export function MovieFavorite({ movieId }: { movieId: number }) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(movieId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movieId);
            }}
            variant="ghost"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className="hover:cursor-pointer flex h-fit items-center justify-center transition-none dark:hover:bg-transparent hover:bg-transparent p-1 aspect-square"
          >
            <Star
              className={`size-8 md:size-6 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`}
            />
          </Button>
        }
      />
      <TooltipContent>
        <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
