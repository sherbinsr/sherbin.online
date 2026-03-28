"use client";

import { useEffect, useState } from "react";
import MacButtons from "./MacButtons";

const roles = [
  "Software Development Engineer",
  "Full-Stack Developer",
  "AI Systems Builder",
  "Backend Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative grid-bg"
      style={{ padding: "0 24px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,216,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-full max-w-5xl mx-auto">
        <div className="mac-window">
          <MacButtons title="sherbin.online — zsh" />

          <div className="terminal-font" style={{ padding: "32px 40px", background: "#0d0d0d" }}>
            {/* Prompt line */}
            <div className="mb-6" style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              <span style={{ color: "var(--accent-green)" }}>sherbin</span>
              <span style={{ color: "var(--text-secondary)" }}>@</span>
              <span style={{ color: "var(--accent)" }}>macbook</span>
              <span style={{ color: "var(--text-secondary)" }}> ~ % </span>
              <span style={{ color: "var(--text-primary)" }}>whoami</span>
            </div>

            {/* Name */}
            <h1
              className="font-bold mb-2"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.1 }}
            >
              <span className="text-gradient">Sherbin S</span>
            </h1>

            {/* Typewriter role */}
            <div className="flex items-center gap-1 mb-8" style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>
              <span style={{ color: "var(--text-secondary)" }}>{displayed}</span>
              <span className="cursor-blink" style={{ color: "var(--accent)", fontSize: "1.2em" }}>▊</span>
            </div>

            {/* Info lines */}
            <div className="space-y-2 mb-8" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              <div>
                <span style={{ color: "var(--accent-purple)" }}>📍 location: </span>
                <span style={{ color: "var(--text-primary)" }}>Bangalore, India</span>
              </div>
              <div>
                <span style={{ color: "var(--accent-purple)" }}>📧 email: </span>
                <span style={{ color: "var(--text-primary)" }}>sherbinsyles31@gmail.com</span>
              </div>
              <div>
                <span style={{ color: "var(--accent-purple)" }}>💼 company: </span>
                <span style={{ color: "var(--text-primary)" }}>Think41 (Nov 2024 – Present)</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, var(--accent), #0099cc)",
                  color: "#000",
                  fontFamily: "inherit",
                }}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                }}
              >
                Get In Touch
              </a>
              <a
                href="https://github.com/sherbinsr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                  fontFamily: "inherit",
                }}
              >
                GitHub ↗
              </a>
            </div>

            {/* Bottom prompt */}
            <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px" }}>
              <span style={{ color: "var(--accent-green)" }}>sherbin@macbook</span>
              <span> ~ % </span>
              <span style={{ color: "var(--accent)" }}>chat with Shelby</span>
              <span className="cursor-blink"> █</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
