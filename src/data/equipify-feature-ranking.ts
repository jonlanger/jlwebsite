import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type EquipifyFeatureRankRow = FeatureRankRow;
export type EquipifyFeaturePersonaBlock = FeatureRankingBlock;

/** Feature voting scores from structured exercises (rank = vote count, 10 = highest). */
export const EQUIPIFY_FEATURE_RANKING_DATA: readonly EquipifyFeaturePersonaBlock[] =
  [
    {
      persona: "Procurement Manager",
      features: [
        { name: "Bulk Orders & Price Comparison", rank: 10 },
        { name: "Supplier Ratings & Performance", rank: 9 },
        { name: "Order Tracking", rank: 8 },
        { name: "Procurement History", rank: 7 },
        { name: "Real-Time Inventory Updates", rank: 6 },
        { name: "Compliance Reports", rank: 5 },
        { name: "Supply Chain Analytics", rank: 4 },
        { name: "Reorder Points & Alerts", rank: 3 },
        { name: "Quality Control Procedures", rank: 2 },
        { name: "Role-Based Access Control", rank: 1 },
      ],
    },
    {
      persona: "Inventory Manager",
      features: [
        { name: "Real-Time Inventory Updates", rank: 10 },
        { name: "Reorder Points & Alerts", rank: 9 },
        { name: "Inventory Analytics", rank: 8 },
        { name: "Quality Control Procedures", rank: 7 },
        { name: "Order Tracking", rank: 6 },
        { name: "Bulk Orders & Price Comparison", rank: 5 },
        { name: "Supplier Ratings & Performance", rank: 4 },
        { name: "Compliance Reports", rank: 3 },
        { name: "Procurement History", rank: 2 },
        { name: "Role-Based Access Control", rank: 1 },
      ],
    },
    {
      persona: "Operations Director",
      features: [
        { name: "Supply Chain Analytics", rank: 10 },
        { name: "Supplier Ratings & Performance", rank: 9 },
        { name: "Real-Time Inventory Updates", rank: 8 },
        { name: "Compliance Reports", rank: 7 },
        { name: "Bulk Orders & Price Comparison", rank: 6 },
        { name: "Order Tracking", rank: 5 },
        { name: "Inventory Analytics", rank: 4 },
        { name: "Reorder Points & Alerts", rank: 3 },
        { name: "Procurement History", rank: 2 },
        { name: "Role-Based Access Control", rank: 1 },
      ],
    },
    {
      persona: "Safety & Compliance Officer",
      features: [
        { name: "Compliance Reports", rank: 10 },
        { name: "Quality Control Procedures", rank: 9 },
        { name: "Safety Certifications", rank: 8 },
        { name: "Supplier Ratings & Performance", rank: 7 },
        { name: "Real-Time Inventory Updates", rank: 6 },
        { name: "Order Tracking", rank: 5 },
        { name: "Supply Chain Analytics", rank: 4 },
        { name: "Bulk Orders & Price Comparison", rank: 3 },
        { name: "Inventory Analytics", rank: 2 },
        { name: "Role-Based Access Control", rank: 1 },
      ],
    },
  ];
