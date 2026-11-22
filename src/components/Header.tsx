import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrentUser, useLogoutMutation } from "@/hooks/useAuth";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { Link } from "react-router";

export default function Header({ children }: { children: React.ReactNode }) {
  const { data: user, isPending: isAuthPending } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

  return (
    <header className="bg-secondary shadow-lg shadow-shadow sticky top-0 z-10 items-center justify-between gap-2 sm:px-4 px-4 flex">
      <div className="flex items-center gap-2 sm:gap-4 justify-center">
        <img src="/logo.webp" alt="Logo" className="w-10" />
        <Link
          to={{ pathname: "/", search: "", hash: "" }}
          className="text-md sm:text-lg font-bold py-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Movie Browser
        </Link>
      </div>
      <div className="flex items-center py-2 justify-center gap-2 sm:gap-4 min-w-0">
        <ThemeToggle />
        {children}
        <div className="flex items-center justify-center w-16">
          {user ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="thirdary"
                    size="sm"
                    className="shrink-0 hover:cursor-pointer"
                    disabled={isLoggingOut}
                    onClick={() => logout()}
                  >
                    Log out
                  </Button>
                }
              />
              <TooltipContent>
                <p>Signed in as {user.email}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="default"
                    size="sm"
                    className="shrink-0 hover:cursor-pointer"
                    disabled={isAuthPending}
                    onClick={() => openAuthModal()}
                  >
                    Log in
                  </Button>
                }
              />
              <TooltipContent>
                <p>Log in to favorite movies</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </header>
  );
}
