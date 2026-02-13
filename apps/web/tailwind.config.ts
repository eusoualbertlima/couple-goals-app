import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        stroke: "var(--stroke)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)"
      },
      boxShadow: {
        premium: "0 24px 40px -24px rgba(9, 12, 18, 0.48)"
      },
      borderRadius: {
        premium: "1.25rem"
      },
      fontFamily: {
        display: ["'Manrope'", "sans-serif"],
        body: ["'Inter Tight'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
