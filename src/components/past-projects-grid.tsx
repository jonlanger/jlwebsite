"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { PastProject } from "@/data/past-projects";
import { cn } from "@/lib/utils";

const THUMB_EXTRA_RAISE_SLUGS = new Set(["ai-camera-nodit", "voxelplm"]);

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

function PastProjectCard({ project }: { project: PastProject }) {
  const [imageReady, setImageReady] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project: ${project.title}`}
      className="group min-w-0 block rounded-xl outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        size="sm"
        className="h-full min-w-0 !gap-3 !p-3 bg-card/80 transition-colors group-hover:bg-card group-hover:ring-foreground/20"
      >
        <div className="relative aspect-video w-full min-h-0 shrink-0 overflow-hidden rounded-lg bg-muted/40">
          {!imageReady ? (
            <Skeleton
              aria-hidden
              className="absolute inset-0 z-0 size-full rounded-lg"
            />
          ) : null}
          <Image
            src={project.image}
            alt=""
            fill
            unoptimized
            onLoadingComplete={() => setImageReady(true)}
            onError={() => setImageReady(true)}
            className={cn(
              "z-[1] rounded-lg object-cover object-[right_top] origin-top-right scale-[4] transition-opacity duration-300",
              THUMB_EXTRA_RAISE_SLUGS.has(project.slug)
                ? "-translate-y-[160px]"
                : "-translate-y-[100px]",
              imageReady ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
          />
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
    </Link>
  );
}

export function PastProjectsGrid({ projects }: { projects: PastProject[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const remaining = projects.length - visibleCount;

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
        {visible.map((project) => (
          <PastProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="min-w-[12rem]"
            onClick={() =>
              setVisibleCount((n) =>
                Math.min(n + LOAD_MORE_STEP, projects.length)
              )
            }
          >
            Load more
            <span className="text-muted-foreground tabular-nums">
              {" "}
              ({remaining})
            </span>
          </Button>
        </div>
      ) : null}
    </>
  );
}
