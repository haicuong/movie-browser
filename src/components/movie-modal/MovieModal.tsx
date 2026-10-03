import { useParams } from "react-router";
import { useNavigate } from "react-router";
import MovieModalContent from "@/components/movie-modal/Content";
import MovieModalError from "@/components/movie-modal/Error";
import MovieModalSkeleton from "@/components/movie-modal/Skeleton";
import { logError } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovieFavorite } from "@/components/MovieFavorite.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button.tsx";
import useMovieId from "@/hooks/movie/useMovieId";
import useCountDown from "@/hooks/useCountDown";

export default function MovieModal() {
  const navigate = useNavigate();
  const movieId = useParams<{ id: string }>();

  const rawMovieId = movieId.id;
  const parsedMovieId = rawMovieId ? Number(rawMovieId) : NaN;

  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const {
    data: movie,
    error,
    refetch,
    isPending,
    isPaused,
  } = useMovieId(parsedMovieId);

  const [countDown, resetCountDown] = useCountDown(5);

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) navigate("/", { replace: true });
      }}
    >
      <DialogContent className="flex h-[90%] overflow-y-hidden w-[90%] flex-col gap-2 rounded-md bg-card p-4">
        <ErrorBoundary
          onError={logError}
          resetKeys={[parsedMovieId]}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold">Unexpected error occurred.</h2>
              <p className="text-muted-foreground">
                An unexpected error occurred while loading the movie details.
              </p>
              <Button
                onClick={() => {
                  resetErrorBoundary();
                }}
                className="mt-4 px-4 py-2"
              >
                Try Again
              </Button>
            </div>
          )}
        >
          {error || !isValidMovieId || (isPending && isPaused) ? (
            <>
              <DialogTitle className="sr-only">Movie error</DialogTitle>
              <title>
                {`An error occurred while loading the movie details`} | Movie
                Browser
              </title>
              <MovieModalError
                error={error}
                isValidMovieId={isValidMovieId}
                countDown={countDown}
                isOffline={isPending && isPaused}
                onRetry={() => {
                  resetCountDown();
                  refetch();
                }}
              />
            </>
          ) : movie ? (
            <>
              <title>{`${movie.title} | Movie Browser`}</title>
              <DialogHeader>
                <DialogTitle className="sr-only">Movie details</DialogTitle>
                <DialogTitle className="flex items-center gap-2 h-fit max-w-[90%]">
                  <div className="flex flex-col gap-2 w-fit">
                    <div className="text-lg max-w-full">
                      <span className="whitespace-normal wrap-break-word font-bold">
                        {movie.title}
                      </span>
                      {movie.release_date && (
                        <span className="ml-2 text-muted-foreground">
                          ({movie.release_date?.slice(0, 4)})
                        </span>
                      )}
                    </div>
                    {movie.original_title &&
                      movie.original_title !== movie.title && (
                        <p className="text-sm text-muted-foreground">
                          Original title: {movie.original_title}
                        </p>
                      )}
                  </div>
                  <MovieFavorite movie={movie} />
                </DialogTitle>
              </DialogHeader>
              <MovieModalContent movie={movie} />
            </>
          ) : (
            <>
              <DialogTitle className="sr-only">
                Loading movie details
              </DialogTitle>
              <MovieModalSkeleton />
            </>
          )}
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
