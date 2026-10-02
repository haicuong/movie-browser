import { useEffect, useState } from "react";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export function useDebounce<T>(value: T, delay: number) {
  const [stateValue, setStateValue] = useState(value);

  function immediateUpdate(newValue: T) {
    setStateValue(newValue);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStateValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [stateValue, immediateUpdate] as const;
}

export function useCountDown(initialValue: number) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const resetCount = () => setCount(initialValue);

  return [count, resetCount] as const;
}

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

export const useThemeStore = create(
  persist(
    combine({ theme: getInitialTheme(), isThemeToggling: false }, (set) => ({
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark",
          );

          setTimeout(() => {
            set({ isThemeToggling: false });
          }, 0);
          return { theme: newTheme, isThemeToggling: true };
        });
      },
    })),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
