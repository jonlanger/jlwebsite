import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "collabfin",
  category: "software",
  title: "Collabfin",
  description:
    "Collaborative money planning on an endless canvas. Income, bills, accounts and goals become linked cards, and every total updates live for everyone on the board.",
  image: "/projects/collabfin/collabfin_card.webp",
  alt: "Collabfin board: Paychecks and Bills cards linked into a Joint checking account projecting $26,690 in 12 months, a Save 30% split feeding an Emergency fund goal dated Feb 2028, and a totals bar showing $2,177 left over each month.",
  width: 1280,
  height: 720,
  liveUrl: "https://collabfinance.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Couples and roommates share money but rarely share the plan. It lives in one person’s spreadsheet, and bank apps only show what already happened.",
      "Collabfin puts the plan on a canvas. Each piece of money is a card. You link cards to show where the money goes, and balances, goal dates and payoff dates update as you edit, for everyone on the board.",
    ],
    role: "Product Design, UX Research, Interaction Design, Design System, Front-end Build, Data Modeling",
    scope:
      "Web app: landing, boards, the canvas with ten card kinds, checks, templates, bank statement import, what-if plans and comparison, history, sharing and accessibility settings.",
  },
  sections: [
    {
      title: "Research",
      paragraphs: [
        "Three people kept coming up. The planner who owns the spreadsheet, the partner who wants to change one number without breaking it, and the solo planner juggling taxes and debt in separate calculators.",
        "Their paths shared a low point: the moment the numbers stop adding up and nobody knows why. The product is designed around that moment.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/collabfin/diagram-personas.webp",
          alt: "Three proto-personas. Priya, the household planner, wants one plan both partners trust and uses templates, links, plans and invites. Sam, the partner who checks in, wants to see what a change does and uses live cursors, the totals bar, history and undo. Jordan, planning solo, wants real take-home pay and a debt-free date and uses the Taxes and Debt cards, statement import and checks.",
          width: 2400,
          height: 1311,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/collabfin/diagram-journey.webp",
          alt: "User journey in six stages: Start from a template or bank CSV, Build by linking cards, Check when numbers stop adding up, Share with an invite link, What if with a copied plan, and Decide on a plan both trust. The emotion curve dips at Check and peaks at Decide.",
          width: 2400,
          height: 1130,
        },
      ],
      topicGroups: [
        {
          title: "Findings",
          items: [
            {
              title: "Money is a flow, not a list",
              body: "People describe their budget as paycheck in, bills out, the rest to savings. A canvas of linked cards matches that picture.",
            },
            {
              title: "Trust comes from visibility",
              body: "A partner accepts a number when they can see who changed it and undo it.",
            },
            {
              title: "Mistakes need a teacher",
              body: "An error flag alone isn’t enough. Each check explains the practice behind it and offers a fix.",
            },
          ],
        },
      ],
    },
    {
      title: "How it works",
      paragraphs: [
        "Every card has its own monthly flow. A link passes it on, a Split card takes a percentage, and one engine turns the board into totals, projections and checks. Change the rent and every number downstream moves.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/collabfin/diagram-flow.webp",
          alt: "Money-flow model. Paychecks at +$5,633 a month and Bills at −$3,456 flow into Joint checking, leaving +$2,177. A Save 30% split passes +$653 to the Emergency fund, reached in Feb 2028. Four steps: normalize to monthly, propagate along links, project balances and dates, and check for problems.",
          width: 2400,
          height: 1047,
        },
      ],
      stats: [
        { value: "10", label: "Card kinds", detail: "Income, accounts, bills, spending, debt, taxes, splits, goals, notes, files." },
        { value: "51", label: "Tax jurisdictions", detail: "2026 federal brackets plus 50 states and DC." },
        { value: "6", label: "Templates", detail: "Household, 50/30/20, freelancer, roommates, debt, salary." },
      ],
    },
    {
      title: "Architecture",
      paragraphs: [
        "The money math is a framework-free TypeScript engine with unit tests. The board talks to one Store interface with two implementations: Supabase for shared boards, or the browser alone. The public demo runs the browser-only store, so it needs no sign-up.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/collabfin/diagram-architecture.webp",
          alt: "Architecture. A Next.js 16 app with pages and the board canvas calls a pure TypeScript engine for flows, projections, tax, checks and CSV import. The board reads and writes through a Store interface: CloudStore on Supabase (Postgres with row-level security, Realtime row changes and presence, file storage) or LocalStore in the browser. Bank statements are parsed in the browser and never uploaded.",
          width: 2400,
          height: 1212,
        },
      ],
      topicGroups: [
        {
          title: "Design principles",
          items: [
            {
              title: "Numbers never hide",
              body: "Every link shows what it carries, and the totals bar is always on screen.",
            },
            {
              title: "Color never carries meaning alone",
              body: "Gains and losses always get a sign and an arrow. Each person picks contrast, text size and motion for themselves.",
            },
            {
              title: "Access in the database",
              body: "Owner, editor and viewer roles are enforced by row-level security, not just the UI.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: ["The landing page explains each feature with a worked example. Every screen below is from the live app."],
      productShowcase: {
        slides: [
          {
            src: "/projects/collabfin/landing.webp",
            alt: "Landing hero: Plan your money together, on one canvas, beside an illustrated board where Priya is editing Bills and Sam is on Joint checking.",
            width: 1800,
            height: 1125,
            title: "The premise",
            caption: "Your money on one canvas, planned together.",
          },
          {
            src: "/projects/collabfin/board.webp",
            alt: "The Household budget board: income, bills and spending linked into Joint checking, a 30% split to the emergency fund, and a sticky note.",
            width: 1800,
            height: 1125,
            title: "The board",
            caption: "Every link shows what it carries.",
          },
          {
            src: "/projects/collabfin/checks.webp",
            alt: "Checks panel: You’re saving 12% of income into goals. Your target is 20%.",
            width: 1800,
            height: 1125,
            title: "Checks",
            caption: "Problems and best practice, as you edit.",
          },
          {
            src: "/projects/collabfin/import-results.webp",
            alt: "Import a statement: 83 transactions over three months, a biweekly payroll and six recurring payments found, each with a checkbox.",
            width: 1800,
            height: 1125,
            title: "Statement import",
            caption: "Pay, bills and spending found from a CSV.",
          },
          {
            src: "/projects/collabfin/compare.webp",
            alt: "Compare plans: Current plan against What if we move?, showing $725 less left over each month and the emergency fund eight months later.",
            width: 1800,
            height: 1125,
            title: "What if?",
            caption: "Copy the plan, change the rent, compare.",
          },
          {
            src: "/projects/collabfin/history.webp",
            alt: "History panel listing who edited the Bills card and who created the What if we move? plan.",
            width: 1800,
            height: 1125,
            title: "History",
            caption: "Who changed what, with undo for your own edits.",
          },
          {
            src: "/projects/collabfin/light.webp",
            alt: "The same board in the light theme.",
            width: 1800,
            height: 1125,
            title: "Light theme",
            caption: "Both themes fully specified.",
          },
          {
            src: "/projects/collabfin/mobile.webp",
            alt: "Three phone screens: the landing hero, the board with an Add card button, and the Checks sheet.",
            width: 1844,
            height: 1280,
            title: "On a phone",
            caption: "Panels become bottom sheets.",
          },
        ],
        accordion: [
          {
            value: "landing",
            title: "Landing",
            description: "Each feature with a worked example.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/collabfin/landing-steps.webp",
                alt: "Three steps from a messy month to a clear plan: add cards, link them, see what happens.",
                width: 1800,
                height: 1125,
                title: "Three steps",
                caption: "Add cards, link them, see what happens.",
              },
              {
                src: "/projects/collabfin/landing-tax.webp",
                alt: "Know your real take-home pay: $110,000 in Colorado becomes $6,301 a month.",
                width: 1800,
                height: 1125,
                title: "Taxes built in",
                caption: "Salary to monthly take-home.",
              },
              {
                src: "/projects/collabfin/landing-checks.webp",
                alt: "Catch mistakes before they cost you: splits adding up to 110%, a buffer dip, and a one-click fix.",
                width: 1800,
                height: 1125,
                title: "Checks",
                caption: "Many problems come with a fix.",
              },
              {
                src: "/projects/collabfin/landing-live.webp",
                alt: "Plan with the people you share money with: live cursors, who is editing and a change log.",
                width: 1800,
                height: 1125,
                title: "Live together",
                caption: "Cursors, editing badges and history.",
              },
              {
                src: "/projects/collabfin/landing-a11y.webp",
                alt: "Comfortable to use, whoever you are: text size, high contrast, color-blind-safe colors and reduced motion.",
                width: 1800,
                height: 1125,
                title: "Made for everyone",
                caption: "Settings chosen per person.",
              },
            ],
          },
          {
            value: "board",
            title: "Building a plan",
            description: "From a template or a statement to a linked board.",
            slides: [
              {
                src: "/projects/collabfin/templates.webp",
                alt: "Templates panel with Household budget, Salary, savings and investing, and Debt payoff plan.",
                width: 1800,
                height: 1125,
                title: "Templates",
                caption: "Six starting points, added to the board.",
              },
              {
                src: "/projects/collabfin/import-columns.webp",
                alt: "Statement import column mapping for date, description and amount, with a preview of rows.",
                width: 1800,
                height: 1125,
                title: "Map the columns",
                caption: "Columns guessed, then confirmed.",
              },
              {
                src: "/projects/collabfin/whatif.webp",
                alt: "What if we move? plan with rent raised to $2,575 and a check toast: fixed bills take 60% of income, above your 50% limit.",
                width: 1800,
                height: 1125,
                title: "A check in context",
                caption: "Raise the rent and the bills limit flags it.",
              },
            ],
          },
          {
            value: "settings",
            title: "Settings and accessibility",
            description: "Board rules for everyone, display for you.",
            slides: [
              {
                src: "/projects/collabfin/settings.webp",
                alt: "Settings panel: currency, projection length, home state, filing status, savings target, bills limit, cash buffer and yearly price increase.",
                width: 1800,
                height: 1125,
                title: "Board rules",
                caption: "The thresholds behind every check.",
              },
              {
                src: "/projects/collabfin/settings-a11y.webp",
                alt: "Accessibility settings: theme, text size, high contrast, color-blind-safe colors, reduced motion, extra spacing, stronger focus and keyboard shortcuts.",
                width: 1800,
                height: 1125,
                title: "Accessibility",
                caption: "Personal settings plus a full shortcut list.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Collabfin turns a shared budget into something people can edit together without breaking it. Anyone can see where each dollar goes, try a what-if safely, and see who changed what. It’s live and works without an account.",
      ],
      stats: [
        { value: "5 min", label: "To a first plan", detail: "From a template, or one from a bank CSV." },
        { value: "3", label: "Roles", detail: "Owner, editor and viewer, checked by the database." },
        { value: "0", label: "Transactions uploaded", detail: "Statements are parsed in the browser." },
        { value: "1 key", label: "To undo", detail: "Your own edits, never someone else’s." },
      ],
    },
  ],
};
