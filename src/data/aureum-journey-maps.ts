import type { JourneyMapColumn } from "@/data/past-projects";

/**
 * Aureum journey maps (2024 research), transposed so the eight capability
 * stages run down the rows: eight stages do not fit across the case-study
 * column, but five aspects do.
 */
const STAGES = [
  "Account setup",
  "Financial planning",
  "Expense tracking",
  "Savings",
  "Investing",
  "Debt",
  "Education",
  "Community",
] as const;

/** Opportunities were the same for every persona; the maps differ elsewhere. */
const OPPORTUNITIES = [
  "A seamless, user-friendly setup experience.",
  "Clear, actionable steps for financial planning.",
  "More accurate, efficient expense tracking.",
  "Flexibility and adaptability in savings plans.",
  "Timely, relevant investment guidance.",
  "Comprehensive debt management.",
  "Continuous learning and improvement.",
  "A supportive, engaging community.",
];

const persona = (
  actions: readonly string[],
  feelings: readonly string[],
  edgeCases: readonly string[],
  nudges: readonly string[]
): readonly JourneyMapColumn[] => [
  { header: "Stage", rows: STAGES },
  { header: "Actions", rows: actions },
  { header: "Emotional state", rows: feelings },
  { header: "Edge cases", rows: edgeCases },
  { header: "AI nudges", rows: nudges },
  { header: "Opportunity", rows: OPPORTUNITIES },
];

/** Emily Johnson, marketing specialist: saving for a home down payment. */
export const AUREUM_EMILY_JOURNEY_COLUMNS = persona(
  [
    "Signs up, enters personal information, completes the onboarding survey and connects her LinkedIn profile.",
    "Creates a budget, sets goals for a house down payment and an emergency fund, and receives AI recommendations.",
    "Connects bank accounts and credit cards; expenses are categorized automatically and she tags specific purchases.",
    "Sets savings goals, schedules automated transfers and tracks progress on the savings dashboard.",
    "Receives tailored investment advice, allocates funds across suggested portfolios and monitors performance.",
    "Views a debt overview, creates a repayment plan with AI, then tracks payments and adjusts the plan.",
    "Works through marketing-specific finance modules, quizzes and interactive tutorials.",
    "Joins a marketing professionals group, attends webinars on financial health and networking events.",
  ],
  [
    "Hopeful about improving her finances, curious, slightly apprehensive.",
    "Motivated by clear goals, empowered by personalized advice, confident in the process.",
    "Relieved to have automated tracking; engaged in reviewing expenses and curious about patterns.",
    "Optimistic about reaching her goals, determined to stick to the plan, encouraged by progress.",
    "Reassured by expert advice, excited about opportunities, confident in her financial future.",
    "Supported by an AI-generated plan, focused on reducing debt, hopeful about becoming debt-free.",
    "Interested in expanding her knowledge, engaged by interactive learning, eager to improve.",
    "Supported by a professional community, encouraged by success stories, connected to peers and mentors.",
  ],
  [
    "Difficulty entering data; concerns about data privacy.",
    "Overwhelmed by the initial setup; unclear how to prioritize goals.",
    "Transactions categorized incorrectly, or missed entirely.",
    "Inconsistent income and unexpected expenses knock the savings plan off course.",
    "Market volatility; investment terms are hard to understand.",
    "Unexpected changes in debt terms; hard to keep track of multiple payments.",
    "Misunderstood content; tutorials hard to access.",
    "Negative interactions; content that isn’t relevant.",
  ],
  [
    "Assist with data input; give clear privacy assurances.",
    "Simplify the initial setup; offer tips for prioritizing goals.",
    "Correct categorization errors; alert her to missing transactions.",
    "Suggest adjustments when income changes; encourage consistent contributions.",
    "Market updates and plain-language explanations of investment terms.",
    "Remind her of upcoming payments; suggest adjustments to the repayment plan.",
    "Simplify explanations; offer content in accessible formats.",
    "Highlight positive interactions; recommend relevant content and events.",
  ]
);

