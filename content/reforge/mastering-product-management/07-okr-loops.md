# OKR Loops: Building Leverage Through Goal-Setting Systems

> Reforge Program | Based on experiences from LinkedIn, Google, Stripe, Tripadvisor, SurveyMonkey

## Source

| Type | Title | Platform |
|------|-------|----------|
| Course | Mastering Product Management - OKR Loops | Reforge |

**Contributors:** Sachin Rekhi (LinkedIn), John Doerr (Google/KPCB), Matt Greenberg (Reforge/Credit Karma)

---

## Executive Summary

OKRs (Objectives and Key Results) appear deceptively simple but are frequently implemented ineffectively. The fundamental distinction between effective and ineffective OKR implementation lies in three practices: **outcome orientation** (measuring business results rather than feature launches), **loop thinking** (treating OKRs as iterative learning systems rather than execution checklists), and **holistic integration** (balancing OKR focus with broader PM toolkit).

Great PMs create leverage through OKRs in four ways: focused effort (forcing prioritization trade-offs), team empowerment (aligning vectors for autonomous decision-making), product intuition (accelerating learning through rigorous post-mortems), and leadership buy-in (gaining vertical and horizontal alignment). The 6-step OKR loop—Draft, Update, Share/Align/Socialize, Launch, Reinforce/Review, Post-mortem—transforms static goal-setting into dynamic learning infrastructure.

The key insight: OKRs are not execution tools but **feedback systems**. Their value comes not from tracking progress but from systematically learning what moves the business, building an initiative data bank that compounds product intuition over time.

---

## Chapter 1: The OKR Paradox—Simple Framework, Complex Implementation

### Historical Context

In fall 1999, John Doerr introduced OKRs to Google's 30-person team. Sergey Brin adopted them as "an organizing principle" despite initial skepticism. Today, OKRs underpin seven Google products with billion+ users: Search, Chrome, Android, Maps, YouTube, Google Play, Gmail.

> "OKRs should be credited with changing the course of the company forever."
> — Eric Schmidt, former CEO of Google

### The Simplicity Trap

| Surface Understanding | Deep Understanding |
|----------------------|-------------------|
| Objectives = what to accomplish | Objectives = strategic bets requiring trade-offs |
| Key Results = numbers to hit | Key Results = hypothesis tests about what drives outcomes |
| Quarterly cycle = deadline | Quarterly cycle = learning iteration |
| OKRs = execution tool | OKRs = feedback system |

**The Effectiveness Gap:**
Many teams use OKRs but few use them effectively. The difference isn't visible in the OKR documents—it's in the thinking and processes surrounding them.

### Four Types of Leverage from OKRs

