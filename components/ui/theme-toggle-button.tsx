"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { createAnimation, type AnimationStart, type AnimationVariant } from "./skiper-ui/skiper26";

type ThemeToggleButtonProps = {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
};

export function ThemeToggleButton({
  className,
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: ThemeToggleButtonProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const applyTheme = () => setTheme(nextTheme);

    if (typeof document === "undefined" || typeof document.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const animation = createAnimation(variant, start, blur, gifUrl);
    let style = document.getElementById("theme-transition-styles") as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = "theme-transition-styles";
      document.head.appendChild(style);
    }
    style.textContent = animation.css;
    document.startViewTransition(applyTheme);
  }, [resolvedTheme, setTheme, variant, start, blur, gifUrl]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-10 cursor-pointer items-center justify-center rounded-full p-0 transition-all duration-300 active:scale-85",
        isDark ? "bg-white text-black" : "bg-black text-white",
        className,
      )}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      disabled={!mounted}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
