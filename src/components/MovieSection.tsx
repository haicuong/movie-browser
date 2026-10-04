import { logError } from "@/lib/utils";
import type { MovieListItem } from "@/types/movie";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function MovieSection({
  title,
  movies,
  isPending,
  isPaused,
  isError,
}: {
  title: string;
  movies: MovieListItem[] | undefined;
  isPending: boolean;
  isPaused: boolean;
  isError: boolean;
}) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex min-w-0 w-full px-4 gap-4 overflow-x-auto overflow-y-hidden py-4">
        <ErrorBoundary
          onError={logError}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="text-secondary-foreground text-lg w-full h-full flex items-center justify-center">
                Unable to load movies.
              </p>
              <Button
                className="rounded-md bg-primary mt-4 px-4 py-3 text-primary-foreground"
                onClick={resetErrorBoundary}
              >
                Try again
              </Button>
            </div>
          )}
        >
          {isPending ? (
            isPaused ? (
              <p className="text-muted-foreground w-full h-full flex items-center justify-center">
                You are offline. Auto reload when reconnect.
              </p>
            ) : (
              Array.from({ length: 5 }, (_, index) => (
                <MovieCardSkeleton key={index} variant="carousel" />
              ))
            )
          ) : isError ? (
            <p className="text-muted-foreground w-full h-full flex items-center justify-center">
              Unable to load movies.
            </p>
          ) : movies ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="carousel" />
            ))
          ) : (
            <p className="text-muted-foreground">Loading...</p>
          )}
        </ErrorBoundary>
      </div>
    </section>
  );
}
