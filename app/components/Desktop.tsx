"use client";

import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
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
        background: "rgba(0,0,0,0.35)",
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

/* ---------- BMW M4 SVG scene ---------- */
function M4Scene() {
  return (
    <>
      {/* Road perspective */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "45%", pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="glowLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a6ef5" stopOpacity="0" />
            <stop offset="30%" stopColor="#1a6ef5" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#1a6ef5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a6ef5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Road surface */}
        <polygon points="0,320 1440,320 1440,180 0,180" fill="url(#roadGrad)" />
        {/* Road perspective lines */}
        <polygon points="560,180 880,180 1440,320 0,320" fill="#0d0d0d" />
        {/* Center dashes */}
        <rect x="700" y="220" width="40" height="8" rx="4" fill="#333" opacity="0.8" />
        <rect x="700" y="250" width="40" height="8" rx="4" fill="#333" opacity="0.8" />
        <rect x="700" y="280" width="40" height="8" rx="4" fill="#333" opacity="0.8" />
        <rect x="700" y="308" width="40" height="8" rx="4" fill="#333" opacity="0.6" />
        {/* Road edge glow */}
        <rect x="0" y="179" width="1440" height="3" fill="url(#glowLine)" opacity="0.6" />
        {/* Reflections on road */}
        <ellipse cx="720" cy="290" rx="260" ry="30" fill="#1a6ef5" opacity="0.04" />
      </svg>

      {/* BMW M4 SVG — side profile */}
      <svg
        viewBox="0 0 800 300"
        className="absolute"
        style={{
          width: "min(700px, 80vw)",
          height: "auto",
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          filter: "drop-shadow(0 20px 60px rgba(26,110,245,0.35)) drop-shadow(0 4px 20px rgba(0,0,0,0.8))",
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="40%" stopColor="#0f0f1a" />
            <stop offset="100%" stopColor="#050508" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a2a3e" />
            <stop offset="50%" stopColor="#1e1e30" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a5f9a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1a3060" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
          <radialGradient id="headlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#a0c8ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1a6ef5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="taillight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff3030" stopOpacity="1" />
            <stop offset="100%" stopColor="#cc0000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Car body — M4 coupe silhouette */}
        <path
          d="M80,220 L80,190 Q85,175 100,165 L160,140 Q200,115 250,108 L340,100 Q380,95 410,97 L500,100 Q560,102 600,110 L660,125 Q700,140 720,160 L730,180 L735,200 L735,220 Z"
          fill="url(#bodyGrad)"
          stroke="#1a6ef5"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Roof */}
        <path
          d="M200,140 Q250,105 320,98 L430,94 Q480,92 510,97 L580,112 Q620,125 640,140 L560,138 Q530,130 500,128 L320,128 Q280,130 240,138 Z"
          fill="url(#roofGrad)"
        />

        {/* Windshield */}
        <path
          d="M310,128 Q320,100 360,97 L430,94 Q460,93 480,98 L510,128 Z"
          fill="url(#glassGrad)"
          stroke="#1a6ef5"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />

        {/* Side window */}
        <path
          d="M220,135 Q240,118 270,112 L308,128 Z"
          fill="url(#glassGrad)"
          stroke="#1a6ef5"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Rear window */}
        <path
          d="M512,128 L555,132 Q575,133 590,138 L560,138 Z"
          fill="url(#glassGrad)"
          stroke="#1a6ef5"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Door line */}
        <path d="M200,140 L560,138" stroke="#2a3a5a" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M380,128 L380,220" stroke="#1a2a4a" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* BMW kidney grille */}
        <path d="M83,170 Q88,162 95,160 L110,158 Q118,158 122,162 L124,172 Q122,178 116,180 L92,182 Q85,180 83,174 Z" fill="#0a0a0a" stroke="#1a6ef5" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M126,158 L138,157 Q146,157 150,161 L152,172 Q150,178 144,180 L126,181 Z" fill="#0a0a0a" stroke="#1a6ef5" strokeWidth="1" strokeOpacity="0.7" />

        {/* Front bumper / splitter */}
        <path d="M80,200 L80,215 Q82,220 92,222 L160,222 L160,215 Q130,212 100,208 Z" fill="#0d0d16" stroke="#1a6ef5" strokeWidth="0.6" strokeOpacity="0.3" />

        {/* Side skirt */}
        <path d="M160,215 L580,215 L580,222 L160,222 Z" fill="#0d0d16" stroke="#1a6ef5" strokeWidth="0.5" strokeOpacity="0.25" />

        {/* Headlight */}
        <ellipse cx="95" cy="160" rx="14" ry="8" fill="url(#headlight)" opacity="0.9" />
        <ellipse cx="95" cy="160" rx="6" ry="4" fill="white" opacity="0.95" />
        {/* DRL strip */}
        <path d="M82,155 Q88,152 100,151 L112,152" stroke="#a0c8ff" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />

        {/* Taillight */}
        <ellipse cx="720" cy="165" rx="12" ry="7" fill="url(#taillight)" opacity="0.85" />
        <path d="M710,158 L730,158 L732,168 L708,170 Z" fill="#cc0000" opacity="0.6" />

        {/* M badge */}
        <text x="410" y="155" fontSize="10" fontFamily="Arial Black, sans-serif" fontWeight="900" fill="#1a6ef5" opacity="0.9" textAnchor="middle">M4</text>

        {/* Front wheel */}
        <circle cx="200" cy="222" r="40" fill="#0d0d0d" stroke="#1a6ef5" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="200" cy="222" r="28" fill="#111" stroke="#333" strokeWidth="1" />
        <circle cx="200" cy="222" r="10" fill="#1a1a1a" stroke="#1a6ef5" strokeWidth="1" strokeOpacity="0.7" />
        {/* Spokes */}
        {[0,60,120,180,240,300].map((deg) => (
          <line key={deg}
            x1={200 + 10 * Math.cos(deg * Math.PI / 180)}
            y1={222 + 10 * Math.sin(deg * Math.PI / 180)}
            x2={200 + 27 * Math.cos(deg * Math.PI / 180)}
            y2={222 + 27 * Math.sin(deg * Math.PI / 180)}
            stroke="#1a6ef5" strokeWidth="2" strokeOpacity="0.6"
          />
        ))}
        {/* Tyre */}
        <circle cx="200" cy="222" r="40" fill="none" stroke="#0a0a0a" strokeWidth="8" />

        {/* Rear wheel */}
        <circle cx="580" cy="222" r="40" fill="#0d0d0d" stroke="#1a6ef5" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="580" cy="222" r="28" fill="#111" stroke="#333" strokeWidth="1" />
        <circle cx="580" cy="222" r="10" fill="#1a1a1a" stroke="#1a6ef5" strokeWidth="1" strokeOpacity="0.7" />
        {[0,60,120,180,240,300].map((deg) => (
          <line key={deg}
            x1={580 + 10 * Math.cos(deg * Math.PI / 180)}
            y1={222 + 10 * Math.sin(deg * Math.PI / 180)}
            x2={580 + 27 * Math.cos(deg * Math.PI / 180)}
            y2={222 + 27 * Math.sin(deg * Math.PI / 180)}
            stroke="#1a6ef5" strokeWidth="2" strokeOpacity="0.6"
          />
        ))}
        <circle cx="580" cy="222" r="40" fill="none" stroke="#0a0a0a" strokeWidth="8" />

        {/* Ground shadow */}
        <ellipse cx="390" cy="264" rx="300" ry="18" fill="#1a6ef5" opacity="0.06" />
        <ellipse cx="390" cy="263" rx="200" ry="10" fill="black" opacity="0.4" />
      </svg>
    </>
  );
}

export default function Desktop({ onOpen }: DesktopProps) {
  const [iconSelected, setIconSelected] = useState(false);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 100 }}
    >
      {/* Apple macOS default wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Subtle overlay to keep UI readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.18)" }}
      />

      {/* Menu bar */}
      <MenuBar />

      {/* Sherbin.sh icon — draggable */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        className="absolute flex flex-col items-center gap-3"
        style={{
          top: "28%",
          left: "50%",
          x: "-50%",
          zIndex: 10,
          cursor: "grab",
          touchAction: "none",
        }}
        whileDrag={{ cursor: "grabbing", scale: 1.06 }}
        onDoubleClick={onOpen}
        onClick={() => setIconSelected((v) => !v)}
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onOpen()}
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

      </motion.div>

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
