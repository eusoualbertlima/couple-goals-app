"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lottie from "lottie-react";
import { TREE_UNLOCK_MILESTONES } from "@couple-evolution/shared";
import syncPulse from "../../../public/lottie/sync-pulse.json";
import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function EvolutionTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<SVGGElement>(null);
  const trunkRef = useRef<SVGPathElement>(null);
  const theme = useAppStore((state) => state.theme);
  const treeState = useAppStore((state) => state.treeState);
  const minimal = theme.includes("minimal");

  const branchProgress = useMemo(() => treeState.branchGrowth / 100, [treeState.branchGrowth]);
  const rootProgress = useMemo(() => treeState.rootPower / 100, [treeState.rootPower]);

  useEffect(() => {
    if (minimal || !trunkRef.current) {
      return;
    }

    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline.to(trunkRef.current, {
      duration: 2.6,
      scaleY: 1.04,
      transformOrigin: "50% 100%",
      ease: "sine.inOut"
    });
    timeline.to(
      trunkRef.current,
      {
        duration: 2.6,
        scaleY: 1,
        ease: "sine.inOut"
      },
      ">-0.1"
    );

    return () => {
      timeline.kill();
    };
  }, [minimal]);

  useEffect(() => {
    if (minimal || !containerRef.current || !crownRef.current) {
      return;
    }

    const currentContainer = containerRef.current;
    const handleMove = (event: MouseEvent) => {
      const bounds = currentContainer.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(crownRef.current, {
        x: x * 18,
        y: y * 12,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    currentContainer.addEventListener("mousemove", handleMove);
    return () => currentContainer.removeEventListener("mousemove", handleMove);
  }, [minimal]);

  return (
    <Panel
      title="Arvore evolutiva"
      subtitle="Cada habito e uma raiz, streaks expandem galhos e metas conjuntas liberam flores e skins."
    >
      <div ref={containerRef} className="relative overflow-hidden rounded-3xl border border-stroke bg-surface p-6">
        {!minimal && (
          <div className="pointer-events-none absolute -top-8 right-0 h-52 w-52 opacity-75">
            <Lottie animationData={syncPulse} loop autoplay />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: minimal ? 0.4 : 0.9 }}
          className="relative mx-auto max-w-[680px]"
        >
          <svg viewBox="0 0 680 460" className="h-auto w-full">
            <defs>
              <linearGradient id="trunkGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 85%, #453120)" />
                <stop offset="100%" stopColor="color-mix(in srgb, var(--accent) 48%, #2a1f16)" />
              </linearGradient>
            </defs>

            <ellipse cx="340" cy="422" rx="220" ry="22" fill="color-mix(in srgb, var(--accent) 18%, transparent)" />
            <g ref={crownRef}>
              <motion.circle
                cx="340"
                cy="164"
                r="120"
                fill="color-mix(in srgb, var(--success) 52%, transparent)"
                initial={{ scale: 0.92, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: minimal ? 0.4 : 1.2 }}
              />
              <motion.circle
                cx="266"
                cy="204"
                r={52 + treeState.flowerUnlocks}
                fill="color-mix(in srgb, var(--success) 34%, transparent)"
                animate={minimal ? undefined : { x: [0, 2, -2, 0], y: [0, -2, 1, 0] }}
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.circle
                cx="418"
                cy="204"
                r={52 + treeState.flowerUnlocks}
                fill="color-mix(in srgb, var(--success) 34%, transparent)"
                animate={minimal ? undefined : { x: [0, -2, 2, 0], y: [0, 1, -2, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </g>

            <path
              ref={trunkRef}
              d="M338 418V236c0-46-28-74-30-118-1-36 16-58 32-58s33 22 32 58c-2 44-30 72-30 118v182"
              fill="url(#trunkGradient)"
            />

            <motion.path
              d="M340 264c-52-10-110-52-138-104"
              stroke="var(--accent)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={320}
              initial={{ strokeDashoffset: 320 }}
              animate={{ strokeDashoffset: 320 - 320 * branchProgress }}
              transition={{ duration: minimal ? 0.4 : 1.3, ease: "easeOut" }}
            />
            <motion.path
              d="M340 250c56-12 114-52 140-110"
              stroke="var(--accent)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={320}
              initial={{ strokeDashoffset: 320 }}
              animate={{ strokeDashoffset: 320 - 320 * branchProgress }}
              transition={{ duration: minimal ? 0.4 : 1.3, ease: "easeOut", delay: 0.1 }}
            />

            <motion.path
              d="M328 420c-40-18-62-40-90-70"
              stroke="color-mix(in srgb, var(--accent) 85%, #1f1510)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={180}
              initial={{ strokeDashoffset: 180 }}
              animate={{ strokeDashoffset: 180 - 180 * rootProgress }}
              transition={{ duration: minimal ? 0.4 : 1.1, ease: "easeOut" }}
            />
            <motion.path
              d="M352 420c36-16 64-38 92-68"
              stroke="color-mix(in srgb, var(--accent) 85%, #1f1510)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={180}
              initial={{ strokeDashoffset: 180 }}
              animate={{ strokeDashoffset: 180 - 180 * rootProgress }}
              transition={{ duration: minimal ? 0.4 : 1.1, ease: "easeOut", delay: 0.1 }}
            />

            {treeState.synchronizedRhythmActive && (
              <motion.circle
                cx="340"
                cy="86"
                r="16"
                fill="var(--warning)"
                animate={minimal ? { opacity: 1 } : { opacity: [0.55, 1, 0.55], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </svg>
        </motion.div>

        <div className="mt-5 grid gap-2 md:grid-cols-4">
          {TREE_UNLOCK_MILESTONES.map((milestone) => (
            <article key={milestone.days} className="rounded-2xl border border-stroke bg-surface px-3 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{milestone.days} dias</p>
              <p className="mt-1 text-sm">{milestone.reward}</p>
            </article>
          ))}
        </div>
      </div>
    </Panel>
  );
}