```
┌─────────────────────────────────────────────────────────────────┐
│                    OKR LEVERAGE MODEL                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOCUSED EFFORT              TEAM EMPOWERMENT                   │
│  ┌─────────────┐            ┌─────────────┐                     │
│  │ Forces hard │            │ Aligns team │                     │
│  │ trade-offs  │            │ vectors for │                     │
│  │ up front    │            │ autonomous  │                     │
│  │             │            │ decisions   │                     │
│  └─────────────┘            └─────────────┘                     │
│         │                          │                            │
│         └──────────┬───────────────┘                            │
│                    │                                            │
│              ┌─────▼─────┐                                      │
│              │  OKR LOOP │                                      │
│              └─────┬─────┘                                      │
│                    │                                            │
│         ┌──────────┴───────────┐                                │
│         │                      │                                │
│  ┌──────▼──────┐        ┌──────▼──────┐                         │
│  │ PRODUCT     │        │ LEADERSHIP  │                         │
│  │ INTUITION   │        │ BUY-IN      │                         │
│  │ Accelerates │        │ Vertical +  │                         │
│  │ learning    │        │ horizontal  │                         │
│  │ loops       │        │ alignment   │                         │
│  └─────────────┘        └─────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> "As a PM you are responsible for driving focus, alignment, accountability, and an outcome orientation. OKRs are one of the best goal-setting frameworks I've found for accomplishing all of these things."
> — Sachin Rekhi, former Head of LinkedIn Sales Navigator

### When OKRs Don't Fit

OKRs are not universal. Alternative frameworks are preferable for:
- **Exploratory phases**: Very low-probability, hard-to-predict future events
- **Non-tech contexts**: Where instrumentation and quarterly measurement are challenging
- **Pre-product-market-fit**: When learning velocity matters more than metric movement

---

## Chapter 2: Output vs. Outcome—The Fundamental Distinction

### The Feature Factory Problem

Output-oriented teams measure whether work shipped. Outcome-oriented teams measure whether shipping created value.

| Dimension | Output Orientation | Outcome Orientation |
|-----------|-------------------|---------------------|
| Measures | Features launched, deadlines hit | User/business metrics moved |
| Celebrates | Milestones, launches | Business outcomes achieved |
| Risk | "Feature factory" culture | Requires prediction, estimation |
| Learning | Minimal—launch and move on | Continuous—did hypothesis hold? |

**Example Comparison:**

| Output KR | Outcome KR |
|-----------|------------|
| "Launch new feature by July 31" | "Increase signups by 15% via new feature" |
| "Complete product spec by July 15" | "Achieve pilot conversion rate >= 40%" |
| "Enroll 20 customers in pilot" | "Improve weekly active users by 25%" |

### Why Teams Default to Outputs

1. **Control**: Outputs are within team control; outcomes depend on user behavior
2. **Safety**: Output targets are achievable; outcome predictions might be wrong
3. **Time horizon**: Outcomes often take multiple quarters to materialize
4. **Psychological safety**: Truth-seeking requires admitting prediction failures

### The Three Types of Key Results

Drawing from the Lever Dashboards module:

```
┌─────────────────────────────────────────────────────────────────┐
│              KEY RESULT TYPE HIERARCHY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  OUTPUT KEY RESULTS                                             │
│  └─ Specific deliverables/milestones                            │
│     "Launch Sales Navigator by July 31"                         │
│                                                                 │
│  KPI KEY RESULTS (Input metrics)                                │
│  └─ Leading indicators that drive outcomes                      │
│     "Increase weekly saved leads by 30%"                        │
│                                                                 │
│  OUTCOME KEY RESULTS (Output metrics)                           │
│  └─ End business/user value measures                            │
│     "Achieve 40% pilot conversion rate"                         │
│                                                                 │
│  GREAT OKRs = BALANCED MIX OF ALL THREE                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Case Study: LinkedIn Sales Navigator

**Objective:** "Launch the all-new Sales Navigator to redefine social selling"

| Low-Leverage KRs (Output-only) | High-Leverage KRs (Mixed) |
|-------------------------------|---------------------------|
| Launch product by July 31 | Launch product by July 31 (output) |
| Enroll 20 customers in pilot | Achieve pilot conversion >= 40% (outcome) |
| | Reach X weekly active users (KPI) |
| | Attain Y% feature adoption (KPI) |
| | Hit Z retention rate (outcome) |

The output-only version tells you if you shipped. The mixed version tells you if shipping created value.

---

## Chapter 3: The 6-Step OKR Loop

### Loop vs. Linear Thinking

| Linear OKR Thinking | Loop OKR Thinking |
|--------------------|-------------------|
| Set goals → Execute → Grade | Set → Execute → Learn → Improve → Set better |
| One-directional | Cyclical, iterative |
| Evaluation-focused | Learning-focused |
| Static | Dynamic |

### The Complete Loop

```
┌──────────────────────────────────────────────────────────────────────┐
│                        THE OKR LOOP                                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌─────────────┐                                                   │
│    │ 6. POST-    │◄─────────────────────────────────────────┐        │
│    │    MORTEM   │                                          │        │
│    └──────┬──────┘                                          │        │
│           │ Learnings feed into...                          │        │
│           ▼                                                 │        │
│    ┌─────────────┐                                          │        │
│    │ 1. DRAFT    │ Define 1-4 objectives                    │        │
│    │    OKRs     │ Define 2-4 KRs per objective             │        │
│    └──────┬──────┘                                          │        │
│           │                                                 │        │
│           ▼                                                 │        │
│    ┌─────────────┐                                          │        │
│    │ 2. UPDATE   │ Integrate previous quarter learnings     │        │
│    │    OKRs     │                                          │        │
│    └──────┬──────┘                                          │        │
│           │                                                 │        │
│           ▼                                                 │        │
│    ┌─────────────┐                                          │        │
│    │ 3. SHARE,   │ Vertical (leadership)                    │        │
│    │    ALIGN,   │ Horizontal (cross-functional)            │        │
│    │    SOCIALIZE│                                          │        │
│    └──────┬──────┘                                          │        │
│           │                                                 │        │
│           ▼                                                 │        │
│    ┌─────────────┐                                          │        │
│    │ 4. LAUNCH   │ Kickoff with full team                   │        │
│    │    OKRs     │ Ensure clarity + commitment              │        │
│    └──────┬──────┘                                          │        │
│           │                                                 │        │
│           ▼                                                 │        │
│    ┌─────────────┐                                          │        │
│    │ 5. REINFORCE│ Co-opt existing processes                │        │
│    │    & REVIEW │ Handle mid-quarter changes               ├────────┘
│    └─────────────┘                                          │
│                                                             │
└──────────────────────────────────────────────────────────────────────┘
```

