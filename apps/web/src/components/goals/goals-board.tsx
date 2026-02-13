"use client";

import { Panel } from "@/components/shared/panel";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useAppStore } from "@/store/use-app-store";

export function GoalsBoard() {
  const goals = useAppStore((state) => state.goals);

  return (
    <Panel
      title="Metas conjuntas"
      subtitle="Metas com horizonte semanal, mensal e anual para direcionar evolucao de longo prazo."
    >
      <div className="space-y-4">
        {goals.map((goal) => (
          <article key={goal.id} className="rounded-2xl border border-stroke bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="section-title text-lg font-semibold">{goal.title}</h3>
              <span className="rounded-full border border-stroke px-2 py-0.5 text-xs text-text-muted">
                {goal.isShared ? "Compartilhada" : "Individual"}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs text-text-muted">
                  <span>Semanal</span>
                  <span>{goal.weeklyProgress}%</span>
                </div>
                <ProgressBar value={goal.weeklyProgress} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-text-muted">
                  <span>Mensal</span>
                  <span>{goal.monthlyProgress}%</span>
                </div>
                <ProgressBar value={goal.monthlyProgress} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-text-muted">
                  <span>Anual</span>
                  <span>{goal.yearlyProgress}%</span>
                </div>
                <ProgressBar value={goal.yearlyProgress} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
