import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/api/backend";
import { showToast } from "@/components/ui/toast";
import type { AuthCredentials } from "@/schemas/backend";
import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { favoritesQueryOptions } from "@/hooks/useFavorites";

export const currentUserOptions = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: fetchCurrentUser,
  retry: false,
  staleTime: Infinity,
});

export const useCurrentUser = () => useQuery(currentUserOptions);

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: AuthCredentials) => loginUser(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(currentUserOptions.queryKey, user);
      queryClient.invalidateQueries({
        queryKey: favoritesQueryOptions.queryKey,
      });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: AuthCredentials) => registerUser(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(currentUserOptions.queryKey, user);
      queryClient.invalidateQueries({
        queryKey: favoritesQueryOptions.queryKey,
      });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.setQueryData(currentUserOptions.queryKey, null);
      queryClient.removeQueries({ queryKey: favoritesQueryOptions.queryKey });
      showToast({
        title: "Signed out",
        description: "You have been logged out.",
      });
    },
    onError: (error) => {
      showToast({
        title: "Logout failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to log out. Please try again.",
        type: "error",
      });
    },
  });
}
