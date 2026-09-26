import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export type Movie = {
  id: number;
  title: string;
  rating: number;
  description: string;
  imgUrl: string;
  tags: string[];
};

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
