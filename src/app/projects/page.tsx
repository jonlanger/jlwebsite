import type { Metadata } from "next";

import { PastProjectsGrid } from "@/components/past-projects-grid";
import { PageShell } from "@/components/page-shell";
import {
  pastProjects,
  RECENT_PROJECT_GRID_ORDER,
  recentProjects2023_2026,
  sortPastProjectsForGrid,
} from "@/data/past-projects";
import { contentColumnClass } from "@/lib/content-layout";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio, case studies, and projects grounded in research and real-world experience.",
};

const recentGridProjects = sortPastProjectsForGrid(
  recentProjects2023_2026,
  RECENT_PROJECT_GRID_ORDER
);
const pastGridProjects = sortPastProjectsForGrid(pastProjects);

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className={contentColumnClass}>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Portfolio, case studies &amp; projects
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          The following projects are grounded in real-world research and
          experience. Client details and personal information have been adjusted
          for privacy. Every project starts with people — their journeys,
          motivations, and contexts shape the design language, workflows, copy,
          and implementation strategy from the ground up.
        </p>

        <h2 className="mt-12 font-heading text-xl font-bold tracking-tight md:text-2xl">
          Software &amp; Platforms
        </h2>
        <PastProjectsGrid projects={recentGridProjects} />

        <h2 className="mt-14 font-heading text-xl font-bold tracking-tight md:text-2xl">
          Connected Devices &amp; Hardware
        </h2>
        <PastProjectsGrid projects={pastGridProjects} />
      </div>
    </PageShell>
  );
}
