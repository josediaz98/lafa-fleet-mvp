# Lever Dashboards: Building Quantitative Product Intuition

Framework developed by Sachin Rekhi (LinkedIn Sales Navigator) and Helen Sims (Airbnb), with case studies from LinkedIn, Spotify, MalwareBytes, Slack, Caffeine, Facebook, Uber, Warby Parker, and others.

---

## Why Most Dashboards Fail

Most PM dashboards fail to generate leverage because of two categories of problems: **construction** and **usage**.

### Problem 1: Dashboard Construction

| Failure Mode | Symptom | Result |
|--------------|---------|--------|
| **Not Actionable** | Tracks only WAUs, signups, revenue | PM sees symptoms but not causes |
| **Not Focused** | 50+ metrics on single dashboard | Can't separate signal from noise |

### Problem 2: Dashboard Usage

| Failure Mode | Behavior | Result |
|--------------|----------|--------|
| **Not Investigating** | PM accepts metrics at face value | No learning about cause-effect relationships |
| **Suboptimal Sequencing** | Works on KPIs already performing well | Wastes effort on low-impact areas |

---

## The Three Metric Types

### Metric Hierarchy

```
Outcome Metrics (what you ultimately care about)
       |
Input Metrics (all drivers that influence outcomes)
       |
KPIs (the subset of inputs with highest impact)
```

### Definitions

| Metric Type | Definition | Examples (LinkedIn Sales Navigator) |
|-------------|------------|--------------------------------------|
| **Outcome Metrics** | High-level metrics tied to ultimate business/user value | Free trial starts (acquisition), Day X retention/NPS/WAUs (retention), Recurring revenue (monetization) |
| **Input Metrics** | Driver metrics that influence outcomes | Profile views, search queries, saved leads, % traffic to pricing page |
| **KPIs** | Subset of input metrics with highest influence on outcome | Saved leads (discovered to be the true retention KPI) |

### Mapping Dashboard Problems to Metric Types

| Problem | Root Cause |
|---------|------------|
| Not actionable enough | Tracking only outcome metrics |
| Not focused enough | Tracking too many input metrics without identifying KPIs |

### The Lever Dashboard Formula

**Lever Dashboard = Outcome Metrics + KPIs only**

Excludes the long cluttered list of less impactful input metrics.

---

## Building Driver Trees

A driver tree is a visual map of the relationship between your outcome metric and the layers of input metrics that affect it.

### The Three-Step Process

**Step 1: Identify the Outcome Metric**

| Category | Typical Metric |
|----------|---------------|
| Monetization | Revenue per period |
| Acquisition | New users per period |
| Retention | Active users per period |

**Step 2: First Layer Breakdown (Standard Patterns)**

These Layer 1 breakdowns are nearly universal:

| Outcome Type | Standard Breakdown Formula |
|--------------|---------------------------|
| **Monetization** | Paying Users x ARPU |
| **Acquisition** | Sum of (Signups from Channel_1 + Channel_2 + Channel_3...) |
| **Retention** | Newly Activated + Currently Engaged - Newly Dormant + Resurrected |

**Retention User States:**

| User State | Definition | Example (Spotify) |
|------------|------------|-------------------|
| **Activated** | Established regular habit with product | Listening 3+ days/week in first 28 days |
| **Currently Engaged** | Still regularly engaging | Listening at least once/week |
| **Dormant** | Fell below active threshold | No media listened this week |
| **Resurrected** | Was dormant, now engaged again | Previously dormant user who returned |

**Step 3: Deep Breakdown Until Actionable**

Unlike Step 2, deeper layers vary by company because each company's actionable levers differ. Keep breaking down until each leaf node is actionable — meaning a team could brainstorm concrete initiatives to improve it.

### Actionability Test

- **Good:** "Improve % conversion to paid" — Can brainstorm initiatives (e.g., increase credit card saves to reduce payment friction)
- **Too High-Level:** "Improve revenue" — Not actionable for a team

### Segmentation for Further Actionability

| Segment Type | Example Breakdown |
|--------------|-------------------|
| Geography | US vs. Europe |
| Platform | Desktop vs. Mobile |
| Persona | Casual user vs. Power user |
| Plan Type | Free vs. Premium |
| Cohort | New users vs. Mature users |

---

## Correlation Analysis: Identifying True KPIs

### Why Qualitative Understanding Isn't Enough

Intuitive assumptions about which metrics matter are often wrong. Without quantitative validation, teams invest in the wrong levers.

The MalwareBytes team assumed number of scans (direct safety value) would drive Day 90 retention. Correlation analysis revealed license key activation was the actual KPI. Significant investment in scans barely improved retention. Pivoting to license key activation dramatically improved it.

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

At LinkedIn, WAUs showed similar correlation to all inputs. Switching to Day 30 retention revealed clear KPI differences.

**Problem 2: Low Correlation Across All Inputs**

| Symptom | Cause | Solution |
|---------|-------|----------|
| No input metric has strong correlation | True KPI not included in analysis | Expand the driver tree; test wider range of inputs |

MalwareBytes initially missed license key activation because it didn't seem retention-relevant. Expanding the analysis discovered the true KPI.

**Problem 3: Correlation Without Causation**

| Symptom | Cause | Solution |
|---------|-------|----------|
| Improving "KPI" doesn't move outcome | Hidden third variable affects both | Regular post-mortems + driver tree investigation |

Hypothetical Facebook example: Users who join groups show higher long-term retention. But having 20+ highly relevant, active friends drives both group joining AND retention. Joining groups alone does NOT drive retention.

**Prevention framework:**
1. **Detection:** Quarterly check — "Has KPI movement actually moved outcome?"
2. **Investigation:** Return to driver tree for hidden variables
3. **Prevention:** Build post-mortem into planning process

