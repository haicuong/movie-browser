import { fetchMovieList } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

export default function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchMovieList("/trending/movie/week"),
  });
}
