# Architecture Review — Fleet Intelligence MVP

**Module:** `fleet-intelligence/src/`
**Date:** 2026-02-18
**Reviewer:** Claude (arch-review skill)
**Type:** Module review (full source directory)

---

## Overview

Fleet Intelligence is a React 18 + TypeScript + Vite single-page application built as a technical challenge MVP for LAFA. It manages drivers, vehicles, shifts, trip CSV imports, and payroll calculations with Supabase as the persistence backend and a full mock-data fallback for demo/offline mode.

| Metric | Value |
|--------|-------|
| Source files | 38 (.ts / .tsx) |
| Total LOC | ~5,350 |
| Runtime dependencies | 5 (react, react-dom, react-router-dom, @supabase/supabase-js, lucide-react) |
| Test files | 0 |
| Build system | Vite 6 |

---

## Health Score: 68 / 100 (Good)

| Category | Score | Weight | Rating | Key Driver |
|----------|-------|--------|--------|------------|
| SOLID Principles | 14 / 20 | 20% | Good | SRP violations in page components; mutations lack error contracts |
| Design Principles (DRY, KISS, YAGNI) | 13 / 20 | 20% | Good | Multiple duplicated utilities and patterns |
| Architecture Patterns (SoC, Layering) | 12 / 20 | 20% | Good | No service layer; pages call persistence directly |
| Code Quality Signals | 15 / 20 | 20% | Good | Clean types, named constants, consistent style |
| Modern Practices | 14 / 20 | 20% | Good | Good dual-mode pattern; zero test coverage |

