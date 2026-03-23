"use client";

import {
  useTextScale,
  type TextScale,
} from "@/components/text-scale-provider";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const LEVELS: { value: TextScale; label: string }[] = [
  { value: 0, label: "Default" },
  { value: 1, label: "Large" },
  { value: 2, label: "Larger" },
];

export function TextSizeControl() {
  const { scale, setScale } = useTextScale();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Text size
      </p>
      <div className="flex flex-wrap gap-2">
        {LEVELS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setScale(value)}
            className={cn(
              buttonVariants({
                variant: scale === value ? "default" : "outline",
                size: "default",
              }),
              "h-[48px] min-h-[48px] px-4 lg:h-[32px] lg:min-h-[32px]"
            )}
            aria-pressed={scale === value}
            aria-label={`Text size: ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
