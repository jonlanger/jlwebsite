import type { JourneyMapColumn } from "@/data/past-projects";

const ASPECTS: JourneyMapColumn = {
  header: "Aspect",
  rows: ["Doing", "Thinking", "Feeling", "Pain points", "Opportunities"],
};

export const TELEOP_OPERATOR_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Start shift",
    rows: [
      "Clocks in at ST-01 and pairs the Wheel",
      "“Which vehicles are mine today?”",
      "Settled",
      "Assignments live in a spreadsheet; the station doesn’t know who is sitting at it",
      "My shift and Mine · All in the fleet list; the halo lights when the Wheel pairs",
    ],
  },
  {
    header: "Watch",
    rows: [
      "Keeps an eye on six vehicles driving themselves",
      "“Is anything about to need me?”",
      "Calm, but watchful",
      "Alert noise; every warning looks as urgent as the next",
      "Critical alerts stay until acknowledged; the rest fade after 10 s",
    ],
  },
  {
    header: "Help request",
    rows: [
      "UNIT-14 stops behind a double-parked truck and asks",
      "“What does it see, and what does it want from me?”",
      "Alert",
      "A camera feed with no context; no idea why autonomy stopped",
      "Perception overlay: brackets, labels, distance and the predicted path",
    ],
  },
  {
    header: "Guide or claim",
    rows: [
      "Nudges the path left and approves it, or claims and drives",
      "“Do I really need to take the wheel for this?”",
      "Focused",
      "Takeover is all or nothing, and slow to hand back",
      "Hold to brake, Nudge left / right and Approve path without claiming",
    ],
  },
  {
    header: "Hand back",
    rows: [
      "Holds Release for 1.2 s",
      "“Did it actually take it back?”",
      "Relieved",
      "Pressing a button isn’t the same as the vehicle doing it",
      "Readback under every control; the halo turns mint only when the vehicle confirms",
    ],
  },
  {
    header: "Report",
    rows: [
      "Presses Log and clocks out",
      "“Someone should look at that corner.”",
      "Tired",
      "Incidents are retold from memory at the end of the shift",
      "Log saves a snapshot that becomes a ticket with the vehicle’s timeline",
    ],
  },
];

export const TELEOP_FLEET_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Plan the week",
    rows: [
      "Builds next week’s shifts",
      "“Are we covered at 6 a.m. and on weekends?”",
      "Methodical",
      "Coverage is only visible once someone is missing",
      "Hourly coverage against a 1:5 target, with hours below target flagged",
    ],
  },
  {
    header: "Assign",
    rows: [
      "Gives each operator on shift their vehicles",
      "“Who has room for one more?”",
      "Busy",
      "Load per person isn’t visible next to the vehicles",
      "Load by operator above the fleet table; assignee pickers inline",
    ],
  },
  {
    header: "Monitor",
    rows: [
      "Watches KPIs and the live city map",
      "“Where do I look first?”",
      "Stretched",
      "Ten vehicles, four teams, no shared picture",
      "Needs attention: assists waiting, vehicles held, what Support has asked of fleet",
    ],
  },
  {
    header: "Surge",
    rows: [
      "Signals go dark; requests arrive eight at a time",
      "“Do we have enough people right now?”",
      "Under pressure",
      "Every request holds one operator for its whole duration",
      "Guidance instead of takeover keeps more vehicles per person",
    ],
  },
  {
    header: "Act",
    rows: [
      "Takes a vehicle out of service",
      "“Who else needs to know?”",
      "Decisive",
      "Support and engineering hear about it later",
      "Service status and linked tickets visible to every workspace",
    ],
  },
];

export const TELEOP_ENGINEER_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Fault",
    rows: [
      "Sees B1A20 wiper motor overcurrent on UNIT-07",
      "“Is it the motor or the command?”",
      "Curious",
      "Faults arrive without the commands that led to them",
      "Maintenance lists component health, active faults and open work orders",
    ],
  },
  {
    header: "Investigate",
    rows: [
      "Reads telemetry, logs and the command audit",
      "“What did the vehicle actually do?”",
      "Absorbed",
      "Logs and commands live in different tools and clocks",
      "One timeline: sent, received, confirmed, rejected, failed, timed out",
    ],
  },
  {
    header: "Diagnose",
    rows: [
      "Runs a self-test and restarts the subsystem",
      "“Can I prove it from here?”",
      "Careful",
      "Remote actions can collide with an operator driving",
      "Engineering-only commands, enforced by the same server policy",
    ],
  },
  {
    header: "Fix",
    rows: [
      "Opens a work order linked to the support ticket",
      "“Who’s waiting on me?”",
      "Accountable",
      "Nobody tells support when the fix is done",
      "Finishing the work order hands the ticket back automatically",
    ],
  },
  {
    header: "Stations",
    rows: [
      "Checks Wheel firmware across the room",
      "“Is desk 3 on the old build?”",
      "Routine",
      "Hardware in the room is invisible to the vehicle tools",
      "Stations and wheels: firmware, halo state, last seen, USB contract",
    ],
  },
];

export const TELEOP_SUPPORT_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Intake",
    rows: [
      "A rider calls: the shuttle braked hard near Civic Park",
      "“Which vehicle, and when?”",
      "Attentive",
      "Riders don’t know vehicle IDs; staff reports come by chat",
      "Log a rider contact; every ticket records its source and category",
    ],
  },
  {
    header: "Triage",
    rows: [
      "Sorts the queue",
      "“What’s due first?”",
      "Pressed",
      "Everything looks urgent; deadlines are implicit",
      "Queue sorted by next deadline: first reply, then resolution, by priority",
    ],
  },
  {
    header: "Investigate",
    rows: [
      "Opens what the vehicle did",
      "“Did it really brake hard, and why?”",
      "Skeptical",
      "Has to ask engineering for basic facts",
      "Events and commands from 20 min before to 5 min after, plus live state",
    ],
  },
  {
    header: "Escalate",
    rows: [
      "Asks fleet and sends it to engineering",
      "“Who owns this now?”",
      "Waiting",
      "Tickets disappear into other teams’ queues",
      "Waiting on engineering or fleet views; the ticket returns when they hand it back",
    ],
  },
  {
    header: "Resolve",
    rows: [
      "Replies to the rider and closes it",
      "“Will we see this again?”",
      "Satisfied",
      "Resolutions leave no data behind",
      "Outcome code and summary on every ticket; Insights by source and category",
    ],
  },
];
