"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="glass-card sticky top-5 hidden h-[calc(100vh-2.5rem)] w-64 shrink-0 rounded-premium p-5 lg:block">
      <div className="mb-8 border-b border-stroke pb-5">
        <p className="section-title text-xs uppercase tracking-[0.28em] text-text-muted">Evolucao Conjunta</p>
        <h1 className="mt-2 section-title text-2xl font-semibold">Constancia a Dois</h1>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-accent-soft text-text shadow-premium"
                  : "text-text-muted hover:bg-accent-soft/60 hover:text-text"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
