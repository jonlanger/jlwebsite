import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { buttonVariants } from "@/lib/button-variants";
import { contentColumnClass } from "@/lib/content-layout";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden">
        <PageShell className="relative flex min-h-[70vh] flex-col justify-center py-24 md:py-36">
          <div className={cn(contentColumnClass, "gap-5 md:gap-6")}>
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
            <div className="mt-3 flex flex-wrap justify-start gap-4 md:mt-4">
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 px-6 text-base"
                )}
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
          </div>
        </PageShell>
      </section>

      <PageShell className="border-t border-border/30 py-24 md:py-32">
        <div className={contentColumnClass}>
          <p className="font-heading text-2xl font-light leading-snug tracking-tight text-foreground md:text-3xl">
            Get in touch
          </p>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Open to conversations about product design, research, and building
            things that ship.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="mailto:jlanger1@gmail.com"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 px-6 text-base"
              )}
            >
              jlanger1@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/jonlanger/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-6 text-base"
              )}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </PageShell>
    </>
  );
}
