"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TextSizeControl } from "@/components/text-size-control";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/capabilities", label: "Capabilities" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-transparent">
        <div className="relative mx-auto max-w-6xl min-h-[6.25rem] py-6 md:min-h-[6.75rem] md:py-8">
          <div className="absolute left-6 top-6 right-auto bottom-auto z-10 flex w-fit max-w-[calc(100%-3rem)] shrink items-center gap-3 rounded-3xl bg-background/95 p-3 pr-[calc(0.75rem+8px)] backdrop-blur-sm md:left-10 md:max-w-[calc(100%-5rem)] md:gap-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-transparent text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X className="size-6" strokeWidth={1.5} aria-hidden />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} aria-hidden />
              )}
            </button>
            <div className="min-w-0 shrink">
              <SiteBreadcrumb />
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-[2px] transition-opacity duration-200"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id="site-nav"
        aria-label="Primary"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100vw,22rem)] flex-col border-r border-border/40 bg-background transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "pointer-events-none -translate-x-full"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col justify-center gap-1 px-10 pb-8 pt-28">
            {nav.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "font-heading py-2 text-3xl font-light tracking-tight transition-colors md:text-4xl",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col gap-4 px-10 py-8">
            <Separator className="bg-border/60" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Settings
            </p>
            <div className="flex items-center">
              <ThemeToggle className="size-10 shrink-0 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80" />
            </div>
            <TextSizeControl />
          </div>
        </div>
      </nav>
    </>
  );
}
