import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { ProfileSettingsPanel } from "@/components/shared/profile-settings";
import { SectionHeader } from "@/components/shared/section-header";

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Perfil"
        subtitle="Preferencias de notificacao, motivacao e seguranca para preservar constancia de longo prazo."
      />
      <CinematicReveal delay={0.08}>
        <ProfileSettingsPanel />
      </CinematicReveal>
    </div>
  );
}
