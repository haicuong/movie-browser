import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { movies } from "../main.tsx";

export default function MovieModal() {
  const navigate = useNavigate();
  const movieId = useParams<{ id: string }>();

  const movie = movies.find((m) => m.id === Number(movieId.id));
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!movie) {
      navigate("/", { replace: true });
    } else modalRef.current?.focus();
  }, [movie, navigate]);

  if (!movie) return null;

  function onClose() {
    navigate("/", { replace: true });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-300 flex flex-col gap-2 w-[80vw] h-[90%] overflow-y-auto dark:bg-[#343434] rounded-md p-4"
      >
        <h3 id="modal-title" className="text-lg font-bold">
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Rating: {movie.rating}
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={movie.imgUrl}
            alt={movie.title}
            className="w-full md:w-fit object-contain md:h-64"
          />
          <video
            className="object-contain md:h-64 md:w-fit "
            autoPlay
            controls
            loop
            muted
            playsInline
          >
            <source src="https://lorem.video/720p" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Tags: {movie.tags.join(", ")}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{movie.description}</p>
      </article>
    </div>
  );
}
