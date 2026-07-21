import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/studioflow/${filename}`;
}

export const STUDIOFLOW_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "site-architecture",
    label: "Site Architecture",
    description:
      "The platform information architecture was mapped across production phases — from pre-production planning through post-production delivery — with a unified dashboard serving as the hub connecting media asset management, collaboration, task tracking, budget oversight, analytics, and safety compliance.",
    images: [
      {
        src: asset("studioflow_site_map.png"),
        alt: "Studioflow site map showing production management sections and tool hierarchy.",
        width: 7489,
        height: 4392,
      },
    ],
  },
  {
    value: "ux-hierarchy",
    label: "UX Hierarchy",
    description:
      "The UX hierarchy prioritizes essential functions and streamlines workflows — placing the unified dashboard, media asset management, and collaborative workspace at the top of the interaction model, with task management, budget tools, analytics, and safety management supporting daily operations.",
    images: [
      {
        src: asset("studioflow_high_level_ux.png"),
        alt: "Studioflow high-level UX hierarchy across core production management tools.",
        width: 20185,
        height: 16066,
      },
    ],
  },
];
