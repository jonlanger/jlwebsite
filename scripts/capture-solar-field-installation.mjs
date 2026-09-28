import { chromium } from "playwright";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs SolarSwarm (solarswarm.vercel.app) for the Automated Solar Field
 * case study, in its dark theme, and copies the Cycles renders from the
 * SolarSwarm repo next to them.
 *
 *   node scripts/capture-solar-field-installation.mjs        # everything
 *   node scripts/capture-solar-field-installation.mjs a m    # only names starting a / m
 */
const BASE = "https://solarswarm.vercel.app";
const RENDERS = path.resolve("../solarswarm/public/renders");
const OUT = path.resolve("public/projects/solar-field-installation/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

async function shot(page, name, { settle = 900 } = {}) {
  if (!wanted(name)) return;
  await page.evaluate(() => document.activeElement?.blur?.());
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("saved", name);
}

/** Scroll a section's top under the fixed nav. */
async function toSection(page, id, offset = 0) {
  await page.evaluate(
    ({ id, offset }) => {
      const el = document.getElementById(id);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
    },
    { id, offset }
  );
  await page.waitForTimeout(1500);
}

async function app(page, route, settle = 4000) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(settle);
}

async function tryShot(label, fn) {
  try {
    await fn();
  } catch (err) {
    console.warn(`  ! ${label}: ${err.message.split("\n")[0]}`);
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const r of ["hero", "studio", "onboarding", "gate", "formation", "array", "swap", "satellite", "detail_sensor", "detail_wheel"]) {
    if (!wanted(`r-${r}`)) continue;
    await copyFile(path.join(RENDERS, `${r}.jpg`), path.join(OUT, `r-${r}.jpg`));
    console.log("copied", `r-${r}`);
  }

  // Headed so the WebGL scenes render on the GPU.
  const browser = await chromium.launch({ headless: false, args: ["--window-position=3000,0", "--hide-scrollbars"] });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const page = await context.newPage();
  page.setDefaultTimeout(45000);

  // Marketing site
  await tryShot("marketing", async () => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(5000);
    await shot(page, "a01-hero", { settle: 1500 });
    await toSection(page, "deploy", -1000);
    await shot(page, "a02-problem");
    for (const [name, p] of [["a03-deploy-convoy", 0.02], ["a04-deploy-formation", 0.4], ["a05-deploy-track", 0.66], ["a06-deploy-swap", 0.86]]) {
      await page.evaluate((p) => {
        const el = document.getElementById("deploy");
        window.scrollTo(0, el.offsetTop + (el.offsetHeight - window.innerHeight) * p);
      }, p);
      await page.waitForTimeout(2500);
      await shot(page, name);
    }
    await toSection(page, "tracking");
    await shot(page, "a07-tracking", { settle: 2000 });
    await toSection(page, "robot");
    await shot(page, "a08-robot", { settle: 2500 });
    await toSection(page, "energy");
    await shot(page, "a09-energy");
    await toSection(page, "platform");
    await shot(page, "a10-audiences");
    await toSection(page, "ops");
    await shot(page, "a11-ops");
  });

  // Platform, one role at a time
  await tryShot("ops overview", async () => {
    await app(page, "/app?role=ops");
    await shot(page, "b01-ops-overview");
  });
  await tryShot("buyer overview", async () => {
    await app(page, "/app?role=buyer");
    await shot(page, "b02-buyer-overview");
  });
  await tryShot("lessor overview", async () => {
    await app(page, "/app?role=lessor");
    await shot(page, "b03-lessor-overview");
  });
  await tryShot("map", async () => {
    await app(page, "/app/map?role=ops", 7000);
    await shot(page, "b04-map");
  });
  await tryShot("robots", async () => {
    await app(page, "/app/robots");
    await shot(page, "b05-robots");
  });
  await tryShot("robot detail", async () => {
    await app(page, "/app/robots/SS-10238", 6000);
    await shot(page, "b06-robot-twin");
  });
  await tryShot("energy", async () => {
    await app(page, "/app/energy");
    await shot(page, "b07-energy");
  });
  await tryShot("maintenance", async () => {
    await app(page, "/app/maintenance");
    await shot(page, "b08-maintenance");
  });

  // Onboarding: choose site → map & size → register → infrastructure → deploy.
  // The fence is the same road-free lot as the showreel clip: west of the dirt
  // access track at the default Barstow site, its east side parallel to the track.
  // Offsets are CSS px from the map's centre, which opens on the site at a fixed zoom.
  const LOT = [[-301.5, -191], [48.5, -191], [-26.5, 164], [-301.5, 164]];
  await tryShot("onboarding", async () => {
    await app(page, "/app/onboarding");
    await shot(page, "c01-onboard-site", { settle: 2500 });
    await page.getByRole("button", { name: /^Continue/ }).click();
    await page.waitForTimeout(7000); // sub-metre imagery
    const map = await page.locator(".maplibregl-canvas").last().boundingBox();
    const cx = map.x + map.width / 2, cy = map.y + map.height / 2;
    for (const [dx, dy] of [...LOT, LOT[0]]) {
      await page.mouse.click(cx + dx, cy + dy);
      await page.waitForTimeout(400);
    }
    await page.waitForTimeout(2500);
    await shot(page, "c02-onboard-map");
    await page.getByRole("button", { name: /^Order .* units/ }).click();
    await page.waitForTimeout(1200);
    await page.getByRole("button", { name: /Scan manifest/ }).click();
    await page.getByRole("button", { name: "All paired" }).waitFor();
    await shot(page, "c03-onboard-register");
    await page.getByRole("button", { name: /^Continue/ }).click();
    await page.waitForTimeout(3000);
    await shot(page, "c04-onboard-infra");
    await page.getByRole("button", { name: /^Continue/ }).click();
    await page.getByRole("button", { name: /Commission array/ }).waitFor({ timeout: 60000 });
    await page.waitForTimeout(1500);
    await shot(page, "c05-onboard-deploy");
  });

  // Phones
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark" });
  const m = await phone.newPage();
  m.setDefaultTimeout(45000);
  await tryShot("m1", async () => {
    await app(m, "/app?role=buyer");
    await shot(m, "m1-overview");
  });
  await tryShot("m2", async () => {
    await app(m, "/app/energy");
    await shot(m, "m2-energy");
  });
  await tryShot("m3", async () => {
    await app(m, "/app/robots/SS-10238", 6000);
    await shot(m, "m3-twin");
  });

  await browser.close();
}

await main();
