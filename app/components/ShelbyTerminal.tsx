"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ShelbyTerminal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, minimized, maximized]);

  useEffect(() => {
    const handler = () => { setOpen(true); setMinimized(false); };
    window.addEventListener("open-shelby", handler);
    return () => window.removeEventListener("open-shelby", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error connecting. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleMaximize() {
    setMinimized(false);
    setMaximized((v) => !v);
  }

  function handleClose() {
    setMaximized(false);
    setMinimized(false);
    setOpen(false);
  }

  const fontSize = maximized ? "14px" : "12px";

  const windowStyle = maximized
    ? {
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        bottom: "auto",
        right: "auto",
      }
    : {
        width: "min(520px, calc(100vw - 32px))",
        height: "600px",
        minHeight: "400px",
        bottom: "32px",
        right: "32px",
      };

  return (
    <>
      {/* Floating icon button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-1.5 transition-all duration-200"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          title="Open Shelby"
        >
          {/* Icon shell */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(145deg, #0d1a2a, #0a1220)",
              border: "1.5px solid rgba(0,216,255,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(0,216,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow ring */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "14px", background: "radial-gradient(circle at 50% 30%, rgba(0,216,255,0.12) 0%, transparent 70%)" }} />
            {/* AI brain SVG */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="none" stroke="#00d8ff" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="1.5" fill="#00d8ff"/>
              <path d="M12 2 L12 5" stroke="#00d8ff" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 19 L12 22" stroke="#00d8ff" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 12 L5 12" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M19 12 L22 12" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5.636 5.636 L7.757 7.757" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16.243 16.243 L18.364 18.364" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M18.364 5.636 L16.243 7.757" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7.757 16.243 L5.636 18.364" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {/* Online dot */}
            <span style={{ position: "absolute", bottom: "6px", right: "6px", width: "7px", height: "7px", borderRadius: "50%", background: "#28c840", boxShadow: "0 0 6px #28c840", border: "1.5px solid #0d1a2a" }} />
          </div>
          {/* Label */}
          <span
            className="terminal-font"
            style={{
              color: "var(--accent)",
              fontSize: "11px",
              fontWeight: 600,
              background: "rgba(0,0,0,0.55)",
              padding: "2px 8px",
              borderRadius: "5px",
              border: "1px solid rgba(0,216,255,0.15)",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.02em",
            }}
          >
            Shelby
          </span>
        </button>
      )}

      {/* Terminal window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="shelby"
            className="fixed z-50"
            style={{
              ...windowStyle,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: maximized ? 0 : "12px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Titlebar */}
            <div
              style={{
                background: maximized ? "#1a1a1a" : "var(--titlebar-bg)",
                borderBottom: "1px solid var(--border)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              <div className="mac-buttons" style={{ display: "flex", gap: "8px" }}>
                <div className="mac-btn mac-btn-close" onClick={handleClose} title="Close">
                  <span className="mac-btn-label">✕</span>
                </div>
                <div
                  className="mac-btn mac-btn-minimize"
                  onClick={handleClose}
                  title="Close"
                >
                  <span className="mac-btn-label">−</span>
                </div>
                <div
                  className="mac-btn mac-btn-maximize"
                  onClick={handleMaximize}
                  title={maximized ? "Restore" : "Full screen"}
                >
                  <span className="mac-btn-label">+</span>
                </div>
              </div>
              <span
                className="terminal-font text-xs font-medium"
                style={{ color: "var(--text-secondary)", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
              >
                shelby — zsh{maximized ? " — Full Screen" : ""}
              </span>
            </div>

            {/* Body */}
            {!minimized && (
              <div
                className="terminal-font"
                style={{
                  background: maximized ? "#0a0a0a" : "var(--terminal-bg)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Output — scrollable */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    padding: maximized ? "24px 32px" : "16px",
                    fontSize,
                    lineHeight: "1.8",
                    maxWidth: maximized ? "900px" : undefined,
                    width: maximized ? "100%" : undefined,
                    margin: maximized ? "0 auto" : undefined,
                  }}
                >
                  {messages.length === 0 && (
                    <div style={{ color: "var(--text-secondary)", opacity: 0.45, marginBottom: "12px" }}>
                      <span style={{ color: "var(--accent-green)" }}>shelby</span>
                      <span style={{ color: "#555" }}>@</span>
                      <span style={{ color: "var(--accent)" }}>portfolio</span>
                      <span style={{ color: "#555" }}> % </span>
                      <span className="cursor-blink" style={{ color: "var(--accent)" }}>▊</span>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div key={i}>
                      {m.role === "user" && (
                        <div className="mt-3">
                          <span style={{ color: "var(--accent-green)" }}>you</span>
                          <span style={{ color: "#555" }}>@</span>
                          <span style={{ color: "var(--accent)" }}>shelby</span>
                          <span style={{ color: "#555" }}> % </span>
                          <span style={{ color: "var(--text-primary)" }}>{m.content}</span>
                        </div>
                      )}
                      {m.role === "assistant" && (
                        <div
                          className="mt-2"
                          style={{
                            color: maximized ? "#d0d0d0" : "#e0e0e0",
                            whiteSpace: "pre-wrap",
                            lineHeight: maximized ? "1.9" : "1.7",
                          }}
                        >
                          <span style={{ color: "var(--accent-purple)" }}>shelby › </span>
                          {m.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="mt-2" style={{ color: "var(--accent-purple)" }}>
                      shelby ›{" "}
                      <span style={{ color: "var(--text-secondary)" }}>
                        thinking<span className="cursor-blink">▊</span>
                      </span>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 flex-shrink-0"
                  style={{
                    padding: maximized ? "16px 32px" : "12px 16px",
                    borderTop: "1px solid var(--border)",
                    background: maximized ? "#050505" : "var(--input-bg)",
                    maxWidth: maximized ? "900px" : undefined,
                    width: maximized ? "100%" : undefined,
                    margin: maximized ? "0 auto" : undefined,
                    alignSelf: maximized ? "center" : undefined,
                    boxSizing: "border-box",
                  }}
                >
                  <span style={{ color: "var(--accent-green)", fontSize, flexShrink: 0 }}>
                    you@shelby %
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ask me anything about Sherbin..."
                    className="flex-1 bg-transparent outline-none terminal-font"
                    style={{ color: "var(--text-primary)", fontSize, caretColor: "var(--accent)" }}
                    disabled={loading}
                  />
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
