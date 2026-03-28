"use client";

import MacButtons from "./MacButtons";

export default function About() {
  return (
    <section id="about" style={{ padding: "80px 24px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mac-window">
          <MacButtons title="about.md — Preview" />
          <div style={{ padding: "40px", background: "#0d0d0d" }}>
            <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {/* Left */}
              <div>
                <p className="text-sm font-medium mb-2 terminal-font" style={{ color: "var(--accent)" }}>
                  # about_me
                </p>
                <h2 className="text-3xl font-bold mb-6">
                  Building the future,{" "}
                  <span className="text-gradient">one commit at a time</span>
                </h2>
                <div className="space-y-4" style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.8" }}>
                  <p>
                    I&apos;m a Software Development Engineer at{" "}
                    <span style={{ color: "var(--accent)" }}>Think41</span>, where I build
                    production-grade AI systems, full-stack platforms, and real-time communication tools.
                  </p>
                  <p>
                    I thrive at the intersection of{" "}
                    <span style={{ color: "var(--accent-green)" }}>AI/ML</span> and
                    <span style={{ color: "var(--accent-purple)" }}> software engineering</span> — turning
                    complex ideas into scalable, reliable products.
                  </p>
                  <p>
                    With a B.E. in Computer Science from JCT College of Engineering & Technology (CGPA: 8.3),
                    I&apos;ve shipped systems serving 20,000+ users with 99.9% uptime.
                  </p>
                </div>
              </div>

              {/* Right — stats */}
              <div className="space-y-4">
                <p className="text-sm font-medium mb-4 terminal-font" style={{ color: "var(--accent)" }}>
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
                    className="p-4 rounded-xl border card-hover"
                    style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>{stat.sub}</div>
                      </div>
                      <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
