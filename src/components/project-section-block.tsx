import { Fragment } from "react";

import { ExpandableImage } from "@/components/expandable-image";
import { FeatureRankingCharts } from "@/components/feature-ranking-charts";
import type { ProjectSection } from "@/data/past-projects";
import { ProjectJourneyMapping } from "@/components/project-journey-mapping";
import { ProjectUserFlowTabs } from "@/components/project-user-flow-tabs";
import { ResearchInsights } from "@/components/research-insights";
import { cn } from "@/lib/utils";

export function ProjectSectionBlock({
  section,
  headingId,
  isFirst = false,
}: {
  section: ProjectSection;
  headingId: string;
  /** First block after the project intro uses tighter top spacing. */
  isFirst?: boolean;
}) {
  return (
    <section
      className={cn(
        "w-full border-t border-border pt-8 text-left",
        isFirst ? "mt-12" : "mt-16"
      )}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-heading text-4xl font-[300] leading-[1.05] tracking-tight text-stone-400 md:text-[64px] md:leading-[1.05]"
      >
        {section.title}
      </h2>
      {section.journeyBlocks && section.journeyBlocks.length > 0 ? (
        <ProjectJourneyMapping blocks={section.journeyBlocks} />
      ) : (
        <>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed md:mt-8">
            {section.paragraphs.map((paragraph, i) => {
              const figuresAfter = section.figures?.filter(
                (fig) => fig.afterParagraphIndex === i
              );
              const figuresLayout = section.figuresLayout ?? "stack";

              return (
                <Fragment key={i}>
                  <p>{paragraph}</p>
                  {figuresAfter && figuresAfter.length > 0 ? (
                    figuresLayout === "grid-2" ? (
                      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                        {figuresAfter.map((fig) => (
                          <figure key={fig.src} className="m-0 min-w-0">
                            <ExpandableImage
                              src={fig.src}
                              alt={fig.alt}
                              width={fig.width}
                              height={fig.height}
                              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 450px"
                              className="rounded-lg"
                            />
                          </figure>
                        ))}
                      </div>
                    ) : (
                      figuresAfter.map((fig) => (
                        <figure key={`${fig.src}-${i}`} className="mt-8">
                          <ExpandableImage
                            src={fig.src}
                            alt={fig.alt}
                            width={fig.width}
                            height={fig.height}
                            sizes="(max-width: 900px) 100vw, 900px"
                          />
                        </figure>
                      ))
                    )
                  ) : null}
                  {section.featureRankingChartsAfterParagraphIndex === i ? (
                    <FeatureRankingCharts
                      className="mt-10 md:mt-12 mb-16 md:mb-20"
                      data={section.featureRankingData}
                    />
                  ) : null}
                  {section.researchInsightsAfterParagraphIndex === i &&
                  section.researchInsights ? (
                    <ResearchInsights data={section.researchInsights} />
                  ) : null}
                </Fragment>
              );
            })}
          </div>
          {section.userFlowTabs && section.userFlowTabs.length > 0 ? (
            <ProjectUserFlowTabs
              tabs={section.userFlowTabs}
              className="mt-10 md:mt-12"
            />
          ) : null}
          {section.implementTabs && section.implementTabs.length > 0 ? (
            <ProjectUserFlowTabs
              tabs={section.implementTabs}
              className="mt-10 md:mt-12"
              tabsListAriaLabel="Experience"
            />
          ) : null}
          {section.table ? (
            <div className="mt-8 overflow-x-auto">
              <table
                className="w-full min-w-[20rem] border-collapse text-left text-sm leading-relaxed md:text-base"
                aria-label={
                  section.table.ariaLabel ?? "Roles and supporting detail"
                }
              >
                <tbody className="divide-y divide-border">
                  {section.table.rows.map((row, i) => (
                    <tr key={i}>
                      <th
                        scope="row"
                        className="align-top py-3 pr-4 font-medium text-foreground md:py-3.5 md:pr-6"
                      >
                        {row.col1}
                      </th>
                      <td className="align-top py-3 text-muted-foreground md:py-3.5">
                        {row.col2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </>
      )}
      {(section.role ?? section.scope) ? (
        <dl className="mt-8 space-y-3 text-sm leading-relaxed md:text-base">
          {section.role ? (
            <div className="grid gap-0.5 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
              <dt className="font-medium text-foreground">Role</dt>
              <dd className="text-muted-foreground">{section.role}</dd>
            </div>
          ) : null}
          {section.scope ? (
            <div className="grid gap-0.5 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
              <dt className="font-medium text-foreground">Scope</dt>
              <dd className="text-muted-foreground">{section.scope}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </section>
  );
}
