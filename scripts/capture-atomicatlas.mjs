import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs AtomicAtlas.
 *
 * Two bases, deliberately. Everything a visitor sees comes from the live
 * deployment at atomicatlas-three.vercel.app, so the screens are the shipped
 * build. The QA overlay is the exception: StructureView only mounts it when
 * NODE_ENV is development, which is the point of it — the four camera and four
 * interaction gates need a live camera and a live DOM, and production drops
 * them from the bundle. That one shot comes from `next dev` on :3111.
 *
 * The viewer pauses its render loop when the page is hidden (the render-pauses
 * gate), so every capture here runs in a headed-equivalent context: Playwright
 * pages are visible, which is why the canvas resolves at all.
 */
const LIVE = "https://atomicatlas-three.vercel.app";
const DEV = "http://localhost:3111";
const OUT = path.resolve("public/projects/atomicatlas/_src");

const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 430, height: 932 };

async function shot(page, name, options = {}) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`), type: "png", ...options });
  console.log("saved", name);
}

/**
 * Waits for the structure to be on screen.
 *
 * The Elements button is the app's own signal: StructureView disables it until
 * the ribbon builder has handed back its features, so an enabled button with a
 * count beside it means coordinates fetched, parsed, assigned and tessellated.
 */
async function waitForStructure(page) {
  await page.locator("#structure-elements-toggle:not([disabled])").waitFor({ timeout: 90_000 });
  await page.waitForTimeout(1400);
}

/**
 * Opens one disclosure in the left column and scrolls it into the frame.
 *
 * The accordion is built on native <details>, so the row is a <summary> and
 * not a button — deliberate, in the app, because the molecule page is a server
 * component and a JS accordion would arrive as a bundle and a flash.
 */
async function openPanel(page, name, { scroll = true } = {}) {
  const trigger = page.locator("summary").filter({ hasText: name }).first();
  // Two of these are open on first paint, so toggling blind would close them.
  const open = await trigger.evaluate((el) => el.parentElement.open);
  if (!open) await trigger.click();
  await page.waitForTimeout(500);
  if (scroll) {
    await trigger.evaluate((el) => {
      const scroller = el.closest("[class*='overflow-y-auto']") ?? document.scrollingElement;
      const top = el.getBoundingClientRect().top;
      const anchor = scroller === document.scrollingElement ? 0 : scroller.getBoundingClientRect().top;
      scroller.scrollTop += top - anchor - 96;
    });
    await page.waitForTimeout(500);
  }
  return trigger;
}

/**
 * Picks an element out of the drawing itself rather than off the list.
 *
 * The raycaster is what a reader uses, and it is also what decides which
 * residue the panel reports, so the shot should come from a real hit on the
 * canvas. Points are tried in turn because empty space is a legitimate miss —
 * a cartoon is mostly background.
 */
async function pickOnCanvas(page, points) {
  const canvas = page.locator("canvas").first();
  const box = await canvas.boundingBox();

  for (const [fx, fy] of points) {
    await page.mouse.move(box.x + box.width * fx, box.y + box.height * fy);
    await page.waitForTimeout(400);
    await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
    await page.waitForTimeout(700);
    // The panel is open either way; a hit is what replaces its prompt with a
    // named element and the residues that element is made of.
    const prompt = page.getByText("Click any part of the structure");
    if ((await prompt.count()) === 0) return true;
  }
  return false;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();

  // --- The way in -------------------------------------------------------
  await page.goto(`${LIVE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await shot(page, "01-home");
  await shot(page, "02-home-full", { fullPage: true });

  // --- The shelf --------------------------------------------------------
  await page.goto(`${LIVE}/molecules`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "03-molecules");

  await page.goto(`${LIVE}/molecules?category=toxin`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "04-molecules-toxins");

  // The archive behind the shelf: a text query against search.rcsb.org, with
  // curated hits promoted above the quarter-million that are not vouched for.
  await page.goto(`${LIVE}/molecules?q=kinase`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await shot(page, "05-search");

  // --- One structure, in detail ----------------------------------------
  await page.goto(`${LIVE}/molecules/1aqz`, { waitUntil: "networkidle" });
  await waitForStructure(page);
  await shot(page, "06-detail-restrictocin");

  // The figures, and the sentence that says what is missing from them. Both
  // are read out of the coordinate file rather than looked up.
  await openPanel(page, "Measurements", { scroll: false });
  await openPanel(page, "Chains in this entry", { scroll: false });
  await shot(page, "07-measurements");

  // The legend, and the sentences underneath it that say what is not on
  // screen: seven residues of 1AQZ never resolved, and the ribbon stops.
  await openPanel(page, "How this is drawn");
  await shot(page, "08-how-drawn");

  // The elements list, then a pick made on the drawing itself.
  await page.locator("#structure-elements-toggle").click();
  await page.waitForTimeout(900);
  await shot(page, "09-elements");

  const picked = await pickOnCanvas(page, [
    [0.5, 0.5],
    [0.46, 0.44],
    [0.54, 0.56],
    [0.42, 0.55],
    [0.58, 0.46],
    [0.5, 0.4],
    [0.5, 0.62],
  ]);
  if (!picked) console.warn("no element picked on 1AQZ");
  // Which element a click lands on depends on where the auto-rotation had got
  // to, so it is not the same one run to run. Printed because the case study
  // names it in a caption.
  console.log(
    "picked:",
    (await page.getByRole("complementary").innerText()).split("\n").slice(2, 5).join(" · "),
  );
  await shot(page, "10-inspector");

  // --- The same builder, on seven other folds ---------------------------
  // Chosen for what they ask of the builder rather than for fame: an all-helix
  // globin, two barrels, a 994-residue chain that forces the tessellation
  // taper, a nucleic acid with no assignment to make, and a twenty-residue
  // fragment the gates refuse to vouch for.
  for (const [id, name] of [
    ["4hhb", "11-haemoglobin"],
    ["1gfl", "12-gfp"],
    ["1tim", "13-tim-barrel"],
    ["1ubq", "14-ubiquitin"],
    ["1su4", "15-calcium-pump"],
    ["1bl8", "16-potassium-channel"],
    ["1kf1", "17-quadruplex"],
    ["1cgd", "18-collagen"],
  ]) {
    await page.goto(`${LIVE}/molecules/${id}`, { waitUntil: "networkidle" });
    await waitForStructure(page);
    await shot(page, name);
  }

  // --- What it refuses to draw -----------------------------------------
  // 4V6X is the human 80S ribosome: past the size RCSB publishes legacy PDB
  // for, so the page explains itself instead of showing an empty frame.
  await page.goto(`${LIVE}/molecules/4v6x`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await shot(page, "19-too-large");

  // An entry nobody has written copy for still works: every figure on the page
  // is read out of the file rather than looked up in the catalogue.
  await page.goto(`${LIVE}/molecules/3k0n`, { waitUntil: "networkidle" });
  await waitForStructure(page);
  await shot(page, "20-uncurated");

  // --- The argument, and the reference ---------------------------------
  await page.goto(`${LIVE}/about`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "21-about");
  await shot(page, "22-about-full", { fullPage: true });

  await page.goto(`${LIVE}/guide`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "23-guide");

  // --- The gates, running ------------------------------------------------
  // Dev keeps a socket open for HMR, so networkidle never arrives here.
  await page.goto(`${DEV}/molecules/1aqz`, { waitUntil: "domcontentloaded" });
  await waitForStructure(page);
  await page.getByRole("button", { name: /^QA \d+\/\d+/ }).click();
  await page.waitForTimeout(700);
  await shot(page, "24-qa-overlay");

  // The same overlay on the one structure that does not come back clean. 1CGD
  // is a single strand of a triple helix with ten of its thirty residues
  // unresolved: coverage warns, and so does representation-fit, because there
  // is no fold left for a cartoon to abstract.
  await page.goto(`${DEV}/molecules/1cgd`, { waitUntil: "domcontentloaded" });
  await waitForStructure(page);
  await page.getByRole("button", { name: /^QA \d+\/\d+/ }).click();
  await page.waitForTimeout(700);
  await shot(page, "25-qa-overlay-warned");

  await page.close();

  // --- On a phone --------------------------------------------------------
  const phone = await context.newPage();
  await phone.setViewportSize(PHONE);

  await phone.goto(`${LIVE}/molecules`, { waitUntil: "networkidle" });
  await phone.waitForTimeout(700);
  await shot(phone, "m-01-molecules");

  await phone.goto(`${LIVE}/molecules/4hhb`, { waitUntil: "networkidle" });
  await waitForStructure(phone);
  await shot(phone, "m-02-detail");

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
