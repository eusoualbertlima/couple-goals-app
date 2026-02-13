"use client";

import { Panel } from "@/components/shared/panel";

const comparisonRows = [
  {
    metric: "Constancia conjunta",
    previous: "78%",
    current: "86%"
  },
  {
    metric: "Habitos de saude",
    previous: "72%",
    current: "84%"
  },
  {
    metric: "Habitos de produtividade",
    previous: "74%",
    current: "87%"
  }
];

export function MonthlyComparison() {
  return (
    <Panel title="Evolucao mensal comparativa" subtitle="Comparativo objetivo entre ciclo anterior e ciclo atual.">
      <div className="space-y-3">
        {comparisonRows.map((row) => (
          <div key={row.metric} className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-3 rounded-xl border border-stroke bg-surface p-3">
            <p className="text-sm">{row.metric}</p>
            <p className="text-sm text-text-muted">{row.previous}</p>
            <p className="text-sm font-semibold text-accent">{row.current}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
