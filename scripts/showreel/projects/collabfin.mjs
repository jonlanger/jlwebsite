/** Raise the savings split and watch the emergency-fund date pull in. */
export default {
  title: "Collabfin",
  kind: "Collaborative app",
  line: "Raising the savings split pulls the emergency fund in by eight months.",
  colorScheme: "dark",

  async setup(s) {
    // The live demo runs its browser-only store, which seeds the Household board.
    await s.page.goto("https://collabfinance.vercel.app/boards", { waitUntil: "networkidle" });
    await s.page.getByText("Household budget", { exact: true }).click();
    await s.page.waitForURL(/\/boards\/.+/);
    await s.wait(2500);
  },

  async act(s) {
    const { page } = s;
    const slider = page.getByRole("slider", { name: "Share to send" });
    const goal = page.getByText("You get there by").first();
    const sb = await slider.boundingBox();
    const gb = await goal.boundingBox();
    const at = (pct) => sb.x + 8 + ((sb.width - 16) * pct) / 100; // thumb travel, inset by its radius
    const y = sb.y + sb.height / 2;
    // Frame the split and the goal together so both numbers are in shot.
    const focus = { x: (sb.x + gb.x + gb.width) / 2 + 50, y: (y + gb.y) / 2 + 40 };

    await s.hold(500, { zoom: 1.25, focus });
    await s.drag([[at(30), y], [at(45), y], [at(60), y]], { zoom: 1.25, focus, ms: 1600 });
    await s.hold(2400, { zoom: 1.25, focus }); // goal date and link amounts settle
  },
};
