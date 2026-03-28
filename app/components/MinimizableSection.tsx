"use client";

import { AnimatePresence, motion } from "framer-motion";
import MacButtons from "./MacButtons";
import { minimizeVariants } from "./minimizeVariants";

interface Props {
  id: string;
  title: string;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
  sectionId: string;
  children: React.ReactNode;
  sectionStyle?: React.CSSProperties;
}


export default function MinimizableSection({
  id,
  title,
  isMinimized,
  onMinimize,
  sectionId,
  children,
  sectionStyle,
}: Props) {
  return (
    <section id={sectionId} style={{ padding: isMinimized ? 0 : "80px 24px", overflow: "hidden", ...sectionStyle }}>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key={id}
            variants={minimizeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
            className="max-w-5xl mx-auto"
          >
            <div className="mac-window">
              <MacButtons title={title} onMinimize={onMinimize} onClose={onMinimize} />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
