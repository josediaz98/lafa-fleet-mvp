# Driver Tree & Lever Dashboard: Case Studies

Real-world examples from Sachin Rekhi (LinkedIn Sales Navigator), Helen Sims (Airbnb), and other product leaders.

---

## Spotify: Full Driver Tree Decomposition

The Spotify driver tree demonstrates complete metric decomposition across all three outcome categories.

### Monetization Branch

```
Weekly Revenue
├── Paying Subscribers
│   ├── New Paying Subscribers
│   │   ├── Total users
│   │   ├── % conversion to free trial
│   │   └── % trial to paid
│   ├── Existing Paying Subscribers
│   │   ├── Individual plan users
│   │   ├── Dual plan users
│   │   ├── Family plan users
│   │   └── Student plan users
│   └── Churned Paying Subscribers
│       ├── Voluntary churn (function of NPS)
│       └── Involuntary churn (payment processing failures)
└── ARPU
    └── Money per plan x % subscribers on that plan
```

### Acquisition Branch

```
Weekly Signups
├── Referral Signups
│   └── Inviting users x invites/user x % conversion
├── Paid Signups
│   └── Impressions x CTR x % conversion
└── SEO Signups
    └── SEO traffic x % conversion
```

### Retention Branch

```
Weekly Active Users
├── Newly Activated Users
│   ├── % signup → login (setup moment)
│   ├── % login → play song (aha moment)
│   └── % regular play (habit formation)
├── Currently Engaged Users
│   ├── Key actions: saved songs, favorited artists, shares
│   └── Each action = Frequency x Intensity
├── Newly Dormant Users
│   └── Function of: technical errors, payment errors
└── Resurrected Users
    └── Function of: resurrection emails x success rate
```

### Key Insight

Each leaf node passes the actionability test: a team can brainstorm concrete initiatives for "% trial to paid" (e.g., reduce payment friction, increase credit card saves) but NOT for "improve revenue" (too high-level).

---

## LinkedIn Sales Navigator: KPI Discovery Through Correlation Analysis

This case study — from Sachin Rekhi, who led the product — demonstrates why quantitative validation beats intuition when identifying KPIs.

### The Setup

LinkedIn Sales Navigator needed to identify which input metrics actually drove retention. The team had strong intuitions about what mattered.

### Initial Assumptions

| Metric | Team's Belief | Actual Correlation to Retention |
|--------|--------------|-------------------------------|
| Profile views | High impact (core value prop) | Weak |
| InMails sent | High impact (direct action) | Weak |
| Saved leads | Low/unknown impact | **Strongest correlation** |

### What Happened

The team ran correlation analysis between each input metric and their retention outcome metric. The results contradicted their intuition:

- **Saved leads** had the largest correlation to retention
- **Profile views** and **InMails** barely moved retention

### The Pivot

Switched product focus to saved leads. Retention dramatically improved — faster than any previous effort.

### Lesson

Without proper dashboard analysis, PMs invest in wrong levers while the actual drivers remain hidden. The team would have continued optimizing profile views and InMails indefinitely without data-driven KPI identification.

### Correlation Analysis Troubleshooting

When LinkedIn first used WAUs as the outcome metric, all inputs showed similar correlation — no clear KPIs emerged. The solution: switch to a more specific outcome metric (Day 30 retention). Clear KPI differences immediately appeared.

### Segment Differences

LinkedIn Sales Navigator also demonstrates segment-based investigation:

- **Expectation:** Account executives should have much higher NPS than account managers (executives are the primary persona)
- **Observation:** Account managers suddenly had nearly equal NPS
- **Action:** Investigate what changed for either segment

This unexpected segment convergence triggered an investigation that revealed important product dynamics.

### Context-Adjusted Comparables

When setting retention targets, the Sales Navigator team needed benchmarks. They used LinkedIn Recruiter as a comparable:

| Comparable | Similarity | Difference | Adjustment |
|------------|------------|------------|------------|
| LinkedIn Recruiter | Same business model, same price point | Recruiter much more mature | Asked for Recruiter's retention at the 1-year mark, not current maturity |

They also used internal comparables — the address book PM pulled retention data from profiles, homepage, groups, and InMail features. Same audience and industry made these strong comparables.

### Previous Efforts Heuristic

The team assessed remaining improvement room:

| Pattern | Implication |
|---------|-------------|
| Few initiatives with large returns | Significant room to grow |
| Many initiatives with increasingly smaller returns | Less room for improvement |

---

