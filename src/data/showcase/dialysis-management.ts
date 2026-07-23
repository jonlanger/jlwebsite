import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "dialysis-management",
  title: "Dialysis Management",
  description: "Fresenius PatientHub portal for treatments, supplies, appointments, lab results, and daily flowsheets.",
  image: "/projects/dialysis-management/dialysis-management_card.png",
  alt: "Dialysis patient portal dashboard with health status and upcoming appointments.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Dialysis patients struggle with managing treatments, supplies, appointments, and Fresenius resources \u2014 leading to non-adherence, severe side effects, wasted supplies, and high costs.",
        "Fresenius asked for research and design of PatientHub: a user-friendly portal for managing treatments, ordering supplies, scheduling appointments, and accessing resources, built with Salesforce developers, architects, and product management."
    ],
    role: "UX Research, UI/UX Design, Service Design, On-Device UI",
    scope: "Patient portal (web) and dialysis machine UI",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "The global dialysis market is projected to grow from USD 98.51B in 2024 to USD 181.16B by 2032 (CAGR 7.9%), driven by CKD prevalence. Home dialysis \u2014 especially peritoneal dialysis \u2014 is rising for cost, independence, and quality of life, while hemodialysis remains dominant in clinical settings.",
        "Patients face a heavy supply and logistics burden at home and in clinic. Context metrics framed leadership decisions: life expectancy on dialysis of 5\u201310 years, ~60% of patients aged 65+, ESRD prevalence of 786,000 in the U.S. (2018), and annual HD costs of roughly $78k\u2013$109k versus $36k\u2013$48k for PD."
      ],
              table: {
          ariaLabel: "Dialysis context metrics",
          rows: [
            {
              col1: "Life expectancy on dialysis",
              col2: "5\u201310 years",
            },
            {
              col1: "Patients on peritoneal dialysis (U.S.)",
              col2: "26%",
            },
            {
              col1: "Patients aged 65+",
              col2: "~60%",
            },
            {
              col1: "Clinic staffing ratio",
              col2: "1 nurse per 3\u20134 patients",
            },
            {
              col1: "ESRD prevalence (U.S., 2018)",
              col2: "786,000",
            },
            {
              col1: "CKD prevalence",
              col2: "35.5M (U.S.); 100M (Europe)",
            },
            {
              col1: "Annual HD cost (U.S.)",
              col2: "USD 78,000\u2013109,200",
            },
            {
              col1: "Annual PD cost (U.S.)",
              col2: "USD 36,000\u201348,000",
            },
            {
              col1: "HD sessions / year",
              col2: "~156 (3\u00d7/week, 3\u20135 hours each)",
            }
          ],
        },
    },
    {
      title: "Research",
      paragraphs: [
        "Research with dialysis patients, nurses, and nephrologists \u2014 including concepts shared in patients\u2019 homes alongside supplies \u2014 surfaced how overwhelming supply lists and scheduling push many people toward home treatment.",
        "Hemodialysis and peritoneal dialysis each require dense consumable sets every session or day. Those challenges underscored the need for PatientHub to organize ordering, communication, and daily tracking."
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Patient Portal IA elevates Dashboard, Supplies and Order Tracking, Lab Results, and Flowsheet based on user feedback (including A/B). The goal was a seamless experience that supports engagement and treatment adherence. Scope also included on-device UI for dialysis machines alongside the Salesforce-built portal."
      ],
      figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/dialysis-management/slide-105.png",
            alt: "Patient portal information architecture.",
            width: 1440,
            height: 810,
          }
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "PatientHub keeps treatments, supplies, labs, and daily logging in one place \u2014 designed for desktop, with mobile and tablet layouts that match how patients actually manage care at home.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/dialysis-management/product-dashboard.png",
            alt: "PatientHub dashboard with Action Center cards and upcoming appointments.",
            width: 1728,
            height: 1117,
            title: "Dashboard",
            caption:
              "Action Center prompts, announcements, and upcoming appointments \u2014 the morning view for home dialysis.",
          },
          {
            src: "/projects/dialysis-management/product-supplies.png",
            alt: "My Supplies create-order flow with DEFLEX solution product cards.",
            width: 1728,
            height: 1117,
            title: "My Supplies",
            caption:
              "Select supplies, review quantities, and submit orders \u2014 including Cycle Solutions for CCPD.",
          },
          {
            src: "/projects/dialysis-management/product-lab-results.png",
            alt: "Lab Results card view with Albumin, GFR, potassium, and other metrics.",
            width: 1728,
            height: 1117,
            title: "Lab Results",
            caption:
              "In-range and out-of-range status with goals and links to detailed results patients can understand.",
          },
          {
            src: "/projects/dialysis-management/product-flowsheet.png",
            alt: "Create Flow Sheet form for cycler connection date, weight, and pulse.",
            width: 1728,
            height: 1117,
            title: "Flowsheet",
            caption:
              "Log cycler sessions, vitals, and fluid management so providers stay in sync with daily treatment.",
          },
        ],
        accordion: [
          {
            value: "mobile",
            title: "Mobile",
            description:
              "Phone layouts for the same core tasks \u2014 dashboard prompts, ordering, labs, and flowsheet entry on the go.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/dialysis-management/product-dashboard-mobile-v2.png",
                alt: "PatientHub mobile dashboard Action Center with treatment prompt.",
                width: 1728,
                height: 1117,
                title: "Dashboard",
                caption:
                  "Stacked Action Center cards with bottom nav for quick access between care tasks.",
              },
              {
                src: "/projects/dialysis-management/product-supplies-mobile-v2.png",
                alt: "My Supplies mobile create-order step with product selection.",
                width: 1728,
                height: 1117,
                title: "My Supplies",
                caption:
                  "Two-step order flow compressed for thumb reach \u2014 select supplies, then review and submit.",
              },
              {
                src: "/projects/dialysis-management/product-lab-results-mobile-v2.png",
                alt: "Lab Results mobile card for Albumin with in-range status.",
                width: 1728,
                height: 1117,
                title: "Lab Results",
                caption:
                  "One metric at a time with clear status, goals, and report actions.",
              },
              {
                src: "/projects/dialysis-management/product-flowsheet-mobile-v2.png",
                alt: "Create Flow Sheet mobile form for cycler date and daily weight.",
                width: 1728,
                height: 1117,
                title: "Flowsheet",
                caption:
                  "Session logging with large targets for patients entering vitals after treatment.",
              },
            ],
          },
          {
            value: "tablet",
            title: "Tablet",
            description:
              "An intermediate layout for ordering supplies without stretching a phone UI across a larger screen.",
            slides: [
              {
                src: "/projects/dialysis-management/product-supplies-tablet-v2.png",
                alt: "My Supplies tablet create-order view with two product cards.",
                width: 1728,
                height: 1117,
                title: "My Supplies",
                caption:
                  "Tablet-width supply selection with the same stepper and accordion categories as desktop.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Success led to over seven years of collaboration with Fresenius and 20+ additional projects, tens of millions in revenue, improved efficiency for nurses, nephrologists, and patients, and cost savings from better supply and treatment management."
      ],
      stats: [
        {
          value: "7+ years",
          label: "Fresenius partnership",
          detail: "Extended collaboration after PatientHub.",
        },
        {
          value: "20+",
          label: "Follow-on projects",
          detail: "Additional workstreams from the portal success.",
        },
        {
          value: "Tens of millions",
          label: "Revenue",
          detail: "Generated from the Fresenius engagement.",
        },
        {
          value: "Less waste",
          label: "Supply & treatment savings",
          detail: "Better management for Fresenius and patients.",
        }
      ],
    }
  ],
};