/** Michael Chen, software engineer: many accounts, two children, a tech-heavy portfolio. */
export const AUREUM_MICHAEL_JOURNEY_COLUMNS = persona(
  [
    "Signs up, enters personal and financial information, completes onboarding and imports data from other tools.",
    "Builds a budget for retirement and his children’s education, sets long-term goals, receives AI recommendations.",
    "Connects financial accounts; mixes automated and manual entry, split into personal and family expenses.",
    "Sets up 529 plans for his children, automates monthly contributions and tracks progress.",
    "Receives personalized investment advice, monitors a tech stock portfolio and adjusts based on AI insights.",
    "Views a debt overview, creates AI-driven repayment plans, tracks payments and adjusts strategy.",
    "Uses technology-focused finance modules, advanced quizzes and investment tutorials.",
    "Joins a tech professionals group, attends investment-strategy webinars and community meetups.",
  ],
  [
    "Confident in tech-driven solutions, curious about AI, slightly apprehensive.",
    "Motivated to secure his family’s future, empowered by data-driven advice, confident in his goals.",
    "Relieved by automated tracking; engaged in detailed reports and curious about patterns.",
    "Optimistic about future savings, determined to contribute regularly, encouraged by progress.",
    "Reassured by data-driven advice, excited about tech investments, confident in performance.",
    "Supported by comprehensive plans, focused on reducing debt, hopeful about becoming debt-free.",
    "Interested in advanced concepts, engaged by technology-focused content, eager to optimize.",
    "Supported by a tech community, encouraged by peer success, connected to industry experts.",
  ],
  [
    "Integrating data from many sources is hard; worried about data security.",
    "Overwhelmed by data-driven recommendations; unclear how to prioritize long-term goals.",
    "Family expenses miscategorized; transactions missed because of complexity.",
    "Bonus-based income is inconsistent; unexpected expenses hit the savings plan.",
    "Volatility in tech stocks; advanced investment terms are hard to follow.",
    "Unexpected changes in debt terms; multiple loan payments to manage.",
    "Advanced content misunderstood; tutorials hard to access.",
    "Negative interactions; webinars that aren’t relevant.",
  ],
  [
    "Help integrate data; give data-security assurances.",
    "Simplify recommendations; offer tips for prioritizing long-term goals.",
    "Correct categorization errors; flag transactions missed through complexity.",
    "Suggest adjustments when income changes; encourage regular contributions.",
    "Market updates and plain explanations of advanced terms.",
    "Remind him of upcoming payments; suggest adjustments to the repayment plan.",
    "Simplify advanced concepts; offer accessible formats.",
    "Highlight positive interactions; recommend relevant webinars and meetups.",
  ]
);

/** Sarah Martinez, small business owner: business and personal money mixed together. */
export const AUREUM_SARAH_JOURNEY_COLUMNS = persona(
  [
    "Signs up, enters personal and business information, completes onboarding and connects business accounts.",
    "Budgets for business and personal finances, sets goals for growth and retirement, receives AI recommendations.",
    "Connects business and personal accounts, mixes automated and manual entry, categorizes business expenses.",
    "Sets savings goals for business expansion and her own retirement, automates savings, tracks progress.",
    "Receives personalized business and personal investment advice, monitors the portfolio and adjusts on AI insights.",
    "Views business loans and personal debts together, creates AI-driven repayment plans, tracks payments.",
    "Works through business-focused finance modules, quizzes on business finance and interactive tutorials.",
    "Joins a small business owners group, attends business-finance webinars and networking events.",
  ],
  [
    "Hopeful about better financial management, curious about AI, slightly apprehensive.",
    "Motivated to reach business and personal goals, empowered by personalized advice, confident in the process.",
    "Relieved by automated tracking; engaged in reviewing business expenses and curious about patterns.",
    "Optimistic about savings, determined to grow the business and secure her retirement, encouraged by progress.",
    "Reassured by tailored advice, excited about growth opportunities, confident in her financial future.",
    "Supported by comprehensive plans, focused on managing both kinds of debt, hopeful about becoming debt-free.",
    "Interested in business and personal finance, engaged by interactive learning, eager to improve.",
    "Supported by a business community, encouraged by success stories, connected to peers and mentors.",
  ],
  [
    "Hard to integrate business and personal data; concerns about privacy.",
    "Overwhelmed by setting up business and personal goals; unclear which comes first.",
    "Business expenses miscategorized; transactions missed because of complexity.",
    "Inconsistent business income and unexpected expenses hit the savings plan.",
    "Volatility in business investments; business investment terms are hard to understand.",
    "Unexpected changes in business debt terms; multiple loan payments to manage.",
    "Business finance content misunderstood; tutorials hard to access.",
    "Negative interactions; content that isn’t relevant.",
  ],
  [
    "Help integrate data; give data-privacy assurances.",
    "Simplify setup for business and personal goals; tips for prioritizing combined goals.",
    "Correct categorization errors; flag transactions missed through complexity.",
    "Suggest adjustments when income changes; encourage regular contributions.",
    "Market updates and plain explanations of business investment terms.",
    "Remind her of upcoming payments; suggest adjustments to the repayment plan.",
    "Simplify business finance concepts; offer accessible formats.",
    "Highlight positive interactions; recommend relevant content and events.",
  ]
);

