import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

// Botanica is a Vite SPA; the production build in its own repo is what gets
// photographed, so the captures show shipping point budgets rather than a dev
// server's. Served locally because the project has no public deployment.
const DIST = "/Users/jonlanger/Documents/Projects/Botanica/dist";
const OUT = path.resolve("public/projects/botanica/_src");
const PORT = 4319;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

/** Static server with an SPA fallback, so /plant/<slug> resolves. */
function serve() {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    let file = path.join(DIST, decodeURIComponent(url.pathname));
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      if (path.extname(file)) {
        res.writeHead(404).end("not found");
        return;
      }
      const body = await readFile(path.join(DIST, "index.html"));
      res.writeHead(200, { "content-type": "text/html" }).end(body);
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const BASE = `http://localhost:${PORT}`;

async function shot(page, name, options = {}) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`), type: "png", ...options });
  console.log("saved", name);
}

/**
 * The plant is grown off the main thread and streamed in; the point-count
 * readout is the app's own signal that assembly finished.
 */
async function waitForPlant(page) {
  await page.waitForSelector("canvas");
  await page.getByText(/points · .* m specimen/).waitFor({ timeout: 180000 });
  await page.waitForTimeout(2500);
}

/**
 * Steps the guided tour forward and lets the camera flight land.
 *
 * Driven by the card's own Next arrow rather than by clicking a numbered marker:
 * the markers are drawn in the scene through drei's `Html`, and whichever one is
 * nearest the camera covers the rest for the hit test.
 */
async function nextCallout(page) {
  await page.getByRole("button", { name: "Next callout" }).click();
  await page.waitForTimeout(3800);
}

/**
 * Opens one accordion section in the species panel and scrolls it to the top of
 * the panel's own scroller, so the section's contents are what gets
 * photographed rather than the summary above it. Collapsed again afterwards.
 */
async function openSection(page, name, shotName) {
  const trigger = page.getByRole("button", { name });
  await trigger.click();
  await page.waitForTimeout(800);
  await trigger.evaluate((el) => {
    const scroller = el.closest("aside")?.firstElementChild;
    if (!scroller) return;
    scroller.scrollTop +=
      el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 8;
  });
  await page.waitForTimeout(600);
  await shot(page, shotName);
  await trigger.click();
  await page.waitForTimeout(400);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await serve();
  // Headed, deliberately: the detail page renders ten million points through a
  // real GPU path, and headless Chromium falls back to a software rasteriser
  // that cannot draw it.
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(90000);

  // 1. Home — the hero is the plant itself, spinning behind the headline.
  await page.goto(BASE, { waitUntil: "load" });
  await waitForHero(page);
  await shot(page, "01-home");
  await shot(page, "02-home-full", { fullPage: true });

  // 2. Catalog — every researched species, with the facets down the left.
  await page.goto(`${BASE}/catalog`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await shot(page, "03-catalog");

  await page.getByText("Asteraceae", { exact: false }).first().click();
  await page.waitForTimeout(1200);
  await shot(page, "04-catalog-filtered");

  // 3. Sunflower detail — the reference species, and the guided tour.
  await page.goto(`${BASE}/plant/helianthus-annuus`, { waitUntil: "load" });
  await waitForPlant(page);
  await shot(page, "05-detail-overview");

  // The tour runs in spec order; these four are the ones the case study uses —
  // the head, the golden angle, the ray florets, and the root system.
  const TOUR_SHOTS = {
    1: "06-callout-capitulum",
    2: "07-callout-golden-angle",
    5: "08-callout-ray-florets",
    14: "09-callout-roots",
  };
  for (let index = 1; index <= 14; index += 1) {
    await nextCallout(page);
    if (TOUR_SHOTS[index]) await shot(page, TOUR_SHOTS[index]);
  }

  // Back to the whole plant before photographing the panel, and put the tour
  // card away so the specimen is unobstructed behind it.
  await page.getByRole("button", { name: "Reset view" }).click();
  await page.waitForTimeout(4000);
  await page.getByRole("button", { name: "Close callout" }).click();
  await page.waitForTimeout(600);

  // 4. The panel's own evidence: the figures the model was built from, where
  //    the reference photographs were taken, and the licence behind each crop.
  await openSection(page, "Morphology", "10-morphology");
  await openSection(page, "Where it grows", "11-where-it-grows");
  await openSection(page, "Colour & credits", "16-colour-credits");

  // 5. Other archetypes — the same builder, four different morphologies.
  for (const [slug, name] of [
    ["papaver-rhoeas", "12-species-papaver"],
    ["digitalis-purpurea", "13-species-digitalis"],
    ["lavandula-angustifolia", "14-species-lavandula"],
    ["taraxacum-officinale", "15-species-taraxacum"],
  ]) {
    await page.goto(`${BASE}/plant/${slug}`, { waitUntil: "load" });
    await waitForPlant(page);
    await shot(page, name);
  }

  // 6. Phone pass — the panel becomes a bottom sheet, the tour a top card.
  //    The desktop context goes first: two ten-million-point clouds alive at
  //    once is more than the GPU will hand back a screenshot for.
  await context.close();
  const mobile = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const phone = await mobile.newPage();
  phone.setDefaultTimeout(90000);
  await phone.bringToFront();
  await phone.goto(`${BASE}/catalog`, { waitUntil: "load" });
  await phone.waitForTimeout(2500);
  await shot(phone, "m-01-catalog");
  await phone.goto(`${BASE}/plant/helianthus-annuus`, { waitUntil: "load" });
  await waitForPlant(phone);
  await shot(phone, "m-02-detail");

  await browser.close();
  server.close();
  console.log("done");
}

/** The home hero grows its own cloud; wait for the canvas to stop being blank. */
async function waitForHero(page) {
  await page.waitForSelector("canvas");
  await page.waitForTimeout(14000);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
