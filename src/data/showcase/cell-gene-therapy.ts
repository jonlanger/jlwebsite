import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "cell-gene-therapy-platform",
  title: "Cell Gene Therapy Platform",
  description:
    "Single-pane-of-glass platform for Roche cell and gene therapy manufacturing, treatment, and clinical operations.",
  image: "/projects/cell-gene-therapy/cell-gene-therapy_card.png",
  alt: "Cell gene therapy admin home screen with patient search and therapy progress table.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Accenture helps life sciences companies through evidence-based patient services from pre-diagnosis through ongoing treatment \u2014 spanning facilitation and adherence, quality control and compliance, and coordination of data and stakeholders (Intient Patient Product Suite).",
      "As Lead UX/Product Designer, I co-created a Single Pane of Glass dashboard for Roche\u2019s Cell Gene Therapy manufacturing and treatment platform, managing two offshore designers and delivering production-ready screens for development.",
    ],
    role: "Lead UX / Product Design, Research, Client Collaboration, Development Oversight",
    scope:
      "Enterprise web platform \u2014 onboarding, treatment journey, manufacturing, and product receipt",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Cell and gene therapies rewrite how serious disease is treated \u2014 and how care teams, manufacturers, and logistics partners must coordinate. The platform had to make that complexity legible in one place.",
        "Pathway choice changes everything: autologous therapies run on the patient\u2019s own cells and can take months; allogeneic therapies use donor cells prepared ahead and can reach infusion in days. Supporting both meant unifying forms, diaries, labs, manufacturing, and shipping data.",
      ],
      topicGroups: [
        {
          title: "What is cell & gene therapy?",
          items: [
            {
              title: "Gene therapy",
              body: "Treat disease by replacing, inactivating, or introducing genes \u2014 inside the body (in vivo) or outside it (ex vivo).",
            },
            {
              title: "Cell therapy",
              body: "Restore or alter cells, or use cells to carry therapy. Cells may come from the patient (autologous) or a donor (allogeneic).",
            },
            {
              title: "Combined approaches",
              body: "Some therapies alter genes in specific cells, then return those cells to the patient \u2014 bridging both modalities.",
            },
          ],
        },
        {
          title: "Why the pathway matters",
          items: [
            {
              title: "Autologous \u2014 patient\u2019s own cells",
              body: "Referral through collection, manufacturing, QA/QC, and return transport. Enrollment to infusion typically takes 2\u20133 months.",
            },
            {
              title: "Allogeneic \u2014 donor cells ahead of need",
              body: "Manufacturing and storage happen off the critical path. Once enrolled, patients can reach infusion in about 1\u20137 days.",
            },
            {
              title: "What the platform had to hold",
              body: "Form-based collection, patient diaries, wearables, lab results, and manufacturing/logistics data \u2014 visible to every role that touches the journey.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "2\u20133 mo",
          label: "Autologous to infusion",
          detail: "Patient-derived cells on a closed loop from enrollment to return.",
        },
        {
          value: "1\u20137 days",
          label: "Allogeneic to infusion",
          detail: "Donor cells manufactured ahead \u2014 major efficiency and scale advantage.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Past research plus interviews with users, admins, managers, and stakeholders defined 11 personas, 50+ unique tasks, and 20+ pain points \u2014 spanning location and level of interaction.",
        "Key roles included Patient Operations (CGT Case Manager / Clinical Trial Manager), Commercial O&EM clinical supply-chain users, and CRO Logistics Coordinators supporting the Treatment Center Portal \u2014 alongside Cell Data Admins, specialized nurses, and cell lab technicians.",
      ],
      table: {
        ariaLabel: "Key users and case manager metrics",
        rows: [
          {
            col1: "CGT Case Manager / Clinical Trial Manager",
            col2: "Registers patients, onboards sites and HCPs, manages engagement, schedules, and manufacturing coordination.",
          },
          {
            col1: "O&EM Clinical Supply Chain",
            col2: "Manages orders end-to-end, exceptions, patient-specific batches, CMOs, and couriers.",
          },
          {
            col1: "CRO Logistics Coordinators",
            col2: "Treatment Center Portal support, site logistics, and escalations when users struggle across systems.",
          },
          {
            col1: "Average patient load",
            col2: "20\u201330 patients per CGT case manager",
          },
          {
            col1: "Response time to inquiries",
            col2: "1\u20132 hours",
          },
          {
            col1: "Patient adherence rate",
            col2: "90\u201395%",
          },
          {
            col1: "HCP interactions per patient / month",
            col2: "4\u20136",
          },
          {
            col1: "Patient satisfaction",
            col2: "85\u201390%",
          },
          {
            col1: "Case documentation accuracy",
            col2: "98\u201399%",
          },
          {
            col1: "Follow-up scheduling time",
            col2: "1\u20132 days",
          },
          {
            col1: "Issue resolution time",
            col2: "2\u20133 days",
          },
          {
            col1: "Training completion rate",
            col2: "95\u2013100%",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "Workshops brought manufacturing SMEs, clinical trial leaders, developers, and architects together to pressure-test feasibility early.",
        "Information architecture covers organization, therapy, and physician onboarding, then a Home Screen for permissions, exports, e-signatures, and compliance. Treatment management flows through Scheduling \u2192 Biospecimen Collection \u2192 Cryopreservation \u2192 Shipping \u2192 Manufacturing \u2192 Shipping Confirmation \u2192 Product Receipt.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/cell-gene-therapy/slide-023.png",
          alt: "CGT platform overview information architecture.",
          width: 1440,
          height: 810,
        },
      ],
      table: {
        ariaLabel: "O&EM manufacturing metrics from research",
        rows: [
          {
            col1: "Manufacturing lead time",
            col2: "21\u201328 days from biospecimen to therapy completion",
          },
          {
            col1: "Manufacturing success rate",
            col2: "90\u201395% meeting quality standards",
          },
          {
            col1: "COGS per treatment",
            col2: "$50,000\u2013$200,000",
          },
          {
            col1: "Capacity utilization",
            col2: "70\u201380%",
          },
          {
            col1: "Batch failure rate",
            col2: "5\u201310%",
          },
          {
            col1: "Yield per batch",
            col2: "1\u201310 doses",
          },
          {
            col1: "Supply chain lead time",
            col2: "7\u201314 days",
          },
          {
            col1: "QC testing time",
            col2: "3\u20137 days",
          },
        ],
      },
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from a single pane of glass for the case load, into a patient\u2019s treatment journey, then through the operational steps that get therapy from collection to verified receipt.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/cell-gene-therapy/product-home.png",
            alt: "INTIENT Patient manufacturer admin home with patient search and therapy progress table.",
            width: 1440,
            height: 1185,
            title: "CGT Home",
            caption:
              "Thirty patients at a glance \u2014 search by name or PTN and track therapy progress across the portfolio.",
          },
          {
            src: "/projects/cell-gene-therapy/product-journey-wb.png",
            alt: "Patient overview showing completed scheduling through product receipt with events calendar.",
            width: 1024,
            height: 728,
            title: "Treatment journey",
            caption:
              "Scheduling, biospecimen, manufacturing, and product receipt on one timeline \u2014 with contacts and upcoming events.",
          },
          {
            src: "/projects/cell-gene-therapy/product-onboard-therapy-wb.png",
            alt: "Patient therapy onboarding step one: choose from available CAR T-cell therapies.",
            width: 1024,
            height: 728,
            title: "Choose therapy",
            caption:
              "Onboarding starts by selecting an available commercial or clinical therapy before patient search.",
          },
          {
            src: "/projects/cell-gene-therapy/product-scheduling.png",
            alt: "Scheduling review and approve order with e-signature statuses for approver and verifier.",
            width: 1440,
            height: 1358,
            title: "Scheduling",
            caption:
              "Pickup and delivery details reviewed, then dual e-signatures before the order is locked.",
          },
          {
            src: "/projects/cell-gene-therapy/product-receipt-wb.png",
            alt: "Product receipt confirm product summary with bag IDs and dual e-signature workflow.",
            width: 895,
            height: 1024,
            title: "Product receipt",
            caption:
              "Verify bag IDs and condition, then approve and verify before therapy can be administered.",
          },
        ],
        accordion: [
          {
            value: "treatment-ops",
            title: "Treatment operations",
            description:
              "Biospecimen collection, manufacturing milestones, and shipping handoffs along the critical path.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/cell-gene-therapy/product-onboard-details-wb.png",
                alt: "Patient info form with eligibility screening and infectious disease monitoring checklists.",
                width: 794,
                height: 1024,
                title: "Patient details",
                caption:
                  "Demographics, biomarkers, and IDM confirmation \u2014 mandatory fields before e-signature.",
              },
              {
                src: "/projects/cell-gene-therapy/product-biospecimen.png",
                alt: "Biospecimen collection identify collection material with multiple DIN sessions.",
                width: 1440,
                height: 1442,
                title: "Biospecimen collection",
                caption:
                  "Multi-session DINs, volumes, dates, and uploads that protect cell integrity for manufacture.",
              },
              {
                src: "/projects/cell-gene-therapy/product-manufacturing.png",
                alt: "Manufacturing milestone information for biospecimen receipt, production, and final product shipment.",
                width: 1440,
                height: 1751,
                title: "Manufacturing",
                caption:
                  "Receipt, production dates, and final product bag IDs \u2014 with confirmations at each milestone.",
              },
              {
                src: "/projects/cell-gene-therapy/product-shipping.png",
                alt: "Biospecimen shipping summary with confirmed bags and courier details.",
                width: 1440,
                height: 1283,
                title: "Shipping handoff",
                caption:
                  "Confirmed bags and shipping labels before cells leave the treatment center.",
              },
            ],
          },
          {
            value: "admin-compliance",
            title: "Admin setup & compliance",
            description:
              "Organizations, therapy configuration, users, e-signatures, and uploaded files that keep the network audit-ready.",
            slides: [
              {
                src: "/projects/cell-gene-therapy/product-organizations.png",
                alt: "Organizations admin list with search and active or inactive status badges.",
                width: 1440,
                height: 1185,
                title: "Organizations",
                caption:
                  "Onboard and manage treatment centers \u2014 active status controls who can enroll patients.",
              },
              {
                src: "/projects/cell-gene-therapy/product-therapy-config.png",
                alt: "Onboard new therapy workflow configuration selecting customized autologous commercial workflow.",
                width: 1440,
                height: 1197,
                title: "Therapy configuration",
                caption:
                  "Map therapy workflows \u2014 scheduling through product receipt \u2014 before release to sites.",
              },
              {
                src: "/projects/cell-gene-therapy/product-users.png",
                alt: "User management list for onboarding and status of platform users.",
                width: 1440,
                height: 1185,
                title: "Users",
                caption:
                  "Invite, activate, and manage roles across manufacturer and treatment-center teams.",
              },
              {
                src: "/projects/cell-gene-therapy/product-esign.png",
                alt: "E-signatures tab showing approver and verifier signed statuses for patient therapy onboarding.",
                width: 1440,
                height: 1024,
                title: "E-signatures",
                caption:
                  "Approver and verifier dual control \u2014 with history for every critical step.",
              },
              {
                src: "/projects/cell-gene-therapy/product-uploads.png",
                alt: "View uploaded files for a patient with document list and metadata.",
                width: 1440,
                height: 1391,
                title: "Uploaded files",
                caption:
                  "Labs, labels, and supporting documents stay attached to the patient record.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The integrated platform put data, documents, and metrics in one place for regulatory compliance, reduced manual effort through interconnected sources, improved engagement for admins, nurses, and manufacturers, and cut long-term cost by coordinating onboarding through product receipt with fewer delays and errors.",
      ],
      stats: [
        {
          value: "1 place",
          label: "Clinical data hub",
          detail: "Data, documents, and metrics for products and studies.",
        },
        {
          value: "Less manual work",
          label: "Connected data sources",
          detail: "Better analysis and automation across partners.",
        },
        {
          value: "Higher engagement",
          label: "Admins, nurses, manufacturers",
          detail: "Clearer UX across roles in the treatment journey.",
        },
        {
          value: "Lower long-term cost",
          label: "Fewer delays and errors",
          detail: "Coordination from onboarding through product receipt.",
        },
      ],
    },
  ],
};
