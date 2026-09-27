/** Turn a protein, click into its structure, and inspect a helix. */
export default {
  title: "AtomicAtlas",
  kind: "Scientific viz",
  line: "Turning a protein, then inspecting the helices and strands it’s built from.",

  async setup(s) {
    await s.page.goto("https://atomicatlas-three.vercel.app/molecules/1aqz", { waitUntil: "networkidle" });
    await s.wait(4000);
  },

  async act(s) {
    const { page } = s;
    await s.drag([[1100, 560], [1000, 520], [900, 480]], { ms: 1300 });
    await s.hold(300);
    await s.click(975, 315, { zoom: 1.3 }); // a strand opens the inspector
    await s.wait(600);
    await s.hold(900);
    await s.clickEl(page.getByRole("button", { name: /^Helix 1/ }), { zoom: 1.3, focus: { x: 1000, y: 470 } });
    await s.hold(1500);
  },
};
