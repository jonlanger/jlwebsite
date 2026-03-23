import type { Metadata } from "next";

import { PastProjectsGrid } from "@/components/past-projects-grid";
import { PageShell } from "@/components/page-shell";
import {
  pastProjects,
  sortPastProjectsForGrid,
} from "@/data/past-projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio, case studies, and projects grounded in research and real-world experience.",
};

const gridProjects = sortPastProjectsForGrid(pastProjects);

export default function ProjectsPage() {
  return (
    <PageShell>
      <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
        Portfolio, case studies &amp; projects
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        The following projects are grounded in real-world research and
        experience. Client details and personal information have been adjusted
        for privacy. Every project starts with people — their journeys,
        motivations, and contexts shape the design language, workflows, copy,
        and implementation strategy from the ground up.
      </p>

      <h2 className="font-heading mt-12 text-xl font-bold tracking-tight md:text-2xl">
        Past Projects 2012-2022
      </h2>

      <PastProjectsGrid projects={gridProjects} />
    </PageShell>
  );
}