/** David Lee, high school teacher: paying down debt while saving for his children’s college. */
export const AUREUM_DAVID_JOURNEY_COLUMNS = persona(
  [
    "Signs up, enters personal information, completes onboarding and connects financial accounts.",
    "Creates a budget, sets goals for his children’s college and his retirement, receives AI recommendations.",
    "Connects financial accounts, mixes automated and manual entry, categorizes personal expenses.",
    "Sets savings goals for college and retirement, automates monthly contributions, tracks progress.",
    "Receives personalized investment advice, monitors a conservative portfolio and adjusts on AI insights.",
    "Views a debt overview, creates AI-driven repayment plans, tracks payments and adjusts strategy.",
    "Uses educational finance modules, quizzes on personal finance and interactive tutorials.",
    "Joins a teachers’ finance group, attends webinars on education finance and community events.",
  ],
  [
    "Hopeful for financial security, curious about AI, slightly apprehensive.",
    "Motivated to secure his family’s future, empowered by personalized advice, confident in the process.",
    "Relieved by automated tracking; engaged in reviewing expenses and curious about patterns.",
    "Optimistic about reaching his goals, determined to provide for his family, encouraged by progress.",
    "Reassured by tailored advice, excited about opportunities, confident in his financial future.",
    "Supported by comprehensive plans, focused on reducing debt, hopeful about becoming debt-free.",
    "Interested in expanding his knowledge, engaged by interactive learning, eager to improve.",
    "Supported by a professional community, encouraged by peer success stories, connected to mentors.",
  ],
  [
    "Hard to integrate financial data; concerns about data privacy.",
    "Overwhelmed by setting up long-term goals; unclear how to prioritize goals for the family.",
    "Personal expenses miscategorized; transactions missed because of complexity.",
    "Inconsistent income from side jobs; unexpected expenses hit the savings plan.",
    "Volatility in conservative investments; investment terms are hard to understand.",
    "Unexpected changes in debt terms; multiple loan payments to manage.",
    "Educational content misunderstood; tutorials hard to access.",
    "Negative interactions; content that isn’t relevant.",
  ],
  [
    "Help integrate data; give data-privacy assurances.",
    "Simplify setup for long-term goals; tips for prioritizing family goals.",
    "Correct categorization errors; flag transactions missed through complexity.",
    "Suggest adjustments when income changes; encourage regular contributions.",
    "Market updates and plain explanations of investment terms.",
    "Remind him of upcoming payments; suggest adjustments to the repayment plan.",
    "Simplify education-finance concepts; offer accessible formats.",
    "Highlight positive interactions; recommend relevant content and events.",
  ]
);

