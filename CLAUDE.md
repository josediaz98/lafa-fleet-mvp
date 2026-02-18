# LAFA Project Instructions

Research + strategy repo for evaluating the AI Product Engineer role at LAFA (Latin America Future Automobile). Contains a VC investment thesis, a marketing site with interactive prototypes, and a Fleet Intelligence MVP.

## Tech Stack

| Area | Stack |
|------|-------|
| `site/` | Vanilla HTML + JS, Tailwind CDN, ApexCharts, Leaflet.js |
| `fleet-intelligence/` | React 18 + TypeScript + Vite + Tailwind CSS + lucide-react + Supabase |
| `content/` | Markdown research files |

`site/` has no build step (CDN only). `fleet-intelligence/` uses Vite.

## Commands

```bash
# Static site (no build step)
npx serve .

# Fleet Intelligence MVP
cd fleet-intelligence && npm install   # first time only
cd fleet-intelligence && cp .env.example .env.local  # edit with Supabase keys
cd fleet-intelligence && npm run dev   # localhost:5173 — works without Supabase (falls back to mock data)
cd fleet-intelligence && npm run build # production → dist/
```

## Deployment (Vercel)

Single Vercel project. Root `vercel.json` routes `/` → `site/index.html`, `/app/*` → Fleet Intelligence SPA.
Build: `cd fleet-intelligence && npm install && npx tsc -b && npx vite build --base=/app/`

## Directory Layout

```
/Lafa/
├── site/                    ← Landing page + 6 prototypes (static HTML/JS)
│   ├── index.html           ← Marketing landing page
│   ├── core/                ← Shared: i18n, shared.js/css, tailwind config
│   └── {dashboard,battery,collections,fleetmap,onboarding,roadmap}/
├── fleet-intelligence/      ← Fleet Intelligence MVP (React + TS + Vite)
│   └── src/                 ← pages/, components/, context/, hooks/, lib/
├── content/                 ← Research & strategy (Markdown)
│   ├── thesis/              ← 8-chapter VC thesis (summary layer)
│   ├── analysis/            ← Evidence layer (fleet/, fintech/, market/)
│   ├── strategy/            ← Product strategy proposals
│   ├── hiring/              ← Interviews + technical challenge (has its own CLAUDE.md)
│   └── vemo-benchmark/      ← Competitive intel
└── images/
```

## Code Style (site/)

- **IIFE per page:** `(function () { ... })()`, shared state via `window.LAFA`
- **Script load order matters:** `i18n.js` → `shared.js` → page script. Swapping breaks i18n silently.
- **Tailwind + shared.css:** Utility classes first, custom components in `core/shared.css`
- **Design tokens:** `COLORS` object (`core/shared.js:7-23`) + `core/tailwind.init.js` (`lafa.*`) — must stay in sync
- **Font:** Inter Tight (system-ui fallback)
- **i18n:** `data-i18n` attributes, ES/EN toggle via `window.switchLang(lang)`
- **No frameworks:** Vanilla JS only. No React, no jQuery

## Code Style (fleet-intelligence/)

- TypeScript strict mode, `lafa.*` Tailwind color tokens (`tailwind.config.ts`)
- **Dual data source:** Supabase when configured, mock data (`src/data/mockData.ts`) otherwise. `dataSource` in AppState tracks which is active.
- **Service layer:** Pages call `action*()` functions from `lib/actions.ts`, never dispatch + Supabase directly
- **State:** Split contexts — `useAppState()` / `useAppDispatch()` to avoid re-renders
- **Status values are Spanish:** `'activo'`, `'inactivo'`, `'en_turno'`, `'completado'`, etc. Must match Supabase enums.
- **DB↔App mapping:** DB uses `snake_case`, app uses `camelCase`. All mapping in `lib/mappers.ts`.
- See `content/hiring/technical-challenge/CLAUDE.md` for payroll logic and challenge details

## Content Conventions

- **MECE data ownership:** Each fact in exactly one file; others cross-reference via links
- **thesis/ = summary layer** → references analysis/ for evidence. Never duplicate — link.
- **analysis/ = evidence layer** → supports thesis chapters
- **strategy/ = Jose's contribution** → what he'd build at LAFA
- **All content in English.** Interview transcripts may contain Spanish quotes.

## Key Facts

- **OEMs:** Geely, JAC, GAC (NOT BYD)
- **Fleet:** ~150 vehicles, target 2,000 by end of 2026
- **Products:** Driver-as-Employee (DaE) + Lease-to-Own (LTO, launched Dec 2025)
- **Tech status:** Stage 0 — everything is spreadsheets
- **Platform partner:** DiDi (Premier launched Oct 2025)
- **Hiring:** Jose → Levi Garcia (Head of Product) → JJ (CEO)

## Tooling

No tests, no linter, no CI pipeline, no git hooks. Vercel auto-deploys from `main`.
