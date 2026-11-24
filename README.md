# Mapa da Clareza

Plataforma interativa de orientação profissional.

**Fase 1R** — motor de experiência (atos / bursts / beats), paleta editorial com destaque ouro da capa, Cap. 1–2 navegáveis.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS (tokens editoriais + gold `#F9BF3D`)
- Zod (validação do rascunho local)
- Motion (`motion/react`) — paper journey

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

## Fase 1R — o que está incluso

- Design system editorial + gold highlight (capa do ebook)
- Jornada em **atos** (A1–A3, B1–B2, C1) com cortinas tipográficas
- Beats: clusters biodata, uma pergunta por tela, Likert com auto-avanço (~350ms)
- Intersticiais tipográficos (só títulos/instruções do ebook)
- Progresso aninhado (ato + burst)
- Cap. 2: aptidões + interesses + peaks de ranking/faixas
- `localStorage` com feedback visível de save (zero falha silenciosa)
- Cap. 3–7 shells

**Fora desta fase:** Supabase, Auth, admin, conteúdo completo Cap. 3–7.
