import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs ProposalPal from the live deployment in full dark mode.
 *
 * The theme toggle (top right) writes `theme` to localStorage, so it is seeded
 * before every page load. The live demo's generation backend currently fails,
 * so module sections sit on spinners forever; those are hidden for module
 * shots and no section is expanded.
 *
 *   node scripts/capture-proposalpal-dark.mjs          # everything
 *   node scripts/capture-proposalpal-dark.mjs 1 2      # only names starting 1 / 2
 */
const BASE = "https://proposalpal-v2.vercel.app";
const DEMO = `${BASE}/proposal/demo-proposal-1`;
const OUT = path.resolve("public/projects/proposalpal/_src/dark");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

const MODULES = [
  "Client Research",
  "Client Engagement",
  "Topic Research",
  "Storyline & Proposal",
  "Commercial Approach",
  "Polish Proposal",
  "Practice Pitch",
];

async function shot(page, name) {
  if (!wanted(name)) return;
  await page.evaluate(() => document.activeElement?.blur?.());
  await page.mouse.move(1599, 999);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("saved", name);
}

async function hideSpinners(page, on) {
  await page.evaluate((on) => {
    let el = document.getElementById("cap-spin");
    if (!el) { el = document.createElement("style"); el.id = "cap-spin"; document.head.appendChild(el); }
    el.textContent = on ? ".animate-spin{visibility:hidden!important}" : "";
  }, on);
}

async function closePanels(page) {
  for (let i = 0; i < 4; i++) {
    const close = page.getByRole("button", { name: "Close panel" });
    if (!(await close.count())) break;
    await close.first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(300);
  }
}

async function toolbarButton(page, index) {
  // Icon-only toolbar buttons have no names: 0 = "+", 1 = history, last = settings.
  const all = await page.$$eval("button", (bs) =>
    bs.map((b, i) => ({ i, y: b.getBoundingClientRect().y, t: b.textContent.trim() }))
      .filter((b) => b.y > 70 && b.y < 125 && !b.t)
      .map((b) => b.i),
  );
  return page.locator("button").nth(all.at(index));
}

async function openDashboard(page) {
  // Home seeds the demo proposal (7-Eleven) before the workspace loads.
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.goto(`${DEMO}/dashboard`, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  console.log("workspace:", (await page.locator("header").innerText()).replace(/\s+/g, " "));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  await context.addInitScript(() => localStorage.setItem("theme", "dark"));
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // Home, help, intake, details
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await shot(page, "01-home");

  await page.goto(`${BASE}/help`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.getByText("What is ProposalPal?").click().catch(() => {});
  await page.getByText("What can ProposalPal do?").click().catch(() => {});
  await page.waitForTimeout(800);
  await shot(page, "02-help");

  await page.goto(`${BASE}/new-proposal`, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await page.fill("#opportunityId-3col", "405020-70").catch(() => {});
  await page.fill("#clientName-3col", "7-Eleven USA").catch(() => {});
  await page.fill("#proposalName-3col", "ERP Digital Transformation").catch(() => {});
  await page.fill(
    "#context-3col",
    "RFP-driven ERP transformation covering digital commerce, store operations, and supply-chain modernization across 13,000+ US stores.",
  ).catch(() => {});
  await shot(page, "03-new-proposal");

  await page.goto(`${DEMO}/setup`, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await shot(page, "04-details");

  // Workspace
  await openDashboard(page);
  await shot(page, "05-workspace-sources");
  await closePanels(page);
  await shot(page, "06-workspace-overview");

  // Side panels: data source nav + project context, chat history, operations
  await page.getByRole("button", { name: "Data Sources" }).click();
  await page.waitForTimeout(800);
  const rail = await page.$$eval("button", (bs) =>
    bs.map((b, i) => ({ i, x: b.getBoundingClientRect().x, y: b.getBoundingClientRect().y }))
      .filter((b) => b.x < 50 && b.y > 130).map((b) => b.i),
  );
  if (rail.length) {
    await page.locator("button").nth(rail[0]).click({ force: true });
    await page.waitForTimeout(1200);
  }
  await shot(page, "07-project-context");
  await closePanels(page);
  await page.getByRole("button", { name: "Data Sources" }).click().catch(() => {});
  await page.waitForTimeout(500);

  await (await toolbarButton(page, 1)).click({ force: true });
  await page.waitForTimeout(1200);
  await shot(page, "08-chat-history");
  await (await toolbarButton(page, 1)).click({ force: true });
  await page.waitForTimeout(600);

  await (await toolbarButton(page, -1)).click({ force: true });
  await page.waitForTimeout(1200);
  await shot(page, "09-operations");
  await (await toolbarButton(page, -1)).click({ force: true });
  await page.waitForTimeout(600);

  // Modules
  await openDashboard(page);
  await closePanels(page);
  await hideSpinners(page, true);
  for (const [i, name] of MODULES.entries()) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await page.getByRole("button", { name }).first().click({ force: true });
    await page.waitForTimeout(2500);
    await shot(page, `1${i}-module-${slug}`);

    if (name === "Client Research") {
      for (const tab of ["Analyst Reports", "Value Science Portal"]) {
        await page.getByRole("tab", { name: tab }).click({ force: true });
        await page.waitForTimeout(2000);
        await shot(page, `1${i}-module-${slug}-${tab.toLowerCase().replace(/\W+/g, "-")}`);
      }
    }
    if (name === "Topic Research") {
      await page.getByRole("tab", { name: "Sections" }).click({ force: true }).catch(() => {});
      await page.waitForTimeout(2000);
      await shot(page, `1${i}-module-${slug}-sections`);
    }
  }
  await hideSpinners(page, false);

  // Chat composer
  await page.getByRole("button", { name: "Proposal Overview" }).click({ force: true });
  await page.waitForTimeout(1200);
  const chat = page.getByPlaceholder(/ask me anything/i).first();
  await chat.fill("What win themes should we lead with for this 7-Eleven ERP proposal?");
  await page.waitForTimeout(400);
  if (wanted("20-chat")) {
    await page.mouse.move(1599, 999);
    await page.screenshot({ path: path.join(OUT, "20-chat.png") });
    console.log("saved 20-chat");
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
