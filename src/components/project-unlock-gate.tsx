"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useProjectUnlock } from "@/components/project-unlock-provider";

export function ProjectUnlockGate({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { unlocked, ready, isProtected, requestAccess } = useProjectUnlock();
  const protectedSlug = isProtected(slug);
  const locked = protectedSlug && !unlocked;

  useEffect(() => {
    if (!ready || !locked) return;
    requestAccess({
      onCancel: () => router.push("/projects"),
    });
  }, [ready, locked, requestAccess, router]);

  if (!protectedSlug) return children;

  if (!ready || locked) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center" aria-busy={!ready}>
        <p className="font-heading text-xl font-semibold tracking-tight">
          Private case study
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {ready
            ? "Client and internal work stays behind access shared directly. If connected through an application or conversation, email or message for the password."
            : "Checking access…"}
        </p>
      </div>
    );
  }

  return children;
}
