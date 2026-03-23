"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type TextScale = 0 | 1 | 2;

const STORAGE_KEY = "jl-text-scale";

const SCALE_FONT: Record<TextScale, string> = {
  0: "100%",
  1: "118%",
  2: "136%",
};

type TextScaleContextValue = {
  scale: TextScale;
  setScale: (s: TextScale) => void;
};

const TextScaleContext = createContext<TextScaleContextValue | null>(null);

export function TextScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScaleState] = useState<TextScale>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "1" || raw === "2") {
      setScaleState(Number(raw) as TextScale);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.style.fontSize = SCALE_FONT[scale];
    localStorage.setItem(STORAGE_KEY, String(scale));
  }, [scale, ready]);

  const setScale = useCallback((s: TextScale) => {
    setScaleState(s);
  }, []);

  const value = useMemo(
    () => ({ scale, setScale }),
    [scale, setScale]
  );

  return (
    <TextScaleContext.Provider value={value}>
      {children}
    </TextScaleContext.Provider>
  );
}

export function useTextScale() {
  const ctx = useContext(TextScaleContext);
  if (!ctx) {
    throw new Error("useTextScale must be used within TextScaleProvider");
  }
  return ctx;
}
