export const EVENT_TYPES = [
  "HabitCompleted",
  "StreakBroken",
  "CoupleGoalCompleted",
  "WeeklyCheckinCompleted",
  "LevelUnlocked"
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface PlatformEvent {
  type: EventType;
  coupleId: string;
  actorUserId?: string;
  payload: Record<string, unknown>;
  occurredAt: string;
}
