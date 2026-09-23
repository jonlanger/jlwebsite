import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import path from "node:path";

/**
 * Draws the Applied AI Marketplace system diagram as HTML and photographs it,
 * in the same light palette as product-ia.png.
 *
 *   node scripts/render-marketplace-diagrams.mjs
 */
const OUT = path.resolve("public/projects/applied-ai-marketplace");

const CSS = `
  :root { --bg:#f5f5f7; --card:#fff; --line:#c8c8cd; --fg:#1c1c1e; --dim:#5a5a5f; --brand:#00785a; --tint:#e8f3ef; }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--fg); font-family:-apple-system,"SF Pro Text","Helvetica Neue",Arial,sans-serif; }
  #c { position:relative; padding:52px 60px; }
  h1 { font-size:34px; font-weight:680; letter-spacing:-0.01em; }
  .sub { color:var(--dim); font-size:18px; margin-top:10px; max-width:1300px; line-height:1.45; }
  .lane { position:absolute; top:176px; width:378px; height:668px; border-radius:18px; background:#ececef; }
  .role { position:absolute; top:192px; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; color:var(--brand); font-weight:700; }
  .who { position:absolute; top:212px; font-size:14px; color:var(--dim); }
  .box { position:absolute; width:346px; background:var(--card); border:1.5px solid var(--line); border-radius:14px; padding:15px 18px; }
  .box h3 { font-size:19px; font-weight:650; }
  .box p { color:var(--dim); font-size:14.5px; line-height:1.45; margin-top:5px; }
  .box.key { border-color:var(--brand); }
  .box.key h3 { color:var(--brand); }
  .tag { position:absolute; transform:translate(-50%,-100%); margin-top:-6px; color:var(--dim); font-size:12.5px; font-weight:600; white-space:nowrap; }
  .tag.key { color:var(--brand); }
  .platform { position:absolute; left:60px; top:870px; width:1680px; height:158px; border-radius:18px; background:var(--tint); border:1.5px solid var(--brand); padding:16px 18px; }
  .platform .role { position:static; }
  .svc { position:absolute; top:52px; width:262px; height:88px; background:var(--card); border-radius:12px; padding:12px 14px; }
  .svc h4 { font-size:16px; font-weight:650; }
  .svc p { color:var(--dim); font-size:13px; line-height:1.4; margin-top:4px; }
  svg { position:absolute; inset:0; overflow:visible; pointer-events:none; }
`;

const COLS = [60, 494, 928, 1362];
const ROWS = [252, 452, 652];
const H = 176;

const box = (id, col, row, title, body, key = false) =>
  `<div class="box${key ? " key" : ""}" id="${id}" style="left:${COLS[col] + 16}px;top:${ROWS[row]}px;height:${H}px">
    <h3>${title}</h3><p>${body}</p></div>`;

