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

## File Ownership

| File | Owns |
|------|------|
| `brief.md` | Challenge spec, payroll pseudocode, DiDi CSV format, RBAC, deliverables |
| `assumptions-qa.md` | 25 resolved ambiguities with sources and confidence levels |
| `prd.md` | Executable PRD — 8 screens, specs, data model, payroll logic, AI integration |
| `data-generation-plan.md` | Generator algorithm, driver pool design, edge case catalog |
| `supabase-schema.sql` | DDL, RLS policies, indexes, seed data |
| `presentation-strategy.md` | Reforge frameworks × challenge presentation |

## Cross-References

- [AI Roadmap](../../strategy/ai-roadmap.md) — Phase 0 context (this challenge = P0.5a)
- [Interview with Levi](../interviews/interview-levi-2026-02-06.md) — Operational context
- [Business Model](../../thesis/04-business-model.md) — Unit economics behind DaE payroll
- [Gig Driver Economics](../../analysis/market/gig-driver-economics.md) — Market context
