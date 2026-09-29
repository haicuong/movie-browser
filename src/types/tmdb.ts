import { useQuery } from "@tanstack/react-query";
import {
  MovieNotFoundError,
  NetworkError,
  TooManyRequestsError,
} from "./custom-errors";

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

const fetchInit: RequestInit = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

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
    fetchInit,
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new TooManyRequestsError();
    } else if (response.status >= 500) {
      throw new NetworkError(
        `Network error: ${response.status} ${response.statusText}`,
      );
    }

    throw new Error(
      `Failed to fetch movie: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

const fetchMovieById = async (id: number): Promise<MovieDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}?language=en-US&append_to_response=videos`,
    fetchInit,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new MovieNotFoundError();
    } else if (response.status === 429) {
      throw new TooManyRequestsError();
    } else if (response.status >= 500) {
      throw new NetworkError(
        `Network error: ${response.status} ${response.statusText}`,
      );
    }

    throw new Error(
      `Failed to fetch movie: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

const searchMoviesByName = async (
  query: string,
): Promise<MovieListResponse> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(query),
    fetchInit,
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new TooManyRequestsError();
    } else if (response.status >= 500) {
      throw new NetworkError(
        `TMDB server error: ${response.status} ${response.statusText}`,
      );
    }

    throw new Error(
      `TMDB's request failed: ${response.status} ${response.statusText}`,
    );
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
    enabled: Number.isInteger(id) && id > 0,
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
