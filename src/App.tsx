import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { MovieCardSkeleton } from "./components/MovieCardSkeleton.tsx";
import { Outlet, useSearchParams } from "react-router";
import SearchBar from "./components/SearchBar.tsx";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useSearchMovies,
  useTrendingMovies,
  useUpcomingMovies,
  type MovieListItem,
} from "./types/tmdb.ts";
import { useDebounce } from "./types/utilities.ts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [searchQuery, immediateUpdate] = useDebounce(searchState, 400);

  useEffect(() => {
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  }, [searchQuery, setSearchParams]);

  function onHome() {
    setSearchState("");
    setSearchParams({});
    immediateUpdate("");
  }

  const {
    data: movies,
    isSuccess,
    isPending,
    isError,
  } = useSearchMovies(searchQuery);

  const hasSearchQuery = searchState.trim().length > 0;
  const isSearchPending =
    isPending || (hasSearchQuery && searchQuery.trim() !== searchState.trim());

  return (
    <>
      <Header onHome={onHome}>
        <SearchBar
          searchQuery={searchState}
          onSearch={(query) => setSearchState(query)}
        />
      </Header>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {hasSearchQuery && isSearchPending
          ? "Loading search results."
          : hasSearchQuery && isSuccess && movies
            ? `${movies.results.length} search results found.`
            : hasSearchQuery && isError
              ? "Unable to load search results."
              : ""}
      </div>
      <main className="flex flex-col h-full py-4 pb-8 overflow-x-hidden bg-background px-4 md:px-6 justify-center flex-1">
        <div className="relative flex-1 p-4">
          {hasSearchQuery && (
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
          )}
          {hasSearchQuery ? (
            <div className="flex flex-1 mt-14 justify-evenly flex-wrap gap-4 items-stretch">
              {isSearchPending ? (
                <>
                  {Array.from({ length: 20 }, (_, index) => (
                    <MovieCardSkeleton key={index} />
                  ))}
                </>
              ) : isSuccess && movies ? (
                movies.results.length === 0 ? (
                  <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
                    <span className="font-bold text-xl">
                      No results found for "{searchQuery}".
                    </span>
                    <Button
                      onClick={onHome}
                      variant="secondary"
                      className="px-4 py-6 hover:cursor-pointer"
                    >
                      Go back to the home page
                    </Button>
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
          ) : (
            <HomeMovies />
          )}
        </div>
        <Outlet />
      </main>
      <footer className="bg-secondary flex flex-col gap-8 p-8">
        <span className="font-bold text-xl">Credits</span>
        <div className="flex flex-row gap-4">
          <img src="/credits/TMDB.svg" alt="TMDB logo" className="h-6" />
          <p className="text-sm md:text-base">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
        <a
          href="https://www.flaticon.com/free-icons/business-and-finance"
          title="business and finance icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          Business and finance icons created by monkik - Flaticon
        </a>
      </footer>
    </>
  );
}

function HomeMovies() {
  const trendingMovies = useTrendingMovies();
  const popularMovies = usePopularMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const upcomingMovies = useUpcomingMovies();

  return (
    <div className="flex w-full flex-col gap-16">
      <HorizontalMovies
        title="Trending Movies"
        movies={trendingMovies.data?.results}
        isPending={trendingMovies.isPending}
        isError={trendingMovies.isError}
      />
      <HorizontalMovies
        title="Popular Movies"
        movies={popularMovies.data?.results}
        isPending={popularMovies.isPending}
        isError={popularMovies.isError}
      />
      <HorizontalMovies
        title="Now Playing Movies"
        movies={nowPlayingMovies.data?.results}
        isPending={nowPlayingMovies.isPending}
        isError={nowPlayingMovies.isError}
      />
      <HorizontalMovies
        title="Upcoming Movies"
        movies={upcomingMovies.data?.results}
        isPending={upcomingMovies.isPending}
        isError={upcomingMovies.isError}
      />
    </div>
  );
}

const HOME_MOVIE_LIMIT = 10;
function HorizontalMovies({
  title,
  movies,
  isPending,
  isError,
}: {
  title: string;
  movies: MovieListItem[] | undefined;
  isPending: boolean;
  isError: boolean;
}) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex min-w-0 w-full px-2 flex-nowrap gap-4 overflow-x-auto overflow-y-hidden py-4 pt-3">
        {isPending ? (
          Array.from({ length: 5 }, (_, index) => (
            <MovieCardSkeleton key={index} variant="carousel" />
          ))
        ) : isError ? (
          <p className="text-muted-foreground">Unable to load movies.</p>
        ) : movies ? (
          movies
            .slice(0, HOME_MOVIE_LIMIT)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="carousel" />
            ))
        ) : (
          <p className="text-muted-foreground">Loading...</p>
        )}
      </div>
    </section>
  );
}
