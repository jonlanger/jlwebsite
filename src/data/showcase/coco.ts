import {
  COCO_COLLECTOR_JOURNEY_COLUMNS,
  COCO_CUSTOMER_JOURNEY_COLUMNS,
  COCO_DRIVER_JOURNEY_COLUMNS,
  COCO_FLEET_MANAGER_JOURNEY_COLUMNS,
} from "@/data/coco-journey-maps";
import type { PastProject, ProjectCarouselSlide } from "@/data/past-projects";

const APP = "https://collabcollect.vercel.app";

/** A 1800×1125 screen from the live app, in /projects/coco. */
const screen = (
  file: string,
  title: string,
  caption: string,
  alt: string
): ProjectCarouselSlide => ({
  src: `/projects/coco/${file}.webp`,
  alt,
  width: 1800,
  height: 1125,
  title,
  caption,
});

export const project: PastProject = {
  slug: "coco",
  category: "software",
  title: "Coco",
  description:
    "A connected waste-collection platform: four role-specific apps for customers, drivers, collectors and fleet managers, all on one live data layer.",
  image: "/projects/coco/coco_card.webp",
  alt: "CoCo homepage: Every pickup, connected, beside a live route map of Truck 0091 in Back Bay with a pickup request and a re-optimized route.",
  width: 1280,
  height: 720,
  liveUrl: `${APP}/`,
  liveLinks: [
    { label: "Customer app", href: `${APP}/customer/` },
    { label: "Driver app", href: `${APP}/driver/` },
    { label: "Collector app", href: `${APP}/collector/` },
    { label: "Fleet dashboard", href: `${APP}/fleet/` },
  ],
  overview: {
    title: "Overview",
    paragraphs: [
      "Waste management companies running mixed fleets (trash compactors, recycling vehicles, specialty collection) have no unified way to track assets, coordinate crews or talk to customers in real time. Dispatch lives in one system, routes in a spreadsheet, and problems arrive by phone call.",
      "CoCo gives each of the four people around a pickup their own app: customers, drivers, collectors and fleet managers. All four read and write the same live records, so a scan on the street updates the customer’s tracker and the fleet dashboard in the same second. It started as research, journey maps and a Figma system, and is now a working product you can open in any role.",
    ],
    role: "UX Research, Product Design, Interaction Design, Service Design, Design System, Front-end Build",
    scope:
      "Marketing homepage, sign-in hub, four role apps (customer portal, in-cab driver navigation, collector field app, fleet operations), a self-hosted map and routing layer, and a live design-system reference. iOS, Android, in-cab tablet and web.",
  },
  sections: [
    {
      title: "Research",
      paragraphs: [
        "Understanding this problem meant getting close to the physical environment, not just the software. Route pressure, confined spaces, hazardous materials and inconsistent pickup locations all shape how people behave in the field. That complexity had to be designed for, not designed around.",
        "Four primary user groups came out of the research, each touching the same pickup from a different place: a couch, a cab, a curb and a desk.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/coco_system_sketch.png",
          alt: "Early system sketch for Coco: field context, user roles, and service touchpoints.",
          width: 2388,
          height: 1668,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/coco/diagram-personas.webp",
          alt: "Four roles, one pickup. Meredith, the customer, uses the light customer portal on her phone and wants to know when the crew is coming and proof it was done; the app opens on today’s pickup and a live tracker. Stan, the driver, is in a moving cab and wants one instruction at a time; the in-cab app opens on the next turn and one primary button in field dark mode. Miguel, the collector, is at the curb and wants the right bin with compliance proven; the field app opens on the next stop and a scan button. Lucas, the fleet manager, wants tomorrow’s risk before it lands; fleet operations opens on what needs a decision, on a live map.",
          width: 2400,
          height: 1185,
        },
      ],
      topicGroups: [
        {
          title: "Findings",
          items: [
            {
              title: "Silence is the failure",
              body: "Customers don’t leave because of a missed pickup. They leave because nobody told them about it.",
            },
            {
              title: "Driving and collecting happen at once",
              body: "Navigation and collection aren’t sequential tasks, so the driver and collector need to see each other’s progress.",
            },
            {
              title: "Managers drown in data",
              body: "Fleet managers need risk and compliance surfaced first, not another dashboard of totals.",
            },
          ],
        },
      ],
      table: {
        ariaLabel: "User groups and needs from research",
        rows: [
          {
            col1: "Customers",
            col2: "Want transparency: when their pickup is coming, and that it was completed correctly.",
          },
          {
            col1: "Collectors",
            col2: "Need in-the-moment guidance: the right items, from the right location, with confirmation that compliance was met.",
          },
          {
            col1: "Drivers",
            col2: "Are managing safety, time and coordination at once. The interface has to work while they’re moving.",
          },
          {
            col1: "Fleet managers",
            col2: "Are responsible for all of the above. Their tool is a command surface, not a task list.",
          },
        ],
      },
    },
    {
      title: "Journey Mapping",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Mapping the full system across all four user types showed that friction rarely lives in the middle of a journey. It clusters at the edges, where hand-offs happen and communication breaks down.",
        },
        {
          type: "journeyAccordion",
          value: "customer",
          title: "Customer Journey Map",
          defaultOpen: true,
          tableAriaLabel: "Customer journey map, six stages",
          columns: COCO_CUSTOMER_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "Most service failures happen at Problem Discovery and Tracking, the moments before and after the core transaction. That insight shaped the notification architecture: every status change in the field reaches the customer without anyone picking up a phone.",
        },
        {
          type: "journeyAccordion",
          value: "fleet-manager",
          title: "Fleet Manager Journey Map",
          tableAriaLabel: "Fleet manager journey map, six stages",
          columns: COCO_FLEET_MANAGER_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "The fleet manager journey exposed a different kind of friction: too much data, not enough signal. Surfacing risk and compliance without burying managers in dashboards became the central challenge for the operations view.",
        },
        {
          type: "paragraph",
          text: "The driver and collector maps showed that navigation and collection happen at the same time. That shaped how the two field apps mirror each other’s progress at every stop.",
        },
        {
          type: "journeyAccordion",
          value: "driver",
          title: "Driver Journey Map",
          tableAriaLabel: "Driver journey map, six stages",
          columns: COCO_DRIVER_JOURNEY_COLUMNS,
        },
        {
          type: "journeyAccordion",
          value: "collector",
          title: "Collector Journey Map",
          tableAriaLabel: "Collector journey map, six stages",
          columns: COCO_COLLECTOR_JOURNEY_COLUMNS,
        },
      ],
    },
    {
      title: "User Flows",
      paragraphs: [
        "Each role got its own flow, mapped from first run through a working day. The complexity of the system lives in these flows and in the hand-offs between them, so every diagram marks where another role’s action arrives through the shared data layer.",
        "Customer. Onboarding asks only what’s needed to start service: an account, an address, a service and a payment. After that the app is one loop (request, track, confirm) and everything else is a tab away. The tracker is driven by the crew’s real progress, and when something goes wrong the customer is told before they think to call.",
        "Driver. The day has three phases: a pre-trip check and route briefing, a loop through every stop, and a tip run and shift report at the end. Each screen has one instruction and one primary action, and the collector’s progress at the bin shows up without a word typed.",
        "Collector. Compliance happens inside the pickup, not in a report afterwards. Each stop is scan, four checks and a photo; a problem becomes a fleet incident and a customer notice in the same flow.",
        "Fleet manager. The app opens on what needs a decision, not on totals. Each workflow (incidents, customer requests, the map and maintenance) ends in the crew or customer apps, so the decision is also the message.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/coco/flow-customer.webp",
          alt: "Customer user flow. First run: welcome, create your account, where do we pick up, choose your service, payment, you’re all set. Request: home, how often and what is it, a photo for a size and weight estimate, when works, confirm, then fleet approves and assigns a truck. Track: scheduled, N stops away with an ETA once the driver acknowledges the route, you’re next, crew is here as the bin is scanned, all done with photo proof from the collector, then rate the pickup. If it goes wrong: the collector flags a problem, the tracker says we hit a snag, the fleet playbook reschedules or credits, and the customer gets a new time or a $12 credit. A tab away: pickups and history, recycling guide, account, payments, notifications, preferences and support.",
          width: 2400,
          height: 1133,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/coco/flow-driver.webp",
          alt: "Driver user flow in field dark mode. Start of shift: tap badge and pick the truck, six-point pre-trip inspection, today’s route briefing, closures and notices from fleet dispatch, start route. Every stop, repeated for all 12: next turn and stop, Arrived at stop (the collector sees Truck is at stop), the crew tracker moves through arrived, scanned and checks done, and the route moves on. End of shift: tip run to the transfer station, end of shift report, and the shift report appears on the fleet truck page. If it goes wrong: a failed pre-trip item goes to fleet, a closure drawn on the fleet map replans the route, and Report a problem opens a fleet incident. A tab away: stops, crew channel, truck and breaks.",
          width: 2400,
          height: 1080,
        },
        {
          afterParagraphIndex: 3,
          src: "/projects/coco/flow-collector.webp",
          alt: "Collector user flow in field dark mode. First run: personal information, compliance and safety, collection info, field ready. Every stop, repeated for all 12: the queue shows the next stop and Scan bin, the driver’s arrival shows Truck is at stop 6, the customer profile lists key items and history, scan the barcode, four checks and a photo, pickup complete with 10 points and the customer notified. If it goes wrong: something’s wrong, pick the problem (contaminated, hazardous, overweight, bin not out, blocked, damaged), flag and notify, and an incident opens for fleet and the customer. A tab away: crew channel and my performance.",
          width: 2400,
          height: 1026,
        },
        {
          afterParagraphIndex: 4,
          src: "/projects/coco/flow-fleet.webp",
          alt: "Fleet manager user flow. Start of day: overview with KPIs and a live map, a ranked Needs a decision list, pick the top item. Incidents: reported by a collector, driver or telematics; acknowledge and set an owner; run a playbook step; the crew and customer apps react; resolved and logged with a timeline. Pickups: a customer request lands, assign a truck, the customer sees Pickup approved. Map and maintenance: draw an area such as a closure or hazard, routes replan and crews are alerted; maintenance ranked by risk, book the shop. A tab away: fleet table, truck detail, compliance and recertification.",
          width: 2400,
          height: 1106,
        },
      ],
    },
    {
      title: "Test",
      paragraphs: [
        "Feature priorities were validated with all four groups through structured ranking exercises. The results confirmed some assumptions and challenged others.",
        "Pickup Tracking and Notifications ranked first for every field-facing role (customers, collectors and drivers) but fell to the middle of the list for fleet managers, who put Fleet Maintenance Scheduling and Compliance Management above everything else. Field users want to know what’s happening right now; managers want to know what’s at risk tomorrow. That split decided what each app opens on.",
      ],
      featureRankingChartsAfterParagraphIndex: 0,
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/coco/diagram-priorities.webp",
          alt: "From research to layout: field teams need now, managers need tomorrow. Customers, collectors and drivers each ranked pickup tracking and notifications first, so their apps lead with status: the customer home opens on today’s pickup, the collector queue on the next stop and a scan button, and the driver on the next turn and Arrived at stop. Fleet managers ranked fleet maintenance scheduling, compliance and route planning highest, so the fleet overview opens on what needs a decision, risk first.",
          width: 2400,
          height: 1127,
        },
      ],
    },
    {
      title: "How It Works",
      paragraphs: [
        "A pickup is one record that four people act on in turn. The customer requests it, the fleet manager approves it, the driver arrives and the collector scans, checks and photographs it. Each action changes the shared record, and every other app reacts straight away.",
        "Exceptions follow the same path. When a collector flags a problem, an incident opens in the fleet app with a response playbook. Each step does real work: it contacts the customer, reschedules, applies a credit, sends the crew back or draws a closure on the map, and the crew and customer apps respond.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/coco/diagram-handoffs.webp",
          alt: "One pickup, four perspectives, one store. Seven steps across four role lanes and a shared-store lane: the customer requests a pickup with a photo estimate; the fleet manager approves and assigns Truck 0091; the driver does a pre-trip check and acknowledges the route; the driver taps Arrived at stop and the collector sees Truck is at stop 6; the collector scans the bin barcode; the collector completes four checks and photo proof; the stop completes, the customer sees All done with photo proof and the driver’s navigation moves on. Below, when the collector flags a problem, an incident opens in Fleet, a playbook reschedules, credits or sends the crew back, and the customer is told before they call.",
          width: 2400,
          height: 1257,
        },
      ],
      stats: [
        { value: "4", label: "Role apps", detail: "Customer, driver, collector and fleet." },
        { value: "1", label: "Shared record", detail: "Every hand-off goes through the same store." },
        { value: "7", label: "Steps per pickup", detail: "Request to photo proof, visible to all." },
        { value: "12", label: "Stops on the demo route", detail: "Real Back Bay addresses, on real streets." },
      ],
    },
    {
      title: "Architecture",
      paragraphs: [
        "CoCo is plain HTML, CSS and ES modules with no build step and no back end to run. One platform shell hosts every role: routing, the phone tab bar or desktop sidebar, the app switcher and accessibility settings. One store holds every record and syncs across browser tabs, so the customer and the collector can run side by side and react to each other.",
        "The maps are self-hosted. The fleet map and driver navigation use MapLibre with a Protomaps extract of Boston in one static file, and a road graph from the same tiles powers street routing in the browser, with one-way streets, closures and real turn names.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/coco/diagram-architecture.webp",
          alt: "Architecture. Surfaces: homepage and sign-in hub, customer portal, driver in-cab app, collector field app and fleet operations. They run in one platform shell (hash routing and layout, accessibility and display settings, design-system tokens), which reads and writes a shared store in localStorage synced across tabs, a self-hosted MapLibre basemap from a Protomaps extract of Boston, and street routing in the browser on a road graph from the same tiles. When fleet draws a closure, the store saves it, the driver’s route replans and both crew apps get a dispatch alert.",
          width: 2400,
          height: 1356,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            {
              title: "Status first",
              body: "Every screen answers “what’s happening right now?” before anything else, with one status vocabulary across all four apps.",
            },
            {
              title: "Built for the field",
              body: "Gloves, glare, vibration and a moving truck. Field screens get 56px targets, one primary action and glanceable type.",
            },
            {
              title: "Progressive by default",
              body: "Ask only what’s needed to start service. Secondary features stay reachable but never compete with the core loop.",
            },
          ],
        },
      ],
    },
    {
      title: "Design System",
      paragraphs: [
        "The design language was first built in Figma alongside the high-fidelity screens, with a 3D asset library that grounds the brand in the real vehicles, bins and equipment crews use every day.",
        "For the live build it became one system with two modes: a calm light mode for customers and managers, and a high-contrast field mode for drivers and collectors. Semantic tokens flip between the two, and components never reference raw colors. A live reference page renders the real CSS, so it can’t drift from the product.",
      ],
      topicGroups: [
        {
          title: "v1 → v2 refinements",
          items: [
            {
              title: "Accessible fills",
              body: "Primary blue moved from #007AFF to #006FE6 and error red from #F24E1E to #D93A0B, so button labels pass WCAG AA.",
            },
            {
              title: "Status chips by meaning",
              body: "Solid, soft and outline chips map to urgency, one vocabulary for every role instead of decorative tiers.",
            },
            {
              title: "Field mode, not inverted",
              body: "Dark mode became its own token set for the cab: larger targets, lighter accents and border elevation.",
            },
            {
              title: "Blue for one fact",
              body: "Big blue type is reserved for the key fact on a screen, so “55 ft until bin” stands out.",
            },
          ],
        },
      ],
      stats: [
        { value: "2", label: "Modes", detail: "Light, and field dark for the cab." },
        { value: "56px", label: "Field targets", detail: "Full-width in the thumb zone." },
        { value: "4.75:1", label: "Primary contrast", detail: "White on the interactive blue." },
        { value: "125%", label: "Largest text", detail: "Plus high contrast and reduced motion." },
      ],
      productShowcase: {
        slides: [
          screen(
            "ds-intro",
            "Live reference",
            "One language, two modes.",
            "CoCo Design System v2: one language, two modes, with principles for status first, built for the field, one system for many contexts, and progressive by default."
          ),
          screen(
            "ds-color",
            "Color",
            "Primitives, semantic tokens, component usage.",
            "Color scales: brand blue from blue-50 to blue-900 with contrast ratios, and green, yellow and red status hues."
          ),
          screen(
            "ds-status",
            "Status system",
            "Every state maps to one chip, used by every role.",
            "Status system table: scheduled, crew on route, ready for pickup, pickup complete, in compliance, schedule risk, delayed and needs attention, each with its chip and the roles who see it."
          ),
          screen(
            "ds-type",
            "Typography",
            "Plus Jakarta Sans, tabular numbers.",
            "Type scale in Plus Jakarta Sans from display down to eyebrow, with a field accent style for 55 ft until Bin Collection Point."
          ),
          screen(
            "ds-buttons",
            "Buttons and chips",
            "Every component in light and field dark.",
            "Buttons in light and field dark side by side, including the full-width Arrived at stop field button, and status chips."
          ),
          screen(
            "ds-cards",
            "Cards and forms",
            "Hero cards carry the current status.",
            "Cards and metrics in light and field dark: a today’s pickup hero card, truck and compliance metrics, and a brand card, then form controls."
          ),
          screen(
            "ds-tracker",
            "Progress tracker",
            "The timeline behind every status.",
            "The progress tracker, CoCo’s signature timeline, in light and field dark: pickup scheduled, truck nearby, issue flagged, collected."
          ),
          screen(
            "ds-field",
            "Field mode rules",
            "More than a dark theme.",
            "Field mode rules: one instruction and one action, 56px minimum targets, glare-safe accents and talk, don’t type."
          ),
          screen(
            "ds-changelog",
            "v1 → v2",
            "What changed from the Figma sheet, and why.",
            "Table of v1 to v2 refinements: primary and error fills, status chips, dark mode, menu button, headlines and the fleet dashboard."
          ),
        ],
      },
    },
    {
      title: "First Concept",
      paragraphs: [
        "The first round of high-fidelity screens, designed in Figma, set the pickup loop, the field mode and the fleet dashboard hierarchy. The live build kept that structure and refined it: accessible colors, one status vocabulary, and a fleet view that works on a phone before it reaches a desk.",
      ],
      productShowcase: {
        slides: [],
        accordion: [
          {
            value: "v1",
            title: "First concept screens",
            description: "Ten Figma boards across all four roles, before the live build.",
            slides: [
              {
                src: "/projects/coco/v1-customer-splash.webp",
                alt: "First concept customer screens: splash and welcome, with the 3D truck brand imagery.",
                width: 1920,
                height: 1080,
                title: "Customer · Splash",
                caption: "The brand and a first welcome.",
              },
              {
                src: "/projects/coco/v1-customer-screens.webp",
                alt: "First concept customer screens for scheduling and tracking a pickup.",
                width: 1920,
                height: 1080,
                title: "Customer · Schedule and track",
                caption: "The pickup loop at the center.",
              },
              {
                src: "/projects/coco/v1-customer-request.webp",
                alt: "First concept customer flow for a new pickup request.",
                width: 1920,
                height: 1080,
                title: "Customer · New request",
                caption: "A progressive request, location to confirmation.",
              },
              {
                src: "/projects/coco/v1-driver-dashboard.webp",
                alt: "First concept driver dashboard in dark mode on an in-cab tablet.",
                width: 1920,
                height: 1080,
                title: "Driver · Dashboard",
                caption: "Route, dispatch, fuel and incidents.",
              },
              {
                src: "/projects/coco/v1-driver-route.webp",
                alt: "First concept driver route map and stop list screens.",
                width: 1920,
                height: 1080,
                title: "Driver · Route and list",
                caption: "Navigation and the stop list.",
              },
              {
                src: "/projects/coco/v1-driver-onboarding.webp",
                alt: "First concept driver onboarding: vehicle, certifications, work authorization and background check consent.",
                width: 1920,
                height: 1080,
                title: "Driver · Onboarding",
                caption: "Compliance-heavy by necessity.",
              },
              {
                src: "/projects/coco/v1-collector-onboarding.webp",
                alt: "First concept collector onboarding screens.",
                width: 1920,
                height: 1080,
                title: "Collector · Onboarding",
                caption: "Personal, compliance and collection info.",
              },
              {
                src: "/projects/coco/v1-collector-features.webp",
                alt: "First concept collector screens: collection queue, barcode capture and customer profile.",
                width: 1920,
                height: 1080,
                title: "Collector · Field screens",
                caption: "Queue, barcode capture and customer profile.",
              },
              {
                src: "/projects/coco/v1-fleet-collection.webp",
                alt: "First concept fleet manager collection overview screens on desktop.",
                width: 1920,
                height: 1080,
                title: "Fleet · Collection overview",
                caption: "Scheduled customers by route.",
              },
              {
                src: "/projects/coco/v1-fleet-overview.webp",
                alt: "First concept fleet manager fleet overview screens on desktop.",
                width: 1920,
                height: 1080,
                title: "Fleet · Fleet overview",
                caption: "A desktop-only table, later made mobile.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Product",
      paragraphs: [
        "The homepage tells the story of one pickup across four perspectives, and every role app is live. Each is designed at phone width first and widens into a sidebar layout on tablets and desktops. Every screen below is from the working product.",
      ],
      productShowcase: {
        slides: [
          screen(
            "site-hero",
            "The premise",
            "Every pickup, connected.",
            "CoCo homepage hero: Every pickup, connected, with a live route map of Truck 0091 in Back Bay."
          ),
          screen(
            "customer-track",
            "Customer · Track",
            "Stops away, from the crew’s real progress.",
            "Customer tracking: a street map of the crew’s route and a timeline showing pickup scheduled, crew on route and truck nearby, with You’re next and a checklist for before the truck arrives."
          ),
          screen(
            "driver-drive",
            "Driver · Navigation",
            "One instruction, one action.",
            "Driver in-cab navigation in field dark mode: turn left onto Berkeley St in 250 ft, a Boylston St closure warning, a heading-up map, and a docked panel for 185 Antonino St with Arrived at stop."
          ),
          screen(
            "collector-queue",
            "Collector · Queue",
            "The next stop and one scan button.",
            "Collector queue in field dark: truck is at stop 6, next stop 24 Commonwealth Ave with a Scan bin button, a road closure notice and the full collection queue."
          ),
          screen(
            "collector-scan",
            "Collector · Scan",
            "Right bin, right address.",
            "Collector barcode scan: a bin lid barcode inside the viewfinder, verified as CC-204913 for Meredith Ferntov at 24 Commonwealth Ave."
          ),
          screen(
            "fleet-overview",
            "Fleet · Operations",
            "Risk first, on a live map of Boston.",
            "Fleet operations overview: pickups done, trucks on schedule, open incidents and fuel spend, a live operations map of Boston territories colored by status, and a Needs a decision list."
          ),
          screen(
            "fleet-incident",
            "Fleet · Incident",
            "A playbook where every step does real work.",
            "Fleet incident: brake service overdue on Truck 0047, with acknowledge and owner controls, a response playbook (pull truck, dispatch a spare, book the shop, update customers) and a location map."
          ),
          screen(
            "customer-track-done",
            "Customer · Complete",
            "Photo proof ends the “did they even come?” call.",
            "Customer tracker showing All done with the collector’s photo proof at 5:20 PM, chips for standard bin, in compliance and 3 bulk bags, and a rating prompt."
          ),
          {
            src: "/projects/coco/mobile.webp",
            alt: "Four phone screens, one per role: the customer tracker, the driver’s turn-by-turn navigation, the collector’s compliance checklist and the fleet operations overview.",
            width: 2372,
            height: 1260,
            title: "On a phone",
            caption: "Every app is designed at 375px first.",
          },
        ],
        accordion: [
          {
            value: "site",
            title: "Homepage",
            description: "One pickup, four perspectives, and a door into every app.",
            defaultOpen: true,
            slides: [
              screen(
                "site-platform",
                "The platform",
                "One data layer. Four apps. Zero blind spots.",
                "Homepage platform section: one data layer, four apps, zero blind spots, with a live data layer hub connecting customers, drivers, collectors and fleet managers."
              ),
              screen(
                "site-story",
                "How it works",
                "Book a pickup in under two minutes.",
                "Homepage story: One pickup, four perspectives, step one Request, with the customer app’s confirm pickup request screen."
              ),
              screen(
                "site-outcomes",
                "By design",
                "What the prototype does, not projected results.",
                "Homepage by design section: no more “did they even come?”. One photo required before a collector can close a stop and sent to the customer, four compliance checks built into the pickup flow, one to two stops of notice before the crew reaches the bin, and five steps to request a pickup. A note says CoCo is a concept with no measured results yet."
              ),
              screen(
                "site-features",
                "Features",
                "Everything a pickup touches.",
                "Homepage features grid: live tracking, barcode bin verification, compliance built in, maintenance before breakdowns and talk, don’t type."
              ),
              screen(
                "site-roles",
                "Built for every seat",
                "One app per role, each live.",
                "Homepage solutions: cards for customers, drivers, collectors and fleet managers, each with its devices and an Open app button."
              ),
              screen(
                "site-research",
                "Designed from research",
                "The ranking study, on the homepage.",
                "Homepage research section: field teams need now, managers need tomorrow, with the rank of pickup tracking per role."
              ),
              screen(
                "site-login",
                "Sign-in hub",
                "Customers by email; crews by badge.",
                "Sign-in hub: welcome back with an email field for customers, and rows for driver, collector and fleet operations sign-in."
              ),
            ],
          },
          {
            value: "customer",
            title: "Customer portal",
            description: "Request, track, confirm. Light mode, any device.",
            slides: [
              screen("customer-welcome", "Welcome", "Combination Collection Services.", "Customer welcome screen on brand blue with a 3D garbage truck, Let’s get started and Sign in."),
              screen("customer-home", "Home", "Today’s pickup comes first.", "Customer home for Meredith: today’s pickup 9 to 11 AM, quick actions, what’s coming up, a recycling tip and 142 lbs diverted this year."),
              screen("customer-request-type", "Request · How often", "One-time or recurring.", "Request a pickup, step one: choose a one-time or recurring pickup."),
              screen("customer-request-photo", "Request · Photo estimate", "A photo sizes the job.", "Request step three: a photo of bags by the garage, estimated at 3 bags and about 35 lbs, fits a standard pickup."),
              screen("customer-request-confirm", "Request · Confirm", "Address, window and price.", "Confirm pickup request: default address, one-time pickup, date, general home trash, 7 to 11 AM, and an $18 total."),
              screen("customer-track-here", "Track · Crew is here", "Mirrors the collector at the bin.", "Customer tracker showing Crew is here, with the collected step in progress as the bin is scanned."),
              screen("customer-pickups", "Pickups", "Upcoming and history.", "Pickups list: today’s pickup with truck nearby, next Monday’s pickup and a weekly recurring plan with Skip next."),
              screen("customer-guide", "Recycling guide", "What goes where.", "Recycling guide with a search box and what can and can’t go in recycling, trash, yard waste and hazardous."),
            ],
          },
          {
            value: "driver",
            title: "Driver · in-cab",
            description: "Field dark mode, glanceable from a moving cab.",
            slides: [
              screen("driver-login", "Start your shift", "Tap a badge, pick the truck.", "Driver sign-in over a cab interior: badge ID, vehicle Truck 0091 and Tap badge to sign in."),
              screen("driver-pretrip", "Pre-trip inspection", "Failures go straight to fleet.", "Pre-trip inspection checklist: brakes, lights, hydraulics, tires, mirrors and fuel."),
              {
                src: "/projects/coco/driver-mobile.webp",
                alt: "Two phone screens: the route briefing with 12 stops, 1h 07m planned, 3.9 miles, the Boylston St closure and a dispatch note, and turn-by-turn navigation.",
                width: 1236,
                height: 1260,
                title: "Route briefing",
                caption: "Closures and dispatch before the first turn.",
              },
              screen("driver-stops", "Stops", "The whole route at a glance.", "Driver stop list: twelve stops with completed times, the current stop 185 Antonino St marked Next."),
              screen("driver-stops-at-stop", "Mid-route", "Progress fills as the crew goes.", "Driver stop list mid-route: five stops done with times, and 24 Commonwealth Ave, Meredith’s pickup with 3 bulk bags, next."),
              screen("driver-messages", "Crew channel", "Quick replies over typing.", "Crew channel between dispatch, driver and collector, with quick replies: pulling up now, hold for traffic, ready to roll, need a hand at the arm."),
              screen("driver-vehicle", "Truck and breaks", "Health, load and drive time.", "Truck 0091: fuel, load, hydraulics and drive time, a break due in 45 minutes and upcoming maintenance."),
              screen("driver-shift", "End of shift", "Today versus plan.", "End of shift report: stops, route time, distance and tonnage against plan, a post-trip inspection and notes for the fleet manager."),
            ],
          },
          {
            value: "collector",
            title: "Collector · field",
            description: "Scan, verify, flag. Built for one free hand.",
            slides: [
              screen("collector-onboard", "Onboarding", "Only what’s needed to start.", "Collector onboarding step one: photo, name, employee ID and emergency contact."),
              screen("collector-stop", "Customer profile", "Key items, notes and history.", "Stop profile for 24 Commonwealth Ave: key items (standard bin, tagged, and a bulk add-on with the customer’s photo), gate code note and pickup history."),
              screen("collector-confirm", "Compliance", "Four checks and photo proof.", "Confirm pickup: bin scanned, a four-item compliance checklist, photo proof sent to the customer and estimated weight."),
              screen("collector-problem", "Problem items", "Flags open an incident in fleet.", "Problem items: contaminated recycling, hazardous item, overweight, bin not out, blocked access and damaged bin, with notes and a photo."),
              screen("collector-me", "Performance", "Rewards for compliant pickups.", "Collector performance: 1,280 reward points, pickups today, 99% compliance, days incident-free, stop time and certifications."),
            ],
          },
          {
            value: "fleet",
            title: "Fleet operations",
            description: "Risk before numbers, on any device.",
            slides: [
              screen("fleet-table", "Fleet", "Every truck, schedule and compliance.", "Fleet table: twelve trucks with territory, location, schedule status, driver, collector, stops made and left, and compliance."),
              screen("fleet-truck", "Truck detail", "Live location, crew and activity.", "Truck 0091 detail: live map at 9 Berkeley St, crew with call buttons, fuel, load and next service, and an activity log."),
              screen("fleet-pickups", "Scheduled customers", "Approve requests, follow routes.", "Scheduled customers: completed today, issues flagged, requests to approve, and the Truck 0091 Back Bay route with each customer’s status."),
              screen("fleet-maintenance", "Maintenance", "Ranked by risk, bookable in one tap.", "Maintenance: overdue and due-soon service across the fleet, each with a progress bar and a Schedule button."),
              screen("fleet-compliance", "Compliance and safety", "Incidents, certifications, SOP health.", "Compliance and safety: active incidents, resolved today, fleet compliance 96.4% and days since injury, with the incident list."),
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "CoCo turns a set of research artifacts and Figma screens into a working product. One pickup is visible to everyone who touches it, field crews get tools built for gloves and glare, and managers see tomorrow’s risk first. Every app is live, and they update each other in real time.",
      ],
      stats: [
        { value: "4", label: "Live role apps", detail: "Plus a homepage and a sign-in hub." },
        { value: "1", label: "Data layer", detail: "Synced across apps and tabs." },
        { value: "320–1440", label: "Pixel range", detail: "Phone first, sidebar from 900px." },
        { value: "0", label: "API keys", detail: "Self-hosted map tiles and routing." },
      ],
    },
  ],
};