**Score breakdown:**
- SOLID: +4 clean reducer + typed actions, +4 extracted business logic (payroll.ts), +3 clean component composition (UI kit), -3 SRP violations (God Components), -1 silent mutation errors (violation of LSP — caller can't distinguish success/failure)
- Design: +4 named constants with semantic meaning, +4 minimal dependency footprint, -2 formatMXN duplicated, -2 date parser duplicated, -1 modal pattern duplicated
- Architecture: +4 Supabase/mock dual-mode, +4 proper state management via reducer, -3 no service layer between UI and persistence, -3 module-level mutable globals in mappers.ts
- Quality: +5 consistent Tailwind design system, +4 TypeScript strict mode, +4 discriminated union actions, +2 form validations with business rules, -0 (no major style issues)
- Modern: +4 Vite + modern React patterns (hooks, context), +4 useReducer over prop-drilling, +4 env-based feature flags (Supabase toggle), +2 proper localStorage session, -4 zero test coverage, -2 no error boundaries

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                        App.tsx                           │
│  BrowserRouter → AppProvider → ToastProvider → Routes    │
│  ⚠ No ErrorBoundary                                     │
└───────────────────────┬──────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Pages (7)   │ │  Components  │ │   Context    │
│  Dashboard   │ │  ui/ (8)     │ │  AppContext   │
│  Shifts      │ │  layout/ (2) │ │  ToastContext │
│  CsvUpload   │ │  shifts/ (2) │ └──────┬───────┘
│  Payroll     │ │  drivers/ (1)│        │
│  Drivers     │ └──────────────┘        ▼
│  Vehicles    │                  ┌──────────────┐
│  Users       │──── direct ────▶│  Persistence │
│  Login       │    import       │  mutations.ts │
└──────────────┘                 │  queries.ts   │
                                 └──────┬───────┘
        ┌───────────────┐               │
        │  lib/ (7)     │               ▼
        │  payroll.ts   │        ┌──────────────┐
        │  dateUtils.ts │        │   Supabase   │
        │  mappers.ts   │        │  (or null)   │
        │  explanation  │        └──────────────┘
        │  dataUtils    │
        │  statusMap    │        ┌──────────────┐
        │  supabase.ts  │        │  Mock Data   │
        └───────────────┘        │  mockData.ts │
                                 └──────────────┘
```

**Data flow:** Pages read from `AppContext` (via `useAppState`) and write via `useAppDispatch` + direct `persist*()` calls. There is no intermediate service layer — pages are responsible for coordinating state updates with persistence.

---

## Findings

### CRITICAL (2)

#### C1. Silent Mutation Failures — All Supabase Writes Ignore Errors

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Principle** | Robustness / Fail-Fast / LSP |
| **Location** | `src/lib/supabase-mutations.ts:6-206` (all 14 functions) |

**Description:** Every mutation function (`persistCheckIn`, `persistCheckOut`, `persistNewDriver`, `persistUpdateDriver`, `persistDeactivateDriver`, `persistNewVehicle`, `persistUpdateVehicle`, `persistTrips`, `persistClosePayroll`, `persistRerunPayroll`, `persistNewUser`, `persistUpdateUser`, `persistDeactivateUser`, `persistVehicleStatus`) returns `void` and discards the Supabase response without checking `.error`.

**Example (representative of all 14):**
```typescript
// supabase-mutations.ts:6-16
export async function persistCheckIn(shift: Shift, createdBy: string) {
  if (!supabase) return;
  await supabase.from('shifts').insert({
    // ... fields
  });
  // ← .error never checked. Caller shows success toast regardless.
}
```

**Impact:** If a write fails (network timeout, RLS policy violation, unique constraint, Supabase outage), the user sees a success toast but the data is only in local state — not persisted. On page refresh, changes vanish silently. This is especially dangerous for `persistClosePayroll` (line 136) where payroll records appear closed but aren't in the database.

**Fix:** Return `{ error }` from every mutation, check it in the caller, and show an error toast on failure. Optionally roll back the optimistic dispatch.

```typescript
export async function persistCheckIn(shift: Shift, createdBy: string): Promise<{ error: Error | null }> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('shifts').insert({ /* ... */ });
  return { error };
}
```

---

#### C2. No React Error Boundary — Runtime Errors Crash to White Screen

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Principle** | Resilience / Graceful Degradation |
| **Location** | `src/App.tsx:99-111`, `src/main.tsx:6-9` |

**Description:** The component tree (`BrowserRouter` → `AppProvider` → `ToastProvider` → `ConfirmDialogProvider` → `AppRoutes`) has no `ErrorBoundary`. Any unhandled runtime error in any page component (e.g., accessing a property on `undefined`, a failed `.map()` call) will crash the entire React tree and display a blank white screen.

**Impact:** In production, an edge case in one page (say, Payroll) would make the entire app unusable — users can't even navigate to other working pages.

**Fix:** Add a top-level `ErrorBoundary` component wrapping `<AppRoutes />` that catches rendering errors and displays a fallback UI with a "reload" button.

---

### WARNING (8)

#### W1. God Components — 5 Pages Exceed 400 Lines (SRP Violation)

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | SRP (Single Responsibility) / SoC |
| **Locations** | `DriversPage.tsx` (496 LOC), `PayrollPage.tsx` (492 LOC), `VehiclesPage.tsx` (461 LOC), `CsvUploadPage.tsx` (452 LOC), `UsersPage.tsx` (437 LOC) |

**Description:** Each page file bundles four distinct responsibilities:
1. **State management** — 8-12 `useState` hooks per page
2. **Business logic** — form validation, filtering, sorting, calculations
3. **Persistence coordination** — calling `persist*()` functions and dispatching to reducer
4. **Rendering** — 200+ lines of JSX including tables, modals, slide panels

**Example — `PayrollPage.tsx`:**
- Lines 18-29: 12 state hooks
- Lines 32-60: 3 `useMemo` computations (previousWeekHours, livePayroll, closedWeeks)
- Lines 111-154: 3 handler functions with persistence calls
- Lines 170-491: 320 lines of JSX

**Fix:** Extract custom hooks (`usePayrollData`, `usePayrollActions`) and sub-components (`PayrollTable`, `PayrollDetailPanel`). Target: no page file > 200 LOC.

---

#### W2. Shift-Hours Calculation Duplicated 3x in PayrollPage

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | DRY |
| **Location** | `src/pages/PayrollPage.tsx:50-57`, `src/pages/PayrollPage.tsx:120-123`, `src/pages/PayrollPage.tsx:142-145` |

**Description:** The shift-hours-per-driver aggregation is computed identically in three places within the same file:

```typescript
// Appears at lines 50-57, 120-123, and 142-145 with minor variations:
const shiftSummaries = drivers.filter(d => d.status === 'activo').map(driver => {
  const driverShifts = shifts.filter(
    s => s.driverId === driver.id && s.status === 'completado' && s.hoursWorked
  );
  return {
    driverId: driver.id,
    totalHours: driverShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0),
  };
});
```

**Fix:** Extract to a shared function `buildShiftSummaries(drivers, shifts)` in `lib/dateUtils.ts` or a new `lib/shiftUtils.ts`.

---

#### W3. Modal Pattern Duplicated Across Pages

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | DRY / Component Reuse |
| **Locations** | `src/pages/VehiclesPage.tsx:393-458`, `src/pages/UsersPage.tsx:356-434` |

**Description:** Both pages implement a manual modal overlay pattern with identical structure:

```tsx
{showCreateModal && (
  <>
    <div className="fixed inset-0 z-[80] bg-black/50" onClick={() => setShowCreateModal(false)} />
    <div className="fixed inset-0 z-[81] flex items-center justify-center p-4">
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 max-w-md w-full shadow-2xl">
        {/* form content */}
      </div>
    </div>
  </>
)}
```

Note: `DriversPage` already uses a properly extracted `<DriverCreateModal>` component (line 487), showing the pattern was recognized but not generalized.

**Fix:** Create a generic `<Modal>` component in `components/ui/` (similar to the existing `SlidePanel` and `ConfirmDialog`), then use it in Vehicles, Users, and Drivers.

---

#### W4. Module-Level Mutable State in mappers.ts

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | Encapsulation / Avoid Global Mutable State |
| **Location** | `src/lib/mappers.ts:8-23` |

**Description:** Four module-scoped `let` variables hold mutable lookup maps:

```typescript
// mappers.ts:8-11
let centersMap: Map<string, DbCenter> = new Map();
let driversMap: Map<string, DbDriver> = new Map();
let vehiclesMap: Map<string, DbVehicle> = new Map();
let profilesMap: Map<string, DbProfile> = new Map();
```

These are populated by `setLookupMaps()` (called from `supabase-queries.ts:45`) and read by every `map*()` function. This creates implicit coupling: the mapper functions produce incorrect results if called before `setLookupMaps()`, and the state persists across HMR reloads during development.

**Fix:** Pass lookup maps as function parameters, or encapsulate in a class/closure. Alternatively, accept this as an MVP trade-off and document the initialization dependency.

---

#### W5. `formatMXN` Duplicated in Two Files

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | DRY |
| **Locations** | `src/data/mockData.ts:321-328` (`formatMXN`), `src/lib/explanation.ts:14-21` (`fmtMXN`) |

**Description:** Two identical `Intl.NumberFormat` wrappers for MXN currency formatting:

```typescript
// mockData.ts:321-328
export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency', currency: 'MXN',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);
}

