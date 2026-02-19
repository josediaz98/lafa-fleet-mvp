# Empowering Product Specs Framework

> Developed by Sachin Rekhi (LinkedIn/Notejoy), Fareed Mosavat (Slack/Pixar), and Ravi Mehta (Tinder)

## The Empowering Principle

Product specs fail to create leverage when written at either extreme: **too prescriptive** (micromanaging every detail, stifling team creativity) or **too high-level** (forcing endless ad hoc meetings to clarify what should have been documented). The empowering middle ground follows a simple principle: **invest heavily in context, own only essential implementation details**.

### The Movie Director Analogy

Building products is like making movies: multiple specialists (designers, engineers, PMs) must be orchestrated toward unified delivery. The same principles for greatness apply.

> "Great PMs direct their product, not manage it. They empower their team to make decisions, instead of dictating each decision."
> — Fareed Mosavat, former Director of Product at Slack, former Technical Director at Pixar

### The Two Disempowering Extremes

**Extreme 1: Too Prescriptive (The "Puppet Master")**

| Problem | Consequence |
|---------|-------------|
| Documents every edge case, dictates exact user flows | Takes time from strategic work |
| Pins down each micro-decision | Stifles team creativity |

> "Being too prescriptive isn't just bad because it takes extra time as a PM, but also because it stifles creativity from your team."
> — Fareed Mosavat

> "A designer who is given exact details on what to implement will likely implement exactly what you said, no more, no less."
> — Ravi Mehta, former Chief Product Officer at Tinder

**Extreme 2: Too High-Level (The "Absentee")**

| Problem | Consequence |
|---------|-------------|
| List of requirements only, no context | Generates more work overall (ad hoc meetings) |
| Rarely updated | Engineering rework when requirements emerge late |

**Example:** Marketing needs to know target audience and key benefits to market properly. A high-level spec forces a 1:1 meeting. A well-written spec with detailed target audience lets them self-serve.

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

---

## Product Spec Structure

The spec is organized into 11 sections plus an FAQ, split between Context and Implementation:

```
CONTEXT (heavy investment)
├── 1. Opportunity
├── 2. Target Audience
├── 3. Customer Insights
├── 4. Competitive Insights
└── 5. Success Metrics

IMPLEMENTATION (essential details only)
├── 6. Scope
├── 7. Experience
├── 8. Implementation Details
├── 9. Launch Plan
└── 10. Investigative Metrics

FAQ (decision log)
└── 11. Key decisions + rationale
```

---

## Context Sections (Invest Heavily)

### Section 1: Opportunity

**Also called:** Problem Statement, User Problem

**What it should explain:**
1. What problem you're solving
2. Why you're prioritizing solving it (which strategic lens it advances)

The four strategic lenses (from the 4D Roadmaps framework):
- **Strategy:** Advances a core strategic initiative or sub-value proposition
- **Vision:** Moves toward the long-term product vision
- **Customer:** Responds to top customer requests or pain points
- **Business:** Drives revenue, reduces costs, or improves business metrics

#### What Makes It Empowering vs. Not

**Too High-Level:**
> "We're solving offline support because people sometimes have issues accessing the internet when they want to capture notes."

*Problem:* Team doesn't know why feature is prioritized → can't make trade-offs.

**Too Prescriptive:**
> "Our offline scenarios we're solving for are cafes and airplanes."

*Problem:* Discourages team from identifying other relevant scenarios.

**Empowering:**
States which lens(es) the feature advances and why, so the team understands the strategic motivation:

| Lens | How Offline Support Advances It |
|------|--------------------------------|
| **Strategy** | Drives upsells as premium feature (monetization); Advances sub-value prop "capture at speed of thought" |
| **Customer** | #1 requested feature in FSOR; Top cancellation reason |

**How this empowers:**
- Designer knows to design compelling upsell experience (not just offline UX)
- Engineering knows speed improvement is worth investment (even when online)

---

### Section 2: Target Audience

**Common mistake:** Stating the general product audience instead of the specific sub-audience for this feature.

**Why specificity matters:**

| Audience Type | Implementation Implication |
|---------------|---------------------------|
| Power users | Want high customizability |
| Casual users | Don't want any customization |

#### What Makes It Empowering vs. Not

**Too High-Level:**
> "An end user of Notejoy"

**Empowering:**
> "Power users who use Notejoy for personal productivity (as opposed to collaboration)"

**How this empowers:**

