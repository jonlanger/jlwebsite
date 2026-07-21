export type FeatureRankRow = {
  name: string;
  rank: number;
};

export type FeatureRankingBlock = {
  persona: string;
  features: readonly FeatureRankRow[];
};

export type CocoFeatureRankRow = FeatureRankRow;

export type CocoFeaturePersonaBlock = FeatureRankingBlock;

export const COCO_FEATURE_RANKING_DATA: readonly CocoFeaturePersonaBlock[] = [
  {
    persona: "Customer",
    features: [
      { name: "Pickup Tracking and Notifications", rank: 10 },
      { name: "Trash Size and Weight Estimation", rank: 9 },
      { name: "Billing and Payments", rank: 8 },
      { name: "Recycling Tips and Guidelines", rank: 7 },
      { name: "Service Feedback", rank: 6 },
      { name: "Customized Notifications", rank: 5 },
      { name: "Community Engagement", rank: 4 },
    ],
  },
  {
    persona: "Collector",
    features: [
      { name: "Pickup Tracking and Notifications", rank: 10 },
      { name: "Route Optimization and Tracking", rank: 9 },
      { name: "Trash Size and Weight Estimation", rank: 8 },
      { name: "Equipment Management", rank: 7 },
      { name: "Performance Tracking", rank: 6 },
      { name: "Health and Safety", rank: 5 },
      { name: "Shift Management", rank: 4 },
      { name: "Incident Reporting", rank: 3 },
      { name: "Check Equipment Availability", rank: 2 },
    ],
  },
  {
    persona: "Driver",
    features: [
      { name: "Pickup Tracking and Notifications", rank: 10 },
      { name: "Navigation Assistance", rank: 9 },
      { name: "Trash Size and Weight Estimation", rank: 8 },
      { name: "Vehicle Maintenance and Logs", rank: 7 },
      { name: "Communication Tools", rank: 6 },
      { name: "Break and Rest Management", rank: 5 },
      { name: "Fuel Management", rank: 4 },
    ],
  },
  {
    persona: "Fleet Manager",
    features: [
      { name: "Fleet Maintenance Scheduling", rank: 10 },
      { name: "Compliance and Regulatory Management", rank: 9 },
      { name: "Route Planning and Optimization", rank: 8 },
      { name: "Driver Performance Monitoring", rank: 7 },
      { name: "Pickup Tracking and Notifications", rank: 6 },
      { name: "Fleet Analytics and Reporting", rank: 5 },
      { name: "Inventory Management", rank: 4 },
      { name: "Budget and Financial Management", rank: 3 },
      { name: "Training and Certification Management", rank: 2 },
      { name: "Policy and Compliance Management", rank: 1 },
    ],
  },
];
