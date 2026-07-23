import { COCO_IMPLEMENT_TABS } from "@/data/coco-implement-tabs";
import { COCO_USER_FLOW_TABS } from "@/data/coco-user-flows";
import {
  COCO_COLLECTOR_JOURNEY_COLUMNS,
  COCO_CUSTOMER_JOURNEY_COLUMNS,
  COCO_DRIVER_JOURNEY_COLUMNS,
  COCO_FLEET_MANAGER_JOURNEY_COLUMNS,
  type CocoJourneyMapColumns,
} from "@/data/coco-journey-maps";
import { AUREUM_IMPLEMENT_TABS } from "@/data/aureum-implement-tabs";
import { AUREUM_USER_FLOW_TABS } from "@/data/aureum-user-flows";
import { EQUIPIFY_IMPLEMENT_TABS } from "@/data/equipify-implement-tabs";
import { EQUIPIFY_USER_FLOW_TABS } from "@/data/equipify-user-flows";
import { HEADLINES_FEATURE_RANKING_DATA } from "@/data/headlines-feature-ranking";
import { HEADLINES_IMPLEMENT_TABS } from "@/data/headlines-implement-tabs";
import { HEADLINES_CASUAL_READER_JOURNEY_COLUMNS } from "@/data/headlines-journey-maps";
import { HEADLINES_USER_FLOW_TABS } from "@/data/headlines-user-flows";
import { FOODTRACK_IMPLEMENT_TABS } from "@/data/foodtrack-implement-tabs";
import { FOODTRACK_KITCHEN_MANAGER_JOURNEY_COLUMNS } from "@/data/foodtrack-journey-maps";
import { STUDIOFLOW_IMPLEMENT_TABS } from "@/data/studioflow-implement-tabs";
import { STUDIOFLOW_USER_FLOW_TABS } from "@/data/studioflow-user-flows";
import type { FeatureRankingBlock } from "@/data/coco-feature-ranking";
import { PETRICOR_IMPLEMENT_TABS } from "@/data/petricor-implement-tabs";
import { PETRICOR_USER_FLOW_TABS } from "@/data/petricor-user-flows";
import type { ResearchInsightsData } from "@/data/headlines-research-insights";
import { HEADLINES_RESEARCH_INSIGHTS } from "@/data/headlines-research-insights";
import { PORTFOLIO_SHOWCASE_PROJECTS } from "@/data/portfolio-showcase-projects";

/** Wireframe or screen image inside a user-flow tab panel. */
export type ProjectUserFlowImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectUserFlowTab = {
  value: string;
  label: string;
  description: string;
  images: readonly ProjectUserFlowImage[];
  /** Optional live interactive demo rendered in the tab panel. */
  liveDemo?: "headlines" | "foodtrack";
};

/** One slide in a product / case-study image carousel. */
export type ProjectCarouselSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short label above the caption (e.g. screen name). */
  title?: string;
  /** Supporting line under the image. */
  caption?: string;
};

/** Accordion panel that contains its own image carousel. */
export type ProjectShowcaseAccordionItem = {
  value: string;
  title: string;
  description?: string;
  slides: readonly ProjectCarouselSlide[];
  /** Open this panel by default. */
  defaultOpen?: boolean;
};

/**
 * Product story presentation: a primary carousel, plus optional accordion
 * panels each with an additional carousel of supporting screens.
 */
export type ProjectProductShowcase = {
  slides: readonly ProjectCarouselSlide[];
  accordion?: readonly ProjectShowcaseAccordionItem[];
};

/** Inline figure after a paragraph (e.g. case-study diagram). */
export type ProjectSectionFigure = {
  /** Render immediately after the paragraph at this index (0-based). */
  afterParagraphIndex: number;
  src: string;
  alt: string;
  /** Intrinsic size for `next/image` (adjust to match the asset). */
  width: number;
  height: number;
};

/** Two-column table (e.g. user group × needs), rendered after section paragraphs. */
export type ProjectSectionTable = {
  rows: readonly { col1: string; col2: string }[];
  /** Accessible name for the table (defaults to a generic label). */
  ariaLabel?: string;
};

/** One titled point in a native topic grid (replaces multi-column benefit slides). */
export type ProjectTopicItem = {
  title: string;
  body: string;
};

/** Grouped topic grid under a section heading (e.g. manufacturing vs business benefits). */
export type ProjectTopicGroup = {
  title: string;
  items: readonly ProjectTopicItem[];
};

/** One column in a journey map grid (stages across; aspect labels in first column when used). */
export type JourneyMapColumn = {
  header: string;
  rows: readonly string[];
};

export type JourneyParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type JourneyAccordionBlock = {
  type: "journeyAccordion";
  /** Accordion item value (unique within the page section). */
  value: string;
  title: string;
  /** Uncontrolled initial open state (e.g. Customer map). */
  defaultOpen?: boolean;
  /** Accessible name for the journey table. */
  tableAriaLabel: string;
  columns: readonly JourneyMapColumn[];
};

/** Journey map table rendered inline (no accordion). */
export type JourneyTableBlock = {
  type: "journeyTable";
  tableAriaLabel: string;
  columns: readonly JourneyMapColumn[];
};

export type JourneyBlock =
  | JourneyParagraphBlock
  | JourneyAccordionBlock
  | JourneyTableBlock;

function journeyColumnsFromCocoData(
  columns: CocoJourneyMapColumns
): JourneyMapColumn[] {
  return columns.map((col) => ({
    header: col.header,
    rows: col.rows,
  }));
}

/** One case-study block: top rule, section title, body copy; optional Role/Scope (e.g. Overview). */
export type ProjectStat = {
  value: string;
  label: string;
  detail?: string;
};

export type ProjectSection = {
  title: string;
  paragraphs: readonly string[];
  /** Optional table after paragraphs. */
  table?: ProjectSectionTable;
  /** Highlight metrics rendered as a native grid (replaces simple metrics slides). */
  stats?: readonly ProjectStat[];
  /**
   * Grouped title + body grids (replaces multi-column benefit / context slides).
   * Rendered after paragraphs, before stats/table.
   */
  topicGroups?: readonly ProjectTopicGroup[];
  /** Images or diagrams inserted after specific paragraphs (non-journey sections). */
  figures?: readonly ProjectSectionFigure[];
  /** Layout for figures that share an `afterParagraphIndex` (default stacks). */
  figuresLayout?: "stack" | "grid-2";
  /** Tabbed user-flow panels with copy and wireframes (Coco User Flows). */
  userFlowTabs?: readonly ProjectUserFlowTab[];
  /** Renders FeatureRankingCharts after the paragraph at this index (Coco Test). */
  featureRankingChartsAfterParagraphIndex?: number;
  /** Data for feature ranking charts (defaults to Coco when omitted). */
  featureRankingData?: readonly FeatureRankingBlock[];
  /** Renders ResearchInsights after the paragraph at this index. */
  researchInsightsAfterParagraphIndex?: number;
  /** Data for research insights visualization. */
  researchInsights?: ResearchInsightsData;
  /** Tabbed high-fidelity screens (Coco Implement). */
  implementTabs?: readonly ProjectUserFlowTab[];
  /**
   * Primary image carousel + optional accordion carousels for product story
   * screens (preferred over dense implementTabs when many screens).
   */
  productShowcase?: ProjectProductShowcase;
  /**
   * Interleaved prose and journey-map accordions (Coco). When set, replaces the
   * default paragraphs + table layout for this section.
   */
  journeyBlocks?: readonly JourneyBlock[];
  role?: string;
  scope?: string;
};

export type PastProject = {
  slug: string;
  title: string;
  description: string;
  /** Case-study board; omit when there is no artwork yet. */
  image?: string;
  alt?: string;
  /** Intrinsic pixel size of the case-study PNG (used for layout + `next/image`). */
  width?: number;
  height?: number;
  /** First narrative section (often Overview; may include role/scope). */
  overview?: ProjectSection;
  /** Further sections in the same layout, after overview. */
  sections?: readonly ProjectSection[];
};

