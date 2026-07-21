import type { ProjectUserFlowTab } from "@/data/past-projects";

/** Public URL under `/projects/` for filenames that may contain spaces. */
function projectAsset(filename: string): string {
  return `/projects/${encodeURIComponent(filename)}`;
}

const IMG = { w: 1920, h: 1080 } as const;

export const COCO_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "customer",
    label: "Customer",
    description:
      "The customer experience centers on the pickup loop. Scheduling, tracking, and confirmation are the primary surfaces — everything else is secondary. Mobile-first with camera integration for trash documentation and a progressive request flow that guides users from location to confirmation in four steps.",
    images: [
      {
        src: projectAsset("Customer Splash Screens -  Hero .png"),
        alt: "Coco customer app: splash and hero screens.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Customer Sceens.png"),
        alt: "Coco customer app: scheduling and tracking screens.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Customer New Pick Up Request - Hero.png"),
        alt: "Coco customer app: new pickup request flow.",
        width: IMG.w,
        height: IMG.h,
      },
    ],
  },
  {
    value: "driver",
    label: "Driver",
    description:
      "Designed for the physical environment of the cab — a tablet-mounted cockpit experience that combines route navigation, pickup queue management, and collector coordination in a single glance-readable surface. Available across phone, tablet, and CarPlay.",
    images: [
      {
        src: projectAsset("Driver_Dashboard.png"),
        alt: "Coco driver: dashboard and primary cockpit surfaces.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Driver Route and List Screens -  Hero .png"),
        alt: "Coco driver: route and pickup list screens.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Driver Onboarding Screens -  Hero .png"),
        alt: "Coco driver: onboarding screens.",
        width: IMG.w,
        height: IMG.h,
      },
    ],
  },
  {
    value: "collector",
    label: "Collector",
    description:
      "Field-first design built around the confirmation moment — scanning, image capture, and compliance verification at the point of collection. Real-time communication with the driver and fleet manager without leaving the active pickup flow.",
    images: [
      {
        src: projectAsset("Collector Onboarding Screens -  Hero.png"),
        alt: "Coco collector: onboarding and compliance screens.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Collector Feature Screens -  Hero.png"),
        alt: "Coco collector: collection and confirmation screens.",
        width: IMG.w,
        height: IMG.h,
      },
    ],
  },
  {
    value: "fleet-manager",
    label: "Fleet Manager",
    description:
      "A command dashboard that surfaces risk, compliance, and fleet status at the top level. The collection overview map gives managers a live view of all active routes and territories. The fleet table provides a hierarchical view of the entire day's operation — schedule status, compliance flags, and pickup counts per truck, all in one exportable view.",
    images: [
      {
        src: projectAsset("Fleet Manager - Collection Overview Screens - Hero.png"),
        alt: "Coco fleet manager: collection overview map and territory view.",
        width: IMG.w,
        height: IMG.h,
      },
      {
        src: projectAsset("Fleet Manager - Fleet Overview Screens - Hero.png"),
        alt: "Coco fleet manager: fleet overview table and operations.",
        width: IMG.w,
        height: IMG.h,
      },
    ],
  },
];
