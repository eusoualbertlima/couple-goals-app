import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SideNav } from "@/components/layout/side-nav";
import { TopBar } from "@/components/layout/top-bar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1480px] gap-5 px-4 py-5 md:px-6">
      <SideNav />
      <main className="w-full pb-24 lg:pb-8">
        <TopBar />
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
