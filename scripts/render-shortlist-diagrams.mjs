import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import path from "node:path";

/**
 * Draws the Shortlist case-study diagrams as HTML and photographs them, in the
 * app's own survey-plat palette (sage paper, slate ink, six equal-lightness
 * criterion hues) so they sit with the product screenshots.
 *
 *   node scripts/render-shortlist-diagrams.mjs
 */
const OUT = path.resolve("public/projects/shortlist");

// Criterion hues, in CRITERIA order (src/data/criteria.ts in the Shortlist repo).
const C = [
  { key: "commute", label: "Commute", color: "oklch(0.6 0.11 255)" },
  { key: "walk", label: "Walk", color: "oklch(0.6 0.11 155)" },
  { key: "tax", label: "Tax", color: "oklch(0.6 0.11 30)" },
  { key: "price", label: "Price", color: "oklch(0.6 0.11 80)" },
  { key: "schools", label: "Schools", color: "oklch(0.6 0.11 305)" },
  { key: "grocery", label: "Grocery", color: "oklch(0.6 0.11 200)" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,650&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
  :root { --paper:oklch(0.972 0.007 165); --surface:oklch(0.995 0.003 165); --sunken:oklch(0.945 0.009 170);
          --ink:oklch(0.235 0.028 255); --dim:oklch(0.49 0.022 250); --rule:oklch(0.895 0.012 180); }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--paper); color:var(--ink); font-family:Geist,-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; }
  h1 { font-family:"Bricolage Grotesque",sans-serif; font-size:38px; font-weight:650; letter-spacing:-0.015em; }
  .eyebrow { font-family:"Geist Mono",monospace; font-size:13px; letter-spacing:0.18em; text-transform:uppercase; color:var(--dim); margin-bottom:12px; }
  .sub { color:var(--dim); font-size:18px; margin-top:12px; max-width:1150px; line-height:1.5; }
  .card { background:var(--surface); border:1px solid var(--rule); border-radius:7px; padding:22px 24px; }
  .mono { font-family:"Geist Mono",monospace; font-variant-numeric:tabular-nums; }
  h3 { font-family:"Bricolage Grotesque",sans-serif; font-size:24px; font-weight:650; letter-spacing:-0.01em; }
  .lab { font-family:"Geist Mono",monospace; font-size:11.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--dim); margin:18px 0 6px; }
  p.b { font-size:15.5px; line-height:1.5; }
  .bar { display:flex; height:30px; border-radius:4px; overflow:hidden; gap:2px; }
  .bar > div { display:flex; align-items:center; padding-left:7px; color:#fff; font-family:"Geist Mono",monospace; font-size:12.5px; font-weight:500; white-space:nowrap; overflow:hidden; }
  .legend { display:flex; gap:22px; flex-wrap:wrap; font-size:14px; color:var(--dim); }
  .legend span::before { content:""; display:inline-block; width:11px; height:11px; border-radius:2px; margin-right:7px; background:var(--dot); vertical-align:-1px; }
`;

const bar = (weights, labels = true) =>
  `<div class="bar">${weights
    .map((w, i) => `<div style="flex:${w};background:${C[i].color}">${labels && w >= 5 ? `${w}` : ""}</div>`)
    .join("")}</div>`;

const legend = `<div class="legend">${C.map((c) => `<span style="--dot:${c.color}">${c.label}</span>`).join("")}</div>`;

/* ---------- Personas ---------- */
const PERSONAS = [
  {
    name: "The relocating couple",
    who: "Two jobs, one move. Moving to the NY metro from out of state with a child starting school next year.",
    goal: "Agree on a town they can both defend, not just the one each of them found first.",
    friction: "Each has a different list of tabs open. Every site grades one town at a time, with its own idea of what matters.",
    weights: [22, 8, 12, 18, 30, 10],
    quote: "“We keep arguing about towns. We’re really arguing about priorities.”",
  },
  {
    name: "The transit-first renter",
    who: "Single, car-free, works in Midtown three days a week. Renting, but thinking about buying in two years.",
    goal: "Shortest door-to-desk time without giving up a walkable main street.",
    friction: "Commute tools and walkability tools live in separate products, so the tradeoff between them stays in their head.",
    weights: [34, 26, 8, 12, 10, 10],
    quote: "“I’d pay more to walk to coffee. How much more?”",
  },
  {
    name: "The budget-first buyer",
    who: "First-time buyer with a firm ceiling. Open to a longer commute if the math works.",
    goal: "Find where the monthly cost — price plus property tax — actually lands lowest.",
    friction: "Home price is easy to find; effective tax rate is not, and it can outweigh a cheaper listing.",
    weights: [12, 8, 28, 37, 10, 5],
    quote: "“A cheaper house in a high-tax town isn’t cheaper.”",
  },
];

const PERSONAS_HTML = `
<div id="c">
  <div class="eyebrow">Proto-personas</div>
  <h1>Three people, the same four towns, three different answers</h1>
  <p class="sub">Drawn from the home search that started the project and the patterns in how people use lookup tools. Each has a different compromise to resolve, so each would spend the 100 points differently.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:36px">
    ${PERSONAS.map(
      (p) => `<div class="card">
        <h3>${p.name}</h3>
        <p class="b" style="color:var(--dim);margin-top:8px">${p.who}</p>
        <div class="lab">Goal</div><p class="b">${p.goal}</p>
        <div class="lab">Friction today</div><p class="b">${p.friction}</p>
        <div class="lab">How they’d spend 100 points</div>${bar(p.weights)}
        <p class="b" style="margin-top:18px;font-family:'Bricolage Grotesque';font-size:18px;line-height:1.35">${p.quote}</p>
      </div>`
    ).join("")}
  </div>
  <div style="margin-top:22px">${legend}</div>
</div>`;

/* ---------- Competitive landscape ---------- */
const YES = `<span style="font-weight:600">Yes</span>`;
const NO = `<span style="color:var(--dim)">No</span>`;
const LAND_ROWS = [
  ["Walk Score", "One address", "Fixed algorithm", "Walkability, transit, bike", NO, NO],
  ["Niche", "One place", "Editorial grade", "Schools, safety, lifestyle", NO, NO],
  ["AreaVibes", "One place", "Livability formula", "Cost, crime, amenities", NO, NO],
  ["NeighborhoodScout", "One place", "Proprietary report", "Crime, value, demographics", NO, NO],
  ["Shortlist", "A set, side by side", "Yours: 100 points", "6 criteria, configurable", YES, YES],
];
const LAND_HTML = `
<div id="c">
  <div class="eyebrow">Competitive benchmark</div>
  <h1>Existing tools answer a different question</h1>
  <p class="sub">The four common tools are single-location lookups: one place in, one grade out, weighted by someone else. Nobody chooses a place in isolation.</p>
  <div class="card" style="margin-top:34px;padding:0;overflow:hidden">
    <table style="width:100%;border-collapse:collapse;font-size:16.5px">
      <thead><tr style="background:var(--sunken)">
        ${["Tool", "Compares", "Who sets the weighting", "Scope", "Tradeoff visible", "Source per value"]
          .map((h) => `<th class="mono" style="text-align:left;padding:16px 22px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim);font-weight:500">${h}</th>`)
          .join("")}
      </tr></thead>
      <tbody>
        ${LAND_ROWS.map(
          (r, i) => `<tr style="border-top:1px solid var(--rule);${i === LAND_ROWS.length - 1 ? "background:oklch(0.235 0.028 255);color:#fff" : ""}">
            ${r.map((v, j) => `<td style="padding:18px 22px;${i === LAND_ROWS.length - 1 ? "background:oklch(0.235 0.028 255);box-shadow:0 0 0 1px oklch(0.235 0.028 255);" : ""}${j === 0 ? "font-family:'Bricolage Grotesque';font-weight:650;font-size:19px" : ""}">${i === LAND_ROWS.length - 1 && v === YES ? `<span style="font-weight:600">Yes</span>` : v}</td>`).join("")}
          </tr>`
        ).join("")}
      </tbody>
    </table>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px">
    <div class="card"><h3>Multi-place</h3><p class="b" style="margin-top:8px;color:var(--dim)">Every candidate scored against the same set.</p></div>
    <div class="card"><h3>Explicit weighting</h3><p class="b" style="margin-top:8px;color:var(--dim)">A fixed pool forces an honest statement of priorities.</p></div>
    <div class="card"><h3>Visible tradeoff</h3><p class="b" style="margin-top:8px;color:var(--dim)">The ranking moves when the priorities do.</p></div>
  </div>
</div>`;

/* ---------- Deciding factors (the four presets on the demo shortlist) ---------- */
const PRESETS = [
  { name: "Balanced", w: [17, 17, 17, 17, 16, 16], r: [["Hoboken", 74], ["Stamford", 50], ["Maplewood", 37], ["Millburn / Short Hills", 33]] },
  { name: "Transit-first", w: [34, 26, 8, 12, 10, 10], r: [["Hoboken", 84], ["Stamford", 35], ["Maplewood", 31], ["Millburn / Short Hills", 24]] },
  { name: "Schools-first", w: [12, 8, 10, 15, 45, 10], r: [["Millburn / Short Hills", 55], ["Maplewood", 55], ["Hoboken", 49], ["Stamford", 34]], tie: true },
  { name: "Budget-first", w: [12, 8, 28, 37, 10, 5], r: [["Stamford", 71], ["Hoboken", 69], ["Maplewood", 46], ["Millburn / Short Hills", 34]] },
];
const DECIDE_HTML = `
<div id="c">
  <div class="eyebrow">Deciding factors</div>
  <h1>Same four towns. Four allocations. Three different winners.</h1>
  <p class="sub">Every score is relative to the set and built from 100 points split across six criteria. Only the weights change between rows; the data does not.</p>
  <div style="display:flex;flex-direction:column;gap:16px;margin-top:34px">
    ${PRESETS.map(
      (p) => `<div class="card" style="display:grid;grid-template-columns:200px 1fr 520px;gap:36px;align-items:center;padding:20px 24px">
        <h3 style="font-size:22px">${p.name}</h3>
        ${bar(p.w)}
        <div style="display:flex;flex-direction:column;gap:6px">
          ${p.r
            .map(
              ([n, s], i) => `<div style="display:grid;grid-template-columns:30px 1fr 170px 40px;gap:12px;align-items:center;font-size:15.5px;${i === 0 || (p.tie && i === 1) ? "font-weight:600" : "color:var(--dim)"}">
              <span class="mono">0${i + 1}</span><span>${n}</span>
              <span style="height:7px;border-radius:4px;background:var(--sunken)"><span style="display:block;height:7px;border-radius:4px;width:${s}%;background:${i === 0 || (p.tie && i === 1) ? "var(--ink)" : "oklch(0.7 0.02 250)"}"></span></span>
              <span class="mono" style="text-align:right">${s}</span></div>`
            )
            .join("")}
          ${p.tie ? `<div class="mono" style="font-size:12px;letter-spacing:0.12em;color:var(--dim);margin-top:2px;text-transform:uppercase">Near tie · held in visible tension</div>` : ""}
        </div>
      </div>`
    ).join("")}
  </div>
  <div style="margin-top:22px">${legend}</div>
</div>`;

/* ---------- Architecture ---------- */
const arrow = `<div style="display:flex;align-items:center;justify-content:center;color:var(--dim);font-size:30px">→</div>`;
const col = (title, items) => `<div style="display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow" style="margin:0 0 2px">${title}</div>
  ${items.map((i) => `<div class="card" style="padding:16px 18px;${i.dark ? "background:oklch(0.235 0.028 255);color:#fff;border-color:transparent" : ""}">
      <div style="font-weight:600;font-size:16.5px">${i.t}</div>
      ${i.d ? `<div style="font-size:14px;line-height:1.45;margin-top:5px;${i.dark ? "opacity:.75" : "color:var(--dim)"}">${i.d}</div>` : ""}
    </div>`).join("")}
</div>`;
const ARCH_HTML = `
<div id="c">
  <div class="eyebrow">Architecture</div>
  <h1>Everything runs in the browser</h1>
  <p class="sub">Place data ships with the app. Scoring, ranking and sensitivity are pure functions of the shortlist and the weights, so every change re-renders instantly and the whole decision fits in a URL.</p>
  <div style="display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr;gap:6px;margin-top:38px;align-items:start">
    ${col("1 · Sources", [
      { t: "Yours", d: "Values typed on a card (strongest)" },
      { t: "Researched", d: "16 hand-checked NY-metro towns" },
      { t: "Census", d: "ACS 2019–23 for ~38.6k places" },
      { t: "Estimated", d: "Offline model: density, distance, state baselines (weakest)" },
    ])}
    ${arrow}
    ${col("2 · Place values", [
      { t: "6 criteria per place", d: "Commute, walk, tax, price, schools, grocery" },
      { t: "Provenance tag", d: "Yours · — · Census · Est. shown beside every number" },
      { t: "Commute destination", d: "Midtown by default; any other re-estimates all commutes" },
    ])}
    ${arrow}
    ${col("3 · Scoring", [
      { t: "Normalize 0–100", d: "Relative to the places in this set, direction-aware" },
      { t: "Missing = 50", d: "Excluded from min/max, so gaps neither help nor hurt" },
      { t: "× Weights", d: "100-point pool; raising one takes from the others", dark: true },
    ])}
    ${arrow}
    ${col("4 · Analysis", [
      { t: "Rank", d: "Weighted sum out of 100" },
      { t: "Near-tie detection", d: "Close scores held apart by a dashed connector" },
      { t: "Sensitivity", d: "Smallest single shift that flips first place" },
    ])}
    ${arrow}
    ${col("5 · Surfaces", [
      { t: "Cards & score bars", d: "Motion layout reorder; track = points given, fill = earned" },
      { t: "MapLibre map", d: "OpenFreeMap tiles recolored to the tokens; rank-aware pins" },
      { t: "Share URL", d: "?places · w · v reopen the exact comparison" },
      { t: "Saved rankings", d: "localStorage now, swappable for a database" },
    ])}
  </div>
  <div class="card" style="margin-top:28px;display:flex;gap:48px;align-items:center;background:var(--sunken)">
    <div class="mono" style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim)">Stack</div>
    <div style="font-size:16px">Next.js App Router · shadcn/ui + Tailwind v4 · Motion · MapLibre GL + OpenFreeMap · Local JSON · Vercel</div>
    <div class="mono" style="margin-left:auto;font-size:15px;font-weight:500">0 runtime API calls</div>
  </div>
