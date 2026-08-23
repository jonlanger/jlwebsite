import Image from "next/image";
import Link from "next/link";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProtectedProjectLink } from "@/components/protected-project-link";
import type { PastProject } from "@/data/past-projects";
import { isProtectedProject } from "@/lib/protected-projects";

const cardLinkClass =
  "group min-w-0 block rounded-xl outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function CardBody({ project }: { project: PastProject }) {
  return (
    <Card
      size="sm"
      className="h-full min-w-0 !gap-3 !p-3 bg-card/80 transition-colors group-hover:bg-card group-hover:ring-foreground/20"
    >
      <div className="relative aspect-video w-full min-h-0 shrink-0 overflow-hidden rounded-lg bg-muted/40">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt ?? ""}
            fill
            loading="lazy"
            className="rounded-lg object-cover object-center"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        <CardTitle className="font-heading text-sm font-bold leading-snug group-hover:text-primary md:text-base">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
          {project.description}
        </CardDescription>
      </div>
    </Card>
  );
}

function PastProjectCard({ project }: { project: PastProject }) {
  const href = `/projects/${project.slug}`;
  const label = `View project: ${project.title}`;

  // Only password-gated cards need a client boundary; the rest are plain anchors.
  if (isProtectedProject(project.slug)) {
    return (
      <ProtectedProjectLink
        slug={project.slug}
        href={href}
        aria-label={label}
        className={cardLinkClass}
      >
        <CardBody project={project} />
      </ProtectedProjectLink>
    );
  }

  return (
    <Link href={href} aria-label={label} className={cardLinkClass}>
      <CardBody project={project} />
    </Link>
  );
}

export function PastProjectsGrid({ projects }: { projects: PastProject[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
      {projects.map((project) => (
        <PastProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
