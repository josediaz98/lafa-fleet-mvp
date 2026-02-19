# Architecture Review — Fleet Intelligence MVP

**Date:** 2026-02-19
**Scope:** Module-level review of refactored architecture (last 5 commits, 89 files, +6,808 / -2,524 lines)
**Context:** Prototype transitioning to production (~150 vehicles, target 2,000 by EOY 2026)
**Codebase:** 97 source files, 12,454 lines (TypeScript + React)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           ROUTING (App.tsx)                        │
│  /login  /dashboard  /shifts  /drivers  /vehicles  /payroll  ...  │
│           RequireAuth ────────────────────────── RequireAdmin      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────────────────┐
│                      FEATURE MODULES (8 domains)                   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │dashboard │ │ shifts   │ │ drivers  │ │ payroll  │ │csv-upload│  │
│ │ 247 LOC  │ │ 327 LOC  │ │ 350 LOC  │ │ 324 LOC  │ │ 487 LOC  │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                            │
│ │vehicles  │ │  users   │ │   auth   │  Each: Page + components/  │
│ └──────────┘ └──────────┘ └──────────┘        + lib/ (optional)   │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │ action*() calls only
┌──────────────────────────────────▼──────────────────────────────────┐
│                         SERVICE LAYER (lib/)                       │
│ ┌───────────────────────────────────────────────────────┐          │
│ │ actions/                                               │          │
│ │  shift-actions  driver-actions  vehicle-actions        │          │
│ │  trip-actions   payroll-actions  user-actions          │          │
│ │  pagination-actions  with-optimistic                   │          │
│ │  index.ts (barrel) ← single import point              │          │
│ └───────────────────────┬───────────────────────────────┘          │
│                         │                                          │
│ ┌───────────────────────▼───────────────────────────────┐          │
│ │ supabase/                                              │          │
│ │  queries/ → hydrate.ts + paginated.ts + csv.ts        │          │
│ │  mutations.ts (342 LOC — all write ops)               │          │
│ │  client.ts + types.ts                                 │          │
│ └───────────────────────────────────────────────────────┘          │
│                                                                    │
│ mappers.ts (233 LOC)  format.ts  date-utils.ts  status-map.ts    │
│ action-context.ts     use-pagination.ts                           │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────────────────┐
│                          STATE (Context)                           │
│  AppState ← useReducer (app-reducer.ts, 284 LOC)                  │
│  Action union: 31 discriminated members (types/shared.ts:135-194)  │
│  Split contexts: useAppState() / useAppDispatch()                  │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────────────────┐
│                         DATA SOURCES                               │
│  Supabase (production)  ←→  dev-seed.ts (offline fallback)        │
│  constants.ts (CENTERS, business rules)                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Health Score

| Category | Score | Rating | Key Factors |
|----------|-------|--------|-------------|
| SOLID Principles | 13/20 | Good | SRP violations in 5 page components; good DIP via ActionContext |
| Design Principles | 15/20 | Good | Clean DRY in actions layer; minor duplication (`getCenterName`, paginated queries) |
| Architecture Patterns | 16/20 | Excellent | Feature-based org, unidirectional data flow, clean layer boundaries |
| Code Quality Signals | 12/20 | Good | 6 files >300 LOC; `CsvUploadPage` at 487; `calculateWeeklyPay` at 117 lines |
| Modern Practices | 15/20 | Good | Dual data source, lock file, tests on core logic; no CI, partial coverage |
| **Overall** | **71/100** | **Good** | Solid foundation post-refactor; page-level SRP is the main gap |

### Rating Scale

| Range | Rating |
|-------|--------|
| 90-100 | Excellent |
| 75-89 | Good |
| 60-74 | Fair |
| 40-59 | Needs Work |
| 0-39 | Critical |

---

## Findings

### Critical — C1: CsvUploadPage.tsx is a God Component (487 lines)

**File:** `src/features/csv-upload/CsvUploadPage.tsx:34-487`

