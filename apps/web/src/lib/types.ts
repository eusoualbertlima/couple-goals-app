import type { CoupleLevel, ThemeMode } from "@couple-evolution/shared";

export type HabitCategory = "SAUDE" | "PRODUTIVIDADE";
export type Frequency = "DIARIO" | "SEMANAL" | "PERSONALIZADO";
export type Visibility = "PRIVADO" | "COMPARTILHADO";

export interface Habit {
  id: string;
  title: string;
  category: HabitCategory;
  frequency: Frequency;
  weeklyTarget: number;
  monthlyTarget: number;
  yearlyTarget: number;
  visibility: Visibility;
  remindersEnabled: boolean;
  currentWeekCompletions: number;
  streakDays: number;
}

export interface GoalProgress {
  id: string;
  title: string;
  weeklyProgress: number;
  monthlyProgress: number;
  yearlyProgress: number;
  isShared: boolean;
}

export interface DisciplineMetrics {
  individualA: number;
  individualB: number;
  couple: number;
  weeklyStreak: number;
  monthlyStreak: number;
  annualStreak: number;
}

export interface TreeState {
  rootPower: number;
  branchGrowth: number;
  flowerUnlocks: number;
  synchronizedRhythmActive: boolean;
  synchronizedDays: number;
  activeSkin: string;
}

export interface StoreItem {
  id: string;
  name: string;
  category: "FOLHA" | "TRONCO" | "FUNDO" | "ESTACAO" | "LUZ" | "CRIATURA";
  requirementLabel: string;
  unlocked: boolean;
}

export interface WeeklyCheckin {
  weekLabel: string;
  individualSummary: string;
  coupleSummary: string;
  improvements: string;
  failures: string;
  reflectiveQuestion: string;
  completed: boolean;
}

export interface HeatmapDay {
  day: string;
  value: number;
}

export interface AnalyticsPoint {
  week: string;
  consistency: number;
  health: number;
  productivity: number;
  discipline: number;
}

export interface CorrelationPoint {
  habitA: string;
  habitB: string;
  score: number;
}

export interface AppState {
  theme: ThemeMode;
  coupleLevel: CoupleLevel;
  disciplineScore: number;
  habits: Habit[];
  goals: GoalProgress[];
  metrics: DisciplineMetrics;
  treeState: TreeState;
  storeItems: StoreItem[];
  weeklyCheckin: WeeklyCheckin;
  analytics: AnalyticsPoint[];
  heatmap: HeatmapDay[];
  correlations: CorrelationPoint[];
  motivationalCardsEnabled: boolean;
  focusHabitId: string;
}
