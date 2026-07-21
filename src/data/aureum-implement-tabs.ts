import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/aureum/${filename}`;
}

export const AUREUM_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "onboarding",
    label: "Onboarding",
    description:
      "Onboarding is designed to be seamless and personalized — collecting financial context through a guided survey, connecting accounts, and delivering an first AI-generated plan before the user reaches the main dashboard. The goal is confidence in the first session, not completeness.",
    images: [
      {
        src: asset("aureum_onboarding_screens.png"),
        alt: "Aureum onboarding screens: account setup and financial profile.",
        width: 4299,
        height: 2388,
      },
    ],
  },
  {
    value: "dashboard",
    label: "Dashboard",
    description:
      "The account summary dashboard provides a comprehensive, intuitive overview of financial health — balances, health scores, recent transactions, and budget summaries in a single glance-readable surface designed to answer 'how am I doing?' before the user navigates anywhere else.",
    images: [
      {
        src: asset("aureum_summary_dashboard.png"),
        alt: "Aureum account summary dashboard with balances, health scores, and transactions.",
        width: 4299,
        height: 2388,
      },
    ],
  },
  {
    value: "budgeting",
    label: "Budgeting",
    description:
      "Budgeting features give users full control with minimal effort — automated expense tracking, real-time budget updates, and income/expense summaries that adapt as spending patterns change throughout the month.",
    images: [
      {
        src: asset("aureum_budgeting.png"),
        alt: "Aureum budgeting screens with expense tracking and real-time updates.",
        width: 4299,
        height: 2388,
      },
    ],
  },
  {
    value: "goals-insights",
    label: "Goals & Insights",
    description:
      "Goals and insights work together — users set financial aspirations with personalized savings plans and progress tracking, while AI-driven tips and spending pattern breakdowns surface actionable advice without requiring users to interpret raw data themselves.",
    images: [
      {
        src: asset("aureum_goals.png"),
        alt: "Aureum goals screens with progress tracking and savings plans.",
        width: 4299,
        height: 2388,
      },
      {
        src: asset("aureum_insights.png"),
        alt: "Aureum insights screens with personalized tips and spending breakdowns.",
        width: 4299,
        height: 2388,
      },
    ],
  },
];
