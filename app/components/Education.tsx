"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const education = [
  {
    school: "JCT College of Engineering & Technology",
    degree: "B.E. Computer Science and Engineering",
    grade: "CGPA: 8.3",
    period: "June 2021 – May 2025",
    location: "Tamil Nadu, India",
  },
  {
    school: "St Joseph's Hr. Sec. School",
    degree: "Mathematics, Physics, Chemistry",
    grade: "83%",
    period: "June 2020 – May 2021",
    location: "Tamil Nadu, India",
  },
];

export default function Education({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="education"
      sectionId="education"
      title="education.json"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
        <p className="text-sm font-medium mb-6 terminal-font" style={{ color: "var(--accent-purple)" }}>
          # education
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="p-4 rounded-xl border card-hover"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <div className="text-xs font-medium mb-2 terminal-font" style={{ color: "var(--accent-purple)" }}>
                {edu.period}
              </div>
              <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)", fontSize: "clamp(12px, 2vw, 14px)" }}>
                {edu.school}
              </h4>
              <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{edu.degree}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(191,90,242,0.1)", color: "var(--accent-purple)", border: "1px solid rgba(191,90,242,0.2)" }}
              >
                {edu.grade}
              </span>
              <div className="text-xs mt-2" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>{edu.location}</div>
            </div>
          ))}
        </div>
      </div>
    </MinimizableSection>
  );
}