</div>`;

/* ---------- Sitemap: every page and what's on it ---------- */
const link = (to) => `<span class="mono" style="display:inline-block;font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--rule);color:var(--dim);margin-left:6px;white-space:nowrap">→ ${to}</span>`;
const block = (t, d, to = "") => `<div style="padding:11px 0;border-top:1px solid var(--rule)">
  <div style="font-weight:600;font-size:15px">${t}${to ? link(to) : ""}</div>
  ${d ? `<div style="font-size:13.5px;line-height:1.45;color:var(--dim);margin-top:3px">${d}</div>` : ""}</div>`;
const pageCard = (route, name, blocks, extra = "") => `<div class="card" style="padding:20px 22px;${extra}">
  <div class="mono" style="font-size:13px;color:var(--dim)">${route}</div>
  <h3 style="margin:2px 0 10px">${name}</h3>${blocks.join("")}</div>`;
const step = (n, name, blocks) => `<div style="background:var(--paper);border:1px solid var(--rule);border-radius:6px;padding:14px 16px">
  <div class="mono" style="font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim)">Step ${n} of 3</div>
  <div style="font-family:'Bricolage Grotesque';font-weight:650;font-size:19px;margin:2px 0 6px">${name}</div>${blocks.join("")}</div>`;

const SITEMAP_HTML = `
<div id="c">
  <div class="eyebrow">Information architecture</div>
  <h1>Four pages, one three-step flow</h1>
  <p class="sub">Every page and what is on it. The landing page makes the argument, Compare does the work, Saved keeps it, and Design documents the system it is built from.</p>

  <div class="card" style="margin-top:32px;padding:14px 22px;display:flex;align-items:center;gap:28px;background:var(--sunken)">
    <div class="mono" style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim)">Global header</div>
    <div style="font-size:15px">Shortlist wordmark ${link("/")}</div>
    <div style="font-size:15px">Saved, with count ${link("/saved")}</div>
    <div style="font-size:15px">Start comparing ${link("/compare")}</div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 2.1fr 1fr;gap:20px;margin-top:20px;align-items:start">
    ${pageCard("/", "Landing", [
      block("Hero", "Every place looks good until you say what matters.", "/compare"),
      block("Existing tools answer a different question", "Single-lookup tools vs. three differentiators"),
      block("How it works", "Pick candidates · allocate priorities · watch it move"),
      block("Same four places, four priorities", "Balanced, Transit, Schools and Budget rankings, computed live", "?preset="),
      block("Data note", "Where the numbers come from and how accurate they are"),
      block("Footer", "Map attribution", "/design"),
    ])}

    <div class="card" style="padding:20px 22px">
      <div class="mono" style="font-size:13px;color:var(--dim)">/compare</div>
      <h3 style="margin:2px 0 14px">Compare</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        ${step(1, "Places", [
          block("Which places are you comparing?", "Offline search over 38,646 U.S. towns"),
          block("Your shortlist", "Added towns, each removable"),
          block("Map", "Pins appear as towns are added"),
          block("Continue to priorities", "Or use the demo shortlist"),
        ])}
        ${step(2, "Priorities", [
          block("What matters most to you?", "100 points across 6 criteria"),
          block("Presets", "Balanced · Transit · Schools · Budget"),
          block("Commute destination", "Midtown by default, changeable"),
          block("Priority bar + fine-tune sliders", "Raise one, the others give up points"),
          block("See the ranking", ""),
        ])}
      </div>
      <div style="margin-top:14px">
        ${step(3, "Your ranking", [
          `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 22px">
            <div>${block("Your priorities", "Input: presets, destination, bar, sliders, reset")}${block("Share", "Copies a link with places, weights and your values")}${block("Save ranking", "Name this ranking dialog", "/saved")}</div>
            <div>${block("Ranking", "Result: cards reorder on every change")}${block("What would flip first place", "Smallest shift that changes #1, with Try it")}${block("Near-tie connector", "Close scores held in visible tension")}</div>
            <div>${block("Place card", "Score, rank change, 6 meters (points earned / given), best and weakest, notes")}${block("Use your own numbers", "Edit any value; tagged Yours / Census / Est.")}${block("Map · Add a place · Edit all places", "Rank-aware pins; Ranking / Map toggle on phones")}</div>
          </div>`,
        ])}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:20px">
      ${pageCard("/saved", "Saved", [
        block("Saved rankings", "Stored in this browser"),
        block("Ranking row", "Places, weights, date · rename · delete"),
        block("Open ranking", "", "/compare step 3"),
        block("New comparison", "", "/compare"),
      ])}
      ${pageCard("/design", "Design system", [
        block("Principles", "Color belongs to the criteria; state is shown by form"),
        block("Tokens", "Primitives · criterion hues · type · shape & motion · map"),
        block("Components", "Buttons · forms & steppers · live Shortlist components"),
      ])}
    </div>
  </div>

  <div class="card" style="margin-top:20px;padding:14px 22px;display:flex;align-items:center;gap:28px">
    <div class="mono" style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim)">Deep links</div>
    <div style="font-size:15px"><span class="mono">/compare?preset=</span> skips to step 3 with the demo shortlist</div>
    <div style="font-size:15px"><span class="mono">?places · w · v</span> share link reopens the exact comparison</div>
  </div>
</div>`;

async function render(page, html, file) {
  await page.setContent(`<!doctype html><html><head><style>${CSS}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(page, PERSONAS_HTML, "diagram-personas.png");
await render(page, LAND_HTML, "diagram-landscape.png");
await render(page, DECIDE_HTML, "diagram-deciding-factors.png");
await render(page, ARCH_HTML, "diagram-architecture.png");
await render(page, SITEMAP_HTML, "diagram-sitemap.png");
await browser.close();
