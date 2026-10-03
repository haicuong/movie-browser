import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MovieModal } from "@/components/MovieModal.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  MovieNotFoundError,
  NetworkError,
  TooManyRequestsError,
} from "@/types/custom-errors.ts";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { MotionConfig } from "motion/react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button.tsx";
import { logError } from "@/types/utilities.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: (failureCount, error) => {
        if (
          error instanceof MovieNotFoundError ||
          error instanceof TooManyRequestsError
        ) {
          return false;
        }
        return error instanceof NetworkError && failureCount < 2;
      },
    },
  },
});

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
    <ErrorBoundary
      onError={logError}
      fallbackRender={() => (
        <div
          role="alert"
          className="inset-0 flex flex-col items-center justify-center bg-secondary text-secondary-foreground h-dvh p-4 text-center"
        >
          <h1 className="text-2xl font-bold">Unexpected error occurred.</h1>
          <p className="text-muted-foreground">Reloading usually fixes it.</p>
          <Button
            className="rounded-md bg-primary mt-4 px-4 py-3 text-primary-foreground"
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>
      )}
    >
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </TooltipProvider>
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
);