| Distinction | Design Decision |
|-------------|-----------------|
| Power vs. casual | Design for customizability (power users want to tailor settings) |
| Productivity vs. collaboration | Support offline starring (productivity), not offline commenting (collaboration) |

---

### Section 3: Customer Insights

**Purpose:** Create user empathy and context for the engineering team.

**Common mistake:** Simply linking to all original user research recordings.

*Problem:* Forces engineering (high-leverage on code) to synthesize insights (low-leverage for them).

**Empowering approach:** Summarize most relevant research into key themes + direct customer quotes.

#### The Good Insight Test

Every insight included should pass two tests:

| Attribute | Definition |
|-----------|------------|
| **Counterintuitive** | Differs from the default assumption |
| **Material** | Significantly changes problem definition or implementation |

If an insight is neither counterintuitive nor material, it doesn't add value to the spec — the team would have assumed it anyway.

---

### Section 4: Competitive Insights

**Purpose:** Provide inspiration and identify differentiation opportunities.

| Value | Description |
|-------|-------------|
| **Inspiration** | How others solved the problem → ideas for your implementation |
| **Differentiation** | Competitor shortcomings → opportunities to stand out |

**Common mistake:** Only describing how competitors implement their feature (no differentiation insight).

*Problem:* If you just copy competitors, you keep all their pain points.

**Empowering approach:**
1. Research competitors to identify differentiation opportunities
2. Look beyond direct competitors to cutting-edge companies in other industries

#### Three Research Avenues

| Avenue | Method | Advantage | Disadvantage | Supplement With |
|--------|--------|-----------|--------------|-----------------|
| **1. Marketing & Help Articles** | Read competitor docs | Quick high-level overview of functionality | Won't reveal pain points | Avenue 2 |
| **2. Reviews** | Forums, App Store, G2 Crowd | Pain points clearly stated | No insight into *why* it's frustrating | Avenue 3 |
| **3. Sign Up & Use** | Actually try competitor product | Clearest understanding for differentiation | Time-consuming, not always feasible (enterprise pricing) | — |

---

### Section 5: Success Metrics

**Purpose:** Clarify primary outcome metrics to improve.

**Common mistake:** Laundry list of all metrics that might change, with no prioritization.

*Problem:* Team can't make trade-offs without knowing what matters most.

#### The Three Metric Categories

| Metric Type | Definition |
|-------------|------------|
| **Prioritized** | Very narrow subset to optimize for |
| **Deprioritized** | Metrics you explicitly don't care about affecting |
| **Guardrail** | Metrics you specifically do NOT want to worsen |

**Why all three matter:**
- **Prioritized** tells the team what to optimize for
- **Deprioritized** gives permission to ignore certain metrics (prevents over-optimization)
- **Guardrail** protects important existing metrics from degradation

---

## Implementation Sections (Essential Details Only)

### Section 6: Scope

**What it is:** Individual functional requirements needed for full feature experience.

#### What Makes It Empowering vs. Not

**Too Prescriptive:**
> "Allow users to create new notes offline. Each new note should be immediately searchable, and immediately reference-able by other notes. Additionally, each note should say in the top-right whether it is already synced to the central server or not."

*Problem:* PM attempting to lock down micro-decisions → reduces team contribution.

