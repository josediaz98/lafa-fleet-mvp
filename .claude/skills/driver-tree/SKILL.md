---
name: driver-tree
description: Build a driver tree and lever dashboard spec from outcome metrics. Use when decomposing business metrics, building dashboards, or identifying growth levers.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[outcome-metric]"
---

# Driver Tree & Lever Dashboard Builder

Build a driver tree (metric decomposition) and lever dashboard specification. Transforms high-level outcome metrics into actionable KPIs and a focused dashboard design.

## When to Use

- Decomposing a business or product metric into its drivers
- Building a PM dashboard that is both actionable and focused
- Identifying which input metrics are true KPIs (highest-impact levers)
- Setting context-adjusted targets using comparable benchmarks
- Designing investigation rituals for metric anomalies

## Supporting Files

| File | Contents |
|------|----------|
| `framework.md` | Complete theory: metric types, driver tree process, correlation analysis, investigation rituals, KPI prioritization |
| `template.md` | Copy-paste markdown template for driver tree + lever dashboard spec |
| `examples.md` | Full case studies: Spotify, LinkedIn Sales Navigator, MalwareBytes, Caffeine, Slack, Facebook |

## Process

### Step 1: Define Outcome Metrics

If an argument is provided, use it as the product/metric context. Otherwise ask:

1. **What product or business are you building metrics for?**
2. **What are your outcome metrics?** Guide with standard categories:

| Category | Typical Metrics |
|----------|----------------|
| Monetization | Revenue, MRR, ARR, margin |
| Acquisition | New users/customers per period |
| Retention | Active users, churn rate, DAU/MAU |
| Engagement | Session frequency, actions per session |

If working within the LAFA project, suggest LAFA-specific outcomes (fleet utilization, revenue per vehicle, driver retention, etc.).

### Step 2: Build the Driver Tree

Read `framework.md` for the full theory — Layer 1 standard formulas and Layer 2+ company-specific decomposition.

For each outcome metric, decompose layer by layer:
- **Layer 1:** Use standard breakdown formulas (Monetization = Paying Users x ARPU, etc.)
- **Layer 2+:** Company-specific. Keep breaking down until each leaf is actionable.

**Actionability test:** Can a team brainstorm concrete initiatives to improve this metric?

Guide the user through each branch:
- What drives this number up?
- What drives it down?
- Can we break this into sub-components?
- Is this actionable yet, or do we need to go deeper?

Add segmentation where it increases actionability (geography, platform, persona, plan type, cohort).

### Step 3: Identify KPIs via Correlation Analysis

Read `framework.md` for the correlation analysis process and three common problems.

From the full driver tree, identify 3-7 true KPIs — the input metrics with highest influence on outcomes.

Guide hypothesis testing:
1. "If we improved this 20%, would the outcome metric move meaningfully?"
2. Challenge intuitive assumptions (read `examples.md` for LinkedIn and MalwareBytes cases)
3. Flag the three common pitfalls: no clear KPIs, low correlation everywhere, correlation without causation

### Step 4: Design the Lever Dashboard

**On the dashboard:** Only outcome metrics + KPIs.
**Off the dashboard:** All other input metrics (available for drill-down investigation, not on main view).

See `template.md` for the dashboard wireframe layout.

### Step 5: Define Investigation Rituals

Read `framework.md` for the two difference types (time differences and segment differences) and the four-cause investigation checklist.

Set up cadence:
- Weekly: Review dashboard, note anomalies
- Monthly: Investigate significant time/segment differences
- Quarterly: Post-mortem — did improving KPIs actually move outcomes?

### Step 6: KPI Prioritization

Help the user set context-adjusted targets using comparables. Read `framework.md` for the seven comparable attributes and adjustment rules.

Data sources: peer network, internal comps, previous efforts.

### Step 7: Generate Document

Use `template.md` to produce the final driver tree and lever dashboard spec. Ask the user where to save, then write the file.

## Key Maxim

> "What's measured gets managed... but what's managed gets measured."

The metrics on your dashboard reflect your understanding of what matters. Too high-level means you don't understand your levers. Too many means you don't know what to prioritize. The lever dashboard forces clarity.
