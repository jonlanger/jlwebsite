import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Draws the Aureum case-study diagrams as HTML and photographs them, in the
 * product's own system (teal #008080 brand surface, indigo #1B1B6F ink, mint
 * air, Lora for voice, Plus Jakarta Sans for every figure) so they sit with
 * the screens.
 *
 * Content comes from the prototype (aureumfinance.vercel.app) and its source:
 * engine.js ASSUMPTIONS and Money Map, rules.js and the governor, the health
 * score pillars, docs/financial-rules.md, and the 2024 journey maps.
 *
 *   node scripts/render-aureum-diagrams.mjs
 */
const OUT = path.resolve("public/projects/aureum/_src");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  :root { --bg:#f5f7f6; --surface:#fff; --sunk:#eef2f1; --line:#dde5e3; --strong:#a9b7b4; --ink:#121a33; --dim:#4a5468; --faint:#76808f;
    --teal:#008080; --teal-7:#006a6b; --teal-9:#0b3f41; --teal-1:#d3eeeb; --teal-05:#eef8f7; --mint:#bdebe8; --mint-1:#e3f7f5;
    --indigo:#1b1b6f; --indigo-5:#3d3db8; --indigo-1:#dcdcf5; --indigo-05:#f0f0fb;
    --gold:#e19c12; --gold-1:#fff1d1; --coral:#e8703a; --coral-1:#fde6db; --ok:#2e7d32; --ok-1:#e2f3e3; --bad:#c2410c; --bad-1:#fde6db; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:"Plus Jakarta Sans",-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--bg); }
  h1 { font-family:Lora,Georgia,serif; font-size:44px; font-weight:700; letter-spacing:-0.015em; line-height:1.1; color:var(--indigo); }
  h1 em { font-style:italic; font-weight:600; color:var(--teal); }
  .eyebrow { font-size:13px; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; color:var(--teal-7); margin-bottom:14px; }
  .sub { color:var(--dim); font-size:18px; margin-top:14px; max-width:1200px; line-height:1.55; }
  .card { background:var(--surface); border:1px solid var(--line); border-radius:20px; padding:20px 22px; }
  .card.teal { background:var(--teal); border-color:var(--teal); color:#fff; }
  .card.ink { background:var(--indigo); border-color:var(--indigo); color:#fff; }
  .card.mint { background:var(--mint-1); border-color:var(--mint); }
  h3 { font-family:Lora,Georgia,serif; font-size:21px; font-weight:700; letter-spacing:-0.01em; color:var(--indigo); }
  .teal h3, .ink h3 { color:#fff; }
  .lab { font-size:11.5px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin:14px 0 6px; }
  .teal .lab, .ink .lab { color:rgba(255,255,255,.7); }
  p.b { font-size:15px; line-height:1.5; color:var(--dim); }
  .teal p.b, .ink p.b { color:rgba(255,255,255,.85); }
  .chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:700; padding:4px 10px; border-radius:99px; margin:0 6px 6px 0; }
  .chip.teal { background:var(--teal-1); color:var(--teal-9); }
  .chip.ink { background:var(--indigo-1); color:var(--indigo); }
  .chip.gold { background:var(--gold-1); color:#7a5200; }
  .chip.bad { background:var(--bad-1); color:#9a3412; }
  .chip.ok { background:var(--ok-1); color:#1b5e20; }
  .chip.white { background:rgba(255,255,255,.16); color:#fff; }
  .num { font-variant-numeric:tabular-nums; }
  .fig { font-weight:800; letter-spacing:-0.02em; }
  .av { width:54px; height:54px; border-radius:50%; background:var(--teal); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:17px; flex:none; }
  .arrow { color:var(--strong); font-size:24px; display:flex; align-items:center; justify-content:center; }
  .legend { display:flex; gap:24px; margin-top:24px; font-size:14px; color:var(--dim); flex-wrap:wrap; }
  .legend i { display:inline-block; width:14px; height:14px; border-radius:4px; vertical-align:-2px; margin-right:8px; }
  .n { border-radius:14px; padding:13px 14px; font-size:14px; line-height:1.4; }
  .n b { display:block; font-size:15px; margin-bottom:3px; color:var(--ink); }
  .n.q { background:var(--surface); border:1.5px solid var(--line); color:var(--dim); }
  .n.set { background:var(--teal-05); border:1px solid var(--teal-1); color:var(--teal-9); }
  .n.set b { color:var(--teal-9); }
  .n.eng { background:var(--indigo-05); border:1px solid var(--indigo-1); color:var(--indigo); }
  .n.eng b { color:var(--indigo); }
  .n.user { background:var(--surface); border:1.5px dashed var(--strong); color:var(--dim); }
  .n.app { background:var(--indigo); color:#d8d8f0; }
  .n.app b { color:#fff; }
  .n.coach { background:var(--teal); color:#d9f1ef; }
  .n.coach b { color:#fff; }
  .n.yay { background:var(--gold-1); border:1px solid #f6d58e; color:#6b4700; }
  .n.yay b { color:#6b4700; }
  .n.empty { background:transparent; }
  table { border-collapse:collapse; width:100%; }
`;

/* ---------- Research: five people, five plans ---------- */
const PEOPLE = [
  ["EJ", "Emily Johnson", "Marketing specialist", "Saving for a home down payment while she figures out investing.", "A budget built for her, and visible progress toward the down payment.", "Goals + goal simulator", ""],
  ["MC", "Michael Chen", "Software engineer", "Several accounts, two kids, a 529 and a tech-heavy portfolio.", "One integrated view, real-time insight, savings that run themselves.", "Health score + net worth first", "Standing"],
  ["SM", "Sarah Martinez", "Small business owner", "Business and personal money mixed together; lumpy income.", "Separate the two, smooth cash flow, learn the business side.", "Variable-income safety net + safe-to-spend", ""],
  ["DL", "David Lee", "High school teacher", "A credit card, a car loan and college savings for his kids.", "A way out of debt that doesn't ignore the future.", "Money Map + debt payoff plan", ""],
  ["LR", "Lisa Robinson", "Retired nurse", "Fixed pension, rising healthcare costs, grandkids' education.", "To know what's about to go wrong before it does.", "30-day forecast + heads-up nudges", "Risk"],
];
const PEOPLE_HTML = `
<div id="c">
  <div class="eyebrow">Research archetypes</div>
  <h1>Five lives, <em>five different plans</em></h1>
  <p class="sub">Interviews produced five archetypes across income, life stage and financial confidence. They wanted the same tools, but not in the same order. That ordering became the product’s core idea: one plan, opened from the side that matters to you.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:34px">
    ${PEOPLE.map(([ini, name, role, situation, need, lands, first], i) => `
      <div class="card ${i === 3 ? "teal" : ""}" style="padding:22px">
        <div style="display:flex;align-items:center;gap:12px"><div class="av" style="${i === 3 ? "background:#fff;color:var(--teal)" : ""}">${ini}</div><div><h3 style="font-size:19px">${name}</h3><div style="font-size:13px;opacity:.75;margin-top:2px">${role}</div></div></div>
        <div style="margin-top:14px;min-height:30px">${first ? `<span class="chip ${first === "Risk" ? "gold" : "teal"}">${first === "Risk" ? "Risk first" : "Standing first"}</span>` : ""}${i === 3 ? `<span class="chip white">Demo persona in the app</span>` : ""}</div>
        <div class="lab">Situation</div><p class="b" style="font-size:14px">${situation}</p>
        <div class="lab">Needs</div><p class="b" style="font-size:14px;font-weight:700;color:${i === 3 ? "#fff" : "var(--ink)"}">${need}</p>
        <div class="lab">Aureum answers with</div><p class="b" style="font-size:14px">${lands}</p>
      </div>`).join("")}
  </div>
  <div class="legend"><span><i style="background:var(--gold-1);border:1px solid #f6d58e"></i>Risk first in testing: “what’s about to go wrong?”</span><span><i style="background:var(--teal-1)"></i>Standing first in testing: “how am I doing?”</span></div>
</div>`;

/* ---------- Journey synthesis: where it peaks, where it breaks ---------- */
const STAGES = ["Account setup", "Financial planning", "Expense tracking", "Savings", "Investing", "Debt", "Education", "Community"];
// From the 2024 journey maps: + = highlighted high point, − = highlighted friction, ± = both.
const GRID = {
  "Emily Johnson": ["", "+", "−", "−", "+", "", "+", ""],
  "Michael Chen": ["−", "+", "", "±", "−", "", "+", ""],
  "David Lee": ["", "±", "", "+", "", "±", "", "+"],
  "Sarah Martinez": ["", "−", "+", "", "±", "", "", ""],
  "Lisa Robinson": ["−", "+", "−", "−", "+", "", "−", "+"],
};
const RESPONSE = [
  ["Privacy & data entry", "No bank login to start; answers stay on the device. Read-only by design."],
  ["Overwhelmed by goals", "One question per screen, then a Money Map with a single next step."],
  ["Miscategorized, missed", "Auto-categories with one-tap fixes; projections count bills once."],
  ["Lumpy income, surprises", "A 30-day forecast, safe-to-spend, and a 6-month fund for variable income."],
  ["Jargon, volatility", "No securities advice. “Why?” on every card, in plain words."],
  ["Many payments", "Snowball vs avalanche side by side, with the cost difference."],
  ["Content out of reach", "Two-minute lessons matched to your current Money Map step."],
  ["Lonely, irrelevant", "People scenes and peer stories; never a character beside bad news."],
];
const cellStyle = (v) => v === "+" ? "background:#d6f0e0;color:#1b5e20" : v === "−" ? "background:#fde0d4;color:#9a3412" : v === "±" ? "background:linear-gradient(135deg,#d6f0e0 50%,#fde0d4 50%);color:var(--ink)" : "background:var(--surface);color:var(--strong)";
const label = (v) => v === "+" ? "peak" : v === "−" ? "friction" : v === "±" ? "both" : "·";
const count = (sym) => STAGES.map((_, i) => Object.values(GRID).filter((r) => r[i] === sym || r[i] === "±").length);
const FRICTION_HTML = `
<div id="c">
  <div class="eyebrow">Journey synthesis · 5 personas × 8 stages</div>
  <h1>Motivation peaks <em>where people get overwhelmed</em></h1>
  <p class="sub">Laying the five journey maps on one grid showed a pattern. Planning is the high point for four of five people, and also where two of them stall. Savings is where plans break, on irregular income and surprise expenses. Each stage got a specific design response.</p>
  <div class="card" style="margin-top:32px;padding:22px 24px">
    <table class="num" style="font-size:14px">
      <tr><td style="width:190px"></td>${STAGES.map((s) => `<td style="text-align:center;font-weight:800;font-size:13px;padding:0 4px 10px;color:var(--indigo)">${s}</td>`).join("")}</tr>
      ${Object.entries(GRID).map(([p, r]) => `<tr><td style="font-weight:700;padding:5px 0">${p}</td>${r.map((v) => `<td style="padding:4px"><div style="${cellStyle(v)};border-radius:10px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12.5px;border:1px solid var(--line)">${label(v)}</div></td>`).join("")}</tr>`).join("")}
      <tr><td style="font-weight:800;padding:12px 0 4px;color:var(--faint);font-size:12px;letter-spacing:.1em;text-transform:uppercase">Peaks · friction</td>${count("+").map((p, i) => `<td style="text-align:center;padding-top:12px;font-weight:800;font-size:16px"><span style="color:#1b5e20">${p}</span> <span style="color:var(--strong)">·</span> <span style="color:#9a3412">${count("−")[i]}</span></td>`).join("")}</tr>
    </table>
  </div>
  <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:10px;margin-top:16px;padding-left:214px">
    ${RESPONSE.map(([pain, fix]) => `<div class="n set" style="padding:12px"><div style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#9a3412;margin-bottom:5px">${pain}</div>${fix}</div>`).join("")}
  </div>
  <div class="legend"><span><i style="background:#d6f0e0"></i>Emotional high point in the map</span><span><i style="background:#fde0d4"></i>Edge case or friction highlighted</span><span><i style="background:var(--teal-05);border:1px solid var(--teal-1)"></i>Design response in the prototype</span></div>
</div>`;

/* ---------- Test: two opening moves ---------- */
const MOVES_HTML = `
<div id="c">
  <div class="eyebrow">Concept test · what opens first</div>
  <h1>One app, <em>two opening moves</em></h1>
  <p class="sub">AI planning and expense tracking were near-universal. The split was in what people wanted to see first. Rather than pick one home screen, Aureum keeps one plan and lets the first card follow the person.</p>
  <div style="display:grid;grid-template-columns:1fr 120px 1fr;gap:0;margin-top:34px;align-items:stretch">
    <div class="card" style="padding:26px;border-top:5px solid var(--gold)">
      <span class="chip gold">Risk first</span>
      <h3 style="font-size:26px;margin-top:6px">Look ahead</h3>
      <p class="b" style="margin-top:8px;font-family:Lora,serif;font-style:italic;font-size:18px;color:var(--ink)">“I don’t need another chart of what I spent. I need to know what’s about to go wrong.”</p>
      <p class="b" style="margin-top:6px;font-size:13.5px">Lisa Robinson, retired nurse</p>
      <div class="lab">Opens on</div>
      <div style="display:grid;gap:10px">
        <div class="n set"><b>Next 30 days</b>Checking balance projected from bills, paychecks and spending rhythm.</div>
        <div class="n yay"><b>Heads up · in 12 days</b>Rent and car insurance land the same week. Move $600 to stay above your cushion.</div>
        <div class="n eng"><b>Safe to spend</b>$504 until payday, about $45 a day.</div>
      </div>
    </div>
    <div class="arrow" style="flex-direction:column;gap:8px;font-size:13px;font-weight:700;color:var(--faint);text-align:center"><span style="font-size:30px">⇄</span>same plan<br>same data<br>same coach</div>
    <div class="card" style="padding:26px;border-top:5px solid var(--teal)">
      <span class="chip teal">Standing first</span>
      <h3 style="font-size:26px;margin-top:6px">Know where you stand</h3>
      <p class="b" style="margin-top:8px;font-family:Lora,serif;font-style:italic;font-size:18px;color:var(--ink)">Dashboard first, with the predictive tools one tap deeper as supporting context.</p>
      <p class="b" style="margin-top:6px;font-size:13.5px">Michael Chen, software engineer</p>
      <div class="lab">Opens on</div>
      <div style="display:grid;gap:10px">
        <div class="n set"><b>Financial health · 57</b>Four pillars: in control, shock-ready, on track, free to choose.</div>
        <div class="n eng"><b>Net worth $168,508</b>All accounts, with the investment mix at a glance.</div>
        <div class="n q"><b>Emergency fund · 2.4 months</b>Measured in months covered, not dollars.</div>
      </div>
    </div>
  </div>
  <div class="card ink" style="margin-top:18px;padding:20px 26px;display:grid;grid-template-columns:280px 1fr 1fr 1fr;gap:26px">
    <div><div class="lab" style="margin-top:0">What it decided</div><h3>Home is a stack, not a dashboard</h3></div>
    <div><div class="lab" style="margin-top:0">Hero</div><p class="b" style="font-size:14.5px">The single number that answers today’s question: safe to spend.</p></div>
    <div><div class="lab" style="margin-top:0">Next</div><p class="b" style="font-size:14.5px">One Money Map step with one action, not eight goals at once.</p></div>
    <div><div class="lab" style="margin-top:0">Then</div><p class="b" style="font-size:14.5px">The forecast and recent activity, with the coach in a rail beside them.</p></div>
  </div>
</div>`;

/* ---------- Secondary research: rules, not vibes ---------- */
const RULES = [
  ["Starter emergency fund", "$1,000", "floor $500; $10/week to start", "CFPB · Fed SHED 2025: 37% couldn’t cover $400"],
  ["Full emergency fund", "3 / 6 mo", "6 if income varies or one earner has dependents", "Standard 3–6 month guidance"],
  ["Employer match", "Always", "right after the starter cushion", "Instant 50–100% return"],
  ["High-interest debt", "≥ 8% APR", "pay before investing · 4–8% is gray", "Fed G.19: ~22% card APR, Q2 2026"],
  ["Retirement", "15%", "of gross, match included", "Fidelity 15% / 10× by 67"],
  ["Budget split", "50/30/20", "adapted: real essentials first", "Warren & Tyagi, All Your Worth (2005)"],
  ["Debt method", "Both", "snowball if it costs < $150 more", "Gal & McShane, Kellogg 2012"],
  ["Raising savings", "+1% / yr", "per raise or year", "Thaler & Benartzi, Save More Tomorrow"],
  ["Credit utilization", "< 30%", "praise under 10%", "FICO: amounts owed ≈ 30% of score"],
];
const RULES_HTML = `
<div id="c">
  <div class="eyebrow">Secondary research · financial guidance</div>
  <h1>Every threshold <em>has a source</em></h1>
  <p class="sub">A coach is only as good as the math under it. Every default lives in one ASSUMPTIONS object so it can be tuned and cited in one place, and every card the coach shows carries a “Why?” with its source.</p>
  <div style="display:grid;grid-template-columns:1.55fr 1fr;gap:18px;margin-top:32px;align-items:start">
    <div class="card" style="padding:10px 24px 14px">
      <table class="num" style="font-size:15px">
        <tr style="font-size:11.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)"><td style="padding:12px 0">Guideline</td><td>Default</td><td>Detail</td><td>Basis</td></tr>
        ${RULES.map(([g, d, x, s]) => `<tr style="border-top:1px solid var(--line)"><td style="padding:11px 12px 11px 0;font-weight:700">${g}</td><td style="font-weight:800;color:var(--teal-7);font-size:17px;white-space:nowrap;padding-right:14px">${d}</td><td style="color:var(--dim);font-size:14px;padding-right:14px">${x}</td><td style="color:var(--faint);font-size:13.5px">${s}</td></tr>`).join("")}
      </table>
    </div>
    <div style="display:grid;gap:14px">
      <div class="card teal" style="padding:24px">
        <div class="lab" style="margin-top:0">Scope decision</div>
        <h3 style="font-size:26px">About 60 rules, not 300</h3>
        <p class="b" style="margin-top:8px">Past 50–60 well-built rules you mostly get overlap, contradiction and noise. A typical person triggers 10–15. Parameterized rules already produce hundreds of specific messages.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px;text-align:center">
          ${[["9", "engines"], ["61", "rules"], ["1", "governor"]].map(([n, l]) => `<div style="background:rgba(255,255,255,.12);border-radius:14px;padding:12px 6px"><div class="fig" style="font-size:34px">${n}</div><div style="font-size:13px;opacity:.85">${l}</div></div>`).join("")}
        </div>
      </div>
      <div class="card">
        <div class="lab" style="margin-top:0">Guardrails</div>
        <div style="display:grid;gap:10px;margin-top:4px">
          <div class="n q" style="padding:10px 12px"><b>Coach, not advisor</b>General and educational. No specific securities, funds or products.</div>
          <div class="n q" style="padding:10px 12px"><b>Personal beats generic</b>Goal-specific reminders work about twice as well as generic ones.</div>
          <div class="n q" style="padding:10px 12px"><b>Celebrate progress</b>Milestones are their own severity, with their own slot.</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------- Money Map: the priority waterfall ---------- */
const MAP = [
  ["Cover the essentials", "Rent, food, utilities, transport and minimum payments fit inside take-home pay.", "Payment history ≈ 35% of FICO", "done"],
  ["Save a $1,000 starter cushion", "Keeps a flat tire or vet bill off a credit card.", "37% couldn’t cover $400 (SHED 2025)", "active"],
  ["Get your full employer match", "An instant, guaranteed 50–100% return.", "Nothing else reliably beats it", ""],
  ["Pay off high-interest debt", "Anything at or above 8% APR.", "~22% average card APR", ""],
  ["Grow your fund to 3–6 months", "Three months of essentials; six if income varies.", "Only ~55% have 3 months", ""],
  ["Save 15% for retirement", "Match included. Raise it 1% a year.", "Fidelity: ~10× salary by 67", ""],
  ["Knock out moderate-interest debt", "Loans between 4% and 8%: the gray zone.", "Risk-free return once the rest is done", ""],
  ["Fund your goals", "A trip, a home, a degree.", "Every extra dollar goes here", ""],
];
const MONEYMAP_HTML = `
<div id="c">
  <div class="eyebrow">Plan engine · Money Map</div>
  <h1>One ordered list: <em>where the next dollar goes</em></h1>
  <p class="sub">The Money Map is the backbone of every suggestion. It mirrors the widely used financial order of operations, skips steps that don’t apply, and highlights exactly one. This month’s surplus is split across the active step and the ones right behind it.</p>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:22px;margin-top:32px;align-items:start">
    <div style="position:relative">
      <div style="position:absolute;left:21px;top:22px;bottom:22px;width:3px;background:var(--teal-1)"></div>
      <div style="display:grid;gap:10px;position:relative">
        ${MAP.map(([t, d, s, st], i) => `
        <div style="display:grid;grid-template-columns:46px 1fr;gap:14px;align-items:center">
          <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;box-shadow:0 0 0 6px var(--bg);${st === "done" ? "background:var(--ok);color:#fff" : st === "active" ? "background:var(--indigo);color:#fff" : "background:#fff;border:2px solid var(--line);color:var(--faint)"}">${st === "done" ? "✓" : i + 1}</div>
          <div class="card" style="padding:13px 18px;display:grid;grid-template-columns:1fr 250px;gap:16px;align-items:center;${st === "active" ? "border:2px solid var(--indigo);box-shadow:0 10px 24px -14px rgba(27,27,111,.5)" : ""}">
            <div><div style="font-family:Lora,serif;font-weight:700;font-size:17.5px;color:var(--indigo)">${t}${st === "active" ? ` <span class="chip ink" style="margin:0 0 0 8px;vertical-align:2px">You are here</span>` : ""}</div><div style="font-size:14px;color:var(--dim);margin-top:2px">${d}</div></div>
            <div style="font-size:13px;color:var(--teal-7);font-weight:700">${s}</div>
          </div>
        </div>`).join("")}
      </div>
    </div>
    <div style="display:grid;gap:14px">
      <div class="card">
        <div class="lab" style="margin-top:0">This month’s money · David</div>
        <div style="font-size:15px;color:var(--dim)"><b class="fig" style="font-size:28px;color:var(--ink)">$4,100</b> take-home</div>
        <div style="display:flex;height:22px;border-radius:99px;overflow:hidden;margin-top:14px">
          <div style="flex:2608;background:var(--indigo)"></div><div style="flex:472;background:#8a8ad9"></div><div style="flex:1020;background:var(--teal)"></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px;font-size:13.5px">
          <div><b class="num" style="font-size:17px">$2,608</b><br><span style="color:var(--faint)">Essentials & minimums</span></div>
          <div><b class="num" style="font-size:17px">$472</b><br><span style="color:var(--faint)">Wants budget</span></div>
          <div><b class="num" style="font-size:17px;color:var(--teal-7)">$1,020</b><br><span style="color:var(--faint)">Left for the plan</span></div>
        </div>
        <div class="lab">Split across the map</div>
        ${[["Starter fund", 350, "var(--teal)"], ["Extra on high-interest debt", 335, "var(--coral)"], ["Visit family in June", 335, "var(--gold)"]].map(([l, v, c]) => `<div style="display:grid;grid-template-columns:1fr 70px;gap:10px;align-items:center;margin-top:8px;font-size:14px"><div><div style="display:flex;justify-content:space-between"><span>${l}</span></div><div style="height:8px;border-radius:99px;background:var(--sunk);margin-top:5px"><div style="width:${(v / 350) * 100}%;height:100%;border-radius:99px;background:${c}"></div></div></div><b class="num" style="text-align:right">$${v}</b></div>`).join("")}
      </div>
      <div class="card mint">
        <div class="lab" style="margin-top:0">Skips what doesn’t apply</div>
        <p class="b" style="font-size:14.5px">No employer match? Step 3 disappears. No debts between 4% and 8%? Step 7 never shows. Seven or eight steps, numbered for <i>this</i> person.</p>
      </div>
      <div class="card">
        <div class="lab" style="margin-top:0">One step drives the coach</div>
        <p class="b" style="font-size:14.5px">Rules tied to the active step get a priority boost, so the coach talks about what you’re working on now.</p>
      </div>
    </div>
  </div>
</div>`;

/* ---------- Onboarding: ten questions to a plan ---------- */
const OB = [
  ["01", "Name", "“What should I call you?”", "Voice", "Every card speaks to you"],
  ["02", "Take-home pay", "Monthly amount + pay frequency", "Income", "Budget, forecast, paydays"],
  ["03", "Stability", "Steady or it varies · dependents", "Fund size", "3 or 6 months"],
  ["04", "Essentials", "Rent, bills, groceries, transport", "Needs", "50/30/20 allocator"],
  ["05", "Balances", "Checking and savings today", "Start point", "Starter cushion progress"],
  ["06", "Debt", "Balance, APR, minimum per card or loan", "Debts", "Avalanche / snowball, step 4 & 7"],
  ["07", "Retirement match", "Match up to % · you put in %", "Free money", "Match gap, step 3"],
  ["08", "A dream", "Trip, home, car, school, or stable first", "First goal", "Goal math, step 8"],
  ["09", "Nudges", "Gentle · Balanced · Proactive", "Governor caps", "How often Sprout speaks"],
];
const OB_HTML = `
<div id="c">
  <div class="eyebrow">User flow · onboarding</div>
  <h1>Nine questions, then <em>value before commitment</em></h1>
  <p class="sub">Most finance apps lose people at account linking. Aureum asks one question per screen, takes best guesses, needs no bank login, and keeps answers on the device. Each answer feeds a specific engine, so two minutes later there is a real Money Map and a safe-to-spend number.</p>
  <div style="display:grid;grid-template-columns:150px repeat(9,1fr);gap:9px;margin-top:34px">
    <div></div>${OB.map(([n]) => `<div style="font-weight:800;font-size:13px;color:var(--teal-7);padding:0 4px">${n}</div>`).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">Question</b><span style="font-size:12.5px;color:var(--faint)">one per screen</span></div>
    ${OB.map(([, t, q]) => `<div class="n q" style="min-height:112px"><b>${t}</b>${q}</div>`).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">Sets</b><span style="font-size:12.5px;color:var(--faint)">profile & state</span></div>
    ${OB.map(([, , , s]) => `<div class="n set" style="font-weight:700">${s}</div>`).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">Feeds</b><span style="font-size:12.5px;color:var(--faint)">engine</span></div>
    ${OB.map(([, , , , e]) => `<div class="n eng" style="min-height:76px">${e}</div>`).join("")}
  </div>
  <div style="display:grid;grid-template-columns:1fr 60px 1.3fr 60px 1.3fr;gap:0;margin-top:22px;align-items:stretch">
    <div class="card mint" style="padding:18px 20px"><div class="lab" style="margin-top:0">Building · 2.6 s</div><p class="b" style="font-size:14px">Sizing your safety net · ranking your debts by cost · checking for free money · drafting a budget that fits</p></div>
    <div class="arrow">→</div>
    <div class="card ink" style="padding:18px 20px"><div class="lab" style="margin-top:0">Lands on</div><h3>“Here’s your Money Map, Maya.”</h3><p class="b" style="font-size:14px;margin-top:4px">Steps already done are checked off. One is highlighted, with one button.</p></div>
    <div class="arrow">→</div>
    <div class="card teal" style="padding:18px 20px"><div class="lab" style="margin-top:0">Then home</div><h3>Safe to spend, today</h3><p class="b" style="font-size:14px;margin-top:4px">Bills and the plan’s share are set aside first. Skip is always there; demo data is one tap away.</p></div>
  </div>
</div>`;

/* ---------- Core workflow: from nudge to progress ---------- */
const LOOP = [
  ["01 Notice", null, ["Engines run", "Match gap: 2% unclaimed of a 4% match on $62K gross."], ["Rule fires", "P1-match · suggest · impact $1,240/yr · step: match"]],
  ["02 Choose", null, null, ["Governor ranks", "Suggestion base 300 + log of $ impact + Money Map boost. One card per topic, capped by nudge level."]],
  ["03 Tell", ["Reads the card", "“You’re leaving $1,240 a year of free money on the table.”"], ["Card on Home + Coach", "One action, a “Why?”, and Later. Never more than the cap."], null],
  ["04 Explain", ["Taps “Why?”", "Wants the reasoning first."], ["Rationale + source", "Instant 50–100% return · common order of operations."], null],
  ["05 Act", ["Show me how", "Drags contribution from 2% to 4%."], ["Match calculator", "Employer adds $1,240/yr; take-home changes less, pre-tax."], null],
  ["06 Progress", ["Confirms", "“I’ve updated my contribution.”"], ["Full match unlocked 🎉", "Step 3 checks off; health score rises; the map moves on.", "yay"], ["Rule goes quiet", "Condition no longer true. Next step’s rules move up."]],
];
const cell = (x, cls) => (x ? `<div class="n ${x[2] || cls}" style="min-height:104px"><b>${x[0]}</b>${x[1]}</div>` : `<div class="n empty"></div>`);
const LOOP_HTML = `
<div id="c">
  <div class="eyebrow">Core workflow · the coach loop</div>
  <h1>From a nudge <em>to visible progress</em></h1>
  <p class="sub">The workflow the whole product is built around, traced for the demo persona. The engines notice something worth a dollar, the governor decides it’s worth saying, and one tap later the plan has moved forward. The same loop runs for overdraft warnings, overspending and goals.</p>
  <div style="display:grid;grid-template-columns:150px repeat(6,1fr);gap:10px;margin-top:34px">
    <div></div>${LOOP.map(([s]) => `<div style="font-weight:800;font-size:13px;color:var(--teal-7);padding:0 4px 2px">${s}</div>`).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">David</b><span style="font-size:12.5px;color:var(--faint)">the person</span></div>${LOOP.map((r) => cell(r[1], "user")).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">App</b><span style="font-size:12.5px;color:var(--faint)">screens</span></div>${LOOP.map((r) => cell(r[2], "app")).join("")}
    <div style="display:flex;flex-direction:column;justify-content:center"><b style="font-size:16px">Coach</b><span style="font-size:12.5px;color:var(--faint)">engines + rules</span></div>${LOOP.map((r) => cell(r[3], "coach")).join("")}
  </div>
  <div class="legend">
    <span><i style="border:1.5px dashed var(--strong);background:#fff"></i>What the person does</span>
    <span><i style="background:var(--indigo)"></i>What the app shows</span>
    <span><i style="background:var(--teal)"></i>What the coach computes</span>
    <span><i style="background:var(--gold-1);border:1px solid #f6d58e"></i>Celebration, its own severity</span>
  </div>
</div>`;

/* ---------- Information architecture ---------- */
const IA = [
  ["Home", "Today", ["Safe to spend", "Next Money Map step", "30-day forecast", "Coming up", "Recent"]],
  ["Budget", "This month", ["Left to spend", "Needs / wants / saved vs 50/30/20", "Categories", "Transactions"]],
  ["Money Map", "The plan", ["8 ordered steps + why", "This month’s money", "Employer match calculator"]],
  ["Goals & debt", "The future", ["Emergency fund", "Goals + new goal", "Debt payoff plan", "Avalanche vs snowball"]],
  ["Coach", "Guidance", ["Health score · 4 pillars", "Nudge level", "For you now / all", "8 lessons"]],
];
const IA_HTML = `
<div id="c">
  <div class="eyebrow">Information architecture</div>
  <h1>Five places, <em>one coach beside all of them</em></h1>
  <p class="sub">The 2024 concept spread eight capability areas across separate tabs. The rebuild folds them into five destinations ordered by time: today, this month, the plan, the future and guidance. The coach isn’t a tab you visit; it travels with you.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:32px">
    ${IA.map(([t, k, items], i) => `
      <div class="card ${i === 0 ? "teal" : ""}" style="padding:20px">
        <div class="lab" style="margin-top:0">${k}</div><h3 style="font-size:23px">${t}</h3>
        <div style="display:grid;gap:7px;margin-top:14px">${items.map((x) => `<div style="font-size:14px;padding:8px 11px;border-radius:10px;${i === 0 ? "background:rgba(255,255,255,.14)" : "background:var(--sunk)"}">${x}</div>`).join("")}</div>
      </div>`).join("")}
  </div>
  <div class="card ink" style="margin-top:14px;padding:16px 22px;display:flex;align-items:center;gap:22px">
    <h3 style="flex:none">Everywhere</h3>
    ${["Sprout says · top cards", "Health score", "Add transaction", "“Why?” on every card", "Settings · accounts, nudges, appearance"].map((x) => `<span class="chip white" style="margin:0;font-size:13.5px;padding:7px 13px">${x}</span>`).join("")}
  </div>
  <div class="lab" style="margin-top:26px">One layout, three shells</div>
  <div style="display:grid;grid-template-columns:0.7fr 1fr 1.6fr;gap:18px;align-items:end">
    ${[
      ["Phone", "Bottom tabs and a floating Add button. The coach lives in Home and its own tab.", 150, 300, "tabs"],
      ["Tablet", "An icon rail replaces the tabs; content gets two columns.", 330, 250, "rail"],
      ["Desktop", "Sidebar, content, and a coach rail with the health score and Sprout’s top cards.", 560, 300, "full"],
    ].map(([t, d, w, h, kind]) => `
      <div>
        <div style="width:${w}px;height:${h}px;border:2px solid var(--indigo);border-radius:${kind === "tabs" ? 26 : 14}px;background:#fff;display:flex;overflow:hidden;position:relative">
          ${kind !== "tabs" ? `<div style="width:${kind === "rail" ? 44 : 110}px;background:var(--teal-05);border-right:1px solid var(--line);padding:10px 8px;display:grid;gap:7px;align-content:start">${[0, 1, 2, 3, 4].map((k) => `<div style="height:${kind === "rail" ? 24 : 18}px;border-radius:7px;background:${k === 0 ? "var(--teal-1)" : "var(--sunk)"}"></div>`).join("")}</div>` : ""}
          <div style="flex:1;padding:12px;display:grid;gap:8px;align-content:start">
            <div style="height:${kind === "tabs" ? 70 : 64}px;border-radius:10px;background:var(--teal)"></div>
            <div style="height:44px;border-radius:10px;background:var(--mint)"></div>
            <div style="display:grid;grid-template-columns:${kind === "tabs" ? "1fr" : "1fr 1fr"};gap:8px"><div style="height:60px;border-radius:10px;background:var(--sunk)"></div>${kind === "tabs" ? "" : `<div style="height:60px;border-radius:10px;background:var(--sunk)"></div>`}</div>
          </div>
          ${kind === "full" ? `<div style="width:150px;border-left:1px solid var(--line);padding:12px;display:grid;gap:8px;align-content:start"><div style="height:40px;border-radius:10px;background:var(--sunk)"></div><div style="height:80px;border-radius:10px;background:var(--indigo-05);border:1px solid var(--indigo-1)"></div><div style="height:80px;border-radius:10px;background:var(--indigo-05);border:1px solid var(--indigo-1)"></div></div>` : ""}
          ${kind === "tabs" ? `<div style="position:absolute;left:0;right:0;bottom:0;height:34px;border-top:1px solid var(--line);background:#fff;display:flex;justify-content:space-around;align-items:center">${[0, 1, 2, 3, 4].map((k) => `<div style="width:14px;height:14px;border-radius:4px;background:${k === 0 ? "var(--teal)" : "var(--line)"}"></div>`).join("")}</div><div style="position:absolute;right:12px;bottom:44px;width:40px;height:40px;border-radius:50%;background:var(--indigo)"></div>` : ""}
        </div>
        <div style="margin-top:12px"><b style="font-size:16px">${t}</b><p class="b" style="font-size:14px;margin-top:2px">${d}</p></div>
      </div>`).join("")}
  </div>
</div>`;

/* ---------- System architecture ---------- */
const box = (k, t, d, cls = "") => `<div class="card ${cls}" style="padding:13px 15px;border-radius:14px"><div class="lab" style="margin-top:0;font-size:10.5px">${k}</div><div style="font-weight:700;font-size:15px">${t}</div>${d ? `<p class="b" style="font-size:13px;margin-top:3px">${d}</p>` : ""}</div>`;
const SYSTEM_HTML = `
<div id="c">
  <div class="eyebrow">System architecture</div>
  <h1>Math, then rules, then <em>restraint</em></h1>
  <p class="sub">Three layers keep the coach honest. Engines are pure functions: state in, numbers out. Rules never do math; they read engine output and decide whether something is worth saying. The governor decides how much gets said at all. Every screen reads from the same pass.</p>
  <div style="display:grid;grid-template-columns:0.9fr 50px 1.25fr 50px 1fr 50px 0.9fr 50px 0.9fr;margin-top:34px;align-items:stretch">
    <div style="display:grid;gap:10px;align-content:start">
      <div class="lab" style="margin-top:0">Inputs</div>
      ${box("Onboarding", "9 answers", "Or the David Lee demo seed.")}
      ${box("Activity", "Transactions & bills", "Recurring income and bills, accounts, debts.")}
      ${box("Choices", "Goals & settings", "Nudge level, dismissals, snoozes.")}
      ${box("Store", "localStorage", "Stands in for a backend; no build, no server.", "mint")}
    </div>
    <div class="arrow">→</div>
    <div class="card ink" style="padding:20px">
      <div class="lab" style="margin-top:0">Layer 1 · engine.js</div><h3>9 engines</h3>
      <p class="b" style="font-size:13.5px;margin-top:4px">Every threshold in one ASSUMPTIONS object.</p>
      <div style="display:grid;gap:6px;margin-top:12px">${["Budget allocator · 50/30/20", "Emergency-fund ladder", "Employer match gap", "Money Map waterfall", "Monthly allocation", "Goal math · APY", "Debt simulator", "30-day forecast · safe-to-spend", "Health score · 4 pillars"].map((x) => `<div style="font-size:13.5px;padding:6px 10px;border-radius:9px;background:rgba(255,255,255,.1)">${x}</div>`).join("")}</div>
    </div>
    <div class="arrow">→</div>
    <div class="card" style="padding:20px;border-top:5px solid var(--teal)">
      <div class="lab" style="margin-top:0">Layer 2 · rules.js</div><h3>61 rules</h3>
      <p class="b" style="font-size:13.5px;margin-top:4px">45 hand-written + 16 generated per category.</p>
      <div style="display:grid;gap:6px;margin-top:12px;font-size:13.5px">${[["Safety", 7], ["Money Map", 11], ["Spending", 28], ["Debt & credit", 6], ["Goals", 7], ["Milestones", 3], ["Learn", 1]].map(([g, n]) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--line)"><span>${g}</span><b class="num">${n}</b></div>`).join("")}</div>
      <p class="b" style="font-size:12.5px;margin-top:10px">Each: trigger, copy, one action, $ impact, why, source.</p>
    </div>
    <div class="arrow">→</div>
    <div class="card teal" style="padding:20px">
      <div class="lab" style="margin-top:0">Layer 3</div><h3>Governor</h3>
      <div style="display:grid;gap:8px;margin-top:12px;font-size:13.5px">${["Rank: severity, $ impact, Money Map step", "One card per topic", "Cap by nudge level", "Respect dismiss cooldowns & snoozes"].map((x) => `<div style="padding:7px 10px;border-radius:9px;background:rgba(255,255,255,.14)">${x}</div>`).join("")}</div>
    </div>
    <div class="arrow">→</div>
    <div style="display:grid;gap:10px;align-content:start">
      <div class="lab" style="margin-top:0">Surfaces</div>
      ${box("Home", "Safe to spend · next step", "")}
      ${box("Plan", "Money Map · match calc", "")}
      ${box("Goals & debt", "Payoff simulator", "")}
      ${box("Coach", "Health · cards · lessons", "")}
      ${box("Shared", "tokens.css · charts.js · art.js", "One design system with the homepage.", "mint")}
    </div>
  </div>
</div>`;

/* ---------- Governor pipeline ---------- */
const GOV_HTML = `
<div id="c">
  <div class="eyebrow">How Sprout decides</div>
  <h1>Few, timely, <em>relevant</em></h1>
  <p class="sub">Research on savings nudges is clear: personal, goal-specific messages work; generic volume doesn’t. So every day all 61 rules are checked, and most of what fires is never shown. For the demo persona, 15 rules fire and 4 make it to the screen: three suggestions and one lesson.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:34px;align-items:end">
    ${[["61", "rules in the catalog", 300, "var(--indigo-1)"], ["15", "fire on David’s data", 150, "var(--indigo-5)"], ["15", "not dismissed or snoozed", 150, "var(--indigo-5)"], ["13", "topics, one card each", 130, "var(--teal)"], ["4", "under the Balanced caps", 60, "var(--teal-7)"]].map(([n, l, h, c], i) => `
      <div style="padding:0 10px;text-align:center">
        <div class="fig num" style="font-size:44px;color:${i === 4 ? "var(--teal-7)" : "var(--indigo)"}">${n}</div>
        <div style="font-size:14px;color:var(--dim);margin:4px 0 12px;min-height:40px">${l}</div>
        <div style="height:${h}px;border-radius:14px 14px 0 0;background:${c}"></div>
      </div>`).join("")}
  </div>
  <div style="height:2px;background:var(--strong)"></div>
  <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px;margin-top:22px">
    <div class="card ink">
      <div class="lab" style="margin-top:0">Priority</div>
      <div class="num" style="font-size:16px;line-height:1.8;color:#fff;font-weight:600">severity base<br>+ min(250, 70 · log₁₀(1 + $ impact))<br>+ up to 200 for the active Money Map step</div>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">${[["urgent", 1000], ["celebrate", 600], ["suggest", 300], ["learn", 100]].map(([s, v]) => `<span class="chip white">${s} ${v}</span>`).join("")}</div>
    </div>
    <div class="card" style="padding:18px 22px">
      <div class="lab" style="margin-top:0">Caps by nudge level</div>
      <table class="num" style="font-size:14px">
        <tr style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--faint)"><td style="padding:6px 0"></td><td>Urgent</td><td>Suggest</td><td>Yay</td><td>Learn</td></tr>
        ${[["Gentle", 1, 1, 1, 0], ["Balanced", 2, 3, 1, 1], ["Proactive", 3, 6, 2, 2]].map(([l, ...v]) => `<tr style="border-top:1px solid var(--line);${l === "Balanced" ? "font-weight:800;color:var(--teal-7)" : ""}"><td style="padding:8px 0;font-weight:700">${l}</td>${v.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}
      </table>
    </div>
    <div class="card mint" style="padding:18px 22px">
      <div class="lab" style="margin-top:0">Then the person decides</div>
      <div style="display:grid;gap:8px;margin-top:4px;font-size:14px">
        <div><b>Act</b> · the rule’s condition clears and it goes quiet.</div>
        <div><b>Later</b> · snoozed; it comes back.</div>
        <div><b>Dismiss</b> · cooldown in days, set per rule.</div>
        <div><b>Why?</b> · plain-language rationale and its source.</div>
      </div>
    </div>
  </div>
</div>`;

/* ---------- Health score ---------- */
const PILLARS = [
  ["In control", "Spending inside your plan", "Projected month-end spend vs budget (60%) + essentials fit inside income (40%)", 0.92],
  ["Shock-ready", "Emergency fund coverage", "Months of essentials saved ÷ target months (3, or 6 if income varies)", 0.08],
  ["On track", "Saving rate & free money", "Savings rate ÷ 20% (70%) + employer match captured (30%)", 0.7],
  ["Free to choose", "Debt & credit health", "High-interest debt vs income (50%) + utilization (25%) + debt-to-income (25%)", 0.57],
];
const HEALTH_HTML = `
<div id="c">
  <div class="eyebrow">Health score</div>
  <h1>One number, <em>four honest parts</em></h1>
  <p class="sub">“Am I okay?” deserves a straight answer. The score is modeled on the CFPB’s Financial Well-Being elements, but says so: it is not the official scale. Each pillar is 25% and shows its own bar, so a low score always says why.</p>
  <div style="display:grid;grid-template-columns:330px 1fr;gap:22px;margin-top:32px;align-items:stretch">
    <div class="card teal" style="padding:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <svg width="210" height="210" viewBox="0 0 210 210"><circle cx="105" cy="105" r="86" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="18"/><circle cx="105" cy="105" r="86" fill="none" stroke="#8fdcd7" stroke-width="18" stroke-linecap="round" stroke-dasharray="${(0.57 * 2 * Math.PI * 86).toFixed(1)} 999" transform="rotate(-90 105 105)"/><text x="105" y="118" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="58" fill="#fff">57</text></svg>
      <div style="font-size:16px;font-weight:700;margin-top:6px">Grade C · David</div>
      <p class="b" style="font-size:14px;margin-top:6px">Shock-ready is the weak pillar at 8, which is why the starter cushion is the active step. Claiming the match moves On track from 70 to 100.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      ${PILLARS.map(([t, h, f, v]) => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:baseline"><h3>${t}</h3><b class="num fig" style="font-size:22px;color:var(--teal-7)">${Math.round(v * 100)}</b></div>
          <div style="font-size:14px;color:var(--faint);margin-top:2px">${h}</div>
          <div style="height:10px;border-radius:99px;background:var(--sunk);margin-top:12px"><div style="width:${v * 100}%;height:100%;border-radius:99px;background:${v < 0.3 ? "var(--coral)" : "var(--teal)"}"></div></div>
          <p class="b" style="font-size:13.5px;margin-top:12px">${f}</p>
        </div>`).join("")}
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

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(tab, PEOPLE_HTML, "diagram-people.png");
await render(tab, FRICTION_HTML, "diagram-friction.png");
await render(tab, MOVES_HTML, "diagram-moves.png");
await render(tab, RULES_HTML, "research-rules.png");
await render(tab, IA_HTML, "diagram-ia.png");
await render(tab, OB_HTML, "flow-onboarding.png");
await render(tab, LOOP_HTML, "flow-coach.png");
await render(tab, MONEYMAP_HTML, "diagram-money-map.png");
await render(tab, SYSTEM_HTML, "diagram-system.png");
await render(tab, GOV_HTML, "diagram-governor.png");
await render(tab, HEALTH_HTML, "diagram-health.png");
await browser.close();
