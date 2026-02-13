"use client";

import { RetentionIcon } from "@/components/icons/module-icons";
import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function RetentionAlerts() {
  const habits = useAppStore((state) => state.habits);
  const riskHabits = habits.filter((habit) => habit.currentWeekCompletions + 1 < habit.weeklyTarget);
  const nearGoalHabits = habits.filter(
    (habit) => habit.currentWeekCompletions >= habit.weeklyTarget - 1 && habit.currentWeekCompletions < habit.weeklyTarget
  );

  return (
    <Panel title="Retencao inteligente" subtitle="Risco de quebra, metas quase concluidas e reforco positivo.">
      <div className="grid gap-3 lg:grid-cols-3">
        <article className="rounded-2xl border border-danger/30 bg-danger/10 p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-danger">
            <RetentionIcon className="h-4 w-4" />
            Risco de quebra
          </div>
          <p className="text-sm text-text-muted">
            {riskHabits.length} habitos precisam de uma conclusao hoje para proteger a streak conjunta.
          </p>
        </article>

        <article className="rounded-2xl border border-warning/30 bg-warning/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-warning">Meta quase concluida</p>
          <p className="mt-2 text-sm text-text-muted">
            {nearGoalHabits.length} habitos estao a um passo da meta semanal.
          </p>
        </article>

        <article className="rounded-2xl border border-success/30 bg-success/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-success">Feedback positivo</p>
          <p className="mt-2 text-sm text-text-muted">
            Sua constancia da semana atual supera o mesmo periodo do mes anterior.
          </p>
        </article>
      </div>
    </Panel>
  );
}
