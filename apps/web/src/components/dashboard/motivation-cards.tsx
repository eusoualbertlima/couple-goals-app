"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/shared/panel";
import { useAppStore } from "@/store/use-app-store";

const cards = [
  {
    id: "health",
    title: "Saude em constancia",
    text: "Seu historico recente indica alta aderencia matinal. Preservar esse bloco sustentara o resto do dia."
  },
  {
    id: "prod",
    title: "Produtividade disciplinada",
    text: "Vocês estao concluindo tarefas profundas antes do meio-dia com maior previsibilidade."
  },
  {
    id: "retention",
    title: "Compromisso emocional",
    text: "A soma de pequenos cumprimentos diarios reforca confianca mutua e reduz rupturas de streak."
  }
];

export function MotivationCards() {
  const enabled = useAppStore((state) => state.motivationalCardsEnabled);

  if (!enabled) {
    return (
      <Panel title="Cartoes motivacionais" subtitle="Desativados no perfil.">
        <p className="text-sm text-text-muted">Ative novamente quando quiser reforco de direcao comportamental.</p>
      </Panel>
    );
  }

  return (
    <Panel
      title="Cartoes motivacionais"
      subtitle="Mensagens sofisticadas e personalizadas por desempenho da semana."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-stroke bg-surface px-4 py-4"
          >
            <h4 className="section-title text-base font-semibold">{card.title}</h4>
            <p className="mt-2 text-sm text-text-muted">{card.text}</p>
          </motion.article>
        ))}
      </div>
    </Panel>
  );
}
