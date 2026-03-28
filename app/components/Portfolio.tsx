"use client";

import { useSections, SectionId } from "./SectionsContext";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Desktop from "./Desktop";
import ShelbyTerminal from "./ShelbyTerminal";

function Section({
  id,
  children,
}: {
  id: SectionId;
  children: (props: { isMinimized: boolean; onMinimize: () => void; onRestore: () => void }) => React.ReactNode;
}) {
  const { minimized, minimize, restore } = useSections();
  const isMinimized = minimized.has(id);
  return (
    <>
      {children({
        isMinimized,
        onMinimize: () => minimize(id),
        onRestore: () => restore(id),
      })}
    </>
  );
}

export default function Portfolio() {
  const { allMinimized, restoreAll } = useSections();

  return (
    <>
      {allMinimized && <Desktop onOpen={restoreAll} />}

      <div style={{ visibility: allMinimized ? "hidden" : "visible" }}>
        <Section id="hero">
          {(props) => <Hero {...props} />}
        </Section>
        <Section id="about">
          {(props) => <About {...props} />}
        </Section>
        <Section id="experience">
          {(props) => <Experience {...props} />}
        </Section>
        <Section id="skills">
          {(props) => <Skills {...props} />}
        </Section>
        <Section id="projects">
          {(props) => <Projects {...props} />}
        </Section>
        <Section id="contact">
          {(props) => <Contact {...props} />}
        </Section>

        {/* Footer */}
        <footer style={{ padding: "32px 24px", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="terminal-font text-xs" style={{ color: "var(--text-secondary)" }}>
              © 2025 Sherbin S
            </span>
            <span className="terminal-font text-xs" style={{ color: "var(--text-secondary)" }}>
              Made in <span style={{ color: "var(--accent)" }}>Bangalore</span> 🇮🇳
            </span>
          </div>
        </footer>

        <ShelbyTerminal />
      </div>
    </>
  );
}
