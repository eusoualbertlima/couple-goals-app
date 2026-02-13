import { HabitTable } from "@/components/habits/habit-table";
import { RetentionAlerts } from "@/components/habits/retention-alerts";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

export default function HabitsPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Habitos"
        subtitle="Gestao completa por categoria, frequencia, metas, visibilidade e modo foco diario."
      />
      <CinematicReveal delay={0.05}>
        <RetentionAlerts />
      </CinematicReveal>
      <CinematicReveal delay={0.1}>
        <HabitTable />
      </CinematicReveal>
    </div>
  );
}
