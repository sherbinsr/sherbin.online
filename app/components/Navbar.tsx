"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#achievements", label: "achievements" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(13,13,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(42,42,42,0.5)" : "none",
      }}
    >
      <div
        className="max-w-5xl mx-auto flex items-center justify-between"
        style={{ padding: "16px 24px" }}
      >
        <span
          className="font-bold terminal-font"
          style={{ color: "var(--accent)", fontSize: "14px" }}
        >
          sherbin.online
        </span>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="px-3 py-1.5 rounded-lg text-xs terminal-font transition-all duration-150"
              style={{
                color: active === link.label ? "var(--accent)" : "var(--text-secondary)",
                background: active === link.label ? "rgba(0,216,255,0.08)" : "transparent",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
