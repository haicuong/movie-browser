import { motion } from "motion/react";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCard from "./MovieCard";
import useSearchMovies from "@/hooks/movie/useSearchMovies";
import { Link } from "react-router";

export default function SearchResults({
  searchState,
  searchQuery,
  urlQuery,
}: {
  searchState: string;
  searchQuery: string;
  urlQuery: string;
}) {
  const {
    data: movies,
    isSuccess,
    isPending,
    isPaused,
    isError,
  } = useSearchMovies(searchQuery);

  const isSearchPending =
    isPending ||
    (searchState.trim().length > 0 &&
      searchQuery.trim() !== searchState.trim());

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isSearchPending
          ? "Loading search results."
          : isSuccess && movies
            ? `${movies.results.length} search results found.`
            : isError
              ? "Unable to load search results."
              : ""}
      </div>
      {urlQuery && (
        <title>{`Search results for "${urlQuery}" | Movie Browser`}</title>
      )}
      <div className="w-full top-3 absolute">
        <motion.h2
          key="search-results"
          className="text-xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Search results for "{searchState}"
        </motion.h2>
      </div>
      <div className="flex flex-1 mt-14 justify-evenly flex-wrap gap-4 items-stretch">
        {isPaused && isPending ? (
          <div className="w-full flex items-center justify-center h-120 text-center">
            <span className="text-base">
              You are currently offline. Auto reload when reconnect.
            </span>
          </div>
        ) : isSearchPending ? (
          <>
            {Array.from({ length: 20 }, (_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </>
        ) : isSuccess && movies ? (
          movies.results.length === 0 ? (
            <div className="w-full h-120 flex flex-col justify-center items-center gap-4 text-center">
              <span className="font-bold text-xl">
                No results found for "{searchQuery}".
              </span>
              <Link
                to={{ pathname: "/", search: "", hash: "" }}
                className="p-4 bg-secondary rounded-2xl hover:cursor-pointer hover:bg-thirdary transition-colors duration-300"
              >
                Go back to the home page
              </Link>
            </div>
          ) : (
            <>
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </>
          )
        ) : isError ? (
          <p className="w-full absolute text-center text-muted-foreground">
            Unable to load search results.
          </p>
        ) : null}
      </div>
    </>
  );
}
