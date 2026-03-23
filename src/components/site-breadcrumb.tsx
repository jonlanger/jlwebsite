"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPastProject } from "@/data/past-projects";

const SEGMENT_LABEL: Record<string, string> = {
  projects: "Projects",
  about: "About",
  process: "Process",
  capabilities: "Capabilities",
};

function labelForSegment(segment: string) {
  return (
    SEGMENT_LABEL[segment] ??
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
  );
}

export function SiteBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isHome = pathname === "/";

  return (
    <Breadcrumb className="min-w-0 flex-1">
      <BreadcrumbList className="flex-nowrap gap-1 sm:gap-1.5">
        <BreadcrumbItem>
          {isHome ? (
            <BreadcrumbPage className="inline-flex items-center">
              <Home className="size-4 shrink-0" aria-hidden />
              <span className="sr-only">Home</span>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="inline-flex items-center"
              render={<Link href="/" />}
            >
              <Home className="size-4 shrink-0" aria-hidden />
              <span className="sr-only">Home</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {!isHome &&
          segments.map((segment, i) => {
            const href = `/${segments.slice(0, i + 1).join("/")}`;
            const label =
              i > 0 && segments[i - 1] === "projects"
                ? (getPastProject(segment)?.title ?? labelForSegment(segment))
                : labelForSegment(segment);
            const isLast = i === segments.length - 1;

            return (
              <Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0">
                  {isLast ? (
                    <BreadcrumbPage className="truncate">{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="truncate"
                      render={<Link href={href} />}
                    >
                      {label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
