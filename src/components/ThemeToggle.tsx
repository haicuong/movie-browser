import { useThemeStore } from "../types/utilities.ts";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Toggle to ${nextTheme} theme`}
      title={`Toggle to ${nextTheme} theme`}
      className="bg-gray-300 transition-transform hover:cursor-pointer dark:bg-[#343434] rounded-2xl size-12 p-2 justify-self-end active:scale-94 md:hover:scale-96 md:active:scale-92"
    >
      {theme === "light" ? (
        <img src="/icon/dark-theme.webp" alt="" />
      ) : (
        <img src="/icon/light-theme.webp" className="dark:invert" alt="" />
      )}
    </button>
  );
}
