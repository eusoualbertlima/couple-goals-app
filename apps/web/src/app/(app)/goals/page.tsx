import { GoalsBoard } from "@/components/goals/goals-board";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

export default function GoalsPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Metas"
        subtitle="Planejamento semanal, mensal e anual com desbloqueio de flores e progressao conjunta."
      />
      <CinematicReveal delay={0.08}>
        <GoalsBoard />
      </CinematicReveal>
    </div>
  );
}
