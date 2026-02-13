"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAppStore } from "@/store/use-app-store";

interface CinematicRevealProps {
  children: ReactNode;
  delay?: number;
}

export function CinematicReveal({ children, delay = 0 }: CinematicRevealProps) {
  const theme = useAppStore((state) => state.theme);
  const minimal = theme.includes("minimal");

  return (
    <motion.div
      initial={{ opacity: 0, scale: minimal ? 0.985 : 0.95, y: minimal ? 6 : 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: minimal ? 0.3 : 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
