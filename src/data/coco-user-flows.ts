import type { ProjectUserFlowTab } from "@/data/past-projects";

export const COCO_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "customer",
    label: "Customer",
    description:
      "Onboarding collects only what's needed to start service — account, location, payment, and a first pickup scheduled. Everything else is captured progressively through the main experience. The main app centers entirely on the scheduling loop: request → confirm → track → complete. Every other feature is accessible but deliberately secondary to that core action.",
    images: [
      {
        src: "/projects/Coco_Customer_Detailed_Onboarding_Wireframe.png",
        alt: "Coco customer app: detailed onboarding flow wireframe.",
        width: 10728,
        height: 3288,
      },
      {
        src: "/projects/Coco_Customer_Detailed_Main_App_Wireframe.png",
        alt: "Coco customer app: detailed main app wireframe focused on the scheduling loop.",
        width: 8884,
        height: 5536,
      },
    ],
  },
  {
    value: "driver",
    label: "Driver",
    description:
      "Driver onboarding is compliance-heavy by necessity — vehicle information, certifications, work authorization, and background check consent are all required before first use. First shifts are paired with more experienced employees. The main app surfaces route navigation, dispatch communication, fuel management, and incident reporting as the four primary modes of a working day.",
    images: [
      {
        src: "/projects/Coco_Driver_Detailed_Onboarding_Wireframe.png",
        alt: "Coco driver app: detailed onboarding and compliance wireframe.",
        width: 12100,
        height: 4524,
      },
      {
        src: "/projects/Coco_Driver_Detailed_Main_App_Wireframe.png",
        alt: "Coco driver app: detailed main app wireframe with route, dispatch, fuel, and incidents.",
        width: 11700,
        height: 7968,
      },
    ],
  },
  {
    value: "collector",
    label: "Collector",
    description:
      "Collector onboarding mirrors the driver path but focuses on field-specific compliance — hazardous materials handling, equipment operation, and safety training confirmation. The main app centers on two things: knowing exactly what to collect and from where, and confirming it was done correctly. That confirmation step feeds directly into the fleet manager's compliance view.",
    images: [
      {
        src: "/projects/Coco_Collector_Detailed_Onboarding_Wireframe.png",
        alt: "Coco collector app: detailed field compliance onboarding wireframe.",
        width: 12100,
        height: 4544,
      },
      {
        src: "/projects/Coco_Collector_Detailed_MainApp_Wireframe.png",
        alt: "Coco collector app: detailed main app wireframe for collection and confirmation.",
        width: 10146,
        height: 6608,
      },
    ],
  },
  {
    value: "fleet-manager",
    label: "Fleet Manager",
    description:
      "Fleet manager onboarding is the most comprehensive of the four — it requires familiarity with all other roles, since managers are responsible for overseeing all of them. The main app is a command surface, not a task list. Staff scheduling, route optimization, compliance monitoring, fleet analytics, and budget management are all accessible from a single dashboard, with risk and deviation surfaced at the top level so managers can act without drilling into detail.",
    images: [
      {
        src: "/projects/Coco_FleetManager_Detailed_Onboarding_Wireframe.png",
        alt: "Coco fleet manager: detailed onboarding wireframe across roles and operations.",
        width: 10180,
        height: 4096,
      },
      {
        src: "/projects/Coco_FleetManager_Detailed_Main_App_Wireframe.png",
        alt: "Coco fleet manager: detailed dashboard wireframe with risk and operations.",
        width: 10984,
        height: 6512,
      },
    ],
  },
];