## MalwareBytes: When Intuition Fails

This case study shows how the most "obvious" KPI can be completely wrong.

### The Setup

MalwareBytes needed to identify which input metric drove Day 90 retention.

### The Intuition

| What Seemed Obvious | Why It Seemed Obvious |
|---------------------|----------------------|
| Number of scans = the KPI | Scans create direct value (computer safety). More scans = user sees more value = stays longer. |

### The Reality

| Metric | Expected Correlation | Actual Correlation |
|--------|--------------------|--------------------|
| Number of scans | Strong | Weak — barely moved retention |
| License key activation | Unknown/low | **Strong — actual KPI** |

### What Happened

The team invested significantly in increasing scan frequency. Retention barely improved. When they expanded their correlation analysis to include metrics they hadn't initially considered (like license key activation), they found the true driver.

Pivoting to license key activation dramatically improved retention.

### Lesson

This case demonstrates two framework concepts:

1. **Qualitative understanding isn't enough.** The most intuitive metric (scans = direct value) was wrong.
2. **Problem 2 of correlation analysis** (low correlation across all inputs) — the true KPI wasn't in the initial analysis. Solution: expand the driver tree and test a wider range of inputs.

---

## Caffeine: Mix Shift and Gradual Change

The Caffeine streaming platform case demonstrates two concepts: how gradual metric changes can hide their true cause, and how mix shifts create misleading aggregate trends.

### The Observation

Average watchtime per user had been growing steadily, then gradually declined. No sharp drop — just a slow drift downward off the historical trajectory.

### The Investigation

Following the investigation checklist:

1. **Product changes?** No recent releases correlated with the timing.
2. **Mix shift?** Yes — this was the cause.
3. **Seasonality?** YoY% didn't explain it.
4. **Technical failure?** No error spikes.

### The Root Cause

Caffeine ran a Drake acquisition campaign that brought in a large wave of new users. These Drake-related users had significantly lower average watchtime than existing users. As they became a larger portion of the total user base, the blended average declined.

```
Before Campaign:
  Existing users: 45 min avg watchtime (100% of base)
  Blended average: 45 min

After Campaign:
  Existing users: 45 min avg watchtime (70% of base)
  Drake users: 20 min avg watchtime (30% of base)
  Blended average: 37.5 min  ← looks like decline, but existing users unchanged
```

### Key Insight

The gradual nature of the change made it harder to detect than a sharp drop. The metric wasn't declining because existing users watched less — it was declining because the composition of the user base changed. Segmenting by signup source immediately revealed the true picture.

### Lesson

Mix shift is the investigation cause to check when:
- Change is gradual (not sharp)
- No product changes or technical failures explain the timing
- A new user acquisition source recently scaled up

---

## Slack: Seasonality Analysis with YoY% Method

The Slack case demonstrates how to distinguish genuine anomalies from predictable seasonal patterns.

### The Observation

Slack's WAUs dropped dramatically during the New Year's period. The question: is this an anomaly requiring investigation, or expected seasonal behavior?

### The YoY% Method

Calculate year-over-year percentage change for each week:

