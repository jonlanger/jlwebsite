import { ADDITIVE_MFG_PRINT_CUSTOMER_JOURNEY_COLUMNS } from "@/data/additive-mfg-print-sim-scan-journey-maps";
import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "additive-mfg-print-sim-scan",
  category: "software",
  title: "Additive Manufacturing Print, Sim, and Scan",
  description:
    "Markforged primary print workflow spanning part prep, simulation, and laser scan inspection for enterprise manufacturing.",
  image:
    "/projects/additive-mfg-print-sim-scan/additive-mfg-print-sim-scan_card.png",
  alt: "Markforged print workflow solid model page with part settings and 3D build view.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Markforged\u2019s R&D in materials and software-defined hardware, plus a large 3D model dataset and customers eager for new capabilities, makes advanced print-service features a strategic priority.",
      "The main Print workflow drives revenue, keeps machines running, and manages a growing portfolio of enterprise manufacturing parts. Continuous iteration, customer engagement, and fast timelines are essential as new features land in this flow.",
    ],
    role: "UX Research, Full-cycle UI/UX, CX Coordination, AI Feature Design",
    scope: "Enterprise print software \u2014 Parts, Build, XRAY, SIM, SCAN",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "The Print workflow is the most frequent path to prepare parts \u2014 materials, devices, layer height, and infill tuned for varied use cases \u2014 with simulation added to cut time-to-print and increase part strength.",
        "Continuous instrumentation (AWS, Datadog, Pendo, Metabase) and weekly cocreation with CX, Sales, and Marketing kept design decisions tied to real usage across subscription tiers and industries.",
      ],
      topicGroups: [
        {
          title: "Print workflow stages",
          items: [
            {
              title: "Parts & folders",
              body: "Upload STLs into Parts, Library, or custom folders \u2014 with enterprise RBAC for portfolio organization.",
            },
            {
              title: "Solid / part settings",
              body: "Tune strength, speed, cost, materials, and devices; Performance Advisor surfaces auto simulation tradeoffs.",
            },
            {
              title: "XRAY",
              body: "Edit fiber placement, scheduled pauses, and other layer overrides before the bed is packed.",
            },
            {
              title: "Build",
              body: "Add parts, arrange the build plate, and pick a ready printer from the fleet list.",
            },
            {
              title: "SIM",
              body: "Add anchors and loads, then generate optimizations and comparisons for critical parts.",
            },
            {
              title: "SCAN",
              body: "Laser scan point clouds feed QA reports \u2014 closing the loop from design intent to inspected output.",
            },
          ],
        },
      ],
    },
    {
      title: "Customer Journey",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "From purchasing to typical use and support, the Markforged ecosystem spans partner-led setup, education, the pre-print and print platforms, post-print service, and additive assessment that fuels expansion.",
        },
        {
          type: "journeyTable",
          tableAriaLabel:
            "Customer journey across buying, deployment, education, pre-print, print, post-print, and assessment",
          columns: ADDITIVE_MFG_PRINT_CUSTOMER_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "Print, Sim, and Scan sit inside the pre-print and print platform journey \u2014 the highest-frequency path once machines are deployed and teams are trained.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Quantitative instrumentation (AWS, Datadog, Pendo, Metabase) plus weekly cocreation with CX, Sales, and Marketing showed a primary workflow of 1 min 17 sec for a verified and simulated part, with 20.8k weekly users completing primary flows.",
        "Research identified 12 key personas across four ICP sub-industries. Manufacturing and Design Engineers are 75% of users; overlapping pain points clustered around Integrations, Material Compatibility, Cost, Training, and Compliance.",
      ],
      topicGroups: [
        {
          title: "Top ICP pain points",
          items: [
            {
              title: "Integrations",
              body: "Fitting additive into existing production lines, training, and QC \u2014 especially in automotive and aerospace.",
            },
            {
              title: "Material compatibility",
              body: "Regulated industries need durable, certifiable materials that match printer and process constraints.",
            },
            {
              title: "Cost & ROI",
              body: "Proving cost-effectiveness vs traditional methods before leadership will expand fleets.",
            },
            {
              title: "Training & support",
              body: "Adoption stalls without continuous technical support as software and materials evolve.",
            },
            {
              title: "Compliance & QA",
              body: "Aerospace, automotive, and medical parts demand consistent quality and audit-ready documentation.",
            },
          ],
        },
        {
          title: "ICP sub-industry needs",
          items: [
            {
              title: "Food & consumer goods",
              body: "Food-grade materials, cleanable finishes, durability, and traceable regulatory documentation.",
            },
            {
              title: "Electronics",
              body: "Conductive or insulating materials, tight tolerances, thermal resistance, and electrical testing.",
            },
            {
              title: "Aerospace & defense",
              body: "High strength-to-weight, extreme environments, AS9100 / ITAR compliance, and NDT-ready QC.",
            },
            {
              title: "Automotive",
              body: "Strength, chemical resistance, fine detail, surface finish, and IATF-aligned traceability.",
            },
          ],
        },
      ],
      table: {
        ariaLabel: "Persona distribution",
        rows: [
          {
            col1: "Manufacturing & Design Engineers",
            col2: "75% \u2014 design, print, and monitor fleets",
          },
          {
            col1: "Executive Plant Managers",
            col2: "10% \u2014 ROI, utilization, and uptime",
          },
          {
            col1: "IT & Operation Managers",
            col2: "5% \u2014 RBAC, SOP, security, integrations",
          },
          {
            col1: "Production Planners & Managers",
            col2: "5% \u2014 fleets, queues, secure part sharing",
          },
          {
            col1: "QC Engineers & Inspectors",
            col2: "3% \u2014 QA monitoring for part output",
          },
          {
            col1: "Technicians, Operators, Assemblers",
            col2: "2% \u2014 device performance and troubleshooting",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "The high-level Print workflow is the most frequent path to prepare parts \u2014 tuning materials, devices, layer height, and infill \u2014 with simulation added to reduce time-to-print and increase part strength.",
        "Work spanned research through ship: analytics-informed decisions, full-cycle UI with interdisciplinary teams, enterprise customer collaboration, and AI features that set a new performance benchmark in the flow.",
      ],
      topicGroups: [
        {
          title: "Responsibilities across the cycle",
          items: [
            {
              title: "User research & testing",
              body: "Pain-point research with additive stakeholders; usability testing across industries and subscription tiers.",
            },
            {
              title: "Quantitative insights",
              body: "Analytics guided detailed design decisions and validated where the workflow slowed.",
            },
            {
              title: "UI/UX & engineering detailing",
              body: "Low-fi to high-fi with developers, IoT, and other engineers so concepts stayed technically feasible.",
            },
            {
              title: "Customer & CX collaboration",
              body: "Enterprise customers plus CX/service teams shaped priorities from product and corporate strategy.",
            },
            {
              title: "Stakeholder alignment",
              body: "Workshops kept research, design, development, and ME oversight pointed at the same outcomes.",
            },
            {
              title: "Data & AI",
              body: "Integrated AI features in the workflow \u2014 including Performance Advisor tradeoffs that lifted material usage 15%.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "Primary Print workflow from Parts through Build, XRAY, SIM, and SCAN \u2014 tuned for enterprise fleets and Advanced Tier simulation.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/additive-mfg-print-sim-scan/product-parts.jpg",
            alt: "Markforged Parts library with folders, part cards, and Import STL actions.",
            width: 1024,
            height: 604,
            title: "Parts library",
            caption:
              "STL upload into Parts, Library, or custom folders \u2014 with enterprise RBAC for portfolio organization.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-solid.jpg",
            alt: "Solid model page with part settings, 3D viewport, and Performance Advisor material comparisons.",
            width: 1024,
            height: 604,
            title: "Solid model & Performance Advisor",
            caption:
              "Strength, speed, and cost parameters with simplified simulation. AI guidance increased material usage 15%.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-build.jpg",
            alt: "Build page with 3D part on the bed, build details, and selected Ready printer card.",
            width: 1024,
            height: 604,
            title: "Build plate & printer card",
            caption:
              "Print-bed visualization with device status; printer status integration improved time-to-print UX by 50%.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-printers.jpg",
            alt: "Select Printer modal listing Available and Printing devices with material and queue details.",
            width: 1024,
            height: 604,
            title: "Fleet printer list",
            caption:
              "Printing vs ready vs maintain-soon at a glance \u2014 saved users ~2 minutes versus alternate search.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-xray.jpg",
            alt: "XRAY view showing fiber reinforcement paths, layer timeline, and Add Fiber settings.",
            width: 1024,
            height: 609,
            title: "XRAY fiber & supports",
            caption:
              "Edit supports and continuous fiber via the layer timeline before committing the build.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-sim.jpg",
            alt: "SIM view with load-case anchors, 100 N force callout, and Validate action.",
            width: 1024,
            height: 609,
            title: "SIM load cases",
            caption:
              "Advanced Tier additive-specific simulation used by 157 organizations for critical parts.",
          },
          {
            src: "/projects/additive-mfg-print-sim-scan/product-scan.jpg",
            alt: "SCAN view with point-cloud deviation mapping and absolute scan point deviation legend.",
            width: 1024,
            height: 605,
            title: "SCAN inspection",
            caption:
              "Laser inspection accuracy reports for QC, with exportable compliance-ready outputs.",
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The ecosystem supported $266.5M worth of prints across 5.686 million jobs (avg ~150 cm\u00b3 material; 800 cm\u00b3 / $250 spools) and $18M across three subscription tiers from Aug 2023\u2013Aug 2024 \u2014 while accelerating jigs, fixtures, prototypes, and precision tools and generating data for specialized performance models.",
      ],
      stats: [
        {
          value: "$266.5M",
          label: "Worth of prints",
          detail: "5.686M prints; ~150 cm\u00b3 average material per print.",
        },
        {
          value: "$18M",
          label: "Subscription revenue",
          detail: "Three tiers, Aug 2023\u2013Aug 2024.",
        },
        {
          value: "Faster tooling",
          label: "Automation & efficiency",
          detail:
            "Accelerated jigs, fixtures, prototypes, and bespoke precision tools.",
        },
        {
          value: "Model-ready",
          label: "Data & insight",
          detail:
            "Print data feeding specialized performance and optimization models.",
        },
      ],
    },
  ],
};
