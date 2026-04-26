"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { id: "home",       label: "home"       },
  { id: "about",      label: "about"      },
  { id: "experience", label: "experience" },
  { id: "education",  label: "education"  },
  { id: "skills",     label: "skills"     },
  { id: "projects",   label: "projects"   },
  { id: "contact",    label: "contact"    },
];

interface Props {
  openSections: string[];
  onNav: (id: string) => void;
  onDesktop: () => void;
}

export default function Navbar({ openSections, onNav, onDesktop }: Props) {
  const [scrolled, setScrolled] = useState(false);
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
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bold terminal-font"
          style={{ color: "var(--accent)", fontSize: "14px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          sherbin.online
        </button>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === "home" ? window.scrollTo({ top: 0, behavior: "smooth" }) : onNav(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs terminal-font transition-all duration-150"
                style={{
                  color: openSections.includes(item.id) ? "var(--accent)" : "var(--text-secondary)",
                  background: openSections.includes(item.id) ? "rgba(0,113,227,0.08)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Resume download */}
          <a
            href="https://drive.google.com/uc?export=download&id=1rfwZa4Lo8GMPrdiUrhayROWH1u5K-nq_"
            download
            className="ml-1 px-3 py-1.5 rounded-lg text-xs terminal-font transition-all duration-150 hidden md:flex items-center gap-1"
            style={{
              background: "rgba(0,113,227,0.12)",
              border: "1px solid rgba(0,113,227,0.35)",
              color: "var(--accent)",
              cursor: "pointer",
              textDecoration: "none",
            }}
            title="Download Resume"
          >
            ↓ resume
          </a>

          {/* Desktop mode button */}
          <button
            onClick={onDesktop}
            className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "12px",
            }}
            title="Desktop mode"
          >
            ⊟
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
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
