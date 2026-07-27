import { chromium } from "/tmp/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://proposalpal-v2.vercel.app";
const OUT = path.resolve("public/projects/proposalpal/_src");

async function shot(page, name, fullPage = false) {
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage,
    type: "png",
  });
  console.log("saved", name);
}

async function forceLight(page) {
  await page.evaluate(() => {
    localStorage.setItem("theme", "light");
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    // Also toggle any theme provider state if present
    window.dispatchEvent(new Event("storage"));
  });
  // Click theme toggle until light if still dark
  for (let i = 0; i < 3; i++) {
    const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    if (!dark) break;
    // moon/sun button typically near avatar
    const btns = page.locator("header button");
    const count = await btns.count();
    if (count > 0) await btns.nth(0).click().catch(() => {});
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
  }
}

async function enterWorkspace(page) {
  await page.goto(`${BASE}/new-proposal`, { waitUntil: "networkidle" });
  await forceLight(page);
  await page.waitForTimeout(800);

  await page.fill("#opportunityId-3col", "405020-70");
  await page.fill("#clientName-3col", "7-Eleven USA");
  await page.fill("#proposalName-3col", "ERP Digital Transformation");
  await page.fill(
    "#context-3col",
    "RFP-driven ERP transformation covering digital commerce, store operations, and supply-chain modernization for 7-Eleven USA."
  );
  await page.waitForTimeout(500);

  const go = page.getByRole("button", { name: /go to proposal workspace/i });
  await go.click({ force: true });
  await page.waitForTimeout(5000);
  await forceLight(page);
  console.log("workspace url", page.url());
}

async function clickModule(page, name) {
  // Prefer buttons/cards in overview grid
  const candidates = [
    page.getByRole("button", { name: new RegExp(name, "i") }),
    page.locator(`[role='button']`).filter({ hasText: name }),
    page.getByText(name, { exact: true }),
  ];
  for (const loc of candidates) {
    if (await loc.count()) {
      await loc.first().click({ timeout: 5000 });
      return true;
    }
  }
  return false;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
  });

  const report = {};
  await enterWorkspace(page);
  report.workspaceUrl = page.url();
  report.workspaceText = await page.evaluate(() => document.body.innerText.slice(0, 5000));
  await shot(page, "30-workspace-overview");
  await shot(page, "30-workspace-overview-full", true);

  // Wait for sources
  for (let i = 0; i < 20; i++) {
    const pulling = await page.getByText(/pulling relevant sources/i).count();
    const noSources = await page.getByText(/no sources added yet/i).count();
    if (!pulling) {
      await page.waitForTimeout(1500);
      break;
    }
    await page.waitForTimeout(2000);
    if (i === 19) console.log("still pulling sources", { noSources });
  }
  await forceLight(page);
  await shot(page, "31-workspace-after-sources");
  await shot(page, "31-workspace-after-sources-full", true);

  // Dump interactive structure
  report.structure = await page.evaluate(() => {
    const clickables = [...document.querySelectorAll("button, [role='button'], a, [role='tab']")]
      .map((el) => ({
        tag: el.tagName,
        text: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 100),
        aria: el.getAttribute("aria-label"),
        href: el.getAttribute("href"),
      }))
      .filter((x) => x.text || x.aria);
    return clickables.slice(0, 120);
  });

  const modules = [
    "Client Research",
    "Client Engagement",
    "Team Formation",
    "Topic Research",
    "Storyline & Proposal",
    "Commercial Approach",
    "Polish Proposal",
    "Practice Pitch",
  ];

  for (const [i, name] of modules.entries()) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Ensure overview visible
    const overviewTab = page.getByText(/proposal overview/i).first();
    if (await overviewTab.count()) {
      await overviewTab.click().catch(() => {});
      await page.waitForTimeout(800);
    }

    const ok = await clickModule(page, name);
    if (!ok) {
      report[`missing_${slug}`] = true;
      continue;
    }
    await page.waitForTimeout(2800);
    await forceLight(page);
    await shot(page, `32-module-${String(i).padStart(2, "0")}-${slug}`);
    await shot(page, `32-module-${String(i).padStart(2, "0")}-${slug}-full`, true);
    report[`module_${slug}`] = {
      url: page.url(),
      text: await page.evaluate(() => document.body.innerText.slice(0, 2800)),
    };

    // Try generate/start if available
    for (const action of [/generate/i, /^start$/i, /run analysis/i, /create/i]) {
      const btn = page.getByRole("button", { name: action }).first();
      if ((await btn.count()) && !(await btn.isDisabled().catch(() => true))) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(4000);
        await forceLight(page);
        await shot(page, `33-module-${String(i).padStart(2, "0")}-${slug}-action`);
        break;
      }
    }
  }

  // Chat flow from overview
  const overviewTab2 = page.getByText(/proposal overview/i).first();
  if (await overviewTab2.count()) await overviewTab2.click().catch(() => {});
  await page.waitForTimeout(800);
  const chat = page.getByPlaceholder(/ask me anything/i).first();
  if (await chat.count()) {
    await chat.click();
    await chat.fill("What win themes should we lead with for this 7-Eleven ERP proposal?");
    await page.waitForTimeout(400);
    await shot(page, "34-chat-composed");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(10000);
    await forceLight(page);
    await shot(page, "35-chat-response");
    await shot(page, "35-chat-response-full", true);
    report.chat = await page.evaluate(() => document.body.innerText.slice(0, 3500));
  }

  // Bookmarks / Export menus
  for (const label of [/bookmarks/i, /export/i, /data sources/i, /regenerate/i]) {
    const btn = page.getByRole("button", { name: label }).first();
    if (await btn.count()) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(700);
      await shot(page, `36-${String(label).replace(/\W+/g, "").slice(0, 20)}`);
      await page.keyboard.press("Escape").catch(() => {});
    }
  }

  await writeFile(path.join(OUT, "modules-report.json"), JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        url: report.workspaceUrl,
        modules: Object.keys(report).filter((k) => k.startsWith("module_")),
        missing: Object.keys(report).filter((k) => k.startsWith("missing_")),
        clickables: report.structure?.slice(0, 40),
      },
      null,
      2
    )
  );

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
