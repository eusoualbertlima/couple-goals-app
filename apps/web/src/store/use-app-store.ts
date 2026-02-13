"use client";

import { create } from "zustand";
import type { ThemeMode } from "@couple-evolution/shared";
import { COUPLE_LEVEL_RULES } from "@couple-evolution/shared";
import { initialState } from "@/lib/mock-data";
import type { AppState, StoreItem } from "@/lib/types";

interface AppActions {
  setTheme: (theme: ThemeMode) => void;
  setFocusHabit: (habitId: string) => void;
  toggleMotivationalCards: () => void;
  completeHabit: (habitId: string) => void;
  unlockStoreItem: (itemId: string) => void;
  completeWeeklyCheckin: () => void;
}

type AppStore = AppState & AppActions;

const recalculateLevel = (score: number) => {
  return (
    [...COUPLE_LEVEL_RULES]
      .reverse()
      .find((rule) => score >= rule.minDisciplineScore)?.key ?? "INICIANTES"
  );
};

const updateStoreItems = (items: StoreItem[], itemId: string): StoreItem[] =>
  items.map((item) => (item.id === itemId ? { ...item, unlocked: true } : item));

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  setTheme: (theme) => set({ theme }),
  setFocusHabit: (habitId) => set({ focusHabitId: habitId }),
  toggleMotivationalCards: () =>
    set((state) => ({ motivationalCardsEnabled: !state.motivationalCardsEnabled })),
  completeHabit: (habitId) =>
    set((state) => {
      const habits = state.habits.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }
        return {
          ...habit,
          currentWeekCompletions: habit.currentWeekCompletions + 1,
          streakDays: habit.streakDays + 1
        };
      });

      const disciplineScore = Math.min(999, state.disciplineScore + 6);
      return {
        habits,
        disciplineScore,
        coupleLevel: recalculateLevel(disciplineScore),
        metrics: {
          ...state.metrics,
          couple: Math.min(100, state.metrics.couple + 1)
        },
        treeState: {
          ...state.treeState,
          branchGrowth: Math.min(100, state.treeState.branchGrowth + 2),
          rootPower: Math.min(100, state.treeState.rootPower + 1)
        }
      };
    }),
  unlockStoreItem: (itemId) =>
    set((state) => ({
      storeItems: updateStoreItems(state.storeItems, itemId)
    })),
  completeWeeklyCheckin: () =>
    set((state) => ({
      weeklyCheckin: {
        ...state.weeklyCheckin,
        completed: true
      },
      disciplineScore: Math.min(999, state.disciplineScore + 12)
    }))
}));
