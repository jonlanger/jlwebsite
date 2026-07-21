import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type PetricorFeatureRankRow = FeatureRankRow;
export type PetricorFeaturePersonaBlock = FeatureRankingBlock;

/** Lab technician priorities from structured ranking (rank 10 = highest). */
export const PETRICOR_FEATURE_RANKING_DATA: readonly PetricorFeaturePersonaBlock[] =
  [
    {
      persona: "Lab Technician",
      features: [
        { name: "Sample Preparation", rank: 10 },
        { name: "Incubation Monitoring", rank: 9 },
        { name: "Data Analysis", rank: 8 },
        { name: "Imaging", rank: 7 },
        { name: "Reporting", rank: 6 },
        { name: "Calibration of Equipment", rank: 5 },
        { name: "System Maintenance", rank: 4 },
        { name: "Training and Skill Development", rank: 3 },
      ],
    },
  ];
