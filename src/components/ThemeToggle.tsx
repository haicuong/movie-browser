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
            variant="thirdary"
            aria-label={`Toggle to ${nextTheme} theme`}
            className="aspect-square transition-none hover:cursor-pointer rounded-2xl size-12"
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
