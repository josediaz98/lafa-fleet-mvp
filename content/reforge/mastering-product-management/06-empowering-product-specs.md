# Empowering Product Specs: Directing, Not Managing
> Reforge Program | Based on experiences from Slack, LinkedIn, Notejoy, TripAdvisor, Tinder

## Source

| Type | Title | Platform |
|------|-------|----------|
| Course | Mastering Product Management - Empowering Product Specs | Reforge |

**Contributors:** Fareed Mosavat (Slack/Pixar), Sachin Rekhi (LinkedIn/Notejoy), Ravi Mehta (Tinder)

---

## Executive Summary

Product specs fail to create leverage when written at either extreme: **too prescriptive** (micromanaging every detail, stifling team creativity) or **too high-level** (forcing endless ad hoc meetings to clarify what should have been documented). The empowering middle ground follows a simple principle: **invest heavily in context, own only essential implementation details**.

Great PMs operate like film directors—they set overall direction and create space for creativity rather than controlling every decision. This means the Context section (opportunity, target audience, customer insights, competitive insights, success metrics) should be comprehensive enough that team members can make smart trade-offs independently. Meanwhile, the Implementation section (scope, experience, implementation details, launch plan, investigative metrics) should specify only what's necessary, leaving micro-decisions to designers and engineers.

The key insight is that being too prescriptive doesn't just waste PM time—it actively disempowers the team. A designer given exact instructions will implement exactly what you said, no more, no less, eliminating the chance for their creative contribution. Conversely, being too high-level doesn't save time—it creates time debt through constant clarification meetings.

---

## Chapter 1: The Empowering Principle

### The Movie Director Analogy

Building products is like making movies:
- Multiple specialists (designers, engineers, PMs) orchestrated toward unified delivery
- Same principles for greatness apply

> "Great PMs direct their product, not manage it. They empower their team to make decisions, instead of dictating each decision."
> — Fareed Mosavat, former Director of Product at Slack, former Technical Director at Pixar

### The Two Disempowering Extremes

**Extreme 1: Too Prescriptive**

| Problem | Consequence |
|---------|-------------|
| Documents every edge case, dictates exact user flows | Takes time from strategic work |
| Pins down each micro-decision | Stifles team creativity |

> "Being too prescriptive isn't just bad because it takes extra time as a PM, but also because it stifles creativity from your team."
> — Fareed Mosavat

> "A designer who is given exact details on what to implement will likely implement exactly what you said, no more, no less."
> — Ravi Mehta, former Chief Product Officer at Tinder

**Extreme 2: Too High-Level**

| Problem | Consequence |
|---------|-------------|
| List of requirements only, no context | Generates more work overall (ad hoc meetings) |
| Rarely updated | Engineering rework when requirements emerge late |

**Example:** Marketing needs to know target audience and key benefits to market properly. High-level spec forces 1:1 meeting. Well-written spec with detailed target audience lets them self-serve.

### The Empowering Formula

```
Empowering Spec = Heavy Context Investment + Minimal Implementation Ownership
```

| Section Type | Empowering Approach |
|--------------|---------------------|
| **Context** | More detail than most PMs provide |
| **Implementation** | Less detail than most PMs provide |

**Why this works:**
- Extra context → team has information to make great decisions
- Loose implementation → team has space and permission to make those decisions

### Product Spec Structure

```
CONTEXT (heavy investment)
├── Opportunity
├── Target Audience
├── Customer Insights
├── Competitive Insights
└── Success Metrics

IMPLEMENTATION (essential details only)
├── Scope
├── Experience
├── Implementation Details
├── Launch Plan
└── Investigative Metrics

FAQ (decision log)
└── Key decisions + rationale
```

---

## Chapter 2: Writing Empowering Context

### Section 1: Opportunity

**Also called:** Problem Statement, User Problem

**What it should explain:**
1. What problem you're solving
2. Why you're prioritizing solving it (which 4D lens it advances)

**Too High-Level Example (Notejoy Offline):**
> "We're solving offline support because people sometimes have issues accessing the internet when they want to capture notes."

*Problem: Team doesn't know why feature is prioritized → can't make trade-offs.*

**Too Prescriptive Example:**
> "Our offline scenarios we're solving for are cafés and airplanes."

