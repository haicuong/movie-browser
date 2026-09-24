import { useNavigate } from "react-router";
import type { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/movies/${movie.id}`);
  }

  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-start w-fit min-w-64 md:max-w-[25vw] dark:bg-[#343434] rounded-md p-4 shadow-gray-400 dark:shadow-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={movie.imgUrl}
        alt={movie.title}
        className="w-full flex-1 object-cover mb-2"
      />
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
        {movie.description}
      </p>
    </button>
  );
}
