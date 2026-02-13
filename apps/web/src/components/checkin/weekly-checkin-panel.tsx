"use client";

import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function WeeklyCheckinPanel() {
  const checkin = useAppStore((state) => state.weeklyCheckin);
  const completeWeeklyCheckin = useAppStore((state) => state.completeWeeklyCheckin);

  return (
    <Panel
      title="Check-in semanal automatico"
      subtitle="Resumo individual e conjunto com pergunta reflexiva para fortalecer envolvimento emocional."
    >
      <div className="space-y-4">
        <article className="rounded-2xl border border-stroke bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{checkin.weekLabel}</p>
          <p className="mt-2 text-sm text-text-muted">{checkin.individualSummary}</p>
          <p className="mt-2 text-sm text-text-muted">{checkin.coupleSummary}</p>
        </article>
        <article className="rounded-2xl border border-stroke bg-surface p-4">
          <p className="text-sm">
            <strong>Onde melhoraram:</strong> {checkin.improvements}
          </p>
          <p className="mt-2 text-sm">
            <strong>Onde falharam:</strong> {checkin.failures}
          </p>
          <p className="mt-3 text-sm text-accent">
            <strong>Pergunta reflexiva:</strong> {checkin.reflectiveQuestion}
          </p>
        </article>
        <button
          type="button"
          disabled={checkin.completed}
          onClick={() => completeWeeklyCheckin()}
          className="rounded-lg border border-stroke bg-accent-soft px-4 py-2 text-sm transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checkin.completed ? "Check-in concluido" : "Concluir check-in da semana"}
        </button>
      </div>
    </Panel>
  );
}
