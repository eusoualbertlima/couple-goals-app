import type { Metadata } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { ThemeRuntime } from "@/components/shared/theme-runtime";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"]
});

const body = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Constancia a Dois",
  description:
    "SaaS premium para evolucao de habitos em casal com foco em disciplina conjunta, saude e produtividade."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className={`${display.variable} ${body.variable}`}>
        <ThemeRuntime />
        {children}
      </body>
    </html>
  );
}
