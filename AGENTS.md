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
- Feature components and UI primitives: `src/components/` and `src/components/ui/`
- TMDB client: `src/api/TMDB.ts`
- Local Vite proxy and production serverless proxy: `vite.config.ts` and `api/tmdb-proxy.ts`
- Movie hooks and client stores: `src/hooks/`
- Shared movie types: `src/types/movie.ts`
- Shared utilities, formatters, and error classes: `src/lib/`
- Tailwind imports and theme tokens: `src/index.css`
- Architecture decisions and known limitations: `ARCHITECTURE.md`

## Architecture constraints

- Keep the request path `browser -> src/api/TMDB.ts -> api/tmdb-proxy.ts -> TMDB` intact. Never expose the TMDB token to browser code or use a `VITE_`-prefixed token.
- Use TanStack Query for server data and the existing Zustand stores for client state.
- Keep movie objects aligned with the existing TMDB types. Do not create duplicate movie interfaces for one feature.
- Search and navigation state is URL-backed through the `q` query parameter. Reuse `useSearchQuery`; do not add competing `setSearchParams` calls that create duplicate history entries.
- Favorites intentionally store compact movie snapshots in localStorage. Preserve this contract unless the task explicitly changes persistence.
- Preserve custom error behavior for not-found, rate-limit, and network failures, including existing retry behavior.
- Keep the production proxy path allowlist intact. If changing supported TMDB endpoints, update both proxy configuration and related documentation.
- Use Tailwind utilities and existing UI primitives. Keep components focused, responsive, keyboard-accessible, and tolerant of missing image or metadata fields.
- The theme is persisted under `theme-storage`; keep the early theme application in `index.html` consistent with `useThemeStore` to avoid a flash of the wrong theme.
- Respect the existing reduced-motion behavior (`MotionConfig reducedMotion="user"`); do not add an app-level motion toggle.
- Keep the TMDB attribution in the footer and preserve the existing attribution assets.

## Environment and development

- The TMDB read access token is provided as `TMDB_TOKEN` in an uncommitted `.env.local` file for local development and as a Vercel environment variable in production.
- Run `npm install` only when dependencies are missing or the dependency manifest has changed.
- Use `npm run dev` for local development and the Vite proxy. Restart the server after changing `.env.local`.

## Validation

- Run `npm run lint` for component, hook, styling, or general TypeScript changes.
- Run `npm run build` for TypeScript, API, routing, entrypoint, or production-build changes; it runs `tsc -b` and `vite build`.
- No automated test script is defined in `package.json`. Report that limitation when relevant and include the validation commands run.
