import { useThemeStore } from "../types/utilities.ts";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { AnimatePresence, motion } from "motion/react";

const MotionMoon = motion.create(Moon);
const MotionSun = motion.create(Sun);

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isThemeToggling = useThemeStore((state) => state.isThemeToggling);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            onClick={toggleTheme}
            variant="thirdary"
            aria-label={`Toggle to ${nextTheme} theme`}
            className={`aspect-square ${isThemeToggling ? "duration-0" : ""} relative overflow-hidden hover:cursor-pointer rounded-2xl size-12`}
          >
            <AnimatePresence mode="sync" initial={false}>
              {theme === "light" ? (
                <MotionMoon
                  initial={{ y: "-150%", opacity: 0, scale: 0.7 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: "150%", opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3 }}
                  key="moon"
                  className="size-7 absolute"
                />
              ) : (
                <MotionSun
                  initial={{ y: "-150%", opacity: 0, scale: 0.7 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: "150%", opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3 }}
                  key="sun"
                  className="size-7 absolute"
                />
              )}
            </AnimatePresence>
          </Button>
        }
      />
      <TooltipContent>
        <p>Toggle to {nextTheme} theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
