import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import type { Movie } from "./types/movie";
import srekCover from "./assets/movie-covers/shrek.webp";
import nineCover from "./assets/movie-covers/9.webp";
import lionKingCover from "./assets/movie-covers/the-lion-king.webp";

const movies: Movie[] = [
  {
    id: 1,
    title: "Shrek",
    description:
      "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
    imgUrl: srekCover,
  },
  {
    id: 2,
    title: "9",
    description:
      "A rag doll that awakens in a postapocalyptic future holds the key to humanity's salvation.",
    imgUrl: nineCover,
  },
  {
    id: 3,
    title: "The Lion King",
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    imgUrl: lionKingCover,
  },
];

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col bg-white dark:bg-[#121212] px-4 md:px-10 justify-center flex-1">
        <div className="flex justify-evenly flex-wrap gap-4 p-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.description}
              imgUrl={movie.imgUrl}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
