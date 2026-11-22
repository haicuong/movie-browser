# Architecture

This document records the main design decisions behind Movie Browser and the reasons for them.

## Overview

**Data flow**

```text
TMDB discovery/details:
browser -> src/api/TMDB.ts -> api/tmdb-proxy.ts -> TMDB

Auth & favorites:
browser -> src/api/backend.ts -> https://movie-browser.api.haicuong.me
```

Requests are managed with TanStack Query (`useQuery` and `useMutation`).

**Data states**

- Loading: skeleton loaders (and per-button loading spinner for favorite mutations)
- Error: inline/section error views and Base UI toast notifications (`src/components/ui/toast.tsx`)
- Success: movie(s) displayed

## Decisions

### 1. TMDB proxy

- The proxy keeps the TMDB token out of the user's browser.
- It is defined in `api/tmdb-proxy.ts` to run as a Vercel function, and it is also routed in `vite.config.ts` for local development.
- The proxy currently allows only three paths: movie, trending, and search. These cover everything the site needs, and they prevent anyone from using the function as an open relay on the website's token and quota.

### 2. URL history management

- **Bug:** while testing the back/forward buttons, I found that `setSearchParams` was called multiple times per navigation. This pushed multiple identical history entries and blocked direct URL edits, so the back button never worked, and it led to other bugs.
- **Fix:** the custom hook `useSearchQuery` handles two branches separately: queries from user input, and changes coming from the URL (direct edits, including back/forward navigation).
- Details are in a [blog post](https://haicuong.me/blog/posts/debounced-search-back-button/).

### 3. Cookie-authenticated favorites and the 100-favorite limit

- **Server-backed persistence:** Favorites are stored per user in PostgreSQL via `movie-browser-api` (`GET /favorites`, `POST /favorites/:tmdbId`, `DELETE /favorites/:tmdbId`) using `HttpOnly` JWT cookies (`SameSite=Lax; Secure` in production, 7-day expiry, plus server-side `tokenVersion` revocation on `/logout`).
- **Boundary normalization (`Zod`):** `src/schemas/backend.ts` validates backend payloads and transforms `{ tmdbId, title, overview, posterPath }` into the existing `MovieListItem` type (`{ id, title, overview, poster_path }`) so UI components share a single movie representation.
- **In-memory cache updates:** On `POST`/`DELETE` favorite success, `useToggleFavoriteMutation` updates `["favorites"]` directly via `queryClient.setQueryData` (one network request per click). `409`/`404` out-of-sync errors trigger `invalidateQueries` to resync, and `401` clears auth/favorites cache and opens `AuthModal`.
- **Deliberate 100-favorite limit:** `useFavoritesQuery` calls `GET /favorites?page=1&limit=100` (matching the backend's max `limit <= 100` constraint) in a single request instead of the default `limit=20`.
  - **Why:** Both the `"Favorite Movies"` section and every star button's `isFavorite` check across discovery carousels, search results, and `MovieModal` read from the same `["favorites"]` cache. Fetching 100 snapshots (~25–35 KB JSON) avoids false-unfavorited stars past 20 items while keeping initial authenticated load to a single request.
  - **Trade-off & upgrade path:** Users with more than 100 favorites will only see and star-highlight their 100 most recently favorited movies. Supporting > 100 favorites later requires either adding a lightweight `GET /favorites/ids` endpoint for star state alongside paginated carousels, or draining subsequent pages via `useInfiniteQuery`.

### 4. Custom errors

- TMDB proxy errors use three custom classes in `src/lib/errors.ts`: `MovieNotFoundError`, `TooManyRequestsError`, and `NetworkError`.
  - `NetworkError` covers any status of 500 and above, and the request is retried twice before throwing.
  - `MovieNotFoundError` applies only to movie-by-id requests (`/movie/...`).
- Backend API errors use `BackendApiError(status, code, message)`, parsed from the backend's unified `{ error: { code, message } }` JSON envelope in `src/api/backend.ts`.

### 5. Motion and reduced motion

- Animations use `reducedMotion="user"`, so they follow the browser's `prefers-reduced-motion` setting. There is no toggle button.
- This is intentional. The theme has a toggle because it is a matter of taste. Reduced motion is an accessibility need set at the system level.
- Post-login scrolling to the `"Favorite Movies"` section in `HomeMovies.tsx` also respects `prefers-reduced-motion: reduce` by using `"auto"` instead of `"smooth"` scroll behavior.

### 6. Bundle size

- The last estimated largest file in the build before backend integration was 657.74 kB minified and 213.15 kB gzipped (now ~775+ kB minified with `zod` and Base UI toast).
- `stats.html` showed the biggest contributors come from `node_modules` (`react-dom` first, then `react-router`). Code splitting remains deferred.

## Tech stack

| Tool                 | Role                                                 |
| -------------------- | ---------------------------------------------------- |
| React                | UI                                                   |
| React Router         | URL routing                                          |
| Zustand              | Client UI state (theme preference, auth modal state) |
| TanStack React Query | HTTP request management (fetching, caching, retries) |
| Zod                  | Runtime API & form validation and normalization      |

## Known limitations

- **100-favorite display and lookup limit.** `useFavoritesQuery` fetches at most `100` favorites (`GET /favorites?page=1&limit=100`); favorites beyond the 100 most recent are not fetched or marked as favorited in discovery views.
- **No automated tests.** There are no unit, integration, or end-to-end tests.
- **Single JavaScript bundle.** The app ships as one chunk, with no code splitting.
- **The development proxy has no allowlist.** The Vite proxy forwards any path to TMDB. Only the production function enforces the allowlist, so a disallowed path would not be caught in local development.
