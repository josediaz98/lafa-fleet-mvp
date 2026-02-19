# Architecture Review: fleet-intelligence/

**Date:** 2026-02-19
**Scope:** Module — `fleet-intelligence/src/`
**Reviewer:** Claude (arch-review skill)
**Context:** prototype → early-production MVP

---

## 1. Overview

| Metric | Value |
|--------|-------|
| Files analyzed | 77 |
| Estimated LOC | 8,937 (incl. 492 LOC tests) |
| Languages | TypeScript, TSX |
| Frameworks | React 18, Vite 6, Tailwind CSS, Supabase JS |
| Tech stack | SPA with useReducer global state, optimistic mutations via service layer, Supabase as BaaS |

**Scope description:** Full architecture review of the Fleet Intelligence MVP — a React SPA managing fleet operations (shifts, drivers, vehicles, payroll, CSV import, users) for LAFA's growing 150-vehicle fleet. Evaluated against SOLID, DRY, YAGNI, KISS, SoC, and modern practices to prepare for scaling the engineering team from 1 to 3.

---

## 2. Health Score

| Category | Score | Rating |
|----------|-------|--------|
| SOLID Principles | 15/20 | Good |
| Design Principles | 15/20 | Good |
| Architecture Patterns | 17/20 | Excellent |
| Code Quality Signals | 14/20 | Good |
| Modern Practices | 11/20 | Fair |
| **Overall** | **72/100** | **Good** |

**Scoring formula:** `Points = 20 - (critical × 4) - (warning × 2) - (info × 0.5)`

| Category | C | W | I | Calculation |
|----------|---|---|---|-------------|
| SOLID | 0 | 2 | 1 | 20 - 0 - 4 - 0.5 = 15.5 → 15 |
| Design | 0 | 2 | 1 | 20 - 0 - 4 - 0.5 = 15.5 → 15 |
| Architecture | 0 | 1 | 1 | 20 - 0 - 2 - 0.5 = 17.5 → 17 |
| Code Quality | 0 | 2 | 2 | 20 - 0 - 4 - 1 = 15 → 14 |
| Modern Practices | 0 | 2 | 1 | 20 - 0 - 4 - 0.5 = 15.5 → 11 * |

\* Modern Practices penalized further for test coverage gap (only 1/9 features tested) and no structured logging — these have outsized impact on team scalability.

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                           │
│                                                                     │
│  app/App.tsx (router)                                               │
│    ├── features/dashboard/DashboardPage.tsx                         │
│    ├── features/shifts/ShiftsPage.tsx                               │
│    ├── features/drivers/DriversPage.tsx                             │
│    ├── features/vehicles/VehiclesPage.tsx                           │
│    ├── features/payroll/PayrollPage.tsx     ⚠️ 398 LOC             │
│    ├── features/csv-upload/CsvUploadPage.tsx                        │
│    ├── features/users/UsersPage.tsx                                 │
│    ├── features/auth/{Login,AcceptInvite,Reset,Forgot}Page.tsx      │
│    │                                                                │
│    └── components/ui/{Modal,SlidePanel,StatusBadge,EmptyState,...}  │
├─────────────────────────────────────────────────────────────────────┤
│                        APPLICATION LAYER                            │
│                                                                     │
│  lib/actions.ts          ⚠️ 426 LOC, 25 imports                    │
│    ├── Optimistic dispatch → persist → rollback on failure          │
│    ├── actionCheckIn(), actionCheckOut(), actionAddDriver(), ...    │
│    └── actionLoadMore{Shifts,Trips,Payroll}()                       │
│                                                                     │
│  app/providers/                                                     │
│    ├── AppProvider.tsx    (useReducer: 26 action types, 283 LOC)    │
│    └── ToastProvider.tsx                                            │
│                                                                     │
│  lib/use-center-filter.tsx  (RBAC scoping hook)                     │
├─────────────────────────────────────────────────────────────────────┤
│                          DOMAIN LAYER                               │
│                                                                     │
│  types/shared.ts         (all domain types + Action union)          │
│  lib/mappers.ts          ⚠️ module-level mutable Maps              │
│  features/payroll/lib/   (payroll calculation + flags + tests)      │
│  features/csv-upload/lib/(CSV parser + validation)                  │
│  lib/validators.ts       (form validation)                          │
│  lib/date-utils.ts       (date helpers)                             │
│  lib/format.ts           (MXN formatting)                           │
│  data/constants.ts       (CENTERS, business config)                 │
├─────────────────────────────────────────────────────────────────────┤
│                       INFRASTRUCTURE LAYER                          │
│                                                                     │
│  lib/supabase/client.ts  (Supabase init, isSupabaseConfigured)     │
│  lib/supabase/queries.ts (fetchAllData, fetchShiftsPage, ...)      │
│  lib/supabase/mutations.ts (persistCheckIn, persistNewDriver, ...) │
│  lib/supabase/types.ts   (Db* row types, snake_case)               │
│  data/dev-seed.ts        (mock data fallback)                       │
│                                                                     │
│                      ┌──────────────┐                               │
│                      │   Supabase   │                               │
│                      │ (PostgreSQL) │                               │
│                      └──────────────┘                               │
└─────────────────────────────────────────────────────────────────────┘

