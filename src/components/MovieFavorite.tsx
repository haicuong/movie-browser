import { useFavoritesStore } from "../types/movie";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { motion, AnimatePresence } from "motion/react";

const MotionStar = motion.create(Star);

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
            className="hover:cursor-pointer size-10 md:size-8 flex h-fit items-center justify-center transition-none dark:hover:bg-transparent hover:bg-transparent p-1 aspect-square"
          >
            <AnimatePresence mode="sync" initial={false}>
              {isFavorite ? (
                <MotionStar
                  key="favorite"
                  className="size-8 absolute z-2 md:size-6 fill-yellow-500 text-yellow-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                />
              ) : (
                <MotionStar
                  key="not-favorite"
                  className="size-8 absolute md:size-6"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
          </Button>
        }
      />
      <TooltipContent>
        <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
