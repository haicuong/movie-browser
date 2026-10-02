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

export type MovieDetails = {
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
  runtime: number | null;
  tagline: string;
  original_title: string | null;
  original_language: string;
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
};

type MovieCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

type MovieCrew = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

export type MovieListItem = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
};

type MovieListResponse = {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
};

const fetchTMDB = async (path: string, params: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams({
    language: "en-US",
    page: "1",
    ...params,
  });

  let response;

  try {
    response = await fetch(
      `https://api.themoviedb.org/3${path}?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      },
    );
  } catch (error) {
    throw new NetworkError(
      error instanceof Error ? error.message : "Network request failed",
    );
  }

  if (!response.ok) {
    if (response.status === 404 && path.startsWith("/movie/")) {
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

const fetchMovieList: (
  path: string,
  params?: Record<string, string>,
) => Promise<MovieListResponse> = fetchTMDB;

const fetchMovieById = (id: number): Promise<MovieDetails> => {
  return fetchTMDB(`/movie/${encodeURIComponent(id)}`, {
    append_to_response: "videos,credits",
  });
};

const searchMoviesByName = async (
  query: string,
): Promise<MovieListResponse> => {
  return fetchTMDB("/search/movie", { query: encodeURIComponent(query) });
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

const posterBaseUrl = "https://image.tmdb.org/t/p/";
export const posterBaseUrlStandard = `${posterBaseUrl}w500`;
export const posterBaseUrlSmall = `${posterBaseUrl}w300`;
