import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import path from "node:path";

/**
 * Draws the ProposalPal research diagrams as HTML and photographs them, in the
 * app's own dark palette so they sit with the product screenshots.
 *
 *   node scripts/render-proposalpal-diagrams.mjs
 */
const OUT = path.resolve("public/projects/proposalpal");

const CSS = `
  :root { --bg:#09090b; --card:#18181b; --muted:#27272a; --line:#3f3f46; --fg:#fafafa; --dim:#a1a1aa; --brand:#21bf61; }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--fg); font-family:-apple-system,"SF Pro Text","Helvetica Neue",Arial,sans-serif; }
  #c { position:relative; padding:56px 60px; }
  h1 { font-size:34px; font-weight:650; letter-spacing:-0.01em; }
  .sub { color:var(--dim); font-size:18px; margin-top:10px; max-width:1100px; line-height:1.45; }
  .box { position:absolute; background:var(--card); border:1.5px solid var(--line); border-radius:14px; padding:16px 18px; }
  .box h3 { font-size:19px; font-weight:620; }
  .box p { color:var(--dim); font-size:14.5px; line-height:1.45; margin-top:6px; }
  .box.key { border-color:var(--brand); background:#0f2419; }
  .box.intake { background:var(--muted); }
  .col { position:absolute; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; color:var(--brand); font-weight:650; }
  .tag { position:absolute; transform:translate(-50%,-50%); background:var(--bg); border:1px solid var(--line); color:var(--dim);
         font-size:13px; padding:4px 10px; border-radius:999px; white-space:nowrap; }
  .tag.key { color:var(--brand); border-color:var(--brand); }
  svg { position:absolute; inset:0; overflow:visible; pointer-events:none; }
  .chip { display:inline-block; font-size:12.5px; padding:3px 9px; border-radius:999px; background:var(--muted); color:var(--fg); margin:6px 6px 0 0; }
`;

/** Module interdependencies: what each module needs before it can do its job. */
const MODULES_HTML = `
<div id="c" style="width:1600px;height:960px">
  <h1>How the eight modules depend on each other</h1>
  <p class="sub">We documented the pursuit process step by step for each module, then traced which outputs each one needs from the others. Client Research turned out to be the root of the storyline.</p>

  <div class="col" style="left:60px;top:190px">Inputs</div>
  <div class="col" style="left:380px;top:190px">Understand</div>
  <div class="col" style="left:880px;top:190px">Build</div>
  <div class="col" style="left:1300px;top:190px">Refine &amp; rehearse</div>

  <div class="box intake" id="intake" style="left:60px;top:380px;width:230px;height:250px">
    <h3>Proposal intake</h3>
    <p>RFP, draft proposal, opportunity details, practice areas, topic expert, data sources.</p>
    <p style="color:var(--fg);margin-top:14px">Context for every module and every chat.</p>
  </div>

  <div class="box key" id="cr" style="left:380px;top:230px;width:260px;height:104px">
    <h3>Client Research</h3><p>Context, competitors, financials, leaders, priorities</p></div>
  <div class="box" id="ce" style="left:380px;top:370px;width:260px;height:104px">
    <h3>Client Engagement</h3><p>Relationship map, pairings, cadence</p></div>
  <div class="box" id="tr" style="left:380px;top:510px;width:260px;height:104px">
    <h3>Topic Research</h3><p>Methods, credentials, experts, benchmarks</p></div>
  <div class="box" id="tf" style="left:380px;top:650px;width:260px;height:104px">
    <h3>Team Formation</h3><p>Matched people, roles, capability gaps</p></div>

  <div class="box" id="cm" style="left:880px;top:230px;width:280px;height:120px">
    <h3>Commercial Approach</h3><p>Pricing model, investment framing, delivery model, risks</p></div>
  <div class="box key" id="sl" style="left:880px;top:460px;width:280px;height:160px">
    <h3>Storyline &amp; Proposal</h3><p>Hypothesis, Why BCG, approach, team, executive summary, drafted as slides with action titles.</p></div>

  <div class="box" id="po" style="left:1300px;top:480px;width:250px;height:140px">
    <h3>Polish Proposal</h3><p>Score, strengths, gaps, before-and-after rewrites</p></div>
  <div class="box" id="pp" style="left:1300px;top:700px;width:250px;height:130px">
    <h3>Practice Pitch</h3><p>Top questions, personas from Client Engagement, role-play</p></div>

  <div class="box" id="bm" style="left:380px;top:830px;width:780px;height:70px;border-style:dashed;padding-top:14px">
    <h3 style="font-size:17px">Bookmarks <span style="color:var(--dim);font-weight:400">— insights the team highlights in any module go straight into the storyline</span></h3></div>
  <svg id="s"></svg>
</div>`;