const SYSTEM_HTML = `
<div id="c" style="width:1800px;height:1080px">
  <h1>Marketplace system map</h1>
  <p class="sub">Four roles work on one catalog. Discovery hands off to a request lifecycle that approvers, billing and System Admins pick up from there. Each workflow reuses the same shell, breadcrumbs and detail patterns.</p>

  ${COLS.map((x) => `<div class="lane" style="left:${x}px"></div>`).join("")}
  <div class="role" style="left:${COLS[0] + 18}px">Discover</div><div class="who" style="left:${COLS[0] + 18}px">Everyone · 41k eligible</div>
  <div class="role" style="left:${COLS[1] + 18}px">Request &amp; buy</div><div class="who" style="left:${COLS[1] + 18}px">Requesters · case teams</div>
  <div class="role" style="left:${COLS[2] + 18}px">Approve &amp; manage</div><div class="who" style="left:${COLS[2] + 18}px">Asset Admins · approvers</div>
  <div class="role" style="left:${COLS[3] + 18}px">Operate</div><div class="who" style="left:${COLS[3] + 18}px">System Admins</div>

  ${box("home", 0, 0, "Home &amp; AI chat", "Natural-language search, chat history, Trending, Collections, Favorites, Recently Used, Tech Radar. Shows in-app announcements.")}
  ${box("browse", 0, 2, "Browse &amp; filter", "Use Case, Case Stage, Industry, Function, Asset Type. Faceted grid and list views.")}
  ${box("pdp", 0, 1, "Product Detail Page", "One template for every asset. The CTA changes with the access model: Launch, Request Access or Purchase.", true)}

  ${box("mine", 1, 0, "My Requests", "Every request with its status (pending, approved, rejected, revoked). Requesters can add users to an active request.")}
  ${box("form", 1, 1, "Request form", "Project code and user emails by default, plus questions the Asset Admin adds. Team or individual access.", true)}
  ${box("invoice", 1, 2, "My Invoices", "Generated automatically once a purchase is approved. Supports one-time, usage-based ($/request) and recurring per-seat pricing.")}

  ${box("approvals", 2, 1, "My Approvals", "Queue with total, open, approved and rejected counts. Status tabs, requester search, filter by asset.")}
  ${box("details", 2, 0, "Request Details", "Approve or reject, add or remove users, revoke access. Includes an activity log, comments and project details.", true)}
  ${box("assets", 2, 2, "My Assets workspace", "Per-asset analytics (usage, purchases &amp; requests, invoices) and listing edits (core details, access &amp; pricing, approval &amp; compliance, change log).")}

  ${box("announce", 3, 0, "Announcements", "General, Survey, Feature Highlight, System Alert. Can target All users or Asset Admins only.")}
  ${box("reports", 3, 1, "Reports", "AI Inventory, Complete Product, Retired Admins/Owners, Disclaimer acceptance. Run manually or by monthly cron.")}
  ${box("roles", 3, 2, "Asset approvals &amp; roles", "Review and approve newly submitted assets. Manage user roles and permissions across the platform.")}

  <div class="platform">
    <div class="role">Shared platform</div>
    ${[
      ["Unified catalog", "750+ assets · 9 types · 10+ repos merged"],
      ["Access &amp; entitlements", "Request → approval → active users → revoke"],
      ["Billing", "Pricing models, billing cycles, invoice records"],
      ["Notifications", "Email for request events, in-app announcements"],
      ["Usage analytics", "Views, CTA clicks, searches, chat feedback"],
      ["Scheduled jobs", "Monthly reports to Marketplace Support"],
    ]
      .map(([t, p], i) => `<div class="svc" style="left:${18 + i * 276}px"><h4>${t}</h4><p>${p}</p></div>`)
      .join("")}
  </div>

  <svg><defs>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8e8e93"/></marker>
    <marker id="k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#00785a"/></marker>
  </defs><g id="edges" fill="none" stroke-width="2"></g></svg>
  <div id="tags"></div>
</div>`;

// [from, to, label, key, fromSide, toSide]
const SYSTEM_EDGES = [
  ["home", "pdp", "", false, "b", "t"],
  ["browse", "pdp", "", false, "t", "b"],
  ["pdp", "form", "Request", true, "r", "l"],
  ["form", "approvals", "Submit", true, "r", "l"],
  ["approvals", "details", "", true, "t", "b"],
  ["details", "mine", "Decision", true, "l", "r"],
];