// explanation.ts:14-21  (identical logic, named fmtMXN)
function fmtMXN(amount: number): string { /* same implementation */ }
```

**Fix:** Move `formatMXN` to `lib/dataUtils.ts` (which already exists with a single function) and import everywhere.

---

#### W6. Date Parser (DD/MM/YYYY → ISO) Duplicated

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | DRY |
| **Locations** | `src/lib/payroll.ts:21-25` (`parseFechaToISO`), `src/lib/supabase-mutations.ts:90-93` (`fechaToISO`) |

**Description:** Two functions that convert `DD/MM/YYYY` → `YYYY-MM-DD`:

```typescript
// payroll.ts:21-25
function parseFechaToISO(fecha: string): string {
  const parts = fecha.split('/');
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return fecha;
}

// supabase-mutations.ts:90-93
function fechaToISO(fecha: string): string {
  const [d, m, y] = fecha.split('/');
  return `${y}-${m}-${d}`;
}
```

Note: the `payroll.ts` version has a guard (`parts.length === 3`), while the `supabase-mutations.ts` version does not — a subtle inconsistency that could cause bugs with malformed input.

**Fix:** Move to `lib/dateUtils.ts` (which already exists) as a single exported function with the guard.

---

#### W7. Zero Test Coverage

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | Testability / Quality Assurance |
| **Location** | Entire codebase — no `*.test.*` or `*.spec.*` files |

**Description:** There are no test files, no test runner (`vitest`, `jest`) in dependencies, and no test script in `package.json`. The payroll calculation engine (`lib/payroll.ts`) contains non-trivial business logic (prorated thresholds, conjunctive goals, overtime caps) that is particularly well-suited for unit testing.

**Priority targets for first tests:**
1. `lib/payroll.ts` — `calculateWeeklyPay()` with edge cases (prorated drivers, exact thresholds, overtime caps)
2. `lib/explanation.ts` — `generateExplanation()` output for goal-met vs. goal-not-met
3. `CsvUploadPage.tsx` — `parseCsvText()` and `validateRow()` (pure functions, easy to test)

**Fix:** Add `vitest` as a dev dependency, create a `src/__tests__/` directory, and write unit tests starting with the pure business logic functions.

---

#### W8. No Service Layer — Pages Directly Call Persistence

| Field | Value |
|-------|-------|
| **Severity** | Warning |
| **Principle** | SoC (Separation of Concerns) / Layered Architecture |
| **Locations** | All 7 page files import from `supabase-mutations.ts` |

**Description:** Pages directly import and call `persist*()` functions alongside dispatching to the reducer. This means each page is responsible for:
1. Optimistic state update (`dispatch(...)`)
2. Persistence call (`persist*(...)`)
3. User feedback (`showToast(...)`)

**Examples:**
```typescript
// DriversPage.tsx:92-94
dispatch({ type: 'ADD_DRIVER', payload: newDriver });
persistNewDriver(newDriver);
showToast('success', `Conductor ${newDriver.fullName} creado.`);

