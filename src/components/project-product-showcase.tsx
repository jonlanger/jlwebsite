"use client";

import { useState } from "react";

import { ProjectImageCarousel } from "@/components/project-image-carousel";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProjectProductShowcase as ProductShowcaseData } from "@/data/past-projects";
import { cn } from "@/lib/utils";

export function ProjectProductShowcase({
  showcase,
  className,
}: {
  showcase: ProductShowcaseData;
  className?: string;
}) {
  // Captured once: Base UI warns if an uncontrolled default changes identity.
  const [defaultOpen] = useState(() =>
    showcase.accordion
      ?.filter((item) => item.defaultOpen)
      .map((item) => item.value)
  );

  return (
    <div className={cn("w-full space-y-10 md:space-y-12", className)}>
      {showcase.slides.length > 0 ? (
        <ProjectImageCarousel
          slides={showcase.slides}
          ariaLabel="Product story screens"
        />
      ) : null}

      {showcase.accordion && showcase.accordion.length > 0 ? (
        <Accordion defaultValue={defaultOpen} multiple>
          {showcase.accordion.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="py-3.5 md:px-5">
                <span className="min-w-0">
                  <span className="block text-base md:text-lg">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block font-sans text-sm font-normal leading-relaxed tracking-normal text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </AccordionTrigger>
              <AccordionPanel className="px-3 pb-5 pt-4 md:px-5">
                <ProjectImageCarousel
                  slides={item.slides}
                  ariaLabel={item.title}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}
    </div>
  );
}
