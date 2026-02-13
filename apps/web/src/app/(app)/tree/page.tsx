"use client";

import dynamic from "next/dynamic";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

const EvolutionTree = dynamic(
  () => import("@/components/tree/evolution-tree").then((module) => module.EvolutionTree),
  { ssr: false }
);

export default function TreePage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Arvore evolutiva"
        subtitle="Sistema central de evolucao: raizes por habito, galhos por streak, flores por metas e skins por nivel."
      />
      <CinematicReveal delay={0.1}>
        <EvolutionTree />
      </CinematicReveal>
    </div>
  );
}
