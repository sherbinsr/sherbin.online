"use client";

import MacButtons from "./MacButtons";

const achievements = [
  {
    title: "Open Source Contributor — CAI",
    icon: "⭐",
    color: "var(--accent)",
    description:
      "Contributed to the CAI Voice Agent platform by integrating initial greetings, Gemini-based STT/TTS, LLM capabilities, Agent Time Tracking, and automated document generation. Developed these features before open-sourcing, then helped release them as part of the official SDK.",
  },
  {
    title: "Thinkers 2025 — Best Team Player Award",
    icon: "🏆",
    color: "var(--accent-orange)",
    description:
      "Received the 'Best Team Player Award' at Think41 for demonstrating exceptional ownership, guiding team members, and contributing significantly to delivery success.",
  },
  {
    title: "LeetCode — 220+ Problems",
    icon: "⚡",
    color: "var(--accent-green)",
    description:
      "Successfully solved over 220+ problems on LeetCode and earned a 100-day streak badge for consistently solving problems, demonstrating strong algorithmic problem-solving skills.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: "80px 24px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mac-window">
          <MacButtons title="achievements.log" />
          <div style={{ padding: "40px", background: "#0d0d0d" }}>
            <p className="text-sm font-medium mb-8 terminal-font" style={{ color: "var(--accent)" }}>
              # achievements & highlights
            </p>
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="p-5 rounded-xl border card-hover"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{a.icon}</span>
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: a.color }}>
                      {a.title}
                    </h3>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
