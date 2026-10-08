import { cva, type VariantProps } from "class-variance-authority";

/**
 * Segmented control: a tray of mutually exclusive options (category filters,
 * settings). Class helpers rather than a component so segments can be `Link`s
 * (server-rendered) or `button`s. See docs/design-system.md → Segmented control.
 */
export const segmentedControlVariants = cva(
  "gap-1 rounded-lg bg-muted/50 p-1 ring-1 ring-foreground/10",
  {
    variants: {
      orientation: {
        horizontal: "flex flex-wrap sm:inline-flex",
        vertical: "flex w-full flex-col",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
);

export const segmentVariants = cva(
  [
    "inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-4 text-base font-medium whitespace-nowrap transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      active: {
        true: "bg-background text-foreground shadow-sm",
        false: "text-muted-foreground hover:text-foreground",
      },
      orientation: {
        horizontal: "",
        vertical: "w-full justify-start",
      },
    },
    defaultVariants: { active: false, orientation: "horizontal" },
  }
);

export type SegmentedControlVariantProps = VariantProps<
  typeof segmentedControlVariants
>;
