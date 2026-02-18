# 4D Roadmaps: Strategic Prioritization Beyond RICE
> Reforge Program | Based on experiences from LinkedIn, Patreon, Airbnb, Slack, Figma, Zynga

## Source

| Type | Title | Platform |
|------|-------|----------|
| Course | Mastering Product Management - 4D Roadmaps | Reforge |

**Contributors:** Sachin Rekhi (LinkedIn), Helen Sims (Airbnb/Reforge), Adam Fishman (Patreon), Thomas Tungusz (Redpoint Ventures), Shaun Clowes (MuleSoft)

---

## Executive Summary

Traditional prioritization frameworks like RICE and voting-based approaches have inherent biases that systematically produce low-leverage roadmaps. RICE favors incremental work (high confidence, low effort scores well) while deprioritizing needle-moving initiatives (high effort, lower confidence scores poorly). Voting biases toward "safe" wins because teams psychologically prefer surefire successes over risky bets.

**4D Roadmapping** solves this by forcing brainstorming through four lenses—Strategy, Vision, Customer, and Business—then constraining all initiatives to those that move specific target KPIs. This creates focus (all work ladders to few objectives), enables needle-moving work (strategy/vision lenses force consideration of longer-term initiatives), and generates clear narratives for leadership buy-in.

The key insight is that each lens has unique strengths and blind spots. Strategy and Vision produce needle-moving but slow-to-implement work. Customer and Business produce immediate but incremental wins. Great roadmaps balance across all four, weighted by company stage.

---

## Chapter 1: Why RICE and Voting Fail

### Definition: What Is a Roadmap?

**Roadmap:** Your plan for what initiatives you'll work on over a period of time (typically 3-12 months).

**Not a roadmap:** Product strategy or vision (how you win in the market / how your product makes the world better).

### The Two Traditional Approaches

**Voting-Based Prioritization:**

1. Brainstorm initial list of initiatives
2. Assign cost to each (effort in person-weeks → dollar equivalent)
3. Give each team member a "cash allowance" (capacity budget)
4. Team "buys" initiatives with their allowance
5. Most-bought initiatives get prioritized

**RICE Scoring:**

| Factor | Definition | Scale |
|--------|------------|-------|
| **R**each | Users affected | Total count |
| **I**mpact | Depth of value created | 0.25 (minimal) to 3 (massive) |
| **C**onfidence | Belief in estimates | 50% to 100% |
| **E**ffort | Implementation time | Person-weeks |

**Formula:** Score = (Reach × Impact × Confidence) / Effort

### Why These Approaches Seem Attractive

| Benefit | How It Helps |
|---------|--------------|
| External calibration | Not relying on single person's intuition |
| Defensible decisions | Process-based rationale reduces pushback |
| Apparent objectivity | RICE uses quantifiable factors |

### The Three Failure Modes

**Failure 1: Incrementalism Bias → No Needle-Moving Work**

| Initiative Type | Confidence | Effort | RICE Outcome |
|----------------|------------|--------|--------------|
| Incremental | High (sure win) | Low | Scores HIGH |
| Needle-moving | Lower (bigger bet) | High | Scores LOW |

> "Teams tend to heavily bias towards the surefire wins in voting, because they feel like safer successes. The problem is, safe successes aren't usually as needle-moving."
> — Sachin Rekhi

**Failure 2: Lack of Focus → Scattered Effort**

RICE/voting evaluate initiatives individually → prioritized list may not work toward same objective → effort scattered across multiple goals.

**The Peanut Butter Manifesto (Yahoo, 2006):**

> "I've heard our strategy described as spreading peanut butter...a thin layer of investment spread across everything we do, and thus we focus on nothing in particular. I hate peanut butter. We all should."
> — Brad Garlinghouse, Yahoo SVP

**Failure 3: No Strategic Connection → Hard to Get Buy-In**

