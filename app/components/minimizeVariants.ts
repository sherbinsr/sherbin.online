import type { Variants } from "framer-motion";

export const minimizeVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, y: -16 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.35,
    y: "55vh",
    x: "25vw",
    transition: { duration: 0.42, ease: "easeIn" },
  },
};
