import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "proposalpal",
  category: "software",
  title: "ProposalPal",
  description:
    "AI-powered proposal development agent that turns fragmented RFPs, notes, and BCG IP into a structured, high-quality first draft \u2014 in hours, not days.",
  image: "/projects/proposalpal/proposalpal_card.png",
  alt: "ProposalPal home with Welcome hero, New Proposal CTA, and an active 7-Eleven ERP proposal card.",
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
            src: "/projects/proposalpal/product-home.png",
            alt: "ProposalPal home with welcome hero, New Proposal CTA, and proposal cards including a 7-Eleven ERP opportunity.",
            width: 1800,
            height: 1125,
            title: "Proposal home",
            caption:
              "A search-first proposals board for pursuit teams \u2014 jump into an active opportunity or start a new one.",
          },
          {
            src: "/projects/proposalpal/product-intake.png",
            alt: "New Proposal intake with Opportunity ID, client name, RFP upload, draft upload, and proposal context fields.",
            width: 1800,
            height: 1125,
            title: "Structured intake",
            caption:
              "RFP, draft, and context uploads ground research and GenAI outputs before the team enters the workspace.",
          },
          {
            src: "/projects/proposalpal/product-workspace-overview.png",
            alt: "Proposal workspace overview with data sources panel, eight pursuit modules, and AI welcome chat.",
            width: 1800,
            height: 1125,
            title: "Multi-agent workspace",
            caption:
              "Data sources on the left, pursuit modules in the center, and chat to steer the draft in real time.",
          },
          {
            src: "/projects/proposalpal/product-client-research.png",
            alt: "Client Research module with deep-research sections for overview, competitors, financials, and priorities.",
            width: 1800,
            height: 1125,
            title: "Client research",
            caption:
              "Agent-led intelligence across industry, financials, leadership, and priorities \u2014 structured for proposal use.",
          },
          {
            src: "/projects/proposalpal/product-team-formation.png",
            alt: "Team Formation module recommending consultants with capability insights, suggested roles, and past projects.",
            width: 1800,
            height: 925,
            title: "Team formation",
            caption:
              "Match roles to experts with capability insights, gaps, and past projects \u2014 then add people to the pursuit team.",
          },
          {
            src: "/projects/proposalpal/product-storyline.png",
            alt: "Storyline & Proposal module with hypotheses, Why BCG, approach, team, and executive summary sections.",
            width: 1800,
            height: 1125,
            title: "Storyline & draft",
            caption:
              "Build the proposal spine \u2014 hypotheses, value, approach, teaming, and executive summary \u2014 in one flow.",
          },
          {
            src: "/projects/proposalpal/product-commercial.png",
            alt: "Commercial Approach module with pricing strategy, investment framing, delivery model, and competitive edge.",
            width: 1800,
            height: 1125,
            title: "Commercial approach",
            caption:
              "Pricing, investment framing, delivery model, and competitive edge sit beside the narrative \u2014 not afterthoughts.",
          },
          {
            src: "/projects/proposalpal/product-polish.png",
            alt: "Polish Proposal module refining clarity, tone, and executive readability across proposal sections.",
            width: 1800,
            height: 1125,
            title: "Polish & pitch",
            caption:
              "Refine clarity, tone, and executive readability before practice pitch \u2014 keeping human judgment in the loop.",
          },
        ],
        accordion: [
          {
            value: "intake-support",
            title: "Intake & support",
            description:
              "How teams start a proposal and find process guidance inside the product.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/proposalpal/product-intake.png",
                alt: "New Proposal form with required opportunity fields and document upload zones.",
                width: 1800,
                height: 1125,
                title: "Required information",
                caption:
                  "Opportunity ID, client, name, and source materials \u2014 the minimum to unlock the workspace.",
              },
              {
                src: "/projects/proposalpal/product-help.png",
                alt: "Instructions and Support FAQ covering access, creating proposals, and security.",
                width: 1800,
                height: 1125,
                title: "In-product guidance",
                caption:
                  "FAQ and support for access, collaboration, and handling confidential pursuit data.",
              },
            ],
          },
          {
            value: "agent-modules",
            title: "Agent modules",
            description:
              "Specialized surfaces across research, teaming, storyline, and commercial strategy.",
            slides: [
              {
                src: "/projects/proposalpal/product-client-research.png",
                alt: "Client Research deep-research accordion with loading section cards.",
                width: 1800,
                height: 1125,
                title: "Research synthesis",
                caption:
                  "Deep research, analyst reports, and value-science context assembled into proposal-ready sections.",
              },
              {
                src: "/projects/proposalpal/product-team-formation.png",
                alt: "Team Formation chat recommending Carlos Ramirez with Add to Team actions.",
                width: 1800,
                height: 925,
                title: "Staffing recommendations",
                caption:
                  "Conversational teaming with structured profiles \u2014 copy email, add to team, inspect gaps.",
              },
              {
                src: "/projects/proposalpal/product-storyline.png",
                alt: "Storyline module showing proposal section list and research-required gate.",
                width: 1800,
                height: 1125,
                title: "Narrative structure",
                caption:
                  "Proposal sections stay gated on research quality so drafts don\u2019t outrun evidence.",
              },
              {
                src: "/projects/proposalpal/product-commercial.png",
                alt: "Commercial Approach sections for pricing, delivery, competitive edge, and risks.",
                width: 1800,
                height: 1125,
                title: "Win economics",
                caption:
                  "Commercial framing generated alongside the storyline so pricing and value stay aligned.",
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