**Too Loose:** Omitting future functionality creates engineering rework risk (architecture decisions can't be easily changed later).

**Empowering approach:**

| Principle | Implementation |
|-----------|----------------|
| Write only functionality needed, not how it should work | "Create new notes offline" (not searchability/sync status details) |
| Use lightweight format (bullet points, not full user stories) | Skip "As a [user], I want [functionality], because [reason]" |
| Call out future functionality | Label as "Now / Next / Later" so engineering can plan architecture |

**Why skip full user story format:**
1. [User] and [reason] are already covered in Target Audience and Customer Insights
2. Full format makes you less likely to keep Scope updated → risk of forgotten requirements

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

---

### Section 8: Implementation Details

**What it is:** Technical details that impact feature implementation.

**Common mistake (technical PMs):** Defining technologies, error codes, etc.

*Problem:* Engineering often knows trade-offs and efficiency better.

**Empowering approach:** Define technical details only when they significantly alter user experience. Leave algorithm/architecture choices to engineering.

---

### Section 9: Launch Plan

**What it is:** Roll-out process and rough timeline for feature release.

**Common mistake:** Plan to release to full audience at once.

**Problems:**
1. High cost of failure (difficult rollback)
2. Engineering can't plan for server load or A/B test infrastructure

**Empowering approach:** Detail roll-out plan including rough user counts per phase and approximate duration.

#### Three Common Launch Types

| Type | Description |
|------|-------------|
| **A/B Testing** | Random small sample gets feature first |
| **Beta Testing** | Opt-in users get feature first |
| **Soft Launch** | Released but not announced (organic discovery limits server stress) |

---

### Section 10: Investigative Metrics

**What it is:** Metrics to instrument as part of implementation for future decision-making.

**Common mistake:** Not thinking about this section at all.

*Problem:* When you need to make feature decisions later, data isn't available. Engineering may not be able to easily add instrumentation retroactively.

**Empowering approach:** Plan ahead. Think about questions you'll want to answer and metrics needed.

#### Three Question Categories

| Category | Question Type | Measurement Approach |
|----------|---------------|---------------------|
| **Usage** | "How often is this feature used?" | Track user interactions |
| **Functionality Additions** | "What do users want to do that they can't?" | Track signals of user intent |
| **UX Improvements** | "Where can I improve UX?" | Track key UX touchpoints |

---

### Section 11: FAQ

**What it is:** Major decisions made during spec development + rationale.

**Common mistake:** Not including this section; addressing questions in ad hoc meetings.

*Problem:* Eventually spend more time defending decisions repeatedly than documenting would have taken.

**Empowering approach:** Document contentious decisions with key rationale. Ask yourself: "What questions will stakeholders keep asking?"

---

## The Iterative Writing Process

Spec writing is non-linear. Write first drafts as soon as you have enough information; update as knowledge evolves.

### Phases and Section Timing

| Phase | What You're Doing | Sections to Write/Update |
|-------|-------------------|--------------------------|
| **Opportunity Identification** | Deciding to work on feature | Opportunity, Success Metrics (first drafts) |
| **Research** | User research, competitive analysis | Target Audience, Customer Insights, Competitive Insights (first drafts) |
| **Research → Design/Implementation** | Refining understanding | All Context sections (refinement) |
| **Design/Implementation Iteration** | Building the feature | Scope, Experience, Implementation Details |
| **Reviews** | Getting sign-off | Launch Plan, Investigative Metrics |
| **Ongoing** | Each major decision | FAQ (continuous updates) |

### Effort Distribution Over Time

```
Opportunity ID    ████░░░░░░░░░░░░
Research          ░░████████░░░░░░
Design/Impl       ░░░░░░████████░░
Reviews           ░░░░░░░░░░░░████

Context sections: ████████████░░░░
Impl sections:    ░░░░░░████████░░
FAQ:              ░░░░████████████
```

---

## Quick Reference: Empowering Specs Cheat Sheet

### Context Sections (Invest Heavily)

| Section | Empowering Approach | Avoid |
|---------|---------------------|-------|
| **Opportunity** | State problem + which strategic lens it advances | Just "what" without "why prioritized" |
| **Target Audience** | Specific sub-audience + key differences from other segments | General product audience |
| **Customer Insights** | Themes + quotes; counterintuitive + material | Links to raw recordings |
| **Competitive Insights** | Differentiation opportunities + indirect inspiration | Just describing competitor implementation |
| **Success Metrics** | Prioritized + deprioritized + guardrail | Unprioritized laundry list |

### Implementation Sections (Essential Details Only)

| Section | Empowering Approach | Avoid |
|---------|---------------------|-------|
| **Scope** | Functionality only (not how); bullet points; Now/Next/Later | Full user stories; micromanaging behavior |
| **Experience** | Design owns; PM states goals; wireframes | PM co-owns; text-only descriptions |
| **Implementation Details** | Only what affects UX significantly | Dictating technologies/algorithms |
| **Launch Plan** | Rollout phases with user counts and timing | All-at-once release |
| **Investigative Metrics** | Questions you'll want to answer + metrics to instrument | Not thinking about future data needs |

### FAQ

| Empowering Approach | Avoid |
|---------------------|-------|
| Document contentious decisions + rationale | Handling all questions ad hoc |

### Validation Checklist

- [ ] **Counterintuitive:** Customer insight differs from default assumption?
- [ ] **Material:** Customer insight significantly changes problem or implementation?
- [ ] **Prioritized metrics:** What must improve
- [ ] **Deprioritized metrics:** What you don't care about affecting
- [ ] **Guardrail metrics:** What must not worsen
- [ ] **Usage:** How often is feature used?
- [ ] **Functionality Additions:** What do users want to do that they can't?
- [ ] **UX Improvements:** Where can I improve UX?
