# Feature Prioritization: Collected Insights
> Anand Subramani | VP Product at Path, former Gusto PM | Expert in roadmap and sprint prioritization

## Sources

| Source | Contributors | Context |
|--------|--------------|---------|
| Feature Prioritization Module | Anand Subramani (VP Product, Path) | Roadmap and sprint prioritization frameworks |
| Gusto Case Study | Anand Subramani | Real-world application of prioritization for SMB→mid-market transition |

---

## Executive Summary

Feature prioritization operates at two distinct levels: **roadmap prioritization** (strategic quarterly/annual decisions) and **sprint prioritization** (tactical weekly execution). Mastering both prevents the common failure mode of building features that generate minimal value while wasting resources. The challenge is acute because PMs must make decisions with imperfect information, and even well-prioritized roadmaps rarely execute in perfect order due to dependencies, deadlines, staffing constraints, and scope changes.

Effective roadmap prioritization requires three categories of prerequisite knowledge: company (mission, vision, strategy), customer (pain points from current and prospective users), and team (goals and quantitative targets). Without this foundation, PMs risk local optimization—hitting team goals while harming the broader company. The key insight is that roadmaps should NOT be extensive project lists but rather **small collections of themes** (typically three) that serve as containers for projects. This approach transforms the infinite work of maintaining perfect project rankings into a manageable filtering exercise.

Sprint prioritization bridges the gap between strategic roadmaps and tactical execution. The goal is maintaining a two-sprint pipeline of completed specs while keeping 80% of work aligned with roadmap priorities. PMs must develop rough estimation skills and collaborate closely with engineering managers to navigate the constraints that prevent perfect priority-order execution. The portfolio approach—balancing major initiatives with smaller projects, bug fixes, and vetted new requests—ensures efficient resource utilization without derailing roadmap progress.

---

## 1. The Two Levels of Prioritization

### The Prioritization Challenge

```
┌────────────────────────────────────────────────────────────────────────┐
│                    WHY PRIORITIZATION IS DIFFICULT                      │
├────────────────────────────────────────────────────────────────────────┤
│  1. Imperfect Information    → Can't know which projects provide most  │
│                                 value until after building             │
│                                                                        │
│  2. Execution Reality        → Dream plan ≠ execution reality          │
│                                 (dependencies, constraints emerge)     │
│                                                                        │
│  3. Continuous Change        → New requests, bugs, scope changes       │
│                                 throughout the quarter                 │
└────────────────────────────────────────────────────────────────────────┘
```

### Two Levels Framework

| Level | Focus | Time Horizon | Key Question |
|-------|-------|--------------|--------------|
| **Roadmap** | Strategic decisions about most important work | Quarter to Year | What themes matter most? |
| **Sprint** | Tactical execution and resource efficiency | Weeks | How do we build the pipeline? |

**Roadmap Prioritization:**
- Long enough to make significant progress on strategic themes
- Short enough to have conviction market/customer will still be relevant
- Output: 3 prioritized themes with ranked projects within each

**Sprint Prioritization:**
- Takes roadmap projects and builds execution pipeline
- Ensures efficient resource use across team
- Navigates constraints that prevent perfect priority-order execution

---

## 2. Prerequisites to Roadmap Prioritization

### The Three Categories

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PREREQUISITE CATEGORIES                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│         ┌──────────────┐                                                │
│         │   COMPANY    │  Mission, Vision, Strategy                     │
│         │   (Why)      │  → What's in/out of bounds                     │
│         └──────┬───────┘                                                │
│                │                                                        │
│    ┌───────────┴───────────┐                                            │
│    │                       │                                            │
│    ▼                       ▼                                            │
│ ┌──────────────┐    ┌──────────────┐                                    │
│ │   CUSTOMER   │    │    TEAM      │                                    │
│ │   (Who)      │    │   (How)      │                                    │
│ │              │    │              │                                    │
│ │ Pain points  │    │ Goals &      │                                    │
│ │ from current │    │ quantitative │                                    │
│ │ & prospective│    │ targets      │                                    │
│ └──────────────┘    └──────────────┘                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Company Prerequisites

| Element | Definition | Time Horizon |
|---------|------------|--------------|
| **Mission** | Fundamental purpose not tied to products/services; how company makes a difference | Permanent |
| **Vision** | Clear description of future state if mission succeeds | 10+ years |
| **Strategy** | Approach to achieve vision: target audience, differentiation, go-to-market | 2-5 years |

