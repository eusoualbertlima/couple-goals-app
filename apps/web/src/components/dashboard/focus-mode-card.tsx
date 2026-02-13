"use client";

import { motion } from "framer-motion";
import { FocusIcon } from "@/components/icons/module-icons";
import { Panel } from "@/components/shared/panel";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useAppStore } from "@/store/use-app-store";

export function FocusModeCard() {
  const theme = useAppStore((state) => state.theme);
  const habits = useAppStore((state) => state.habits);
  const focusHabitId = useAppStore((state) => state.focusHabitId);
  const completeHabit = useAppStore((state) => state.completeHabit);
  const focusHabit = habits.find((habit) => habit.id === focusHabitId) ?? habits[0];

  const percentage = Math.round((focusHabit.currentWeekCompletions / focusHabit.weeklyTarget) * 100);
  const minimal = theme.includes("minimal");

  return (
    <Panel
      title="Modo foco do dia"
      subtitle="Habito estrategico destacado para proteger a disciplina conjunta."
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-70">
        <motion.div
          className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-soft blur-3xl"
          animate={minimal ? { opacity: 0.55 } : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-stroke px-3 py-1 text-xs uppercase tracking-[0.14em] text-text-muted">
              <FocusIcon className="h-3.5 w-3.5" />
              Foco
            </div>
            <h4 className="section-title text-xl font-semibold">{focusHabit.title}</h4>
            <p className="mt-1 text-sm text-text-muted">
              Meta semanal {focusHabit.currentWeekCompletions}/{focusHabit.weeklyTarget}
            </p>
          </div>
          <button
            onClick={() => completeHabit(focusHabit.id)}
            className="rounded-xl border border-stroke bg-accent-soft px-3 py-2 text-sm transition hover:bg-accent/20"
            type="button"
          >
            Marcar conclusao
          </button>
        </div>
        <ProgressBar value={percentage} />
      </div>
    </Panel>
  );
}
