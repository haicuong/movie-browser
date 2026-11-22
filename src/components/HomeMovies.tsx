import { useEffect, useRef } from "react";
import { useMatch } from "react-router";
import useNowPlayingMovies from "@/hooks/movie/useNowPlayingMovies";
import usePopularMovies from "@/hooks/movie/usePopularMovies";
import useTrendingMovies from "@/hooks/movie/useTrendingMovies";
import useUpcomingMovies from "@/hooks/movie/useUpcomingMovies";
import { useCurrentUser } from "@/hooks/useAuth";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { useFavoritesQuery } from "@/hooks/useFavorites";
import MovieSection from "@/components/MovieSection";

export default function HomeMovies() {
  const trendingMovies = useTrendingMovies();
  const popularMovies = usePopularMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const upcomingMovies = useUpcomingMovies();

  const { data: user } = useCurrentUser();
  const favoriteMovies = useFavoritesQuery();
  const shouldScrollToFavorites = useAuthModalStore(
    (state) => state.shouldScrollToFavorites,
  );
  const setShouldScrollToFavorites = useAuthModalStore(
    (state) => state.setShouldScrollToFavorites,
  );

  const isMovieModalOpen = Boolean(useMatch("/movies/:id"));
  const favoritesSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!shouldScrollToFavorites || !user) {
      return;
    }

    if (isMovieModalOpen) {
      setShouldScrollToFavorites(false);
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      favoritesSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      setShouldScrollToFavorites(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    shouldScrollToFavorites,
    user,
    isMovieModalOpen,
    setShouldScrollToFavorites,
  ]);

  return (
    <div className="flex w-full flex-col gap-16">
      <MovieSection
        title="Trending Movies"
        movies={trendingMovies.data?.results}
        isPending={trendingMovies.isPending}
        isError={trendingMovies.isError}
        isPaused={trendingMovies.isPaused}
      />
      <MovieSection
        title="Popular Movies"
        movies={popularMovies.data?.results}
        isPending={popularMovies.isPending}
        isError={popularMovies.isError}
        isPaused={popularMovies.isPaused}
      />
      <MovieSection
        title="Now Playing Movies"
        movies={nowPlayingMovies.data?.results}
        isPending={nowPlayingMovies.isPending}
        isError={nowPlayingMovies.isError}
        isPaused={nowPlayingMovies.isPaused}
      />
      <MovieSection
        title="Upcoming Movies"
        movies={upcomingMovies.data?.results}
        isPending={upcomingMovies.isPending}
        isError={upcomingMovies.isError}
        isPaused={upcomingMovies.isPaused}
      />
      {user && (
        <MovieSection
          sectionRef={favoritesSectionRef}
          title="Favorite Movies"
          movies={favoriteMovies.data}
          isPending={favoriteMovies.isPending}
          isError={favoriteMovies.isError}
          isPaused={favoriteMovies.isPaused}
          emptyMessage="No movie favorited, favorite a movie to save it here"
        />
      )}
    </div>
  );
}
