/** The coach loop: Sprout spots an unclaimed employer match, David claims it, the Money Map moves on. */
const BASE = "https://aureumfinance.vercel.app";

export default {
  title: "Aureum AI",
  kind: "AI finance coach",
  line: "Following Sprout’s nudge to claim a $1,240 employer match, then watching the Money Map move on.",

  async setup(s) {
    const { page } = s;
    // App state lives in this browser's localStorage: start from the demo seed every time.
    await page.goto(`${BASE}/app/`, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "networkidle" });
    await page.getByText("Explore with demo data").click();
    await page.locator('aside .stack [data-insight="P1-match"]').first().waitFor();
    await s.wait(2500); // charts draw in, Sprout's cards settle
  },

  async act(s) {
    const { page } = s;
    // The match card in the coach rail beside Home.
    const card = page.locator('aside .stack [data-insight="P1-match"]').first();
    const cardFocus = await centre(card);
    await s.hold(700); // Home: safe to spend, next step, Sprout's top card
    await s.clickEl(card.locator("[data-why]"), { zoom: 1.6 });
    await s.hold(1300, { zoom: 1.6, focus: { x: cardFocus.x, y: cardFocus.y + 60 } }); // the reason and its source

    // One tap to the employer match calculator on the Money Map.
    await s.clickEl(page.locator('aside .stack [data-insight="P1-match"] [data-op]').first(), { zoom: 1.6 });
    const slider = page.locator("#retPct");
    const sb = await settledInView(page, slider); // the plan smooth-scrolls itself to #match
    const at = (pct) => sb.x + 10 + ((sb.width - 20) * pct) / 15; // 0–15% range, inset by the thumb
    const y = sb.y + sb.height / 2;
    const focus = { x: sb.x + sb.width / 2, y: y + 70 };
    await s.hold(500, { zoom: 1.3, focus });
    await s.drag([[at(2), y], [at(3), y], [at(4), y]], { zoom: 1.3, focus, ms: 1300 });
    if (+(await slider.inputValue()) !== 4) throw new Error(`drag left the match at ${await slider.inputValue()}%`);
    await s.hold(1100, { zoom: 1.3, focus }); // employer adds per year updates

    // Confirm: full match unlocked, confetti, and the step checks off.
    await s.clickEl(page.locator("#saveRet"), { zoom: 1.3 });
    await s.hold(1800, { zoom: 1.15, focus }); // toast + confetti
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await s.hold(1600); // the Money Map with step 3 done
  },
};

/**
 * Wait for `locator` to scroll on screen and stop there, so the cursor never drags at coordinates measured mid-scroll.
 */
async function settledInView(page, locator) {
  const vh = page.viewportSize().height;
  let last = null, still = 0;
  for (let i = 0; i < 60; i++) {
    const b = await locator.boundingBox();
    const inView = b && b.y > 80 && b.y + b.height < vh - 80;
    if (inView && last && Math.abs(b.y - last.y) < 0.5) {
      if (++still >= 4) return b;
    } else still = 0;
    last = b;
    // The app's own scroll-to-#match doesn't always fire; take the viewer there smoothly.
    if (i === 15 && !inView) await locator.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
    await page.waitForTimeout(100);
  }
  throw new Error("slider never settled on screen");
}

async function centre(locator) {
  const b = await locator.boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}
