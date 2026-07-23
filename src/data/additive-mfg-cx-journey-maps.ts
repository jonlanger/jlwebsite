import type { JourneyMapColumn } from "@/data/past-projects";

/** CX support journey: current vs future state across diagnosis phases. */
export const ADDITIVE_MFG_CX_JOURNEY_COLUMNS: readonly JourneyMapColumn[] = [
  {
    header: "Aspect",
    rows: ["Current state", "Future state"],
  },
  {
    header: "Contact support",
    rows: [
      "Customers reach support by email or phone and wait for a technician to pick up the thread.",
      "Partners and CX open Merlin with a device ID and land on live telemetry for that printer.",
    ],
  },
  {
    header: "Information gathering",
    rows: [
      "Agents request logs, photos, and serial details over email — often across multiple back-and-forths.",
      "Support instantly sees logs, device checks, consumables history, and the event timeline in one workspace.",
    ],
  },
  {
    header: "Initial diagnosis",
    rows: [
      "Troubleshooting relies on incomplete context; customers retry steps without knowing if they will work.",
      "Plot, Layer View, and Timeline give a precise remote read — customers feel the team can diagnose with confidence.",
    ],
  },
  {
    header: "Customer action",
    rows: [
      "Customers run manual checks from memory or scattered docs while the printer sits idle.",
      "Guided field troubleshooting and tagged events keep actions aligned to the live device state.",
    ],
  },
  {
    header: "Issue escalation",
    rows: [
      "Hard cases escalate slowly; partners lack a shared view for Markforged engineering.",
      "Escalations carry troubleshooting context and the exact panel state — less repeat discovery.",
    ],
  },
  {
    header: "Resolution & follow-up",
    rows: [
      "Resolution notes live in email threads; recreating the view later is difficult.",
      "Sharable links and stored visualizations keep the diagnosis replayable for R&D and CRM.",
    ],
  },
  {
    header: "Customer feedback",
    rows: [
      "Feedback is anecdotal; root causes rarely feed product learning.",
      "Timestamp tags and case history feed print-quality ML and continuous CX improvement.",
    ],
  },
];
