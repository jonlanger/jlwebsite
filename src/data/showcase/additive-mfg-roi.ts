import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "additive-mfg-roi-dashboard",
  category: "software",
  title: "Additive Mfg ROI Dashboard",
  description: "Enterprise ROI calculator and utilization dashboards that quantify additive manufacturing cost and time savings.",
  image: "/projects/additive-mfg-roi/additive-mfg-roi_card.png",
  alt: "Markforged single-part ROI dashboard with cost breakdown charts.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Large Enterprise Manufacturers still use traditional manufacturing worldwide. Managing supply chain, labor, material costs, and people involves unprecedented complexity \u2014 and teams often lack a clear way to prove when additive manufacturing is the better path.",
        "At Markforged we researched how that complexity affects production decisions and designed ROI and utilization dashboards to increase printer and material sales, device utilization, and stickiness of the cloud software subscription platform."
    ],
    role: "UX Research, Product Design, UI Design, Stakeholder Alignment",
    scope: "Enterprise web \u2014 ROI Dashboard, Utilization Dashboard, Single Part ROI assessment",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Enterprise manufacturers still run traditional production amid complex supply chains, labor, and material costs \u2014 without a clear way to prove when additive manufacturing wins.",
        "Those wins show up on the shop floor and on the balance sheet. Markforged needed customers to see them clearly enough to drive printer, material, and cloud subscription adoption \u2014 yet most teams still tracked cost in SAP suites and fragile spreadsheets.",
      ],
      topicGroups: [
        {
          title: "Manufacturing cost benefits",
          items: [
            {
              title: "Lower maintenance & downtime",
              body: "Design for durability and print spare parts on demand to cut downtime and replacement costs.",
            },
            {
              title: "Design flexibility & innovation",
              body: "Create complex and custom geometries without specialized tooling \u2014 accelerating prototyping and iteration.",
            },
            {
              title: "Less material waste",
              body: "Build only what the part needs versus subtractive methods \u2014 meaningful savings on expensive materials.",
            },
            {
              title: "Lower tooling & setup",
              body: "Skip expensive tooling and long setup cycles, especially for low-volume or customized runs.",
            },
          ],
        },
        {
          title: "Business cost benefits",
          items: [
            {
              title: "Lower inventory & storage",
              body: "On-demand production shrinks warehouses and inventory carrying costs.",
            },
            {
              title: "Streamlined supply chain",
              body: "Localized manufacturing shortens logistics, lead times, and transportation spend.",
            },
            {
              title: "Sustainability & compliance",
              body: "Less waste and energy use supports regulatory goals and green manufacturing incentives.",
            },
          ],
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Research covered Manufacturing and Design Engineers, Executive Plant Managers, IT and Operation Managers, and adjacent roles such as Quality Control and Procurement. Each group struggled to justify AM investment and to track true costs across materials, machines, post-processing, software, and integration.",
        "Customer demand was clear: existing spreadsheet and point-tool workflows lacked data integrity, security, sharing, and insight \u2014 making cost savings hard to prove to leadership."
      ],
              table: {
          ariaLabel: "Key users and ROI vs cost-tracking challenges",
          rows: [
            {
              col1: "Manufacturing & Design Engineers",
              col2: "Justify capital investment; measure productivity and design-flexibility benefits; track material, machine, post-processing, and software costs accurately.",
            },
            {
              col1: "Executive Plant Managers",
              col2: "Assess throughput impact and long-term vs short-term cost; consolidate cost data across departments and manage variable production costs.",
            },
            {
              col1: "IT & Operation Managers",
              col2: "Justify AM IT infrastructure and cybersecurity; track licensing, storage, and integration costs.",
            },
            {
              col1: "QC / Procurement",
              col2: "Quantify quality and lead-time benefits; track inspection, raw-material, and supplier logistics costs.",
            }
          ],
        },
    },
    {
      title: "Approach",
      paragraphs: [
        "The Dashboard IA splits fleet visibility into ROI and Utilization \u2014 departmental cost tracking on one side, surge forecasting and fleet expansion planning on the other \u2014 with track, log, and export for sharing.",
        "A guided Single Part ROI assessment walks users from selecting parts through processing details and traditional manufacturing comparisons into a confirmation summary and per-part ROI dashboard that also feeds the fleet view."
      ],
      figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/additive-mfg-roi/slide-085.png",
            alt: "Dashboard information architecture for ROI and Utilization.",
            width: 1440,
            height: 810,
          }
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story runs from fleet-level proof to a single part. ROI and Utilization dashboards show savings and machine use at scale; a guided assessment turns library parts into comparable cost models leadership can trust.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/additive-mfg-roi/product-roi-dashboard.png",
            alt: "Fleet ROI Estimator comparing Markforged spend to alternative manufacturing cost.",
            width: 1800,
            height: 998,
            title: "Fleet ROI dashboard",
            caption:
              "Assessed and estimated part spend side by side \u2014 so teams can show leadership when additive wins.",
          },
          {
            src: "/projects/additive-mfg-roi/product-utilization.png",
            alt: "Utilization dashboard with fleet KPIs, print jobs, and material usage charts.",
            width: 1800,
            height: 997,
            title: "Utilization dashboard",
            caption:
              "Devices, parts, jobs, and material usage in one place \u2014 for surge planning and fleet expansion.",
          },
          {
            src: "/projects/additive-mfg-roi/product-select-part.png",
            alt: "ROI assessment step one: selecting a sliced part from the Eiger library.",
            width: 1800,
            height: 997,
            title: "Start from the library",
            caption:
              "A guided assessment begins with a sliced part already in Eiger \u2014 no spreadsheet re-entry.",
          },
          {
            src: "/projects/additive-mfg-roi/product-confirm-details.png",
            alt: "Confirm part details including dimensions, print time, mass, and material cost.",
            width: 1800,
            height: 996,
            title: "Confirm print data",
            caption:
              "Dimensions, print time, mass, and material cost feed the model before users add process context.",
          },
          {
            src: "/projects/additive-mfg-roi/product-single-part-roi.png",
            alt: "Single-part ROI view with cost comparison and material-labor-electricity breakdown.",
            width: 1800,
            height: 987,
            title: "Per-part payoff",
            caption:
              "Time and cost savings with a clear breakdown \u2014 the proof point that rolls up into the fleet view.",
          },
        ],
        accordion: [
          {
            value: "assessment-wizard",
            title: "Assessment wizard",
            description:
              "Processing inputs, traditional manufacturing comparison, review, and metadata mapping.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/additive-mfg-roi/product-processing.png",
                alt: "Processing details form with labor rate, touch time, and business outcome selectors.",
                width: 1800,
                height: 997,
                title: "Processing details",
                caption:
                  "Touch time, labor rate, and business outcomes capture the real cost of printing the part.",
              },
              {
                src: "/projects/additive-mfg-roi/product-traditional.png",
                alt: "Traditional manufacturing cost details including part cost, shipping, and lead time.",
                width: 1800,
                height: 996,
                title: "Traditional comparison",
                caption:
                  "Past quotes and logistics become the baseline additive has to beat.",
              },
              {
                src: "/projects/additive-mfg-roi/product-review.png",
                alt: "Assessment review screen summarizing part, processing, and traditional manufacturing inputs.",
                width: 1800,
                height: 996,
                title: "Review & complete",
                caption:
                  "Editable summary before the part lands on the ROI dashboard.",
              },
              {
                src: "/projects/additive-mfg-roi/product-metadata-map.png",
                alt: "Modal mapping custom metadata fields to ROI calculator fields.",
                width: 1800,
                height: 998,
                title: "Reuse existing metadata",
                caption:
                  "Map fields teams already track so assessments stay accurate without double entry.",
              },
            ],
          },
          {
            value: "fleet-details",
            title: "Fleet detail views",
            description:
              "Parts contributing to assessed spend, utilization context, and export tools for sharing.",
            slides: [
              {
                src: "/projects/additive-mfg-roi/product-parts-grid.png",
                alt: "Grid of library parts factored into ROI with savings amounts on each card.",
                width: 1800,
                height: 997,
                title: "Parts driving savings",
                caption:
                  "Every assessed part shows its contribution \u2014 the source of truth behind fleet totals.",
              },
              {
                src: "/projects/additive-mfg-roi/product-parts-strip.png",
                alt: "Utilization view showing printer utilization chart and parts factored into assessed spend.",
                width: 1800,
                height: 997,
                title: "Utilization + assessed parts",
                caption:
                  "Machine use and savings-bearing parts in the same operational context.",
              },
              {
                src: "/projects/additive-mfg-roi/product-exports.png",
                alt: "Parts uploaded chart with print job history and custom analytics CSV download cards.",
                width: 1800,
                height: 997,
                title: "Track, log, export",
                caption:
                  "CSV downloads for job history and org analytics \u2014 built for sharing with leadership.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The release onboarded 15+ key enterprise accounts and reached 2.5k accounts after the June launch. Centralized part documentation reduced spreadsheet math, while each ROI assessment made AM benefits immediately visible to customer leadership \u2014 contributing to millions in related sales."
      ],
      stats: [
        {
          value: "15+",
          label: "Enterprise accounts",
          detail: "Key accounts onboarded with the ROI dashboards.",
        },
        {
          value: "2.5k",
          label: "Accounts using the tool",
          detail: "Adoption since the June release.",
        },
        {
          value: "Millions",
          label: "Related sales",
          detail: "Customers reporting cost-savings benefits to leadership.",
        },
        {
          value: "Less spreadsheet math",
          label: "Centralized documentation",
          detail: "Parts and assessments managed in one place.",
        }
      ],
    }
  ],
};
