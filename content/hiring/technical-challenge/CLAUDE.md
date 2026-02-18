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

1. **Proration for new drivers:** Brief uses fixed `40h` / `$6,000`. Code prorates by `days/5` for mid-week starts. Without proration, every new driver automatically gets $1,000 their first week. See [assumptions-qa.md #13](assumptions-qa.md#53-conductor-nuevo-entra-a-mitad-de-semana--se-prorratean-los-umbrales).

2. **Productivity bonus uses prorated threshold:** `extra_revenue = revenue - prorated_threshold` instead of `revenue - 6000`. Consistent with prorated goal.

3. **Sunday 8 PM cutoff → midnight simplification:** Implementation uses midnight-to-midnight week boundaries (`DATE` type, not `TIMESTAMPTZ`). Known simplification for MVP.

4. **Overtime threshold always 40h:** Even with proration, overtime = `min(hours - 40, 8)`. Matches brief exactly.

5. **Daily billing aggregates:** Seed data has 1 record/driver/day instead of individual trips. CSV parser supports both formats.

## Scale Context

Demo seed: 30 drivers, 68 trips/week. Production target: 2,000 vehicles → ~4,000 drivers, ~144K trips/week.
Architecture supports scale via UUIDs, center-based RLS with indexed `center_id`, and payroll versioning.
Known scale limitations documented in [prd.md §7.7](prd.md#77-capacidad-y-escala).

## Known Limitations (MVP)

1. **Optimistic dispatch without rollback:** `action*()` in `src/lib/actions.ts` — if persistence fails, UI shows stale data until reload.
2. **Stale mapper lookup maps:** `src/lib/mappers.ts` builds maps once on HYDRATE. Entities created after hydration won't be found.
3. **`centers` not in AppState:** `fetchAllData()` returns centers but `AppState` drops them. `payroll.ts` uses `MOCK_CENTERS` fallback.

## File Ownership

| File | Owns |
|------|------|
| `brief.md` | Challenge spec, payroll pseudocode, DiDi CSV format, RBAC, deliverables |
| `assumptions-qa.md` | 25 resolved ambiguities with sources and confidence levels |
| `prd.md` | Executable PRD — 8 screens, specs, data model, payroll logic, AI integration |
| `data-generation-plan.md` | Generator algorithm design, driver pool, edge case catalog |
| `supabase-schema.sql` | DDL, RLS policies, indexes, seed data |

## Cross-References

- [AI Roadmap](../../strategy/ai-roadmap.md) — Phase 0 context (this challenge = P0.5a)
- [Interview with Levi](../interviews/interview-levi-2026-02-06.md) — Operational context
- [Business Model](../../thesis/04-business-model.md) — Unit economics behind DaE payroll
