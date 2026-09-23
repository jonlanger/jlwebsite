import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "proposalpal",
  category: "software",
  title: "ProposalPal",
  description:
    "AI-powered proposal development agent that turns fragmented RFPs, notes, and BCG IP into a structured, high-quality first draft \u2014 in hours, not days.",
  image: "/projects/proposalpal/proposalpal_card_v3.webp",
  alt: "ProposalPal home in dark mode with the Welcome to ProposalPal hero, New Proposal and Learn More buttons, over a dot grid.",
  width: 1280,
  height: 720,
  liveUrl: "https://proposalpalv3.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Proposal development at BCG is high-stakes and time-compressed. Inputs arrive fragmented \u2014 RFPs, rough notes, emails, prior decks, and institutional IP spread across people and systems \u2014 while MDPs and pursuit teams still need a coherent, differentiated draft fast enough to win.",
      "ProposalPal is an AI-powered proposal development agent designed for that full journey. It takes unstructured pursuit materials and turns them into a structured first draft inside one workspace of eight agent modules \u2014 client research, engagement, teaming, topic research, storyline, commercial approach, polish, and pitch practice \u2014 so teams can spend senior judgment where it matters most.",
      "The version shown here is a full rebuild I made with Claude Code. It runs on a current model, ships with five pre-filled demo pursuits, and can be tried live.",
    ],
    role: "UX Research, Product Design, UI Design, Stakeholder Alignment, Prototyping",
    scope:
      "Enterprise web agent \u2014 proposal intake, multi-agent workspace, client and topic research, team formation, storyline and slide drafting, commercial approach, draft review, pitch practice, bookmarks, export",
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
      title: "Research",
      paragraphs: [
        "We started with the people who own the outcome. We interviewed more than ten MDPs about how their pursuits actually run: where the first draft stalls, what they rewrite by hand, and what they would never hand to a tool.",
        "Next we documented the pursuit process for each of the eight stages that became the modules, step by step, and traced what each stage needs from the others. The map made one thing plain: Client Research is the root. The storyline, the commercial approach and the pitch all build on it, so the app runs it first and holds the storyline until it is done.",
        "Finally we benchmarked the stakeholders who touch a pursuit across the firm \u2014 from partners and project leaders to knowledge teams, experts, staffing and pricing \u2014 listing what each group contributes and what it needs back. That split became the app\u2019s inputs and outputs, and told us which module each group would work in.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/proposalpal/diagram-modules.png",
          alt: "Module dependency map. Proposal intake feeds Client Research, Client Engagement, Topic Research and Team Formation. Client Research is required before Storyline & Proposal and also feeds Commercial Approach with financials and competitors. Topic Research adds credentials and benchmarks and Team Formation adds team and experience to the storyline. Commercial Approach adds pricing and phasing. The storyline draft goes to Polish Proposal, then the final story to Practice Pitch. Bookmarks from any module feed the storyline.",
          width: 2400,
          height: 1440,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/proposalpal/diagram-stakeholders.png",
          alt: "Stakeholder benchmark table: MDPs and partners, principals and project leaders, consultants, knowledge and research teams, practice experts, staffing, finance and pricing, and client stakeholders, each with what they give the pursuit, what they need back, and the ProposalPal modules where that happens.",
          width: 2400,
          height: 1383,
        },
      ],
      topicGroups: [
        {
          title: "What the research changed",
          items: [
            {
              title: "Research gates the story",
              body: "Because every later stage leans on client facts, the storyline waits for Client Research instead of drafting on thin evidence.",
            },
            {
              title: "Judgment travels with the draft",
              body: "MDPs wanted their calls kept, not overwritten. Bookmarks let the team flag insights in any module and the storyline is built around them.",
            },
            {
              title: "One home per stakeholder",
              body: "Each group\u2019s inputs and outputs map to a module, so staffing works in Team Formation, pricing in Commercial Approach, and experts in Topic Research.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "10+",
          label: "MDPs interviewed",
          detail: "On how pursuits run, where drafts stall, and what stays with the partner.",
        },
        {
          value: "8",
          label: "Processes mapped",
          detail: "One per module, traced for the inputs each needs from the others.",
        },
        {
          value: "8",
          label: "Stakeholder groups",
          detail: "Benchmarked for what they give a pursuit and what they need back.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Rather than ship a single drafting chat, we designed ProposalPal as a multi-agent pursuit workspace. Intake captures the opportunity and its source material; the workspace then routes the team through eight modules, each a first-class surface with its own sections rather than a buried prompt.",
        "Every module pairs a chat on the left with structured output on the right \u2014 research sections, team profiles, storyline slides, commercial framing \u2014 so the AI\u2019s work stays inspectable, and any section or single slide can be regenerated, copied, bookmarked or exported on its own.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/proposalpal/v3-workspace.webp",
          alt: "Proposal workspace with the eight module cards above the chat for the 7-Eleven ERP proposal.",
          width: 1800,
          height: 1125,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/proposalpal/v3-client-research.webp",
          alt: "Client Research module: chat on the left, and on the right eight research sections with bookmark, copy and regenerate controls, the first open on a contextual overview of 7-Eleven.",
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
              body: "Opportunity details, RFP and draft uploads, and AI-filled practice areas, competitors and topic expert ground every module. Suggested data sources are tagged as client context, past proposal or BCG IP.",
            },
            {
              title: "Eight modules",
              body: "Pursuit stages live as first-class surfaces so teams always know where they are, and what each module still needs.",
            },
            {
              title: "Human in the loop",
              body: "Regenerate a section or a single slide, bookmark what matters, ask the chat about any highlight, and export when ready.",
            },
          ],
        },
        {
          title: "Features",
          items: [
            {
              title: "Storyline as slides",
              body: "The draft comes back as slides with full-sentence action titles and supporting bullets, section by section, built around the team\u2019s bookmarks.",
            },
            {
              title: "Team and draft review",
              body: "Team Formation ranks people with match scores, capabilities and gaps; Polish Proposal scores a draft and suggests before-and-after rewrites.",
            },
            {
              title: "Pitch practice",
              body: "The top five client questions, questions by persona, and role-play prompts to rehearse before the room.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from home and intake into the workspace, then through each module to a draft that has been reviewed and rehearsed. Every screen below is from the live rebuild, in dark mode, on its pre-filled 7-Eleven, Walmart and Pfizer demo pursuits.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/proposalpal/v3-home.webp",
            alt: "ProposalPal home with the welcome hero and the proposals board below.",
            width: 1800,
            height: 1125,
            title: "Proposal home",
            caption:
              "Every active pursuit in one place, with five demo proposals ready to open.",
          },
          {
            src: "/projects/proposalpal/v3-intake.webp",
            alt: "New Proposal form with opportunity ID, client, proposal name, RFP and draft upload zones, proposal context, and a details panel that AI can fill in.",
            width: 1800,
            height: 1125,
            title: "Structured intake",
            caption:
              "Upload an RFP or draft, or write a summary; ProposalPal fills in practice areas, competitors and the ideal topic expert.",
          },
          {
            src: "/projects/proposalpal/v3-details.webp",
            alt: "Proposal Details for 7-Eleven with practice areas, due date, description, competitive landscape, topic expert and tagged files.",
            width: 1800,
            height: 1125,
            title: "Proposal details",
            caption:
              "Everything the agents know about the pursuit, editable at any point.",
          },
          {
            src: "/projects/proposalpal/v3-workspace-sources.webp",
            alt: "Workspace with the Global Data Sources panel listing suggested sources tagged Client Context, BCG IP and Past Proposal.",
            width: 1800,
            height: 1125,
            title: "Data sources",
            caption:
              "Suggested sources for the pursuit, tagged by type, one click to add.",
          },
          {
            src: "/projects/proposalpal/v3-client-research.webp",
            alt: "Client Research with eight sections and the contextual overview of 7-Eleven open.",
            width: 1800,
            height: 1125,
            title: "Client research",
            caption:
              "Context, competitors, financials, leaders and priorities, grounded in public company filings.",
          },
          {
            src: "/projects/proposalpal/v3-team-formation.webp",
            alt: "Team Formation with recommended people, match scores, expertise, capabilities and past projects.",
            width: 1800,
            height: 1125,
            title: "Team formation",
            caption:
              "Ranked matches with the expertise, capabilities and past projects behind each score.",
          },
          {
            src: "/projects/proposalpal/v3-storyline.webp",
            alt: "Storyline & Proposal with numbered slides under Hypothesis & Perspective, each with an action title and bullets.",
            width: 1800,
            height: 1125,
            title: "Storyline as slides",
            caption:
              "Action titles and supporting points, section by section, with any slide regenerable on its own.",
          },
          {
            src: "/projects/proposalpal/v3-commercial.webp",
            alt: "Commercial Approach with pricing strategy open, plus investment framing, delivery model, competitive edge, risks and expert contacts.",
            width: 1800,
            height: 1125,
            title: "Commercial approach",
            caption:
              "Pricing model, investment framing and delivery model sit beside the narrative.",
          },
          {
            src: "/projects/proposalpal/v3-polish.webp",
            alt: "Polish Proposal scoring a draft 50 out of 100, with strengths, gaps and a before-and-after rewrite for the executive summary.",
            width: 1800,
            height: 1125,
            title: "Polish",
            caption:
              "A partner-style review: a score, strengths, gaps and rewrites you can copy.",
          },
          {
            src: "/projects/proposalpal/v3-practice-pitch.webp",
            alt: "Practice Pitch with the top five questions the client will ask and suggested answers.",
            width: 1800,
            height: 1125,
            title: "Practice pitch",
            caption:
              "The questions the client is most likely to ask, with crisp answers to rehearse.",
          },
          {
            src: "/projects/proposalpal/v3-bookmarks-storyline.webp",
            alt: "Storyline with the bookmarks panel open and a banner offering to rebuild the storyline from two bookmarks.",
            width: 1800,
            height: 1125,
            title: "Bookmarks shape the story",
            caption:
              "Insights flagged anywhere in the workspace feed straight into the storyline.",
          },
          {
            src: "/projects/proposalpal/v3-chat.webp",
            alt: "Chat reply in Client Research laying out win themes for 7-Eleven given its planned IPO.",
            width: 1800,
            height: 1125,
            title: "Ask anything",
            caption:
              "The chat carries the full proposal and the open module, so answers stay specific.",
          },
        ],
        accordion: [
          {
            value: "getting-started",
            title: "Getting started",
            description:
              "Finding a proposal, setting it up, and getting help.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/proposalpal/v3-proposals.webp",
                alt: "Proposals board with a New Proposal tile and cards for JPMorgan Chase, Pfizer, Ford, Walmart and 7-Eleven.",
                width: 1800,
                height: 1125,
                title: "Proposals board",
                caption:
                  "Five demo pursuits across banking, pharma, auto and retail, searchable and sortable.",
              },
              {
                src: "/projects/proposalpal/v3-intake.webp",
                alt: "Empty New Proposal form with required fields, upload zones and a team members panel.",
                width: 1800,
                height: 1125,
                title: "Required information",
                caption:
                  "Opportunity ID, client and name unlock the workspace; everything else sharpens it.",
              },
              {
                src: "/projects/proposalpal/v3-details.webp",
                alt: "Proposal Details with Generate and Edit controls and tagged files.",
                width: 1800,
                height: 1125,
                title: "Details the agents use",
                caption:
                  "Practice areas, competitors and topic expert act as guardrails for every module.",
              },
              {
                src: "/projects/proposalpal/v3-help.webp",
                alt: "Instructions and Support FAQ covering access, creating proposals, and security.",
                width: 1800,
                height: 1125,
                title: "In-product guidance",
                caption:
                  "FAQ and support for access, collaboration and confidential data.",
              },
            ],
          },
          {
            value: "research-modules",
            title: "Research modules",
            description:
              "Understanding the client, the relationships, the topic and the team.",
            slides: [
              {
                src: "/projects/proposalpal/v3-client-research.webp",
                alt: "Client Research sections with bookmark, copy and regenerate on each.",
                width: 1800,
                height: 1125,
                title: "Client research",
                caption:
                  "Eight sections, each bookmarkable, copyable and regenerable on its own.",
              },
              {
                src: "/projects/proposalpal/v3-client-engagement.webp",
                alt: "Client Engagement with a relationship map table of stakeholders, roles, stance and relationship strength.",
                width: 1800,
                height: 1125,
                title: "Client engagement",
                caption:
                  "Who matters, where they stand, and which BCG partner should meet them.",
              },
              {
                src: "/projects/proposalpal/v3-topic-research.webp",
                alt: "Topic Research with methods and tools open, plus industry primer, past proposal, credentials, vignettes, experts, benchmarks and client references.",
                width: 1800,
                height: 1125,
                title: "Topic research",
                caption:
                  "Methods, credentials and benchmarks that back the proposal\u2019s claims.",
              },
              {
                src: "/projects/proposalpal/v3-team-formation.webp",
                alt: "Team Formation cards with match scores for five recommended people.",
                width: 1800,
                height: 1125,
                title: "Team formation",
                caption:
                  "Match scores with the reasons behind them, plus roles and capability gaps.",
              },
            ],
          },
          {
            value: "build-refine",
            title: "Build and refine",
            description:
              "Turning research into a story, a price, a reviewed draft and a rehearsed pitch.",
            slides: [
              {
                src: "/projects/proposalpal/v3-storyline.webp",
                alt: "Storyline slides with action titles and bullets and a regenerate control per slide.",
                width: 1800,
                height: 1125,
                title: "Storyline & proposal",
                caption:
                  "Slides with action titles, gated on Client Research so the story has evidence.",
              },
              {
                src: "/projects/proposalpal/v3-commercial.webp",
                alt: "Commercial Approach sections with the pricing strategy open.",
                width: 1800,
                height: 1125,
                title: "Commercial approach",
                caption:
                  "Pricing, investment framing, delivery model, competitive edge and risks.",
              },
              {
                src: "/projects/proposalpal/v3-polish.webp",
                alt: "Polish Proposal review with score, strengths, gaps and suggested rewrites.",
                width: 1800,
                height: 1125,
                title: "Polish proposal",
                caption:
                  "A scored review of any uploaded or pasted draft.",
              },
              {
                src: "/projects/proposalpal/v3-practice-pitch.webp",
                alt: "Practice Pitch question sets.",
                width: 1800,
                height: 1125,
                title: "Practice pitch",
                caption:
                  "Top questions, persona questions and role-play prompts.",
              },
            ],
          },
          {
            value: "bookmarks-chat",
            title: "Bookmarks and chat",
            description:
              "How the team\u2019s judgment gets into the draft.",
            slides: [
              {
                src: "/projects/proposalpal/v3-highlight.webp",
                alt: "Highlighted text with a floating menu offering Ask AI and Bookmark.",
                width: 1800,
                height: 1125,
                title: "Highlight to act",
                caption:
                  "Select any AI output to bookmark it or ask the chat about it.",
              },
              {
                src: "/projects/proposalpal/v3-bookmarks.webp",
                alt: "Bookmarks panel listing two Client Research insights, each marked Use in storyline.",
                width: 1800,
                height: 1125,
                title: "Bookmarks panel",
                caption:
                  "Every saved insight, with a switch for whether it shapes the storyline.",
              },
              {
                src: "/projects/proposalpal/v3-bookmarks-storyline.webp",
                alt: "Storyline with the bookmarks panel and a Build storyline from 2 bookmarks button.",
                width: 1800,
                height: 1125,
                title: "Build from bookmarks",
                caption:
                  "Rebuild the storyline around what the team flagged.",
              },
              {
                src: "/projects/proposalpal/v3-chat.webp",
                alt: "Chat reply with three win themes for 7-Eleven.",
                width: 1800,
                height: 1125,
                title: "Module-aware chat",
                caption:
                  "Answers draw on the proposal, its research and the open module.",
              },
              {
                src: "/projects/proposalpal/v3-chat-history.webp",
                alt: "Chat history popover listing a saved thread from Client Research.",
                width: 1800,
                height: 1125,
                title: "Chat history",
                caption:
                  "Earlier threads, tagged by the module they started in.",
              },
            ],
          },
          {
            value: "operations",
            title: "Operations and export",
            description:
              "Keeping track of what the agents made and getting it out.",
            slides: [
              {
                src: "/projects/proposalpal/v3-export.webp",
                alt: "Export menu with Export module, Export proposal and Print / Save as PDF.",
                width: 1800,
                height: 1125,
                title: "Export",
                caption:
                  "A module or the whole proposal as Markdown, or print to PDF.",
              },
              {
                src: "/projects/proposalpal/v3-generated-files.webp",
                alt: "Generated Files and Exports panel listing a Markdown file for each module with download buttons.",
                width: 1800,
                height: 1125,
                title: "Generated files",
                caption:
                  "Every module\u2019s output as a downloadable file.",
              },
              {
                src: "/projects/proposalpal/v3-system-tasks.webp",
                alt: "System Tasks panel showing no tasks running.",
                width: 1800,
                height: 1125,
                title: "System tasks",
                caption:
                  "Background generation is tracked here, with retry if a module fails.",
              },
            ],
          },
          {
            value: "demos",
            title: "Other demo pursuits",
            description:
              "The same workspace on different clients and industries.",
            slides: [
              {
                src: "/projects/proposalpal/v3-walmart-storyline.webp",
                alt: "Walmart storyline slides on automated fulfillment value capture.",
                width: 1800,
                height: 1125,
                title: "Walmart storyline",
                caption:
                  "An automated fulfillment network pursuit, drafted as slides.",
              },
              {
                src: "/projects/proposalpal/v3-walmart-team.webp",
                alt: "Walmart Team Formation with supply chain and retail operations matches.",
                width: 1800,
                height: 1125,
                title: "Walmart team",
                caption:
                  "A different team for a different problem: network design and automation.",
              },
              {
                src: "/projects/proposalpal/v3-pfizer-commercial.webp",
                alt: "Pfizer Commercial Approach with a fixed-fee phased pricing strategy.",
                width: 1800,
                height: 1125,
                title: "Pfizer commercial",
                caption:
                  "Phased fixed fees with a success component for a launch-excellence pursuit.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Rebuild",
      paragraphs: [
        "The original prototype stopped working when its model was retired. I rebuilt it end to end with Claude Code from the product I had designed, keeping the eight modules and their information architecture, and adding bookmarks that feed the storyline, slide-by-slide drafting, and export.",
        "It also works on a phone: the workspace collapses into Chat, Content, Sources and Bookmarks tabs.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/proposalpal/v3-mobile.webp",
          alt: "Three phone screens: the ProposalPal home, the workspace module grid with the chat and bottom tabs, and Team Formation match cards.",
          width: 1844,
          height: 1280,
        },
      ],
      topicGroups: [
        {
          title: "Under the hood",
          items: [
            {
              title: "Grounded, not invented",
              body: "Public profiles of five companies from SEC filings, plus consulting playbooks and public case studies, are added to each prompt. The model is told to flag figures to verify rather than invent them.",
            },
            {
              title: "Any model, or none",
              body: "One client works with Gemini, Groq or a local Ollama model, and a demo mode runs with no key at all.",
            },
            {
              title: "Private by default",
              body: "Proposals, chats and bookmarks stay in the browser. Uploaded PDF, Word and text files are turned into text and only excerpts go to the model.",
            },
          ],
        },
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "ProposalPal gives pursuit teams a shared, IP-grounded path from fragmented inputs to a first draft they can refine. Adoption spans 193 teams, with MDPs as the primary audience and a firm target to lift revenue through faster, more consistent proposal quality. The rebuild is live, so the whole flow can be tried on the demo pursuits.",
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
          value: "8",
          label: "Agent modules",
          detail: "Intake through research, teaming, storyline, commercial, polish and pitch.",
        },
      ],
    },
  ],
};
