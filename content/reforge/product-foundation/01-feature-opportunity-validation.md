# Feature Opportunity Validation: Collected Insights
> Anand Subramani & Jiaona Zhang | Product Leaders with 15+ years experience at Zynga, Gusto, Dropbox, Airbnb, Webflow, WeWork

## Sources

| Source | Type | Key Examples |
|--------|------|--------------|
| PM Training Module 1 | Educational curriculum | Lyft Destination Mode, Gusto Onboarding |
| Expert Commentary | Anand Subramani, JZ | Interview techniques, product review best practices |
| Case Studies | Success/Failure analysis | Amazon Fire Phone, Google Photos, Grubhub, Bumble |

---

## Executive Summary

Feature Opportunity Validation is the first pillar of product development—the critical gate that determines whether a feature is worth building before any design or code is written. Without proper validation, teams risk building features that fail to deliver value, face late-stage blowups from misaligned stakeholders, or waste resources on problems that don't matter.

A valid opportunity requires three components working together: **strategic fit** (alignment with company goals), **user value** (solving a real problem for target users), and **business value** (creating measurable impact for the company). Missing any component leads to failure—Amazon's Fire Phone had strategic fit and business value potential but failed to deliver user value, leading to its discontinuation within a year.

The validation process follows four sequential steps: conduct a manager briefing to gather initial hypotheses, refine user value through interviews, refine business value through funnel analysis, and validate/communicate via product reviews. This systematic approach transforms vague project assignments into well-defined opportunities with stakeholder alignment, setting the foundation for successful design and development phases.

---

## 1. The Three Components Framework

### Core Model

Every feature opportunity must satisfy all three components to be worth pursuing:

```
┌─────────────────────────────────────────────────────────────┐
│                    VALID OPPORTUNITY                         │
│                                                              │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│   │  STRATEGIC  │ + │    USER     │ + │  BUSINESS   │      │
│   │     FIT     │   │    VALUE    │   │    VALUE    │      │
│   └─────────────┘   └─────────────┘   └─────────────┘      │
│                                                              │
│   Aligns with       Solves real      Creates measurable    │
│   company goals     user problem     business impact        │
└─────────────────────────────────────────────────────────────┘
```

### Component Definitions

| Component | Core Question | Key Indicators |
|-----------|---------------|----------------|
| **Strategic Fit** | Does this align with where we're going? | Ladders to company mission, strategy, product goals, team OKRs |
| **User Value** | Does this solve a real problem? | User interviews validate pain, high severity, poor alternatives |
| **Business Value** | Does this create impact? | Measurable metrics, positive ROI, stakeholder buy-in |

### Success vs Failure: Case Comparison

| Product | Strategic Fit | User Value | Business Value | Outcome |
|---------|--------------|------------|----------------|---------|
| **Amazon Fire Phone** | Yes (leveraged language processing tech) | **No** (inferior UX, limited app store) | Yes (e-commerce integration) | Discontinued after 1 year |
| **Google Photos** | Yes (integrated with Google Drive) | Yes (AI-powered differentiated experience) | Yes (storage upsells, photo prints) | 5B+ downloads, 4.7 stars |

**Key insight:** Missing even one component leads to failure. User value is often the component that trips up teams because leadership usually pre-validates strategic fit and business value, but user problems require direct validation.

---

## 2. The Four-Step Validation Process

### Process Overview

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   MANAGER    │───▶│    REFINE    │───▶│    REFINE    │───▶│   VALIDATE   │
│   BRIEFING   │    │  USER VALUE  │    │BUSINESS VALUE│    │ & COMMUNICATE│
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
   Step 1              Step 2              Step 3              Step 4
   Gather              User interviews     Funnel analysis     Product review
   hypotheses          & synthesis         & proxy metrics     & PRD
