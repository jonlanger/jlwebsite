import type { JourneyMapColumn } from "@/data/past-projects";

/** Customer journey from purchase through print platform use and assessment (deck slide 132). */
export const ADDITIVE_MFG_PRINT_CUSTOMER_JOURNEY_COLUMNS: readonly JourneyMapColumn[] =
  [
    {
      header: "Aspect",
      rows: ["Stage focus", "Key moments"],
    },
    {
      header: "Buying",
      rows: [
        "Awareness through approval and purchase.",
        "OEM research, consideration, validation, negotiation, consultative close.",
      ],
    },
    {
      header: "Deployment",
      rows: [
        "Onboarding hardware and software for strategic programs.",
        "Evaluation, program workflow, standard operating procedures.",
      ],
    },
    {
      header: "Education",
      rows: [
        "Eiger and Markforged product fluency.",
        "DFAM education, product training, enterprise additive collaboration.",
      ],
    },
    {
      header: "Pre-print",
      rows: [
        "Library, permissions, and part configuration.",
        "Folders, uploads, part settings, builds, and maintenance routines.",
      ],
    },
    {
      header: "Print platform",
      rows: [
        "Prep, print, monitor, and consumables on the fleet.",
        "Print prep, monitoring, post-print, permissions, and material handling.",
      ],
    },
    {
      header: "Post-print",
      rows: [
        "Service, analytics, and reporting after the job.",
        "Maintenance, optimization insights, and shareable reports.",
      ],
    },
    {
      header: "Assessment",
      rows: [
        "Prove value and expand the fleet.",
        "Additive assessment that feeds expansion decisions.",
      ],
    },
  ];
