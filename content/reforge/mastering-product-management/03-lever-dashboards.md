# Lever Dashboards: Building Quantitative Product Intuition
> Reforge Program | Based on experiences from LinkedIn, Spotify, MalwareBytes, Slack, Caffeine, Facebook

## Source

| Type | Title | Platform |
|------|-------|----------|
| Course | Mastering Product Management - Lever Dashboards | Reforge |

**Contributors:** Sachin Rekhi (LinkedIn Sales Navigator), Helen Sims (Airbnb/Reforge)

---

## Executive Summary

Most PM dashboards fail to generate leverage because they're either **not actionable** (tracking only high-level metrics without drivers) or **not focused** (cluttered with 50+ metrics that obscure important signals). Even well-constructed dashboards fail when PMs don't investigate metric movements or sequence their work suboptimally.

The solution is a three-part system: **Lever Dashboards** (streamlined views of outcome metrics + KPIs only), **Lever Dashboard Rituals** (regular cadence for investigating metric anomalies), and **Metric Prioritization** (context-adjusted targets using comparable companies).

The core insight from LinkedIn Sales Navigator demonstrates this: they initially believed profile views and InMails drove retention, but dashboard analysis revealed saved leads had the largest impact. Switching focus to saved leads dramatically improved retention faster than any previous effort.

---

## Chapter 1: Why Most Dashboards Fail

### The Two Dashboard Problems

**Problem 1: Dashboard Construction**

| Failure Mode | Symptom | Result |
|--------------|---------|--------|
| **Not Actionable** | Tracks only WAUs, signups, revenue | PM sees symptoms but not causes |
| **Not Focused** | 50+ metrics on single dashboard | Can't separate signal from noise |

**Problem 2: Dashboard Usage**

| Failure Mode | Behavior | Result |
|--------------|----------|--------|
| **Not Investigating** | PM accepts metrics at face value | No learning about cause-effect relationships |
| **Suboptimal Sequencing** | Works on KPIs already performing well | Wastes effort on low-impact areas |

### The LinkedIn Sales Navigator Revelation

**Initial Assumptions:**
- Profile views = important for retention
- InMails sent = important for retention

**Dashboard Discovery:**
- Saved leads showed largest correlation to retention
- Profile views and InMails barely moved retention

**Outcome:** Switched focus to saved leads → retention dramatically improved

**Lesson:** Without proper dashboard analysis, PMs invest in wrong levers while the actual drivers remain hidden.

---

## Chapter 2: The Three Metric Types

### Metric Hierarchy

```
Outcome Metrics (what you ultimately care about)
       ↓
Input Metrics (all drivers that influence outcomes)
       ↓
KPIs (the subset of inputs with highest impact)
```

### Definitions with LinkedIn Examples

| Metric Type | Definition | LinkedIn Sales Navigator Examples |
|-------------|------------|-----------------------------------|
| **Outcome Metrics** | High-level metrics tied to ultimate business/user value | Free trial starts (acquisition), Day X retention/NPS/WAUs (retention), Recurring revenue (monetization) |
| **Input Metrics** | Driver metrics that influence outcomes | Profile views, search queries, saved leads, % traffic to pricing page |
| **KPIs** | Subset of input metrics with highest influence on outcome | Saved leads (discovered to be the true retention KPI) |

### Dashboard Problems Mapped to Metric Types

| Problem | Root Cause |
|---------|------------|
| Not actionable enough | Tracking only outcome metrics |
| Not focused enough | Tracking too many input metrics without identifying KPIs |

### The Lever Dashboard Solution

**Formula:** Lever Dashboard = Outcome Metrics + KPIs only

*Excludes the long cluttered list of less impactful input metrics*

---

## Chapter 3: Driver Trees — Breaking Down Outcome Metrics

### What is a Driver Tree?

A visual map of the relationship between your outcome metric and the layers of input metrics that affect it.

### The Three-Step Process

**Step 1: Identify the Outcome Metric**