*Problem: Discourages team from identifying other relevant scenarios.*

**Empowering Example:**

| Lens | How Offline Support Advances It |
|------|--------------------------------|
| **Strategy** | Drives upsells as premium feature (monetization); Advances sub-value prop "capture at speed of thought" |
| **Customer** | #1 requested feature in FSOR; Top cancellation reason |

**How this empowers:**
- Designer knows to design compelling upsell experience (not just offline UX)
- Engineering knows speed improvement is worth investment (even when online)

### Case Study: TripAdvisor Mobile Navigation

| If prioritized for... | Navigation would focus on... |
|----------------------|------------------------------|
| Revenue (business lens) | Shopping categories (flights, hotels) |
| Trip planning (strategy lens) | Functional tasks (Search, My Trips) |

**Actual priority:** Strategy lens (best trip planning app for pre-travel and in-destination)

**Result:** Navigation built around functional tasks, not shopping.

### Case Study: LinkedIn Sales Navigator News Feed Redesign

**Typical detail:** "We are doing a homepage news feed redesign."

**Empowering detail:** Redesign prioritized to:
1. Deepen sub-value prop of building great relationships (strategy)
2. Improve WAUs (business)

**How this empowers:** Design team considers relationship-building stories, not just high-click-rate stories.

---

### Section 2: Target Audience

**Common mistake:** Stating general product audience instead of specific sub-audience for the feature.

**Why specificity matters:**

| Audience Type | Implementation Implication |
|---------------|---------------------------|
| Power users | Want high customizability |
| Casual users | Don't want any customization |

**Too High-Level Example (Notejoy Offline):**
> "An end user of Notejoy"

**Empowering Example:**
> "Power users who use Notejoy for personal productivity (as opposed to collaboration)"

**How this empowers:**

| Distinction | Design Decision |
|-------------|-----------------|
| Power vs. casual | Design for customizability (power users want to tailor settings) |
| Productivity vs. collaboration | Support offline starring (productivity), not offline commenting (collaboration) |

### Case Study: LinkedIn Sales Navigator News Feed

**Typical:** "All Sales Navigator users"

**Empowering:** "Primarily for account executives, but should also serve account managers too"

**Why this matters:** Traditionally served only account executives. Signal that expanding to account managers.

**Result:** Design decision to include insights on non-saved leads (account manager need) → better AM experience.

---

### Section 3: Customer Insights

**Purpose:** Create user empathy and context for engineering team.

**Common mistake:** Simply linking to all original user research recordings.

*Problem: Forces engineering (high-leverage on code) to synthesize insights (low-leverage for them).*

**Empowering approach:** Summarize most relevant research into key themes + direct customer quotes.

**What makes a good insight:**

| Attribute | Definition |
|-----------|------------|
| **Counterintuitive** | Differs from default assumption |
| **Material** | Significantly changes problem definition or implementation |

### Case Study: Notejoy Offline — Intermittent Connectivity

**Insight:** Many users wanting offline support aren't "fully offline" (airplane) but "intermittently offline" (spotty home WiFi).

| Test | Result |
|------|--------|
| Counterintuitive? | Yes — assumed fully offline was only scenario |
| Material? | Yes — intermittent sync requires completely different architecture |

### Case Study: LinkedIn Sales Navigator — Filter Motivation

**User request:** Filter to adjust what appears on homepage.

**Insight discovered:** Users wanted filter partly because each news feed block was large → few items per page → lots of scrolling. Filter would let them scroll less.

| Test | Result |
|------|--------|
| Counterintuitive? | Yes — thought filters were only about relevance |
| Material? | Yes — needed to solve separate problem: condense news feed item size |

---

### Section 4: Competitive Insights

**Purpose:** Provide inspiration and identify differentiation opportunities.

| Value | Description |
|-------|-------------|
| **Inspiration** | How others solved the problem → ideas for your implementation |
| **Differentiation** | Competitor shortcomings → opportunities to stand out |

**Common mistake:** Only describing how competitors implement their feature (no differentiation insight).

*Problem: If you just copy competitors, you keep all their pain points.*

**Empowering approach:**
1. Research competitors to identify differentiation opportunities
2. Look beyond direct competitors to cutting-edge companies in other industries

### Case Study: Notejoy Offline Research

