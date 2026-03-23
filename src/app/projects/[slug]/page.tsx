import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getPastProject, pastProjects } from "@/data/past-projects";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pastProjects.map((p) => ({ slug: p.slug }));
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

  return (
    <PageShell>
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2 mb-8 h-auto gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        All projects
      </Link>

      <h1 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="mt-10 w-full max-w-[900px]">
        <Image
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          className="h-auto w-full rounded-lg ring-1 ring-foreground/10"
          sizes="(max-width: 900px) 100vw, 900px"
          quality={90}
          priority
        />
      </div>
    </PageShell>
  );
}
