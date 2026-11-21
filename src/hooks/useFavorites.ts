import { addFavorite, fetchFavorites, removeFavorite } from "@/api/backend";
import { showToast } from "@/components/ui/toast";
import { currentUserOptions, useCurrentUser } from "@/hooks/useAuth";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { BackendApiError } from "@/lib/errors";
import type { MovieListItem } from "@/types/movie";
import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

export const favoritesQueryOptions = queryOptions({
  queryKey: ["favorites"],
  queryFn: () => fetchFavorites(1, 100),
  enabled: false,
});

export function useFavoritesQuery() {
  const { data: user } = useCurrentUser();

  return useQuery({
    ...favoritesQueryOptions,
    enabled: Boolean(user),
  });
}

export function useIsFavorite(movieId: number): boolean {
  const { data: favorites } = useFavoritesQuery();
  return Boolean(favorites?.some((movie) => movie.id === movieId));
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();
  const addPendingMovieId = useAuthModalStore(
    (state) => state.addPendingMovieId,
  );
  const removePendingMovieId = useAuthModalStore(
    (state) => state.removePendingMovieId,
  );
  const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

  return useMutation({
    onMutate: ({
      movie,
    }: {
      movie: MovieListItem;
      isCurrentlyFavorite: boolean;
    }) => {
      addPendingMovieId(movie.id);
    },
    mutationFn: async ({
      movie,
      isCurrentlyFavorite,
    }: {
      movie: MovieListItem;
      isCurrentlyFavorite: boolean;
    }) => {
      if (isCurrentlyFavorite) {
        await removeFavorite(movie.id);
        return {
          action: "removed" as const,
          movieId: movie.id,
          movie,
        };
      }

      const addedMovie = await addFavorite(movie.id);
      return {
        action: "added" as const,
        movieId: movie.id,
        movie: addedMovie,
      };
    },
    onSuccess: (result) => {
      if (result.action === "added") {
        queryClient.setQueryData(favoritesQueryOptions.queryKey, (old = []) => [
          result.movie,
          ...old.filter((m) => m.id !== result.movie.id),
        ]);
      } else {
        queryClient.setQueryData(favoritesQueryOptions.queryKey, (old = []) =>
          old.filter((m) => m.id !== result.movieId),
        );
      }
    },
    onError: (error, { movie, isCurrentlyFavorite }) => {
      if (error instanceof BackendApiError) {
        // Out-of-sync across tabs: already favorited (409 on POST) or already removed (404 on DELETE)
        if (
          (error.status === 409 && !isCurrentlyFavorite) ||
          (error.status === 404 && isCurrentlyFavorite)
        ) {
          queryClient.invalidateQueries({
            queryKey: favoritesQueryOptions.queryKey,
          });
          return;
        }

        // Session expired or revoked
        if (error.status === 401) {
          queryClient.setQueryData(currentUserOptions.queryKey, null);
          queryClient.removeQueries({
            queryKey: favoritesQueryOptions.queryKey,
          });
          showToast({
            title: "Session expired",
            description: "Please log in again to manage your favorites.",
            type: "error",
          });
          openAuthModal(!isCurrentlyFavorite ? movie : null);
          return;
        }
      }

      showToast({
        title: isCurrentlyFavorite
          ? "Could not remove favorite"
          : "Could not add favorite",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        type: "error",
      });
    },
    onSettled: (_data, _error, { movie }) => {
      removePendingMovieId(movie.id);
    },
  });
}
