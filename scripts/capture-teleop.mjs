import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs teleop (teleoperate.vercel.app): the four workspaces (Operator,
 * Fleet, Engineering, Support) in both themes, and the marketing homepage.
 * The fleet simulator and its API run in each visitor's browser, so nothing
 * here touches anyone else's data.
 *
 *   node scripts/capture-teleop.mjs            # everything
 *   node scripts/capture-teleop.mjs op site    # only names starting op / site
 */
const BASE = "https://teleoperate.vercel.app";
const OUT = path.resolve("public/projects/teleoperation-station/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));
const VP = { width: 1600, height: 1000 };

const STILL = `*,*::before,*::after{animation-delay:0s!important;transition:none!important;caret-color:transparent!important}`;

async function shot(page, name, opts = {}) {
  if (!wanted(name)) return;
  await page.addStyleTag({ content: STILL }).catch(() => {});
  if (opts.scrollTo) {
    await page.locator(opts.scrollTo).first().evaluate((el, off) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off), opts.offset ?? 0);
  }
  await page.mouse.move(VP.width - 2, VP.height - 2);
  await page.waitForTimeout(opts.settle ?? 900);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("saved", name);
}

/** Sign in as a seeded person by writing the session the person picker writes. */
async function as(page, userId, theme, route) {
  await page.evaluate(([u, t]) => {
    localStorage.setItem("teleop.session", JSON.stringify({ userId: u, station: "ST-01", theme: t, keyboardDrive: true, vehiclesOpen: true, alertsOpen: true }));
  }, [userId, theme]);
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(route.startsWith("/operate") ? 6000 : 2500);
}

/** Pick the vehicle that's asking for help (or the first one) in the operator's fleet list. */
async function pickVehicle(page) {
  const all = page.locator(".col .spread").getByText("All", { exact: true }).first();
  if (await all.isVisible().catch(() => false)) await all.click().catch(() => {});
  await page.waitForTimeout(500);
  const tiles = page.locator(".tile-wrap > :first-child");
  const n = await tiles.count();
  for (let i = 0; i < n; i++) {
    const text = await tiles.nth(i).innerText().catch(() => "");
    if (/help|assist|held|stopped|waiting/i.test(text)) { await tiles.nth(i).click(); await page.waitForTimeout(2500); return text.split("\n")[0]; }
  }
  if (n) { await tiles.first().click(); await page.waitForTimeout(2500); }
  return null;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--ignore-gpu-blocklist"] });

  // ---------- Workspaces ----------
  if (wanted("op") || wanted("fleet") || wanted("eng") || wanted("sup")) {
    const ctx = await browser.newContext({ viewport: VP, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?reset`, { waitUntil: "domcontentloaded" });
    // Let the simulator run so vehicles spread out and some ask for help.
    await page.waitForTimeout(Number(process.env.WARM ?? 25000));

    if (wanted("op")) {
      await as(page, "u_sam", "dark", "/operate");
      await pickVehicle(page);
      await shot(page, "op-console");
      // Guide without claiming: outline everything perception sees.
      const det = page.getByRole("button", { name: "Detections" }).first();
      if (await det.isVisible().catch(() => false)) { await det.click(); await page.waitForTimeout(800); }
      await shot(page, "op-detections");
      if (await det.isVisible().catch(() => false)) await det.click();
      // Claim: the console turns amber while a person drives.
      const claim = page.getByRole("button", { name: "Claim vehicle" }).first();
      if (await claim.isVisible().catch(() => false)) {
        await claim.click();
        await page.waitForTimeout(2500);
        await shot(page, "op-claimed");
        await page.mouse.wheel(0, 700);
        await shot(page, "op-controls", { settle: 1200 });
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await as(page, "u_sam", "light", "/operate");
      await pickVehicle(page);
      await shot(page, "op-light");
    }

    for (const [name, user, route] of [
      ["fleet-overview", "u_dana", "/fleet"],
      ["fleet-shifts", "u_dana", "/fleet/shifts"],
      ["fleet-vehicles", "u_dana", "/fleet/vehicles"],
      ["eng-telemetry", "u_kenji", "/eng/telemetry"],
      ["eng-maintenance", "u_kenji", "/eng/maintenance"],
      ["eng-stations", "u_kenji", "/eng/stations"],
      ["sup-queue", "u_ruth", "/support?view=inbox"],
      ["sup-insights", "u_ruth", "/support/insights"],
    ]) {
      if (!wanted(name)) continue;
      await as(page, user, "dark", route);
      await shot(page, name);
    }
    // A ticket: playbook, conversation and what the vehicle did.
    if (wanted("sup-ticket")) {
      await as(page, "u_ruth", "dark", "/support?view=inbox");
      const row = page.locator("tr.click").filter({ hasText: "UNIT-" }).first();
      await row.click().catch(() => {});
      await page.waitForTimeout(2500);
      await shot(page, "sup-ticket");
    }
    if (wanted("fleet-light")) {
      await as(page, "u_dana", "light", "/fleet");
      await shot(page, "fleet-light");
    }
    await ctx.close();
  }

  // ---------- Marketing homepage ----------
  if (wanted("site")) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/about`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(9000);
    await shot(page, "site-hero", { settle: 1500 });
    for (const id of ["why", "who", "value", "product", "tech", "hardware"]) {
      await shot(page, `site-${id}`, { scrollTo: `#${id}`, offset: 0, settle: 2500 });
    }
    await ctx.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
