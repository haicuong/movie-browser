import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { Outlet, useSearchParams } from "react-router";
import SearchBar from "./components/SearchBar.tsx";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useSearchMovies,
  useTrendingMovies,
  useUpcomingMovies,
  type MovieDetails,
} from "./types/tmdb.ts";
import { useDebounce } from "./types/utilities.ts";
import { useEffect, useState } from "react";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState(
    () => searchParams.get("q") ?? "",
  );
  const searchQuery = useDebounce(searchState, 400);

  useEffect(() => {
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  }, [searchQuery, setSearchParams]);

  const { data: movies, isSuccess } = useSearchMovies(searchQuery);

  const hasSeachQuery = searchQuery.trim().length > 0;

  return (
    <>
      <Header
        onHome={() => {
          setSearchState("");
          setSearchParams({}, { replace: true });
        }}
      >
        <SearchBar
          searchQuery={searchState}
          onSearch={(query) => setSearchState(query)}
        />
      </Header>
      <main className="flex flex-col py-4 pb-8 overflow-x-hidden bg-white dark:bg-[#121212] px-4 md:px-6 justify-center flex-1">
        <div className="flex justify-evenly flex-wrap gap-4 p-4">
          {hasSeachQuery && isSuccess ? (
            movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
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
        >
          Business and finance icons created by monkik - Flaticon
        </a>
      </footer>
    </>
  );
}

function HomeMovies() {
  const { data: trendingMovies } = useTrendingMovies();
  const { data: popularMovies } = usePopularMovies();
  const { data: nowPlayingMovies } = useNowPlayingMovies();
  const { data: upcomingMovies } = useUpcomingMovies();

  return (
    <div className="flex w-full flex-col gap-8">
      <HorizontalMovies
        title="Trending Movies"
        movies={trendingMovies?.results}
      />
      <HorizontalMovies
        title="Popular Movies"
        movies={popularMovies?.results}
      />
      <HorizontalMovies
        title="Now Playing Movies"
        movies={nowPlayingMovies?.results}
      />
      <HorizontalMovies
        title="Upcoming Movies"
        movies={upcomingMovies?.results}
      />
    </div>
  );
}

function HorizontalMovies({
  title,
  movies,
}: {
  title: string;
  movies: MovieDetails[] | undefined;
}) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4">
      <h2 className="text-lg font-bold">{title}</h2>

      <div className="flex min-w-0 w-full flex-nowrap gap-4 overflow-x-auto overflow-y-hidden pb-2 pt-3">
        {movies ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} variant="carousel" />
          ))
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </section>
  );
}
