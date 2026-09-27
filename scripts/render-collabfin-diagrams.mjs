import { chromium } from "playwright";
import path from "node:path";

/**
 * Draws the Collabfin case-study diagrams as HTML and photographs them, in the
 * app's own dark palette (deep navy canvas, Bricolage Grotesque + Instrument
 * Sans + Geist Mono, brand blue, gain green, loss red, collaborator colors) so
 * they sit with the screenshots.
 *
 *   node scripts/render-collabfin-diagrams.mjs
 */
const OUT = path.resolve("public/projects/collabfin/_src");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,750&family=Instrument+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
  :root { --canvas:#070b17; --s1:#0a0f1f; --s2:#121a31; --s3:#172040; --line:#232d4a; --strong:#5d6a97; --ink:#eef2ff; --dim:#a9b3d1; --faint:#8b95b6;
    --brand:#3563f5; --brand-ink:#8aa8ff; --brand-soft:#172a5c; --accent:#f5c46a; --gain:#3ddc97; --loss:#ff7a70;
    --p1:#8aa8ff; --p2:#f5c46a; --p3:#f07cc4; --p4:#3fd0d0; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--canvas); color:var(--ink); font-family:"Instrument Sans",-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--canvas) radial-gradient(var(--line) 1px, transparent 1.2px) 0 0/22px 22px; }
  h1 { font-family:"Bricolage Grotesque",sans-serif; font-size:40px; font-weight:750; letter-spacing:-0.03em; line-height:1.08; }
  .eyebrow { font-family:"Geist Mono",monospace; font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:var(--brand-ink); margin-bottom:12px; }
  .sub { color:var(--dim); font-size:18px; margin-top:12px; max-width:1150px; line-height:1.5; }
  .card { background:var(--s2); border:1px solid var(--line); border-radius:14px; padding:22px 24px; }
  .mono { font-family:"Geist Mono",monospace; font-variant-numeric:tabular-nums; }
  h3 { font-family:"Bricolage Grotesque",sans-serif; font-size:24px; font-weight:750; letter-spacing:-0.02em; }
  .lab { font-family:"Geist Mono",monospace; font-size:11.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin:18px 0 8px; }
  p.b { font-size:15.5px; line-height:1.5; color:var(--dim); }
  .pill { display:inline-block; font-size:13px; padding:5px 10px; border-radius:999px; background:var(--s3); border:1px solid var(--line); margin:0 6px 6px 0; }
  .av { display:inline-flex; width:44px; height:44px; border-radius:50%; align-items:center; justify-content:center; font-weight:600; font-size:18px; color:#0a0f1f; }
  .arrow { display:flex; align-items:center; justify-content:center; color:var(--strong); font-size:26px; }
  .gain { color:var(--gain); } .loss { color:var(--loss); }
`;

/* ---------- Personas ---------- */
const PERSONAS = [
  {
    init: "P",
    color: "var(--p3)",
    name: "Priya, the household planner",
    who: "Runs the money for a two-income household. Owns the spreadsheet nobody else opens.",
    goal: "One plan both partners trust, with the emergency fund on a date they can see.",
    friction: "Spreadsheets break when someone else edits them. Bank apps show last month, not the plan.",
    jobs: ["Map income to bills", "Set a savings rule", "Try a what-if", "Share without a tutorial"],
    uses: ["Templates", "Links and splits", "Plans", "Invite link"],
  },
  {
    init: "S",
    color: "var(--p2)",
    name: "Sam, the partner who checks in",
    who: "Shares the account but not the spreadsheet. Wants to change one number without breaking the rest.",
    goal: "See where the money goes and what their change does, right away.",
    friction: "Formulas feel fragile. Doesn’t know who changed what, or why the total moved.",
    jobs: ["Update a budget", "See the new total", "Know who changed what", "Undo a mistake"],
    uses: ["Live cursors", "Totals bar", "History", "Undo"],
  },
  {
    init: "J",
    color: "var(--p4)",
    name: "Jordan, planning solo",
    who: "Freelancer with uneven income and a credit card balance. Plans alone but wants a second opinion.",
    goal: "Know real take-home pay and the day the debt is gone.",
    friction: "Tax math and payoff schedules live in separate calculators that don’t talk to each other.",
    jobs: ["Work out take-home", "Plan a payoff", "Import real spending", "Catch mistakes"],
    uses: ["Taxes card", "Debt card", "Statement import", "Checks"],
  },
];

const PERSONAS_HTML = `
<div id="c">
  <div class="eyebrow">Proto-personas</div>
  <h1>People who share money, and the one who plans it alone</h1>
  <p class="sub">Most money apps assume one person with one login. Collabfin is built for the conversation: the planner, the partner who checks in, and the solo planner who wants the same clarity.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px">
    ${PERSONAS.map(
      (p) => `
      <div class="card" style="padding:26px 26px">
        <div style="display:flex;align-items:center;gap:14px"><span class="av" style="background:${p.color}">${p.init}</span><h3 style="font-size:21px">${p.name}</h3></div>
        <p class="b" style="margin-top:14px">${p.who}</p>
        <div class="lab">Goal</div><p class="b" style="color:var(--ink)">${p.goal}</p>
        <div class="lab">Friction</div><p class="b">${p.friction}</p>
        <div class="lab">Jobs to be done</div>
        <div>${p.jobs.map((j) => `<span class="pill">${j}</span>`).join("")}</div>
        <div class="lab">What they use</div>
        <div>${p.uses.map((j) => `<span class="pill" style="border-color:var(--brand-ink);color:var(--brand-ink);background:transparent">${j}</span>`).join("")}</div>
      </div>`
    ).join("")}
  </div>
</div>`;

/* ---------- User journey ---------- */
const STAGES = [
  {
    n: "1",
    title: "Start",
    doing: "Picks a template or drops in a bank CSV.",
    sees: "Paycheck, bills and spending found and turned into cards.",
    mood: 2,
  },
  {
    n: "2",
    title: "Build",
    doing: "Adds cards and drags links between them.",
    sees: "Amounts on every link. Totals bar updates as they go.",
    mood: 3,
  },
  {
    n: "3",
    title: "Check",
    doing: "Opens Checks after the numbers stop adding up.",
    sees: "Double counting, splits over 100%, a dip below the buffer. One-click fixes.",
    mood: 1,
  },
  {
    n: "4",
    title: "Share",
    doing: "Sends an invite link to edit or just view.",
    sees: "Partner’s cursor, who’s editing, a shared history.",
    mood: 4,
  },
  {
    n: "5",
    title: "What if",
    doing: "Copies the board into a plan and changes the rent.",
    sees: "Side-by-side: left over, balances, goal dates.",
    mood: 3,
  },
  {
    n: "6",
    title: "Decide",
    doing: "Agrees on a plan and comes back monthly.",
    sees: "Goal date and payoff date they both trust.",
    mood: 5,
  },
];
const MOOD_Y = (m) => 150 - m * 26;
const JOURNEY_HTML = (() => {
  const colW = 1480 / STAGES.length;
  const pts = STAGES.map((s, i) => [colW * i + colW / 2, MOOD_Y(s.mood)]);
  const d = pts.map((p, i) => (i ? `L${p[0]},${p[1]}` : `M${p[0]},${p[1]}`)).join(" ");
  return `
<div id="c">
  <div class="eyebrow">User journey</div>
  <h1>From a messy month to a plan two people agree on</h1>
  <p class="sub">The planner’s path through a first session. The low point is the moment the numbers don’t add up, which is where Checks steps in.</p>
  <div style="display:grid;grid-template-columns:repeat(${STAGES.length},1fr);gap:0;margin-top:36px;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--s1)">
    ${STAGES.map(
      (s, i) => `<div style="padding:20px 20px 14px;${i ? "border-left:1px solid var(--line);" : ""}">
        <div style="display:flex;align-items:center;gap:10px"><span class="mono" style="display:inline-flex;width:28px;height:28px;border-radius:8px;background:var(--brand);align-items:center;justify-content:center;font-size:14px">${s.n}</span><h3 style="font-size:22px">${s.title}</h3></div>
      </div>`
    ).join("")}
    ${STAGES.map((s, i) => `<div style="padding:0 20px 18px;${i ? "border-left:1px solid var(--line);" : ""}"><div class="lab" style="margin-top:0">Doing</div><p class="b" style="color:var(--ink)">${s.doing}</p></div>`).join("")}
    ${STAGES.map((s, i) => `<div style="padding:0 20px 20px;${i ? "border-left:1px solid var(--line);" : ""}"><div class="lab" style="margin-top:0">Collabfin shows</div><p class="b">${s.sees}</p></div>`).join("")}
    <div style="grid-column:1/-1;border-top:1px solid var(--line);position:relative;height:170px">
      <div class="lab" style="position:absolute;left:20px;top:0">How it feels</div>
      <svg width="1480" height="170" viewBox="0 0 1480 170" style="position:absolute;left:0;top:0">
        <line x1="0" x2="1480" y1="${MOOD_Y(3)}" y2="${MOOD_Y(3)}" stroke="#232d4a" stroke-dasharray="4 6"/>
        <path d="${d}" fill="none" stroke="#8aa8ff" stroke-width="3" stroke-linejoin="round"/>
        ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${STAGES[i].mood <= 1 ? "#ff7a70" : STAGES[i].mood >= 4 ? "#3ddc97" : "#8aa8ff"}" stroke="#070b17" stroke-width="3"/>`).join("")}
      </svg>
      <div class="mono" style="position:absolute;left:${pts[2][0] - 80}px;top:${pts[2][1] + 14}px;font-size:13px;color:var(--loss)">“Why is this 110%?”</div>
      <div class="mono" style="position:absolute;left:${pts[5][0] - 190}px;top:${pts[5][1] - 8}px;font-size:13px;color:var(--gain)">“Feb 2028. Deal.”</div>
    </div>
  </div>
</div>`;
})();

/* ---------- Money-flow model ---------- */
const node = (label, title, value, cls, extra = "") =>
  `<div class="card" style="padding:16px 18px;min-width:210px${extra}"><div class="lab" style="margin:0 0 4px">${label}</div><div style="font-size:17px;font-weight:600">${title}</div><div class="mono ${cls}" style="font-size:26px;margin-top:8px">${value}</div></div>`;
const edge = (v, cls) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-width:96px"><span class="mono ${cls}" style="font-size:13px;padding:3px 8px;border:1px solid var(--line);border-radius:999px;background:var(--s1)">${v}</span><span style="color:var(--strong);font-size:22px">→</span></div>`;
const FLOW_HTML = `
<div id="c">
  <div class="eyebrow">How the math works</div>
  <h1>Every card passes money on. Links carry it.</h1>
  <p class="sub">Each card has its own monthly flow. A card passes on its own flow plus everything linked into it. A Split takes its percentage; the rest continues down other links. Loops are detected and count as zero.</p>
  <div style="display:flex;align-items:center;margin-top:40px">
    <div style="display:flex;flex-direction:column;gap:18px">
      ${node("Income", "Paychecks · $2,600 / 2 wk", "+$5,633", "gain")}
      ${node("Recurring", "Bills & subscriptions", "−$3,456", "loss")}
    </div>
    <div style="display:flex;flex-direction:column;gap:70px">${edge("+$5,633", "gain")}${edge("−$3,456", "loss")}</div>
    ${node("Account", "Joint checking", "+$2,177 / mo", "gain", ";border-color:var(--brand-ink)")}
    ${edge("+$2,177", "gain")}
    ${node("Split", "Save 30%", "+$653", "gain")}
    ${edge("+$653", "gain")}
    ${node("Savings goal", "Emergency fund", "Feb 2028", "", ";border-color:var(--accent)")}
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px">
    ${[
      ["Normalize", "Weekly, biweekly, quarterly and yearly amounts become per-month figures. $2,600 every two weeks is $5,633."],
      ["Propagate", "A depth-first pass sums what reaches each card, so changing one number updates every total downstream."],
      ["Project", "Accounts compound forward with APY, returns, fees and price increases. Goals and debts get a date."],
      ["Check", "The same pure engine flags double counting, splits over 100% and buffer dips, and suggests fixes."],
    ]
      .map(([t, b], i) => `<div class="card"><div class="mono" style="color:var(--brand-ink);font-size:13px">0${i + 1}</div><h3 style="font-size:20px;margin-top:6px">${t}</h3><p class="b" style="margin-top:8px">${b}</p></div>`)
      .join("")}
  </div>
</div>`;

/* ---------- Architecture ---------- */
const box = (title, items, accent = "var(--line)") =>
  `<div class="card" style="border-color:${accent}"><div style="font-size:18px;font-weight:600">${title}</div><ul style="list-style:none;margin-top:10px">${items.map((i) => `<li class="b" style="font-size:14.5px;padding:3px 0">${i}</li>`).join("")}</ul></div>`;
const ARCH_HTML = `
<div id="c">
  <div class="eyebrow">Architecture</div>
  <h1>A pure engine in the browser, one store interface, two back ends</h1>
  <p class="sub">All money math runs client-side in a framework-free TypeScript engine. The board talks to a single Store interface: Supabase when accounts are configured, the browser’s own storage when they aren’t.</p>
  <div style="display:grid;grid-template-columns:1.05fr 40px 1.2fr 40px 1.25fr;align-items:stretch;margin-top:36px">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Next.js 16 · App Router</div>
      ${box("Pages", ["Landing · Boards · Board", "Login (email magic link)", "Invite /invite/[token]", "proxy.ts refreshes the session"])}
      ${box("Board canvas", ["Pan, zoom, drag to link", "10 card kinds, 8 side panels", "Undo and redo per person", "Keyboard first, screen-reader live regions"], "var(--brand-ink)")}
    </div>
    <div class="arrow">→</div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Engine · pure TypeScript, tested with Vitest</div>
      ${box("Flows", ["Per-month normalization", "Link propagation and splits", "Loop detection"], "var(--gain)")}
      ${box("Projections and tax", ["Accounts, CDs, investing ranges", "Debt payoff and interest saved", "2026 federal brackets + 50 states and DC"], "var(--gain)")}
      ${box("Checks and import", ["Validation and best-practice checks", "One-click fixes", "CSV parser finds pay, bills, categories"], "var(--gain)")}
    </div>
    <div class="arrow">→</div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="lab" style="margin:0">Store interface</div>
      ${box("CloudStore · Supabase", ["Postgres: boards, members, plans, cards, links, activity, invites", "Row-level security on every table (owner · editor · viewer)", "Realtime: row changes + presence channel for cursors", "Storage bucket for files on the board"], "var(--accent)")}
      ${box("LocalStore · this browser", ["Same interface, kept in localStorage", "Seeds the Household template", "What the public demo runs on"])}
    </div>
  </div>
  <div class="card" style="margin-top:20px;padding:14px 22px;display:flex;gap:28px;align-items:center">
    <div style="font-size:16px;font-weight:600">Privacy</div>
    <div class="b">Bank statements are parsed in the browser. Only the totals you choose become cards; transactions are never uploaded.</div>
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
await render(tab, PERSONAS_HTML, "diagram-personas.png");
await render(tab, JOURNEY_HTML, "diagram-journey.png");
await render(tab, FLOW_HTML, "diagram-flow.png");
await render(tab, ARCH_HTML, "diagram-architecture.png");
await browser.close();
