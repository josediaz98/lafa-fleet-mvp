# Sync levi-clean branch with main

Re-sync the `levi-clean` branch from `main`, strip internal files, replace the README with the Levi showcase version, and force-push to the `levi` remote.

**IMPORTANT:** Execute these steps exactly. Do NOT skip steps or ask for confirmation — this is a fully automated workflow.

## Steps

### 1. Switch to levi-clean branch

```bash
git checkout levi-clean 2>/dev/null || git checkout -b levi-clean
```

### 2. Reset to main

```bash
git reset --hard main
```

### 3. Remove internal files

Remove all files that Levi should not see. Use `2>/dev/null` so already-removed files don't cause errors.

```bash
git rm -f CLAUDE.md 2>/dev/null
git rm -f fleet-intelligence/CLAUDE.md 2>/dev/null
git rm -rf content/ 2>/dev/null
git rm -rf .claude/commands/ 2>/dev/null
git rm -rf .claude/hooks/ 2>/dev/null
git rm -rf .claude/skills/ 2>/dev/null
git rm -f .claude/settings.json 2>/dev/null
git rm -f fleet-intelligence/ARCH-REVIEW.md 2>/dev/null
git rm -f fleet-intelligence/ARCH-REVIEW-SECURITY.md 2>/dev/null
git rm -f fleet-intelligence/FOLDER-AUDIT.md 2>/dev/null
git rm -f fleet-intelligence/db/viajes-semana-16-22-feb.csv 2>/dev/null
```

### 4. Simplify .gitignore

Replace the `.claude/*` block with exception lines with just `.claude/`. The new `.gitignore` should be:

```
# System
.DS_Store
.claude/

# Dependencies
node_modules/

# Build output
dist/
.vercel

# Environment
.env
.env.local
*.local

# TypeScript build cache
tsconfig.tsbuildinfo
```

Write this exact content to `.gitignore` (overwrite the file).

### 5. Overwrite README.md

Write the following content to `README.md` (overwrite the entire file):

---BEGIN README---
# Fleet Intelligence MVP

Jose Diaz's response to the LAFA technical challenge (Feb 2026).

A functional fleet management system for LAFA's EV fleet operations in Mexico City — covering payroll, shift dispatch, driver/vehicle management, and CSV data import. Built with React, TypeScript, Vite, and Supabase.

---

## Live Demo

