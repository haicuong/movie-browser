import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { MovieModalContent } from "./MovieModalContent.tsx";
import { MovieModalError } from "./MovieModalError.tsx";
import { MovieModalSkeleton } from "./MovieModalSkeleton.tsx";
import { useMovieId } from "../types/tmdb.ts";
import { useCountDown } from "../types/utilities.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovieFavorite } from "./MovieFavorite.tsx";

export function MovieModal() {
  const navigate = useNavigate();
  const movieId = useParams<{ id: string }>();

  const rawMovieId = movieId.id;
  const parsedMovieId = rawMovieId ? Number(rawMovieId) : NaN;

  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const { data: movie, error, refetch } = useMovieId(parsedMovieId);

  const [countDown, resetCountDown] = useCountDown(5);

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) navigate("/", { replace: true });
      }}
    >
      <DialogContent className="flex h-[90%] overflow-y-hidden w-[90%] flex-col gap-2 rounded-md bg-gray-100 p-4 dark:bg-[#343434]">
        {error || !isValidMovieId ? (
          <MovieModalError
            error={error}
            isValidMovieId={isValidMovieId}
            countDown={countDown}
            onRetry={() => {
              resetCountDown();
              refetch();
            }}
          />
        ) : movie ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 h-fit max-w-[90%]">
                <div className="flex flex-col gap-2 w-fit">
                  <h3 className="text-lg max-w-full">
                    <span className="whitespace-normal wrap-break-word font-bold">
                      {movie.title}
                    </span>
                    {movie.release_date && (
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        ({movie.release_date?.slice(0, 4)})
                      </span>
                    )}
                  </h3>
                  {movie.original_title &&
                    movie.original_title !== movie.title && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Original title: {movie.original_title}
                      </p>
                    )}
                </div>
                <MovieFavorite movieId={movie.id} />
              </DialogTitle>
            </DialogHeader>
            <MovieModalContent movie={movie} />
          </>
        ) : (
          <MovieModalSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
}
