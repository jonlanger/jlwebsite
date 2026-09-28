import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs CoCo (collabcollect.vercel.app): the homepage, the four role
 * apps and the design system.
 *
 * Every app shares one localStorage store, so each capture sets the story up
 * by importing the app's own store module and calling its actions (the crew
 * advances, the driver arrives, the collector scans) rather than clicking
 * through every step.
 *
 *   node scripts/capture-coco.mjs          # everything
 *   node scripts/capture-coco.mjs c f      # only names starting c / f
 */
const BASE = "https://collabcollect.vercel.app";
const OUT = path.resolve("public/projects/coco/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

async function shot(page, name, { full = false, settle = 900 } = {}) {
  if (!wanted(name)) return;
  await page.evaluate(() => document.activeElement?.blur?.());
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
  console.log("saved", name);
}

/** Open a role app at a hash route. */
async function open(page, role, route, settle = 1200) {
  await page.goto(`${BASE}/${role}/#/${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(settle);
}

/**
 * Run a function against the shared store: ({ store, actions }) => void.
 * Runs on the sign-in hub, where no app screen is subscribed to re-render.
 */
async function withStore(page, fn) {
  await page.goto(`${BASE}/login/`, { waitUntil: "networkidle" });
  await page.evaluate(async (src) => {
    const m = await import("/assets/js/app/store.js");
    // eslint-disable-next-line no-new-func
    await new Function("m", `return (${src})(m)`)(m);
  }, fn.toString());
  await page.waitForTimeout(400);
}

const reset = (page) => withStore(page, ({ store }) => store.reset());
const onboardAll = (page) =>
  withStore(page, ({ store }) =>
    store.update((s) => {
      s.onboarded = { customer: true, driver: true, collector: true };
    })
  );

async function scrollToId(page, id, offset = 90) {
  await page.evaluate(
    ([i, o]) => {
      const el = document.getElementById(i);
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: "instant" });
    },
    [id, offset]
  );
  await page.waitForTimeout(900);
}

async function scrollToText(page, text, offset = 120) {
  await page
    .getByText(text, { exact: false })
    .first()
    .evaluate((el, o) => window.scrollBy({ top: el.getBoundingClientRect().top - o, behavior: "instant" }), offset);
  await page.waitForTimeout(900);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // ---------- Homepage ----------
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await shot(page, "h01-hero", { settle: 1500 });
  await scrollToId(page, "platform");
  await shot(page, "h02-platform");
  await scrollToId(page, "story");
  await shot(page, "h03-story");
  await scrollToText(page, "Fewer surprises");
  await shot(page, "h04-outcomes");
  await scrollToId(page, "features");
  await shot(page, "h05-features");
  await scrollToId(page, "roles");
  await shot(page, "h06-roles");
  await scrollToText(page, "Field teams need now");
  await shot(page, "h07-research");
  await page.goto(`${BASE}/login/`, { waitUntil: "networkidle" });
  await shot(page, "h08-login", { settle: 1200 });

  // Start from the seeded demo, with every role past onboarding.
  await open(page, "customer", "welcome");
  await reset(page);

  // ---------- Customer (light) ----------
  await open(page, "customer", "welcome");
  await shot(page, "c01-welcome");
  await onboardAll(page);
  await open(page, "customer", "home");
  await shot(page, "c02-home");
  await open(page, "customer", "request/1");
  await shot(page, "c03-request-type");
  await open(page, "customer", "request/3");
  const photo = page.locator("[data-photo]").first();
  if (await photo.count()) {
    await photo.click();
    await page.waitForTimeout(800);
  }
  await shot(page, "c04-request-photo");
  // The request draft lives in memory, so walk the rest of the flow in place.
  for (let i = 0; i < 2; i++) {
    await page.getByRole("button", { name: "Continue" }).last().click();
    await page.waitForTimeout(700);
  }
  await shot(page, "c05-request-confirm");
  // Crew rolling, two stops away from Meredith.
  await withStore(page, ({ actions }) => {
    actions.advance();
    actions.advance();
    actions.advance();
  });
  await open(page, "customer", "track");
  await shot(page, "c06-track");
  await open(page, "customer", "pickups");
  await shot(page, "c07-pickups");
  await open(page, "customer", "guide");
  await shot(page, "c08-guide");

  // ---------- Driver (field dark) ----------
  await reset(page);
  await open(page, "driver", "login");
  await shot(page, "d01-login");
  await onboardAll(page);
  await open(page, "driver", "pretrip");
  await shot(page, "d02-pretrip");
  await open(page, "driver", "route", 4000);
  await shot(page, "d03-route", { settle: 2500 });
  await withStore(page, ({ actions }) => actions.advance());
  await open(page, "driver", "drive", 5000);
  await shot(page, "d04-drive", { settle: 2500 });
  await open(page, "driver", "stops");
  await shot(page, "d05-stops");
  await open(page, "driver", "messages");
  await shot(page, "d06-messages");
  await open(page, "driver", "vehicle");
  await shot(page, "d07-vehicle");
  await open(page, "driver", "shift");
  await shot(page, "d08-shift");

  // ---------- Collector (field dark) ----------
  await reset(page);
  await open(page, "collector", "onboard/1");
  await shot(page, "k01-onboard");
  await onboardAll(page);
  await withStore(page, ({ actions }) => {
    actions.advance();
    actions.advance();
    actions.advance();
    actions.advance();
    actions.driverArrived();
  });
  await open(page, "collector", "queue");
  await shot(page, "k02-queue");
  await open(page, "collector", "stop/s6");
  await shot(page, "k03-stop");
  await open(page, "collector", "scan/s6", 2000);
  await shot(page, "k04-scan");
  await withStore(page, ({ actions }) => actions.collectorPhase("scanned"));
  await open(page, "collector", "confirm/s6");
  const checks = page.locator("#screen input[type=checkbox]");
  for (let i = 1; i < Math.min(3, await checks.count()); i++) await checks.nth(i).check({ force: true }).catch(() => {});
  await shot(page, "k05-confirm");
  await open(page, "collector", "problem/s6");
  await shot(page, "k06-problem");
  await open(page, "collector", "me");
  await shot(page, "k07-me");

  // Customer and driver mirror the collector at the stop.
  await open(page, "customer", "track");
  await shot(page, "c09-track-here");
  await open(page, "driver", "stops");
  await shot(page, "d09-stops-at-stop");
  await withStore(page, ({ actions }) => actions.completeStop("s6", { compliant: true }));
  await open(page, "customer", "track");
  await shot(page, "c10-track-done");

  // ---------- Fleet (light) ----------
  await reset(page);
  await onboardAll(page);
  await withStore(page, ({ actions }) => {
    actions.advance();
    actions.advance();
    actions.advance();
  });
  await open(page, "fleet", "overview", 5000);
  await shot(page, "f01-overview", { settle: 3000 });
  await open(page, "fleet", "fleet");
  await shot(page, "f02-fleet");
  await open(page, "fleet", "truck/0091", 4000);
  await shot(page, "f03-truck", { settle: 2500 });
  await open(page, "fleet", "pickups");
  await shot(page, "f04-pickups");
  await open(page, "fleet", "maintenance");
  await shot(page, "f05-maintenance");
  await open(page, "fleet", "compliance");
  await shot(page, "f06-compliance");
  await open(page, "fleet", "incident/i0", 4000);
  await shot(page, "f07-incident", { settle: 2500 });

  // ---------- Design system ----------
  await page.goto(`${BASE}/design-system/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await shot(page, "s01-ds-intro");
  for (const [id, name] of [
    ["color", "s02-ds-color"],
    ["status", "s03-ds-status"],
    ["type", "s04-ds-type"],
    ["buttons", "s05-ds-buttons"],
    ["cards", "s06-ds-cards"],
    ["tracker", "s07-ds-tracker"],
    ["field", "s08-ds-field"],
    ["changelog", "s09-ds-changelog"],
  ]) {
    if (!wanted(name)) continue;
    await scrollToId(page, id, 24);
    await shot(page, name);
  }

  // ---------- Phones ----------
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const m = await phone.newPage();
  m.setDefaultTimeout(30000);
  await open(m, "customer", "home");
  await reset(m);
  await onboardAll(m);
  await withStore(m, ({ actions }) => {
    actions.advance();
    actions.advance();
    actions.advance();
  });
  await open(m, "customer", "track");
  await shot(m, "m1-customer");
  await withStore(m, ({ store }) => store.update((s) => { s.route.acknowledged = false; }));
  await open(m, "driver", "route", 5000);
  await shot(m, "m0-driver-route", { settle: 2500 });
  await withStore(m, ({ actions }) => actions.advance());
  await open(m, "driver", "drive", 5000);
  await shot(m, "m2-driver", { settle: 2500 });
  await withStore(m, ({ actions }) => {
    actions.advance();
    actions.driverArrived();
    actions.collectorPhase("scanned");
  });
  await open(m, "collector", "confirm/s6");
  await shot(m, "m3-collector");
  await open(m, "fleet", "overview", 5000);
  await shot(m, "m4-fleet", { settle: 2500 });

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
