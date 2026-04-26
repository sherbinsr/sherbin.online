"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const experiences = [
  {
    role: "Software Development Engineer I",
    company: "Think41",
    period: "Jun 2025 – Present",
    location: "Bangalore, India",
    color: "var(--accent)",
    highlights: [
      "Worked in a 2-member engineering team to build a conversational AI platform for Magical Nest, enabling users to design custom floor plans interactively — contributing to ₹4.12 crore pre-seed funding at a ₹60 crore valuation (Mar 2026).",
      "Built and productionized a B2B mobile application using React Native for Entero Healthcare Solutions (BSE & NSE listed), supporting order management, inventory tracking, and distribution workflows across 79,400+ pharmacies and 3,300+ hospitals in 500+ districts.",
      "Diagnosed and resolved critical issues across conversational AI pipelines, implemented security enhancements, and published a dealer-facing mobile app for Vyngo (Bhoruka Auto Tech), an AI-driven marketplace for commercial vehicles.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Think41",
    period: "Nov 2024 – May 2025",
    location: "Bangalore, India",
    color: "var(--accent-green)",
    highlights: [
      "Built a live conversational voice AI platform using LiveKit, Deepgram, and ElevenLabs, enabling real-time multi-agent collaboration and improving resolution speed; developed a POC that contributed to onboarding JPMorgan Chase (JPMC) as a client.",
      "Prototyped a conversational AI floor plan design system for Magical Nest, later converted into a paid client and contributing to its funding round.",
    ],
  },
];

export default function Experience({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="experience"
      sectionId="experience"
      title="experience.json"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
        <p className="text-sm font-medium mb-6 terminal-font" style={{ color: "var(--accent)" }}>
          # work_experience
        </p>
        {experiences.map((exp, idx) => (
          <div key={exp.role} style={idx > 0 ? { marginTop: "clamp(24px, 5vw, 36px)", paddingTop: "clamp(24px, 5vw, 36px)", borderTop: "1px solid var(--border)" } : {}}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
              <div className="min-w-0">
                <h3
                  className="font-bold leading-snug"
                  style={{ color: "var(--text-primary)", fontSize: "clamp(15px, 3vw, 18px)" }}
                >
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  <span className="font-semibold text-sm" style={{ color: exp.color }}>{exp.company}</span>
                  <span style={{ color: "var(--border)" }}>·</span>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{exp.location}</span>
                </div>
              </div>
              <span
                className="self-start px-3 py-1 rounded-full text-xs font-medium terminal-font whitespace-nowrap flex-shrink-0"
                style={{ background: "rgba(0,216,255,0.1)", color: "var(--accent)", border: "1px solid rgba(0,216,255,0.2)" }}
              >
                {exp.period}
              </span>
            </div>
            <ul className="space-y-3">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex gap-2" style={{ color: "var(--text-secondary)", fontSize: "clamp(12px, 2vw, 14px)", lineHeight: "1.7" }}>
                  <span style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }}>▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MinimizableSection>
  );
}
