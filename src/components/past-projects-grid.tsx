"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProjectUnlock } from "@/components/project-unlock-provider";
import { Skeleton } from "@/components/ui/skeleton";
import type { PastProject } from "@/data/past-projects";
import { cn } from "@/lib/utils";

const THUMB_EXTRA_RAISE_SLUGS = new Set(["ai-camera-nodit", "voxelplm"]);
/** Recent projects use dedicated hero art; older cards crop tall case-study boards. */
const HERO_CARD_SLUGS = new Set([
  "applied-ai-marketplace",
  "roadway-mobile-ticket",
  "project-speed-signs",
  "consultants-portal",
  "additive-mfg-roi-dashboard",
  "cell-gene-therapy-platform",
  "chemical-cx-platform",
  "additive-mfg-cx-data-platform",
  "dialysis-management",
  "connect-pool-robot-app",
  "additive-mfg-print-sim-scan",
  "coco",
  "petricor",
  "aureum",
  "equipify",
  "studioflow",
  "headlines",
  "foodtrack",
]);

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

function PastProjectCard({ project }: { project: PastProject }) {
  const router = useRouter();
  const { unlocked, isProtected, requestAccess } = useProjectUnlock();
  const [imageReady, setImageReady] = useState(false);
  const [awaitingUnlock, setAwaitingUnlock] = useState(false);
  const href = `/projects/${project.slug}`;

  useEffect(() => {
    if (!awaitingUnlock || !unlocked) return;
    setAwaitingUnlock(false);
    router.push(href);
  }, [awaitingUnlock, unlocked, href, router]);

  return (
    <Link
      href={href}
      aria-label={`View project: ${project.title}`}
      className="group min-w-0 block rounded-xl outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onClick={(event) => {
        if (!isProtected(project.slug) || unlocked) return;
        event.preventDefault();
        setAwaitingUnlock(true);
        requestAccess({
          onCancel: () => setAwaitingUnlock(false),
        });
      }}
    >
      <Card
        size="sm"
        className="h-full min-w-0 !gap-3 !p-3 bg-card/80 transition-colors group-hover:bg-card group-hover:ring-foreground/20"
      >
        <div className="relative aspect-video w-full min-h-0 shrink-0 overflow-hidden rounded-lg bg-muted/40">
          {project.image ? (
            <>
              {!imageReady ? (
                <Skeleton
                  aria-hidden
                  className="absolute inset-0 z-0 size-full rounded-lg"
                />
              ) : null}
              <Image
                src={project.image}
                alt={project.alt ?? ""}
                fill
                unoptimized
            onLoadingComplete={() => {
              setTimeout(() => setImageReady(true), 0);
            }}
            onError={() => {
              setTimeout(() => setImageReady(true), 0);
            }}
                className={cn(
                  "z-[1] rounded-lg object-cover transition-opacity duration-300",
                  HERO_CARD_SLUGS.has(project.slug)
                    ? "object-center"
                    : cn(
                        "origin-top-right scale-[4] object-[right_top]",
                        THUMB_EXTRA_RAISE_SLUGS.has(project.slug)
                          ? "-translate-y-[160px]"
                          : "-translate-y-[100px]"
                      ),
                  imageReady ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
              />
            </>
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
        <div className="mt-10 flex justify-start">
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
