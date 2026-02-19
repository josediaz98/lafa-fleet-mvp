# Driver Tree & Lever Dashboard: [Product Name]

> [Date] | [Author]

## Outcome Metrics

| Metric | Current | Target | Comparable Source |
|--------|---------|--------|-------------------|
| [e.g., Weekly Revenue] | [current value] | [target value] | [source of benchmark] |
| [e.g., Weekly Active Users] | [current value] | [target value] | [source of benchmark] |
| [e.g., Weekly Signups] | [current value] | [target value] | [source of benchmark] |

---

## Driver Tree

### [Outcome Metric 1: e.g., Weekly Revenue]

```
[Outcome Metric]
├── [Driver A: e.g., Paying Users]
│   ├── [Sub-driver A1: e.g., New Paying Users]
│   │   ├── [Leaf: e.g., Total users]
│   │   ├── [Leaf: e.g., % conversion to free trial]
│   │   └── [Leaf: e.g., % trial to paid]  ← KPI
│   ├── [Sub-driver A2: e.g., Existing Paying Users]
│   │   ├── [Segment: e.g., Individual plan]
│   │   ├── [Segment: e.g., Family plan]
│   │   └── [Segment: e.g., Student plan]
│   └── [Sub-driver A3: e.g., Churned Users]
│       ├── [Leaf: e.g., Voluntary churn (f(NPS))]
│       └── [Leaf: e.g., Involuntary churn (payment failures)]  ← KPI
└── [Driver B: e.g., ARPU]
    └── [Leaf: e.g., Revenue per plan x % on that plan]
```

### [Outcome Metric 2: e.g., Weekly Active Users]

```
[Outcome Metric]
├── [Newly Activated Users]
│   ├── [Leaf: e.g., % signup → first key action (setup moment)]
│   ├── [Leaf: e.g., % first action → aha moment]
│   └── [Leaf: e.g., % aha → regular habit (habit formation)]  ← KPI
├── [Currently Engaged Users]
│   └── [Leaf: e.g., Key action frequency x intensity]
├── [Newly Dormant Users]
│   └── [Leaf: e.g., f(technical errors, payment errors)]
└── [Resurrected Users]
    └── [Leaf: e.g., Resurrection campaigns x success rate]  ← KPI
```

### [Outcome Metric 3: e.g., Weekly Signups]

```
[Outcome Metric]
├── [Channel 1: e.g., Referral Signups]
│   └── [Leaf: Inviting users x invites/user x % conversion]
├── [Channel 2: e.g., Paid Signups]
│   └── [Leaf: Impressions x CTR x % conversion]
└── [Channel 3: e.g., Organic/SEO Signups]
    └── [Leaf: SEO traffic x % conversion]  ← KPI
```

---

## KPIs (Highest-Impact Inputs)

| KPI | Outcome It Drives | Current | Target | Evidence |
|-----|-------------------|---------|--------|----------|
| [e.g., % trial to paid conversion] | [e.g., Weekly Revenue] | [value] | [value] | [correlation coefficient or qualitative evidence] |
| [e.g., Habit formation rate] | [e.g., WAUs] | [value] | [value] | [evidence] |
| [e.g., Resurrection campaign success rate] | [e.g., WAUs] | [value] | [value] | [evidence] |
| [e.g., Involuntary churn rate] | [e.g., Revenue] | [value] | [value] | [evidence] |
| [e.g., SEO conversion rate] | [e.g., Signups] | [value] | [value] | [evidence] |

---

## Lever Dashboard Spec

### Layout

```
+---------------------------------------------+
|  OUTCOME METRICS (top row)                  |
|  [Metric 1]    [Metric 2]    [Metric 3]    |
+---------------------------------------------+
|  KPIs (main body)                           |
|  +----------+ +----------+ +----------+    |
|  |  KPI 1   | |  KPI 2   | |  KPI 3   |    |
|  |  trend   | |  trend   | |  trend   |    |
|  +----------+ +----------+ +----------+    |
|  +----------+ +----------+                  |
|  |  KPI 4   | |  KPI 5   |                  |
|  |  trend   | |  trend   |                  |
|  +----------+ +----------+                  |
+---------------------------------------------+
|  SEGMENTS (optional drill-down)             |
+---------------------------------------------+
```

### Metrics Included

- **Outcomes:** [list outcome metrics shown on dashboard]
- **KPIs:** [list KPIs shown on dashboard]

### Metrics Excluded (available for drill-down)

- [Input metric 1 — not a KPI, available in detail view]
- [Input metric 2]
- [Input metric 3]
- [...]

---

## Investigation Rituals

### Weekly Review

- [ ] Check each KPI trend line
- [ ] Flag sharp changes (sudden spikes or plummets)
- [ ] Flag gradual drifts from trajectory
- [ ] Note any segment divergences
- [ ] Log investigations needed

### Monthly Deep-Dive

- [ ] Run investigation checklist on flagged metrics:
  - [ ] Product changes: Any releases near metric change date?
  - [ ] Mix shift: Segment by signup source — any source with behavior matching anomaly?
  - [ ] Seasonality: Calculate YoY% — are fluctuations consistent?
  - [ ] Technical failure: Check error logs for integration/pipeline breaks
- [ ] Update KPI targets if context changed

### Quarterly Post-Mortem

- [ ] Did improving KPIs actually move outcomes?
- [ ] Any correlation-without-causation discovered?
- [ ] Update driver tree with learnings
- [ ] Reassess KPI prioritization

---

## KPI Prioritization

| KPI | Current Performance | Comparable Benchmark | Gap | Efforts to Date | Priority |
|-----|--------------------|--------------------|-----|-----------------|----------|
| [KPI name] | [current value] | [benchmark value + source] | [gap size] | [few/many initiatives] | [P0/P1/P2] |
| [KPI name] | [current value] | [benchmark value + source] | [gap size] | [few/many initiatives] | [P0/P1/P2] |

### Comparable Context

| Comparable | Similarity | Difference | Adjustment |
|------------|------------|------------|------------|
| [company/product] | [what matches] | [what differs] | [how target was adjusted] |
| [company/product] | [what matches] | [what differs] | [how target was adjusted] |

---

## Sequencing Recommendation

1. **[KPI to work on first]** — [why: largest gap, few prior efforts, high impact]
2. **[KPI to work on second]** — [why]
3. **[KPI to work on third]** — [why]

### Rationale

[Explain why this sequence optimizes for impact given current performance, comparable gaps, and prior effort levels.]
