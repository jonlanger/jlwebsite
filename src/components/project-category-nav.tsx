import Link from "next/link";

import {
  DEFAULT_PROJECT_CATEGORY,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/project-categories";
import {
  segmentVariants,
  segmentedControlVariants,
} from "@/lib/segmented-control-variants";

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
      className={segmentedControlVariants({ className: "mt-10" })}
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
            className={segmentVariants({ active: isActive })}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
