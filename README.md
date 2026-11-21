# Mapa da Clareza

Plataforma interativa de orientação profissional (Fase 1: design system + motor de formulários com `localStorage`).

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS (tokens editoriais)
- Zod (validação do rascunho local)
- Framer Motion (transições leves)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |

## Fase 1 — o que está incluso

- Design system editorial (`#F4F0EA` / `#1A1A1A` / `#3A4A3F`)
- Tipos em `src/types/assessment.ts`
- Mocks Cap. 1 (texto / múltipla escolha) e Cap. 2 (escala 1–5 + somatório/bandas)
- Layout + barra de progresso + navegação entre capítulos
- Motor passo a passo (avançar / voltar / editar) com feedback visível de save em `localStorage`

**Fora desta fase:** Supabase, Auth, admin, Cap. 3–7 com conteúdo completo.
