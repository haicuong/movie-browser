import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import "../vite-env.d.ts";

export const useFavoritesStore = create(
  persist(
    combine({ favoriteMovies: [] as number[] }, (set, get) => ({
      toggleFavorite: (movieId: number) =>
        set((state) => ({
          favoriteMovies: state.favoriteMovies.includes(movieId)
            ? state.favoriteMovies.filter((mId) => mId !== movieId)
            : [...state.favoriteMovies, movieId],
        })),
      isFavorite: (movieId: number) => get().favoriteMovies.includes(movieId),
    })),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favoriteMovies: state.favoriteMovies }),
    },
  ),
);
