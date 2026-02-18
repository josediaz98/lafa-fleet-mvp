# LAFA Project Instructions

## What This Is
Research and strategy folder for Jose Diaz's evaluation of the **AI Product Engineer (Internal Tools)** role at LAFA (Latin America Future Automobile). Organized as a VC investment thesis. Also includes a web app (replica of LAFA's site + internal tools prototypes) and a technical challenge MVP.

## Tech Stack

| Area | Stack |
|------|-------|
| `prototypes/` | Vanilla HTML + JS, Tailwind CDN, ApexCharts, Leaflet.js |
| `index.html` | Same — marketing landing page |
| `fleet-intelligence/` | React 18 + TypeScript + Vite + Tailwind CSS + lucide-react |
| `content/` | Markdown research files |
| Technical challenge | Python (stdlib only for generator) |

`prototypes/` and `index.html` have no build step (CDN only). `fleet-intelligence/` uses Vite.

## Commands

```bash
# Marketing site + prototypes (static, no build)
python -m http.server 8000
npx serve .

# Fleet Intelligence MVP (React/Vite)
cd fleet-intelligence && npm install   # first time only
cd fleet-intelligence && npm run dev   # dev server (localhost:5173)
cd fleet-intelligence && npm run build # production build → dist/

# Generate DiDi test data (stdlib only — no pip install)
python content/hiring/technical-challenge/generate_didi_data.py
```

## Code Style (prototypes/)

- **IIFE per page:** Each `.js` file wraps in `(function () { ... })()`, accesses shared state via `window.LAFA`
- **Tailwind + shared.css:** Utility classes first, custom components in `shared.css`
- **Design tokens:** Colors in `COLORS` object (`shared.js:7-23`) and `tailwind.init.js` (`lafa.*` namespace)
- **Fonts:** Inter Tight (system-ui fallback)
- **i18n:** `data-i18n` attributes on elements, ES/EN toggle via `L.setLang()`
- **No frameworks:** Vanilla JS only. No React, no jQuery

## File Structure
```
/Lafa/
├── README.md                              ← Executive summary + VC thesis navigation
├── CLAUDE.md                              ← This file
├── fleet-intelligence/                    ← Fleet Intelligence MVP (React + TS + Vite)
│   ├── package.json                       ← Dependencies & scripts
│   ├── vite.config.ts / tsconfig.json     ← Build config
│   ├── tailwind.config.ts                 ← Tailwind with lafa.* color tokens
│   ├── index.html                         ← Vite entry point
│   └── src/
│       ├── main.tsx / App.tsx             ← Entry + router
│       ├── context/                       ← AppContext (state) + ToastContext
│       ├── hooks/                         ← useCenterFilter
│       ├── data/mockData.ts              ← Mock fleet data + utilities
│       ├── lib/payroll.ts                ← Payroll calculation engine
│       ├── components/                   ← Layout + UI components
│       └── pages/                        ← 8 pages (Login, Dashboard, Shifts, CSV, Payroll, Drivers, Vehicles, Users)
├── content/                               ← All research & strategy content
│   ├── thesis/                            ← VC investment thesis (8 chapters)
│   │   ├── 01-problem.md … 08-risks.md
│   ├── analysis/                          ← Deep-dive evidence (detail behind thesis/)
│   │   ├── fleet/                         ← 6 files (tariff, charging, battery, tech, route, maintenance)
│   │   ├── fintech/                       ← 3 files (credit, repossession, insurance)
│   │   └── market/                        ← 4 files (competitive, ev-market, gig-driver, biz-model)
│   ├── team/                              ← Individual team profiles (6 people)
│   ├── strategy/                          ← Jose's strategic contribution (4 files + README)
│   ├── vemo-benchmark/                    ← Vemo competitive intel (7 topic files + README)
│   ├── hiring/                            ← Hiring process
│   │   ├── README.md                      ← Timeline, job description, Jose's CV
│   │   ├── interviews/                    ← Interview transcripts & prep
│   │   │   ├── interview-levi-2026-02-06.md ← Full interview transcript
│   │   │   ├── interview-levi-feedback.md   ← Post-interview feedback
│   │   │   └── jj-interview-prep.md         ← CEO interview prep
│   │   └── technical-challenge/           ← Fleet Intelligence & Payroll MVP
│   │       ├── CLAUDE.md                  ← Challenge-specific instructions
│   │       ├── brief.md                   ← Challenge spec + payroll pseudocode
│   │       ├── assumptions-qa.md          ← 25 resolved ambiguities
│   │       ├── prd.md                     ← Product requirements document
│   │       └── presentation-strategy.md   ← Reforge frameworks × challenge presentation
│   └── reference/                         ← Brand assets
├── prototypes/                            ← Working prototypes (HTML + JS + CSS)
│   ├── landing.css                        ← Landing page styles (index.html)
│   ├── tailwind.init.js                   ← Shared Tailwind config (all prototype pages)
│   ├── i18n.js                            ← ES/EN internationalization
│   ├── shared.css / shared.js             ← Shared styles, data, sidebar, utilities
│   ├── dashboard.html / dashboard.js      ← Fleet operations dashboard
│   ├── battery.html / battery.js          ← Battery health monitor
│   ├── collections.html / collections.js  ← WhatsApp collections bot
│   ├── onboarding.html / onboarding.js    ← Driver onboarding pipeline
│   ├── roadmap.html / roadmap.js          ← AI roadmap interactive
│   ├── roadmap-data.js                    ← Roadmap project data
│   └── fleetmap.html / fleetmap.js        ← Real-time fleet map (Leaflet.js)
├── images/                                ← Image assets
└── index.html                             ← Marketing landing page
```

## Conventions

- **All content files are in English.** Interview transcripts may contain Spanish quotes.
- **MECE data ownership:** Each data point lives in exactly one file. Other files cross-reference via relative links. See the Data Ownership table in README.md.
- **Cross-references:** Key files have navigation headers (blockquotes) linking to related files. When adding new content, place it in the owner file and add cross-reference links from related files.
- **content/thesis/ is the summary layer.** It references content/analysis/ for detail. Never duplicate data — link instead.
- **content/analysis/ is the evidence layer.** Each file supports specific thesis chapters (see content/analysis/README.md for the mapping).
- **content/strategy/ is Jose's contribution.** These files represent what he would build at LAFA. See content/strategy/README.md for how the 4 files connect.

## Key Facts

- **OEMs:** Geely, JAC, GAC (NOT BYD)
- **Fleet:** ~150 vehicles, target 2,000 by end of 2026
- **Products:** Driver-as-Employee (DaE) + Lease-to-Own (LTO, launched Dec 2025)
- **Tech status:** Stage 0 — everything is spreadsheets
- **Platform partner:** DiDi (Premier launched Oct 2025)
- **Hiring:** Jose would report to Levi Garcia (Head of Product). Next interview: JJ (CEO)
- **Fleet Intelligence demo:** admin@lafa.mx / admin123
