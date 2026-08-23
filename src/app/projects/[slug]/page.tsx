import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ProjectDetailImage } from "@/components/project-detail-image";
import { ProjectSectionBlock } from "@/components/project-section-block";
import { ProjectUnlockGate } from "@/components/project-unlock-gate";
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
import { ArrowLeft, ExternalLink } from "lucide-react";

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
      <ProjectUnlockGate slug={slug}>
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
          {project.liveUrl ? (
            <p className="mt-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link", size: "lg" }),
                  "gap-2 px-0 text-base"
                )}
              >
                Visit live site
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </p>
          ) : null}

          {detailSections.map((b, i) => (
            <ProjectSectionBlock
              key={b.id}
              section={b.section}
              headingId={b.id}
              isFirst={i === 0}
            />
          ))}
        </div>

        {/* Board image only for image-only projects; structured case studies already tell the story. */}
        {detailSections.length === 0 && project.board && project.alt != null ? (
          <div className={projectDetailImageWrapClass}>
            <ProjectDetailImage
              src={project.board.src}
              alt={project.alt}
              width={project.board.width}
              height={project.board.height}
              sizes="(max-width: 900px) 100vw, 900px"
              quality={82}
              eager
            />
          </div>
        ) : null}
      </ProjectUnlockGate>
    </PageShell>
  );
}
