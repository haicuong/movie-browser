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
  isOffline: boolean;
  onRetry: () => void;
};

export function MovieModalError({
  error,
  isValidMovieId,
  countDown,
  isOffline,
  onRetry,
}: MovieModalErrorProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      {error instanceof MovieNotFoundError || !isValidMovieId ? (
        <>
          <h2 className="text-2xl font-bold">Movie not found</h2>
          <span className="text-secondary-foreground">
            The movie you are looking for does not exist or has been removed.
          </span>
          <Link
            to="/"
            className="mt-4 rounded-xl bg-thirdary p-4 hover:cursor-pointer"
          >
            Go back to home
          </Link>
        </>
      ) : isOffline ? (
        <>
          <h2 className="text-2xl font-bold">Offline</h2>
          <span className="text-secondary-foreground">
            You are currently offline. Auto reload when reconnect.
          </span>
        </>
      ) : error instanceof TooManyRequestsError ? (
        <>
          <h2 className="text-2xl font-bold">Too many requests</h2>
          <span className="text-secondary-foreground">
            Request limit exceeded. Please wait a few seconds and try again.
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={countDown > 0 ? undefined : onRetry}
            className="mt-4 p-4 py-6 hover:cursor-pointer"
          >
            {countDown > 0
              ? `Try again in ${countDown} seconds...`
              : "Try again"}
          </Button>
        </>
      ) : error instanceof NetworkError ? (
        <>
          <h2 className="text-2xl font-bold">Network error</h2>
          <span className="text-secondary-foreground">
            A network error occurred. Please try again.
          </span>
          <span className="text-secondary-foreground italic">
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
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Error</h2>
          <span className="text-secondary-foreground">
            An unexpected error occurred.
          </span>
          <span className="text-secondary-foreground italic">
            {error?.name}: {error?.message}
          </span>
        </>
      )}
    </div>
  );
}
