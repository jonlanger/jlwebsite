import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Aureum (aureumfinance.vercel.app): the web app on desktop and
 * phone, the 10-step onboarding, the marketing homepage and the living design
 * system. App state lives in each visitor's localStorage, so nothing here
 * touches anyone else's data.
 *
 *   node scripts/capture-aureum.mjs          # everything
 *   node scripts/capture-aureum.mjs app ds   # only names starting app / ds
 */
const BASE = "https://aureumfinance.vercel.app";
const OUT = path.resolve("public/projects/aureum/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

/** Charts draw in and illustrations loop; freeze the result before shooting. */
const STILL = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;caret-color:transparent!important}`;

async function settle(page, ms = 1200) {
  await page.addStyleTag({ content: STILL }).catch(() => {});
  // Charts reveal on scroll: walk the page so every one has drawn.
  await page.evaluate(async () => {
    const y0 = window.scrollY;
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, y0);
  });
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 2, vp.height - 2);
  await page.waitForTimeout(ms);
}

async function shot(page, name, opts = {}) {
  if (!wanted(name)) return;
  await settle(page, opts.settle);
  if (opts.scrollTo) {
    await page.locator(opts.scrollTo).first().evaluate((el, off) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off), opts.offset ?? 24);
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: opts.clip });
  console.log("saved", name);
}

async function demo(page) {
  await page.goto(`${BASE}/app/`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Explore with demo data").click();
  await page.waitForTimeout(1200);
}

async function route(page, r) {
  await page.goto(`${BASE}/app/#/${r}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  // ---------- Web app, desktop ----------
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  let page = await desk.newPage();
  await demo(page);
  for (const [name, r, extra] of [
    ["app-home", "home"],
    ["app-plan", "plan"],
    ["app-plan-match", "plan", { scrollTo: "#match", offset: 40 }],
    ["app-budget", "budget"],
    ["app-goals", "goals"],
    ["app-debt", "debt"],
    ["app-coach", "coach"],
    ["app-lesson", "learn/fund"],
    ["app-goal-new", "goals/new"],
  ]) {
    if (!wanted(name)) continue;
    await route(page, r);
    await shot(page, name, extra);
  }
  // Every rule's "Why?" opens its rationale and source.
  if (wanted("app-why")) {
    await route(page, "coach");
    const why = page.locator("#view [data-why]").first();
    await why.evaluate((el) => el.click());
    await page.waitForTimeout(700);
    await shot(page, "app-why", { scrollTo: "#view .insight", offset: 120 });
  }
  // Dark theme of the same home screen.
  if (wanted("app-dark")) {
    const dark = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
    const p = await dark.newPage();
    await demo(p);
    await route(p, "home");
    await shot(p, "app-dark");
    await dark.close();
  }

  await desk.close();

  // ---------- Onboarding, phone: one question per screen ----------
  if (wanted("ob")) {
    const obCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "light", isMobile: true, hasTouch: true });
    page = await obCtx.newPage();
    await page.goto(`${BASE}/app/`, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE}/app/#/welcome`, { waitUntil: "networkidle" });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const next = async () => { await page.locator("[data-next], button[type=submit]").first().click(); await page.waitForTimeout(700); };
    await shot(page, "ob-01-welcome");
    await next();
    await page.fill("#name", "Maya");
    await shot(page, "ob-02-name");
    await next();
    await page.fill("input[name=netMonthly]", "3,600");
    await page.locator('[data-choice=payFrequency][data-value=biweekly]').click();
    await shot(page, "ob-03-pay");
    await next();
    await page.locator('[data-choice=incomeStability][data-value=variable]').click();
    await shot(page, "ob-04-stability");
    await next();
    for (const [k, v] of [["rent", "1,250"], ["bills", "240"], ["groceries", "380"], ["transport", "160"]]) await page.fill(`input[name=${k}]`, v);
    await shot(page, "ob-05-essentials");
    await next();
    await page.fill("input[name=checking]", "900");
    await page.fill("input[name=savings]", "300");
    await next();
    await page.locator('[data-choice=hasDebt][data-value=yes]').click();
    await page.waitForTimeout(300);
    await page.locator("[data-k=balance]").first().fill("3,200");
    await page.locator("[data-k=apr]").first().fill("23.9");
    await page.locator("[data-k=minPayment]").first().fill("90");
    await shot(page, "ob-07-debt");
    await next();
    await page.locator('[data-choice=hasMatch][data-value=yes]').click();
    await page.fill("#matchUpTo", "5");
    await page.fill("#retirementPct", "3");
    await shot(page, "ob-08-match");
    await next();
    await page.locator('[data-choice=goal][data-value=trip]').click();
    await shot(page, "ob-09-goal");
    await next();
    await shot(page, "ob-10-nudges");
    await next();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(OUT, "ob-11-building.png") });
    console.log("saved ob-11-building");
    await page.waitForURL(/plan/, { timeout: 15000 });
    await page.waitForTimeout(1200);
    await shot(page, "ob-12-plan");
    await obCtx.close();
  }

  // ---------- Web app, phone ----------
  if (wanted("phone")) {
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "light", isMobile: true, hasTouch: true });
    page = await phone.newPage();
    await demo(page);
    for (const [name, r] of [["phone-home", "home"], ["phone-plan", "plan"], ["phone-budget", "budget"], ["phone-coach", "coach"], ["phone-goals", "goals"], ["phone-debt", "debt"]]) {
      await route(page, r);
      await shot(page, name);
    }
    await phone.close();
  }

  // ---------- Marketing homepage ----------
  if (wanted("site")) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await shot(page, "site-hero", { settle: 1500 });
    for (const id of ["moves", "features", "legible", "simulate", "security"]) await shot(page, `site-${id}`, { scrollTo: `#${id} .sec-head, #${id} h2`, offset: 110 });
    await ctx.close();
  }

  // ---------- Design system ----------
  if (wanted("ds")) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    page = await ctx.newPage();
    await page.goto(`${BASE}/design-system`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await settle(page, 1500);
    // [file, section, offset into the section in CSS px]: 16:10 crops of the content column.
    const SLIDES = [
      ["ds-00-cover", null, 0],
      ["ds-01-brand", "brand", 0],
      ["ds-02-color", "color", 0],
      ["ds-03-data-color", "data-color", 40],
      ["ds-04-type", "type", 0],
      ["ds-05-type-scale", "type", 640],
      ["ds-06-tokens", "tokens", 0],
      ["ds-07-motion", "motion", 0],
      ["ds-08-icons", "icons", 0],
      ["ds-09-illustration", "illustration", 0],
      ["ds-10-people", "illustration", 1180],
      ["ds-11-art-rules", "illustration", 2900],
      ["ds-12-components", "components", 0],
      ["ds-13-components-2", "components", 560],
      ["ds-14-coach", "coach", 0],
      ["ds-15-dataviz", "dataviz", 0],
      ["ds-16-dataviz-2", "dataviz", 900],
      ["ds-17-dataviz-3", "dataviz", 1800],
      ["ds-18-rules", "rules", 0],
    ];
    for (const [name, id, off] of SLIDES) {
      if (!wanted(name)) continue;
      let top = 0, left = 248, width = 1440 - 248;
      if (id) {
        const box = await page.locator(`section#${id}`).evaluate((el) => { const r = el.getBoundingClientRect(); return { y: r.top + window.scrollY, x: r.left, w: r.width }; });
        top = box.y + off;
        left = box.x - 40;
        width = box.w + 80;
      }
      await page.evaluate((y) => window.scrollTo(0, y), top);
      await page.waitForTimeout(350);
      const y = await page.evaluate(() => window.scrollY);
      const h = Math.round(width / 1.6);
      await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x: left, y: top - y, width, height: Math.min(h, 900 - (top - y)) } });
      console.log("saved", name);
    }
    // The same system in dark.
    if (wanted("ds-19-dark")) {
      const dark = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
      const p = await dark.newPage();
      await p.goto(`${BASE}/design-system#dataviz`, { waitUntil: "networkidle" });
      await settle(p, 1500);
      await p.locator("section#dataviz").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40));
      await p.waitForTimeout(400);
      await p.screenshot({ path: path.join(OUT, "ds-19-dark.png") });
      console.log("saved ds-19-dark");
      await dark.close();
    }
    await ctx.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
