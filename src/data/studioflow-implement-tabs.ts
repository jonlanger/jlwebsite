import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/studioflow/${filename}`;
}

export const STUDIOFLOW_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "dashboard-collaboration",
    label: "Dashboard & Collaboration",
    description:
      "The unified dashboard provides a comprehensive view of all ongoing projects — recent activity, progress tracking, and alerts — while collaborative workspaces enable real-time messaging, shared review sessions, and approval workflows across distributed production teams.",
    images: [
      {
        src: asset("studioflow_unified_dashboard.png"),
        alt: "Studioflow unified dashboard with project overview and activity feed.",
        width: 2272,
        height: 2626,
      },
      {
        src: asset("studioflow_collaborative_workspace.png"),
        alt: "Studioflow collaborative workspace with team messaging and review tools.",
        width: 2998,
        height: 8068,
      },
    ],
  },
  {
    value: "production-assets",
    label: "Production & Assets",
    description:
      "Media asset management and task management work together — giving editors and VFX teams advanced search, version control, and tagging for digital assets while producers track milestones, assign tasks, and monitor deliverables across the production timeline.",
    images: [
      {
        src: asset("studioflow_media_asset_management.png"),
        alt: "Studioflow media asset management with search, tagging, and version control.",
        width: 2278,
        height: 2104,
      },
      {
        src: asset("studioflow_task_management.png"),
        alt: "Studioflow task management with milestones and assignment tracking.",
        width: 3366,
        height: 7924,
      },
    ],
  },
  {
    value: "operations",
    label: "Budget, Analytics & Safety",
    description:
      "Budget management, analytics and reporting, and safety management complete the operational layer — giving producers cost visibility and schedule integration, studio leadership performance insights, and compliance teams safety certification tracking across every production.",
    images: [
      {
        src: asset("studioflow_budget_management.png"),
        alt: "Studioflow budget management with cost tracking and schedule integration.",
        width: 3366,
        height: 3812,
      },
      {
        src: asset("studioflow_analytics_reporting.png"),
        alt: "Studioflow analytics and reporting dashboard.",
        width: 3366,
        height: 2128,
      },
      {
        src: asset("studioflow_safety_management.png"),
        alt: "Studioflow safety management with compliance and certification tracking.",
        width: 3366,
        height: 2128,
      },
    ],
  },
];
