import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import path from "node:path";

/**
 * Draws the RelationshipViz case-study diagrams as HTML and photographs them,
 * in the app's own dark palette (near-black canvas, Inter + JetBrains Mono,
 * signal lime accent, relationship-type colors) so they sit with the screenshots.
 *
 *   node scripts/render-relationshipviz-diagrams.mjs
 */
const OUT = path.resolve("public/projects/relationshipviz");

const RISK = "#e8773f";
const OPP = "#3987e5";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  :root { --canvas:#0a0b0d; --s1:#131416; --s2:#18191c; --s3:#1e2023; --rule:#2e3034; --ink:#f2f3f5; --dim:#a6aab1; --faint:#80858d; --signal:#c6f432; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--canvas); color:var(--ink); font-family:Inter,-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; }
  h1 { font-size:36px; font-weight:600; letter-spacing:-0.025em; }
  .eyebrow { font-family:"JetBrains Mono",monospace; font-size:13px; letter-spacing:0.16em; text-transform:uppercase; color:var(--signal); margin-bottom:12px; }
  .sub { color:var(--dim); font-size:18px; margin-top:12px; max-width:1150px; line-height:1.5; }
  .card { background:var(--s1); border:1px solid var(--rule); border-radius:12px; padding:22px 24px; }
  .mono { font-family:"JetBrains Mono",monospace; font-variant-numeric:tabular-nums; }
  h3 { font-size:22px; font-weight:600; letter-spacing:-0.015em; }
  .lab { font-family:"JetBrains Mono",monospace; font-size:11.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--faint); margin:18px 0 8px; }
  p.b { font-size:15.5px; line-height:1.5; color:var(--dim); }
  .pill { display:inline-block; font-size:13px; padding:5px 10px; border-radius:6px; background:var(--s3); border:1px solid var(--rule); margin:0 6px 6px 0; }
  .arrow { display:flex; align-items:center; justify-content:center; color:var(--faint); font-size:26px; }
  .dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:8px; vertical-align:0; }
`;

/* ---------- Personas ---------- */
const PERSONAS = [
  {
    name: "The individual investor",
    who: "Manages their own stocks and index funds. Reads headlines, not 10-Ks.",
    goal: "Find durable companies, and know what their money quietly depends on.",
    friction: "Supply chains and ownership ties are buried in filings; a fund’s look-through exposure is invisible.",
    jobs: ["Spot durable businesses", "See hidden dependencies", "Stress-test a shock", "Get ideas to research"],
    pages: ["Home", "Portfolio", "Ideas", "Lenses"],
  },
  {
    name: "The analyst or advisor",
    who: "Covers a sector or advises clients. Needs to explain a view, not just hold one.",
    goal: "Compare how companies build relationships, and cite the evidence behind every claim.",
    friction: "Relationship data sits in paid terminals or scattered disclosures, with no way to trace a number to its source.",
    jobs: ["Benchmark relationship strategy", "Read the whole market", "Map any network", "Cite every claim"],
    pages: ["Explore", "Insights", "Company profile", "Data"],
  },
];

const PERSONAS_HTML = `
<div id="c">
  <div class="eyebrow">Proto-personas</div>
  <h1>Two investors, one question: who can’t be replaced?</h1>
  <p class="sub">Both want to know which companies the market depends on. One acts on it for their own portfolio; the other has to defend it to someone else.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px">
    ${PERSONAS.map(
      (p) => `
      <div class="card" style="padding:28px 30px">
        <h3>${p.name}</h3>
        <p class="b" style="margin-top:8px">${p.who}</p>
        <div class="lab">Goal</div><p class="b" style="color:var(--ink)">${p.goal}</p>
        <div class="lab">Friction</div><p class="b">${p.friction}</p>
        <div class="lab">Jobs to be done</div>
        <div>${p.jobs.map((j) => `<span class="pill">${j}</span>`).join("")}</div>
        <div class="lab">Where they work</div>
        <div>${p.pages.map((j) => `<span class="pill" style="border-color:var(--signal);color:var(--signal);background:transparent">${j}</span>`).join("")}</div>
      </div>`
    ).join("")}
  </div>
