# Strategy -- Jose's Contribution

> What Jose would build at LAFA. These four files represent the strategic value proposition for the AI Product Engineer role. All organized around a **3-track structure**: Track A (Foundation & Cross-Product), Track B (Driver-as-Employee), Track C (Lease-to-Own).

## Files

| File | What It Answers | Key Output |
|------|----------------|------------|
| [ai-roadmap.md](ai-roadmap.md) | What gets built in the first 9 months? | 16 projects organized by product track (Foundation, DaE, LTO). ~50 weeks, MXN $3.6-9.1M/year |
| [product-ecosystem.md](product-ecosystem.md) | What does the full product look like? | 5 user types, 67 products/touchpoints (53 in roadmap, 14 gaps), 3 horizons |
| [data-infrastructure.md](data-infrastructure.md) | How does the data stack evolve? | 3-phase stack (Metabase to Kafka to Looker), cost scaling $300-$8K/mo, ML priorities mapped to tracks |
| [tech-stack-scaling.md](tech-stack-scaling.md) | What technology choices at each scale? | Build vs buy matrix mapped to tracks, stacks at 500/2K/10K vehicles, data flywheel |

## How They Connect

```
product-ecosystem.md          What to build (full vision, 67 items across 5 user types)
        |
        v
ai-roadmap.md                 When to build it (9-month plan, 16 projects, 3 tracks)
        |
        v
data-infrastructure.md        How data flows (3-phase stack, ML priorities by track)
tech-stack-scaling.md          What tools to use (build vs buy at each scale, mapped to tracks)
```

## The 3-Track Structure

All four files share a common organizational framework:

| Track | Scope | Projects | Key Users |
|-------|-------|----------|-----------|
| **A: Foundation** | Shared infrastructure used by both products | P0.1-P0.3, P0.5c-d, P1, P3, P4, P6-P8 (~34 wk) | Fleet Ops, Finance, All |
| **B: DaE** | Tools specific to the employment model | P0.4, P0.5a, P5 (~8 wk) | Fleet Ops, HR/Payroll |
| **C: LTO** | Tools specific to the financial product | P0.5b, P2 (~8 wk) | Finance, Customer Support |

Mixed projects (P1 Onboarding, P3 Collections, P6 Documents) live in Track A with DaE/LTO-specific scope sections inside each.

## Relationship to Analysis

These strategy files are informed by the deep-dive research in [analysis/](../analysis/):
- **ai-roadmap.md** draws on fleet technology, predictive maintenance, and credit scoring research
- **product-ecosystem.md** maps every feature identified across all analysis files
- **data-infrastructure.md** applies ML priority rankings from credit scoring and battery degradation research
- **tech-stack-scaling.md** applies the build vs buy thresholds from fleet management software analysis

---

*Updated February 7, 2026. Post-interview with Levi Garcia -- restructured by product track (Foundation, DaE, LTO).*
