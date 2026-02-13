"use client";

import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function StreakGrid() {
  const metrics = useAppStore((state) => state.metrics);
  const treeState = useAppStore((state) => state.treeState);

  const cards = [
    { label: "Streak semanal", value: `${metrics.weeklyStreak} ciclos` },
    { label: "Streak mensal", value: `${metrics.monthlyStreak} ciclos` },
    { label: "Streak anual", value: `${metrics.annualStreak} ciclos` },
    {
      label: "Ritmo sincronizado",
      value: treeState.synchronizedRhythmActive ? `${treeState.synchronizedDays} dias` : "Inativo"
    }
  ];

  return (
    <Panel title="Streak avancado" subtitle="Contagem individual, conjunta e sincronizacao de longo prazo.">
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-stroke bg-surface px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{card.label}</p>
            <p className="mt-2 section-title text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