### Correlation Analysis Decision Tree

```
Run correlation analysis
       |
  +---------+---------+
  |         |         |
Similar   Low      Clear
corr.    corr.     KPIs
across   across      |
all      all      Proceed
  |         |
Change   Expand
outcome  driver
metric   tree
```

---

## Lever Dashboard Rituals

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
| **Sharp short-term change** | Sudden plummet/spike outside normal range | Immediate investigation |
| **Gradual long-term change** | Metric drifting off historical trajectory | Trend investigation |

**Type 2: Segment Differences**

| Pattern | Description | Action |
|---------|-------------|--------|
| **Unexpected segment performance** | One segment performing significantly different than expected relative to another | Investigate cause of divergence |

### The Metrics Investigation Checklist

Four common causes to check first:

**1. Product Changes**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Functionality, price, or policy change | Find releases near date of metric change; compare pre/post performance | Build ongoing release log for live features |

Example (Uber): New payment method inadvertently disabled cash payments, causing rides from cash-only users to plummet.

**2. Mix Shift**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| User base composition changed | Segment by signup source; look for source with behavior matching anomaly | Segmented dashboard comparing user cohorts |

Example (Caffeine): Drake-related users were making up a larger portion of the user base and had lower engagement, explaining the decline in average watchtime.

**3. Seasonality**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Time-of-year effect on behavior | Calculate YoY % changes; check if fluctuations are consistent | Save YoY% tracking table for seasonal metrics |

Example (Slack): WAUs down during New Year's, but YoY% change is consistent (+5% every week) — not actually anomalous, just seasonal. If YoY% was +5% all weeks except New Year's (-33%), then something besides holidays is causing the decline.

**4. Technical Failures**

| What It Is | Confirmation Method | Automation |
|------------|---------------------|------------|
| Integration or technical system broke | Query potential error sources | Save queries for future runs |

Examples: "Sign up with Facebook" integration fails (Facebook signups drop to zero). Marketing email pipeline error (emails fail to send).

### Recommended Investigation Cadence

- **Weekly:** Review lever dashboard, note anomalies
- **Monthly:** Investigate significant time/segment differences
- **Quarterly:** Post-mortem — did improving KPIs actually move outcomes?
- **Per initiative:** Validate that target KPI is truly causal, not just correlated

---

## KPI Prioritization and Comparables

### The Prioritization Problem

Using generic benchmarks without context adjustment leads PMs to work on KPIs already doing well while neglecting underperforming ones.

At LinkedIn, Sales Navigator retention looked good against generic SaaS benchmarks. But enterprise SaaS requires much higher retention. The PM concluded retention was "solved" when it should have been the #1 priority.

### The Seven Comparable Attributes

| Attribute | Description | Impact Example |
|-----------|-------------|----------------|
| **Audience** | Who the product serves | Enterprise vs. Consumer have different dynamics |
| **Product Maturity** | Lifecycle stage | Early products perform worse than mature ones |
| **Price Point** | What product charges | Higher price = more acquisition friction, higher retention |
| **Industry** | Business vertical | Travel vs. restaurant sites have different dynamics |
| **Use Case** | Purpose product serves | Messaging app vs. D2C beverage = incomparable retention |
| **Ambition** | Best-in-class target | Warby Parker benchmarks against top retail/tech, not eyeglass stores |

### Data Sources for Comparables

| Source | Description | Benefit |
|--------|-------------|---------|
| **Peer Network** | Ask industry contacts directly | Most reliable if available |
| **Internal Comps** | Other products/features in same company | Already similar on audience, industry |
| **Previous Efforts** | How much KPI improved per effort level | Estimates remaining improvement room |

**Previous Efforts Heuristic:**

| Pattern | Implication |
|---------|-------------|
| Few initiatives, each yielded large returns | Significant room to grow |
| Many initiatives, increasingly smaller returns | Less room for improvement |

### Adjusting Targets for Context

Even good comparables differ. Adjust targets based on differences:

| Factor | Higher Target When... | Lower Target When... |
|--------|----------------------|---------------------|
| Audience | Enterprise | SMB |
| Maturity | Mature product | Early-stage product |
| Price Point | Higher price | Lower price |
| Industry | High switching cost (insurance) | Low switching cost (retail) |

Example: Digital insurance (Lemonade) should have higher retention target than digital retail (Barkbox) due to higher switching costs.

---

## The Complete Lever Dashboard System

```
Step 1: Build Driver Tree
       |
       +-> List of actionable input metrics

Step 2: Run Correlation Analysis
       |
       +-> Identify true KPIs (narrow list)

Step 3: Create Lever Dashboard
       +-> Outcome Metrics + KPIs only

Step 4: Establish Rituals
       |-> Regular review cadence
       |-> Investigation checklist
       +-> Product intuition building

Step 5: Prioritize KPIs
       |-> Find relevant comparables
       |-> Adjust for context
       +-> Sequence work optimally
```

---

## Quick Reference

### Driver Tree Breakdown Templates

**Monetization:**
```
Revenue = Paying Users x ARPU
```

**Acquisition:**
```
New Users = Sum(Signups per Channel)
Per Channel = Traffic x Conversion Rate
```

**Retention:**
```
Active Users = Activated + Engaged - Dormant + Resurrected
```

### Investigation Checklist (Quick Reference)

| Cause | First Check |
|-------|-------------|
| Product Change | Recent releases near metric change date |
| Mix Shift | Segment by signup source |
| Seasonality | YoY% comparison |
| Technical Failure | Query error logs |

### Comparable Selection Checklist

- Audience match (enterprise/SMB/consumer)
- Maturity match (early/growth/mature)
- Price point match
- Industry match
- Use case match
- Ambition match
- Adjustments documented for any differences
