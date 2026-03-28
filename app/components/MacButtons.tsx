"use client";

interface MacButtonsProps {
  title?: string;
}

export default function MacButtons({ title }: MacButtonsProps) {
  return (
    <div className="mac-titlebar">
      <div className="mac-buttons flex gap-2">
        <div className="mac-btn mac-btn-close">
          <span className="mac-btn-label">✕</span>
        </div>
        <div className="mac-btn mac-btn-minimize">
          <span className="mac-btn-label">−</span>
        </div>
        <div className="mac-btn mac-btn-maximize">
          <span className="mac-btn-label">+</span>
        </div>
      </div>
      {title && (
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
