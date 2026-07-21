"use client";

import { Tabs } from "@base-ui/react/tabs";

import { ExpandableImage } from "@/components/expandable-image";
import { FoodtrackLiveDemo } from "@/components/foodtrack-live-demo";
import { HeadlinesLiveDemo } from "@/components/headlines-live-demo";
import type { ProjectUserFlowTab } from "@/data/past-projects";
import { cn } from "@/lib/utils";

function LiveDemo({ kind }: { kind: NonNullable<ProjectUserFlowTab["liveDemo"]> }) {
  if (kind === "headlines") return <HeadlinesLiveDemo className="mt-8" />;
  if (kind === "foodtrack") return <FoodtrackLiveDemo className="mt-8" />;
  return null;
}

export function ProjectUserFlowTabs({
  tabs,
  className,
  tabsListAriaLabel = "User type",
}: {
  tabs: readonly ProjectUserFlowTab[];
  className?: string;
  /** Accessible name for the tab list (e.g. Implement vs. User Flows). */
  tabsListAriaLabel?: string;
}) {
  return (
    <Tabs.Root
      className={cn("w-full", className)}
      defaultValue={tabs[0]?.value ?? "customer"}
    >
      <Tabs.List
        className={cn(
          "flex flex-wrap gap-1 rounded-lg bg-muted/50 p-1 md:inline-flex md:flex-nowrap"
        )}
        aria-label={tabsListAriaLabel}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={cn(
              "min-h-11 flex-1 rounded-md px-3 py-2 text-center text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none md:flex-none md:px-4",
              "hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring",
              "data-[active]:bg-card data-[active]:text-foreground data-[active]:shadow-sm"
            )}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel
          key={tab.value}
          value={tab.value}
          className="pt-8 focus:outline-none"
          keepMounted={false}
        >
          <p className="text-muted-foreground leading-relaxed">
            {tab.description}
          </p>
          {tab.liveDemo ? <LiveDemo kind={tab.liveDemo} /> : null}
          {tab.images.length > 0 ? (
            <div className="mt-8 space-y-8">
              {tab.images.map((img) => (
                <figure key={img.src} className="m-0">
                  <ExpandableImage
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 900px) 100vw, 900px"
                  />
                </figure>
              ))}
            </div>
          ) : null}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
