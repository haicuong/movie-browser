import { LoaderCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "motion/react";
import type { MovieListItem } from "@/types/movie";
import { useCurrentUser } from "@/hooks/useAuth";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import {
  useIsFavorite,
  useToggleFavoriteMutation,
} from "@/hooks/useFavorites";

const MotionStar = motion.create(Star);

const iconMotionProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { duration: 0.15, ease: "easeInOut" as const },
};

export function MovieFavorite({ movie }: { movie: MovieListItem }) {
  const { data: user, isPending: isAuthPending } = useCurrentUser();
  const isFavorite = useIsFavorite(movie.id);
  const isPending = useAuthModalStore((state) =>
    state.pendingMovieIds.includes(movie.id),
  );
  const openAuthModal = useAuthModalStore((state) => state.openAuthModal);
  const { mutate: toggleFavorite } = useToggleFavoriteMutation();

  const label = isPending
    ? isFavorite
      ? "Removing from favorites..."
      : "Adding to favorites..."
    : isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            onClick={(e) => {
              e.stopPropagation();
              if (isPending || isAuthPending) {
                return;
              }
              if (!user) {
                openAuthModal(movie);
                return;
              }
              toggleFavorite({ movie, isCurrentlyFavorite: isFavorite });
            }}
            disabled={isPending}
            aria-busy={isPending}
            variant="ghost"
            aria-label={label}
            className="relative hover:cursor-pointer size-10 sm:size-8 flex h-fit items-center justify-center transition-none dark:hover:bg-transparent hover:bg-transparent p-1 aspect-square disabled:opacity-100"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPending ? (
                <motion.span
                  key="loading"
                  className="absolute flex items-center justify-center"
                  {...iconMotionProps}
                >
                  <LoaderCircle className="size-8 sm:size-6 animate-spin text-muted-foreground" />
                </motion.span>
              ) : isFavorite ? (
                <MotionStar
                  key="favorite"
                  className="size-8 absolute z-2 sm:size-6 fill-yellow-500 text-yellow-500"
                  {...iconMotionProps}
                />
              ) : (
                <MotionStar
                  key="not-favorite"
                  className="size-8 absolute sm:size-6"
                  {...iconMotionProps}
                />
              )}
            </AnimatePresence>
          </Button>
        }
      />
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
