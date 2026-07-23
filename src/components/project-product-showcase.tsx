"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { ProjectImageCarousel } from "@/components/project-image-carousel";
import type { ProjectProductShowcase as ProductShowcaseData } from "@/data/past-projects";
import { cn } from "@/lib/utils";

export function ProjectProductShowcase({
  showcase,
  className,
}: {
  showcase: ProductShowcaseData;
  className?: string;
}) {
  const defaultOpen = showcase.accordion
    ?.filter((item) => item.defaultOpen)
    .map((item) => item.value);

  return (
    <div className={cn("w-full space-y-10 md:space-y-12", className)}>
      <ProjectImageCarousel
        slides={showcase.slides}
        ariaLabel="Product story screens"
      />

      {showcase.accordion && showcase.accordion.length > 0 ? (
        <Accordion.Root
          className="w-full space-y-3"
          defaultValue={defaultOpen}
          multiple
        >
          {showcase.accordion.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              className="overflow-hidden rounded-lg border border-border bg-card/60"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left outline-none md:px-5",
                    "hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block font-heading text-base font-semibold tracking-tight text-foreground md:text-lg">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  <ChevronDown
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="border-t border-border px-3 pb-5 pt-4 md:px-5">
                <ProjectImageCarousel
                  slides={item.slides}
                  ariaLabel={item.title}
                />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      ) : null}
    </div>
  );
}
