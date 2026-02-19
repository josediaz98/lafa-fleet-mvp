# Opportunity Scoring Framework

Complete theoretical framework combining Feature Opportunity Validation (Anand Subramani & Jiaona Zhang, product leaders from Zynga, Gusto, Dropbox, Airbnb, Webflow) with 4D Roadmap prioritization (Sachin Rekhi from LinkedIn, Adam Fishman from Patreon, Helen Sims from Airbnb, Thomas Tunguz from Redpoint Ventures, Shaun Clowes from MuleSoft).

---

## The Three-Component Model

Every feature opportunity must satisfy **all three components** to be worth pursuing:

```
+-------------------------------------------------------------+
|                    VALID OPPORTUNITY                          |
|                                                              |
|   +--------------+   +--------------+   +--------------+    |
|   |  STRATEGIC   | + |    USER      | + |  BUSINESS    |    |
|   |     FIT      |   |    VALUE     |   |    VALUE     |    |
|   +--------------+   +--------------+   +--------------+    |
|                                                              |
|   Aligns with        Solves real       Creates measurable   |
|   company goals      user problem      business impact       |
+-------------------------------------------------------------+
```

| Component | Core Question | Key Indicators |
|-----------|---------------|----------------|
| **Strategic Fit** | Does this align with where we're going? | Ladders to company mission, strategy, product goals, team OKRs |
| **User Value** | Does this solve a real problem? | User interviews validate pain, high severity, poor alternatives |
| **Business Value** | Does this create impact? | Measurable metrics, positive ROI, stakeholder buy-in |

**Key insight:** Missing even one component leads to failure. User value is often the component that trips up teams because leadership usually pre-validates strategic fit and business value, but user problems require direct validation.

---

## Component 1: Strategic Fit

### The Four-Level Ladder

Every opportunity should ladder through all four levels:

```
COMPANY MISSION & VISION
        |
        v
   COMPANY STRATEGY
        |
        v
   PRODUCT STRATEGY
        |
        v
     TEAM GOALS
        |
        v
   THIS OPPORTUNITY
```

| Level | Definition | Example (Lyft) |
|-------|------------|----------------|
| **Mission & Vision** | Why the company exists, long-term aspiration | "Improve people's lives with the world's best transportation" |
| **Company Strategy** | Short-to-medium term objectives | Provide drivers flexible earning, riders affordable alternatives |
| **Product Strategy** | Goals specific to the product | Empower drivers with flexible earning opportunities |
| **Team Goals** | What your team is trying to achieve | Help drivers get more value from the Lyft app |

### Six Strategic Dimensions

Product strategy strengthens one or more of these dimensions:

1. **Target audience** - Who you serve
2. **Problem you're solving** - What pain you address
3. **Value proposition** - Why users choose you
4. **Strategic differentiation** - What makes you unique
5. **Channel strategy** - How users find you
6. **Monetization strategy** - How you capture value

### Strategic Fit Scoring Rubric

| Score | Label | Criteria |
|-------|-------|----------|
| **3** | Strong | Ladders clearly to all 4 levels; directly advances a strategic dimension |
| **2** | Moderate | Connects to strategy but indirectly; supports rather than drives |
| **1** | Weak | Tenuous connection; could be justified post-hoc but wasn't strategy-driven |
| **0** | None | Doesn't connect to strategy; opportunistic or reactive |

---

## Component 2: User Value

### Three Sub-Components

#### Problem Severity
- How painful is this problem? (Low / Medium / High)
- How frequently does the user encounter it?
- What's the impact when it occurs?

#### Current Alternatives
- How do users solve this today?
- How effective are those alternatives?
- What's the switching cost from current alternatives?

#### User Demand Signals
- Have users requested this? (support tickets, NPS comments, interviews)
- Is there behavioral evidence? (workarounds, drop-offs, cancellations)
- Is this for the target audience or a vocal minority?

### The Three Customer Lens Filters

Every customer-sourced opportunity must pass all three filters before being prioritized:

| Filter | Question | How to Check |
|--------|----------|--------------|
| **Not vocal minority** | Does the majority of users experience this problem? | Check if problem is widespread vs. concentrated in a few accounts |
| **Target user** | Are the requesters in your target audience? | Read last 20-30 requesters, verify they match target profile |
| **Optimal solution** | Are users requesting the best solution, or just the top-of-mind one? | Ask "what problem would this solve?" then find the best solution independently |

### User Value Map

User interviews produce a refined User Value Map with three components:

```
+-------------------------------------------------------------+
|                     USER VALUE MAP                           |
|-------------------------------------------------------------|
|  USER PROFILE                                                |
|  - Demographics/firmographics                                |
|  - Product behaviors                                         |
|-------------------------------------------------------------|
|  USER PROBLEM                                                |
|  - Problem description                                       |
|  - Severity (Low/Medium/High)                               |
|  - Current alternatives                                      |
|-------------------------------------------------------------|
|  USER GOALS                                                  |
|  - Qualitative success metrics                              |
|  - Quantitative success metrics                             |
|  - Non-goals                                                |
+-------------------------------------------------------------+
```

