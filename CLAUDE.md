# LAFA Project Instructions

Research + strategy repo for evaluating the AI Product Engineer role at LAFA (Latin America Future Automobile). Contains a VC investment thesis, a marketing site with interactive prototypes, and a Fleet Intelligence MVP.

## Tech Stack

| Area | Stack |
|------|-------|
| Runtime | Node.js >=20, Express 4 |
| `site/` | Vanilla HTML + JS, Tailwind CDN, ApexCharts, Leaflet.js |
| `fleet-intelligence/` | React 18 + TypeScript + Vite 6 + Tailwind CSS + lucide-react + Supabase |
| `content/` | Markdown research files |

`site/` has no build step (CDN only). `fleet-intelligence/` uses Vite.

## Commands

```bash
# Full app (Express on port 3000)
npm run start

# Static site only (local dev, no build step)
npx serve .

# Fleet Intelligence MVP
cd fleet-intelligence && npm install   # first time only
cd fleet-intelligence && npm run dev   # localhost:5173 — works without Supabase (falls back to mock data)
cd fleet-intelligence && npm run build # production → dist/
cd fleet-intelligence && npm run test  # vitest — payroll logic only (no other features have tests yet)
```

## Environment Variables

| Variable | Location | Required | Notes |
|----------|----------|----------|-------|
| `PORT` | Root `.env` | No | Express server port (default: 3000) |
| `SUPABASE_URL` | Root `.env` | For invite API | Server-side Supabase URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Root `.env` | For invite API | Server-side admin key |
| `VITE_SUPABASE_URL` | `fleet-intelligence/.env.local` | No | Client-side (mock data fallback) |
| `VITE_SUPABASE_ANON_KEY` | `fleet-intelligence/.env.local` | No | Client-side (mock data fallback) |

## Deployment (Railway)

Express server (`server.js`) on Railway with Railpack builder. Config in `railway.toml`.
Build: `npm install && npm run build` → Start: `npm run start`
Health check: `/api/health`
Public URL: `https://lafa-production.up.railway.app/`

No linter, no CI pipeline, no git hooks. Railway auto-deploys from `main`.

## Directory Layout

```
/Lafa/
├── site/                    ← Landing page + 6 prototypes (static HTML/JS)
│   ├── index.html           ← Marketing landing page
│   ├── core/                ← Shared: i18n, shared.js/css, tailwind config
│   ├── images/              ← Static images (favicon, og-image, photos, logos)
│   └── {dashboard,battery,collections,fleetmap,onboarding,roadmap}/
├── fleet-intelligence/      ← Fleet Intelligence MVP (React + TS + Vite)
│   ├── src/                 ← app/, components/, features/, lib/, types/, data/
│   └── db/                  ← Supabase SQL setup + email templates
└── content/                 ← Research & strategy (Markdown)
    ├── thesis/              ← 8-chapter VC thesis (summary layer)
    ├── analysis/            ← Evidence layer (fleet/, fintech/, market/)
    ├── strategy/            ← Product strategy proposals
    ├── hiring/              ← Interviews + technical challenge (has its own CLAUDE.md)
    ├── team/                ← Individual profiles
    ├── vemo-benchmark/      ← Competitive intel
    └── reference/           ← Brand assets
```

## Key Facts

- **OEMs:** Geely, JAC, GAC (NOT BYD)
- **Fleet:** ~150 vehicles, target 2,000 by end of 2026
- **Products:** Driver-as-Employee (DaE) + Lease-to-Own (LTO, launched Dec 2025)
- **Tech status:** Stage 0 — everything is spreadsheets
- **Platform partner:** DiDi (Premier launched Oct 2025)
- **Roles:** Admin (full access) + Supervisor (center-scoped). Drivers are NOT system users.
- **Hiring:** Jose → Levi Garcia (Head of Product) → JJ (CEO)

## Instruction Surface

Per-directory conventions are enforced via `.claude/rules/`:

| File | Scope | Rules |
|------|-------|-------|
| `fleet-intelligence.md` | `fleet-intelligence/**` | TypeScript strict, feature modules, service layer, Spanish statuses, Tailwind tokens |
| `content.md` | `content/**` | English only, MECE data ownership, layer separation (thesis/analysis/strategy) |
| `site.md` | `site/**` | Vanilla JS, no build step, IIFE pattern, CDN only, i18n attributes |