/** Stakeholders across the firm: what each group gives the pursuit and what it needs back. */
const STAKEHOLDERS = [
  ["MDP / Partner", "Leads the pursuit", "Client relationships, point of view, win strategy", "Executive-ready storyline, pricing guidance, pitch prep", ["Storyline", "Commercial", "Practice Pitch"]],
  ["Principal / Project Leader", "Runs the proposal day to day", "RFP read-out, proposal structure, workplan", "Synthesized research, a first draft, a team plan", ["Client Research", "Storyline", "Team Formation"]],
  ["Consultants & associates", "Research and slide making", "Desk research, analysis, slide drafts", "Structured research sections, reusable IP", ["Client Research", "Topic Research"]],
  ["Knowledge & research teams", "Firm IP and analyst access", "Credentials, past proposals, benchmarks, reports", "Clear requests tied to proposal sections", ["Topic Research", "Data Sources"]],
  ["Practice & topic experts", "Subject-matter depth", "Methods, case experience, perspectives", "Where they are needed and what is being asked", ["Topic Research", "Team Formation"]],
  ["Staffing", "Who is available", "Profiles, availability, capabilities", "Role requirements and capability gaps", ["Team Formation"]],
  ["Finance & pricing", "Commercial terms", "Rate cards, pricing models, deal terms", "Scope, phasing and value at stake", ["Commercial"]],
  ["Client stakeholders", "Issue the RFP and decide", "RFP, priorities, the questions they will ask", "A proposal and pitch that answer them", ["Client Engagement", "Practice Pitch"]],
];

const STAKE_HTML = `
<div id="c" style="width:1600px">
  <h1>Who feeds a proposal, and what they need back</h1>
  <p class="sub">We benchmarked the groups that touch a pursuit across the firm, listing what each one contributes and what it expects in return. That split became the inputs and outputs of the app.</p>
  <div style="display:grid;grid-template-columns:300px 1fr 1fr 330px;gap:0;margin-top:40px;font-size:15px">
    ${["Stakeholder", "Gives (inputs)", "Needs (outputs)", "Where it lives in ProposalPal"].map((h) =>
      `<div style="padding:0 18px 14px;color:var(--brand);font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:650">${h}</div>`).join("")}
    ${STAKEHOLDERS.map(([who, role, gives, needs, mods]) => `
      <div style="padding:18px;border-top:1px solid var(--line)"><div style="font-weight:620;font-size:17px">${who}</div><div style="color:var(--dim);margin-top:4px">${role}</div></div>
      <div style="padding:18px;border-top:1px solid var(--line);color:var(--dim);line-height:1.45">${gives}</div>
      <div style="padding:18px;border-top:1px solid var(--line);line-height:1.45">${needs}</div>
      <div style="padding:12px 18px 18px;border-top:1px solid var(--line)">${mods.map((m) => `<span class="chip">${m}</span>`).join("")}</div>`).join("")}
  </div>
</div>`;

/** Arrows between boxes, measured from the laid-out page. [from, to, label, key, fromSide, toSide, toOffsetY] */
const EDGES = [
  ["cr", "sl", "required first", true, "right", "left", -45],
  ["tr", "sl", "credentials, benchmarks", false, "right", "left", 0],
  ["tf", "sl", "team & experience", false, "right", "left", 45],
  ["cr", "cm", "financials, competitors"],
  ["cm", "sl", "pricing & phasing", false, "bottom", "top"],
  ["sl", "po", "the draft"],
  ["po", "pp", "final story", false, "bottom", "top"],
  ["bm", "sl", "", false, "top", "bottom"],
  ["intake", "cr", ""], ["intake", "ce", ""], ["intake", "tr", ""], ["intake", "tf", ""],
];

async function drawEdges(page) {
  await page.evaluate((edges) => {
    const c = document.getElementById("c").getBoundingClientRect();
    const svg = document.getElementById("s");
    const ns = "http://www.w3.org/2000/svg";
    svg.innerHTML = `<defs>${["dim", "key"].map((k) => `<marker id="a-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${k === "key" ? "#21bf61" : "#71717a"}"/></marker>`).join("")}</defs>`;
    const point = (id, side) => {
      const r = document.getElementById(id).getBoundingClientRect();
      const x = r.left - c.left, y = r.top - c.top;
      return { right: [x + r.width, y + r.height / 2], left: [x, y + r.height / 2], top: [x + r.width / 2, y], bottom: [x + r.width / 2, y + r.height] }[side];
    };
    for (const [from, to, label, key, fs = "right", ts = "left", dy = 0] of edges) {
      let [x1, y1] = point(from, fs);
      const [x2, y0] = point(to, ts);
      const y2 = y0 + dy;
      // Bookmarks rise straight into the storyline above them.
      if (from === "bm") x1 = x2;
      const vertical = fs === "bottom" || fs === "top";
      const d = vertical
        ? `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2 - (ts === "top" ? 2 : -2)}`
        : `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2 - 2},${y2}`;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", key ? "#21bf61" : "#71717a");
      p.setAttribute("stroke-width", key ? "2.5" : "1.6");
      if (from === "bm") p.setAttribute("stroke-dasharray", "6 6");
      p.setAttribute("marker-end", `url(#a-${key ? "key" : "dim"})`);
      svg.appendChild(p);
      if (label) {
        const t = document.createElement("div");
        t.className = "tag" + (key ? " key" : "");
        t.textContent = label;
        const m = p.getPointAtLength(p.getTotalLength() / 2);
        t.style.left = `${m.x}px`;
        t.style.top = `${m.y}px`;
        document.getElementById("c").appendChild(t);
      }
    }
  }, EDGES);
}

async function render(page, html, file, withEdges = false) {
  await page.setContent(`<!doctype html><html><head><style>${CSS}</style></head><body>${html}</body></html>`);
  if (withEdges) await drawEdges(page);
  await page.waitForTimeout(300);
  await page.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(page, MODULES_HTML, "diagram-modules.png", true);
await render(page, STAKE_HTML, "diagram-stakeholders.png");
await browser.close();