### User Value Scoring Rubric

| Score | Label | Criteria |
|-------|-------|----------|
| **3** | Strong | High severity, poor alternatives, strong demand signals from target users |
| **2** | Moderate | Medium severity, some alternatives exist, moderate demand |
| **1** | Weak | Low severity, good alternatives exist, demand from non-target or vocal minority |
| **0** | None | No evidence of user problem; solution looking for a problem |

---

## Component 3: Business Value

### Three Sub-Components

#### Funnel Impact
- Where in the funnel does this impact? (acquisition, activation, retention, monetization, referral)
- What's the magnitude? (% of users affected x severity of improvement)
- Use proxy metrics if no direct data

#### Revenue/Cost Impact
- Direct revenue potential (new revenue, expansion, reduced churn)
- Cost savings (reduced support, operational efficiency)
- Indirect value (data generated, platform extensibility)

#### Measurability
- Can we measure success clearly?
- Do we have instrumentation, or do we need to build it?
- Timeline to see results?

### Proxy Metrics for Pre-Launch Estimation

When a feature isn't built yet, use proxy metrics to estimate business value:

| Type | Definition | When to Use |
|------|------------|-------------|
| **Internal proxies** | Metrics from similar company projects | Same feature/different application OR different feature/similar application |
| **External proxies** | Results from other companies | No internal comparables; match on industry, audience, stage, or business model |

**Internal proxy examples:**
- *Same feature, different application:* Previous homepage redesign metrics applied to current redesign
- *Different feature, similar application:* Blog redesign with purchase modal metrics applied to homepage redesign with purchase modal

**When proxies don't work:**
1. Make explicit assumptions
2. Check with product lead or experienced PMs
3. Clearly state assumptions in product review for alignment

### Business Value Scoring Rubric

| Score | Label | Criteria |
|-------|-------|----------|
| **3** | Strong | Large funnel impact, clear revenue path, easily measurable |
| **2** | Moderate | Moderate impact, indirect revenue, measurable with effort |
| **1** | Weak | Small impact, speculative revenue, hard to measure |
| **0** | None | No clear business case; "nice to have" with no metrics path |

---

## 4D Lens Classification

### The Four Lenses

Traditional prioritization frameworks (RICE, voting) systematically fail because they favor incremental work over needle-moving initiatives. The 4D model forces brainstorming through four different lenses, each with unique strengths and blind spots:

| Lens | Focus | Tends to Produce | Time Horizon |
|------|-------|------------------|--------------|
| **Strategy** | Furthering product along strategic dimensions | Longer-term, needle-moving work | Long |
| **Vision** | Getting closer to vision narrative | Longer-term, needle-moving work | Long |
| **Customer** | Solving user-requested problems | Immediate, incremental wins | Short |
| **Business** | Improving critical input metrics | Immediate, incremental wins | Short |

### Why RICE and Voting Fail

| Failure Mode | Mechanism |
|-------------|-----------|
| **Incrementalism bias** | RICE: High confidence + low effort scores high; needle-moving work (high effort, lower confidence) scores low |
| **Lack of focus** | Individual initiative scoring leads to scattered effort across multiple objectives |
| **No strategic connection** | Hard for leadership to see how initiatives ladder to objectives |

> "Teams tend to heavily bias towards the surefire wins in voting, because they feel like safer successes. The problem is, safe successes aren't usually as needle-moving."
> -- Sachin Rekhi (LinkedIn)

### Multi-Lens Prioritization Principle

**Objectives falling under multiple lenses should be prioritized first** because they achieve multiple benefits simultaneously.

A single-lens approach systematically misses opportunities. Great roadmaps balance across all four lenses, weighted by company stage.

### Strategy Lens Brainstorming Prompts

Five prompts, one per strategic dimension:

1. **Target Audience Expansion** - If serving existing audience well enough (high NPS, flattening retention), how might we expand to the next ring of the audience bullseye?
2. **Value Proposition Fulfillment** - Where are we under-delivering on our value proposition? Check feature engagement and NPS mentions per sub-value prop.
3. **Strategic Differentiation** - How can we improve our unique attribute that competitors can't easily replicate?
4. **Channel Strategy Acceleration** - How can we accelerate product-channel fit? Remove friction in viral loops, improve SEO, reduce time-to-value.
5. **Monetization Potential** - How might we better realize monetization? Improve product-model fit or develop high-willingness-to-pay features.

### Vision Lens Brainstorming

Parse the vision narrative for what must happen to achieve it:
- If vision is detailed and opinionated: each detail maps to a distinct objective or initiative
- If vision details are too large: break down into constituent objectives with clear prerequisites

### Customer Lens Brainstorming

Source opportunities from the Feedback System of Record (FSOR), then apply the three customer lens filters (see User Value section above) to avoid the vocal minority trap, non-target user requests, and suboptimal solutioning.