**Where to find this information:**
- Annual or quarterly strategy/planning docs
- Company all-hands presentations
- Ask manager or product leader

**Test your understanding:** Can you summarize mission, vision, and strategy in sentences a parent or friend outside your industry would understand?

### The Local Optimization Trap

> **Anti-pattern:** PM focused on acquisition dramatically increases top-of-funnel growth, hits their targets, but new users aren't ideal customer profile and churn at high rates. Team success, company failure.

**Without company context:** You can't tell the difference between a great idea and an idea that harms the broader organization.

### Customer Prerequisites

**Goal:** Build intuition for what customers care about—and don't care about.

**Common pitfall:** Only talking to current users because they're easiest to contact → over-focus on segments that already love your product.

| Research Method | Best For | Notes |
|-----------------|----------|-------|
| Customer feedback surveys | Quantitative patterns | Scale across segments |
| Customer interviews | Deep qualitative insight | Include non-users you want |
| Customer advisory boards | Ongoing enterprise feedback | Common in B2B |

**Focus on:** Most painful and relevant problems—these guide feature prioritization.

### Team Prerequisites

Three elements to understand:

1. **Team's Purpose:** How the team supports overall company strategy
2. **Qualitative Goals:** Part of growth model being targeted (retention, engagement, acquisition, monetization)
3. **Quantitative Targets:** Measures indicating success

**Where to find:** Product lead, head of product, roadmaps, product briefs, quarterly planning docs.

---

## 3. Building the Ideas List

### Divergent Thinking Phase

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       IDEA SOURCING MODEL                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐            │
│    │ OTHER TEAMS  │    │  YOUR TEAM   │    │   YOURSELF   │            │
│    │              │    │              │    │              │            │
│    │ Sales        │    │ Design       │    │ Customer     │            │
│    │ Support      │    │ Engineering  │    │ data review  │            │
│    │ Marketing    │    │              │    │              │            │
│    │              │    │ Tech debt    │    │ Deep work    │            │
│    │ Close to     │    │ insights     │    │ reflection   │            │
│    │ customer     │    │              │    │              │            │
│    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘            │
│           │                   │                   │                    │
│           └───────────────────┼───────────────────┘                    │
│                               ▼                                        │
│                    ┌──────────────────────┐                            │
│                    │  AGGREGATE LIST OF   │                            │
│                    │  PROBLEMS TO SOLVE   │                            │
│                    │  (not solutions)     │                            │
│                    └──────────────────────┘                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Principle

> "Your job is not to generate all the ideas. Your job is to find all the good ideas. PMs who try to do it all alone have worse outcomes."
> — Anand Subramani

**Critical:** Document ideas as **problems first**, not solutions. Potential solutions can be included if they emerge, but don't force it.

### Sourcing from Other Teams

**The question to ask:**
> "Given the company strategy and goals, what problems are you excited to solve and why?"

| Do | Don't |
|----|-------|
| Talk to teams close to customer (marketing, sales, support) | Try to talk to everyone |
| Pick ONE person to represent each team | Default to most senior person |
| Set expectations that not every idea will make the roadmap | Ask them to impose constraints (cost, feasibility) |
| Ask how they would prioritize their ideas | Promise to build their suggestions |

**Best representative:** Not necessarily most senior—someone who anchors on specific customer problems.

> **Example of good input:** "I talked to a dozen customers in California and noticed that compliance requirements there are much different than the other states we operate in. We might need to address this if we want to expand our footprint there."

### Sourcing from Your Team

Talk to design and engineering counterparts:
- Surface interesting problems, insights, infrastructure decisions
- Engineering has in-depth view of technical debt

**On tech debt:** Likely not spending most of team capacity on it unless it's deeply impacting velocity or blocking new features. Set expectations, gather input on what's most important.

### Your Own Ideas

**Carve out a few hours of deep work** for reflection independent of what others share.

> **Risk of skipping this:** "PMs who don't do this run the risk of just building the average of what everyone else has asked for, satisfying no one in the end."

Lean on customer data to avoid building only what internal stakeholders want.

### Consolidation

After gathering from all sources:
1. Clean for duplicates
2. Note positive signal where multiple people generated same/similar ideas
3. Ready for convergent phase

