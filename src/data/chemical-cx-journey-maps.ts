import type { JourneyMapColumn } from "@/data/past-projects";

/** Simplified CX support journey from Dow research (Activities → Opportunities). */
export const CHEMICAL_CX_SUPPORT_JOURNEY_COLUMNS: readonly JourneyMapColumn[] = [
  {
    header: "Aspect",
    rows: ["Activities", "Touchpoints", "Pain points", "Opportunities"],
  },
  {
    header: "Customer submits issue",
    rows: [
      "Contacts support by phone, email, or chat.",
      "Phone, email, live chat.",
      "Disparate support systems; unclear where to start.",
      "Unified intake into one CRM / CX workspace.",
    ],
  },
  {
    header: "Agent logs issue",
    rows: [
      "Enters issue details into the ticketing system.",
      "CRM, support ticketing.",
      "Slow response; duplicate entry across tools.",
      "Integrated channels that open a case once.",
    ],
  },
  {
    header: "Reviews customer history",
    rows: [
      "Checks prior issues, orders, and interactions.",
      "CRM, historical account data.",
      "Inconsistent or incomplete information across systems.",
      "Single customer record with order and product context.",
    ],
  },
  {
    header: "Diagnoses issue",
    rows: [
      "Investigates with internal tools and knowledge base.",
      "CRM, knowledge base, product data.",
      "No real-time status on orders, inventory, or tickets.",
      "Automated context and live order / inventory signals.",
    ],
  },
  {
    header: "Resolves or escalates",
    rows: [
      "Closes the issue or escalates to a higher tier.",
      "Phone, email, CRM.",
      "Weak escalation paths; lost ownership.",
      "Clear escalation rules plus training / knowledge base.",
    ],
  },
  {
    header: "Customer gets updates",
    rows: [
      "Receives progress via email or self-service portal.",
      "Email, self-service portal.",
      "No real-time updates; silence between contacts.",
      "Proactive status and self-service visibility.",
    ],
  },
  {
    header: "Agent follows up",
    rows: [
      "Confirms resolution or offers further help.",
      "Phone, email, CRM.",
      "Follow-through fails when systems are fragmented.",
      "Real-time analytics and closed-loop tasks.",
    ],
  },
];
