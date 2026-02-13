export type CoupleLevel =
  | "INICIANTES"
  | "CONSTANTES"
  | "EVOLUINDO"
  | "DISCIPLINADOS"
  | "MESTRES_DA_CONSTANCIA";

export interface LevelRule {
  key: CoupleLevel;
  label: string;
  minDisciplineScore: number;
  description: string;
}

export const COUPLE_LEVEL_RULES: LevelRule[] = [
  {
    key: "INICIANTES",
    label: "Iniciantes",
    minDisciplineScore: 0,
    description: "Fase de fundacao de constancia conjunta."
  },
  {
    key: "CONSTANTES",
    label: "Constantes",
    minDisciplineScore: 140,
    description: "Primeiras provas reais de consistencia semanal."
  },
  {
    key: "EVOLUINDO",
    label: "Evoluindo",
    minDisciplineScore: 280,
    description: "Ritmo estavel com crescimento progressivo."
  },
  {
    key: "DISCIPLINADOS",
    label: "Disciplinados",
    minDisciplineScore: 430,
    description: "Compromisso elevado em produtividade e saude."
  },
  {
    key: "MESTRES_DA_CONSTANCIA",
    label: "Mestres da Constancia",
    minDisciplineScore: 620,
    description: "Patamar de referencia em disciplina conjunta."
  }
];

export const TREE_UNLOCK_MILESTONES = [
  { days: 7, reward: "Folha especial" },
  { days: 30, reward: "Novo galho" },
  { days: 90, reward: "Especie rara" },
  { days: 180, reward: "Arvore lendaria" }
];