---

## 4. The Five-Step Prioritization Process

### Overview

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ FILTER  │───▶│ GROUP   │───▶│  RANK   │───▶│  RANK   │───▶│FINALIZE │
│ OBVIOUS │    │  INTO   │    │ THEMES  │    │  IDEAS  │    │ ROADMAP │
│  NO'S   │    │ THEMES  │    │         │    │ WITHIN  │    │         │
│         │    │         │    │         │    │ THEMES  │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
   ~75%           3-5            Top 3        By impact      By scenario
  removed        themes         ranked        potential
```

### Why Themes, Not Ranked Lists

> "Whenever someone has a new idea, you have to compare it to the hundred other things on the list and do a bunch of ROI estimation every time. You've essentially created infinite work to say yes or no to people."
> — Anand Subramani

**The insight:** Roadmaps are NOT extensive collections of projects. They are a **small collection of themes**. Themes are containers for projects.

> "Maintaining a perfect global set of projects is not worth the complexity. It's better to put those projects into containers so you can say this container matters more than that one."

**Benefit:** Easier to say no to anything not aligned with your top 3 themes.

### Step 1: Filter the Obvious No's

First pass at whittling down by removing anything misaligned with:
- Company goals
- Customer needs
- Team goals

> "This first pass can eliminate a significant proportion of the potential ideas, sometimes as much as 75%."
> — Anand Subramani

### Step 2: Group into Themes

With shorter list, themes should emerge. Examples:

| Theme Type | Examples |
|------------|----------|
| Customer problems | Onboarding friction, payment failures |
| Customer segments | Enterprise needs, SMB needs |
| Metrics | Engagement, retention, acquisition, conversion, monetization |
| Product surfaces | Onboarding, admin features, core workflow |

### Step 3: Rank Themes

Rank based on criticality to customer or business value.

**Process:**
1. Create your ranking
2. Share with manager, product lead, others for input
3. Finalize top 3 themes (or compelling reason for more)
4. Document qualitative explanations AND quantitative indicators for ranking

**Good signs:**
- Themes internally consistent with prerequisites and other teams' understanding
- Themes are generally mutually exclusive (where possible)

**Red flags:**
- Strong disagreement from manager, product lead, head of product
- Questions about assumptions or reasoning
- Something comes up you didn't think about or can't prove with data

### Step 4: Rank Ideas Within Themes

Within your top 3 themes, rank by estimated potential for impact aligned with prerequisites.

For ideas taking more than a roadmap cycle: Focus on creating a feasible milestone for end of cycle.

### Step 5: Finalize the Roadmap

You likely have more ideas than capacity within prioritized themes. Must decide cutoff point.

**Two scenarios determine approach:**

| Scenario | Characterized By | Goal |
|----------|------------------|------|
| **Priority-Driven** | No hard deadlines | Be slightly over-subscribed |
| **Commitment-Driven** | Hard deadlines (PR announcements, regulations, enterprise commitments) | Be under-subscribed |

---

## 5. Priority-Driven vs. Commitment-Driven Planning

### Priority-Driven Scenario

**Goal:** Be over-subscribed by ~1/3

**Rationale:** Instead of spending too much time estimating in an evolving world, set priorities with enough work to continue if team finishes early.

**Example calculation:**
- Team: 10 people × 3 months × 2 sprints/month = 60 sprints capacity
- Plan for: ~80 sprints worth of work (60 × 1.33)

**Estimation effort:** Typically half day to full day working with engineering managers to sense-check and estimate.

### Commitment-Driven Scenario

**Goal:** Be under-subscribed by ~30%

**Rationale:** Buffer to handle emerging issues while delivering on time. More waterfall-like—reverse-engineer from specific launch date.

> "In the commitment paradigm, you want high confidence that you do not have enough work to do. This is different than the priority paradigm, where you want low confidence that you have too much work."
> — Anand Subramani

**Key differences:**
- Dependencies and constraints much more critical
- Pull forward more opportunity validation and design work
- Need to understand sprints and staffing for any must-ship project

### Buffer Adjustment Factors

Adjust the 30% buffer by 5-10% based on:

| Factor | More Buffer (+) | Less Buffer (-) |
|--------|-----------------|-----------------|
| **Deadline Criticality** | Miss = miss revenue forecast | Internal deadline (PR announcement) |
| **Roadmap Complexity** | Massive team, many interdependencies | Few dependencies |
| **Uncertainty** | New kinds of work, skilling up | Familiar, repeated work patterns |

---

## 6. Gusto Case Study: SMB to Mid-Market Transition

### Context

**2015 Situation:**
- Gusto served very small businesses (3-5 employees)
- Business model: charge per seat → low revenue per customer
- Low LTV → couldn't spend much on acquisition → growth ceiling

**Mission:** Help businesses everywhere put people first
**Vision:** Companies can easily pay employees, obtain workers' comp, set up health benefits online
**Strategy:** Centralized payroll, compliance, and benefits in single platform

### Strategic Decision

**Goal:** Quadruple average business size from 3-5 to 10-20 employees

**Expected outcomes:**
- 4× revenue and LTV per customer
- 4× available CAC budget (if acquisition costs unchanged)
- Unlock new growth channels

### Building the Ideas List

| Source | Method | Output |
|--------|--------|--------|
| Sales | Implemented tagging for why large customers didn't buy; shadowed calls; interviewed reps | Reasons larger customers reject |
| Support | Analyzed tickets for different problems from larger customers | Unmet needs at scale |
| Customers | On-site interviews with local companies | Direct input on needs |

### Filtering Example

> Support receives email from 200-employee company complaining Gusto runs extremely slowly.
> **Filter:** Ruled out—Gusto focused on 20-person companies, not 200-person companies.

### Two Themes Emerged

**Theme 1: HR Functionality**

Based on insight about predictable problems as companies grow:

```
┌───────────────────────────────────────────────────────────────────────┐
│              COMPANY GROWTH → PREDICTABLE PROBLEMS                    │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   1st Employee  ───▶  Payroll Problem                                 │
│                       (taxes, compliance, regulations)                │
│                                                                       │
│   5-10 People   ───▶  Benefits Problem                                │
│                       (health, dental insurance)                      │
│                                                                       │
│   10+ People    ───▶  HR Problems                                     │
│                       • Employee directory                            │
│                       • Onboarding dashboard                          │
│                       • Performance reviews                           │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

