import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs the ProposalPal rebuild (proposalpalv3) in dark mode.
 *
 * Demo proposals and their module content live in localStorage and are seeded
 * on first visit to home, so every context opens home first. The theme is
 * next-themes' `theme` key. The chat shot waits on a live model reply.
 *
 *   node scripts/capture-proposalpal-v3.mjs          # everything
 *   node scripts/capture-proposalpal-v3.mjs 2 m      # only names starting 2 / m
 */
const BASE = "https://proposalpalv3.vercel.app";
const SEVEN = `${BASE}/proposal/demo-proposal-1`;
const OUT = path.resolve("public/projects/proposalpal/_src/v3");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

async function shot(page, name, { blur = true, full = false } = {}) {
  if (!wanted(name)) return;
  if (blur) await page.evaluate(() => document.activeElement?.blur?.());
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
  console.log("saved", name);
}

async function open(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(2500);
}

async function module(page, name) {
  await page.getByRole("button", { name, exact: true }).first().click({ force: true });
  await page.waitForTimeout(1800);
}

async function closeSources(page) {
  const close = page.getByRole("button", { name: "Close panel" });
  if (await close.count()) await close.first().click({ force: true });
  await page.waitForTimeout(500);
}

async function desktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" });
  await context.addInitScript(() => localStorage.setItem("theme", "dark"));
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  await open(page, BASE);
  return page;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await desktop(browser);

  // Getting started
  await shot(page, "01-home");
  await page.mouse.wheel(0, 520);
  await page.waitForTimeout(800);
  await shot(page, "02-home-proposals");

  await open(page, `${BASE}/new-proposal`);
  await shot(page, "03-new-proposal");

  await open(page, `${SEVEN}/setup`);
  await shot(page, "04-details");

  await open(page, `${BASE}/help`);
  await shot(page, "05-help");

  // Workspace
  await open(page, `${SEVEN}/dashboard`);
  await shot(page, "06-workspace-sources");

  await closeSources(page);
  await shot(page, "07-workspace-overview");

  // Modules, 7-Eleven
  const modules = [
    ["Client Research", "10-client-research"],
    ["Client Engagement", "11-client-engagement"],
    ["Team Formation", "12-team-formation"],
    ["Topic Research", "13-topic-research"],
    ["Storyline & Proposal", "14-storyline"],
    ["Commercial Approach", "15-commercial"],
    ["Polish Proposal", "16-polish"],
    ["Practice Pitch", "17-practice-pitch"],
  ];
  for (const [name, file] of modules) {
    await module(page, name);
    await shot(page, file);
  }

  // Section bookmarks in Client Research, then highlight-to-bookmark
  await module(page, "Client Research");
  const marks = page.getByRole("button", { name: /^Bookmark / });
  for (let i = 0; i < 2 && i < (await marks.count()); i++) {
    await marks.nth(i).click({ force: true });
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(3500); // let the toasts clear

  await page.evaluate(() => {
    const host = document.querySelector("[data-section-title] [data-selectable] p, [data-selectable] p");
    if (!host) return;
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    const node = walker.nextNode();
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, Math.min(node.textContent.length, 90));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });
  await page.waitForTimeout(800);
  await shot(page, "20-highlight-menu", { blur: false });
  await page.evaluate(() => window.getSelection().removeAllRanges());

  await page.getByRole("button", { name: /^Bookmarks/ }).first().click({ force: true });
  await page.waitForTimeout(1200);
  await shot(page, "21-bookmarks");

  await module(page, "Storyline & Proposal");
  await shot(page, "22-bookmarks-storyline");
  await page.getByRole("button", { name: /^Bookmarks/ }).first().click({ force: true });
  await page.waitForTimeout(600);

  // Export menu
  await module(page, "Storyline & Proposal");
  await page.getByRole("button", { name: "Export", exact: true }).click({ force: true });
  await page.waitForTimeout(800);
  await shot(page, "23-export", { blur: false });
  await page.keyboard.press("Escape");

  // Left rail panels: generated files, system tasks
  for (const [label, file] of [["Generated files and exports", "24-generated-files"], ["System tasks", "25-system-tasks"]]) {
    await page.getByRole("button", { name: label, exact: true }).click({ force: true });
    await page.waitForTimeout(1200);
    await shot(page, file);
    await closeSources(page);
  }

  // Live chat reply, focused on Client Research
  if (wanted("27-chat")) {
    await module(page, "Client Research");
    const chat = page.getByPlaceholder(/ask me anything/i).first();
    await chat.fill("What are the three win themes we should lead with for 7-Eleven, given the IPO?");
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      () => !document.querySelector("[aria-label='Stop generating']"),
      null,
      { timeout: 90000, polling: 1000 },
    ).catch(() => console.log("chat still streaming"));
    await page.waitForTimeout(1500);
    // Show the question and the start of the reply rather than its tail.
    await page.getByText("What are the three win themes", { exact: false }).last().evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(600);
    await shot(page, "27-chat");
  }

  // Chat history, now holding the thread above
  await page.getByRole("button", { name: "Chat history" }).click({ force: true });
  await page.waitForTimeout(800);
  await shot(page, "28-chat-history", { blur: false });
  await page.keyboard.press("Escape");

  // A second demo for range
  await open(page, `${BASE}/proposal/demo-walmart/dashboard`);
  await closeSources(page);
  await module(page, "Storyline & Proposal");
  await shot(page, "30-walmart-storyline");
  await module(page, "Team Formation");
  await shot(page, "31-walmart-team");
  await open(page, `${BASE}/proposal/demo-pfizer/dashboard`);
  await closeSources(page);
  await module(page, "Commercial Approach");
  await shot(page, "32-pfizer-commercial");

  // Mobile
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: "dark",
  });
  await mctx.addInitScript(() => localStorage.setItem("theme", "dark"));
  const m = await mctx.newPage();
  await open(m, BASE);
  await shot(m, "m1-home");
  await open(m, `${SEVEN}/dashboard`);
  await shot(m, "m2-workspace");
  await module(m, "Team Formation");
  await shot(m, "m3-team");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
