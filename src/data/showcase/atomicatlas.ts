import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "atomicatlas",
  category: "experiments",
  title: "AtomicAtlas",
  description:
    "A structure viewer built from the coordinates up: 100 curated Protein Data Bank entries, a cartoon builder of its own, and twenty-three rules that decide what it is allowed to draw.",
  image: "/projects/atomicatlas/atomicatlas_card.webp",
  alt: "Green fluorescent protein drawn as a cartoon: eleven blue strands wrapped into a barrel around an orange helix, on warm paper.",
  width: 1024,
  height: 576,
  liveUrl: "https://atomicatlas-three.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "AtomicAtlas fetches an entry from the RCSB Protein Data Bank, parses the file in full, and builds the secondary-structure cartoon itself — helices, strands and the loops between them, off the backbone. No pre-rendered images and no third-party molecular viewer: every figure printed beside a structure was computed from the file on screen.",
      "The design problem is not the render. A molecular picture can be wrong in ways that still look fine — a ribbon drawn through seven residues of missing density is a smooth, handsome lie — so each way of being wrong is written down as a rule with a threshold and a citation. Twenty-three of them: fourteen run in CI over the whole shelf, nine run in the browser against the view in front of you.",
    ],
    role: "Solo build — data pipeline, cartoon geometry, colour and accessibility standard, and interaction design",
    scope:
      "Web app — a PDB parser and a secondary-structure fallback, a WebGL ribbon builder whose every element is pickable, 100 curated structures over a search of the whole archive, and a gate suite that decides what may be shown",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "There are two ways to put a protein on a web page and neither is honest by default. Embedding a viewer hands over every decision that matters — what gets abstracted, what the colours mean, what happens where the data runs out. Showing a picture someone else rendered severs the drawing from the file it claims to be of.",
        "The record is open either way: coordinates are a fetch, a description of the entry is a second endpoint, and the archive's own search reaches a quarter of a million entries. The work is deciding what a deposited file actually pins down, and what a drawing is entitled to add on top of it.",
      ],
      topicGroups: [
        {
          title: "What makes this hard",
          items: [
            {
              title: "A deposit is not a molecule",
              body: "Residues too mobile for the crystal to hold still never enter the coordinates. Nothing marks the gap, and a fitted spline will run straight through it.",
            },
            {
              title: "Not every file says where the helices are",
              body: "HELIX and SHEET records are conventional, not compulsory. Without a fallback those entries draw as one long coil — which is not a neutral default, it is a claim that the protein has no secondary structure.",
            },
            {
              title: "Nothing throws when the picture lies",
              body: "A strand twisted through its own surface, a palette that collapses to one colour under deuteranopia, a camera that clips the fold a quarter turn from where it was framed: all of them render.",
            },
          ],
        },
        {
          title: "Constraints",
          items: [
            {
              title: "One format, one chain",
              body: "The archive publishes legacy PDB only up to roughly 100,000 atoms or 62 chains, and this viewer draws one chain at a time. Both limits are printed on the page rather than worked around quietly.",
            },
            {
              title: "Readable without a pointer",
              body: "Depth in a cartoon is only legible by turning it, so orbit sits on the arrow keys, and every element the raycaster can hit is also a button in a list beside the view.",
            },
            {
              title: "Every figure traceable to the file",
              body: "Residue counts, mass, resolution and coverage are computed from the coordinates on screen — which is what lets an entry nobody has written a word about still get a complete page.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "100",
          label: "Structures on the curated shelf",
          detail:
            "Grouped by what a molecule does in a cell: 26 enzymes, 20 signalling, 17 transport, 11 toxins, 11 structural, 10 immune, 5 nucleic acids.",
        },
        {
          value: "230,000",
          label: "Reachable through search",
          detail:
            "The rest of the archive, not vouched for — and anything past this viewer's format says so plainly instead of showing an empty frame.",
        },
        {
          value: "23",
          label: "Gates, each with a threshold and a source",
          detail: "Fourteen run in Node over the whole shelf in CI; nine run in the browser against the live camera and DOM.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "A structure page is six steps, and the order is the argument: ask how big the entry is before asking for it, parse the file by column, assign secondary structure only where the depositors did not, build the cartoon off the backbone, and gate the result before any of it is shown.",
        "The part that decides whether a cartoon reads is the orientation frame. A flat ribbon has to know which way “flat” points at every step, and Three.js's built-in Frenet frames take that from curvature alone — which barber-poles strands around their own axis. The Carson–Bugg construction takes it from the backbone carbonyl instead, geometry the protein itself defines. Every run of one assignment comes out as a named, pickable element, so a click on the drawing resolves to something the page can talk about.",
        "The gates are where this stopped being a renderer. Each states a rule, cites where the rule comes from, and returns pass, warn or fail with a reason — and they are split by what they need. The ones that read parsed coordinates and built geometry are pure, so the whole catalogue is checked in CI; the ones that need a live camera, a live DOM and a real user preference run in the viewer.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/atomicatlas/diagram-pipeline.png",
          alt: "Six-step pipeline diagram: ask how big the entry is, fetch the coordinates through an API route, parse by column, assign secondary structure if nobody did, build the cartoon, gate it — with the figures the page then reports and where each comes from.",
          width: 1200,
          height: 1420,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/atomicatlas/figure-folds.webp",
          alt: "Eight structures drawn by the same builder: haemoglobin, green fluorescent protein, triosephosphate isomerase, ubiquitin, the calcium pump, a potassium channel, a telomeric G-quadruplex, and a collagen peptide that renders as broken segments.",
          width: 1800,
          height: 748,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/atomicatlas/diagram-gates.png",
          alt: "Diagram of three ways a rendering is wrong while still looking fine — drawing what is not there, separating for some viewers only, holding from one angle — each with its gate, threshold and citation, over the split between fourteen static and nine runtime gates.",
          width: 1200,
          height: 1220,
        },
      ],
      topicGroups: [
        {
          title: "Decisions worth the argument",
          items: [
            {
              title: "Ask the size first",
              body: "The entry summary is fetched before the coordinates, so “larger than the archive publishes in this format” becomes an explanation carrying the atom and chain counts rather than a canvas that never fills.",
            },
            {
              title: "Read by column, never by whitespace",
              body: "PDB fields butt up against each other and can be blank. Every field is a character offset, with the specification's 1-indexed columns in the comment beside it.",
            },
            {
              title: "P-SEA instead of a coil default",
              body: "Where a file carries no assignment, helices and strands are recovered from alpha-carbon distances and angles alone — no hydrogen bonds to work with, but enough that the ribbon stops asserting something false.",
            },
            {
              title: "Mixed towards the paper, not made transparent",
              body: "Selecting one element mutes the rest by blending them towards the background. Transparency would need depth sorting, and a cartoon whose strands sort wrongly against each other is worse than one that does not emphasise at all.",
            },
            {
              title: "Five pixels of slop",
              body: "The canvas is an orbit control and a field of targets at the same time, and every rotation begins and ends with a press on the molecule. Past five pixels of travel it is a drag, not a pick.",
            },
            {
              title: "One source of truth for colour",
              body: "The WebGL materials and the CSS custom properties come from the same file, and a gate reads the tokens back out of the browser — because checking the file against itself would prove nothing.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "12×10 → 6×5",
          label: "Tessellation, tapered by size",
          detail:
            "Past 260 residues the sampling steps down: a 994-residue chain falls from roughly 250 triangles per residue to 65.7, while a 150-residue fold keeps full detail.",
        },
        {
          value: "ΔE2000 18",
          label: "Worst colour pair under deuteranopia",
          detail:
            "Against a floor of 11. Coil was darkened after measuring 2.51:1 on the paper — under the 3:1 WCAG asks of a non-text graphic. It now measures 3.39:1.",
        },
        {
          value: "279",
          label: "Tests in the suite",
          detail: "Across the parser, the P-SEA assignment, the ribbon builder, the colour maths and the gates themselves.",
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The atlas is the way in and the structure page is the payoff: a reading column on the left, a full-height viewport on the right, and every figure in that column read out of the file being drawn. Screens below are from the live build — restrictocin is the reference entry, a 149-residue ribotoxin with seven residues that never resolved.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/atomicatlas/product-home.webp",
            alt: "AtomicAtlas home page: the wordmark at display size over the line “Molecules are three-dimensional objects described in flat text files. This turns one back into the other, honestly.”",
            width: 1800,
            height: 1125,
            title: "Home",
            caption:
              "100 curated, 230,000 searchable, and the claim stated before anything is shown: read from the deposit, show what is missing, check its own work.",
          },
          {
            src: "/projects/atomicatlas/product-molecules.webp",
            alt: "The Molecules page: a search field over a grid of structure cards, each with its category, PDB identifier, name and one line.",
            width: 1800,
            height: 1125,
            title: "The shelf",
            caption:
              "100 structures chosen because they render honestly — inside the format's size limits, and long enough for a cartoon to abstract something.",
          },
          {
            src: "/projects/atomicatlas/product-molecules-toxins.webp",
            alt: "The shelf filtered to the eleven toxins.",
            width: 1800,
            height: 1125,
            title: "Filtered",
            caption:
              "Filtering and search are plain GET parameters on a plain form, so every result set has its own URL, the back button behaves, and the page works before any JavaScript arrives.",
          },
          {
            src: "/projects/atomicatlas/product-search.webp",
            alt: "A search for “kinase” returning 70,566 matches from the archive, listed as bare identifiers above the curated shelf.",
            width: 1800,
            height: 1125,
            title: "Beyond the shelf",
            caption:
              "70,566 entries match “kinase”. They are listed as identifiers and labelled as not vouched for — the curated hits are promoted above them as cards.",
          },
          {
            src: "/projects/atomicatlas/product-detail.webp",
            alt: "Restrictocin's page: an essay column on the left, and the protein drawn as a cartoon of blue strands, an orange helix and pale loops on the right.",
            width: 1800,
            height: 1125,
            title: "A structure page",
            caption:
              "Nineteen elements in chain A. The drawing takes the full height of the viewport; everything the page asserts about it sits in the column to its left.",
          },
          {
            src: "/projects/atomicatlas/product-how-drawn.webp",
            alt: "The “How this is drawn” panel: helix 14 residues 10%, sheet 40 residues 28%, coil 88 residues 62%, followed by notes about the missing residues and the undrawn chain.",
            width: 1800,
            height: 1125,
            title: "What is not on screen",
            caption:
              "“Residues 11–17 never appear in the electron density. The ribbon stops at 10 and resumes at 18 rather than inventing a path across the gap.” The second chain in the file is named too, and not drawn.",
          },
          {
            src: "/projects/atomicatlas/product-measurements.webp",
            alt: "The Measurements panel: 149 residues sequence, 142 resolved in chain A, 16.9 kDa, 2 disulfides, deposited 4 August 1997, assignment from the deposited records.",
            width: 1800,
            height: 1125,
            title: "Read out of the file",
            caption:
              "Counts from SEQRES and the ATOM records, mass summed from the deposited sequence, resolution from REMARK 2 — and a line saying whether the assignment was deposited or computed.",
          },
          {
            src: "/projects/atomicatlas/product-elements.webp",
            alt: "The elements list open beside the structure, listing nineteen loops, strands and helices with their residue ranges.",
            width: 1800,
            height: 1125,
            title: "Elements",
            caption:
              "The keyboard half of picking, not a read-out of it: every element the raycaster can hit is a button here, because clicking a shape inside a canvas is a gesture not everybody can make.",
          },
          {
            src: "/projects/atomicatlas/product-inspector.webp",
            alt: "Strand 1 selected: residues 2–8, the sequence shown as seven letter chips with the isoleucine highlighted, and the rest of the structure muted towards the paper.",
            width: 1800,
            height: 1125,
            title: "A pick, resolved",
            caption:
              "The click landed on the skin of a tube, not on an atom, so the residue is a nearest-neighbour answer: Strand 1, residues 2–8, isoleucine 6, hydrophobic side chain.",
          },
          {
            src: "/projects/atomicatlas/product-too-large.webp",
            alt: "The page for 4V6X: a heading, an explanation that the entry is larger than the legacy PDB format is published for, and a table reading 237,685 atoms and 89 chains.",
            width: 1800,
            height: 975,
            title: "When it will not draw",
            caption:
              "The human 80S ribosome, at 237,685 atoms across 89 chains. Too large is a real and common outcome, so it gets an explanation with the numbers in it and a way back.",
          },
          {
            src: "/projects/atomicatlas/product-uncurated.webp",
            alt: "The page for 3K0N, an entry with no curated copy: heading 3K0N, the deposition title underneath, and the structure drawn as usual.",
            width: 1800,
            height: 1125,
            title: "An entry nobody curated",
            caption:
              "163 of 165 residues, 22 elements, no authored copy at all. The archive calls these by their identifier, so the page does too, and the deposition title becomes the line underneath.",
          },
          {
            src: "/projects/atomicatlas/product-about.webp",
            alt: "The About page, headed “How these pictures are made”, explaining the parsing, the Carson–Bugg construction and the two stated limits.",
            width: 1800,
            height: 1125,
            title: "The standard",
            caption:
              "Where the geometry comes from, what the numbers are read out of, and the two limits worth stating plainly — followed by all twenty-three gates with their sources.",
          },
          {
            src: "/projects/atomicatlas/product-guide.webp",
            alt: "The Guide page: definitions, the taxonomy of the collection, and how to work the viewer.",
            width: 1800,
            height: 1125,
            title: "The vocabulary",
            caption:
              "About argues that the picture can be trusted; the guide answers what you are looking at and what to press. Its labels are imported from the app rather than retyped.",
          },
        ],
        accordion: [
          {
            value: "folds",
            title: "Eight folds, one builder",
            description:
              "Chosen for what each asks of the geometry rather than for fame: an all-helix globin, two barrels, a small α/β fold, a 994-residue chain, a channel, a nucleic acid with no assignment to make, and a fragment the gates decline to vouch for.",
            slides: [
              {
                src: "/projects/atomicatlas/product-haemoglobin.webp",
                alt: "Haemoglobin chain B drawn as orange helices joined by pale loops.",
                width: 1800,
                height: 1125,
                title: "Haemoglobin · 4HHB",
                caption:
                  "146 residues, 11 elements, and a legend with two rows on it — there is no sheet in a globin, so the page does not offer one.",
              },
              {
                src: "/projects/atomicatlas/product-gfp.webp",
                alt: "Green fluorescent protein: eleven blue strands wrapped into a barrel around a central orange helix.",
                width: 1800,
                height: 1125,
                title: "Green fluorescent protein · 1GFL",
                caption: "230 residues, 34 elements. The strands are drawn as flat arrow-tipped ribbons, which is what makes the barrel read as a barrel.",
              },
              {
                src: "/projects/atomicatlas/product-tim-barrel.webp",
                alt: "Triosephosphate isomerase: eight strands in a ring surrounded by eight helices.",
                width: 1800,
                height: 1125,
                title: "Triosephosphate isomerase · 1TIM",
                caption: "247 residues, 33 elements — the original TIM barrel, eight strands inside eight helices.",
              },
              {
                src: "/projects/atomicatlas/product-ubiquitin.webp",
                alt: "Ubiquitin: a small mixed fold of a helix packed against a curved sheet.",
                width: 1800,
                height: 1125,
                title: "Ubiquitin · 1UBQ",
                caption: "76 residues at full tessellation — 16,306 triangles, 214.6 per residue.",
              },
              {
                src: "/projects/atomicatlas/product-calcium-pump.webp",
                alt: "The calcium pump: a large multi-domain structure of helices and small sheets.",
                width: 1800,
                height: 1125,
                title: "Calcium pump · 1SU4",
                caption:
                  "994 residues and 124 elements, and where the size taper earns itself: sampling drops to 6×5 and 65.7 triangles per residue, holding the whole build inside the budget.",
              },
              {
                src: "/projects/atomicatlas/product-potassium-channel.webp",
                alt: "The KcsA potassium channel: two long helices with a short pore helix between them.",
                width: 1800,
                height: 1125,
                title: "Potassium channel · 1BL8",
                caption: "97 residues, 7 elements — one subunit of the four that make the pore, because only one chain is drawn at a time.",
              },
              {
                src: "/projects/atomicatlas/product-quadruplex.webp",
                alt: "A telomeric G-quadruplex drawn as a single folded backbone trace in coil grey.",
                width: 1800,
                height: 1125,
                title: "Telomeric G-quadruplex · 1KF1",
                caption:
                  "22 residues of DNA. There are no alpha carbons and no helix-or-strand assignment to make, so the trace follows the phosphate backbone and the pieces are called segments.",
              },
              {
                src: "/projects/atomicatlas/product-collagen.webp",
                alt: "A collagen peptide rendered as five short disconnected helical fragments, with a note beside it explaining that ten of thirty residues never resolved.",
                width: 1800,
                height: 1125,
                title: "Collagen peptide · 1CGD",
                caption:
                  "The honest render of a bad case: one strand of three, ten of its thirty residues never resolved, drawn as eleven separate segments because nothing may be bridged.",
              },
            ],
          },
          {
            value: "gates",
            title: "The gates, running",
            description:
              "The nine runtime gates need a live camera and DOM, so they report in a development overlay while the fourteen static ones run in CI.",
            slides: [
              {
                src: "/projects/atomicatlas/product-qa-overlay.webp",
                alt: "The QA overlay on restrictocin, reading 23 of 23 with each gate's measurement listed underneath.",
                width: 1800,
                height: 1125,
                title: "23 of 23",
                caption:
                  "Each line is a measurement, not a tick: 119,448 finite floats at radius 22.6 Å, worst normal deviation 4.5e-8, 224.9 triangles per residue, field of view 34°.",
              },
              {
                src: "/projects/atomicatlas/product-qa-overlay-warned.webp",
                alt: "The QA overlay on the collagen peptide, reading 21 of 23 with two warnings, beside the broken segments it drew.",
                width: 1800,
                height: 1125,
                title: "21 of 23",
                caption:
                  "A warning carries its rationale and its citation. Coverage warns at 66.7%; representation-fit warns that 20 residues is under the 25 a cartoon needs to abstract anything.",
              },
            ],
          },
          {
            value: "full-pages",
            title: "Full pages",
            description: "The home page end to end, and the whole of the standard the gates are written down in.",
            slides: [
              {
                src: "/projects/atomicatlas/product-home-full.webp",
                alt: "The complete AtomicAtlas home page, from the wordmark through the three-claim band, the collection preview and the standard.",
                width: 1800,
                height: 2551,
                title: "Home (full)",
                caption: "Three claims, seven groups with their counts, three structures to start from, and the argument for the gates before the atlas is even opened.",
              },
              {
                src: "/projects/atomicatlas/product-about-full.webp",
                alt: "The complete About page listing all twenty-three gates in five groups, each with a one-line rule and its source.",
                width: 1800,
                height: 4406,
                title: "About (full)",
                caption:
                  "All twenty-three, grouped as data honesty, geometry, colour, camera and light, and interaction — each with the threshold and the paper or WCAG criterion it comes from.",
              },
            ],
          },
          {
            value: "mobile",
            title: "On a phone",
            description: "The inspector becomes a sheet along the bottom edge, where reserving a column would leave the drawing a letterbox.",
            slides: [
              {
                src: "/projects/atomicatlas/product-mobile-molecules.webp",
                alt: "The shelf on a phone viewport: one column of structure cards under the search field.",
                width: 860,
                height: 1864,
                title: "The shelf (mobile)",
                caption: "One column, same facets, same URLs.",
              },
              {
                src: "/projects/atomicatlas/product-mobile-detail.webp",
                alt: "Haemoglobin's page on a phone: the reading column above, the viewport below it.",
                width: 860,
                height: 1864,
                title: "A structure page (mobile)",
                caption: "The two columns stack, and the viewer re-fits itself when the box it lives in changes width rather than keeping a camera framed for a shape that is gone.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "AtomicAtlas closes as 100 curated structures across seven functional groups, a search that reaches the rest of the archive, and a viewer with nothing third-party doing the part that matters. Adding a structure is a catalogue entry; the page is already there, because every figure on it is derived rather than authored.",
        "The gates are the piece I would keep, and they changed the work rather than just checking it. Writing the “where it's found” rows meant reading a hundred deposited headers in one pass, and three entries in the catalogue turned out to be describing a different molecule than the identifier holds. And the one structure on the shelf that still warns — a single strand of a collagen triple helix, ten of its thirty residues unresolved — was answered with a sentence on its own page rather than a better-looking render.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/atomicatlas/figure-gate-report.webp",
          alt: "Two QA overlays side by side: restrictocin passing 23 of 23, and the collagen peptide passing 21 of 23 with two warnings beside its broken segments.",
          width: 1800,
          height: 728,
        },
      ],
      stats: [
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at atomicatlas-three.vercel.app.",
        },
        {
          value: "23/23",
          label: "Gates passing, on every curated structure but one",
          detail: "1CGD warns on coverage and representation fit, and says so on its own page rather than in a log.",
        },
        {
          value: "69",
          label: "Authored links between structures",
          detail: "Each written with the reason it holds, above the weaker links a shared tag can infer on its own.",
        },
        {
          value: "3",
          label: "Catalogue entries caught mislabelled",
          detail: "1CBS, 2CRO and 1ETN each named a different molecule than the coordinates behind the identifier hold.",
        },
      ],
    },
  ],
};
