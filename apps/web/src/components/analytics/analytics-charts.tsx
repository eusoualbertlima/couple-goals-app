"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function AnalyticsCharts() {
  const analytics = useAppStore((state) => state.analytics);
  const correlations = useAppStore((state) => state.correlations);

  return (
    <div className="space-y-4">
      <Panel title="Curva de consistencia" subtitle="Evolucao semanal de saude, produtividade e score de disciplina.">
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart data={analytics}>
              <CartesianGrid stroke="var(--stroke)" strokeDasharray="4 4" />
              <XAxis dataKey="week" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--stroke)",
                  background: "var(--surface-muted)",
                  color: "var(--text)"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="consistency" stroke="var(--accent)" strokeWidth={2.4} />
              <Line type="monotone" dataKey="health" stroke="var(--success)" strokeWidth={2.2} />
              <Line type="monotone" dataKey="productivity" stroke="var(--warning)" strokeWidth={2.2} />
              <Line type="monotone" dataKey="discipline" stroke="var(--text)" strokeWidth={2.2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Correlacao entre habitos" subtitle="Associacao entre rotinas que se reforcam mutuamente.">
        <div className="grid gap-3 sm:grid-cols-3">
          {correlations.map((correlation) => (
            <article key={`${correlation.habitA}-${correlation.habitB}`} className="rounded-2xl border border-stroke bg-surface p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                {correlation.habitA} x {correlation.habitB}
              </p>
              <p className="mt-2 section-title text-3xl font-semibold">{Math.round(correlation.score * 100)}%</p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
