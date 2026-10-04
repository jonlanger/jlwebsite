/**
 * Which projects are in the home page reel, and in what order.
 * Lead with the strongest clip — viewers decide in the first 5–10 seconds.
 * Each slug needs a matching file in ./projects/<slug>.mjs.
 */
export default {
  order: [
    "fluidsim",
    "collabfin",
    "petricor",
    "relationshipviz",
    "shortlist",
    "solar-field-installation",
    "careshift",
    "climate-sync",
    "atomicatlas",
    "botanica",
  ],

  /** Capture settings shared by every clip (per-project files can override). */
  capture: {
    viewport: { width: 1440, height: 810 },
    dsf: 2, // 2880×1620 frames, so 1.5× zooms still render sharp at 1080p
    zoom: 1.5, // default camera zoom on clicks
    idleSpeed: 4, // fast-forward for time between actions
  },

  outputs: {
    desktop: { width: 1920, height: 1080, bitrate: 4_000_000 },
    mobile: { width: 1280, height: 720, bitrate: 2_000_000 },
  },
};
