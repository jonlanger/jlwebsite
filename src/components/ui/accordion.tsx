"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Site accordion: each item is a bordered card with a full-width trigger and a
 * rotating chevron. See docs/design-system.md → Accordion.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full space-y-3", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card/60",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full items-center justify-between gap-3 px-4 py-3 text-left outline-none",
          "font-heading text-lg font-semibold tracking-tight text-foreground",
          "hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn("border-t border-border px-4 pb-4 pt-3", className)}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel };
