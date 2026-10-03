import useNowPlayingMovies from "@/hooks/movie/useNowPlayingMovies";
import usePopularMovies from "@/hooks/movie/usePopularMovies";
import useTrendingMovies from "@/hooks/movie/useTrendingMovies";
import useUpcomingMovies from "@/hooks/movie/useUpcomingMovies";
import useFavoritesStore from "@/hooks/useFavoritesStore";
import MovieSection from "@/components/MovieSection";

export default function HomeMovies() {
  const trendingMovies = useTrendingMovies();
  const popularMovies = usePopularMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const upcomingMovies = useUpcomingMovies();
  const favoriteMovies = useFavoritesStore((state) => state.favoriteMovies);

  return (
    <div className="flex w-full flex-col gap-16">
      <MovieSection
        title="Trending Movies"
        movies={trendingMovies.data?.results}
        isPending={trendingMovies.isPending}
        isError={trendingMovies.isError}
      />
      <MovieSection
        title="Popular Movies"
        movies={popularMovies.data?.results}
        isPending={popularMovies.isPending}
        isError={popularMovies.isError}
      />
      <MovieSection
        title="Now Playing Movies"
        movies={nowPlayingMovies.data?.results}
        isPending={nowPlayingMovies.isPending}
        isError={nowPlayingMovies.isError}
      />
      <MovieSection
        title="Upcoming Movies"
        movies={upcomingMovies.data?.results}
        isPending={upcomingMovies.isPending}
        isError={upcomingMovies.isError}
      />
      {favoriteMovies.length > 0 && (
        <MovieSection
          title="Favorite Movies"
          movies={favoriteMovies.toReversed()}
          isPending={false}
          isError={false}
        />
      )}
    </div>
  );
}
