import type {
  FeatureRankRow,
  FeatureRankingBlock,
} from "@/data/coco-feature-ranking";

export type HeadlinesFeatureRankRow = FeatureRankRow;
export type HeadlinesFeaturePersonaBlock = FeatureRankingBlock;

/** Feature voting scores from structured exercises (rank = vote count, 10 = highest). */
export const HEADLINES_FEATURE_RANKING_DATA: readonly HeadlinesFeaturePersonaBlock[] =
  [
    {
      persona: "Casual Reader",
      features: [
        { name: "Headline-First Typography", rank: 10 },
        { name: "Auto-Rotation & Progress", rank: 9 },
        { name: "Read More Deep Link", rank: 8 },
        { name: "Description Summary", rank: 7 },
        { name: "Source Attribution", rank: 6 },
        { name: "Responsive Layout", rank: 5 },
        { name: "API-Powered Feed", rank: 4 },
        { name: "Embeddable Widget", rank: 3 },
        { name: "Category Filtering", rank: 2 },
        { name: "Custom Branding", rank: 1 },
      ],
    },
    {
      persona: "Executive Briefing",
      features: [
        { name: "Headline-First Typography", rank: 10 },
        { name: "Source Attribution", rank: 9 },
        { name: "Auto-Rotation & Progress", rank: 8 },
        { name: "Description Summary", rank: 7 },
        { name: "Category Filtering", rank: 6 },
        { name: "API-Powered Feed", rank: 5 },
        { name: "Read More Deep Link", rank: 4 },
        { name: "Embeddable Widget", rank: 3 },
        { name: "Responsive Layout", rank: 2 },
        { name: "Custom Branding", rank: 1 },
      ],
    },
    {
      persona: "Media Publisher",
      features: [
        { name: "Source Attribution", rank: 10 },
        { name: "Read More Deep Link", rank: 9 },
        { name: "Custom Branding", rank: 8 },
        { name: "Headline-First Typography", rank: 7 },
        { name: "Embeddable Widget", rank: 6 },
        { name: "API-Powered Feed", rank: 5 },
        { name: "Category Filtering", rank: 4 },
        { name: "Description Summary", rank: 3 },
        { name: "Auto-Rotation & Progress", rank: 2 },
        { name: "Responsive Layout", rank: 1 },
      ],
    },
    {
      persona: "Developer / Integrator",
      features: [
        { name: "API-Powered Feed", rank: 10 },
        { name: "Embeddable Widget", rank: 9 },
        { name: "Responsive Layout", rank: 8 },
        { name: "Auto-Rotation & Progress", rank: 7 },
        { name: "Category Filtering", rank: 6 },
        { name: "Custom Branding", rank: 5 },
        { name: "Source Attribution", rank: 4 },
        { name: "Headline-First Typography", rank: 3 },
        { name: "Read More Deep Link", rank: 2 },
        { name: "Description Summary", rank: 1 },
      ],
    },
  ];
