"use client";

import {
  useTextScale,
  type TextScale,
} from "@/components/text-scale-provider";
import {
  segmentVariants,
  segmentedControlVariants,
} from "@/lib/segmented-control-variants";

const LEVELS: { value: TextScale; label: string }[] = [
  { value: 0, label: "Default" },
  { value: 1, label: "Medium" },
  { value: 2, label: "Large" },
];

export function TextSizeControl() {
  const { scale, setScale } = useTextScale();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Text size
      </p>
      <div
        role="group"
        aria-label="Text size"
        className={segmentedControlVariants({ orientation: "vertical" })}
      >
        {LEVELS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setScale(value)}
            className={segmentVariants({
              active: scale === value,
              orientation: "vertical",
            })}
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
