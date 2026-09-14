import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "blockscraper",
  category: "experiments",
  title: "Blockscraper",
  description:
    "A city builder about architecture. Stack towers block by block, mix classical and modern styles, and dress each facade in ornament.",
  image: "/projects/blockscraper/blockscraper_card.webp",
  alt: "A small city on a floating slab: an Art Deco tower, a glass skyscraper and a Gothic office block beside gardens, fountains and plazas.",
  width: 1024,
  height: 576,
  liveUrl: "https://blockscraper.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Blockscraper takes its cue from SimTower and Cities: Skylines, but zooms in on the buildings. Instead of zoning a district, you build one tower at a time: lobby, floors, sky bar, crown.",
      "The idea is character. Any block can be Beaux-Arts, Gothic, Art Deco, glass or Solarpunk, and any wall can take columns, gargoyles, fins or ivy. Mix them and every building ends up looking like its owner.",
    ],
    role: "Solo build: game design, procedural architecture, rendering, interaction and UI",
    scope:
      "Browser game in three.js and plain JavaScript. About 10,200 lines across 29 modules, no build step, saved in the browser.",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "City builders are great at scale and weak on detail. Buildings are picked from a menu, and one skyline looks much like another.",
        "Blockscraper flips that. The city is small, and the fun is in how a building is made and how it looks.",
      ],
      topicGroups: [
        {
          title: "Design goals",
          items: [
            {
              title: "Mix and match",
              body: "Style is a paint, not a building type. A Gothic base can carry a glass tower and a Deco crown.",
            },
            {
              title: "Ornament that adapts",
              body: "One ornament, many styles. A frieze becomes triglyphs, chevrons, quatrefoils or vines depending on the wall.",
            },
            {
              title: "Rules you can see",
              body: "Floors need a lobby and an elevator core. Piles let a tower rise. Parks raise the value of what faces them.",
            },
          ],
        },
      ],
      stats: [
        { value: "14", label: "Architectural styles", detail: "Five colourways each: 70 paints." },
        { value: "109", label: "Building blocks", detail: "From subway platforms to spires." },
        { value: "16", label: "Facade ornaments", detail: "Each redrawn per style family." },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "A building is four choices, made in any order. Pick a style and colourway, place blocks, add ornament, then crown it and give it a setting.",
        "Style is applied per block, so the same massing can be restyled in a click. Here is one building in eight styles, from classical to modern.",
        "Ornament is a second layer on top. The same ten floors read as a classical palazzo, a Gothic tower, a parametric office or a planted Solarpunk block.",
        "Each style carries five colourways and an ornament family, so a column or a frieze always knows what it should look like.",
        "Towers are built the way SimTower taught: stacked, serviced and zoned. The classic city's Art Deco tower shows the whole stack.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/blockscraper/diagram-layers.png",
          alt: "Diagram of the four choices that make a building: style and colourway, blocks, ornament, and crown and setting, with counts for each.",
          width: 1200,
          height: 485,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/blockscraper/figure-styles.webp",
          alt: "The same ten-storey building in eight styles, from Beaux-Arts, Neo-Gothic, Cast-Iron and Art Deco to Mid-Century, Brutalist, Modern Glass and Solarpunk.",
          width: 1800,
          height: 1254,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/blockscraper/figure-ornament.webp",
          alt: "One building five ways: bare, with classical columns and cornice, Gothic buttresses and gargoyles, parametric fins and neon, and Solarpunk ivy and balconies.",
          width: 1800,
          height: 527,
        },
        {
          afterParagraphIndex: 3,
          src: "/projects/blockscraper/diagram-palette.png",
          alt: "Table of all 14 styles from classical to modern, each with its ornament family and five wall, trim and accent colourways.",
          width: 1200,
          height: 1046,
        },
        {
          afterParagraphIndex: 4,
          src: "/projects/blockscraper/diagram-aurora.png",
          alt: "Section of The Aurora tower: foundation piles, parking and subway below the street, a lobby, offices, hotel floors, two setbacks, a sky bar, observation deck and Deco spire, with an elevator core running through.",
          width: 1200,
          height: 1192,
        },
      ],
      topicGroups: [
        {
          title: "Decisions",
          items: [
            {
              title: "Blocks join into buildings",
              body: "No footprints to pick. Touching blocks merge, across plots and even over streets.",
            },
            {
              title: "Parks are designed too",
              body: "Fill a plot and the park lays itself out, after the Tuileries, Versailles, the Alhambra or Lovejoy Fountain.",
            },
            {
              title: "Reward curiosity",
              body: "Fourteen hidden combinations. Stack three sky gardens for a vertical forest; put a club under a ballroom for a disco.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: ["Screens from the live build."],
      productShowcase: {
        slides: [
          {
            src: "/projects/blockscraper/product-hero.webp",
            alt: "The classic neighbourhood from above: towers in several styles beside a grid of parks and plazas.",
            width: 1800,
            height: 1125,
            title: "The classic city",
            caption: "Eight buildings in eight styles, and a row of gardens modelled on famous squares.",
          },
          {
            src: "/projects/blockscraper/product-ui.webp",
            alt: "The game interface: a style and colourway panel on the left, building stats on the right, view controls along the bottom.",
            width: 1800,
            height: 1125,
            title: "Build panel",
            caption: "Style and colourway, then blocks, ornaments and map blocks. Stats update as you build.",
          },
          {
            src: "/projects/blockscraper/product-gothic.webp",
            alt: "Close-up of a Neo-Gothic tower crowned with pinnacles, beside a glass tower with a sky garden.",
            width: 1800,
            height: 1125,
            title: "Crowns",
            caption: "Gothic pinnacles, a Deco setback, a glass tower with a sky garden cut into it.",
          },
          {
            src: "/projects/blockscraper/product-ornament-close.webp",
            alt: "Close-up of a Beaux-Arts facade with giant columns, a frieze, balustraded balconies and a bracketed cornice.",
            width: 1800,
            height: 1125,
            title: "Ornament up close",
            caption: "Giant columns, frieze, balcony runs and cornice. Runs join across neighbouring walls.",
          },
          {
            src: "/projects/blockscraper/product-cutaway.webp",
            alt: "Cutaway of a building showing office desks on the lower floors and furnished apartments above.",
            width: 1800,
            height: 1125,
            title: "Cutaway",
            caption: "Every block is furnished. Offices, condos and shops, with people coming and going.",
          },
          {
            src: "/projects/blockscraper/product-night.webp",
            alt: "The classic city at night with lit windows in the towers.",
            width: 1800,
            height: 1125,
            title: "Night",
            caption: "Offices empty out and homes light up.",
          },
          {
            src: "/projects/blockscraper/product-random.webp",
            alt: "A procedurally generated city of mixed-style towers, parks and streets.",
            width: 1800,
            height: 1125,
            title: "Random city",
            caption: "A generated skyline of mixed styles, as a starting point.",
          },
        ],
        accordion: [
          {
            value: "ornament",
            title: "One building, dressed three ways",
            description: "The same massing with a different style and ornament set.",
            slides: [
              {
                src: "/projects/blockscraper/product-ornament-gothic.webp",
                alt: "The study building in Neo-Gothic with canopied statues, buttresses and gargoyles.",
                width: 1800,
                height: 1125,
                title: "Gothic",
                caption: "Canopied statues, buttresses, gargoyles.",
              },
              {
                src: "/projects/blockscraper/product-ornament-parametric.webp",
                alt: "The study building in Parametric style with sun fins, a deep overhang and neon.",
                width: 1800,
                height: 1125,
                title: "Parametric",
                caption: "Sun fins, deep overhang, neon at the base.",
              },
              {
                src: "/projects/blockscraper/product-ornament-solarpunk.webp",
                alt: "The study building in Solarpunk timber with ivy, planted balconies and a deep eave.",
                width: 1800,
                height: 1125,
                title: "Solarpunk",
                caption: "Ivy, planted balconies, a deep eave.",
              },
            ],
          },
          {
            value: "parks",
            title: "Parks and plazas",
            description: "22 park types. Eight lay out a full composition after a famous place.",
            slides: [
              {
                src: "/projects/blockscraper/product-parks.webp",
                alt: "A grid of parks from above: basins, a bosque, a star piazza, parterres, a food truck court and basketball courts.",
                width: 1800,
                height: 1125,
                title: "The park grid",
                caption: "Parks raise the income of the buildings that face them.",
              },
              {
                src: "/projects/blockscraper/product-basin.webp",
                alt: "Twin round basins with fountain jets among lawns and trees.",
                width: 1800,
                height: 1125,
                title: "Grand Basin",
                caption: "After the Tuileries.",
              },
              {
                src: "/projects/blockscraper/product-parterre.webp",
                alt: "Box-hedge scrolls on orange gravel around a small fountain.",
                width: 1800,
                height: 1125,
                title: "Parterre",
                caption: "After Versailles.",
              },
              {
                src: "/projects/blockscraper/product-chahar.webp",
                alt: "Four lawns split by water channels around a star-shaped pool, lined with cypresses.",
                width: 1800,
                height: 1125,
                title: "Water Garden",
                caption: "After the Alhambra.",
              },
              {
                src: "/projects/blockscraper/product-cascade.webp",
                alt: "Stepped terraces with sheets of water and fountain jets.",
                width: 1800,
                height: 1125,
                title: "Water Steps",
                caption: "After Lovejoy Fountain, Portland.",
              },
            ],
          },
          {
            value: "below",
            title: "Below the street",
            description: "Basements go as deep as you like. Subway on B2, regional rail on B4.",
            slides: [
              {
                src: "/projects/blockscraper/product-underground.webp",
                alt: "Section through the city edge showing furnished floors above the street and subway trains and platforms below it.",
                width: 1800,
                height: 720,
                title: "Underground",
                caption: "Parking, malls and platforms under the towers. Transit boosts nearby income.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Blockscraper is live and runs in the browser with nothing to install. It ships with 14 styles, 109 blocks, 16 ornaments, 22 parks, transit and 14 easter eggs.",
        "Next is sharing: saved cities with links, a gallery of buildings, and letting players save their own style mixes as presets.",
      ],
      stats: [
        { value: "Live", label: "Public browser game", detail: "blockscraper.vercel.app" },
        { value: "70", label: "Colourways", detail: "14 styles × 5 paints" },
        { value: "100", label: "Floors above the street", detail: "Basements to any depth" },
        { value: "1", label: "Runtime dependency", detail: "three.js, loaded from a CDN" },
      ],
    },
  ],
};