```

### Why Each Step Matters

| Step | Purpose | Risk If Skipped |
|------|---------|-----------------|
| Manager Briefing | Understand context, gather hypotheses | Operating on wrong assumptions, misaligned expectations |
| Refine User Value | Validate problem exists and matters | Building for non-existent problems, low adoption |
| Refine Business Value | Quantify potential impact | Committing to unattainable metrics, wasted resources |
| Validate & Communicate | Build alignment, get buy-in | Late-stage blowups, rework, deprioritization |

---

## 3. Manager Briefing

### Purpose

A manager briefing is a meeting to gather information about your assigned project and align on expectations. Your manager likely has pre-existing hypotheses about why the work matters—your job is to surface and document these assumptions so you can validate them.

### The Three-Part Briefing Structure

#### Part 1: Strategic Fit (Four Levels)

```
COMPANY MISSION & VISION
        │
        ▼
   COMPANY STRATEGY
        │
        ▼
   PRODUCT STRATEGY
        │
        ▼
     TEAM GOALS
        │
        ▼
   YOUR PROJECT
```

| Level | Definition | Example (Lyft) |
|-------|------------|----------------|
| **Mission & Vision** | Why the company exists, long-term aspiration | "Improve people's lives with the world's best transportation" |
| **Company Strategy** | Short-to-medium term objectives | Provide drivers flexible earning, riders affordable alternatives |
| **Product Strategy** | Goals specific to the product | Empower drivers with flexible earning opportunities |
| **Team Goals** | What your team is trying to achieve | Help drivers get more value from the Lyft app |

#### Part 2: User Value Hypotheses

Four questions to answer about the user:

| Question | What to Capture | Example Attributes |
|----------|-----------------|-------------------|
| **Who is the user?** | Demographics/firmographics + product behaviors | B2C: age, gender, income; B2B: company size, role, industry |
| **What problem are we solving?** | Problem area + supporting signal | Job to be done, cost, accessibility, performance, integration |
| **Why is it important?** | Severity + users impacted + alternatives | Low/Medium/High severity, % of user base, current workarounds |
| **What does success look like?** | Qualitative + quantitative goals + non-goals | User experience improvement, metrics (adoption, retention), what we're NOT solving |

**Lyft Example - User Value Hypothesis:**
- **User:** Part-time drivers in suburban/rural areas who commute to busier areas
- **Problem:** Struggling to find rides going toward their destination at end of session
- **Signal:** High cancellation rates for end-of-session rides
- **Severity:** High (frustrating for passengers, costly for drivers—wasted time/gas)
- **Alternatives:** Turn off app and drive home earning nothing, or keep canceling until finding right ride

#### Part 3: Business Value Hypotheses

Three questions to answer:

| Question | What to Capture |
|----------|-----------------|
| **Who are key stakeholders?** | Decision-makers (must align) vs. Informed teams (must support) |
| **What does business success look like?** | Qualitative description + quantitative metrics + non-goals |
| **How does it tie to strategy?** | Connection back to team goals → product strategy → company strategy |

**Lyft Example - Business Value Hypothesis:**
- **Decision-makers:** Product leadership, Driver and Matching teams
- **Informed teams:** Customer support, marketing, Lyft Community
- **Qualitative goal:** Improve driver end-of-session experience
- **Quantitative goals:** Lower cancellation rate, higher driver earnings, improved retention
- **Non-goal:** Directly driving revenue (too hard to measure for this initiative)

---

## 4. Refining User Value: Research Fundamentals

### The User Value Map

User interviews produce a refined **User Value Map** with three components:

```
┌─────────────────────────────────────────────────────────────┐
│                     USER VALUE MAP                          │
├─────────────────────────────────────────────────────────────┤
│  USER PROFILE                                               │
│  • Demographics/firmographics                               │
│  • Product behaviors                                        │
├─────────────────────────────────────────────────────────────┤
│  USER PROBLEM                                               │
│  • Problem description                                      │
│  • Severity (Low/Medium/High)                              │
│  • Current alternatives                                     │
├─────────────────────────────────────────────────────────────┤
│  USER GOALS                                                 │
│  • Qualitative success metrics                             │
│  • Quantitative success metrics                            │
│  • Non-goals                                               │
└─────────────────────────────────────────────────────────────┘
```

### Determining Interview Audience

**Common mistakes to avoid:**
- Interviewing whoever is convenient (previous panels, most active users)
- Talking to existing users to understand why prospects don't convert
- Assuming one geography's insights apply everywhere

**Three-step audience determination:**

| Step | Action | Purpose |
|------|--------|---------|
| 1. Start with company profile | Define baseline demographics/firmographics + behaviors | Understand who your company serves |
| 2. Identify project deviation | Is target audience an expansion or subset? | Focus on relevant segment |
| 3. Add diversity attributes | 1-2 attributes that vary within target | Avoid biased single-perspective insights |

**Gusto Example:**
- **Company profile:** SMBs looking for people management solutions
- **Project deviation:** Subset—SMBs doubling headcount next year
- **Diversity attributes:** Decision-maker type (CPO vs CEO), company stage (seed vs mature)

> "If we had only talked to hosts in the U.S., we would have gotten a biased view of the problem and might have come up with a solution that wasn't relevant to all of our target audience."
> — JZ on Airbnb host research

### The 3 S's of Recruitment

| Step | Action | Key Considerations |
|------|--------|-------------------|
| **Source** | Find possible participants | Internal data (existing users) or third-party data (new audiences) |
| **Screen** | Reach out and filter | Contact email + screener questionnaire; 2/3 typically fit |
| **Schedule** | Maximize insight gathering | Space interviews for debriefing, group similar profiles same day |

**Recruitment Math:**
- Target: 6 interviews per audience segment
- Screener pass rate: ~67% → Need 9 responses
- Cold email response rate: ~10% → Need to contact 90 people per segment

**Levers to increase response rate:**
- Increase compensation
- Add personal touch explaining why their input matters
- Seek warm introductions (e.g., through account managers)

---

## 5. The Interview Trail Guide

### Framework Overview

Treat interviews like guiding someone up a mountain trail—you hold the map but there's room for exploration.

```
                              ▲
                             /│\
                            / │ \       PEAK (25-30 min)
                           /  │  \      Specific problem questions
                          /   │   \
                         /    │    \
                        /     │     \
                       /──────┼──────\  BUILD (10 min)
                      /       │       \ Narrow from broad to specific
                     /        │        \
                    /─────────┼─────────\  WARM-UP (5-10 min)
                   /          │          \ Establish rapport
                  ────────────┴────────────
