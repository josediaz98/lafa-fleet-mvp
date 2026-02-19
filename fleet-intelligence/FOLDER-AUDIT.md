# Folder Audit: fleet-intelligence/src/

## Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | React SPA (Vite) |
| Framework | React 18 + Vite 6 + Tailwind CSS |
| Language(s) | TypeScript (strict) |
| Organization Pattern | Feature-based (hybrid) |
| Total files | 108 |
| Total directories | 33 |
| Max depth | 5 levels (from `src/`) |
| Avg depth | 3.1 levels |
| Dominant naming convention | PascalCase (.tsx), kebab-case (.ts), lowercase (dirs) |

## Health Score: 14/18 — Good

| # | Category | Score | Notes |
|---|----------|-------|-------|
| 1 | Architecture Alignment | 2/3 | Closely follows Vite+React Feature-Based reference; minor deviations (no `shared/` wrapper, hooks in `lib/`) |
| 2 | Naming Consistency | 2/3 | 98% consistent per file type; feature folder plural/singular split (4 singular vs 4 plural) |
| 3 | Organization Pattern | 3/3 | Clean feature modules with consistent internal structure across all 8 features |
| 4 | Colocation & Proximity | 2/3 | Feature-specific components and hooks colocated; one domain hook misplaced in shared `lib/` |
| 5 | Duplication & Waste | 3/3 | Zero duplication, no god folders, no orphaned configs, no synonym directories |
| 6 | Depth & Navigability | 2/3 | Max 5 levels (test file only); avg 3.1; clear entry points per feature |

## Findings

### Critical

None.

### Warning

- **[WARNING]** `src/lib/` root — 12 files mixing hooks (5), utilities (4), and infrastructure (2). Approaching clutter; hooks and utils are distinct concerns that would benefit from subdirectories as the project grows.

- **[WARNING]** `src/lib/use-shift-checkout.ts` — Shift-specific hook living in the shared `lib/` directory. Should be colocated with its feature at `features/shifts/lib/use-shift-checkout.ts`.

- **[WARNING]** Feature folder naming inconsistency — 4 singular (`auth/`, `csv-upload/`, `dashboard/`, `payroll/`) vs 4 plural (`drivers/`, `shifts/`, `users/`, `vehicles/`). Convention says singular for feature folders.

- **[WARNING]** `src/lib/supabase/mutations.ts` — 342 lines, single file for all write operations across all domains. Will become a god file as features grow. Consider splitting by domain (`driver-mutations.ts`, `shift-mutations.ts`, etc.) or colocating mutations with their features.

### Info

- **[INFO]** `src/lib/use-center-filter.tsx` — Hook with `.tsx` extension (kebab-case naming). Acceptable if it returns JSX, but breaks the PascalCase = .tsx convention (1 of 52 .tsx files).

- **[INFO]** `src/types/index.ts` + `src/types/shared.ts` — Barrel re-exports a single file. Could simplify to just `types/index.ts` containing the types directly.

- **[INFO]** `db/viajes-semana-16-22-feb.csv` — Date-stamped CSV in `db/`. Looks like a one-time data import file rather than a permanent schema artifact.

- **[INFO]** Only `payroll/` has unit tests. Other features (drivers, shifts, vehicles, users, csv-upload) have no test files. Test coverage gap, not a folder structure issue.

- **[INFO]** `data/dev-seed.ts` (438 lines) — Large seed data file. Acceptable for mock data but monitor as it grows.

## Naming Convention Distribution

### .tsx Files (52 total)

| Convention | Count | % | Expected For |
|------------|-------|---|-------------|
| PascalCase | 50 | 96% | React components, pages |
| kebab-case | 1 | 2% | Hooks returning JSX (`use-center-filter.tsx`) |
| lowercase | 1 | 2% | — |

### .ts Files (55 total)

| Convention | Count | % | Expected For |
|------------|-------|---|-------------|
| kebab-case | 30 | 55% | Hooks, services, utils, actions |
| lowercase | 25 | 45% | Single-word files (`index.ts`, `payroll.ts`, `format.ts`) |

### Directories (33 total)

| Convention | Count | % | Expected For |
|------------|-------|---|-------------|
| lowercase | 31 | 94% | Single-word dirs (`lib`, `components`, `auth`) |
| kebab-case | 1 | 3% | Multi-word feature (`csv-upload`) |
| special | 1 | 3% | Test convention (`__tests__`) |

## Directory Size Distribution

