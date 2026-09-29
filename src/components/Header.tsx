import { Link } from "react-router";

export default function Header({
  children,
  onHome,
}: {
  children: React.ReactNode;
  onHome?: () => void;
}) {
  return (
    <header className="bg-gray-200 sticky top-0 z-10 dark:bg-[#232323] items-center justify-between md:px-4 px-4 flex">
      <div className="flex items-center justify-center">
        <img src="/logo.webp" alt="Logo" className="w-10 hidden md:block" />
        <Link
          to={{ pathname: "/", search: "", hash: "" }}
          replace
          onClick={onHome}
          className="text-xl font-bold md:p-4 py-4 hover:underline"
        >
          Movie Browser
        </Link>
      </div>
      {children}
    </header>
  );
}
