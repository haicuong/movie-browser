import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { MovieModalContent } from "./MovieModalContent.tsx";
import { MovieModalError } from "./MovieModalError.tsx";
import { MovieModalSkeleton } from "./MovieModalSkeleton.tsx";
import { useMovieId } from "../types/tmdb.ts";
import { TooManyRequestsError } from "../types/custom-errors.ts";
import { useCountDown } from "../types/utilities.ts";

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
}
