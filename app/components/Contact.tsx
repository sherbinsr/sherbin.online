"use client";

import MinimizableSection from "./MinimizableSection";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const links = [
  { label: "Email", value: "sherbinsyles31@gmail.com", href: "mailto:sherbinsyles31@gmail.com", icon: "✉", color: "var(--accent)" },
  { label: "LinkedIn", value: "sherbin-s-07704a249", href: "https://www.linkedin.com/in/sherbin-s-07704a249/", icon: "in", color: "var(--accent)" },
  { label: "GitHub", value: "sherbinsr", href: "https://github.com/sherbinsr", icon: "⌥", color: "var(--accent-green)" },
  { label: "Phone", value: "+91 9677472562", href: "tel:+919677472562", icon: "☎", color: "var(--accent-purple)" },
];

export default function Contact({ isMinimized, onMinimize, onRestore }: Props) {
  return (
    <MinimizableSection
      id="contact"
      sectionId="contact"
      title="contact.sh"
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      onRestore={onRestore}
    >
      <div style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <p className="text-sm font-medium mb-4 terminal-font" style={{ color: "var(--accent)" }}>
              # get_in_touch
            </p>
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(20px, 4vw, 30px)" }}>
              Let&apos;s <span className="text-gradient">connect</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "15px" }}>
              Open to interesting opportunities, collaborations, and conversations about AI, full-stack
              engineering, and building things that matter.
            </p>
            <div className="mt-6 p-4 rounded-xl terminal-font" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
                <span style={{ color: "var(--accent-green)" }}>sherbin@macbook</span>
                <span> ~/contact % </span>
                <span style={{ color: "var(--accent)" }}>echo $LOCATION</span>
              </div>
              <div className="mt-1" style={{ color: "var(--text-primary)", fontSize: "13px" }}>
                Bangalore, India 🇮🇳
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border card-hover"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)", textDecoration: "none" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm terminal-font flex-shrink-0"
                  style={{ background: `rgba(0,216,255,0.08)`, color: link.color, border: `1px solid ${link.color}30` }}
                >
                  {link.icon}
                </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{link.label}</div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{link.value}</div>
                </div>
                <span className="ml-auto" style={{ color: "var(--text-secondary)", fontSize: "12px" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MinimizableSection>
  );
}
