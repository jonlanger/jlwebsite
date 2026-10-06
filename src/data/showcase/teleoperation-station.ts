import type { PastProject, ProjectCarouselSlide } from "@/data/past-projects";
import {
  TELEOP_ENGINEER_JOURNEY,
  TELEOP_FLEET_JOURNEY,
  TELEOP_OPERATOR_JOURNEY,
  TELEOP_SUPPORT_JOURNEY,
} from "@/data/teleop-journey-maps";

const APP = "https://teleoperate.vercel.app";
const DIR = "/projects/teleoperation-station";

/** A 1800×1125 screen, render or board from the prototype. */
const screen = (file: string, title: string, caption: string, alt: string): ProjectCarouselSlide => ({
  src: `${DIR}/${file}.webp`,
  alt,
  width: 1800,
  height: 1125,
  title,
  caption,
});

export const project: PastProject = {
  slug: "teleoperation-station",
  category: "hardware",
  title: "Teleoperation System",
  description:
    "teleop: a console, a desktop Wheel and four workspaces that keep driverless delivery vans, trucks and robots moving, with most requests solved without taking over.",
  image: `${DIR}/teleoperation-station_card.webp`,
  alt: "One teleop station: the Wheel on an oak desk under a windshield-size display showing the operator console's camera view and route map.",
  width: 1280,
  height: 720,
  liveUrl: `${APP}/`,
  liveLinks: [
    { label: "Console (pick a role)", href: `${APP}/signin` },
    { label: "Business case", href: `${APP}/about#value` },
  ],
  overview: {
    title: "Overview",
    paragraphs: [
      "Driverless vehicles still stop and ask for help: a double-parked truck, a pedestrian who won’t cross, a lane closed for construction. Someone in a remote operations room has to answer, and how many vehicles one person can cover decides what every delivery costs.",
      "The project started as a teleoperation station: modular hexagonal pods with a curved windshield display, a red stop and a mint spine, built around one person driving. teleop rebuilds it as a working product for autonomous delivery and freight operators. It has a desktop Wheel designed for manufacture, an operator console where guidance is the default and taking over is the exception, and Fleet, Engineering and Support workspaces that work from the same vehicles, alerts and command trail. The whole fleet runs in the browser, so anyone can pick a role and drive.",
    ],
    role: "UX Research, Product Design, Interaction Design, Industrial Design, Design Systems, Front-end Build",
    scope:
      "Operator console, Fleet, Engineering and Support workspaces, an in-browser fleet simulator, the teleop Wheel (DFM-ready CAD, rig and renders), station and room layouts, a design system shared by hardware and software, and the marketing site.",
  },
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Autonomy removes the driver, not the people. Remote operations is the cost that remains, and the tools behind it were built for a demo, not a shift.",
      ],
      topicGroups: [
        {
          title: "Problem statements",
          items: [
            {
              title: "Every request holds a person",
              body: "Most consoles have one move: take over. Even a request that only needs a brake or a yes ties up an operator for its whole duration, which caps vehicles per person.",
            },
            {
              title: "The link is unreliable",
              body: "Cellular latency varies by block. Remote steering works under about 100 ms and is close to impossible past 500 ms, yet consoles offer the same controls at any delay.",
            },
            {
              title: "Intent isn’t fact",
              body: "A pressed button isn’t a shifted gear. Operators can’t tell what they asked for from what the vehicle did, and neither can the regulator reading the log afterwards.",
            },
            {
              title: "Everyone else is blind",
              body: "Fleet managers, engineers and support work in separate tools. When a rider complains, nobody can see what the vehicle did without asking someone else.",
            },
            {
              title: "Hardware made for gaming",
              body: "Stations are built from racing wheels and keyboards. Nothing on the desk says who is driving, and the stop button is wherever it fits.",
            },
          ],
        },
      ],
    },
    {
      title: "Design Direction",
      paragraphs: [
        "teleop is one system for two surfaces: the Wheel an operator holds and the console they watch. Each control has one fixed name, used on the hardware legend, on screen and in copy, and a twin in the console that behaves the same way.",
        "Four ideas set the direction. One light carries state, and it always matches the console. Red only ever means stop. The road view is the size and angle of a windshield, not a monitor. And the product is built for helping, not just driving: most requests are a brake, a nudge or a label, so guidance comes before taking the wheel.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-direction.webp`,
          alt: "One instrument, two surfaces. The teleop Wheel in satin carbon with gum grips, a mint halo and a red emergency stop; one station with the Wheel on a desk under a windshield-size display; and the operator console in the dark theme. State: one light carries state, mint in autonomy, amber while a person drives, pulsing during a handoff, matching the console badge and the vehicle's light strip. Safety: red means stop, a domed 28 mm cap you can hit without looking, with Esc and the on-screen STOP doing the same. View: a windshield, not a monitor, 1.65 by 0.7 m at a driver's angle. Job: built to help, so guidance comes first; Claim is one mint key and Release is a deliberate 1.2 s hold.",
          width: 2400,
          height: 1476,
        },
      ],
    },
    {
      title: "Secondary Research",
      paragraphs: [
        "The rebuild started from published numbers rather than intuition, and every figure on the marketing site carries its source. Three things stood out.",
        "The ratio is the business. Published ratios run from 1:4 for sidewalk robots to 1:43 for Waymo’s robotaxis. Anything that lets one person cover more vehicles safely shows up directly in the cost per delivery.",
        "Help comes in grades. Waymo describes its remote assistance as advice, not control, at a 150 ms median. Lab studies put the limit for remote steering near 100 ms. The safest help is the one that needs the least bandwidth.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-why.webp`,
          alt: "Why now: every driverless fleet still runs on people. Vehicles one remote operator covers: Serve Robotics sidewalk delivery 2022, 1 to 4; Goldman Sachs outlook for 2030, 1 to 10; Pony.ai robotaxis 2025, 1 to 20; Waymo robotaxis 2026, 1 to 43. 53% of shipping cost is the last mile; a $91.5B autonomous last-mile delivery market projected for 2030; a $2.7B teleoperations market by 2030, up from $777M in 2024. Three pressures: everything asks at once, as when a December 2025 outage stalled robotaxis in San Francisco; regulators want the log, with rules in Germany and California and a federal bill; latency limits what a person can do, with remote steering under about 100 ms and close to impossible past 500 ms.",
          width: 2400,
          height: 1226,
        },
      ],
      topicGroups: [
        {
          title: "Findings",
          items: [
            {
              title: "Most requests don’t need a driver",
              body: "A double-parked truck or a blocked loading zone needs a yes, a brake or a nudge. Designing for takeover first wastes the scarcest thing in the room.",
            },
            {
              title: "Surges are the real test",
              body: "When signals or cell service go dark, requests arrive all at once. Staffing for the average fails exactly when it matters.",
            },
            {
              title: "The log is a product",
              body: "Regulators, engineers and support all need the same record of what was commanded and what the vehicle did. It has to exist by design, not be rebuilt afterwards.",
            },
          ],
        },
      ],
    },
    {
      title: "Who It’s For",
      paragraphs: [
        "teleop is for any fleet that drives itself most of the time and needs a person for the rest: middle-mile box trucks, long-haul freight, sidewalk and curb robots, and yard trucks. Inside each one, four roles keep it moving, and two groups pay for it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-people.webp`,
          alt: "One room, four jobs. Sam Rivera, senior operator, Operator workspace: covers several vehicles from a station and needs to know which vehicle needs them, what it sees and that a command landed; gets camera, route map, safety controls, drive strip and the Wheel. Dana Ortiz, fleet manager: staffs the room and assigns vehicles; needs enough people at the right hours; gets KPIs, the live map, hourly coverage against a 1 to 5 target and vehicle assignment. Kenji Watanabe, vehicle engineer: owns faults, sensors, software, stations and Wheels; needs the full record; gets telemetry, logs, command audit, maintenance and diagnostics. Ruth Adeyemi, support lead: answers riders, shippers and staff; needs what the vehicle actually did; gets a queue sorted by deadline, playbooks, the vehicle timeline and escalation. Who pays: autonomy operators buy operator seats and a Wheel per station, priced per vehicle in service. Their customers, shippers and retailers, get Fleet and Support seats.",
          width: 2400,
          height: 1307,
        },
      ],
    },
    {
      title: "Journey Mapping",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Each role was mapped across a working day, from the first thing they do to the last: what they do, what they’re thinking, how it feels, what goes wrong today, and what teleop does about it.",
        },
        {
          type: "journeyAccordion",
          value: "operator",
          title: "Sam Rivera, Senior Operator",
          defaultOpen: true,
          tableAriaLabel: "Journey map for Sam Rivera, operator, across six stages: doing, thinking, feeling, pain points and opportunities",
          columns: TELEOP_OPERATOR_JOURNEY,
        },
        {
          type: "journeyAccordion",
          value: "fleet",
          title: "Dana Ortiz, Fleet Manager",
          tableAriaLabel: "Journey map for Dana Ortiz, fleet manager, across five stages: doing, thinking, feeling, pain points and opportunities",
          columns: TELEOP_FLEET_JOURNEY,
        },
        {
          type: "journeyAccordion",
          value: "engineer",
          title: "Kenji Watanabe, Vehicle Engineer",
          tableAriaLabel: "Journey map for Kenji Watanabe, vehicle engineer, across five stages: doing, thinking, feeling, pain points and opportunities",
          columns: TELEOP_ENGINEER_JOURNEY,
        },
        {
          type: "journeyAccordion",
          value: "support",
          title: "Ruth Adeyemi, Support Lead",
          tableAriaLabel: "Journey map for Ruth Adeyemi, support lead, across five stages: doing, thinking, feeling, pain points and opportunities",
          columns: TELEOP_SUPPORT_JOURNEY,
        },
        {
          type: "paragraph",
          text: "Laid side by side, the maps share one gap: each person needs to know what the vehicle actually did, and today they get it from someone else. The service blueprint follows one incident through every team to show where that record has to travel.",
        },
        {
          type: "figure",
          src: `${DIR}/diagram-blueprint.webp`,
          alt: "Service blueprint for one incident across five teams. It happens: UNIT-07 brakes hard near Civic Park and a rider nearly falls; Sam, watching UNIT-07, sees the alert; the system logs vehicle events, commands and alerts. It's reported: the rider calls; Jordan logs a rider contact, Safety, P2, first reply due in 1 hour; Sam presses Log for a snapshot that can become a ticket; the ticket is stamped with source and deadline. It's worked: Ruth follows the Safety playbook; Dana sees the ask in Needs attention; Kenji reads telemetry and the command audit while the ticket waits on engineering; the ticket shows 20 minutes before to 5 minutes after, plus live state and related tickets. It's fixed: Dana takes UNIT-07 out of service; Kenji opens a linked work order and finds the wiper fault B1A20 too. It's closed: finishing the work order hands the ticket back, Dana hands it back, Ruth resolves with an outcome code and summary, the rider gets a reply naming the vehicle and stop, and Insights records medians. Deadlines: P1 first reply 15 minutes, resolve 4 hours; P2 1 hour and 1 day; P3 4 hours and 3 days; P4 24 hours and 7 days.",
          width: 2400,
          height: 1418,
        },
      ],
    },
    {
      title: "User Stories",
      paragraphs: [
        "The journeys turned into stories, one per moment that had to work, each traced to something you can do in the prototype.",
      ],
      topicGroups: [
        {
          title: "Operator",
          items: [
            { title: "Help without taking over", body: "As an operator, I want to brake, nudge or approve a path while autonomy keeps driving, so one request doesn’t hold me for minutes." },
            { title: "Know it landed", body: "As an operator, I want every control to show what the vehicle confirmed, so I never mistake what I asked for with what happened." },
            { title: "Stop without looking", body: "As an operator, I want one stop that works from the Wheel, the keyboard or the screen, and a vehicle that stops itself if I disappear." },
          ],
        },
        {
          title: "Fleet, Engineering and Support",
          items: [
            { title: "Staff for the hour", body: "As a fleet manager, I want hourly coverage against a target, so I find the gap before the shift does." },
            { title: "Read the whole trail", body: "As an engineer, I want each command’s lifecycle next to the vehicle’s own logs, so I can tell a bad actuator from a bad request." },
            { title: "See what the vehicle did", body: "As a support lead, I want a ticket to open on the vehicle’s timeline and hand itself back when engineering finishes, so I can answer without chasing anyone." },
          ],
        },
      ],
    },
    {
      title: "Information Architecture",
      paragraphs: [
        "Four workspaces sit under one top bar, always in the same order. Each person lands on their own, and a tab their role can’t use stays visible but disabled, so everyone knows where the other teams work. Support is the one place every ticket lives, whoever raised it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-ia.webp`,
          alt: "Four workspaces, one top bar. Operator: fleet list with mine and all, camera with perception overlay, heading-up route map, safety controls (Stop, Reset, Pull over, Approve path), drive strip, alert rail or toasts, Wheel panel and my shift. Fleet: overview with KPIs, live map and needs attention; shifts with hourly coverage against 1 to 5; vehicles with assignment and service; people. Engineering: telemetry, logs with NDJSON export, command audit, maintenance and work orders, diagnostics, stations and wheels, support requests. Support: a queue with nine views by deadline; tickets with playbook, conversation and vehicle timeline; escalation to engineering and fleet; insights. Access: operators open Operator and Fleet, can report and follow their own tickets in Support, and Engineering is disabled; the fleet manager opens all four; engineers and support open Fleet, Engineering and Support, with Operator disabled.",
          width: 2400,
          height: 1445,
        },
      ],
    },
    {
      title: "User Flows",
      paragraphs: [
        "The core flow is a single help request. The original station assumed every request meant a person driving. teleop inverts that: guidance is the default, claiming is the exception, and the vehicle keeps its own safety net throughout.",
        "What a person is allowed to do depends on the link. Help is graded by delay: drive under 100 ms, guide under 300 ms, advise under 600 ms, and past that the vehicle’s own watchdog takes over. The homepage lets you drag latency and speed and watch the allowed help change.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/flow-request.webp`,
          alt: "Core user flow, one help request, across the vehicle, the console and the operator. Ask: UNIT-14 stops behind a double-parked truck and raises an assist request; the alert appears in the rail and the map flies to it; Sam notices without leaving the vehicle they're watching. See: the vehicle holds in autonomy; the camera shows brackets, labels, distance, speed and the predicted path. Guide: the vehicle follows guidance, its path shifting up to 3 m and lapsing 500 ms after release; the console streams guidance at 10 Hz with Hold to brake, Nudge left and right, 15-minute labels and Approve path; most requests end here with autonomy still driving. Claim: the vehicle hands over through transitioning and its halo turns amber; the status bar tints amber and the drive stream runs at 20 Hz; Sam drives with the screen, a gamepad, the keyboard or the Wheel. Release: Sam holds Release for 1.2 s; the console shows each control's readback; the vehicle re-plans and continues, and release is refused more than 15 m off route. Always: Emergency stop from any step opens a P1 ticket; a 600 ms watchdog brakes the vehicle if input stops; only operators and managers drive, and only the holder can drive or release.",
          width: 2400,
          height: 1329,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-latency.webp`,
          alt: "Offer only the help the link can carry. Drive, 100 ms or less: claim and steer, throttle and brake at 20 Hz. Guide, 300 ms or less: brake or nudge autonomy's path up to 3 m at 10 Hz while autonomy keeps the wheel. Advise, 600 ms or less: label what perception sees and approve a path. Link lost, over 600 ms: the vehicle's watchdog brakes it to a stop. What a delay costs at 30 km/h: 50 ms one way travels 0.8 m before a correction lands, 150 ms travels 2.5 m, 300 ms travels 5 m, 600 ms travels 10 m.",
          width: 2400,
          height: 1113,
        },
      ],
    },
    {
      title: "Interaction Model",
      paragraphs: [
        "Two rules carry the console. First, state is a color, a word and a shape, all three. Autonomy is mint, a person driving is amber, a handoff pulses, and a stop is red. The Wheel’s halo, the console’s badge and the light strip on the vehicle always agree, so whoever is driving is obvious from the back of the room.",
        "Second, the console never sets vehicle state. Every button sends a command and then shows what the vehicle reports back. Requested is outlined and pulsing, confirmed is filled, and the readback line under each control gives the timing and the vehicle’s own words. The same trail feeds Engineering’s command audit.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-states.webp`,
          alt: "State is a color, a word and a shape. Who holds the vehicle: Autonomy in mint, driving itself with guidance allowed; Claim leads to Transitioning, where the halo pulses at 900 ms until the vehicle confirms; then Operator in amber, a person driving with banner and tile in amber. Release is a 1.2 s hold within 15 m of the route, back through transitioning to autonomy. Stopped in red from any state: emergency stop, latched until reset. Three surfaces always agree: the Wheel's LED halo, the console's ControlState badge, tile border and status bar, and the halo strip on the vehicle. Red means stop and never decoration; mint and amber differ in lightness and always carry a word.",
          width: 2400,
          height: 998,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-commands.webp`,
          alt: "The console never sets vehicle state. Sent: the operator presses Gear D and it shows outlined and pulsing. Server policy decides who may send what, or rejects it: only operators and managers drive vehicles. Received: the vehicle acks with milliseconds, or rejects it: hold the brake to shift, or fails: wiper motor overcurrent B1A20. Confirmed: the vehicle reports the new state and the control fills, or a timeout after no ack in 2.5 s. Operators see a readback line under every control; engineering sees each command's lifecycle with ack and confirm p50 and p95; an emergency stop opens a P1 incident ticket and a critical alert.",
          width: 2400,
          height: 1164,
        },
      ],
      stats: [
        { value: "3 m", label: "Nudge without claiming", detail: "Guidance lapses 500 ms after you let go." },
        { value: "1.2 s", label: "Hold to release", detail: "The same hold on screen and on the Wheel." },
        { value: "600 ms", label: "Vehicle watchdog", detail: "No drive input and the vehicle brakes itself." },
        { value: "1:38", label: "Vehicles per operator", detail: "Modeled with guidance, against 1:21 claiming every request." },
      ],
    },
    {
      title: "System Architecture",
      paragraphs: [
        "teleop is a static web app with no server. The fleet simulator and the operations API run in the page, records save to the browser, and each visitor gets their own fleet of ten vehicles in one generated city that the simulator, the three.js camera and both maps share.",
        "Every simulated part sits behind the interface its real replacement will use. The vehicle keeps its validate-and-readback contract for a real gateway, the camera can swap for WebRTC tracks, and the in-page engine is the same code a server would run. The Wheel’s USB contract is written down, so firmware can be built against it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-system.webp`,
          alt: "System architecture: one source of truth, simulated end to end. Hardware: the teleop Wheel over USB, inputs read through the Gamepad API, halo (report 0x01) and haptics (0x02) written over WebHID, with its contract in wheel-hid.ts; any gamepad or the keyboard stands in, and Esc is always the emergency stop; people sign in by picking a person. Console: Operator, Fleet, Engineering and Support workspaces on React and the design-system bundle. Wire protocol: drive at 20 Hz, guide at 10 Hz, commands with ack and confirm, state ten times a second, alerts and logs. Shared: city.ts generates one deterministic city of about 750 buildings. Engine in the page: fleet.ts for policy, command lifecycle, alerts, logs and telemetry; api.ts for routes and rules; store.ts for localStorage. Ten simulated vehicles with physics, drive-by-wire, sensors, assist requests, faults, a cellular link with a weak zone, and a 600 ms watchdog. Simulated today, real later: vehicle gateway, WebRTC camera tracks, real map data, SSO, and a server with a database and log store.",
          width: 2400,
          height: 1394,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            { title: "One source of truth", body: "Four workspaces read the same vehicles, alerts and command trail. Nobody keeps a private copy." },
            { title: "Simulated, not mocked", body: "Vehicles have physics, faults and a weak cellular zone, so the console is tested against the failures it exists for." },
            { title: "The vehicle has the last word", body: "Server policy decides who may ask; the vehicle decides what is physically safe, and its watchdog never waits for the console." },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The operator console is a cockpit sized to the window, so the essentials never scroll away: who is driving, the camera and route map, safety controls and the drive strip. It runs dark by default, because ops rooms run dim and the camera feed should be the brightest thing on screen.",
      ],
      productShowcase: {
        slides: [
          screen("op-console", "Operator console", "Fleet list, camera with perception overlay, route map, safety and the drive strip.", "teleop operator console in the dark theme: a fleet list of units in autonomy on the left, a simulated front camera view of a city street with Nudge left, Hold to brake and Nudge right, a heading-up route map, the drive strip and STOP, and a critical Link lost alert in the rail."),
          screen("op-claimed", "You are driving", "Claimed: the status bar, tile and halo turn amber.", "The operator console after claiming UNIT-03: an amber status bar reading You are driving with Hold to release, the camera view framed in amber, and the vehicle tile marked Held by you."),
          screen("op-detections", "Guide without claiming", "Brake, nudge or label while autonomy keeps the wheel.", "The camera view in autonomy with the guidance controls and the hint: guide without claiming, hold a button, drag across the view, or click anything to label it."),
          screen("op-light", "Daylight", "The same console, swapped through tokens.", "The operator console in the light Daylight theme with the same layout and mint autonomy badges."),
        ],
        accordion: [
          {
            value: "fleet",
            title: "Fleet",
            description: "Staffing, coverage and assignment for the fleet manager.",
            defaultOpen: true,
            slides: [
              screen("fleet-overview", "Fleet overview", "KPIs, the live city map and what needs attention.", "Fleet overview: in service 9 of 10, held by operators, waiting for assist, operators on shift, command p95 and open tickets above a live map of the city with vehicles on their routes and a weak-coverage zone at the harbor underpass."),
              screen("fleet-shifts", "Shifts", "Hourly coverage against a 1:5 target.", "Shifts: a week of hourly coverage with hours below target highlighted in amber, and the schedule by person."),
              screen("fleet-vehicles", "Vehicles", "Load by operator, then who has which vehicle.", "Vehicles: load by operator, and a fleet table with state, route, assignee, speed, link, odometer, software version, open tickets and service."),
              screen("fleet-light", "Overview, Daylight", "The office view of the same fleet.", "Fleet overview in the light theme."),
            ],
          },
          {
            value: "eng",
            title: "Engineering",
            description: "The only place logs and the full command trail appear.",
            slides: [
              screen("eng-telemetry", "Telemetry", "Live stats and five-minute charts per vehicle.", "Engineering telemetry for UNIT-03: speed, battery, link, packet loss, compute and odometer, with charts for speed, round-trip latency, steering angle actual versus commanded, battery, motor temperature and compute load."),
              screen("eng-maintenance", "Maintenance", "Component health, work orders and active faults.", "Maintenance: component health by vehicle with brake pads, tires, battery, wiper motor, sensors and software, open work orders, and an active wiper motor overcurrent fault on UNIT-07."),
              screen("eng-stations", "Stations and wheels", "Firmware, halo state and the Wheel’s USB contract.", "Stations and wheels: four stations with wheel serials, firmware versions and halo state, and the USB contract mapping HID inputs and output reports."),
            ],
          },
          {
            value: "support",
            title: "Support",
            description: "Every ticket, with what the vehicle did.",
            slides: [
              screen("sup-queue", "Queue", "Sorted by the next deadline, from every source.", "Support queue: eleven open tickets sorted by due time, each with priority, source (customer, operator, engineering, support), vehicle, status and owner."),
              screen("sup-ticket", "Ticket", "A playbook per category and the vehicle’s live state.", "Ticket TCK-1050, Shuttle braked very hard near Civic Park: a safety playbook of five steps, the conversation, UNIT-07's live state and fault, and related tickets and work orders."),
              screen("sup-insights", "Insights", "Open work by source, category, outcome and owner.", "Support insights: open, overdue, waiting on teams, first reply median and time to resolve, with bars by source, category, outcome and owner."),
            ],
          },
          {
            value: "site",
            title: "Marketing site",
            description: "“Driverless delivery scales when a person is one hold away.”",
            slides: [
              screen("site-hero", "Hero and live fleet", "The simulator as the hero: click a vehicle to follow it.", "teleop homepage hero: Driverless delivery scales when a person is one hold away, with Try the console and Model your fleet above a live map of the simulated fleet."),
              screen("site-why", "Why now", "Cited ratios and market numbers.", "Why now: vehicles per remote operator from 1 to 4 to 1 to 43, and 53%, $91.5B and $2.7B statistics."),
              screen("site-who", "Who it’s for, who pays", "Four fleet types, two buyers.", "Who it's for: middle-mile box trucks, long-haul freight, sidewalk and curb robots, yards and ports; who pays: autonomy operators and their shippers and retailers."),
              screen("site-value", "Business case", "Cost per delivery, with your own fleet’s numbers.", "Business case calculator: sliders for vehicles, deliveries, help requests and requests solved by guiding; $1.19 per delivery claiming every request versus $0.68 with teleop guidance, $841k saved a year."),
              screen("site-product", "Four workspaces", "Screenshots of the running app.", "Product: four workspaces, one source of truth, with tabs for Operator, Fleet, Engineering and Support over a screenshot of the support queue."),
              screen("site-tech", "Technology demos", "Drag the latency and watch the allowed help change.", "Technology: latency decides what help is safe, with sliders for one-way latency and vehicle speed and the Drive, Guide, Advise and Link lost ladder."),
              screen("site-hardware", "One system", "The rigged Wheel drives the console frame by frame.", "One system: the rigged teleop Wheel beside the console's camera view, playing one request from claim to hand back."),
            ],
          },
        ],
      },
    },
    {
      title: "The Wheel",
      paragraphs: [
        "The Wheel is a quiet satin-carbon instrument whose one expressive gesture is the mint halo inside the rim, and whose only red is the stop. It borrows controls you find without looking and one light carrying state from the Xbox controller, and a satin body, an italic wordmark and one warm material from a carbon road bike.",
        "Every control has a fixed name and a twin on screen: Claim is mint, Release is a 1.2 s hold, the D-pad moves through alerts and cameras, the thumbstick looks around and acknowledges, and the paddles are brake and throttle. It is designed for injection molding, with a removable faceplate, 2K gum grips over a PMMA halo guide, a tilt hinge with five detents, and a rig with seven named animations that the homepage plays.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-wheel.webp`,
          alt: "Controls you find without looking, teleop Wheel v6. Left column: Talk, Log, External speaker and the D-pad for alerts, with left and right switching cameras. Right column: Claim vehicle in mint, Release vehicle with a 1.2 s hold, Horn, and the thumbstick to look and click to acknowledge. Centre: Emergency stop, a 28 mm domed cap in a 34 mm bezel, and Hazard lights. Behind: brake paddle left, throttle paddle right. Rim: a mint halo in a PMMA light guide and gum TPE grips with haptics. Base: tilts 15 to 35 degrees in five detents with 5 N·m friction; USB-C.",
          width: 2400,
          height: 1289,
        },
      ],
      productShowcase: {
        slides: [
          screen("hw-hero", "teleop Wheel", "Satin carbon, gum grips, a mint halo and one red stop.", "The teleop Wheel: a satin carbon rim with gum grips and a mint halo, a dark faceplate with a red emergency stop and mint Claim key, on a tilting column and a squircle base with the teleop wordmark."),
          screen("hw-hub", "Faceplate", "Key columns, D-pad, thumbstick and the stop, on one radius family.", "Close-up of the Wheel's faceplate: left key column and D-pad, the red domed emergency stop and hazard key, the mint Claim key and thumbstick."),
          screen("hw-details", "Details, matched", "Each close-up has a twin component in the console.", "Six close-ups of the Wheel: emergency stop, halo, Claim and Release keys, D-pad, thumbstick and the brake and throttle paddles."),
          screen("hw-exploded", "Exploded", "Faceplate, pod, ring, grips, halo guide, column and base.", "Exploded view of the Wheel showing the separate pod, faceplate, key columns, rim ring with grips and halo guide, tilt knuckle, column and base."),
          screen("hw-side", "Tilt", "15 to 35° in five detents; friction holds a resting hand.", "Side view of the Wheel tilted on its knuckle above the base."),
          screen("hw-rear", "Rear", "Paddles behind the rim; a flush rear cover.", "Rear three-quarter view of the Wheel showing the brake and throttle paddles and the rear hub cover."),
        ],
        accordion: [
          {
            value: "room",
            title: "In the room",
            description: "From one desk to an operations room.",
            defaultOpen: true,
            slides: [
              screen("ctx-station", "One station", "A windshield-size display, 1.65 × 0.7 m, at a driver’s angle.", "One station: the Wheel on an oak desk under a curved windshield-size display showing the operator console."),
              screen("ctx-row", "A row", "Each halo shows its vehicle’s state across the room.", "Four stations in a row with displays forming one band of road views; the second station's halo is amber because it holds a vehicle."),
              screen("ctx-room", "An operations room", "25 stations face a video wall running the Fleet overview.", "An operations room of 25 stations in five rows facing a video wall with the Fleet overview."),
            ],
          },
          {
            value: "v1",
            title: "Where it started: the original station",
            description: "The modular pods the Wheel and the room grew from.",
            slides: [
              screen("v1-station", "The station", "Built-in seat, curved display, wheel, pedals and a mint spine.", "The original teleoperation station: a white pod with a curved windshield display, built-in seats and a mint spine."),
              screen("v1-cluster", "A cluster", "Three pods around one spine, with a red stop on each desk.", "Three hexagonal pods clustered around a mint spine, each with a curved display, a wheel and a red stop."),
              screen("v1-plan", "Plan view", "Hexagons tile without wasted floor.", "Top view of three hexagonal pods meeting at the center, each with a seat, a wheel and a red stop."),
              screen("v1-row", "A row of pods", "The same pods in a line.", "A row of the original pods with dark curved displays, red stops and mint edges."),
              screen("v1-room", "A room of clusters", "Clusters tiled across a floor plate.", "A floor plan of dozens of three-pod clusters tiled in rows."),
            ],
          },
        ],
      },
    },
  ],
};
