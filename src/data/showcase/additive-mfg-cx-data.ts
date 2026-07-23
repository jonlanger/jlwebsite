import { ADDITIVE_MFG_CX_JOURNEY_COLUMNS } from "@/data/additive-mfg-cx-journey-maps";
import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "additive-mfg-cx-data-platform",
  title: "Additive Mfg & CX Data Platform",
  description:
    "Telemetry and CX data visualization for Markforged fleets — faster diagnosis, R&D, and partner troubleshooting.",
  image: "/projects/additive-mfg-cx-data/additive-mfg-cx-data_card.png",
  alt: "Device telemetry visualization with sensor plots for additive manufacturing printers.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Markforged builds a connected ecosystem of software, materials, and hardware. Data visualization is critical for engineers and Customer Experience teams creating new products and keeping machines running in demanding manufacturing contexts.",
      "We co-created Merlin — a data visualization tool — with enterprise customers, developers, partners, print technicians, CX specialists, product managers, and business information specialists. The goal: faster product and material development, and higher machine uptime in the field.",
    ],
    role: "UX Research, Product Design, Design System UI, Development Oversight",
    scope:
      "Enterprise telemetry & CX web platform — modular panels, field guides, escalations",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Internal and partner engineering/CX teams need remote monitoring across a connected print fleet. Newer printers stream status, temperature, force loads, resonance, video, and images — previously explored with d3.js, Plotly, and an engineer-built internal tool before the UX redesign.",
        "The opportunity was a modular panel architecture on the Eiger React design system — so every case can load the right Plot, Layer View, Timeline, and supporting panels without rebuilding the stack.",
      ],
      topicGroups: [
        {
          title: "Why telemetry matters",
          items: [
            {
              title: "Remote fleet visibility",
              body: "CX and partners diagnose printers worldwide without waiting on email log dumps.",
            },
            {
              title: "Richer machine signals",
              body: "Status, temperature, forces, resonance, video, and images stream from modern FX printers.",
            },
            {
              title: "Shared diagnosis",
              body: "Visualizations build trust between partner CX and Markforged engineering on hard cases.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Legacy engineer tools",
              body: "Internal d3.js / Plotly prototypes proved the data — but were not CX-ready.",
            },
            {
              title: "Modular panels",
              body: "MVP: Sensor/Telemetry and Print Layer View first — then expand panel-by-panel.",
            },
            {
              title: "Tagging for learning",
              body: "Timestamp tags feed future models for print quality, QA, and CX playbooks.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "15k",
          label: "Devices worldwide",
          detail: "93% connected to the Eiger Cloud Platform.",
        },
        {
          value: "20.8k",
          label: "Platform users",
          detail: "Mostly manufacturing, plant, and production managers.",
        },
        {
          value: "100+",
          label: "Enterprise fleets",
          detail: "Fleets larger than 14 devices — print farms at scale.",
        },
        {
          value: "300+",
          label: "CX specialists",
          detail: "Internal and partner technicians, remote and on-site.",
        },
      ],
    },
    {
      title: "CX Journey",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Mapping CX from first contact through feedback showed the cost of fragmented diagnosis — and where Merlin could replace slow email/phone loops with live device context.",
        },
        {
          type: "journeyTable",
          tableAriaLabel:
            "CX experience journey comparing current and future states across support phases",
          columns: ADDITIVE_MFG_CX_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "The future state centers on instant logs and telemetry, guided field actions, escalations that carry context, and sharable views that stick around for R&D — not another lost email thread.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "A pilot with 30 key partners plus ongoing feedback shaped Merlin. Fleet scale framed the audience: tens of thousands of users, hundreds of CX specialists, and ~10–15 cases per day across complexity levels.",
        "Workshops with CX, partners, and engineering synthesized themes and prioritized features with product and leadership before build — then kept every user type in the loop as the platform grew.",
      ],
      topicGroups: [
        {
          title: "What research prioritized",
          items: [
            {
              title: "Sensor & telemetry first",
              body: "100+ sensors per printer — the highest-leverage signal for remote diagnosis.",
            },
            {
              title: "Print Layer View next",
              body: "Tool-path context so teams can see what the machine intended vs. what it did.",
            },
            {
              title: "Consumables & guides",
              body: "Lapsed maintenance drives many cases; field guides and history had to be in-product.",
            },
          ],
        },
      ],
      table: {
        ariaLabel: "Fleet and CX scale",
        rows: [
          {
            col1: "Users",
            col2: "20.8k — majority Manufacturing / Plant / Production Managers",
          },
          {
            col1: "Enterprise fleets",
            col2: "100+ fleets with more than 14 devices worldwide",
          },
          {
            col1: "CX specialists",
            col2: "300+ internal and partner technicians",
          },
          {
            col1: "Devices",
            col2: "15k worldwide; 93% connected to Eiger Cloud",
          },
          {
            col1: "Case volume",
            col2: "~10–15 cases/day across complexity levels",
          },
          {
            col1: "Pilot program",
            col2: "30 key partners co-creating UX before wider rollout",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "IA focused on remote monitoring for internal and partner engineering/CX, visualization for diagnosis and trust, and tagging to feed future learning models. Partner entry opens Merlin with a device ID; internal users jump from Eiger device timeline into the same panel workspace.",
        "All panels were mapped before UI design. MVP shipped Sensor/Telemetry then Print Layer View on the Eiger React design system — default load: Plot, Layer View, and Timeline — with a modular architecture for case-specific dashboards. Ticket workflows and Field Troubleshooting Guides were co-created with CX, partners, and engineering.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/additive-mfg-cx-data/product-ia.png",
          alt: "Telemetry and CX information architecture from Eiger and partner entry into Merlin panels.",
          width: 1440,
          height: 810,
        },
      ],
      topicGroups: [
        {
          title: "Default panel load",
          items: [
            {
              title: "Plot",
              body: "Bespoke and premade expressions — temperature, forces, speeds, and more over time.",
            },
            {
              title: "Layer View",
              body: "Tool-path representation with optional Hawkeye overlay against the printed part.",
            },
            {
              title: "Timeline",
              body: "Errors, flags, and tags with jump-to-time into logs and other panels.",
            },
            {
              title: "Sharable exact view",
              body: "Links preserve the panel state so partners and engineering diagnose the same moment.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story opens in Merlin, moves into the selected-range workspace, then Plot, Layer, and Hawkeye — with ops panels, tagging, partner tools, and Advanced Edit for deeper diagnosis.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/additive-mfg-cx-data/product-entry.png",
            alt: "Merlin Markforged Customer Support entry modal requesting an FX10 or FX20 device ID.",
            width: 2880,
            height: 1696,
            title: "Partner entry",
            caption:
              "CX partners open Merlin, enter a device ID, and land on the telemetry workspace for that printer.",
          },
          {
            src: "/projects/additive-mfg-cx-data/product-selected-range-v2.png",
            alt: "Device telemetry selected-range view with Plot, Layer View, and Timeline panels.",
            width: 2688,
            height: 1524,
            title: "Selected range workspace",
            caption:
              "Default load: Plot, Layer View, and Timeline for the chosen event or time range.",
          },
          {
            src: "/projects/additive-mfg-cx-data/product-plot-v2.png",
            alt: "Plot panel with multi-axis series for hotend force, extruder speed, and layer.",
            width: 2688,
            height: 1524,
            title: "Plot panel",
            caption:
              "Bespoke expressions across Y-axes — temperature, motor forces, extrusion, and more.",
          },
          {
            src: "/projects/additive-mfg-cx-data/product-layer-v2.png",
            alt: "Layer View panel showing tool paths with layer view options sidebar.",
            width: 2688,
            height: 1524,
            title: "Layer View",
            caption:
              "Tool paths over time — speed, pressure, and machine geometry in one canvas.",
          },
          {
            src: "/projects/additive-mfg-cx-data/product-hawkeye-v2.png",
            alt: "Hawkeye overlay comparing layer tool paths against the printed part image.",
            width: 2742,
            height: 1482,
            title: "Hawkeye",
            caption:
              "FX10 overlay of intended paths on the printed part — intended vs. printed at a glance.",
          },
        ],
        accordion: [
          {
            value: "ops-diagnosis",
            title: "Ops & diagnosis",
            description:
              "Logs, timeline errors, escalations, consumables, and health checks for day-to-day CX work.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/additive-mfg-cx-data/product-log-v2.png",
                alt: "Logs panel with filter options sidebar and timeline error markers.",
                width: 2688,
                height: 1524,
                title: "Log",
                caption:
                  "Every sensor action and printer movement for hard-to-find utility issues.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-timeline-v2.png",
                alt: "Timeline with Device Barracuda Error tooltip showing firmware user_abort details.",
                width: 2688,
                height: 1524,
                title: "Timeline",
                caption:
                  "Errors and events on a shared timeline — jump to the exact moment a job aborted.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-escalations-v2.png",
                alt: "Device Barracuda Error modal with Open Technical Support Case and Troubleshooting Guide actions.",
                width: 2688,
                height: 1524,
                title: "Escalations",
                caption:
                  "Open a support case or troubleshooting guide without leaving the device context.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-consumables-v2.png",
                alt: "Consumables History table with Replace Soon and Up to Date statuses and time remaining.",
                width: 2688,
                height: 1524,
                title: "Consumables",
                caption:
                  "Bowden tubes and other wear parts — Replace Soon before the customer feels the failure.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-health-v2.png",
                alt: "Utilities History and Health Check panels showing passed tests and open guide links.",
                width: 2688,
                height: 1524,
                title: "Utilities & health",
                caption:
                  "Procedure history and component health checks that frame the CX story.",
              },
            ],
          },
          {
            value: "collab-tools",
            title: "Tagging & partner tools",
            description:
              "Timestamp tags for learning models, partner navigation, and Advanced Edit for power users.",
            slides: [
              {
                src: "/projects/additive-mfg-cx-data/product-tagging-v2.png",
                alt: "Add Tags modal with nozzle offset, Ultem warping, and other diagnostic tags.",
                width: 2688,
                height: 1524,
                title: "Tagging",
                caption:
                  "Timestamp tags that feed print-quality ML and QA / CX playbooks.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-partner-nav.png",
                alt: "Merlin sidebar with Changelog, Download, Copy URL, Troubleshooting Guides, and View as Partner.",
                width: 1440,
                height: 798,
                title: "Partner tools",
                caption:
                  "Changelog, sharable URL, troubleshooting guides, and view-as-partner for CX workflows.",
              },
              {
                src: "/projects/additive-mfg-cx-data/product-advanced-edit.png",
                alt: "Advanced Edit modal with JSON panel configuration for plot expressions and axis ranges.",
                width: 1440,
                height: 800,
                title: "Advanced Edit",
                caption:
                  "Power users edit panel JSON — expressions, axes, and ranges — then Apply to the live view.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Partners and internal engineering can share and store visualizations for R&D, CRM, and troubleshooting. Material development and analysis sped up 3×, partners act with less escalation to Markforged engineering, and device diagnosis dropped from several days to less than an hour.",
      ],
      stats: [
        {
          value: "3×",
          label: "Faster material analysis",
          detail: "Development and analysis time sped up for R&D and CX.",
        },
        {
          value: "< 1 hour",
          label: "Device diagnosis",
          detail: "Down from several days via remote triaging.",
        },
        {
          value: "30 partners",
          label: "Pilot program",
          detail: "UX co-created with key partners before wider rollout.",
        },
        {
          value: "Less escalation",
          label: "Partner autonomy",
          detail: "Transparent data so partners resolve more without Eng.",
        },
      ],
    },
  ],
};
