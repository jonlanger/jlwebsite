import type { PastProject, ProjectCarouselSlide } from "@/data/past-projects";
import {
  PETRICOR_ALEX_MORGAN_JOURNEY_COLUMNS,
  PETRICOR_MANUAL_VS_AUTOMATED_COLUMNS,
  PETRICOR_STAKEHOLDER_JOURNEY_COLUMNS,
} from "@/data/petricor-journey-maps";

const APP = "https://petricorcloud.vercel.app";
const DIR = "/projects/petricor";

/** A 1800×1125 screen from the live prototype. */
const screen = (file: string, title: string, caption: string, alt: string): ProjectCarouselSlide => ({
  src: `${DIR}/${file}.webp`,
  alt,
  width: 1800,
  height: 1125,
  title,
  caption,
});

/** A 1920×1200 render of the PC-6 from its parametric Blender model. */
const render = (file: string, title: string, caption: string, alt: string): ProjectCarouselSlide => ({
  src: `${DIR}/hw-${file}.webp`,
  alt,
  width: 1920,
  height: 1200,
  title,
  caption,
});

export const project: PastProject = {
  slug: "petricor",
  category: "software",
  title: "Petricor",
  description:
    "Automated fungi and mould analysis for microbiology labs: a benchtop incubator-imager, its touchscreen, and a cloud platform for review and sign-off.",
  image: `${DIR}/petricor_card.webp`,
  alt: "Petricor touchscreen dish view: an air sample from the incubator room with labelled colonies of P. chrysogenum, A. alternata and C. cladosporioides beside a list of presumptive IDs and diameters.",
  width: 1280,
  height: 720,
  liveUrl: `${APP}/`,
  liveLinks: [
    { label: "PC-6 touchscreen", href: `${APP}/device` },
    { label: "Petricor Cloud", href: `${APP}/app` },
    { label: "Hardware in 3D", href: `${APP}/hardware` },
  ],
  overview: {
    title: "Overview",
    paragraphs: [
      "Fungi and mould analysis in microbiology labs is slow, manual work. Sample preparation, incubation, imaging, identification and reporting can take days, and results vary by technician. Sample volumes in food, pharmaceutical, environmental and clinical labs keep rising, but skilled staff do not.",
      "Petricor automates the whole workflow. The PC-6 incubates and photographs six culture dishes on a schedule, and its touchscreen guides the bench through every step. Petricor Cloud turns each frame into tracked colonies, reviewed results and a signed report. It started as research, journey maps and a Figma system. It is now a working prototype in which the touchscreen and the cloud run against one simulated instrument, so a run started on one lands in the other.",
    ],
    role: "UX Research, Product Design, Interaction Design, Industrial Design, Front-end Build",
    scope:
      "PC-6 benchtop instrument (parametric model and renders), its 10.1″ touchscreen, Petricor Cloud (fleet overview, run review, sign-off, reporting, traceability, species library, 3D mycelium lab) and a marketing site.",
  },
  sections: [
    {
      title: "Research",
      paragraphs: [
        "Understanding this problem meant working alongside microbiologists, mycologists and lab technicians. Software use was only part of it. Sterile technique, equipment calibration and documentation all compete with the actual analysis for time.",
        "Four researcher archetypes came out of the interviews, each with different goals, tools and risks. A fifth, the lab technician who does most of the bench work, became the starting point for the instrument. In the prototype the five are sign-in personas, and what each one can change depends on their role.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/petricor_system_sketch.png`,
          alt: "Early Petricor system sketch: lab context, device, and cloud touchpoints.",
          width: 2388,
          height: 1668,
        },
        {
          afterParagraphIndex: 0,
          src: `${DIR}/petricor_problem_statement.webp`,
          alt: "Research insight: manual lab processes create frustration and inefficiency for technicians.",
          width: 1792,
          height: 1024,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-people.webp`,
          alt: "Five people, one run, different rights. Sam Ortiz, lab technician, runs the bench and needs fewer manual steps and a machine that remembers which dish is where; the touchscreen shows the next physical step. Dr. Alex Morgan, senior microbiologist, owns QC and needs counts that hold up in an audit; lands on the review queue and the whole timelapse. Dr. Emily Thompson, senior mycologist, confirms species and needs imaging across light channels; lands on colony tracking in four channels. Dr. Jane Miller, environmental mycologist, monitors cleanrooms and needs field-to-lab traceability; lands on air-monitoring runs and custody. Dr. Michael Brown, lab director, needs fleet status and audit readiness. Permissions: every role can operate instruments and register samples; technicians cannot sign off results; microbiologists and the director can edit protocols; only the director manages users and integrations.",
          width: 2400,
          height: 1556,
        },
      ],
      topicGroups: [
        {
          title: "Findings",
          items: [
            {
              title: "Trust starts at the bench",
              body: "Nobody cared about smarter analytics until the physical workflow felt reliable. Mislabelled and misplaced dishes were the fear that came up most.",
            },
            {
              title: "Endpoints hide the story",
              body: "One photo at the end of incubation hides when a colony appeared and how fast it grew. That is exactly what a mycologist needs to judge it.",
            },
            {
              title: "Automation proposes, people sign",
              body: "Labs will accept AI-assisted counts and IDs only if a qualified person signs off on them, and the sign-off is recorded.",
            },
          ],
        },
      ],
      table: {
        ariaLabel: "Research personas and primary needs",
        rows: [
          { col1: "Sam Ortiz", col2: "Lab Technician — prepares samples, prints labels, loads and starts runs; needs fewer manual steps." },
          { col1: "Dr. Alex Morgan", col2: "Senior Microbiologist — needs accuracy, efficiency and manual and automated results in one place." },
          { col1: "Dr. Emily Thompson", col2: "Senior Mycologist — needs advanced imaging, species references and growth data." },
          { col1: "Dr. Jane Miller", col2: "Environmental Mycologist — needs field-to-lab traceability and trends by location." },
          { col1: "Dr. Michael Brown", col2: "Lab Director — needs fleet status, compliance reporting and control of who can do what." },
        ],
      },
    },
    {
      title: "Secondary Research",
      paragraphs: [
        "Desk research covered the science and the regulation around the bench, so that the prototype would behave like real cultures and fit procedures labs already follow.",
        "Predictive mycology. The prototype does not invent colony growth; it models it. Radial growth follows the Cardinal Model with Inflection (Rosso, Lobry & Flandrois, 1993), driven by the chamber’s own temperature log. It uses cardinal temperatures fitted for real Aspergillus niger and Penicillium expansum isolates (Gougouli & Koutsoumanis, 2010). The same curve gives reviewers an expected growth rate, so a reference strain that grows too slowly shows up as a QC finding.",
        "Methods and regulation. Each saved protocol mirrors an established method: ISO 21527-1 for yeast and mould enumeration in food, EU GMP Annex 1 and ISO 14698 for cleanroom air monitoring, ISO 11133 for media QC with reference strains, and CLSI M54 for clinical culture. Results are regulated electronic records, so 21 CFR Part 11, EU GMP Annex 11 and the ALCOA+ principles shaped badge sign-in, the append-only audit trail and role-gated sign-off.",
        "Reference data. Taxonomy and occurrence data come from GBIF, and culture photographs from openly licensed Wikimedia Commons files. Where the demo uses a placeholder rather than a published value, it says so next to the number.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/research-growth.webp`,
          alt: "Grounded in published growth models. Radial growth rate versus temperature from −10 to 45 °C for Aspergillus niger (Tmin 10.13, Topt 31.44, Tmax 43.13 °C, μopt 0.84 mm/h) and Penicillium expansum (Tmin −5.74, Topt 22.08, Tmax 30.97 °C, μopt 0.221 mm/h), from Gougouli & Koutsoumanis 2010. At the 25 °C protocol, A. niger grows 16.1 mm/day and P. expansum 4.9 mm/day. The Cardinal Model with Inflection formula is shown with its source, Rosso, Lobry & Flandrois 1993.",
          width: 2400,
          height: 1274,
        },
        {
          afterParagraphIndex: 2,
          src: `${DIR}/research-standards.webp`,
          alt: "Four protocols, four rulebooks. Yeast and mould enumeration on DRBC agar at 25 °C for 120 hours, based on ISO 21527-1, for food and product QC. Environmental air monitoring on Sabouraud dextrose agar at 25 °C for 168 hours, based on EU GMP Annex 1 and ISO 14698, for cleanrooms. Reference strain QC on potato dextrose agar at 25 °C for 96 hours, based on ISO 11133. Clinical isolate culture on Sabouraud dextrose agar at 30 °C for 72 hours, based on CLSI M54. Data integrity under 21 CFR Part 11, EU GMP Annex 11 and ALCOA+: attributable, original and enduring, and signed.",
          width: 2400,
          height: 1062,
        },
      ],
    },
    {
      title: "Journey Mapping",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Mapping the adoption journey, from noticing manual inefficiencies through installation, training and daily use, showed that friction clusters at hand-offs: procurement to IT setup, training to first independent use, and device capture to cloud analysis.",
        },
        {
          type: "journeyAccordion",
          value: "alex-morgan",
          title: "Dr. Alex Morgan, Senior Microbiologist",
          tableAriaLabel: "Journey map for Dr. Alex Morgan across eleven stages: actions, thoughts and feelings, pain points and goals",
          columns: PETRICOR_ALEX_MORGAN_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "A lab instrument is bought by one group, installed by another and used every day by a third. Lab directors and finance decide; procurement and IT carry it through installation; microbiologists and technicians live with it. Each hand-off is a place where the product can stall, so the prototype gives each group its own entry point: fleet and roles for directors, open exports for IT, the bench for technicians.",
        },
        {
          type: "journeyAccordion",
          value: "stakeholders",
          title: "Stakeholders by stage",
          tableAriaLabel: "Petricor adoption journey by stage: the lab problem, buying stakeholders and implementation stakeholders",
          columns: PETRICOR_STAKEHOLDER_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "Comparing manual and automated workflows aspect by aspect quantified the opportunity: analysis time dropping from 37–70 hours to 3.5–6 hours, excluding incubation, with gains in accuracy, data recording, colony counting and reporting.",
        },
        {
          type: "journeyAccordion",
          value: "manual-vs-automated",
          title: "Manual vs automated",
          tableAriaLabel: "Manual versus automated fungal analysis across thirteen aspects, with the advantage of each",
          columns: PETRICOR_MANUAL_VS_AUTOMATED_COLUMNS,
        },
      ],
    },
    {
      title: "User Flows",
      paragraphs: [
        "The system has two key workflows: running the bench and reviewing the results. A dish’s barcode ties them together.",
        "At the bench. A run is a series of physical acts: badge in, choose a protocol, assign samples, print a label per dish, scan each one at the side reader, load the carousel pocket by pocket and start. The touchscreen only ever shows the next step and confirms it with the hardware. The reader rejects a barcode that is not part of the run before the dish ever reaches the chamber.",
        "In review. Every image set is segmented into colonies, and each colony keeps its identity across frames, so review happens on the whole timelapse. Presumptive IDs are only proposals. A microbiologist, mycologist or the director approves the run or requests changes, with a note. Technicians can run the instrument but cannot approve their own results.",
        "Chain of custody. Every hand-off is an event on the sample record, from registration and label printing to scanning, loading, imaging, unloading, review and report. Interviews kept returning to mislabelled dishes, and this is the answer.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/flow-bench.webp`,
          alt: "PC-6 touchscreen user flow, in three lanes: hands at the bench, the touchscreen and the cloud. Badge in: hold your ID to the side reader. Protocol: choose a saved recipe of temperature, humidity, duration, image interval and channels, edited in the cloud. Samples: assign up to six from the bench queue or register one. Print: one barcode per dish, applied to the side of the dish base. Scan: hold each dish to the reader; barcodes not in the run are rejected, and a custody event is written. Load: the carousel turns each pocket to the door and highlights it; the run is created in the cloud. Incubate: live conditions and the next image set, while captures stream to the cloud in four channels.",
          width: 2400,
          height: 1110,
        },
        {
          afterParagraphIndex: 2,
          src: `${DIR}/flow-review.webp`,
          alt: "Petricor Cloud review flow: capture in four light channels every one to four hours; detect colonies per frame; track each colony across frames with first-seen time and radial rate; identify a presumptive species with classifier confidence; the run completes and joins the review queue. Review the timelapse in single dish or all six. Decide, role-gated: approve results with a note, or request changes. Record: run.approve in the append-only audit trail, a per-run report, CSV and JSON with one row per colony for LIMS, and a live event stream.",
          width: 2400,
          height: 1085,
        },
        {
          afterParagraphIndex: 3,
          src: `${DIR}/diagram-custody.webp`,
          alt: "One barcode, sample to report, for dish PC00030423, Lot 4471 yogurt on DRBC agar at 25 °C. Eight events: registered as a sample record; label printed on the PC-6; scanned at the side reader and matched to the run; loaded into pocket 1; imaged in 61 sets across four channels over 120 hours; unloaded when the run completes; reviewed with approval or changes by a microbiologist; reported and exported as a CSV row per colony to LIMS. The first six are captured automatically by the instrument; review and report are attributed decisions.",
          width: 2400,
          height: 933,
        },
      ],
    },
    {
      title: "How It Works",
      paragraphs: [
        "One instrument, two screens, one record. A run started on the PC-6 touchscreen is the same run reviewed in Petricor Cloud. Telemetry, captures and sample events stream from the instrument as they happen. Results leave as a signed report, per-colony CSV and JSON for LIMS import, and a live event stream for everything else.",
        "In the prototype, a software twin of the PC-6 drives both screens at once. A simulation clock runs incubation at up to 14,400× real time, and the physical actions (lifting the door, printing, scanning, refilling the reservoir) are buttons beside the touchscreen. Simulated parts are labelled as simulated, and every growth parameter shows its source.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-system.webp`,
          alt: "System architecture: one instrument, two screens, one record. The PC-6 at the bench has a 10.1-inch touchscreen, a label printer and side reader, four-channel imaging, and climate control. Telemetry, captures and events flow both ways with Petricor Cloud, which provides a live fleet overview, timelapse and colony tracking, all-six comparison, presumptive IDs, role-based sign-off and an append-only audit trail. Exports go on record as a signed run report, CSV and JSON per run for LIMS, a Server-Sent Event stream, with reference data from GBIF and Wikimedia Commons.",
          width: 2400,
          height: 1344,
        },
      ],
      stats: [
        { value: "6 × 90 mm", label: "Dishes per run", detail: "On an indexed carousel under the imaging head." },
        { value: "4", label: "Light channels", detail: "White, UV 365 nm, backlit and NIR 850 nm." },
        { value: "1", label: "Barcode per dish", detail: "Printed on board, checked at the side reader." },
        { value: "5", label: "Roles", detail: "Technician to director, each with its own rights." },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The prototype runs in the browser. On the touchscreen, the machine state decides the screen, so the operator only ever sees the next thing to do. In the cloud, every frame from every dish is organised by run and sample, so review happens on the whole timelapse instead of one photo at the end.",
      ],
      productShowcase: {
        slides: [
          screen("cloud-overview", "Live overview", "Every instrument, run and alert, streaming as the instruments capture.", "Petricor Cloud overview: instruments online, runs incubating, a run awaiting review and open alerts, above the live run on Bench A with its six dishes, chamber temperature and humidity, the review queue, alerts and presumptive IDs."),
          screen("cloud-run", "Timelapse and colony tracking", "Each colony keeps its identity across frames.", "A run in Petricor Cloud: one dish at 70 hours with labelled colonies, beside a colony detail card for Penicillium chrysogenum with diameter, radial rate and a growth curve."),
          screen("cloud-compare", "All six, same hour", "Every dish in a run, side by side.", "All six dishes of a reference QC run shown side by side at the same hour, with the colony list."),
          screen("cloud-review", "Review and sign-off", "Presumptive IDs are flagged; approval is role-based.", "A completed yeast and mould run awaiting review, showing one dish at 120 hours with labelled P. expansum, A. niger and R. stolonifer colonies."),
          screen("cloud-report", "Signed report", "Every dish, count and composition, ready to print.", "Per-run report for air monitoring week 38: protocol, instrument, operator and approval, six dish images and a table of colonies by species per sample."),
          screen("cloud-samples", "Chain of custody", "Every dish linked to its sample by a printed barcode.", "Samples table: barcode, sample, source type, location and run for every dish."),
        ],
        accordion: [
          {
            value: "touchscreen",
            title: "PC-6 touchscreen",
            description: "Seven steps, from protocol to inspecting a dish mid-run.",
            defaultOpen: true,
            slides: [
              screen("device-protocol", "01 · Choose a protocol", "Temperature, humidity, duration, interval and channels in one saved recipe.", "Touchscreen: choose a protocol from yeast and mould enumeration, environmental air monitoring, reference strain QC and clinical isolate culture."),
              screen("device-samples", "02 · Assign samples", "Up to six from the bench queue, or register one on the spot.", "Touchscreen: assign samples, four of six selected from the bench queue, with register sample and create run."),
              screen("device-printing", "03 · Print dish labels", "One barcode per dish, linked to its sample record.", "Touchscreen: printing dish labels, with the carousel map and each sample marked printed."),
              screen("device-scan", "04 · Scan each dish", "Barcodes not in this run are rejected before loading.", "Touchscreen: scan each dish at the side reader; the reader is armed and each sample shows printed and scanned."),
              screen("device-load", "05 · Load pocket by pocket", "The carousel turns each pocket to the door and highlights it.", "Touchscreen: place dish in position 1, with the highlighted pocket on the carousel map and the door open."),
              screen("device-incubation", "06 · Incubate and image", "Live chamber conditions and every dish at a glance.", "Touchscreen: incubation, with elapsed time, temperature, humidity, next image set, the dish under the camera and the carousel."),
              screen("device-dish", "07 · Inspect any dish", "Latest capture, colony list and presumptive IDs in four channels.", "Touchscreen: dish detail for an air sample, with labelled colonies and a list of presumptive IDs and diameters."),
            ],
          },
          {
            value: "cloud",
            title: "More of Petricor Cloud",
            description: "Runs, channels, growth curves, roles and the mycelium lab.",
            slides: [
              screen("cloud-runs", "Runs", "Every run across every instrument, with progress and review status.", "Runs table: air monitoring week 38 approved, yeast and mould lots 4471/4472 pending review, and reference QC incubating."),
              screen("cloud-all-six-uv", "UV 365 nm", "Any channel, all six dishes.", "All six dishes of the air-monitoring run under UV 365 nm, colonies glowing against dark agar."),
              screen("cloud-growth-review", "Growth and sign-off", "Colony diameter over time, then the approval with its note.", "Growth tab: colony diameter and colonies detected over 168 hours, above the approved sign-off with its note."),
              screen("cloud-roles", "People, roles and protocols", "Who can operate, sign off, edit protocols and manage the lab.", "Settings: people and roles, the role permissions matrix, protocols and integrations."),
              screen("cloud-lab", "Mycelium lab", "Grow a colony from one spore in 3D.", "Mycelium lab: a 3D colony grown from one spore, with hyphal length, active tips, anastomoses and branching controls."),
              screen("cloud-lab-rhizopus", "Rhizopus stolonifer", "The fastest grower: long internodes and tall aerial hyphae.", "Mycelium lab for Rhizopus stolonifer at 4 hours, a wide 3D colony with species preset controls."),
              screen("site-hero", "Marketing site", "Every dish, watched.", "Petricor homepage hero: Every dish, watched, beside a live 3D hyphae growth simulation with a timeline."),
            ],
          },
        ],
      },
    },
    {
      title: "Hardware",
      paragraphs: [
        "The PC-6 is built around the dish. It has a conditioned chamber with a sealed imaging head, a six-position carousel, a label printer and a side reader, all reached from one angled console.",
        "The instrument is modelled part by part in Blender from a parametric script, with 113 named parts. That one model produces the renders and the interactive 3D viewer, so what you explore is what was rendered. Sub-assemblies were exploded to check the design for manufacture: a dry electronics bay below a sealed chamber, a Peltier heat pump with an atomiser and HEPA filter, moulded EPP insulation, and screws that never land on a visible surface.",
      ],
      figuresLayout: "grid-2",
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/hw-exploded.webp`,
          alt: "Exploded assembly of the PC-6: base, dry electronics bay, conditioned chamber, cover and door as separate layers, with the console and screen pulled forward.",
          width: 1600,
          height: 2000,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/hw-x-carousel.webp`,
          alt: "Carousel and drive, exploded: dishes and lids, turntable, quick-release knob, shaft seal, belt drive and stepper.",
          width: 1600,
          height: 1920,
        },
      ],
      productShowcase: {
        slides: [
          render("hero-blue", "PC-6", "The benchtop incubator-imager.", "The PC-6 with its door closed on a blue backdrop, the touchscreen showing a live incubation run."),
          render("open-blue", "Door open", "Six dishes on the carousel, reached from the front.", "The PC-6 with its glass door lifted, showing six culture dishes on the carousel inside the chamber."),
          render("section", "Section", "Half the enclosure cut away at the centreline.", "Section render of the PC-6 with half the enclosure, chamber and base cut away, showing the carousel, imaging head and electronics."),
          render("interior", "Interior", "Enclosure, console and chamber hidden.", "Interior layout of the PC-6 with the enclosure hidden: carousel, deck, electronics and imaging head."),
          render("d-carousel", "Chamber", "Six dishes under the chamber light.", "Close render of six culture dishes on the anodised carousel under the chamber light."),
          render("d-culture-b", "Culture, macro", "A. niger: black conidial heads behind a white margin.", "Macro render of an Aspergillus niger colony with black conidial heads, satellite colonies and a Penicillium colony behind."),
        ],
        accordion: [
          {
            value: "assemblies",
            title: "Sub-assemblies",
            description: "Each system exploded to check fit, sealing and assembly order.",
            slides: [
              render("x-climate", "Climate & humidity", "Duct, heat exchangers, Peltier modules, blower, PTC heater, HEPA, reservoir and atomiser.", "Climate and humidity sub-assembly, exploded."),
              render("x-console", "Console", "Cover glass, display, LCD module, driver board, printer door and mechanism.", "Console sub-assembly, exploded: cover glass, display, driver board and label printer."),
              render("x-insulation", "Insulation", "Moulded EPP panels follow the rounded shell.", "Insulation sub-assembly, exploded: moulded EPP panels around the chamber."),
            ],
          },
          {
            value: "details",
            title: "Details",
            description: "Where hands meet the instrument.",
            slides: [
              render("d-scanner", "Side reader", "Reader window in the navy grip inlay, finger recess below.", "Side reader window set into the navy grip inlay, with a finger recess below for lifting."),
              render("d-console", "Console", "Label printer door and touchscreen.", "The angled console: label printer door and the touchscreen showing incubation."),
              render("d-culture", "Culture, macro", "Fusarium: floccose aerial mycelium over diffusing violet pigment.", "Macro render of a Fusarium colony with white aerial mycelium over a violet centre."),
            ],
          },
        ],
      },
    },
  ],
};
