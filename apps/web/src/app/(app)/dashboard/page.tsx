import { DisciplineOverview } from "@/components/dashboard/discipline-overview";
import { FocusModeCard } from "@/components/dashboard/focus-mode-card";
import { MonthlyComparison } from "@/components/dashboard/monthly-comparison";
import { MotivationCards } from "@/components/dashboard/motivation-cards";
import { StreakGrid } from "@/components/dashboard/streak-grid";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Dashboard premium"
        subtitle="Painel principal de evolucao conjunta para manter disciplina, saude e produtividade em alto nivel."
      />

      <div className="grid gap-4 xl:grid-cols-5">
        <CinematicReveal delay={0.05}>
          <div className="xl:col-span-2">
            <DisciplineOverview />
          </div>
        </CinematicReveal>
        <CinematicReveal delay={0.12}>
          <div className="xl:col-span-3">
            <FocusModeCard />
          </div>
        </CinematicReveal>
      </div>

      <CinematicReveal delay={0.18}>
        <StreakGrid />
      </CinematicReveal>

      <div className="grid gap-4 xl:grid-cols-2">
        <CinematicReveal delay={0.23}>
          <MonthlyComparison />
        </CinematicReveal>
        <CinematicReveal delay={0.26}>
          <MotivationCards />
        </CinematicReveal>
      </div>
    </div>
  );
}
