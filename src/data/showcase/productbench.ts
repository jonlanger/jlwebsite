import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "productbench",
  title: "ProductBench",
  description:
    "Living research library of real software products — UX patterns, workflows, and architecture — so design and product teams can learn from what already ships.",
  image: "/projects/productbench/productbench_card.png",
  alt: "ProductBench home with living research library headline and design-system category tiles.",
  width: 1280,
  height: 720,
  liveUrl: "https://productbench.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Product and design teams rarely lack inspiration — they lack structure. Screenshots pile up in folders, competitive notes live in one-off decks, and the useful details (navigation models, workflow steps, density choices, IA depth) get lost before the next kickoff.",
      "ProductBench is a living research library of enterprise, consumer, and industrial software. Each product is documented as a comparable record — surfaces, workflows, feature inventory, and architecture signals — so teams can filter, cite, and carry findings into briefs, critiques, and handoff conversations.",
    ],
    role: "Lead Designer — Product Design, Interaction Design, Engineering (solo build)",
    scope:
      "Web research catalog — searchable product library, filterable catalog, product briefs with UX / screens / workflows / architecture, contribution flow, member unlock for deeper galleries",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Secondary research for product work usually collapses into bookmarks and moodboards. Those artifacts show how a product looks — not how it is structured, what roles it serves, or which workflow patterns actually transfer. The design problem was to make real-world product craft searchable and deep enough to shape decisions, without turning the tool into another dump of screenshots.",
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
          title: "Why inspiration stalls",
          items: [
            {
              title: "Unstructured capture",
              body: "Folders of screenshots and Notion dumps are hard to filter, compare, or cite once a project moves on.",
            },
            {
              title: "Looks without structure",
              body: "Hero shots hide navigation models, density choices, role splits, and workflow depth that teams actually need.",
            },
            {
              title: "One-off audits",
              body: "Competitive teardowns go stale. Teams rebuild the same research for the next initiative instead of revisiting a shared library.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Comparable records",
              body: "Every product needed the same lenses — UX, screens, workflows, features, architecture — so cross-product reading stayed honest.",
            },
            {
              title: "Fast discovery",
              body: "Category, segment, platform, and semantic search had to surface the right peer in seconds, not a scroll marathon.",
            },
            {
              title: "Depth with a gate",
              body: "Guests get a useful preview; members unlock the full captured gallery so the public surface stays lean and the research layer stays rich.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "500",
          label: "Products in catalog",
          detail: "Enterprise, consumer, industrial, and developer tools with structured records.",
        },
        {
          value: "7",
          label: "Analysis lenses",
          detail: "UX analysis, screens, workflows, features, live capture, stack notes, and architecture.",
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
        "The product is organized as a research system, not a gallery. A filterable catalog leads into product briefs that pair narrative craft notes with measurable structure — page and screen counts, IA depth, roles, competitive set — then open into captured surfaces and role-based workflows.",
        "Search is treated as a first-class research tool: typed queries resolve across products, companies, features, and related concepts so teams can ask “how do they do X?” without knowing the exact product name up front.",
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
          title: "Research model",
          items: [
            {
              title: "Catalog → brief → depth",
              body: "Browse or filter the library, open a product record, then move through screens, workflows, and architecture tabs without losing context.",
            },
            {
              title: "Structured capture",
              body: "Surfaces are tagged by kind (homepage, product UI, components, supporting) so galleries stay navigable as the library grows.",
            },
            {
              title: "Contribute & grow",
              body: "A contribution path lets teams submit products with UX, workflow, and stack detail — keeping the database living instead of frozen at launch.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story runs from the full research-library home into featured catalog, semantic search, and product briefs — then through captured surfaces, workflows, analysis, About, and Process. Screens below are from the live ProductBench experience.",
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
        "ProductBench turns scattered product inspiration into a living library teams can search, filter, and cite. The public app ships a 500-product catalog with structured briefs, captured surfaces, and workflow analysis — so secondary research stops being a one-off scavenger hunt and becomes a reusable layer across the product journey.",
      ],
      stats: [
        {
          value: "Live",
          label: "Public web app",
          detail: "Shipped at productbench.vercel.app.",
        },
        {
          value: "500",
          label: "Documented products",
          detail: "Structured records across categories, segments, and platforms.",
        },
        {
          value: "Solo",
          label: "Design-led build",
          detail: "Lead designer through product, interaction, and engineering.",
        },
        {
          value: "Open",
          label: "Contribution path",
          detail: "Teams can submit products to keep the research library growing.",
        },
      ],
    },
  ],
};
