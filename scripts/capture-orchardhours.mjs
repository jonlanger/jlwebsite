import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Orchard Hours.
 *
 * Everything comes from the live deployment, driven through `window.OH` — the
 * handle main.ts hangs the world off for automated checks. That matters more
 * here than it would on a page of prose: a screenshot of a game is a screenshot
 * of one instant of a simulation, and the instants worth having (the twist that
 * parts a stem, the hoop under a canopy apple, the hour the lantern earns its
 * keep) last a fraction of a second and will not wait for a `waitForTimeout`.
 *
 * So the frame loop is switched off the moment the orchard opens — overriding
 * `requestAnimationFrame` strands the recursive `frame()` in core/loop.ts — and
 * the world is advanced by hand with `OH.step(seconds)`, which runs the same
 * fixed 1/60 gameplay step and renders each one. Every shot below is taken on a
 * world that is standing still at an instant chosen on purpose.
 */
const LIVE = "https://orchardhours.vercel.app";
const OUT = path.resolve("public/projects/orchardhours/_src");

const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 430, height: 932 };

/* The rows, as planted: five trees to a row on nine-metre centres, four rows
   thirteen metres apart. The alleys between them are where a day is spent, and
   most of these frames are set in one. */
const ALLEY_Z = 13;

async function shot(page, name, options = {}) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`), type: "png", ...options });
  console.log("saved", name);
}

/** Advance the world by hand, in the game's own fixed step. */
const step = (page, s) => page.evaluate((n) => window.OH.step(n), s);

/** Step until the world says so, or give up — for waiting out a walk. */
async function stepUntil(page, test, limit = 30) {
  for (let t = 0; t < limit; t += 0.1) {
    if (await page.evaluate(test)) return true;
    await step(page, 0.1);
  }
  return false;
}

/**
 * Waits for the orchard to be open, then takes the clock off it.
 *
 * `window.OH` is assigned only after the last boot stage resolves, so its
 * presence means every module imported, the rows were planted, and one frame
 * has already been rendered behind the curtain to compile the shaders.
 */
async function ready(page) {
  await page.waitForFunction("window.OH !== undefined", null, { timeout: 180_000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    // core/loop.ts re-arms itself at the top of every frame, so one dud
    // requestAnimationFrame is enough to hand the clock over.
    window.requestAnimationFrame = () => 0;
    // The opening line is a nine-second hint that would otherwise sit across
    // the bottom of half of these frames. Hidden rather than removed: the HUD
    // keeps writing to the element, and a missing one throws.
    const hide = document.createElement("style");
    hide.textContent = "#hint{display:none!important}";
    document.head.append(hide);
  });
  await page.waitForTimeout(200);
  await step(page, 0.2);
}

/** Put the bear somewhere and let it find the ground. */
async function place(page, { x, z, ry = Math.PI }) {
  await page.evaluate((o) => {
    const { character } = window.OH;
    character.position.set(o.x, 6, o.z);
    character.rotation.y = o.ry;
  }, { x, z, ry });
  await step(page, 1.6);
}

/**
 * Aim the rig. `yaw` is the bearing from the bear out to the eye and `panY`
 * lifts the frame off the top of its hat — the orchard's own orbit controls,
 * set by hand rather than dragged.
 *
 * `cam.pan` is always drifting back to zero, so it is re-asserted after the
 * settle and given a single step to take effect.
 */
async function frame(page, { yaw, pitch, dist, panY = 0, settle = 1.0 }) {
  const set = (o) => {
    const { cam } = window.OH;
    cam.yaw = o.yaw;
    cam.pitch = o.pitch;
    cam.dist = o.dist;
    cam.distGoal = o.dist;
    cam.pan.set(0, o.panY, 0);
  };
  await page.evaluate(set, { yaw, pitch, dist, panY });
  await step(page, settle);
  await page.evaluate(set, { yaw, pitch, dist, panY });
  await step(page, 1 / 60);
}

/** Set the hour and let the sky, the sun's bearing and the shadows catch up. */
async function hour(page, t) {
  await page.evaluate((v) => { window.OH.state.dayT = v; }, t);
  await step(page, 0.3);
}

const openBarn = async (page, tab) => {
  await page.click("#btnBarn");
  await page.click(`.tab[data-tab="${tab}"]`);
  await page.waitForTimeout(450);
};
const closeBarn = async (page) => {
  await page.click("#barnClose");
  await page.waitForTimeout(300);
};

/**
 * Walk to an apple, hold the reach at one named phase of it, and shoot it.
 *
 * The rig eases toward where it is told to be — about an eighth of the way per
 * frame — so the camera is aimed the moment the reach begins and the world is
 * stepped into the phase behind it. Aiming after the phase arrives would freeze
 * the bear at the right instant with the camera still on its way over.
 *
 * `turn` is measured off the line of the reach: the bear squares up to the
 * fruit, so `Math.PI` is directly behind it, looking at what it is looking at.
 */
async function holdPick(page, name, pick, phase, aim) {
  await page.evaluate((js) => { window.__t = eval(js); }, pick);
  if (!await page.evaluate("window.__t != null")) throw new Error(`no apple matched: ${pick}`);
  await page.evaluate(() => window.OH.walkToApple(window.__t));
  if (!await stepUntil(page, "window.__t.anim !== null", 40)) throw new Error("the walk never arrived");
  await page.evaluate((o) => {
    const { cam } = window.OH;
    cam.yaw = window.__t.anim.face + o.turn;
    cam.pitch = o.pitch;
    cam.dist = cam.distGoal = o.dist;
  }, aim);
  for (let i = 0; i < 400; i++) {
    // the pan is always drifting home, so it is re-asserted every step
    await page.evaluate((y) => { window.OH.cam.pan.set(0, y, 0); }, aim.panY);
    if (await page.evaluate((ph) => window.__t.anim?.phase === ph, phase)) break;
    await step(page, 1 / 60);
  }
  await shot(page, name);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();

  /* ---- the curtain, mid-draw ------------------------------------------
     Inlined in index.html so it paints before the bundle lands, and its
     stage labels are the only progress readout the game has. Caught on a
     cold load, throttled, so the tree is still drawing itself. */
  {
    const context = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false, latency: 140, downloadThroughput: 210_000, uploadThroughput: 210_000,
    });
    await page.goto(`${LIVE}/`, { waitUntil: "commit" });
    await page.waitForFunction(
      "document.getElementById('bootLabel')?.textContent?.length > 0",
      null, { timeout: 60_000 }
    );
    await page.waitForTimeout(1800);
    await shot(page, "00-boot");
    await context.close();
  }

  const context = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  await context.addInitScript(() => { try { localStorage.clear(); } catch { /* private mode */ } });
  const page = await context.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.log("page error:", m.text()); });

  await page.goto(`${LIVE}/`, { waitUntil: "domcontentloaded" });
  await ready(page);

  /* ---- the rows -------------------------------------------------------
     Down an alley rather than across the rows, and from the clearest point
     in the planting lattice: halfway between two trunks along the row and
     halfway between two rows across it. Anywhere else at this height and
     the eye ends up inside a canopy. */
  await place(page, { x: -4.5, z: ALLEY_Z, ry: -Math.PI / 2 });
  await frame(page, { yaw: -Math.PI / 2, pitch: 0.32, dist: 9.6, panY: 1.3 });
  await shot(page, "01-rows");

  /* ---- a reach, by hand ----------------------------------------------
     Held at the twist: the apple has been cupped and rolled until its
     calyx points at the top of the tree, and it is being turned off the
     spur rather than pulled down off it. Side-on, which is the only angle
     the roll reads from. */
  await holdPick(page, "02-pick-hand", `(() => {
      const { apples, canReach, character } = window.OH;
      return apples
        .filter(a => !a.picked && canReach(a) && a.worldPos.y > 1.55 && a.worldPos.y < 2.15)
        .sort((a, b) => a.worldPos.distanceTo(character.position) - b.worldPos.distanceTo(character.position))[0];
    })()`, "twist", { turn: Math.PI - 1.30, pitch: 0.03, dist: 3.1, panY: 0.45 });

  /* ---- and on the end of the pole -------------------------------------
     Everything above two and a half metres from the bear's feet is the
     pole's job: the hoop goes under the fruit, pushes up, turns, and the
     apple settles into the bag. Held at the hook. */
  // `take` puts the tool in the bear's paws and equips it in one go; calling
  // `equip` after it would toggle it straight back off.
  await page.evaluate(() => window.OH.tools.take("picker"));
  await step(page, 1.0);
  await holdPick(page, "03-pick-pole", `(() => {
      const { apples, canReach, character } = window.OH;
      return apples
        .filter(a => !a.picked && canReach(a) && a.worldPos.y > 5.4)
        .sort((a, b) => a.worldPos.distanceTo(character.position) - b.worldPos.distanceTo(character.position))[0];
    })()`, "hook", { turn: Math.PI + 0.90, pitch: 0.14, dist: 9.0, panY: 1.8 });

  /* ---- the tool rack --------------------------------------------------
     Five tools on the west wall of the barn, and none of them is bought:
     the pole, the ladder, the barrow, the shears and the lantern are all
     on the rack on the first morning. The orchard is what gates them. */
  await page.evaluate(() => {
    window.OH.tools.stow();
    for (const id of ["picker", "ladder", "barrow", "shears", "lantern"]) {
      if (window.OH.state.carried.includes(id)) window.OH.tools.putBack(id);
    }
  });
  await place(page, { x: -7.0, z: -28.4, ry: -1.35 });
  await frame(page, { yaw: 1.30, pitch: 0.10, dist: 3.4, panY: 1.0 });
  await shot(page, "04-rack");

  /* ---- and one of them, out in the rows -------------------------------
     Three basketfuls of overflow. Loaded, it is slow going — everything
     the legs can do is multiplied by 0.62 while it is being pushed — and
     it will not fit between the trunks the way the bear does. */
  await page.evaluate(() => window.OH.tools.take("barrow"));
  await place(page, { x: -2, z: ALLEY_Z, ry: -Math.PI / 2 });
  await frame(page, { yaw: Math.PI / 2 + 1.15, pitch: 0.08, dist: 5.0, panY: 0.5 });
  await shot(page, "04b-barrow");
  await page.evaluate(() => {
    if (window.OH.state.carried.includes("barrow")) window.OH.tools.putBack("barrow");
  });
  await step(page, 0.5);

  /* ---- the barrels ----------------------------------------------------
     A basket holds 24 and a barrel 60, one to the variety, and what is in
     the barrels is the only fruit the merchant will buy. Filled here so
     they read as barrels rather than as empties. */
  await page.evaluate(() => {
    Object.assign(window.OH.state.stored, { honeycrisp: 46, grannysmith: 31, golden: 52, rare: 9 });
    Object.assign(window.OH.state.basket, { honeycrisp: 7, grannysmith: 4, golden: 6, rare: 1 });
    window.OH.state.discovered = { honeycrisp: true, grannysmith: true, golden: true, rare: true };
    window.OH.state.picked = 214;
    window.OH.state.deposited = 138;
    window.OH.state.purse = 980;
    window.OH.state.sold = 1420;
    window.OH.refreshBarrels();
  });
  await page.evaluate(() => { window.OH.$("purse").textContent = "980"; });
  await place(page, { x: -6.4, z: -33.4, ry: -1.4 });
  await frame(page, { yaw: 1.9, pitch: 0.22, dist: 5.0, panY: 0.5 });
  await shot(page, "05-barrels");

  /* ---- the writing desk -----------------------------------------------
     Back-left corner, under the loft. The barn is turned 0.20 rad off the
     grid, so the camera bearing is the barn's own rotation rather than a
     round number — anything else puts the eye through a wall. */
  await page.evaluate(() => {
    const d = window.OH.desk.deskPoint;
    window.OH.character.position.set(d.x, d.y + 0.2, d.z);
    window.OH.character.rotation.y = 0.20 + Math.PI;
  });
  await step(page, 1.2);
  await frame(page, { yaw: 0.20, pitch: 0.26, dist: 3.8, panY: 0.5 });
  await shot(page, "06-desk");

  /* ---- the paper record -----------------------------------------------
     One sheet with five tabs, and every number on it read out of the same
     state the world is drawn from. */
  await openBarn(page, "catalogue");
  await shot(page, "07-catalogue");
  await page.click(`.tab[data-tab="almanac"]`);
  await page.waitForTimeout(400);
  await shot(page, "08-almanac");
  await page.click(`.tab[data-tab="ledger"]`);
  await page.waitForTimeout(400);
  await shot(page, "09-ledger");
  await page.click(`.tab[data-tab="about"]`);
  await page.waitForTimeout(400);
  await shot(page, "10-howto");

  // The sheet body is its own scroller, so a full-page shot would otherwise
  // only ever catch the first screenful. Unclamped, the whole page of the
  // catalogue is one tall figure; the clamp goes straight back on.
  await page.click(`.tab[data-tab="catalogue"]`);
  await page.waitForTimeout(400);
  const unclamp = await page.addStyleTag({
    content: ".sheet{max-height:none!important}.sheet-body{max-height:none!important;overflow:visible!important}",
  });
  await page.waitForTimeout(300);
  await shot(page, "07b-catalogue-full", { fullPage: true });
  await unclamp.evaluate((el) => el.remove());
  await closeBarn(page);

  /* ---- the orchard plan -----------------------------------------------
     Drawn from the same tree list the renderer walks, with a mark on every
     tree that still has fruit at its best on it. */
  await place(page, { x: 0, z: ALLEY_Z });
  await page.evaluate(() => window.OH.openMap());
  await page.waitForTimeout(700);
  await shot(page, "11-plan");
  await page.evaluate(() => window.OH.closeMap());
  await page.waitForTimeout(300);

  /* ---- the hours ------------------------------------------------------
     One camera, four times of day. Sky, sun bearing, key-light colour and
     shadow length are one interpolation across five phases of a 420-second
     day; nothing here is a filter laid over the frame. */
  await place(page, { x: 0, z: ALLEY_Z, ry: -Math.PI / 2 });
  const HOURS = { "12a-early": 0.03, "12b-midday": 0.52, "12c-golden": 0.93, "12d-dusk": 0.988 };
  for (const [name, t] of Object.entries(HOURS)) {
    // the lantern is what the last of these is about, and nothing before it
    if (name === "12d-dusk") {
      await page.evaluate(() => {
        window.OH.tools.take("lantern");
        window.OH.tools.lantern.lit = true;
      });
      await step(page, 1.2);
    }
    await hour(page, t);
    // flatter than the rest of these: the hour is in the sky, so the sky has
    // to be in the frame
    await frame(page, { yaw: Math.PI / 2 - 0.22, pitch: 0.15, dist: 11, panY: 1.4, settle: 0.5 });
    await shot(page, name);
  }

  /* ---- a sit in the grass ---------------------------------------------
     Reaching all day costs the bear something, and sitting down is one of
     the three things that put it back. */
  await hour(page, 0.80);
  await page.evaluate(() => {
    for (const id of ["picker", "ladder", "barrow", "shears", "lantern"]) {
      if (window.OH.state.carried.includes(id)) window.OH.tools.putBack(id);
    }
    window.OH.state.vigour = 0.19;
    window.OH.antics.sitDown();
  });
  await step(page, 2.4);
  // front-quarter: a sit reads off the legs, and from behind there are none
  await page.evaluate(() => {
    const { cam, character } = window.OH;
    cam.yaw = character.rotation.y + 0.85;
    cam.pitch = 0.20;
    cam.dist = cam.distGoal = 5.4;
  });
  for (let i = 0; i < 60; i++) {
    await page.evaluate(() => { window.OH.cam.pan.set(0, 0.1, 0); });
    await step(page, 1 / 60);
  }
  await shot(page, "13-sit");

  /* ---- the farm, grown ------------------------------------------------
     The extension frames four more barrels along the west wall and opens
     the silo behind it; a deed pushes the fence out. Both are ordered from
     the desk and both come with the next morning's post, so the shot has
     to run a night. */
  await page.evaluate(() => {
    window.OH.antics.standUp();
    window.OH.state.purse = 4000;
    window.OH.economy.orderUpgrade("extension");
    window.OH.economy.orderPlot("meadow");
    window.OH.economy.orderMachine("press");
    window.OH.economy.orderSaplings(3);
    window.OH.state.day += 1;
    window.OH.economy.overnight(window.OH.state.day);
    window.OH.refreshBarrels();
  });
  await step(page, 1.5);
  await hour(page, 0.28);
  // high enough to clear the canopies: at eye level the nearest row is in
  // the way of everything the extension changed
  await place(page, { x: -5, z: -25 });
  await frame(page, { yaw: 0.10, pitch: 0.58, dist: 21, panY: 1.0 });
  await shot(page, "14-extension");

  await page.evaluate(() => window.OH.openMap());
  await page.waitForTimeout(800);
  await shot(page, "15-plan-grown");
  await page.evaluate(() => window.OH.closeMap());

  await context.close();

  /* ---- on a phone -----------------------------------------------------
     A coarse pointer swaps the keyboard hints for a stick, a jump, an
     action button and three small ones. The HUD keys off `pointer:coarse`,
     so this has to be a real touch context, not a narrow window. */
  {
    const mobile = await browser.newContext({
      viewport: PHONE, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 " +
        "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    await mobile.addInitScript(() => { try { localStorage.clear(); } catch { /* private mode */ } });
    const m = await mobile.newPage();
    await m.goto(`${LIVE}/`, { waitUntil: "domcontentloaded" });
    await ready(m);
    await place(m, { x: 0, z: ALLEY_Z });
    await frame(m, { yaw: 0.20, pitch: 0.34, dist: 11, panY: 0.9 });
    await shot(m, "m-01-rows");

    await openBarn(m, "catalogue");
    await shot(m, "m-02-catalogue");
    await mobile.close();
  }

  await browser.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
