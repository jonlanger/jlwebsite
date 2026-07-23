"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ProjectPasswordModal } from "@/components/project-password-modal";
import {
  isProtectedProject,
  PROJECT_UNLOCK_STORAGE_KEY,
} from "@/lib/protected-projects";

type AccessRequest = {
  onGranted?: () => void;
  onCancel?: () => void;
};

type ProjectUnlockContextValue = {
  unlocked: boolean;
  ready: boolean;
  isProtected: (slug: string) => boolean;
  /** Returns true if access is already granted; otherwise opens the password modal. */
  requestAccess: (options?: AccessRequest) => boolean;
};

const ProjectUnlockContext = createContext<ProjectUnlockContextValue | null>(
  null
);

export function ProjectUnlockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<AccessRequest | null>(null);
  const pendingRef = useRef<AccessRequest | null>(null);

  useLayoutEffect(() => {
    setUnlocked(localStorage.getItem(PROJECT_UNLOCK_STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  const requestAccess = useCallback(
    (options?: AccessRequest) => {
      if (unlocked) {
        options?.onGranted?.();
        return true;
      }
      setPending(options ?? {});
      return false;
    },
    [unlocked]
  );

  const handleUnlock = useCallback(() => {
    localStorage.setItem(PROJECT_UNLOCK_STORAGE_KEY, "1");
    const granted = pendingRef.current?.onGranted;
    setPending(null);
    setUnlocked(true);
    // Defer so navigation runs after unlock state commits.
    queueMicrotask(() => granted?.());
  }, []);

  const handleCancel = useCallback(() => {
    const cancel = pendingRef.current?.onCancel;
    setPending(null);
    cancel?.();
  }, []);

  const value = useMemo(
    () => ({
      unlocked,
      ready,
      isProtected: isProtectedProject,
      requestAccess,
    }),
    [unlocked, ready, requestAccess]
  );

  return (
    <ProjectUnlockContext.Provider value={value}>
      {children}
      <ProjectPasswordModal
        open={pending !== null}
        onUnlock={handleUnlock}
        onCancel={handleCancel}
      />
    </ProjectUnlockContext.Provider>
  );
}

export function useProjectUnlock() {
  const ctx = useContext(ProjectUnlockContext);
  if (!ctx) {
    throw new Error(
      "useProjectUnlock must be used within ProjectUnlockProvider"
    );
  }
  return ctx;
}
