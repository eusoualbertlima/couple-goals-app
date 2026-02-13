"use client";

import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

const intensityClasses = [
  "bg-surface-muted border-stroke",
  "bg-accent-soft border-accent/15",
  "bg-accent/35 border-accent/30",
  "bg-accent/55 border-accent/45",
  "bg-accent border-accent/70"
];

export function HeatmapGrid() {
  const heatmap = useAppStore((state) => state.heatmap);

  return (
    <Panel
      title="Heatmap de consistencia"
      subtitle="Referencia conceitual de contribuicoes diarias para acompanhamento da constancia."
    >
      <div className="grid grid-cols-8 gap-2 sm:grid-cols-14">
        {heatmap.map((entry, index) => (
          <div
            key={`${entry.day}-${index}`}
            title={`${entry.day} | Intensidade ${entry.value}`}
            className={`aspect-square rounded-md border ${intensityClasses[entry.value] ?? intensityClasses[0]}`}
          />
        ))}
      </div>
    </Panel>
  );
}