export const pastProjects: PastProject[] = [
  {
    slug: "accessible-fastener",
    title: "Accessible fastening system",
    description:
      "A magnetic-assisted fastening system for people with dexterity challenges, from research through prototyping.",
    image: "/projects/accessible-fastener.png",
    alt: "Case study board for an accessible clothing fastener alternative to zippers.",
    width: 1960,
    height: 10650,
  },
  {
    slug: "ai-camera-nodit",
    title: "Nodit AI Camera",
    description:
      "Camera and sensing concept integrating AI-assisted capture and hardware layout.",
    image: "/projects/voxelplm.png",
    alt: "Nodit AI camera product case study.",
    width: 1960,
    height: 9278,
  },
  {
    slug: "h2-audio",
    title: "H2 Audio",
    description:
      "Audio product and hardware exploration—from use cases through industrial design and visualization.",
    image: "/projects/ai-camera-nodit.png",
    alt: "H2 Audio product case study board.",
    width: 1960,
    height: 10514,
  },
  {
    slug: "animation-physics",
    title: "Animation & physics simulations",
    description:
      "A grid of physics-based animation studies including fluids, cloth, rigid bodies, and particles.",
    image: "/projects/animation-physics.png",
    alt: "Grid of animation and physics simulation thumbnails.",
    width: 1960,
    height: 9230,
  },
  {
    slug: "e-syringe",
    title: "Electronic syringe",
    description:
      "Medical injection device concept with digital interface and ergonomic hardware exploration.",
    image: "/projects/e-syringe.png",
    alt: "Electronic syringe product design case study.",
    width: 1960,
    height: 7482,
  },
  {
    slug: "ecowell-c79b",
    title: "Ecowell — case study (C79B)",
    description:
      "A custom sustainable drink machine—from sketches and renders to prototype in context.",
    image: "/projects/ecowell-c79b.png",
    alt: "Ecowell sustainable drink machine case study board.",
    width: 1960,
    height: 8256,
  },
  {
    slug: "ecowell-c8l9",
    title: "Ecowell — case study (C8L9)",
    description:
      "Alternate case-study layout for the Ecowell sustainable drink machine.",
    image: "/projects/ecowell-c8l9.png",
    alt: "Ecowell drink machine case study, alternate board.",
    width: 1960,
    height: 5072,
  },
  {
    slug: "footwear-sketches",
    title: "Footwear concept sketches",
    description:
      "Industrial design explorations for tech-forward footwear—silhouettes, materials, and assembly studies.",
    image: "/projects/footwear-sketches.png",
    alt: "Composite of hand-drawn futuristic footwear concept sketches.",
    width: 1960,
    height: 2860,
  },
  {
    slug: "laser-scalpel",
    title: "Laser scalpel",
    description:
      "Surgical laser instrument design with clinical context and mechanical detail.",
    image: "/projects/laser-scalpel.png",
    alt: "Laser scalpel medical device case study.",
    width: 1960,
    height: 5686,
  },
  {
    slug: "lllt-knee-brace-c1zug",
    title: "Low level laser therapy — knee brace study",
    description:
      "Wearable knee therapy device: research, hardware, app UI, and final renders.",
    image: "/projects/lllt-knee-brace-c1zug.png",
    alt: "LLLT knee brace case study with app and product renders.",
    width: 1960,
    height: 10010,
  },
  {
    slug: "lllt-knee-osteoarthritis",
    title: "Low level laser therapy",
    description:
      "Extended case study for knee osteoarthritis therapy—from anatomy and sketches to app and product.",
    image: "/projects/lllt-knee-osteoarthritis.png",
    alt: "LLLT knee osteoarthritis case study board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "medical-recovery-systems",
    title: "Medical Recovery & Rehabilitation System",
    description:
      "Clinical concepts spanning 3D scanning for recovery, pediatric therapeutic play, prosthetic training, and bed-side systems.",
    image: "/projects/medical-recovery-systems.png",
    alt: "Compilation of medical device and rehabilitation design projects.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "medication-adherence",
    title: "Medication non-adherence research",
    description:
      "Stakeholder research, field methods, and visual synthesis on adherence in an aging population.",
    image: "/projects/medication-adherence.png",
    alt: "Infographic on medication non-adherence research and field study.",
    width: 1960,
    height: 4962,
  },
  {
    slug: "micro-windmill",
    title: "Micro windmill",
    description:
      "Small-scale wind energy harvesting concept and visualization.",
    image: "/projects/micro-windmill.png",
    alt: "Micro windmill energy concept case study.",
    width: 1960,
    height: 8528,
  },
  {
    slug: "moto-id",
    title: "Moto ID",
    description:
      "Vehicle and mobility identity system exploration.",
    image: "/projects/moto-id.png",
    alt: "Moto ID branding and mobility concept board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "oasis",
    title: "Oasis",
    description:
      "Product or environment concept for hydration, retail, or experiential design.",
    image: "/projects/oasis.png",
    alt: "Oasis project case study board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "smart-hydration-platform",
    title: "Smart Hydration",
    description:
      "Connected bottle, gym hardware, mechanical detail, and companion app UX for hydration and training.",
    image: "/projects/smart-hydration-platform.png",
    alt: "Smart connected hydration and fitness platform case study.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "solar-field-installation",
    title: "Automated Solar Field",
    description:
      "Robotic solar deployment in the field, team operations, software dashboards, and system diagrams.",
    image: "/projects/solar-field-installation.png",
    alt: "Automated solar field installation system case study.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "stemcell-spray",
    title: "Autonomous Shipping Systems for trackless trains",
    description:
      "Modular wheeled platforms for containerized freight, shown in environment, port loading, and component detail.",
    image: "/projects/stemcell-spray.png",
    alt: "Autonomous trackless train shipping and modular freight platforms case study.",
    width: 1960,
    height: 10606,
  },
  {
    slug: "stemcell-spray-alt",
    title: "Stemcell spray system",
    description:
      "Pain-free skin grafting workflow with device renders, cartridges, and mobile app screens.",
    image: "/projects/stemcell-spray-alt.png",
    alt: "Stemcell spray system for skin grafting case study.",
    width: 1960,
    height: 9938,
  },
  {
    slug: "teleoperation-station",
    title: "Teleoperation System",
    description:
      "Modular remote operation workstations for vehicles and robots, from use cases to scalable room layouts.",
    image: "/projects/teleoperation-station.png",
    alt: "Teleoperation station for vehicles and robotics case study.",
    width: 1960,
    height: 12142,
  },
  {
    slug: "uav-humanitarian-delivery",
    title: "Human-centric UAV delivery",
    description:
      "Aerial logistics for sparse infrastructure—operations, payload, testing, and modular airframe diagrams.",
    image: "/projects/uav-humanitarian-delivery.png",
    alt: "UAV humanitarian delivery case study with drone renders and process photos.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "vaccine-transport",
    title: "Vaccine transport for mobile Africa",
    description:
      "Cold-chain portable carrier inspired by real mobility constraints, from research through exploded technical views.",
    image: "/projects/vaccine-transport.png",
    alt: "Vaccine transport system for mobile Africa case study.",
    width: 1960,
    height: 13362,
  },
  {
    slug: "vaccine-transport-c23c1",
    title: "Vaccine transport — alternate board",
    description:
      "Alternate case-study layout for the mobile vaccine transport system.",
    image: "/projects/vaccine-transport-c23c1.png",
    alt: "Alternate vaccine transport for mobile Africa case study board.",
    width: 1960,
    height: 12904,
  },
  {
    slug: "voxelplm",
    title: "Voxel PLM",
    description:
      "Product lifecycle and 3D data workflow concept visualization.",
    image: "/projects/autonomous-shipping.png",
    alt: "Voxel PLM software and process case study.",
    width: 1960,
    height: 12218,
  },
  {
    slug: "mdx",
    title: "MDX",
    description:
      "Medical Health Learning platform—research, UX, and system visualization for clinical education.",
    image: "/projects/voxelplm-board-1.png",
    alt: "MDX Medical Health Learning platform case study board.",
    width: 1960,
    height: 9068,
  },
];

