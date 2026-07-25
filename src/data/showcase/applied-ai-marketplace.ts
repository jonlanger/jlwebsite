import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "applied-ai-marketplace",
  title: "Applied AI Marketplace",
  description:
    "AI-native asset catalog and discovery platform that unified 10+ internal repositories into a single, searchable source of truth for BCG's applied AI tools.",
  image: "/projects/applied-ai-marketplace/applied-ai-marketplace_card.png",
  alt: "Applied AI Marketplace homepage with search-first entry, curated collections, and browse categories.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Finding the right AI tool, dataset, or agent for a case is a core part of BCG\u2019s proposal process \u2014 teams need to move fast, and a slow search costs real time on the clock. Before this project, that content was scattered across 10+ independent repositories \u2014 tools, datasets, MCPs, skills, business tools, agents \u2014 with no unified, security-vetted source of truth.",
      "We built the Applied AI Marketplace to centralize discovery into one AI-native catalog \u2014 searchable by natural language or structured filters, with a consistent product template that adapts to free, licensed, gated, and usage-based access models alike.",
    ],
    role: "UX Research, Product Design, UI Design, Stakeholder Alignment",
    scope:
      "Enterprise web platform \u2014 AI chat search, faceted catalog, product detail pages, admin/submission tooling, responsive mobile",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "BCG\u2019s asset landscape had grown organically over a decade of internal tool-building, with no single owner or standard. Centralizing it wasn\u2019t just a repository merge \u2014 it required designing for a population as large and varied as a mid-size company.",
      ],
      topicGroups: [
        {
          title: "Why centralization matters",
          items: [
            {
              title: "Faster proposal cycles",
              body: "Teams lose time hunting across repositories during the highest-pressure phase of a case.",
            },
            {
              title: "Consistent vetting",
              body: "No shared security/quality bar across 10+ disconnected sources meant inconsistent trust in what teams found.",
            },
            {
              title: "Fragmented ownership",
              body: "Tools, datasets, and agents were built and maintained independently, with no shared discovery layer.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Mixed access models",
              body: "Free, licensed, gated, one-time, usage-based, and per-seat recurring pricing all needed to live in one consistent template.",
            },
            {
              title: "Dual audience",
              body: "Case teams searching under deadline pressure vs. PA admins submitting and maintaining assets long-term.",
            },
            {
              title: "Firm-wide scale",
              body: "A population on the order of 40,000+ people, spanning client-facing consultants and internal specialist groups with very different workflows.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "750+",
          label: "Products cataloged",
          detail: "Spanning 9 asset types across the firm.",
        },
        {
          value: "10+",
          label: "Repositories unified",
          detail: "Into one searchable source of truth.",
        },
        {
          value: "41,766",
          label: "LEAD-approved population",
          detail: "The addressable audience for Marketplace access.",
        },
        {
          value: "~25k",
          label: "Core target base",
          detail: "Internal and specialist roles primarily served day to day.",
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Research combined a proof-of-concept usability study with structured interviews across case teams, PA admins, and internal specialist groups \u2014 testing real assumptions about navigation, terminology, and the role of AI chat before the interface was finalized.",
        "POC testing made the gaps concrete: roughly half of participants expected to browse via an icon rather than the Filter button, and several didn\u2019t immediately grasp that the catalog covered more than GPTs. Participants also pushed for curated grouping over a flat list \u2014 and for chat that could break a complex ask into themes that mirrored their own phrasing.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/applied-ai-marketplace/research-poc-catalog.png",
          alt: "POC user-testing board with early catalog prototype and sticky-note insights on navigation and terminology.",
          width: 1800,
          height: 1013,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/applied-ai-marketplace/research-poc-chat-themes.png",
          alt: "POC chat prototype showing multi-theme results grouped to match a complex natural-language ask.",
          width: 1800,
          height: 1013,
        },
      ],
      figuresLayout: "grid-2",
      table: {
        ariaLabel: "Key user groups and discovery needs",
        rows: [
          {
            col1: "Case teams",
            col2: "Fast, trustworthy discovery under deadline pressure \u2014 often during proposal-writing, when time is tightest.",
          },
          {
            col1: "PA admins / owners",
            col2: "A clear, low-friction way to submit, maintain, and retire assets without a separate repository.",
          },
          {
            col1: "Internal specialist groups",
            col2: "BST, BCG Vantage, BCG X, and boutique units \u2014 the primary day-to-day user base whose workflows the catalog had to reflect.",
          },
          {
            col1: "Firm leadership / stakeholders",
            col2: "Confidence the experience matched BCG\u2019s brand and quality bar, especially for paid and licensed assets.",
          },
        ],
      },
      topicGroups: [
        {
          title: "What research prioritized",
          items: [
            {
              title: "Curated navigation over a flat list",
              body: "Participants consistently wanted assets grouped by Asset Type or Use Case rather than browsing everything at once \u2014 matching how people think about their task.",
            },
            {
              title: "Plain-language chat over filter-hunting",
              body: "Describing a task in natural language tested well; multi-theme responses landed especially well when grouping mirrored the user\u2019s own phrasing.",
            },
            {
              title: "Clear \u201cwhat is this\u201d framing",
              body: "Terminology like \u201casset\u201d wasn\u2019t self-explanatory. One participant put it plainly: \u201cI don\u2019t know what an asset is. That\u2019s not the clearest word.\u201d Another: \u201cIf I\u2019m going onto this database\u2026 I already have an idea in my mind of what I want.\u201d",
            },
          ],
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The IA splits into two entry paths that converge on the same catalog: a search/chat-first path for people who already know their task, and a curated browse path \u2014 Trending Assets, Curated Collections, and Browse Everything by Use Case, Case Stage, Industry, Function, or Asset Type \u2014 for people still exploring. Every asset, regardless of access model, resolves to the same Product Detail Page template.",
        "That single PDP flexes its CTA and pricing block without changing the shell: free assets launch immediately, licensed or gated assets request access, and paid assets purchase through one-time, per-request/API, or per-seat recurring models \u2014 with 50+ products carrying live payment functionality.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/applied-ai-marketplace/product-ia.png",
          alt: "Marketplace information architecture with Search/Chat and Browse paths converging into a unified catalog, PDP, and access-model CTAs.",
          width: 1440,
          height: 810,
        },
      ],
      topicGroups: [
        {
          title: "Consistent PDP across access models",
          items: [
            {
              title: "Free / launch",
              body: "\u201cLaunch Asset\u201d CTA with no fee \u2014 enterprise-licensed tools ready to open.",
            },
            {
              title: "Licensed / gated",
              body: "\u201cRequest Access\u201d CTA for approval-gated inventory, still in the same detail template.",
            },
            {
              title: "Paid",
              body: "\u201cPurchase\u201d CTA supporting one-time, usage-based, and per-seat recurring pricing in one place.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story runs from a search-first homepage through AI chat and curated browsing into a single, flexible product template \u2014 then adapts that same core experience for mobile.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/applied-ai-marketplace/product-homepage-full-v5.png",
            alt: "Marketplace homepage with personalized search, Assets Worth Knowing, Curated Collections, and Browse Everything.",
            width: 1988,
            height: 3072,
            title: "Search-first homepage",
            caption:
              "Assets Worth Knowing, Curated Collections, and Browse Everything \u2014 so people who already know their task and people still exploring land in the same catalog.",
          },
          {
            src: "/projects/applied-ai-marketplace/product-chat-multitheme.png",
            alt: "AI chat answering a slide-writing query with assets and collections results side by side.",
            width: 1800,
            height: 1013,
            title: "Chat / AI search",
            caption:
              "Natural-language discovery with grouped multi-theme results \u2014 assets and collections that mirror how someone described their work.",
          },
          {
            src: "/projects/applied-ai-marketplace/product-browse-filters.png",
            alt: "Browse view with Use Case filter for Slide Creation and a grid of matching asset cards.",
            width: 1800,
            height: 1013,
            title: "Browse & filter",
            caption:
              "Full faceted filtering \u2014 Asset Type, Industry, Function, Use Case, Case Stage, Pricing \u2014 with grid and list toggle.",
          },
          {
            src: "/projects/applied-ai-marketplace/product-pdp-launch.png",
            alt: "Product detail page for n8n Workflow Automation with Launch Asset CTA and no fee.",
            width: 1800,
            height: 1013,
            title: "Product Detail Page",
            caption:
              "One consistent template \u2014 metadata, overview, and CTA \u2014 flexing across free, gated, and paid access models.",
          },
          {
            src: "/projects/applied-ai-marketplace/product-mobile-pdp.png",
            alt: "Mobile product detail page for Slide Generator by Deckster with Launch Asset CTA.",
            width: 1800,
            height: 1013,
            title: "Mobile",
            caption:
              "Same discovery and detail patterns, responsively adapted for on-the-go case work.",
          },
        ],
        accordion: [
          {
            value: "homepage-sections",
            title: "Homepage sections",
            description:
              "Close-ups of the search hero, Assets Worth Knowing, Curated Collections, and Browse Everything.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/applied-ai-marketplace/product-homepage-hero.png",
                alt: "Homepage hero with personalized greeting, search bar, and quick-start pills.",
                width: 1988,
                height: 507,
                title: "Search hero",
                caption:
                  "\u201cWhat are you working on?\u201d \u2014 natural-language search plus quick paths for find, case, industry, and learn more.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-homepage-assets.png",
                alt: "Assets Worth Knowing carousel with Popular and New tabs and launch metrics on each card.",
                width: 1800,
                height: 1013,
                title: "Assets Worth Knowing",
                caption:
                  "Popular, New, and Hidden Gems \u2014 social proof on the cards so people see what BCGers actually use.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-homepage-collections.png",
                alt: "Curated Collections cards for Proposal Kickstart, Slide Writing, Data Analysis, and Interviews.",
                width: 1800,
                height: 1013,
                title: "Curated Collections",
                caption:
                  "Themed packs of assets \u2014 proposal kickstart, slides, data analysis, interviews \u2014 for people still exploring.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-homepage-browse.png",
                alt: "Browse Everything section with Use Case categories and facet tabs for Case Stage, Industry, Function, and Asset Type.",
                width: 1800,
                height: 1013,
                title: "Browse Everything",
                caption:
                  "Faceted entry by Use Case, Case Stage, Industry, Function, or Asset Type \u2014 curated navigation over a flat list.",
              },
            ],
          },
          {
            value: "chat-discovery",
            title: "Chat & discovery",
            description:
              "Multi-theme results, related suggestions when an exact match misses, and graceful zero-result handling.",
            slides: [
              {
                src: "/projects/applied-ai-marketplace/product-chat-slide-writing.png",
                alt: "Chat sidebar recommending slide tools with a filtered asset list on the right.",
                width: 1800,
                height: 1013,
                title: "Task-shaped answers",
                caption:
                  "Ask for slide help \u2014 get named tools and a live catalog list, not a wall of filters to hunt through.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-chat-custom-gpts.png",
                alt: "Chat requesting top Custom GPTs with Asset Type filter applied and ten matching results.",
                width: 1800,
                height: 1013,
                title: "Chat plus facets",
                caption:
                  "Natural language sets the intent; structured filters refine without starting over.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-chat-related.png",
                alt: "Chat soft-miss for Amazon Code Whisperer offering related coding tools instead of an empty state.",
                width: 1800,
                height: 1013,
                title: "Related when exact fails",
                caption:
                  "No exact match still returns useful neighbors \u2014 keeping people in discovery instead of dead ends.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-chat-zero.png",
                alt: "Chat zero-result state for an out-of-scope query with empty catalog panel.",
                width: 1800,
                height: 1013,
                title: "Graceful empty states",
                caption:
                  "Out-of-scope asks get clear guidance \u2014 plus paths to submit or request what\u2019s missing.",
              },
            ],
          },
          {
            value: "browse-facets",
            title: "Browse by how work is framed",
            description:
              "Use Case, Case Stage, Industry, Function, and Asset Type \u2014 the curated navigation research asked for.",
            slides: [
              {
                src: "/projects/applied-ai-marketplace/product-browse-usecase.png",
                alt: "Browse Everything grid filtered by Use Case categories.",
                width: 1800,
                height: 1013,
                title: "Use Case",
                caption:
                  "Client engagement, coding, data analysis, research, slides, automation, writing \u2014 browse by the job to be done.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-browse-case-stage.png",
                alt: "Browse Everything grid filtered by Case Stage from BD through close.",
                width: 1800,
                height: 1013,
                title: "Case Stage",
                caption:
                  "From Drive BD & Proposals through Close Case \u2014 aligned to how case teams actually move.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-browse-industry.png",
                alt: "Browse Everything grid of industry practice areas.",
                width: 1800,
                height: 1013,
                title: "Industry",
                caption:
                  "Practice-area lenses for teams who already know which industry context they need.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-browse-asset-type.png",
                alt: "Browse Everything grid of nine asset types including Agents, Datasets, Skills, and Developer Tools.",
                width: 1800,
                height: 1013,
                title: "Asset Type",
                caption:
                  "Nine types in one catalog \u2014 Agents, Custom GPTs, Datasets, Skills, Developer Tools, and more.",
              },
            ],
          },
          {
            value: "pdp-access-models",
            title: "One PDP, five+ access models",
            description:
              "Launch, Request Access, and Purchase \u2014 one-time, usage-based, and per-seat recurring \u2014 in the same detail shell.",
            slides: [
              {
                src: "/projects/applied-ai-marketplace/product-pdp-request-access.png",
                alt: "Product detail page with Request Access CTA and no fee for a gated agent.",
                width: 1800,
                height: 1013,
                title: "Request Access",
                caption:
                  "Gated inventory stays in the same template \u2014 approval without a separate intake experience.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-pdp-purchase-claude.png",
                alt: "Claude for Enterprise product detail with Purchase CTA and one-time fee.",
                width: 1800,
                height: 1013,
                title: "One-time purchase",
                caption:
                  "Paid licensed tools surface price and Purchase in the same hero card as free launches.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-pdp-usage-based.png",
                alt: "Trade Analytics Portal product detail with usage-based per-request pricing.",
                width: 1800,
                height: 1013,
                title: "Usage-based",
                caption:
                  "Per-request / API pricing with monthly billing \u2014 still one PDP, one CTA pattern.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-pdp-recurring.png",
                alt: "NotebookLM Enterprise product detail with per-user recurring monthly fee.",
                width: 1800,
                height: 1013,
                title: "Per-seat recurring",
                caption:
                  "Seat-based subscription pricing without inventing a second product template.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-pdp-one-time.png",
                alt: "Synergy Database product detail with $400 one-time Purchase CTA.",
                width: 1800,
                height: 1013,
                title: "High-ticket one-time",
                caption:
                  "Premium proprietary assets use the same Purchase pattern \u2014 scaled for larger fees.",
              },
            ],
          },
          {
            value: "mobile",
            title: "Responsive mobile",
            description:
              "Navigation drawer, chat history, and detail CTAs adapted for phone and tablet.",
            slides: [
              {
                src: "/projects/applied-ai-marketplace/product-mobile-home.png",
                alt: "Mobile navigation drawer open over a product detail page with chat history and Launch Asset.",
                width: 1800,
                height: 1013,
                title: "Nav & chat history",
                caption:
                  "Home, collections, trending, and recent chats in a drawer \u2014 discovery continues off desktop.",
              },
              {
                src: "/projects/applied-ai-marketplace/product-mobile-pdp.png",
                alt: "Mobile product detail for Slide Generator with Launch Asset and metadata tags.",
                width: 1800,
                height: 1013,
                title: "Detail on the go",
                caption:
                  "Launch, metadata, and overview stay scannable on a narrow viewport.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Three months post-launch, the Marketplace has become a daily discovery tool across the firm \u2014 reducing time-to-find-asset from over 30 minutes to under 2, and reaching a large share of its core internal audience.",
      ],
      stats: [
        {
          value: "750+",
          label: "Products cataloged",
          detail: "Unifying what was previously 10+ separate repositories.",
        },
        {
          value: "9,564",
          label: "Active unique users (Q3)",
          detail: "~23% of the 41,766-person eligible population.",
        },
        {
          value: "Under 2 min",
          label: "Time to find an asset",
          detail: "Down from 30+ minutes before launch.",
        },
        {
          value: "40%",
          label: "PDP \u2192 CTA conversion",
          detail: "28,793 product page views converting to 11,531 CTA clicks.",
        },
        {
          value: "57%",
          label: "Positive chat feedback",
          detail: "Across 11,902 AI chat sessions and 14,334 unique searches.",
        },
        {
          value: "50+",
          label: "Products with live payments",
          detail: "One-time, per-request, and per-seat recurring pricing in a single template.",
        },
      ],
    },
  ],
};