| Directory | Files | Status |
|-----------|-------|--------|
| `src/lib/` | 12 | Monitor |
| `src/components/ui/` | 12 | Monitor |
| `src/lib/actions/` | 9 | Healthy |
| `src/features/payroll/lib/` | 6 | Healthy |
| `src/features/auth/` | 5 | Healthy |
| `src/features/csv-upload/components/` | 5 | Healthy |
| `src/features/drivers/components/` | 5 | Healthy |
| `src/data/` | 5 | Healthy |

No directories exceed the Warning threshold (16+).

## Recommended Refactorings

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 1 | move | `lib/use-shift-checkout.ts` | `features/shifts/lib/use-shift-checkout.ts` | Colocates shift-specific hook with its feature |
| 2 | rename | `features/drivers/` | `features/driver/` | Singular feature folder convention |
| 3 | rename | `features/shifts/` | `features/shift/` | Singular feature folder convention |
| 4 | rename | `features/users/` | `features/user/` | Singular feature folder convention |
| 5 | rename | `features/vehicles/` | `features/vehicle/` | Singular feature folder convention |
| 6 | split | `lib/supabase/mutations.ts` | `lib/supabase/mutations/{driver,shift,vehicle,user,payroll}.ts` | Prevents god file growth |

### Deferred (act when `lib/` exceeds 15 files)

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 7 | move | `lib/use-*.ts` (5 files) | `lib/hooks/use-*.ts` | Separates hooks from utilities in `lib/` |
| 8 | move | `lib/{format,date-utils,mappers,validators}.ts` | `lib/utils/{...}` | Separates pure utils from infrastructure |

## Reference Structure

Ideal layout for this project's detected architecture (React SPA + Vite, feature-based):

```
src/
├── app/
│   ├── App.tsx               ← Router + route definitions
│   ├── main.tsx              ← Entry point
│   └── providers/
│       ├── app-reducer.ts
│       └── ToastProvider.tsx
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx
│   └── ui/                   ← Shared UI primitives only
│       ├── Modal.tsx
│       ├── StatusBadge.tsx
│       └── ...
├── features/
│   ├── auth/                 ← Singular naming
│   │   ├── LoginPage.tsx
│   │   ├── AcceptInvitePage.tsx
│   │   └── index.ts
│   ├── csv-upload/
│   │   ├── CsvUploadPage.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── index.ts
│   ├── driver/               ← Singular (currently: drivers/)
│   │   ├── DriversPage.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── index.ts
│   ├── payroll/
│   │   ├── PayrollPage.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   └── ...
│   │   └── index.ts
│   ├── shift/                ← Singular (currently: shifts/)
│   │   ├── ShiftsPage.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── use-shift-checkout.ts  ← moved from src/lib/
│   │   └── index.ts
│   ├── user/                 ← Singular (currently: users/)
│   │   ├── UsersPage.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── index.ts
│   └── vehicle/              ← Singular (currently: vehicles/)
│       ├── VehiclesPage.tsx
│       ├── components/
│       └── index.ts
├── lib/
│   ├── actions/              ← Domain action files + barrel
│   ├── supabase/             ← Client, queries, mutations
│   ├── config.ts
│   ├── action-context.ts
│   ├── format.ts
│   ├── date-utils.ts
│   ├── mappers.ts
│   ├── validators.ts
│   ├── use-center-filter.tsx
│   ├── use-focus-trap.ts
│   ├── use-idle-logout.ts
│   └── use-pagination.ts
├── data/
│   ├── constants.ts
│   ├── dev-seed.ts
│   ├── dev-seed-shifts.ts
│   ├── dev-seed-payroll.ts
│   └── demo-csv-templates.ts
├── types/
│   └── shared.ts
└── index.css
```

## Recommended Tooling

| Tool | Purpose | Setup |
|------|---------|-------|
| Knip | Detect unused files, exports, and dependencies | `npx knip` — zero-config for Vite projects |
| `eslint-plugin-unicorn` | Enforce `kebab-case` filenames via `unicorn/filename-case` | Add rule to `eslint.config.js` |

## Strengths

- **Consistent feature module pattern.** All 8 features follow the same `Page + components/ + lib/ + index.ts` structure. A new contributor can predict where any file lives without searching.
- **Clean naming conventions.** 96% of .tsx files are PascalCase, 100% of .ts files are kebab-case or single-word. Zero camelCase drift.
- **No god folders.** The largest directory has 12 files — well below the Warning threshold. No signs of folder bloat.
- **Proper barrel exports.** Feature `index.ts` files serve as clean public API boundaries. No barrel file abuse in application code.
- **Clear data flow architecture.** The `actions/ → supabase/queries|mutations → dispatch` pipeline is enforced by convention and documented in CLAUDE.md. The separation prevents ad-hoc Supabase calls from components.
