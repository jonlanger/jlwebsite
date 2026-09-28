/**
 * Onboarding, Map & size: trace a lot's fence on satellite imagery and the
 * grid fills with every robot it can hold, then fill the site.
 *
 * The default new site (Barstow Logistics Yard) has a dirt access track running
 * NNE through the frame. The fence stays entirely west of it, with its east
 * side parallel to the track, so no slot lands on the road and the app puts the
 * truck drop-off on the fence facing it.
 */
const MAP_FOCUS = { x: 1066, y: 526 }; // centre of the map card at 1440×810

export default {
  title: "SolarSwarm",
  kind: "Fleet platform",
  line: "Tracing a fence line fills the lot with robots, clear of the access road.",
  colorScheme: "dark",

  async setup(s) {
    await s.page.goto("https://solarswarm.vercel.app/app/onboarding", { waitUntil: "networkidle" });
    await s.wait(2500);
    await s.page.getByRole("button", { name: /^Continue/ }).click(); // Choose site → Map & size
    await s.wait(7000); // sub-metre imagery tiles
  },

  async act(s) {
    const post = { zoom: 1.2, focus: MAP_FOCUS, ms: 480, pause: 140 };
    await s.hold(500, { zoom: 1.2, focus: MAP_FOCUS });
    // Fence posts, clockwise from the north-west corner; the east side follows the track.
    await s.click(765, 335, post);
    await s.click(1115, 335, post);
    await s.click(1040, 690, post);
    await s.click(765, 690, post);
    await s.click(765, 335, post); // close on the first post
    await s.hold(2000); // map fits the lot; slots, swap and drop-off appear
    await s.clickEl(s.page.getByRole("button", { name: "Fill site" }), { zoom: 1 });
    await s.hold(1800); // every usable slot becomes a unit
  },
};