**Direct competitors researched:**
- Evernote (cumbersome, unintuitive manual sync)
- Google Docs

**Indirect inspiration researched:**
- Pocket (instant sync, background sync even when app closed)
- Trello (preloads starred boards, makes everything faster online and offline)

**Differentiation identified:** Evernote failed at seamless experience → opportunity for Notejoy.

### Three Research Avenues

| Avenue | Method | Advantage | Disadvantage | Supplement With |
|--------|--------|-----------|--------------|-----------------|
| **1. Marketing & Help Articles** | Read competitor docs | Quick high-level overview of functionality | Won't reveal pain points | Avenue 2 |
| **2. Reviews** | Forums, App Store, G2 Crowd | Pain points clearly stated | No insight into *why* it's frustrating | Avenue 3 |
| **3. Sign Up & Use** | Actually try competitor product | Clearest understanding for differentiation | Time-consuming, not always feasible (enterprise pricing) | — |

**Example (Avenue 2):** Evernote forums had many complaints about cumbersome sync → Notejoy PM identified opportunity for seamless offline.

---

### Section 5: Success Metrics

**Purpose:** Clarify primary outcome metrics to improve.

**Common mistake:** Laundry list of all metrics that might change, with no prioritization.

*Problem: Team can't make trade-offs without knowing what matters most.*

**Empowering approach:**

| Metric Type | Definition |
|-------------|------------|
| **Prioritized** | Very narrow subset to optimize for |
| **Deprioritized** | Metrics you explicitly don't care about affecting |
| **Guardrail** | Metrics you specifically do NOT want to worsen |

### Case Study: Notejoy Offline Metrics

**Typical (non-empowering):** Full list of all metrics offline might move.

**Empowering:**

| Category | Metrics |
|----------|---------|
| Prioritized | D7 retention, Weekly new bookings |
| Deprioritized | Feature usage (weekly users of offline feature) |
| Guardrail | NPS |

**How this empowers:**

| Insight | Design Decision |
|---------|-----------------|
| Weekly new bookings = priority | Create compelling upsell experience; keep offline notification banner (intrusive for free users, drives upsells) |
| Feature usage = deprioritized | Don't worry about feature discoverability |
| NPS = guardrail | Ensure offline doesn't negatively impact experience |

### Case Study: LinkedIn Sales Navigator News Feed Metrics

| Category | Metrics |
|----------|---------|
| Prioritized | Total actions taken from feed (inmails, likes, saves) |
| Deprioritized | Total newsfeed views |
| Guardrail | "Who viewed my profile" page views |

**How this empowers:**

| Insight | Decision |
|---------|----------|
| Actions > views | Dynamically change each item's action bar based on desired action; Score relevancy by actions, not revisits |
| Guardrail on profile views | Protect major engagement driver |

---

## Chapter 3: Writing Empowering Implementation

### Section 6: Scope

**What it is:** Individual functional requirements needed for full feature experience.

**Too Prescriptive Example (Notejoy Offline):**
> "Allow users to create new notes offline. Each new note should be immediately searchable, and immediately reference-able by other notes. Additionally, each note should say in the top-right whether it is already sync'd to the central server or not."

*Problem: PM attempting to lock down micro-decisions → reduces team contribution.*

