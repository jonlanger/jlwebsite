export type ResearchMetricCard = {
  value: string;
  label: string;
  detail: string;
};

export type ResearchSegment = {
  label: string;
  percent: number;
  /** Tailwind background class for the segment fill. */
  fillClass: string;
};

export type ResearchInsightsData = {
  title: string;
  metrics: readonly ResearchMetricCard[];
  readingDepth: {
    title: string;
    segments: readonly ResearchSegment[];
  };
  attentionTimeline: {
    title: string;
    points: readonly { year: string; seconds: number }[];
  };
  sources: string;
};

/** Published research on news attention and information retention (Headlines). */
export const HEADLINES_RESEARCH_INSIGHTS: ResearchInsightsData = {
  title: "Attention & Retention Insights",
  metrics: [
    {
      value: "47s",
      label: "Digital attention span",
      detail:
        "Average continuous focus on a screen in 2024 — down from 150 seconds in 2004 (Gloria Mark, UC Irvine).",
    },
    {
      value: "22%",
      label: "Headline-only readers",
      detail:
        "Of people who open an online news story, about 22% look at only the headline or a few lines (Reuters Institute).",
    },
    {
      value: "51%",
      label: "Finish the full article",
      detail:
        "Just over half of those who click through actually read the entire piece; 26% stop partway (Reuters Institute).",
    },
    {
      value: "78%",
      label: "First fixations on text",
      detail:
        "Of users’ first three eye fixations on a news page, 78% land on headlines, summaries, or captions — not images (Poynter / NN/g).",
    },
  ],
  readingDepth: {
    title: "How far people get into an online news story",
    segments: [
      {
        label: "Full article",
        percent: 51,
        fillClass: "bg-stone-700",
      },
      {
        label: "Partial",
        percent: 26,
        fillClass: "bg-stone-400",
      },
      {
        label: "Headline / few lines",
        percent: 22,
        fillClass: "bg-stone-200",
      },
    ],
  },
  attentionTimeline: {
    title: "Average on-screen attention span (seconds)",
    points: [
      { year: "2004", seconds: 150 },
      { year: "2012", seconds: 75 },
      { year: "2024", seconds: 47 },
    ],
  },
  sources:
    "Sources: Gloria Mark, Attention Span (2023/2024); Reuters Institute Digital News Report; Poynter Institute / Nielsen Norman Group eyetracking studies. Figures rounded; some studies report remaining share as “other.”",
};
