import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/equipify/${filename}`;
}

export const EQUIPIFY_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "site-architecture",
    label: "Site Architecture",
    description:
      "The platform was structured around eight core sections — product categories, ordering and procurement, inventory management, supplier management, quality assurance, analytics, user accounts, and role-based permissions — with a post-login dashboard serving as the operational hub for daily tasks.",
    images: [
      {
        src: asset("equipify_site_map.png"),
        alt: "Equipify site map showing main sections and product categories.",
        width: 3840,
        height: 2160,
      },
    ],
  },
  {
    value: "ordering-procurement",
    label: "Ordering & Procurement",
    description:
      "The ordering and procurement flow covers bulk orders, price comparison across suppliers, order tracking, and procurement history — designed to replace slow, fragmented purchasing workflows with a single searchable catalog and transparent supplier options.",
    images: [
      {
        src: asset("equipify_user_stories_ordering.png"),
        alt: "Equipify user stories for ordering, procurement, and inventory management.",
        width: 3606,
        height: 1302,
      },
    ],
  },
  {
    value: "supplier-analytics",
    label: "Supplier & Analytics",
    description:
      "Supplier management, quality assurance, compliance, and analytics flows connect supplier ratings and performance data with compliance reports and supply chain analytics — giving operations leaders visibility into both vendor reliability and regulatory risk.",
    images: [
      {
        src: asset("equipify_user_stories_supplier.png"),
        alt: "Equipify user stories for supplier management, quality assurance, compliance, and analytics.",
        width: 3728,
        height: 1650,
      },
    ],
  },
];