### Quarterly Timing Framework

| Timing | Activity |
|--------|----------|
| 4-5 weeks before quarter | Start developing roadmap |
| 2-3 weeks before quarter | Begin drafting OKRs |
| 1-2 weeks before quarter | Post-mortem for previous quarter |
| Immediately after post-mortem | Update OKRs based on learnings |
| Before quarter start | Share, align, socialize |
| First 2 weeks of quarter | Official OKR launch |
| Throughout quarter | Reinforce and review |
| Last 1-2 weeks of quarter | Quarterly post-mortem |

### Roadmap-First vs. Goals-First Approach

| Goals-First | Roadmap-First |
|-------------|---------------|
| Define OKRs → Build roadmap to achieve them | Build strategic roadmap → Define OKRs to measure success |
| Risk: Short-term optimization | Benefit: Strategy-connected |
| "Whatever it takes" mentality | Customer-centric approach |

**Case Study: Stripe**

Stripe's expansion from core payments to Stripe Atlas (startup incorporation) and Stripe Press (book publishing) required roadmap-first thinking. Goals-first would have trapped them in optimizing payment conversion rather than strategically expanding offerings.

---

## Chapter 4: Drafting, Updating, and Socializing OKRs

### Step 1: Draft OKRs

**Objectives:**
- Define 1-4 objectives based on roadmap priorities
- More than 4 typically diffuses team focus
- Each objective should be achievable within the quarter

**Key Results:**
- Define 2-4 KRs per objective
- KRs are not isolated—they paint a complete picture of objective success
- Include mix of output, KPI, and outcome KRs
- Assign owner to each KR (often PM, sometimes cross-functional peer)

**Critical:** Draft collaboratively with your pod (engineers, design lead, data scientist). This ensures cross-functional alignment and longer-term empowerment.

### Step 2: Update OKRs

Integrate learnings from previous quarter's post-mortem:
- What initiatives proved more/less impactful than expected?
- Which forecasts were accurate vs. off-base?
- What does initiative data bank reveal?

**Multi-Quarter Projects:**
Two approaches for outcomes that take multiple quarters:
1. **Placeholder KR**: Extends beyond one quarter with explicit note
2. **Proxy KPI**: Identify alternative leading indicator measurable within quarter

### Step 3: Share, Align, Socialize

**Order matters:**
```
1. Vertical alignment (leadership) → 2. Horizontal alignment (cross-functional)
```

If you socialize with cross-functional teams before leadership sense-check, leadership pushback forces restart—makes process appear erratic.

**Vertical Alignment (Leadership):**

Explain three things:
1. What the objectives, key results, and major initiatives are
2. Why you selected each objective
3. How goals align with product strategy or company goals

**Questions to prompt leadership:**
- Do these priorities align with company priorities?
- Any concerns about resource allocation?
- Missing strategic considerations?

**Horizontal Alignment (Cross-functional):**

Questions for interdependent stakeholders:
- Can they support your planned initiatives?
- Does this align with their planned activities?
- Any concerns about required work?

Questions for yourself:
- Are we scoped to support other teams' initiatives?
- Do we need to adjust roadmap given other teams' priorities?

**Common Mistakes:**
1. Horse-trading before leadership sense-check
2. Not having shared goals with interdependent teams on joint initiatives

> "A common failure mode is when interdependent teams don't have the same goals as you do on a shared initiative."
> — Matt Greenberg, CTO at Reforge

### Step 4: Launch OKRs

**Quarterly Kickoff Elements:**
- Every team member understands OKRs clearly
- Rationale for each objective explained
- Expectations set: OKRs are stretch goals
- Review/reinforcement cadence communicated
- Simple documentation (Notion, Confluence, Google Sheets)

