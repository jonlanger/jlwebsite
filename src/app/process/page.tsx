import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discover, explore, test, refine, listen, repeat — a user-centered process that stays in motion.",
};

const phases = [
  {
    title: "Discover",
    objective: "Understand the problem space, user needs, and business goals.",
    body:
      "Research is how good design starts. This means user interviews, surveys, ethnographic studies, stakeholder conversations, market analysis, and competitive review. The output is concrete: personas, journey maps, problem statements, and research insights. The goal isn't to confirm what you think you know — it's to find what you don't.",
  },
  {
    title: "Explore",
    objective: "Generate ideas and potential solutions.",
    body:
      "With a clear problem space, the work opens up. Brainstorming, sketching, wireframes, and low-fidelity prototypes are all in play. Techniques like Crazy Eights and mind mapping help expand the solution space before narrowing. The output is a set of early concepts and user flow diagrams that can be tested and pressure-tested.",
  },
  {
    title: "Test",
    objective: "Validate design concepts and assumptions with real users.",
    body:
      "Moderated and unmoderated usability testing, A/B testing, feedback sessions, and heuristic evaluations. Both qualitative and quantitative methods matter here — pain points, usability issues, and performance metrics together give a full picture. The output is a clear-eyed read on what's working and what needs to change.",
  },
  {
    title: "Refine",
    objective: "Improve the design based on what testing reveals.",
    body:
      "This is where the detail work happens — iterating on wireframes and prototypes, sharpening interaction design, and bringing visual design up to spec. Changes are prioritized by impact and feasibility. The output is updated high-fidelity prototypes and design specifications ready for the next round of validation.",
  },
  {
    title: "Listen",
    objective: "Continuously gather feedback from users and stakeholders.",
    body:
      "Launching isn't finishing. Monitoring user behavior, running surveys and analytics, and conducting regular user interviews keeps the design grounded in reality over time. Good feedback channels — in-app tools, user forums, direct outreach — make this ongoing rather than episodic.",
  },
  {
    title: "Repeat",
    objective: "Ensure the design evolves with changing needs and goals.",
    body:
      "Products that stay static fall behind. Revisiting earlier phases based on new insights, market shifts, or evolving user needs is how a design stays relevant. Regular design reviews and scheduled iterations keep the product aligned with the people using it.",
  },
] as const;

export default function ProcessPage() {
  return (
    <PageShell>
      <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
        Discover. Explore. Test. Refine. Listen. Repeat.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        A user-centered process that stays in motion. Each phase builds on the
        last — and the cycle never fully closes, because good design keeps
        evolving with the people who use it.
      </p>

      <div className="mt-14 space-y-6">
        {phases.map((phase, index) => (
          <Card key={phase.title} className="border-border/80 bg-card/80">
            <CardHeader className="border-b border-border/60 pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Phase {index + 1}
              </p>
              <CardTitle className="font-heading mt-2 text-2xl font-bold">
                {phase.title}
              </CardTitle>
              <p className="text-base font-semibold text-foreground">
                {phase.objective}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {phase.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