</div>`;

/* ---------- Scoring model ---------- */
const RISK_F = [
  ["Supplier concentration", 1],
  ["Customer concentration", 1],
  ["Geographic exposure", 1],
  ["Counterparty fragility", 0.75],
  ["Competitive pressure", 0.75],
  ["Weak fundamentals", 0.5],
  ["Relationship instability", 0.25],
];
const OPP_F = [
  ["Demand pull", 1],
  ["Chokepoint position", 1],
  ["Ecosystem momentum", 0.75],
  ["Relative momentum", 0.75],
  ["Growth quality", 0.75],
  ["New deals", 0.25],
];
const factorList = (rows, color) =>
  rows
    .map(
      ([l, w]) => `<div style="display:grid;grid-template-columns:1fr 120px 44px;gap:12px;align-items:center;padding:7px 0;border-bottom:1px solid var(--rule)">
        <span style="font-size:15px">${l}</span>
        <div style="height:6px;border-radius:3px;background:var(--s3)"><div style="height:6px;width:${w * 100}%;border-radius:3px;background:${color}"></div></div>
        <span class="mono" style="font-size:13px;color:var(--dim);text-align:right">${w}</span></div>`
    )
    .join("");
const step = (n, t, b) => `<div class="card" style="padding:18px 20px"><div class="mono" style="font-size:12px;color:var(--signal)">${n}</div><div style="font-size:17px;font-weight:600;margin-top:6px">${t}</div><p class="b" style="font-size:14.5px;margin-top:6px">${b}</p></div>`;
const quad = (t, d, c) => `<div style="background:var(--s2);border:1px solid var(--rule);border-radius:8px;padding:16px 18px"><div style="font-size:16px;font-weight:600;color:${c}">${t}</div><p class="b" style="font-size:14px;margin-top:4px">${d}</p></div>`;

const SCORING_HTML = `
<div id="c">
  <div class="eyebrow">Scoring model</div>
  <h1>Two lenses, thirteen readable rules</h1>
  <p class="sub">Risk measures how exposed a company is through its relationships; Opportunity, how well they position it to benefit. Every factor is a rule with a default weight you can change.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:34px">
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 style="color:${RISK}">Risk</h3><span class="mono" style="font-size:12px;color:var(--faint)">DEFAULT WEIGHT</span></div><div style="margin-top:10px">${factorList(RISK_F, RISK)}</div></div>
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 style="color:${OPP}">Opportunity</h3><span class="mono" style="font-size:12px;color:var(--faint)">DEFAULT WEIGHT</span></div><div style="margin-top:10px">${factorList(OPP_F, OPP)}</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1.35fr;gap:18px;margin-top:24px;align-items:stretch">
    ${step("01", "Raw value per factor", "Computed from relationships and SEC financials, with the ties that drive it attached.")}
    ${step("02", "Percentile in view", "Ranked against the companies currently visible. Missing data counts as the median.")}
    ${step("03", "Weighted mean", "Score 0–100 per lens, plus coverage: how much of the weight had real data.")}
    <div class="card" style="padding:18px 20px"><div class="mono" style="font-size:12px;color:var(--signal)">04 · Stance</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
        ${quad("Upside, lower risk", "Opportunity above median, risk below.", "#1baf7a")}
        ${quad("Upside, higher risk", "Both above median.", "#eda100")}
        ${quad("Low signal", "Both below median.", "var(--dim)")}
        ${quad("Higher risk, less upside", "Risk above, opportunity below.", RISK)}
      </div></div>
  </div>
