import { useThemeStore } from "../types/utilities.ts";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            onClick={toggleTheme}
            variant="ghost"
            aria-label={`Toggle to ${nextTheme} theme`}
            className="bg-gray-300 hover:bg-gray-300 aspect-square transition-none hover:cursor-pointer dark:bg-[#343434] dark:hover:bg-[#343434] rounded-2xl size-12"
          >
            {theme === "light" ? (
              <Moon className="size-7" />
            ) : (
              <Sun className="size-7" />
            )}
          </Button>
        }
      />
      <TooltipContent>
        <p>Toggle to {nextTheme} theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
