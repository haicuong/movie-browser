import type { MovieListItem } from "@/types/movie";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    combine({ favoriteMovies: [] as MovieListItem[] }, (set, get) => ({
      toggleFavorite: (movie: MovieListItem) =>
        set((state) => ({
          favoriteMovies: state.favoriteMovies.some((m) => m.id === movie.id)
            ? state.favoriteMovies.filter((m) => m.id !== movie.id)
            : [...state.favoriteMovies, movie],
        })),
      isFavorite: (movie: MovieListItem) =>
        get().favoriteMovies.some((m) => m.id === movie.id),
    })),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favoriteMovies: state.favoriteMovies }),
    },
  ),
);

export default useFavoritesStore;
