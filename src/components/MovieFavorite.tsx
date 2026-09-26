import { useFavoritesStore } from "../types/movie";

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
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
      className="hover:cursor-pointer"
    >
      <img
        src={isFavorite ? "/icon/star.webp" : "/icon/star-border.webp"}
        alt={isFavorite ? "Favorite" : "Not Favorite"}
        className={size ? undefined : "w-12 h-12 md:w-6 md:h-6"}
        style={
          size
            ? { width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }
            : undefined
        }
      />
    </button>
  );
}