| Category | Typical Metric | Spotify Example |
|----------|---------------|-----------------|
| Monetization | Revenue per period | Weekly revenue |
| Acquisition | New users per period | Weekly signups |
| Retention | Active users per period | Weekly active users |

**Step 2: First Layer Breakdown (Standard Patterns)**

| Outcome Type | Standard Breakdown Formula |
|--------------|---------------------------|
| **Monetization** | Paying users × ARPU |
| **Acquisition** | Σ (signups from channel₁ + channel₂ + channel₃...) |
| **Retention** | Newly activated + Currently engaged - Newly dormant + Resurrected |

**Retention User Types Explained:**

| User Type | Definition | Spotify Example |
|-----------|------------|-----------------|
| Activated | Established regular habit with product | Listening 3+ days/week in first 28 days |
| Currently Engaged | Still regularly engaging | Listening at least once/week |
| Dormant | Fell below active threshold | No media listened this week |
| Resurrected | Was dormant, now engaged again | Previously dormant user who returned |

**Step 3: Deep Breakdown Until Actionable**

*Unlike Step 2, this varies by company because each company's actionable levers differ.*

### Spotify Driver Tree Example

**Monetization Branch:**

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
    └── Money per plan × % subscribers on that plan
```

**Acquisition Branch:**

```
Weekly Signups
├── Referral Signups
│   └── Inviting users × invites/user × % conversion
├── Paid Signups
│   └── Impressions × CTR × % conversion
└── SEO Signups
    └── SEO traffic × % conversion
```

**Retention Branch:**

```
Weekly Active Users
├── Newly Activated Users
│   ├── % signup → login (setup moment)
│   ├── % login → play song (aha moment)
│   └── % regular play (habit formation)
├── Currently Engaged Users
│   ├── Key actions: saved songs, favorited artists, shares
│   └── Each action = Frequency × Intensity
├── Newly Dormant Users
│   └── Function of: technical errors, payment errors
└── Resurrected Users
    └── Function of: resurrection emails × success rate
```

### Actionability Test

**Good:** "Improve % conversion to paid" → Can brainstorm initiatives (e.g., increase credit card saves to reduce payment friction)

**Too High-Level:** "Improve revenue" → Not actionable for team

### Segmentation for Further Actionability

| Segment Type | Example Breakdown |
|--------------|-------------------|
| Geography | US vs. Europe |
| Platform | Desktop vs. Mobile |
| Persona | Casual listener vs. Hardcore music fan |

---

## Chapter 4: Correlation Analysis — Identifying True KPIs

### Why Qualitative Understanding Isn't Enough

**The MalwareBytes Case:**

| What They Thought | What Was True |
|-------------------|---------------|
| Number of scans = obvious KPI for Day 90 retention | License key activation = actual KPI |
| Scans create direct value (computer safety) | Scans barely moved retention |

**Result:** Significant investment in scans → retention barely improved. Pivoted to license key activation → retention dramatically improved.

**Lesson:** Without quantitative validation, intuitive assumptions about KPIs are often wrong.

### How Correlation Analysis Works

1. Feed analytics software two data series:
   - Outcome metric over time
   - Hypothesized input metric over same time period

2. Software returns correlation coefficient:
   - Range: -1 to +1
   - Higher absolute value (e.g., .85 or -.85) = stronger relationship
   - Near 0 = weak/no relationship

### Three Common Correlation Analysis Problems

**Problem 1: No Clear KPIs**

| Symptom | Cause | Solution |
|---------|-------|----------|
| All input metrics have similar correlation | Outcome metric too broad | Replace with closely-related, more specific metric |

**LinkedIn Example:** WAUs showed similar correlation to all inputs. Switched to Day 30 retention → clear KPI differences emerged.

**Problem 2: Low Correlation Across All Inputs**

| Symptom | Cause | Solution |
|---------|-------|----------|
| No input metric has strong correlation | True KPI not included in analysis | Expand driver tree, test wider range of inputs |

**MalwareBytes Example:** Initial analysis missed license key activation because it didn't seem retention-relevant. Expanded analysis → discovered the true KPI.

**Problem 3: Correlation Without Causation**

| Symptom | Cause | Solution |
|---------|-------|----------|
| Improving "KPI" doesn't move outcome | Hidden third variable affects both | Regular post-mortems + driver tree investigation |

**Hypothetical Facebook Example:**

```
Observation: Users who join groups → higher long-term retention
Conclusion: Joining groups drives retention
Investment: Get more people to join groups