### Business Lens Brainstorming

Find the target KPI's input KPIs using driver trees and correlation analysis. Three common categories:
- **Conversion optimizations** - pricing pages, onboarding tweaks, checkout flows
- **Awareness improvements** - marketing emails, in-product notifications
- **Non-product changes** - pricing changes, sales efficiency improvements

---

## Company Stage Weighting

Which lenses to prioritize depends on where the company is:

| Stage | Description | Primary Lenses | Why |
|-------|-------------|----------------|-----|
| **Pre-PMF** | Launched but no strong resonance | Customer, Strategy | Need to improve product to find fit |
| **Post-PMF Scaling** | Product resonates, fulfilling demand | Business, Strategy | Low-hanging optimizations exist; focus on acquisition |
| **Post-PMF Maturity** | Need to keep growing | Strategy, Vision | Must think beyond initial audience; business fruit picked |

### Over-Indexing Signals

Each lens has signals that indicate you're relying on it too heavily:

| Lens | Over-Index Signal | What Happens |
|------|-------------------|--------------|
| **Strategy** | Steady, unanticipated metric decline | Users feel ignored; retention drops because feedback is deprioritized |
| **Vision** | Heavy new investment while core has room to improve | Core product neglected; existential risk from expanding too early |
| **Customer** | Declining impact of work; bloated low-adoption features | No differentiation; customers don't push for your unique selling proposition |
| **Business** | No significant functionality improvements; features with no lasting value | Short-term metric bumps that quickly decay; no real user value created |

> "Customers rarely push vendors to further their differentiation. By definition, the unique selling proposition doesn't exist elsewhere in the market."
> -- Thomas Tunguz (Redpoint Ventures)

> "Shipping features that aren't used leads to users thinking the product is so complex that it isn't for them anymore."
> -- Shaun Clowes (MuleSoft)

---

## Portfolio Matrix

Balance investment across three categories:

| Category | Investment Share | Description | Risk/Return |
|----------|----------------|-------------|-------------|
| **Core (70%)** | Majority | Optimize existing product for existing users | Low risk, incremental return |
| **Adjacent (20%)** | Moderate | Expand to adjacent users or problems | Medium risk, medium return |
| **Transformational (10%)** | Small | New markets, new capabilities, new business models | High risk, high return |

---

## Certainty Assessment

What's the appropriate action given current certainty?

| Certainty Level | Problem Clarity | Solution Clarity | Recommended Action |
|----------------|-----------------|------------------|-------------------|
| **Research** | Low | Low | User interviews, market analysis, competitive research |
| **Explore** | High | Low | Prototypes, design sprints, concept testing |
| **Validate** | High | Medium | MVPs, A/B tests, beta programs |
| **Execute** | High | High | Full build, ship it |

---

## Objective-Level Prioritization Principles

When choosing which objectives to pursue (1-4 per quarter):

### Principle 1: Multi-Lens Objectives First
Objectives serving 2+ lenses achieve multiple benefits simultaneously and should be prioritized.

### Principle 2: Weight by Company Stage
Use the company stage weighting table above to determine which lenses to emphasize.

### Principle 3: Avoid Over-Indexing
Check the over-indexing signals for each lens. If signals are present, rebalance.

### Principle 4: Consider Diminishing Returns
If an objective was already attempted, investing again yields smaller returns (low-hanging fruit already picked).

---

## Initiative-Level Prioritization Factors

After objectives are set, prioritize initiatives within each objective using RICE scoring (acceptable at this level since objectives are already constrained) plus qualitative factors:

| Factor | Description | Implication |
|--------|-------------|-------------|
| **Perishable opportunities** | Time-restricted windows (seasonal, competitive) | Must launch before deadline or miss entirely |
| **Cross-team dependency** | Requires other teams' support | Needs larger impact to offset coordination cost |
| **Sequencing** | Low-impact work enables high-impact work | Prioritize enablers even if individually low-impact |
| **Team enthusiasm** | Team member interest and energy | Better execution from motivated teams |

> "I assume that anything that requires support from another team's roadmap will be more than twice as difficult because...humans."
> -- Adam Fishman (Patreon)

---

## Combined Scoring Summary

### Total Score: /9

| Score Range | Recommendation | Meaning |
|-------------|---------------|---------|
| **7-9** | Go | Strong across all three components |
| **5-6** | Conditional Go | Strong in 2 components, moderate in third |
| **3-4** | Needs Research | Promising but significant unknowns |
| **<3 or any 0** | No-Go | Missing a critical component |

### The Fundamental Principle

> A valid opportunity requires three components working together: **Strategic Fit** (aligns with where we're going), **User Value** (solves a real problem), and **Business Value** (creates measurable impact). Missing even one component leads to failure.

> "You have to balance your product work. You have to keep the lights on, but also make sure you're keeping the lights on for something big."
> -- Helen Sims (Airbnb)
