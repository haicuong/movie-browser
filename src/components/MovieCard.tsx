import { Link } from "react-router";
import { posterBaseUrlStandard, type MovieListItem } from "../types/tmdb.ts";
import { MovieFavorite } from "./MovieFavorite";
import { layoutClass, movieCardClassName } from "@/types/movie.ts";
import { motion } from "motion/react";
import { useThemeStore } from "@/types/utilities.ts";
import { cn } from "cn";

export default function MovieCard({
  movie,
  variant = "grid",
}: {
  movie: MovieListItem;
  variant?: "grid" | "carousel";
}) {
  const isThemeToggling = useThemeStore((state) => state.isThemeToggling);

  return (
    <article
      className={cn(
        `${movieCardClassName} ${isThemeToggling ? "duration-0" : ""} ${layoutClass(variant)}`,
      )}
    >
      <Link
        to={`/movies/${movie.id}`}
        className="flex flex-1 flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="mb-2 aspect-2/3 w-full overflow-hidden rounded-sm bg-thirdary">
          {movie.poster_path ? (
            <motion.img
              key={movie.id}
              initial={{ opacity: 0.5, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              loading="lazy"
              decoding="async"
              src={`${posterBaseUrlStandard}${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-base text-thirdary-foreground">
              Poster unavailable
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold line-clamp-1">{movie.title}</h3>
      </Link>
      <p className="text-muted-foreground line-clamp-3">{movie.overview}</p>
      <div
        className={cn(
          "absolute -top-2 right-4 bg-secondary rounded-lg p-1 shadow-shadow shadow-md hover:shadow-lg transition-shadow duration-300",
          isThemeToggling ? "duration-0" : "",
        )}
      >
        <MovieFavorite movieId={movie.id} />
      </div>
    </article>
  );
}
