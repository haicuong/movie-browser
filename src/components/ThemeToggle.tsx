import { useThemeStore } from "../types/utilities.ts";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Toggle to ${nextTheme} theme`}
      title={`Toggle to ${nextTheme} theme`}
      className="bg-gray-300 flex p-2 md:p-0 aspect-square items-center justify-center transition-transform hover:cursor-pointer dark:bg-[#343434] rounded-2xl size-12 justify-self-end active:scale-94 md:hover:scale-96 md:active:scale-92"
    >
      {theme === "light" ? <Moon size={40} /> : <Sun size={40} />}
    </button>
  );
}
