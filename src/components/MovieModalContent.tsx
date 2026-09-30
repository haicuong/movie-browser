import { posterBaseUrlStandard, type MovieDetails } from "../types/tmdb.ts";

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
  const directors = movie.credits?.crew.filter(
    (member) => member.job === "Director",
  );
  const writers = movie.credits?.crew.filter(
    (member) => member.department === "Writing",
  );
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  return (
    <article className="flex flex-col h-full overflow-y-auto gap-4 md:-mr-1">
      <div className="flex flex-col gap-4 md:flex-row">
        {movie.poster_path ? (
          <img
            src={`${posterBaseUrlStandard}${movie.poster_path}`}
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
      <dl className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <dt className="sr-only">Rating</dt>
          <dd>Rating: {movie.vote_average.toFixed(1)}/10</dd>
        </div>
        {movie.release_date && (
          <div>
            <dt className="sr-only">Release date</dt>
            <dd>Released: {movie.release_date}</dd>
          </div>
        )}
        {runtime && (
          <div>
            <dt className="sr-only">Runtime</dt>
            <dd>Runtime: {runtime}</dd>
          </div>
        )}
        {movie.genres.length > 0 && (
          <div>
            <dt className="sr-only">Genres</dt>
            <dd>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </dd>
          </div>
        )}
      </dl>
      {movie.tagline && (
        <p className="text-lg italic text-gray-600 dark:text-gray-300">
          {movie.tagline}
        </p>
      )}
      <section>
        <h4 className="mb-1 text-lg font-bold">Overview</h4>
        <p className="text-gray-600 dark:text-gray-300">
          {movie.overview || "No overview available."}
        </p>
      </section>
      {movie.credits?.cast.length > 0 && (
        <section>
          <h4 className="mb-2 text-lg font-bold">Cast</h4>
          <div className="flex overflow-x-auto pb-2">
            {movie.credits.cast.slice(0, 10).map((actor) => (
              <a
                key={`${actor.id}-${actor.character}`}
                href={`https://www.themoviedb.org/person/${actor.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 shrink-0 rounded p-2 transition-colors hover:bg-gray-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:hover:bg-[#232323]"
                aria-label={`View ${actor.name}'s profile on TMDB`}
              >
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="aspect-2/3 w-full rounded object-cover"
                  />
                ) : (
                  <div className="flex aspect-2/3 items-center justify-center rounded bg-gray-400 p-2 text-center text-xs dark:bg-[#232323]">
                    No photo
                  </div>
                )}
                <p className="mt-1 text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {actor.character}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
      {(directors.length > 0 || writers.length > 0) && (
        <section className="text-gray-600 dark:text-gray-300">
          <h4 className="mb-1 text-lg font-bold text-black dark:text-white">
            Crew
          </h4>
          {directors.length > 0 && (
            <p>
              Director:{" "}
              {directors.map((member, index) => (
                <span key={`${member.id}-${member.job}`}>
                  <a
                    href={`https://www.themoviedb.org/person/${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {member.name}
                  </a>
                  {index < directors.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
          {writers.length > 0 && (
            <p>
              Writers:{" "}
              {writers.map((member, index) => (
                <span key={`${member.id}-${member.job}`}>
                  <a
                    href={`https://www.themoviedb.org/person/${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {member.name}
                  </a>
                  {index < writers.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
        </section>
      )}
    </article>
  );
}