Leadership wants to understand high-level objectives before digging into initiatives. When initiatives don't ladder up to distinct objectives, rationale becomes unclear.

> "Product leaders often complain that RICE and voting-based roadmaps lack a clear tie to product strategy or vision."
> — Sachin Rekhi

### Case Study: Patreon's Pricing Overhaul

**Context:** 2019, Patreon considering complete pricing model restructure (fixed 5% → tiered 5%/8%/12%).

**Under Voting/RICE:**
- High effort (complete product repackaging + new features)
- Low confidence (unquantified, uncertain return)
- Would score poorly and be deprioritized

**Actual Outcome:**
- Doubled margins
- No impact to acquisition or retention
- A needle-moving win that traditional frameworks would have killed

---

## Chapter 2: The 4D Roadmapping Framework

### Core Definition

**4D Roadmapping:** A process that:
1. Brainstorms initiatives from four different lenses (each with unique strengths/weaknesses)
2. Constrains and prioritizes to only initiatives that improve specific KPIs

### The Four Lenses

| Lens | Focus | Tends to Produce |
|------|-------|------------------|
| **Strategy** | Furthering product along strategic dimensions | Longer-term, needle-moving work |
| **Vision** | Getting closer to your vision narrative | Longer-term, needle-moving work |
| **Customer** | What users have explicitly requested | Immediate, incremental wins |
| **Business** | What improves critical input metrics | Immediate, incremental wins |

### How 4D Creates Leverage

**Leverage 1: Needle-Moving Work**

Forces explicit brainstorming from strategy/vision lenses → these initiatives would be deprioritized by RICE due to high effort + lower confidence.

**Leverage 2: Focus**

Constrains ideas at two levels:
1. All brainstormed objectives must improve target KPIs
2. All implemented initiatives must serve those objectives

**Leverage 3: Leadership Buy-In**

Every initiative → part of broader objective → ladders to specific KPIs = clear, focused narrative.

### 4D vs. Traditional Approaches

| Dimension | RICE/Voting | 4D Roadmapping |
|-----------|-------------|----------------|
| Brainstorm direction | Bottom-up (all ideas welcome) | Top-down (constrained to target KPIs) |
| Lens consideration | Single (impact/effort) | Four balanced lenses |
| Focus mechanism | None (individual initiative scoring) | Objective-level prioritization first |
| Needle-moving bias | Against (high effort penalized) | For (strategy/vision lenses required) |

---

## Chapter 3: The Four Lenses Deep Dive

> "You have to balance your product work. You have to keep the lights on, but also make sure you're keeping the lights on for something big."
> — Helen Sims, former Product Lead at Airbnb

### Lens 1: Strategy

**What It Is:** Furthering your product along its six strategic dimensions:

1. Target audience
2. Problem you're solving
3. Value proposition
4. Strategic differentiation
5. Channel strategy
6. Monetization strategy

**Benefits:**
- Objectives tend to be needle-moving
- Creates major advances in product design/functionality

**Risk of Over-Indexing:**
Users don't feel heard → strategic initiatives take time, clearing roadmap of quick user requests.

**Over-Indexing Signal:**
Steady, unanticipated decline in metrics (retention drops because feedback ignored).

**Case Study: LinkedIn Sales Navigator ML Recommendations**

| Aspect | Detail |
|--------|--------|
| Sub-value proposition | "Target the right buyer" |
| Strategic objective | ML-based lead recommendations |
| Implementation | Multi-month, multiple iterations |
| v1 Result | Somewhat relevant leads |
| Final Result | Users regularly getting value from recommendations |

**Lesson:** Without explicit strategy lens, incremental pressure would have crowded out this work.

**Case Study: Evernote's Strategic Over-Index**

| Phase | What Happened |
|-------|---------------|
| Early success | 10M users, profitable in 3 years |
| Strategy push | Launched Peek, Hello, Food apps |
| Ignored | Customer complaints about buggy core product |
| Result | Viral complaints, high churn, cash-flow negative by 2016 |

