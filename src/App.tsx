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
// import { toast } from "@/components/ui/toast.tsx";

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
      <main className="flex flex-col py-4 pb-8 overflow-x-hidden bg-white dark:bg-[#121212] px-4 md:px-6 justify-center flex-1">
        <div className="flex justify-evenly flex-wrap gap-4 p-4">
          {hasSearchQuery ? (
            isSearchPending ? (
              Array.from({ length: 6 }, (_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : isSuccess && movies ? (
              movies.results.length === 0 ? (
                <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
                  <span className="font-bold text-xl">
                    No results found for "{searchQuery}".
                  </span>
                  <button
                    onClick={onHome}
                    className="w-fit rounded-xl bg-gray-400 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-500 dark:bg-[#232323] dark:hover:bg-[#1a1a1a]"
                  >
                    Go back to the home page
                  </button>
                </div>
              ) : (
                movies.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              )
            ) : isError ? (
              <p className="w-full text-center text-gray-500">
                Unable to load search results.
              </p>
            ) : null
          ) : (
            <HomeMovies />
          )}
        </div>
        <Outlet />
      </main>
      <footer className="bg-gray-300 dark:bg-[#232323] flex flex-col gap-8 p-8">
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
/* 
function createToast(
  message: string,
  type: "default" | "success" | "error" | "info" | "warning" = "default",
) {
  const id = toast.add({
    title: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
    description: message,
    type: type,
    actionProps: {
      children: "Undo",
      onClick: () => toast.close(id),
    },
  });
}

function createToastPromise() {
  toast.promise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve("Promise resolved successfully!");
        } else {
          reject(new Error("Promise rejected!"));
        }
      }, 2000);
    }),
    {
      loading: "Loading...",
      success: (data) => `Success: ${data}`,
      error: (error) => `Error: ${error.message}`,
    },
  );
} */

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
      <div className="flex min-w-0 w-full flex-nowrap gap-4 overflow-x-auto overflow-y-hidden py-4 pt-3">
        {isPending ? (
          Array.from({ length: 5 }, (_, index) => (
            <MovieCardSkeleton key={index} variant="carousel" />
          ))
        ) : isError ? (
          <p className="text-gray-500">Unable to load movies.</p>
        ) : movies ? (
          movies
            .slice(0, HOME_MOVIE_LIMIT)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="carousel" />
            ))
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </section>
  );
}
