import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type StudioflowFeatureRankRow = FeatureRankRow;
export type StudioflowFeaturePersonaBlock = FeatureRankingBlock;

/** Feature voting scores from structured exercises (rank = vote count, 10 = highest). */
export const STUDIOFLOW_FEATURE_RANKING_DATA: readonly StudioflowFeaturePersonaBlock[] =
  [
    {
      persona: "Alex Thompson (Director)",
      features: [
        { name: "Review & Approval Systems", rank: 10 },
        { name: "Unified Dashboard", rank: 9 },
        { name: "Collaborative Workspace", rank: 8 },
        { name: "Real-Time Messaging", rank: 7 },
        { name: "Media Asset Management", rank: 6 },
        { name: "Task Management", rank: 5 },
        { name: "Analytics and Reporting", rank: 4 },
        { name: "Workflow Automation", rank: 3 },
        { name: "Budget Management", rank: 2 },
        { name: "Safety Management", rank: 1 },
      ],
    },
    {
      persona: "Jessica Martinez (Producer)",
      features: [
        { name: "Unified Dashboard", rank: 10 },
        { name: "Budget Management", rank: 9 },
        { name: "Workflow Automation", rank: 8 },
        { name: "Task Management", rank: 7 },
        { name: "Analytics and Reporting", rank: 6 },
        { name: "Review & Approval Systems", rank: 5 },
        { name: "Collaborative Workspace", rank: 4 },
        { name: "Media Asset Management", rank: 3 },
        { name: "Safety Management", rank: 2 },
        { name: "Real-Time Messaging", rank: 1 },
      ],
    },
    {
      persona: "Michael Green (Editor)",
      features: [
        { name: "Media Asset Management", rank: 10 },
        { name: "Review & Approval Systems", rank: 9 },
        { name: "Advanced Search & Version Control", rank: 8 },
        { name: "Task Management", rank: 7 },
        { name: "Unified Dashboard", rank: 6 },
        { name: "Collaborative Workspace", rank: 5 },
        { name: "Workflow Automation", rank: 4 },
        { name: "Analytics and Reporting", rank: 3 },
        { name: "Budget Management", rank: 2 },
        { name: "Safety Management", rank: 1 },
      ],
    },
    {
      persona: "Sarah Kim (VFX Supervisor)",
      features: [
        { name: "Media Asset Management", rank: 10 },
        { name: "Collaborative Workspace", rank: 9 },
        { name: "Workflow Automation", rank: 8 },
        { name: "Review & Approval Systems", rank: 7 },
        { name: "Task Management", rank: 6 },
        { name: "Unified Dashboard", rank: 5 },
        { name: "Analytics and Reporting", rank: 4 },
        { name: "Safety Management", rank: 3 },
        { name: "Budget Management", rank: 2 },
        { name: "Real-Time Messaging", rank: 1 },
      ],
    },
  ];