| | |
|---|---|
| **URL** | [lafa-production.up.railway.app](https://lafa-production.up.railway.app/) |
| **Email** | `admin@lafa-mx.com` |
| **Password** | `admin123` |
| **Role** | Admin (full access) |

Pre-loaded data: 30 drivers, 18 vehicles, 3 weeks of payroll history, active shifts.

### Self-Onboard (try the invite flow)

1. Log in as admin
2. Go to **Usuarios** (sidebar)
3. Click **Invitar Usuario**
4. Enter your email and select a role
5. Check your inbox for the invite email
6. Set your password and explore with your own account

---

## The Challenge

Build a functional MVP for fleet unit assignment and payroll calculation. Requirements:

- **Two roles:** Admin (full access) + Supervisor (center-scoped)
- **Weekly payroll:** base salary, productivity bonus, overtime calculation
- **DiDi CSV import** for trip data
- **Design for scale:** 150 vehicles today, 2,000 by end of 2026

---

## What I Built

### Core Features (challenge requirements)

| Requirement | Implementation |
|---|---|
| Role-based access | Admin + Supervisor roles with center scoping, RLS at database level |
| Weekly payroll | Full payroll engine — base salary, productivity bonus, overtime, deductions |
| DiDi CSV import | Upload with validation, preview, duplicate detection |
| Unit assignment | Vehicle ↔ driver assignment via shift dispatch (check-in / check-out) |

### Beyond the Brief

| Feature | Detail |
|---|---|
| Payroll edge cases | 8 scenarios handled: partial weeks, mid-week hires, overlapping shifts, retroactive corrections, etc. |
| Auto-close cron | Server-side job closes payroll periods every Sunday at 20:00 CDMX time |
| Shift dispatch | Real-time check-in/check-out with vehicle assignment and status tracking |
| Driver management | Full CRUD, status tracking, document management |
| Vehicle management | Fleet registry with status, assignment history, maintenance flags |
| User invite flow | Email-based invitations with custom Supabase templates |
| Dashboard | KPI overview — active shifts, fleet utilization, weekly revenue |
| Shared business logic | Payroll rules extracted to `shared/` — used by both client and server |
| Mock data fallback | App works without Supabase connection (for local development / review) |

### Bonus: Marketing Site + Prototypes

Six interactive prototypes showing the product vision beyond the MVP:

| Prototype | What it shows |
|---|---|
| [Dashboard](https://lafa-production.up.railway.app/demos/dashboard/) | Fleet KPIs, revenue trends, utilization charts |
| [Battery Monitoring](https://lafa-production.up.railway.app/demos/battery/) | SOH tracking, degradation alerts, charge cycles |
| [Collections](https://lafa-production.up.railway.app/demos/collections/) | Payment tracking, escalation workflows |
| [Fleet Map](https://lafa-production.up.railway.app/demos/fleetmap/) | Real-time vehicle locations (Leaflet.js) |
| [Onboarding](https://lafa-production.up.railway.app/demos/onboarding/) | Driver application flow |
| [Roadmap](https://lafa-production.up.railway.app/demos/roadmap/) | AI project timeline visualization |

Landing page: [lafa-production.up.railway.app](https://lafa-production.up.railway.app/)

---

## Architecture

| Layer | Stack |
|---|---|
| Frontend | React 18 + TypeScript + Vite 6 + Tailwind CSS |
| Backend | Supabase (Postgres + Auth + RLS + Edge Functions) |
| Server | Express 4 (API proxy, static serving, payroll cron) |
| Deployment | Railway (auto-deploy from main, Railpack builder) |

**Patterns:**
- Feature modules (`src/features/`) — each feature owns its components, services, and types
- Service layer — business logic separated from UI components
- Shared rules (`shared/`) — payroll calculation used by both React app and Express cron
- Row-Level Security — Supabase RLS enforces center-scoped access for Supervisors

---

## Local Development

### Quick Start

```bash
git clone https://github.com/josediaz98/lafa-fleet-mvp.git
cd lafa-fleet-mvp
npm install && cd fleet-intelligence && npm install && cd ..
```

### Fleet Intelligence (React app only)

```bash
cd fleet-intelligence
npm run dev        # → http://localhost:5173
```

Works without Supabase — falls back to mock data automatically.

### Full Stack (Express + marketing site + fleet app)

```bash
npm run build      # builds fleet-intelligence
npm run start      # → http://localhost:3000
```

Serves: landing page at `/`, prototypes at `/demos/*`, fleet app at `/fleet-intelligence/`.

### Environment Variables (optional)

```bash
# Root .env — for Express server + Supabase API proxy
PORT=3000
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# fleet-intelligence/.env.local — for React app
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Not required for local development — the app falls back to mock data.

### Tests

```bash
cd fleet-intelligence
npm run test       # vitest — payroll logic
```

---

## Directory Map

```
├── fleet-intelligence/      ← React MVP (the main deliverable)
│   ├── src/
│   │   ├── features/        ← auth, payroll, shift, driver, vehicle, csv-upload, dashboard, user
│   │   ├── components/      ← shared UI components
│   │   ├── lib/             ← Supabase client, utilities
│   │   ├── types/           ← TypeScript interfaces
│   │   └── data/            ← Mock data (offline fallback)
│   └── db/                  ← Supabase SQL migrations + email templates
├── site/                    ← Marketing landing page + 6 prototypes
│   ├── index.html           ← Landing page
│   ├── core/                ← Shared styles, i18n, Tailwind config
│   └── {dashboard,battery,collections,fleetmap,onboarding,roadmap}/
├── server/                  ← Payroll auto-close cron (Sunday 20:00 CDMX)
├── shared/                  ← Payroll rules (used by client + server)
├── server.js                ← Express entry point
├── railway.toml             ← Railway deployment config
└── .env.example             ← Environment variable template
```

---

*Built by Jose Diaz — February 2026*
---END README---

### 6. Stage and commit

```bash
git add -A
git commit -m "chore: sync levi-clean with main"
```

### 7. Force push to levi remote

```bash
git push levi levi-clean:main --force
```

### 8. Return to main

```bash
git checkout main
```

### 9. Confirm

Print a summary: what was pushed, the remote URL, and confirm `main` is untouched.
