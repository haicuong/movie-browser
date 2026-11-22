import { BackendApiError } from "@/lib/errors";
import {
  authUserSchema,
  backendErrorEnvelopeSchema,
  backendFavoriteMovieSchema,
  backendFavoritesListSchema,
  loginCredentialsSchema,
  registerCredentialsSchema,
  type AuthCredentials,
  type AuthUser,
} from "@/schemas/backend";
import type { MovieListItem } from "@/types/movie";

const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://movie-browser.api.haicuong.me";

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

function parseErrorResponse(
  status: number,
  statusText: string,
  body: unknown,
): BackendApiError {
  const parsed = backendErrorEnvelopeSchema.safeParse(body);
  if (parsed.success) {
    const { code, message } = parsed.data.error;
    return new BackendApiError(status, code, message);
  }

  const fallbackCode =
    status === 401
      ? "UNAUTHORIZED"
      : status === 429
        ? "RATE_LIMIT_EXCEEDED"
        : "HTTP_ERROR";
  return new BackendApiError(
    status,
    fallbackCode,
    statusText || "Request failed",
  );
}

async function requestBackend(
  path: string,
  init?: RequestInit,
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch (error) {
    throw new BackendApiError(
      0,
      "NETWORK_ERROR",
      error instanceof Error && error.message
        ? error.message
        : "Unable to reach the server. Please check your connection.",
    );
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw parseErrorResponse(response.status, response.statusText, body);
  }

  if (response.status === 204) {
    return undefined;
  }

  try {
    return await response.json();
  } catch {
    throw new BackendApiError(
      response.status,
      "INVALID_RESPONSE",
      "Invalid JSON response from server",
    );
  }
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const data = await requestBackend("/me");
    return authUserSchema.parse(data);
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

export async function registerUser(
  credentials: AuthCredentials,
): Promise<AuthUser> {
  const parsed = registerCredentialsSchema.parse(credentials);
  const data = await requestBackend("/register", {
    method: "POST",
    body: JSON.stringify(parsed),
  });
  return authUserSchema.parse(data);
}

export async function loginUser(
  credentials: AuthCredentials,
): Promise<AuthUser> {
  const parsed = loginCredentialsSchema.parse(credentials);
  const data = await requestBackend("/login", {
    method: "POST",
    body: JSON.stringify(parsed),
  });
  return authUserSchema.parse(data);
}

export async function logoutUser(): Promise<void> {
  await requestBackend("/logout", { method: "POST" });
}

export async function fetchFavorites(
  page = 1,
  limit = 100,
): Promise<MovieListItem[]> {
  const data = await requestBackend(
    `/favorites?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`,
  );
  return backendFavoritesListSchema.parse(data);
}

export async function addFavorite(tmdbId: number): Promise<MovieListItem> {
  const data = await requestBackend(
    `/favorites/${encodeURIComponent(tmdbId)}`,
    { method: "POST" },
  );
  return backendFavoriteMovieSchema.parse(data);
}

export async function removeFavorite(tmdbId: number): Promise<void> {
  await requestBackend(`/favorites/${encodeURIComponent(tmdbId)}`, {
    method: "DELETE",
  });
}
