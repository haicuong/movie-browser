import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MovieModal from "./components/MovieModal.tsx";
import type { Movie } from "./types/movie.ts";

import srekCover from "./assets/movie-covers/shrek.webp";
import nineCover from "./assets/movie-covers/9.webp";
import lionKingCover from "./assets/movie-covers/the-lion-king.webp";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Shrek",
    rating: 7.9,
    description:
      "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
    imgUrl: srekCover,
    tags: ["Adult Animation", "Shrek", "Dark Comedy"],
  },
  {
    id: 2,
    title: "9",
    rating: 7.1,
    description:
      "A rag doll that awakens in a postapocalyptic future holds the key to humanity's salvation.",
    imgUrl: nineCover,
    tags: ["Post-Apocalyptic", "Science Fiction", "Adventure"],
  },
  {
    id: 3,
    title: "The Lion King",
    rating: 8.5,
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    imgUrl: lionKingCover,
    tags: ["Animation", "Adventure", "Drama"],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "movies/:id",
        element: <MovieModal />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
