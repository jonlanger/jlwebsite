import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://fluidsim-gamma.vercel.app";
const OUT = path.resolve("public/projects/fluidsim/_src");

// The sim renders through three.js WebGPURenderer; headless Chromium needs the
// WebGPU flags, and the swarm needs a few seconds to settle into a shape worth
// photographing.
const LAUNCH_ARGS = ["--enable-unsafe-webgpu", "--enable-features=Vulkan,WebGPU"];
const SETTLE_MS = 7000;

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log("saved", name);
}

/**
 * Collapse an open panel. Both panels label their toggle "Hide", so scope the
 * lookup by the panel heading to pick the right one.
 */
async function collapsePanel(page, panel) {
  await page
    .locator("div")
    .filter({ hasText: new RegExp(`^${panel}Hide$`) })
    .getByRole("button")
    .first()
    .click();
  await page.waitForTimeout(500);
}

/** A collapsed panel reduces to a pill button labelled with the panel name. */
async function expandPanel(page, panel) {
  await page.getByRole("button", { name: panel, exact: true }).click();
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true, args: LAUNCH_ARGS });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForSelector("canvas");
  await page.waitForTimeout(SETTLE_MS);

  // 1. Full interface — both control panels open over the live swarm.
  await shot(page, "01-full");

  // 2. Simulation panel alone: parameters + attractor controls.
  await collapsePanel(page, "Flow & Export");
  await shot(page, "02-simulation-panel");

  // 3. Clean canvas — both panels collapsed, just the particle field.
  await collapsePanel(page, "Simulation");
  await page.waitForTimeout(2500);
  await shot(page, "03-clean");

  // 4. Record a clip so the timeline and Main Flow panel hold real data.
  await expandPanel(page, "Flow & Export");
  await page.getByRole("button", { name: /Record/ }).click();
  await page.waitForTimeout(6000);
  await page.getByRole("button", { name: /Record|Stop/ }).first().click();
  await page.waitForTimeout(2500);
  await shot(page, "04-recorded-clip");

  // 5. Analyze the clip — buckets every tracked particle into a voxel grid and
  //    isolates the main flow. This is the step the export depends on.
  await page.getByRole("button", { name: "Analyze", exact: true }).click();
  await page.waitForTimeout(9000);
  await shot(page, "05-main-flow");

  // 6. Scroll the panel to the export controls, now backed by a real clip.
  await page
    .getByText("Export", { exact: true })
    .last()
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await shot(page, "06-export");

  await browser.close();
  console.log("done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