```

### Three Common Interview Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Skipping warm-up | Users feel awkward, lower quality insights | Spend 5-10 min on rapport |
| Leading questions | Push users to desired answers | Let users provide perspective first |
| Over-scripted | Miss unexpected valuable insights | Follow interesting threads |

> "I've seen lots of user interviews go sideways because they are an awkward environment for users. When PMs don't start with warm-up questions and comments, they get off to an awkward start and yield lower quality insights."
> — Anand

### Phase 1: Warm-Up (5-10 minutes)

**Objectives:** Build rapport, set expectations, understand who the user is

**Checklist:**
- [ ] Introduce yourself, your team, any observers
- [ ] Explain research purpose and why you want to talk to them
- [ ] Ask permission to record (research purposes only)
- [ ] Set expectation: no right or wrong answers
- [ ] Make small talk ("How's your day going?")

> "I want to make sure they know this isn't a test. I'll often even say, 'You can't hurt my feelings, it's not my project; I'm just here to pass on info to the project team.'"
> — Anand

### Phase 2: Build (10 minutes)

**Objectives:** Set context, let user provide perspective before you narrow in

**Question progression (broad → narrow):**

| Level | Example (Grubhub) |
|-------|-------------------|
| General life experience | "Tell me about your typical weekend routines and eating habits" |
| Category experience | "Why/how/when do you order food delivery?" |
| Product-specific | "How often do you use Grubhub? What's your experience?" |

**Key principle:** Give users space to share problems before switching to your agenda. You may discover more important problems than the one you hypothesized.

### Phase 3: Peak (25-30 minutes)

**Objectives:** Deeply explore the user's experience of the problem

**Three areas to understand:**

| Area | Question Type | Example (Grubhub) |
|------|---------------|-------------------|
| Problem accuracy | Validate hypothesis | "What is your experience with wait times using Grubhub?" |
| Alternatives | Current solutions | "When delivery times are too long, what do you do?" |
| Severity | Impact assessment | "How does picking up food yourself impact your meal experience?" |

**Gusto Example - Peak Questions:**
1. "Walk me through the steps you take to onboard a new employee"
2. "What do you do today to keep track of all requirements and deadlines?"
3. "How does this alternative impact your onboarding experience?"

---

## 6. Synthesis & User Value Mapping

### Why Synthesis Matters

**Three problems from poor synthesis:**

| Problem | Example | Consequence |
|---------|---------|-------------|
| Bias toward memorable answers | One vocal Blue Apron user emphasizes cancellation window | Prioritize rare edge case |
| Over-generalizing | 3 Grubhub users say "too expensive" | Miss that only <25 college students feel this way |
| Missing patterns | Peloton hardware vs app users both want Strava integration | Fail to identify cross-segment opportunity |

### Two-Phase Process

```
DEBRIEFING                          SYNTHESIS
(After each interview)              (After all interviews)
        │                                  │
        ▼                                  ▼