**Lesson:** Strategy lens must be balanced with customer/business lenses.

### Lens 2: Vision

**What It Is:** Developing product closer to your vision narrative.

**Benefits:**
- Forces investment in groundwork for long-term vision
- Prevents avoiding necessary but non-immediate-ROI work

**Risk of Over-Indexing:**
Underinvestment in existing core product → current requests ignored.

**Over-Indexing Signal:**
Significant investment in new initiatives despite core product having significant room to improve.

**Case Study: Netflix Streaming Investment**

| Context | Decision |
|---------|----------|
| 2007 state | Primarily DVD business, just became cash-flow positive |
| Investment | Build streaming infrastructure (significant cost, little immediate upside) |
| Rationale | Vision for streaming-based future |
| Outcome | Streaming now dominates, DVD is sunset |

**Case Study: Lambda School's Vision Over-Index**

| Phase | What Happened |
|-------|---------------|
| Core vision | Revolutionize education via income-share agreements |
| Expansion | New fields (UX design), new geographies (Africa, UK, EU) |
| Problem | Still figuring out sustainable model for core US coding programs |
| Result | Quality complaints, job placement lawsuits, consecutive layoffs (2020, 2021) |

**Lesson:** Vision lens expansion before core is solid creates existential risk.

### Lens 3: Customer

**What It Is:** Solving problems users have explicitly surfaced through feedback.

**Benefits:**
- Immediate engagement wins
- Incorporates unanticipated needs
- Users feel heard

**Risks of Over-Indexing (3 major risks):**

| Risk | Mechanism |
|------|-----------|
| **Lack of differentiation** | Customers don't push for unique selling proposition improvements |
| **Power user bias** | Vocal users aren't representative; over-serving them harms majority |
| **Overly complex product** | Niche requests dilute experience, hurt monetization |

> "Customers rarely push vendors to further their differentiation. By definition, the unique selling proposition doesn't exist elsewhere in the market."
> — Thomas Tungusz, Partner at Redpoint Ventures

> "Shipping features that aren't used leads to users thinking the product is so complex that it isn't for them anymore."
> — Shaun Clowes, SVP of Product Management at MuleSoft

**Over-Indexing Signals:**

1. Steady decline in impact of product work (easy wins depleted)
2. Bloated product with low-adoption features

**Case Study: HubSpot UserVoice Trap**

| Phase | What Happened |
|-------|---------------|
| Approach | Build whatever was highly upvoted on UserVoice |
| Initial result | Good returns |
| Later result | Diminishing returns, eventually working on profile photos (negligible impact) |

**Case Study: Patreon Power User Trap**

| Problem | Large creators threatened to leave unless specific features built |
| Built | Team Accounts feature |
| Result | Extremely low adoption, technical overhead, accumulated tech debt |

### Lens 4: Business

**What It Is:** Improving target KPI's most influential input metrics as quickly as possible.

**Benefits:**
- Immediate, incremental improvements
- Can move metrics without major product changes

**Risk of Over-Indexing:**
Over-invest in short-term incremental work, under-invest in needle-moving work.

**Over-Indexing Signals:**

1. Lack of significant product functionality improvements
2. Features that improve metrics short-term but quickly decline (no underlying value)

**Case Study: Slack Free-to-Paid Conversion**

| Analysis | Finding |
|----------|---------|
| Target KPI | Free-to-paid conversion |
| Driver breakdown | Total users → % aware of paid → % considering → % purchasing |
| Bottleneck identified | Awareness of paid product |
| Business lens initiatives | More emails about paid product, in-product upgrade banner |

**Case Study: Farmville's Business Lens Doom**

| Phase | What Happened |
|-------|---------------|
| Launch | Major hit, mass market appeal |
| Over time | No investment in keeping game updated for evolving tastes |
| Focus | Monetization metrics (social shares, virtual item purchases) |
| Result | Lost user base, game shut down |

