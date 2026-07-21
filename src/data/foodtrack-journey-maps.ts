import type { JourneyMapColumn } from "@/data/past-projects";

/** Kitchen manager journey: Aspect column + six stages. */
export const FOODTRACK_KITCHEN_MANAGER_JOURNEY_COLUMNS: readonly JourneyMapColumn[] =
  [
    {
      header: "Aspect",
      rows: ["Actions", "Thoughts & Feelings", "Pain Points", "Goals"],
    },
    {
      header: "Open",
      rows: [
        "Checks overnight deliveries, walk-in stock, and prep lists before service.",
        "Focused. Wants a clear picture of what is short before the rush.",
        "Paper counts are outdated. Last night's usage is unclear.",
        "Know exact stock levels and priorities before doors open.",
      ],
    },
    {
      header: "Prep",
      rows: [
        "Assigns prep tasks, confirms portion standards, and stages hotel pans.",
        "Confident when recipes and quantities are clear. Anxious when stock is uncertain.",
        "Missing ingredients mid-prep. Inconsistent portioning across shifts.",
        "Get prep done once, correctly, without mid-shift surprises.",
      ],
    },
    {
      header: "Service",
      rows: [
        "Monitors usage as tickets come in; swaps items when stock runs low.",
        "Stressed during peak. Needs fast answers, not spreadsheets.",
        "No live visibility. Discovers stockouts only when a dish 86s.",
        "Keep the menu available and the line moving.",
      ],
    },
    {
      header: "Reorder",
      rows: [
        "Reviews low-stock alerts, forecasts demand, and places supplier orders.",
        "Relieved when alerts are accurate. Frustrated by false positives.",
        "Guesswork on order quantities. Over-orders lead to waste.",
        "Order the right amount at the right time.",
      ],
    },
    {
      header: "Close",
      rows: [
        "Reconciles inventory, logs waste, and updates tomorrow's prep plan.",
        "Tired but wants accurate records for the next shift.",
        "Manual closeout takes too long. Waste goes untracked.",
        "Leave a clean, accurate handoff for the morning team.",
      ],
    },
    {
      header: "Improve",
      rows: [
        "Reviews category analytics, waste patterns, and recipe cost trends weekly.",
        "Curious about patterns. Motivated when savings are visible.",
        "Data is fragmented across POS, invoices, and notebooks.",
        "Reduce waste and cost without hurting food quality.",
      ],
    },
  ];