/** Lisa Robinson, retired nurse: a fixed pension and rising healthcare costs. */
export const AUREUM_LISA_JOURNEY_COLUMNS = persona(
  [
    "Signs up, enters personal information, completes onboarding and connects pension and Social Security accounts.",
    "Creates a budget, sets goals for healthcare costs and her grandchildren’s education, receives AI recommendations.",
    "Connects financial accounts, mixes automated and manual entry, categorizes medical and personal expenses.",
    "Sets savings goals for healthcare and her grandchildren’s education, automates savings, tracks progress.",
    "Receives personalized investment advice, monitors a low-risk portfolio and adjusts on AI insights.",
    "Views a debt overview, creates AI-driven repayment plans, tracks payments and adjusts strategy.",
    "Uses retirement finance modules, quizzes on retirement planning and interactive tutorials.",
    "Joins a retirees’ finance group, attends retirement-planning webinars and community events.",
  ],
  [
    "Hopeful for financial security, curious about AI, slightly apprehensive.",
    "Motivated to secure healthcare and family, empowered by personalized advice, confident in the process.",
    "Relieved by automated tracking; engaged in reviewing medical and personal expenses.",
    "Optimistic about reaching her goals, determined to provide for family, encouraged by progress.",
    "Reassured by tailored advice, excited about low-risk investments, confident in her financial future.",
    "Supported by comprehensive plans, focused on reducing debt, hopeful about becoming debt-free.",
    "Interested in expanding her knowledge, engaged by interactive learning, eager to improve.",
    "Supported by a retirees’ community, encouraged by peer success stories, connected to mentors.",
  ],
  [
    "Hard to integrate pension and Social Security data; concerns about privacy.",
    "Overwhelmed by setting up healthcare and education goals; unclear how to prioritize.",
    "Medical expenses miscategorized; transactions missed because of complexity.",
    "Inconsistent pension income and unexpected medical expenses hit the savings plan.",
    "Volatility in low-risk investments; investment terms are hard to understand.",
    "Unexpected changes in debt terms; multiple loan payments to manage.",
    "Retirement planning content misunderstood; tutorials hard to access.",
    "Negative interactions; content that isn’t relevant.",
  ],
  [
    "Help integrate data; give data-privacy assurances.",
    "Simplify setup for healthcare and education goals; tips for prioritizing family goals.",
    "Correct categorization errors; flag transactions missed through complexity.",
    "Suggest adjustments when income changes; encourage regular contributions.",
    "Market updates and plain explanations of investment terms.",
    "Remind her of upcoming payments; suggest adjustments to the repayment plan.",
    "Simplify retirement planning concepts; offer accessible formats.",
    "Highlight positive interactions; recommend relevant content and events.",
  ]
);

/** Product discovery: how anyone finds, buys into and stays with Aureum. */
export const AUREUM_DISCOVERY_COLUMNS: readonly JourneyMapColumn[] = [
  {
    header: "Stage",
    rows: ["Problem awareness", "Purchase", "Initial use", "Continued use", "Community"],
  },
  {
    header: "Actions",
    rows: [
      "Researches financial management tools, reads about personalized finance apps, talks it over with friends and family.",
      "Visits Aureum’s website, reviews features and pricing, signs up for a free trial or subscription.",
      "Sets up an account, enters financial data, explores personalized budgeting and investing.",
      "Tracks progress toward goals, receives AI recommendations, adjusts plans as needed.",
      "Joins the online community, takes part in forums and discussion groups, attends webinars.",
    ],
  },
  {
    header: "Emotional state",
    rows: [
      "Frustrated with the current situation, hopeful for a solution, curious about the options.",
      "Confident in the choice, slightly apprehensive about spending money, excited to start.",
      "Engaged with setup, optimistic about improvement, relieved to have a structured plan.",
      "Empowered by seeing progress, motivated to stick to the plan, reassured by ongoing support.",
      "Supported by the community, encouraged by shared experiences, proud to contribute advice.",
    ],
  },
  {
    header: "Influences",
    rows: [
      "Friends and family; financial blogs and influencers.",
      "Customer reviews and testimonials; the support team.",
      "The support team; onboarding specialists.",
      "AI recommendations and finance experts; the support team.",
      "Community members, financial mentors, event organizers.",
    ],
  },
  {
    header: "Tools & features",
    rows: [
      "Educational content on the website, comparison charts, testimonials.",
      "Detailed feature breakdowns, a free trial, customer testimonials.",
      "An easy setup wizard, interactive tutorials, a comprehensive dashboard.",
      "Real-time tracking, personalized AI recommendations, adaptive planning tools.",
      "A community platform, webinars and live Q&A, discussion forums and support groups.",
    ],
  },
];
