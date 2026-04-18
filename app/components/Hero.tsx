"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MacButtons from "./MacButtons";
import { minimizeVariants } from "./minimizeVariants";
import { createPortal } from "react-dom";

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
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
    <div id="home">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key="hero"
            variants={minimizeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
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

                <div className="mb-6 space-y-2" style={{ fontSize: "13px", lineHeight: "1.7" }}>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Software engineer specializing in scalable backend systems with hands-on experience in LLM-powered applications.
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ fontSize: "12px" }}>
                    <span><span style={{ color: "var(--accent-green)" }}>▸</span> <span style={{ color: "var(--text-secondary)" }}>3+ production projects shipped</span></span>
                    <span><span style={{ color: "var(--accent-green)" }}>▸</span> <span style={{ color: "var(--text-secondary)" }}>20K+ users supported</span></span>
                    <span><span style={{ color: "var(--accent-green)" }}>▸</span> <span style={{ color: "var(--text-secondary)" }}>99.9% uptime maintained</span></span>
                  </div>
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
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-section", { detail: "projects" }))}
                    className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, var(--accent), #0099cc)", color: "#fff", fontFamily: "inherit", border: "none", cursor: "pointer" }}
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-section", { detail: "contact" }))}
                    className="px-6 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)", fontFamily: "inherit", background: "none", cursor: "pointer" }}
                  >
                    Get In Touch
                  </button>
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
                  onClick={() => setLightbox(true)}
                  style={{
                    width: "clamp(120px, 30vw, 180px)",
                    height: "clamp(148px, 37vw, 220px)",
                    border: "2px solid var(--border)",
                    boxShadow: "0 0 40px rgba(0,216,255,0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    background: "var(--bg-card)",
                    cursor: "zoom-in",
                  }}
                >
                  <Image
                    src="/profile-v3.jpg"
                    alt="Sherbin S — Software Development Engineer at Think41, Bangalore"
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

              {/* Lightbox */}
              {lightbox && mounted && createPortal(
                <AnimatePresence>
                  <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLightbox(false)}
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 200,
                      background: "rgba(0,0,0,0.88)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "zoom-out",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "relative",
                        width: "min(480px, 90vw)",
                        height: "min(640px, 85vh)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,216,255,0.15)",
                      }}
                    >
                      <Image
                        src="/profile-v3.jpg"
                        alt="Sherbin S — Software Development Engineer at Think41, Bangalore"
                        fill
                        sizes="480px"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    </motion.div>
                    {/* Close hint */}
                    <button
                      onClick={() => setLightbox(false)}
                      style={{
                        position: "fixed",
                        top: "24px",
                        right: "24px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#fff",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✕
                    </button>
                  </motion.div>
                </AnimatePresence>,
                document.body
              )}
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px" }}>
              <span style={{ color: "var(--accent-green)" }}>sherbin@macbook</span>
              <span> ~ % </span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-shelby"))}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--accent)", fontFamily: "inherit", fontSize: "inherit" }}
              >
                chat with Shelby ↘
              </button>
              <span className="cursor-blink"> █</span>
            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
