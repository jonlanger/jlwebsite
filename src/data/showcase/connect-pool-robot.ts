import type { PastProject } from "@/data/past-projects";

const BOARD = { width: 1800, height: 1013 } as const;

export const project: PastProject = {
  slug: "connect-pool-robot-app",
  title: "Connected Pool Robot & App",
  description:
    "Connected pool robot system and companion apps for pool owners and service providers \u2014 ID, UX, and software.",
  image: "/projects/connect-pool-robot/connect-pool-robot_card.png",
  alt: "Pool robot product render beside owner app screens for cleaning progress and alerts.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Pool owners and service providers face ongoing challenges with water quality, cleaning schedules, and energy management. Pentair was well positioned to enter the connected pool robot market with smarter, integrated IoT solutions.",
      "At Accenture (Altitude), we designed an innovative connected pool robot system through ethnographic research \u2014 covering industrial design, mechanical engineering collaboration, UX, and software for a seamless automated pool management experience.",
    ],
    role: "UX Research, UI/UX/ID Concept Design, Service Design, ME Oversight",
    scope: "Connected robot hardware, owner app, service-provider fleet tools",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Pool owners and service providers still wrestle with water quality, cleaning schedules, and energy management. Connected, IoT-enabled systems let Pentair offer smarter maintenance — and open adjacent roles for equipment suppliers and technicians who integrate, support, and repair.",
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Ethnographic research and workshops with Pentair, engineers, SMEs, and potential users explored water quality, cleaning schedules, and energy management \u2014 the gaps current solutions leave open.",
        "Personas focused on Pool Owners (automated cleaning, water quality, energy savings) and Pool Service Providers (remote management, fleet coordination, predictive maintenance), with suppliers and technicians as adjacent stakeholders for integration and repair.",
      ],
      table: {
        ariaLabel: "Pool owner and service provider personas",
        rows: [
          {
            col1: "Pool Owners",
            col2: "Want hassle-free automated cleaning, water quality monitoring, and energy savings.",
          },
          {
            col1: "Pool Service Providers",
            col2: "Need remote management, fleet coordination, and predictive maintenance insights.",
          },
          {
            col1: "Suppliers & technicians",
            col2: "Integrate, support, and repair equipment across the connected ecosystem.",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "Pool Owner and Pool Service Provider applications were designed in tandem, sharing data, integrations, and assets to move quickly on the initial timeline. Hardware ID/ME work ran in parallel with UX and software so the robot and apps felt like one system.",
      ],
      table: {
        ariaLabel: "Owner and provider application surfaces",
        rows: [
          {
            col1: "Pool Owner app",
            col2:
              "Onboarding, real-time pool and robot status, supplies reordering, and service scheduling.",
          },
          {
            col1: "Service Provider app",
            col2:
              "Customer and pool data management, scheduling, device connection, and fleet operations.",
          },
          {
            col1: "Shared foundation",
            col2:
              "Common data, integrations, and assets across both apps for a faster initial build.",
          },
        ],
      },
    },
    {
      title: "Product",
      paragraphs: [
        "The owner journey runs from first open through a living pool dashboard — then the service-provider app mirrors that system for multi-customer fleets.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/connect-pool-robot/product-onboarding-v2.png",
            alt: "Owner onboarding from login through empty home and loading state.",
            ...BOARD,
            title: "Onboarding",
            caption:
              "Sign in and land on an empty home — the starting point before any pool or robot is connected.",
          },
          {
            src: "/projects/connect-pool-robot/product-onboarding-pool-v2.png",
            alt: "Add pool information screen plus top and bottom halves of the pool dimensions form.",
            ...BOARD,
            title: "Pool setup",
            caption:
              "Add pool type and dimensions so cleaning paths, chemical guidance, and scheduling fit the site.",
          },
          {
            src: "/projects/connect-pool-robot/product-connect.png",
            alt: "Connect-device flow from product picker through robot detail to QR scan.",
            ...BOARD,
            title: "Connect the robot",
            caption:
              "Browse Pentair devices, select the pool robot, and choose QR scan or manual entry.",
          },
          {
            src: "/projects/connect-pool-robot/product-connect-pair.png",
            alt: "QR scan detail, connecting state, and successful robot activation.",
            ...BOARD,
            title: "Pair & activate",
            caption:
              "Scan the code on the robot, wait for connection, and confirm successful activation.",
          },
          {
            src: "/projects/connect-pool-robot/product-status.png",
            alt: "Owner app status screens for ready, action required, and heat caution.",
            ...BOARD,
            title: "Day-to-day status",
            caption:
              "One home surface for robot readiness, chemistry alerts, heat caution, and supply updates.",
          },
          {
            src: "/projects/connect-pool-robot/product-status-cleaning.png",
            alt: "Owner app screens for cleaning in progress and detailed pool status.",
            ...BOARD,
            title: "Cleaning in progress",
            caption:
              "Live progress and remaining time, with follow-ups like emptying the waste bin when the job finishes.",
          },
          {
            src: "/projects/connect-pool-robot/product-provider.png",
            alt: "Service provider home, customers, and devices screens.",
            ...BOARD,
            title: "Service provider",
            caption:
              "The same connected system for technicians — customers, pools, and devices across a territory.",
          },
        ],
        accordion: [
          {
            value: "owner-ops",
            title: "Supplies & scheduling",
            description:
              "Reorder chemicals and book maintenance without leaving the owner app.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/connect-pool-robot/product-supplies.png",
                alt: "Order supplies catalog and product detail screens.",
                ...BOARD,
                title: "Supplies",
                caption:
                  "Reorder chemicals and equipment with usage and seasonality suggestions.",
              },
              {
                src: "/projects/connect-pool-robot/product-supplies-success.png",
                alt: "Supplies home and order success confirmation screens.",
                ...BOARD,
                title: "Order confirmed",
                caption: "Checkout confirmation after a supplies reorder.",
              },
              {
                src: "/projects/connect-pool-robot/product-scheduling.png",
                alt: "Service booking flow from pool services list through manage booking.",
                ...BOARD,
                title: "Scheduling",
                caption:
                  "Book maintenance with calendar sync and appointment management.",
              },
              {
                src: "/projects/connect-pool-robot/product-scheduling-success.png",
                alt: "Booking screen and booking success confirmation.",
                ...BOARD,
                title: "Booking confirmed",
                caption: "Appointment confirmation after scheduling a service visit.",
              },
            ],
          },
          {
            value: "fleet",
            title: "Fleet & field ops",
            description:
              "Multi-pool cleaning status and service tools for providers in the field.",
            slides: [
              {
                src: "/projects/connect-pool-robot/product-fleet.png",
                alt: "Provider fleet views for in-progress cleaning list and grid plus pool services.",
                ...BOARD,
                title: "Fleet status",
                caption:
                  "List and grid views of in-progress cleans across customer pools.",
              },
              {
                src: "/projects/connect-pool-robot/product-provider-ops.png",
                alt: "Provider inventory and add-pool setup screens.",
                ...BOARD,
                title: "Inventory & setup",
                caption:
                  "Track inventory and onboard new pool sites for customers.",
              },
            ],
          },
          {
            value: "robot-detail",
            title: "Robot detail",
            description:
              "Front, three-quarter, rear, QR pairing surface, and labeled CMF callouts from industrial design.",
            slides: [
              {
                src: "/projects/connect-pool-robot/product-robot-front.png",
                alt: "Front view of the pool cleaning robot with blue scrubbers.",
                ...BOARD,
                title: "Front",
                caption: "Dual scrubbers and sensor strip across the leading edge.",
              },
              {
                src: "/projects/connect-pool-robot/product-robot-three-quarter.png",
                alt: "Three-quarter studio render of the pool cleaning robot.",
                ...BOARD,
                title: "Three-quarter",
                caption: "Light CMF — white and grey body with blue functional accents.",
              },
              {
                src: "/projects/connect-pool-robot/product-robot-back.png",
                alt: "Rear three-quarter view of the pool cleaning robot.",
                ...BOARD,
                title: "Rear",
                caption: "Debris-bin access and battery pack from the trailing side.",
              },
              {
                src: "/projects/connect-pool-robot/product-robot-qr.png",
                alt: "Pool robot underside with Scan Me QR code for app pairing.",
                ...BOARD,
                title: "QR pairing",
                caption:
                  "QR on the robot body so owners and technicians can connect without digging through manuals.",
              },
              {
                src: "/projects/connect-pool-robot/product-robot-callouts.png",
                alt: "Labeled industrial design callouts for sensors, debris window, battery, and wheels.",
                ...BOARD,
                title: "CMF callouts",
                caption:
                  "Camera sensors, scrubbers, debris window, battery, and wheels — designed with ME in the loop.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Launch of Pentair\u2019s connected systems drove internal culture change around innovation, tens of millions in product and subscription revenue, faster cleaning and management, and sensor data that improves performance, reliability, and sales.",
      ],
      stats: [
        {
          value: "Tens of millions",
          label: "Product & subscription revenue",
          detail: "Connected systems launch impact.",
        },
        {
          value: "Faster cleaning",
          label: "Automation & efficiency",
          detail: "Pool cleaning and management sped up.",
        },
        {
          value: "Sensor data",
          label: "Performance insights",
          detail: "Reliability and sales informed by robot telemetry.",
        },
        {
          value: "Culture change",
          label: "Innovation processes",
          detail: "Internal shift from Connected Systems launch.",
        },
      ],
    },
  ],
};
