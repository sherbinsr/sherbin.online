"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Desktop from "./Desktop";
import ShelbyTerminal from "./ShelbyTerminal";
import Navbar from "./Navbar";

type SectionId = "about" | "experience" | "education" | "skills" | "projects" | "contact";

const SECTIONS: Record<SectionId, React.ComponentType<{ isMinimized?: boolean; onMinimize?: () => void; onRestore?: () => void }>> = {
  about: About,
  experience: Experience,
  education: Education,
  skills: Skills,
  projects: Projects,
  contact: Contact,
};

// Staggered initial offsets so windows don't stack perfectly
const OFFSETS: Record<SectionId, { x: number; y: number }> = {
  about:      { x: 0,   y: 0  },
  experience: { x: 24,  y: 24 },
  education:  { x: -24, y: 16 },
  skills:     { x: 16,  y: 32 },
  projects:   { x: -16, y: 8  },
  contact:    { x: 8,   y: 20 },
};

const MAC_TITLEBAR_HEIGHT = 40;

function DraggableWindow({
  id,
  zIndex,
  onClose,
  onFocus,
}: {
  id: SectionId;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}) {
  const Comp = SECTIONS[id];
  const dragControls = useDragControls();
  const off = OFFSETS[id];

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.95, x: off.x, y: off.y }}
      animate={{ opacity: 1, scale: 1, x: off.x, y: off.y }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseDown={onFocus}
      style={{
        position: "fixed",
        top: "72px",
        left: "50%",
        marginLeft: "min(-32rem, -45vw)",
        width: "min(64rem, calc(100vw - 24px))",
        zIndex,
      }}
    >
      {/* Drag handle — sits over the mac titlebar, leaves left 90px free for traffic lights */}
      <div
        onPointerDown={(e) => { onFocus(); dragControls.start(e); }}
        style={{
          position: "absolute",
          top: 0,
          left: "90px",
          right: 0,
          height: `${MAC_TITLEBAR_HEIGHT}px`,
          zIndex: 2,
          cursor: "grab",
        }}
      />

      {/* Scrollable content */}
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto", borderRadius: "12px" }}>
        <Comp isMinimized={false} onMinimize={onClose} onRestore={onClose} />
      </div>
    </motion.div>
  );
}

function DraggableHero({ onMinimize, onFocus, zIndex }: { onMinimize: () => void; onFocus: () => void; zIndex: number }) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "min(64rem, calc(100vw - 24px))",
        zIndex,
      }}
    >
      {/* Drag handle over titlebar */}
      <div
        onPointerDown={(e) => { onFocus(); dragControls.start(e); }}
        style={{
          position: "absolute",
          top: 0,
          left: "90px",
          right: 0,
          height: `${MAC_TITLEBAR_HEIGHT}px`,
          zIndex: 2,
          cursor: "grab",
        }}
      />
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto", borderRadius: "12px" }}>
        <Hero isMinimized={false} onMinimize={onMinimize} />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [openSections, setOpenSections] = useState<SectionId[]>([]);
  const [zOrder, setZOrder] = useState<string[]>(["hero"]);
  const [desktopMode, setDesktopMode] = useState(false);

  const bringToFront = useCallback((id: string) => {
    setZOrder((prev) => [...prev.filter((s) => s !== id), id]);
  }, []);

  const openSection = useCallback((id: SectionId) => {
    setOpenSections((prev) => prev.includes(id) ? prev : [...prev, id]);
    bringToFront(id);
  }, [bringToFront]);

  const closeSection = useCallback((id: SectionId) => {
    setOpenSections((prev) => prev.filter((s) => s !== id));
    setZOrder((prev) => prev.filter((s) => s !== id));
  }, []);

  const getZ = (id: string) => 50 + zOrder.indexOf(id);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail as SectionId;
      if (id) openSection(id);
    };
    window.addEventListener("open-section", handler);
    return () => window.removeEventListener("open-section", handler);
  }, [openSection]);

  return (
    <>
      {desktopMode && <Desktop onOpen={() => setDesktopMode(false)} />}

      <div style={{ visibility: desktopMode ? "hidden" : "visible" }}>
        {/* Full-page background */}
        <div className="grid-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background: "radial-gradient(circle at 50% 40%, rgba(0,216,255,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <Navbar
          openSections={openSections}
          onNav={(id) => openSection(id as SectionId)}
          onDesktop={() => setDesktopMode(true)}
        />

        {/* Hero as draggable window */}
        <DraggableHero
          zIndex={getZ("hero")}
          onFocus={() => bringToFront("hero")}
          onMinimize={() => setDesktopMode(true)}
        />

        <AnimatePresence>
          {openSections.map((id) => (
            <DraggableWindow
              key={id}
              id={id}
              zIndex={getZ(id)}
              onClose={() => closeSection(id)}
              onFocus={() => bringToFront(id)}
            />
          ))}
        </AnimatePresence>

        <ShelbyTerminal />
      </div>
    </>
  );
}
