import { fetchMoviesBySearchQuery } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

export default function useSearchMovies(query: string) {
  const nomalizedQuery = query.trim();

  return useQuery({
    queryKey: ["movies", "search", nomalizedQuery],
    queryFn: () => fetchMoviesBySearchQuery(nomalizedQuery),
    enabled: nomalizedQuery.length > 0,
  });
}
