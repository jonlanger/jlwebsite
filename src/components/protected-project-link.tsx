"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useProjectUnlock } from "@/components/project-unlock-provider";

/**
 * Link that gates a password-protected case study behind the unlock modal.
 *
 * Split out of the projects grid so the grid itself can stay a server
 * component -- only the 12 protected cards ship any JS.
 */
export function ProtectedProjectLink({
  slug,
  href,
  className,
  "aria-label": ariaLabel,
  children,
}: {
  slug: string;
  href: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { unlocked, isProtected, requestAccess } = useProjectUnlock();
  const [awaitingUnlock, setAwaitingUnlock] = useState(false);

  useEffect(() => {
    if (!awaitingUnlock || !unlocked) return;
    setAwaitingUnlock(false);
    router.push(href);
  }, [awaitingUnlock, unlocked, href, router]);

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        if (!isProtected(slug) || unlocked) return;
        event.preventDefault();
        setAwaitingUnlock(true);
        requestAccess({ onCancel: () => setAwaitingUnlock(false) });
      }}
    >
      {children}
    </Link>
  );
}
