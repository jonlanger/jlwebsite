import type { PastProject, ProjectCarouselSlide } from "@/data/past-projects";
import {
  AUREUM_DAVID_JOURNEY_COLUMNS,
  AUREUM_DISCOVERY_COLUMNS,
  AUREUM_EMILY_JOURNEY_COLUMNS,
  AUREUM_LISA_JOURNEY_COLUMNS,
  AUREUM_MICHAEL_JOURNEY_COLUMNS,
  AUREUM_SARAH_JOURNEY_COLUMNS,
} from "@/data/aureum-journey-maps";

const APP = "https://aureumfinance.vercel.app";
const DIR = "/projects/aureum";

/** A 1800×1125 screen from the live prototype or design system. */
const screen = (file: string, title: string, caption: string, alt: string): ProjectCarouselSlide => ({
  src: `${DIR}/${file}.webp`,
  alt,
  width: 1800,
  height: 1125,
  title,
  caption,
});

export const project: PastProject = {
  slug: "aureum",
  category: "software",
  title: "Aureum AI",
  description:
    "An AI personal finance coach that turns a few honest answers into a step-by-step Money Map, a safe-to-spend number and a few well-timed nudges.",
  image: `${DIR}/aureum_card.webp`,
  alt: "Aureum homepage hero: “Money, mentored.” on a teal field beside a phone showing a heads-up nudge about rent and car insurance landing the same week.",
  width: 1280,
  height: 720,
  liveUrl: `${APP}/`,
  liveLinks: [
    { label: "Web app", href: `${APP}/app/` },
    { label: "Design system", href: `${APP}/design-system` },
  ],
  overview: {
    title: "Overview",
    paragraphs: [
      "Most people lack the financial literacy and personalized guidance to make confident decisions about saving, debt and budgeting. Generic finance tools leave them with fragmented accounts, generic advice, and dashboards that describe the past instead of saying what to do next.",
      "Aureum is a personal finance coach built around one idea from research: people want the same tools, but not in the same order. It started in 2024 as research, journey maps and a brand board. It is now a working prototype: a marketing site, a living design system, and a responsive web app where nine questions produce a real plan. Under the coach sit nine finance engines, 61 sourced rules and a governor that decides how little to say.",
    ],
    role: "UX Research, Product Design, Interaction Design, Design Systems, Front-end Build",
    scope:
      "Responsive web app (onboarding, Home, Budget, Money Map, Goals & debt, Coach, lessons), marketing homepage, and a living design system with data-viz components and an illustration cast.",
  },
  sections: [
    {
      title: "Problem",
      paragraphs: [
        "Research revealed five interconnected problem spaces. Existing tools address pieces of the puzzle, but rarely connect them.",
      ],
      topicGroups: [
        {
          title: "Problem statements",
          items: [
            {
              title: "Financial literacy and education",
              body: "Many people lack the knowledge to make informed decisions about saving, investing and budgeting. The gap leads to poor habits, weaker investment choices and little preparation for emergencies.",
            },
            {
              title: "Personalized financial guidance",
              body: "Existing tools give generic advice that ignores a person’s situation, goals and preferences, which makes it hard to build a plan that fits and to stick to it.",
            },
            {
              title: "Savings and investment optimization",
              body: "Without tailored strategies and timely insight, people miss chances to grow their savings and investments: lower returns, missed goals and a sense of insecurity.",
            },
            {
              title: "Social and community engagement",
              body: "Financial stress isolates people and affects their well-being. A solution should improve financial health and also offer community and support.",
            },
            {
              title: "Integration of financial tools",
              body: "Savings, investments and loans live on different platforms. Managing them is slow and fragmented; people need one holistic view of their financial health.",
            },
          ],
        },
      ],
    },
    {
      title: "Research",
      paragraphs: [
        "The 2024 concept framed Aureum as a holistic, AI-powered personal finance coach: a patient teacher rather than another dashboard.",
        "Five archetypes came out of the interviews, across income, life stage and financial confidence. They asked for the same capabilities but disagreed on what should come first. In the prototype, David Lee became the demo persona: a teacher with a credit card, a car loan and a small emergency fund.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/aureum_system_sketch.png`,
          alt: "2024 concept art: Aureum Finance, Holistic AI-Powered Personal Finance Coach, with a piggy bank in glasses teaching at a chalkboard full of financial charts.",
          width: 3840,
          height: 2160,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-people.webp`,
          alt: "Five lives, five different plans. Emily Johnson, marketing specialist, is saving for a home down payment and needs a budget built for her and visible progress; Aureum answers with goals and the goal simulator. Michael Chen, software engineer, has several accounts, two kids, a 529 and a tech-heavy portfolio and needs one integrated view; tested as standing first, answered with the health score and net worth. Sarah Martinez, small business owner, has business and personal money mixed and lumpy income; answered with a variable-income safety net and safe-to-spend. David Lee, high school teacher and the demo persona in the app, has a credit card, a car loan and college savings and needs a way out of debt that doesn't ignore the future; answered with the Money Map and debt payoff plan. Lisa Robinson, retired nurse, has a fixed pension and rising healthcare costs and needs to know what's about to go wrong; tested as risk first, answered with a 30-day forecast and heads-up nudges.",
          width: 2400,
          height: 1074,
        },
      ],
      topicGroups: [
        {
          title: "Findings",
          items: [
            {
              title: "Order matters more than features",
              body: "Everyone wanted planning and tracking. They disagreed on what to see first: what’s about to go wrong, or how they’re doing.",
            },
            {
              title: "Setup is where people leave",
              body: "Privacy worries and data entry were the friction that came up most. Value has to arrive before the bank login does.",
            },
            {
              title: "Assist, don’t overwhelm",
              body: "People wanted nudges at friction points, not a notification feed. Guidance should feel supportive rather than prescriptive.",
            },
          ],
        },
      ],
    },
    {
      title: "Journey Mapping",
      paragraphs: [],
      journeyBlocks: [
        {
          type: "paragraph",
          text: "Each persona was mapped across the eight capability areas the 2024 concept was organized around, from account setup to community: what they do, how they feel, what goes wrong, and where an AI nudge could help.",
        },
        {
          type: "journeyAccordion",
          value: "emily",
          title: "Emily Johnson, Marketing Specialist",
          tableAriaLabel: "Journey map for Emily Johnson across eight stages: actions, emotional state, edge cases, AI nudges and opportunity",
          columns: AUREUM_EMILY_JOURNEY_COLUMNS,
        },
        {
          type: "journeyAccordion",
          value: "michael",
          title: "Michael Chen, Software Engineer",
          tableAriaLabel: "Journey map for Michael Chen across eight stages: actions, emotional state, edge cases, AI nudges and opportunity",
          columns: AUREUM_MICHAEL_JOURNEY_COLUMNS,
        },
        {
          type: "journeyAccordion",
          value: "sarah",
          title: "Sarah Martinez, Small Business Owner",
          tableAriaLabel: "Journey map for Sarah Martinez across eight stages: actions, emotional state, edge cases, AI nudges and opportunity",
          columns: AUREUM_SARAH_JOURNEY_COLUMNS,
        },
        {
          type: "journeyAccordion",
          value: "david",
          title: "David Lee, High School Teacher",
          tableAriaLabel: "Journey map for David Lee across eight stages: actions, emotional state, edge cases, AI nudges and opportunity",
          columns: AUREUM_DAVID_JOURNEY_COLUMNS,
        },
        {
          type: "journeyAccordion",
          value: "lisa",
          title: "Lisa Robinson, Retired Nurse",
          tableAriaLabel: "Journey map for Lisa Robinson across eight stages: actions, emotional state, edge cases, AI nudges and opportunity",
          columns: AUREUM_LISA_JOURNEY_COLUMNS,
        },
        {
          type: "paragraph",
          text: "Laid on one grid, the five maps showed a pattern. Financial planning is the high point for four of five people, and also where two of them get overwhelmed. Savings is where plans break, on irregular income and surprise expenses. Each stage got a specific design response in the rebuild.",
        },
        {
          type: "figure",
          src: `${DIR}/diagram-friction.webp`,
          alt: "Journey synthesis, five personas by eight stages. Account setup: 0 peaks, 2 friction (Michael, Lisa); response: no bank login to start, answers stay on the device, read-only by design. Financial planning: 4 peaks, 2 friction; response: one question per screen, then a Money Map with a single next step. Expense tracking: 1 peak, 2 friction; response: auto-categories with one-tap fixes. Savings: 2 peaks, 3 friction; response: a 30-day forecast, safe-to-spend and a 6-month fund for variable income. Investing: 3 peaks, 2 friction; response: no securities advice and a plain-language Why on every card. Debt: 1 and 1; response: snowball versus avalanche side by side. Education: 2 and 1; response: two-minute lessons matched to the current step. Community: 2 peaks, 0 friction; response: people scenes and peer stories, never a character beside bad news.",
          width: 2400,
          height: 1289,
        },
        {
          type: "paragraph",
          text: "The product discovery map traced the wider path, from problem awareness through purchase, first use, continued use and community, to find where trust is won or lost before anyone opens the app.",
        },
        {
          type: "journeyAccordion",
          value: "discovery",
          title: "Product discovery map",
          tableAriaLabel: "Product discovery map across five stages: actions, emotional state, influences, and tools and features",
          columns: AUREUM_DISCOVERY_COLUMNS,
        },
      ],
    },
    {
      title: "Test",
      paragraphs: [
        "AI-driven planning and real-time expense tracking were near-universal across all five personas. The divergence showed up in what people wanted to see first.",
        "“I don’t need another chart of what I spent. I need to know what’s about to go wrong.” Lisa Robinson ranked predictive analytics above everything else. Michael Chen flipped that: the health dashboard first, with predictive tools as supporting context. Same product, two opening moves.",
        "Rather than choose one, the home screen became a stack: the single number that answers today’s question, then one Money Map step, then the forecast, with the coach in a rail beside them.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-moves.webp`,
          alt: "One app, two opening moves. Risk first, Look ahead, quoting Lisa Robinson: opens on the next 30 days of checking balance, a heads-up that rent and car insurance land the same week with a suggestion to move $600, and $504 safe to spend. Standing first, Know where you stand, for Michael Chen: opens on a financial health score of 57 with four pillars, net worth of $168,508, and an emergency fund measured as 2.4 months covered. Same plan, same data, same coach. What it decided: home is a stack, not a dashboard. Hero is safe to spend; next is one Money Map step with one action; then the forecast and recent activity with the coach in a rail.",
          width: 2400,
          height: 1379,
        },
      ],
    },
    {
      title: "Secondary Research",
      paragraphs: [
        "A coach is only as good as the math under it, so the rebuild started from published guidance rather than intuition. Every default lives in one ASSUMPTIONS object, so it can be tuned and cited in one place, and every card the coach shows carries a “Why?” with its source.",
        "The research also set the scope. A rule count is the wrong measure of a useful coach: past roughly 50 to 60 well-built rules you mostly get overlap, contradiction and noise, and a typical person triggers 10 to 15. Studies of savings nudges point the same way: personal, goal-specific reminders work about twice as well as generic ones.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/research-rules.webp`,
          alt: "Every threshold has a source. Starter emergency fund $1,000, floor $500 and $10 a week to start, from the CFPB and the Fed SHED 2025, where 37% couldn't cover $400. Full emergency fund 3 or 6 months, 6 if income varies. Employer match always, right after the starter cushion. High-interest debt at or above 8% APR, from Fed G.19 card APRs near 22%. Retirement 15% of gross including match, from Fidelity. Budget 50/30/20 adapted, from Warren and Tyagi. Debt method: show both, snowball if it costs under $150 more, from Gal and McShane, Kellogg 2012. Raise savings 1% a year, from Save More Tomorrow. Credit utilization under 30%, from FICO. Scope decision: about 60 rules, not 300 — 9 engines, 61 rules, 1 governor. Guardrails: coach not advisor; personal beats generic; celebrate progress.",
          width: 2400,
          height: 1304,
        },
      ],
    },
    {
      title: "Information Architecture",
      paragraphs: [
        "The 2024 concept spread eight capability areas across separate sections. The rebuild folds them into five destinations ordered by time: today, this month, the plan, the future, and guidance. The coach isn’t a place you visit; its top cards, the health score and “Why?” travel with you.",
        "One layout serves three shells. Phones get bottom tabs and a floating Add button; tablets an icon rail; desktops a sidebar, the content, and a coach rail on the right.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-ia.webp`,
          alt: "Information architecture: five places, one coach beside all of them. Home (today): safe to spend, next Money Map step, 30-day forecast, coming up, recent. Budget (this month): left to spend, needs, wants and saved against 50/30/20, categories, transactions. Money Map (the plan): eight ordered steps with why, this month's money, employer match calculator. Goals and debt (the future): emergency fund, goals and new goal, debt payoff plan, avalanche versus snowball. Coach (guidance): health score with four pillars, nudge level, for you now or all, eight lessons. Everywhere: Sprout's top cards, health score, add transaction, Why on every card, settings. Three shells: phone with bottom tabs and a floating add button, tablet with an icon rail, desktop with a sidebar, content and coach rail.",
          width: 2400,
          height: 1656,
        },
      ],
    },
    {
      title: "User Flows",
      paragraphs: [
        "Two workflows carry the product: getting to a plan, and acting on the coach. The Money Map connects them.",
        "Onboarding. Most finance apps lose people at account linking. Aureum asks one question per screen, takes best guesses, needs no bank login and keeps answers on the device. Each answer feeds a specific engine, so about two minutes later there is a real plan, not an empty dashboard.",
        "The coach loop. This is the core workflow, and the one on the home page showreel. The engines notice something worth money, a rule decides it’s worth saying, the governor decides it’s worth saying now, and one tap later the plan has moved. For the demo persona: $1,240 a year of unclaimed employer match, claimed by dragging one slider.",
        "The Money Map. Every suggestion hangs off one ordered list of where the next dollar goes, mirroring the widely used financial order of operations. It skips steps that don’t apply and highlights exactly one.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: `${DIR}/flow-onboarding.webp`,
          alt: "Onboarding user flow: nine questions, then value before commitment. Each question is one screen and sets part of the profile that feeds an engine. Name sets voice. Take-home pay and frequency set income for the budget, forecast and paydays. Stability and dependents set fund size, 3 or 6 months. Essentials set needs for the 50/30/20 allocator. Balances set the starting point for the starter cushion. Debt sets balances, APR and minimums for avalanche or snowball and steps 4 and 7. Retirement match sets free money for step 3. A dream sets the first goal for step 8. Nudges set the governor caps. Then 2.6 seconds of building, landing on “Here's your Money Map, Maya,” then home with a safe-to-spend number.",
          width: 2400,
          height: 1113,
        },
        {
          afterParagraphIndex: 2,
          src: `${DIR}/flow-coach.webp`,
          alt: "The coach loop, in three lanes: the person, the app and the coach. Notice: engines find a 2% match gap on $62K gross and rule P1-match fires as a suggestion worth $1,240 a year. Choose: the governor ranks it by severity, dollar impact and Money Map step, one card per topic, capped by nudge level. Tell: David reads the card “You're leaving $1,240 a year of free money on the table” on Home and Coach. Explain: he taps Why and sees the rationale and source. Act: Show me how opens the match calculator and he drags his contribution from 2% to 4%. Progress: he confirms, sees Full match unlocked with confetti, step 3 checks off, the health score rises, and the rule goes quiet.",
          width: 2400,
          height: 1109,
        },
        {
          afterParagraphIndex: 3,
          src: `${DIR}/diagram-money-map.webp`,
          alt: "The Money Map: one ordered list of where the next dollar goes. 1, cover the essentials (done). 2, save a $1,000 starter cushion (you are here). 3, get your full employer match. 4, pay off high-interest debt at 8% APR or more. 5, grow your fund to 3 to 6 months. 6, save 15% for retirement. 7, knock out moderate-interest debt between 4% and 8%. 8, fund your goals. Each step cites its basis. This month's money for David: $4,100 take-home, $2,608 essentials and minimums, $472 wants, $1,020 left for the plan, split $350 to the starter fund, $335 extra on high-interest debt and $335 to visiting family in June. Steps that don't apply are skipped, and rules tied to the active step get a priority boost.",
          width: 2400,
          height: 1434,
        },
      ],
    },
    {
      title: "How It Works",
      paragraphs: [
        "Three layers keep the coach honest. Engines are pure functions: state in, numbers out. Rules never do math; they read engine output and decide whether something is worth saying, with one action, a dollar impact, a reason and a source. The governor decides how much gets said at all. Every screen reads from the same pass, and the app shares tokens, charts and illustrations with the homepage and design system.",
        "The governor is where restraint is designed in. Urgent items come first, then the biggest dollar impact, with a boost for the step you’re working on. Only one card per topic is shown, the person chooses how chatty Sprout is, and anything dismissed stays quiet for a while.",
        "The health score answers “am I okay?” with four parts modeled on the CFPB’s Financial Well-Being elements, and says plainly that it is not the official scale.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: `${DIR}/diagram-system.webp`,
          alt: "System architecture: math, then rules, then restraint. Inputs: nine onboarding answers or the demo seed, transactions and bills, goals and settings, stored in localStorage as a stand-in for a backend. Layer 1, engine.js: nine engines — budget allocator, emergency-fund ladder, employer match gap, Money Map waterfall, monthly allocation, goal math, debt simulator, 30-day forecast and safe-to-spend, health score — with every threshold in one ASSUMPTIONS object. Layer 2, rules.js: 61 rules, 45 hand-written and 16 generated per category: safety 7, Money Map 11, spending 28, debt and credit 6, goals 7, milestones 3, learn 1. Layer 3, the governor: rank by severity, dollar impact and Money Map step; one card per topic; cap by nudge level; respect cooldowns and snoozes. Surfaces: Home, Plan, Goals and debt, Coach, and shared tokens, charts and art.",
          width: 2400,
          height: 1158,
        },
        {
          afterParagraphIndex: 1,
          src: `${DIR}/diagram-governor.webp`,
          alt: "How Sprout decides: few, timely, relevant. For the demo persona, 61 rules in the catalog, 15 fire, 15 are not dismissed or snoozed, 13 distinct topics remain at one card each, and 4 are shown under the Balanced caps. Priority is a severity base (urgent 1000, celebrate 600, suggest 300, learn 100) plus up to 250 for dollar impact on a log scale plus up to 200 for the active Money Map step. Caps by nudge level: Gentle 1 urgent, 1 suggestion, 1 celebration, 0 lessons; Balanced 2, 3, 1, 1; Proactive 3, 6, 2, 2. Then the person acts, snoozes with Later, dismisses with a per-rule cooldown, or asks Why.",
          width: 2400,
          height: 1389,
        },
        {
          afterParagraphIndex: 2,
          src: `${DIR}/diagram-health.webp`,
          alt: "Health score: one number, four honest parts. David scores 57, grade C. In control 92: projected spend versus budget plus essentials fitting inside income. Shock-ready 8: months of essentials saved over the target months. On track 70: savings rate over 20% plus employer match captured. Free to choose 57: high-interest debt versus income, utilization and debt-to-income. Shock-ready is the weak pillar, which is why the starter cushion is the active step; claiming the match moves On track from 70 to 100.",
          width: 2400,
          height: 1017,
        },
      ],
      stats: [
        { value: "9", label: "Questions to a plan", detail: "One per screen, no bank login, about two minutes." },
        { value: "8", label: "Money Map steps", detail: "Ordered, sourced, and only the ones that apply." },
        { value: "61", label: "Coach rules", detail: "Each with an action, a dollar impact and a “Why?”." },
        { value: "4", label: "Cards on screen", detail: "Out of 15 that fire for the demo persona." },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The prototype runs in the browser with no build step and no backend; state lives on the device. Home answers today’s question first, the Money Map shows the plan, and Sprout’s cards sit beside every screen with one action and a reason.",
      ],
      productShowcase: {
        slides: [
          screen("app-home", "Home", "Safe to spend first, then one next step, then the next 30 days.", "Aureum Home for David: $504 safe to spend until October 15, about $45 a day; step 2 of 8, save a $1,000 starter cushion at $650; a 30-day checking forecast; and a health score of 57 above Sprout's suggestions."),
          screen("app-plan", "Money Map", "Eight ordered steps, one highlighted, each with its why.", "Your Money Map: cover the essentials done; save a $1,000 starter cushion highlighted with its rationale and an Add to my fund button; get your full employer match and pay off high-interest debt up next."),
          screen("app-plan-match", "Employer match calculator", "Where the coach loop lands: one slider, $1,240 a year.", "This month's money split across the starter fund, high-interest debt and a family trip, above the employer match calculator: contribute 2%, employer adds $1,240 a year, still unclaimed."),
          screen("app-coach", "Coach", "Health score in four pillars, nudge level, and the cards worth your time.", "Coach: financial health 57 with four pillar bars, a Gentle, Balanced or Proactive nudge setting, and four suggestions for you now out of fifteen."),
          screen("app-why", "Why?", "Every card explains itself and cites its source.", "A coach card expanded to show why: an employer match is an instant 50 to 100% return, with its source."),
          screen("app-budget", "Budget", "Left to spend, needs, wants and saved against 50/30/20.", "October budget: $1,509 left to spend this month, needs, wants and saved bars against the 50/30/20 guideline, and category budgets."),
          screen("app-debt", "Debt payoff plan", "Avalanche or snowball, with the cost difference spelled out.", "Debt payoff plan: debt-free by December 2029, $2,296 total interest, an extra $340 a month, and the avalanche versus snowball choice."),
          screen("app-goals", "Goals", "Your safety net first, then the fun stuff.", "Goals: the emergency fund at 65% of the starter cushion, a family trip goal marked behind, and the debt payoff plan."),
          screen("app-dark", "Dark mode", "The same home, swapped through tokens.", "Aureum Home in dark mode: the teal safe-to-spend card and mint next-step card on a deep navy surface."),
        ],
        accordion: [
          {
            value: "onboarding",
            title: "Onboarding",
            description: "Nine questions, one per screen, to a real plan.",
            defaultOpen: true,
            slides: [
              screen("ob-strip-1", "Welcome, name, pay, stability", "No bank login to start; answers stay on the device.", "Four phone screens: Sprout's welcome, what should I call you, monthly take-home pay of $3,600 paid every two weeks, and income that varies."),
              screen("ob-strip-2", "Essentials, debt, match, a dream", "Best guesses are fine; each answer feeds an engine.", "Four phone screens: must-have costs, a $3,200 credit card at 23.9% APR, an employer match up to 5% with 3% contributed, and a trip as the first goal."),
              screen("ob-strip-3", "Nudges, building, the plan", "Two minutes later: “Here’s your Money Map, Maya.”", "Three phone screens: choosing a Balanced nudge level, building your Money Map, and the new plan with one step already done."),
            ],
          },
          {
            value: "phone",
            title: "On a phone",
            description: "Bottom tabs, a floating Add button, the same plan.",
            slides: [
              screen("phone-strip-1", "Home, Money Map, Budget", "The coach lives inside Home and its own tab.", "Three phone screens: Home with $504 safe to spend and a suggestion card, the Money Map, and the October budget."),
              screen("phone-strip-2", "Goals, Debt, Coach", "Bottom tabs and one floating Add.", "Three phone screens: Goals, the debt payoff plan, and the Coach with the health gauge."),
            ],
          },
          {
            value: "site",
            title: "Marketing site",
            description: "“Money, mentored.” The research, told as a product story.",
            slides: [
              screen("site-hero", "Money, mentored", "A heads-up before small problems become big ones.", "Homepage hero on teal: Money, mentored, beside a phone showing a heads-up nudge and a down payment goal."),
              screen("site-moves", "Two ways to open it", "The test finding, made interactive.", "One app, two ways to open it: Look ahead and Know where you stand, with a 30-day forecast and a suggested $600 transfer."),
              screen("site-features", "Six tools, one picture", "Budgeting, tracking, savings, debt, learning, community.", "Features bento: a budget that adjusts as your month does, every transaction sorted, goals that fund themselves."),
              screen("site-legible", "Finally legible", "Charts that answer “am I okay?”", "Insights on navy: money in, money out, saved and savings rate tiles above cash flow and net worth charts."),
              screen("site-simulate", "Goal simulator", "A range, not a promise.", "Goal simulator: a $60,000 down payment at $1,850 a month and 4% APY, reached by November 2027."),
              screen("site-security", "Your data works for you", "The biggest friction in research, answered simply.", "Privacy and security: read-only by design, encrypted end to end, and we don't sell your data."),
            ],
          },
        ],
      },
    },
    {
      title: "Design System",
      paragraphs: [
        "The brand direction from 2024 (friendly, sophisticated, bold) carried forward: teal #008080 as the brand surface, indigo #1B1B6F as the ink, Lora for voice and the twin-tree mark. The rebuild turned the old brand board into a living system that the homepage and the app both run on.",
        "Two parts do most of the work. Data color is validated, not eyeballed: eight categorical hues in a fixed order that stays distinct for color-blind readers, separately tuned for light and dark. And the illustration system is rationed: Sprout and friends say specific things, at three sizes, one per screen, never beside bad news.",
      ],
      productShowcase: {
        slides: [
          screen("ds-00-cover", "Money, made legible", "Foundations, components, illustration and data viz in one living document.", "Design system cover on teal: Money, made legible, with Sprout in a wizard hat and the principles friendly, sophisticated, bold, supportive never prescriptive, and celebrate progress."),
          screen("ds-01-brand", "The twin-tree mark", "One established tree, one growing, reading as “Aa”.", "Brand: the twin-tree Aureum mark on teal, white and indigo, with clear space, voice and wordmark rules."),
          screen("ds-02-color", "Teal leads, indigo grounds", "Primitive scales mapped to semantic roles, so dark mode is a token swap.", "Color: full teal, indigo and neutral scales with the brand values marked."),
          screen("ds-03-data-color", "Validated data color", "Eight hues in a fixed order, checked for color-blind readers.", "Data color: eight categorical hues from teal to plum, validation results, a sequential teal ramp and a diverging teal to coral ramp."),
          screen("ds-04-type", "Two typefaces, two jobs", "Lora for warmth; Plus Jakarta Sans for every figure.", "Typography: Lora Aa and a $1,284 figure in Plus Jakarta Sans, with the display line Grow with guidance."),
          screen("ds-05-type-scale", "Fluid type scale", "Sizes scale between 360 and 1280 pixels.", "Type scale from display to caption: Grow with guidance, Good morning Emily, Your month at a glance, and a $168,508.51 figure."),
          screen("ds-06-tokens", "Space, shape, depth", "A 4px grid, soft corners and one signature lift shadow.", "Spacing scale, radius tokens from 4 to pill, and elevation levels including the lift shadow."),
          screen("ds-07-motion", "Calm by default", "Springy overshoot is saved for progress.", "Motion: ease-out, ease-in-out and spring curves with a play button, and duration tokens from 120 to 1600 milliseconds."),
          screen("ds-08-icons", "Rounded line icons", "A 24px grid, 2px stroke, round caps.", "Icon set: forty rounded line icons on a 24px grid."),
          screen("ds-09-illustration", "Meet Sprout, and friends", "Native vector art with gentle idle loops.", "Illustration mascots: Sprout the coach, Sprout in a wizard hat for setup, Penny for small wins, an owl for lessons, and an umbrella for the rainy-day fund."),
          screen("ds-10-people", "A parametric cast", "People scenes and concept spots that rotate across a flow.", "People scenes for milestones, on the move, family and home, peace of mind and learning, above concept spots for savings, investing, insights, privacy and goals."),
          screen("ds-11-art-rules", "Rationed on purpose", "Three sizes, one per screen, never beside bad news.", "Illustration placement rules: hero, spot and inline sizes, do one per screen with air, don't crowd or stack, and written rules."),
          screen("ds-12-components", "UI components", "48px touch targets, pill buttons, chips and controls.", "UI components: buttons, form controls, chips, segmented controls and progress steps."),
          screen("ds-13-components-2", "Alerts, stats, transactions", "The pieces the coach and charts are made of.", "Alerts, stat tiles and a transactions table."),
          screen("ds-14-coach", "Coach patterns", "What we noticed, why it matters, one easy action.", "Coach patterns: heads-up and milestone nudge cards beside a phone mock of the home screen."),
          screen("ds-15-dataviz", "Charts that answer “am I okay?”", "Every chart has tooltips, keyboard support and a table view.", "Data visualization: an area chart of net worth and a multi-line category trend."),
          screen("ds-16-dataviz-2", "Columns, cash flow, donut", "Diverging columns for money in and out.", "Charts: emphasis columns, diverging cash-flow columns and a donut of where it went."),
          screen("ds-17-dataviz-3", "Gauges, meters, heatmap", "Budget meters and a spending-rhythm calendar.", "Charts: an 87 health gauge, budget meters by category and a calendar heatmap of daily spending."),
          screen("ds-18-rules", "Rules every chart follows", "Form first, color last.", "Chart rules: do choose the form first and color last; don't use dual y-axes or a ninth hue."),
          screen("ds-19-dark", "Dark theme", "Separately tuned and validated on its own surface.", "The data visualization section of the design system in dark mode."),
        ],
        accordion: [
          {
            value: "v1",
            title: "Where it started: the 2024 brand board",
            description: "The logo, component and illustration boards the system grew from.",
            slides: [
              screen("v1-brand", "Logo and brand, 2024", "Teal, indigo, Lora and the tree mark.", "The 2024 Aureum logo and brand guidelines."),
              screen("v1-components", "Components, 2024", "The first component library.", "The 2024 Aureum UI component library."),
              screen("v1-illustration", "Illustration, 2024", "The first illustration assets, before the native SVG redraw.", "The 2024 Aureum illustration asset library."),
            ],
          },
        ],
      },
    },
  ],
};
