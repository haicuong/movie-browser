import { useEffect, useState } from "react";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import "../vite-env.d.ts";
import { useQuery } from "@tanstack/react-query";

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

export function useDebounce<T>(value: T, delay: number) {
  const [stateValue, setStateValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStateValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return stateValue;
}

type Genre = {
  id: number;
  name: string;
};

export interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  genres: Genre[];
  overview: string;
  videos: {
    results: MovieVideo[];
  };
}

type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

interface MovieListResponse {
  page: number;
  results: MovieDetails[];
  total_pages: number;
  total_results: number;
}

const fetchMovieList = async (
  path: string,
  params: Record<string, string> = {},
): Promise<MovieListResponse> => {
  const searchParams = new URLSearchParams({
    language: "en-US",
    page: "1",
    ...params,
  });

  const response = await fetch(
    `https://api.themoviedb.org/3${path}?${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

const fetchMovieById = async (id: number): Promise<MovieDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}?language=en-US&append_to_response=videos`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};

const searchMoviesByName = async (
  query: string,
): Promise<MovieListResponse> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(query),
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data: MovieListResponse = await response.json();

  return data;
};

export const useSearchMovies = (query: string) => {
  const nomalizedQuery = query.trim();

  return useQuery({
    queryKey: ["movies", "search", nomalizedQuery],
    queryFn: () => searchMoviesByName(nomalizedQuery),
    enabled: nomalizedQuery.length > 0,
  });
};

export const useMovieId = (id: number) => {
  return useQuery({
    queryKey: ["movies", "id", id],
    queryFn: () => fetchMovieById(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 10,
  });
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchMovieList("/trending/movie/week"),
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => fetchMovieList("/movie/popular"),
  });
};

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: () => fetchMovieList("/movie/now_playing"),
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: () => fetchMovieList("/movie/upcoming"),
  });
};

export const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
