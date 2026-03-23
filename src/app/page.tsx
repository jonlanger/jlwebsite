import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden">
        <PageShell className="relative flex min-h-[70vh] flex-col justify-center py-24 md:py-36">
          <div className="flex max-w-4xl flex-col gap-5 md:gap-6">
            <p className="font-heading text-[64px] font-semibold leading-none tracking-tight text-foreground">
              Jon Langer
            </p>
            <p className="font-heading text-[32px] font-light leading-snug tracking-tight text-muted-foreground">
              Design that works at the intersection of people, systems, and
              craft.
            </p>
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              Research-led UX, UI, and industrial design — digital and physical.
              From discovery to shipped experiences, with cross-functional
              teams.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-base")}
            >
              View All Projects
            </Link>
            <Link
              href="/process"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-6 text-base"
              )}
            >
              See process
            </Link>
          </div>
        </PageShell>
      </section>

      <PageShell className="border-t border-border/30 py-24 md:py-32">
        <p className="font-heading max-w-2xl text-2xl font-light leading-snug tracking-tight text-foreground md:text-3xl">
          Portfolio, case studies &amp; projects
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          The following projects are grounded in real-world research and
          experience. Client details and personal information have been adjusted
          for privacy. Every project starts with people — their journeys,
          motivations, and contexts shape the design language, workflows, copy,
          and implementation strategy from the ground up.
        </p>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-12 inline-flex h-11 px-6 text-base"
          )}
        >
          Open projects
        </Link>
      </PageShell>
    </>
  );
}
