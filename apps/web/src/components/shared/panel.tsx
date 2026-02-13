import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, children, className }: PanelProps) {
  return (
    <section className={cn("glass-card rounded-premium p-5 md:p-6", className)}>
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h3 className="section-title text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
