import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import type { Movie } from "./types/movie";
import srekCover from "./assets/movie-covers/shrek.webp";
import nineCover from "./assets/movie-covers/9.webp";
import lionKingCover from "./assets/movie-covers/the-lion-king.webp";
import { useState } from "react";
import MovieModal from "./components/MovieModal";

const movies: Movie[] = [
  {
    id: 1,
    title: "Shrek",
    rating: 7.9,
    description:
      "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
    imgUrl: srekCover,
    tags: ["Adult Animation", "Shrek", "Dark Comedy"],
  },
  {
    id: 2,
    title: "9",
    rating: 7.1,
    description:
      "A rag doll that awakens in a postapocalyptic future holds the key to humanity's salvation.",
    imgUrl: nineCover,
    tags: ["Post-Apocalyptic", "Science Fiction", "Adventure"],
  },
  {
    id: 3,
    title: "The Lion King",
    rating: 8.5,
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    imgUrl: lionKingCover,
    tags: ["Animation", "Adventure", "Drama"],
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const displayedMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleMovieClick(movie: Movie) {
    setSelectedMovie(movie);
    document.body.classList.add("overflow-hidden");
  }

  function handleCloseModal() {
    setSelectedMovie(null);
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main className="flex flex-col bg-white dark:bg-[#121212] px-4 md:px-10 justify-center flex-1">
        <div className="flex justify-evenly flex-wrap gap-4 p-4">
          {displayedMovies.map((movie) => (
            <MovieCard
              onClick={() => handleMovieClick(movie)}
              key={movie.id}
              title={movie.title}
              description={movie.description}
              imgUrl={movie.imgUrl}
            />
          ))}
        </div>
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </main>
    </>
  );
}
