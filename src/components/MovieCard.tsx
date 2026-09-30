import { Link } from "react-router";
import { posterBaseUrlStandard, type MovieListItem } from "../types/tmdb.ts";
import { MovieFavorite } from "./MovieFavorite";

export default function MovieCard({
  movie,
  variant = "grid",
}: {
  movie: MovieListItem;
  variant?: "grid" | "carousel";
}) {
  const layoutClass =
    variant === "carousel"
      ? "w-[78vw] max-w-72 shrink-0"
      : "w-full min-w-64 md:max-w-[25vw]";

  return (
    <article
      className={`relative flex flex-col text-start rounded-md bg-card p-4 shadow-shadow shadow-md transition-shadow duration-300 hover:shadow-lg ${layoutClass}`}
    >
      <Link to={`/movies/${movie.id}`} className="flex flex-1 flex-col gap-2">
        <div className="mb-2 aspect-2/3 w-full overflow-hidden rounded-sm bg-thirdary">
          {movie.poster_path ? (
            <img
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
        <MovieFavorite movieId={movie.id} />
      </div>
    </article>
  );
}
