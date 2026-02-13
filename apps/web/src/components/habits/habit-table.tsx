"use client";

import { Panel } from "@/components/shared/panel";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useAppStore } from "@/store/use-app-store";

const badgeStyle: Record<string, string> = {
  SAUDE: "bg-success/20 text-success border-success/40",
  PRODUTIVIDADE: "bg-accent-soft text-accent border-accent/40",
  PRIVADO: "bg-stroke/30 text-text-muted border-stroke",
  COMPARTILHADO: "bg-warning/20 text-warning border-warning/40"
};

export function HabitTable() {
  const habits = useAppStore((state) => state.habits);
  const completeHabit = useAppStore((state) => state.completeHabit);
  const setFocusHabit = useAppStore((state) => state.setFocusHabit);

  return (
    <Panel
      title="Sistema de habitos"
      subtitle="Frequencia personalizada, metas semanal/mensal/anual, privacidade e modo foco."
    >
      <div className="space-y-4">
        {habits.map((habit) => {
          const progress = Math.min(100, (habit.currentWeekCompletions / habit.weeklyTarget) * 100);
          return (
            <article key={habit.id} className="rounded-2xl border border-stroke bg-surface p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="section-title text-lg font-semibold">{habit.title}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${badgeStyle[habit.category]}`}>
                      {habit.category}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${badgeStyle[habit.visibility]}`}>
                      {habit.visibility}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">
                    Frequencia: {habit.frequency} | Streak: {habit.streakDays} dias | Meta anual: {habit.yearlyTarget}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFocusHabit(habit.id)}
                    className="rounded-lg border border-stroke px-3 py-2 text-sm hover:bg-accent-soft"
                  >
                    Definir foco
                  </button>
                  <button
                    type="button"
                    onClick={() => completeHabit(habit.id)}
                    className="rounded-lg border border-accent/40 bg-accent-soft px-3 py-2 text-sm hover:bg-accent/20"
                  >
                    Registrar conclusao
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-text-muted">
                  <span>Meta semanal</span>
                  <span>
                    {habit.currentWeekCompletions}/{habit.weeklyTarget}
                  </span>
                </div>
                <ProgressBar value={progress} />
              </div>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}