**Insight:** Gusto solved payroll and benefits but NOT HR pain points. Gap = opportunity.

**Theme 2: Scaling**

Target customers manage 2-4× as many employees → must anticipate where product breaks.

> **Example:** 60 seconds to run payroll for 5 employees → 4-5 minutes for 20 employees. One minute tolerable, five minutes causes churn.

### Prioritizing Within Themes

**Acquisition strategy question:** How to get 20-person companies?

| Segment | Definition | Feasibility |
|---------|------------|-------------|
| **Switchers** | Get companies to switch to Gusto | Low—payroll systems are sticky |
| **Growers** | Grow with existing customers | High—retain and expand |

**Decision:** Focus on Growers.

**Implication for HR features:**
- Growers' most acute problem = **onboarding** (adding new employees quickly)
- If they can't add employees, downstream HR capabilities don't matter yet

> "We thought a lot about where Gusto starts. We wanted Gusto to take over the minute you decide to hire someone."
> — Anand Subramani

**Prioritized features:**
1. Making offers (formal offer through Gusto tied to payroll)
2. Employee onboarding (collecting proof of work authorization)

**For Scaling:** Focused on payroll—core product, becomes much slower with more employees.

### Finalizing

- Gusto operated priority-driven (not commitment-driven)
- Limited time sizing work
- Over-planned by ~1/3 of team capacity

---

## 7. Sprint-Level Prioritization

### The Bridge Problem

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PM WORK IS UPSTREAM                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    PM Work                              Eng/Design Work                 │
│    ────────                             ───────────────                 │
│                                                                         │
│    Opportunity    ──▶    Design    ──▶    Development                  │
│    Validation                                                           │
│                                                                         │
│    ▲                                                                    │
│    │                                                                    │
│    └─── Don't keep them waiting!                                        │
│         Build and maintain a PIPELINE                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Goal:** Prioritize work sprint after sprint to make progress on roadmap while ensuring efficient resource use.

### Five Factors That Prevent Perfect Priority-Order Execution

