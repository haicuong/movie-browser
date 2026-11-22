import { useState, type SubmitEvent, type MouseEvent } from "react";
import { useLocation } from "react-router";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { showToast } from "@/components/ui/toast";
import { useLoginMutation, useRegisterMutation } from "@/hooks/useAuth";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { useToggleFavoriteMutation } from "@/hooks/useFavorites";
import { BackendApiError } from "@/lib/errors";
import {
  loginCredentialsSchema,
  registerCredentialsSchema,
  type AuthUser,
} from "@/schemas/backend";

export default function AuthModal() {
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const pendingFavoriteMovie = useAuthModalStore(
    (state) => state.pendingFavoriteMovie,
  );
  const closeAuthModal = useAuthModalStore((state) => state.closeAuthModal);
  const setShouldScrollToFavorites = useAuthModalStore(
    (state) => state.setShouldScrollToFavorites,
  );
  const { pathname, search } = useLocation();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const { mutate: toggleFavorite } = useToggleFavoriteMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<"register" | "login" | null>(
    null,
  );

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  function resetFormState() {
    setPassword("");
    setShowPassword(false);
    setErrorMessage(null);
    setActiveAction(null);
  }

  function handleOpenChange(open: boolean) {
    if (!open && !isSubmitting) {
      resetFormState();
      closeAuthModal();
    }
  }

  function handleAuthSuccess(user: AuthUser) {
    const movieToFavorite = pendingFavoriteMovie;
    setEmail("");
    resetFormState();
    closeAuthModal();

    const hasSearchQuery = Boolean(
      new URLSearchParams(search).get("q")?.trim(),
    );
    if (pathname === "/" && !hasSearchQuery) {
      setShouldScrollToFavorites(true);
    }

    showToast({
      title: "Signed in",
      description: `Logged in as ${user.email}`,
      type: "success",
    });

    if (movieToFavorite) {
      toggleFavorite({ movie: movieToFavorite, isCurrentlyFavorite: false });
    }
  }

  function handleRegister(event: SubmitEvent | MouseEvent) {
    event.preventDefault();
    authSubmit("register");
  }

  function handleLogin(event: SubmitEvent | MouseEvent) {
    event.preventDefault();
    authSubmit("login");
  }

  function authSubmit(mode: "register" | "login") {
    if (isSubmitting) {
      return;
    }

    const parsed = loginCredentialsSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrorMessage(
        parsed.error.issues[0]?.message ??
          "Please check your email and password.",
      );
      return;
    }

    setErrorMessage(null);
    setActiveAction(mode);

    if (mode === "login") {
      loginMutation.mutate(parsed.data, {
        onSuccess: handleAuthSuccess,
        onError: (error) => {
          if (error instanceof BackendApiError && error.status === 401) {
            setErrorMessage(
              "Invalid email or password. You may need to register an account first.",
            );
            return;
          }
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Login failed. Please try again.",
          );
        },
      });
    } else {
      registerMutation.mutate(parsed.data, {
        onSuccess: handleAuthSuccess,
        onError: (error) => {
          if (error instanceof BackendApiError && error.status === 409) {
            setErrorMessage("An account with this email already exists.");
            return;
          }
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Registration failed. Please try again.",
          );
        },
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col sm:max-w-md max-h-[90vh] bg-card p-6 overflow-hidden">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-lg font-bold">
            Account required
          </DialogTitle>
          <DialogDescription>
            {pendingFavoriteMovie
              ? `Register or log in to save "${pendingFavoriteMovie.title}" to your favorites.`
              : "Enter your email and password to create an account or log in."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 min-h-0 overflow-y-auto overflow-x-hidden p-1"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              className="bg-thirdary text-thirdary-foreground"
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              disabled={isSubmitting}
              aria-invalid={Boolean(errorMessage)}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-password" className="text-sm font-medium">
              Password
            </label>
            <InputGroup className="bg-thirdary text-thirdary-foreground">
              <InputGroupInput
                id="auth-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="At least 8 characters to register"
                value={password}
                disabled={isSubmitting}
                aria-invalid={Boolean(errorMessage)}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
              />
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <InputGroupButton
                        type="button"
                        size="icon-xs"
                        variant="ghost"
                        className="hover:cursor-pointer"
                        disabled={isSubmitting}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </InputGroupButton>
                    }
                  />
                  <TooltipContent>
                    <p>{showPassword ? "Hide password" : "Show password"}</p>
                  </TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
            <div className="flex min-h-4">
              {errorMessage && (
                <p role="alert" className="w-full text-xs text-destructive">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="default"
              className="w-full hover:cursor-pointer"
              disabled={isSubmitting}
            >
              {activeAction === "register" && isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full hover:cursor-pointer"
              disabled={isSubmitting}
              onClick={handleLogin}
            >
              {activeAction === "login" && isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
