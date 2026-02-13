# Couple Evolution Platform

Plataforma SaaS premium para evolucao de habitos em casal, com foco em produtividade, saude e disciplina conjunta.

## Monorepo

- `apps/web`: Next.js + TypeScript + Tailwind + Zustand + Framer Motion + GSAP + Lottie
- `apps/api`: NestJS + PostgreSQL + Prisma + JWT + Argon2 + eventos internos
- `packages/shared`: tipos e constantes compartilhadas

## Requisitos

- Node.js 20+
- PostgreSQL 15+

## Setup

```bash
npm install
cp .env.example apps/api/.env
npm run prisma:generate
npm run dev
```

## URLs locais

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api`

