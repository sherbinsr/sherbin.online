"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TerminalLine {
  type: "prompt" | "user" | "assistant" | "system" | "divider";
  content: string;
}

export default function ShelbyTerminal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const terminalLines: TerminalLine[] = [
    {
      type: "system",
      content: "Shelby AI — Sherbin's personal assistant v1.0.0",
    },
    {
      type: "system",
      content: 'Type your question and press Enter. Try "tell me about Sherbin"',
    },
    { type: "divider", content: "" },
    ...messages.flatMap((m): TerminalLine[] =>
      m.role === "user"
        ? [{ type: "user", content: m.content }]
        : [{ type: "assistant", content: m.content }]
    ),
  ];

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

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
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Shelby button */}
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
      {open && (
        <div
          className="fixed bottom-8 right-8 z-50 mac-window"
          style={{
            width: "min(520px, calc(100vw - 32px))",
            maxHeight: minimized ? "44px" : "500px",
            transition: "max-height 0.25s ease",
            overflow: "hidden",
          }}
        >
          {/* Titlebar */}
          <div className="mac-titlebar" style={{ background: "#1e1e1e" }}>
            <div className="mac-buttons flex gap-2">
              <div
                className="mac-btn mac-btn-close"
                onClick={() => { setOpen(false); setMinimized(false); }}
                title="Close"
              >
                <span className="mac-btn-label">✕</span>
              </div>
              <div
                className="mac-btn mac-btn-minimize"
                onClick={() => setMinimized((v) => !v)}
                title="Minimize"
              >
                <span className="mac-btn-label">−</span>
              </div>
              <div
                className="mac-btn mac-btn-maximize"
                onClick={() => setMinimized(false)}
                title="Maximize"
              >
                <span className="mac-btn-label">+</span>
              </div>
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 terminal-font text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              shelby — zsh
            </span>
          </div>

          {!minimized && (
            <div
              className="terminal-font"
              style={{ background: "#0d0d0d", display: "flex", flexDirection: "column", height: "456px" }}
            >
              {/* Output area */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ padding: "16px", fontSize: "12px", lineHeight: "1.7" }}
              >
                {terminalLines.map((line, i) => (
                  <div key={i}>
                    {line.type === "system" && (
                      <div style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--accent-green)" }}>shelby</span>
                        <span style={{ color: "#555" }}>@</span>
                        <span style={{ color: "var(--accent)" }}>portfolio</span>
                        <span style={{ color: "#555" }}> % </span>
                        <span style={{ color: "var(--text-secondary)" }}>{line.content}</span>
                      </div>
                    )}
                    {line.type === "divider" && (
                      <div style={{ borderTop: "1px solid #1e1e1e", margin: "8px 0" }} />
                    )}
                    {line.type === "user" && (
                      <div className="mt-2">
                        <span style={{ color: "var(--accent-green)" }}>you</span>
                        <span style={{ color: "#555" }}>@</span>
                        <span style={{ color: "var(--accent)" }}>shelby</span>
                        <span style={{ color: "#555" }}> % </span>
                        <span style={{ color: "var(--text-primary)" }}>{line.content}</span>
                      </div>
                    )}
                    {line.type === "assistant" && (
                      <div className="mt-1 ml-0" style={{ color: "#e0e0e0", whiteSpace: "pre-wrap" }}>
                        <span style={{ color: "var(--accent-purple)" }}>shelby › </span>
                        {line.content}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="mt-1" style={{ color: "var(--accent-purple)" }}>
                    shelby ›{" "}
                    <span style={{ color: "var(--text-secondary)" }}>
                      thinking
                      <span className="cursor-blink">▊</span>
                    </span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid #1e1e1e",
                  background: "#0a0a0a",
                }}
              >
                <span style={{ color: "var(--accent-green)", fontSize: "12px", flexShrink: 0 }}>
                  you@shelby %
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ask me anything about Sherbin..."
                  className="flex-1 bg-transparent outline-none terminal-font"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    caretColor: "var(--accent)",
                  }}
                  disabled={loading}
                />
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