| Factor | Description | Example |
|--------|-------------|---------|
| **Dependencies** | High-priority problem requires foundational project first | Feature needs API refactor |
| **Deadlines** | External commitments regardless of priority | Customer promise, regulations |
| **Staffing** | Same individual needed for multiple projects; onboarding needs | Specialist bottleneck |
| **Scope** | Scope changes during development | Feature could be expanded endlessly |
| **New Requests** | Ideas that emerge outside roadmap planning | Critical bug, customer escalation |

### The Scope Change Problem

Particularly problematic when PM undertakes sprint planning without EM collaboration.

**EM must be involved for:**
- Clarity for engineering on scope and rationale
- Estimation of staffing and timelines
- Surfacing technical implementation issues and trade-offs

### Success Indicators

You're doing sprint prioritization effectively if:

| Indicator | Target |
|-----------|--------|
| Spec queue | Completed specs for next 2 sprints |
| Validation queue | Projects ready for opportunity validation and design |
| Roadmap alignment | ~80% from roadmap, ~20% other (bugs, new requests) |

---

## 8. Building the Sprint Pipeline

### The Queue Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       SPRINT PIPELINE                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Roadmap Ideas                                                         │
│   (Problems)                                                            │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Opportunity Validation  ───▶  Design  ───▶  PRD               │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    COMPLETED SPECS QUEUE                        │   │
│   │            (Ready for development - 2 sprints ahead)            │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │              Estimation with EM/Tech Lead                       │   │
│   │         (How long? How many people? Dependencies?)              │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    SPRINT EXECUTION                             │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### PRD Alignment Requirements

The PRD serves as contract that team agrees to fulfill:

- Target customer segment
- Problems you are trying to solve
- What is explicitly out of scope
- Acceptable criteria for final output
- Goals and potential trade-offs (timely delivery vs. risk of unmet expectations)

### Estimation Collaboration

> "It's important for an early-career PM to build rough estimation skills. They should know how difficult a project is for engineering and if it will be completed in hours, days, weeks, or a month."
> — Anand Subramani

**Questions to prompt your EM:**

1. What sprint do we need to start developing this to deliver on time?
2. Do we have bandwidth to start this project this sprint?
3. Does the team have what they need to start? (Well-scoped spec from discovery/design)
4. Who are the right people to work on this?
5. Are there any dependencies?

### T-Shirt Sizing

| Size | Time for Single Engineer | Notes |
|------|--------------------------|-------|
| **Small** | Few days or less | Quick wins, bug fixes |
| **Medium** | Entire sprint | Standard feature work |
| **Large** | Multiple sprints | Major initiatives |

**Critical requirements:**
- Internal consistency (medium never takes longer than large)
- Meaningful differences between sizes
- Learn your team/company's specific definitions

---

## 9. Managing the Portfolio

### Three Sources for Smaller Projects

When major initiatives can't fill all capacity due to constraints:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   SMALLER PROJECT SOURCES                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│   │    ROADMAP       │  │      BUGS        │  │   NEW REQUESTS   │     │
│   │    (Lower        │  │                  │  │                  │     │
│   │    Priority)     │  │   Vetted &       │  │   Vetted &       │     │
│   │                  │  │   Rated          │  │   Estimated      │     │
│   │   Items to pull  │  │                  │  │                  │     │
│   │   up due to:     │  │   Low/Med/High   │  │   Aligned with   │     │
│   │   • Dependencies │  │   Severity       │  │   themes         │     │
│   │   • Staffing     │  │                  │  │                  │     │
│   │   • Time fit     │  │                  │  │                  │     │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Bug Management

**Step 1: Vetting**
- Confirm it's really a bug (not user error, support request, or non-reproducible)
- Determine if worth fixing

**Who vets:** Depends on organization size
- Small company: PM may do it
- Larger organization: Product ops

> "PMs should delegate this work if they can. Then they can focus on work more central to their role and potentially provide PM work to others who are seeking those opportunities."
> — Anand Subramani

**Step 2: Severity Rating** (with EM/tech lead)

| Severity | Criteria |
|----------|----------|
| **High** | Impacts large % of users, OR prevents core feature access, OR prevents transactions |
| **Medium** | Impacts subset of users, degraded but usable experience |
| **Low** | Minor issues, workarounds available |

**Cadence:** Review bug list weekly.

### New Requests

**The trap:**

> "PMs who reactively say yes to everything can drown in new requests. This pulls a huge amount of focus, and you end up finishing the quarter with a half-done roadmap."
> — Anand Subramani