**Case Study: LinkedIn Endorsements**

| Intent | Enable finding experts with specific skills |
| Execution | Optimized for engagement, allowed anyone to endorse anyone |
| Short-term | Boosted engagement metrics |
| Long-term | Erased value (couldn't filter for actual experts) |

### Lens Balance Summary

| Lens | Produces | Time Horizon | Balance With |
|------|----------|--------------|--------------|
| Strategy | Needle-moving | Long-term | Customer, Business |
| Vision | Needle-moving | Long-term | Customer |
| Customer | Incremental | Short-term | Strategy, Vision |
| Business | Incremental | Short-term | Strategy, Vision |

---

## Chapter 4: The 4D Process — Step by Step

### Overview

```
Step 1: Align on Target KPIs
       ↓
Step 2: Constrained 4-Lens Brainstorm
       ↓
Step 3: Prioritize Objectives, then Initiatives
       ↓
Output: Focused, Needle-Moving Roadmap
```

### Step 1: Align on Target KPIs

**Input:** KPIs identified in Lever Dashboards module

**Action:** Align with leadership on which KPIs to focus on

**Why This Matters:**

```
Without alignment:        With alignment:
PM direction ───→        PM direction ───→
                              ↑
Leadership wants ──→     Leadership wants ──→

Early: Close enough      Always: Same direction
Later: Major divergence  Result: No late-stage blowup
```

> "Leadership decides what the most important business metrics are, but the PM has to decide what metrics best support them. Missing this alignment step is a recipe for disastrous roadmap building and a lot of re-work."
> — Adam Fishman

### Step 2: Constrained 4-Lens Brainstorm

**What is a Constrained Brainstorm?**

Restrict objective and initiative brainstorming to only those that move your target KPIs.

**Definitions:**

| Term | Definition | Size Test |
|------|------------|-----------|
| **Objective** | High-level goal describing what you hope to accomplish | Can only work on 1-4 per quarter |
| **Initiative** | Smaller task that ladders up to fulfilling an objective | Multiple per objective |

**Objective Quality Tests:**

| Test | Question | If Fails |
|------|----------|----------|
| Not too broad | "Can you tell how product will improve from reading it?" | Too vague |
| Not too narrow | "How many of this magnitude could I do in a quarter?" | Probably an initiative |

> "Objectives should generally be big enough that you can only work on 1-4 per quarter. If it's smaller, it's probably more an initiative than an objective."
> — Sachin Rekhi

**Example: SurveyMonkey**

- **Objective:** Significantly grow organic traffic by optimizing the most visited SEO pages
- **Test:** Can tell how product improves (SEO optimization), big enough for a quarter

**Example: Notejoy**

- **Objective:** Increase number of sharing use cases to accelerate viral acquisition
- **Initiative 1:** Zoom integration (meeting notes naturally collaborative)
- **Initiative 2:** Notejoy tasks (assign tasks to users, introducing Notejoy to assignees)

**Note:** Brainstorming isn't purely linear. Sometimes initiative → related initiatives → combine into objective.

---

## Chapter 5: Strategy Lens Brainstorming

### Five Prompts (One per Strategic Dimension)

#### Prompt 1: Target Audience Expansion

**Question:** If serving existing audience well enough, how might I expand my target audience?

**Prerequisites for expansion:**
- High NPS (30-40+ generally considered great, varies by industry)
- High retention (curve flattens at industry-comparable percentage)

**Method:**
1. Look to outer rings of audience bullseye
2. Consider how new audience needs differ
3. Brainstorm how to solve those needs

**Case Study: LinkedIn Sales Navigator Audience Expansion**

| Step | Detail |
|------|--------|
| Check readiness | NPS for Hunters at 50 → ready to expand |
| Bullseye rings | 1) B2B hunters tech/finance >$100k ACV → 2) All B2B hunters >$100k ACV → 3) All B2B sales pros >$100k ACV |
| Current ring | Ring 2 (all B2B hunters) |
| Next expansion | Sales professionals = add account managers (farmers) |
| Need difference | Account managers use multi-threading (connect with multiple people per company) |
| **Objective** | Facilitate multi-threaded sales |
| **Initiative** | Lead recommendations for multi-threading |

