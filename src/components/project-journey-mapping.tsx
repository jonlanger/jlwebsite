"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

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
  const hasAspectColumn = columns[0]?.header === "Aspect";

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
  return (
    <Accordion.Root
      className="w-full overflow-hidden rounded-lg border border-border bg-card/60"
      defaultValue={defaultOpen ? [value] : []}
      multiple={false}
    >
      <Accordion.Item value={value}>
        <Accordion.Header>
          <Accordion.Trigger
            className={cn(
              "group flex w-full items-center justify-between gap-3 px-4 py-3 text-left outline-none",
              "font-heading text-lg font-semibold tracking-tight text-foreground",
              "hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <span>{title}</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className="border-t border-border px-3 pb-4 pt-3 md:px-4">
          <JourneyMapTable columns={columns} ariaLabel={tableAriaLabel} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
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
