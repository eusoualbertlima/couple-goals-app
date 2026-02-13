export type ThemeMode = "light" | "dark" | "minimal-light" | "minimal-dark";

export const THEME_LABELS: Record<ThemeMode, string> = {
  light: "Claro",
  dark: "Escuro",
  "minimal-light": "Minimalista Claro",
  "minimal-dark": "Minimalista Escuro"
};

export const PREMIUM_THEMES: ThemeMode[] = ["light", "dark", "minimal-light", "minimal-dark"];
