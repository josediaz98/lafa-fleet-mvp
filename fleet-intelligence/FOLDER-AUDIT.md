# Folder Audit: fleet-intelligence/

**Re-audit** — Previous audit scored 14/18. Since then: 5 of 6 recommended refactorings were executed (singular folder renames + hook relocation). Payroll module grew by 3 files. New `server/` and `shared/` directories appeared at root level.

## Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | React SPA (Vite) |
| Framework | React 18 + Vite 6 + Tailwind CSS |
| Language(s) | TypeScript (strict) |
| Organization Pattern | Feature-based (hybrid) |
| Total files (src/) | 111 |
| Total directories (src/) | 34 |
| Max depth (from src/) | 5 levels (`features/payroll/lib/__tests__/payroll.test.ts`) |
| Avg depth | ~2.5 levels |
| Dominant naming | PascalCase (.tsx), kebab-case (.ts), kebab-case (dirs) |

## Health Score: 15/18 — Excellent

| # | Category | Score | Prev | Notes |
|---|----------|-------|------|-------|
| 1 | Architecture Alignment | 2/3 | 2 | Closely follows Vite+React feature-based reference; `@shared/` cross-boundary alias formalized with `package.json` |
| 2 | Naming Consistency | 3/3 | 2 | All feature folders now singular; 96% PascalCase .tsx, 100% kebab/.lowercase .ts |
| 3 | Organization Pattern | 3/3 | 3 | Clean, consistent feature modules — a new contributor can predict where any file lives |
| 4 | Colocation & Proximity | 2/3 | 2 | Feature-specific code well colocated; centralized types/shared.ts is deliberate; only payroll has tests |
| 5 | Duplication & Waste | 3/3 | 3 | Zero duplication, no god folders (max 12 files), no orphaned configs |
| 6 | Depth & Navigability | 2/3 | 2 | Max 5 levels (test file only); most paths 2-3 deep; clear entry points per feature |

**Delta:** +1 point from naming consistency (singular folder renames completed).

## Findings

### Critical

None.

### Warning

- **[WARNING]** `src/lib/` root — 11 loose files mixing hooks (4: `use-center-filter.tsx`, `use-focus-trap.ts`, `use-idle-logout.ts`, `use-pagination.ts`), pure utils (4: `format.ts`, `date-utils.ts`, `mappers.ts`, `validators.ts`), and infrastructure (3: `config.ts`, `action-context.ts`, `status-map.ts`). Not yet a god folder, but trending toward clutter. **Deferred action from previous audit still applies:** split into `lib/hooks/` + `lib/utils/` when count exceeds 15.

- **[WARNING]** `src/lib/supabase/mutations.ts` — Previous audit flagged at 342 lines. Still a single file handling all write operations across 6 domains. Will become a god file as features mature. **Carried over from previous audit.**

- **[WARNING]** `src/features/payroll/` — 15 files across 3 subdirectories. Most complex feature module (nearly 3x the average). The `lib/` subdirectory alone has 7 logic files + 1 test. Not actionable yet (each file has a clear responsibility), but monitor — if payroll grows further, consider extracting sub-features (e.g., `payroll/export/`, `payroll/calculation/`).

### Info

- **[INFO]** `src/lib/use-center-filter.tsx` — Hook with `.tsx` extension. Acceptable (it returns JSX via context provider), but it's the only kebab-case .tsx file. All other .tsx files are PascalCase. Consistent with its nature as a hook, not a component.

- **[INFO]** `src/types/index.ts` + `src/types/shared.ts` — Barrel re-exports a single file. Could simplify to just `types/index.ts` containing the types directly. Minor, no impact.

- **[INFO]** `db/viajes-semana-16-22-feb.csv` — Date-stamped CSV in `db/`. One-time import artifact, not a schema file.

- **[INFO]** Only `payroll/` has unit tests (`payroll.test.ts`). Other 7 features have zero test files. Test coverage gap — not a folder structure issue, but worth tracking.

## Naming Convention Distribution

### .tsx Files (54 total)

| Convention | Count | % | Notes |
|------------|-------|---|-------|
| PascalCase | 53 | 98% | Components, pages, providers |
| kebab-case | 1 | 2% | `use-center-filter.tsx` (hook returning JSX) |

### .ts Files (56 total)

| Convention | Count | % | Notes |
|------------|-------|---|-------|
| kebab-case | 31 | 55% | Hooks, actions, utilities, services |
| lowercase (single-word) | 25 | 45% | `index.ts`, `payroll.ts`, `format.ts`, `types.ts`, etc. |

### Directories (34 total)

| Convention | Count | % | Notes |
|------------|-------|---|-------|
| lowercase | 31 | 91% | `lib`, `components`, `auth`, `payroll` |
| kebab-case | 2 | 6% | `csv-upload`, `dev-seed` |
| special | 1 | 3% | `__tests__` |

**No naming drift.** Zero camelCase files or directories. Convention is clean and enforced by habit.

## Directory Size Distribution

| Directory | Files | Status | Notes |
|-----------|-------|--------|-------|
| `src/components/ui/` | 12 | Monitor | Shared UI primitives — healthy, all reusable |
| `src/lib/` (root) | 11 | Monitor | Mix of hooks + utils + infra — split deferred |
| `src/lib/actions/` | 9 | Healthy | 8 domain files + barrel |
| `src/features/payroll/lib/` | 7 | Healthy | Most complex; monitor growth |
| `src/lib/supabase/` | 4+4 | Healthy | client + types + mutations + queries/ (4 files) |
| `src/features/payroll/components/` | 5 | Healthy | |
| `src/features/driver/components/` | 5 | Healthy | |
| `src/features/csv-upload/components/` | 5 | Healthy | |
| `src/data/` | 5 | Healthy | Constants + dev seed |