**Process:**
1. Keep running list
2. Vet against thematic priorities
3. Regularly review with EM/tech lead to estimate effort
4. Only pull in what fits capacity and theme alignment

**Sources:** Customers, PED pod, other teams, post-roadmap insights.

---

## Action Items

### For Roadmap Planning (Quarterly)

- [ ] Complete prerequisite worksheet: company, customer, team understanding
- [ ] Source ideas from other teams using "what problems are you excited to solve" question
- [ ] Gather engineering/design input on tech debt and infrastructure
- [ ] Conduct personal deep work session for idea generation
- [ ] Filter ideas against prerequisites (expect ~75% elimination)
- [ ] Group remaining ideas into 3-5 themes
- [ ] Rank themes with qualitative and quantitative justification
- [ ] Validate ranking with manager and product lead
- [ ] Rank ideas within top 3 themes by impact potential
- [ ] Determine priority-driven vs. commitment-driven scenario
- [ ] Set capacity plan (over-subscribed by 1/3 or under-subscribed by 30%)

### For Sprint Execution (Weekly)

- [ ] Maintain 2-sprint queue of completed specs
- [ ] Track pipeline of projects in opportunity validation and design
- [ ] Collaborate with EM on estimation for upcoming work
- [ ] Review bug queue weekly and rate severity
- [ ] Vet new requests against thematic priorities
- [ ] Ensure 80/20 split: roadmap vs. other work

### For Skill Development (Ongoing)

- [ ] Practice roadmap prioritization even if you don't own it—compare to actual roadmap and discuss differences with manager
- [ ] Build rough estimation intuition (hours, days, weeks, month)
- [ ] Learn team's specific T-shirt sizing definitions
- [ ] Develop systems for bug vetting (or delegate to product ops)

---

## Critical Gaps & Limitations

| Gap | Implication |
|-----|-------------|
| B2B SaaS focus (Gusto case study) | May need adaptation for consumer, marketplace, or platform businesses |
| Assumes dedicated EM partnership | Solo PMs or those without strong EM relationships need modified approach |
| Limited coverage of OKR/metric-driven planning | Some orgs require explicit metric mapping not covered here |
| No discussion of stakeholder politics | Real prioritization often involves navigating conflicting stakeholder interests |
| Assumes roadmap authority | Early PMs may not have authority to set themes—focuses on input and practice |

---

## Appendix: Key Frameworks

### Framework 1: Prerequisite Categories

```
Company (Why) → Customer (Who) → Team (How)
```

### Framework 2: Five-Step Prioritization

```
Filter → Group → Rank Themes → Rank Ideas → Finalize
```

### Framework 3: Planning Scenarios

| Scenario | Approach | Buffer |
|----------|----------|--------|
| Priority-Driven | Over-subscribed | +33% |
| Commitment-Driven | Under-subscribed | -30% |

### Framework 4: Sprint Pipeline

```
Roadmap → Validation → Design → PRD → Estimation → Sprint
```

### Framework 5: 80/20 Work Split

```
80% Roadmap priorities + 20% (Bugs + New Requests)
```

---

## Appendix: Key Quotes

| Quote | Context |
|-------|---------|
| "Your job is not to generate all the ideas. Your job is to find all the good ideas. PMs who try to do it all alone have worse outcomes." | On idea sourcing |
| "Whenever someone has a new idea, you have to compare it to the hundred other things on the list and do a bunch of ROI estimation every time. You've essentially created infinite work to say yes or no to people." | On why themes beat ranked lists |
| "Maintaining a perfect global set of projects is not worth the complexity. It's better to put those projects into containers so you can say this container matters more than that one." | On theme-based prioritization |
| "This first pass can eliminate a significant proportion of the potential ideas, sometimes as much as 75%." | On filtering |
| "In the commitment paradigm, you want high confidence that you do not have enough work to do. This is different than the priority paradigm, where you want low confidence that you have too much work." | On planning scenarios |
| "We thought a lot about where Gusto starts. We wanted Gusto to take over the minute you decide to hire someone." | On prioritizing by customer journey |
| "It's important for an early-career PM to build rough estimation skills." | On estimation |
| "PMs who reactively say yes to everything can drown in new requests. This pulls a huge amount of focus, and you end up finishing the quarter with a half-done roadmap." | On new request management |
| "PMs should delegate this work if they can." | On bug vetting |
