# Agent Instructions

## Operating rules

- Treat the repository as a Vite + React 19 + TypeScript app. Make the smallest change that fixes the requested behavior.
- Read the owning component, hook, API helper, or type before editing. Follow existing patterns; do not introduce a parallel abstraction or data model.
- Do not modify generated output, dependency files, or unrelated user changes. Do not commit or create branches.
- Preserve existing search, favorites, modal, theme, loading, and error behavior unless the task explicitly changes it.

## Repository map

- App composition: `src/App.tsx`
- UI components and primitives: `src/api/components/` and `src/api/components/ui/`
- TMDB client: `src/api/TMDB.ts`
- Server proxy: `api/tmdb-proxy.ts`
- Movie hooks: `src/hooks/movie/`
- Shared movie types: `src/types/movie.ts`
- Shared utilities and error classes: `src/lib/`

## Architecture constraints

- Keep the request path `browser -> src/api/TMDB.ts -> api/tmdb-proxy.ts -> TMDB` intact. Never expose the TMDB token to browser code.
- Use TanStack Query for server data and the existing Zustand stores for client state.
- Keep movie objects aligned with the existing TMDB types. Do not create duplicate movie interfaces for one feature.
- Search and navigation state is URL-backed. Reuse `useSearchQuery`; do not add competing `setSearchParams` calls that create duplicate history entries.
- Favorites intentionally store compact movie snapshots in localStorage. Preserve this contract unless the task explicitly changes persistence.
- Preserve custom error behavior for not-found, rate-limit, and network failures, including existing retry behavior.
- Use Tailwind utilities and existing UI primitives. Keep components focused, responsive, keyboard-accessible, and tolerant of missing image or metadata fields.
- Respect the existing reduced-motion behavior; do not add an app-level motion toggle.

## Validation

- Install dependencies with `npm install` when dependencies are missing.
- Run `npm run lint` for lint or component changes.
- Run `npm run build` for TypeScript, API, routing, or production-build changes; it runs `tsc -b` and `vite build`.
- No automated test suite exists. Report that limitation when relevant and include the validation command run.