**Stretch Goal Calibration:**
If team consistently achieves 100% of OKRs quarter after quarter, ambitions are set too low. Majority of OKRs ending "yellow" is acceptable.

---

## Chapter 5: Reinforcement, Review, and Post-Mortems

### Step 5: Reinforce and Review

**Principle:** Keep OKRs front and center by co-opting existing processes—don't add new meetings.

| Existing Process | OKR Integration |
|------------------|-----------------|
| Status emails/updates | Organize by OKR, share tasks + early metrics |
| Sprint post-mortems | Include OKR status updates |
| 1:1s with manager | Send OKR status as pre-read |
| Product reviews | Frame around OKR priorities |

### Handling Mid-Quarter Changes

**Key Question:** Has new information emerged that didn't exist during drafting?

| If No New Information | If New Information |
|----------------------|-------------------|
| Stay focused on quarter's OKRs | Explicit conversation about reprioritization |
| Resist scope creep | Zero-sum: new priority = something deprioritized |
| | Revisit vertical and horizontal alignment |

### Step 6: The Post-Mortem

The post-mortem is the **core step** that drives learning. Without rigorous post-mortems, OKRs are just execution tracking.

**Critical Principle:** OKR scores must NOT be tied to performance reviews and compensation. Linking creates incentives to sandbag goals and hide failures.

### Scoring Framework

Use consistent system (specific method matters less than consistency):

| Score | Threshold | Meaning |
|-------|-----------|---------|
| Green | 100%+ achieved | Fully successful |
| Yellow | >= 70% achieved | Partially successful |
| Red | < 70% achieved | Did not achieve |

**Objective Scoring:**
- Simple: Average of KR scores
- Better: Weighted by KR importance + discretion
- Essential question: "Did we achieve the spirit of this objective?"

**"Red is Good" Culture:**
Red scores often teach more than green ones. Embrace honest scoring as learning opportunity.

### Pre-Post-Mortem Preparation

Before the meeting, OKR owners should:
1. Self-score each KR using green/yellow/red
2. Score overall objective (average + discretion)
3. Collect initiative-specific data for "initiative data bank"
4. Document: initiative, actual impact, forecasted impact
5. Compile and distribute as pre-read

### Post-Mortem Meeting Agenda

| Step | Focus | Key Questions |
|------|-------|---------------|
| 1. Establish expectations | "This is about learning, not performance evaluation" | |
| 2. Confirm scores | Quick alignment check | Are scores accurate? Are we truth-seeking? |
| 3. OKR-by-OKR discussion | Identify root causes | See below |
| 4. Future application | What to carry forward | How should we adjust next quarter? |
| 5. Close | Thank team, share next steps | |

**Root Cause Questions by Score:**

| Green OKRs | Red OKRs | Yellow OKRs |
|------------|----------|-------------|
| Which initiatives drove success? | What was root cause of not hitting? | What worked? |
| What made them particularly successful? | Delays/reprioritization? | What didn't? |
| Strong execution, good picking, or luck? | Output delivered but outcome fell short? | |
| | Forecast off—actually a success? | |
| | Need more time for outcome? | |

### Post-Mortem Outputs

Two key artifacts:
1. **Graded OKRs + Rationales**: Compiled grades, notes, takeaways
2. **Initiative Data Bank**: Initiatives with corresponding impact data

### Three Types of Post-Mortem Adjustments

1. **Focus adjustment**: Change objective emphasis or prioritization
2. **Forecast adjustment**: Make KR targets more ambitious or realistic
3. **Initiative adjustment**: Deprioritize initiative types proving less impactful

### Feeding Back to Strategy

Post-mortem learnings can trigger strategy updates:

| Type | Description | Example |
|------|-------------|---------|
| Refinement | Add detail but maintain direction | Discover more precise target audience subset |
| Pivot | Adjust overall direction | Product attractive to surprising new audience |

---

## Chapter 6: Avoiding OKR Pitfalls

### The Four Localization Traps

OKRs' intense focusing power can push teams toward problematic local optimization:

| Trap | Symptom | Stated As |
|------|---------|-----------|
| Metrics over intangibles | Lose focus on customer/quality | "OKRs make us over-optimize" |
| Short-term over long-term | Avoid multi-quarter initiatives | "Great companies think beyond the quarter" |
| Incremental over audacious | Choose certain small wins | "OKRs discourage bold bets" |
| Outcomes over process | No guidance on how to execute | "OKRs leave the team rudderless" |

