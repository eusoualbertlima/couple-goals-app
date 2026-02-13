import { WeeklyCheckinPanel } from "@/components/checkin/weekly-checkin-panel";
import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";

export default function CheckinPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Check-in semanal"
        subtitle="Resumo automatico individual e conjunto para manter o casal alinhado no compromisso."
      />
      <CinematicReveal delay={0.08}>
        <WeeklyCheckinPanel />
      </CinematicReveal>
    </div>
  );
}
