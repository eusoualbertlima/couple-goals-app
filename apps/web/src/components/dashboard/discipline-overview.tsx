"use client";

import { Panel } from "@/components/shared/panel";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useAppStore } from "@/store/use-app-store";

export function DisciplineOverview() {
  const metrics = useAppStore((state) => state.metrics);
  const disciplineScore = useAppStore((state) => state.disciplineScore);

  return (
    <Panel
      title="Score de disciplina"
      subtitle="Visao consolidada de constancia individual e performance conjunta."
      className="h-full"
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Indice atual</p>
          <p className="section-title mt-2 text-4xl font-semibold text-accent">{disciplineScore}</p>
          <p className="mt-1 text-sm text-text-muted">A consistencia semanal cresceu 8% em relacao ao ultimo ciclo.</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Parceiro A</span>
              <span>{metrics.individualA}%</span>
            </div>
            <ProgressBar value={metrics.individualA} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Parceiro B</span>
              <span>{metrics.individualB}%</span>
            </div>
            <ProgressBar value={metrics.individualB} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Couple Score</span>
              <span>{metrics.couple}%</span>
            </div>
            <ProgressBar value={metrics.couple} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
