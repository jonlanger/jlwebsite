import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Render the exported fluidsim STLs to stills for the Attractor Particles case
 * study. Meshes are loaded with three.js STLLoader in headless Chromium and lit
 * with a fixed three-point rig, tinted along the model's longest axis with the
 * simulation's own violet -> orange velocity ramp so the renders read as the
 * same object family as the in-app captures.
 */

const STL_DIR =
  "/Users/jonlanger/Documents/Projects/fluidsim project progress/STLs of fluidsim";
const PAGE_DIR = process.env.STL_PAGE_DIR;
const OUT = path.resolve("public/projects/fluidsim/_src/stl");

const WIDTH = 1600;
const HEIGHT = 1200;

// name -> published still + camera orbit (degrees). Elevation is raised for the
// flatter exports so the spiral structure reads instead of going edge-on.
const MODELS = [
  { file: "attractor-particles-wholesim.stl", out: "stl-wholesim", az: 35, el: 24 },
  { file: "attractor-particles-mainflow.stl", out: "stl-mainflow", az: 35, el: 34 },
  { file: "attractor-particles-density2.stl", out: "stl-density2", az: 35, el: 58 },
  { file: "attractor-particles-density4.stl", out: "stl-density4", az: 35, el: 42 },
  { file: "attractor-particles-tubelean.stl", out: "stl-tubelean", az: 40, el: 20 },
  { file: "attractor-particles-lowthick-1kdens.stl", out: "stl-lowthick", az: 40, el: 20 },
  { file: "fluid-particles.stl", out: "stl-fluid", az: 30, el: 22 },
  { file: "fluid-particles-random.stl", out: "stl-fluid-random", az: 30, el: 22 },
  { file: "fluid-particles-largestmass.stl", out: "stl-largest-mass", az: 30, el: 34 },
];

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".stl": "model/stl",
};

/** Static server so ES module imports and large STL fetches resolve cleanly. */
function serve(port) {
  const server = createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const file = url.startsWith("/stl/")
      ? path.join(STL_DIR, url.slice(5))
      : path.join(PAGE_DIR, url);
    try {
      const stat = statSync(file);
      res.writeHead(200, {
        "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
        "Content-Length": stat.size,
      });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

async function main() {
  if (!PAGE_DIR) throw new Error("set STL_PAGE_DIR to the render page directory");
  await mkdir(OUT, { recursive: true });

  const port = 4599;
  const server = await serve(port);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--js-flags=--max-old-space-size=8192"],
  });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(180000);

  for (const model of MODELS) {
    const src = `http://localhost:${port}/stl/${encodeURIComponent(model.file)}`;
    const url =
      `http://localhost:${port}/render.html?file=${encodeURIComponent(src)}` +
      `&w=${WIDTH}&h=${HEIGHT}&az=${model.az}&el=${model.el}`;
    await page.goto(url, { waitUntil: "load" });
    await page.waitForFunction(() => window.__stlReady === true, null, {
      timeout: 180000,
    });
    const error = await page.evaluate(() => window.__stlError);
    if (error) throw new Error(`${model.file}: ${error}`);
    const stats = await page.evaluate(() => window.__stlStats);
    await page.locator("canvas").screenshot({
      path: path.join(OUT, `${model.out}.png`),
      type: "png",
    });
    console.log(
      `${model.out.padEnd(20)} ${stats.triangles.toLocaleString().padStart(11)} tris  ` +
        `bbox ${stats.size.join(" x ")}`
    );
  }

  await browser.close();
  server.close();
  console.log("done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
