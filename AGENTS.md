# Agent Instructions

## Operating rules

- Treat the repository as a Vite + React 19 + TypeScript app. Make the smallest change that fixes the requested behavior.
- Read the owning component, hook, API helper, or type before editing. Follow existing patterns; do not introduce a parallel abstraction or data model.
- Do not modify generated output (`dist/`, build metadata), dependency files, or unrelated user changes. Do not commit or create branches.
- Preserve existing search, favorites, modal, theme, loading, and error behavior unless the task explicitly changes it.

## Repository map

- HTML entrypoint and early theme initialization: `index.html`
- App composition and page layout: `src/App.tsx`
- Router and providers: `src/main.tsx`
- Feature components and UI primitives: `src/components/` and `src/components/ui/` (including `AuthModal.tsx` and `toast.tsx`)
- TMDB client: `src/api/TMDB.ts`
- Favorites & Auth API client: `src/api/backend.ts`
- Backend Zod validation & normalization schemas: `src/schemas/backend.ts`
- Local Vite proxy and production serverless proxy: `vite.config.ts` and `api/tmdb-proxy.ts`
- Movie hooks, auth/favorites TanStack Query hooks, and Zustand client stores: `src/hooks/` (`useAuth.ts`, `useFavorites.ts`, `useAuthModalStore.ts`, `useThemeStore.ts`, `useSearchQuery.ts`)
- Shared movie types: `src/types/movie.ts`
- Shared utilities, formatters, and error classes: `src/lib/`
- Tailwind imports and theme tokens: `src/index.css`
- Architecture decisions and known limitations: `ARCHITECTURE.md`

## Architecture constraints

- Keep the TMDB request path `browser -> src/api/TMDB.ts -> api/tmdb-proxy.ts -> TMDB` intact. Never expose the TMDB token to browser code or use a `VITE_`-prefixed token.
- Keep the Favorites/Auth request path `browser -> src/api/backend.ts (credentials: "include") -> https://movie-browser.api.haicuong.me` (overridable in local development via `VITE_API_BASE_URL`). Sessions use `HttpOnly` JWT cookies; never store auth tokens in `localStorage` or JS-readable storage.
- Use TanStack Query for server data (`currentUserOptions` under `["auth", "me"]` and `favoritesQueryOptions` under `["favorites"]`) and Zustand stores (`useAuthModalStore`, `useThemeStore`) for client-only UI state.
- Keep movie objects aligned with the existing TMDB types (`MovieListItem`, `MovieDetails`). Normalize backend movie payloads (`tmdbId`, `posterPath`) to `MovieListItem` at the API boundary in `src/schemas/backend.ts`; do not create duplicate movie interfaces for one feature.
- Preserve the deliberate 100-favorite limit (`fetchFavorites(1, 100)` via `GET /favorites?page=1&limit=100`), matching the backend's max `limit <= 100` cap so both the `"Favorite Movies"` section and `isFavorite` checks stay consistent without extra ID requests.
- Update `["favorites"]` in memory via `queryClient.setQueryData` on `POST`/`DELETE` success (one request per click), invalidate to resync on `409`/`404` out-of-sync responses, clear auth/favorites on `401`, and surface mutation failures via `showToast`.
- Search and navigation state is URL-backed through the `q` query parameter. Reuse `useSearchQuery`; do not add competing `setSearchParams` calls that create duplicate history entries.
- Preserve custom error behavior for TMDB not-found, rate-limit, and network failures (`MovieNotFoundError`, `TooManyRequestsError`, `NetworkError`) as well as backend API errors (`BackendApiError`), including existing retry behavior.
- Keep the production proxy path allowlist intact. If changing supported TMDB endpoints, update both proxy configuration and related documentation.
- Use Tailwind utilities and existing UI primitives. Keep components focused, responsive, keyboard-accessible, and tolerant of missing image or metadata fields.
- The theme is persisted under `theme-storage`; keep the early theme application in `index.html` consistent with `useThemeStore` to avoid a flash of the wrong theme.
- Respect the existing reduced-motion behavior (`MotionConfig reducedMotion="user"`); do not add an app-level motion toggle.
- Keep the TMDB attribution in the footer and preserve the existing attribution assets.

## Environment and development

- The TMDB read access token is provided as `TMDB_TOKEN` in an uncommitted `.env.local` file for local development and as a Vercel environment variable in production.
- Optional `VITE_API_BASE_URL` may be set in `.env.local` to point to a local `movie-browser-api` instance (defaults to `https://movie-browser.api.haicuong.me`).
- Run `npm install` only when dependencies are missing or the dependency manifest has changed.
- Use `npm run dev` for local development and the Vite proxy. Restart the server after changing `.env.local`.

## Validation

- Run `npm run lint` for component, hook, styling, or general TypeScript changes.
- Run `npm run build` for TypeScript, API, routing, entrypoint, or production-build changes; it runs `tsc -b` and `vite build`.
- No automated test script is defined in `package.json`. Report that limitation when relevant and include the validation commands run.