#### Prompt 2: Value Proposition Fulfillment

**Question:** How can we better fulfill our value proposition?

**Under-Delivery Indicators:**

| Indicator | What It Means |
|-----------|---------------|
| Low feature engagement | Features supporting sub-value prop aren't used |
| Lack of NPS mentions | Sub-value prop not appearing in what users like most |

**Fix Options:**
1. Improve existing related features
2. Implement new features for same sub-value prop

**Case Study: Figma Branching**

| Sub-value prop | "Brainstorm ideas together" |
| Complaint | Couldn't merge edits from separate files |
| **Objective** | Implement branching functionality (like code management) |

#### Prompt 3: Strategic Differentiation

**Question:** How can we improve our strategic differentiation?

**Case Study: LinkedIn Sales Navigator Location Data**

| Differentiator | Breadth and accuracy of member profile data |
| Problem | Location was free-text → "San Francisco" / "SF" / "Bay Area" = same place, different strings |
| Impact | Hard for sales pros to find all relevant results |
| **Objective** | Improve standardization of location data |
| **Initiatives** | ML to standardize existing free text; Make location a dropdown |

#### Prompt 4: Channel Strategy Acceleration

**Question:** How can we accelerate our channel strategy?

Use product-channel fit patterns from Strategy module as thought starters.

**Case Study: Figma Pricing Restructure**

| Channel | Virality |
| Fit requirement | Quick time-to-value, frictionless invites |
| Old pricing | Free plan = limited editors, unlimited files/projects |
| Problem | Limited editors = friction in invite process |
| **Objective** | Revamp pricing plan |
| New pricing | Free plan = unlimited editors, limited files/projects |

#### Prompt 5: Monetization Potential

**Question:** How might we better realize our monetization potential?

**Two Categories:**

1. **Improve product-model fit** (use patterns from Strategy module)
   - Example: Mailchimp serves SMBs → increase self-servability → make tools extremely intuitive

2. **Develop high-willingness-to-pay features** (competitive benchmarking, user research)
   - Example: Notejoy benchmarked competitors → offline support was common premium feature → potential objective

---

## Chapter 6: Vision, Customer, and Business Lens Brainstorming

### Vision Lens Brainstorming

**Method:** Parse vision narrative for what must happen to achieve it.

**If vision narrative is detailed and opinionated:**
- Each detail = distinct objective or initiative

**Example: Notejoy Collaboration Vision**

| Vision Detail | Maps To |
|---------------|---------|
| Library overviews | Feature objective |
| Weekly newsletters | Feature objective |
| Thumbs ups | Initiative |
| @ mentions | Initiative |

**If vision details are too large:**

Break down into constituent objectives.

**Example: Lyft Autonomous Vehicles**

| Vision element | "Autonomous fixed-route cars" |
| Problem | Too monolithic for single objective |
| Breakdown | 1) Get city approval for trial → 2) Develop traffic sign-recognition in lab → 3) Test-drive in field |

**Note prerequisites:** Test-drive can't be candidate until city approval obtained.

### Customer Lens Brainstorming

**Source:** Feedback System of Record (FSOR)

**Three Filters Required:**

| Issue | Description | Solution |
|-------|-------------|----------|
| **Vocal minority** | Disproportionate requests from non-representative users | Ask: Does this solve problem for majority of user base? |
| **Non-target users** | Users outside intended audience requesting features for their use case | Read last 20-30 requesters, check if in target audience |
| **Suboptimal solutioning** | Users request top-of-mind solution, not best solution | Ask: What problem would this solve? Then find best solution |

