"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

export default function About({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="about"
      sectionId="about"
      title="about.md"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left */}
          <div>
            <p className="text-sm font-medium mb-2 terminal-font" style={{ color: "var(--accent)" }}>
              # about_me
            </p>
            <h2 className="font-bold mb-5" style={{ fontSize: "clamp(20px, 4vw, 30px)", lineHeight: 1.3 }}>
              Building the future,{" "}
              <span className="text-gradient">one commit at a time</span>
            </h2>
            <div className="space-y-3" style={{ color: "var(--text-secondary)", fontSize: "clamp(13px, 2vw, 15px)", lineHeight: "1.8" }}>
              <p>
                I&apos;m a Software Development Engineer at{" "}
                <span style={{ color: "var(--accent)" }}>Think41</span>, where I build
                production-grade AI systems, full-stack platforms, and real-time communication tools.
              </p>
              <p>
                I thrive at the intersection of{" "}
                <span style={{ color: "var(--accent-green)" }}>AI/ML</span> and{" "}
                <span style={{ color: "var(--accent-purple)" }}>software engineering</span> — turning
                complex ideas into scalable, reliable products.
              </p>
              <p>
                B.E. in Computer Science from JCT College of Engineering & Technology (CGPA: 8.3),
                shipping systems that serve 20,000+ users with 99.9% uptime.
              </p>
            </div>
          </div>

          {/* Right — stats */}
          <div className="space-y-3">
            <p className="text-sm font-medium mb-3 terminal-font" style={{ color: "var(--accent)" }}>
              # stats
            </p>
            {[
              { label: "Projects Delivered", value: "3+", sub: "end-to-end client projects" },
              { label: "Users Supported", value: "20K+", sub: "across applications" },
              { label: "Uptime Maintained", value: "99.9%", sub: "production systems" },
              { label: "LeetCode Problems", value: "220+", sub: "with 100-day streak" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 rounded-xl border card-hover"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="min-w-0">
                    <div className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>{stat.sub}</div>
                  </div>
                  <div className="text-xl font-bold text-gradient flex-shrink-0">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MinimizableSection>
  );
}
