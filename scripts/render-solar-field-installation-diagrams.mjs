import { chromium } from "playwright";
import path from "node:path";

/**
 * Draws the Automated Solar Field case-study diagrams as HTML and photographs
 * them, in SolarSwarm's own dark palette (graphite surfaces, swarm violet,
 * battery copper, Geist + Geist Mono) so they sit with the screenshots.
 *
 * Research sources: the Hazlehurst Solar Farm Phase 1 (20 MW) progress
 * footage, industry job postings for the roles on a solar build, and a review
 * of solar monitoring dashboards (all from the original concept board).
 *
 *   node scripts/render-solar-field-installation-diagrams.mjs
 */
const OUT = path.resolve("public/projects/solar-field-installation/_src");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
  :root { --bg:#0b0a10; --s1:#15131c; --s2:#1d1a27; --s3:#2a2635; --line:#2a2635; --strong:#3a3548; --ink:#f2eff8; --dim:#a39db3; --faint:#6b6580;
    --v:#9d6bff; --v2:#bb97ff; --vdeep:#5b2bd9; --cu:#e0a36a; --cu2:#eec39a; --good:#3ddc97; --bad:#ff7a70; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:"Geist",-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--bg) radial-gradient(ellipse 900px 420px at 0% 0%, rgb(91 43 217 / .22), transparent 70%); }
  h1 { font-size:40px; font-weight:700; letter-spacing:-0.03em; line-height:1.08; max-width:1250px; }
  .eyebrow { font-family:"Geist Mono",monospace; font-size:13px; letter-spacing:0.16em; text-transform:uppercase; color:var(--cu); margin-bottom:12px; }
  .sub { color:var(--dim); font-size:18px; margin-top:12px; max-width:1150px; line-height:1.5; }
  .card { background:var(--s1); border:1px solid var(--line); border-radius:14px; padding:22px 24px; }
  .mono { font-family:"Geist Mono",monospace; font-variant-numeric:tabular-nums; }
  h3 { font-size:22px; font-weight:600; letter-spacing:-0.02em; }
  .lab { font-family:"Geist Mono",monospace; font-size:11.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin:16px 0 7px; }
  p.b { font-size:15.5px; line-height:1.5; color:var(--dim); }
  .pill { display:inline-block; font-size:13px; padding:5px 10px; border-radius:999px; background:var(--s2); border:1px solid var(--line); margin:0 6px 6px 0; }
  .pill.v { border-color:var(--v); color:var(--v2); background:transparent; }
  .av { display:inline-flex; width:44px; height:44px; border-radius:50%; align-items:center; justify-content:center; font-weight:600; font-size:18px; color:#0b0a10; flex:none; }
  .arrow { display:flex; align-items:center; justify-content:center; color:var(--strong); font-size:26px; }
`;

/* ---------- 1. The baseline: a 20 MW build today ---------- */
const BASELINE_HTML = (() => {
  const phases = [
    ["Site prep", "Clearing, grading, roads, laydown yards", 0, 9],
    ["Piles & racking", "Posts driven, rails assembled by hand, station by station", 9, 52],
    ["Module setting", "54,156 modules carried and bolted on", 38, 38],
    ["String wiring", "Harnesses, combiners, trenching to inverters", 58, 30],
    ["Commission", "Inspection, testing, energize", 86, 14],
  ];
  return `
<div id="c">
  <div class="eyebrow">Secondary research · the baseline</div>
  <h1>A 20 MW solar field is a construction project</h1>
  <p class="sub">Progress footage from Phase 1 of the Hazlehurst Solar Farm (20 MW, October 2015) shows what a utility-scale build really involves: more than 200 workers, trades working station by station, and months of racking before a single module produces power.</p>
  <div class="card" style="margin-top:36px;padding:26px 28px 30px">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><h3>Conventional build</h3><span class="mono" style="color:var(--dim);font-size:14px">illustrative sequence · racking alone takes 3–5 months</span></div>
    <div style="position:relative;margin-top:22px">
      ${phases
        .map(
          ([t, d, start, len], i) => `
        <div style="display:grid;grid-template-columns:230px 1fr;align-items:center;gap:18px;margin-top:${i ? 12 : 0}px">
          <div><div style="font-weight:600;font-size:16px">${t}</div><div class="b" style="font-size:13px;color:var(--faint);margin-top:2px">${d}</div></div>
          <div style="position:relative;height:30px;background:var(--s2);border-radius:8px">
            <div style="position:absolute;left:${start}%;width:${len}%;top:0;bottom:0;border-radius:8px;background:${i === 1 ? "var(--cu)" : "var(--strong)"}"></div>
          </div>
        </div>`
        )
        .join("")}
      <div style="display:grid;grid-template-columns:230px 1fr;gap:18px;margin-top:10px"><div></div>
        <div class="mono" style="display:flex;justify-content:space-between;color:var(--faint);font-size:12px"><span>Ground broken</span><span>Energized</span></div></div>
    </div>
    <div style="margin-top:26px;padding-top:22px;border-top:1px solid var(--line)">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><h3>SolarSwarm concept</h3><span class="mono" style="color:var(--v2);font-size:14px">target: days per array block · crew of 3 + the swarm</span></div>
      <div style="display:grid;grid-template-columns:230px 1fr;align-items:center;gap:18px;margin-top:18px">
        <div><div style="font-weight:600;font-size:16px">Deliver → deploy → track</div><div class="b" style="font-size:13px;color:var(--faint);margin-top:2px">No piles, racking or trenching</div></div>
        <div style="position:relative;height:30px;background:var(--s2);border-radius:8px"><div style="position:absolute;left:0;width:2%;top:0;bottom:0;border-radius:8px;background:var(--v)"></div></div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:20px">
    ${[
      ["20 MW", "Hazlehurst Phase 1 capacity"],
      ["200+", "Workers on site at peak"],
      ["54,156", "Modules set by hand"],
      ["3–5 mo", "For the base frame alone"],
    ]
      .map(([v, l]) => `<div class="card"><div class="mono" style="font-size:32px;font-weight:500;color:var(--cu2)">${v}</div><div class="b" style="margin-top:4px">${l}</div></div>`)
      .join("")}
  </div>
</div>`;
})();

/* ---------- 2. Stakeholders: today's roles, and where they go ---------- */
const ROLES = [
  {
    today: "Field operations coordinator",
    now: "Schedules crews, inspectors and deliveries; keeps customer records and site documentation.",
    next: "Fleet dispatcher",
    shift: "Schedules trucks and swarms instead of crews. Site status comes from the fleet, not phone calls.",
  },
  {
    today: "Business development manager, front-of-the-meter solar & storage",
    now: "Secures land, permits and interconnection; takes projects from origination to notice to proceed.",
    next: "Lessor / portfolio owner",
    shift: "Leases fleets to many customers and redeploys idle units to new contracts. Needs utilization and lease health.",
  },
  {
    today: "Solar racking & tracker senior engineer",
    now: "Due diligence on mounting and tracking systems, failure analysis, bankability reviews.",
    next: "Swarm layout engineer",
    shift: "Designs formations (row pitch, spacing, slope) in software. Tracking is per-panel and dual-axis.",
  },
  {
    today: "Robotics deployment safety manager",
    now: "Supervises remote operations and mobility, preventive maintenance, diagnostics.",
    next: "SolarSwarm Ops",
    shift: "Runs every fleet remotely: predictive maintenance, OTA firmware, spare dispatch and SLAs.",
  },
];
const STAKEHOLDERS_HTML = `
<div id="c">
  <div class="eyebrow">Secondary research · roles on a solar build</div>
  <h1>Automation changes the jobs, not just the hardware</h1>
  <p class="sub">Job postings for the people who build and run solar fields describe the work being automated. Each role maps to a new one in a robotic model. Re-skilling is part of the product, so every role gets a view built for its new job.</p>
  <div style="display:grid;grid-template-columns:1fr 56px 1fr;gap:14px 0;margin-top:36px;align-items:stretch">
    <div class="lab" style="margin:0 0 4px">Today · from job postings</div><div></div><div class="lab" style="margin:0 0 4px;color:var(--v2)">With SolarSwarm · platform role</div>
    ${ROLES.map(
      (r) => `
      <div class="card" style="padding:18px 22px"><div style="font-weight:600;font-size:17px">${r.today}</div><p class="b" style="margin-top:6px;font-size:14.5px">${r.now}</p></div>
      <div class="arrow">→</div>
      <div class="card" style="padding:18px 22px;border-color:var(--vdeep)"><div style="font-weight:600;font-size:17px;color:var(--v2)">${r.next}</div><p class="b" style="margin-top:6px;font-size:14.5px">${r.shift}</p></div>`
    ).join("")}
  </div>
  <div class="card" style="margin-top:18px;padding:16px 22px;display:flex;gap:28px;align-items:center">
    <div class="mono" style="font-size:26px;color:var(--cu2);flex:none">200+ → 3</div>
    <div class="b">Installation trades (racking, module setting, string wiring) become a delivery crew of three. Their site knowledge moves into survey, safety and field-tech roles.</div>
  </div>
</div>`;

/* ---------- 3. Proto-personas ---------- */
const PERSONAS = [
  {
    init: "D",
    color: "var(--cu)",
    name: "Dana, buys the power",
    who: "Facilities lead at a water district. Pumps run all day and the utility bill is the second-biggest line item.",
    goal: "On-site solar without a construction project, and proof it is saving money.",
    friction: "A fixed array means capital, permits and months of disruption. Monitoring apps show kilowatts, not savings or service.",
    jobs: ["Compare against the utility rate", "Check service status", "Read the monthly statement", "Add units or move rows"],
    uses: ["Buyer overview", "Energy in / out", "Statements", "Support tickets"],
  },
  {
    init: "M",
    color: "var(--v)",
    name: "Marcus, leases the fleet",
    who: "Asset owner with robots deployed across farms, cold storage and industrial sites.",
    goal: "Keep every unit earning, and move idle ones to the next contract fast.",
    friction: "Portfolio data sits in spreadsheets. Lenders want production reports he has to assemble by hand.",
    jobs: ["See utilization per site", "Track the lease pipeline", "Redeploy idle units", "Report to lenders"],
    uses: ["Lessor portfolio", "Lease pipeline", "Fleet map", "Production reports"],
  },
  {
    init: "R",
    color: "#3fd0d0",
    name: "Ren, runs SolarSwarm Ops",
    who: "Operations lead responsible for hundreds of robots across every customer, around the clock.",
    goal: "Catch failures before customers notice and keep every contract inside its SLA.",
    friction: "A robot fleet fails in new ways: motors, bearings, actuators, soiling. Generic monitoring only flags lost output.",
    jobs: ["Forecast failures", "Dispatch spares and techs", "Push firmware", "Answer tickets with telemetry"],
    uses: ["Ops console", "Predictive maintenance", "Digital twin", "Onboarding"],
  },
];
const PERSONAS_HTML = `
<div id="c">
  <div class="eyebrow">Proto-personas</div>
  <h1>Three people share one fleet, each with a different question</h1>
  <p class="sub">The customer asks whether it is saving money. The owner asks whether every unit is earning. Ops asks what breaks next. The platform switches roles rather than cramming all three into one dashboard.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px">
    ${PERSONAS.map(
      (p) => `
      <div class="card" style="padding:26px">
        <div style="display:flex;align-items:center;gap:14px"><span class="av" style="background:${p.color}">${p.init}</span><h3 style="font-size:21px">${p.name}</h3></div>
        <p class="b" style="margin-top:14px">${p.who}</p>
        <div class="lab">Goal</div><p class="b" style="color:var(--ink)">${p.goal}</p>
        <div class="lab">Friction</div><p class="b">${p.friction}</p>
        <div class="lab">Jobs to be done</div>
        <div>${p.jobs.map((j) => `<span class="pill">${j}</span>`).join("")}</div>
        <div class="lab">What they use</div>
        <div>${p.uses.map((j) => `<span class="pill v">${j}</span>`).join("")}</div>
      </div>`
    ).join("")}
  </div>
</div>`;

/* ---------- 4. Monitoring landscape ---------- */
const LANDSCAPE_ROWS = [
  ["Energy produced today, this month", "yes", "yes"],
  ["Earnings or savings", "yes", "yes"],
  ["Weather and irradiance", "some", "yes"],
  ["Where each unit is, and what it is doing", "no", "yes"],
  ["Component health and failure forecasts", "no", "yes"],
  ["Battery swaps and energy delivered to site", "no", "yes"],
  ["Many sites, customers and leases in one view", "no", "yes"],
  ["A different view for each role", "no", "yes"],
];
const mark = (v) =>
  v === "yes"
    ? `<span style="color:var(--good)">●</span>`
    : v === "some"
      ? `<span style="color:var(--cu)">◐</span>`
      : `<span style="color:var(--faint)">○</span>`;
const LANDSCAPE_HTML = `
<div id="c">
  <div class="eyebrow">Secondary research · monitoring dashboards</div>
  <h1>Solar dashboards report output. A robot fleet needs operations.</h1>
  <p class="sub">A review of fifteen solar monitoring dashboards, from residential apps to utility portals, found the same layout again and again: generation charts, earnings and weather for one site. Nothing about equipment that moves, wears out or belongs to someone else.</p>
  <div class="card" style="margin-top:36px;padding:0;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 260px 260px;background:var(--s2)">
      <div class="lab" style="margin:0;padding:16px 26px">What the screen answers</div>
      <div class="lab" style="margin:0;padding:16px 20px;text-align:center">Typical dashboard</div>
      <div class="lab" style="margin:0;padding:16px 20px;text-align:center;color:var(--v2)">SolarSwarm platform</div>
    </div>
    ${LANDSCAPE_ROWS.map(
      ([q, a, b]) => `<div style="display:grid;grid-template-columns:1fr 260px 260px;border-top:1px solid var(--line)">
        <div style="padding:15px 26px;font-size:16.5px">${q}</div>
        <div style="padding:15px 20px;text-align:center;font-size:20px">${mark(a)}</div>
        <div style="padding:15px 20px;text-align:center;font-size:20px">${mark(b)}</div></div>`
    ).join("")}
  </div>
  <div class="mono" style="margin-top:14px;color:var(--faint);font-size:13px"><span style="color:var(--good)">●</span> standard &nbsp;&nbsp; <span style="color:var(--cu)">◐</span> in some &nbsp;&nbsp; <span>○</span> not found in the review</div>
</div>`;

/* ---------- 5. Service blueprint ---------- */
const STAGES = [
  { t: "Survey", buyer: "Shares the site and a year of utility bills.", ops: "Drone survey; swarm plans row pitch, shading and slope.", robot: "—", screen: "Site boundary and a savings estimate", mood: 2 },
  { t: "Lease", buyer: "Signs a PPA or lease. No capital outlay.", ops: "Lessor assigns units; pipeline moves to scheduled.", robot: "Staged at the depot", screen: "Lease pipeline", mood: 3 },
  { t: "Deploy", buyer: "Watches trucks arrive. No construction crew.", ops: "Pairs units at the portal; commissions the array.", robot: "Rolls off, washes, drives into formation", screen: "Onboarding: register → site → layout → deploy", mood: 4 },
  { t: "Operate", buyer: "Sees output and savings against the utility rate.", ops: "Monitors every fleet; tracks SLAs.", robot: "Tracks the sun, dual-axis", screen: "Energy in / out, fleet map", mood: 5 },
  { t: "Service", buyer: "A unit faults. Wants to know it is handled.", ops: "Forecast flagged it; spare dispatched.", robot: "Drives to the service lane; spare takes the slot", screen: "Predictive maintenance, digital twin, tickets", mood: 2 },
  { t: "Grow", buyer: "Adds units or moves rows for the season.", ops: "Redeploys idle units from other contracts.", robot: "Re-forms or relocates", screen: "Request more units, relocate", mood: 4 },
];
const MOOD_Y = (m) => 140 - m * 22;
const JOURNEY_HTML = (() => {
  const W = 1480;
  const colW = (W - 170) / STAGES.length;
  const pts = STAGES.map((s, i) => [170 + colW * i + colW / 2, MOOD_Y(s.mood)]);
  const d = pts.map((p, i) => (i ? `L${p[0]},${p[1]}` : `M${p[0]},${p[1]}`)).join(" ");
  const lane = (label, key, color) => `
    <div class="lab" style="margin:0;padding:14px 16px;border-top:1px solid var(--line);color:${color}">${label}</div>
    ${STAGES.map((s) => `<div style="padding:14px 16px;border-top:1px solid var(--line);border-left:1px solid var(--line)"><p class="b" style="font-size:14.5px;${key === "buyer" ? "color:var(--ink)" : ""}">${s[key]}</p></div>`).join("")}`;
  return `
<div id="c">
  <div class="eyebrow">Service blueprint</div>
  <h1>From site survey to a field that moves: one service, three people and a swarm</h1>
  <p class="sub">The customer’s path runs across the top. Ops and the robots do the work underneath, and each stage needs a screen. The low point is a fault, which is where predictive maintenance and self-healing fleets matter most.</p>
  <div class="card" style="margin-top:36px;padding:0;overflow:hidden">
    <div style="display:grid;grid-template-columns:170px repeat(${STAGES.length},1fr);background:var(--s1)">
      <div></div>
      ${STAGES.map((s, i) => `<div style="padding:18px 16px;border-left:1px solid var(--line);display:flex;align-items:center;gap:10px"><span class="mono" style="display:inline-flex;width:26px;height:26px;border-radius:7px;background:var(--vdeep);align-items:center;justify-content:center;font-size:13px">${i + 1}</span><h3 style="font-size:20px">${s.t}</h3></div>`).join("")}
      ${lane("Customer", "buyer", "var(--cu)")}
      <div style="grid-column:1/-1;border-top:1px solid var(--line);position:relative;height:150px;background:var(--bg)">
        <div class="lab" style="position:absolute;left:16px;top:4px">How it feels</div>
        <svg width="${W}" height="150" viewBox="0 0 ${W} 150" style="position:absolute;left:0;top:0">
          <line x1="170" x2="${W}" y1="${MOOD_Y(3)}" y2="${MOOD_Y(3)}" stroke="#2a2635" stroke-dasharray="4 6"/>
          <path d="${d}" fill="none" stroke="#bb97ff" stroke-width="3" stroke-linejoin="round"/>
          ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${STAGES[i].mood <= 2 ? "#ff7a70" : STAGES[i].mood >= 4 ? "#3ddc97" : "#bb97ff"}" stroke="#0b0a10" stroke-width="3"/>`).join("")}
        </svg>
        <div class="mono" style="position:absolute;left:${pts[0][0] - 40}px;top:${pts[0][1] + 14}px;font-size:13px;color:var(--bad)">“Will this disrupt the site?”</div>
        <div class="mono" style="position:absolute;left:${pts[4][0] - 150}px;top:${pts[4][1] + 14}px;font-size:13px;color:var(--bad)">“Unit 238 stopped. Now what?”</div>
        <div class="mono" style="position:absolute;left:${pts[3][0] - 110}px;top:${pts[3][1] - 32}px;font-size:13px;color:var(--good)">“31% more than fixed panels.”</div>
      </div>
      <div style="grid-column:1/-1;border-top:1px dashed var(--strong);padding:6px 16px;background:var(--s1)"><span class="mono" style="font-size:11px;letter-spacing:.14em;color:var(--faint)">LINE OF VISIBILITY</span></div>
      ${lane("SolarSwarm Ops", "ops", "#3fd0d0")}
      ${lane("Robots", "robot", "var(--v2)")}
      ${lane("Platform screen", "screen", "var(--dim)")}
    </div>
  </div>
</div>`;
})();

/* ---------- 6. How it deploys and delivers energy ---------- */
const DEPLOY_HTML = `
<div id="c">
  <div class="eyebrow">How it works</div>
  <h1>The array arrives on a truck, installs itself, and carries its own energy</h1>
  <p class="sub">The original concept had four steps: deliver, queue, form up, activate. The platform adds washing and inspection at the portal, and a swap loop that replaces trenching and cable runs across the field.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:36px">
    ${[
      ["Deliver", "Flatbeds carry six units each. Ramps drop and the units roll off on their own."],
      ["Wash & inspect", "Through the portal: mist, brush and air knife, cameras image every cell, sensors checked."],
      ["Form up", "Spacing planned from the survey. The farthest slots fill first, so no unit cuts through a parked one."],
      ["Raise & track", "Masts extend, panels unlock, and every panel follows the sun on two axes."],
      ["Swap & deliver", "Full units drive onto the swap station. A charged cassette goes up in about 90 seconds."],
    ]
      .map(
        ([t, b], i) => `<div class="card" style="position:relative;${i === 4 ? "border-color:var(--cu)" : ""}"><div class="mono" style="color:${i === 4 ? "var(--cu)" : "var(--v2)"};font-size:13px">0${i + 1}</div><h3 style="font-size:20px;margin-top:6px">${t}</h3><p class="b" style="margin-top:8px;font-size:14.5px">${b}</p></div>`
      )
      .join("")}
  </div>
  <div class="card" style="margin-top:22px;padding:26px 28px">
    <div class="lab" style="margin:0 0 18px">Energy path · no trenching, no cable runs</div>
    <div style="display:flex;align-items:center;gap:0">
      ${[
        ["Panel", "Dual-axis, up to ±60° tilt"],
        ["5 kWh cassette", "LFP, in each robot’s belly"],
        ["Swap station", "The rack is the site battery"],
        ["Inverter + grid tie", "At the station end wall"],
        ["Site load / export", "Pumps, cold rooms, the grid"],
      ]
        .map(
          ([t, b], i, a) => `<div style="flex:1;background:var(--s2);border:1px solid ${i === 1 || i === 2 ? "var(--cu)" : "var(--line)"};border-radius:12px;padding:16px 18px"><div style="font-weight:600;font-size:16.5px">${t}</div><div class="b" style="font-size:13.5px;margin-top:4px">${b}</div></div>${i < a.length - 1 ? `<div class="arrow" style="width:44px;flex:none">→</div>` : ""}`
        )
        .join("")}
    </div>
  </div>
</div>`;

/* ---------- 7. Architecture ---------- */
const box = (title, items, accent = "var(--line)") =>
  `<div class="card" style="border-color:${accent}"><div style="font-size:18px;font-weight:600">${title}</div><ul style="list-style:none;margin-top:10px">${items.map((i) => `<li class="b" style="font-size:14.5px;padding:3px 0">${i}</li>`).join("")}</ul></div>`;
const ARCH_HTML = `
<div id="c">
  <div class="eyebrow">Architecture</div>
  <h1>One robot model, one sun, one simulated world behind every screen</h1>
  <p class="sub">A single procedural Blender model produces both the rendered stills and the rigged 3D models in the browser. The same sun ephemeris drives the panels and the energy numbers, and a seeded simulation feeds every role’s view.</p>
  <div style="display:grid;grid-template-columns:1fr 40px 1.1fr 40px 1.15fr;align-items:stretch;margin-top:36px">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Sources</div>
      ${box("Blender · build_robot.py", ["Procedural robot, truck and portal", "Cycles renders for the site", "Rigged GLBs: mast, azimuth, tilt, wheels, LEDs", "Low-detail model for the swarm"], "var(--cu)")}
      ${box("Sun · suncalc", ["Real ephemeris for any site and time", "Dual-axis tracking poses", "Header clock with time-warp, 1× to 3600×"], "var(--cu)")}
    </div>
    <div class="arrow">→</div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Simulation · seeded, in the browser</div>
      ${box("World", ["Organizations, sites, leases, tickets", "784 units across 4 sites"], "var(--v)")}
      ${box("Energy model", ["Clear-sky generation per site", "Battery dispatch, site load, grid export", "Tracking gain against fixed tilt"], "var(--v)")}
      ${box("Health", ["Wear → risk → failure predictions", "Motor temperature, bearing vibration, soiling"], "var(--v)")}
    </div>
    <div class="arrow">→</div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Next.js app · role-aware</div>
      ${box("Marketing site", ["Scroll-driven 3D deployment", "Live sun tracking vs fixed tilt", "Robot anatomy, audiences, Ops"])}
      ${box("Platform", ["Overview for buyer, lessor or Ops", "Fleet map on Sentinel-2 imagery", "Robots, digital twin, energy, maintenance", "Onboarding: units join the live fleet"])}
      ${box("Three.js + MapLibre", ["One instanced mesh per part for hundreds of units", "Open imagery and map tiles, no API keys"])}
    </div>
  </div>
</div>`;

async function render(p, html, file) {
  await p.setContent(`<!doctype html><html><head><style>${CSS}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(tab, BASELINE_HTML, "diagram-baseline.png");
await render(tab, STAKEHOLDERS_HTML, "diagram-stakeholders.png");
await render(tab, PERSONAS_HTML, "diagram-personas.png");
await render(tab, LANDSCAPE_HTML, "diagram-landscape.png");
await render(tab, JOURNEY_HTML, "diagram-journey.png");
await render(tab, DEPLOY_HTML, "diagram-deploy.png");
await render(tab, ARCH_HTML, "diagram-architecture.png");
await browser.close();
