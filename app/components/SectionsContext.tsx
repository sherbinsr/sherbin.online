"use client";

import { createContext, useContext, useState } from "react";

export const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

interface SectionsCtx {
  minimized: Set<SectionId>;
  minimize: (id: SectionId) => void;
  restore: (id: SectionId) => void;
  restoreAll: () => void;
  allMinimized: boolean;
}

const Ctx = createContext<SectionsCtx>({
  minimized: new Set(),
  minimize: () => {},
  restore: () => {},
  restoreAll: () => {},
  allMinimized: false,
});

export function SectionsProvider({ children }: { children: React.ReactNode }) {
  const [minimized, setMinimized] = useState<Set<SectionId>>(new Set());

  const minimize = (id: SectionId) =>
    setMinimized((prev) => new Set([...prev, id]));

  const restore = (id: SectionId) =>
    setMinimized((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const restoreAll = () => setMinimized(new Set());

  const allMinimized = minimized.size === SECTION_IDS.length;

  return (
    <Ctx.Provider value={{ minimized, minimize, restore, restoreAll, allMinimized }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSections() {
  return useContext(Ctx);
}
