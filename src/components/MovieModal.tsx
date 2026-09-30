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
                <MovieFavorite movieId={movie.id} options={{ size: 6 }} />
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
/* 
export default function MovieModal() {
  const navigate = useNavigate();
  const movieId = useParams<{ id: string }>();

  const rawMovieId = movieId.id;
  const parsedMovieId = rawMovieId ? Number(rawMovieId) : NaN;

  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const { data: movie, error, refetch } = useMovieId(parsedMovieId);
  const modalRef = useRef<HTMLElement>(null);

  const [countDown, resetCountDown] = useCountDown(5);

  function onClose() {
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (error instanceof TooManyRequestsError) {
      resetCountDown();
    }
  }, [error, resetCountDown]);

  useEffect(() => {
    // Handle safari scroll lock
    const scrollY = window.scrollY;
    const body = document.body;

    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    modalRef.current?.focus();

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;

      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <div className="w-[90vw] relative md:w-[80vw] h-[90%]">
        <article
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-100 flex h-full min-h-full flex-col overflow-y-auto gap-2 dark:bg-[#343434] rounded-md p-4"
        >
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
            <MovieModalContent movie={movie} />
          ) : (
            <MovieModalSkeleton />
          )}
        </article>
        <button
          onClick={onClose}
          aria-label="Close movie details"
          className="text-gray-600 absolute top-3 right-6 hover:cursor-pointer hover:font-bold md:text-2xl text-4xl dark:text-gray-300"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
} */
