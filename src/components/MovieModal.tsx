import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { MovieFavorite } from "./MovieFavorite.tsx";
import { posterBaseUrl, useMovieId } from "../types/movie.ts";

export default function MovieModal() {
  const navigate = useNavigate();
  const movieId = useParams<{ id: string }>();

  const { data: movie } = useMovieId(Number(movieId?.id));
  const modalRef = useRef<HTMLElement>(null);

  const trailer =
    movie?.videos?.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    movie?.videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  function onClose() {
    navigate("/", { replace: true });
  }

  useEffect(() => {
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
          className="bg-gray-300 flex h-full min-h-full flex-col overflow-y-auto gap-2 dark:bg-[#343434] rounded-md p-4"
        >
          {movie && (
            <>
              <header className="flex relative justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                  <h3 id="modal-title" className="text-lg font-bold">
                    {movie.title}
                  </h3>
                  <MovieFavorite movieId={movie.id} options={{ size: 6 }} />
                </div>
              </header>
              <p className="text-gray-600 dark:text-gray-300">
                Rating: {movie.vote_average}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={`${posterBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full md:w-fit object-contain md:h-64"
                />
                {trailer && (
                  <div className="relative aspect-video w-full overflow-hidden bg-black md:w-96">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&playsinline=1`}
                      title={`${movie.title} trailer`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Tags: {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {movie.overview}
              </p>
            </>
          )}
        </article>
        <button
          onClick={onClose}
          className="text-gray-600 absolute top-3 right-6 hover:cursor-pointer hover:font-bold md:text-2xl text-4xl dark:text-gray-300"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
