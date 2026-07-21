import type { JourneyMapColumn } from "@/data/past-projects";

/** Casual reader journey: Aspect column + six stages. */
export const HEADLINES_CASUAL_READER_JOURNEY_COLUMNS: readonly JourneyMapColumn[] =
  [
    {
      header: "Aspect",
      rows: ["Actions", "Thoughts & Feelings", "Pain Points", "Goals"],
    },
    {
      header: "Awareness",
      rows: [
        "Notices fragmented news intake. Wants a faster way to stay current without reading full articles.",
        "Overwhelmed by full articles. Curious about a simpler feed.",
        "Too many apps and feeds. No time for long-form reading.",
        "Find a lightweight way to scan top stories quickly.",
      ],
    },
    {
      header: "Encounter",
      rows: [
        "Sees the Headlines widget on a dashboard, lobby display, or embedded page.",
        "Interested. Hopes it is glanceable and not noisy.",
        "Widget may be ignored among other dashboard clutter.",
        "Understand what Headlines is and whether it is useful.",
      ],
    },
    {
      header: "Glance",
      rows: [
        "Reads the source label and large headline in under 3 seconds.",
        "Focused. Quickly oriented by bold typography.",
        "Headline too long or truncated. Hard to scan on small screens.",
        "Capture the story essence at a glance.",
      ],
    },
    {
      header: "Evaluate",
      rows: [
        "Skims the brief description. Judges relevance from headline and source alone.",
        "Confident when the source is clear. Uncertain if the headline is vague.",
        "Unclear source. Misleading or clickbait headlines.",
        "Trust the source and decide relevance fast.",
      ],
    },
    {
      header: "Decide",
      rows: [
        "Taps Read More for depth, or waits for auto-rotation to the next story.",
        "Satisfied when the story matches interest. Impatient if rotation is slow.",
        "Read More opens the wrong destination. Rotation interrupts mid-read.",
        "Open the full article only when needed. Otherwise move on.",
      ],
    },
    {
      header: "Continue",
      rows: [
        "Returns later and relies on timed rotation to stay passively informed.",
        "Relieved to stay informed with low effort. Trusts the feed.",
        "Stale or repetitive stories. No control over categories.",
        "Stay informed passively without changing habits.",
      ],
    },
  ];
