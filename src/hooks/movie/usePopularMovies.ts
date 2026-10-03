import { fetchMovieList } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

export default function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => fetchMovieList("/movie/popular"),
  });
}