**Too Loose Problem:** Omitting future functionality creates engineering rework risk (architecture decisions can't be easily changed).

**Empowering approach:**

| Principle | Example |
|-----------|---------|
| Write only functionality needed, not how it should work | "Create new notes offline" (not searchability/sync status details) |
| Use lightweight format (bullet points, not full user stories) | Skip "As a [user], I want [functionality], because [reason]" — user and reason already in other sections |
| Call out future functionality | Label as "now / next / later" so engineering can plan |

**Why skip full user story format:**
1. [User] and [reason] already covered in Target Audience and Customer Insights
2. Full format makes you less likely to keep Scope updated → risk of forgotten requirements

### Case Study: Notejoy Scope Phasing

| Phase | Functionality |
|-------|---------------|
| **Now** | View notes offline, Edit notes offline |
| **Later** | Support offline on iOS and Android (in addition to desktop) |

### Case Study: LinkedIn Sales Navigator Scope Phasing

| Phase | Functionality |
|-------|---------------|
| **v1** | Filter by story type |
| **Later** | Filter by subject |

---

### Section 7: Experience

**What it is:** What the user experience should look and feel like.

**Common mistake:** PM co-owns Experience with designer → unclear ownership → designer defers to PM.

> "As we advance as product leaders, our instincts drive us towards more specificity, more prescriptiveness, but the opposite is what you need to do."
> — Fareed Mosavat

**Empowering approach:**

| Principle | Implementation |
|-----------|----------------|
| Have design team fully own Experience section | PM gives input and states goals; designer owns wireframes and micro-decisions |
| State design goals, not specific details | "Provide consistent easy way for users to pivot between destinations" (not exactly how) |
| Use annotated wireframes, not text-only | Text can be interpreted differently; wireframes align everyone |

> "Having design be the sole writer and illustrator for Experience helps creates a greater feeling of ownership, leading to more input from them."
> — Sachin Rekhi

### Case Study: TripAdvisor Mobile Experience

**Text-only problem:** "Excel throughout the travel lifecycle" could mean:
- Easy booking platform for tours
- Lots of reviews to help decisions

**Solution:** Annotated low-fidelity wireframes → team directly aligned on feel of UX. Design owned micro-decisions as fidelity increased.

---

### Section 8: Implementation Details

**What it is:** Technical details that impact feature implementation.

**Common mistake (technical PMs):** Defining technologies, error codes, etc.

*Problem: Engineering often knows trade-offs and efficiency better.*

**Empowering approach:** Define technical details only when they significantly alter user experience.

### Case Study: LinkedIn Sales Navigator News Feed

| PM Decided | Engineering Decided |
|------------|---------------------|
| What factors affect items shown | Algorithm to weight each factor |
| Events triggering refresh | Optimization details |
| Refresh frequency | — |

**Why PM owned refresh frequency:** Directly affects user experience.

---

### Section 9: Launch Plan

**What it is:** Roll-out process and rough timeline for feature release.

**Common mistake:** Plan to release to full audience at once.

**Problems:**
1. High cost of failure (difficult rollback)
2. Engineering can't plan for server load or A/B test infrastructure

**Empowering approach:** Detail roll-out plan including rough user counts per phase and approximate duration.

**Three Common Launch Types:**

| Type | Description |
|------|-------------|
| **A/B Testing** | Random small sample gets feature first |
| **Beta Testing** | Opt-in users get feature first |
| **Soft Launch** | Released but not announced (organic discovery limits server stress) |

### Case Study: LinkedIn Sales Navigator Launch Phases

| Phase | Description |
|-------|-------------|
| 1. A/B Test | 25%/75% split to measure metric improvement |
| 2. Admin Training | Brief company admins on changes (unique need based on past complaints) |
| 3. 100% Launch | Release to everyone |

### Case Study: TripAdvisor Mobile Regional Rollout

**Risk mitigated:** Release to Latin America first → catch major design flaws → fix before releasing to rest of world.

---

### Section 10: Investigative Metrics

**What it is:** Metrics to instrument as part of implementation for future decision-making.

**Common mistake:** Not thinking about this section at all.

*Problem: When you need to make feature decisions later, data isn't available. Engineering may not be able to easily add instrumentation retroactively.*

**Empowering approach:** Plan ahead. Think about questions you'll want to answer and metrics needed.

**Three Question Categories:**

| Category | Question Type | Measurement Approach | Notejoy Example |
|----------|---------------|---------------------|-----------------|
| **Usage** | "How often is this feature used?" | Track user interactions | Status changes from online to offline (frequency + duration) |
| **Functionality Additions** | "What do users want to do that they can't?" | Track signals of user intent | Attempts to view password-protected notes offline |
| **UX Improvements** | "Where can I improve UX?" | Track key UX touchpoints | How often users press "Sync now" button (gauges if auto-sync is frequent enough) |

---

### Section 11: FAQ

**What it is:** Major decisions made during spec development + rationale.

**Common mistake:** Not including this section; addressing questions in ad hoc meetings.

*Problem: Eventually spend more time defending decisions repeatedly than documenting would have taken.*

**Empowering approach:** Document contentious decisions with key rationale.

### Case Study: LinkedIn Sales Navigator Filters Debate

**Debate:** Should news feed have filters? Some said filters = complicated UX; others said = better UX.

**Decision:** Include filters.

**Without FAQ:** Ongoing questions require re-explaining conversations and how executive team approved.

**With FAQ:** Point to documented rationale; limit repetition.

### Case Study: Notejoy Browser Support

**FAQ:** Which browsers will offline support work in?

**Decision:** Chrome, Safari, Firefox, Edge only.

**Rationale:** Internet Explorer and Opera don't fully support required browser technologies.

---

## Chapter 4: The Iterative Writing Process

### Spec Writing Is Non-Linear

Write first drafts as soon as you have enough information; update as knowledge evolves.

### Phases and Section Timing

| Phase | What You're Doing | Sections to Write/Update |
|-------|-------------------|--------------------------|
| **Opportunity Identification** | Deciding to work on feature | Opportunity, Success Metrics (first drafts) |
| **Research** | User research, competitive analysis | Target Audience, Customer Insights, Competitive Insights (first drafts) |
| **Research → Design/Implementation** | Refining understanding | All Context sections (refinement) |
| **Design/Implementation Iteration** | Building the feature | Scope, Experience, Implementation Details |
| **Reviews** | Getting sign-off | Launch Plan, Investigative Metrics |
| **Ongoing** | Each major decision | FAQ (continuous updates) |

```
Effort Over Time:

Opportunity ID    ████░░░░░░░░░░░░
Research          ░░████████░░░░░░
Design/Impl       ░░░░░░████████░░
Reviews           ░░░░░░░░░░░░████

Context sections: ████████████░░░░
Impl sections:    ░░░░░░████████░░
FAQ:              ░░░░████████████
```

---

## Chapter 5: Case Studies Index

### By Section

| Section | Company | Key Learning |
|---------|---------|--------------|
| **Opportunity** | TripAdvisor | Navigation design depends on which lens is prioritized |
| **Opportunity** | Notejoy | Stating lenses empowers upsell design + speed investment |
| **Opportunity** | LinkedIn Sales Navigator | Context on relationship-building affects story selection |
| **Target Audience** | Notejoy | Power vs. casual, productivity vs. collaboration |
| **Target Audience** | LinkedIn Sales Navigator | Expanding to account managers → non-saved lead insights |
| **Customer Insights** | Notejoy | Intermittent offline (counterintuitive, material) |
| **Customer Insights** | LinkedIn Sales Navigator | Filter motivation included scroll reduction |
| **Competitive Insights** | Notejoy | Evernote pain points, Pocket/Trello inspiration |
| **Success Metrics** | Notejoy | Prioritized bookings, deprioritized feature usage |
| **Success Metrics** | LinkedIn Sales Navigator | Actions > views, guardrail on profile views |
| **Scope** | Notejoy | Now/next/later phasing for platforms |
| **Scope** | LinkedIn Sales Navigator | v1 vs. later filter functionality |
| **Experience** | TripAdvisor | Wireframes vs. text-only alignment |
| **Implementation Details** | LinkedIn Sales Navigator | PM owns refresh frequency, eng owns algorithm |
| **Launch Plan** | LinkedIn Sales Navigator | A/B → admin training → 100% |
| **Launch Plan** | TripAdvisor | Regional rollout for risk mitigation |
| **Investigative Metrics** | Notejoy | Usage, intent signals, UX touchpoints |
| **FAQ** | LinkedIn Sales Navigator | Filter decision rationale |
| **FAQ** | Notejoy | Browser support rationale |

---

## Chapter 6: Framework Integration

### How Empowering Specs Connect to Other Deliverables

```
4D Roadmaps (Module 5)
       ↓
Identifies initiatives to build
       ↓
Empowering Product Specs (This Module)
       ↓
Guides implementation with context + essential details
       ↓
OKR Loops
       ↓
Tracks execution and learning
       ↓
Decision Architecture (Next Module)
       ↓
Aligns stakeholders on spec decisions
```

### Connection to 4D Roadmaps

The **Opportunity** section directly references which of the 4 lenses (Strategy, Vision, Customer, Business) the feature advances. This is the bridge between roadmap prioritization and spec writing.

---

## Quick Reference: Empowering Specs Cheat Sheet

### Context Sections (Invest Heavily)

| Section | Empowering Approach | Avoid |
|---------|---------------------|-------|
| **Opportunity** | State problem + which 4D lens it advances | Just "what" without "why prioritized" |
| **Target Audience** | Specific sub-audience + key differences from other segments | General product audience |
| **Customer Insights** | Themes + quotes; counterintuitive + material | Links to raw recordings |
| **Competitive Insights** | Differentiation opportunities + indirect inspiration | Just describing competitor implementation |
| **Success Metrics** | Prioritized + deprioritized + guardrail | Unprioritized laundry list |

### Implementation Sections (Essential Details Only)

| Section | Empowering Approach | Avoid |
|---------|---------------------|-------|
| **Scope** | Functionality only (not how); bullet points; now/next/later | Full user stories; micromanaging behavior |
| **Experience** | Design owns; PM states goals; wireframes | PM co-owns; text-only descriptions |
| **Implementation Details** | Only what affects UX significantly | Dictating technologies/algorithms |
| **Launch Plan** | Rollout phases with user counts and timing | All-at-once release |
| **Investigative Metrics** | Questions you'll want to answer + metrics to instrument | Not thinking about future data needs |

### FAQ

| Empowering Approach | Avoid |
|---------------------|-------|
| Document contentious decisions + rationale | Handling all questions ad hoc |

### Good Customer Insight Test

- [ ] **Counterintuitive:** Differs from default assumption?
- [ ] **Material:** Significantly changes problem or implementation?

### Success Metrics Categories

- [ ] **Prioritized:** What must improve
- [ ] **Deprioritized:** What you don't care about affecting
- [ ] **Guardrail:** What must not worsen

### Investigative Metrics Categories

- [ ] **Usage:** How often is feature used?
- [ ] **Functionality Additions:** What do users want to do that they can't?
- [ ] **UX Improvements:** Where can I improve UX?

---

## Action Items

### Immediate (This Week)
- [ ] Audit current spec: Is Opportunity section stating which 4D lens the feature advances?
- [ ] Check Target Audience: Is it the specific sub-audience or generic product audience?
- [ ] Review Success Metrics: Are they prioritized, or an unprioritized list?

### Short-Term (This Month)
- [ ] Add Customer Insights section with counterintuitive/material insights + quotes
- [ ] Research competitors using all three avenues (docs, reviews, direct use)
- [ ] Convert Scope from user stories to lightweight bullet points with now/next/later phasing
- [ ] Transition Experience section ownership to design team

### Strategic (This Quarter)
- [ ] Establish spec template with all 11 sections as team standard
- [ ] Create Investigative Metrics plan for each major feature
- [ ] Build FAQ habit: document each contentious decision when made
- [ ] Define launch plan categories (A/B, beta, soft launch) for different feature types

### Ongoing Practices
- [ ] Per feature: Write Opportunity and Success Metrics in opportunity identification phase
- [ ] Per research round: Update Target Audience, Customer Insights, Competitive Insights
- [ ] Per decision: Add to FAQ with rationale
- [ ] Pre-launch: Confirm Investigative Metrics instrumented

---

## Critical Gaps & Limitations

### What This Module Doesn't Cover

1. **Stakeholder review process** — How to get sign-off on specs
2. **Spec tools** — Which software/templates to use
3. **Cross-functional coordination** — How to sync spec with eng tech specs
4. **Spec maintenance** — How to keep specs updated post-launch
5. **Team dynamics** — How to transition from prescriptive to empowering culture

### Questions for Future Exploration

- How do you calibrate "empowering" level for different team experience levels?
- When is being prescriptive actually necessary (new team members, high-stakes features)?
- How do you handle disagreements when design owns Experience?
- What's the right spec detail level for different feature sizes?

---

## Key Maxims

> "Great PMs direct their product, not manage it. They empower their team to make decisions, instead of dictating each decision."
> — Fareed Mosavat

> "A designer who is given exact details on what to implement will likely implement exactly what you said, no more, no less."
> — Ravi Mehta

> "Having design be the sole writer and illustrator for Experience helps creates a greater feeling of ownership, leading to more input from them."
> — Sachin Rekhi

**The empowering spec formula:**
- **Context:** More than most PMs provide
- **Implementation:** Less than most PMs provide
- **Result:** Team has information to decide + space to decide
