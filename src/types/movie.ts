import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import "../vite-env.d.ts";
import type { MovieListItem } from "@/types/tmdb.ts";

export const movieCardClassName =
  "relative flex flex-col motion-safe:hover:scale-[1.02] text-start rounded-md bg-card p-4 shadow-secondary-foreground shadow-md transition-[box-shadow,scale] duration-300 hover:shadow-lg";
export const layoutClass = (variant: "grid" | "carousel" = "carousel") => {
  return variant === "carousel"
    ? "w-[78vw] max-w-72 shrink-0"
    : "w-full min-w-64 md:max-w-[25vw]";
};

export const useFavoritesStore = create(
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
