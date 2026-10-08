"use client";

import { useState } from "react";

import { ExpandableImage } from "@/components/expandable-image";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type {
  JourneyAccordionBlock,
  JourneyBlock,
  JourneyMapColumn,
} from "@/data/past-projects";
import { cn } from "@/lib/utils";

function JourneyMapTable({
  columns,
  ariaLabel,
}: {
  columns: readonly JourneyMapColumn[];
  ariaLabel: string;
}) {
  const colCount = columns.length;
  const rowCount = columns[0]?.rows.length ?? 0;
  const lastBodyRow = rowCount - 1;
  // A first column of row labels (aspects, or stages in a transposed map).
  const hasAspectColumn = ["Aspect", "Stage"].includes(columns[0]?.header ?? "");

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full min-w-[52rem] border-collapse text-left text-xs leading-snug md:min-w-0 md:text-sm md:leading-relaxed"
        aria-label={ariaLabel}
      >
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={colIndex}
                scope="col"
                className={cn(
                  "border-b border-border px-2 py-3 text-center text-balance font-bold text-foreground align-bottom md:px-3",
                  colIndex < colCount - 1 && "border-r border-border"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const isAspectCell = hasAspectColumn && colIndex === 0;
                const Cell = isAspectCell ? "th" : "td";
                return (
                  <Cell
                    key={colIndex}
                    {...(isAspectCell
                      ? { scope: "row" as const }
                      : undefined)}
                    className={cn(
                      "px-2 py-2.5 align-top md:px-3 md:py-3",
                      isAspectCell
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground",
                      rowIndex < lastBodyRow && "border-b border-border",
                      colIndex < colCount - 1 && "border-r border-border"
                    )}
                  >
                    {col.rows[rowIndex] ?? ""}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JourneyMapAccordion(block: JourneyAccordionBlock) {
  const { value, title, defaultOpen, tableAriaLabel, columns } = block;
  // Captured once: Base UI warns if an uncontrolled default changes identity.
  const [initialOpen] = useState(() => (defaultOpen ? [value] : []));
  return (
    <Accordion defaultValue={initialOpen}>
      <AccordionItem value={value}>
        <AccordionTrigger>
          <span>{title}</span>
        </AccordionTrigger>
        <AccordionPanel className="px-3 md:px-4">
          <JourneyMapTable columns={columns} ariaLabel={tableAriaLabel} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export function ProjectJourneyMapping({
  blocks,
  className,
}: {
  blocks: readonly JourneyBlock[];
  className?: string;
}) {
  return (
    <div className={cn("mt-6 space-y-6 md:mt-8", className)}>
      {blocks.map((block, i) =>
        block.type === "paragraph" ? (
          <p
            key={i}
            className="text-muted-foreground leading-relaxed first:mt-0"
          >
            {block.text}
          </p>
        ) : block.type === "figure" ? (
          <figure key={block.src} className="m-0 py-2">
            <ExpandableImage
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </figure>
        ) : block.type === "journeyTable" ? (
          <div
            key={`table-${i}`}
            className="overflow-hidden rounded-lg border border-border bg-card/60 px-3 py-3 md:px-4 md:py-4"
          >
            <JourneyMapTable
              columns={block.columns}
              ariaLabel={block.tableAriaLabel}
            />
          </div>
        ) : (
          <JourneyMapAccordion key={block.value} {...block} />
        )
      )}
    </div>
  );
}
