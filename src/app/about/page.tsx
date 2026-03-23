import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Jon Langer approaches design, collaboration, and craft across UI, UX, and industrial design.",
};

const experience = [
  "Markforged",
  "Accenture",
  "Altitude Inc",
  "Origin Product Development",
  "3M",
  "Siemens Healthcare & Diagnostics",
  "Bruvida",
  "Folditure",
  "BCG",
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
        People, process, and craft
      </h1>

      <div className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Design draws me in because it refuses to stay in one lane. It lives
          at the intersection of people, process, art, business, and technology
          — and making something real always takes a village. That collaborative
          energy, whether in a room or across time zones, is what I find most
          energizing.
        </p>
        <p>
          I stay close to how technology, trends, and practice are evolving —
          not out of obligation, but because I genuinely find it interesting.
          That curiosity feeds into the quality of the work and the
          thoughtfulness of the process.
        </p>
        <p>
          Over my career I&apos;ve contributed to strategic initiatives, design
          research, UI/UX/ID concept development, and implementation
          collaboration across complex cross-functional teams. I care as much
          about how work gets made as what gets made.
        </p>
        <p>
          I&apos;m drawn to the tension between simplicity and complexity — the
          clean geometry of modern and contemporary aesthetics on one side, the
          dense ornamentation of Rococo and the whiplash curves of Art Nouveau
          on the other. That tension shows up in the work.
        </p>
      </div>

      <Separator className="my-16 bg-border/80" />

      <section>
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Collaboration
        </h2>
        <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Over the past decade, I&apos;ve worked on projects that have shaped
            the experiences of engineers, consumers, field operators, aerospace
            and defense personnel, surgical staff, IT managers, chemists,
            manufacturing site managers, and many more. Co-creating tools that
            genuinely improve someone&apos;s day-to-day is what keeps me
            motivated.
          </p>
          <p>
            The best work happens through deep collaboration — tight feedback
            loops, shared ownership, and honest iteration. I try to hold the
            balance between desirability, feasibility, and viability: designs
            that people want to use, that can actually be built, and that make
            sense for the business.
          </p>
        </div>
      </section>

      <Separator className="my-16 bg-border/80" />

      <section>
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Experience
        </h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {experience.map((name) => (
            <li
              key={name}
              className="rounded-full border border-border/80 bg-secondary/50 px-4 py-2 text-sm font-semibold text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