┌─────────────────┐              ┌─────────────────┐
│ Document profile│              │ Cluster by      │
│ Document obs    │              │   problems      │
│ Extrapolate     │              │ Pattern across  │
│   insights      │              │   profiles      │
│ Evaluate process│              │ Pattern across  │
└─────────────────┘              │   alternatives  │
                                 │ Complete map    │
                                 │ Reevaluate      │
                                 └─────────────────┘
```

### Debriefing Framework (After Each Interview)

| Step | Action | Output |
|------|--------|--------|
| 1. Document profile | Verify who you spoke to and their attributes | Grouping data for later patterns |
| 2. Document observations | What problem? Different from hypothesis? Alternatives used? Goals? | Raw interview data |
| 3. Extrapolate insights | Problem takeaways, severity takeaways, alternative takeaways | Actionable insights |
| 4. Evaluate process | Continue as-is? Adjust questions? Stop interviewing? | Process improvement |

**When to adjust:**
- **Don't change:** Early in research, still learning
- **Adjust questions:** Reached saturation on one question, hearing same thing repeatedly
- **Stop interviewing:** Consistently hearing same things, no new insights expected

### Five-Step Synthesis Process

| Step | Action | Key Questions |
|------|--------|---------------|
| 1. Cluster by problems | Group users by problems they mentioned | Which problems most frequent? |
| 2. Pattern across profiles | See if certain profiles experience different problems | Do different segments have different pain? |
| 3. Pattern across alternatives | Understand severity and alternative effectiveness | Which problems most severe? Best alternatives? |
| 4. Complete User Value Map | Update hypotheses from manager briefing | What changed? What detail to add? |
| 5. Reevaluate project | Decide whether to continue | Do conclusions support hypotheses? |

**Gusto Synthesis Example:**

| User Profile | Key Problems | Severity | Alternatives |
|--------------|--------------|----------|--------------|
| **Brandy** (CPO with existing HR tools) | Data entry errors, missed deadlines | High (employee missed benefits) | Existing tools help with storage |
| **Joseph** (CEO, no HR tools) | Missed deadlines, secure data storage, work authorization | High (legal risk) | Manual approach fails on security |

**Refined User Value Map additions:**
- Added new problem: Secure data storage concerns
- Refined problem specificity: Data entry errors AND missed deadlines
- Expanded audience: Both current Gusto users and non-users
- Updated goal: "Secure AND efficient onboarding experience"

### Post-Synthesis Decision Tree

```
                    Do conclusions support hypotheses?
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
         SUPPORTED      PARTIALLY        CONTRADICTED
              │          SUPPORTED             │
              │               │                │
              ▼               ▼                ▼
         Continue to     Refine view,     Options:
         business value  continue         • New interview round
                                          • Stop project
                                          • Pivot to new problem
