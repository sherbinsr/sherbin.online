"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const projects = [
  {
    name: "JoinX Score Calculation Agent",
    company: "Hire22",
    link: "https://joinxapi.hire22.ai/",
    stack: ["Python", "FastAPI", "LangChain", "MySQL"],
    color: "var(--accent)",
    status: "Production",
    description:
      "Multimodal agentic hiring framework that analyzes job descriptions and resumes with configurable hard filters (gender, location, notice period, salary). Generates personality score, fitment score, and unified Joinx Score (0–100) with automated candidate summaries.",
    highlights: [
      "Dual LLM support — Gemini & OpenAI",
      "Robust CI pipeline with linting, perf checks & dependency scanning",
      "Automated candidate evaluation at scale",
    ],
  },
  {
    name: "Local Van",
    company: "Vehicle Booking Platform",
    link: "https://www.localvan.in/",
    stack: ["FastAPI", "PostgreSQL", "Next.js", "AWS"],
    color: "var(--accent-green)",
    status: "In Progress",
    description:
      "Full RBAC-enabled B2B/B2C cab booking platform. Users book rides, owners create organizations with KYC verification, add cabs/drivers, and drivers manage assigned bookings with WhatsApp integration.",
    highlights: [
      "Super Admin panel for full entity management",
      "WhatsApp message integration",
      "KYC verification for organizations",
    ],
  },
  {
    name: "Organ Segmentation",
    company: "Medical AI",
    link: null,
    stack: ["Python", "SegResNet", "MONAI", "NiBabel", "SimpleITK"],
    color: "var(--accent-purple)",
    status: "Research",
    description:
      "Automated organ-segmentation system using MONAI that reduces radiotherapy planning time from 20+ minutes to 2–10 minutes, improving accuracy and minimizing radiation exposure.",
    highlights: [
      "Pre-trained MONAI models for reliable segmentation",
      "Supports cancer research workflows",
      "Seamless radiotherapy integration",
    ],
  },
];

export default function Projects({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="projects"
      sectionId="projects"
      title="projects/"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
        <p className="text-sm font-medium mb-8 terminal-font" style={{ color: "var(--accent)" }}>
          # featured_projects
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border card-hover overflow-hidden"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-card)",
                cursor: project.link ? "pointer" : "default",
              }}
              onClick={() => project.link && window.open(project.link, "_blank", "noopener,noreferrer")}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold mb-0.5" style={{ color: "var(--text-primary)", fontSize: "15px" }}>{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs"
                          style={{ color: project.color, textDecoration: "none" }}
                          title="View live"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: project.color }}>{project.company}</span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full terminal-font"
                    style={{
                      background: project.status === "Production" ? "rgba(0,255,136,0.1)" : project.status === "In Progress" ? "rgba(255,159,10,0.1)" : "rgba(191,90,242,0.1)",
                      color: project.status === "Production" ? "var(--accent-green)" : project.status === "In Progress" ? "var(--accent-orange)" : "var(--accent-purple)",
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{project.description}</p>
                <ul className="space-y-1 mb-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-xs flex gap-2" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: project.color }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded terminal-font"
                      style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MinimizableSection>
  );
}
