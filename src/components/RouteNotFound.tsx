import { Link } from "react-router";

export default function RouteNotFound() {
  return (
    <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-background text-secondary-foreground p-4">
      <h1 className="font-bold mb-4 text-3xl">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-base">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-xl bg-thirdary p-4 hover:cursor-pointer"
      >
        Go back to home
      </Link>
    </div>
  );
}
