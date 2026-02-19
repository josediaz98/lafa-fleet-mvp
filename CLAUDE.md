# LAFA Project Instructions

Research + strategy repo for evaluating the AI Product Engineer role at LAFA (Latin America Future Automobile). Contains a VC investment thesis, a marketing site with interactive prototypes, and a Fleet Intelligence MVP.

## Tech Stack

| Area | Stack |
|------|-------|
| `site/` | Vanilla HTML + JS, Tailwind CDN, ApexCharts, Leaflet.js |
| `fleet-intelligence/` | React 18 + TypeScript + Vite 6 + Tailwind CSS + lucide-react + Supabase |
| `content/` | Markdown research files |

`site/` has no build step (CDN only). `fleet-intelligence/` uses Vite.

## Commands

```bash
# Static site (no build step)
npx serve .

# Fleet Intelligence MVP
cd fleet-intelligence && npm install   # first time only
cd fleet-intelligence && npm run dev   # localhost:5173 — works without Supabase (falls back to mock data)
cd fleet-intelligence && npm run build # production → dist/
cd fleet-intelligence && npm run test  # vitest — payroll logic tests
```

### Environment Variables (fleet-intelligence/.env.local)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Optional — app falls back to mock data when not configured.

## Deployment (Railway)

Express server (`server.js`) on Railway with Railpack builder. Config in `railway.toml`.
Build: `npm install && npm run build` → Start: `npm run start`
Public URL: `https://lafa-production.up.railway.app/`

## Directory Layout

```
/Lafa/
├── site/                    ← Landing page + 6 prototypes (static HTML/JS)
│   ├── index.html           ← Marketing landing page
│   ├── core/                ← Shared: i18n, shared.js/css, tailwind config
│   ├── images/              ← Static images (favicon, og-image, photos, logos)
│   └── {dashboard,battery,collections,fleetmap,onboarding,roadmap}/
├── fleet-intelligence/      ← Fleet Intelligence MVP (React + TS + Vite)
│   └── src/                 ← app/, components/, features/, lib/, types/, data/
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
- **Hiring:** Jose → Levi Garcia (Head of Product) → JJ (CEO)

## Tooling

No linter, no CI pipeline, no git hooks. Railway auto-deploys from `main`.
Payroll logic has unit tests — run `npm run test` in `fleet-intelligence/` after modifying payroll code.