Hidden Reality:
├── Having 20+ highly relevant, active friends → drives retention
├── Having 20+ highly relevant, active friends → makes users join groups
└── Joining groups alone → does NOT drive retention

Result: No improvement despite investment
```

**Solution Framework:**

1. **Detection:** Quarterly check: "Has KPI movement actually moved outcome?"
2. **Investigation:** Return to driver tree for hidden variables
3. **Prevention:** Build post-mortem into planning process

---

## Chapter 5: Lever Dashboard Rituals

### The Two-Part Ritual

| Component | Purpose |
|-----------|---------|
| Identify when KPIs are moving strangely | Know when to investigate |
| Investigate why KPIs are moving | Build product intuition |

### When to Investigate: Two Difference Types

**General Rule:** Investigate when metric significantly differs from expectation.

**Type 1: Time Differences**

| Pattern | Description | Action |
|---------|-------------|--------|
| Sharp short-term change | Sudden plummet/spike outside normal range | Immediate investigation |
| Gradual long-term change | Metric drifting off historical trajectory | Trend investigation |

**Slack Hypothetical Example (Sharp Change):**
WAUs dramatically dropped during New Year's — investigate if outside expected seasonal decline.

**Caffeine Example (Gradual Change):**
Average watchtime per user had been growing, then gradually declined. Investigation revealed: Drake acquisition campaign brought users with significantly lower watchtime, slowly becoming larger portion of user base.

**Type 2: Segment Differences**

| Pattern | Description | Action |
|---------|-------------|--------|
| Unexpected segment performance | One segment performing significantly different than expected relative to another | Investigate cause of divergence |

**LinkedIn Sales Navigator Example:**
- Expectation: Account executives should have much higher NPS than account managers
- Observation: Account managers suddenly had nearly equal NPS
- Action: Investigate what changed for either segment

### The Metrics Investigation Checklist

Four common causes to check first, with confirmation methods and automation approaches:

**1. Product Changes**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Functionality, price, or policy change | Find releases near date of metric change; compare pre/post performance | Build ongoing release log for live features |

**Uber Example:** New payment method inadvertently disabled cash payments → rides from cash-only users plummeted.

**2. Mix Shift**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| User base composition changed | Segment by signup source; look for source with behavior matching anomaly | Segmented dashboard comparing user cohorts |

**Caffeine Example:** Drake-related users were making up larger portion of user base + had lower engagement = explains average watchtime decline.

**3. Seasonality**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Time-of-year effect on behavior | Calculate YoY % changes; check if fluctuations are consistent | Save YoY% tracking table for seasonal metrics |

**Slack Example:** WAUs down during New Year's, but YoY% change is consistent (5% up every week) → not actually anomalous, just seasonal.

**Anomaly Test:** If YoY% was +5% all weeks except New Year's (-33%), then something besides holidays is causing decline.

**4. Technical Failures**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Integration or technical system broke | Query potential error sources | Save queries for future runs |

**Examples:**
- "Sign up with Facebook" integration fails → Facebook signups zero
- Marketing email pipeline error → emails fail to send

---

## Chapter 6: KPI Prioritization and Comparables

### The Prioritization Problem

**Symptom:** PM works on KPIs already doing well while neglecting underperforming ones.

**Root Cause:** Using generic benchmarks without context adjustment.

**LinkedIn Example:**

| Generic SaaS Benchmark | Enterprise SaaS Reality |
|-----------------------|------------------------|
| Sales Navigator retention looks good | Enterprise SaaS requires much higher retention |
| PM concludes retention is "solved" | Actually deeply behind; should be #1 priority |

### Finding Relevant Comparables

**The Seven Comparable Attributes:**

| Attribute | Description | Impact Example |
|-----------|-------------|----------------|
| **Audience** | Who the product serves | Enterprise vs. Consumer have different dynamics |
| **Product Maturity** | Lifecycle stage | Early products perform worse than mature ones |
| **Price Point** | What product charges | Higher price → more acquisition friction, higher retention |
| **Industry** | Business vertical | Travel vs. restaurant sites have different dynamics |
| **Use Case** | Purpose product serves | Messaging app vs. D2C beverage = incomparable retention |
| **Ambition** | Best-in-class target | Warby Parker benchmarks against top retail/tech, not eyeglass stores |

*Note: Document lists 7 attributes but only names 6 — original course material appears to have numbering error (skips from 3rd to 5th).*

### Data Sources for Comparables

| Source | Description | Benefit |
|--------|-------------|---------|
| **Peer Network** | Ask industry contacts directly | Most reliable if available |
| **Internal Comps** | Other products/features in same company | Already similar on audience, industry |
| **Previous Efforts** | How much KPI improved per effort level | Estimates remaining improvement room |

**LinkedIn Internal Comp Example:**
Address book PM pulled retention data from profiles, homepage, groups, InMail features. Same audience + industry = good comparables for retention targets.

**Previous Efforts Heuristic:**

| Pattern | Implication |
|---------|-------------|
| Few initiatives, each yielded large returns | Significant room to grow |
| Many initiatives, increasingly smaller returns | Less room for improvement |

### Adjusting Targets for Context

Even good comparables differ — adjust targets based on differences.

**LinkedIn Sales Navigator Example:**

| Comparable | Similarity | Difference | Adjustment |
|------------|------------|------------|------------|
| LinkedIn Recruiter | Same business model, price point | Recruiter much more mature | Asked for Recruiter's retention at 1-year mark, not current |

**Adjustment Rules of Thumb:**

| Factor | Higher Target When... | Lower Target When... |
|--------|----------------------|---------------------|
| Audience | Enterprise | SMB |
| Maturity | Mature product | Early-stage product |
| Price Point | Higher price | Lower price |
| Industry | High switching cost (insurance) | Low switching cost (retail) |

**Lemonade vs. Barkbox Example:**
Digital insurance (Lemonade) should have higher retention target than digital retail (Barkbox) due to higher switching costs.

---

## Chapter 7: Case Studies Index

### Case Studies by Concept

| Company | Concept Illustrated | Key Learning |
|---------|---------------------|--------------|
| **LinkedIn Sales Navigator** | KPI discovery, correlation analysis | Saved leads (not profile views) drove retention |
| **LinkedIn Sales Navigator** | Segment differences | Account manager NPS unexpectedly equaled account executives |
| **LinkedIn Sales Navigator** | Context-adjusted comparables | Used Recruiter's 1-year retention, not current |
| **LinkedIn** | Internal comparables | Address book used profiles, homepage, groups as retention benchmarks |
| **Spotify** | Driver trees | Full monetization/acquisition/retention breakdown |
| **MalwareBytes** | Correlation without intuition | License key activation (not scans) drove retention |
| **Caffeine** | Mix shift, gradual change | Drake campaign users lowered average watchtime |
| **Slack** | Seasonality analysis | YoY% method for distinguishing seasonal vs. anomalous |
| **Facebook** | Correlation vs. causation | Group joining correlated with but didn't cause retention |
| **Uber** | Product changes | Payment method change broke cash payments |
| **Warby Parker** | Ambition-based comparables | Benchmarks against best-in-class, not industry average |
| **Workday** | Audience-based adjustment | SMB targets lower than enterprise for retention |
| **Lemonade/Barkbox** | Industry-based adjustment | Insurance retention targets higher than retail |

---

## Chapter 8: Framework Integration

### How Lever Dashboards Connect to Other Deliverables

```
Lever Dashboards
       ↓
