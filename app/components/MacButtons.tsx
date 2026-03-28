"use client";

interface MacButtonsProps {
  title?: string;
  onMinimize?: () => void;
  onClose?: () => void;
}

export default function MacButtons({ title, onMinimize, onClose }: MacButtonsProps) {
  return (
    <div className="mac-titlebar">
      <div className="mac-buttons flex gap-2">
        <div className="mac-btn mac-btn-close" onClick={onClose}>
          <span className="mac-btn-label">✕</span>
        </div>
        <div className="mac-btn mac-btn-minimize" onClick={onMinimize}>
          <span className="mac-btn-label">−</span>
        </div>
        <div className="mac-btn mac-btn-maximize">
          <span className="mac-btn-label">+</span>
        </div>
      </div>
      {title && (
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-medium terminal-font"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