### Solutions Within the Loop

**Maintaining Focus on Intangibles:**
- Get creative with measures (e.g., NPS for user delight)
- Include qualitative KRs when appropriate

**Maintaining Long-Term View:**
- Track outcomes of past initiatives in initiative data bank
- Use vision narrative (Module 2) to inform objectives
- Don't just react quarter to quarter

**Encouraging Big Bets:**
- Big bets decided through strategy/roadmap, not OKRs
- 4D roadmap ensures big bets aren't crowded out
- Outcome-orientation gives confidence for bold decisions
- No connection to performance reviews = freedom to take risks

**Maintaining Process Focus:**
- OKRs are feedback loop feeding into roadmap and strategy
- Supplement with rest of PM toolkit for process improvement

### When Your Organization Lacks OKRs

**No common goal-setting system:**
- Implement OKRs within your pod
- Creates alignment, focus, intuition-building within team
- Can still use for leadership communication
- Potential to expand to organization if successful

**Different goal-setting system:**
- Evaluate if it creates: Focus? Alignment? Accountability? Learning loop?
- Pull in OKR components where gaps exist (e.g., rigorous post-mortems, vertical/horizontal alignment process)

---

## Case Studies Index

| Case Study | Context | Key Insight |
|------------|---------|-------------|
| **Google** | OKR origin story (1999) | Organizing principle for company-wide alignment |
| **LinkedIn Sales Navigator** | New subscription product launch | Mixed output/outcome KRs vs. output-only |
| **LinkedIn Sales Navigator Retention** | Retention improvement | Post-mortem revealed playbook failure, forced pivot to "magic moment" hypothesis |
| **Tripadvisor** | Booking platform expansion | Outcome KRs with specific targets vs. vague goals |
| **SurveyMonkey** | SEO optimization | Multi-type KR mix for existing product optimization |
| **Stripe** | Product expansion | Roadmap-first approach enabled strategic vs. tactical growth |

### LinkedIn Sales Navigator Retention: Deep Dive

**Situation:** Retention below benchmarks after launch

**Quarter 1-2 Approach:**
- Applied standard LinkedIn retention playbook
- Solved involuntary churn, re-engagement emails, onboarding
- Result: Small improvement, far from target

**Post-Mortem Learning:**
Retention playbook works for mature products, not new ones

**Pivot:**
- Dropped playbook entirely
- New hypothesis: Users who reach "magic moment" (saving leads, receiving insights) retain
- Focused initiatives on getting users to save leads in first week

**Result:** Weekly active users increased, meaningful churn improvement

**Key Insight:** Post-mortem forced team to "face brutal facts" and drove culture of truth-seeking.

---

## Expert Quotes Index

| Expert | Role | Quote | Theme |
|--------|------|-------|-------|
| John Doerr | VC, introduced OKRs to Google | "OKRs are the scaffolding for Google's signature home runs" | OKR power |
| John Doerr | | "While conceptually simple, OKRs demand rigor, commitment, clear thinking, and intentional communication" | Implementation difficulty |
| Eric Schmidt | Former CEO, Google | "OKRs should be credited with changing the course of the company forever" | Impact |
| Sachin Rekhi | Former Head, LinkedIn Sales Navigator | "OKRs are one of the best goal-setting frameworks I've found for focus, alignment, accountability, and outcome orientation" | Framework value |
| Matt Greenberg | CTO, Reforge | "A common failure mode is when interdependent teams don't have the same goals as you do on a shared initiative" | Horizontal alignment |
| John Boyd | Air Force Colonel | "Speed of iteration beats quality of iteration" | Learning velocity |

---

## Frameworks Summary

### The OKR Loop (6 Steps)

```
Draft → Update → Share/Align/Socialize → Launch → Reinforce/Review → Post-Mortem → [repeat]
```

### Key Result Type Mix

| Type | Function | Example |
|------|----------|---------|
| Output | Deliverable/milestone | "Launch by July 31" |
| KPI | Leading indicator | "Increase weekly saved leads 30%" |
| Outcome | End business value | "Achieve 40% conversion rate" |

### Vertical + Horizontal Alignment

```
1. Leadership sense-check (vertical)
   ↓
2. Cross-functional socialization (horizontal)
   ↓
3. Refinement loop if needed
   ↓
4. Final OKRs
```

### Post-Mortem Output Structure

