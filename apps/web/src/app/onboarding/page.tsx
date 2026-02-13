import Link from "next/link";
import { CoupleContractBuilder } from "@/components/checkin/couple-contract";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center gap-6 px-4 py-8">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Onboarding premium</p>
        <h1 className="section-title mt-2 text-3xl font-semibold md:text-4xl">Manifesto de evolucao conjunta</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-text-muted md:text-base">
          Definam o objetivo principal, pilares centrais e compromisso minimo semanal para orientar a plataforma.
        </p>
      </header>
      <CoupleContractBuilder />
      <div className="flex justify-end">
        <Link
          href="/dashboard"
          className="rounded-lg border border-stroke bg-accent-soft px-4 py-2 text-sm transition hover:bg-accent/20"
        >
          Finalizar onboarding e abrir dashboard
        </Link>
      </div>
    </div>
  );
}
