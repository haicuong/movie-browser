# Movie Browser

Movie Browser is a small responsive React application for browsing a curated collection of movies. Each movie is presented as a card with its cover image, title, and description, making the project a simple foundation for a richer movie discovery experience.

The current interface includes:

- A responsive header branded as **Movie Browser**
- Movie cards for the bundled collection, including *Shrek*, *9*, and *The Lion King*
- Locally stored movie cover assets
- Responsive styling and light/dark color themes using Tailwind CSS
- A search field in the header as the starting point for movie search functionality

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

| Command           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot module replacement |
| `npm run build`   | Type-check and create a production build                      |
| `npm run lint`    | Run ESLint across the project                                 |
| `npm run preview` | Preview the production build locally                          |

## Project Structure

```text
src/
├── api/assets/          # Bundled movie cover assets
├── components/          # Header, search bar, and movie card UI
├── hooks/               # Reusable React hooks
├── pages/               # Page-level components
├── store/               # Application state
├── types/               # Shared TypeScript types
├── App.tsx              # Main application composition
└── index.css            # Global styles
```

## Current Scope

Movie data is currently defined locally in `src/App.tsx`, so the app does not yet connect to an external movie API. The search control and state-related folders provide extension points for adding filtering, favorites, and persistent movie data in future iterations.
