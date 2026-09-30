import { Link } from "react-router";
import {
  MovieNotFoundError,
  NetworkError,
  TooManyRequestsError,
} from "../types/custom-errors.ts";
import { Button } from "@/components/ui/button.tsx";

type MovieModalErrorProps = {
  error: Error | null;
  isValidMovieId: boolean;
  countDown: number;
  onRetry: () => void;
};

const actionClassName =
  "mt-4 rounded-xl bg-gray-400 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-500 dark:bg-[#232323] dark:hover:bg-[#1a1a1a]";

export function MovieModalError({
  error,
  isValidMovieId,
  countDown,
  onRetry,
}: MovieModalErrorProps) {
  if (error instanceof MovieNotFoundError || !isValidMovieId) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">Movie not found</span>
        <span className="text-gray-600 dark:text-gray-300">
          The movie you are looking for does not exist or has been removed.
        </span>
        <Link to="/" className={actionClassName}>
          Go back to home
        </Link>
      </div>
    );
  }

  if (error instanceof TooManyRequestsError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">Too many requests</span>
        <span className="text-gray-600 dark:text-gray-300">
          Request limit exceeded. Please wait a few seconds and try again.
        </span>
        <Button
          type="button"
          variant="secondary"
          onClick={countDown > 0 ? undefined : onRetry}
          className="mt-4 p-4 py-6 hover:cursor-pointer"
        >
          {countDown > 0 ? `Try again in ${countDown} seconds...` : "Try again"}
        </Button>
      </div>
    );
  }

  if (error instanceof NetworkError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">Network error</span>
        <span className="text-gray-600 dark:text-gray-300">
          A network error occurred. Please try again.
        </span>
        <span className="text-gray-600 italic dark:text-gray-300">
          {error.message}
        </span>
        <Button
          type="button"
          variant="secondary"
          onClick={onRetry}
          className="mt-4 p-4 py-6 hover:cursor-pointer"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <span className="text-2xl font-bold">Error</span>
      <span className="text-gray-600 dark:text-gray-300">
        An unexpected error occurred.
      </span>
      <span className="text-gray-600 italic dark:text-gray-300">
        {error?.name}: {error?.message}
      </span>
    </div>
  );
}
