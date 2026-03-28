"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const experiences = [
  {
    role: "Software Development Engineer",
    company: "Think41",
    period: "Nov 2024 – Present",
    location: "Bangalore, India",
    color: "var(--accent)",
    highlights: [
      "Delivered 3+ end-to-end client projects — conversational AI, real-time communication, and full-stack development using Django, FastAPI, LiveKit, Next.js, React, and React Native.",
      "Built production-grade conversational AI systems with STT/TTS, sentiment analysis, inactivity tracking, and dynamic document workflows — reducing manual effort by 50%+.",
      "Implemented scalable auth & communication flows for B2B apps using AWS SNS/SES/S3, Twilio, and JWT-based systems, supporting 20,000+ users.",
      "Led CI/CD, production deployments, and cross-service integrations ensuring 99.9% uptime and data integrity across distributed systems.",
      "Participated in peer code reviews and pair programming to foster continuous team learning.",
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
        {experiences.map((exp) => (
          <div key={exp.role}>
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
