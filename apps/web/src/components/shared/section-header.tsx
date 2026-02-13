import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <header className={cn("mb-6", className)}>
      <h2 className="section-title text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-3xl text-sm text-text-muted md:text-base">{subtitle}</p>}
    </header>
  );
}
