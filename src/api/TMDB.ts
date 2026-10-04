import {
  MovieNotFoundError,
  NetworkError,
  TooManyRequestsError,
} from "@/lib/errors";
import type { MovieDetails, MovieListResponse } from "@/types/movie";

export async function fetchTMDB(
  path: string,
  params: Record<string, string> = {},
) {
  const searchParams = new URLSearchParams({
    language: "en-US",
    page: "1",
    ...params,
    path,
  });

  let response;

  try {
    response = await fetch(`/api/tmdb-proxy?${searchParams}`);
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
}

export function fetchMovieList(
  path: string,
  params?: Record<string, string>,
): Promise<MovieListResponse> {
  return fetchTMDB(path, params);
}

export function fetchMovieById(id: number): Promise<MovieDetails> {
  return fetchTMDB(`/movie/${encodeURIComponent(id)}`, {
    append_to_response: "videos,credits",
  });
}

export async function fetchMoviesBySearchQuery(
  query: string,
): Promise<MovieListResponse> {
  return fetchTMDB("/search/movie", { query: encodeURIComponent(query) });
}

export const posterBaseUrlStandard = `https://image.tmdb.org/t/p/w500`;