No directories exceed the Warning threshold (16+ files).

## Feature Module Summary

| Feature | Files | components/ | lib/ | Tests | Barrel |
|---------|-------|-------------|------|-------|--------|
| auth | 5 | — | — | 0 | pages only |
| csv-upload | 9 | 5 | 2 | 0 | page + lib |
| dashboard | 2 | — | — | 0 | page only |
| driver | 8 | 5 | 1 | 0 | page only |
| payroll | 15 | 5 | 7+1 test | 1 | page + 8 exports |
| shift | 8 | 4 | 2 | 0 | page + lib |
| user | 5 | 2 | 1 | 0 | page + lib |
| vehicle | 5 | 3 | — | 0 | page + lib |

All 8 features follow the documented pattern: `{Name}Page.tsx` + optional `components/` + optional `lib/` + `index.ts`.

## Recommended Refactorings

### Completed (This Audit)

| # | Action | What | Status |
|---|--------|------|--------|
| 1 | formalize | Added `shared/package.json` + `shared/README.md` documenting the cross-boundary contract | Done |
| 2 | replace | Overwrote `FOLDER-AUDIT.md` with this report | Done |

### Deferred (Act When Threshold Hit)

| # | Trigger | Action | From | To | Impact |
|---|---------|--------|------|----|--------|
| 3 | `mutations.ts` > 400 LOC | split | `lib/supabase/mutations.ts` | `lib/supabase/mutations/{driver,shift,vehicle,user,payroll,trip}.ts` + barrel | Prevents god file |
| 4 | `lib/` root > 15 files | move | `lib/use-*.ts` (4 hooks) | `lib/hooks/use-*.ts` | Separates hooks from utils |
| 5 | `lib/` root > 15 files | move | `lib/{format,date-utils,mappers,validators}.ts` | `lib/utils/` | Separates pure utils from infra |
| 6 | `payroll/lib/` > 10 files | split | `features/payroll/lib/` | `features/payroll/lib/{calculation/,export/,hooks/}` | Prevents payroll lib/ clutter |

## Reference Structure

```
src/
├── app/
│   ├── App.tsx               # Router + guards
│   ├── main.tsx              # Entry point
│   └── providers/            # AppProvider, ToastProvider, reducer
├── components/
│   ├── layout/               # AppLayout, Sidebar
│   └── ui/                   # 12 shared primitives
├── features/                 # 8 feature modules (singular names)
│   ├── auth/                 # 4 pages + barrel
│   ├── csv-upload/           # page + components/ + lib/ + barrel
│   ├── dashboard/            # page + barrel
│   ├── driver/               # page + components/ + lib/ + barrel
│   ├── payroll/              # page + components/ + lib/ + __tests__/ + barrel
│   ├── shift/                # page + components/ + lib/ + barrel
│   ├── user/                 # page + components/ + lib/ + barrel
│   └── vehicle/              # page + components/ + barrel
├── lib/
│   ├── actions/              # 8 domain action files + barrel
│   ├── supabase/             # client, types, mutations, queries/
│   ├── config.ts             # Environment config
│   ├── action-context.ts     # ActionContext type
│   ├── format.ts             # Formatting utils
│   ├── date-utils.ts         # Date/time helpers
│   ├── mappers.ts            # DB snake_case <-> app camelCase
│   ├── status-map.ts         # Spanish status enums
│   ├── validators.ts         # Form validation
│   ├── use-center-filter.tsx # Center filter context + hook
│   ├── use-focus-trap.ts     # Keyboard navigation
│   ├── use-idle-logout.ts    # Auto-logout timer
│   └── use-pagination.ts     # Pagination state
├── data/
│   ├── constants.ts          # CENTERS, business constants
│   ├── dev-seed.ts           # Mock data (drivers, vehicles, users)
│   ├── dev-seed-shifts.ts    # Mock shifts
│   ├── dev-seed-payroll.ts   # Mock payroll
│   └── demo-csv-templates.ts # CSV upload templates
├── types/
│   ├── shared.ts             # All domain types (AppState, Action, Driver, Shift, etc.)
│   └── index.ts              # Barrel re-export
└── index.css                 # Global Tailwind styles
```

## Strengths

- **Previous audit recommendations acted on.** 5 of 6 refactorings executed (folder renames + hook relocation). Shows healthy codebase hygiene.
- **Consistent feature module pattern.** All 8 features follow `Page + components/ + lib/ + index.ts`. A new contributor can predict file locations without searching.
- **Clean naming conventions.** 98% PascalCase for .tsx, 100% kebab/lowercase for .ts, 100% kebab/lowercase for directories. Zero camelCase drift. Zero duplicate filenames.
- **No god folders.** Largest directory has 12 files — well below Warning threshold. No single directory dominates.
- **Clear data flow architecture.** `Page → action*() → supabase/ → dispatch` pipeline is enforced by convention and documented. The service layer boundary is respected.
- **Barrel exports at feature boundaries.** Feature `index.ts` files serve as clean public APIs. No barrel abuse within features.
