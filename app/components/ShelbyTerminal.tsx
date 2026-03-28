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
        bottom: "32px",
        right: "32px",
      };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 terminal-font font-bold text-sm px-5 py-3 rounded-xl z-50 flex items-center gap-2 transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #00d8ff18, #00d8ff08)",
            border: "1px solid rgba(0,216,255,0.3)",
            color: "var(--accent)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,216,255,0.1)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent-green)", boxShadow: "0 0 6px var(--accent-green)" }}
          />
          ~ chat with Shelby
        </button>
      )}

      {/* Terminal window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="shelby"
            className="fixed z-50 mac-window flex flex-col"
            style={{ ...windowStyle, overflow: "hidden" }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            exit={{ opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } }}
            layout
            transition={{ layout: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
          >
            {/* Titlebar */}
            <div
              className="mac-titlebar flex-shrink-0"
              style={{ background: maximized ? "#1a1a1a" : "var(--titlebar-bg)" }}
            >
              <div className="mac-buttons flex gap-2">
                <div className="mac-btn mac-btn-close" onClick={handleClose} title="Close">
                  <span className="mac-btn-label">✕</span>
                </div>
                <div
                  className="mac-btn mac-btn-minimize"
                  onClick={() => { setMinimized((v) => !v); setMaximized(false); }}
                  title="Minimize"
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
                className="absolute left-1/2 -translate-x-1/2 terminal-font text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                shelby — zsh{maximized ? " — Full Screen" : ""}
              </span>

              {/* Full-screen hint */}
              {maximized && (
                <span
                  className="absolute right-4 terminal-font text-xs"
                  style={{ color: "var(--text-secondary)", opacity: 0.5 }}
                >
                  Press ⊕ to restore
                </span>
              )}
            </div>

            {/* Body */}
            {!minimized && (
              <div
                className="terminal-font flex flex-col flex-1"
                style={{
                  background: maximized ? "#0a0a0a" : "var(--terminal-bg)",
                  height: maximized ? undefined : "456px",
                  flex: maximized ? 1 : undefined,
                }}
              >
                {/* Output */}
                <div
                  className="flex-1 overflow-y-auto"
                  style={{
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
