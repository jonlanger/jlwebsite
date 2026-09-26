import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "shortlist",
  category: "software",
  title: "Shortlist",
  description:
    "A weighted place comparison tool. Split 100 points across what matters and watch your shortlist of towns re-rank in front of you.",
  image: "/projects/shortlist/shortlist_card.webp",
  alt: "Shortlist ranking view: a six-part priority bar with 100 points split across commute, walk, tax, price, schools and grocery, a ranked list led by Hoboken at 74.1, and a map of the four candidate towns.",
  width: 1280,
  height: 720,
  liveUrl: "https://shortlisthome.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Choosing where to live is a comparison, but the tools for it are lookups: one town in, one grade out, weighted by someone else. The real question — which compromise can I live with — stays in your head.",
      "Shortlist ranks a set of candidate towns against priorities you set yourself. You get 100 points across six criteria; shift a weight and the cards physically reorder. It started as my own home search and became a study in interaction and motion design, where the product is the moment the ranking moves.",
    ],
    role: "Product Design, Interaction & Motion Design, Data Modeling, Design System, Front-end Build",
    scope:
      "Web app — landing, shortlist builder with offline city search and map, priority allocator, weighted ranking, sensitivity hints, user-entered values, save and share, live design system",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Walk Score, Niche, AreaVibes and NeighborhoodScout each answer “how good is this place?” Nobody chooses in isolation. You are choosing between four, and every site weighs them differently.",
      ],
      topicGroups: [
        {
          title: "Why the search stalls",
          items: [
            {
              title: "One place at a time",
              body: "Every tool reports a single location, so comparing means juggling tabs and memory.",
            },
            {
              title: "Borrowed weighting",
              body: "A grade bakes in someone else’s idea of what matters, and hides the math.",
            },
            {
              title: "Tradeoffs stay abstract",
              body: "Reading that a town is cheaper but farther doesn’t tell you how much farther is worth it.",
            },
          ],
        },
      ],
      stats: [
        { value: "4", label: "Tools benchmarked", detail: "All single-location lookups." },
        { value: "6", label: "Criteria", detail: "Commute, walk, tax, price, schools, grocery." },
        { value: "100", label: "Points to spend", detail: "A fixed pool, so priorities cost something." },
        { value: "38,646", label: "U.S. towns", detail: "Searchable offline, scored instantly." },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "I benchmarked the four common tools on what they compare, who sets the weighting, and whether the tradeoff or the source of a number is ever visible. None compare a set, and none let you weight.",
        "From my own search and how people use those tools, I drew three proto-personas. They look at the same towns but would spend the 100 points very differently — which is exactly why a single grade fails them.",
        "I then tested the data. A calibration script compares the offline estimator against 16 hand-researched NY-metro towns, which set how much each number can be trusted.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/shortlist/diagram-landscape.png",
          alt: "Competitive benchmark table. Walk Score, Niche, AreaVibes and NeighborhoodScout each compare one place with weighting fixed by the tool, and show neither the tradeoff nor the source of each value. Shortlist compares a set side by side with the user’s own 100 points, and shows both.",
          width: 2400,
          height: 1155,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/shortlist/diagram-personas.png",
          alt: "Three proto-personas. The relocating couple wants a town both can defend and weights schools and commute. The transit-first renter weights commute and walkability. The budget-first buyer weights price and property tax. Each card shows goal, friction and a 100-point priority bar.",
          width: 2400,
          height: 1152,
        },
      ],
      topicGroups: [
        {
          title: "Findings and insights",
          items: [
            {
              title: "The decision is the set",
              body: "Scores only mean something relative to the alternatives, so normalization is relative to the shortlist, not the country.",
            },
            {
              title: "Priorities need a cost",
              body: "Independent sliders let everything be “very important.” A fixed pool forces an honest answer.",
            },
            {
              title: "A near-tie is information",
              body: "Two towns within a point shouldn’t snap apart. Holding them in visible tension tells you the call is yours.",
            },
            {
              title: "Trust needs provenance",
              body: "Estimates are good enough to shortlist, not to buy. Every number shows where it came from and can be replaced.",
            },
          ],
        },
      ],
      stats: [
        { value: "±7 min", label: "Commute accuracy", detail: "Estimator vs. researched towns." },
        { value: "±10", label: "Walk Score accuracy", detail: "Modelled from population density." },
        { value: "~20%", label: "Home price accuracy", detail: "Where the Census has a value." },
        { value: "16", label: "Towns hand-researched", detail: "The NY-metro calibration set." },
      ],
    },
    {
      title: "Deciding Factors",
      paragraphs: [
        "Six criteria cover the questions every persona asked. Each has a direction: lower is better for commute, tax, price and grocery distance; higher for walkability and schools.",
        "The same four towns with the same data produce three different winners depending only on how the points are spent. That is the product’s argument, shown on the landing page and computed live.",
      ],
      table: {
        ariaLabel: "Shortlist criteria and how each is sourced",
        rows: [
          { col1: "Commute (lower is better)", col2: "Distance to your destination × route factor, with speed rising over distance" },
          { col1: "Walk Score (higher)", col2: "Population density, log-linear" },
          { col1: "Property tax (lower)", col2: "Census median taxes ÷ median home value, else the state rate" },
          { col1: "Home price (lower)", col2: "Census median home value, brought to today" },
          { col1: "Schools (higher)", col2: "State index adjusted by local income and density" },
          { col1: "Grocery access (lower)", col2: "Population density, log-linear" },
        ],
      },
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/shortlist/diagram-deciding-factors.png",
          alt: "Four priority allocations on the same four towns. Balanced and Transit-first put Hoboken first at 74 and 84. Schools-first gives a near tie between Millburn / Short Hills and Maplewood at 55. Budget-first puts Stamford first at 71.",
          width: 2400,
          height: 1427,
        },
      ],
      stats: [
        { value: "3", label: "Different winners", detail: "From one dataset, four allocations." },
        { value: "0.5 pts", label: "Near tie shown", detail: "Held apart by a dashed connector." },
        { value: "1 pt", label: "Smallest flip", detail: "The hint names the shift that changes first place." },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Everything runs in the browser. Place data ships with the app, and scoring is a pure function of the shortlist and the weights, so every change re-renders instantly and the whole decision fits in a share link.",
        "The design system follows one rule: color belongs to the criteria. Six hues at equal lightness follow a priority everywhere it appears, and every other state — leader, near tie, missing data — is shown by form, not color.",
        "The app is four pages. The landing page makes the argument, Compare does the work in three steps, Saved keeps rankings, and Design documents the system. Deep links skip straight to the ranking.",
      ],
      figures: [
        {
          afterParagraphIndex: 2,
          src: "/projects/shortlist/diagram-sitemap.png",
          alt: "Information architecture. A global header links to home, Saved and Compare. Landing has the hero, why existing tools fall short, how it works, four live preset examples, a data note and a footer link to Design. Compare has three steps: Places (city search, shortlist, map), Priorities (presets, commute destination, priority bar and sliders) and Your ranking (priorities, share, save, ranked place cards, flip hint, near-tie connector, your own numbers, map). Saved lists saved rankings to open, rename or delete. Design covers principles, tokens and components. Preset and share links open the ranking directly.",
          width: 2400,
          height: 1934,
        },
        {
          afterParagraphIndex: 0,
          src: "/projects/shortlist/diagram-architecture.png",
          alt: "Architecture: sources from strongest to weakest (yours, researched, Census, estimated) feed provenance-tagged place values, which are normalized 0–100 relative to the set and multiplied by the 100-point weights, then ranked with near-tie detection and sensitivity, and shown as cards, a MapLibre map, a share URL and saved rankings. Zero runtime API calls.",
          width: 2400,
          height: 1295,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            {
              title: "Motion carries meaning",
              body: "Cards settle into their new rank and scores retick. Nothing bounces for decoration, and reduced motion is respected.",
            },
            {
              title: "State by form",
              body: "Leader is a filled pin with a halo, a near tie is a dashed rule, missing data is hatched.",
            },
            {
              title: "Big, obvious actions",
              body: "Every button is at least 48px, with one call to action per step, labelled with what happens next.",
            },
          ],
        },
        {
          title: "Build",
          items: [
            {
              title: "Config-driven criteria",
              body: "One array defines what is scored; add an entry and the allocator, cards and map pick it up.",
            },
            {
              title: "Open map stack",
              body: "MapLibre GL on OpenFreeMap tiles, recolored from the design tokens. No API key.",
            },
            {
              title: "State in the URL",
              body: "Places, weights and your own values encode into the link, so Share reopens the exact comparison.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The flow is three steps — places, priorities, ranking — with the ranking beside a full-height map. Every screen below is from the live app.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/shortlist/landing.webp",
            alt: "Shortlist landing page: “Every place looks good until you say what matters,” with Pick places to compare and See what changes buttons.",
            width: 1800,
            height: 1125,
            title: "The premise",
            caption: "One line of value, one call to action.",
          },
          {
            src: "/projects/shortlist/places.webp",
            alt: "Step 1 of 3: Montclair, Hoboken, Maplewood and Stamford in the shortlist, pinned on the map.",
            width: 1800,
            height: 1125,
            title: "Build a shortlist",
            caption: "Search any U.S. town offline; each one drops onto the map.",
          },
          {
            src: "/projects/shortlist/priorities.webp",
            alt: "Step 2 of 3: What matters most to you? Presets, a six-part priority bar, and sliders for each criterion.",
            width: 1800,
            height: 1125,
            title: "Spend 100 points",
            caption: "Raise one priority and the others give up points.",
          },
          {
            src: "/projects/shortlist/ranking-cards.webp",
            alt: "Ranking view with the priority bar, a sensitivity hint, Hoboken ranked first at 74.1, and the map.",
            width: 1800,
            height: 1125,
            title: "The ranking",
            caption: "Input above result, map alongside.",
          },
          {
            src: "/projects/shortlist/flip-applied.webp",
            alt: "After applying a sensitivity hint, Millburn / Short Hills moves to first with a score delta and Up 3 places label.",
            width: 1800,
            height: 1125,
            title: "Watch it move",
            caption: "Cards reorder and show how far they moved.",
          },
          {
            src: "/projects/shortlist/own-numbers.webp",
            alt: "A place card open for editing, with fields to replace each criterion value.",
            width: 1800,
            height: 1125,
            title: "Use your own numbers",
            caption: "Replace any estimate; yours always wins.",
          },
          {
            src: "/projects/shortlist/saved.webp",
            alt: "Saved rankings page with a Transit-first, NY metro ranking, its weights and Open ranking button.",
            width: 1800,
            height: 1125,
            title: "Save and share",
            caption: "Keep a ranking or send a link that reopens it exactly.",
          },
          {
            src: "/projects/shortlist/mobile.webp",
            alt: "Three phone screens: the priority allocator, a ranked card for Millburn / Short Hills with a near-tie connector, and the map tab.",
            width: 1844,
            height: 1280,
            title: "On a phone",
            caption: "A Ranking / Map toggle shows one pane at a time.",
          },
        ],
        accordion: [
          {
            value: "landing",
            title: "Landing",
            description: "The argument, made with the product’s own data.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/shortlist/landing-why.webp",
                alt: "Existing tools answer a different question, with three differentiators.",
                width: 1800,
                height: 1125,
                title: "Why it exists",
                caption: "Multi-place, explicit weighting, visible tradeoff.",
              },
              {
                src: "/projects/shortlist/landing-how.webp",
                alt: "How it works: pick your candidates, allocate your priorities, watch the ranking move.",
                width: 1800,
                height: 1125,
                title: "How it works",
                caption: "Three steps, each one sentence.",
              },
              {
                src: "/projects/shortlist/landing-examples.webp",
                alt: "Same four places, four sets of priorities: Balanced, Transit-first, Schools-first and Budget-first rankings.",
                width: 1800,
                height: 1125,
                title: "Live examples",
                caption: "Four allocations computed live; each opens in the tool.",
              },
            ],
          },
          {
            value: "ranking",
            title: "Ranking and weights",
            description: "Where the tradeoff becomes visible.",
            slides: [
              {
                src: "/projects/shortlist/ranking.webp",
                alt: "Ranking step header with Share and Save ranking, the priorities panel and the map.",
                width: 1800,
                height: 1125,
                title: "Your priorities",
                caption: "Presets, commute destination and a draggable bar.",
              },
              {
                src: "/projects/shortlist/ranking-schools.webp",
                alt: "Schools-first preset applied: schools takes 45 points and the bar redistributes.",
                width: 1800,
                height: 1125,
                title: "Presets",
                caption: "One tap reallocates all six criteria.",
              },
              {
                src: "/projects/shortlist/flip-hint.webp",
                alt: "Sensitivity hint above the ranked cards, with each card’s six meters of points earned out of points given.",
                width: 1800,
                height: 1125,
                title: "What would flip first place",
                caption: "The smallest single change that reorders the top.",
              },
              {
                src: "/projects/shortlist/flip-applied.webp",
                alt: "Millburn / Short Hills moved to first after the hint was applied.",
                width: 1800,
                height: 1125,
                title: "Try it",
                caption: "Apply the hint and watch the swap.",
              },
            ],
          },
          {
            value: "shortlist",
            title: "Building a shortlist",
            description: "Getting candidates in fast.",
            slides: [
              {
                src: "/projects/shortlist/places-empty.webp",
                alt: "Empty Step 1 with the city search field and a U.S. map.",
                width: 1800,
                height: 1125,
                title: "Start anywhere",
                caption: "One question per step, asked as the heading.",
              },
              {
                src: "/projects/shortlist/places.webp",
                alt: "Four towns added and pinned on the map.",
                width: 1800,
                height: 1125,
                title: "Four candidates",
                caption: "Scores fill in instantly from bundled data.",
              },
              {
                src: "/projects/shortlist/priorities.webp",
                alt: "Priorities step with presets and fine-tune sliders.",
                width: 1800,
                height: 1125,
                title: "Set priorities",
                caption: "Presets to start, sliders to fine-tune.",
              },
            ],
          },
          {
            value: "trust",
            title: "Trust, saving and sharing",
            description: "Numbers you can check and decisions you can keep.",
            slides: [
              {
                src: "/projects/shortlist/own-numbers.webp",
                alt: "Editing a place’s values on its card.",
                width: 1800,
                height: 1125,
                title: "Your numbers",
                caption: "Tagged “Yours” and layered over estimates.",
              },
              {
                src: "/projects/shortlist/save.webp",
                alt: "Name this ranking dialog above the priorities.",
                width: 1800,
                height: 1125,
                title: "Save a ranking",
                caption: "Name it and come back later.",
              },
              {
                src: "/projects/shortlist/saved.webp",
                alt: "Saved rankings list.",
                width: 1800,
                height: 1125,
                title: "Saved rankings",
                caption: "Open, rename or delete.",
              },
            ],
          },
          {
            value: "design-system",
            title: "Design system",
            description: "A live reference rendered from the real components.",
            slides: [
              {
                src: "/projects/shortlist/design.webp",
                alt: "Design system page: Color belongs to the criteria. State is shown by form. Primitives and criterion hues.",
                width: 1800,
                height: 1125,
                title: "Color and primitives",
                caption: "Quiet paper, slate ink, six criterion hues.",
              },
              {
                src: "/projects/shortlist/design-state.webp",
                alt: "State by form examples and the type scale.",
                width: 1800,
                height: 1125,
                title: "State and type",
                caption: "Leader, near tie and missing data by form alone.",
              },
              {
                src: "/projects/shortlist/design-motion.webp",
                alt: "Motion tokens, map palette and button sizes.",
                width: 1800,
                height: 1125,
                title: "Motion and map",
                caption: "Settle easing, and a basemap on the same paper.",
              },
              {
                src: "/projects/shortlist/design-forms.webp",
                alt: "Button variants, the stepper and form field states.",
                width: 1800,
                height: 1125,
                title: "Forms and steppers",
                caption: "One pattern for every step of the flow.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Shortlist turns a lookup into a comparison. People state their priorities as a budget, see the ranking answer back, and leave with a link to the exact decision. It is live, works for any U.S. town, and makes no calls to outside services.",
      ],
      stats: [
        { value: "38.6k", label: "Towns covered", detail: "Census places plus townships." },
        { value: "0", label: "Runtime API calls", detail: "All data and scoring ship with the app." },
        { value: "3", label: "Steps to a ranking", detail: "Places, priorities, ranking." },
        { value: "1 link", label: "To share a decision", detail: "Places, weights and your values in the URL." },
      ],
    },
  ],
};