/** Newer work (add entries here; slugs must be unique across all project lists). */
export const recentProjects2023_2026: PastProject[] = [
  ...PORTFOLIO_SHOWCASE_PROJECTS,
  {
    slug: "coco",
    title: "Coco",
    description:
      "Fleet and waste management platform for drivers, collectors, and customers.",
    image: "/projects/coco_card.png",
    alt: "Aerial view of a garbage truck in an urban neighborhood.",
    width: 1024,
    height: 585,
    overview: {
      title: "Overview",
      paragraphs: [
        "Waste management companies running mixed fleets — trash compactors, recycling vehicles, specialty collection — have no unified way to track assets, coordinate crews, or communicate with customers in real time. Coco is a connected platform designed for four distinct user groups: customers, collectors, drivers, and fleet managers.",
        "The challenge was designing a system that works across radically different contexts: a customer scheduling a pickup from their phone, a collector confirming hazardous materials in the field, a driver navigating dense city traffic, and a manager monitoring compliance across an entire fleet — all at the same time.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "iOS, Android, Tablet (in-cab), Web Dashboard",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required getting close to the physical environment — not just the software. Route pressures, confined spaces, hazardous materials, and inconsistent pickup locations all shape how users actually behave in the field. That complexity had to be designed for, not designed around.",
          "Four primary user groups were identified, each with distinct needs and risk profiles:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/coco_system_sketch.png",
            alt: "Early system sketch for Coco: field context, user roles, and service touchpoints.",
            width: 2388,
            height: 1668,
          },
        ],
        table: {
          ariaLabel: "User groups and needs from research",
          rows: [
            {
              col1: "Customers",
              col2:
                "Want transparency — to know when their pickup is coming and that it was completed correctly.",
            },
            {
              col1: "Collectors",
              col2:
                "Need in-the-moment guidance — the right items, from the right location, with confirmation that compliance was met.",
            },
            {
              col1: "Drivers",
              col2:
                "Are managing safety, time, and coordination simultaneously. The interface needs to work while they're moving.",
            },
            {
              col1: "Fleet managers",
              col2:
                "Are responsible for all of the above. Their tool is a command surface, not a task list.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "Rather than building one product for everyone, the platform was structured around role-specific flows that share a common data layer.",
        ],
        table: {
          ariaLabel: "Roles and core user-story needs",
          rows: [
            {
              col1: "Customer",
              col2:
                "Schedule and track pickups; photo upload for bulk or specialty items; payment management.",
            },
            {
              col1: "Collector",
              col2:
                "Guided item confirmation; compliance tracking; safety record.",
            },
            {
              col1: "Driver",
              col2:
                "Optimized route navigation; real-time dispatch communication; maintenance logging.",
            },
            {
              col1: "Fleet Manager",
              col2:
                "Live fleet visibility; performance and cost reporting; SOP compliance monitoring.",
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
            text: "Mapping the full system across all four user types revealed that friction points rarely live in the middle of a journey — they cluster at the edges, where handoffs happen and communication breaks down.",
          },
          {
            type: "journeyAccordion",
            value: "customer",
            title: "Customer Journey Map",
            defaultOpen: true,
            tableAriaLabel: "Customer journey map, six stages",
            columns: journeyColumnsFromCocoData(COCO_CUSTOMER_JOURNEY_COLUMNS),
          },
          {
            type: "paragraph",
            text: "Most service failures occur at Problem Discovery and Tracking — the moments before and after the core transaction. Customers don't leave because of a missed pickup; they leave because no one told them about it. That insight directly shaped the notification architecture.",
          },
          {
            type: "journeyAccordion",
            value: "fleet-manager",
            title: "Fleet Manager Journey Map",
            tableAriaLabel: "Fleet manager journey map, six stages",
            columns: journeyColumnsFromCocoData(
              COCO_FLEET_MANAGER_JOURNEY_COLUMNS
            ),
          },
          {
            type: "paragraph",
            text: "The fleet manager journey exposed a different kind of friction: too much data, not enough signal. Surfacing risk and compliance status without burying managers in dashboards became the central design challenge for the dashboard hierarchy.",
          },
          {
            type: "paragraph",
            text: "The Driver and Collector maps reinforced a finding that wasn't visible in interviews alone — navigation and collection are not sequential tasks, they happen simultaneously. That shaped how communication between the two roles was designed.",
          },
          {
            type: "journeyAccordion",
            value: "driver",
            title: "Driver Journey Map",
            tableAriaLabel: "Driver journey map, six stages",
            columns: journeyColumnsFromCocoData(COCO_DRIVER_JOURNEY_COLUMNS),
          },
          {
            type: "journeyAccordion",
            value: "collector",
            title: "Collector Journey Map",
            tableAriaLabel: "Collector journey map, six stages",
            columns: journeyColumnsFromCocoData(COCO_COLLECTOR_JOURNEY_COLUMNS),
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before any screens were designed, the full interaction architecture was mapped for each user type — from first login through day-to-day use.",
          "The complexity of this system lives in the flows, not the interfaces. Four distinct onboarding paths and four distinct daily experiences, all sharing a common data layer underneath.",
        ],
        userFlowTabs: COCO_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "Feature prioritization was validated across all four user groups through structured ranking exercises. The results confirmed some assumptions and challenged others — most notably that real-time status visibility is the universal priority for field users, while fleet managers are primarily concerned with systemic risk and compliance rather than individual pickups.",
          "The most significant finding cuts across all four rankings: Pickup Tracking and Notifications ranks first for every field-facing user — customers, collectors, and drivers — but falls to sixth for fleet managers, who prioritize Fleet Maintenance Scheduling and Compliance Management above everything else. Field users want to know what's happening right now. Managers want to know what's at risk tomorrow. That distinction drove the information hierarchy in both the mobile and dashboard experiences.",
        ],
        featureRankingChartsAfterParagraphIndex: 0,
      },
      {
        title: "Refine",
        paragraphs: [
          "With the system architecture mapped and feature priorities validated, the design language was established iteratively — a component library, color system, and visual identity developed in parallel with the high-fidelity screens. The 3D asset library was a deliberate choice to ground the brand in the physical world of the service, giving the platform a visual identity rooted in the actual vehicles, containers, and equipment its users interact with every day.",
          "The biggest refinement decisions happened at the system level — how status is communicated across four different user contexts, how compliance risk surfaces without creating noise, and how a single design language stretches from a customer's mobile pickup request to a fleet manager's compliance dashboard.",
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final designs bring together four distinct experiences built on a shared system — each optimized for the context, constraints, and priorities of its user.",
        ],
        implementTabs: COCO_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "petricor",
    title: "Petricor",
    description:
      "Automated fungi and mold analysis platform for microbiology laboratories.",
    image: "/projects/petricor/petricor_card.png",
    alt: "Vibrant detailed view of mold and fungi in a laboratory setting.",
    width: 1024,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "Fungi and mold analysis in microbiology laboratories is a time-consuming, labor-intensive process — sample preparation, incubation, imaging, identification, and reporting, often with inconsistent manual results and long turnaround times. Rising sample volumes in clinical and environmental settings demand higher throughput without proportional increases in skilled labor.",
        "Petricor is an automated system designed to streamline the full workflow: integrated sample handling and incubation, high-resolution imaging with AI-assisted colony counting and species identification, LIMS integration, quality control monitoring, and automated reporting — reducing error, labor cost, and time to result.",
      ],
      role: "UX Research, Product Design, Interaction Design, Industrial Design",
      scope: "Lab Device UI, Web Dashboard, Cloud Platform",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required working alongside microbiologists, mycologists, and lab technicians — not just observing software use, but the physical constraints of sterile technique, equipment calibration, and the administrative burden of documentation that competes with actual analysis time.",
          "Four researcher archetypes were identified, each with distinct goals, tools, and risk profiles:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/petricor/petricor_system_sketch.png",
            alt: "Early Petricor system sketch: lab context, device, and cloud touchpoints.",
            width: 2388,
            height: 1668,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/petricor/petricor_problem_statement.webp",
            alt: "Research insight: manual lab processes create frustration and inefficiency for technicians.",
            width: 1792,
            height: 1024,
          },
        ],
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Dr. Alex Morgan",
              col2:
                "Senior Microbiologist — needs accuracy, efficiency, and seamless integration of manual and automated workflows.",
            },
            {
              col1: "Dr. Emily Thompson",
              col2:
                "Senior Mycologist — needs advanced imaging, species databases, and collaboration tools for research.",
            },
            {
              col1: "Dr. Jane Miller",
              col2:
                "Environmental Mycologist — needs field-to-lab traceability and ecological data management.",
            },
            {
              col1: "Dr. Michael Brown",
              col2:
                "Industrial Mycologist — needs scalable cultivation monitoring and production-line integration.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "Rather than a single generic lab product, the platform was structured around distinct daily workflows — bench preparation, device operation, cloud analysis, and reporting — all sharing a common sample and experiment data layer.",
        ],
        table: {
          ariaLabel: "Roles and core user-story needs",
          rows: [
            {
              col1: "Lab Technician",
              col2:
                "Prepare samples, monitor incubation, capture images, run analysis, and generate reports with minimal manual steps.",
            },
            {
              col1: "Senior Microbiologist",
              col2:
                "Oversee automated and manual processes, validate results, and maintain quality control records.",
            },
            {
              col1: "Research Mycologist",
              col2:
                "Access detailed colony morphology, species identification, and exportable research data.",
            },
            {
              col1: "Lab Director",
              col2:
                "Evaluate ROI, plan implementation, monitor fleet performance, and review compliance reporting.",
            },
          ],
        },
      },
      {
        title: "Journey Mapping",
        paragraphs: [
          "Mapping the adoption journey — from awareness of manual inefficiencies through installation, training, and daily operation — revealed that friction clusters at handoffs: procurement to IT setup, training to first independent use, and device capture to cloud analysis.",
          "Comparing manual and automated workflows quantified the opportunity: analysis time dropping from 37–70 hours to 3.5–6 hours (excluding incubation), with major gains in accuracy, data recording, colony counting, and reporting.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/petricor/petricor_alex_morgan_journey.png",
            alt: "Alex Morgan user journey map across awareness through review and feedback.",
            width: 3652,
            height: 1530,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/petricor/petricor_manual_vs_automated.png",
            alt: "Manual vs automated lab process comparison across time, accuracy, and scalability.",
            width: 3744,
            height: 1440,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/petricor/petricor_product_journey.png",
            alt: "High-level product journey from problem discovery through operational use.",
            width: 3628,
            height: 1736,
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before detailed screen design, the interaction architecture was mapped for both the lab technician web app and the on-device experience — from login and task selection through sample prep, imaging, barcoding, and data sync.",
          "UI and industrial design inspiration boards grounded the visual language in scientific precision and laboratory ergonomics before wireframes were developed.",
        ],
        userFlowTabs: PETRICOR_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "Validation sessions with lab technicians kept circling the same point: nobody cared about smarter analytics until the physical workflow felt trustworthy. Sample preparation and incubation monitoring had to work reliably at the bench — hands-on, interruptible, and easy to verify — before reporting, calibration admin, or optimization features earned attention. Automation value, in other words, was measured first by whether the device could be trusted with the sample, not by how impressive the cloud dashboard looked.",
        ],
      },
      {
        title: "Refine",
        paragraphs: [
          "With flows validated, a component library, dashboard card patterns, and brand system were developed in parallel with high-fidelity screens — balancing clinical clarity with the organic visual identity suggested by fungal morphology.",
          "The refinement phase focused on how status, experiment progress, and device connectivity communicate consistently across the on-device touchscreen and cloud dashboard.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/petricor/petricor_components.png",
            alt: "Petricor UI component library.",
            width: 4096,
            height: 995,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/petricor/petricor_dashboard_cards.png",
            alt: "Petricor dashboard card patterns.",
            width: 5752,
            height: 4162,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/petricor/petricor_logo_and_brand.png",
            alt: "Petricor logo and brand assets.",
            width: 3442,
            height: 2230,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final designs bring together the benchtop device, on-device workflows, and Petricor Cloud — each optimized for its context while sharing experiment data, sample traceability, and analysis results across the system.",
        ],
        implementTabs: PETRICOR_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "aureum",
    title: "Aureum AI",
    description:
      "Holistic AI-powered personal finance coach for budgeting, goals, and insights.",
    image: "/projects/aureum/aureum_card.webp",
    alt: "Aureum AI personal finance coach brand illustration.",
    width: 1792,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "Most people lack the financial literacy and personalized guidance to make confident decisions about saving, investing, and budgeting. Generic finance tools fail to account for individual goals, income patterns, and life stage — leaving users with fragmented accounts, generic advice, and no cohesive view of their financial health.",
        "Aureum AI is a holistic personal finance coach that combines AI-driven planning, real-time expense tracking, predictive analytics, and community support into a single experience — helping users from first account setup through daily financial decisions with guidance tailored to their unique situation.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "iOS, Android, Web App",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Research revealed four interconnected problem spaces: financial literacy gaps, lack of personalized guidance, missed savings and investment opportunities, and the social isolation that often accompanies financial stress. Existing tools address pieces of the puzzle but rarely integrate them into a cohesive experience.",
          "Five user archetypes were identified across income levels, life stages, and financial sophistication:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/aureum/aureum_system_sketch.png",
            alt: "Early Aureum system sketch: AI finance coach concept and touchpoints.",
            width: 3840,
            height: 2160,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/aureum/aureum_problem_statement.png",
            alt: "Aureum problem statement: financial literacy, personalization, and integration gaps.",
            width: 3840,
            height: 2160,
          },
        ],
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Emily Johnson",
              col2:
                "Marketing specialist — needs customized budgeting, personalized investment advice, and progress tracking toward a home down payment.",
            },
            {
              col1: "Michael Chen",
              col2:
                "Software engineer — needs integrated account management, real-time investment insights, and automated savings recommendations.",
            },
            {
              col1: "Sarah Martinez",
              col2:
                "Small business owner — needs business/personal finance separation, cash flow tools, and tailored financial literacy.",
            },
            {
              col1: "David Lee",
              col2:
                "High school teacher — needs debt management, college savings planning, and accessible financial education.",
            },
            {
              col1: "Lisa Robinson",
              col2:
                "Retired nurse — needs healthcare cost management, retirement planning, and easy investment tracking.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "The platform was structured around eight core capability areas — from account setup through community engagement — with AI nudges designed to intervene at friction points rather than overwhelm users with generic notifications.",
        ],
        table: {
          ariaLabel: "Core capability areas and user needs",
          rows: [
            {
              col1: "Financial Planning",
              col2:
                "AI-generated budgets and goal prioritization tailored to individual income and objectives.",
            },
            {
              col1: "Expense Tracking",
              col2:
                "Automated categorization with manual override and real-time spending visibility.",
            },
            {
              col1: "Savings & Investments",
              col2:
                "Automated transfers, portfolio monitoring, and tailored investment recommendations.",
            },
            {
              col1: "Debt Management",
              col2:
                "Consolidated debt overview with AI-generated repayment plans and payment reminders.",
            },
            {
              col1: "Financial Education",
              col2:
                "Interactive modules and quizzes matched to user role and knowledge level.",
            },
            {
              col1: "Community",
              col2:
                "Peer groups, webinars, and mentorship to reduce financial isolation and stress.",
            },
          ],
        },
      },
      {
        title: "Journey Mapping",
        paragraphs: [
          "Journey maps across five personas revealed that emotional peaks occur at goal-setting and progress milestones, while friction clusters at account setup, data privacy concerns, and the complexity of connecting multiple financial accounts.",
          "The product discovery map traced the path from problem awareness through purchase, initial use, continued engagement, and community participation — identifying where AI intervention could convert apprehension into confidence.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/aureum/aureum_journey_emily_johnson.png",
            alt: "Emily Johnson user journey map across account setup through community interaction.",
            width: 3636,
            height: 1666,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/aureum/aureum_journey_michael_chen.png",
            alt: "Michael Chen user journey map across financial planning and investment management.",
            width: 3636,
            height: 1676,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/aureum/aureum_product_discovery_map.png",
            alt: "Aureum product discovery map from problem awareness through community engagement.",
            width: 3840,
            height: 2160,
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before detailed screen design, the full interaction architecture was mapped — from onboarding and account connection through daily expense tracking, savings management, and community features.",
          "The system onboarding flow integrates automated and manual tracking, personalized financial planning, and AI-driven insights into a guided first experience designed to deliver value before asking for deep financial commitment.",
        ],
        userFlowTabs: AUREUM_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "AI-driven planning and real-time expense tracking were near-universal across all five personas. The divergence showed up in what people wanted to see first.",
          "\"I don't need another chart of what I spent — I need to know what's about to go wrong.\" — Lisa Robinson, ranking predictive analytics above everything else.",
          "Michael Chen flipped that priority: the financial health dashboard came first, with predictive tools as supporting context. Same product, two opening moves — one oriented toward future risk, the other toward current standing — which decided what anchors the home screen and what lives one tap deeper.",
        ],
      },
      {
        title: "Refine",
        paragraphs: [
          "The brand direction — friendly, sophisticated, bold — required rethinking how finance is portrayed visually. A component library, illustration system, and logo suite were developed to feel approachable without sacrificing the credibility users expect from a financial product.",
          "Refinement focused on making AI guidance feel supportive rather than prescriptive — nudges that assist without overwhelming, and a visual language that celebrates progress rather than highlighting deficits.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/aureum/aureum_components.png",
            alt: "Aureum UI component library.",
            width: 10660,
            height: 4000,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/aureum/aureum_illustration_assets.png",
            alt: "Aureum illustration asset library.",
            width: 3018,
            height: 1500,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/aureum/aureum_logo_and_brand.png",
            alt: "Aureum logo and brand guidelines.",
            width: 4546,
            height: 1578,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final designs bring together onboarding, dashboard, budgeting, goals, and insights into a cohesive mobile-first experience — each surface optimized for its moment in the user's financial day while sharing a common data layer and AI recommendation engine underneath.",
        ],
        implementTabs: AUREUM_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "equipify",
    title: "Equipify",
    description:
      "Comprehensive industrial and business supply platform.",
    image: "/projects/equipify/equipify_card.webp",
    alt: "Industrial warehouse environment with equipment and supplies.",
    width: 1792,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "Industrial firms often struggle to source specialized tools, machinery parts, and safety equipment that meet their specific needs — while traditional procurement processes remain slow, fragmented, and prone to compliance gaps. The global industrial supplies market exceeds $540 billion, with SMEs representing 60% of demand and growing emphasis on automation and safety standards driving need for smarter sourcing.",
        "Equipify is a comprehensive B2B platform designed to streamline procurement and inventory management for custom industrial tools, niche machinery parts, and specialized safety gear — giving businesses real-time inventory visibility, supplier ratings, compliance tracking, and supply chain analytics in a single operational hub.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "Web Platform, Dashboard",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required working alongside procurement managers, inventory specialists, and operations leaders — not just mapping software workflows, but the physical constraints of sourcing custom parts, maintaining safety compliance, and keeping production lines running without stockouts.",
          "Four primary user groups were identified, each with distinct priorities across ordering, inventory, and compliance:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_cover.png",
            alt: "Early Equipify concept: industrial supply chain platform overview.",
            width: 1920,
            height: 1080,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/equipify/equipify_problem_statement.png",
            alt: "Equipify problem statement: limited access, inefficient procurement, and safety compliance challenges.",
            width: 3840,
            height: 2160,
          },
        ],
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Procurement Manager",
              col2:
                "Needs efficient sourcing, price comparison, and supplier vetting for custom and specialized industrial tools.",
            },
            {
              col1: "Inventory Manager",
              col2:
                "Needs real-time stock visibility, reorder alerts, barcode scanning, and discrepancy tracking across locations.",
            },
            {
              col1: "Operations Director",
              col2:
                "Needs supply chain analytics, cost optimization, and fleet-wide visibility into procurement and inventory performance.",
            },
            {
              col1: "Safety & Compliance Officer",
              col2:
                "Needs certified safety gear sourcing, compliance documentation, and quality audit trails to meet regulatory requirements.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "The platform was structured around five core capability areas — ordering and procurement, inventory management, supplier management, quality assurance, and analytics — each serving distinct daily workflows while sharing a common product and supplier data layer.",
        ],
        table: {
          ariaLabel: "Core capability areas and user needs",
          rows: [
            {
              col1: "Ordering & Procurement",
              col2:
                "Bulk orders, price comparison, supplier directory, order tracking, and procurement history.",
            },
            {
              col1: "Inventory Management",
              col2:
                "Real-time inventory updates, reorder points, barcode scanning, and discrepancy reporting.",
            },
            {
              col1: "Supplier Management",
              col2:
                "Supplier directory, ratings, performance tracking, and contract management.",
            },
            {
              col1: "Quality Assurance & Compliance",
              col2:
                "Quality control procedures, compliance standards, safety certifications, and audit trails.",
            },
            {
              col1: "Data & Analytics",
              col2:
                "Supply chain analytics, procurement analytics, inventory analytics, and compliance reports.",
            },
          ],
        },
      },
      {
        title: "Journey Mapping",
        paragraphs: [
          "Mapping key user groups and their procurement-to-inventory workflows revealed that friction clusters at three points: finding specialized suppliers, reconciling inventory discrepancies, and maintaining compliance documentation across multiple vendors.",
          "The B2B niche industrial supplies market presents a significant opportunity — fewer competitors than B2C, higher customer loyalty, and growing demand driven by Industry 4.0 adoption and tightening safety regulations.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_key_users.png",
            alt: "Equipify key user groups across procurement, inventory, and operations.",
            width: 3840,
            height: 2160,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_key_users_personas.png",
            alt: "Equipify user personas with goals, frustrations, and needs.",
            width: 3616,
            height: 1812,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/equipify/equipify_opportunity.png",
            alt: "Equipify market opportunity: industrial supplies market size, demographics, and trends.",
            width: 3840,
            height: 2160,
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before detailed screen design, the full information architecture was mapped — from product categories and site sections through ordering, inventory, supplier management, and role-based permissions.",
          "User story mapping across ordering, procurement, supplier management, and analytics confirmed that the platform's value lives in connecting catalog discovery to inventory reconciliation and compliance reporting in a single continuous workflow.",
        ],
        userFlowTabs: EQUIPIFY_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "Before: the working IA assumption was a shared operations dashboard — inventory status and bulk ordering up front, with supplier ratings and compliance reporting treated as equal secondary tools for everyone.",
          "After validation: inventory and bulk ordering stayed universal, but the secondary layer split hard. Procurement managers needed price comparison and supplier performance in reach; safety and compliance officers needed certification tracking and quality audit trails instead. One shared \"tools\" drawer collapsed into role-weighted surfaces so each group saw their decision criteria without hunting.",
        ],
      },
      {
        title: "Refine",
        paragraphs: [
          "With flows validated, an MVP design system was developed — typography, buttons, cards, and supporting components built to support dense B2B data displays without sacrificing clarity.",
          "Refinement focused on how inventory status, supplier ratings, and compliance alerts communicate consistently across the catalog, cart, and dashboard experiences.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_typography.png",
            alt: "Equipify typography and type scale.",
            width: 1636,
            height: 1454,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_buttons.png",
            alt: "Equipify button component styles.",
            width: 1810,
            height: 1358,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/equipify/equipify_cards.png",
            alt: "Equipify card component patterns.",
            width: 4456,
            height: 3448,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/equipify/equipify_design_system_other.png",
            alt: "Equipify design system: forms, inputs, and supporting components.",
            width: 3156,
            height: 1608,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final designs bring together home and dashboard, product catalog and ordering, and inventory management into a cohesive web platform — each surface optimized for its operational context while sharing product data, supplier records, and compliance status across the system.",
        ],
        implementTabs: EQUIPIFY_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "studioflow",
    title: "Studioflow",
    description:
      "Streamlined production management for creative studios.",
    image: "/projects/studioflow/studioflow_card.webp",
    alt: "Film equipment, cast, and crew shooting a commercial on set.",
    width: 1792,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "Large global studios face significant challenges managing modern media production — fragmented tools, disorganized media assets, manual repetitive tasks, and complex review and approval workflows that slow timelines and inflate budgets. A typical film production involves 276 crew members, over 100,000 digital assets, and budgets ranging from $50 million to $200 million, where delays can cost $100,000 to $500,000 and reshoots can run $5 million to $25 million.",
        "Studioflow is a comprehensive production management platform designed to streamline workflows, improve communication, and enhance efficiency — unifying dashboard visibility, media asset management, collaborative workspaces, task and budget tracking, analytics, and safety compliance into a single system for directors, producers, editors, and VFX supervisors.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "Web Platform, Dashboard",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required working alongside directors, producers, editors, and VFX supervisors — observing how fragmented tools create communication gaps, how media assets get lost across production phases, and how manual processes consume time that should go toward creative work.",
          "Four primary user groups were identified, each with distinct needs across the production lifecycle:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/studioflow/studioflow_cover.png",
            alt: "Early Studioflow concept: production management platform overview.",
            width: 2400,
            height: 1350,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/studioflow/studioflow_problem_statement.png",
            alt: "Studioflow problem statement: fragmented workflows, disorganized assets, and inefficient review processes.",
            width: 3840,
            height: 2160,
          },
        ],
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Alex Thompson (Director)",
              col2:
                "Needs collaborative workspaces, a unified dashboard, review and approval systems, and real-time messaging to realize creative vision efficiently.",
            },
            {
              col1: "Jessica Martinez (Producer)",
              col2:
                "Needs workflow automation, budget management, scheduling integration, and a unified dashboard to deliver projects on time and on budget.",
            },
            {
              col1: "Michael Green (Editor)",
              col2:
                "Needs media asset management, version control, advanced search, and review systems to handle footage efficiently under tight deadlines.",
            },
            {
              col1: "Sarah Kim (VFX Supervisor)",
              col2:
                "Needs collaborative workspaces, workflow automation, media asset management, and review systems to coordinate cutting-edge visual effects on schedule.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "The platform was structured around seven core tools — unified dashboard, media asset management, collaborative workspace, task management, budget management, analytics and reporting, and safety management — each serving distinct daily workflows while sharing a common project and asset data layer.",
        ],
        table: {
          ariaLabel: "Core tools and user needs",
          rows: [
            {
              col1: "Unified Dashboard",
              col2:
                "Comprehensive view of all ongoing projects, progress tracking, alerts, and quick actions.",
            },
            {
              col1: "Media Asset Management",
              col2:
                "Locating, tagging, versioning, and managing digital assets across production phases.",
            },
            {
              col1: "Collaborative Workspace",
              col2:
                "Real-time messaging, shared review sessions, and team coordination across departments.",
            },
            {
              col1: "Task Management",
              col2:
                "Milestone tracking, task assignment, and deliverable monitoring across the production timeline.",
            },
            {
              col1: "Budget Management",
              col2:
                "Cost tracking, schedule integration, and financial visibility for producers and studio leadership.",
            },
            {
              col1: "Analytics & Reporting",
              col2:
                "Performance insights, production metrics, and data-driven decision support.",
            },
            {
              col1: "Safety Management",
              col2:
                "Safety certification tracking, compliance documentation, and on-set safety protocols.",
            },
          ],
        },
      },
      {
        title: "Journey Mapping",
        paragraphs: [
          "Mapping stakeholders and production workflows revealed that friction clusters at five points: communication breakdowns between departments, disorganized media asset management, manual repetitive tasks, lack of centralized project visibility, and complex review and approval bottlenecks.",
          "Production scale metrics underscore the stakes — large-scale films exceed 100,000 digital assets and 1,000 physical pieces per set, with equipment costs per shoot ranging from $500,000 to $5 million.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/studioflow/studioflow_key_stakeholders.png",
            alt: "Studioflow key stakeholders across studio leadership and production departments.",
            width: 3652,
            height: 1578,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/studioflow/studioflow_key_users.png",
            alt: "Studioflow key user groups across the production lifecycle.",
            width: 3636,
            height: 1596,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/studioflow/studioflow_detail_metrics.png",
            alt: "Studioflow production metrics: crew size, budgets, asset counts, and delay costs.",
            width: 3840,
            height: 2160,
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before detailed screen design, the full information architecture and UX hierarchy were mapped — prioritizing essential functions and ensuring quick access to the most frequently used tools while maintaining logical flow between related features.",
          "The hierarchy places unified dashboard, media asset management, and collaborative workspace at the center of the interaction model, with task, budget, analytics, and safety tools supporting daily operations.",
        ],
        userFlowTabs: STUDIOFLOW_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "The surprise wasn't that the unified dashboard mattered — every persona put it near the top. It was that \"dashboard\" meant three different products. Directors opened it looking for review and approval queues; producers scanned for budget and workflow health; editors and VFX supervisors treated media asset status as the primary signal. One home surface had to carry creative sign-off, financial control, and asset readiness without flattening those jobs into a generic overview.",
        ],
      },
      {
        title: "Refine",
        paragraphs: [
          "With flows validated, the UX hierarchy was refined to balance creative collaboration with operational oversight — ensuring directors and editors can review and approve work without producers losing visibility into budget and schedule impact.",
          "Persona-specific needs were mapped to tool groupings, confirming that media asset management and collaborative workspace serve as the connective tissue between creative and operational workflows.",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/studioflow/studioflow_persona_alex_thompson.png",
            alt: "Alex Thompson persona: director needs and tool priorities.",
            width: 3840,
            height: 2160,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/studioflow/studioflow_persona_jessica_martinez.png",
            alt: "Jessica Martinez persona: producer needs and tool priorities.",
            width: 3840,
            height: 2160,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/studioflow/studioflow_persona_michael_green.png",
            alt: "Michael Green persona: editor needs and tool priorities.",
            width: 3840,
            height: 2160,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/studioflow/studioflow_persona_sarah_kim.png",
            alt: "Sarah Kim persona: VFX supervisor needs and tool priorities.",
            width: 3840,
            height: 2160,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final designs bring together dashboard and collaboration, production and asset management, and operational tools into a cohesive platform — each surface optimized for its role in the production day while sharing project data, media assets, and approval status across the system.",
        ],
        implementTabs: STUDIOFLOW_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "headlines",
    title: "Headlines",
    description:
      "Direct high-level messaging from media outlets.",
    image: "/projects/headlines/headlines_card.webp",
    alt: "Headlines brand illustration for direct media messaging.",
    width: 1792,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "News consumption is fragmented — users bounce between apps, websites, and social feeds trying to stay informed, often drowning in full-length articles when they only need the headline and source. Media outlets, in turn, struggle to deliver high-level messaging that drives traffic without demanding full article engagement upfront.",
        "Headlines is a direct messaging widget that surfaces the essential story — source, headline, brief description, and a read-more link — in a glanceable, auto-rotating card powered by live news feeds. Designed for embeddable use in dashboards, lobby displays, and briefing tools where clarity and speed matter more than depth.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "Web Widget, API Integration",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required looking at how people actually consume news in high-traffic, low-attention environments — office lobbies, executive dashboards, and mobile lock screens where users want the headline, not the article. Published research on attention and retention made the design constraint clear:",
          "Four user groups were identified, each with distinct priorities for how news should be surfaced:",
        ],
        researchInsightsAfterParagraphIndex: 0,
        researchInsights: HEADLINES_RESEARCH_INSIGHTS,
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Casual Reader",
              col2:
                "Wants quick headline scanning with minimal friction — large type, auto-advancing stories, and one-tap access to full articles.",
            },
            {
              col1: "Executive Briefing",
              col2:
                "Needs curated, high-level news summaries with clear source attribution for decision-making without reading full articles.",
            },
            {
              col1: "Media Publisher",
              col2:
                "Needs branded distribution that drives outbound traffic — source visibility, read-more links, and embeddable placement.",
            },
            {
              col1: "Developer / Integrator",
              col2:
                "Needs a reliable API-powered feed, responsive embed, and configurable rotation for integration into existing products.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "The widget was structured around a minimal interaction model — fetch, display, rotate, and link out — with each element serving a distinct role in the headline-first experience.",
        ],
        table: {
          ariaLabel: "Core capabilities and user needs",
          rows: [
            {
              col1: "Headline Display",
              col2:
                "Large responsive typography that communicates the story at a glance.",
            },
            {
              col1: "Source Attribution",
              col2:
                "Clear author and outlet labeling to establish credibility and drive publisher traffic.",
            },
            {
              col1: "Auto-Rotation",
              col2:
                "Timed story cycling with a progress indicator for passive, glanceable consumption.",
            },
            {
              col1: "Read More",
              col2:
                "Single outbound link to the full article for users who want depth.",
            },
            {
              col1: "API Feed",
              col2:
                "Live news integration pulling latest headlines from a news API.",
            },
            {
              col1: "Embeddable Widget",
              col2:
                "Self-contained card designed for embedding in dashboards, displays, and web apps.",
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
            text: "Mapping the news consumption journey revealed that the critical moment is the first three seconds — users decide whether a story is relevant based on headline and source alone. Full descriptions and read-more links serve users who stay, but the headline IS the product for most glance interactions.",
          },
          {
            type: "journeyTable",
            tableAriaLabel:
              "Headlines casual reader journey map across awareness through continued engagement",
            columns: HEADLINES_CASUAL_READER_JOURNEY_COLUMNS,
          },
          {
            type: "paragraph",
            text: "The auto-rotation model maps to passive consumption contexts — lobby screens, dashboard widgets, and ambient displays where users aren't actively browsing but still want to stay informed.",
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "The interaction architecture is intentionally minimal — a single card surface that cycles through API-fed stories on a timed interval, with no navigation, search, or settings to complicate the glance experience.",
          "Typography hierarchy places the headline at 5vw scale with source and description supporting at smaller weights — ensuring the story title dominates visual attention in any embed context.",
        ],
        userFlowTabs: HEADLINES_USER_FLOW_TABS,
      },
      {
        title: "Test",
        paragraphs: [
          "Feature prioritization confirmed that headline-first typography and auto-rotation are universal priorities — but persona differences emerged in how users weight source attribution versus API integration.",
          "Publishers ranked source attribution and read-more links highest, reflecting traffic-driving needs, while developers prioritized API-powered feeds and embeddability. These differences shaped what is visible on the card surface versus handled in the integration layer.",
        ],
        featureRankingChartsAfterParagraphIndex: 0,
        featureRankingData: HEADLINES_FEATURE_RANKING_DATA,
      },
      {
        title: "Refine",
        paragraphs: [
          "Refinement focused on the balance between visual impact and information density — ensuring the purple branded card feels authoritative without overwhelming smaller embed contexts.",
          "The API integration layer was designed to be provider-agnostic, with the live prototype demonstrating Currents API fetch, parse, render, and rotation in a self-contained embeddable script.",
        ],
        figures: [
          {
            afterParagraphIndex: 1,
            src: "/projects/headlines/headlines_codecard.png",
            alt: "Headlines API integration: Currents API fetch, display, and rotation logic.",
            width: 2000,
            height: 1080,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final design delivers a self-contained headline widget — bold branded card, live news feed, timed rotation, and outbound linking — ready for embedding in any context where direct, high-level messaging from media outlets is the goal. The live demo below recreates the original Webflow embed using free public RSS feeds.",
        ],
        implementTabs: HEADLINES_IMPLEMENT_TABS,
      },
    ],
  },
  {
    slug: "foodtrack",
    title: "Foodtrack",
    description:
      "Restaurant inventory management platform.",
    image: "/projects/foodtrack/foodtrack_card.webp",
    alt: "Foodtrack brand illustration for restaurant inventory management.",
    width: 1792,
    height: 1024,
    overview: {
      title: "Overview",
      paragraphs: [
        "Efficient ingredient management remains a significant challenge for restaurants — impacting cost control, food quality, and operational efficiency. Overstocking drives waste and higher costs; understocking leads to menu shortages and dissatisfied customers. Coordinating multiple suppliers, varying delivery schedules, and accurate records only compounds the problem.",
        "Foodtrack is a restaurant inventory management platform designed to give kitchen teams real-time visibility into stock levels, qty alerts, category analytics, and recipe-aware planning — reducing waste while keeping the line stocked through service.",
      ],
      role: "UX Research, Product Design, Interaction Design",
      scope: "Web App, Kitchen Display",
    },
    sections: [
      {
        title: "Research",
        paragraphs: [
          "Understanding this problem required getting close to the physical kitchen — prep wells, hotel pans, portioning under time pressure, and the gap between what the POS knows and what is actually in the walk-in. High-volume counter service and sandwich lines made the stakes visible: when stock is wrong, the guest sees it immediately.",
          "Four primary user groups were identified, each with distinct priorities across inventory, prep, and cost control:",
        ],
        figures: [
          {
            afterParagraphIndex: 0,
            src: "/projects/foodtrack/foodtrack_kitchen.jpg",
            alt: "High-volume restaurant line: prep wells, portioned ingredients, and POS displays during service.",
            width: 1200,
            height: 600,
          },
          {
            afterParagraphIndex: 0,
            src: "/projects/foodtrack/foodtrack_haccp.webp",
            alt: "Sandwich prep line with hotel pans of ingredients and gloved hands assembling an order.",
            width: 1200,
            height: 628,
          },
        ],
        table: {
          ariaLabel: "Research personas and primary needs",
          rows: [
            {
              col1: "Kitchen Manager",
              col2:
                "Needs real-time stock visibility, low-stock alerts, demand prediction, and clean shift handoffs.",
            },
            {
              col1: "Line Cook",
              col2:
                "Needs fast qty alerts, portion standards, and digital recipe access without leaving the line.",
            },
            {
              col1: "Head Chef",
              col2:
                "Needs recipe cost simulation, consistent portioning, and practical new-recipe trials.",
            },
            {
              col1: "Restaurant Owner",
              col2:
                "Needs waste monitoring, category analytics, and automated reordering to protect margins.",
            },
          ],
        },
      },
      {
        title: "User Stories",
        paragraphs: [
          "The platform was structured around five operational challenge areas — each spanning digital inventory and the physical constraints of prep — rather than a single generic stock list.",
        ],
        table: {
          ariaLabel: "Challenge areas and solution focus",
          rows: [
            {
              col1: "Inventory Management",
              col2:
                "Track real-time usage, predict demand from history, alert on low stock, and support automated reordering.",
            },
            {
              col1: "Recipe Control",
              col2:
                "Standardize portions and instructions so quality stays consistent across servings and shifts.",
            },
            {
              col1: "Efficient Ingredient Use",
              col2:
                "Reduce waste through whole-ingredient strategies, prep technique, and waste-pattern monitoring.",
            },
            {
              col1: "Order Processing Speed",
              col2:
                "Keep the line moving during peak — clear stock status so 86 decisions happen early, not mid-ticket.",
            },
            {
              col1: "New Recipe Development",
              col2:
                "Trial recipes at small scale with cost and prep-time simulation before full-menu rollout.",
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
            text: "Mapping a kitchen manager's day revealed that friction clusters at the edges of service — open and close — where paper counts, incomplete handoffs, and untracked waste create the next shift's problems. Live visibility during service matters, but accurate open and close loops determine whether the system can be trusted.",
          },
          {
            type: "journeyTable",
            tableAriaLabel:
              "Foodtrack kitchen manager journey map across open through improve",
            columns: FOODTRACK_KITCHEN_MANAGER_JOURNEY_COLUMNS,
          },
          {
            type: "paragraph",
            text: "That insight shaped the product around qty alerts and category charts that work as a morning briefing tool and a closeout companion — not only as a mid-service dashboard.",
          },
        ],
      },
      {
        title: "User Flows",
        paragraphs: [
          "Before high-fidelity polish, the interaction model was mapped around the core kitchen inventory loop — log stock, watch alerts, read category charts, and hand off a clean count to the next shift.",
          "Each flow below is designed to be completable under line pressure: minimal fields, clear qty-alert thresholds, and charts that answer “what is short?” without opening a separate report.",
        ],
        table: {
          ariaLabel: "Core user flows and interaction steps",
          rows: [
            {
              col1: "Add Item to Inventory",
              col2:
                "Select food category → enter subcategory → set quantity, qty alert, weight, and date → assign a color tag → confirm. Item appears on the dashboard as a scannable card.",
            },
            {
              col1: "Auto Populate (Training)",
              col2:
                "Load sample inventory across categories for demos and staff training — fruits, vegetables, dairy, meat, and more — without manual entry of every SKU.",
            },
            {
              col1: "Monitor Qty Alerts",
              col2:
                "Compare live quantity against each item’s qty-alert threshold on cards and charts. Act when stock approaches the alert before a dish has to be 86’d.",
            },
            {
              col1: "Review Category Quantity",
              col2:
                "Open the category quantity chart to scan all items at once — quantity bars against alert baselines — then prioritize restock or prep for the next service block.",
            },
            {
              col1: "Drill Into a Category",
              col2:
                "Add a category chart (e.g. Fruits) to focus on one group. Close or switch charts as the shift focus moves from prep to reorder.",
            },
            {
              col1: "Update & Close Out",
              col2:
                "Adjust quantities and weights after prep or delivery, remove depleted items, and leave an accurate dashboard for the next manager or cook on shift.",
            },
          ],
        },
      },
      {
        title: "Test",
        paragraphs: [
          "Instead of another ranking exercise, we ran timed usability tasks against an early dashboard prototype — same screen, four roles — to see which jobs the home surface actually supported.",
        ],
        table: {
          ariaLabel: "Usability task pass/fail outcomes by kitchen role",
          rows: [
            {
              col1: "Find items below alert threshold from home",
              col2:
                "Pass — kitchen managers and line cooks completed this quickly using live inventory and low-stock alerts.",
            },
            {
              col1: "Estimate recipe cost after a portion change",
              col2:
                "Fail on home — chefs left the inventory view looking for portion standards and cost simulation that weren't primary.",
            },
            {
              col1: "Review waste without opening a secondary report",
              col2:
                "Fail — owners could not reach waste monitoring from the main inventory surface.",
            },
          ],
        },
      },
      {
        title: "Refine",
        paragraphs: [
          "Refinement focused on making inventory entry fast enough for the line — minimal fields, color tags for scanability, and charts that show qty-alert thresholds against current quantity without requiring a separate report.",
          "Dashboard explorations from the live prototype refined four complementary views: an empty ready state for first use, a populated category-quantity overview, the add-item entry form, and a dark-mode service display for kitchen screens.",
        ],
        figuresLayout: "grid-2",
        figures: [
          {
            afterParagraphIndex: 1,
            src: "/projects/foodtrack/foodtrack_dash_empty.png",
            alt: "Foodtrack empty dashboard with category quantity chart ready for inventory data.",
            width: 2352,
            height: 2108,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/foodtrack/foodtrack_dash_populated.png",
            alt: "Foodtrack populated dashboard with category quantity bars and item cards.",
            width: 2352,
            height: 2108,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/foodtrack/foodtrack_dash_add_item.png",
            alt: "Foodtrack add-item form with category, quantity, qty alert, weight, date, and color fields.",
            width: 2352,
            height: 2108,
          },
          {
            afterParagraphIndex: 1,
            src: "/projects/foodtrack/foodtrack_dash_dark.png",
            alt: "Foodtrack dark-mode dashboard with category quantity chart for kitchen display use.",
            width: 2352,
            height: 2108,
          },
        ],
      },
      {
        title: "Implement",
        paragraphs: [
          "The final prototype delivers a self-contained kitchen inventory experience — item entry, auto-populate, qty alerts, weights, and category charts — ready for usability testing and further integration with supplier and recipe workflows.",
        ],
        implementTabs: FOODTRACK_IMPLEMENT_TABS,
      },
    ],
  },
];

