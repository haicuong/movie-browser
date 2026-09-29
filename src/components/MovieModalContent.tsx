import { MovieFavorite } from "./MovieFavorite.tsx";
import { posterBaseUrl, type MovieDetails } from "../types/tmdb.ts";

type MovieModalContentProps = {
  movie: MovieDetails;
};

export function MovieModalContent({ movie }: MovieModalContentProps) {
  const trailer =
    movie.videos?.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    movie.videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  return (
    <>
      <header className="relative mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 id="modal-title" className="text-lg font-bold">
            {movie.title}
          </h3>
          <MovieFavorite movieId={movie.id} options={{ size: 6 }} />
        </div>
      </header>
      <p className="text-gray-600 dark:text-gray-300">
        Rating: {movie.vote_average}
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        {movie.poster_path ? (
          <img
            src={`${posterBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full object-contain md:h-64 md:w-fit"
          />
        ) : (
          <div className="flex min-h-64 w-full items-center justify-center bg-gray-400 text-gray-700 md:w-48 dark:bg-[#232323] dark:text-gray-300">
            No poster available
          </div>
        )}
        {trailer && (
          <div className="relative aspect-video w-full overflow-hidden bg-black md:w-96">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&playsinline=1`}
              title={`${movie.title} trailer`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        Tags: {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{movie.overview}</p>
    </>
  );
}
