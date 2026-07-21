import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type FoodtrackFeatureRankRow = FeatureRankRow;
export type FoodtrackFeaturePersonaBlock = FeatureRankingBlock;

/** Feature voting scores from structured exercises (rank = vote count, 10 = highest). */
export const FOODTRACK_FEATURE_RANKING_DATA: readonly FoodtrackFeaturePersonaBlock[] =
  [
    {
      persona: "Kitchen Manager",
      features: [
        { name: "Real-Time Inventory Tracking", rank: 10 },
        { name: "Low-Stock Alerts", rank: 9 },
        { name: "Demand Prediction", rank: 8 },
        { name: "Automated Reordering", rank: 7 },
        { name: "Supplier Coordination", rank: 6 },
        { name: "Waste Monitoring", rank: 5 },
        { name: "Recipe Cost Simulation", rank: 4 },
        { name: "Category Analytics", rank: 3 },
        { name: "Portion Standards", rank: 2 },
        { name: "Dark Mode / Display Flexibility", rank: 1 },
      ],
    },
    {
      persona: "Line Cook",
      features: [
        { name: "Low-Stock Alerts", rank: 10 },
        { name: "Portion Standards", rank: 9 },
        { name: "Real-Time Inventory Tracking", rank: 8 },
        { name: "Digital Recipe Access", rank: 7 },
        { name: "Waste Monitoring", rank: 6 },
        { name: "Quick Item Entry", rank: 5 },
        { name: "Category Analytics", rank: 4 },
        { name: "Demand Prediction", rank: 3 },
        { name: "Automated Reordering", rank: 2 },
        { name: "Supplier Coordination", rank: 1 },
      ],
    },
    {
      persona: "Head Chef",
      features: [
        { name: "Recipe Cost Simulation", rank: 10 },
        { name: "Portion Standards", rank: 9 },
        { name: "Digital Recipe Access", rank: 8 },
        { name: "Waste Monitoring", rank: 7 },
        { name: "Real-Time Inventory Tracking", rank: 6 },
        { name: "New Recipe Trial Tracking", rank: 5 },
        { name: "Demand Prediction", rank: 4 },
        { name: "Low-Stock Alerts", rank: 3 },
        { name: "Category Analytics", rank: 2 },
        { name: "Automated Reordering", rank: 1 },
      ],
    },
    {
      persona: "Restaurant Owner",
      features: [
        { name: "Waste Monitoring", rank: 10 },
        { name: "Demand Prediction", rank: 9 },
        { name: "Category Analytics", rank: 8 },
        { name: "Automated Reordering", rank: 7 },
        { name: "Recipe Cost Simulation", rank: 6 },
        { name: "Real-Time Inventory Tracking", rank: 5 },
        { name: "Supplier Coordination", rank: 4 },
        { name: "Low-Stock Alerts", rank: 3 },
        { name: "Portion Standards", rank: 2 },
        { name: "Digital Recipe Access", rank: 1 },
      ],
    },
  ];
