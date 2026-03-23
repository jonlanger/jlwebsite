export type PastProject = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Intrinsic pixel size of the case-study PNG (used for layout + `next/image`). */
  width: number;
  height: number;
};

export const pastProjects: PastProject[] = [
  {
    slug: "accessible-fastener",
    title: "Accessible fastening system",
    description:
      "A magnetic-assisted fastening system for people with dexterity challenges, from research through prototyping.",
    image: "/projects/accessible-fastener.png",
    alt: "Case study board for an accessible clothing fastener alternative to zippers.",
    width: 1960,
    height: 10650,
  },
  {
    slug: "ai-camera-nodit",
    title: "Nodit AI Camera",
    description:
      "Camera and sensing concept integrating AI-assisted capture and hardware layout.",
    image: "/projects/voxelplm.png",
    alt: "Nodit AI camera product case study.",
    width: 1960,
    height: 9278,
  },
  {
    slug: "h2-audio",
    title: "H2 Audio",
    description:
      "Audio product and hardware exploration—from use cases through industrial design and visualization.",
    image: "/projects/ai-camera-nodit.png",
    alt: "H2 Audio product case study board.",
    width: 1960,
    height: 10514,
  },
  {
    slug: "animation-physics",
    title: "Animation & physics simulations",
    description:
      "A grid of physics-based animation studies including fluids, cloth, rigid bodies, and particles.",
    image: "/projects/animation-physics.png",
    alt: "Grid of animation and physics simulation thumbnails.",
    width: 1960,
    height: 9230,
  },
  {
    slug: "e-syringe",
    title: "Electronic syringe",
    description:
      "Medical injection device concept with digital interface and ergonomic hardware exploration.",
    image: "/projects/e-syringe.png",
    alt: "Electronic syringe product design case study.",
    width: 1960,
    height: 7482,
  },
  {
    slug: "ecowell-c79b",
    title: "Ecowell — case study (C79B)",
    description:
      "A custom sustainable drink machine—from sketches and renders to prototype in context.",
    image: "/projects/ecowell-c79b.png",
    alt: "Ecowell sustainable drink machine case study board.",
    width: 1960,
    height: 8256,
  },
  {
    slug: "ecowell-c8l9",
    title: "Ecowell — case study (C8L9)",
    description:
      "Alternate case-study layout for the Ecowell sustainable drink machine.",
    image: "/projects/ecowell-c8l9.png",
    alt: "Ecowell drink machine case study, alternate board.",
    width: 1960,
    height: 5072,
  },
  {
    slug: "footwear-sketches",
    title: "Footwear concept sketches",
    description:
      "Industrial design explorations for tech-forward footwear—silhouettes, materials, and assembly studies.",
    image: "/projects/footwear-sketches.png",
    alt: "Composite of hand-drawn futuristic footwear concept sketches.",
    width: 1960,
    height: 2860,
  },
  {
    slug: "laser-scalpel",
    title: "Laser scalpel",
    description:
      "Surgical laser instrument design with clinical context and mechanical detail.",
    image: "/projects/laser-scalpel.png",
    alt: "Laser scalpel medical device case study.",
    width: 1960,
    height: 5686,
  },
  {
    slug: "lllt-knee-brace-c1zug",
    title: "Low level laser therapy — knee brace study",
    description:
      "Wearable knee therapy device: research, hardware, app UI, and final renders.",
    image: "/projects/lllt-knee-brace-c1zug.png",
    alt: "LLLT knee brace case study with app and product renders.",
    width: 1960,
    height: 10010,
  },
  {
    slug: "lllt-knee-osteoarthritis",
    title: "Low level laser therapy",
    description:
      "Extended case study for knee osteoarthritis therapy—from anatomy and sketches to app and product.",
    image: "/projects/lllt-knee-osteoarthritis.png",
    alt: "LLLT knee osteoarthritis case study board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "medical-recovery-systems",
    title: "Medical Recovery & Rehabilitation System",
    description:
      "Clinical concepts spanning 3D scanning for recovery, pediatric therapeutic play, prosthetic training, and bed-side systems.",
    image: "/projects/medical-recovery-systems.png",
    alt: "Compilation of medical device and rehabilitation design projects.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "medication-adherence",
    title: "Medication non-adherence research",
    description:
      "Stakeholder research, field methods, and visual synthesis on adherence in an aging population.",
    image: "/projects/medication-adherence.png",
    alt: "Infographic on medication non-adherence research and field study.",
    width: 1960,
    height: 4962,
  },
  {
    slug: "micro-windmill",
    title: "Micro windmill",
    description:
      "Small-scale wind energy harvesting concept and visualization.",
    image: "/projects/micro-windmill.png",
    alt: "Micro windmill energy concept case study.",
    width: 1960,
    height: 8528,
  },
  {
    slug: "moto-id",
    title: "Moto ID",
    description:
      "Vehicle and mobility identity system exploration.",
    image: "/projects/moto-id.png",
    alt: "Moto ID branding and mobility concept board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "oasis",
    title: "Oasis",
    description:
      "Product or environment concept for hydration, retail, or experiential design.",
    image: "/projects/oasis.png",
    alt: "Oasis project case study board.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "smart-hydration-platform",
    title: "Smart Hydration",
    description:
      "Connected bottle, gym hardware, mechanical detail, and companion app UX for hydration and training.",
    image: "/projects/smart-hydration-platform.png",
    alt: "Smart connected hydration and fitness platform case study.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "solar-field-installation",
    title: "Automated Solar Field",
    description:
      "Robotic solar deployment in the field, team operations, software dashboards, and system diagrams.",
    image: "/projects/solar-field-installation.png",
    alt: "Automated solar field installation system case study.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "stemcell-spray",
    title: "Autonomous Shipping Systems for trackless trains",
    description:
      "Modular wheeled platforms for containerized freight, shown in environment, port loading, and component detail.",
    image: "/projects/stemcell-spray.png",
    alt: "Autonomous trackless train shipping and modular freight platforms case study.",
    width: 1960,
    height: 10606,
  },
  {
    slug: "stemcell-spray-alt",
    title: "Stemcell spray system",
    description:
      "Pain-free skin grafting workflow with device renders, cartridges, and mobile app screens.",
    image: "/projects/stemcell-spray-alt.png",
    alt: "Stemcell spray system for skin grafting case study.",
    width: 1960,
    height: 9938,
  },
  {
    slug: "teleoperation-station",
    title: "Teleoperation System",
    description:
      "Modular remote operation workstations for vehicles and robots, from use cases to scalable room layouts.",
    image: "/projects/teleoperation-station.png",
    alt: "Teleoperation station for vehicles and robotics case study.",
    width: 1960,
    height: 12142,
  },
  {
    slug: "uav-humanitarian-delivery",
    title: "Human-centric UAV delivery",
    description:
      "Aerial logistics for sparse infrastructure—operations, payload, testing, and modular airframe diagrams.",
    image: "/projects/uav-humanitarian-delivery.png",
    alt: "UAV humanitarian delivery case study with drone renders and process photos.",
    width: 1960,
    height: 16384,
  },
  {
    slug: "vaccine-transport",
    title: "Vaccine transport for mobile Africa",
    description:
      "Cold-chain portable carrier inspired by real mobility constraints, from research through exploded technical views.",
    image: "/projects/vaccine-transport.png",
    alt: "Vaccine transport system for mobile Africa case study.",
    width: 1960,
    height: 13362,
  },
  {
    slug: "vaccine-transport-c23c1",
    title: "Vaccine transport — alternate board",
    description:
      "Alternate case-study layout for the mobile vaccine transport system.",
    image: "/projects/vaccine-transport-c23c1.png",
    alt: "Alternate vaccine transport for mobile Africa case study board.",
    width: 1960,
    height: 12904,
  },
  {
    slug: "voxelplm",
    title: "Voxel PLM",
    description:
      "Product lifecycle and 3D data workflow concept visualization.",
    image: "/projects/autonomous-shipping.png",
    alt: "Voxel PLM software and process case study.",
    width: 1960,
    height: 12218,
  },
  {
    slug: "mdx",
    title: "MDX",
    description:
      "Medical Health Learning platform—research, UX, and system visualization for clinical education.",
    image: "/projects/voxelplm-board-1.png",
    alt: "MDX Medical Health Learning platform case study board.",
    width: 1960,
    height: 9068,
  },
];

const bySlug = new Map(pastProjects.map((p) => [p.slug, p]));

/**
 * Row-major order for the /projects grid (top-left → right, then next row).
 * Remaining projects follow in alphabetical order by title.
 */
export const PAST_PROJECT_GRID_ORDER: readonly string[] = [
  "oasis",
  "ai-camera-nodit",
  "h2-audio",
  "smart-hydration-platform",
  "solar-field-installation",
  "medical-recovery-systems",
  "teleoperation-station",
  "voxelplm",
  "mdx",
  "lllt-knee-osteoarthritis",
];

export function sortPastProjectsForGrid(projects: readonly PastProject[]): PastProject[] {
  const map = new Map(projects.map((p) => [p.slug, p]));
  const ordered: PastProject[] = [];
  const seen = new Set<string>();
  for (const slug of PAST_PROJECT_GRID_ORDER) {
    const p = map.get(slug);
    if (p) {
      ordered.push(p);
      seen.add(slug);
    }
  }
  const rest = projects
    .filter((p) => !seen.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title));
  return [...ordered, ...rest];
}

export function getPastProject(slug: string): PastProject | undefined {
  return bySlug.get(slug);
}

export function getPastProjectSlugs(): string[] {
  return pastProjects.map((p) => p.slug);
}
