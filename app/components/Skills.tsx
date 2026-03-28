"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const skillGroups = [
  {
    category: "Languages",
    icon: "< >",
    color: "var(--accent)",
    skills: ["Java", "Python", "C", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "{ }",
    color: "var(--accent-green)",
    skills: ["Langchain", "LiveKit", "PipeCat", "FastAPI", "Django", "Spring Boot", "React Native", "React", "Next.js", "Angular", "Bootstrap", "Celery"],
  },
  {
    category: "Tools & Technologies",
    icon: "⚙",
    color: "var(--accent-purple)",
    skills: ["Git & GitHub", "Docker", "AWS", "GCP", "Redis", "n8n", "Jira", "Twilio", "Zoko", "Figma", "Postman", "Claude"],
  },
  {
    category: "Databases",
    icon: "🗄",
    color: "var(--accent-orange)",
    skills: ["MySQL", "PostgreSQL", "VectorDB"],
  },
  {
    category: "Paradigms",
    icon: "⬡",
    color: "var(--accent)",
    skills: ["OOP", "Functional Programming", "REST API", "Microservices", "CI/CD"],
  },
  {
    category: "Platforms",
    icon: "⊞",
    color: "var(--accent-green)",
    skills: ["Linux (Ubuntu)", "macOS", "Windows"],
  },
];

export default function Skills({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="skills"
      sectionId="skills"
      title="skills.config"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "40px", background: "var(--terminal-bg)" }}>
        <p className="text-sm font-medium mb-8 terminal-font" style={{ color: "var(--accent)" }}>
          # skills & technologies
        </p>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-xl border card-hover"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="terminal-font text-lg" style={{ color: group.color }}>{group.icon}</span>
                <span className="font-semibold text-sm" style={{ color: group.color }}>{group.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-medium terminal-font"
                    style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MinimizableSection>
  );
}
