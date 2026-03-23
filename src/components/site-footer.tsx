export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-baseline md:justify-between md:px-10 lg:px-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/80">
          Jon Langer
        </p>
        <p className="max-w-md text-sm leading-relaxed md:text-right">
          UI · UX · Industrial design — people, systems, and craft.
        </p>
      </div>
    </footer>
  );
}
