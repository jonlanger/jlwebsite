import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Petricor (petricorcloud.vercel.app) and pulls the product shots
 * and hardware renders the site already publishes.
 *
 * The demo's server state is shared by every visitor, so nothing here changes
 * it: the touchscreen run-setup steps come from the site's own /shots, and the
 * cloud captures only open pages, switch views and scrub timelines.
 *
 * Sign-in is a persona picker backed by POST /api/session, which intermittently
 * returns 500 — every request retries.
 *
 *   node scripts/capture-petricor.mjs          # everything
 *   node scripts/capture-petricor.mjs c h      # only names starting c / h
 */
const BASE = "https://petricorcloud.vercel.app";
const OUT = path.resolve("public/projects/petricor/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

const SHOTS = [
  "device-protocol", "device-samples", "device-printing", "device-scan", "device-load", "device-incubation", "device-dish",
  "cloud-overview", "cloud-run", "cloud-compare", "cloud-review", "cloud-report", "cloud-samples", "cloud-lab",
];
const RENDERS = [
  "hero_blue", "open_blue", "open", "exploded", "exploded_side", "section", "interior", "plates_top",
  "x_imaging", "x_carousel", "x_climate", "x_console", "x_insulation",
  "d_carousel", "d_culture", "d_culture_b", "d_scanner", "d_console",
];

async function download(url, file) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url);
    if (res.ok) return writeFile(file, Buffer.from(await res.arrayBuffer()));
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error(`download failed: ${url}`);
}

async function go(page, route, settle = 2500) {
  for (let i = 0; i < 8; i++) {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "load" });
    if (res && res.status() < 500) break;
    await page.waitForTimeout(2000);
  }
  await page.waitForTimeout(settle);
}

async function signIn(page, userId = "u_alex") {
  await go(page, "/login", 500);
  for (let i = 0; i < 15; i++) {
    const res = await page.request.post(`${BASE}/api/session`, { data: { userId } });
    if (res.ok()) return;
    await page.waitForTimeout(2000);
  }
  throw new Error("sign-in failed");
}

async function shot(page, name, { settle = 900, clip } = {}) {
  if (!wanted(name)) return;
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), clip });
  console.log("saved", name);
}

async function main() {
  await mkdir(path.join(OUT, "shots"), { recursive: true });
  await mkdir(path.join(OUT, "renders"), { recursive: true });

  if (wanted("shots")) for (const n of SHOTS) await download(`${BASE}/shots/${n}.jpg`, path.join(OUT, "shots", `${n}.jpg`));
  if (wanted("renders")) for (const n of RENDERS) await download(`${BASE}/renders/${n}.png`, path.join(OUT, "renders", `${n}.png`));

  // Headed: the dish views and mycelium lab are WebGL.
  const browser = await chromium.launch({ headless: false, args: ["--window-position=3000,0"] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // ---------- Marketing site ----------
  await go(page, "/", 4000);
  await shot(page, "h01-hero", { settle: 1500 });

  // ---------- Cloud ----------
  await signIn(page);

  await go(page, "/app/runs");
  await shot(page, "c01-runs");

  // A completed run: all six dishes under UV, then the review panel.
  await go(page, "/app/runs/run_air_0917", 4000);
  await page.getByRole("button", { name: "All six" }).click();
  await page.getByRole("button", { name: "UV 365 nm" }).click().catch(() => {});
  await shot(page, "c02-all-six-uv", { settle: 2500 });
  await page.getByRole("button", { name: "White" }).click().catch(() => {});
  await page.getByRole("button", { name: "growth" }).click().catch(() => {});
  await page.getByText("Review & sign-off", { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
  await shot(page, "c03-growth-review", { settle: 1500 });

  await go(page, "/app/settings");
  await page.getByText("Role permissions", { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
  await page.evaluate(() => window.scrollBy(0, -40));
  await shot(page, "c06-roles");

  await go(page, "/app/lab/rhizopus_stolonifer", 9000);
  await shot(page, "c07-lab-rhizopus", { settle: 2000 });

  // Species growth-model text (cardinal parameters) for render-petricor-diagrams.mjs.
  if (wanted("text")) {
    const out = {};
    for (const sp of ["aspergillus_niger", "penicillium_expansum"]) {
      await go(page, `/app/species/${sp}`, 2500);
      out[sp] = await page.locator("main").first().innerText();
    }
    await writeFile(path.join(OUT, "species.json"), JSON.stringify(out, null, 2));
    console.log("saved species.json");
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