Identifies KPIs to prioritize
       ↓
Feeds into 4D Roadmapping (next module)
       ↓
Determines what to build and when
       ↓
OKRs track improvement on selected KPIs
       ↓
Product Specs implement initiatives against KPIs
```

### The Complete Lever Dashboard System

```
Step 1: Build Driver Tree
       ↓
       └→ List of actionable input metrics

Step 2: Run Correlation Analysis
       ↓
       └→ Identify true KPIs (narrow list)

Step 3: Create Lever Dashboard
       └→ Outcome Metrics + KPIs only

Step 4: Establish Rituals
       ├→ Regular review cadence
       ├→ Investigation checklist
       └→ Product intuition building

Step 5: Prioritize KPIs
       ├→ Find relevant comparables
       ├→ Adjust for context
       └→ Sequence work optimally
```

---

## Quick Reference: Lever Dashboard Cheat Sheet

### Driver Tree Breakdown Templates

**Monetization:**
```
Revenue = Paying Users × ARPU
```

**Acquisition:**
```
New Users = Σ(Signups per Channel)
Per Channel = Traffic × Conversion Rate
```

**Retention:**
```
Active Users = Activated + Engaged - Dormant + Resurrected
```

### Correlation Analysis Decision Tree

```
Run correlation analysis
       ↓
