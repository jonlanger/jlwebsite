import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/headlines/${filename}`;
}

export const HEADLINES_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "headline-card",
    label: "Headline Card",
    description:
      "The core interaction model prioritizes the headline above all else — large responsive typography, source attribution, a brief description, and a single \"Read More\" action. The card is designed to communicate the essential story in seconds, not minutes.",
    images: [
      {
        src: asset("headlines_card_ui.png"),
        alt: "Headlines card UI with large headline typography, source, and read more action.",
        width: 2000,
        height: 1080,
      },
    ],
  },
  {
    value: "feed-rotation",
    label: "Feed Rotation",
    description:
      "Headlines auto-rotate on a timed cycle with a progress indicator — surfacing the next story without requiring user navigation. The loading bar provides a subtle cue for when content will change, keeping the experience passive and glanceable.",
    images: [
      {
        src: asset("headlines_banner.webp"),
        alt: "Headlines brand banner showing direct high-level messaging concept.",
        width: 1792,
        height: 1024,
      },
    ],
  },
];
