# Movie Browser

Movie Browser is a responsive movie discovery app built with React and TypeScript. It uses The Movie Database (TMDB) API to show current movie collections, search results, and detailed movie information in a focused browsing experience.

## Features

- Browse trending, popular, now-playing, and upcoming movies
- Search TMDB movies with a debounced search field
- Open movie details at `/movies/:id` without leaving the main page
- View posters, ratings, release dates, genres, runtime, overview, cast, crew, and trailers when available
- Add and remove movies from favorites
- Persist favorites and light/dark theme preferences in browser storage
- Responsive layouts for desktop and mobile screens
- Loading skeletons and user-facing error and empty-result states

## Tech Stack

- React 19
- TypeScript 6
- Vite
- React Router
- TanStack React Query
- Zustand
- Tailwind CSS 4
- Base UI and shadcn-style UI primitives
- ESLint

## Requirements

- Node.js 18 or newer
- npm
- A TMDB API read access token

## Getting Started

1. Install dependencies:

	```bash
	npm install
	```

2. Create a `.env.local` file in the project root:

	```env
	VITE_TMDB_TOKEN=your_tmdb_read_access_token
	```

	The token is sent as a Bearer token to the TMDB API. Do not commit `.env.local` or expose a real token in source code.

3. Start the development server:

	```bash
	npm run dev
	```

4. Open the local URL printed by Vite.

## Available Scripts

| Command           | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot module replacement. |
| `npm run build`   | Type-check the application and create a production build.      |
| `npm run lint`    | Run ESLint across the repository.                              |
| `npm run preview` | Serve the production build locally for verification.           |

There is currently no automated test script in `package.json`; use `npm run build` and `npm run lint` as the available checks before submitting changes.

## Application Structure

```text
src/
├── api/assets/       # Bundled application assets
├── components/       # Feature components and reusable UI
│   └── ui/           # Base UI and shadcn-style primitives
├── lib/              # Shared utility functions
├── types/            # TMDB types, API hooks, stores, and custom errors
├── App.tsx           # Main layout, search flow, and movie collections
├── index.css         # Tailwind imports and theme tokens
└── main.tsx          # Router, query client, and application providers
public/
├── credits/          # TMDB attribution assets
└── logo.webp         # Application logo
```

### Data and state

- TMDB requests and response types are defined in `src/types/tmdb.ts`.
- TanStack React Query manages request caching, loading states, retries, and errors.
- Zustand persists favorite movie IDs under `favorites-storage`.
- Zustand persists the selected theme under `theme-storage`.
- Search state is synchronized with the `q` URL query parameter.

### Routes

| Route         | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| `/`           | Home page with movie collections and search results. |
| `/movies/:id` | Movie details modal rendered through the router.     |

## TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. Movie metadata, images, and videos are provided by TMDB and may be subject to its terms of use.

The application also credits the icon source linked in the footer. See the running app for the current attribution link.

## Contributing

Keep changes focused and consistent with the existing component boundaries. Prefer existing UI primitives and shared TMDB types over introducing parallel implementations. Preserve responsive behavior, accessible labels and focus states, and loading, empty, and error states when changing data-driven UI.

Before opening a pull request, run:

```bash
npm run lint
npm run build
```
