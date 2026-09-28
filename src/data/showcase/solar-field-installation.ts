import type { JourneyMapColumn, PastProject } from "@/data/past-projects";

const ASPECTS: JourneyMapColumn = {
  header: "Aspect",
  rows: ["Doing", "Thinking", "Feeling", "Pain points", "Opportunities"],
};

const BUYER_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Consider",
    rows: [
      "Compares the utility bill with a quote for a fixed array",
      "“We can’t close the site for months of construction.”",
      "Interested, wary",
      "Capital cost, permits, piles and trenching on land they use",
      "No groundwork: price it as a lease or PPA",
    ],
  },
  {
    header: "Survey",
    rows: [
      "Shares the site boundary and a year of bills",
      "“How much will it actually save?”",
      "Uncertain",
      "Savings are a sales estimate, not their own numbers",
      "Savings estimate from their site, their sun and their rate",
    ],
  },
  {
    header: "Deploy",
    rows: [
      "Watches trucks arrive and units drive into rows",
      "“That’s it? No crew?”",
      "Relieved",
      "Doesn’t know when the power starts",
      "Progress they can see: units paired, formed, energized",
    ],
  },
  {
    header: "Operate",
    rows: [
      "Checks output and savings each week",
      "“Is it doing what they promised?”",
      "Confident",
      "Monitoring apps show kilowatts, not dollars",
      "Savings against the utility rate, and a monthly statement",
    ],
  },
  {
    header: "Service",
    rows: [
      "Sees a unit stopped in the field",
      "“Do I need to call someone?”",
      "Anxious",
      "No idea whether anyone knows",
      "Service status that shows the fix already under way",
    ],
  },
];

const OPS_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Onboard",
    rows: [
      "Pairs a truckload of units at the portal and assigns a site",
      "“Did every unit pass inspection?”",
      "Focused",
      "Hardware checks live in separate tools",
      "Register → site → layout → deploy, in one flow",
    ],
  },
  {
    header: "Monitor",
    rows: [
      "Scans every fleet across every customer",
      "“Where do I look first?”",
      "Stretched",
      "Hundreds of units; alarms only for lost output",
      "One map and a ranked list of risk",
    ],
  },
  {
    header: "Predict",
    rows: [
      "Reviews motor, bearing, actuator and soiling trends",
      "“Which of these fails this month?”",
      "In control",
      "Failures found after the customer notices",
      "Per-component failure forecasts with a recommended action",
    ],
  },
  {
    header: "Dispatch",
    rows: [
      "Sends a spare and routes a field tech",
      "“Can the fleet cover the gap itself?”",
      "Busy",
      "Every fault is a truck roll",
      "Faulted units drive to the service lane; a spare takes the slot",
    ],
  },
  {
    header: "Report",
    rows: [
      "Answers tickets and closes out the SLA",
      "“Did we keep our uptime promise?”",
      "Accountable",
      "Evidence is scattered across logs",
      "Tickets beside the unit’s full telemetry and uptime per contract",
    ],
  },
];

const LESSOR_JOURNEY: readonly JourneyMapColumn[] = [
  ASPECTS,
  {
    header: "Originate",
    rows: [
      "Qualifies new sites and customers",
      "“Is this site worth a fleet?”",
      "Optimistic",
      "Land, permits and interconnection take months",
      "Survey-led quotes without land acquisition",
    ],
  },
  {
    header: "Contract",
    rows: [
      "Moves deals from survey to deploy",
      "“When do these units start earning?”",
      "Impatient",
      "Pipeline lives in spreadsheets",
      "A lease pipeline tied to real units",
    ],
  },
  {
    header: "Earn",
    rows: [
      "Tracks utilization and revenue per unit",
      "“Which sites are underperforming?”",
      "Watchful",
      "Output data is per site, not per asset",
      "Portfolio view across customers",
    ],
  },
  {
    header: "Redeploy",
    rows: [
      "Moves idle units to a new contract",
      "“Can I move them without a crew?”",
      "Pleased",
      "Fixed arrays can’t move",
      "Units re-form or relocate on their own",
    ],
  },
  {
    header: "Report",
    rows: [
      "Prepares production reports for lenders",
      "“Will this satisfy the covenant?”",
      "Pressured",
      "Reports assembled by hand",
      "Covenant-ready production reports",
    ],
  },
];

