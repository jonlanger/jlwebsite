import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * Draws the teleop case-study diagrams as HTML and photographs them, in the
 * product's own Daylight theme (Archivo for words, JetBrains Mono for anything
 * that updates; mint is autonomy, amber is an operator, red is only ever stop)
 * so they sit with the screens.
 *
 * Content comes from the prototype (teleoperate.vercel.app) and its source:
 * software/README.md, src/engine (fleet.ts policy and command lifecycle,
 * sim/vehicle.ts assist requests and watchdog), shared/wheel-hid.ts,
 * hardware/SPEC.md, and the homepage's cited research.
 *
 *   node scripts/render-teleop-diagrams.mjs
 */
const OUT = path.resolve("public/projects/teleoperation-station/_src");
const BOARD = path.resolve("public/projects/teleoperation-station/_src/teleoperation-station_board.webp");
const TELEOP = path.join(os.homedir(), "Documents/Projects/teleop");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=JetBrains+Mono:wght@400..700&display=swap');
  :root { --bg:#F3F4F2; --s1:#FFFFFF; --s2:#E8EAE7; --s3:#DCDFDB; --line:#C9CDC9; --strong:#7E868D; --ink:#15181B; --dim:#545C64; --faint:#7A828A;
    --carbon:#24272B; --graphite:#3A3E44; --c0:#101214; --c1:#181B1E; --c2:#22262A; --cline:#363C42; --cink:#EEF0EE; --cdim:#9AA2A9;
    --mint:#09694F; --mintf:#3CE6B4; --onmint:#06291F; --mintw:#D6F7EC;
    --amber:#8F5A00; --amberf:#FFB020; --onamber:#2B1A00; --amberw:#FFEFCC;
    --stop:#B8231A; --stopf:#D02B21; --stopw:#FCE0DD; --info:#1F5FAF; --infow:#E1ECFA; --gum:#9C7552; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:Archivo,-apple-system,sans-serif; font-stretch:100%; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--bg); }
  h1 { font-size:46px; font-weight:800; font-style:italic; font-stretch:125%; letter-spacing:-0.02em; line-height:1.05; }
  h1 em { color:var(--mint); font-style:italic; }
  .eyebrow { font-family:"JetBrains Mono",monospace; font-size:13px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--dim); margin-bottom:16px; }
  .sub { color:var(--dim); font-size:18px; margin-top:16px; max-width:1180px; line-height:1.55; }
  .card { background:var(--s1); border:1px solid var(--line); border-radius:12px; padding:20px 22px; }
  .card.dark { background:var(--c1); border-color:var(--cline); color:var(--cink); }
  .card.mint { background:var(--mintw); border-color:#9fe3cb; }
  .card.amber { background:var(--amberw); border-color:#f3cf86; }
  .card.stop { background:var(--stopw); border-color:#f0aaa3; }
  h3 { font-size:20px; font-weight:700; letter-spacing:-0.01em; }
  .lab { font-family:"JetBrains Mono",monospace; font-size:11.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--faint); margin:14px 0 6px; }
  .dark .lab { color:var(--cdim); }
  p.b { font-size:15px; line-height:1.5; color:var(--dim); }
  .dark p.b { color:var(--cdim); }
  .mono { font-family:"JetBrains Mono",monospace; font-variant-numeric:tabular-nums; }
  .badge { display:inline-flex; align-items:center; gap:7px; font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:4px 10px; border-radius:99px; white-space:nowrap; }
  .badge::before { content:""; width:9px; height:9px; border-radius:50%; border:2px solid currentColor; }
  .badge.auto { background:var(--mintw); color:var(--mint); }
  .badge.op { background:var(--amberw); color:var(--amber); }
  .badge.tr { background:var(--s2); color:var(--ink); }
  .badge.stop { background:var(--stopf); color:#fff; }
  .chip { display:inline-flex; align-items:center; font-size:12.5px; font-weight:600; padding:4px 10px; border-radius:6px; margin:0 6px 6px 0; background:var(--s2); color:var(--ink); }
  .chip.mint { background:var(--mintw); color:var(--mint); }
  .chip.amber { background:var(--amberw); color:var(--amber); }
  .chip.stop { background:var(--stopw); color:var(--stop); }
  .chip.info { background:var(--infow); color:var(--info); }
  .chip.dk { background:var(--c2); color:var(--cink); }
  .av { width:50px; height:50px; border-radius:50%; background:var(--carbon); color:var(--cink); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; flex:none; }
  .arrow { color:var(--strong); font-size:22px; display:flex; align-items:center; justify-content:center; }
  .legend { display:flex; gap:24px; margin-top:24px; font-size:14px; color:var(--dim); flex-wrap:wrap; }
  .legend i { display:inline-block; width:14px; height:14px; border-radius:4px; vertical-align:-2px; margin-right:8px; }
  .n { border-radius:10px; padding:12px 14px; font-size:14px; line-height:1.4; }
  .n b { display:block; font-size:15px; margin-bottom:3px; }
  .n.plain { background:var(--s1); border:1px solid var(--line); color:var(--dim); }
  .n.plain b { color:var(--ink); }
  .n.auto { background:var(--mintw); border:1px solid #9fe3cb; color:#0d4d3b; }
  .n.op { background:var(--amberw); border:1px solid #f3cf86; color:#5c3a00; }
  .n.dk { background:var(--c1); color:var(--cdim); }
  .n.dk b { color:var(--cink); }
  .n.stop { background:var(--stopw); border:1px solid #f0aaa3; color:#7a1a13; }
  .n.dash { background:transparent; border:1.5px dashed var(--strong); color:var(--dim); }
  .n.dash b { color:var(--ink); }
  .n.empty { background:transparent; }
  sup { font-size:10px; color:var(--info); font-family:"JetBrains Mono",monospace; }
  table { border-collapse:collapse; width:100%; }
`;

/* ---------- Why now: the ratio is the business ---------- */
const RATIOS = [["Serve Robotics, sidewalk delivery, 2022", 4, "4"], ["Goldman Sachs outlook for 2030", 10, "5"], ["Pony.ai robotaxis, 2025", 20, "6"], ["Waymo robotaxis, 2026", 43, "6"]];
const dots = (n) => `<span style="display:inline-block;width:13px;height:13px;border-radius:3px;background:var(--carbon);margin-right:9px;vertical-align:-1px"></span>${Array.from({ length: n }, () => `<span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:var(--mintf);margin-right:4px"></span>`).join("")}`;
const WHY_HTML = `
<div id="c">
  <div class="eyebrow">Why now · secondary research</div>
  <h1>Every driverless fleet <em>still runs on people</em></h1>
  <p class="sub">Autonomous vehicles stop and ask when they’re unsure. How many vehicles one person can cover decides what each delivery costs, so the ratio is the business. Remote operations is what’s left of the cost once the driver is gone.</p>
  <div style="display:grid;grid-template-columns:1.45fr 1fr;gap:20px;margin-top:32px">
    <div class="card" style="padding:26px 28px">
      <div class="lab" style="margin-top:0">Vehicles one remote operator covers</div>
      <table style="margin-top:10px">${RATIOS.map(([who, n, s]) => `<tr><td style="font-size:15px;padding:13px 0;width:290px">${who}<sup> ${s}</sup></td><td>${dots(n)}</td><td class="mono" style="text-align:right;font-weight:700;font-size:18px">1:${n}</td></tr>`).join("")}</table>
      <div class="legend" style="margin-top:14px"><span><i style="background:var(--carbon)"></i>one remote operator</span><span><i style="background:var(--mintf);border-radius:50%"></i>vehicles they cover</span></div>
    </div>
    <div style="display:grid;grid-template-rows:repeat(3,1fr);gap:14px">
      ${[["53%", "of shipping cost is the last mile. Autonomy removes the driver; remote operations is what remains.", "1"], ["$91.5B", "autonomous last-mile delivery market projected for 2030.", "2"], ["$2.7B", "teleoperations market by 2030, up from $777M in 2024.", "3"]].map(([v, t, s]) => `
        <div class="card" style="display:flex;gap:20px;align-items:center"><div style="font-size:44px;font-weight:800;font-style:italic;font-stretch:125%;letter-spacing:-0.03em;min-width:190px">${v}</div><p class="b">${t}<sup> ${s}</sup></p></div>`).join("")}
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px">
    ${[["01", "Everything asks at once", "A December 2025 outage darkened San Francisco’s signals and stalled robotaxis blocked intersections: too many needed help at the same moment.", "8"],
      ["02", "Regulators want the log", "Germany and California now set rules for remote drivers and assistants, and a federal bill would keep them in the US.", "12–14"],
      ["03", "Latency limits what a person can do", "People can steer remotely under about 100 ms of delay. Past 500 ms it’s close to impossible.", "16"]].map(([n, h, t, s]) => `
      <div class="card dark"><div class="mono" style="color:var(--mintf);font-weight:700">${n}</div><h3 style="margin-top:8px">${h}</h3><p class="b" style="margin-top:8px">${t}<sup style="color:#7CB8FF"> ${s}</sup></p></div>`).join("")}
  </div>
  <p style="font-size:12.5px;color:var(--faint);margin-top:18px">Numbered sources are listed on the teleop homepage: GoBolt, MarketsandMarkets, Research and Markets, SupplyChainBrain, The Drive, Human Progress, Axios, Bird &amp; Bird, Sidley, arXiv 2503.14186.</p>
</div>`;

/* ---------- People: four roles in the room, two who pay ---------- */
const ROLES = [
  ["SR", "Sam Rivera", "Senior operator", "Operator", "Covers several vehicles at once from a station; most help is a brake, a nudge or a label, not a takeover.", "To know which vehicle needs them, what it sees, and that a command actually landed.", "Camera, route map, safety controls and the drive strip on one screen; the Wheel."],
  ["DO", "Dana Ortiz", "Fleet manager", "Fleet", "Staffs the room against demand and assigns vehicles to operators on shift.", "Enough people at the right hours, and early warning when a vehicle or a route is in trouble.", "KPIs, the live city map, hourly coverage against a 1:5 target, vehicle assignment."],
  ["KW", "Kenji Watanabe", "Vehicle engineer", "Engineering", "Owns faults, sensors and software on the vehicles, and the stations and Wheels in the room.", "The full record: what was commanded, what the vehicle did, and how long it took.", "Telemetry, logs, the command audit, maintenance, diagnostics, stations and Wheels."],
  ["RA", "Ruth Adeyemi", "Support lead", "Support", "Answers riders, shippers and staff when something went wrong on a run.", "What the vehicle actually did, and a fast route to whoever can fix it.", "A queue sorted by deadline, playbooks per category, the vehicle’s timeline, escalation."],
];
const PEOPLE_HTML = `
<div id="c">
  <div class="eyebrow">Who it’s for · four roles, one fleet</div>
  <h1>One room, <em>four jobs</em></h1>
  <p class="sub">The original station was designed for one person: the operator in the seat. Rebuilding it as a product meant designing for everyone who keeps a driverless fleet running, and for the two groups who pay for it. The prototype’s sign-in uses these four people.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px">
    ${ROLES.map(([ini, name, title, ws, does, needs, gets], i) => `
      <div class="card ${i === 0 ? "dark" : ""}" style="padding:22px">
        <div style="display:flex;align-items:center;gap:12px"><div class="av" style="${i === 0 ? "background:var(--mintf);color:var(--onmint)" : ""}">${ini}</div><div><h3 style="font-size:19px">${name}</h3><div style="font-size:13.5px;opacity:.75;margin-top:2px">${title}</div></div></div>
        <div style="margin-top:14px"><span class="chip ${i === 0 ? "dk" : ""}">${ws} workspace</span></div>
        <div class="lab">The job</div><p class="b" style="font-size:14.5px">${does}</p>
        <div class="lab">Needs</div><p class="b" style="font-size:14.5px;font-weight:600;color:${i === 0 ? "var(--cink)" : "var(--ink)"}">${needs}</p>
        <div class="lab">teleop gives them</div><p class="b" style="font-size:14.5px">${gets}</p>
      </div>`).join("")}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
    <div class="card mint"><div class="lab" style="margin-top:0;color:var(--mint)">Who pays</div><h3>Autonomy operators</h3><p class="b" style="margin-top:6px">The company running the vehicles staffs the room. Operator seats and a Wheel per station, priced per vehicle in service. They buy fewer operators per vehicle, an audit trail regulators accept, and every fault in front of engineering.</p></div>
    <div class="card"><div class="lab" style="margin-top:0">And their customers</div><h3>Shippers and retailers</h3><p class="b" style="margin-top:6px">The brands whose freight is on board get Fleet and Support seats: where their deliveries are, and what happened when one was late. Tickets come with the vehicle’s own timeline.</p></div>
  </div>
</div>`;

/* ---------- Latency: offer only the help the link can carry ---------- */
const LADDER = [
  ["Drive", "≤ 100 ms", "op", "Claim and steer, throttle and brake at 20 Hz from the screen, a gamepad or the Wheel.", "Remote steering works under about 100 ms."],
  ["Guide", "≤ 300 ms", "auto", "Brake, or nudge autonomy’s path up to 3 m at 10 Hz. Autonomy keeps the wheel; guidance lapses 500 ms after you let go.", "Waymo’s assistance runs at a 150 ms median."],
  ["Advise", "≤ 600 ms", "tr", "Label what perception sees and approve a path. The vehicle does the driving.", "Advice, not control: no continuous input."],
  ["Link lost", "> 600 ms", "stop", "The vehicle’s own watchdog brakes it to a stop. Nothing waits for the console.", "Past 500 ms remote steering is close to impossible."],
];
const LADDER_HTML = `
<div id="c">
  <div class="eyebrow">Design principle · latency</div>
  <h1>Offer only the help <em>the link can carry</em></h1>
  <p class="sub">A cellular link is the one part of the system nobody controls. Instead of one “take over” button, teleop grades help by delay: the worse the link, the less a person is allowed to do directly, and the more is left to the vehicle.</p>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:24px;margin-top:32px;align-items:start">
    <div style="display:grid;gap:12px">
      ${LADDER.map(([name, ms, k, what, why], i) => `
        <div class="card ${k === "op" ? "amber" : k === "auto" ? "mint" : k === "stop" ? "stop" : ""}" style="display:grid;grid-template-columns:150px 130px 1fr;gap:18px;align-items:center;padding:18px 22px;margin-left:${i * 22}px">
          <div><span class="badge ${k}">${name}</span></div>
          <div class="mono" style="font-size:22px;font-weight:700">${ms}</div>
          <div><p class="b" style="color:var(--ink);font-size:15px">${what}</p><p style="font-size:13px;color:var(--faint);margin-top:4px">${why}</p></div>
        </div>`).join("")}
    </div>
    <div class="card dark" style="padding:26px">
      <div class="lab" style="margin-top:0">What a delay costs, at 30 km/h</div>
      <table class="mono" style="margin-top:8px;font-size:15px">
        ${[[50, "100", "0.8"], [150, "300", "2.5"], [300, "600", "5.0"], [600, "1,200", "10.0"]].map(([one, rt, m]) => `<tr style="border-bottom:1px solid var(--cline)"><td style="padding:12px 0;color:var(--cdim)">${one} ms one way</td><td style="color:var(--cdim)">${rt} ms round trip</td><td style="text-align:right;font-weight:700;font-size:20px;color:${m > 4 ? "#FF5A47" : m > 2 ? "var(--amberf)" : "var(--mintf)"}">${m} m</td></tr>`).join("")}
      </table>
      <p class="b" style="margin-top:14px">How far the vehicle travels before a correction lands. The homepage lets you drag latency and speed and watch the allowed help change.</p>
      <div class="lab">The stop never waits</div>
      <p class="b">Driving and guiding are streams, not commands. If the stream stops for 600 ms (lost link, closed tab) the vehicle brakes itself. A latched Emergency stop opens a P1 incident ticket.</p>
    </div>
  </div>
</div>`;

/* ---------- Core flow: one help request ---------- */
const LANES = ["Vehicle", "Console", "Operator"];
const STEPS = [
  ["01 · Ask", ["auto", "Autonomy asks", "UNIT-14 stops behind a double-parked truck. Assist request, 5 kinds."], ["plain", "Alert", "Warning in the rail; the map flies to it. Critical alerts stay until acknowledged."], ["dash", "Notice", "Sam sees it without leaving the vehicle they’re watching."]],
  ["02 · See", ["auto", "Holds, still in autonomy", "Perception keeps reporting detections."], ["plain", "Camera + overlay", "Brackets, labels, distance and speed; the predicted path."], ["dash", "Read the scene", "Hover to bracket, or turn on Detections."]],
  ["03 · Guide", ["auto", "Follows guidance", "Path shifts up to 3 m; lapses 500 ms after release."], ["plain", "Guide, 10 Hz", "Hold to brake, Nudge left / right, labels for 15 min, Approve path."], ["dash", "Help without claiming", "Most requests end here, with autonomy still driving."]],
  ["04 · Claim", ["op", "Hands over", "Transitioning, then operator. Halo turns amber."], ["op", "You are driving", "Status bar tints amber. Drive stream at 20 Hz."], ["op", "Drive around", "Screen, gamepad, keyboard or the Wheel. Larger brake input always wins."]],
  ["05 · Release", ["auto", "Back on route", "Re-plans and continues. Release is refused more than 15 m off route."], ["plain", "Readback", "Each control shows what the vehicle confirmed, in ms."], ["dash", "Hold 1.2 s", "Release is a deliberate hold, on screen or on the Wheel."]],
];
const FLOW_HTML = `
<div id="c">
  <div class="eyebrow">Core user flow · one help request, start to finish</div>
  <h1>Help first, <em>take over last</em></h1>
  <p class="sub">The original station assumed every request meant a person driving. The prototype inverts that: guidance is the default, claiming is the exception, and the vehicle keeps its own safety net the whole time.</p>
  <div style="display:grid;grid-template-columns:120px repeat(5,1fr);gap:12px;margin-top:32px">
    <div></div>${STEPS.map(([h], i) => `<div class="mono" style="font-weight:700;font-size:13.5px;letter-spacing:.06em;text-transform:uppercase;padding:0 2px 4px;color:${i === 3 ? "var(--amber)" : "var(--ink)"}">${h}</div>`).join("")}
    ${LANES.map((lane, li) => `<div class="mono" style="font-size:13px;font-weight:700;color:var(--dim);align-self:center;text-transform:uppercase;letter-spacing:.08em">${lane}</div>${STEPS.map((s) => { const [k, b, t] = s[li + 1]; return `<div class="n ${k}" style="min-height:116px"><b>${b}</b>${t}</div>`; }).join("")}`).join("")}
  </div>
  <div style="display:grid;grid-template-columns:120px 3fr 2fr;gap:12px;margin-top:12px">
    <div></div>
    <div class="n auto" style="display:flex;align-items:center;gap:14px"><span class="badge auto">Autonomy</span><span>Steps 1–3: the vehicle never stops driving itself. Resolved by guiding, not claiming: 60% in the business-case model.</span></div>
    <div class="n op" style="display:flex;align-items:center;gap:14px"><span class="badge op">Operator</span><span>Steps 4–5: a person holds the vehicle.</span></div>
  </div>
  <div style="display:grid;grid-template-columns:120px 1fr;gap:12px;margin-top:12px">
    <div class="mono" style="font-size:13px;font-weight:700;color:var(--stop);align-self:center;text-transform:uppercase;letter-spacing:.08em">Always</div>
    <div class="n stop" style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px"><span><b>Emergency stop</b>Red cap on the Wheel, Esc, or STOP on screen, from any step. Opens a P1 ticket.</span><span><b>Watchdog</b>No drive input for 600 ms and the vehicle brakes to a stop on its own.</span><span><b>Policy</b>Only operators and managers drive; only the holder can drive or release.</span></div>
  </div>
</div>`;

/* ---------- Control state: one light, three surfaces ---------- */
const STATES_HTML = `
<div id="c">
  <div class="eyebrow">Interaction model · control state</div>
  <h1>State is a color, a word <em>and a shape</em></h1>
  <p class="sub">Whoever is driving must be obvious from the back of the room. Four states, each carried the same way on the Wheel’s halo, the console’s badge and the light strip on the vehicle itself, so they can never disagree.</p>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:20px;margin-top:32px">
    <div class="card" style="padding:28px">
      <div class="lab" style="margin-top:0">Who holds the vehicle</div>
      <div style="display:grid;grid-template-columns:1fr 70px 1fr 70px 1fr;align-items:center;margin-top:20px;row-gap:12px">
        <div class="n auto" style="text-align:center"><span class="badge auto">Autonomy</span><div style="margin-top:8px">Driving itself. Guidance allowed.</div></div>
        <div class="arrow mono" style="flex-direction:column;font-size:12px">Claim<span style="font-size:22px">→</span></div>
        <div class="n plain" style="text-align:center"><span class="badge tr">Transitioning</span><div style="margin-top:8px">Halo pulses at 900 ms until the vehicle confirms.</div></div>
        <div class="arrow mono" style="flex-direction:column;font-size:12px">confirmed<span style="font-size:22px">→</span></div>
        <div class="n op" style="text-align:center"><span class="badge op">Operator</span><div style="margin-top:8px">A person drives. Banner and tile go amber.</div></div>
        <div class="arrow mono" style="grid-column:1/-1;font-size:12.5px;gap:8px;padding-top:4px">← Release: hold 1.2 s, within 15 m of the route, back through transitioning to autonomy</div>
      </div>
      <div class="n stop" style="margin-top:20px;display:flex;align-items:center;gap:16px"><span class="badge stop">Stopped</span><span>From any state: Emergency stop, latched until reset. The only red on the console.</span></div>
    </div>
    <div class="card dark" style="padding:26px">
      <div class="lab" style="margin-top:0">Three surfaces, always in agreement</div>
      <table style="margin-top:6px;font-size:14.5px">
        ${[["Wheel", "LED halo inside the rim", "PMMA light guide, driven over WebHID report 0x01"], ["Console", "ControlState badge, tile border, status bar", "Same names, same colors, same 900 ms pulse"], ["Vehicle", "Halo strip on the body", "Visible to people on the street and in the camera"]].map(([w, a, b]) => `<tr style="border-bottom:1px solid var(--cline)"><td style="padding:14px 0;font-weight:700;width:110px">${w}</td><td style="padding:14px 8px"><div>${a}</div><div style="color:var(--cdim);font-size:13px;margin-top:3px">${b}</div></td></tr>`).join("")}
      </table>
      <div class="lab">Rules</div>
      <p class="b">Red means stop: the emergency stop, critical alerts and a lost link, never a delete button. Mint and amber also differ in lightness and always carry a word, so color is never the only signal.</p>
    </div>
  </div>
</div>`;

/* ---------- Commands: the console never sets vehicle state ---------- */
const CMD_HTML = `
<div id="c">
  <div class="eyebrow">Interaction model · commands and readback</div>
  <h1>The console never <em>sets vehicle state</em></h1>
  <p class="sub">Every button is a request. The console sends a command and then shows what the vehicle reports back, so the operator never mistakes intent for fact. The same trail feeds Engineering’s command audit and the regulator’s log.</p>
  <div class="card" style="margin-top:32px;padding:30px 30px 26px">
    <div style="display:grid;grid-template-columns:1fr 60px 1fr 60px 1fr 60px 1fr;align-items:center">
      <div class="n plain"><b>Sent</b>Operator presses Gear D. Outlined and pulsing in the segmented control.</div>
      <div class="arrow">→</div>
      <div class="n plain"><b>Server policy</b>Who may send what. “Claim the vehicle first.”</div>
      <div class="arrow">→</div>
      <div class="n plain"><b>Received</b>The vehicle acks, with milliseconds.</div>
      <div class="arrow">→</div>
      <div class="n auto"><b>Confirmed</b>The vehicle reports the new state. Now filled.</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 60px 1fr 60px 1fr 60px 1fr;margin-top:14px;align-items:start">
      <div></div><div></div>
      <div class="n op" style="font-size:13.5px"><b>Rejected by server</b>“Only operators and managers drive vehicles”</div><div></div>
      <div style="display:grid;gap:10px">
        <div class="n op" style="font-size:13.5px"><b>Rejected by vehicle</b>“Hold the brake to shift”</div>
        <div class="n stop" style="font-size:13.5px"><b>Failed</b>Actuator fault: “Wiper motor overcurrent (B1A20)”</div>
      </div>
      <div></div>
      <div class="n op" style="font-size:13.5px"><b>Timeout</b>No ack in 2.5 s</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px">
    <div class="card"><div class="lab" style="margin-top:0">Operator sees</div><p class="b">A readback line under every control: the latest status, its timing and the vehicle’s own words. Filled is reported; outlined is requested.</p></div>
    <div class="card"><div class="lab" style="margin-top:0">Engineering sees</div><p class="b">The full lifecycle of each command, ack and confirm p50 / p95 by command, and the vehicle’s own log events. Exports NDJSON.</p></div>
    <div class="card"><div class="lab" style="margin-top:0">Side effects</div><p class="b">An emergency stop opens a P1 incident ticket and a critical alert. A failed command raises a warning. The Log key saves a snapshot that can become a ticket.</p></div>
  </div>
</div>`;

/* ---------- Architecture ---------- */
const SYS_HTML = `
<div id="c">
  <div class="eyebrow">System architecture</div>
  <h1>One source of truth, <em>simulated end to end</em></h1>
  <p class="sub">A static web app with no server: the fleet simulator and the operations API run in the browser, so anyone can open the console and drive. Every simulated part sits behind the interface its real replacement will use.</p>
  <div style="display:grid;grid-template-columns:1fr 46px 1.35fr 46px 1fr;gap:0;margin-top:32px;align-items:stretch">
    <div style="display:grid;gap:12px">
      <div class="card dark"><div class="lab" style="margin-top:0">Hardware</div><h3>teleop Wheel</h3><p class="b" style="margin-top:6px">USB. Inputs read through the Gamepad API; halo (0x01) and haptics (0x02) written over WebHID. Contract in <span class="mono">wheel-hid.ts</span>.</p></div>
      <div class="card"><div class="lab" style="margin-top:0">Stand-ins</div><p class="b">Any standard gamepad, or the keyboard. Esc is always the emergency stop.</p></div>
      <div class="card"><div class="lab" style="margin-top:0">People</div><p class="b">Sign in by picking a person; roles decide which workspaces open.</p></div>
    </div>
    <div class="arrow">→</div>
    <div class="card" style="padding:22px">
      <div class="lab" style="margin-top:0">Console · React + design-system bundle</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
        <div class="n op"><b>Operator</b>Camera (three.js), route map, safety, drive strip</div>
        <div class="n plain"><b>Fleet</b>Overview, shifts, vehicles, people</div>
        <div class="n plain"><b>Engineering</b>Telemetry, logs, command audit, maintenance</div>
        <div class="n plain"><b>Support</b>Queue, playbooks, vehicle timeline, insights</div>
      </div>
      <div class="lab">Wire protocol</div>
      <div><span class="chip amber mono">drive · 20 Hz</span><span class="chip mint mono">guide · 10 Hz</span><span class="chip mono">cmd → ack → confirm</span><span class="chip mono">state · 10 / s</span><span class="chip info mono">alerts · logs</span></div>
      <div class="lab">Shared</div>
      <p class="b"><span class="mono">city.ts</span> generates one deterministic city (about 750 buildings, four arterials, the harbor) for the simulator, the camera and both maps, so every view matches.</p>
    </div>
    <div class="arrow">→</div>
    <div style="display:grid;gap:12px">
      <div class="card dark"><div class="lab" style="margin-top:0">Engine · in the page</div><p class="b"><span class="mono" style="color:var(--cink)">fleet.ts</span> policy, command lifecycle, alerts, logs, telemetry. <span class="mono" style="color:var(--cink)">api.ts</span> routes and rules. <span class="mono" style="color:var(--cink)">store.ts</span> localStorage.</p></div>
      <div class="card dark"><div class="lab" style="margin-top:0">10 simulated vehicles</div><p class="b">Physics, drive-by-wire, body, sensors, assist requests, faults and a cellular link with a weak zone under the harbor. 600 ms watchdog.</p></div>
    </div>
  </div>
  <div class="card" style="margin-top:16px;padding:20px 24px">
    <div class="lab" style="margin-top:0">Simulated today → real later</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:8px">
      ${[["Simulated vehicle", "Vehicle gateway; keep validate() and readback"], ["three.js camera", "WebRTC tracks per camera, overlay on top"], ["Generated city", "Real map data (OSM or HD maps)"], ["Pick a person", "SSO and sessions"], ["Engine in the browser", "A server running the same code, a database, a time-series and log store"]].map(([a, b]) => `<div class="n dash"><b>${a}</b>→ ${b}</div>`).join("")}
    </div>
  </div>
</div>`;

/* ---------- Service blueprint: one incident across the teams ---------- */
const BP_COLS = ["It happens", "It’s reported", "It’s worked", "It’s fixed", "It’s closed"];
const BP_ROWS = [
  ["Rider", "dash", ["UNIT-07 brakes hard near Civic Park. “I nearly fell.”", "Calls in by phone.", "", "", "Gets a reply that names the vehicle and stop."]],
  ["Support · Ruth, Jordan", "plain", ["", "Jordan logs a rider contact: Safety, P2. First reply due in 1 h.", "Ruth follows the Safety playbook: review the timeline, ask fleet, save footage.", "", "Resolves with an outcome code and a one-line summary."]],
  ["Fleet · Dana", "plain", ["", "", "Sees the ask in Needs attention.", "Takes UNIT-07 out of service; reassigns its route.", "Hands the ticket back."]],
  ["Engineering · Kenji", "plain", ["", "", "Ticket waits on engineering. Reads telemetry and the command audit.", "Opens a linked work order; the wiper fault (B1A20) is found too.", "Finishing the work order hands the ticket back automatically."]],
  ["Operator · Sam", "op", ["Watching UNIT-07; sees the alert.", "Presses Log: a snapshot that can become a ticket.", "", "", ""]],
  ["System", "dk", ["Vehicle events, commands and alerts logged.", "Ticket stamped with source and deadline.", "Shows 20 min before to 5 min after, plus live state and related tickets.", "Work order linked to ticket.", "Insights: first reply and resolution medians."]],
];
const BP_HTML = `
<div id="c">
  <div class="eyebrow">Service blueprint · one incident, five teams</div>
  <h1>Every ticket comes with <em>what the vehicle did</em></h1>
  <p class="sub">The original station stopped at the operator’s seat. Most of what goes wrong on a driverless run is resolved later, by people who weren’t watching. Support, Fleet and Engineering work the same record, and a ticket waits on whichever team holds it.</p>
  <div style="display:grid;grid-template-columns:190px repeat(5,1fr);gap:10px;margin-top:32px">
    <div></div>${BP_COLS.map((c) => `<div class="mono" style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;padding-bottom:4px">${c}</div>`).join("")}
    ${BP_ROWS.map(([lane, k, cells], ri) => `${ri === 5 ? `<div style="grid-column:1/-1;border-top:1.5px dashed var(--strong);margin:4px 0"></div>` : ""}<div style="font-size:14.5px;font-weight:700;align-self:center">${lane}</div>${cells.map((t) => (t ? `<div class="n ${k}" style="min-height:76px;font-size:13.5px">${t}</div>` : `<div class="n empty"></div>`)).join("")}`).join("")}
  </div>
  <div class="card" style="margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:18px 22px">
    ${[["P1", "15 min", "4 h"], ["P2", "1 h", "1 day"], ["P3", "4 h", "3 days"], ["P4", "24 h", "7 days"]].map(([p, f, r]) => `<div style="display:flex;gap:14px;align-items:center"><span class="chip ${p === "P1" ? "stop" : ""} mono" style="margin:0;font-weight:700">${p}</span><span style="font-size:14px;color:var(--dim)">first reply <b class="mono" style="color:var(--ink)">${f}</b> · resolve <b class="mono" style="color:var(--ink)">${r}</b></span></div>`).join("")}
  </div>
</div>`;

/* ---------- Information architecture ---------- */
const WS = [
  ["Operator", "op", ["Fleet list (mine · all)", "Camera + perception overlay", "Route map, heading-up", "Safety: Stop, Reset, Pull over, Approve path", "Drive strip", "Alert rail or toasts", "Wheel panel, my shift"]],
  ["Fleet", "", ["Overview: KPIs, live map, needs attention", "Shifts: week, hourly coverage vs 1:5", "Vehicles: assignment, service", "People"]],
  ["Engineering", "", ["Telemetry", "Logs (NDJSON)", "Command audit", "Maintenance + work orders", "Diagnostics", "Stations and wheels", "Support requests"]],
  ["Support", "", ["Queue: 9 views by deadline", "Ticket: playbook, conversation, vehicle timeline", "Other teams: engineering, fleet", "Insights"]],
];
const ROLE_NAMES = ["Operators", "Fleet manager", "Engineers", "Support"];
const IA_HTML = `
<div id="c">
  <div class="eyebrow">Information architecture</div>
  <h1>Four workspaces, <em>one top bar</em></h1>
  <p class="sub">Every person sees the same four tabs in the same order, Operator · Fleet · Engineer · Support, and lands on their own. A tab their role can’t use stays visible but disabled, so everyone knows where the other teams work.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px">
    ${WS.map(([name, k, pages]) => `
      <div class="card ${k === "op" ? "dark" : ""}" style="padding:22px">
        <h3 style="font-size:24px;font-style:italic;font-stretch:125%;font-weight:800">${name}</h3>
        <div style="margin-top:14px;display:grid;gap:8px">${pages.map((p) => `<div class="n ${k === "op" ? "dk" : "plain"}" style="padding:9px 12px;font-size:14px;${k === "op" ? "background:var(--c2)" : ""}">${p}</div>`).join("")}</div>
      </div>`).join("")}
  </div>
  <div class="card" style="margin-top:16px;padding:20px 24px">
    <div class="lab" style="margin-top:0">Who can open what</div>
    <table style="margin-top:6px;font-size:14.5px">
      <tr><td></td>${WS.map(([n]) => `<td class="mono" style="font-weight:700;padding:6px;text-align:center">${n}</td>`).join("")}</tr>
      ${ROLE_NAMES.map((r, ri) => `<tr style="border-top:1px solid var(--line)"><td style="padding:9px 0;font-weight:600;width:220px">${r}</td>${WS.map((w) => {
        // From WORKSPACES in teleop/software/src/App.tsx; 2 = operators see the queue and follow their own reports.
        const access = [
          [1, 1, 0, 2], [1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1],
        ][ri][WS.indexOf(w)];
        return `<td style="text-align:center">${access === 1 ? `<span class="chip mint" style="margin:0">Open</span>` : access === 2 ? `<span class="chip" style="margin:0">Report + follow own</span>` : `<span style="color:var(--faint)">disabled</span>`}</td>`;
      }).join("")}</tr>`).join("")}
    </table>
  </div>
</div>`;

/* ---------- Lineage: from a room to a wheel ---------- */
async function dataUri(file, extract, w = 900) {
  let img = sharp(file);
  if (extract) img = img.extract(extract);
  const buf = await img.resize(w).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}
async function lineageHtml() {
  const pod = await dataUri(BOARD, { left: 0, top: 4300, width: 1920, height: 1700 });
  const hex = await dataUri(BOARD, { left: 380, top: 6480, width: 1160, height: 1100 }, 600);
  const wheel = await dataUri(path.join(TELEOP, "hardware/out_v6/hero.png"), { left: 200, top: 100, width: 1200, height: 1000 });
  const room = await dataUri(path.join(TELEOP, "hardware/context/out/row.png"), null);
  const img = (src, h) => `<div style="height:${h}px;border-radius:10px;background:#fff url(${src}) center/cover no-repeat;border:1px solid var(--line)"></div>`;
  return `
<div id="c">
  <div class="eyebrow">Where it started · the station → the Wheel</div>
  <h1>From a room <em>to a wheel</em></h1>
  <p class="sub">The first concept was furniture: hexagonal pods with a curved windshield display, a red stop on the desk and a mint spine, tiling three to a cluster into a room. The rebuild kept the ideas that worked and moved them into a device and software that fit any desk.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px">
    <div class="card" style="padding:18px"><div class="lab" style="margin-top:0">Before · the station</div>
      <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:10px">${img(pod, 300)}${img(hex, 300)}</div>
      <p class="b" style="margin-top:12px">Built-in seat, display, wheel and pedals. Modular, but every seat is a construction project, and the design ends at the operator.</p></div>
    <div class="card dark" style="padding:18px"><div class="lab" style="margin-top:0">Now · the Wheel and the console</div>
      <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:10px">${img(wheel, 300)}${img(room, 300)}</div>
      <p class="b" style="margin-top:12px">A desktop Wheel and a windshield-size display on an ordinary desk, plus four workspaces for everyone behind the operator.</p></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    ${[["Kept", "mint", "The mint spine", "became the halo: one light that carries state, on the Wheel, on screen and on the vehicle."],
      ["Kept", "stop", "The red stop", "stays the only red: a domed cap you can hit without looking. Esc and on-screen STOP match it."],
      ["Kept", "", "The windshield view", "A 1.65 × 0.7 m display at a driver’s angle: 11° below to 19° above eye level."],
      ["Changed", "amber", "Driving → helping", "Most requests are a brake, a nudge or a label. Taking the wheel is the exception, so the console is built around guidance."]].map(([tag, k, h, t]) => `<div class="card"><span class="chip ${k}">${tag}</span><h3 style="margin-top:6px">${h}</h3><p class="b" style="margin-top:6px">${t}</p></div>`).join("")}
  </div>
</div>`;
}

/* ---------- The Wheel: a map of the faceplate ---------- */
async function wheelHtml() {
  const hub = await dataUri(path.join(TELEOP, "hardware/out_v6/hub.png"), null, 1100);
  const zones = [
    ["Left column", "Talk · Log · External speaker · D-pad (alerts; left/right switch cameras)"],
    ["Right column", "Claim vehicle (mint) · Release vehicle (hold 1.2 s) · Horn · Thumbstick (look; click acknowledges)"],
    ["Centre", "Emergency stop, a Ø28 domed cap in a Ø34 bezel · Hazard lights"],
    ["Behind", "Brake paddle left, throttle paddle right. On screen: your input dashed, the vehicle’s solid."],
    ["Rim", "Mint halo in a PMMA light guide; gum TPE grips with haptics that pulse for new warnings."],
    ["Base", "Tilts 15–35° in five detents; 5 N·m friction holds a resting hand. USB-C."],
  ];
  return `
<div id="c">
  <div class="eyebrow">Hardware · teleop Wheel v6</div>
  <h1>Controls you find <em>without looking</em></h1>
  <p class="sub">Eyes belong on the road view. Every control on the Wheel has one fixed name, used on the legend, on screen and in copy, and a twin in the console that behaves the same way: the same press, the same 1.2 s hold, the same colors.</p>
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-top:30px">
    <div style="border-radius:12px;background:#ddd url(${hub}) center/cover no-repeat;min-height:520px;border:1px solid var(--line)"></div>
    <div style="display:grid;gap:10px">${zones.map(([z, t]) => `<div class="card" style="padding:14px 18px;display:grid;grid-template-columns:120px 1fr;gap:12px"><div class="mono" style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em">${z}</div><p class="b" style="color:var(--ink);font-size:14.5px">${t}</p></div>`).join("")}</div>
  </div>
  <div class="legend"><span><i style="background:var(--mintf)"></i>Claim and the halo in autonomy</span><span><i style="background:var(--amberf)"></i>Halo while a person drives</span><span><i style="background:var(--stopf)"></i>Emergency stop only</span><span><i style="background:var(--gum)"></i>Gum grips, the one warm material</span></div>
</div>`;
}

async function render(p, html, file) {
  await p.setContent(`<!doctype html><html><head><style>${CSS}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

await mkdir(OUT, { recursive: true });
const ONLY = process.argv.slice(2);
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
const ALL = [
  ["diagram-why", () => WHY_HTML],
  ["diagram-people", () => PEOPLE_HTML],
  ["diagram-lineage", lineageHtml],
  ["diagram-latency", () => LADDER_HTML],
  ["diagram-ia", () => IA_HTML],
  ["flow-request", () => FLOW_HTML],
  ["diagram-states", () => STATES_HTML],
  ["diagram-commands", () => CMD_HTML],
  ["diagram-blueprint", () => BP_HTML],
  ["diagram-system", () => SYS_HTML],
  ["diagram-wheel", wheelHtml],
];
for (const [name, html] of ALL) {
  if (ONLY.length && !ONLY.includes(name)) continue;
  await render(tab, await html(), `${name}.png`);
}
await browser.close();
