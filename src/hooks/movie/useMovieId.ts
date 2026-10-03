import { fetchMovieById } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

export default function useMovieId(id: number) {
  return useQuery({
    queryKey: ["movies", "id", id],
    queryFn: () => fetchMovieById(id),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 1000 * 60 * 10,
  });
}
