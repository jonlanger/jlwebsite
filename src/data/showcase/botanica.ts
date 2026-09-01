import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "botanica",
  category: "experiments",
  title: "Botanica",
  description:
    "A point-cloud herbarium: 26 species grown from published measurements, coloured by openly licensed photographs, each carrying a guided tour pinned to its own anatomy.",
  image: "/projects/botanica/botanica_card.webp",
  alt: "A sunflower head rendered as millions of coloured points, its disc florets standing individually off the receptacle.",
  width: 1024,
  height: 576,
  liveUrl: "https://botanica-learn.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Botanica turns the botanical record for a species — GBIF taxonomy, a Wikipedia morphological description, openly licensed iNaturalist photographs — into a plant you can fly a camera into. Measurements drive the geometry, photographs drive the colour, and the two never mix: ten million points in a single draw call, grown off the main thread, holding a hundred frames a second zoomed into one floret.",
      "The point isn't the render. It's that a flower head is a claim you can check. A sunflower is not one flower with petals — it is a pseudanthium of 21 sterile ray florets around 720 fertile disc florets, each placed by Vogel's model at the golden angle, so the Fibonacci spirals appear without anyone drawing them. Fifteen callouts per species anchor that fact to the geometry itself, each flying the camera to the part of the plant it is talking about.",
    ],
    role: "Solo build — research pipeline, morphology authoring, rendering, and interaction design",
    scope:
      "Web app — automated species research, a typed morphology spec per plant, a WebGL point-cloud grower, an anchored guided tour, and a QC gate that refuses a plant that failed to grow properly",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "There are two ways to get a plant into 3D and neither is grounded in what is known about the species. Photogrammetry reconstructs one physical specimen from thirty-odd calibrated shots — impossible from web photos, which are different plants at different scales in different light. Hand-modelling reads as a plant and asserts nothing: the floret count is whatever looked right, and the taproot usually isn't there at all.",
        "The record itself is a third option, sitting in the open: taxonomy is a GBIF query, a description with real figures in it — head 7.5–12.5 cm, leaves alternate — is a Wikipedia article, and research-grade photographs with usable licences are an API call away. The design problem is what to do with that — how much a published description actually pins down, and how to tell a model that is measured from one that merely looks measured.",
      ],
      topicGroups: [
        {
          title: "What makes this hard",
          items: [
            {
              title: "A description is not a spec",
              body: "\"Coarsely toothed, mostly alternate\" has to become a tooth count, a divergence angle, and a blade outline before anything can be grown from it.",
            },
            {
              title: "Photographs are of different plants",
              body: "Every reference shot is a different individual at a different scale, so they can carry colour but never geometry.",
            },
            {
              title: "A wrong number still renders",
              body: "Nothing fails when a figure is misread. One article's \"spikes 10–30 cm long\" grew a lavender ten centimetres tall, and it looked perfectly plausible on its own.",
            },
          ],
        },
        {
          title: "Constraints",
          items: [
            {
              title: "True scale, both ends",
              body: "A 1.8 m stem and a 1.6 m taproot are drawn at the same scale as the 4.5 cm disc — half the plant is underground and it stays that way.",
            },
            {
              title: "Honest about what it is",
              body: "This is an interpretation of a record, not a scan of a specimen, and the app says so — every colour traces back to a named photographer and licence.",
            },
            {
              title: "Interactive at ten million points",
              body: "The cloud has to survive being flown into. Close up it has to still read as points; far away it has to read as a plant.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "26",
          label: "Species in the catalog",
          detail: "All grown in 3D, across six plant families and four morphological archetypes.",
        },
        {
          value: "13,460",
          label: "Reference photographs",
          detail: "Research-grade iNaturalist observations, filtered on licence and identification agreement.",
        },
        {
          value: "10M",
          label: "Points per plant",
          detail: "One draw call, ~170 MB, scaling down to 4M or 1M on weaker hardware.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Adding a species is five steps, and the shape of the pipeline is the argument: what a machine does reliably is a command, the two parts that need a person are small and explicit, and the last step is a gate rather than a report.",
        "Two channels feed every point and they stay separate all the way to the GPU. Geometry comes from the spec in metres — the stem is a curve rather than a line, so the head's weight bends the top and every leaf inherits the bend; disc florets sit at r = c√n, θ = n × 137.5°, which is why the parastichies emerge without being modelled. Colour comes from a 128-pixel crop of a real photograph, read at each point's own organ-space coordinates: the disc is dark at the centre and gold at the rim because the photograph is. A third channel carries the teaching — an anchor resolved against the finished geometry, so a callout follows the plant rather than a coordinate.",
        "The builder itself knows nothing about sunflowers. It reads the spec and lays points down system by system, roots last and at the same scale as everything above them.",
        "The gate is where the project stopped being a renderer and started being reliable. Two things go wrong with a grown plant and neither is visible to a hash: it comes apart, and it stops being a point cloud. Connected components over the voxelised cloud found a lavender that was fourteen floating spikes hanging over a root system touching none of them. A third check caught the quietest failure of all — a missing swatch falling back to a flat organ colour without a word in the console.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/botanica/diagram-pipeline.png",
          alt: "Five-step pipeline diagram: research, scaffold, refine the spec, aim and bake crops, pass the gate — with what the QC gate found on a catalog that already looked finished.",
          width: 1200,
          height: 1250,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/botanica/diagram-channels.png",
          alt: "Diagram of three channels into one point: measurement to position, photograph to colour, and anchor to callout.",
          width: 1200,
          height: 956,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/botanica/figure-growth.webp",
          alt: "Four stages of the sunflower growing as points: the bare curved stem, the stem with its leaves, the head added at the top, and the finished plant with its root system below the soil line.",
          width: 1800,
          height: 1012,
        },
        {
          afterParagraphIndex: 3,
          src: "/projects/botanica/figure-gate.webp",
          alt: "Two side-by-side comparisons: a sunflower head in flat per-organ colour beside the same head coloured per point from a photograph, and the disc at 600k points where sprites read as discs beside the same view at ten million points.",
          width: 1800,
          height: 1922,
        },
      ],
      topicGroups: [
        {
          title: "Why it is structured this way",
          items: [
            {
              title: "Judgement, isolated",
              body: "Three of the five steps are a command. The two that need a person are refining figures and aiming crop rectangles — both small, both reviewable as a diff.",
            },
            {
              title: "A crop is scored before it is kept",
              body: "The crop tool measures how much of a rectangle carries colour and whether it is one hue. Sunflower crops authored by eye score 0–4% off-hue; a coneflower ligule that overran into the foliage behind it scored 60%.",
            },
            {
              title: "Spacing per point, not per organ",
              body: "Sprite size used to be one number per organ id. Each point now carries its own log-quantised spacing in that byte — the measured range on a real plant runs from 116:1 to 351:1.",
            },
            {
              title: "Anchors, not coordinates",
              body: "A callout marker resolves against the grown geometry, so it follows the stem's bend instead of sitting where the stem happened to be when the callout was written.",
            },
            {
              title: "The gate grows at shipping budget",
              body: "Sprite size falls as 1/√N, so a gap that fat sprites paper over opens as the point count rises — lavender measured 78% connected at 400k points and 24% at 2M.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "16 bytes",
          label: "Per point",
          detail: "sRGB colour as bytes rather than floats, linearised on the GPU — down from 25.",
        },
        {
          value: "137.5°",
          label: "Golden angle",
          detail: "Drives both leaf phyllotaxis and disc floret placement; the Fibonacci spirals fall out of it.",
        },
        {
          value: "3 checks",
          label: "In the QC gate",
          detail: "Connectivity, point spacing against each organ's own declaration, and photographic colour.",
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The catalog is the way in and the plant is the payoff: a species page is a full-bleed point cloud with a research panel on the right and the guided tour pinned to the plant itself. Screens below are from the live build — the sunflower is the reference species, where every figure in the spec carries its source in a comment.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/botanica/product-home.webp",
            alt: "Botanica home page with the headline 'A plant, reconstructed from what we know about it' beside a slowly spinning point-cloud sunflower.",
            width: 1800,
            height: 1125,
            title: "Home",
            caption:
              "The hero is the plant, not a picture of one — a live cloud spinning in the band behind the headline, at its own reduced budget so the detail page can hold ten million at the same time.",
          },
          {
            src: "/projects/botanica/product-catalog.webp",
            alt: "Botanica catalog grid showing species cards with reference photographs and 3D model badges, with facets down the left.",
            width: 1800,
            height: 1125,
            title: "Catalog",
            caption:
              "26 of 26 researched, 26 grown in 3D. A species exists because its research directory does — the registry discovers them from disk rather than from a list someone has to remember to edit.",
          },
          {
            src: "/projects/botanica/product-catalog-filtered.webp",
            alt: "Catalog filtered to the Asteraceae family, showing ten species.",
            width: 1800,
            height: 1125,
            title: "Facets",
            caption:
              "Family and taxonomy come from GBIF, growth habit and tags from a curation file — the one thing research can't return as a field. Counts are over the whole catalog, so an option never reads as unavailable.",
          },
          {
            src: "/projects/botanica/product-detail.webp",
            alt: "Sunflower species page: a point-cloud plant with fifteen numbered callout markers, a guided tour card, and a research panel on the right.",
            width: 1800,
            height: 1125,
            title: "A species page",
            caption:
              "10,149,996 points · 1.85 m specimen · 1.60 m root. Fifteen numbered markers sit on the plant; the tour card holds a fixed berth on the left and a dotted connector does the work of pointing.",
          },
          {
            src: "/projects/botanica/product-callout-capitulum.webp",
            alt: "Callout 1 of 15, 'One flower, or a thousand', with the camera flown in on the sunflower's head.",
            width: 1800,
            height: 1125,
            title: "Callout · One flower, or a thousand",
            caption:
              "The first thing worth knowing about a sunflower: it is a flower head of hundreds of complete five-petalled flowers on a shared disc. Nothing on it is a petal.",
          },
          {
            src: "/projects/botanica/product-callout-golden-angle.webp",
            alt: "Callout 2 of 15, 'Placed at 137.5°', looking straight down the head's axis at the Fibonacci spirals in the disc.",
            width: 1800,
            height: 1125,
            title: "Callout · Placed at 137.5°",
            caption:
              "Straight down the head's own axis, which is where the parastichies read. Nobody draws these spirals — they are what one golden angle between successive florets produces.",
          },
          {
            src: "/projects/botanica/product-callout-ray-florets.webp",
            alt: "Callout 5 of 15, 'The petals are flowers too', framed on a single ray floret.",
            width: 1800,
            height: 1125,
            title: "Callout · The petals are flowers too",
            caption:
              "Each of the 21 rays is a whole sterile flower whose petals have fused into one ligule. Twenty-one is a Fibonacci number, like the spiral counts in the disc.",
          },
          {
            src: "/projects/botanica/product-callout-roots.webp",
            alt: "Callout 14 of 15, 'Half the plant is underground', showing the taproot and lateral root system below the soil line.",
            width: 1800,
            height: 1125,
            title: "Callout · Half the plant is underground",
            caption:
              "A 1.6 m taproot with feeding roots spreading sideways through the topsoil, drawn as a cutaway at the same scale as everything above the line.",
          },
          {
            src: "/projects/botanica/product-morphology.webp",
            alt: "The Morphology panel listing stem, leaf, flower head, and root figures for the sunflower.",
            width: 1800,
            height: 1125,
            title: "The figures it was built from",
            caption:
              "The spec, read back out as a table: 21 ray florets, 720 disc florets, a 12.5 cm head, 4 rows × 21 phyllaries, a 1.6 m taproot. Nothing here is decorative — every row changes the geometry.",
          },
          {
            src: "/projects/botanica/product-where-it-grows.webp",
            alt: "The 'Where it grows' panel showing distribution prose from the cached article.",
            width: 1800,
            height: 1125,
            title: "The article, kept",
            caption:
              "Description, Uses, Where it grows, Ecology & relatives — the source article's own sections, cached at research time, with the places the reference photographs were taken.",
          },
          {
            src: "/projects/botanica/product-colour-credits.webp",
            alt: "The 'Colour & credits' panel showing the clustered palette and a list of photographer attributions.",
            width: 1800,
            height: 1125,
            title: "Colour & credits",
            caption:
              "The palette clustered out of the reference set, and every photographer behind it named with their licence. The colours on the plant are traceable, not chosen.",
          },
        ],
        accordion: [
          {
            value: "more-species",
            title: "Four more species",
            description:
              "The same builder, four different morphologies — a solitary flower, a raceme, a clumping spike, and a rosette with a hollow scape.",
            slides: [
              {
                src: "/projects/botanica/product-species-papaver.webp",
                alt: "Papaver rhoeas grown as a point cloud, a single red poppy on a slender stem.",
                width: 1800,
                height: 1125,
                title: "Papaver rhoeas",
                caption:
                  "Solitary flower archetype: four crumpled petals, an anther ring sampled a hundred times finer than the taproot below it.",
              },
              {
                src: "/projects/botanica/product-species-digitalis.webp",
                alt: "Digitalis purpurea grown as a point cloud, a tall spike of purple corollas over a basal rosette.",
                width: 1800,
                height: 1125,
                title: "Digitalis purpurea",
                caption:
                  "10,360,081 points · 1.42 m specimen. Raceme archetype — the flowers hang off a rachis that had to be drawn before the plant would pass the connectivity check.",
              },
              {
                src: "/projects/botanica/product-species-lavandula.webp",
                alt: "Lavandula angustifolia grown as a point cloud, a clump of long stems each ending in a violet spike.",
                width: 1800,
                height: 1125,
                title: "Lavandula angustifolia",
                caption:
                  "The species that broke the gate open: fourteen shoots beginning on a crown circle with nothing at its centre, floating over a root system they never touched.",
              },
              {
                src: "/projects/botanica/product-species-taraxacum.webp",
                alt: "Taraxacum officinale grown as a point cloud, a yellow head on a hollow scape above a basal rosette.",
                width: 1800,
                height: 1125,
                title: "Taraxacum officinale",
                caption:
                  "A rosette and a hollow scape, and a reminder of why the research step pins hero photos by id — the most-voted dandelion observation is a picture of a bear.",
              },
            ],
          },
          {
            value: "full-page",
            title: "Full page",
            description: "The complete home page, hero through the three-step explanation.",
            slides: [
              {
                src: "/projects/botanica/product-home-full.webp",
                alt: "Full Botanica home page from the hero through the 'How a species gets built' section.",
                width: 1800,
                height: 1332,
                title: "Home (full)",
                caption:
                  "Measured not imagined, structure the numbers imply, colour from real specimens — the pipeline stated in three lines before anyone opens the catalog.",
              },
            ],
          },
          {
            value: "mobile",
            title: "On a phone",
            description:
              "The panel becomes a bottom sheet and the tour card moves to the top, so the plant keeps the middle of the screen.",
            slides: [
              {
                src: "/projects/botanica/product-mobile-catalog.webp",
                alt: "Botanica catalog on a phone viewport, a single column of species cards.",
                width: 860,
                height: 1864,
                title: "Catalog (mobile)",
                caption: "One column, same facets, same counts.",
              },
              {
                src: "/projects/botanica/product-mobile-detail.webp",
                alt: "Sunflower species page on a phone, with the tour card at the top and the species panel as a bottom sheet.",
                width: 860,
                height: 1864,
                title: "Species page (mobile)",
                caption:
                  "The tour card sits above and the research panel below, leaving the plant the band between them. The point budget drops to 4M or 1M on weaker hardware — same plant, lower density.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Botanica closes as a catalog of twenty-six species — all grown, all photographic, each carrying fifteen callouts anchored to its own geometry — and as a pipeline where adding the twenty-seventh is five steps rather than a modelling job.",
        "The design work that mattered turned out to be the boundaries: what a published description can be trusted to pin down, what has to be read off a photograph by eye, and what a machine should refuse to let through. The QC gate is the piece I would keep — a plant that has come apart, or is drawing a surface instead of points, or is filled with a flat stand-in colour looks completely fine, and shipped that way until something was measuring it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/botanica/figure-catalog.webp",
          alt: "All twenty-six grown species as point clouds, grouped into four archetype bands: ten radiate Asteraceae heads, six Lamiaceae spikes, five Plantaginaceae racemes, and five solitary Papaveraceae flowers.",
          width: 1800,
          height: 1860,
        },
      ],
      stats: [
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at botanica-learn.vercel.app.",
        },
        {
          value: "26",
          label: "Species grown",
          detail: "Six families, four archetypes, no drafts left in the catalog.",
        },
        {
          value: "390",
          label: "Anchored callouts",
          detail: "Fifteen per species, each with a fact and the camera framing to see it.",
        },
        {
          value: "5 steps",
          label: "To add a species",
          detail: "Three commands, two passes by hand, and a gate that can say no.",
        },
      ],
    },
  ],
};
