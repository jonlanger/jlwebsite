import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "proposalpal",
  category: "software",
  title: "ProposalPal",
  description:
    "AI-powered proposal development agent that turns fragmented RFPs, notes, and BCG IP into a structured, high-quality first draft \u2014 in hours, not days.",
  image: "/projects/proposalpal/proposalpal_card_dark.webp",
  alt: "ProposalPal home in dark mode with Welcome hero, New Proposal CTA, and an active 7-Eleven ERP proposal card.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Proposal development at BCG is high-stakes and time-compressed. Inputs arrive fragmented \u2014 RFPs, rough notes, emails, prior decks, and institutional IP spread across people and systems \u2014 while MDPs and pursuit teams still need a coherent, differentiated draft fast enough to win.",
      "ProposalPal is an AI-powered proposal development agent designed for that full journey. It takes unstructured pursuit materials and transforms them into a structured first draft inside an embedded multi-agent workspace \u2014 spanning intake, research, storyline, teaming, commercial strategy, and polish \u2014 so teams can apply senior judgment where it matters most.",
    ],
    role: "UX Research, Product Design, UI Design, Stakeholder Alignment",
    scope:
      "Enterprise web agent \u2014 proposal intake, multi-agent workspace, client research, team formation, storyline & content build, commercial approach, human-in-the-loop refinement",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Pursuit work wasn\u2019t failing for lack of talent \u2014 it was failing under fragmentation. Teams rebuilt research, storyline, and staffing from scratch on every opportunity, with inconsistent grounding in BCG IP and little shared structure across practices.",
      ],
      topicGroups: [
        {
          title: "Why proposals stall",
          items: [
            {
              title: "Fragmented inputs",
              body: "RFPs, notes, emails, and prior materials live in different places \u2014 so the first draft starts late and incomplete.",
            },
            {
              title: "Inconsistent quality",
              body: "Without shared structure and institutional knowledge, draft quality varies widely across teams and practices.",
            },
            {
              title: "Manual cycle time",
              body: "Research, storyline, teaming, and commercial framing are rebuilt by hand under deadline pressure.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "MDP-grade judgment",
              body: "The product had to accelerate drafting without removing senior review \u2014 human-in-the-loop, not autopilot.",
            },
            {
              title: "End-to-end pursuit",
              body: "Intake through research, storyline, teaming, commercial approach, polish, and pitch practice needed one workspace.",
            },
            {
              title: "BCG IP as grounding",
              body: "Outputs had to pull from relevant institutional knowledge so drafts felt consistent with how BCG wins work.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "193",
          label: "Teams using ProposalPal",
          detail: "Active adoption across pursuit teams.",
        },
        {
          value: "MDPs",
          label: "Primary audience",
          detail: "Designed for Managing Director and Partner-led pursuits.",
        },
        {
          value: "+1%",
          label: "Revenue target",
          detail: "Firm goal tied to faster, higher-quality proposal throughput.",
        },
        {
          value: "Hours",
          label: "Not days",
          detail: "Structured first draft from fragmented inputs.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Rather than ship a single drafting chat, we designed ProposalPal as a multi-agent pursuit workspace. Intake captures opportunity context and source materials; the dashboard then routes teams through specialized modules \u2014 Client Research, Engagement, Team Formation, Topic Research, Storyline & Proposal, Commercial Approach, Polish, and Practice Pitch.",
        "Each module pairs conversational refinement with structured outputs on the right \u2014 research sections, team profiles, proposal outline, commercial framing \u2014 so AI acceleration stays inspectable and editable.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/proposalpal/dark-workspace.webp",
          alt: "Proposal workspace with the eight pursuit modules — Client Research, Client Engagement, Team Formation, Topic Research, Storyline & Proposal, Commercial Approach, Polish Proposal, Practice Pitch — above the chat.",
          width: 1800,
          height: 1125,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/proposalpal/dark-operations.webp",
          alt: "Proposal Operations panel listing generated files with their types, running system tasks, and team members with owner and editor roles.",
          width: 1800,
          height: 1125,
        },
      ],
      topicGroups: [
        {
          title: "Workspace model",
          items: [
            {
              title: "Intake & sources",
              body: "Opportunity ID, client, RFP/draft uploads, and proposal context seed research guardrails and GenAI outputs.",
            },
            {
              title: "Module grid",
              body: "Eight pursuit stages live as first-class surfaces \u2014 not buried prompts \u2014 so teams know where they are in the journey.",
            },
            {
              title: "Human-in-the-loop",
              body: "Ask-anything chat, regenerate, bookmarks, and export keep judgment and sharing inside the same shell.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from proposal home and intake into the multi-agent workspace \u2014 then through research, teaming, storyline, commercial strategy, and polish. Screens below are from the live ProposalPal experience.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/proposalpal/dark-home.webp",
            alt: "ProposalPal home in dark mode with the welcome hero, New Proposal button, and a 7-Eleven ERP proposal card.",
            width: 1800,
            height: 1125,
            title: "Proposal home",
            caption:
              "A search-first proposals board for pursuit teams \u2014 jump into an active opportunity or start a new one.",
          },
          {
            src: "/projects/proposalpal/dark-intake.webp",
            alt: "New Proposal intake with opportunity ID, client, proposal name, RFP and draft uploads, and proposal context filled in.",
            width: 1800,
            height: 1125,
            title: "Structured intake",
            caption:
              "RFP, draft, and context uploads ground research and GenAI outputs before the team enters the workspace.",
          },
          {
            src: "/projects/proposalpal/dark-details.webp",
            alt: "Proposal Details page with required information, practice areas, due date, proposal description, competitive landscape, topic expert, and attached files.",
            width: 1800,
            height: 1125,
            title: "Proposal details",
            caption:
              "Everything the agents know about the pursuit \u2014 practices, competitors, experts, and files \u2014 on one editable page.",
          },
          {
            src: "/projects/proposalpal/dark-workspace-sources.webp",
            alt: "Proposal workspace with the Global Data Sources panel pulling relevant sources beside the module grid and welcome chat.",
            width: 1800,
            height: 1125,
            title: "Multi-agent workspace",
            caption:
              "Data sources on the left, pursuit modules in the center, and chat to steer the draft in real time.",
          },
          {
            src: "/projects/proposalpal/dark-client-research.webp",
            alt: "Client Research module with deep-research sections for context, competitors, financials, portfolio, news, executives, and priorities.",
            width: 1800,
            height: 1125,
            title: "Client research",
            caption:
              "Agent-led intelligence across industry, financials, leadership, and priorities \u2014 structured for proposal use.",
          },
          {
            src: "/projects/proposalpal/dark-storyline.webp",
            alt: "Storyline & Proposal module with proposal sections and a gate asking for Client Research to be completed first.",
            width: 1800,
            height: 1125,
            title: "Storyline & draft",
            caption:
              "Build the proposal spine \u2014 hypotheses, value, approach, teaming, and executive summary \u2014 gated on research quality.",
          },
          {
            src: "/projects/proposalpal/dark-commercial.webp",
            alt: "Commercial Approach module with pricing strategy, investment framing, delivery model, competitive edge, risks, and expert contacts.",
            width: 1800,
            height: 1125,
            title: "Commercial approach",
            caption:
              "Pricing, investment framing, delivery model, and competitive edge sit beside the narrative \u2014 not afterthoughts.",
          },
          {
            src: "/projects/proposalpal/dark-polish.webp",
            alt: "Polish Proposal module reviewing hypotheses, Why BCG, approach, teaming, pricing, presence, and areas for improvement.",
            width: 1800,
            height: 1125,
            title: "Polish",
            caption:
              "Refine clarity, tone, and executive readability section by section \u2014 keeping human judgment in the loop.",
          },
          {
            src: "/projects/proposalpal/dark-practice-pitch.webp",
            alt: "Practice Pitch module with top client questions, persona-specific questions, and role-play questions.",
            width: 1800,
            height: 1125,
            title: "Practice pitch",
            caption:
              "Rehearse against the questions the client is most likely to ask before walking into the room.",
          },
          {
            src: "/projects/proposalpal/dark-chat.webp",
            alt: "Proposal overview with a question about win themes typed into the Ask me anything chat.",
            width: 1800,
            height: 1125,
            title: "Ask anything",
            caption:
              "A single chat carries the full proposal context, so teams can ask for angles, rewrites, or evidence at any point.",
          },
        ],
        accordion: [
          {
            value: "getting-started",
            title: "Getting started",
            description:
              "How teams find a proposal, set it up, and get help.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/proposalpal/dark-home.webp",
                alt: "Proposals board with New Proposal tile and the 7-Eleven ERP proposal card showing its team avatars.",
                width: 1800,
                height: 1125,
                title: "Proposals board",
                caption:
                  "Every active pursuit, searchable and sortable, with the team visible on each card.",
              },
              {
                src: "/projects/proposalpal/dark-intake.webp",
                alt: "New Proposal form with required fields, RFP and draft upload zones, and proposal context.",
                width: 1800,
                height: 1125,
                title: "Required information",
                caption:
                  "Opportunity ID, client, name, and source materials \u2014 the minimum to unlock the workspace.",
              },
              {
                src: "/projects/proposalpal/dark-details.webp",
                alt: "Proposal Details with practice areas, due date, description, competitive landscape, and attached RFP and draft files.",
                width: 1800,
                height: 1125,
                title: "Proposal details",
                caption:
                  "Context the agents use as guardrails, editable at any point in the pursuit.",
              },
              {
                src: "/projects/proposalpal/dark-help.webp",
                alt: "Instructions and Support page with the FAQ open to what ProposalPal can do.",
                width: 1800,
                height: 1125,
                title: "In-product guidance",
                caption:
                  "FAQ and support for access, collaboration, and handling confidential pursuit data.",
              },
            ],
          },
          {
            value: "workspace",
            title: "Workspace panels",
            description:
              "The panels around the chat that hold context, sources, history, and team.",
            slides: [
              {
                src: "/projects/proposalpal/dark-workspace.webp",
                alt: "Proposal workspace with the eight-module grid and welcome message for the 7-Eleven proposal.",
                width: 1800,
                height: 1125,
                title: "Proposal overview",
                caption:
                  "Eight pursuit modules as first-class surfaces, with chat underneath.",
              },
              {
                src: "/projects/proposalpal/dark-project-context.webp",
                alt: "Data source navigation with the Project Context panel and a document upload area.",
                width: 1800,
                height: 1125,
                title: "Project context",
                caption:
                  "Sources are organized as project context, global sources, and per-module sources.",
              },
              {
                src: "/projects/proposalpal/dark-chat-history.webp",
                alt: "Chat History panel listing saved chats beside the data source navigation.",
                width: 1800,
                height: 1125,
                title: "Chat history",
                caption:
                  "Earlier threads stay one click away, tagged by the module they started in.",
              },
              {
                src: "/projects/proposalpal/dark-operations.webp",
                alt: "Proposal Operations panel with generated files and their types, system tasks, and team members with owner and editor roles.",
                width: 1800,
                height: 1125,
                title: "Proposal operations",
                caption:
                  "Files, background tasks, and team roles in one place \u2014 so everyone knows what the agents are working on.",
              },
            ],
          },
          {
            value: "agent-modules",
            title: "Agent modules",
            description:
              "Specialized surfaces across research, engagement, storyline, and commercial strategy.",
            slides: [
              {
                src: "/projects/proposalpal/dark-client-research.webp",
                alt: "Client Research deep-research sections from contextual overview through sources.",
                width: 1800,
                height: 1125,
                title: "Deep research",
                caption:
                  "Eight research sections assembled into proposal-ready material.",
              },
              {
                src: "/projects/proposalpal/dark-value-science.webp",
                alt: "Client Research Value Science Portal tab with executive summary, value opportunity, diagnostics, capture initiatives, and tracking.",
                width: 1800,
                height: 1125,
                title: "Value science",
                caption:
                  "Value cases from the Value Science Portal, framed for the client\u2019s situation.",
              },
              {
                src: "/projects/proposalpal/dark-client-engagement.webp",
                alt: "Client Engagement module with relationship mapping, team pairings, prior engagements, trends, and follow-up plan.",
                width: 1800,
                height: 1125,
                title: "Client engagement",
                caption:
                  "Map decision-makers and plan who from BCG meets whom, and when.",
              },
              {
                src: "/projects/proposalpal/dark-topic-research.webp",
                alt: "Topic Research module listing methods and tools, industry primer, past proposals, credentials, vignettes, experts, benchmarks, and references.",
                width: 1800,
                height: 1125,
                title: "Topic research",
                caption:
                  "BCG IP surfaced by type, ready to cite in the proposal.",
              },
              {
                src: "/projects/proposalpal/dark-topic-sections.webp",
                alt: "Topic Research Sections tab mapping research to executive summary, hypothesis, Why BCG, approach, and team sections.",
                width: 1800,
                height: 1125,
                title: "Research by section",
                caption:
                  "The same research, reorganized around the proposal section it supports.",
              },
              {
                src: "/projects/proposalpal/dark-storyline.webp",
                alt: "Storyline module with proposal section list and research-required gate.",
                width: 1800,
                height: 1125,
                title: "Narrative structure",
                caption:
                  "Proposal sections stay gated on research quality so drafts don\u2019t outrun evidence.",
              },
              {
                src: "/projects/proposalpal/dark-commercial.webp",
                alt: "Commercial Approach sections for pricing, delivery, competitive edge, and risks.",
                width: 1800,
                height: 1125,
                title: "Win economics",
                caption:
                  "Commercial framing generated alongside the storyline so pricing and value stay aligned.",
              },
              {
                src: "/projects/proposalpal/dark-polish.webp",
                alt: "Polish Proposal review sections including presence and engagement and areas for improvement.",
                width: 1800,
                height: 1125,
                title: "Polish review",
                caption:
                  "A final pass on each section before the proposal goes out.",
              },
              {
                src: "/projects/proposalpal/dark-practice-pitch.webp",
                alt: "Practice Pitch question sets for the client, personas, and role-play.",
                width: 1800,
                height: 1125,
                title: "Practice pitch",
                caption:
                  "Persona-driven Q&A to pressure-test the story before the pitch.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "ProposalPal gives pursuit teams a shared, IP-grounded path from fragmented inputs to a first draft they can refine. Adoption now spans 193 teams, with MDPs as the primary audience and a firm target to lift revenue through faster, more consistent proposal quality.",
      ],
      stats: [
        {
          value: "193",
          label: "Teams onboarded",
          detail: "Using ProposalPal across active pursuits.",
        },
        {
          value: "MDPs",
          label: "Built for leaders",
          detail: "Targeted at Managing Director and Partner-led proposal work.",
        },
        {
          value: "+1%",
          label: "Revenue ambition",
          detail: "Firm target tied to proposal throughput and win quality.",
        },
        {
          value: "End-to-end",
          label: "Pursuit workspace",
          detail: "Intake through research, storyline, teaming, commercial, and polish.",
        },
      ],
    },
  ],
};
