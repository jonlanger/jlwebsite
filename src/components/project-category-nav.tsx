import Link from "next/link";

import {
  DEFAULT_PROJECT_CATEGORY,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/project-categories";
import { cn } from "@/lib/utils";

/**
 * Segmented control for the /projects category filter.
 *
 * Plain anchors, not a toggle group: the active category is knowable on the
 * server from `searchParams`, so this ships with no client JS and each view
 * stays crawlable, prefetchable, and linkable.
 */
export function ProjectCategoryNav({ active }: { active: ProjectCategory }) {
  return (
    <nav
      aria-label="Filter projects by category"
      className="mt-10 flex flex-wrap gap-1 rounded-lg bg-muted/50 p-1 ring-1 ring-foreground/10 sm:inline-flex"
    >
      {PROJECT_CATEGORIES.map((category) => {
        const isActive = category.id === active;
        return (
          <Link
            key={category.id}
            href={
              category.id === DEFAULT_PROJECT_CATEGORY
                ? "/projects"
                : `/projects?view=${category.id}`
            }
            aria-current={isActive ? "page" : undefined}
            scroll={false}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