const IA_HTML = `
<div id="c" style="width:1800px;height:800px">
  <h1>Marketplace information architecture</h1>
  <p class="sub">Three ways in (AI chat, keyword search and curated browse) all lead to one catalog and one product detail template. From there, the call to action and checkout change with the access model.</p>

  <div class="role" style="left:60px;top:172px">Find</div>
  <div class="role" style="left:600px;top:172px">Catalog</div>
  <div class="role" style="left:1080px;top:172px">Decide &amp; get access</div>

  <div class="box" id="chat" style="left:60px;top:204px;width:440px;height:160px">
    <h3>AI chat</h3><p>Describe the task in plain language. Results are grouped by theme and mirror the ask, related suggestions appear when there's no exact match, and zero-result states guide the next step.</p></div>
  <div class="box key" id="kw" style="left:60px;top:392px;width:440px;height:160px">
    <h3>Keyword search <span style="font-size:12px;font-weight:700;letter-spacing:.08em;color:#fff;background:var(--brand);border-radius:999px;padding:3px 8px;vertical-align:3px;margin-left:6px">NEW</span></h3><p>A mode toggle in the same search bar. Type-ahead suggests matching asset and collection titles as you type, with the match highlighted. Results come back as assets plus collections.</p></div>
  <div class="box" id="browse" style="left:60px;top:580px;width:440px;height:160px">
    <h3>Browse</h3><p>Assets Worth Knowing, Curated Collections and Browse Everything by Use Case, Case Stage, Industry, Function or Asset Type. Faceted filters with grid and list views.</p></div>

  <div class="box key" id="cat" style="left:600px;top:377px;width:380px;height:190px">
    <h3>Unified catalog</h3><p>750+ assets across 9 types</p><p>10+ repositories → one source of truth</p><p>Security-vetted inventory</p><p>Assets and themed collections</p></div>

  <div class="box" id="pdp" style="left:1080px;top:204px;width:660px;height:140px">
    <h3>Product Detail Page</h3><p>One template for every asset: metadata (type, industry and functional practice areas, use case, case stage), overview, and access and pricing in the same shell.</p></div>
  <div class="box key" id="cta" style="left:1080px;top:392px;width:660px;height:150px">
    <h3>CTA by access model</h3><p>Free → Launch Asset</p><p>Licensed / gated → Request Access</p><p>Paid → Purchase: one-time, usage-based ($/request) or per-seat recurring</p></div>
  <div class="box" id="checkout" style="left:1080px;top:590px;width:660px;height:150px">
    <h3>Request &amp; purchase checkout</h3><p>Add project code → confirm users, dates and use case → review and submit. Then approval, email updates and automated invoicing.</p></div>

  <svg><defs>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8e8e93"/></marker>
    <marker id="k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#00785a"/></marker>
  </defs><g id="edges" fill="none" stroke-width="2"></g></svg>
  <div id="tags"></div>
</div>`;

const IA_EDGES = [
  ["chat", "cat", "", false, "r", "l"],
  ["kw", "cat", "", true, "r", "l"],
  ["browse", "cat", "", false, "r", "l"],
  ["cat", "pdp", "", true, "r", "l"],
  ["pdp", "cta", "", true, "b", "t"],
  ["cta", "checkout", "", true, "b", "t"],
];

async function drawEdges(page, edges) {
  await page.evaluate((edges) => {
    const c = document.getElementById("c").getBoundingClientRect();
    const pt = (id, side) => {
      const r = document.getElementById(id).getBoundingClientRect();
      const x = r.left - c.left, y = r.top - c.top;
      return { t: [x + r.width / 2, y], b: [x + r.width / 2, y + r.height], l: [x, y + r.height / 2], r: [x + r.width, y + r.height / 2] }[side];
    };
    const g = document.getElementById("edges");
    const tags = document.getElementById("tags");
    for (const [from, to, label, key, fs, ts] of edges) {
      const [x1, y1] = pt(from, fs), [x2, y2] = pt(to, ts);
      let d;
      if (fs === "t" && ts === "t") {
        const y = Math.min(y1, y2) - 58;
        d = `M${x1},${y1} C${x1},${y} ${x2},${y} ${x2},${y2}`;
      } else if (fs === "b" || fs === "t") {
        d = `M${x1},${y1} L${x2},${y2}`;
      } else {
        const dx = Math.max(40, Math.abs(x2 - x1) / 2) * (x2 > x1 ? 1 : -1);
        d = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
      }
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      p.setAttribute("stroke", key ? "#00785a" : "#8e8e93");
      if (!key) p.setAttribute("stroke-dasharray", "6 5");
      p.setAttribute("marker-end", key ? "url(#k)" : "url(#a)");
      g.appendChild(p);
      if (label) {
        const L = p.getTotalLength(), m = p.getPointAtLength(L / 2);
        const t = document.createElement("div");
        t.className = "tag" + (key ? " key" : "");
        t.style.left = m.x + "px";
        t.style.top = m.y + "px";
        t.textContent = label;
        tags.appendChild(t);
      }
    }
  }, edges);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

async function shoot(html, edges, name) {
  await page.setContent(`<style>${CSS}</style>${html}`);
  await drawEdges(page, edges);
  await page.locator("#c").screenshot({ path: path.join(OUT, name) });
  console.log(name);
}

await shoot(SYSTEM_HTML, SYSTEM_EDGES, "diagram-system.png");
await shoot(IA_HTML, IA_EDGES, "product-ia.png");
await browser.close();
