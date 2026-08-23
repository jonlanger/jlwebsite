import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "productbench",
  category: "software",
  title: "ProductBench",
  description:
    "Living research library that turns competitive benchmarking into structured, reusable product records — instead of screenshot folders that reset every project.",
  image: "/projects/productbench/productbench_card.png",
  alt: "ProductBench home with living research library headline and design-system category tiles.",
  width: 1280,
  height: 720,
  liveUrl: "https://productbench.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Product and design teams don’t lack inspiration — they lack structure. Every competitive review starts the same way: a folder of screenshots, a one-off deck, a Notion page that goes stale the moment the project ends. The useful details — how the navigation is actually organized, how dense the UI is, what workflow a feature really supports — get lost, and the next project rebuilds the same research from scratch.",
      "ProductBench is a living research library of enterprise, consumer, and industrial software, built to fix that. Each product is documented as a structured, comparable record — not a screenshot dump — so the research accumulates instead of resetting every time.",
    ],
    role: "Lead Designer — product design, interaction design, and engineering (solo build)",
    scope:
      "Web research catalog: filterable product library, structured product briefs (UX, screens, workflows, architecture), a capture pipeline for consistent screenshots, and a contribution flow to keep the catalog growing.",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Benchmarking is a core part of the design process — before sketching a flow or defending a pattern, you look at how mature products already solve the same problem. But doing this well takes real time, and most of that time gets thrown away.",
        "ProductBench treats benchmarking as infrastructure, not a one-time task: every product captured becomes a persistent, structured record — not a report that gets filed away and forgotten.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/productbench/diagram-system.png",
          alt: "Diagram showing scattered inspiration transforming into ProductBench product records, then into discovery, critique, and handoff use.",
          width: 1600,
          height: 1000,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/productbench/diagram-research.png",
          alt: "Infographic of what each product record documents across interface, work, and structure, plus where it fits in the product journey.",
          width: 1600,
          height: 1000,
        },
      ],
      figuresLayout: "grid-2",
      topicGroups: [
        {
          title: "Why benchmarking stalls",
          items: [
            {
              title: "Unstructured capture",
              body: "Screenshots in folders are hard to filter, compare, or cite once the project moves on.",
            },
            {
              title: "Looks without structure",
              body: "A hero shot doesn’t tell you the navigation model, the density choices, or how deep a workflow actually goes.",
            },
            {
              title: "One-off audits",
              body: "Competitive teardowns go stale fast, and the next team starts over instead of building on what was already learned.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Comparable records",
              body: "Every product needed the same lenses (UX, screens, workflows, features, architecture) so cross-product comparisons stay honest rather than apples-to-oranges.",
            },
            {
              title: "Fast discovery",
              body: "Category, segment, platform, and search need to surface the right peer in seconds, not after a scroll marathon.",
            },
            {
              title: "Depth with a gate",
              body: "Guests get a useful preview of each product record; logging in unlocks the full captured gallery, so the public surface stays lean while the research layer underneath stays rich.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "500",
          label: "Products in catalog",
          detail: "Documented across categories, segments, and platforms.",
        },
        {
          value: "7",
          label: "Analysis lenses",
          detail: "UX analysis, screens, workflows, features, live capture, tech stack, and architecture.",
        },
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at productbench.vercel.app.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The hard part of ProductBench isn’t the catalog UI — it’s making product capture consistent and structured enough to actually compare across 500+ very different products, from a Salesforce dashboard to a Spotify player to an ERP system.",
        "That’s handled by a Playwright-based capture pipeline that runs against a defined taxonomy — surface, component, state, structure, and source — so every screenshot is tagged by what it actually shows, not just when it was taken. Products that need non-standard handling (heavier JS apps, unusual auth flows, etc.) get their own capture playbook rather than forcing one generic script to work everywhere.",
        "The result is a dataset that can answer questions a screenshot folder can’t: which products in a category use a similar navigation pattern, how page count scales with product complexity, which role-based workflows repeat across tools that have nothing else in common.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/productbench/diagram-ia.png",
          alt: "Information architecture diagram with browse/filter and semantic search converging on a product brief and depth lenses.",
          width: 1600,
          height: 1000,
        },
      ],
      topicGroups: [
        {
          title: "Seven lenses, one record",
          items: [
            {
              title: "UX analysis",
              body: "Navigation model, density, interaction patterns.",
            },
            {
              title: "Screens",
              body: "The captured surfaces themselves.",
            },
            {
              title: "Workflows",
              body: "Role-based flows through the product.",
            },
            {
              title: "Features",
              body: "Capability inventory.",
            },
            {
              title: "Live capture",
              body: "The raw, tagged screenshots behind each record.",
            },
            {
              title: "Tech stack",
              body: "What the product is actually built with.",
            },
            {
              title: "Architecture",
              body: "Page count, IA depth, platform coverage.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The live product runs from research-library home into featured catalog, search, and structured product briefs — then through captured surfaces, workflows, analysis, About, and Process. Screens below are from productbench.vercel.app.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/productbench/product-home.png",
            alt: "ProductBench home with research library headline and category tiles for design systems, interaction, and accessibility.",
            width: 1800,
            height: 1125,
            title: "Research library home",
            caption:
              "Brand-first entry with search in the chrome — explore the catalog or learn why ProductBench belongs in the product journey.",
          },
          {
            src: "/projects/productbench/product-home-featured.png",
            alt: "Featured catalog section with Notion, Salesforce, Figma, Stripe, Linear, and other product cards.",
            width: 1800,
            height: 1125,
            title: "Featured in the catalog",
            caption:
              "A cross-section of enterprise, consumer, industrial, and developer products — open any card for UX, workflows, and architecture detail.",
          },
          {
            src: "/projects/productbench/product-home-value.png",
            alt: "Why teams use it section with four value pillars for research, architecture comparison, journey fit, and cross-functional teams.",
            width: 1800,
            height: 1125,
            title: "Why teams use it",
            caption:
              "Structured research you can filter, compare, and cite — not another bookmark folder of pretty screenshots.",
          },
          {
            src: "/projects/productbench/product-catalog.png",
            alt: "Product catalog grid with filters closed and product cards across categories.",
            width: 1800,
            height: 1125,
            title: "Filterable catalog",
            caption:
              "A scannable bento of products with category, segment, metrics, and pattern chips — open filters when you need to narrow the set.",
          },
          {
            src: "/projects/productbench/product-search.png",
            alt: "Semantic search results for figma across product names, UX patterns, workflows, and research notes.",
            width: 1800,
            height: 1125,
            title: "Semantic product search",
            caption:
              "Queries resolve across products, companies, patterns, and notes — then land on a filtered results grid without overlay clutter.",
          },
          {
            src: "/projects/productbench/product-detail.png",
            alt: "Linear product brief with craft narrative, metrics, and visit-website link.",
            width: 1800,
            height: 1125,
            title: "Product brief",
            caption:
              "Each record opens with craft notes, metrics, and a preview of captured surfaces — enough to orient before going deeper.",
          },
          {
            src: "/projects/productbench/product-surfaces.png",
            alt: "Linear product surfaces gallery showing captured Product UI homepage depth slides.",
            width: 1800,
            height: 1125,
            title: "Captured surfaces",
            caption:
              "Screens are grouped by category — homepage, product UI, components — with member unlock for the full gallery.",
          },
          {
            src: "/projects/productbench/product-analysis.png",
            alt: "Linear UX analysis with design system, navigation model, interaction model, patterns, and key screens.",
            width: 1800,
            height: 1125,
            title: "UX analysis",
            caption:
              "Patterns, density, navigation, and key screens keep structure visible beside the visuals.",
          },
          {
            src: "/projects/productbench/product-workflows.png",
            alt: "Linear workflows tab showing Sprint cycle steps and roles for Engineer, EM, and PM.",
            width: 1800,
            height: 1125,
            title: "Role-based workflows",
            caption:
              "End-to-end flows with steps and roles sit beside the UI — so teams study how work moves, not just how screens look.",
          },
          {
            src: "/projects/productbench/product-stripe.png",
            alt: "Stripe product brief with fintech narrative and metrics grid.",
            width: 1800,
            height: 1125,
            title: "Cross-category depth",
            caption:
              "The same brief model spans fintech, enterprise, consumer, and industrial products — comparable without flattening context.",
          },
        ],
        accordion: [
          {
            value: "full-pages",
            title: "Full pages",
            description:
              "Complete homepage, About, and Process captures from the live app.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/productbench/product-home-full.png",
                alt: "Full ProductBench homepage from hero through featured catalog, value pillars, journey steps, and contribute CTA.",
                width: 1800,
                height: 4303,
                title: "Homepage (full)",
                caption:
                  "Hero, featured catalog, why teams use it, inspiration-to-decision steps, and contribute CTA in one scroll.",
              },
              {
                src: "/projects/productbench/product-about-full.png",
                alt: "Full About page covering why ProductBench, differentiation, journey fit, and what is documented.",
                width: 1800,
                height: 3231,
                title: "About (full)",
                caption:
                  "Built for the product development journey — discovery through critique, handoff, and iteration.",
              },
              {
                src: "/projects/productbench/product-process-full.png",
                alt: "Full Process page covering capture pipeline, taxonomy, collection method, and limits.",
                width: 1800,
                height: 5211,
                title: "Process (full)",
                caption:
                  "What ProductBench looks for in product UI — surfaces, components, states, structure, and fair-use limits.",
              },
            ],
          },
          {
            value: "journey-process",
            title: "Journey, process & contribution",
            description:
              "Where ProductBench fits, how capture is framed, and how the library grows.",
            slides: [
              {
                src: "/projects/productbench/product-about-journey.png",
                alt: "About page section showing where ProductBench fits across discovery through iteration.",
                width: 1800,
                height: 1125,
                title: "Where it fits",
                caption:
                  "Secondary research layer for discovery, framing, exploration, critique, handoff, and iteration.",
              },
              {
                src: "/projects/productbench/product-process-taxonomy.png",
                alt: "Process taxonomy covering surfaces, components, states, and structure to capture.",
                width: 1800,
                height: 1125,
                title: "Capture taxonomy",
                caption:
                  "Surfaces, components, and states — the reusable units designers actually need, not only hero shots.",
              },
              {
                src: "/projects/productbench/product-contribute.png",
                alt: "Contribute form to add a product with UX patterns and key workflows.",
                width: 1800,
                height: 1125,
                title: "Grow the database",
                caption:
                  "Submit products with UX, workflow, and stack detail so the catalog stays useful beyond a fixed seed set.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "ProductBench turns benchmarking from a one-off scramble into a reusable layer of research. The catalog currently documents 500 products across categories, segments, and platforms, with structured briefs and captured surfaces behind each one.",
      ],
      stats: [
        {
          value: "500",
          label: "Products documented",
          detail: "Across categories, segments, and platforms.",
        },
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at productbench.vercel.app.",
        },
        {
          value: "Solo",
          label: "Design-led build",
          detail: "Product, interaction, and engineering.",
        },
        {
          value: "Open",
          label: "Contribution path",
          detail: "So the catalog keeps growing.",
        },
      ],
    },
  ],
};
