"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";

export function ThemeRuntime() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