</div>`;

/* ---------- Architecture ---------- */
const box = (t, b, accent) => `<div style="background:var(--s2);border:1px solid ${accent ?? "var(--rule)"};border-radius:8px;padding:12px 14px;margin-bottom:10px"><div style="font-size:15px;font-weight:600">${t}</div><div style="font-size:13.5px;color:var(--dim);margin-top:3px;line-height:1.4">${b}</div></div>`;
const col = (title, inner) => `<div class="card" style="padding:18px"><div class="lab" style="margin-top:0">${title}</div>${inner}</div>`;

const ARCH_HTML = `
<div id="c">
  <div class="eyebrow">Architecture</div>
  <h1>From public filings to a graph in your browser</h1>
  <p class="sub">An offline pipeline builds one validated dataset. Everything after that, from graph metrics to stress tests, runs client-side, so nothing you enter leaves the browser.</p>
  <div style="display:grid;grid-template-columns:1.1fr 40px 1fr 40px 1.1fr 40px 1fr;margin-top:34px;align-items:stretch">
    ${col("Sources", [
      box("Curated seed", "Hand-researched companies and links. Wins on conflict.", "var(--signal)"),
      box("SEC EDGAR 10-Ks", "Sentences naming another company, classified by rules."),
      box("SEC XBRL · N-PORT", "Financials, and fund holdings for look-through."),
      box("Wikipedia · Wikidata", "Profiles, CEOs, founders, products."),
      box("Claude research", "Web-searched link details, labeled unreviewed."),
    ].join(""))}
    <div class="arrow">→</div>
    ${col("Pipeline", [
      box("Scrape + cache", "Throttled under SEC limits; responses cached."),
      box("Merge", "Curated beats scraped; evidence attached, never dropped."),
      box("Validate", "One zod schema shared by app and pipeline. Unknown ids, duplicates and self-loops fail."),
      `<div style="margin-top:14px;border:1px dashed var(--signal);border-radius:8px;padding:14px"><div class="mono" style="font-size:13px;color:var(--signal)">dataset.json</div><div style="font-size:14px;color:var(--dim);margin-top:4px">512 companies · 259 relationships · 336 evidence items</div></div>`,
    ].join(""))}
    <div class="arrow">→</div>
    ${col("In the browser", [
      box("Graph", "graphology; layouts in a Web Worker."),
      box("Network metrics", "Betweenness centrality, Louvain communities."),
      box("Lenses", "Risk and Opportunity percentiles with drivers."),
      box("Scenarios", "Shocks traced up to three hops, strongest path kept."),
      box("Portfolio · Ideas", "Look-through exposure and a six-question screen."),
    ].join(""))}
    <div class="arrow">→</div>
    ${col("Views", [
      box("Sigma.js WebGL", "Explore network, colored by sector, relationship, community or lens."),
      box("D3 charts", "Chord, Sankey, world map, histogram, quadrant; each with a table view."),
      box("Profiles", "Supply chain, scorecard and every link with sources."),
      box("Zustand store", "One set of filters every page follows."),
    ].join(""))}
  </div>
</div>`;

/* ---------- Sitemap ---------- */
const page = (name, route, items, accent) => `
  <div class="card" style="padding:18px 20px;${accent ? "border-color:var(--signal)" : ""}">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:19px;font-weight:600">${name}</div><span class="mono" style="font-size:12.5px;color:var(--faint)">${route}</span></div>
    <ul style="list-style:none;margin-top:10px">${items.map((i) => `<li style="font-size:14px;color:var(--dim);padding:5px 0;border-top:1px solid var(--rule)">${i}</li>`).join("")}</ul>
  </div>`;

const SITEMAP_HTML = `
<div id="c">
  <div class="eyebrow">Information architecture</div>
  <h1>Seven views, one set of filters</h1>
  <p class="sub">The landing page makes the argument with live data. Every chart, score and list links back to the graph or to a company profile, and every relationship opens its evidence.</p>
  <div style="margin-top:30px">${page("Home", "/", ["Live hero network around the #1 company", "Why relationships · Stickiest companies", "Built for two investors · Three-company compare", "Taiwan stress-test teaser · How it works"], true)}</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px">
    ${page("Explore", "/explore", ["WebGL network graph", "Filters: sector, type, confidence, market cap", "Color by sector · relationship · community · lens", "Company drawer with scorecard"])}
    ${page("Insights", "/insights", ["KPIs · sector chord · relationship mix", "Supply-flow Sankey · network hubs", "World map of cross-border links", "Sortable company table"])}
    ${page("Lenses", "/lenses", ["Risk × opportunity quadrant", "Factor-weight sliders", "Riskiest dependencies · risk by sector", "Stress tests: presets or build your own"])}
    ${page("Portfolio", "/portfolio", ["Stocks and funds, kept in the browser", "Fund look-through via SEC N-PORT", "Hidden dependencies · jurisdictions", "Stress tests on your holdings"])}
    ${page("Ideas", "/ideas", ["Six questions, one at a time", "Shortlist with reasons and watch-outs", "Never a position size", "Shareable results link"])}
    ${page("Company profile", "/company/:id", ["Facts and SEC financials", "Supply-chain Sankey · relationship mix", "Investor-lens scorecard", "Every relationship with timeline and sources"])}
  </div>
  <div class="card" style="margin-top:20px;padding:14px 22px;display:flex;align-items:center;gap:28px">
    <div style="font-size:17px;font-weight:600">Data</div><span class="mono" style="font-size:12.5px;color:var(--faint)">/data</span>
    <div style="font-size:15px;color:var(--dim)">Pipeline, sources, scoring rules, goal weights and limitations, all in the open.</div>
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
await render(tab, SCORING_HTML, "diagram-scoring.png");
await render(tab, ARCH_HTML, "diagram-architecture.png");
await render(tab, SITEMAP_HTML, "diagram-sitemap.png");
await browser.close();
