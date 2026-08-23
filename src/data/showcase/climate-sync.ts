import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "climate-sync",
  category: "software",
  title: "Climate Sync",
  description:
    "Interactive globe that links major cities by shared climate profiles—so adaptation ideas can travel between places facing similar weather, water, and risk.",
  image: "/projects/climate-sync/climate-sync_card.png",
  alt: "Climate Sync globe showing city markers and teal sync arcs across East Asia.",
  width: 1280,
  height: 720,
  liveUrl: "https://climatesync.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Cities often look for peers when planning for heat, floods, drought, or fire weather—but those peers are not always nearby. A monsoon megacity and a tropical coastal hub can share water-related stress even when average temperatures differ.",
      "Climate Sync makes those climate peers visible: pick a place or a theme, and a rotatable Earth clusters cities whose climates match—so planners, journalists, and curious readers can compare what worked under similar constraints.",
    ],
    role: "Lead Designer — Product Design, Interaction Design, Engineering (solo build)",
    scope:
      "Web app — interactive globe, Sync Insights catalog, city climate briefs, climate query & similarity search",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Geography is not the same as climate similarity. A useful peer for heat, floods, or fire weather can sit on another continent, while the city next door faces a different pattern entirely. Climate data is abundant—but tools rarely make that city-to-city similarity easy to see at a glance, so adaptation lessons stay stuck in local reports instead of traveling to places that share the same climatic stress.",
      ],
      topicGroups: [
        {
          title: "Why climate peers matter",
          items: [
            {
              title: "Peers beyond geography",
              body: "Useful climate twins are often continents apart—matching by latitude or region alone misses the signal.",
            },
            {
              title: "Similar weather and risk patterns",
              body: "Planners and journalists need places with similar weather, water, and risk structures—not identical governance or topography.",
            },
            {
              title: "A starting map, not a verdict",
              body: "Local terrain, infrastructure, and policy still decide outcomes. Climate peers open comparison; they don’t replace official local risk models.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Readable at city scale",
              body: "Hundreds of cities on one globe—matches, hub cities, and connecting arcs have to stay scannable without drowning the map.",
            },
            {
              title: "Two ways in",
              body: "Free-text climate queries and curated Sync Insights both need to land on the same similarity model.",
            },
            {
              title: "Honest limits",
              body: "Each city’s climate profile summarizes monthly temperature and rainfall structure. Extreme events and local exposure stay outside the claim.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "~450",
          label: "Cities on the globe",
          detail: "Major urban centers with climate profiles and mapped hazard labels.",
        },
        {
          value: "73",
          label: "Sync Insights",
          detail: "Curated themes across water, heat, storms, fire, coasts, and more.",
        },
        {
          value: "8",
          label: "Theme categories",
          detail: "Water, temperature, storms, fire, geologic, coastal, climate zones, and climate peers.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "The problem was framed around people who need climate peers without claiming identical cities: planners scanning for places with similar climate stress, journalists comparing risk stories, and readers exploring how weather patterns connect places.",
        "Comparing similar climates is hard in existing tools—spreadsheets, static maps, and regional reports don’t make similarity spatial or scannable. The design goal was a single interactive surface where a theme or city focus lights up peers by climate profile, not by shared borders.",
      ],
      table: {
        ariaLabel: "Audiences and discovery needs",
        rows: [
          {
            col1: "Planners & policy teams",
            col2: "Find cities with similar weather, water, and risk patterns to learn how peers adapted under similar constraints.",
          },
          {
            col1: "Journalists & analysts",
            col2: "Ground risk stories in climate peers—who else faces this rainfall, heat, or fire-weather pattern.",
          },
          {
            col1: "Curious explorers",
            col2: "Browse themes and city briefs without needing mapping software expertise or a climate-science background.",
          },
        ],
      },
    },
    {
      title: "Approach",
      paragraphs: [
        "The product is organized around two entry paths that converge on the same globe: free-text climate queries (“flood,” “cities like Nairobi”) and curated Sync Insights across eight theme categories. Similarity scoring lights peer cities; gold hubs mark strong local examples and teal arcs draw the sync network.",
        "Selecting a city opens a climate brief—profile traits, risks, 2020 vs 2040 outlook, and related news—so similarity on the map always has a readable local story beside it.",
      ],
      topicGroups: [
        {
          title: "How matching works",
          items: [
            {
              title: "Climate profiles",
              body: "Each city carries a short profile of seasonal temperature and rainfall, plus risk and hazard labels.",
            },
            {
              title: "Query focus",
              body: "Searches resolve into dimensions—rainfall intensity, dryness, heat, storms, and more—then score peers by how closely those climates match.",
            },
            {
              title: "Sync Insights",
              body: "Curated themes explain the climate signal, cite sources, and activate the same globe query so hub cities and connecting arcs light up together.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story runs from an explore-first globe through Sync Insights and similarity search into city climate briefs—turning climate similarity into something you can see and read.",
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
              "Activate a theme like heavy rainfall—gold hubs mark strong local examples, teal arcs link peers, and ranked matches show how closely climates align.",
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
        "The goal was not another climate dashboard—it was to make similar climate data across locations easier to see. Comparing cities by shared climate profiles is usually stuck in tables, reports, or mapping workflows that hide the spatial story. Climate Sync turns that similarity into a browsable map: themes, peers, and briefs in one place, with citations and clear limits so syncs stay a starting point for exchange—not a substitute for official local risk models.",
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
          detail:
            "Profiles grounded in CMIP6 climate model projections via Open-Meteo, plus mapped hazard labels.",
        },
        {
          value: "73",
          label: "Curated insights",
          detail: "Themes that explain the climate signal and open the globe query in one step.",
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