The page component owns wizard step management (line 39), file parsing (lines 49-83), drag-and-drop handling (lines 91-100), CSV template download (lines 102-110), import orchestration (lines 112-140+), validation filtering, pagination, and all rendering (steps 1-3 + history tab). This is the single largest component in the codebase and the hardest to maintain or extend.

**Violations:** SRP (5+ responsibilities), ISP (consumers can't use pieces independently)

**Evidence:**
- 7 `useState` hooks for local state (lines 39-46)
- `processFile()` inlined with `FileReader` logic (line 49)
- `handleImport()` mixes trip mapping + action dispatch (line 112)
- Rendering spans 3 wizard steps + history tab in one return block

---

### Critical — C2: Page Components as Orchestrators + Renderers

**Files:**
- `src/features/drivers/DriversPage.tsx` — 350 lines
- `src/features/shifts/ShiftsPage.tsx` — 327 lines
- `src/features/payroll/PayrollPage.tsx` — 324 lines
- `src/features/users/UsersPage.tsx` — 297 lines

Each page mixes data fetching/filtering, modal state management, action orchestration, and full table rendering. While individually manageable, the pattern accumulates: these 4 pages + CsvUploadPage represent **1,835 lines** of mixed-responsibility code, 15% of the entire codebase.

**Example — PayrollPage.tsx:**
- Week navigation state (lines ~30-40)
- `calculateWeeklyPay()` calls with full parameterization (lines 86, 128)
- `buildShiftSummaries()` called inline (lines 85, 127)
- Tab switching logic between "actual" and "cerradas" views
- Direct export trigger via `exportPayrollCsv()`

---

### Warning — W1: Inconsistent Optimistic Update Pattern

**Files:**
- `src/lib/actions/shift-actions.ts:11-127` — manual optimistic + rollback (no `withOptimistic`)
- `src/lib/actions/payroll-actions.ts:32-68` — `actionRerunPayroll` uses manual pattern
- `src/lib/actions/user-actions.ts:11-38` — `actionAddUser` uses manual pattern (special invite flow)

**Contrast with:**
- `src/lib/actions/driver-actions.ts` — all 3 functions use `withOptimistic`
- `src/lib/actions/vehicle-actions.ts` — all 3 functions use `withOptimistic`
- `src/lib/actions/payroll-actions.ts:9-30` — `actionClosePayroll` uses `withOptimistic`

The `withOptimistic` pattern (`src/lib/actions/with-optimistic.ts:11-24`) provides consistent error handling with toast notifications. The shift actions implement the same logic manually across 127 lines, diverging from the established pattern. `actionCheckIn` (line 11) performs a two-phase persist (shift + vehicle status) that genuinely needs custom flow, but `actionCheckOut` (line 57) could be adapted.

---

### Warning — W2: Duplicate `getCenterName()` Implementations

**Files:**
- `src/lib/format.ts:3-6` — uses `CENTERS` constant array, returns `string`, accepts `null`
- `src/lib/mappers.ts:100-102` — uses `centersMap` lookup map, returns `string | undefined`

**Impact:** Two different implementations with different signatures and data sources. `format.ts` version is used by 5 consumer files (DriversPage, VehicleTable, VehicleDetailPanel, DriverDataTab, UsersPage, UserTable). `mappers.ts` version is used by Sidebar only.

---

### Warning — W3: Three Nearly-Identical Paginated Query Functions

**File:** `src/lib/supabase/queries/paginated.ts:17-97`

Three functions follow the exact same pattern:
1. `fetchShiftsPage()` (lines 17-42) — queries `shifts`, sorts by `check_in`
2. `fetchTripsPage()` (lines 44-68) — queries `trips`, sorts by `date`
3. `fetchPayrollPage()` (lines 70-97) — queries `weekly_payroll`, sorts by `week_start`

Each function: checks supabase → queries table → applies `.lt()` filter → `.order()` → `.limit(n+1)` → checks `hasMore` → trims → maps. The only differences: table name, date column, mapper function, and payroll's extra deduplication step (line 89).

---

### Warning — W4: `persistTrips` Mixes Upload Record + Batch Trip Logic

**File:** `src/lib/supabase/mutations.ts:153-226`

This 74-line function handles two distinct concerns:
1. **Upload record management** (lines 165-179, 199-204, 216-221) — creates `csv_uploads` row, marks as `error` on failure
2. **Batch trip insertion** (lines 184-223) — maps trips to DB rows, filters unmapped drivers, batch inserts

The upload record management includes compensating logic (BUG-3, ISSUE-3 fixes) that makes the function harder to follow. Splitting would isolate the persistence boundary from the upload tracking concern.

---

### Warning — W5: Global Singleton Lookup Maps

**File:** `src/lib/mappers.ts:20-24`

```typescript
let centersMap: Map<string, DbCenter> = new Map();
let driversMap: Map<string, DbDriver> = new Map();
let vehiclesMap: Map<string, DbVehicle> = new Map();
let profilesMap: Map<string, DbProfile> = new Map();
```

These module-level mutable singletons are populated by `setLookupMaps()` (line 26) during hydrate and updated by individual `addTo*Map()` functions. All mapper functions (`mapShift`, `mapTrip`, etc.) depend on these being populated first. This creates an implicit coupling: mappers silently return empty/missing data if called before hydration completes.

**Mitigating factor:** The `HYDRATE` action in `AppProvider` guarantees maps are set before any UI renders, and C1-C4 mutation comments show deliberate maintenance of map state.

---

### Warning — W6: `calculateWeeklyPay` at 117 Lines

**File:** `src/features/payroll/lib/payroll.ts:62-178`

This function handles proration logic (lines 95-110), conjunctive goal check (lines 112-114), base salary (line 115), productivity bonus (lines 118-125), overtime calculation with previous-week gate (lines 127-140), total assembly (lines 142-144), center lookup (line 145), and record construction (lines 148-177).

While well-commented, the function's length makes it hard to test individual calculation branches in isolation. The 767-line test file (`lib/__tests__/payroll.test.ts`) compensates by testing the full function with many input combinations.

---

### Info — I1: `PALETTE.info` Unused

**File:** `src/lib/status-map.ts:7`

The `PALETTE` object defines 6 color keys. Grep shows `PALETTE.active`, `.success`, `.alert`, `.danger`, and `.purple` are all used in payroll components. However, `PALETTE.info` (`#8B5CF6`) has zero references outside its definition.

---

### Info — I2: Fire-and-Forget Vehicle Reconciliation

**File:** `src/lib/supabase/queries/hydrate.ts:194-206`

```typescript
// Fire-and-forget DB correction
supabase
  .from('vehicles')
  .update({ status: 'disponible' })
  .eq('id', v.id)
  .then(({ error }) => {
    if (error)
      console.error(
        `[fetchAllData] Failed to reconcile vehicle ${v.id} in DB:`,
        error.message,
      );
  });
```

The BUG-1 reconciliation correctly updates local state synchronously (line 193) but the DB correction is fire-and-forget. If the DB update fails, the next page load will re-trigger reconciliation, so this is self-healing. However, the failure is only logged to console — no user-visible feedback.

---

### Info — I3: `buildShiftSummaries()` is O(n*m)

**File:** `src/lib/date-utils.ts:17-34`

```typescript
return drivers.map((driver) => {
  const driverShifts = shifts.filter(
    (s) => s.driverId === driver.id && s.status === 'completado' && s.hoursWorked,
  );
```

For each driver, the function scans all shifts. With ~150 drivers and a few hundred shifts, this is negligible. At 2,000 vehicles (and proportionally more drivers/shifts), this becomes a concern. A pre-indexed lookup by `driverId` would make it O(n+m).

**Called from:**
- `PayrollPage.tsx:85` and `:127` (each week navigation re-computes)
- `use-payroll-data.ts:45` (payroll hook)

---

### Info — I4: PayrollTable Sort is Properly Memoized

**File:** `src/features/payroll/components/PayrollTable.tsx:62-74`

```typescript
const sorted = useMemo(
  () => [...data].sort((a, b) => { ... }),
  [data, sortKey, sortAsc],
);
```

The sort logic is correctly memoized with `useMemo` and appropriate dependencies. No action needed.

---

## Strengths

### S1: Optimistic UI + Rollback Pattern

**File:** `src/lib/actions/with-optimistic.ts:11-24`

The `withOptimistic()` helper provides a production-grade pattern: apply optimistic state → persist → rollback + error toast on failure. Used consistently across driver, vehicle, trip, user, and payroll-close actions. The 13 rollback action types (e.g., `REMOVE_SHIFT`, `REVERT_CLOSE_SHIFT`, `REACTIVATE_DRIVER`) in `types/shared.ts:182-194` demonstrate thorough failure handling.

### S2: Discriminated Union Action Type (31 Members)

**File:** `src/types/shared.ts:135-194`

The `Action` type uses TypeScript's discriminated union to exhaustively type all 31 state transitions. This provides compile-time safety: the reducer in `app-reducer.ts` (284 lines) can pattern-match on `action.type` with full payload typing.

### S3: Feature-Based Organization

**Directory:** `src/features/` — 8 domain modules

Code is grouped by business domain (auth, csv-upload, dashboard, drivers, payroll, shifts, users, vehicles), not by technical role (components/, hooks/, services/). Each feature has its own `Page.tsx`, optional `components/` and `lib/` subdirectories, and a barrel `index.ts`. This makes adding new features mechanical — follow the pattern in `fleet-intelligence/CLAUDE.md`.

### S4: Dual Data Source (Supabase + Mock Fallback)

The app works without Supabase configured by falling back to `src/data/dev-seed.ts` (437 lines). This enables local development without database access and makes the prototype demo-ready anywhere.

### S5: Documented Bug Fixes with Traceability

Comments like `BUG-1` (`hydrate.ts:181`), `BUG-2` (`hydrate.ts:209`, `paginated.ts:88`), `BUG-3` (`mutations.ts:215`), `ISSUE-2` (`hydrate.ts:182`), `ISSUE-3` (`mutations.ts:198`), and `C1-C4` (`mappers.ts:20`) provide traceability from code back to the bugs they fix.

### S6: Payroll Test Suite (767 Lines)

**File:** `src/features/payroll/lib/__tests__/payroll.test.ts`

The most critical business logic (`calculateWeeklyPay`, `isTripInWeek`) has comprehensive test coverage including edge cases: proration, Sunday cutoff, overtime gates, zero-hour drivers, goal threshold conjunctions, and tip handling.

### S7: Modular Action Layer

**File:** `src/lib/actions/index.ts`

The barrel re-exports 14 actions from 7 domain files. Pages import from a single entry point (`@/lib/actions`) while implementation is split by domain. The `ActionContext` interface (`action-context.ts`) provides dependency injection for `dispatch`, `showToast`, `userId`, and `role`.

---

## Recommendations

| # | Action | Severity | Effort | Impact |
|---|--------|----------|--------|--------|
| 1 | Split CsvUploadPage into 3 step components + `useFileParser` hook | Critical | Medium | -300 lines from page; testable steps |
| 2 | Extract page-level hooks: `useDriverFilters`, `useShiftFilters`, `useWeekTrips` | Critical | Medium | Each page drops ~100 lines |
| 3 | Normalize shift-actions to use `withOptimistic` where possible | Warning | Small | Consistent error handling across all domains |
| 4 | Generic `fetchPage<T>()` for paginated queries | Warning | Small | Eliminate 3-way duplication in `paginated.ts` |
| 5 | Split `payroll.ts`: calculation module vs CSV export | Warning | Small | Two focused files; export logic testable separately |
| 6 | Break `calculateWeeklyPay` into sub-functions (prorate, bonus, overtime) | Warning | Small | Readable; individually testable payroll math |
| 7 | Remove duplicate `getCenterName` — consolidate to `format.ts` | Warning | Small | Single source of truth; update Sidebar import |
| 8 | Index `buildShiftSummaries` by driverId for O(n+m) | Info | Small | Future-proof for 2K vehicles |

### R1: Split CsvUploadPage into Step Components

```
csv-upload/
├── CsvUploadPage.tsx          ← Wizard orchestrator (~80 lines)
├── components/
│   ├── UploadStep.tsx         ← Drag-and-drop + file selection
│   ├── PreviewStep.tsx        ← Validation table + error filter
│   ├── ConfirmStep.tsx        ← Import summary + action trigger
│   └── UploadHistoryTable.tsx ← (already extracted)
├── lib/
│   ├── csv-parser.ts          ← (already extracted)
│   └── use-file-parser.ts     ← NEW: processFile + validation state
└── index.ts
```

### R2: Extract Page-Level Hooks

Each page has a repeating pattern: filter state + computed filtered list + pagination. Extract to custom hooks:

```typescript
// Example: useDriverFilters(drivers) → { filtered, searchTerm, setSearchTerm, ... }
function useDriverFilters(drivers: Driver[]) {
  const [search, setSearch] = useState('');
  const [centerFilter, setCenterFilter] = useState('');
  const filtered = useMemo(() => /* filter logic */, [drivers, search, centerFilter]);
  return { filtered, search, setSearch, centerFilter, setCenterFilter };
}
```

### R4: Generic Paginated Query

```typescript
async function fetchPage<TDb, TApp>(config: {
  table: string;
  dateColumn: string;
  mapper: (row: TDb) => TApp;
  beforeDate: string;
  limit?: number;
  postProcess?: (rows: TDb[]) => TDb[];
}): Promise<PaginatedResult<TApp>> { /* ... */ }
```

This eliminates the pattern repeated at `paginated.ts:17`, `:44`, and `:70`.

---

## Appendix

### Files > 300 Lines

| File | Lines | Concern |
|------|-------|---------|
| `payroll/lib/__tests__/payroll.test.ts` | 767 | Test suite (acceptable) |
| `csv-upload/CsvUploadPage.tsx` | 487 | **God component** |
| `data/dev-seed.ts` | 437 | Seed data (acceptable) |
| `drivers/DriversPage.tsx` | 350 | Page + orchestration |
| `supabase/mutations.ts` | 342 | Write operations |
| `shifts/ShiftsPage.tsx` | 327 | Page + orchestration |
| `payroll/PayrollPage.tsx` | 324 | Page + orchestration |

### Action Coverage by Domain

| Domain | Actions | Uses `withOptimistic` | Notes |
|--------|---------|----------------------|-------|
| driver | 3 (add, update, deactivate) | All 3 | Clean pattern |
| vehicle | 3 (status, add, update) | All 3 | Clean pattern |
| trip | 1 (import) | Yes | Single action |
| payroll | 2 (close, rerun) | 1 of 2 | `rerun` is manual |
| shift | 2 (checkIn, checkOut) | 0 of 2 | Manual — multi-step persist |
| user | 3 (add, update, deactivate) | 2 of 3 | `add` has special invite flow |
| pagination | 3 (shifts, trips, payroll) | N/A | Read-only, no optimistic |

### Commit History (Reviewed)

| Commit | Description | Impact |
|--------|-------------|--------|
| `cf2e7c7` | Modularized service layer | Monolithic `actions.ts` → 9 domain files; `queries.ts` → query modules |
| `94095b4` | Dashboard cleanup | Removed $6K card, added ShiftCard alerts, skeleton loading |
| `c0c0faf` | Data integrity fixes | BUG-3 orphaned uploads, false reconciliation guard |
| `ad40dd1` | ESLint + Prettier added | Consistent formatting across codebase |
| `67fb061` | ESLint violations resolved | Clean lint pass |