const bySlug = new Map(
  [...pastProjects, ...recentProjects2023_2026].map((p) => [p.slug, p])
);

/**
 * Row-major order for the /projects grid (top-left → right, then next row).
 * Remaining projects follow in alphabetical order by title.
 */
export const PAST_PROJECT_GRID_ORDER: readonly string[] = [
  "oasis",
  "ai-camera-nodit",
  "h2-audio",
  "smart-hydration-platform",
  "solar-field-installation",
  "medical-recovery-systems",
  "teleoperation-station",
  "voxelplm",
  "mdx",
  "lllt-knee-osteoarthritis",
];

/** Optional manual order for the 2023–2026 grid (same pattern as past projects). */
export const RECENT_PROJECT_GRID_ORDER: readonly string[] = [
  "additive-mfg-roi-dashboard",
  "cell-gene-therapy-platform",
  "chemical-cx-platform",
  "additive-mfg-cx-data-platform",
  "dialysis-management",
  "connect-pool-robot-app",
  "additive-mfg-print-sim-scan",
  "coco",
  "petricor",
  "aureum",
  "equipify",
  "studioflow",
  "headlines",
  "foodtrack",
];

export function sortPastProjectsForGrid(
  projects: readonly PastProject[],
  gridOrder: readonly string[] = PAST_PROJECT_GRID_ORDER
): PastProject[] {
  const map = new Map(projects.map((p) => [p.slug, p]));
  const ordered: PastProject[] = [];
  const seen = new Set<string>();
  for (const slug of gridOrder) {
    const p = map.get(slug);
    if (p) {
      ordered.push(p);
      seen.add(slug);
    }
  }
  const rest = projects
    .filter((p) => !seen.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title));
  return [...ordered, ...rest];
}

export function getPastProject(slug: string): PastProject | undefined {
  return bySlug.get(slug);
}

export function getPastProjectSlugs(): string[] {
  return [...recentProjects2023_2026, ...pastProjects].map((p) => p.slug);
}
