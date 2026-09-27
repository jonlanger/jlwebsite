/** Change priority presets and watch the ranking re-sort. */
export default {
  title: "Shortlist",
  kind: "Decision tool",
  line: "Changing priorities and watching the ranking re-sort.",

  async setup(s) {
    await s.page.goto("https://shortlisthome.vercel.app/#examples", { waitUntil: "networkidle" });
    await s.wait(800);
    await s.page.getByRole("link", { name: /^Balanced/ }).click();
    await s.wait(2500);
    await s.page.mouse.wheel(0, 330);
    await s.wait(900);
  },

  async act(s) {
    const { page } = s;
    // Zoom sits between the preset buttons and the ranking so both stay in view.
    const focus = { x: 420, y: 420 };
    for (const name of ["Transit-first", "Schools-first", "Budget-first"]) {
      await s.clickEl(page.getByRole("button", { name }), { zoom: 1.35, focus, ms: 650 });
      await s.hold(800, { zoom: 1.35, focus });
    }
  },
};
