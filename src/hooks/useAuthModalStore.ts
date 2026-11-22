import type { MovieListItem } from "@/types/movie";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const useAuthModalStore = create(
  combine(
    {
      isOpen: false,
      pendingFavoriteMovie: null as MovieListItem | null,
      shouldScrollToFavorites: false,
      pendingMovieIds: [] as number[],
    },
    (set, get) => ({
      openAuthModal: (pendingMovie: MovieListItem | null = null) =>
        set({
          isOpen: true,
          pendingFavoriteMovie: pendingMovie,
        }),
      closeAuthModal: () =>
        set({
          isOpen: false,
          pendingFavoriteMovie: null,
        }),
      clearPendingFavoriteMovie: () =>
        set({
          pendingFavoriteMovie: null,
        }),
      setShouldScrollToFavorites: (value: boolean) =>
        set({
          shouldScrollToFavorites: value,
        }),
      addPendingMovieId: (movieId: number) =>
        set((state) => ({
          pendingMovieIds: state.pendingMovieIds.includes(movieId)
            ? state.pendingMovieIds
            : [...state.pendingMovieIds, movieId],
        })),
      removePendingMovieId: (movieId: number) =>
        set((state) => ({
          pendingMovieIds: state.pendingMovieIds.filter((id) => id !== movieId),
        })),
      isMoviePending: (movieId: number) =>
        get().pendingMovieIds.includes(movieId),
    }),
  ),
);

export default useAuthModalStore;
