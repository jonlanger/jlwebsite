import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * Draws the CoCo case-study diagrams as HTML and photographs them, in the
 * app's own light palette (cool gray canvas, brand blue #007AFF, the v2 status
 * hues, Plus Jakarta Sans) so they sit with the screenshots.
 *
 * Persona photos come from the CoCo repo (~/Documents/Projects/coco).
 *
 *   node scripts/render-coco-diagrams.mjs
 */
const OUT = path.resolve("public/projects/coco/_src");
const COCO_IMG = path.join(os.homedir(), "Documents/Projects/coco/assets/img");

const photo = async (name) =>
  `data:image/jpeg;base64,${(await readFile(path.join(COCO_IMG, name))).toString("base64")}`;
const IMG = {
  customer: await photo("persona-customer.jpg"),
  driver: await photo("persona-driver.jpg"),
  collector: await photo("persona-collector.jpg"),
  fleet: await photo("persona-fleet-manager.jpg"),
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  :root { --canvas:#F6F7F9; --surface:#fff; --sunken:#EEF0F3; --line:#E1E4EA; --strong:#9AA3B2; --ink:#12161C; --dim:#4A5361; --faint:#6B7482;
    --blue:#007AFF; --blue-ink:#0066D6; --blue-soft:#EEF5FF; --blue-100:#DCEBFF; --navy:#0B1B33;
    --ok:#2E9E1E; --ok-soft:#DDF5D6; --warn:#6B4F00; --warn-fill:#F2C200; --warn-soft:#FFF3C4; --bad:#D93A0B; --bad-soft:#FFE6DD;
    --field:#121212; --field-2:#212121; --field-line:#333; --field-ink:#F2F2F2; --field-blue:#5AA8FF; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--canvas); color:var(--ink); font-family:"Plus Jakarta Sans",-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--canvas); }
  h1 { font-size:42px; font-weight:800; letter-spacing:-0.035em; line-height:1.08; }
  h1 em { font-style:normal; color:var(--blue); }
  .eyebrow { font-size:13px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--blue-ink); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .eyebrow::before { content:""; width:22px; height:2px; background:var(--blue); }
  .sub { color:var(--dim); font-size:18px; margin-top:12px; max-width:1180px; line-height:1.5; }
  .card { background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:22px 24px; }
  .card.field { background:var(--field); border-color:var(--field-line); color:var(--field-ink); }
  h3 { font-size:21px; font-weight:800; letter-spacing:-0.02em; }
  .lab { font-size:11.5px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin:16px 0 6px; }
  .field .lab { color:#9A9A9A; }
  p.b { font-size:15px; line-height:1.5; color:var(--dim); }
  .field p.b { color:#C9C9C9; }
  .chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:700; padding:4px 10px; border-radius:999px; margin:0 6px 6px 0; }
  .chip.info { background:var(--blue-soft); color:var(--blue-ink); }
  .chip.ok { background:var(--ok-soft); color:#1D5C14; }
  .chip.warn { background:var(--warn-soft); color:var(--warn); }
  .chip.bad { background:var(--bad-soft); color:#A8300B; }
  .chip.dark { background:#2A2A2A; color:#E6E6E6; }
  .chip.solid { background:var(--blue); color:#fff; }
  .num { font-variant-numeric:tabular-nums; }
  .av { width:64px; height:64px; border-radius:50%; object-fit:cover; flex:none; }
`;

const ROLE = {
  customer: { label: "Customer", color: "var(--blue)", app: "Customer portal", field: false },
  driver: { label: "Driver", color: "#5AA8FF", app: "In-cab navigation", field: true },
  collector: { label: "Collector", color: "#62D84E", app: "Field app", field: true },
  fleet: { label: "Fleet manager", color: "var(--navy)", app: "Fleet operations", field: false },
};

/* ---------- Personas ---------- */
const PERSONAS = [
  {
    key: "customer",
    name: "Meredith",
    role: "Customer · Back Bay resident",
    context: "On the couch or at work. Phone, iOS or Android, any time.",
    goal: "Know when the crew is coming, and proof that it was done right.",
    friction: "A missed pickup with no word from anyone. “Did they even come?”",
    leads: "Today’s pickup and a live tracker",
    mode: "Light",
  },
  {
    key: "driver",
    name: "Stan",
    role: "Driver · Truck 0091",
    context: "In a moving cab. Dash-mounted tablet or phone, gloves, glare.",
    goal: "One instruction at a time, and the crew in sync without typing.",
    friction: "Closures, blocked alleys and a partner out of sight behind the truck.",
    leads: "The next turn and one primary button",
    mode: "Field dark",
  },
  {
    key: "collector",
    name: "Miguel",
    role: "Collector · Back Bay",
    context: "On the street beside the truck. Rugged phone, one hand free.",
    goal: "The right bin, from the right address, with compliance proven.",
    friction: "Hazards and contamination found at the curb, with no easy way to flag them.",
    leads: "The next stop and a scan button",
    mode: "Field dark",
  },
  {
    key: "fleet",
    name: "Lucas",
    role: "Fleet manager · Boston",
    context: "At a desk, but checks risk from a phone first thing.",
    goal: "See tomorrow’s risk (maintenance, certifications, delays) before it lands.",
    friction: "Too much data, not enough signal. Incidents arrive by phone call.",
    leads: "What needs a decision, on a live map",
    mode: "Light",
  },
];

const PERSONAS_HTML = `
<div id="c">
  <div class="eyebrow">Four roles, one pickup</div>
  <h1>Same records, <em>four different jobs</em></h1>
  <p class="sub">Each role touches the same pickup from a different place: a couch, a cab, a curb and a desk. So each gets its own app, and each app opens on something different.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:36px">
    ${PERSONAS.map((p) => {
      const r = ROLE[p.key];
      return `
      <div class="card ${r.field ? "field" : ""}" style="padding:24px;border-top:5px solid ${r.color}">
        <div style="display:flex;align-items:center;gap:14px"><img class="av" src="${IMG[p.key]}"><div><h3>${p.name}</h3><div style="font-size:13.5px;font-weight:600;opacity:.75;margin-top:2px">${p.role}</div></div></div>
        <div class="lab">Context</div><p class="b">${p.context}</p>
        <div class="lab">Goal</div><p class="b" style="color:${r.field ? "#fff" : "var(--ink)"};font-weight:600">${p.goal}</p>
        <div class="lab">Friction</div><p class="b">${p.friction}</p>
        <div class="lab">The app opens on</div>
        <div><span class="chip ${r.field ? "dark" : "info"}">${p.leads}</span></div>
        <div class="lab">Mode</div>
        <div><span class="chip ${r.field ? "dark" : "info"}">${r.app}</span><span class="chip ${r.field ? "dark" : "info"}">${p.mode}</span></div>
      </div>`;
    }).join("")}
  </div>
</div>`;

/* ---------- One pickup, four perspectives: hand-offs through the store ---------- */
const STEPS = ["Request", "Approve", "Roll out", "Arrive", "Scan", "Check + photo", "Complete"];
// [role, stepIndex, text, kind] kind: act = the role acts, see = the role sees it
const CELLS = {
  customer: [
    [0, "Books a pickup with a photo estimate", "act"],
    [1, "“Pickup approved” notice", "see"],
    [2, "Tracker: Crew on route", "see"],
    [3, "“Crew is here”", "see"],
    [4, "Tracker: bin scanned", "see"],
    [6, "“All done!” with photo proof", "see"],
  ],
  fleet: [
    [0, "Request lands in Pickups", "see"],
    [1, "Approves and assigns Truck 0091", "act"],
    [2, "Truck goes live on the map", "see"],
    [5, "Compliance rate ticks up", "see"],
    [6, "Progress and territory update", "see"],
  ],
  driver: [
    [1, "Stop added to today’s route", "see"],
    [2, "Pre-trip check, acknowledges the route", "act"],
    [3, "Taps Arrived at stop", "act"],
    [4, "Crew tracker: Scanned", "see"],
    [5, "Crew tracker: Checks done", "see"],
    [6, "Nav moves to the next stop", "see"],
  ],
  collector: [
    [2, "Queue loads with notes and gate code", "see"],
    [3, "“Truck is at stop 6”", "see"],
    [4, "Scans the bin barcode", "act"],
    [5, "Four checks and photo proof", "act"],
    [6, "+10 reward points", "see"],
  ],
};
const LANES = ["customer", "fleet", "driver", "collector"];

const HANDOFF_HTML = (() => {
  const cols = STEPS.length;
  const cell = (key, i) => {
    const c = CELLS[key].find((x) => x[0] === i);
    if (!c) return `<div></div>`;
    const act = c[2] === "act";
    const r = ROLE[key];
    const bg = act ? (r.field ? "var(--field)" : "var(--blue)") : "var(--surface)";
    const color = act ? "#fff" : "var(--ink)";
    const border = act ? bg : "var(--line)";
    return `<div style="background:${bg};color:${color};border:1px solid ${border};border-radius:12px;padding:12px 13px;font-size:14px;line-height:1.35;font-weight:${act ? 700 : 500};min-height:66px;display:flex;align-items:center">${c[1]}</div>`;
  };
  return `
<div id="c">
  <div class="eyebrow">How the roles connect</div>
  <h1>One pickup. Four perspectives. <em>One store.</em></h1>
  <p class="sub">Every hand-off goes through the shared data layer, so an action in one app shows up in the others straight away. Filled cards are where a role acts; outlined cards are what the others see without a phone call.</p>
  <div style="display:grid;grid-template-columns:190px repeat(${cols},1fr);gap:10px;margin-top:34px;align-items:stretch">
    <div></div>
    ${STEPS.map((s, i) => `<div style="display:flex;align-items:center;gap:8px;padding:0 2px 4px"><span class="num" style="display:inline-flex;width:26px;height:26px;border-radius:50%;background:var(--blue-100);color:var(--blue-ink);align-items:center;justify-content:center;font-size:13px;font-weight:800">${i + 1}</span><span style="font-weight:800;font-size:16px">${s}</span></div>`).join("")}
    ${LANES.map(
      (k) => `<div style="display:flex;align-items:center;gap:10px"><img src="${IMG[k]}" style="width:38px;height:38px;border-radius:50%;object-fit:cover"><div><div style="font-weight:800;font-size:15px">${ROLE[k].label}</div><div style="font-size:12px;color:var(--faint);font-weight:600">${ROLE[k].app}</div></div></div>
      ${STEPS.map((_, i) => cell(k, i)).join("")}`
    ).join("")}
    <div style="display:flex;align-items:center;gap:10px"><span style="display:inline-flex;width:38px;height:38px;border-radius:10px;background:var(--blue);color:#fff;align-items:center;justify-content:center;font-weight:800;font-size:14px">Co</span><div><div style="font-weight:800;font-size:15px">Shared store</div><div style="font-size:12px;color:var(--faint);font-weight:600">one live record</div></div></div>
    ${["pickup: requested", "approved · Truck 0091", "route.acknowledged", "route.arrivedAt = s6", "phase: scanned", "phase: checked", "stop: done · photo"]
      .map((t) => `<div class="num" style="background:var(--blue-soft);border:1px dashed #86BCFF;border-radius:10px;padding:10px 12px;font-size:12.5px;font-weight:700;color:var(--blue-ink);font-family:ui-monospace,Menlo,monospace">${t}</div>`)
      .join("")}
  </div>
  <div class="card" style="margin-top:22px;display:grid;grid-template-columns:230px 1fr;gap:20px;align-items:center;border-left:5px solid var(--bad)">
    <div><div class="lab" style="margin-top:0;color:var(--bad)">When something goes wrong</div><div style="font-weight:800;font-size:18px">The collector flags a problem</div></div>
    <div style="display:flex;align-items:center;gap:10px;white-space:nowrap;font-size:14px;font-weight:600">
      <span class="chip bad" style="margin:0">Incident opens in Fleet</span>→
      <span class="chip warn" style="margin:0">Playbook: reschedule, credit, send the crew back</span>→
      <span class="chip info" style="margin:0">Customer is told before they call</span>→
      <span class="chip dark" style="margin:0">Crew gets the stop back</span>
    </div>
  </div>
</div>`;
})();

/* ---------- Priorities -> what each app leads with ---------- */
const TOP = {
  Customer: ["Pickup tracking & notifications", "Trash size & weight estimation", "Billing & payments"],
  Collector: ["Pickup tracking & notifications", "Route optimization & tracking", "Trash size & weight estimation"],
  Driver: ["Pickup tracking & notifications", "Navigation assistance", "Trash size & weight estimation"],
  "Fleet manager": ["Fleet maintenance scheduling", "Compliance & regulatory management", "Route planning & optimization"],
};
const LEADS = {
  Customer: ["customer", "Home opens on today’s pickup; Track shows stops-away, ETA and photo proof.", "Photo estimate in the request flow"],
  Collector: ["collector", "Queue opens on the next stop, its notes and a full-width Scan bin button.", "Weight estimate on every stop"],
  Driver: ["driver", "Drive opens on the next turn, the stop and Arrived at stop. Nothing else competes.", "Load % on the route"],
  "Fleet manager": ["fleet", "Overview opens on “Needs a decision”: brakes overdue, certifications, delays.", "Maintenance ranked by risk"],
};
const PRIORITY_HTML = `
<div id="c">
  <div class="eyebrow">From research to layout</div>
  <h1>Field teams need <em>now</em>. Managers need <em>tomorrow</em>.</h1>
  <p class="sub">Every role ranked the same feature list. Pickup tracking came first for customers, collectors and drivers, and fell to mid-list for fleet managers, who ranked maintenance and compliance highest. So each app leads with a different first screen.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:36px">
    ${Object.entries(TOP).map(([role, feats]) => {
      const [key, lead, also] = LEADS[role];
      const r = ROLE[key];
      const mgr = key === "fleet";
      return `<div style="display:flex;flex-direction:column;gap:14px">
        <div class="card" style="padding:20px 22px">
          <div style="display:flex;align-items:center;gap:12px"><img src="${IMG[key]}" style="width:40px;height:40px;border-radius:50%;object-fit:cover"><h3 style="font-size:19px">${role}</h3></div>
          <div class="lab">Ranked highest</div>
          ${feats.map((f, i) => `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;${i ? "border-top:1px solid var(--line);" : ""}"><span class="num" style="font-weight:800;color:${i === 0 ? (mgr ? "var(--warn)" : "var(--blue)") : "var(--faint)"};width:24px">#${i + 1}</span><span style="font-size:14.5px;font-weight:${i === 0 ? 800 : 500}">${f}</span></div>`).join("")}
        </div>
        <div style="text-align:center;color:var(--strong);font-size:24px;line-height:1">↓</div>
        <div class="card ${r.field ? "field" : ""}" style="padding:20px 22px;flex:1;${mgr ? "" : r.field ? "" : "border-color:#86BCFF;"}">
          <div class="lab" style="margin-top:0">So the app leads with</div>
          <p class="b" style="font-weight:600;color:${r.field ? "#fff" : "var(--ink)"};font-size:15.5px">${lead}</p>
          <div style="margin-top:12px"><span class="chip ${r.field ? "dark" : mgr ? "warn" : "info"}">${mgr ? "Risk first" : "Status first"}</span><span class="chip ${r.field ? "dark" : "info"}">${also}</span></div>
        </div>
      </div>`;
    }).join("")}
  </div>
</div>`;

/* ---------- Architecture ---------- */
const box = (title, items, accent = "var(--line)", extra = "") =>
  `<div class="card" style="border-color:${accent};padding:18px 20px${extra}"><div style="font-size:17px;font-weight:800">${title}</div><ul style="list-style:none;margin-top:8px">${items.map((i) => `<li class="b" style="font-size:14px;padding:3px 0">${i}</li>`).join("")}</ul></div>`;
const arrow = `<div style="display:flex;align-items:center;justify-content:center;color:var(--strong);font-size:26px;font-weight:700">→</div>`;
const ARCH_HTML = `
<div id="c">
  <div class="eyebrow">Architecture</div>
  <h1>Four apps, <em>one live data layer</em>, no back end to run</h1>
  <p class="sub">Plain HTML, CSS and ES modules with no build step. One platform shell hosts every role; one store holds every record and syncs across tabs, so the customer and the collector can run side by side and react to each other.</p>
  <div style="display:grid;grid-template-columns:1fr 40px 1.1fr 40px 1.15fr;align-items:stretch;margin-top:34px">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="lab" style="margin:0">Surfaces</div>
      ${box("Homepage + sign-in hub", ["The story, then a door into every role"])}
      ${box("Customer portal", ["Request · track · pickups · recycling guide"], "var(--blue)")}
      ${box("Driver · in-cab", ["Pre-trip · route briefing · turn-by-turn · shift"], "#5AA8FF", ";background:var(--field);color:#fff")}
      ${box("Collector · field", ["Queue · scan · compliance · problems · rewards"], "#62D84E", ";background:var(--field);color:#fff")}
      ${box("Fleet operations", ["Live map · fleet · pickups · maintenance · safety"], "var(--navy)")}
    </div>
    ${arrow}
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="lab" style="margin:0">Platform shell · platform.js</div>
      ${box("Routing and layout", ["Hash routes per role", "Phones: tab bar · ≥900px: sidebar or icon rail", "Switch app between all four roles"], "var(--blue)")}
      ${box("Accessibility and display", ["Light, dark or field mode per app", "Text size to 125%, high contrast, reduced motion", "56px touch targets, underlined links"], "var(--blue)")}
      ${box("Design system tokens", ["Primitives → semantic tokens → components", "Light and field-dark sets", "The same tokens style the map"], "var(--blue)")}
    </div>
    ${arrow}
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="lab" style="margin:0">Data and maps</div>
      ${box("Shared store · store.js", ["Customer, route, stops, pickups, incidents, areas, messages", "localStorage, synced across tabs", "Cross-role actions: arrive, scan, flag, approve, dispatch"], "var(--ok)", ";background:#F4FBF1")}
      ${box("Self-hosted basemap", ["MapLibre GL with a Protomaps extract of Boston", "One static .pmtiles file read by byte range", "No API keys, no tile server"], "var(--warn-fill)")}
      ${box("Street routing in the browser", ["Road graph extracted from the same tiles", "One-ways, closures and hazard zones", "Real turn names and live re-routing"], "var(--warn-fill)")}
    </div>
  </div>
  <div class="card" style="margin-top:18px;padding:14px 22px;display:flex;gap:28px;align-items:center">
    <div style="font-size:16px;font-weight:800;white-space:nowrap">Draw a closure</div>
    <div class="b">Fleet draws a road closure on its map → the store saves the area → the driver’s route replans around it and both crew apps get a dispatch alert.</div>
  </div>
</div>`;

/* ---------- User flows, one per role ----------
 * Node kinds: screen (a screen in this app), act (this person taps),
 * sync (caused by another role through the store), done (end state).
 */
const FLOW_CSS = `
  #c.dark { color:var(--ink); --canvas:#0E0E0F; --surface:#1A1A1B; --sunken:#212121; --line:#333; --strong:#6B6B6B; --ink:#F2F2F2; --dim:#C9C9C9; --faint:#9A9A9A;
    --blue-ink:#86BCFF; --blue-soft:#10243F; --ok-soft:#14300F; --bad-soft:#3A1A10; }
  .frow { display:grid; grid-template-columns:200px 1fr; gap:18px; align-items:stretch; margin-top:18px; }
  .frow .rl { padding-top:6px; }
  .frow .rl b { display:block; font-size:16px; font-weight:800; }
  .frow .rl span { display:block; font-size:12.5px; color:var(--faint); font-weight:600; margin-top:3px; line-height:1.35; }
  .fl { display:flex; align-items:stretch; }
  .fa { flex:none; width:26px; display:flex; align-items:center; justify-content:center; color:var(--strong); font-size:20px; font-weight:700; }
  .fn { flex:1; min-width:0; border-radius:12px; padding:11px 12px; border:1px solid var(--line); background:var(--surface); }
  .fn .k { font-size:10.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  .fn .t { font-size:14.5px; font-weight:800; margin-top:3px; line-height:1.25; letter-spacing:-.01em; }
  .fn .d { font-size:12.5px; color:var(--dim); margin-top:4px; line-height:1.35; }
  .fn.act { background:var(--role); border-color:var(--role); color:var(--role-ink); }
  .fn.act .k, .fn.act .d { color:var(--role-ink); opacity:.85; }
  .fn.sync { background:var(--blue-soft); border:1.5px dashed #86BCFF; }
  .fn.sync .k { color:var(--blue-ink); }
  .fn.done { background:var(--ok-soft); border-color:#62D84E; }
  .fn.done .k { color:#62D84E; }
  .fn.bad { background:var(--bad-soft); border-color:#F4906A; }
  .fn.bad .k { color:#F4906A; }
  .loop { margin-left:8px; flex:none; display:flex; align-items:center; font-size:12.5px; font-weight:800; color:var(--blue-ink); white-space:nowrap; }
  .legend { display:flex; gap:18px; margin-top:22px; font-size:12.5px; font-weight:700; color:var(--dim); align-items:center; }
  .legend i { display:inline-block; width:18px; height:12px; border-radius:4px; margin-right:7px; vertical-align:-1px; border:1px solid var(--line); background:var(--surface); }
  .tabs { display:flex; flex-wrap:wrap; gap:8px; }
  .tabs span { font-size:13px; font-weight:700; padding:7px 12px; border-radius:999px; background:var(--sunken); border:1px solid var(--line); }
`;
const n = (kind, k, t, d = "") => ({ kind, k, t, d });
const FLOWS = {
  customer: {
    dark: false,
    role: "#006FE6",
    roleInk: "#fff",
    title: "Meredith books and tracks a pickup",
    sub: "Onboarding asks only what’s needed to start service. After that, the app is one loop: request, track, confirm. Everything else is a tab away.",
    rows: [
      ["First run", "Four steps, then home", [
        n("screen", "Welcome", "Let’s get started"),
        n("act", "Step 1", "Create your account"),
        n("act", "Step 2", "Where do we pick up?", "Address and bin placement"),
        n("act", "Step 3", "Choose your service", "Weekly trash + recycling"),
        n("act", "Step 4", "Payment", "Card and autopay"),
        n("done", "Done", "You’re all set", "First pickup scheduled"),
      ]],
      ["Request", "Five steps, under two minutes", [
        n("screen", "Home", "Today’s pickup first", "Quick actions below"),
        n("act", "1 · 2", "How often? What is it?", "One-time or recurring; trash to hazardous"),
        n("act", "3", "Show us what’s going", "Photo → size and weight estimate"),
        n("act", "4", "When works?", "Date and time window"),
        n("act", "5", "Confirm", "Address, window, price"),
        n("sync", "Fleet", "Approved, truck assigned", "“Pickup approved” notice"),
      ]],
      ["Track", "Status from the crew’s real progress", [
        n("screen", "Scheduled", "Bins out by 9", "Night-before reminder"),
        n("sync", "Driver", "N stops away · ETA", "Route acknowledged"),
        n("screen", "Next", "You’re next", "Before-the-truck checklist"),
        n("sync", "Driver + collector", "Crew is here", "Scanned → emptying"),
        n("done", "Collector", "All done!", "Photo proof and compliance"),
        n("act", "Close the loop", "Rate the pickup", "Feedback to fleet"),
      ]],
      ["If it goes wrong", "Told before they call", [
        n("sync", "Collector", "Crew flags a problem", "e.g. gate locked, contamination"),
        n("bad", "Track", "We hit a snag", "Fleet has been alerted"),
        n("sync", "Fleet playbook", "Reschedule, credit or send back", "Each step updates this app"),
        n("done", "Resolved", "New time or $12 credit", "No call needed"),
      ]],
    ],
    tabs: ["Pickups & history", "Recycling guide", "Account", "Payments & billing", "Notifications", "Pickup preferences", "Help & support"],
  },
  driver: {
    dark: true,
    role: "#5AA8FF",
    roleInk: "#0B1B33",
    title: "Stan drives the route",
    sub: "Built for a moving cab: one instruction and one primary action per screen, 56px targets, and the collector’s progress mirrored at every stop.",
    rows: [
      ["Start of shift", "Before the truck moves", [
        n("act", "Sign in", "Tap badge, pick the truck", "Truck 0091 · front loader"),
        n("act", "Pre-trip", "Six-point inspection", "Brakes, lights, hydraulics, tires…"),
        n("screen", "Briefing", "Today’s route", "12 stops · 1h 07m · 3.9 mi"),
        n("sync", "Fleet dispatch", "Closures and notices", "Boylston St closed until 11"),
        n("act", "Go", "Start route", "Crew and customers see it"),
      ]],
      ["Every stop", "Repeats for all 12", [
        n("screen", "Drive", "Next turn, next stop", "Heading-up, real street names"),
        n("act", "Arrive", "Arrived at stop", "Collector: “Truck is at stop”"),
        n("sync", "Collector", "Crew tracker", "Arrived → Scanned → Checks done"),
        n("screen", "Next", "Route moves on", "Load % updates"),
      ], "↻ per stop"],
      ["End of shift", "Load over 60% triggers a tip run", [
        n("act", "Tip run", "Drive to transfer station", "Scale ticket in tons"),
        n("act", "Post-trip", "End of shift", "Today vs plan, notes"),
        n("done", "Fleet", "Shift report on the truck page", "Load resets"),
      ]],
      ["If it goes wrong", "Routes react; nothing to type", [
        n("bad", "Pre-trip", "Something failed", "Goes straight to fleet"),
        n("sync", "Fleet map", "Closure or hazard drawn", "Dispatch alert"),
        n("screen", "Drive", "Route replans", "“Route updated for road changes”"),
        n("act", "Report", "Report a problem", "Opens a fleet incident"),
      ]],
    ],
    tabs: ["Stops", "Crew channel · quick replies, push-to-talk", "Truck & breaks", "Report a problem"],
  },
  collector: {
    dark: true,
    role: "#62D84E",
    roleInk: "#0E2A0A",
    title: "Miguel collects, verifies and proves",
    sub: "Compliance happens inside the pickup, not in a report afterwards: scan the bin, four checks, a photo. Problems become incidents in one flow.",
    rows: [
      ["First run", "Three steps to field ready", [
        n("act", "Step 1", "Personal information", "Photo, ID, emergency contact"),
        n("act", "Step 2", "Compliance & safety", "Certifications, PPE"),
        n("act", "Step 3", "Collection info", "Territory and truck"),
        n("done", "Ready", "Field ready", "Queue loads"),
      ]],
      ["Every stop", "Repeats for all 12", [
        n("screen", "Queue", "Next stop + Scan bin", "Notes, gate code, closures"),
        n("sync", "Driver", "“Truck is at stop 6”", "Driver tapped Arrived"),
        n("screen", "Profile", "Key items and history", "Bulk add-on, customer photo"),
        n("act", "Scan", "Scan the barcode", "Bin verified · CC-204913"),
        n("act", "Confirm", "Four checks + photo", "Weight estimate"),
        n("done", "Complete", "Pickup complete", "+10 points · customer notified"),
      ], "↻ per stop"],
      ["If it goes wrong", "One flow from curb to fleet", [
        n("act", "At the bin", "Something’s wrong", "From scan or confirm"),
        n("screen", "Problem items", "Pick the problem", "Contaminated, hazardous, overweight, bin not out, blocked, damaged"),
        n("act", "Flag", "Flag & notify", "Note and photo"),
        n("sync", "Fleet + customer", "Incident opens", "Customer told; crew moves on"),
      ]],
    ],
    tabs: ["Crew channel", "My performance · rewards, compliance, certifications", "Sign out"],
  },
  fleet: {
    dark: false,
    role: "#0B1B33",
    roleInk: "#fff",
    title: "Lucas manages risk across the fleet",
    sub: "Opens on what needs a decision, not on totals. Each workflow ends in the crew or customer apps, so a decision is also the message.",
    rows: [
      ["Start of day", "Risk before numbers", [
        n("screen", "Overview", "KPIs and live map", "Pickups, on-schedule, incidents, fuel"),
        n("screen", "Needs a decision", "Ranked list", "Brakes overdue, downed tree, certifications"),
        n("act", "Open", "Pick the top item", "Incident, truck or crew"),
      ]],
      ["Incidents", "A playbook where every step does real work", [
        n("sync", "Collector / driver / telematics", "Incident reported", "Severity and location"),
        n("act", "Incident", "Acknowledge, set owner", "Or call the crew"),
        n("act", "Playbook", "Run a step", "Pull truck, spare, shop, ETAs, reschedule, credit"),
        n("sync", "Crew + customer", "Apps react", "Alerts, re-queued stops, notices"),
        n("done", "Resolved", "Logged with a timeline", "OSHA / MassDEP where needed"),
      ]],
      ["Pickups", "Customer requests", [
        n("sync", "Customer", "Request lands", "Requests to approve"),
        n("act", "Approve", "Assign a truck", "Added to the route"),
        n("done", "Customer", "“Pickup approved”", "Driver sees the stop"),
      ]],
      ["Map and maintenance", "Prevent tomorrow’s problems", [
        n("act", "Map", "Draw an area", "Closure, hazard, territory, staging"),
        n("sync", "Driver + collector", "Routes replan, crews alerted", "Hazmat PPE required"),
        n("screen", "Maintenance", "Ranked by risk", "Overdue first"),
        n("act", "Schedule", "Book the shop", "Work order at the depot"),
      ]],
    ],
    tabs: ["Fleet table", "Truck detail · live map, crew, activity", "Compliance · incidents, certifications, SOP health", "Book recertification → collector"],
  },
};

const FLOW_HTML = (key) => {
  const f = FLOWS[key];
  const r = ROLE[key];
  return `
<div id="c" class="${f.dark ? "dark" : ""}" style="--role:${f.role};--role-ink:${f.roleInk}">
  <div style="display:flex;align-items:center;gap:18px">
    <img src="${IMG[key]}" style="width:72px;height:72px;border-radius:50%;object-fit:cover">
    <div>
      <div class="eyebrow" style="margin-bottom:6px">User flow · ${r.label} · ${r.app}</div>
      <h1 style="font-size:38px">${f.title}</h1>
    </div>
  </div>
  <p class="sub" style="margin-top:14px">${f.sub}</p>
  <div style="margin-top:12px">
    ${f.rows
      .map(
        ([label, hint, nodes, loop]) => `<div class="frow">
      <div class="rl"><b>${label}</b><span>${hint}</span></div>
      <div class="fl">${nodes
        .map((x, i) => `${i ? '<div class="fa">→</div>' : ""}<div class="fn ${x.kind}"><div class="k">${x.k}</div><div class="t">${x.t}</div>${x.d ? `<div class="d">${x.d}</div>` : ""}</div>`)
        .join("")}${loop ? `<div class="loop">${loop}</div>` : ""}</div>
    </div>`
      )
      .join("")}
    <div class="frow">
      <div class="rl"><b>A tab away</b><span>Reachable, never competing</span></div>
      <div class="tabs" style="align-items:center">${f.tabs.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>
  </div>
  <div class="legend">
    <span><i></i>Screen</span>
    <span><i style="background:var(--role);border-color:var(--role)"></i>${r.label} acts</span>
    <span><i style="background:var(--blue-soft);border:1.5px dashed #86BCFF"></i>Another role, through the shared store</span>
    <span><i style="background:var(--ok-soft);border-color:#62D84E"></i>Outcome</span>
    <span><i style="background:var(--bad-soft);border-color:#F4906A"></i>Problem</span>
  </div>
</div>`;
};

async function render(p, html, file) {
  await p.setContent(`<!doctype html><html><head><style>${CSS}${FLOW_CSS}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(tab, PERSONAS_HTML, "diagram-personas.png");
await render(tab, HANDOFF_HTML, "diagram-handoffs.png");
await render(tab, PRIORITY_HTML, "diagram-priorities.png");
await render(tab, ARCH_HTML, "diagram-architecture.png");
for (const key of ["customer", "driver", "collector", "fleet"]) await render(tab, FLOW_HTML(key), `flow-${key}.png`);
await browser.close();