**Case Study: LinkedIn Vocal Minority**

| Vocal minority | Salespeople and recruiters (heaviest users) |
| Their requests | Easier/more numerous ways to reach prospects |
| Majority cares about | Not this |
| Risk of over-serving | Normal users flooded with unwanted outreach → disengage |

**Case Study: Loom Non-Target Users**

| All audiences | Customer success, sales, leadership, education, personal |
| Target (per retention curves) | Customer success and sales only |
| Action | Read through who's requesting each feature, filter for target |

**Case Study: ProductBoard Suboptimal Solutioning**

| Requested solution | Way to see board modifications |
| Actual problem | Guard against accidental deletions |
| Better objective | Implement robust data retention (not edit history) |

### Business Lens Brainstorming

**Method:** Find target KPI's KPIs using driver trees + correlation analysis, then focus on improving them.

**Three Common Categories:**

| Category | Examples |
|----------|----------|
| **Conversion optimizations** | Pricing/landing page optimization, onboarding tweaks, checkout flow changes |
| **Awareness improvements** | Marketing emails, in-product notifications |
| **Non-product changes** | Pricing changes, sales efficiency improvements |

**Case Study: Imperfect Foods Conversion Optimization**

| Tests | Onboarding with/without add-on suggestions; Different checkout designs |
| Target | User activation, cart abandonment rate |

**Case Study: LinkedIn Sales Navigator Propensity Model**

| Change | Sales propensity model to prioritize which free members get trial offers |
| Product change? | No (only affects who gets email) |
| Result | Significantly accelerated purchases |

---

## Chapter 7: Prioritizing Objectives and Initiatives

### Two-Stage Prioritization

```
Stage 1: Prioritize Objectives (1-4 for quarter)
       ↓
Stage 2: Prioritize Initiatives within each Objective
```

**Why Two Stages:**
- Prevents initiatives spreading thin across too many objectives
- Creates distinct objectives = clear narrative for buy-in

### Objective-Level Prioritization

**Goal:** Identify 1-4 objectives with highest KPI impact while balancing across lenses.

**Four Guiding Principles:**

#### Principle 1: Prioritize Multi-Lens Objectives

Objectives falling under multiple lenses = work on first (achieve multiple benefits simultaneously).

**Case Study: Notejoy Zoom Integration vs. SEO**

| Option | Lenses | Decision |
|--------|--------|----------|
| Zoom integration | Customer (requested) + Strategy (accelerates virality) | **Prioritized** |
| SEO signup quality | Strategy only | Deprioritized |

#### Principle 2: Prioritize Lenses by Company Stage

| Stage | Description | Primary Lenses | Why |
|-------|-------------|----------------|-----|
| **Pre-PMF** | Launched but no strong resonance | Customer, Strategy | Need to improve product to find fit |
| **Post-PMF Scaling** | Product resonates, fulfilling demand | Business, Strategy | Low-hanging optimizations still exist; focus on acquisition |
| **Post-PMF Maturity** | Need to keep growing | Strategy, Vision | Must think beyond initial audience; business fruit picked |

#### Principle 3: Avoid Over-Indexing on Any Lens

Check over-indexing signals from each lens:

| Lens | Over-Index Signal |
|------|-------------------|
| Strategy | Steady, unanticipated metric decline |
| Vision | Heavy new investment while core has room to improve |
| Customer | Declining impact of work; bloated low-adoption features |
| Business | No significant functionality improvements; features with no lasting value |

#### Principle 4: Consider Diminishing Returns

If objective was already attempted, investing again yields smaller returns (low-hanging fruit already picked).

**Example:** First few onboarding optimizations = major gains. Later optimizations = increasingly more effort for same gains.

### Initiative-Level Prioritization

**Quantitative:** Use RICE or similar scoring

