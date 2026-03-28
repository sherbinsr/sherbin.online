"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled
          ? theme === "dark"
            ? "rgba(13,13,13,0.88)"
            : "rgba(245,245,247,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div
        className="max-w-5xl mx-auto flex items-center justify-between"
        style={{ padding: "14px 24px" }}
      >
        <span className="font-bold terminal-font" style={{ color: "var(--accent)", fontSize: "14px" }}>
          sherbin.online
        </span>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.label)}
                className="px-3 py-1.5 rounded-lg text-xs terminal-font transition-all duration-150"
                style={{
                  color: active === link.label ? "var(--accent)" : "var(--text-secondary)",
                  background: active === link.label ? "rgba(0,113,227,0.08)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="ml-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "14px",
            }}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>
        </div>
      </div>
    </nav>
  );
}
