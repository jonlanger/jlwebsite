"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const MODES = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme is unknown until mount; render nothing selected to avoid a hydration mismatch.
  const current = mounted ? (theme ?? "system") : undefined;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Appearance
      </p>
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              buttonVariants({
                variant: current === value ? "default" : "outline",
                size: "default",
              }),
              "h-[48px] min-h-[48px] gap-1.5 px-4 lg:h-[32px] lg:min-h-[32px]"
            )}
            aria-pressed={current === value}
            aria-label={`Appearance: ${label}`}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
