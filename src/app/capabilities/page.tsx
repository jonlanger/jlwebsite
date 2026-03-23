import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Skills, tools, and ways of working — from research to strategy to implementation.",
};

const categories = [
  {
    title: "Design",
    items:
      "Sketching & Ideation · Storyboarding & Journey Mapping · Personas · UX Design · Industrial Design · Interface Design · Design Systems (Creation, Management & Optimization) · Brand Development · Digital & Physical Prototyping · Wireframing · Generative AI · Storybook Documentation",
  },
  {
    title: "Research",
    items:
      "Customer Segmentation · User Research Interviews & Exercises · Survey Design & Analysis · Ethnography & Cultural Discovery · Pilot Testing & Research Coordination · Industry Analysis · Benchmarking · Market & Trend Research · Innovation Analysis · Information Architecture",
  },
  {
    title: "Tools",
    items:
      "Figma (Wireframing, Prototyping, Detailed Design) · Cursor · VS Code · Claude · Adobe Creative Suite · Keyshot · Blender · Unity · InVision · Sketch · Procreate · Fusion 360 · Rhino · Arduino · SolidWorks · Onshape · Webflow · PowerPoint · Keynote",
  },
  {
    title: "Strategy",
    items:
      "Business Creation · Design Strategy · Customer Experience · Systems Consulting · Manufacturing & Production Support · Technology Advising · Product Roadmapping · Content Management",
  },
] as const;

const waysOfWorking =
  "Agile Methodologies · Cross-Functional Team Leadership · Hackathon Facilitation · Presentation & Communication" as const;

export default function CapabilitiesPage() {
  return (
    <PageShell>
      <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
        Skills &amp; process
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        From deep ethnographic research with frontline stakeholders to
        fast-paced iteration with engineering teams — design work is always
        collaborative, always within real timelines, and always in service of a
        clear product strategy.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {categories.map((cat) => (
          <Card key={cat.title} className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold">
                {cat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                {cat.items}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-16 bg-border/80" />

      <section>
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Ways of working
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {waysOfWorking}
        </p>
      </section>
    </PageShell>
  );
}
