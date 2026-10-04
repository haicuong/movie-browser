# Architecture

This document records the main design decisions behind Movie Browser and the reasons for them.

## Overview

**Data flow**

```text
browser -> /src/api/tmdb.ts -> /api/tmdb-proxy.ts -> TMDB
```

Requests are managed with TanStack Query.

**Data states**

- Loading: skeleton loaders
- Error: error handler displays the error
- Success: movie(s) displayed

## Decisions

### 1. TMDB proxy

- The proxy keeps the TMDB token out of the user's browser.
- It is defined in `api/tmdb-proxy.ts` to run as a Vercel function, and it is also routed in `vite.config.ts` for local development.
- The proxy currently allows only three paths: movie, trending, and search. These cover everything the site needs, and they prevent anyone from using the function as an open relay on the website's token and quota.

### 2. URL history management

- **Bug:** while testing the back/forward buttons, I found that `setSearchParams` was called three times per navigation. This pushed three identical history entries and blocked direct URL edits, so the back button never worked, and it led to other bugs.
- **Fix:** the custom hook `useSearchQuery` handles two branches separately: queries from user input, and changes coming from the URL (direct edits, including back/forward navigation).
- Details are in a blog post (coming soon).

### 3. Favorites stored as snapshots

- A favorite is saved as a snapshot of its poster path, title, id, and overview, instead of only its id.
- **Why:** the whole snapshot is saved to localStorage, which reduces both loading time and HTTP requests to TMDB.
- **Trade-off:** the snapshot can become outdated. The card only shows the poster, title, and overview, so I consider the risk is rare.

### 4. Custom errors

- There are three custom errors: `MovieNotFoundError`, `TooManyRequestsError`, and `NetworkError`. They represent expected failures of TMDB requests.
- `NetworkError` is deliberately general. It covers any status of 500 and above, and the request is retried twice before the error is thrown.
- `MovieNotFoundError` applies only to movie-by-id requests (`/movie/...`). A 404 there means the movie does not exist (for example, after a direct URL edit). A 404 anywhere else is treated as a genuine error.

### 5. Motion and reduced motion

- Animations use `reducedMotion="user"`, so they follow the browser's `prefers-reduced-motion` setting. There is no toggle button.
- This is intentional. The theme has a toggle because it is a matter of taste. Reduced motion is an accessibility need set at the system level.

### 6. Bundle size

- The last estimated largest file in the build is 657.74 kB minified and 213.15 kB gzipped.
- I stopped optimizing for now. `stats.html` shows that the biggest contributors all come from `node_modules` (`react-dom` first, then `react-router`), and the gzipped size is still acceptable.

## Tech stack

| Tool                 | Role                                                 |
| -------------------- | ---------------------------------------------------- |
| React                | UI                                                   |
| React Router         | URL routing                                          |
| Zustand              | Client state                                         |
| TanStack React Query | HTTP request management (fetching, caching, retries) |

## Known limitations

- **No automated tests.** There are no unit, integration, or end-to-end tests.
- **Single JavaScript bundle.** The app ships as one chunk, with no code splitting.
- **The development proxy has no allowlist.** The Vite proxy forwards any path to TMDB. Only the production function enforces the allowlist, so a disallowed path would not be caught in local development.