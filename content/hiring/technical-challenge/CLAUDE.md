# Technical Challenge: Fleet Intelligence & Payroll MVP

Build a functional MVP for fleet unit assignment + payroll calculation with AI capabilities.
Deadline: Thursday (max). Deliverables: Live URL + code/architecture access.
Evaluator: Levi Garcia (Head of Product). Followed by Technical/Product Panel.

## Key Assumptions (7 critical — [full list of 25](assumptions-qa.md))

1. "Hours worked" = shift duration (check-in to check-out), NOT sum of DiDi trip times
2. Two data sources for payroll: shifts (check-in system) + billing (DiDi CSV)
3. Tips excluded from $6,000 MXN billing threshold — only `Cost` column counts
4. Conductor is NOT a system user — only Admin and Supervisor roles
5. DiDi CSV uploaded manually by Admin (no API integration for MVP)
6. Weekly close = Sunday 8 PM CDMX (America/Mexico_City). Week starts Monday 00:00
7. No IMSS/ISR deductions — MVP calculates gross pay only

## Payroll Formula

See [brief.md](brief.md#payroll-formula-pseudocode) for complete pseudocode. Key rules:
- Goal: 40h worked AND $6,000 billed → if either fails, driver gets $1,000 only
- Bonus: +$100 per $500 above the $6K threshold
- Overtime: $50/hr (max 8h), only if previous week had 40h+

## Supabase Setup

Run [`supabase-schema.sql`](supabase-schema.sql) in the Supabase SQL Editor (DDL + RLS + seed data).
Env vars in `fleet-intelligence/.env.local`: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.

## Critical Edge Cases ([22 total](data-generation-plan.md#deliberate-edge-cases-22-total))

- Driver at exactly $6,000.00 billing (boundary)
- Driver at $5,999.xx — misses goal by $1
- 39.5h + $7,000 billing — hours fail, billing passes
- Week 1: no overtime possible (no previous_week data)
- New driver enters mid-week — proration of thresholds
- Overtime cap: driver with 50h should cap at 8h extra
- Sunday trip starting at 19:50 (near weekly close boundary)
- High-tip trips to verify tips excluded from threshold

## Deliberate Deviations from Brief

These are intentional design decisions that differ from the brief's pseudocode:

1. **Proration for new drivers:** The brief uses fixed `40h` and `$6,000` thresholds. The PRD and code
   prorate thresholds for drivers who start mid-week (`40h × days/5`, `$6K × days/5`). Without proration,
   every new driver automatically gets $1,000 their first week. See [assumptions-qa.md #13](assumptions-qa.md#53-conductor-nuevo-entra-a-mitad-de-semana--se-prorratean-los-umbrales).

2. **Productivity bonus uses prorated threshold:** When proration applies, `extra_revenue = revenue - prorated_threshold`
   instead of `revenue - 6000`. This is consistent — if the goal is prorated, the bonus base should be too.

3. **Sunday 8 PM cutoff → midnight simplification:** The brief says weekly close at Sunday 8 PM. The
   implementation uses midnight-to-midnight week boundaries (`week_end` is a `DATE` type, not `TIMESTAMPTZ`).
   The Sunday 20:00–Monday 00:00 gap rule from assumptions-qa is not yet implemented. This is a known
   simplification for MVP — would require `TIMESTAMPTZ` week bounds and timezone-aware trip assignment.

4. **Overtime threshold is always 40h (matches brief):** Even when proration applies to the goal-met check,
   overtime is calculated against the full 40h threshold: `min(hours - 40, 8)`. This matches the brief's
   pseudocode exactly: `overtime_hours = min(hours - 40, 8)`.

5. **Trip data uses daily billing aggregates:** Seed data has 1 record per driver per day (~$1,500–$1,900)
   instead of 10-15 individual trips (~$125–$210 each). This is a data simplification — the CSV parser
   supports both formats (individual trips with `$` prefix and coordinates, and aggregate records).

## Scale Context

The seed data is a demo subset for edge-case testing. Production volumes are significantly higher:

| Metric | Demo Seed | 150 Vehicles (today) | 2,000 Vehicles (target) |
|--------|-----------|---------------------|------------------------|
| Drivers | 30 | ~300 | ~4,000 |
| Trips/week | 68 | ~10,800 | ~144,000 |
| Shifts/week | 16 | ~1,800 | ~24,000 |
| Payroll/week | 30 | ~300 | ~4,000 |

**Architecture decisions that support 2K scale:**
- UUIDs as primary keys (no integer overflow, distributed-safe)
- Center-based RLS with indexed `center_id` columns (policies use index scan, not seq scan)
- 5 dedicated scale indexes in schema (see `supabase-schema.sql`)
- Payroll versioning via `(driver_id, week_start, version)` UNIQUE constraint (idempotent re-execution)

**Known limitations at 2K (documented in [prd.md §7.7](prd.md#77-capacidad-y-escala)):**
- `fetchAllData()` loads all tables on login — needs lazy loading + pagination
- CSV parsing is client-side — 15–20 MB files need chunked/streaming upload
- Payroll compute is client-side — 4,000 records need server-side Edge Function or pg function
- `payroll.ts` uses `MOCK_CENTERS` for center name lookup — won't resolve UUID-based center IDs from Supabase (fallback parameter added, not yet wired through AppState)

## File Ownership

| File | Owns |
|------|------|
| `brief.md` | Challenge spec, payroll pseudocode, DiDi CSV format, RBAC, deliverables |
| `assumptions-qa.md` | 25 resolved ambiguities with sources and confidence levels |
| `prd.md` | Executable PRD — 8 screens, specs, data model, payroll logic, AI integration |
| `data-generation-plan.md` | Design doc (not built): generator algorithm, driver pool design, edge case catalog |
| `supabase-schema.sql` | DDL, RLS policies, indexes, seed data |
| `presentation-strategy.md` | Reforge frameworks × challenge presentation |

## Known Limitations (MVP)

1. **Optimistic dispatch without rollback (H1):** All `action*()` functions in `src/lib/actions.ts`
   dispatch optimistic state updates before `persist*()`. If persistence fails, the UI shows stale
   data until page reload. Fix requires adding rollback action types to the reducer.

2. **Mapper lookup maps are stale mid-session (H2):** `src/lib/mappers.ts` builds `driversMap`/`centersMap`
   once on HYDRATE. Drivers or centers created after hydration won't be found by `mapShift()`/`mapTrip()`.
   Would need moving maps into AppState or invalidating on each mutation.

3. **Explanation reverse-engineers overtime hours (M4):** `src/lib/explanation.ts:33` calculates
   `otHours = overtimePay / 50`. If the overtime rate changes from $50/hr, the explanation will show
   wrong hours. Fix: pass `otHours` explicitly in PayrollRecord.

4. **`centers` fetched but not in AppState (M5):** `fetchAllData()` returns `centers`, but `AppState`
   doesn't have the field. The spread in HYDRATE silently drops it. `payroll.ts` uses `MOCK_CENTERS`
   fallback for center name lookup. Fix: add `centers: Center[]` to AppState.

5. **`selectedWeek` stale after new close (L4):** `PayrollPage.tsx` initializes `selectedWeek` via
   `useState(() => ...)` which runs once. If a new week is closed, the dropdown doesn't auto-select it.

## Cross-References

- [AI Roadmap](../../strategy/ai-roadmap.md) — Phase 0 context (this challenge = P0.5a)
- [Interview with Levi](../interviews/interview-levi-2026-02-06.md) — Operational context
- [Business Model](../../thesis/04-business-model.md) — Unit economics behind DaE payroll
- [Gig Driver Economics](../../analysis/market/gig-driver-economics.md) — Market context
