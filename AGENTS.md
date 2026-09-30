# AGENTS.md

## Project overview

This repo is a Vite + React 19 + TypeScript movie browser app styled with Tailwind CSS. The app fetches and displays movie data primarily via TMDB-backed helpers and renders responsive movie cards, search results, and a modal detail view.

For a higher-level overview of the app and current scope, see [README.md](README.md).

## Commands

Use the project scripts from the repo root:

- `npm install` — install dependencies
- `npm run dev` — start the local Vite dev server
- `npm run build` — run TypeScript checks and create a production build
- `npm run lint` — run ESLint across the app
- `npm run preview` — preview the production build

Before finishing a change, prefer running the smallest relevant validation command, usually `npm run build` or `npm run lint` depending on the modification.

## Architecture and conventions

- Source files live in `src/`.
- App composition and page-level logic live in [src/App.tsx](src/App.tsx).
- Reusable UI lives in [src/components](src/components), with shadcn-style primitives under [src/components/ui](src/components/ui).
- Shared types and TMDB helpers live in [src/types](src/types).
- Large data-fetching and movie object definitions should stay aligned with the existing TMDB model rather than introducing a second parallel type layer.

## Component patterns

- Prefer explicit prop types for React components.
- Keep UI components small and focused.
- Reuse the existing UI primitives, especially `Button` from [src/components/ui/button.tsx](src/components/ui/button.tsx), instead of introducing ad hoc styling patterns.
- Use `Link` from `react-router` for internal navigation and keep URL state synced with `useSearchParams` when the feature involves search/filter state.
- Preserve responsive behavior and graceful empty/error states.
- Use accessible fallbacks for missing images or unavailable metadata.

## Styling and implementation guidance

- Tailwind utility classes are the default styling mechanism.
- Match the project’s existing design language: cards with rounded surfaces, muted backgrounds, and subtle hover shadows.
- Keep accessibility in mind for image alt text, focus rings, and navigation anchors.
- Prefer simple data guards like `movie?.field` checks and fallback text over fragile assumptions.

## Acceptance checklist for changes

- Follow the existing folder structure and naming patterns.
- Keep the change scoped to the relevant feature or bug.
- Preserve working search, favorites, and modal behavior unless the task explicitly modifies that flow.
- Validate with the relevant project command before finishing.
