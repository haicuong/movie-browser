import { fetchMovieList } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

export default function useUpcomingMovies() {
  return useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: () => fetchMovieList("/movie/upcoming"),
  });
}
