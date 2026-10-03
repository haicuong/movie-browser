import { Link } from "react-router";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header({
  children,
  onHome,
}: {
  children: React.ReactNode;
  onHome?: () => void;
}) {
  return (
    <header className="bg-secondary shadow-lg shadow-shadow sticky top-0 z-10 items-center justify-between md:px-4 px-4 flex">
      <div className="flex items-center gap-2 md:gap-4 justify-center">
        <img src="/logo.webp" alt="Logo" className="w-10" />
        <Link
          to={{ pathname: "/", search: "", hash: "" }}
          onClick={onHome}
          className="text-md md:text-lg font-bold py-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Movie Browser
        </Link>
      </div>
      <div className="flex items-center py-2 justify-center gap-4">
        <ThemeToggle />
        {children}
      </div>
    </header>
  );
}
