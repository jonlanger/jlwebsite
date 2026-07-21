import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/foodtrack/${filename}`;
}

export const FOODTRACK_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "live-prototype",
    label: "Live Prototype",
    description:
      "The interactive Foodtrack prototype — add items, auto-populate sample inventory, set qty alerts and weights, and generate category charts. Open the full experience below or use it as a working reference for kitchen inventory flows.",
    images: [],
    liveDemo: "foodtrack",
  },
  {
    value: "inventory-dashboard",
    label: "Inventory Dashboard",
    description:
      "The dashboard pairs a category quantity chart with individual item cards — each showing category, item name, quantity, date, qty alert, and weight. Color tags help staff scan status at a glance during service.",
    images: [
      {
        src: asset("foodtrack_prototype_inventory.png"),
        alt: "Foodtrack inventory dashboard with populated item cards and bar chart.",
        width: 3840,
        height: 2160,
      },
    ],
  },
  {
    value: "category-charts",
    label: "Category Charts",
    description:
      "Drill-down category charts let managers focus on a single group — such as Fruits — while keeping qty-alert thresholds visible against current quantity, supporting both daily prep decisions and weekly waste review.",
    images: [
      {
        src: asset("foodtrack_prototype_charts.png"),
        alt: "Foodtrack category and fruits quantity charts with alert thresholds.",
        width: 3840,
        height: 2160,
      },
    ],
  },
];
