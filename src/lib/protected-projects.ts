/** Showcase case studies that require a shared password to view. */
export const PROTECTED_PROJECT_SLUGS = new Set([
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
]);

export const PROJECT_UNLOCK_STORAGE_KEY = "jl-projects-unlocked";
export const PROJECT_UNLOCK_PASSWORD = "langer";

export function isProtectedProject(slug: string): boolean {
  return PROTECTED_PROJECT_SLUGS.has(slug);
}
