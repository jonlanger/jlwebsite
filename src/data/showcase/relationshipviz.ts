import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "relationshipviz",
  category: "software",
  title: "RelationshipViz",
  description:
    "Relationship intelligence for investors. A sourced map of who supplies, partners with, invests in and competes with whom across 512 companies, scored for risk and opportunity.",
  image: "/projects/relationshipviz/relationshipviz_card.webp",
  alt: "RelationshipViz Explore view: a dark network graph centered on Nvidia with TSMC, Microsoft, Amazon and other counterparties, filters on the left, and Nvidia’s company drawer with an investor-lens scorecard on the right.",
  width: 1280,
  height: 720,
  liveUrl: "https://relationshipviz.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Earnings show how a company did. Its relationships show why it will keep winning: who can’t switch away from it, who backs it, and whose problems become its problems. That information is public, but it’s scattered across filings and press releases.",
      "RelationshipViz maps it. It links 512 companies through 259 sourced relationships, scores each company’s risk and opportunity with rules you can read, and traces a shock like a Taiwan chip disruption through the network. Every claim links back to its source.",
    ],
    role: "Product Design, Data Visualization, Information Architecture, Data Pipeline, Design System, Front-end Build",
    scope:
      "Web app: landing, network explorer, market insights, risk and opportunity lenses, stress tests, portfolio look-through, idea finder, company profiles, methodology. Also a Storybook design system.",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Supply chains, partnerships and equity stakes decide pricing power and exposure, but investors rarely see them. They’re buried in 10-Ks, kept behind paid terminals, or reported one deal at a time.",
      ],
      topicGroups: [
        {
          title: "Why it stays hidden",
          items: [
            {
              title: "Buried in filings",
              body: "Dependencies show up as a single sentence in a 10-K, not as data you can search.",
            },
            {
              title: "No network view",
              body: "Tools report one company at a time, so second-order exposure never shows up.",
            },
            {
              title: "Unsourced scores",
              body: "Ratings arrive as verdicts, with no way to check the reasoning.",
            },
          ],
        },
      ],
      stats: [
        { value: "512", label: "Companies", detail: "S&P 500 plus key global and private counterparties." },
        { value: "259", label: "Relationships", detail: "Supplier, partner, investor, competitor." },
        { value: "12", label: "HQ countries", detail: "18% of links cross a border." },
        { value: "336", label: "Evidence items", detail: "Filings, research, press and curated notes." },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "Two kinds of investor ask the same question: which companies can’t the market do without? Individuals want to act on the answer. Analysts and advisors have to defend it to someone else, so they need sources.",
        "Testing the data shaped the product as much as the users did. Automated extraction from 10-Ks finds real links but misclassifies some, so every link carries a confidence level and the evidence behind it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/relationshipviz/diagram-personas.png",
          alt: "Two proto-personas. The individual investor wants durable companies and to understand hidden dependencies, and works in Home, Portfolio, Ideas and Lenses. The analyst or advisor wants to compare relationship strategies and cite evidence, and works in Explore, Insights, company profiles and Data.",
          width: 2400,
          height: 1113,
        },
      ],
      topicGroups: [
        {
          title: "Findings and insights",
          items: [
            {
              title: "Stickiness is structural",
              body: "The hardest companies to replace are the ones with many critical customers that also connect otherwise separate parts of the market.",
            },
            {
              title: "Exposure is second-order",
              body: "A portfolio with no Taiwan holdings can still depend on TSMC through its suppliers and funds.",
            },
            {
              title: "Trust needs provenance",
              body: "A score is only useful if you can follow it back to the filing or article behind it.",
            },
            {
              title: "Not advice",
              body: "The product says what to research, never how much to buy.",
            },
          ],
        },
      ],
      stats: [
        { value: "45%", label: "Scraped-link confidence", detail: "Hidden by the default 50% filter." },
        { value: "35", label: "Verified links", detail: "Researched and checked by hand." },
        { value: "0", label: "Keys required", detail: "The pipeline runs from cached, public data." },
      ],
    },
    {
      title: "Scoring Model",
      paragraphs: [
        "Two lenses score each company. Risk asks how exposed it is through its relationships; Opportunity asks how well they position it. Each factor becomes a percentile among the companies in view, and missing data counts as the median, never as a verdict.",
        "Together the two scores sort companies into four stances, and each factor points to the relationships that drive it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/relationshipviz/diagram-scoring.png",
          alt: "Scoring model. Seven risk factors (supplier, customer and geographic concentration at weight 1; counterparty fragility and competitive pressure 0.75; weak fundamentals 0.5; relationship instability 0.25) and six opportunity factors (demand pull and chokepoint 1; ecosystem momentum, relative momentum and growth quality 0.75; new deals 0.25). Raw values become percentiles, then a weighted mean, then one of four stances: upside with lower risk, upside with higher risk, low signal, or higher risk with less upside.",
          width: 2400,
          height: 1391,
        },
      ],
      stats: [
        { value: "13", label: "Scoring rules", detail: "Each with a weight you can change." },
        { value: "4", label: "Stances", detail: "Split at the median on each lens." },
        { value: "3 hops", label: "Stress-test reach", detail: "Each impact keeps its strongest path." },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "An offline pipeline merges a curated seed with SEC filings, Wikidata and AI-assisted research into one dataset, validated by a schema the app shares. Everything after that runs in the browser, including graph metrics, scoring, stress tests and portfolio analysis.",
        "The app has seven views that share one set of filters. Every chart, score and list links back to the graph or to a company profile.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/relationshipviz/diagram-architecture.png",
          alt: "Architecture. Sources (curated seed, SEC EDGAR 10-Ks, SEC XBRL and N-PORT, Wikipedia and Wikidata, Claude research) feed a pipeline that scrapes, merges and validates into dataset.json with 512 companies, 259 relationships and 336 evidence items. In the browser: graph, network metrics, lenses, scenarios, portfolio and ideas, shown through Sigma.js WebGL, D3 charts, profiles and a shared Zustand store.",
          width: 2400,
          height: 1217,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/relationshipviz/diagram-sitemap.png",
          alt: "Information architecture. Home leads to Explore, Insights, Lenses, Portfolio, Ideas and Company profile, with a Data page for methodology. Each view lists its main modules.",
          width: 2400,
          height: 1416,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            {
              title: "Evidence one click away",
              body: "Every relationship opens what flows, how much it matters, when it started and where the claim comes from.",
            },
            {
              title: "Color only on marks",
              body: "Text stays neutral. Sector, relationship and lens colors appear only on the data.",
            },
            {
              title: "Signals, not advice",
              body: "Scores come with their reasons and watch-outs. The app never suggests a position size.",
            },
          ],
        },
        {
          title: "Build",
          items: [
            {
              title: "WebGL graph",
              body: "Sigma.js renders the network. Layouts run in a Web Worker so filtering stays smooth.",
            },
            {
              title: "Private by default",
              body: "Portfolio positions stay in the browser. Funds are looked through to their holdings via SEC N-PORT.",
            },
            {
              title: "Every chart has a table",
              body: "Each chart card has a legend, a tooltip and a table view.",
            },
          ],
        },
      ],
    },
    {
      title: "Design System",
      paragraphs: [
        "The design system lives in Storybook with 89 stories, organized by atomic layer. Atoms import nothing, molecules compose atoms, and only pages talk to the store, so every organism can be rendered in isolation.",
        "Tokens are TypeScript, which generates the CSS. Components use only semantic roles, and the canvas and WebGL code reads the same values, so the graph and the UI never disagree. Dark and light themes are each fully specified rather than inverted.",
      ],
      topicGroups: [
        {
          title: "Rules",
          items: [
            {
              title: "Color by entity, not rank",
              body: "Eight fixed categorical slots, checked for color-blind separation on both themes. A sector keeps its color whatever the filters.",
            },
            {
              title: "One accent, outside the data",
              body: "Signal lime marks actions and focus. It sits outside every data hue.",
            },
            {
              title: "Two ramps for two lenses",
              body: "Risk uses an orange ramp and opportunity a blue one, so they never read as the same scale.",
            },
          ],
        },
      ],
      stats: [
        { value: "50", label: "Components", detail: "20 atoms, 16 molecules, 14 organisms." },
        { value: "2", label: "Full themes", detail: "Dark default and light." },
        { value: "8", label: "Categorical slots", detail: "Fixed order, never cycled." },
        { value: "1", label: "Token source", detail: "TypeScript to CSS, canvas and WebGL." },
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/relationshipviz/ds-themes.webp",
            alt: "Surface, text, accent and status tokens rendered in the dark and light themes side by side.",
            width: 1800,
            height: 1125,
            title: "Two themes",
            caption: "Each theme fills every semantic role.",
          },
          {
            src: "/projects/relationshipviz/ds-dataviz.webp",
            alt: "Eight categorical data colors in fixed order and a seven-step sequential blue ramp.",
            width: 1800,
            height: 1125,
            title: "Data palette",
            caption: "Eight fixed slots, validated for color-vision deficiency.",
          },
          {
            src: "/projects/relationshipviz/ds-type.webp",
            alt: "Type scale from hero to overline, set in Inter, with size and line-height tokens in JetBrains Mono.",
            width: 1800,
            height: 1125,
            title: "Type",
            caption: "Inter for reading, mono for tokens and figures.",
          },
          {
            src: "/projects/relationshipviz/ds-atoms.webp",
            alt: "Button matrix in three sizes, a risk ScoreMeter at 72 of 100, an SEC filing EvidenceSnippet, and a FactorBreakdown.",
            width: 1800,
            height: 1125,
            title: "Atoms and molecules",
            caption: "Buttons, score meters, evidence and factor breakdowns.",
          },
          {
            src: "/projects/relationshipviz/ds-scorecard.webp",
            alt: "LensScorecard organism in dark and light themes, showing risk and opportunity with every factor and the biggest exposures.",
            width: 1800,
            height: 1125,
            title: "LensScorecard",
            caption: "Both scores with the factors and ties behind them.",
          },
          {
            src: "/projects/relationshipviz/ds-organisms.webp",
            alt: "CompanyDetailPanel for Nvidia, a RelationshipPanel for TSMC supplies Nvidia, and the QuestionStepper.",
            width: 1800,
            height: 1125,
            title: "Organisms",
            caption: "Drawer, relationship evidence and the idea stepper.",
          },
          {
            src: "/projects/relationshipviz/ds-scenario.webp",
            alt: "ScenarioPanel with preset shocks, direct and knock-on counts, and the most affected companies.",
            width: 1800,
            height: 1125,
            title: "ScenarioPanel",
            caption: "Stress tests as a single component.",
          },
          {
            src: "/projects/relationshipviz/ds-quadrant.webp",
            alt: "LensQuadrantChart plotting risk against opportunity with four labeled quadrants.",
            width: 1800,
            height: 1125,
            title: "Quadrant chart",
            caption: "Risk by opportunity, split at the median.",
          },
        ],
      },
    },
    {
      title: "Product",
      paragraphs: [
        "It starts with a landing page that argues its case with live data, then opens into seven connected views. Every screen below is from the live app.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/relationshipviz/landing.webp",
            alt: "Landing page: The best companies are the hardest to replace, with a live network around Nvidia and counts of companies, relationships, countries and single-source dependencies.",
            width: 1800,
            height: 1125,
            title: "The premise",
            caption: "The hero network is live, built around the top-ranked company.",
          },
          {
            src: "/projects/relationshipviz/explore.webp",
            alt: "Explore: the full network colored by sector, with filters and a sector legend.",
            width: 1800,
            height: 1125,
            title: "Explore the network",
            caption: "512 companies, filtered by sector, type and confidence.",
          },
          {
            src: "/projects/relationshipviz/explore-drawer.webp",
            alt: "Nvidia selected in Explore, with its ties highlighted and the company drawer open.",
            width: 1800,
            height: 1125,
            title: "Focus a company",
            caption: "Its ties light up and the drawer shows its scorecard.",
          },
          {
            src: "/projects/relationshipviz/lenses.webp",
            alt: "Lenses page with KPI tiles, the risk against opportunity quadrant and factor-weight sliders.",
            width: 1800,
            height: 1125,
            title: "Risk and opportunity",
            caption: "Every company placed, every weight adjustable.",
          },
          {
            src: "/projects/relationshipviz/stress.webp",
            alt: "Stress test: Taiwan supply disruption with direct and knock-on counts and the most affected companies.",
            width: 1800,
            height: 1125,
            title: "Stress test",
            caption: "A shock traced hop by hop, with the path behind each impact.",
          },
          {
            src: "/projects/relationshipviz/portfolio.webp",
            alt: "Portfolio with a chips sample: companies reached, biggest hidden dependency TSMC, risk and opportunity, and what to look at.",
            width: 1800,
            height: 1125,
            title: "Your portfolio",
            caption: "Hidden dependencies, computed in the browser.",
          },
          {
            src: "/projects/relationshipviz/company-relationships.webp",
            alt: "Company profile relationships: TSMC supplies Nvidia and SK hynix supplies Nvidia, with materiality, what flows, timelines and sources.",
            width: 1800,
            height: 1125,
            title: "Every claim cited",
            caption: "What flows, why it matters and where it’s reported.",
          },
          {
            src: "/projects/relationshipviz/mobile.webp",
            alt: "Three phone screens: the landing hero, the Lenses page and Nvidia’s company profile.",
            width: 1844,
            height: 1280,
            title: "On a phone",
            caption: "The reading views reflow to a single column.",
          },
        ],
        accordion: [
          {
            value: "landing",
            title: "Landing",
            description: "Makes the case with the product’s own data.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/relationshipviz/landing-why.webp",
                alt: "Why relationships: supply links, partnerships and equity stakes, each with a count.",
                width: 1800,
                height: 1125,
                title: "Why relationships",
                caption: "Dependence, trust and backing, counted.",
              },
              {
                src: "/projects/relationshipviz/landing-stickiest.webp",
                alt: "The stickiest companies leaderboard led by Nvidia, TSMC and ASML.",
                width: 1800,
                height: 1125,
                title: "Stickiest companies",
                caption: "Ranked by how much of the network depends on them.",
              },
              {
                src: "/projects/relationshipviz/landing-compare.webp",
                alt: "Same market, different playbooks: Nvidia, TSMC and ASML compared by relationship mix.",
                width: 1800,
                height: 1125,
                title: "Different playbooks",
                caption: "Three leaders, three ways to be hard to replace.",
              },
              {
                src: "/projects/relationshipviz/landing-stress.webp",
                alt: "Stress test teaser: 59 companies feel a Taiwan supply disruption within three steps.",
                width: 1800,
                height: 1125,
                title: "Stress-test teaser",
                caption: "From 2 companies in Taiwan to 59 in three steps.",
              },
            ],
          },
          {
            value: "network",
            title: "Network and insights",
            description: "The whole market, from graph to charts.",
            slides: [
              {
                src: "/projects/relationshipviz/explore-community.webp",
                alt: "Explore colored by Louvain community, revealing clusters.",
                width: 1800,
                height: 1125,
                title: "Communities",
                caption: "Louvain clustering finds the market’s blocs.",
              },
              {
                src: "/projects/relationshipviz/explore-risk.webp",
                alt: "Explore colored by the risk lens on an orange ramp.",
                width: 1800,
                height: 1125,
                title: "Lens on the graph",
                caption: "The same risk score, drawn on the network.",
              },
              {
                src: "/projects/relationshipviz/insights.webp",
                alt: "Insights: KPIs, a cross-sector chord diagram, relationship mix and connectedness histogram.",
                width: 1800,
                height: 1125,
                title: "Insights",
                caption: "Every chart follows the Explore filters.",
              },
              {
                src: "/projects/relationshipviz/insights-sankey.webp",
                alt: "Supply flows between sectors as a Sankey, network hubs by betweenness, and a world map.",
                width: 1800,
                height: 1125,
                title: "Flows and hubs",
                caption: "Sankey, betweenness and cross-border links.",
              },
            ],
          },
          {
            value: "lenses",
            title: "Lenses and stress tests",
            description: "Where to look closer, and what could break.",
            slides: [
              {
                src: "/projects/relationshipviz/lenses-tune.webp",
                alt: "Risk against opportunity scatter and the Tune the lenses weight sliders.",
                width: 1800,
                height: 1125,
                title: "Tune the lenses",
                caption: "Change a weight and every stance updates.",
              },
              {
                src: "/projects/relationshipviz/lenses-deps.webp",
                alt: "Upside with lower risk, risk without the upside, and riskiest dependencies lists.",
                width: 1800,
                height: 1125,
                title: "Riskiest dependencies",
                caption: "Named ties, like AMD via TSMC.",
              },
              {
                src: "/projects/relationshipviz/stress.webp",
                alt: "Stress test presets and the most affected companies.",
                width: 1800,
                height: 1125,
                title: "Scenarios",
                caption: "Five presets, or build your own.",
              },
            ],
          },
          {
            value: "portfolio",
            title: "Portfolio and ideas",
            description: "For the money you already have, and what to research next.",
            slides: [
              {
                src: "/projects/relationshipviz/portfolio-empty.webp",
                alt: "Empty portfolio with stock and fund inputs and sample portfolios.",
                width: 1800,
                height: 1125,
                title: "Start with a sample",
                caption: "Big tech, chips or dividend payers.",
              },
              {
                src: "/projects/relationshipviz/portfolio-lookthrough.webp",
                alt: "Portfolio look-through with hidden dependencies, stress tests and jurisdictions.",
                width: 1800,
                height: 1125,
                title: "Look-through",
                caption: "What your holdings quietly rest on.",
              },
              {
                src: "/projects/relationshipviz/ideas-question.webp",
                alt: "Idea finder question: What do you want your money to do?",
                width: 1800,
                height: 1125,
                title: "Six questions",
                caption: "One at a time, each explaining why it’s asked.",
              },
              {
                src: "/projects/relationshipviz/ideas-results.webp",
                alt: "Idea finder results: an exposure check and companies to research with reasons and watch-outs.",
                width: 1800,
                height: 1125,
                title: "Ideas to research",
                caption: "Reasons and watch-outs, never a position size.",
              },
            ],
          },
          {
            value: "evidence",
            title: "Profiles and evidence",
            description: "Where every number comes from.",
            slides: [
              {
                src: "/projects/relationshipviz/company.webp",
                alt: "Nvidia company profile with facts, financials and the investor-lens scorecard.",
                width: 1800,
                height: 1125,
                title: "Company profile",
                caption: "Facts, financials and the full scorecard.",
              },
              {
                src: "/projects/relationshipviz/company-supply.webp",
                alt: "Nvidia supply chain as a Sankey with suppliers on the left and customers on the right, plus relationship mix.",
                width: 1800,
                height: 1125,
                title: "Supply chain",
                caption: "Suppliers in, customers out.",
              },
              {
                src: "/projects/relationshipviz/data.webp",
                alt: "Sources and methodology page with the data pipeline steps.",
                width: 1800,
                height: 1125,
                title: "Methodology",
                caption: "Pipeline, rules and limitations, in the open.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "RelationshipViz turns scattered disclosures into a network investors can question. You can see who the market depends on, follow a shock through it, check your own holdings, and trace every number back to a filing or article. It’s live, runs entirely in the browser, and doesn’t give advice.",
      ],
      stats: [
        { value: "7", label: "Connected views", detail: "One set of filters across all of them." },
        { value: "5", label: "Stress-test presets", detail: "Plus build-your-own shocks." },
        { value: "0", label: "Data sent anywhere", detail: "Portfolios stay in the browser." },
        { value: "1 click", label: "To the source", detail: "From any relationship to its evidence." },
      ],
    },
  ],
};
