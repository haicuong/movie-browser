import { fetchMovieList } from "@/api/TMDB";
import { useQuery } from "@tanstack/react-query";

const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: () => fetchMovieList("/movie/now_playing"),
  });
};

export default useNowPlayingMovies;
