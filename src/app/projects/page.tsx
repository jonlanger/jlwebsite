import type { Metadata } from "next";

import { PastProjectsGrid } from "@/components/past-projects-grid";
import { PageShell } from "@/components/page-shell";
import { ProjectCategoryNav } from "@/components/project-category-nav";
import { projectsInCategory } from "@/data/past-projects";
import {
  DEFAULT_PROJECT_CATEGORY,
  parseProjectCategory,
  projectCategoryLabel,
} from "@/data/project-categories";
import { contentColumnClass } from "@/lib/content-layout";

type ProjectsPageProps = {
  searchParams: Promise<{ view?: string | string[] }>;
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  software:
    "Product design case studies for software platforms, dashboards, and connected applications.",
  hardware:
    "Industrial design and connected device work, from medical hardware to autonomous systems.",
  experiments:
    "Animation studies, physics simulations, data visualization, and other explorations.",
};

export async function generateMetadata({
  searchParams,
}: ProjectsPageProps): Promise<Metadata> {
  const view = parseProjectCategory((await searchParams).view);
  const isDefault = view === DEFAULT_PROJECT_CATEGORY;

  return {
    title: isDefault ? "Projects" : `Projects — ${projectCategoryLabel(view)}`,
    description: CATEGORY_DESCRIPTION[view],
    alternates: {
      canonical: isDefault ? "/projects" : `/projects?view=${view}`,
    },
  };
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const view = parseProjectCategory((await searchParams).view);
  const projects = projectsInCategory(view);

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

        <ProjectCategoryNav active={view} />

        <h2 className="mt-10 font-heading text-xl font-bold tracking-tight md:text-2xl">
          {projectCategoryLabel(view)}
        </h2>
        <PastProjectsGrid projects={projects} />
      </div>
    </PageShell>
  );
}