*RICE is OK at this point because you've already constrained to specific objectives from multiple lenses.*

**Qualitative Supplements:**

| Factor | Description | Implication |
|--------|-------------|-------------|
| **Perishable opportunities** | Time-restricted windows | Must launch before date or miss opportunity |
| **Cross-team dependency** | Requires other teams' support | Needs larger impact to offset complications |
| **Sequencing** | Low-impact work enables high-impact work | Prioritize enablers even if individually low-impact |
| **Initiative-specific interest** | Team member enthusiasm | Better execution → prioritize higher |

> "I assume that anything that requires support from another team's roadmap will be more than twice as difficult because...humans."
> — Adam Fishman

**Case Study: Airbnb Host Incentives (Perishable)**

| Context | Biggest spike in travelers/bookings = summer |
| Implication | Host signup incentive program must launch before summer |

**Case Study: Patreon Pricing (Cross-Team)**

| Requirement | Signoff from design, engineering, finance, marketing |
| Decision | Deprioritized until returns clearly worth complications |

**Case Study: Airbnb Flexible Dates (Sequencing)**

| Initiative | Flexible Date search (search "weekend getaway" not specific dates) |
| Prerequisite | Re-engineer search code |
| Prerequisite impact | Very little direct business impact |
| Final feature impact | Much larger impact |

---

## Chapter 8: Case Studies Index

### By Concept

| Company | Concept | Key Learning |
|---------|---------|--------------|
| **Patreon** | Needle-moving vs. incremental | Pricing overhaul would fail RICE, doubled margins |
| **Yahoo** | Lack of focus | Peanut butter manifesto — thin spread = no success |
| **LinkedIn Sales Navigator** | Strategy lens brainstorming | ML recommendations, location standardization, audience expansion |
| **Evernote** | Strategy lens over-index | New apps while ignoring buggy core → churn |
| **Netflix** | Vision lens | Streaming investment despite being DVD cash-flow positive |
| **Lambda School** | Vision lens over-index | Expanded before core sustainable → layoffs |
| **Slack** | Customer lens, Business lens | Markdown (customer), upgrade awareness (business) |
| **HubSpot** | Customer lens over-index | UserVoice trap → diminishing returns |
| **Patreon** | Customer lens over-index | Power user trap → low-adoption features |
| **Figma** | Strategy lens (value prop, channel) | Branching feature, pricing restructure |
| **Farmville/Zynga** | Business lens over-index | Monetization focus, no gameplay updates → died |
| **LinkedIn Endorsements** | Business lens over-index | Engagement optimization killed feature value |
| **Notejoy** | Multi-lens prioritization | Zoom integration (customer + strategy) beat SEO (strategy only) |
| **Airbnb** | Perishable opportunities, Sequencing | Summer timing for host incentives; Flexible dates prerequisite |
| **ProductBoard** | Suboptimal solutioning | Edit history request → actual need was data retention |
| **Loom** | Non-target user filtering | Filter requests by target audience (CS, sales) |

---

## Chapter 9: Framework Integration

### How 4D Roadmaps Connect to Other Deliverables

```
Lever Dashboards (Module 4)
       ↓
Identifies KPIs to target
       ↓
4D Roadmaps (This Module)
       ↓
Creates focused roadmap of objectives + initiatives
       ↓
OKR Loops (Module 6)
       ↓
Tracks execution and learnings
       ↓
Product Specs (Module 7)
       ↓
Guides implementation of initiatives
```

### The Complete 4D Roadmapping System

```
1. Align on Target KPIs (from Lever Dashboards)
       ↓
2. Constrained Brainstorm
   ├── Strategy Lens (5 prompts)
   ├── Vision Lens (parse narrative)
   ├── Customer Lens (FSOR + 3 filters)
   └── Business Lens (KPI's KPIs + 3 categories)
       ↓
3a. Prioritize Objectives (1-4)
    ├── Multi-lens preference
    ├── Company stage weighting
    ├── Over-index avoidance
    └── Diminishing returns check
       ↓
3b. Prioritize Initiatives
    ├── RICE scoring
    └── Qualitative factors
       ↓
4. Timeline Layout (by month/quarter)
       ↓
Output: Focused, needle-moving roadmap with clear narrative
```