┌──────┼──────┐
↓      ↓      ↓
Similar   Low    Clear
corr.    corr.   KPIs
across   across    ↓
all      all    Proceed
  ↓        ↓
Change   Expand
outcome  driver
metric   tree
```

### Investigation Checklist (Quick Reference)

| Cause | First Check |
|-------|-------------|
| Product Change | Recent releases near metric change date |
| Mix Shift | Segment by signup source |
| Seasonality | YoY% comparison |
| Technical Failure | Query error logs |

### Comparable Selection Checklist

- [ ] Audience match (enterprise/SMB/consumer)
- [ ] Maturity match (early/growth/mature)
- [ ] Price point match
- [ ] Industry match
- [ ] Use case match
- [ ] Ambition match
- [ ] Adjustments documented for any differences

---

## Action Items

### Immediate (This Week)
- [ ] Audit current dashboards: Are they tracking only outcomes, or do they include actionable inputs?
- [ ] Count metrics on primary dashboard — if >10, likely too cluttered
- [ ] Identify one outcome metric to build a driver tree for

### Short-Term (This Month)
- [ ] Build complete driver tree for primary outcome metric
- [ ] Run correlation analysis to identify true KPIs
- [ ] Rebuild dashboard as lever dashboard (outcome + KPIs only)
- [ ] Document three internal comparables for KPI benchmarking

### Strategic (This Quarter)
- [ ] Establish lever dashboard ritual: weekly review cadence
- [ ] Build investigation templates for the four common causes
- [ ] Identify 5+ external comparables with data points
- [ ] Create context-adjusted KPI targets

### Ongoing Practices
- [ ] Weekly: Review lever dashboard, note anomalies
- [ ] Monthly: Investigate any significant time or segment differences
- [ ] Quarterly: Post-mortem — did improving KPIs actually move outcomes?
- [ ] Per initiative: Validate that target KPI is truly causal, not just correlated

---

## Critical Gaps & Limitations

### What This Module Doesn't Cover

1. **Statistical rigor** — How to properly set up correlation analysis (sample size, time periods, confounding variables)
2. **Tool selection** — Which analytics software to use for different analyses
3. **Dashboard design** — Visual design principles for effective lever dashboards
4. **Team alignment** — How to get org buy-in on which KPIs matter
5. **Multi-product complexity** — How to handle lever dashboards across product portfolio

### Questions for Future Exploration

- How do you handle KPIs that conflict with each other?
- What's the right refresh frequency for correlation analysis?
- How do you communicate lever dashboard findings to non-PM stakeholders?
- When should you abandon a KPI that's proven difficult to move?

---

## Key Maxim

> "What's measured gets managed... but what's managed gets measured."

The metrics on your dashboard reflect your understanding of what matters. If they're too high-level → you don't understand your levers. If there are too many → you don't know what to prioritize.

**The lever dashboard forces clarity.**
