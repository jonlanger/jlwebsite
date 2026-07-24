import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "consultants-portal",
  title: "Consultants Portal",
  description:
    "Compliance and materials-tracking software connecting government agencies, consulting firms, and contractors on roadway construction projects.",
  image: "/projects/consultants-portal/consultants-portal_card.png",
  alt: "Consultant Portal delivered locations map with material cards and emissions data.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "HaulHub (operating as e-dot) builds the digital layer connecting state DOT agencies, contractors, vendors, and suppliers on roadway construction \u2014 spanning e-Ticketing, digital inspections, material certificates, and pay reconciliation. The Consultant Portal is the piece built specifically for the consultancies who sit between agencies and contractors: verifying that what\u2019s delivered to a job site actually matches spec, and that the paperwork proving it holds up.",
      "As Lead Designer, I led this project \u2014 one of several I\u2019ve worked on with HaulHub/e-dot.",
    ],
    role: "Lead Designer",
    scope:
      "Web platform \u2014 project stationing, environmental/materials compliance, contractor and agency coordination",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "On a roadway project, a consultant is the checkpoint. A contractor delivers asphalt, concrete, or aggregate; the consultant has to confirm it matches the approved mix design, was inspected, and is properly documented \u2014 before an agency will pay for it. That verification work has traditionally lived across paper tickets, spreadsheets, and phone calls, split across every contractor and supplier touching a project.",
        "Two threads run through everything a consultant does in the portal.",
      ],
      topicGroups: [
        {
          title: "Mix and materials compliance",
          items: [
            {
              title: "Job Mix Formula (JMF) IDs",
              body: "Every delivered load ties back to a JMF ID \u2014 the approved recipe for that material. JMF / Mix ID Setup lets a consultant configure and verify these IDs against supplier production data (Supplier CI).",
            },
            {
              title: "Manual correction when match fails",
              body: "When an automated match doesn\u2019t line up \u2014 which happens \u2014 the JMF ID and EPD number can be corrected by hand, so a mismatch doesn\u2019t stall a project waiting on a supplier fix.",
            },
            {
              title: "Ticketed working queue",
              body: "Tickets move through delivered, inspected, and pay-coded states. Summary stats give an instant read on where the backlog sits, each one clickable into the underlying tickets.",
            },
          ],
        },
        {
          title: "Environmental accountability",
          items: [
            {
              title: "EPD on every ticket",
              body: "Alongside the JMF ID, every material ticket carries an Environmental Product Declaration (EPD) number \u2014 the documentation of a material\u2019s environmental footprint.",
            },
            {
              title: "Sustainability in the same workflow",
              body: "Folding EPD tracking into the same ticketed flow as compliance and payment means sustainability reporting isn\u2019t a separate, bolted-on process \u2014 it\u2019s part of verifying the load in the first place.",
            },
            {
              title: "Plants and carbon context",
              body: "Plant views surface connected, available, and verified EPDs next to ticket totals \u2014 so environmental status sits beside the materials a consultant is already reconciling.",
            },
          ],
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Every screen in the portal shares the same shell \u2014 a page title with an overflow action, and a tab bar underneath for related views \u2014 so a consultant can move between the dozens of screens the job requires without relearning navigation each time.",
        "From there, the workflow follows the shape of the job: stationing and delivery maps for where material has gone, a ticketed queue for verification and pay coding, plant and equipment context for what should be producing, and documents that stay attached to the tickets they support.",
      ],
      topicGroups: [
        {
          title: "Core workflows",
          items: [
            {
              title: "Project Stationing",
              body: "Lays out where along the project material has gone, with filters and map context for deliveries, plants, and equipment on site.",
            },
            {
              title: "Ticketed Material List",
              body: "The working queue \u2014 tickets move through delivered, inspected, and pay-coded states, with editable JMF and EPD fields when Supplier CI doesn\u2019t match.",
            },
            {
              title: "JMF / Mix ID Setup",
              body: "Upload or connect mix IDs, map columns from supplier files, and keep approved recipes ready for ticket matching.",
            },
            {
              title: "Plants & documents",
              body: "Plants group materials and EPD status by supplier location. Documents, EPDs, and contractor context stay with the tickets they support rather than in a separate filing system.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from the ticketed working queue into ticket detail and JMF/EPD matching, then out to stationing maps, plants, and project planning \u2014 all inside the same shell.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/consultants-portal/product-ticketed-list.png",
            alt: "Materials ticketed material list with agency, supplier, plant, JMF, and EPD columns.",
            width: 1518,
            height: 1066,
            title: "Ticketed Material List",
            caption:
              "The consultant\u2019s working queue \u2014 filter by agency, supplier, and plant, then edit DOT JMF/ID and EPD when automated match falls short.",
          },
          {
            src: "/projects/consultants-portal/product-ticket-details.png",
            alt: "Ticket details drawer showing raw ticket data, weights, and inspector review.",
            width: 1518,
            height: 1066,
            title: "Ticket details",
            caption:
              "Drill into a load \u2014 plant, supplier, DOT project number, weights, audit log, map, and photos \u2014 without leaving the materials list.",
          },
          {
            src: "/projects/consultants-portal/product-delivered-locations.png",
            alt: "Delivered locations map with material cards showing carbon and transport emissions.",
            width: 1521,
            height: 999,
            title: "Delivered locations",
            caption:
              "Stationing on the map \u2014 each delivered load carries ticket number, quantity, carbon per kg, and transport emissions beside the project line.",
          },
          {
            src: "/projects/consultants-portal/product-plants.png",
            alt: "Plants view with map markers, plant detail panel, and EPD donut chart.",
            width: 1518,
            height: 1083,
            title: "Plants",
            caption:
              "Supplier plants on a regional map with connected, available, and verified EPDs next to aggregate, ready-mix, and HMA ticket totals.",
          },
          {
            src: "/projects/consultants-portal/product-bid-evaluations.png",
            alt: "Bid evaluations table with project names, contractors, bid sums, and carbon budgets.",
            width: 1518,
            height: 1066,
            title: "Bid evaluations",
            caption:
              "Compare contractor bids with product carbon budgets in the same project shell used for planning and monitoring.",
          },
        ],
        accordion: [
          {
            value: "materials-compliance",
            title: "Materials compliance & EPDs",
            description:
              "Match agency JMF/IDs and EPD numbers to ticketed mixes, upload mix setup files, and review raw supplier tickets.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/consultants-portal/product-match-jmf.png",
                alt: "Match Agency JMF/ID modal over the ticketed material list.",
                width: 1518,
                height: 1066,
                title: "Match Agency JMF/ID",
                caption:
                  "When Supplier CI doesn\u2019t align, map the ticketed JMF to the agency\u2019s approved ID without waiting on a supplier fix.",
              },
              {
                src: "/projects/consultants-portal/product-match-epd.png",
                alt: "Match EPD to ticketed JMF/ID modal with mix selection and EPD table.",
                width: 1525,
                height: 1066,
                title: "Match EPD",
                caption:
                  "Select an available mix for the job and attach the Environmental Product Declaration number to the ticketed JMF.",
              },
              {
                src: "/projects/consultants-portal/product-epd-success.png",
                alt: "Ticketed material list after successful EPD number match with verification checkmark.",
                width: 1518,
                height: 1066,
                title: "EPD verified",
                caption:
                  "Success toast and verified EPD on the row \u2014 environmental proof stays in the same queue as compliance.",
              },
              {
                src: "/projects/consultants-portal/product-jmf-setup.png",
                alt: "JMF Mix ID Setup empty state with upload file action.",
                width: 1518,
                height: 1066,
                title: "JMF / Mix ID Setup",
                caption:
                  "Upload a mix file or connect an API so approved recipes are ready before tickets start rolling in.",
              },
              {
                src: "/projects/consultants-portal/product-jmf-mapping.png",
                alt: "JMF Mix ID Setup column mapping step with source headers and target field dropdowns.",
                width: 1518,
                height: 1066,
                title: "Map columns",
                caption:
                  "Map supplier file columns to JMF fields, then review and save \u2014 so each ticket can resolve against the right recipe.",
              },
              {
                src: "/projects/consultants-portal/product-raw-tickets.png",
                alt: "Raw tickets hierarchical table grouped by agency, date, plant, and customer.",
                width: 1518,
                height: 1066,
                title: "Raw tickets",
                caption:
                  "Hierarchical supplier tickets \u2014 agency, date, plant, customer \u2014 before they\u2019re connected into the ticketed working queue.",
              },
            ],
          },
          {
            value: "projects-plants",
            title: "Projects, stationing & plants",
            description:
              "Plan new projects on the map, monitor the portfolio, and expand plant context for materials and EPDs.",
            slides: [
              {
                src: "/projects/consultants-portal/product-projects-planning.png",
                alt: "Planning new projects grid with map thumbnails and start new project action.",
                width: 1518,
                height: 1066,
                title: "Project planning",
                caption:
                  "Portfolio of projects in planning \u2014 map thumbnails, recent updates, and a clear path to start the next one.",
              },
              {
                src: "/projects/consultants-portal/product-create-project.png",
                alt: "Create project wizard with location form and dark map for setting project location.",
                width: 1518,
                height: 1066,
                title: "Create project",
                caption:
                  "Project details and location on a map, then plants, materials, and life-cycle assessment in a guided setup.",
              },
              {
                src: "/projects/consultants-portal/product-jmf-complete.png",
                alt: "JMF Mix ID Setup with uploaded MDOT mix document listed in a table.",
                width: 1518,
                height: 1066,
                title: "Uploaded mix files",
                caption:
                  "Once mapped and saved, mix documents stay searchable under JMF / Mix ID Setup for the life of the project.",
              },
              {
                src: "/projects/consultants-portal/product-plants-fullscreen.png",
                alt: "Full-screen plants list with search, agency and supplier filters, and plant cards.",
                width: 1522,
                height: 1066,
                title: "Plants registry",
                caption:
                  "Search and filter plants by agency and supplier \u2014 each card shows ticketed materials and EPD connection status.",
              },
              {
                src: "/projects/consultants-portal/product-projects-empty.png",
                alt: "Projects empty state with start new project button under planning tab.",
                width: 1518,
                height: 1066,
                title: "Shared shell",
                caption:
                  "Same title, overflow, and tab pattern from empty state through dense tables \u2014 navigation stays familiar across the job.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The Consultant Portal has been adopted by 50+ large and small consultancies specializing in roadway management projects, driving millions in subscription and contract revenue with those consultancies. The rollout also led to additional approvals and new projects from more municipalities throughout the US.",
      ],
      stats: [
        {
          value: "50+",
          label: "Consultancies adopted",
          detail: "Large and small firms specializing in roadway management.",
        },
        {
          value: "Millions",
          label: "Subscription & contract revenue",
          detail: "Driven with consultancies on the portal.",
        },
        {
          value: "More DOTs",
          label: "Municipal expansions",
          detail: "Additional approvals and new projects across the US.",
        },
      ],
    },
  ],
};
