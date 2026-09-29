import sharp from "sharp";
import path from "node:path";

/**
 * Turns the CoCo captures in _src into case-study images.
 * Run scripts/capture-coco.mjs and render-coco-diagrams.mjs first.
 */
const SRC = path.resolve("public/projects/coco/_src");
const OUT = path.resolve("public/projects/coco");
const BG = "#E9ECF1"; // a step below the app canvas, so light and field screens both keep an edge

// capture name -> published name
const SLIDES = {
  "h01-hero": "site-hero",
  "h02-platform": "site-platform",
  "h03-story": "site-story",
  "h04-outcomes": "site-outcomes",
  "h05-features": "site-features",
  "h06-roles": "site-roles",
  "h07-research": "site-research",
  "h08-login": "site-login",
  "c01-welcome": "customer-welcome",
  "c02-home": "customer-home",
  "c03-request-type": "customer-request-type",
  "c04-request-photo": "customer-request-photo",
  "c05-request-confirm": "customer-request-confirm",
  "c06-track": "customer-track",
  "c07-pickups": "customer-pickups",
  "c08-guide": "customer-guide",
  "c09-track-here": "customer-track-here",
  "c10-track-done": "customer-track-done",
  "d01-login": "driver-login",
  "d02-pretrip": "driver-pretrip",
  "d04-drive": "driver-drive",
  "d05-stops": "driver-stops",
  "d06-messages": "driver-messages",
  "d07-vehicle": "driver-vehicle",
  "d08-shift": "driver-shift",
  "d09-stops-at-stop": "driver-stops-at-stop",
  "k01-onboard": "collector-onboard",
  "k02-queue": "collector-queue",
  "k03-stop": "collector-stop",
  "k04-scan": "collector-scan",
  "k05-confirm": "collector-confirm",
  "k06-problem": "collector-problem",
  "k07-me": "collector-me",
  "f01-overview": "fleet-overview",
  "f02-fleet": "fleet-table",
  "f03-truck": "fleet-truck",
  "f04-pickups": "fleet-pickups",
  "f05-maintenance": "fleet-maintenance",
  "f06-compliance": "fleet-compliance",
  "f07-incident": "fleet-incident",
  "s01-ds-intro": "ds-intro",
  "s02-ds-color": "ds-color",
  "s03-ds-status": "ds-status",
  "s04-ds-type": "ds-type",
  "s05-ds-buttons": "ds-buttons",
  "s06-ds-cards": "ds-cards",
  "s07-ds-tracker": "ds-tracker",
  "s08-ds-field": "ds-field",
  "s09-ds-changelog": "ds-changelog",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Grid card: the homepage hero, 16:9.
await sharp(path.join(SRC, "h01-hero.png")).resize(1280, 720, { position: "top" }).webp({ quality: 86 }).toFile(path.join(OUT, "coco_card.webp"));
console.log("coco_card");

// Diagrams: PNG -> WebP at the same size.
for (const name of ["diagram-personas", "diagram-handoffs", "diagram-priorities", "diagram-architecture", "flow-customer", "flow-driver", "flow-collector", "flow-fleet"]) {
  await sharp(path.join(SRC, `${name}.png`)).webp({ quality: 90 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(name);
}

// First-concept (v1 Figma) screens, 1920×1080 PNGs in /projects -> WebP.
const V1 = {
  "Customer Splash Screens -  Hero .png": "v1-customer-splash",
  "Customer Sceens.png": "v1-customer-screens",
  "Customer New Pick Up Request - Hero.png": "v1-customer-request",
  "Driver_Dashboard.png": "v1-driver-dashboard",
  "Driver Route and List Screens -  Hero .png": "v1-driver-route",
  "Driver Onboarding Screens -  Hero .png": "v1-driver-onboarding",
  "Collector Onboarding Screens -  Hero.png": "v1-collector-onboarding",
  "Collector Feature Screens -  Hero.png": "v1-collector-features",
  "Fleet Manager - Collection Overview Screens - Hero.png": "v1-fleet-collection",
  "Fleet Manager - Fleet Overview Screens - Hero.png": "v1-fleet-overview",
};
for (const [src, out] of Object.entries(V1)) {
  await sharp(path.resolve("public/projects", src)).resize(1920, 1080, { fit: "cover" }).webp({ quality: 86 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

/** Phones side by side on one canvas. */
async function phones(names, out) {
  const PH = 1100, GAP = 60, PAD = 80;
  const shots = await Promise.all(
    names.map(async (name) => {
      const { data, info } = await sharp(path.join(SRC, `${name}.png`)).resize({ height: PH }).png().toBuffer({ resolveWithObject: true });
      const mask = Buffer.from(`<svg width="${info.width}" height="${PH}"><rect width="${info.width}" height="${PH}" rx="36" ry="36"/></svg>`);
      const buf = await sharp(data).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
      return { buf, width: info.width };
    })
  );
  const W = PAD * 2 + shots.reduce((a, p) => a + p.width, 0) + GAP * (shots.length - 1);
  let x = PAD;
  const layers = shots.map((p) => {
    const l = { input: p.buf, left: x, top: PAD };
    x += p.width + GAP;
    return l;
  });
  await sharp({ create: { width: W, height: PH + PAD * 2, channels: 3, background: BG } }).composite(layers).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out, W, PH + PAD * 2);
}

// One phone per role, and the driver's route briefing (its desktop layout is not used).
await phones(["m1-customer", "m2-driver", "m3-collector", "m4-fleet"], "mobile");
await phones(["m0-driver-route", "m2-driver"], "driver-mobile");
