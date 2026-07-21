import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type AureumFeatureRankRow = FeatureRankRow;
export type AureumFeaturePersonaBlock = FeatureRankingBlock;

/** Feature voting scores from structured exercises (rank = vote count, 10 = highest). */
export const AUREUM_FEATURE_RANKING_DATA: readonly AureumFeaturePersonaBlock[] =
  [
    {
      persona: "Emily Johnson",
      features: [
        { name: "AI-driven Financial Planning", rank: 10 },
        { name: "Real-time Expense Tracking", rank: 9 },
        { name: "Financial Health Dashboard", rank: 8 },
        { name: "Predictive Analytics for Financial Issues", rank: 7 },
        { name: "Savings Management", rank: 6 },
        { name: "Personalized Budgeting", rank: 5 },
        { name: "Investment Recommendations", rank: 4 },
        { name: "Debt Management", rank: 3 },
        { name: "Automated Reporting", rank: 2 },
        { name: "Financial Education Modules", rank: 1 },
      ],
    },
    {
      persona: "Michael Chen",
      features: [
        { name: "Financial Health Dashboard", rank: 10 },
        { name: "Real-time Expense Tracking", rank: 9 },
        { name: "AI-driven Financial Planning", rank: 8 },
        { name: "Predictive Analytics for Financial Issues", rank: 7 },
        { name: "Savings Management", rank: 6 },
        { name: "Investment Recommendations", rank: 5 },
        { name: "Personalized Budgeting", rank: 4 },
        { name: "Debt Management", rank: 3 },
        { name: "Automated Reporting", rank: 2 },
        { name: "Financial Education Modules", rank: 1 },
      ],
    },
    {
      persona: "Sarah Martinez",
      features: [
        { name: "AI-driven Financial Planning", rank: 10 },
        { name: "Financial Health Dashboard", rank: 9 },
        { name: "Real-time Expense Tracking", rank: 8 },
        { name: "Predictive Analytics for Financial Issues", rank: 7 },
        { name: "Personalized Budgeting", rank: 5 },
        { name: "Savings Management", rank: 6 },
        { name: "Investment Recommendations", rank: 4 },
        { name: "Debt Management", rank: 3 },
        { name: "Automated Reporting", rank: 2 },
        { name: "Financial Education Modules", rank: 1 },
      ],
    },
    {
      persona: "David Lee",
      features: [
        { name: "Real-time Expense Tracking", rank: 10 },
        { name: "AI-driven Financial Planning", rank: 9 },
        { name: "Predictive Analytics for Financial Issues", rank: 8 },
        { name: "Financial Health Dashboard", rank: 7 },
        { name: "Personalized Budgeting", rank: 5 },
        { name: "Savings Management", rank: 6 },
        { name: "Investment Recommendations", rank: 4 },
        { name: "Debt Management", rank: 3 },
        { name: "Automated Reporting", rank: 2 },
        { name: "Financial Education Modules", rank: 1 },
      ],
    },
    {
      persona: "Lisa Robinson",
      features: [
        { name: "Predictive Analytics for Financial Issues", rank: 10 },
        { name: "AI-driven Financial Planning", rank: 9 },
        { name: "Real-time Expense Tracking", rank: 8 },
        { name: "Financial Health Dashboard", rank: 7 },
        { name: "Personalized Budgeting", rank: 5 },
        { name: "Savings Management", rank: 6 },
        { name: "Investment Recommendations", rank: 4 },
        { name: "Debt Management", rank: 3 },
        { name: "Automated Reporting", rank: 2 },
        { name: "Financial Education Modules", rank: 1 },
      ],
    },
  ];
