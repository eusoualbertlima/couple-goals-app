"use client";

import { THEME_LABELS, type ThemeMode } from "@couple-evolution/shared";
import { useAppStore } from "@/store/use-app-store";

const themeOptions: ThemeMode[] = ["light", "dark", "minimal-light", "minimal-dark"];

export function TopBar() {
  const theme = useAppStore((state) => state.theme);
  const disciplineScore = useAppStore((state) => state.disciplineScore);
  const coupleLevel = useAppStore((state) => state.coupleLevel);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <header className="glass-card mb-5 flex flex-col gap-3 rounded-premium p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Plataforma premium</p>
        <h2 className="section-title mt-1 text-xl font-semibold">Disciplina conjunta em progresso continuo</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-stroke px-3 py-2 text-sm">
          Score de disciplina: <span className="font-semibold text-accent">{disciplineScore}</span>
        </div>
        <div className="rounded-xl border border-stroke px-3 py-2 text-sm">
          Nivel atual: <span className="font-semibold">{coupleLevel.replaceAll("_", " ")}</span>
        </div>
        <label className="rounded-xl border border-stroke px-3 py-2 text-sm">
          <span className="mr-2 text-text-muted">Tema</span>
          <select
            className="bg-transparent text-text focus:outline-none"
            value={theme}
            onChange={(event) => setTheme(event.target.value as ThemeMode)}
          >
            {themeOptions.map((option) => (
              <option key={option} value={option}>
                {THEME_LABELS[option]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
