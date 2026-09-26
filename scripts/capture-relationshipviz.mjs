import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs RelationshipViz (relationshipviz.vercel.app) in its default dark theme.
 *
 * The app is a Vite SPA whose deep links 404 on a cold load, so every page is
 * reached by loading / and pushing the route client-side. The Explore graph is
 * WebGL with a force layout, so graph shots wait for it to settle.
 *
 *   node scripts/capture-relationshipviz.mjs          # everything
 *   node scripts/capture-relationshipviz.mjs d0 m     # only names starting d0 / m
 */
const BASE = "https://relationshipviz.vercel.app";
const OUT = path.resolve("public/projects/relationshipviz/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

async function shot(page, name, { full = false, settle = 700 } = {}) {
  if (!wanted(name)) return;
  await page.evaluate(() => document.activeElement?.blur?.());
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
  console.log("saved", name);
}

async function home(page) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(3500);
}

async function go(page, route, wait = 3500) {
  await page.evaluate((r) => {
    history.pushState({}, "", r);
    dispatchEvent(new PopStateEvent("popstate"));
  }, route);
  await page.waitForTimeout(wait);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function scrollToText(page, text, offset = 90) {
  // Lower charts render as they near the viewport, so step down until the text exists.
  const heading = page.getByRole("heading", { name: text, exact: true }).first();
  const target = (await heading.count()) ? heading : page.getByRole("heading", { name: text }).or(page.getByText(text, { exact: false })).first();
  for (let i = 0; i < 30 && (await target.count()) === 0; i++) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(250);
  }
  await target.evaluate((el, o) => {
    const scroller = document.querySelector("main") ?? document.scrollingElement;
    const top = el.getBoundingClientRect().top - o;
    window.scrollBy(0, top);
    if (scroller && scroller !== document.scrollingElement) scroller.scrollBy(0, top);
  }, offset);
  await page.waitForTimeout(700);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // Landing
  await home(page);
  await shot(page, "d01-landing", { settle: 2500 });
  await scrollToText(page, "Earnings tell you");
  await shot(page, "d02-landing-why");
  await scrollToText(page, "Who the network");
  await shot(page, "d03-landing-stickiest");
  await scrollToText(page, "Same market. Different playbooks");
  await shot(page, "d04-landing-compare");
  await scrollToText(page, "STRESS TEST", 90);
  await shot(page, "d05-landing-stress");

  // Explore
  await go(page, "/explore", 7000);
  await shot(page, "d10-explore", { settle: 1500 });
  await page.getByRole("radio", { name: "Community", exact: true }).first().click();
  await shot(page, "d11-explore-community", { settle: 2500 });
  await page.getByRole("radio", { name: "Sector", exact: true }).first().click();
  await page.getByRole("radio", { name: "Risk", exact: true }).first().click();
  await shot(page, "d12-explore-risk", { settle: 2500 });
  await page.getByRole("radio", { name: "Off", exact: true }).first().click();
  await page.keyboard.press("/");
  await page.keyboard.type("Nvidia");
  await page.waitForTimeout(700);
  await page.keyboard.press("Enter");
  await shot(page, "d13-explore-drawer", { settle: 3500 });

  // Insights (fresh load: the Explore selection would otherwise carry over as a filter)
  await home(page);
  await go(page, "/insights", 5000);
  await shot(page, "d20-insights", { settle: 1500 });
  await scrollToText(page, "Supply flows between sectors", 80);
  await shot(page, "d21-insights-sankey", { settle: 1200 });
  await scrollToText(page, "Network hubs", 80);
  await shot(page, "d22-insights-hubs", { settle: 1200 });

  // Lenses
  await go(page, "/lenses", 5000);
  await shot(page, "d30-lenses", { settle: 1500 });
  await scrollToText(page, "Tune the lenses", 80);
  await shot(page, "d31-lenses-tune");
  await scrollToText(page, "Riskiest dependencies", 80);
  await shot(page, "d32-lenses-deps");
  await scrollToText(page, "Stress test", 80);
  await shot(page, "d33-stress", { settle: 1500 });

  // Portfolio
  await go(page, "/portfolio", 4000);
  await shot(page, "d40-portfolio-empty");
  await page.getByRole("button", { name: "Chips", exact: true }).click();
  await shot(page, "d41-portfolio", { settle: 2500 });
  await scrollToText(page, "Look-through", 80);
  await shot(page, "d42-portfolio-lookthrough", { settle: 1200 });

  // Ideas
  await go(page, "/ideas", 3000);
  await shot(page, "d50-ideas-question");
  await go(page, "/ideas?goal=growth&horizon=long&swings=medium&prefer=both&themes=ai", 4000);
  await shot(page, "d51-ideas-results", { settle: 1500 });

  // Company profile
  await go(page, "/company/NVDA", 4000);
  await shot(page, "d60-company", { settle: 1500 });
  await scrollToText(page, "Supply chain", 80);
  await shot(page, "d61-company-supply", { settle: 1200 });
  await scrollToText(page, "Relationships", 80);
  await shot(page, "d62-company-relationships");

  // Data
  await go(page, "/data", 3000);
  await shot(page, "d70-data");

  // Mobile
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: "dark",
  });
  const m = await phone.newPage();
  m.setDefaultTimeout(30000);
  await home(m);
  await shot(m, "m1-landing", { settle: 2500 });
  await go(m, "/lenses", 5000);
  await shot(m, "m2-lenses");
  await go(m, "/company/NVDA", 4000);
  await shot(m, "m3-company");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
