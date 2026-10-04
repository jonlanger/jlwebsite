import { chromium } from "playwright";
import path from "node:path";

/**
 * Draws the Petricor case-study diagrams as HTML and photographs them, in the
 * product's own palette (cool gray canvas, ink #0D0E11, indigo #3B44F6 with the
 * lavender #7C84FF accent, Geist + Reddit Mono) so they sit with the screens.
 *
 * Content comes from the live prototype (petricorcloud.vercel.app): its
 * personas, roles and permissions, protocols, run lifecycle and the cardinal
 * growth parameters it cites.
 *
 *   node scripts/render-petricor-diagrams.mjs
 */
const OUT = path.resolve("public/projects/petricor/_src");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Reddit+Mono:wght@400;500;600;700&display=swap');
  :root { --canvas:#F4F5F7; --surface:#fff; --sunken:#ECEEF2; --line:#DFE2E8; --strong:#A3A9B6; --ink:#0D0E11; --dim:#4B5160; --faint:#737A89;
    --indigo:#3B44F6; --indigo-ink:#2B33C9; --lav:#7C84FF; --indigo-soft:#EEEFFF; --indigo-100:#DCDEFF;
    --ok:#1E8E4A; --ok-soft:#DFF4E7; --warn:#8A5A00; --warn-soft:#FFF1D1; --bad:#C2341B; --bad-soft:#FDE5DF;
    --night:#0F1116; --night-2:#1A1D24; --night-line:#2C3039; --night-ink:#EEF0F4;
    --agar:#D9C48F; --niger:#3B44F6; --expansum:#E0663A; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--canvas); color:var(--ink); font-family:Geist,-apple-system,sans-serif; }
  #c { padding:56px 60px 60px; width:1600px; background:var(--canvas); }
  .mono { font-family:"Reddit Mono",ui-monospace,monospace; }
  h1 { font-family:"Reddit Mono",monospace; font-size:40px; font-weight:600; letter-spacing:-0.03em; line-height:1.1; }
  h1 em { font-style:normal; color:var(--indigo); }
  .eyebrow { font-family:"Reddit Mono",monospace; font-size:13px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--faint); margin-bottom:14px; }
  .sub { color:var(--dim); font-size:18px; margin-top:14px; max-width:1180px; line-height:1.5; }
  .card { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:20px 22px; }
  .card.night { background:var(--night); border-color:var(--night-line); color:var(--night-ink); }
  h3 { font-size:20px; font-weight:600; letter-spacing:-0.015em; }
  .lab { font-family:"Reddit Mono",monospace; font-size:11.5px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin:14px 0 6px; }
  .night .lab { color:#8C93A3; }
  p.b { font-size:15px; line-height:1.5; color:var(--dim); }
  .night p.b { color:#C2C7D2; }
  .chip { display:inline-flex; align-items:center; gap:6px; font-family:"Reddit Mono",monospace; font-size:12px; font-weight:500; padding:4px 9px; border-radius:6px; margin:0 6px 6px 0; }
  .chip.info { background:var(--indigo-soft); color:var(--indigo-ink); }
  .chip.ok { background:var(--ok-soft); color:#17663A; }
  .chip.warn { background:var(--warn-soft); color:var(--warn); }
  .chip.bad { background:var(--bad-soft); color:#9A2914; }
  .chip.dark { background:#262A33; color:#E3E6EC; }
  .chip.solid { background:var(--indigo); color:#fff; }
  .num { font-variant-numeric:tabular-nums; }
  .av { width:52px; height:52px; border-radius:50%; background:var(--indigo); color:#fff; display:flex; align-items:center; justify-content:center; font-family:"Reddit Mono",monospace; font-weight:600; font-size:16px; flex:none; }
  .arrow { color:var(--strong); font-size:22px; display:flex; align-items:center; justify-content:center; }
  .legend { display:flex; gap:22px; margin-top:26px; font-size:13.5px; color:var(--dim); }
  .legend i { display:inline-block; width:14px; height:14px; border-radius:4px; vertical-align:-2px; margin-right:7px; border:1.5px solid var(--line); background:var(--surface); }
`;

/* ---------- System: one instrument, two screens, one record ---------- */
const box = (k, t, d, cls = "") => `<div class="card ${cls}" style="padding:16px 18px"><div class="lab" style="margin-top:0">${k}</div><div style="font-weight:600;font-size:16.5px">${t}</div>${d ? `<p class="b" style="font-size:13.5px;margin-top:4px">${d}</p>` : ""}</div>`;
const SYSTEM_HTML = `
<div id="c">
  <div class="eyebrow">System architecture</div>
  <h1>One instrument, two screens, <em>one record</em></h1>
  <p class="sub">The run started on the PC-6 touchscreen is the same run reviewed in Petricor Cloud. Every capture, sample event and sign-off lands on one record, and leaves through open exports instead of a re-keyed spreadsheet.</p>
  <div style="display:grid;grid-template-columns:1.05fr 70px 1.25fr 70px 0.9fr;gap:0;margin-top:38px;align-items:stretch">
    <div class="card night" style="padding:24px">
      <div class="lab" style="margin-top:0">At the bench</div>
      <h3>PC-6 instrument</h3>
      <p class="b" style="margin-top:6px">Conditioned chamber, six-dish carousel, sealed imaging head.</p>
      <div style="display:grid;gap:10px;margin-top:16px">
        ${box("Console", "10.1″ touchscreen", "Badge in, protocol, samples, load, start.", "night")}
        ${box("Traceability", "Label printer + side reader", "One barcode per dish; foreign barcodes rejected.", "night")}
        ${box("Imaging", "4 light channels", "White · UV 365 nm · backlit · NIR 850 nm, on a schedule.", "night")}
        ${box("Climate", "25–30 °C · 80–85 % RH", "Peltier heat pump, atomiser, HEPA, reservoir.", "night")}
      </div>
    </div>
    <div class="arrow" style="flex-direction:column;gap:6px;font-size:12px;font-family:'Reddit Mono',monospace;color:var(--faint)"><span style="font-size:26px">⇄</span>telemetry<br>captures<br>events</div>
    <div class="card" style="padding:24px;border-top:4px solid var(--indigo)">
      <div class="lab" style="margin-top:0">In review</div>
      <h3>Petricor Cloud</h3>
      <p class="b" style="margin-top:6px">Runs, samples and instruments on one data layer, streamed live.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
        ${box("Fleet", "Live overview", "Instruments, runs, alerts, review queue.")}
        ${box("Analysis", "Timelapse + colony tracking", "Identity across frames: first seen, ⌀, radial rate.")}
        ${box("Comparison", "All six, same hour", "Any dish, any channel, side by side.")}
        ${box("Identification", "Presumptive IDs", "Classifier confidence, flagged for review.")}
        ${box("Quality", "Role-based sign-off", "Approve or request changes, with a note.")}
        ${box("Compliance", "Append-only audit trail", "Who did what, when, to which run.")}
      </div>
    </div>
    <div class="arrow" style="flex-direction:column;gap:6px;font-size:12px;font-family:'Reddit Mono',monospace;color:var(--faint)"><span style="font-size:26px">→</span>exports</div>
    <div style="display:grid;gap:12px;align-content:start">
      <div class="lab" style="margin-top:0">On record</div>
      ${box("Report", "Signed run report", "Every dish, count and composition. Print or PDF.")}
      ${box("LIMS", "CSV + JSON per run", "One row per colony: sample, barcode, ⌀, first seen, review status.")}
      ${box("Integrations", "Server-Sent Event stream", "Telemetry, captures, alerts, audit. Filter by device.")}
      ${box("Reference", "GBIF + Wikimedia Commons", "Taxonomy, occurrence and openly-licensed culture photos.")}
    </div>
  </div>
</div>`;

/* ---------- People, roles and permissions ---------- */
const PEOPLE = [
  ["SO", "Sam Ortiz", "Lab Technician", "technician", "Runs the bench: registers samples, prints labels, loads and starts runs.", "Fewer manual steps, and a machine that remembers which dish is where.", "The next physical step, one screen at a time"],
  ["AM", "Dr. Alex Morgan", "Senior Microbiologist", "microbiologist", "Owns QC: validates automated counts against manual practice and signs off.", "Counts that hold up in an audit, with manual and automated results in one place.", "A review queue and the whole timelapse"],
  ["ET", "Dr. Emily Thompson", "Senior Mycologist", "mycologist", "Reads morphology and confirms species on reference strains and isolates.", "Imaging across light channels, species references, growth rates.", "Colony tracking in four channels"],
  ["JM", "Dr. Jane Miller", "Environmental Mycologist", "mycologist", "Monitors air and surfaces in cleanrooms and production halls.", "Field-to-lab traceability and a trend by location.", "Air-monitoring runs and sample custody"],
  ["MB", "Dr. Michael Brown", "Lab Director", "director", "Accountable for throughput, compliance and the instrument fleet.", "Fleet status, audit readiness and who can do what.", "Fleet overview, roles and protocols"],
];
const PERMS = [
  ["Operate instruments (load, start, pause)", [1, 1, 1, 1]],
  ["Register samples", [1, 1, 1, 1]],
  ["Review & sign off results", [0, 1, 1, 1]],
  ["Edit protocols", [0, 1, 0, 1]],
  ["Manage users & integrations", [0, 0, 0, 1]],
];
const PEOPLE_HTML = `
<div id="c">
  <div class="eyebrow">Research archetypes → product roles</div>
  <h1>Five people, <em>one run</em>, different rights</h1>
  <p class="sub">The four researcher archetypes from interviews, plus the technician who does most of the bench work, became the prototype’s sign-in personas. Each sees the same run; what they can change depends on their role.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:34px">
    ${PEOPLE.map(([ini, name, title, role, job, need, opens], i) => `
      <div class="card ${i === 0 ? "night" : ""}" style="padding:22px">
        <div style="display:flex;align-items:center;gap:12px"><div class="av">${ini}</div><div><h3 style="font-size:17.5px">${name}</h3><div style="font-size:13px;opacity:.7;margin-top:2px">${title}</div></div></div>
        <div style="margin-top:14px"><span class="chip ${i === 0 ? "dark" : "info"}">${role}</span></div>
        <div class="lab">Job</div><p class="b" style="font-size:14px">${job}</p>
        <div class="lab">Needs</div><p class="b" style="font-size:14px;font-weight:600;color:${i === 0 ? "#fff" : "var(--ink)"}">${need}</p>
        <div class="lab">Lands on</div><p class="b" style="font-size:14px">${opens}</p>
      </div>`).join("")}
  </div>
  <div class="card" style="margin-top:22px;padding:22px 26px">
    <div class="lab" style="margin-top:0">Role permissions</div>
    <table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:15px">
      <tr style="font-family:'Reddit Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint)"><td style="padding:8px 0">Capability</td>${["Technician", "Microbiologist", "Mycologist", "Director"].map((r) => `<td style="text-align:center;width:150px">${r}</td>`).join("")}</tr>
      ${PERMS.map(([cap, v]) => `<tr style="border-top:1px solid var(--line)"><td style="padding:11px 0;font-weight:500">${cap}</td>${v.map((x) => `<td style="text-align:center;font-size:18px;color:${x ? "var(--indigo)" : "var(--strong)"}">${x ? "●" : "○"}</td>`).join("")}</tr>`).join("")}
    </table>
  </div>
</div>`;

/* ---------- Bench workflow: hands, touchscreen, cloud ---------- */
const FLOW_CSS = `
  .lanes { display:grid; grid-template-columns:170px repeat(7,1fr); gap:10px; margin-top:34px; }
  .lh { font-family:"Reddit Mono",monospace; font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); display:flex; flex-direction:column; justify-content:center; }
  .lh b { color:var(--ink); font-family:Geist,sans-serif; font-size:16px; letter-spacing:0; text-transform:none; font-weight:600; margin-bottom:2px; }
  .step { font-family:"Reddit Mono",monospace; font-size:12.5px; color:var(--indigo-ink); font-weight:600; padding:0 4px 4px; }
  .n { border-radius:12px; padding:13px 14px; font-size:14px; line-height:1.4; min-height:96px; }
  .n b { display:block; font-size:14.5px; margin-bottom:3px; }
  .n.hand { background:var(--surface); border:1.5px dashed var(--strong); color:var(--dim); }
  .n.hand b { color:var(--ink); }
  .n.screen { background:var(--night); color:#C9CED8; border:1px solid var(--night-line); }
  .n.screen b { color:#fff; }
  .n.cloud { background:var(--indigo-soft); color:var(--indigo-ink); border:1px solid var(--indigo-100); }
  .n.cloud b { color:var(--indigo-ink); }
  .n.gate { background:var(--bad-soft); color:#9A2914; border:1px solid #F5BFB2; }
  .n.empty { background:transparent; border:1px dashed transparent; }
`;
const BENCH = [
  // [step label, hand, screen, cloud]
  ["00 Badge in", ["Holds ID to the side reader", "Or taps their profile."], ["Tap your badge", "Clock, chamber °C and RH while idle."], null],
  ["01 Protocol", null, ["Choose a protocol", "°C, RH, duration, image interval and channels in one saved recipe."], ["Protocols", "Edited in Settings by microbiologists and directors."]],
  ["02 Samples", null, ["Assign samples", "Up to six from the bench queue, or register one on the spot."], ["Sample records", "Queue syncs from Cloud; new ones sync back."]],
  ["03 Print", ["Applies each label", "To the side wall of the dish base, not the lid."], ["Print dish labels", "One barcode per dish, linked to its sample."], null],
  ["04 Scan", ["Holds dish to the reader", "Window on the right side of the instrument."], ["Scan each dish", "Barcodes not in this run are rejected before loading.", "gate"], ["Custody event", "scanned · reader · operator"]],
  ["05 Load", ["Places dish, closes door", "Label facing out, lid on."], ["Place dish in position N", "Carousel turns each pocket to the door and highlights it."], ["Run created", "Six dishes, pocket by pocket."]],
  ["06 Incubate", null, ["Incubation", "Live °C / RH, next image set, every dish at a glance. Tap a dish to inspect."], ["Captures stream", "4 channels per set; colonies tracked from frame one."]],
];
const cell = (x, cls) => (x ? `<div class="n ${x[2] || cls}"><b>${x[0]}</b>${x[1]}</div>` : `<div class="n empty"></div>`);
const BENCH_HTML = `
<div id="c">
  <div class="eyebrow">User flow · PC-6 touchscreen</div>
  <h1>The machine state decides the screen</h1>
  <p class="sub">A run is a sequence of physical acts. The touchscreen only ever shows the next one, confirms it with the hardware (reader, carousel, door), and writes it to the sample record as it happens.</p>
  <div class="lanes">
    <div></div>${BENCH.map(([s]) => `<div class="step">${s}</div>`).join("")}
    <div class="lh"><b>Hands</b>at the bench</div>${BENCH.map((r) => cell(r[1], "hand")).join("")}
    <div class="lh"><b>Touchscreen</b>10.1″ console</div>${BENCH.map((r) => cell(r[2], "screen")).join("")}
    <div class="lh"><b>Cloud</b>same record</div>${BENCH.map((r) => cell(r[3], "cloud")).join("")}
  </div>
  <div class="legend">
    <span><i style="border-style:dashed;border-color:var(--strong)"></i>Physical action</span>
    <span><i style="background:var(--night);border-color:var(--night)"></i>Touchscreen screen</span>
    <span><i style="background:var(--indigo-soft);border-color:var(--indigo-100)"></i>Written to Petricor Cloud</span>
    <span><i style="background:var(--bad-soft);border-color:#F5BFB2"></i>Error-proofing gate</span>
  </div>
</div>`;

/* ---------- Review workflow: capture to signed report ---------- */
const REVIEW = [
  ["Capture", "Image set every 1–4 h, in white, UV 365, backlit and NIR 850.", "screen"],
  ["Detect", "Colonies segmented per frame: position, diameter, % of plate covered.", "cloud"],
  ["Track", "Each colony keeps its identity across frames: first-seen time and radial rate.", "cloud"],
  ["Identify", "Presumptive genus and species with classifier confidence. Never final.", "cloud"],
  ["Complete", "Incubation ends; the run joins the review queue as pending.", "cloud"],
];
const REVIEW_HTML = `
<div id="c">
  <div class="eyebrow">User flow · Petricor Cloud</div>
  <h1>From every frame to <em>a signed result</em></h1>
  <p class="sub">Review happens on the whole timelapse, not one photo at the end. Automation proposes; a qualified person decides, and the decision is recorded with their name and a note.</p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:34px">
    ${REVIEW.map(([t, d, k], i) => `<div class="n ${k}" style="min-height:140px;position:relative"><div class="mono" style="font-size:12px;opacity:.7;margin-bottom:6px">0${i + 1}</div><b style="font-size:17px">${t}</b>${d}</div>`).join("")}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:16px;margin-top:22px;align-items:stretch">
    <div class="card">
      <div class="lab" style="margin-top:0">06 Review</div>
      <h3>Open the run</h3>
      <p class="b" style="margin-top:6px">Scrub the timelapse, switch to All six, change channel, check each colony’s growth curve against the species model.</p>
      <div style="margin-top:12px"><span class="chip info">Single dish</span><span class="chip info">All six</span><span class="chip info">Detections</span><span class="chip info">Labels</span></div>
    </div>
    <div class="card" style="border-top:4px solid var(--indigo)">
      <div class="lab" style="margin-top:0">07 Decide · role-gated</div>
      <h3>Approve results, or request changes</h3>
      <p class="b" style="margin-top:6px">Microbiologists, mycologists and the director can sign off; technicians can run the instrument but not approve their own results.</p>
      <div style="display:flex;gap:10px;margin-top:14px">
        <div class="n cloud" style="flex:1;min-height:0"><b>Approve</b>“Counts within alert limits except Warehouse dock — trend flagged.”</div>
        <div class="n gate" style="flex:1;min-height:0"><b>Request changes</b>Back to the technician with the reason attached.</div>
      </div>
    </div>
    <div class="card night">
      <div class="lab" style="margin-top:0">08 Record</div>
      <h3>Everything leaves signed</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div><span class="chip dark">run.approve</span><span style="font-size:13.5px;color:#C2C7D2">append-only audit</span></div>
        <div><span class="chip dark">Report</span><span style="font-size:13.5px;color:#C2C7D2">per run, print / PDF</span></div>
        <div><span class="chip dark">CSV · JSON</span><span style="font-size:13.5px;color:#C2C7D2">one row per colony → LIMS</span></div>
        <div><span class="chip dark">/api/stream</span><span style="font-size:13.5px;color:#C2C7D2">live events</span></div>
      </div>
    </div>
  </div>
</div>`;

/* ---------- Chain of custody for one dish ---------- */
const CUSTODY = [
  ["Registered", "Sample record", "Lot 4471 — yogurt · product", "Cloud or touchscreen"],
  ["Printed", "Label PC00030423", "Linked to the sample record", "PC-6 printer"],
  ["Scanned", "Side reader", "Matched to this run, else rejected", "Bench B"],
  ["Loaded", "Pocket 1", "Carousel highlights the pocket", "Door closed"],
  ["Imaged", "61 sets × 4 channels", "Every 2 h for 120 h", "Imaging head"],
  ["Unloaded", "Run complete", "Dish leaves the instrument", "Sam Ortiz"],
  ["Reviewed", "Approve / changes", "Role-gated, with a note", "Microbiologist"],
  ["Reported", "Report + export", "CSV row per colony", "LIMS"],
];
const CUSTODY_HTML = `
<div id="c">
  <div class="eyebrow">Traceability</div>
  <h1>One barcode, <em>sample to report</em></h1>
  <p class="sub">Interviews kept returning to mislabelled and misplaced dishes. In Petricor every dish is traced by its printed barcode, and each hand-off is an event on the sample record rather than a line in a notebook.</p>
  <div style="display:flex;align-items:center;gap:14px;margin-top:30px">
    <div class="mono" style="background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px 14px;font-size:15px;font-weight:600;letter-spacing:.06em">▌▍▌▌▍▍▌▍▌ PC00030423</div>
    <div style="color:var(--dim);font-size:15px">Yeast &amp; mould — lots 4471/4472 · DRBC agar · 25 °C</div>
  </div>
  <div style="position:relative;margin-top:30px">
    <div style="position:absolute;left:30px;right:30px;top:15px;height:2px;background:var(--indigo-100)"></div>
    <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:12px;position:relative">
      ${CUSTODY.map(([ev, what, d, where], i) => `
        <div>
          <div style="width:32px;height:32px;border-radius:50%;background:${i >= 6 ? "var(--ink)" : "var(--indigo)"};color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Reddit Mono',monospace;font-size:13px;font-weight:600;margin-left:14px;box-shadow:0 0 0 6px var(--canvas)">${i + 1}</div>
          <div class="card" style="margin-top:16px;padding:16px;min-height:170px">
            <div class="mono" style="font-size:12.5px;color:var(--indigo-ink);font-weight:600;text-transform:lowercase">${ev.toLowerCase()}</div>
            <div style="font-weight:600;font-size:16px;margin-top:6px">${what}</div>
            <p class="b" style="font-size:13.5px;margin-top:4px">${d}</p>
            <div class="mono" style="font-size:12px;color:var(--faint);margin-top:10px">${where}</div>
          </div>
        </div>`).join("")}
    </div>
  </div>
  <div class="legend"><span><i style="background:var(--indigo);border-color:var(--indigo)"></i>Captured by the instrument, automatically</span><span><i style="background:var(--ink);border-color:var(--ink)"></i>A person’s decision, attributed</span></div>
</div>`;

/* ---------- Secondary research: cardinal growth model ---------- */
// Cardinal Model with Inflection (Rosso, Lobry & Flandrois 1993); parameters
// from Gougouli & Koutsoumanis 2010, as cited in the prototype's species pages.
const SPECIES = [
  { name: "Aspergillus niger", color: "var(--niger)", hex: "#3B44F6", Tmin: 10.13, Topt: 31.44, Tmax: 43.13, mu: 0.84 },
  { name: "Penicillium expansum", color: "var(--expansum)", hex: "#E0663A", Tmin: -5.74, Topt: 22.08, Tmax: 30.97, mu: 0.221 },
];
const cmi = ({ Tmin, Topt, Tmax, mu }, T) => {
  if (T <= Tmin || T >= Tmax) return 0;
  const g = ((T - Tmax) * (T - Tmin) ** 2) / ((Topt - Tmin) * ((Topt - Tmin) * (T - Topt) - (Topt - Tmax) * (Topt + Tmin - 2 * T)));
  return mu * 24 * g; // mm/day
};
const CW = 900, CH = 440, PL = 56, PB = 44, PT = 16, PR = 20;
const xs = (T) => PL + ((T + 10) / 55) * (CW - PL - PR); // −10 … 45 °C
const ys = (v) => PT + (1 - v / 22) * (CH - PT - PB); // 0 … 22 mm/day
const curve = (sp) => {
  const pts = [];
  for (let T = -10; T <= 45; T += 0.25) pts.push(`${xs(T).toFixed(1)},${ys(cmi(sp, T)).toFixed(1)}`);
  return `<polyline points="${pts.join(" ")}" fill="none" stroke="${sp.hex}" stroke-width="3" stroke-linejoin="round"/>`;
};
const CHART = `<svg width="${CW}" height="${CH}" style="display:block">
  ${[0, 5, 10, 15, 20].map((v) => `<line x1="${PL}" x2="${CW - PR}" y1="${ys(v)}" y2="${ys(v)}" stroke="#E4E7EC"/><text x="${PL - 10}" y="${ys(v) + 4}" text-anchor="end" font-family="Reddit Mono" font-size="12" fill="#737A89">${v}</text>`).join("")}
  ${[-10, 0, 10, 20, 30, 40].map((t) => `<text x="${xs(t)}" y="${CH - PB + 22}" text-anchor="middle" font-family="Reddit Mono" font-size="12" fill="#737A89">${t} °C</text>`).join("")}
  <rect x="${xs(25) - 1}" y="${PT}" width="2" height="${CH - PT - PB}" fill="#0D0E11" opacity=".55"/>
  <text x="${xs(25) + 8}" y="${PT + 14}" font-family="Reddit Mono" font-size="12" fill="#0D0E11">25 °C protocol</text>
  ${SPECIES.map(curve).join("")}
  ${SPECIES.map((sp) => { const v = cmi(sp, 25); return `<circle cx="${xs(25)}" cy="${ys(v)}" r="6" fill="${sp.hex}" stroke="#fff" stroke-width="2"/><text x="${xs(25) - 12}" y="${ys(v) - 10}" text-anchor="end" font-family="Reddit Mono" font-size="13" font-weight="600" fill="${sp.hex}">${v.toFixed(1)} mm/d</text>`; }).join("")}
  <line x1="${PL}" x2="${CW - PR}" y1="${ys(0)}" y2="${ys(0)}" stroke="#A3A9B6"/>
</svg>`;
const GROWTH_HTML = `
<div id="c">
  <div class="eyebrow">Secondary research · predictive mycology</div>
  <h1>Grounded in <em>published growth models</em></h1>
  <p class="sub">Rather than invent colony growth, the prototype models it. Radial growth follows the Cardinal Model with Inflection, driven by the chamber’s own temperature log, using cardinal temperatures fitted for real isolates. The same model tells a reviewer whether a reference strain grew as fast as it should have.</p>
  <div style="display:grid;grid-template-columns:${CW + 48}px 1fr;gap:20px;margin-top:32px">
    <div class="card" style="padding:22px 24px">
      <div class="lab" style="margin-top:0">Radial growth rate vs temperature · mm / day</div>
      ${CHART}
      <div style="display:flex;gap:24px;margin-top:6px;font-size:14px">${SPECIES.map((s) => `<span><i style="display:inline-block;width:18px;height:3px;background:${s.hex};vertical-align:4px;margin-right:8px"></i><em>${s.name}</em></span>`).join("")}</div>
    </div>
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card night">
        <div class="lab" style="margin-top:0">Model · CMI</div>
        <div class="mono" style="font-size:14px;line-height:1.7;color:#fff">μ(T) = μ<sub>opt</sub> · γ(T)</div>
        <div class="mono" style="font-size:12.5px;line-height:1.6;color:#C2C7D2;margin-top:6px">γ = (T−T<sub>max</sub>)(T−T<sub>min</sub>)² / ((T<sub>opt</sub>−T<sub>min</sub>)[(T<sub>opt</sub>−T<sub>min</sub>)(T−T<sub>opt</sub>) − (T<sub>opt</sub>−T<sub>max</sub>)(T<sub>opt</sub>+T<sub>min</sub>−2T)])</div>
        <p class="b" style="font-size:13px;margin-top:10px">Rosso, Lobry &amp; Flandrois 1993, J. Theor. Biol. 162:447–463.</p>
      </div>
      <div class="card" style="padding:18px 20px">
        <div class="lab" style="margin-top:0">Cardinal parameters</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px" class="num">
          <tr class="mono" style="font-size:11.5px;color:var(--faint)"><td></td><td>T<sub>min</sub></td><td>T<sub>opt</sub></td><td>T<sub>max</sub></td><td>μ<sub>opt</sub></td></tr>
          ${SPECIES.map((s) => `<tr style="border-top:1px solid var(--line)"><td style="padding:8px 0;color:${s.hex};font-weight:600"><em>${s.name.replace(/^(\w)\w+/, "$1.")}</em></td><td>${s.Tmin}</td><td>${s.Topt}</td><td>${s.Tmax}</td><td>${s.mu}</td></tr>`).join("")}
        </table>
        <p class="b" style="font-size:12.5px;margin-top:8px">°C and mm/h. Gougouli &amp; Koutsoumanis 2010, Int. J. Food Microbiol. 140:254–262; isolates from a yogurt production environment.</p>
      </div>
      <div class="card" style="padding:18px 20px">
        <div class="lab" style="margin-top:0">What it means at 25 °C</div>
        <p class="b" style="font-size:14px"><b style="color:var(--niger)">A. niger</b> covers a 90 mm dish in about five days. <b style="color:var(--expansum)">P. expansum</b>, near its optimum already, reaches about 60 mm in seven. A reference strain far off its curve is a QC finding, not a count.</p>
      </div>
    </div>
  </div>
</div>`;

/* ---------- Secondary research: protocols and the standards behind them ---------- */
const PROTOCOLS = [
  ["Yeast & mould enumeration", "DRBC agar · 25 °C · 85 % RH · 120 h · image /2 h", "ISO 21527-1", "Horizontal method for enumerating yeasts and moulds in food: DRBC agar, 25 °C, five days. Counts and presumptive genus per dish.", "Food & product QC"],
  ["Environmental air monitoring", "Sabouraud dextrose · 25 °C · 80 % RH · 168 h · /4 h", "EU GMP Annex 1 · ISO 14698", "Settle and active-air plates from classified rooms, read as a trend by location, with alert and action limits.", "Cleanrooms · pharma"],
  ["Reference strain QC", "Potato dextrose agar · 25 °C · 85 % RH · 96 h · /1 h", "ISO 11133", "Reference strains check that media and incubation perform. Radial growth rate is compared with the expected curve.", "Lab quality"],
  ["Clinical isolate culture", "Sabouraud dextrose · 30 °C · 85 % RH · 72 h · /2 h", "CLSI M54", "Primary culture of submitted isolates, read for morphology by a mycologist before any identification is reported.", "Clinical mycology"],
];
const STANDARDS_HTML = `
<div id="c">
  <div class="eyebrow">Secondary research · methods &amp; regulation</div>
  <h1>Four protocols, <em>four rulebooks</em></h1>
  <p class="sub">Each saved protocol on the PC-6 mirrors an established method, so the instrument fits the lab’s existing SOPs instead of asking for new ones. Across all of them, results are regulated electronic records.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:34px">
    ${PROTOCOLS.map(([name, recipe, std, why, ctx]) => `
      <div class="card" style="padding:22px;display:flex;flex-direction:column">
        <span class="chip info" style="align-self:flex-start">${ctx}</span>
        <h3 style="margin-top:8px">${name}</h3>
        <div class="mono" style="font-size:12.5px;color:var(--faint);margin-top:6px;line-height:1.5">${recipe}</div>
        <div class="lab">Method basis</div>
        <div class="mono" style="font-weight:600;font-size:15px;color:var(--indigo-ink)">${std}</div>
        <p class="b" style="font-size:14px;margin-top:8px">${why}</p>
      </div>`).join("")}
  </div>
  <div class="card night" style="margin-top:18px;padding:22px 26px;display:grid;grid-template-columns:260px 1fr 1fr 1fr;gap:26px;align-items:start">
    <div><div class="lab" style="margin-top:0">Data integrity</div><h3 style="color:#fff">21 CFR Part 11 · EU GMP Annex 11 · ALCOA+</h3></div>
    <div><div class="lab" style="margin-top:0">Attributable</div><p class="b" style="font-size:14px">Badge sign-in at the bench, persona-backed SSO in the cloud. Every event carries an actor.</p></div>
    <div><div class="lab" style="margin-top:0">Original &amp; enduring</div><p class="b" style="font-size:14px">Every frame is kept, not just the endpoint photo. The audit trail is append-only.</p></div>
    <div><div class="lab" style="margin-top:0">Signed</div><p class="b" style="font-size:14px">Sign-off is role-gated and recorded with a note; technicians cannot approve their own runs.</p></div>
  </div>
</div>`;

async function render(p, html, file) {
  await p.setContent(`<!doctype html><html><head><style>${CSS}${FLOW_CSS}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.locator("#c").screenshot({ path: path.join(OUT, file) });
  console.log("saved", file);
}

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await render(tab, SYSTEM_HTML, "diagram-system.png");
await render(tab, PEOPLE_HTML, "diagram-people.png");
await render(tab, CUSTODY_HTML, "diagram-custody.png");
await render(tab, GROWTH_HTML, "research-growth.png");
await render(tab, STANDARDS_HTML, "research-standards.png");
await render(tab, BENCH_HTML, "flow-bench.png");
await render(tab, REVIEW_HTML, "flow-review.png");
await browser.close();
