/**
 * Project categories for the /projects filter.
 *
 * Dependency-free leaf module so the category nav and the page can import it
 * without pulling in any case-study bodies.
 */
export type ProjectCategory = "software" | "hardware" | "experiments";

export const PROJECT_CATEGORIES = [
  { id: "software", label: "Software & Platforms" },
  { id: "hardware", label: "Connected Devices & Hardware" },
  { id: "experiments", label: "Experiments" },
] as const satisfies readonly { id: ProjectCategory; label: string }[];

export const DEFAULT_PROJECT_CATEGORY: ProjectCategory = "software";

export function projectCategoryLabel(category: ProjectCategory): string {
  return PROJECT_CATEGORIES.find((c) => c.id === category)!.label;
}

/** Falls back to the default rather than 404-ing on an unknown `?view=`. */
export function parseProjectCategory(
  value: string | string[] | undefined
): ProjectCategory {
  const raw = Array.isArray(value) ? value[0] : value;
  return PROJECT_CATEGORIES.some((c) => c.id === raw)
    ? (raw as ProjectCategory)
    : DEFAULT_PROJECT_CATEGORY;
}
