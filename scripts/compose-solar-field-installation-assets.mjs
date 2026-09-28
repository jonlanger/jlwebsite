import sharp from "sharp";
import path from "node:path";

/**
 * Turns the SolarSwarm captures, renders and diagrams in _src into the
 * Automated Solar Field case-study images.
 * Run scripts/capture-solar-field-installation.mjs and
 * render-solar-field-installation-diagrams.mjs first.
 */
const SRC = path.resolve("public/projects/solar-field-installation/_src");
const OUT = path.resolve("public/projects/solar-field-installation");
const BG = "#15131c"; // graphite-900, a step above the app background

// capture name -> published name (16:10 screens)
const SLIDES = {
  "a01-hero": "site-hero",
  "a02-problem": "site-problem",
  "a03-deploy-convoy": "deploy-convoy",
  "a04-deploy-formation": "deploy-formation",
  "a05-deploy-track": "deploy-track",
  "a06-deploy-swap": "deploy-swap",
  "a07-tracking": "site-tracking",
  "a08-robot": "site-robot",
  "a09-energy": "site-energy",
  "a10-audiences": "site-audiences",
  "a11-ops": "site-ops",
  "b01-ops-overview": "app-ops",
  "b02-buyer-overview": "app-buyer",
  "b03-lessor-overview": "app-lessor",
  "b04-map": "app-map",
  "b05-robots": "app-robots",
  "b06-robot-twin": "app-twin",
  "b07-energy": "app-energy",
  "b08-maintenance": "app-maintenance",
  "c01-onboard-site": "onboard-site",
  "c02-onboard-map": "onboard-map",
  "c03-onboard-register": "onboard-register",
  "c04-onboard-infra": "onboard-infra",
  "c05-onboard-deploy": "onboard-deploy",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Cycles renders, 16:9 at 1800 wide (squares and 4:3 keep their shape).
for (const name of ["hero", "onboarding", "gate", "formation", "array", "swap", "studio", "detail_sensor", "detail_wheel", "satellite"]) {
  const out = `render-${name.replace("_", "-")}`;
  await sharp(path.join(SRC, `r-${name}.jpg`)).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Grid card: the hero render, 16:9.
await sharp(path.join(SRC, "r-hero.jpg")).resize(1280, 720).webp({ quality: 86 }).toFile(path.join(OUT, "solar-field-installation_card.webp"));
console.log("solar-field-installation_card");

// Diagrams: PNG -> WebP at the same size.
for (const name of ["diagram-baseline", "diagram-stakeholders", "diagram-personas", "diagram-landscape", "diagram-journey", "diagram-deploy", "diagram-architecture"]) {
  await sharp(path.join(SRC, `${name}.png`)).webp({ quality: 90 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(name);
}

// Three phones side by side.
const PHONES = ["m1-overview", "m2-energy", "m3-twin"];
const PH = 1100, GAP = 70, PAD = 90;
const phones = await Promise.all(
  PHONES.map(async (name) => {
    const { data, info } = await sharp(path.join(SRC, `${name}.png`)).resize({ height: PH }).png().toBuffer({ resolveWithObject: true });
    const mask = Buffer.from(`<svg width="${info.width}" height="${PH}"><rect width="${info.width}" height="${PH}" rx="44" ry="44"/></svg>`);
    const buf = await sharp(data).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    return { buf, width: info.width };
  })
);
const W = PAD * 2 + phones.reduce((a, p) => a + p.width, 0) + GAP * (phones.length - 1);
let x = PAD;
const layers = phones.map((p) => {
  const l = { input: p.buf, left: x, top: PAD };
  x += p.width + GAP;
  return l;
});
await sharp({ create: { width: W, height: PH + PAD * 2, channels: 3, background: BG } }).composite(layers).webp({ quality: 88 }).toFile(path.join(OUT, "mobile.webp"));
console.log("mobile", W, PH + PAD * 2);

// Design system: each /design-system section (scripts/capture-solar-field-installation-design.mjs),
// cropped where a section is tall and set on the page's own background at 16:10.
const DS = path.join(SRC, "design");
const FRAME = { w: 1800, h: 1125, pad: 70 };
// published name -> [capture, top, height, width] in CSS px (captures are @2x); no crop when omitted
const DS_SLIDES = {
  "ds-intro": ["dark-intro"],
  "ds-brand": ["dark-brand"],
  "ds-color": ["dark-color"],
  "ds-semantic": ["dark-semantic"],
  "ds-semantic-light": ["light-semantic"],
  "ds-data": ["dark-data"],
  "ds-type": ["dark-type"],
  "ds-components": ["dark-components", 0, 515],
  "ds-components-nav": ["dark-components", 515, 285],
  "ds-components-stepper": ["dark-components", 800, 222, 620], // a half-width card
  "ds-components-light": ["light-components", 0, 1025],
  "ds-radius": ["dark-radius"],
  "ds-renders": ["dark-renders"],
};
for (const [out, [src, top, height, width]] of Object.entries(DS_SLIDES)) {
  let img = sharp(path.join(DS, `${src}.png`));
  const meta = await img.metadata();
  if (top !== undefined) img = img.extract({ left: 0, top: top * 2, width: width ? width * 2 : meta.width, height: Math.min(height * 2, meta.height - top * 2) });
  const buf = await img.png().toBuffer();
  // The page's own background (sections start with a border rule, so don't sample a corner).
  const bg = src.startsWith("light") ? "#f7f5f2" : "#0b0a10";
  const fitted = await sharp(buf).resize(FRAME.w - FRAME.pad * 2, FRAME.h - FRAME.pad * 2, { fit: "inside" }).toBuffer();
  await sharp({ create: { width: FRAME.w, height: FRAME.h, channels: 3, background: bg } })
    .composite([{ input: fitted, gravity: "center" }])
    .webp({ quality: 90 })
    .toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}
