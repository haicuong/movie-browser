import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    combine({ theme: getInitialTheme() }, (set) => ({
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark",
          );

          document.documentElement.classList.add("no-transitions");

          // Force a reflow to ensure the transition is applied correctly
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          window.getComputedStyle(document.documentElement).opacity;
          document.documentElement.classList.remove("no-transitions");

          return { theme: newTheme };
        });
      },
    })),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);

function getInitialTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme-storage");

  if (stored) {
    const parsed = JSON.parse(stored);
    const savedTheme = parsed.state?.theme;

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default useThemeStore;