Data flow (mutations):
  Page → action*() → dispatch(optimistic) + persist*() → Supabase
                    ↘ on error: dispatch(rollback) + showToast('error')

Data flow (reads):
  AppProvider useEffect → fetchAllData() → setLookupMaps() → dispatch(HYDRATE)

Exception: ⚠️ AcceptInvitePage calls supabase directly (bypasses action layer)
```

---

## 4. Findings

### Critical — Must Fix

_None. No architectural blockers found._

---

### Warning — Should Fix

#### W1: Module-level mutable lookup maps outside React state

- **Principle:** SoC / Predictable State
- **Location:** `src/lib/mappers.ts:7-10`
- **Description:** Four `Map` objects (`centersMap`, `driversMap`, `vehiclesMap`, `profilesMap`) are declared as module-level `let` bindings, updated imperatively by `setLookupMaps()` and `addTo*Map()` functions. These are side-effect stores invisible to React's rendering cycle — mutations to these maps don't trigger re-renders and could desynchronize from AppState.
- **Impact:** If a mapper is called before `setLookupMaps()` (race condition), or if two tabs share module scope, data silently goes stale. As the team grows, new developers won't know state lives in two places (reducer + Maps).
- **Fix:** Move lookup maps into AppState (or a ref-based hook initialized from AppState), so there's a single source of truth. Alternatively, document the dual-state pattern as an intentional denormalization cache with lifecycle guarantees.
- **Effort:** M

---

#### W2: actions.ts approaching God Module territory

- **Principle:** SRP / SoC
- **Location:** `src/lib/actions.ts:1-426`
- **Description:** Single file contains all 15 mutation actions across 6 domains (shifts, vehicles, drivers, trips, payroll, users) plus 3 pagination loaders. It imports from 25 modules. Every new feature or entity mutation adds to this file.
- **Impact:** High change frequency from unrelated concerns — any shift, driver, vehicle, or payroll change touches this file. At 3 engineers, merge conflicts become routine. New team members must mentally parse 426 lines to find the relevant action.
- **Fix:** Split into domain-scoped action files: `lib/actions/shift-actions.ts`, `lib/actions/driver-actions.ts`, etc. Re-export from `lib/actions/index.ts` barrel to maintain the current import path.
- **Effort:** M

---

#### W3: PayrollPage at 398 LOC with inline sort/filter logic

- **Principle:** SRP / Code Quality
- **Location:** `src/features/payroll/PayrollPage.tsx:1-398`
- **Description:** Page component combines tab state, sort logic (lines 79-86), week selection, close/rerun handlers, summary calculations, and the full table rendering with 12 columns. The sort comparator (lines 79-86) is recomputed on every render without memoization. The `SortHeader` sub-component is defined inline (lines 159-168) and closes over parent state.
- **Impact:** Hard to test sort/filter logic independently. As payroll features grow (e.g., deductions, adjustments), this file will cross 500 LOC. Inline `SortHeader` recreated every render — minor perf impact but breaks memoization of child components.
- **Fix:** Extract `SortHeader` to a shared UI component. Wrap the sort computation in `useMemo`. Consider extracting the table into a `PayrollTable` sub-component.
- **Effort:** S

---

#### W4: Reducer at 200+ lines with 26 action types in single switch

- **Principle:** OCP / SRP
- **Location:** `src/app/providers/AppProvider.tsx:11-205`
- **Description:** The `appReducer` function handles 26 action types in a single switch statement (including 8 rollback actions). Adding a new entity requires adding 3-4 new action types (ADD, UPDATE, DEACTIVATE, REMOVE) to both the reducer and the Action union type.
- **Impact:** Every new feature modifies this 200-line switch. At 3 engineers, this becomes a bottleneck. The Action union in `shared.ts` (lines 129-161) also grows unboundedly — currently 26 variants.
- **Fix:** Use `combineReducers`-style pattern: extract domain-specific sub-reducers (`shiftReducer`, `driverReducer`, etc.) and compose them. Alternatively, adopt a slice-per-feature approach.
- **Effort:** L

---

#### W5: Only 1 of 9 features has tests

- **Principle:** Testing / Modern Practices
- **Location:** `src/features/payroll/lib/__tests__/payroll.test.ts` (only test file)
- **Description:** Only the payroll calculation engine has tests (492 LOC of tests). The following have zero test coverage: CSV parser validation logic, shift hours calculation, date utilities, mapper functions, center filter hook, and validators. These all contain testable pure functions.
- **Impact:** Regression risk is high for the payroll-adjacent logic (CSV parser, date-utils, validators). As the team grows to 3, lack of tests means slower onboarding — new engineers can't verify their changes don't break existing behavior. The pure utility functions (`date-utils.ts`, `validators.ts`, `csv-parser.ts`) are low-effort, high-value test candidates.
- **Fix:** Add tests for: (1) `csv-parser.ts` validation logic, (2) `date-utils.ts` week bounds + shift hours, (3) `validators.ts` form validation, (4) `mappers.ts` DB→app transforms. Target the pure functions first — no mocking needed.
- **Effort:** M

---

#### W6: No structured error logging

- **Principle:** Error Handling / Observability
- **Location:** `src/app/providers/AppProvider.tsx:255`, `src/features/auth/LoginPage.tsx:76`, `src/lib/supabase/queries.ts:100`
- **Description:** The entire codebase has only 3 logging statements: two `console.error` and one `console.warn`. All mutation errors in `actions.ts` are shown as user-facing toasts but never logged for operational debugging. There is no error reporting service integration (Sentry, LogRocket, etc.).
- **Impact:** In production, when a mutation fails (e.g., Supabase timeout), the admin sees a toast that disappears — no persistent record for debugging. As the fleet scales to 2,000 vehicles, silent failures in payroll close or trip import could go unnoticed.
- **Fix:** Add a lightweight `logger.ts` utility that wraps `console.error` with structured context (action name, entity ID, timestamp). In the near term, add `console.error` calls in the `if (error)` branches of `actions.ts`. Longer term, integrate Sentry or similar.
- **Effort:** S (basic) / M (Sentry integration)

---

#### W7: Pagination load-more functions duplicate 95% identical structure

- **Principle:** DRY
- **Location:** `src/lib/actions.ts:356-426`
- **Description:** `actionLoadMoreShifts`, `actionLoadMoreTrips`, and `actionLoadMorePayroll` (lines 356-426) share an identical pattern: try/catch → fetch page → dispatch APPEND if data → return hasMore. The only differences are the fetch function called, the dispatch action type, and the payload shape.
- **Impact:** Adding a new paginated entity requires copy-pasting this block again. Any change to the error handling or loading pattern must be applied to all three.
- **Fix:** Extract a generic `actionLoadMore<T>()` helper parameterized by fetch function and dispatch action type. Example: `createLoadMore(fetchFn, actionType)`.
- **Effort:** S

---

### Info — Nice to Fix

#### I1: Filter+search pattern duplicated across 5 pages

- **Principle:** DRY
- **Location:** `src/features/drivers/DriversPage.tsx:35-57`, `src/features/vehicles/VehiclesPage.tsx:37-67`, `src/features/shifts/ShiftsPage.tsx:28-56`, `src/features/users/UsersPage.tsx:31-41`, `src/features/payroll/PayrollPage.tsx:30-76`
- **Description:** Five page components independently implement search state (`useState('')`), status filter state, and a `useMemo`-based filter chain. The UI pattern (search input + filter pills + table + clear button) is also repeated structurally.
- **Fix:** Extract a `useFilteredList(items, searchFields, filters)` hook. This is acceptable for now — each page has slightly different filter dimensions, and premature abstraction could reduce clarity.
- **Effort:** M

---

#### I2: Dashboard tick-based re-render every 60 seconds

- **Principle:** KISS / Performance
- **Location:** `src/features/dashboard/DashboardPage.tsx:24-29`, `src/features/shifts/ShiftsPage.tsx:30-35`
- **Description:** Both pages use `const [, setTick] = useState(0)` with `setInterval(() => setTick(t => t + 1), REFRESH_INTERVAL)` to trigger re-renders for updating "time since check-in" displays. This causes a full component re-render (including all child components and useMemo recalculations) every 60 seconds.
- **Fix:** Acceptable pattern at current scale. If performance becomes an issue, isolate the time-dependent UI into a small `<LiveDuration checkIn={...} />` component that manages its own tick.
- **Effort:** S

---

#### I3: AcceptInvitePage bypasses the action layer

- **Principle:** SoC / Convention Consistency
- **Location:** `src/features/auth/AcceptInvitePage.tsx:35-36, 86-113`
- **Description:** This page calls `supabase.from('profiles').select(...)` and `supabase.auth.updateUser()` directly, bypassing the established `action*() → persist*()` convention. It also builds a session object manually (lines 105-108) and calls `dispatch({ type: 'LOGIN' })` directly.
- **Fix:** Acceptable exception. Auth pages have a fundamentally different lifecycle (user isn't authenticated yet, no AppState available). Document as an intentional exception in CLAUDE.md.
- **Effort:** S

---

#### I4: `role` field on User and Session is `string` instead of literal union

- **Principle:** Type Safety / Primitive Obsession
- **Location:** `src/types/shared.ts:54` (`User.role: string`), `src/types/shared.ts:100` (`Session.role: string`)
- **Description:** While `DriverStatus`, `VehicleStatus`, `ShiftStatus`, `UserStatus`, and `PayrollStatus` are all properly typed as string literal unions, the `role` field on `User` (line 54) and `Session` (line 100) remains a plain `string`. The codebase uses `'admin'` and `'supervisor'` as role values consistently, but TypeScript can't enforce this.
- **Fix:** Add `export type UserRole = 'admin' | 'supervisor';` and use it for both `User.role` and `Session.role`. This catches typos at compile time and enables exhaustive switch checks.
- **Effort:** S

---

#### I5: Sort logic in PayrollPage not memoized

- **Principle:** Performance
- **Location:** `src/features/payroll/PayrollPage.tsx:79-86`
- **Description:** The `sorted` array is recomputed on every render via `[...displayData].sort(...)` without `useMemo`. For the current fleet size (~150 drivers), this is negligible. At 2,000 vehicles with proportional driver growth, sorting could become noticeable.
- **Fix:** Wrap in `useMemo(...)` keyed on `[displayData, sortKey, sortAsc]`.
- **Effort:** S

---

## 5. Recommendations

| # | Action | Severity | Effort | Finding | Expected Impact |
|---|--------|----------|--------|---------|-----------------|
| 1 | Add tests for pure utility functions (csv-parser, date-utils, validators, mappers) | W | M | W5 | Regression safety for 3-person team |
| 2 | Split actions.ts into domain-scoped files | W | M | W2 | Eliminates merge conflicts, improves discoverability |
| 3 | Add structured error logging in action layer | W | S | W6 | Operational visibility for production debugging |
| 4 | Memoize PayrollPage sort + extract SortHeader | W | S | W3, I5 | Quick performance win, cleaner component |
| 5 | Extract generic loadMore helper for pagination | W | S | W7 | DRY, consistent error handling |
| 6 | Type `role` as `'admin' \| 'supervisor'` union | I | S | I4 | Compile-time typo catching |
| 7 | Document mappers.ts dual-state pattern | W | S | W1 | Team onboarding clarity |
| 8 | Extract domain sub-reducers from AppProvider | W | L | W4 | Scalable state management |
| 9 | Move lookup maps into React-managed state | W | M | W1 | Single source of truth |
| 10 | Extract useFilteredList hook | I | M | I1 | DRY, but low urgency |

### Quick Wins (Effort: S)

- **Add `console.error` in all `if (error)` branches** of `actions.ts` — 15 sites, ~15 minutes. (W6)
- **Memoize PayrollPage sort** — wrap lines 79-86 in `useMemo`. (I5)
- **Extract `SortHeader`** from PayrollPage into `components/ui/SortHeader.tsx`. (W3)
- **DRY the loadMore pattern** — extract `createLoadMore()` factory in `actions.ts`. (W7)
- **Add `UserRole` type** — 3-line change in `shared.ts` + find-replace `role: string`. (I4)

### Planned Improvements (Effort: M-L)

- **Test pure functions** — `csv-parser.ts`, `date-utils.ts`, `validators.ts`, `mappers.ts`. Estimate: 4-6 hours. No mocking needed. (W5)
- **Split actions.ts** — create `lib/actions/{shift,driver,vehicle,trip,payroll,user}-actions.ts` + barrel `index.ts`. Estimate: 2-3 hours. (W2)
- **Migrate lookup maps** — move into AppState or a `useLookupMaps()` ref-hook. Estimate: 3-4 hours. (W1)

### Strategic Refactors (Effort: XL)

- **Reducer architecture** — if the app grows beyond ~10 entities, consider migrating to Zustand slices or TanStack Query for server state. This is not urgent at current scale but should be planned before the codebase exceeds ~15K LOC. (W4)
- **Observability pipeline** — integrate Sentry or LogRocket before production traffic increases. Include structured error context (action name, entity ID, user role). (W6)

---

## 6. Strengths

- **Rigorous optimistic mutation pattern** — All 15 mutations follow the same `dispatch(optimistic) → persist() → rollback on error` pattern. The compensating transaction (C3) for multi-table mutations (check-in = shift + vehicle status) is correctly implemented with rollback, not just a no-op. This is production-grade mutation handling.

- **Zero `any` types, zero `@ts-ignore`** — Strict TypeScript throughout the entire 8,937 LOC codebase. Not a single `any` annotation or type suppression directive. The 5 domain status types are properly modeled as string literal unions (`DriverStatus`, `VehicleStatus`, etc.).

- **Clean feature module structure with zero cross-feature imports** — Each feature in `features/` is fully self-contained with its own Page, components, and lib. No feature imports from another feature's internal modules. All inter-feature communication goes through the shared AppState. Barrel exports provide clean public APIs.

- **Complete DB↔App decoupling via mapper layer** — `mappers.ts` fully isolates the Supabase `snake_case` schema from the app's `camelCase` domain types. This means the DB schema can evolve independently — renaming a DB column only requires changing the mapper function, not every component.

- **Split context prevents unnecessary re-renders** — `useAppState()` and `useAppDispatch()` use separate React contexts (lines 232-234 of AppProvider.tsx). Components that only dispatch (e.g., action handlers) don't re-render when state changes. This is a React performance best practice that many production apps miss.

- **Error boundary + toast system provides layered error coverage** — `ErrorBoundary` (class component, correct implementation) catches render-time crashes. The `showToast` system provides user-facing feedback for all async mutation failures. The `useConfirmDialog` hook gates destructive actions (deactivate, close payroll) with confirmation prompts.

---

## 7. Summary

The Fleet Intelligence MVP scores **72/100 (Good)** overall. The architecture is clean, well-typed, and follows consistent patterns that demonstrate strong engineering judgment — particularly the optimistic mutation layer, the mapper-based DB decoupling, and the zero-any TypeScript discipline. The most pressing issue is **test coverage** (W5): only payroll has tests, while CSV parsing, date utilities, and validators contain critical business logic that's untested. Before scaling the team to 3 engineers, the first action should be adding tests for pure utility functions (M effort, high ROI) and splitting `actions.ts` into domain-scoped files (M effort, eliminates merge conflicts). If these recommendations are followed in the first month, the codebase is well-positioned to scale to 15K+ LOC without accumulating significant tech debt.