```

---

## 7. Funnel Analysis & Business Value

### Why Refine Business Value

Three reasons to validate business value hypotheses:

| Reason | Risk If Skipped |
|--------|-----------------|
| Original assumptions may be wrong | Commit to unattainable metrics |
| Ensure positive business impact | Wasted resources, project sunsetted |
| Build cross-functional credibility | Engineers/designers lose trust in your leadership |

### Three-Step Funnel Analysis

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  BUILD FUNNEL   │───▶│    CALCULATE    │───▶│    EVALUATE     │
│                 │    │    MAGNITUDE    │    │  BUSINESS VALUE │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   Define start,         Establish baseline,    Use proxy metrics
   end, steps            find drop-off points   to estimate impact
```

### Step 1: Build the Funnel

**Four components of a funnel:**

| Component | Definition | Lyft Example |
|-----------|------------|--------------|
| **Target audience** | Who you're tracking | Part-time suburban drivers |
| **Starting point** | First action | Begin driving session |
| **Endpoint** | Success signal | Complete a ride |
| **Intermediate steps** | Actions in between | Receive request → Accept → View destination → Pick up |

**Three funnel types:**

| Type | Journey | Example |
|------|---------|---------|
| **Sales Funnel** | Prospect → Customer | Zendesk: Website visit → Product tour → Sales call → Trial → Purchase |
| **Feature Funnel** | Awareness → Retention | Lyft: Start session → Receive request → Accept → View destination → Pick up → Complete |
| **Growth Funnel** | Acquisition → Engagement | Bumble: Sign up → Create profile → Upload contacts → Swipe → Match → First message |

### Step 2: Calculate Problem Magnitude

**Process:**
1. Establish baseline performance (% moving through each step)
2. Identify problem area

**Finding the problem area:**

| Scenario | Approach |
|----------|----------|
| Problem already known | User interviews or signals pointed to specific step |
| Problem unknown | Analyze funnel for biggest drop-offs, unexpected drops, segment variations |

**Lyft Example:**
- Steps 1-2 (receive/accept request): Biggest drop-offs, but driven by supply/demand (outside team scope)
- Step 4 (cancel after viewing destination): 4% drop-off—unexpected for that point in journey
- **Problem selected:** Step 4 cancellations (within team control, unusually high)

### Step 3: Evaluate Potential Business Value

**Challenge:** No data yet because feature isn't built. Solution: Use proxy metrics.

**Two types of proxies:**

| Type | Definition | When to Use |
|------|------------|-------------|
| **Internal proxies** | Metrics from similar company projects | Same feature/different application OR different feature/similar application |
| **External proxies** | Results from other companies | No internal comparables; match on industry, audience, stage, or business model |

**Internal proxy examples:**
- *Same feature, different application:* Previous homepage redesign → current homepage redesign
- *Different feature, similar application:* Blog redesign with purchase modal → homepage redesign with purchase modal

**Lyft Proxy Calculation:**
- Problem: 4% cancellation rate at step 4
- Proxy: "View destination before pickup" feature caused 3% increase in cancellations
- Hypothesis: Most of that 3% came from commuting drivers at end of session
- Estimate: New feature could reduce cancellations by 1.5% (conservative half of 3%)
- **Result:** Lyft's Destination Mode became one of their most impactful differentiating features

### When Proxies Don't Work

If no suitable proxies exist:
1. Make explicit assumptions
2. Check with product lead or experienced PMs
3. Clearly state assumptions in product review for alignment

---

## 8. Product Reviews

### Purpose and Risks

**Product review:** A meeting with leadership to validate your opportunity is correct and align on path forward.

**Risks of skipping:**

| Risk | Manifestation |
|------|---------------|
| Rework | Team doesn't understand problem, makes wrong decisions |
| Late-stage blowups | Leadership surprised by feature that doesn't match expectations |
| Deprioritization | Dependency teams don't understand value, prioritize other work |

### Meeting Audience

