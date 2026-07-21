import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/aureum/${filename}`;
}

export const AUREUM_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "onboarding",
    label: "Onboarding",
    description:
      "The onboarding flow guides users from account setup through financial planning, expense tracking setup, and initial goal configuration. AI assists with data input, privacy assurances, and goal prioritization — reducing the friction that typically causes abandonment in finance apps during the first session.",
    images: [
      {
        src: asset("aureum_product_discovery_map.png"),
        alt: "Aureum product discovery map from problem awareness through community engagement.",
        width: 3840,
        height: 2160,
      },
      {
        src: asset("aureum_system_onboarding_flow.png"),
        alt: "Aureum system onboarding UX flow from account setup through continued use.",
        width: 2522,
        height: 1590,
      },
    ],
  },
  {
    value: "core-experience",
    label: "Core Experience",
    description:
      "The core experience maps the full daily loop — expense tracking, savings management, investment monitoring, debt repayment, financial education, and community interaction — with AI nudges at each stage to correct errors, surface insights, and keep users on track toward their goals.",
    images: [
      {
        src: asset("aureum_high_level_ux_flow.png"),
        alt: "Aureum high-level UX flow across financial planning, tracking, and community features.",
        width: 3840,
        height: 2160,
      },
    ],
  },
];
