import { Link } from "react-router";
import { posterBaseUrl, type MovieListItem } from "../types/tmdb.ts";
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
      className={`relative flex flex-col text-start rounded-md bg-gray-300 p-4 shadow-gray-400 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-[#343434] dark:shadow-gray-600 ${layoutClass}`}
    >
      <Link to={`/movies/${movie.id}`} className="flex flex-1 flex-col gap-2">
        <div className="mb-2 aspect-2/3 w-full overflow-hidden rounded-sm bg-gray-400 dark:bg-[#232323]">
          {movie.poster_path ? (
            <img
              src={`${posterBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-base text-gray-700 dark:text-gray-300">
              Poster unavailable
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold">{movie.title}</h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
        {movie.overview}
      </p>
      <span className="absolute -top-2 right-4 bg-amber-50 dark:bg-[#232323] rounded-lg p-1 shadow-gray-400 dark:shadow-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
        <MovieFavorite movieId={movie.id} />
      </span>
    </article>
  );
}
