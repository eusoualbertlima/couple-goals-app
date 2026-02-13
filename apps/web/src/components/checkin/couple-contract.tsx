"use client";

import { useState } from "react";
import { ContractIcon } from "@/components/icons/module-icons";
import { ContractIllustration } from "@/components/illustrations/contract-illustration";
import { Panel } from "@/components/shared/panel";

export function CoupleContractBuilder() {
  const [objective, setObjective] = useState("Consolidar disciplina conjunta em saude e execucao profissional.");
  const [pillarA, setPillarA] = useState("Saude");
  const [pillarB, setPillarB] = useState("Disciplina");
  const [pillarC, setPillarC] = useState("Financas");
  const [weeklyCommitment, setWeeklyCommitment] = useState(5);
  const [saved, setSaved] = useState(false);

  return (
    <Panel
      title="Contrato do casal"
      subtitle="Manifesto interno com objetivo central, pilares e compromisso minimo semanal."
    >
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        >
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted">Objetivo principal conjunto</span>
            <textarea
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-stroke bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">Pilar 1</span>
              <input
                value={pillarA}
                onChange={(event) => setPillarA(event.target.value)}
                className="w-full rounded-xl border border-stroke bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">Pilar 2</span>
              <input
                value={pillarB}
                onChange={(event) => setPillarB(event.target.value)}
                className="w-full rounded-xl border border-stroke bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">Pilar 3</span>
              <input
                value={pillarC}
                onChange={(event) => setPillarC(event.target.value)}
                className="w-full rounded-xl border border-stroke bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted">Compromisso minimo semanal</span>
            <input
              min={1}
              max={7}
              type="number"
              value={weeklyCommitment}
              onChange={(event) => setWeeklyCommitment(Number(event.target.value))}
              className="w-32 rounded-xl border border-stroke bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-4 py-2 text-sm transition hover:bg-accent/20"
          >
            <ContractIcon className="h-4 w-4" />
            Salvar manifesto
          </button>

          {saved && (
            <p className="rounded-lg border border-success/35 bg-success/12 px-3 py-2 text-sm text-success">
              Manifesto salvo com sucesso. O contrato orientara os check-ins semanais.
            </p>
          )}
        </form>

        <div className="rounded-2xl border border-stroke bg-surface p-4">
          <ContractIllustration />
        </div>
      </div>
    </Panel>
  );
}
