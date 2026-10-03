import { Link, useLocation } from "react-router";
import { posterBaseUrlStandard } from "@/api/TMDB";
import { MovieFavorite } from "@/components/MovieFavorite";
import { motion } from "motion/react";
import { cn } from "cn";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/utils";
import type { MovieListItem } from "@/types/movie";
import { layoutClass, movieCardClassName } from "@/lib/movie-formatter";

export default function MovieCard({
  movie,
  variant = "grid",
}: {
  movie: MovieListItem;
  variant?: "grid" | "carousel";
}) {
  const { search, hash } = useLocation();

  return (
    <article className={cn(`${movieCardClassName} ${layoutClass(variant)}`)}>
      <ErrorBoundary
        onError={logError}
        fallbackRender={({ resetErrorBoundary }) => (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-125">
            <p className="text-secondary-foreground text-lg text-center">
              Unable to load movie.
            </p>
            <Button variant="default" onClick={resetErrorBoundary}>
              Try again
            </Button>
          </div>
        )}
      >
        <Link
          to={{ pathname: `/movies/${movie.id}`, search, hash }}
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
        <div className="absolute -top-2 right-4 bg-secondary rounded-lg p-1 shadow-shadow shadow-md hover:shadow-lg transition-shadow duration-300">
          <MovieFavorite movie={movie} />
        </div>
      </ErrorBoundary>
    </article>
  );
}
