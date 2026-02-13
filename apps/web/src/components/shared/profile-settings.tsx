"use client";

import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function ProfileSettingsPanel() {
  const motivationalCardsEnabled = useAppStore((state) => state.motivationalCardsEnabled);
  const toggleMotivationalCards = useAppStore((state) => state.toggleMotivationalCards);

  return (
    <Panel title="Perfil e preferencias" subtitle="Controles de comunicacao, visual e retenção de longo prazo.">
      <div className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-2xl border border-stroke bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Cartoes motivacionais</p>
          <p className="mt-2 text-sm text-text-muted">
            Textos personalizados por categoria e performance para manter o compromisso ativo.
          </p>
          <button
            type="button"
            onClick={() => toggleMotivationalCards()}
            className="mt-4 rounded-lg border border-stroke px-3 py-2 text-sm hover:bg-accent-soft"
          >
            {motivationalCardsEnabled ? "Desativar cartoes" : "Ativar cartoes"}
          </button>
        </article>

        <article className="rounded-2xl border border-stroke bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Privacidade e seguranca</p>
          <ul className="mt-2 space-y-1 text-sm text-text-muted">
            <li>Autenticacao com token curto e refresh rotativo.</li>
            <li>Protecao contra brute force e trilha de auditoria ativa.</li>
            <li>Validacao forte e sanitizacao de entrada em todos os modulos.</li>
          </ul>
        </article>
      </div>
    </Panel>
  );
}