| Week | This Year WAUs | Last Year WAUs | YoY% Change |
|------|---------------|---------------|-------------|
| Dec 15 | 1,050,000 | 1,000,000 | +5% |
| Dec 22 | 1,050,000 | 1,000,000 | +5% |
| Dec 29 (New Year's) | 735,000 | 700,000 | +5% |
| Jan 5 | 1,050,000 | 1,000,000 | +5% |

### Interpretation

The YoY% change is consistent at +5% every week — including the New Year's dip. This means:
- The absolute drop is large (WAUs fell ~30% in one week)
- But it's **not anomalous** — the same pattern happened last year
- This is seasonal, not a problem to fix

### The Anomaly Test

What would a real anomaly look like?

| Week | YoY% Change | Assessment |
|------|-------------|------------|
| Dec 15 | +5% | Normal |
| Dec 22 | +5% | Normal |
| Dec 29 | **-33%** | **ANOMALY** — this week's decline far exceeds historical pattern |
| Jan 5 | +5% | Normal |

If YoY% was +5% all weeks except New Year's (-33%), then something besides holidays is causing the decline. Investigate immediately.

### Lesson

Never investigate absolute metric movements in isolation. Always compare against the same period in prior years. Seasonality is the third cause on the investigation checklist — and the YoY% method is the fastest way to confirm or rule it out.

---

## Facebook: Correlation Without Causation

This hypothetical case (used in product strategy discussions) illustrates why correlation analysis must be paired with causal reasoning.

### The Observation

Data showed that users who join Facebook groups have significantly higher long-term retention.

### The Naive Conclusion

```
Observation: Group joiners have higher retention
Conclusion: Joining groups drives retention
Action: Get more users to join groups
Investment: Redesign onboarding to push group discovery
```

### The Hidden Reality

```
Hidden Variable: Having 20+ highly relevant, active friends

Having 20+ active friends → drives retention (true cause)
Having 20+ active friends → makes users join groups (correlated behavior)
Joining groups alone → does NOT drive retention
```

### Why the Investment Failed

Getting users to join groups without addressing the underlying friend network didn't improve retention. The team invested significant resources in group discovery and onboarding changes with no meaningful outcome metric movement.

### The Three-Part Prevention Framework

1. **Detection:** Quarterly check — "Has improving this KPI actually moved the outcome metric?"
2. **Investigation:** Return to the driver tree and look for hidden third variables that could explain both the "KPI" and the outcome
3. **Prevention:** Build post-mortem reviews into the planning process. After each quarter, validate that KPI improvements translated to outcome improvements.

### Lesson

Correlation analysis identifies candidates for KPIs, but causal validation is essential. The strongest correlation coefficient doesn't guarantee causation. Always close the loop: did improving the KPI actually move the outcome?

---

## Uber: Product Change Investigation

### The Observation

Rides from a specific user segment plummeted suddenly (sharp short-term change).

### The Investigation

Following the checklist, the first cause checked was product changes. A new payment method feature had been released near the date of the metric change.

### The Root Cause

The new payment method inadvertently disabled cash payments. Users who relied on cash-only payments could no longer complete rides.

### Lesson

Product changes are the first cause to check for sharp metric drops. The confirmation method: find releases near the date of the metric change, then compare pre/post performance for affected segments. Automation: maintain an ongoing release log for live features.

---

## Warby Parker: Ambition-Based Comparables

### The Approach

When setting retention and engagement targets, Warby Parker benchmarked against top retail AND tech companies — not just other eyeglass stores.

### Why This Matters

| Benchmark Approach | Result |
|-------------------|--------|
| Compare to other eyeglass retailers | Low bar — may be "best in class" while still underperforming |
| Compare to best-in-class retail + tech | High bar — drives team to true excellence |

### The Ambition Attribute

The sixth comparable attribute is "ambition" — choosing to benchmark against the best in any relevant category, not just direct competitors. This is a deliberate choice about what standard to hold yourself to.

---

## Lemonade vs. Barkbox: Industry-Based Target Adjustment

### The Comparison

Both are direct-to-consumer digital businesses, but they operate in fundamentally different industries.

| Company | Industry | Switching Cost | Expected Retention |
|---------|----------|---------------|-------------------|
| Lemonade | Digital insurance | High (policy transfer, coverage gap risk) | Higher target |
| Barkbox | Digital retail (pet products) | Low (cancel anytime, many alternatives) | Lower target |

### Lesson

Even when companies share similar attributes (D2C, digital, subscription), industry switching costs dramatically affect realistic retention targets. Always adjust comparable benchmarks for industry-specific dynamics.

---

## Summary: Case Studies by Concept

| Company | Concept Illustrated | Key Learning |
|---------|---------------------|--------------|
| **Spotify** | Driver trees | Full monetization/acquisition/retention decomposition |
| **LinkedIn Sales Navigator** | KPI discovery via correlation | Saved leads (not profile views) drove retention |
| **LinkedIn Sales Navigator** | Segment differences | Account manager NPS unexpectedly equaled account executives |
| **LinkedIn Sales Navigator** | Context-adjusted comparables | Used Recruiter's 1-year retention, not current |
| **LinkedIn** | Internal comparables | Address book PM used profiles, homepage, groups as benchmarks |
| **MalwareBytes** | Intuition failure in KPI selection | License key activation (not scans) drove retention |
| **Caffeine** | Mix shift + gradual change | Drake campaign users lowered average watchtime |
| **Slack** | Seasonality analysis | YoY% method distinguishes seasonal vs. anomalous |
| **Facebook** | Correlation vs. causation | Group joining correlated with but didn't cause retention |
| **Uber** | Product change investigation | Payment method change broke cash payments |
| **Warby Parker** | Ambition-based comparables | Benchmark against best-in-class, not industry average |
| **Lemonade/Barkbox** | Industry-based target adjustment | Insurance retention targets higher than retail |
