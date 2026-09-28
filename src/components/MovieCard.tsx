import { Link } from "react-router";
import { posterBaseUrl, type MovieDetails } from "../types/movie";
import { MovieFavorite } from "./MovieFavorite";

export default function MovieCard({ movie }: { movie: MovieDetails }) {
  return (
    <article className="bg-gray-300 shrink-0 flex flex-col relative text-start w-fit min-w-64 md:max-w-[25vw] dark:bg-[#343434] rounded-md p-4 shadow-gray-400 dark:shadow-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/movies/${movie.id}`} className="flex flex-1 flex-col gap-2">
        {movie.poster_path && (
          <img
            src={`${posterBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full flex-1 object-cover mb-2"
          />
        )}
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