// VehiclesPage.tsx:89-91 — same 3-step pattern
dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: vehicle.id, status: newStatus } });
persistVehicleStatus(vehicle.id, newStatus);
showToast('success', `${vehicle.plate} → ${STATUS_LABELS[newStatus]}`);
```

This 3-step pattern (dispatch + persist + toast) is repeated ~15 times across all pages. If error handling is added (see C1), each callsite would need try/catch + rollback logic.

**Fix:** Create a service layer (e.g., `lib/actions.ts`) that bundles dispatch + persist + error handling + toast into single async functions:

```typescript
async function addDriver(driver: Driver, dispatch: Dispatch, showToast: ShowToast) {
  dispatch({ type: 'ADD_DRIVER', payload: driver });
  const { error } = await persistNewDriver(driver);
  if (error) {
    dispatch({ type: 'REMOVE_DRIVER', payload: driver.id }); // rollback
    showToast('error', 'Error al guardar conductor');
    return;
  }
  showToast('success', `Conductor ${driver.fullName} creado.`);
}
```

---

### INFO (5)

#### I1. Lean Dependency Footprint

| Field | Value |
|-------|-------|
| **Severity** | Info (Positive) |
| **Principle** | YAGNI / Simplicity |
| **Location** | `package.json` — 5 runtime deps |

Only 5 runtime dependencies: `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js`, `lucide-react`. No state management library (uses built-in `useReducer`), no form library, no date library, no CSS-in-JS runtime. This keeps the bundle small and avoids unnecessary abstraction for an MVP.

---

#### I2. Clean Supabase/Mock Dual-Mode

| Field | Value |
|-------|-------|
| **Severity** | Info (Positive) |
| **Principle** | Graceful Degradation / Feature Flags |
| **Location** | `src/lib/supabase.ts:1-12`, `src/context/AppContext.tsx:214-216`, `src/context/AppContext.tsx:226-241` |

The app detects Supabase configuration at startup (`isSupabaseConfigured` flag). When unconfigured, it falls back to rich mock data (30 drivers, 12 vehicles, 16 shifts, 60 trips, 30 payroll records) that demonstrates the full UI. When configured, it hydrates from Supabase via `fetchAllData()` with a fallback to mock data on error. This dual-mode allows the app to run as a standalone demo without any backend.

---

#### I3. Well-Structured Reducer with Typed Actions

| Field | Value |
|-------|-------|
| **Severity** | Info (Positive) |
| **Principle** | Type Safety / Predictable State |
| **Location** | `src/context/AppContext.tsx:80-97` (Action type), `src/context/AppContext.tsx:101-194` (reducer) |

The `Action` type is a discriminated union of 16 action types, each with a typed payload. The reducer handles all cases in a single switch statement with immutable state updates. This provides compile-time exhaustiveness checking and makes state transitions easy to audit.

---

#### I4. Business Logic Properly Extracted to lib/

| Field | Value |
|-------|-------|
| **Severity** | Info (Positive) |
| **Principle** | SoC / Testability |
| **Locations** | `src/lib/payroll.ts:42-136` (`calculateWeeklyPay`), `src/lib/explanation.ts:23-69` (`generateExplanation`), `src/lib/dateUtils.ts:1-24` |

The payroll calculation engine is a pure function — it takes inputs (drivers, trips, shift summaries, week bounds) and returns payroll records without side effects. Similarly, `generateExplanation` produces deterministic AI-style text from a payroll summary. This separation makes the core business logic portable and (eventually) testable.

---

#### I5. Consistent Design System via Tailwind Tokens

| Field | Value |
|-------|-------|
| **Severity** | Info (Positive) |
| **Principle** | Consistency / DRY |
| **Location** | `tailwind.config.ts` (lafa-* tokens), all component files |

All components use semantic Tailwind tokens (`lafa-bg`, `lafa-surface`, `lafa-border`, `lafa-text-primary`, `lafa-text-secondary`, `lafa-accent`, `lafa-accent-hover`) rather than hardcoded colors. Status colors (green, red, yellow, blue) use consistent rgba patterns. This creates a cohesive dark-theme UI that can be re-themed by changing a few config values.

---

## Prioritized Recommendations

| Priority | Item | Effort | Impact | Finding |
|----------|------|--------|--------|---------|
| P0 | Check `.error` on all Supabase mutations; surface failures to user | 2-3h | High — prevents silent data loss | C1 |
| P0 | Add top-level `ErrorBoundary` with fallback UI | 30min | High — prevents white-screen crashes | C2 |
| P1 | Create service layer (`lib/actions.ts`) bundling dispatch + persist + error | 3-4h | Medium — centralizes error handling, reduces per-page complexity | W8, C1 |
| P1 | Add `vitest` + unit tests for `payroll.ts` and `explanation.ts` | 2-3h | Medium — protects core business logic | W7 |
| P2 | Extract `buildShiftSummaries()` to eliminate 3x duplication | 30min | Low — code hygiene | W2 |
| P2 | Consolidate `formatMXN` and `fechaToISO` duplicates into `lib/` | 30min | Low — code hygiene | W5, W6 |
| P2 | Create generic `<Modal>` component; refactor Vehicles + Users | 1-2h | Low — component reuse | W3 |
| P3 | Extract page hooks + sub-components to reduce God Components | 4-6h | Medium — maintainability | W1 |
| P3 | Replace module-level maps in `mappers.ts` with parameter injection | 1h | Low — architectural purity | W4 |

---

## Summary

Fleet Intelligence is a well-structured MVP that makes smart trade-offs for speed. The codebase demonstrates strong fundamentals: typed state management, clean Supabase/mock dual-mode, extracted business logic, consistent design tokens, and a lean dependency footprint.

The two critical issues — silent mutation failures and missing error boundaries — are both fixable in under 3 hours combined and should be addressed before any production use. The warning-level findings (God Components, duplicated utilities, missing tests, no service layer) are typical of a rapid prototype and represent the natural next steps for hardening the codebase as the team grows.

**Overall verdict:** The architecture is sound for its stage. The code reads as "intentionally pragmatic" rather than "accidentally messy" — the right posture for an MVP that may need to iterate quickly.
