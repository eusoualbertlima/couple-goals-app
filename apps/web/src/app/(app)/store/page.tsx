import { CinematicReveal } from "@/components/motion/cinematic-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { StoreGrid } from "@/components/store/store-grid";

export default function StorePage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Loja"
        subtitle="Catalogo de elementos visuais desbloqueaveis por merito. Sem pagamento real nesta fase."
      />
      <CinematicReveal delay={0.09}>
        <StoreGrid />
      </CinematicReveal>
    </div>
  );
}