> "You should be the most junior person in your product review. You want to keep this meeting as small as possible, so you should only invite the key leaders for the orgs that are directly impacted."
> — Anand

| Audience | Who | Their Role |
|----------|-----|------------|
| **Product Org Leadership** | Manager, product leadership, possibly founders | Decision-makers who approve the project |
| **Dependency Team Leadership** | VPs/Directors of impacted functions | Agree to support, flag constraints |

### Three Meeting Objectives

| Objective | What You're Trying to Achieve |
|-----------|-------------------------------|
| **Gather feedback** | Validate conclusions about strategic fit, user value, business value |
| **Identify constraints/dependencies** | Surface time constraints, resource limits, cross-project dependencies |
| **Gain approval** | Get explicit green/yellow/red light to proceed |

> "You want to make sure your dependency team leaders are giving feedback in their area of expertise only. This helps avoid moving the conversation in the wrong direction."
> — JZ

### Four-Part Meeting Structure

```
┌─────────────────────────────────────────────────────────────┐
│ 1. OBJECTIVES & RULES OF ENGAGEMENT                         │
│    • Share agenda                                           │
│    • State 3 objectives                                     │
│    • Set ground rules                                       │
├─────────────────────────────────────────────────────────────┤
│ 2. OPPORTUNITY DEEP DIVE                                    │
│    • Strategic fit (how it ladders up)                     │
│    • User value (full User Value Map + interview evidence) │
│    • Business value (goals, proxies, stakeholders)         │
├─────────────────────────────────────────────────────────────┤
│ 3. CONSTRAINTS & DEPENDENCIES                               │
│    • Time constraints (launch dates, runway)               │
│    • Resource constraints (team size, expertise)           │
│    • Project dependencies (what this links to)             │
├─────────────────────────────────────────────────────────────┤
│ 4. APPROVAL & NEXT STEPS                                    │
│    • Request explicit approval                             │
│    • Share high-level timeline                             │
│    • Make any outstanding asks                             │
└─────────────────────────────────────────────────────────────┘
```

### Rules of Engagement

Set these expectations upfront:
- [ ] Respect order of material—avoid skipping ahead
- [ ] Questions/feedback at end of each section
- [ ] Leaders focus on their area of expertise
- [ ] Clarify if feedback is a blocker, comment, or suggestion

### Deep Dive Content

**Strategic Fit:** Show how project ladders to team → product → company strategy → mission. Get additional context on why this is particularly important (or not) right now.

**User Value:** Spend the most time here. Walk through full User Value Map. Be prepared to discuss:
- Specific interviews and what you learned
- Key themes across interviews
- Compelling quotes

**Gusto Example Quote for Product Review:**
> "My biggest fear is that my employee's personal data gets compromised. Whatever onboarding solution we go with will have to have secure data storage."
> — Joseph, CEO of seed-stage startup

**Business Value:**
- Qualitative and quantitative goals
- Proxies and assumptions used
- Key stakeholders (decision-makers vs. informed)

### Approval Outcomes

| Outcome | What It Means | Next Steps |
|---------|---------------|------------|
| **Green light** | Proceed as proposed | Document agreement, move to design |
| **Yellow light** | Proceed with adjustments | Document changes, schedule follow-up review |
| **Red light** | Project deprioritized | Get clear reasons, pivot or archive |

> "The product review is a contract between you and the leadership team agreeing on the work to be done. When questions come up in the future, you refer back to the contract."
> — Anand

### Post-Approval Timeline Milestones

| Milestone | Description |
|-----------|-------------|
| Project update | Align design team on goals and context (week after review) |
| Design phase | Brainstorm, design, prototype potential solutions |
| Development | Build and test before launch |
| Launch prep | Preparation period leading to launch date |
| Post-launch | Measure performance, inform next iteration |

### Product Review Tips

| Tip | Rationale |
|-----|-----------|
| **Be succinct** | Share only most important info; do 2 rounds of prep, cut 25% second time |
| **Shadow first** | Learn your company's format and expectations before leading your own |
| **Align with manager beforehand** | Avoid surprises, especially if you disproved a strongly-held hypothesis |

