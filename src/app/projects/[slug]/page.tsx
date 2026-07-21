import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ProjectDetailImage } from "@/components/project-detail-image";
import { ProjectSectionBlock } from "@/components/project-section-block";
import {
  getPastProject,
  getPastProjectSlugs,
  type ProjectSection,
} from "@/data/past-projects";
import { buttonVariants } from "@/lib/button-variants";
import {
  contentColumnClass,
  projectDetailImageWrapClass,
} from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPastProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPastProject(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function PastProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPastProject(slug);
  if (!project) notFound();

  const detailSections: { section: ProjectSection; id: string }[] = [
    ...(project.overview
      ? [{ section: project.overview, id: `${slug}-overview` }]
      : []),
    ...(project.sections ?? []).map((section, i) => ({
      section,
      id: `${slug}-section-${i}`,
    })),
  ];

  return (
    <PageShell>
      <div className={contentColumnClass}>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "link", size: "lg" }),
            "mb-8 gap-2 text-base"
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          All projects
        </Link>

        <h1 className="w-full font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 w-full text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {detailSections.map((b, i) => (
          <ProjectSectionBlock
            key={b.id}
            section={b.section}
            headingId={b.id}
            isFirst={i === 0}
          />
        ))}
      </div>

      {project.image && project.alt != null && project.width && project.height ? (
        <div className={projectDetailImageWrapClass}>
          <ProjectDetailImage
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            sizes="(max-width: 900px) 100vw, 900px"
            quality={90}
            priority
          />
        </div>
      ) : null}
    </PageShell>
  );
}
