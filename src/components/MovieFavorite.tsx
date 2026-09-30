import { useFavoritesStore } from "../types/movie";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MovieFavorite({
  movieId,
  options: { size } = {},
}: {
  movieId: number;
  options?: { size?: number };
}) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(movieId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
      variant="ghost"
      className="hover:cursor-pointer p-1 aspect-square"
    >
      {isFavorite ? (
        <Star
          size={size ? size * 4 : 24}
          className="fill-yellow-500 text-yellow-500"
        />
      ) : (
        <Star size={size ? size * 4 : 24} />
      )}
    </Button>
  );
}
