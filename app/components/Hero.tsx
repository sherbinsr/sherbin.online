"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MacButtons from "./MacButtons";
import { minimizeVariants } from "./minimizeVariants";

const roles = [
  "Software Development Engineer",
  "Full-Stack Developer",
  "AI Systems Builder",
  "Backend Engineer",
];

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

export default function Hero({ isMinimized, onMinimize, onRestore }: Props) {
  void onRestore;
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
      className="flex items-center justify-center relative grid-bg"
      style={{ padding: isMinimized ? 0 : "0 clamp(12px, 4vw, 24px)", minHeight: isMinimized ? 0 : "100vh", overflow: "hidden" }}
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,216,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key="hero"
            variants={minimizeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center", width: "100%", maxWidth: "64rem", margin: "0 auto" }}
          >
        <div className="mac-window">
          <MacButtons title="sherbin.online — zsh" onMinimize={onMinimize} onClose={onMinimize} />

          <div className="terminal-font" style={{ padding: "clamp(20px, 5vw, 40px)", background: "var(--terminal-bg)" }}>
            <div className="w-full flex flex-col-reverse sm:flex-row gap-8 sm:gap-10 items-center sm:items-start">
              {/* Left */}
              <div className="flex-1 min-w-[260px]">
                <div className="mb-5" style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                  <span style={{ color: "var(--accent-green)" }}>sherbin</span>
                  <span style={{ color: "var(--text-secondary)" }}>@</span>
                  <span style={{ color: "var(--accent)" }}>macbook</span>
                  <span style={{ color: "var(--text-secondary)" }}> ~ % </span>
                  <span style={{ color: "var(--text-primary)" }}>whoami</span>
                </div>

                <h1 className="font-bold mb-2" style={{ fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.05 }}>
                  <span className="text-gradient">Sherbin S</span>
                </h1>

                <div className="flex items-center gap-1 mb-8" style={{ fontSize: "clamp(15px, 2.2vw, 20px)" }}>
                  <span style={{ color: "var(--accent-green)" }}>$ </span>
                  <span style={{ color: "var(--text-secondary)" }}>{displayed}</span>
                  <span className="cursor-blink" style={{ color: "var(--accent)" }}>▊</span>
                </div>

                <div className="space-y-2 mb-8" style={{ fontSize: "13px" }}>
                  <div>
                    <span style={{ color: "var(--accent-purple)" }}>📍 location: </span>
                    <span style={{ color: "var(--text-primary)" }}>Bangalore, India</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--accent-purple)" }}>✉ email: </span>
                    <span style={{ color: "var(--text-primary)" }}>sherbinsyles31@gmail.com</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--accent-purple)" }}>💼 company: </span>
                    <span style={{ color: "var(--text-primary)" }}>Think41 (Nov 2024 – Present)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, var(--accent), #0099cc)", color: "#fff", fontFamily: "inherit", textDecoration: "none" }}
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)", fontFamily: "inherit", textDecoration: "none" }}
                  >
                    Get In Touch
                  </a>
                  <a
                    href="https://github.com/sherbinsr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)", fontFamily: "inherit", textDecoration: "none" }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              {/* Profile image */}
              <div className="flex-shrink-0 flex justify-center">
                <div
                  style={{
                    width: "clamp(120px, 30vw, 180px)",
                    height: "clamp(148px, 37vw, 220px)",
                    border: "2px solid var(--border)",
                    boxShadow: "0 0 40px rgba(0,216,255,0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    background: "var(--bg-card)",
                  }}
                >
                  <Image
                    src="/profile-v2.jpg"
                    alt="Sherbin S"
                    fill
                    sizes="180px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, rgba(0,216,255,0.06) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px" }}>
              <span style={{ color: "var(--accent-green)" }}>sherbin@macbook</span>
              <span> ~ % </span>
              <span style={{ color: "var(--accent)" }}>chat with Shelby ↘</span>
              <span className="cursor-blink"> █</span>
            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
