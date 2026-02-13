"use client";

import { TreeSkinIllustration } from "@/components/illustrations/tree-skin-illustration";
import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

export function StoreGrid() {
  const items = useAppStore((state) => state.storeItems);
  const unlockStoreItem = useAppStore((state) => state.unlockStoreItem);

  return (
    <div className="space-y-4">
      <Panel
        title="Loja de meritocracia"
        subtitle="Itens desbloqueados apenas por consistencia real. Estrutura pronta para assinatura futura."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-stroke bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{item.category}</p>
                  <h3 className="section-title mt-1 text-lg font-semibold">{item.name}</h3>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs ${
                    item.unlocked ? "border-success/35 bg-success/15 text-success" : "border-stroke text-text-muted"
                  }`}
                >
                  {item.unlocked ? "Desbloqueado" : "Bloqueado"}
                </span>
              </div>
              <p className="mt-3 text-sm text-text-muted">{item.requirementLabel}</p>
              {!item.unlocked && (
                <button
                  type="button"
                  onClick={() => unlockStoreItem(item.id)}
                  className="mt-4 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 text-sm transition hover:bg-accent/20"
                >
                  Simular desbloqueio por merito
                </button>
              )}
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Preview de skin ativa" subtitle="Visualizacao da arvore lendaria desbloqueada por progresso conjunto.">
        <TreeSkinIllustration />
      </Panel>
    </div>
  );
}
