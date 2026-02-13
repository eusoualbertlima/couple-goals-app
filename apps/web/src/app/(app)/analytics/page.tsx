"use client";

import dynamic from "next/dynamic";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

const AnalyticsCharts = dynamic(
  () => import("@/components/analytics/analytics-charts").then((module) => module.AnalyticsCharts),
  { ssr: false }
);
const HeatmapGrid = dynamic(
  () => import("@/components/analytics/heatmap-grid").then((module) => module.HeatmapGrid),
  { ssr: false }
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Analytics premium"
        subtitle="Heatmap de consistencia, curva de disciplina, correlacao entre habitos e evolucao comparativa."
      />
      <CinematicReveal delay={0.08}>
        <HeatmapGrid />
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <AnalyticsCharts />
      </CinematicReveal>
    </div>
  );
}