export const project: PastProject = {
  slug: "solar-field-installation",
  category: "hardware",
  title: "SolarSwarm",
  description:
    "An automated solar field: sun-tracking robots that arrive on a truck, drive into formation and install themselves, with a platform for the people who buy the power, lease the fleet and keep it running.",
  image: "/projects/solar-field-installation/solar-field-installation_card.webp",
  alt: "SolarSwarm robots in a field at dusk: wheeled units with raised, sun-tracking solar panels.",
  width: 1280,
  height: 720,
  liveUrl: "https://solarswarm.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "A utility-scale solar field is built by hand. Hundreds of workers drive piles, assemble racking and bolt on modules for months before the first kilowatt, and the result can never move.",
      "SolarSwarm turns the array into a fleet. Each unit is a robot with its own tracking panel and battery. They arrive on a flatbed, drive into formation, follow the sun on two axes, and carry their own energy to a swap station. A role-aware platform gives the customer, the fleet owner and the operations team each the view their job needs.",
    ],
    role: "Product Design, Industrial Design, Service Design, UX Research, 3D Modeling & Rendering, Design System, Front-end Build",
    scope:
      "Robot concept and procedural 3D model, marketing site with a scroll-driven 3D deployment, and a fleet-management and energy platform: role-aware overview, fleet map, robots and digital twin, energy, predictive maintenance and onboarding.",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "The starting point was progress footage from Phase 1 of the Hazlehurst Solar Farm: 20 MW, more than 200 workers on site and tens of thousands of modules set by hand. For a field that size, the base frame alone can take three to five months.",
        "The question was whether automation could cut installation time and raise savings: a modular robotics platform, so a site spends its time collecting energy rather than coordinating structures, cabling and crews.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/diagram-baseline.webp",
          alt: "A 20 MW solar field is a construction project. An illustrative sequence of a conventional build: site prep, piles and racking (the longest phase, three to five months), module setting of 54,156 modules, string wiring and commissioning. Below it, the SolarSwarm concept: deliver, deploy and track in days per array block, with no piles, racking or trenching. Stats: 20 MW Hazlehurst Phase 1, 200+ workers on site at peak, 54,156 modules set by hand, 3–5 months for the base frame alone.",
          width: 2400,
          height: 1487,
        },
      ],
      topicGroups: [
        {
          title: "Why a solar field takes so long",
          items: [
            {
              title: "Built in place, by hand",
              body: "Racking, modules and wiring go in station by station, with many trades sharing one site.",
            },
            {
              title: "Permanent from day one",
              body: "Piles and trenches fix the layout. The field can’t follow a crop rotation, a lease or a new customer.",
            },
            {
              title: "Tracking is a compromise",
              body: "Fixed tilt or single-axis trackers trade yield for cost across a whole row.",
            },
          ],
        },
      ],
      stats: [
        { value: "20 MW", label: "Reference build", detail: "Hazlehurst Solar Farm, Phase 1." },
        { value: "200+", label: "Workers on site", detail: "Across racking, modules and wiring." },
        { value: "54,156", label: "Modules set", detail: "Each one carried and bolted on." },
        { value: "3–5 mo", label: "Base frame alone", detail: "Before any module produces power." },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "The research was secondary. Job postings for the people who build and run solar fields showed what the work is today, and who would feel the change first. Each role maps to a new one in a robotic model, which made re-skilling part of the product brief.",
        "From those roles and the business model, I drew three proto-personas. They look at the same fleet but ask different questions, so the platform switches roles instead of putting everything on one dashboard.",
        "A review of fifteen solar monitoring dashboards, from home apps to utility portals, found the same pattern everywhere: generation, earnings and weather for one site. None dealt with equipment that moves, wears out or belongs to someone else.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/diagram-stakeholders.webp",
          alt: "Automation changes the jobs, not just the hardware. Four roles from job postings map to platform roles: the field operations coordinator becomes a fleet dispatcher; the business development manager for front-of-the-meter solar and storage becomes a lessor or portfolio owner; the solar racking and tracker senior engineer becomes a swarm layout engineer; the robotics deployment safety manager becomes SolarSwarm Ops. Installation trades go from 200+ people to a delivery crew of three.",
          width: 2400,
          height: 1236,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/solar-field-installation/diagram-personas.webp",
          alt: "Three proto-personas. Dana buys the power for a water district and wants on-site solar without construction, and proof of savings. Marcus leases the fleet across many sites and wants every unit earning and idle ones redeployed. Ren runs SolarSwarm Ops and wants to catch failures before customers notice. Each card lists goal, friction, jobs to be done and the platform views they use.",
          width: 2400,
          height: 1286,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/solar-field-installation/diagram-landscape.webp",
          alt: "Solar dashboards report output; a robot fleet needs operations. Comparison of what a typical dashboard shows against the SolarSwarm platform. Both show energy produced and earnings. Weather appears in some dashboards. Unit position and activity, component health forecasts, battery swaps, multi-site portfolios with leases, and role-specific views were not found in the review; SolarSwarm covers all of them.",
          width: 2400,
          height: 1247,
        },
      ],
      topicGroups: [
        {
          title: "Findings and insights",
          items: [
            {
              title: "The crew is the cost",
              body: "Most of the time and money goes into coordinating people on site, not into the panels themselves.",
            },
            {
              title: "Every role changes",
              body: "Coordinators, engineers and safety managers all keep a job, but a different one. Each needs its own view.",
            },
            {
              title: "Customers buy savings",
              body: "A buyer judges the system in dollars against the utility rate, not in kilowatts.",
            },
            {
              title: "Fleets fail differently",
              body: "Motors, bearings, actuators and dirty glass wear out before output drops. Maintenance has to be predictive.",
            },
          ],
        },
      ],
      stats: [
        { value: "4", label: "Roles from job postings", detail: "Coordinator, BD, tracker engineering, robotics safety." },
        { value: "3", label: "Proto-personas", detail: "Buyer, lessor and Ops." },
        { value: "15", label: "Dashboards reviewed", detail: "Home apps to utility portals." },
      ],
    },
    {
      title: "Service Blueprint",
      paragraphs: [
        "A service blueprint put the three people and the robots on one timeline, from survey to growth. The customer’s path sits above the line of visibility; Ops and the fleet do the work beneath it, and every stage needs a screen.",
        "The two low points are the start, when a customer fears disruption, and the first fault, when they don’t know if anyone has noticed. The fault shaped the platform most: a unit that forecasts its own failure, drives to the service lane and is replaced by a spare turns the lowest point into proof the service works.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/diagram-journey.webp",
          alt: "Service blueprint in six stages: Survey, Lease, Deploy, Operate, Service and Grow. Lanes show what the customer does, how it feels, what SolarSwarm Ops does, what the robots do and which platform screen supports it. The feeling curve starts low at Survey (“Will this disrupt the site?”), peaks at Operate (“31% more than fixed panels.”), dips at Service (“Unit 238 stopped. Now what?”) and recovers at Grow.",
          width: 2400,
          height: 1341,
        },
      ],
    },
    {
      title: "Journey Maps",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Each persona then got a journey map of their own. The pain points cluster where today’s systems are fixed in place or report only output, and each opportunity became a screen.",
        },
        {
          type: "journeyAccordion",
          value: "buyer",
          title: "Dana, buys the power",
          defaultOpen: true,
          tableAriaLabel: "Buyer journey map, five stages",
          columns: BUYER_JOURNEY,
        },
        {
          type: "journeyAccordion",
          value: "ops",
          title: "Ren, runs SolarSwarm Ops",
          tableAriaLabel: "SolarSwarm Ops journey map, five stages",
          columns: OPS_JOURNEY,
        },
        {
          type: "journeyAccordion",
          value: "lessor",
          title: "Marcus, leases the fleet",
          tableAriaLabel: "Lessor journey map, five stages",
          columns: LESSOR_JOURNEY,
        },
      ],
    },
    {
      title: "How It Works",
      paragraphs: [
        "The original concept had four steps: deliver by flatbed, queue and sync, form up from the site survey, activate. Designing the full system added two more. A portal washes and inspects every unit on its way in, and a swap loop replaces the trenching and cable runs a field normally needs.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/diagram-deploy.webp",
          alt: "How it works in five steps: deliver (flatbeds carry six units each), wash and inspect at the portal, form up from the survey with the farthest slots filled first, raise and track on two axes, and swap and deliver a charged cassette in about 90 seconds. Energy path: panel, 5 kWh cassette, swap station rack as the site battery, inverter and grid tie, site load or export.",
          width: 2400,
          height: 1034,
        },
      ],
      stats: [
        { value: "3 days", label: "Truck to energized", detail: "The design target for an array block." },
        { value: "+31%", label: "Yield vs. fixed tilt", detail: "From dual-axis tracking, modeled on the real sun." },
        { value: "0", label: "Piles, trenches or racking", detail: "Units drive onto existing ground." },
        { value: "90 s", label: "Battery swap", detail: "A charged 5 kWh cassette, back to the slot." },
      ],
    },
    {
      title: "The Unit",
      paragraphs: [
        "Every unit is a self-contained tracker on wheels. The original sketches settled the parts, sensors and lighting; the final model resolves them into something that can be delivered, handled and serviced in a field.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-studio.webp",
          alt: "Studio render of a SolarSwarm unit with its panel raised on the mast.",
          width: 1600,
          height: 1600,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-gate.webp",
          alt: "Render of the wash-and-inspect portal each unit rolls through on arrival.",
          width: 1800,
          height: 1200,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-detail-sensor.webp",
          alt: "Detail render of the sensor face: solid-state LiDAR and stereo cameras.",
          width: 1600,
          height: 1200,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-detail-wheel.webp",
          alt: "Detail render of a hub-motor wheel under its arch flare.",
          width: 1600,
          height: 1200,
        },
      ],
      figuresLayout: "grid-2",
      topicGroups: [
        {
          title: "Anatomy",
          items: [
            { title: "Dual-axis gimbal", body: "±60° tilt and 360° azimuth, following the real solar ephemeris." },
            { title: "Telescoping mast", body: "Raises the panel above crops and brush, and stows low for transport and wind." },
            { title: "360° perception", body: "LiDAR and stereo cameras in the face, corner cameras, and ultrasonics for the ground under the panel." },
            { title: "Dual RTK-GNSS", body: "Antennas in the panel corners, above the shade, for centimeter position and heading." },
            { title: "5 kWh LFP cassette", body: "Drops out of the belly at the swap station; compute and fuses sit under a latched hatch." },
            { title: "Built to be handled", body: "Grab rails, recovery points, a hitch and dock contacts: towable, liftable, forkable." },
          ],
        },
      ],
    },
    {
      title: "In the Field",
      paragraphs: [
        "Cycles renders from the same model show the sequence the site animates: units rolling off the truck, driving into formation, tracking as one array, and queuing at the swap station.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-onboarding.webp",
          alt: "Render: robots rolling down the ramps of a flatbed truck toward the wash-and-inspect portal.",
          width: 1800,
          height: 1013,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-formation.webp",
          alt: "Render: units driving into formation across an open field.",
          width: 1800,
          height: 1013,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-array.webp",
          alt: "Render: a finished array with masts raised and every panel tracking the sun.",
          width: 1800,
          height: 1013,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/render-swap.webp",
          alt: "Render: robots climbing the ramp of the battery swap station, one parked over a swap port.",
          width: 1800,
          height: 1013,
        },
      ],
      figuresLayout: "grid-2",
    },
    {
      title: "Architecture",
      paragraphs: [
        "One procedural Blender model is the source for both the rendered stills and the rigged 3D models in the browser, whose node names are the contract with the code. A real sun ephemeris drives both the panels in 3D and the energy model, and a seeded simulation of sites, units, leases and wear feeds every role’s view.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/solar-field-installation/diagram-architecture.webp",
          alt: "Architecture. Sources: a procedural Blender model producing Cycles renders and rigged GLBs, and suncalc for real sun positions and dual-axis poses. A seeded simulation in the browser models the world (784 units across 4 sites), energy (clear-sky generation, battery dispatch, grid export, tracking gain) and health (wear to risk to failure predictions). A role-aware Next.js app serves the marketing site and the platform, with Three.js instanced meshes and MapLibre on open imagery.",
          width: 2400,
          height: 1224,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            {
              title: "One source of truth",
              body: "The robot in a render, in the browser and in the twin is the same model with the same moving parts.",
            },
            {
              title: "A view per role",
              body: "Buyer, lessor and Ops share data but not screens. Switching roles changes the whole platform.",
            },
            {
              title: "Simulated, not mocked",
              body: "Every number comes from the same seeded model, so the map, the energy page and the twin always agree.",
            },
          ],
        },
      ],
    },
    {
      title: "Design System",
      paragraphs: [
        "The marketing site and the platform share one design system, documented on a live /design-system page that renders every token and the real components, so the reference can’t drift from the product.",
        "Tokens come in two layers. Raw ramps (swarm violet, battery copper, graphite and paper) are the only values a theme changes; semantic tokens map onto them, and dark mode redefines each one rather than inverting light.",
      ],
      topicGroups: [
        {
          title: "Rules",
          items: [
            {
              title: "Violet runs, copper stores",
              body: "Swarm violet marks intelligence and action; battery copper marks energy and storage.",
            },
            {
              title: "Status is never color alone",
              body: "Robot status colors are reserved and always paired with an icon and a label.",
            },
            {
              title: "Numbers in mono",
              body: "Telemetry uses Geist Mono with tabular figures, so live values don’t jitter as they update.",
            },
            {
              title: "Our own controls",
              body: "Select and menu are custom listboxes, never the native popup, so they match the theme on every OS.",
            },
          ],
        },
      ],
      stats: [
        { value: "2", label: "Themes", detail: "Light and dark, each fully specified." },
        { value: "12", label: "Semantic tokens", detail: "Surfaces, text and six intents." },
        { value: "6", label: "Chart series", detail: "Fixed order, color-vision checked." },
        { value: "3", label: "Motion durations", detail: "140, 260 and 520 ms." },
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/solar-field-installation/ds-intro.webp",
            alt: "SolarSwarm Design System header on the swarm gradient: violet for intelligence and motion, battery copper for energy, on graphite and paper neutrals, in light and dark.",
            width: 1800,
            height: 1125,
            title: "Live reference",
            caption: "The /design-system page renders every token and real component.",
          },
          {
            src: "/projects/solar-field-installation/ds-brand.webp",
            alt: "Brand gradients: Swarm (violet), Battery copper, and Dusk for hero skies, each with its stops.",
            width: 1800,
            height: 1125,
            title: "Brand gradients",
            caption: "Swarm leads; copper is the accent for energy and CTAs.",
          },
          {
            src: "/projects/solar-field-installation/ds-color.webp",
            alt: "Color ramps: violet (swarm) from 950 to 50, copper (battery) from 900 to 100, and graphite neutrals.",
            width: 1800,
            height: 1125,
            title: "Color ramps",
            caption: "Raw ramps are the only values a theme touches.",
          },
          {
            src: "/projects/solar-field-installation/ds-semantic.webp",
            alt: "Semantic tokens in dark mode: bg, surface, surface-2, border, text, text-muted, primary, accent, success, warning, danger and info.",
            width: 1800,
            height: 1125,
            title: "Semantic tokens, dark",
            caption: "Components only use semantic names.",
          },
          {
            src: "/projects/solar-field-installation/ds-semantic-light.webp",
            alt: "The same semantic tokens in light mode.",
            width: 1800,
            height: 1125,
            title: "Semantic tokens, light",
            caption: "Each token is redefined for dark, not inverted.",
          },
          {
            src: "/projects/solar-field-installation/ds-data.webp",
            alt: "Data visualization palette: six chart series from solar generation to other, and robot status chips for tracking, charging, moving, docked and fault, each with an icon.",
            width: 1800,
            height: 1125,
            title: "Data palette",
            caption: "Fixed series order, checked for color-vision deficiency.",
          },
          {
            src: "/projects/solar-field-installation/ds-type.webp",
            alt: "Typography: Geist for display and interface, from a large display line to body text, and Geist Mono for telemetry such as 412.6 kW and SS-10238.",
            width: 1800,
            height: 1125,
            title: "Typography",
            caption: "Geist for interface, Geist Mono for telemetry.",
          },
          {
            src: "/projects/solar-field-installation/ds-components.webp",
            alt: "Components: buttons (primary swarm, copper, secondary, outline, ghost, danger), badges and status, metric tiles with sparklines, and gauges for availability and state of charge.",
            width: 1800,
            height: 1125,
            title: "Buttons, badges and gauges",
            caption: "Metric tiles pair a value with its trend.",
          },
          {
            src: "/projects/solar-field-installation/ds-components-nav.webp",
            alt: "Navigation and inputs: a segmented control, tabs and a toggle; and custom Select and menu controls for site and sort, with keyboard support and a bottom sheet on phones.",
            width: 1800,
            height: 1125,
            title: "Navigation, select and menu",
            caption: "Roving focus, and never the native popup.",
          },
          {
            src: "/projects/solar-field-installation/ds-components-stepper.webp",
            alt: "Stepper for register, site, layout and deploy, above a sparkline.",
            width: 1800,
            height: 1125,
            title: "Stepper and sparkline",
            caption: "The onboarding stepper and trend lines.",
          },
          {
            src: "/projects/solar-field-installation/ds-components-light.webp",
            alt: "The components in light mode.",
            width: 1800,
            height: 1125,
            title: "Light theme",
            caption: "Both themes fully specified.",
          },
          {
            src: "/projects/solar-field-installation/ds-radius.webp",
            alt: "Radius scale from xs to xl plus a glow elevation, and motion durations of 140, 260 and 520 ms.",
            width: 1800,
            height: 1125,
            title: "Radius, elevation and motion",
            caption: "Three durations; none under reduced motion.",
          },
          {
            src: "/projects/solar-field-installation/ds-renders.webp",
            alt: "3D and render assets: Cycles renders of the unit, details, formation, array, portal and swap station, with the GLB rig node names.",
            width: 1800,
            height: 1125,
            title: "3D assets",
            caption: "The rig’s node names are the contract with the code.",
          },
        ],
      },
    },
    {
      title: "Product",
      paragraphs: [
        "The marketing site tells the deployment story in 3D as you scroll. The platform behind it is role-aware. Every screen below is from the live product.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/solar-field-installation/site-hero.webp",
            alt: "SolarSwarm homepage hero: Solar fields that deploy themselves, over a live 3D scene of robots with raised panels, and stats for 3 days to energized, +31% yield, 0 piles and 24/7 monitoring.",
            width: 1800,
            height: 1125,
            title: "The premise",
            caption: "Solar fields that deploy themselves.",
          },
          {
            src: "/projects/solar-field-installation/deploy-formation.webp",
            alt: "Scroll-driven 3D deployment: units leaving the portal and driving into formation, with the Drive into formation step highlighted.",
            width: 1800,
            height: 1125,
            title: "Deployment, in 3D",
            caption: "Scroll from convoy to a tracking array.",
          },
          {
            src: "/projects/solar-field-installation/app-ops.webp",
            alt: "Operations overview: 784 units managed, 99% fleet availability, active faults and predicted failures, a fleet map, highest-risk units and a support queue.",
            width: 1800,
            height: 1125,
            title: "Ops overview",
            caption: "Every fleet, every unit, ranked by risk.",
          },
          {
            src: "/projects/solar-field-installation/app-buyer.webp",
            alt: "Buyer view, Your solar: output, generation, savings and uptime for the customer’s own sites, with service alerts.",
            width: 1800,
            height: 1125,
            title: "Buyer view",
            caption: "Output and savings for your sites.",
          },
          {
            src: "/projects/solar-field-installation/app-map.webp",
            alt: "Fleet map on Sentinel-2 satellite imagery with four sites and a list of sites, unit counts and faults.",
            width: 1800,
            height: 1125,
            title: "Fleet map",
            caption: "Sites and units on satellite imagery.",
          },
          {
            src: "/projects/solar-field-installation/app-twin.webp",
            alt: "Unit SS-10238 detail: a 3D digital twin of the robot, live telemetry, predicted failure and remote actions.",
            width: 1800,
            height: 1125,
            title: "Digital twin",
            caption: "Panel pose, mast and LEDs mirror telemetry.",
          },
          {
            src: "/projects/solar-field-installation/app-energy.webp",
            alt: "Energy in and out: solar in, site load, battery cycled, grid export and import, and today’s power flows chart.",
            width: 1800,
            height: 1125,
            title: "Energy",
            caption: "Solar, storage, load and grid, reconciled.",
          },
          {
            src: "/projects/solar-field-installation/app-maintenance.webp",
            alt: "Maintenance and support: failure forecast by unit and component, recommended actions, soiling by site and support tickets.",
            width: 1800,
            height: 1125,
            title: "Predictive maintenance",
            caption: "Parts ship before anything breaks.",
          },
          {
            src: "/projects/solar-field-installation/mobile.webp",
            alt: "Three phone screens: the overview, energy flows and a unit’s digital twin.",
            width: 1844,
            height: 1280,
            title: "On a phone",
            caption: "The platform in the field.",
          },
        ],
        accordion: [
          {
            value: "site",
            title: "Marketing site",
            description: "The story told in 3D, from the problem to the people it serves.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/solar-field-installation/site-problem.webp",
                alt: "Why SolarSwarm: a table comparing a conventional build with SolarSwarm on time to energize, people on site, groundwork, tracking and site changes.",
                width: 1800,
                height: 1125,
                title: "The problem",
                caption: "Solar shouldn’t take a construction project.",
              },
              {
                src: "/projects/solar-field-installation/deploy-convoy.webp",
                alt: "Deployment step one: a flatbed truck delivering units to the field.",
                width: 1800,
                height: 1125,
                title: "Delivered by a convoy",
                caption: "Six units per flatbed.",
              },
              {
                src: "/projects/solar-field-installation/deploy-track.webp",
                alt: "Deployment step four: the array formed, masts raised and panels tracking.",
                width: 1800,
                height: 1125,
                title: "Raise, unfold, track",
                caption: "The whole array follows the sun.",
              },
              {
                src: "/projects/solar-field-installation/deploy-swap.webp",
                alt: "Deployment step five: full units driving to the swap station.",
                width: 1800,
                height: 1125,
                title: "Swap and deliver",
                caption: "The swarm carries the energy.",
              },
              {
                src: "/projects/solar-field-installation/site-tracking.webp",
                alt: "Every panel faces the sun, all day long: a live 3D comparison with fixed tilt and a chart of output per unit.",
                width: 1800,
                height: 1125,
                title: "Sun tracking",
                caption: "Live dual-axis vs fixed tilt.",
              },
              {
                src: "/projects/solar-field-installation/site-robot.webp",
                alt: "A power plant that parks itself: the robot in 3D with its gimbal, mast, perception, GNSS, battery cassette, drive and Swarm OS.",
                width: 1800,
                height: 1125,
                title: "The unit",
                caption: "A power plant that parks itself.",
              },
              {
                src: "/projects/solar-field-installation/site-energy.webp",
                alt: "Power, carried by the pack: harvest, swap and deliver, beside a render of the swap station.",
                width: 1800,
                height: 1125,
                title: "Energy logistics",
                caption: "Harvest, swap, deliver.",
              },
              {
                src: "/projects/solar-field-installation/site-audiences.webp",
                alt: "Built for the people who use the power, own the fleet and keep it running: a role switcher with a preview of the buyer view.",
                width: 1800,
                height: 1125,
                title: "Audiences",
                caption: "Buyer, lessor and Ops.",
              },
              {
                src: "/projects/solar-field-installation/site-ops.webp",
                alt: "The business that keeps every swarm running: predictive maintenance, fleet map, dispatch, energy, support and SLAs.",
                width: 1800,
                height: 1125,
                title: "SolarSwarm Ops",
                caption: "The business layer.",
              },
            ],
          },
          {
            value: "platform",
            title: "Platform by role",
            description: "Same fleet, three views.",
            slides: [
              {
                src: "/projects/solar-field-installation/app-lessor.webp",
                alt: "Lessor view, Fleet portfolio: units deployed, availability, lease revenue and a lease pipeline.",
                width: 1800,
                height: 1125,
                title: "Lessor view",
                caption: "Utilization, revenue and the lease pipeline.",
              },
              {
                src: "/projects/solar-field-installation/app-robots.webp",
                alt: "Robots table: 784 units with site, status, output, battery, health and firmware, sorted by risk.",
                width: 1800,
                height: 1125,
                title: "Robots",
                caption: "Every unit, sorted by risk.",
              },
            ],
          },
          {
            value: "onboarding",
            title: "Onboarding",
            description: "A truckload of units joins the live fleet.",
            slides: [
              {
                src: "/projects/solar-field-installation/onboard-register.webp",
                alt: "Onboard robots, step one: register units as they pair at the portal.",
                width: 1800,
                height: 1125,
                title: "Register",
                caption: "Units pair at the portal.",
              },
              {
                src: "/projects/solar-field-installation/onboard-site.webp",
                alt: "Onboard robots, step two: choose a new site or extend an existing one on the map.",
                width: 1800,
                height: 1125,
                title: "Choose a site",
                caption: "New site or extend an existing one.",
              },
              {
                src: "/projects/solar-field-installation/onboard-layout.webp",
                alt: "Onboard robots, step three: plan the layout with units per row, spacing and row pitch, and a live preview.",
                width: 1800,
                height: 1125,
                title: "Plan the layout",
                caption: "Row pitch and spacing, previewed live.",
              },
              {
                src: "/projects/solar-field-installation/onboard-deploy.webp",
                alt: "Onboard robots, step four: the 3D deployment playing while units pair and drive to their slots, then commission.",
                width: 1800,
                height: 1125,
                title: "Deploy and commission",
                caption: "Units join the live fleet.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "SolarSwarm takes a board of sketches and renders to a working product story. A solar field becomes something that arrives on a truck and installs itself, and the people around it (the customer, the fleet owner and the operations team) each get a view built for their new job. The site and platform are live.",
      ],
      stats: [
        { value: "3", label: "Roles, one platform", detail: "Buyer, lessor and Ops." },
        { value: "784", label: "Simulated units", detail: "Across four sites on real imagery." },
        { value: "1", label: "Robot model", detail: "Renders, browser 3D and the digital twin." },
        { value: "0", label: "API keys", detail: "Open imagery, map tiles and sun data." },
      ],
    },
  ],
};
