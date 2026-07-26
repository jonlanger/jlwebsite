import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "climate-sync",
  title: "Climate Sync",
  description:
    "Interactive globe that links major cities by shared climate fingerprints—so adaptation ideas can travel between places facing similar weather, water, and risk.",
  image: "/projects/climate-sync/climate-sync_card.png",
  alt: "Climate Sync globe showing city markers and teal sync arcs across East Asia.",
  width: 1280,
  height: 720,
  liveUrl: "https://climatesync.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Cities often look for peers when planning for heat, floods, drought, or fire weather—but those peers are not always nearby. A monsoon megacity and a tropical coastal hub can share hydrologic stress even when average temperatures differ.",
      "Climate Sync makes those analogues visible: pick a place or a theme, and a rotatable Earth clusters cities whose climates rhyme—so planners, journalists, and curious readers can compare what worked under similar constraints.",
    ],
    role: "Lead Designer — Product Design, Interaction Design, Engineering (solo build)",
    scope:
      "Web app — interactive globe, Sync Insights catalog, city climate briefs, climate query & similarity search",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Adaptation playbooks travel poorly when “nearby” is the only peer filter. Climate data is abundant, but city-to-city affinity—who shares a rainfall, heat, or fire-weather regime—is hard to see at a glance.",
      ],
      topicGroups: [
        {
          title: "Why analogues matter",
          items: [
            {
              title: "Peers beyond geography",
              body: "Useful climate twins are often continents apart—matching by latitude or region alone misses the signal.",
            },
            {
              title: "Comparable climatic budgets",
              body: "Planners and journalists need places with similar weather, water, and risk structures—not identical governance or topography.",
            },
            {
              title: "A starting map, not a verdict",
              body: "Local terrain, infrastructure, and policy still decide outcomes. Analogues open comparison; they don’t replace hazard models.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Readable at city scale",
              body: "Hundreds of cities on one globe—matches, hubs, and arcs have to stay scannable without drowning the map.",
            },
            {
              title: "Two ways in",
              body: "Free-text climate queries and curated Sync Insights both need to land on the same affinity model.",
            },
            {
              title: "Honest limits",
              body: "Fingerprints summarize monthly climate structure. Extreme events and local exposure stay outside the claim.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "~450",
          label: "Cities on the globe",
          detail: "Major urban centers with climate profiles and hazard overlays.",
        },
        {
          value: "73",
          label: "Sync Insights",
          detail: "Curated themes across water, heat, storms, fire, coasts, and more.",
        },
        {
          value: "8",
          label: "Theme categories",
          detail: "Water, temperature, storms, fire, geologic, coastal, climate zones, analogues.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "The problem was framed around people who need climate peers without claiming identical cities: planners scanning for adaptation analogues, journalists comparing risk stories, and readers exploring how weather regimes connect places.",
        "Comparing analogous climates is hard in existing tools—spreadsheets, static maps, and regional reports don’t make affinity spatial or scannable. The design goal was a single interactive surface where a theme or city focus lights up peers by fingerprint, not by shared borders.",
      ],
      table: {
        ariaLabel: "Audiences and discovery needs",
        rows: [
          {
            col1: "Planners & policy teams",
            col2: "Find cities with comparable climatic budgets to learn how peers adapted under similar constraints.",
          },
          {
            col1: "Journalists & analysts",
            col2: "Ground risk stories in climate analogues—who else faces this rainfall, heat, or fire-weather pattern.",
          },
          {
            col1: "Curious explorers",
            col2: "Browse themes and city briefs without needing GIS expertise or a climate-science background.",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "The product IA splits into two entry paths that converge on the same globe: free-text climate queries (“flood,” “cities like Nairobi”) and curated Sync Insights across eight theme categories. Similarity scoring lights peer cities; gold hubs mark strong exemplars and teal arcs draw the sync network.",
        "Selecting a city opens a climate brief—profile traits, risks, 2020 vs 2040 outlook, and related news—so affinity on the map always has a readable local story beside it.",
      ],
      topicGroups: [
        {
          title: "How matching works",
          items: [
            {
              title: "Climate fingerprints",
              body: "Each city carries seasonal temperature and precipitation structure plus risk and hazard labels.",
            },
            {
              title: "Query focus",
              body: "Searches resolve into dimensions—precip intensity, aridity, heat, storms, and more—then score peers by affinity.",
            },
            {
              title: "Sync Insights",
              body: "Curated themes explain the signal, cite sources, and activate the same globe query for hub-and-arc clusters.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story runs from an explore-first globe through Sync Insights and similarity search into city climate briefs—turning abstract affinity into something you can see and read.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/climate-sync/product-explore-home.png",
            alt: "Climate Sync Explore view with Sync Insights list and city markers on the globe.",
            width: 3840,
            height: 2160,
            title: "Explore the globe",
            caption:
              "Browse curated Sync Insights by category, or search a theme—matching cities light up on a rotatable Earth.",
          },
          {
            src: "/projects/climate-sync/product-flood-sync.png",
            alt: "Heavy rainfall Sync Insight with gold hubs, teal arcs, and ranked city matches.",
            width: 3840,
            height: 2160,
            title: "Sync Insights on the map",
            caption:
              "Activate a theme like heavy rainfall—gold hubs mark exemplars, teal arcs link peers, and ranked matches list affinity scores.",
          },
          {
            src: "/projects/climate-sync/product-city-brief.png",
            alt: "Mumbai city climate brief beside the globe showing sync arcs and insight panel.",
            width: 3840,
            height: 2160,
            title: "City climate brief",
            caption:
              "Focus a city for profile traits, risks, outlook, and news—while the globe keeps the peer network in view.",
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "The goal was not another climate dashboard—it was to make analogous data across locations easier to see. Comparing cities by shared fingerprints is usually stuck in tables, reports, or GIS workflows that hide the spatial story. Climate Sync turns affinity into a browsable map: themes, peers, and briefs in one place, with citations and clear limits so syncs stay a starting point for exchange—not a substitute for local hazard models.",
      ],
      stats: [
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at climatesync.vercel.app.",
        },
        {
          value: "~450",
          label: "Cities profiled",
          detail: "Fingerprints grounded in CMIP6 via Open-Meteo plus hazard overlays.",
        },
        {
          value: "73",
          label: "Curated insights",
          detail: "Themes that explain the signal and open the globe query in one step.",
        },
        {
          value: "Solo",
          label: "Design-led build",
          detail: "Lead designer through product, interaction, and engineering.",
        },
      ],
    },
  ],
};
