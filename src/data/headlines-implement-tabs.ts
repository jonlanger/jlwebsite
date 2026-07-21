import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/headlines/${filename}`;
}

export const HEADLINES_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "live-demo",
    label: "Live Demo",
    description:
      "A working recreation of the original Headlines embed — live headlines from free public RSS feeds (BBC and The New York Times), auto-rotating every 10 seconds with a progress indicator, source attribution, and a Read More link out to the full article.",
    images: [],
    liveDemo: "headlines",
  },
  {
    value: "headline-display",
    label: "Headline Display",
    description:
      "The final headline card uses bold purple branding, high-contrast white typography, and a minimal layout — source label, headline, description, and a single call-to-action. The design is optimized for embeddable widgets, lobby displays, and dashboard integrations where space is limited but impact matters.",
    images: [
      {
        src: asset("headlines_card_ui.png"),
        alt: "Headlines headline display card with source, title, and read more button.",
        width: 2000,
        height: 1080,
      },
    ],
  },
  {
    value: "api-integration",
    label: "API Integration",
    description:
      "The original prototype used the Currents API. This recreation proxies free public RSS feeds through a Next.js route — fetching, deduplicating, and serving headlines as JSON so the widget stays API-key-free while preserving the same rotation and display behavior.",
    images: [
      {
        src: asset("headlines_codecard.png"),
        alt: "Headlines API integration code card showing Currents API fetch and rotation logic.",
        width: 2000,
        height: 1080,
      },
    ],
  },
];
