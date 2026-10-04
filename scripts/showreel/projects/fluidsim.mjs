/** Record the swarm while reshaping it, then analyze which channels persist. */
export default {
  title: "Attractor Particles",
  kind: "Creative tech",
  line: "Recording a GPU particle swarm while reshaping it, then analysing its main flow.",

  async setup(s) {
    await s.page.goto("https://fluidsim-gamma.vercel.app/", { waitUntil: "networkidle" });
    await s.wait(4500);
  },

  async act(s) {
    const { page } = s;
    await s.hold(700); // open on the live swarm
    // The app records a fixed 2s clip and stops on its own — there is no Stop
    // click. The drag has to land inside that window, so keep it short.
    await s.clickEl(page.getByRole("button", { name: /Record/ }), { zoom: 1.6 });
    // Pull the right-hand attractor across the scene while it records.
    await s.drag([[920, 386], [870, 320], [790, 280], [730, 270]], { ms: 1000, approachMs: 400 });
    const analyze = page.getByRole("button", { name: "Analyze" });
    await analyze.waitFor({ state: "visible" }); // recording has ended
    await s.hold(400);
    await s.clickEl(analyze, { zoom: 1.6 });
    await s.wait(1500);
    await s.hold(1400); // the analysed flow
  },
};
