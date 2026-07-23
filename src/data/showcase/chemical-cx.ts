import { CHEMICAL_CX_SUPPORT_JOURNEY_COLUMNS } from "@/data/chemical-cx-journey-maps";
import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "chemical-cx-platform",
  title: "Chemical CX Platform",
  description:
    "Unified customer-experience dashboard that replaced five to six separate systems for chemical CX personnel.",
  image: "/projects/chemical-cx/chemical-cx_card.png",
  alt: "Chemical CX home dashboard with blocked cases, ticket metrics, and case table.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Dow Customer Experience personnel used 5\u20136 separate software systems, each with its own database \u2014 causing confusion, delay, customer dissatisfaction, and lost revenue from returns, refunds, and fewer orders.",
      "Accenture co-created a Single Pane of Glass dashboard that merged those systems to improve efficiency, vendor and customer relationships, and communication \u2014 plus a future-vision roadmap for leadership.",
    ],
    role: "UX Research, UI/UX Design, Client & Developer Collaboration",
    scope:
      "Enterprise CX web platform (SAP / Fiori) \u2014 home, orders, customers, inventory, analytics",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "CX personnel jumped between five to six systems with separate databases \u2014 slowing responses and eroding customer trust. The opportunity was a single pane of glass that could also inspire a longer-term platform vision.",
        "Support challenges included poor ticket tracking, delayed communication, language barriers, weak follow-through, and limited real-time updates. Improvement themes spanned first-call resolution, proactive problem-solving, multichannel support, and AI-assisted personalization.",
      ],
      topicGroups: [
        {
          title: "Support challenges",
          items: [
            {
              title: "Fragmented systems",
              body: "Five to six tools with separate databases made handoffs slow and context easy to lose.",
            },
            {
              title: "Weak ticket tracking",
              body: "Agents struggled to see status, owners, and next steps across channels.",
            },
            {
              title: "Delayed, incomplete updates",
              body: "Customers waited without real-time progress \u2014 and follow-through was inconsistent.",
            },
          ],
        },
        {
          title: "Improvement themes",
          items: [
            {
              title: "First-call resolution",
              body: "Give agents the order, product, and customer context needed to close issues in one interaction.",
            },
            {
              title: "Proactive & multichannel",
              body: "Surface blocked and at-risk cases early across phone, email, and chat.",
            },
            {
              title: "Smarter personalization",
              body: "Use history and analytics so support feels tailored \u2014 not another black box.",
            },
          ],
        },
      ],
    },
    {
      title: "CX Journey",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Mapping the simplified support journey showed friction at every handoff \u2014 from intake through diagnosis, escalation, updates, and follow-up. Fixing those edge moments, not just the middle of the ticket, was the path to higher satisfaction and loyalty.",
        },
        {
          type: "journeyTable",
          tableAriaLabel:
            "CX support journey across submit, log, history, diagnose, resolve, update, and follow-up",
          columns: CHEMICAL_CX_SUPPORT_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "Pain points clustered around fragmented systems and missing real-time status. Opportunities pointed to one workspace: unified intake, a single customer and order record, proactive updates, and closed-loop follow-up.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Research and concept testing with Dow Customer Service Representatives framed success KPIs from industry practice and available client data \u2014 from first-response time to escalation rate and agent capacity.",
        "User interviews prioritized five information needs: priority/blocked cases, order details, product details, customer details, and analytics \u2014 each tied to efficiency, UX, and customer value.",
      ],
      topicGroups: [
        {
          title: "Critical information from interviews",
          items: [
            {
              title: "Priority cases",
              body: "A consolidated view of blocked and escalated issues so reps can act on urgency first.",
            },
            {
              title: "Order & product details",
              body: "Status, quantities, costs, specs, and delivery data without leaving the case.",
            },
            {
              title: "Customer & analytics",
              body: "Account history for personalization, plus metrics that expose bottlenecks and lost sales.",
            },
          ],
        },
      ],
      table: {
        ariaLabel: "Target CX metrics",
        rows: [
          {
            col1: "Time to first response",
            col2: "<15 min chat; <1 hour email; immediate phone",
          },
          {
            col1: "Average handle time",
            col2: "6\u201312 minutes",
          },
          {
            col1: "First-interaction resolution",
            col2: "\u226570\u201375%",
          },
          {
            col1: "Interaction satisfaction",
            col2: "\u226585%",
          },
          {
            col1: "Unresolved tickets",
            col2: "<10% of daily tickets",
          },
          {
            col1: "Escalation rate",
            col2: "<10%",
          },
          {
            col1: "Urgent resolution time",
            col2: "4\u20136 hours (24\u201348 hours non-urgent)",
          },
          {
            col1: "Agent capacity",
            col2: "30\u201350 tickets/day; 2\u20133 concurrent chats",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "The internal CX IA centers on a Home Screen for critical metrics, Customer Dashboard, Order Details, and Product Inventory, with supporting surfaces for history, feedback, incidents, performance, alerts, and training.",
        "Customer entry points were redesigned around Technical, Product Sales, Regulatory, and General inquiries \u2014 with support request forms that categorize and prioritize each path. Design used SAP and the Fiori Design System with offshore developers and architects; an MVP integrating critical order data shipped in one month, ahead of schedule.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/chemical-cx/product-ia.png",
          alt: "CX platform information architecture spanning home, customers, orders, products, and analytics.",
          width: 1800,
          height: 1352,
        },
      ],
      topicGroups: [
        {
          title: "Customer \u2192 CX entry points",
          items: [
            {
              title: "Technical inquiries",
              body: "Formulation help, application troubleshooting, SDS/TDS, and product recommendations.",
            },
            {
              title: "Product sales inquiries",
              body: "Pricing and how-to-buy paths that route commercial questions cleanly.",
            },
            {
              title: "Regulatory inquiries",
              body: "Compliance document requests \u2014 whether the customer knows the exact doc or needs guidance.",
            },
            {
              title: "General inquiries",
              body: "Account issues, website errors, and content access \u2014 without clogging technical queues.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from a priority-cases home screen into the order and customer work that CSRs live in every day \u2014 then inventory, comparison, and analytics that keep the network ahead of delays.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/chemical-cx/product-home.png",
            alt: "Dow CX Priority Cases home with blocked and at-risk metrics and tickets table.",
            width: 1800,
            height: 1183,
            title: "Priority cases home",
            caption:
              "Blocked and at-risk cases, ticket metrics, and delivery risk \u2014 the morning view for every CSR.",
          },
          {
            src: "/projects/chemical-cx/product-orders.png",
            alt: "Order details for BioChem Industries with delivery stepper and blocked line items.",
            width: 1800,
            height: 1183,
            title: "Order details",
            caption:
              "Status, line items, weight, cost, and delivery address in one place \u2014 with supervisor flag actions.",
          },
          {
            src: "/projects/chemical-cx/product-customer.png",
            alt: "Customer dashboard for BioChem Industries with KPIs, contacts, and orders table.",
            width: 1800,
            height: 1183,
            title: "Customer dashboard",
            caption:
              "Account-level blocked cases, ticket metrics, contacts, and in-process orders for Level 5 customers.",
          },
          {
            src: "/projects/chemical-cx/product-inventory.png",
            alt: "Product inventory levels for NUCREL acid copolymer across Americas, EMEA, and APAC.",
            width: 1800,
            height: 1183,
            title: "Product inventory",
            caption:
              "Regional stock, sales, and related tickets so agents prevent stockouts before customers feel them.",
          },
          {
            src: "/projects/chemical-cx/product-analytics.png",
            alt: "CSR analytics overview with resolved and escalated case charts and leader tables.",
            width: 1800,
            height: 1183,
            title: "Analytics",
            caption:
              "Resolved vs escalated cases, service leaders, and product blockers that drive lost deals.",
          },
        ],
        accordion: [
          {
            value: "workload-compare",
            title: "Workload & comparison",
            description:
              "Assigned customers, side-by-side comparison, and performance insights for day-to-day CX work.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/chemical-cx/product-customers.png",
                alt: "My assigned customers list with blocked and at-risk badges and contact actions.",
                width: 1800,
                height: 1183,
                title: "Assigned customers",
                caption:
                  "Thirty-two accounts with status, contacts, and email/call actions in one workload view.",
              },
              {
                src: "/projects/chemical-cx/product-comparison.png",
                alt: "Side-by-side comparison of a customer order and a product analytics panel.",
                width: 1800,
                height: 1183,
                title: "Comparison view",
                caption:
                  "Order and product context side by side \u2014 so decisions do not require another system hop.",
              },
              {
                src: "/projects/chemical-cx/product-performance.png",
                alt: "Performance insights analytics for tickets, specialists, and delayed products.",
                width: 1800,
                height: 1183,
                title: "Performance insights",
                caption:
                  "Tickets across stages, specialists, blocked orders, and financial impact from delays.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "SSO, comparison, filtering, and predictive search cut time per case. Support calls dropped by ~2 minutes, high-priority issues were addressed sooner, and databases became one source of truth \u2014 inspiring further investment, a larger team, and multiple follow-on projects.",
      ],
      stats: [
        {
          value: "~2 min",
          label: "Shorter support calls",
          detail: "Reduced time per call via SSO, comparison, and predictive search.",
        },
        {
          value: "1 month",
          label: "MVP ahead of schedule",
          detail: "Critical order data integrated with Solution Architects.",
        },
        {
          value: "Single source",
          label: "Unified CX databases",
          detail: "One source of truth across previously siloed systems.",
        },
        {
          value: "Multiple projects",
          label: "Follow-on investment",
          detail: "Leadership expanded the team after the research-to-design MVP.",
        },
      ],
    },
  ],
};