---

## Action Items

### For Opportunity Validation (Immediate)

- [ ] Schedule manager briefing for new projects
- [ ] Document hypotheses using three-component framework
- [ ] Identify target interview audience using 3-step process
- [ ] Calculate recruitment numbers (6 per segment × screening math)

### For User Research (Short-term)

- [ ] Build interview guide using Trail Guide framework
- [ ] Practice warm-up phase to avoid common pitfalls
- [ ] Create debriefing template for post-interview synthesis
- [ ] Complete User Value Map after interview campaign

### For Business Validation (Strategic)

- [ ] Build relevant funnel type for your project
- [ ] Identify internal and external proxy metrics
- [ ] Prepare product review using four-part structure
- [ ] Codify learnings in PRD for design handoff

---

## Critical Gaps & Limitations

| Gap | Implication |
|-----|-------------|
| Templates referenced but not included | Need to source Manager Briefing, User Value, Business Value templates separately |
| Examples from specific industries | Lyft/Gusto/Grubhub examples may need adaptation for other contexts |
| Assumes access to users | B2B or early-stage companies may struggle with recruitment |
| Funnel data availability varies | Some companies lack instrumentation for step-by-step tracking |
| Product review culture differs | Some orgs are more formal (Amazon 6-pagers) vs informal (startup ad hoc) |

---

## Templates Reference

| Template | Purpose | When to Use |
|----------|---------|-------------|
| **Manager Briefing Template** | Document strategic fit, user value, business value hypotheses | Step 1: Before any validation work |
| **Refine User Value Template** | Interview audience, conducting interviews, debrief, synthesis tabs | Step 2: During user research |
| **Refine Business Value Template** | Funnel building, magnitude calculation, proxy estimation | Step 3: During business analysis |
| **Product Review Meeting Template** | Structure the approval meeting | Step 4: Presenting to leadership |
| **Product Review Notes Template** | Capture feedback, action items, decisions | Step 4: During/after meeting |
| **PRD (Product Requirements Document)** | Single source of truth for the opportunity | After product review approval |

---

## Appendix: Key Quotes

| Quote | Source | Context |
|-------|--------|---------|
| "I've seen lots of user interviews go sideways because they are an awkward environment for users." | Anand | On importance of warm-up phase |
| "I want to make sure they know this isn't a test." | Anand | Setting interview expectations |
| "If we had only talked to hosts in the U.S., we would have gotten a biased view of the problem." | JZ | On importance of diverse interview audience |
| "You want to make sure your dependency team leaders are giving feedback in their area of expertise only." | JZ | On keeping product reviews focused |
| "You should be the most junior person in your product review." | Anand | On keeping meeting audience tight |
| "The product review is a contract between you and the leadership team." | Anand | On using review as reference point |
| "Do 2 rounds of product review prep: develop the content first, then make it 25% shorter." | Anand | On being succinct in reviews |

---

## Appendix: Lyft Destination Mode - Full Case Study

### Context
The Driver Experience team wanted to improve the end-of-session experience for drivers returning to suburban/rural areas.

### Validation Journey

| Step | Action | Finding |
|------|--------|---------|
| **Manager Briefing** | Documented strategic fit, user/business hypotheses | Part-time suburban drivers struggle to find rides home; 75% of driver population affected |
| **User Value** | Validated through user interviews | High severity (frustrating + costly); poor alternatives (drive home earning nothing or keep canceling) |
| **Business Value** | Built feature funnel, found 4% unexpected drop-off at step 4 | Used "view destination" feature as proxy (caused 3% increase in cancellations) |
| **Estimate** | Applied proxy conservatively | Predicted 1.5% reduction in cancellations |
| **Outcome** | Launched Destination Mode | Became one of Lyft's most impactful differentiating features |

### Key Learnings
- Unexpected drop-offs (not just biggest) often reveal opportunities
- Internal proxies from related features provide reasonable estimates
- Conservative estimates (50% of proxy) account for edge cases
