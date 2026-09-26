import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs RelationshipViz's Storybook: the token foundations and the real
 * atomic components, in both themes. Build Storybook first, then pass its
 * output folder:
 *
 *   (cd ../relationshipviz && npx storybook build -o /tmp/rv-sb)
 *   node scripts/capture-relationshipviz-design.mjs /tmp/rv-sb
 */
const SB = path.resolve(process.argv[2] ?? "../relationshipviz/storybook-static");
const OUT = path.resolve("public/projects/relationshipviz/_src/design");

// capture name -> [story id, theme]
const STORIES = {
  "ds-01-surfaces": ["foundations-tokens--surfaces", "dark"],
  "ds-01-surfaces-light": ["foundations-tokens--surfaces", "light"],
  "ds-02-dataviz": ["foundations-tokens--data-viz", "dark"],
  "ds-03-type": ["foundations-tokens--typography", "dark"],
  "ds-04-space": ["foundations-tokens--spacing-and-radius", "dark"],
  "ds-10-buttons": ["atoms-button--matrix", "dark"],
  "ds-20-scoremeter": ["molecules-scoremeter--risk", "dark"],
  "ds-21-factors": ["molecules-factorbreakdown--detailed", "dark"],
  "ds-22-evidence": ["molecules-evidencesnippet--filing", "dark"],
  "ds-30-scorecard": ["organisms-lensscorecard--full", "dark"],
  "ds-30-scorecard-light": ["organisms-lensscorecard--full", "light"],
  "ds-31-relationship": ["organisms-relationshippanel--verified", "dark"],
  "ds-32-drawer": ["organisms-companydetailpanel--default", "dark"],
  "ds-33-scenario": ["organisms-scenariopanel--default", "dark"],
  "ds-34-stepper": ["organisms-questionstepper--default", "dark"],
  "ds-35-quadrant": ["organisms-charts-lensquadrantchart--default", "dark"],
  "ds-36-chartcard": ["organisms-chartcard--with-table", "dark"],
};

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const server = createServer(async (req, res) => {
  const file = path.join(SB, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    const body = await readFile(file.endsWith("/") ? path.join(file, "index.html") : file);
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(6123);

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
page.setDefaultTimeout(30000);
for (const [name, [id, theme]] of Object.entries(STORIES)) {
  await page.goto(`http://localhost:6123/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const root = page.locator("#storybook-root");
  await root.screenshot({ path: path.join(OUT, `${name}.png`) });
  const box = await root.boundingBox();
  console.log("saved", name, Math.round(box.width), Math.round(box.height));
}
await browser.close();
server.close();
