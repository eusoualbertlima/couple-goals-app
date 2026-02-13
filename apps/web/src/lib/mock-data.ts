import type { AppState } from "./types";

export const initialState: AppState = {
  theme: "dark",
  coupleLevel: "DISCIPLINADOS",
  disciplineScore: 468,
  habits: [
    {
      id: "habit-1",
      title: "Treino de forca",
      category: "SAUDE",
      frequency: "DIARIO",
      weeklyTarget: 5,
      monthlyTarget: 22,
      yearlyTarget: 240,
      visibility: "COMPARTILHADO",
      remindersEnabled: true,
      currentWeekCompletions: 4,
      streakDays: 36
    },
    {
      id: "habit-2",
      title: "Planejamento profundo",
      category: "PRODUTIVIDADE",
      frequency: "SEMANAL",
      weeklyTarget: 3,
      monthlyTarget: 12,
      yearlyTarget: 140,
      visibility: "COMPARTILHADO",
      remindersEnabled: true,
      currentWeekCompletions: 2,
      streakDays: 30
    },
    {
      id: "habit-3",
      title: "Leitura estrategica",
      category: "PRODUTIVIDADE",
      frequency: "DIARIO",
      weeklyTarget: 6,
      monthlyTarget: 24,
      yearlyTarget: 260,
      visibility: "PRIVADO",
      remindersEnabled: false,
      currentWeekCompletions: 5,
      streakDays: 18
    }
  ],
  goals: [
    {
      id: "goal-1",
      title: "Saude e performance fisica",
      weeklyProgress: 82,
      monthlyProgress: 74,
      yearlyProgress: 46,
      isShared: true
    },
    {
      id: "goal-2",
      title: "Disciplina de execucao profissional",
      weeklyProgress: 77,
      monthlyProgress: 69,
      yearlyProgress: 51,
      isShared: true
    }
  ],
  metrics: {
    individualA: 88,
    individualB: 83,
    couple: 86,
    weeklyStreak: 5,
    monthlyStreak: 4,
    annualStreak: 2
  },
  treeState: {
    rootPower: 74,
    branchGrowth: 69,
    flowerUnlocks: 8,
    synchronizedRhythmActive: true,
    synchronizedDays: 22,
    activeSkin: "Obsidian Bloom"
  },
  storeItems: [
    {
      id: "shop-1",
      name: "Folhas de bronzo velado",
      category: "FOLHA",
      requirementLabel: "7 dias de streak conjunta perfeita",
      unlocked: true
    },
    {
      id: "shop-2",
      name: "Tronco denso imperial",
      category: "TRONCO",
      requirementLabel: "30 dias sem quebra conjunta",
      unlocked: false
    },
    {
      id: "shop-3",
      name: "Fundo Aurora Silenciosa",
      category: "FUNDO",
      requirementLabel: "Disciplina acima de 420",
      unlocked: true
    },
    {
      id: "shop-4",
      name: "Luz Ambiente Meridian",
      category: "LUZ",
      requirementLabel: "4 check-ins semanais completos",
      unlocked: false
    }
  ],
  weeklyCheckin: {
    weekLabel: "Semana 06/2026",
    individualSummary:
      "Ambos mantiveram consistencia superior a 80%, com destaque para estabilidade matinal.",
    coupleSummary:
      "A execucao conjunta evoluiu em frequencia e previsibilidade, com menor variacao nos dias criticos.",
    improvements:
      "Maior alinhamento no inicio do dia e fechamento noturno de tarefas estrategicas.",
    failures:
      "Quinta-feira apresentou queda de energia e reduziu a conclusao dos habitos de saude.",
    reflectiveQuestion:
      "Qual ajuste de rotina pode proteger a constancia do casal mesmo em dias de alta pressao?",
    completed: false
  },
  analytics: [
    { week: "W1", consistency: 61, health: 58, productivity: 64, discipline: 60 },
    { week: "W2", consistency: 67, health: 62, productivity: 69, discipline: 66 },
    { week: "W3", consistency: 72, health: 71, productivity: 70, discipline: 71 },
    { week: "W4", consistency: 76, health: 74, productivity: 75, discipline: 75 },
    { week: "W5", consistency: 83, health: 81, productivity: 84, discipline: 82 },
    { week: "W6", consistency: 88, health: 86, productivity: 87, discipline: 86 }
  ],
  heatmap: Array.from({ length: 56 }, (_, index) => {
    const value = [0, 1, 2, 3, 4][Math.floor((Math.sin(index * 0.78) + 1.8) % 5)];
    return {
      day: `D${index + 1}`,
      value
    };
  }),
  correlations: [
    { habitA: "Treino", habitB: "Planejamento", score: 0.72 },
    { habitA: "Treino", habitB: "Leitura", score: 0.56 },
    { habitA: "Planejamento", habitB: "Leitura", score: 0.68 }
  ],
  motivationalCardsEnabled: true,
  focusHabitId: "habit-1"
};
