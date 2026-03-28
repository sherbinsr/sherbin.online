"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useTheme } from "./ThemeProvider";

interface DesktopProps {
  onOpen: () => void;
}

function MenuBar() {
  const [time, setTime] = useState("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-5"
      style={{
        height: "28px",
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 20,
        fontSize: "13px",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      <div className="flex items-center gap-4">
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>⌘</span>
        <span className="font-semibold">Finder</span>
        <span style={{ opacity: 0.7 }}>File</span>
        <span style={{ opacity: 0.7 }}>Edit</span>
        <span style={{ opacity: 0.7 }}>View</span>
        <span style={{ opacity: 0.7 }}>Go</span>
      </div>
      <div className="flex items-center gap-3" style={{ opacity: 0.95 }}>
        <button
          onClick={toggle}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "13px", padding: 0 }}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀" : "◑"}
        </button>
        <span style={{ fontSize: "12px" }}>🔋 100%</span>
        <span style={{ fontWeight: 500 }}>{time}</span>
      </div>
    </div>
  );
}

function DockIcon({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      style={{ position: "relative", transition: "transform 0.15s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: "12px",
            padding: "3px 8px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            fontFamily: "-apple-system, sans-serif",
            pointerEvents: "none",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width: hovered ? "58px" : "50px",
          height: hovered ? "58px" : "50px",
          transform: hovered ? "translateY(-8px)" : "none",
          transition: "all 0.15s ease",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

/* ---------- SVG mountain scene ---------- */
function EverestScene() {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "62%", pointerEvents: "none" }}
      aria-hidden
    >
      {/* Far range — lightest, bluish */}
      <polygon
        points="0,400 0,260 120,180 240,230 360,150 480,200 600,130 720,180 840,140 960,185 1080,120 1200,170 1320,140 1440,160 1440,400"
        fill="#b8c8e0"
        opacity="0.35"
      />
      {/* Mid range */}
      <polygon
        points="0,400 0,310 80,250 180,280 300,200 440,240 560,170 660,210 760,155 880,205 1000,150 1120,195 1240,158 1360,190 1440,170 1440,400"
        fill="#8aa4c0"
        opacity="0.45"
      />
      {/* Snow caps on mid range */}
      <polygon points="560,170 520,195 600,195" fill="white" opacity="0.6" />
      <polygon points="760,155 720,180 800,180" fill="white" opacity="0.6" />
      <polygon points="1000,150 960,178 1040,178" fill="white" opacity="0.55" />
      <polygon points="300,200 270,222 330,222" fill="white" opacity="0.5" />

      {/* Main foreground peaks */}
      {/* Left mountain */}
      <polygon
        points="0,400 0,320 140,220 280,300 360,400"
        fill="#3d5068"
        opacity="0.9"
      />
      {/* Left snow */}
      <polygon points="140,220 100,255 180,255" fill="white" opacity="0.85" />

      {/* Center-left peak */}
      <polygon
        points="200,400 320,230 440,290 520,400"
        fill="#2e4060"
        opacity="0.95"
      />
      <polygon points="320,230 295,262 345,262" fill="white" opacity="0.9" />

      {/* EVEREST — tallest, center */}
      <polygon
        points="480,400 620,80 760,400"
        fill="#253550"
        opacity="1"
      />
      {/* Everest snow & ice */}
      <polygon points="620,80 580,140 660,140" fill="white" opacity="0.95" />
      <polygon points="620,80 590,130 650,130" fill="#e8f4ff" opacity="0.7" />
      {/* Wind plume from Everest summit */}
      <path
        d="M620,80 Q680,55 740,65 Q700,70 660,85 Z"
        fill="white"
        opacity="0.45"
      />

      {/* Right center mountain */}
      <polygon
        points="700,400 820,190 940,310 1000,400"
        fill="#2a3d58"
        opacity="0.95"
      />
      <polygon points="820,190 790,225 850,225" fill="white" opacity="0.88" />

      {/* Right mountain */}
      <polygon
        points="900,400 1040,240 1180,320 1260,400"
        fill="#344a64"
        opacity="0.9"
      />
      <polygon points="1040,240 1010,272 1070,272" fill="white" opacity="0.8" />

      {/* Far right */}
      <polygon
        points="1160,400 1280,280 1380,330 1440,310 1440,400"
        fill="#3a506a"
        opacity="0.85"
      />
      <polygon points="1280,280 1255,305 1305,305" fill="white" opacity="0.75" />

      {/* Foreground snowy ground / glacier */}
      <path
        d="M0,400 Q180,360 360,375 Q540,390 720,370 Q900,350 1080,368 Q1260,386 1440,372 L1440,400 Z"
        fill="white"
        opacity="0.18"
      />
    </svg>
  );
}

export default function Desktop({ onOpen }: DesktopProps) {
  const [iconSelected, setIconSelected] = useState(false);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 100 }}
    >
      {/* Sky gradient — Everest dawn/dusk palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0f1e 0%, #0d1832 15%, #1a2d50 35%, #2c3f6e 55%, #4a5f8a 70%, #7a8fb0 82%, #b0bec8 92%, #d0d8e0 100%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none" style={{ top: 0, height: "55%" }}>
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.85 ? "2px" : "1px",
              height: Math.random() > 0.85 ? "2px" : "1px",
              background: "white",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div
        className="absolute rounded-full"
        style={{
          width: "48px",
          height: "48px",
          top: "8%",
          right: "18%",
          background: "radial-gradient(circle at 35% 35%, #fffde0, #e8e0c0)",
          boxShadow: "0 0 30px rgba(255,245,200,0.25), 0 0 60px rgba(255,245,200,0.1)",
          opacity: 0.9,
        }}
      />

      {/* Aurora / atmospheric glow near horizon */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "38%",
          left: "5%",
          width: "45%",
          height: "25%",
          background:
            "radial-gradient(ellipse, rgba(100,160,220,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "35%",
          right: "10%",
          width: "40%",
          height: "20%",
          background:
            "radial-gradient(ellipse, rgba(140,180,240,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Mountain SVG scene */}
      <EverestScene />

      {/* Menu bar */}
      <MenuBar />

      {/* Sherbin.sh icon — centered above mountains */}
      <div
        className="absolute flex flex-col items-center gap-3 cursor-pointer"
        style={{
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
        onDoubleClick={onOpen}
        onClick={() => setIconSelected((v) => !v)}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
      >
        {/* Icon shell */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "22px",
            background: "linear-gradient(145deg, #1c1c1e, #2c2c2e)",
            border: iconSelected
              ? "2px solid rgba(100,180,255,0.9)"
              : "2px solid rgba(255,255,255,0.08)",
            boxShadow: iconSelected
              ? "0 0 0 4px rgba(100,180,255,0.25), 0 24px 60px rgba(0,0,0,0.6)"
              : "0 24px 60px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            transition: "all 0.15s",
          }}
        >
          {/* Fake terminal titlebar */}
          <div
            style={{
              height: "18px",
              background: "#2a2a2a",
              display: "flex",
              alignItems: "center",
              paddingLeft: "7px",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          {/* Terminal body */}
          <div
            style={{
              flex: 1,
              background: "#0d0d0d",
              padding: "6px 8px",
              fontFamily: "'SF Mono', Consolas, monospace",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <div style={{ color: "#00ff88", fontSize: "9px" }}>$ sherbin</div>
            <div style={{ color: "#00d8ff", fontSize: "9px" }}>~&gt; ./run</div>
            <div style={{ color: "#bf5af2", fontSize: "9px" }}>✓ ready</div>
          </div>
        </div>

        {/* Label */}
        <span
          style={{
            background: iconSelected ? "rgba(60,130,255,0.75)" : "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            padding: "2px 10px",
            borderRadius: "6px",
            backdropFilter: "blur(8px)",
            fontFamily: "-apple-system, sans-serif",
            border: iconSelected ? "1px solid rgba(100,180,255,0.5)" : "1px solid transparent",
            transition: "all 0.15s",
            letterSpacing: "0.01em",
          }}
        >
          Sherbin.sh
        </span>

        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "11px",
            fontFamily: "-apple-system, sans-serif",
            marginTop: "-4px",
          }}
        >
          Double-click to open
        </span>
      </div>

      {/* Dock */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-3 px-5 py-2 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          zIndex: 15,
        }}
      >
        <DockIcon
          label="sherbin.online"
          icon={
            <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: "linear-gradient(135deg, #00d8ff, #0055cc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
              💻
            </div>
          }
          onClick={onOpen}
        />
        <DockIcon
          label="GitHub"
          icon={
            <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: "linear-gradient(135deg, #333, #111)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
              🐙
            </div>
          }
          onClick={() => window.open("https://github.com/sherbinsr", "_blank")}
        />
        <DockIcon
          label="LinkedIn"
          icon={
            <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: "linear-gradient(135deg, #0a66c2, #004182)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
              💼
            </div>
          }
          onClick={() => window.open("https://www.linkedin.com/in/sherbin-s-07704a249/", "_blank")}
        />
        <DockIcon
          label="Email"
          icon={
            <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
              ✉️
            </div>
          }
          onClick={() => window.open("mailto:sherbinsyles31@gmail.com")}
        />
      </div>
    </div>
  );
}
