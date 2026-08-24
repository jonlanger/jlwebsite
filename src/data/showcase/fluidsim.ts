import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "fluidsim",
  category: "experiments",
  title: "Attractor Particles",
  description:
    "GPU particle simulation that records its own motion, measures which channels the swarm keeps returning to, and exports that flow as a printable solid.",
  image: "/projects/fluidsim/fluidsim_card.webp",
  alt: "Particle swarm tinted violet to orange, orbiting three attractor gizmos against black.",
  width: 1024,
  height: 576,
  liveUrl: "https://fluidsim-gamma.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "A real-time N-body simulation where three point masses pull a swarm of 131,072 particles, spinning it around each attractor's own orientation axis. The whole integration step runs as a compute shader — three.js WebGPURenderer with TSL — so the swarm stays interactive while every particle is being solved on the GPU.",
      "The experiment is not the simulation itself. It is what happens after: a swarm is motion, and motion has no shape you can hold. Recording a clip, measuring where the particles actually persist, and fusing that into one solid turns something ephemeral into a part you can print.",
    ],
    role: "Solo build — simulation, interaction design, geometry pipeline",
    scope:
      "Web app — WebGPU compute simulation, attractor gizmos, clip recording, voxel flow analysis, STL/OBJ export",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Particle simulations are usually watched, not kept. You tune parameters until something looks right, record video, and the geometry never exists as geometry — it stays a sequence of frames. Exporting the particles at a single instant does not fix this either: one frame of a swarm is a cloud of disconnected specks, not a shape, and it throws away the part that was actually interesting — the path.",
        "The design problem is deciding what counts as the object. Across a clip, most particles wander. A few regions get swept repeatedly, and those sustained channels are what reads as the form. Separating one from the other is the whole exercise.",
      ],
      topicGroups: [
        {
          title: "What makes this hard",
          items: [
            {
              title: "Motion has no surface",
              body: "A swarm is defined by where particles go over time. Any single frame discards the trajectory that gave it structure.",
            },
            {
              title: "Density is not persistence",
              body: "A crowd that is briefly dense as it sweeps past looks identical to a sustained channel unless you measure across the whole clip.",
            },
            {
              title: "Printable means connected",
              body: "A cloud of separated spheres is not a part. The exported mesh has to fuse into solid, manufacturable geometry.",
            },
          ],
        },
        {
          title: "Constraints",
          items: [
            {
              title: "Interactive throughout",
              body: "The simulation stays live while you drag attractors — no offline bake step between changing something and seeing it.",
            },
            {
              title: "Honest export",
              body: "One sphere per particle at every position it held across the clip. Nothing smoothed, refitted, or reweighted on the way out.",
            },
            {
              title: "Slicer-sized output",
              body: "Past roughly 2M triangles an STL gets slow to open, so the interface has to show that cost before you export.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "131,072",
          label: "Particles simulated",
          detail: "Solved every frame in a WebGPU compute shader.",
        },
        {
          value: "3",
          label: "Attractors",
          detail:
            "Draggable, rotatable gizmos — position and spin axis both reshape the swarm.",
        },
        {
          value: "50³",
          label: "Voxel grid",
          detail: "The density field the recorded clip is measured against.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The pipeline runs in four moves: simulate, record, measure, export. Recording tracks every particle across the clip. Analysis then buckets those positions into a voxel grid and scores each cell — not just how crowded it got, but how much of the clip it stayed occupied for. That separation between density and persistence is what distinguishes a channel the swarm keeps returning to from a crowd that happened to pass through. Exporting the raw recording instead, below left, shows why the measurement is needed at all: a handful of particles slung out to the simulation bounds stretch the model across an 8-unit cube, leaving the actual body a speck at the centre trailed by streamers. Measured and filtered, below right, the same clip resolves to a 140,080-triangle shell about one unit across.",
        "Five controls shape that result, and each one is a judgment about what belongs. Flow Scale sets the measurement resolution — too fine and every cell holds one particle so nothing stands out; too coarse and the whole swarm reads as one blob. Density discards the sparsest share of cells. Persistence sets how much of the clip a cell must stay occupied. Membership decides how much of a particle's own path must sit inside those cells before the whole particle counts — whole trajectories are kept, so nothing exports as fragments. Fill Gaps closes the pits and hollows that cell-by-cell measurement leaves behind. The threshold is the shape: the two exports below come from the same simulation, one holding a tight cutoff at 262,596 triangles, the other opened up to 824,400, and they are recognisably different objects rather than the same object at two resolutions.",
        "Density alone gets you a cloud, not a part. Each surviving particle is stamped as a sphere at every position it held, so the mesh arrives as hundreds of thousands of overlapping shells that have to fuse into something a slicer will accept as solid. Fill Gaps closes interior voids the outside cannot reach — measurement is per-cell, so what it keeps comes out porous, pitted where cells fell just under the cutoff and hollow where the flow wrapped a quieter middle. Even fused, an export usually lands as several disconnected bodies. The three below come from the companion fluid simulation: its packed starting block at left, a sampled variant in the middle, and at right an export with 'largest mass only' enabled, which discards every component but the biggest so what reaches the slicer is a single part — 639,880 triangles against 655,360 for the unreduced block.",
        "Everything above runs into a hard ceiling: past roughly 2M triangles an STL gets slow to open in a slicer, so the interface shows the triangle estimate before you commit. Three settings feed it — Particle Count samples evenly across the surviving pool, Frames sets how many points along each trajectory get stamped, and Sphere Radius sets how fat each stamp is. They multiply, which is what makes the budget easy to blow: the two tube-swept exports below sit at 1.86M and 1.85M triangles, close enough to the ceiling that any further thickness has to be bought by sampling fewer particles or fewer frames.",
      ],
      figuresLayout: "grid-2",
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/fluidsim/export-unfiltered.webp",
          alt: "Unfiltered export: sparse particle strays scattered across a large cube with a small dense body at the centre.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/fluidsim/export-main-flow.webp",
          alt: "Main flow export: a fused bowl-shaped shell of stamped spheres tinted violet to orange.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/fluidsim/export-density-tight.webp",
          alt: "Tight density threshold export forming a thin, flat spiral disc.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/fluidsim/export-density-loose.webp",
          alt: "Looser density threshold export retaining a taller, fuller volume of the same swarm.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/fluidsim/export-fluid.webp",
          alt: "Fluid simulation exported as a dense cube-shaped block of packed particles.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/fluidsim/export-fluid-random.webp",
          alt: "Fluid export sampled across the particle pool, giving a looser, more open mass.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/fluidsim/export-largest-mass.webp",
          alt: "Same fluid clip reduced to its single largest connected mass, one solid printable body.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 3,
          src: "/projects/fluidsim/export-tube-sweep.webp",
          alt: "Trajectories swept as continuous tubes, forming layered filament loops.",
          width: 1400,
          height: 1050,
        },
        {
          afterParagraphIndex: 3,
          src: "/projects/fluidsim/export-tube-thin.webp",
          alt: "Thinner tube sweep of the same trajectories at a higher trail density.",
          width: 1400,
          height: 1050,
        },
      ],
      topicGroups: [
        {
          title: "Why it is structured this way",
          items: [
            {
              title: "Measure the clip, not the frame",
              body: "Every tracked particle is bucketed across every recorded frame, so the shape comes from accumulated motion rather than one instant.",
            },
            {
              title: "Percentile, not absolute",
              body: "Density is a percentile cutoff, so it means the same thing whether the clip is two seconds or twenty.",
            },
            {
              title: "Keep whole trajectories",
              body: "Membership qualifies particles, not positions — a particle is in or out entirely, which is what keeps the export solid instead of speckled.",
            },
            {
              title: "Show the cost before the export",
              body: "Particle count, frames, and sphere radius multiply into the triangle total, so the estimate updates live rather than failing in the slicer.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "4.7×",
          label: "Triangles removed",
          detail:
            "655,360 unfiltered down to 140,080 once the main flow is isolated.",
        },
        {
          value: "~2M",
          label: "Triangle ceiling",
          detail:
            "Practical limit before an STL gets slow to open; tube exports run to 1.86M.",
        },
        {
          value: "1 body",
          label: "Largest mass only",
          detail:
            "Discards every disconnected component so the export is a single printable part.",
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The interface keeps the simulation full-bleed and puts the controls in two collapsible panels, so the swarm stays the subject at every step from tuning through export.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/fluidsim/product-swarm.webp",
            alt: "Particle swarm alone on black, panels collapsed, attractor gizmos visible.",
            width: 1800,
            height: 1125,
            title: "The swarm",
            caption:
              "Panels collapse to pills so the simulation runs unobstructed. Particles tint from violet to orange as their speed approaches Max Speed.",
          },
          {
            src: "/projects/fluidsim/product-full-interface.webp",
            alt: "Full interface with Simulation panel left and Flow & Export panel right.",
            width: 1800,
            height: 1125,
            title: "Full interface",
            caption:
              "Simulation parameters on the left, flow measurement and export on the right, record bar along the bottom.",
          },
          {
            src: "/projects/fluidsim/product-simulation-panel.webp",
            alt: "Simulation panel showing parameter sliders and attractor controls.",
            width: 1800,
            height: 1125,
            title: "Simulation parameters",
            caption:
              "Attractor and particle mass, max speed, damping, spinning strength, and bounds — plus gizmo mode and the speed-based color ramp.",
          },
          {
            src: "/projects/fluidsim/product-recorded-clip.webp",
            alt: "Recorded clip loaded with Main Flow controls listing Flow Scale, Density, Persistence, Membership, and Fill Gaps.",
            width: 1800,
            height: 1125,
            title: "Record a clip",
            caption:
              "Recording captures every particle across the clip. The Main Flow controls each carry an explanation of what the knob decides and what it trades away.",
          },
          {
            src: "/projects/fluidsim/product-main-flow.webp",
            alt: "Analyzed clip with the dense main flow isolated and discarded particles scattered around it.",
            width: 1800,
            height: 1125,
            title: "Measure the flow",
            caption:
              "Analysis resolves the density field into a main flow — the dense body is what the swarm kept returning to; the scattered remainder is what fell below the cutoff.",
          },
          {
            src: "/projects/fluidsim/product-export.webp",
            alt: "Export panel showing flow particle counts, cell counts, sphere radius, particle count, and frame controls.",
            width: 1800,
            height: 1125,
            title: "Export a solid",
            caption:
              "Readouts report exactly what was kept — 99,404 of 131,072 particles, 3,042 core cells, 35,086 occupied — and the triangle estimate updates before you commit to an STL.",
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The result is a small tool that closes a loop most particle work leaves open: from live GPU simulation, through a measurement of what the motion actually was, to a solid you can hand to a slicer. The interesting design work turned out to be the vocabulary — naming density, persistence, and membership as separate decisions, and writing each control so it explains what it keeps and what it discards rather than just exposing a number.",
      ],
      stats: [
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at fluidsim-gamma.vercel.app.",
        },
        {
          value: "99,404",
          label: "Particles kept",
          detail:
            "Of 131,072 simulated, on a two-second clip at default thresholds.",
        },
        {
          value: "143",
          label: "Frames recorded",
          detail:
            "Sampled evenly on export; each sampled frame stamps a sphere per particle.",
        },
        {
          value: "STL / OBJ",
          label: "Export formats",
          detail:
            "Fused to a single solid, with an option to keep only the largest connected mass.",
        },
      ],
    },
  ],
};
