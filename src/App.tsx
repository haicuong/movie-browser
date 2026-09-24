import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { Outlet, useSearchParams } from "react-router";
import { movies } from "./main.tsx";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  const displayedMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Header onSearch={(query) => setSearchParams({ q: query })} />
      <main className="flex flex-col bg-white dark:bg-[#121212] px-4 md:px-10 justify-center flex-1">
        <div className="flex justify-evenly flex-wrap gap-4 p-4">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Outlet />
      </main>
    </>
  );
}