---

## Quick Reference: 4D Roadmap Cheat Sheet

### Lens Quick Reference

| Lens | Question | Time Horizon | Risk if Over-Index |
|------|----------|--------------|-------------------|
| Strategy | How do we further strategic dimensions? | Long | Users feel ignored |
| Vision | How do we get closer to vision? | Long | Core product neglected |
| Customer | What have users explicitly requested? | Short | No differentiation, bloat |
| Business | What moves our KPIs fastest? | Short | No lasting value created |

### Strategy Lens Prompts

1. **Audience:** Ready to expand? → Check outer bullseye rings
2. **Value Prop:** Under-delivering? → Check feature engagement, NPS mentions
3. **Differentiation:** How to improve unique attribute?
4. **Channel:** How to accelerate product-channel fit?
5. **Monetization:** How to improve product-model fit?

### Customer Lens Filters

- [ ] Not vocal minority (majority experiences problem)
- [ ] Target user (check last 20-30 requesters)
- [ ] Optimal solution (what's the real problem?)

### Business Lens Categories

- [ ] Conversion optimizations
- [ ] Awareness improvements
- [ ] Non-product changes

### Objective Prioritization Principles

1. Multi-lens objectives first
2. Weight lenses by company stage
3. Check over-indexing signals
4. Consider diminishing returns

### Initiative Qualitative Factors

- [ ] Perishable opportunity?
- [ ] Cross-team dependency?
- [ ] Sequencing enabler?
- [ ] Team enthusiasm?

---

## Action Items

### Immediate (This Week)
- [ ] Document current roadmap: Which lens does each initiative serve?
- [ ] Identify any over-indexing signals in current roadmap
- [ ] List your target KPIs from Lever Dashboards work

### Short-Term (This Month)
- [ ] Align with leadership on target KPIs
- [ ] Run first 4-lens constrained brainstorm
- [ ] Map objectives to lenses, identify multi-lens opportunities

### Strategic (This Quarter)
- [ ] Complete full 4D roadmapping process
- [ ] Present roadmap with clear KPI → objective → initiative narrative
- [ ] Track which lenses you're drawing from each quarter

### Ongoing Practices
- [ ] Per roadmap cycle: Check lens balance
- [ ] Per objective: Verify it ladders to target KPIs
- [ ] Quarterly: Review over-indexing signals
- [ ] Post-launch: Assess whether needle-moving work actually moved the needle

---

## Critical Gaps & Limitations

### What This Module Doesn't Cover

1. **Stakeholder management** — How to handle pushback when deprioritizing popular requests
2. **Resource allocation** — How to size initiatives and balance capacity
3. **Timeline estimation** — How to sequence work realistically
4. **Mid-cycle changes** — How to handle new information that changes priorities
5. **Cross-functional alignment** — How to get eng/design buy-in on 4D approach

### Questions for Future Exploration

- How do you handle when leadership wants different KPIs than your analysis suggests?
- What's the right mix of lenses for different company types (B2B vs. B2C, platform vs. product)?
- How do you balance 4D rigor with speed in fast-moving environments?
- When is RICE actually sufficient (and 4D overkill)?

---

## Key Maxim

> "You have to balance your product work. You have to keep the lights on, but also make sure you're keeping the lights on for something big."
> — Helen Sims

The tragedy of RICE and voting isn't that they're useless—it's that they systematically kill your best work. 4D Roadmapping doesn't replace prioritization judgment; it ensures judgment considers all four dimensions of product value.

**Four lenses. Constrained brainstorm. Balanced portfolio. Clear narrative.**