```
┌─────────────────────────────────┐
│     POST-MORTEM OUTPUTS         │
├─────────────────────────────────┤
│ 1. Graded OKRs + Rationales     │
│    - Green/Yellow/Red scores    │
│    - Root cause analysis        │
│    - Key takeaways              │
├─────────────────────────────────┤
│ 2. Initiative Data Bank         │
│    - Initiative name            │
│    - Forecasted impact          │
│    - Actual impact              │
│    - Learnings                  │
└─────────────────────────────────┘
         │
         ▼
    Feed into next quarter's
    OKRs and roadmap
```

---

## Action Items

### Immediate (This Week)
- [ ] Audit current OKRs: What % are output vs. outcome-oriented?
- [ ] List your current KRs—can you categorize each as output, KPI, or outcome?
- [ ] Identify: Do you have an initiative data bank? If not, start one.

### Short-Term (This Quarter)
- [ ] If post-mortems don't exist, schedule first one for end of quarter
- [ ] Map vertical and horizontal alignment touchpoints—are any missing?
- [ ] Review last quarter's initiatives: Which had measurable impact data?
- [ ] Add "spirit of objective" question to your scoring process

### Strategic (Next Quarter)
- [ ] Implement full 6-step OKR loop with explicit timing
- [ ] Establish "red is good" culture—pilot with your pod
- [ ] Build initiative data bank with minimum 3 entries per quarter
- [ ] Create shared OKRs with one interdependent team

### Ongoing Practices
- [ ] Quarterly: Rigorous post-mortem with both outputs (graded OKRs, initiative bank)
- [ ] Monthly: OKR status in 1:1s and status updates
- [ ] Per OKR draft: Include all three KR types
- [ ] Per post-mortem: Ask "What did we learn about what moves the business?"

---

## Critical Gaps & Limitations

### What This Module Doesn't Cover
1. **OKR tooling**: Specific software recommendations
2. **Company-wide OKR rollout**: Change management for organization adoption
3. **OKR cascading**: How team OKRs connect to company OKRs
4. **Individual OKRs**: Personal goal-setting vs. team goal-setting
5. **OKR alternatives in depth**: When/how to use different frameworks

### Questions for Further Exploration
- How do you handle OKRs when team is simultaneously running experiments?
- What's the right balance of shared vs. team-specific OKRs?
- How do OKRs interact with agile sprint planning?
- How do you calibrate "stretch" across different team capabilities?

---

## Quick Reference: OKR Loop Cheat Sheet

### The 6 Steps

| Step | When | Key Activities |
|------|------|----------------|
| 1. Draft | 2-3 weeks before quarter | 1-4 objectives, 2-4 KRs each, mixed types |
| 2. Update | After post-mortem | Integrate learnings from previous quarter |
| 3. Share/Align/Socialize | Before quarter | Vertical first, then horizontal |
| 4. Launch | First 2 weeks | Kickoff meeting, set expectations |
| 5. Reinforce/Review | Throughout | Co-opt existing processes |
| 6. Post-Mortem | Last 1-2 weeks | Score, analyze, build initiative bank |

### Red Flags

- All OKRs green quarter after quarter → ambitions too low
- No outcome-oriented KRs → measuring activity, not impact
- No post-mortem → no learning loop
- OKRs tied to compensation → sandbagging incentive
- Horizontal alignment skipped → cross-functional friction mid-quarter

### Quick Diagnostic

| Question | If No → |
|----------|---------|
| Can you explain why each objective was chosen? | Strategy disconnected from execution |
| Do you have KRs for outcomes, not just outputs? | Feature factory risk |
| Did you sense-check with leadership before socializing? | Restart risk |
| Do you have an initiative data bank? | Learning not compounding |
| Is "red is good" part of your culture? | Truth-seeking blocked |

---

## Module Integration Map

| Module | Feeds Into OKRs | OKRs Feed Back To |
|--------|-----------------|-------------------|
| Product Strategy (01) | Strategic priorities inform objectives | Post-mortem learnings may trigger strategy refinement/pivot |
| Vision Narrative (02) | Long-term view prevents short-term trap | |
| Lever Dashboards (03) | Outcome/KPI metrics become KRs | |
| 4D Roadmaps (05) | Roadmap priorities become objectives | Initiative learnings inform next roadmap |
| Empowering Specs (06) | OKR context flows into spec opportunity sections | |
