import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "careshift",
  category: "software",
  title: "Careshift",
  description:
    "A 90-second shift-handoff ritual for caregivers, grounded in clinical handoff research — what changed, what's due, then ready, with a safety gate that keeps a flagged incident from getting rushed past.",
  image: "/projects/careshift/careshift_card.png",
  alt: "Careshift Today dashboard with a caregiver greeting, an up-next brief, and a needs-attention delta card.",
  width: 1280,
  height: 720,
  liveUrl: "https://careshift-gold.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Home-care handoffs happen between people who may never meet. An outgoing caregiver's shift and an incoming caregiver's shift overlap for a few minutes on a good day, and not at all on a bad one — so whatever gets communicated is whatever the outgoing person remembers to say, texts, or leaves on a Post-it. The part that matters most, a fall risk or a new medication reaction, competes for attention with routine notes and often loses.",
      "Careshift is a caregiver handoff ritual built around that failure mode: a 90-second brief — who you're covering, what changed, what's due now, then a note — with a review gate that won't let a caregiver click past a flagged incident unread. It's a solo product-design build validated against clinical handoff research rather than assumption, with a running design-decision log kept as the source material for this case study.",
    ],
    role: "Lead Designer — product design, interaction design, and engineering (solo build)",
    scope:
      "Caregiver web app prototype: the brief ritual, caseload and patient records, shift scheduling and coordination, and a severity-gated review flow — built and validated against handoff-failure research as it went.",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Most home-care coordination isn't a system at all — it's informal caregivers relaying what they remember, if they remember, to whoever shows up next. Documented failure modes back this up: omitted care tasks and missing next-step guidance are common, and \"lost in transition\" is a named problem specifically in home care, distinct from hospital handoffs which at least have a shared chart.",
        "Careshift's job is to compress a handoff into something short enough that a caregiver, phone in hand and attention interrupted, will actually complete it — without quietly dropping the one detail that mattered. That meant checking the product's structure against how real clinical handoffs are supposed to work before building further, not just designing from intuition about a domain neither of us works in day to day.",
      ],
      figures: [
        {
          afterParagraphIndex: 1,
          src: "/projects/careshift/diagram-sbar.png",
          alt: "Diagram mapping Careshift's four brief steps — Covering, Changes, Due now, Note — onto the SBAR clinical handoff framework, with handoff-failure research stats below.",
          width: 1600,
          height: 1000,
        },
      ],
      topicGroups: [
        {
          title: "Why handoffs fail",
          items: [
            {
              title: "Undocumented by default",
              body: "Informal caregivers rarely share a structured record between shifts — the chart is a memory, if it exists at all.",
            },
            {
              title: "Incidents get buried",
              body: "A flagged fall or mood change sitting inside a wall of narrative notes is easy to skim past under time pressure.",
            },
            {
              title: "Display without authoring",
              body: "An app that only ever shows changes still leaves no way for the person noticing something new to record it.",
            },
          ],
        },
        {
          title: "Design constraints",
          items: [
            {
              title: "Phone-in-hand, interrupted",
              body: "Built for a caregiver with one hand often occupied and a few seconds of attention, not a desk-bound planning session.",
            },
            {
              title: "Safety before completeness",
              body: "Gate on what's dangerous to miss, not on logging everything — friction has to earn its place.",
            },
            {
              title: "One ritual, two settings",
              body: "The same four-step brief adapts its language for a home visit or a facility shift instead of forking into two products.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "90 sec",
          label: "Target brief time",
          detail: "Who you're covering, what changed, what's due, then done.",
        },
        {
          value: "SBAR",
          label: "Framework grounding",
          detail: "Independently confirmed against clinical handoff research, not assumed.",
        },
        {
          value: "2",
          label: "Care settings",
          detail: "Home visits and facility shifts share one ritual and data model.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "Before building further, the existing roadmap got checked against real handoff research: SBAR (Situation, Background, Assessment, Recommendation) turned out to already match Careshift's four-step brief closely — Covering, Changes, Due now, Note — which validated the existing shape instead of calling for a rebuild.",
        "That research also surfaced a real gap. Documentation is expected at both ends of a shift, an outgoing report as well as an incoming brief, but Careshift only had the incoming half — there was no way for a caregiver to log a new observation anywhere in the app. That became the \"Log observation\" authoring flow, reusing the existing Delta model rather than inventing a parallel \"report\" type, so a manually logged observation behaves identically everywhere a delta already appears. The same research pass flagged the missing SBAR \"Recommendation\" — a structured field for what the next caregiver should actually do about a flagged item — as an evidence-backed gap, not just a nice-to-have; it shipped as an optional field surfaced as a distinct callout wherever a delta appears.",
        "The other approach decision was where to spend friction. A review counter already existed on the \"What changed\" step but didn't enforce anything — a caregiver could click through a fall incident with zero items reviewed, confirmed live in the browser before it got fixed. The gate now disables Continue only while an attention-severity delta is unacknowledged; watch and note items stay skippable, so the safety-critical case is covered without slowing down every routine shift in proportion to how much gets logged.",
      ],
      figures: [
        {
          afterParagraphIndex: 2,
          src: "/projects/careshift/diagram-closed-loop.png",
          alt: "Before/after diagram: display-only deltas with an unenforced review counter, versus a Log Observation authoring flow and a severity-gated brief step.",
          width: 1600,
          height: 1000,
        },
      ],
      topicGroups: [
        {
          title: "What shipped from that research",
          items: [
            {
              title: "Log an observation",
              body: "Category, severity, a short narrative, optional detail, and a recommended action — author and timestamp captured automatically.",
            },
            {
              title: "Severity-gated review",
              body: "Continue is disabled while a NEEDS ATTENTION delta is unreviewed; watch and note items don't block the brief.",
            },
            {
              title: "Schedule at real scale",
              body: "A patient filter and reveal-on-interact reschedule controls once a day holds sixteen items across five patients, not a three-item demo case.",
            },
            {
              title: "Demo vs. real accounts",
              body: "The session model splits into demo and account modes so a signed-in caregiver never sees the demo caregiver's name or a demo-only call to action.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The prototype runs from the marketing home into a demo sign-in, the Today dashboard, caseload and patient records, shift coordination, and the four-step brief ritual. Screens below are from the local build; the ritual is designed phone-first, so a mobile pass is included alongside the desktop flow.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/careshift/product-home.png",
            alt: "Careshift marketing home with the headline 'Know what changed before you begin' beside a live brief preview.",
            width: 1800,
            height: 1125,
            title: "Marketing home",
            caption:
              "\"A ritual, not a platform\" — the hero pairs the positioning with a live preview of the brief itself.",
          },
          {
            src: "/projects/careshift/product-sign-in.png",
            alt: "Careshift sign-in screen with email and password fields and a Continue as demo button.",
            width: 1800,
            height: 1125,
            title: "Sign in",
            caption:
              "Real accounts and a no-signup demo mode are both first-class — demo content never leaks the wrong name into a real session.",
          },
          {
            src: "/projects/careshift/product-today.png",
            alt: "Today dashboard with an up-next brief for Maggie, a needs-attention delta card, today's shifts, and a coordinate-shifts prompt.",
            width: 1800,
            height: 1125,
            title: "Today dashboard",
            caption:
              "Up next, what changed, today's shifts, and coordination needs in one glance — the day's starting point.",
          },
          {
            src: "/projects/careshift/product-patients.png",
            alt: "Patients caseload grid with filter chips and needs-attention badges for Maggie, Helen, Art, and Rosa.",
            width: 1800,
            height: 1125,
            title: "Caseload",
            caption:
              "Everyone covered in one filterable list, sorted by who still needs a brief and who needs attention.",
          },
          {
            src: "/projects/careshift/product-patient-detail.png",
            alt: "Maggie's patient record with what-changed deltas, care team contacts, and care preferences.",
            width: 1800,
            height: 1125,
            title: "Patient record",
            caption:
              "Full history, care team, and preferences that travel with every handoff — plus the entry point to log a new observation.",
          },
          {
            src: "/projects/careshift/product-log-observation.png",
            alt: "Log an observation dialog with category, severity, what happened, more detail, and a recommended action field.",
            width: 1800,
            height: 1125,
            title: "Log an observation",
            caption:
              "The authoring flow that closes the handoff loop — including the Recommendation field that closes SBAR's fourth step.",
          },
          {
            src: "/projects/careshift/product-schedule.png",
            alt: "Schedule page for Friday, July 31 with a patient filter chip row and due-now medication and task cards.",
            width: 1800,
            height: 1125,
            title: "Schedule",
            caption:
              "Meds, tasks, and visits by day, filterable by patient once the list gets long — edits write straight into What changed.",
          },
          {
            src: "/projects/careshift/product-shifts.png",
            alt: "Coordinate shifts page with your-shifts count, open count, swap-requested count, and shift cards with Start brief and Request swap actions.",
            width: 1800,
            height: 1125,
            title: "Coordinate shifts",
            caption:
              "See who has which shift, claim what's open, and flag a swap before anything goes uncovered.",
          },
          {
            src: "/projects/careshift/product-brief-covering.png",
            alt: "Brief step 1 of 4, who you're covering, showing Maggie's shift start time and last handoff.",
            width: 1800,
            height: 1125,
            title: "Brief · Covering",
            caption:
              "Step 1 of 4 — the person, the setting, and when the last handoff happened, before anything else.",
          },
          {
            src: "/projects/careshift/product-brief-changes-gated.png",
            alt: "Brief step 2, what changed, with the Continue button disabled and a prompt to review the needs-attention item first.",
            width: 1800,
            height: 1125,
            title: "Brief · Changes (gated)",
            caption:
              "The safety gate: Continue stays disabled until the NEEDS ATTENTION incident is explicitly reviewed.",
          },
          {
            src: "/projects/careshift/product-brief-changes-reviewed.png",
            alt: "Brief step 2 after the needs-attention item is marked reviewed, with the gate lifted and Continue enabled.",
            width: 1800,
            height: 1125,
            title: "Brief · Changes (reviewed)",
            caption:
              "One tap marks the item reviewed with author and timestamp, and the gate lifts — no extra friction once it's read.",
          },
          {
            src: "/projects/careshift/product-brief-due.png",
            alt: "Brief step 3, due now, listing medication and task cards due within the next three hours.",
            width: 1800,
            height: 1125,
            title: "Brief · Due now",
            caption:
              "What's due in the next window, with absolute and relative times, so nothing slips through the shift start.",
          },
          {
            src: "/projects/careshift/product-brief-note.png",
            alt: "Brief step 4, note and done, with an optional short note field for the next caregiver.",
            width: 1800,
            height: 1125,
            title: "Brief · Note & done",
            caption:
              "One optional note for the next person — deliberately skippable so it never becomes a second gate.",
          },
          {
            src: "/projects/careshift/product-brief-complete.png",
            alt: "Brief complete confirmation screen with Back to today and Review brief actions.",
            width: 1800,
            height: 1125,
            title: "Brief complete",
            caption:
              "Confirmation, not just a redirect — the caregiver knows the ritual is done and they're ready for the shift.",
          },
        ],
        accordion: [
          {
            value: "full-page",
            title: "Full page",
            description: "The complete marketing homepage from the live build.",
            slides: [
              {
                src: "/projects/careshift/product-home-full.png",
                alt: "Full Careshift homepage scroll from hero through the ritual steps and the beyond-the-brief capability grid.",
                width: 1800,
                height: 3211,
                title: "Homepage (full)",
                caption:
                  "Hero, the four-step ritual explained, and everything beyond the brief — caseload, coordination, home or facility.",
              },
            ],
          },
          {
            value: "mobile-ritual",
            title: "Mobile ritual",
            description:
              "The brief is designed phone-first — bottom tab nav and single-column cards on a real mobile viewport.",
            slides: [
              {
                src: "/projects/careshift/product-mobile-today.png",
                alt: "Mobile Today dashboard with bottom tab navigation and a stacked what-changed card.",
                width: 900,
                height: 1947,
                title: "Today (mobile)",
                caption:
                  "Bottom tab bar and single-column cards — the layout a caregiver actually opens mid-shift.",
              },
              {
                src: "/projects/careshift/product-mobile-brief-changes.png",
                alt: "Mobile brief What changed step with the same review gate as desktop.",
                width: 900,
                height: 1947,
                title: "Brief · Changes (mobile)",
                caption:
                  "Same safety gate, same data — the ritual doesn't get a simplified, less-safe version on the small screen.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Careshift closes at prototype stage as a caregiver handoff ritual grounded in clinical handoff research rather than assumption — a working safety gate that stops a flagged incident from being rushed past, and a closed authoring loop so observations can be logged as well as displayed. Every non-obvious decision along the way is on record in a design-decision log written as it happened: problem, decision, why, and the trade-off considered.",
      ],
      stats: [
        {
          value: "4",
          label: "Brief steps",
          detail: "Covering, changes, due now, note — mapped onto SBAR.",
        },
        {
          value: "Evidence-based",
          label: "Research-grounded",
          detail: "SBAR, AHRQ TeamSTEPPS, and home-care coordination studies.",
        },
        {
          value: "Closed-loop",
          label: "Authoring + display",
          detail: "Caregivers can log a new observation, not just read past ones.",
        },
        {
          value: "Solo",
          label: "Design-led build",
          detail: "Product, interaction, and engineering.",
        },
      ],
    },
  ],
};
