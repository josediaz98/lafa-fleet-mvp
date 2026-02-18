# Validating Riskiest Hypotheses

> Module 3 of Product Innovation Strategy — A comprehensive guide to deliberate risk validation using broad and targeted techniques to maximize runway and improve product strategy.

---

## Executive Summary

Building an MVP is not the best way to validate product strategy. MVPs are expensive, time-consuming, and don't comprehensively test all six dimensions of the PMF narrative. The deliberate approach sequences **broad validation techniques** (market research, expert advice, PMF interviews) to identify the riskiest dimensions, followed by **targeted validation techniques** (surveys, smoke tests, prototypes, pre-sales, product tests, growth tests) to de-risk specific hypotheses.

This sequenced approach maximizes runway by:
1. Minimizing upfront spend with cheaper broad techniques first
2. Quickly identifying and prioritizing risks (weeks vs. months/years)
3. Ensuring the right targeted technique is selected based on evidence

**Key principle**: "The very best product builders don't avoid risk. Instead they are deliberate about the risk they take on."

---

## Core Framework: Sequenced Risk Validation

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BROAD VALIDATION TECHNIQUES                       │
│         (Run in parallel — comprehensive, low-cost, fast)           │
├─────────────────┬─────────────────────┬─────────────────────────────┤
│ Market Research │   Expert Advice     │      PMF Interviews         │
│ (Analogs &      │ (Network + Analog/  │  (30-50 interviews across   │
│  Antilogs)      │  Antilog founders)  │   all customer segments)    │
└────────┬────────┴──────────┬──────────┴──────────────┬──────────────┘
         │                   │                         │
         └───────────────────┼─────────────────────────┘
                             ▼
              ┌──────────────────────────────┐
              │  OUTPUTS:                    │
              │  1. Riskiest dimension       │
              │  2. Updated PMF narrative    │
              └──────────────┬───────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   TARGETED VALIDATION TECHNIQUES                     │
│            (Select best-fit based on riskiest dimension)            │
├───────────┬───────────┬───────────┬──────────┬──────────┬───────────┤
│  Surveys  │  Smoke    │Prototypes │Pre-sales │ Product  │  Growth   │
│           │  Tests    │           │          │  Tests   │  Tests    │
└───────────┴───────────┴───────────┴──────────┴──────────┴───────────┘
```

---

## Part 1: Broad Validation Techniques

### 1.1 Market Research & Expert Advice

#### The Problem with Intuition

Teams often rely on subjective intuition to identify risks, missing critical dimensions. Example: Anywhere.FM's engineering-heavy team focused on competitive advantage (technology feasibility) while missing the larger business model risk (storage costs + ad revenue insufficiency).

#### Three-Step Process

| Step | Activity | Output |
|------|----------|--------|
| 1 | Market research via analogs/antilogs | Risk identification per dimension |
| 2 | Expert advice (from analog/antilog builders) | Gap filling + validation |
| 3 | Synthesize findings | Conviction levels + updated PMF narrative |

#### Analogs vs. Antilogs Framework

From John Mullins & Randy Komisar's *Getting to Plan B*:

| Type | Definition | Action |
|------|------------|--------|
| **Analogs** | Successful aspects of products | Worth mimicking |
| **Antilogs** | Failed aspects of products | Worth avoiding |

**Key insight**: The same product can provide both analogs and antilogs across different dimensions.

**Example — Patreon's Merch for Membership:**
- **Analog** (Problem to Solve): Creators already using Teespring, Shopify, Cotton Bureau → validates high-severity need
- **Antilog** (Business Model): Few merchandise companies built scaled products; Teespring struggling, Shopify using third-party integrations

#### Where to Find Analogs/Antilogs

Start with the **short-term competitive landscape map**:
- Direct competitors
- Indirect competitors
- Adjacent markets

#### Identifying Experts

1. **From analogs/antilogs**: Founders and builders from identified products
2. **From network**: Mentors, advisors, industry leaders, functional experts

**Tactical approach with experts:**
- Share the PMF narrative
- Ask: "What do you believe are the biggest risks in XYZ dimension?"
- Ask: "What products have found success in XYZ dimension?"

#### When to Stop Research

Quality over quantity. Consider:
- Magnitude of success in analog/antilog companies
- Level of conviction in initial PMF narrative
- Time constraints

**Example**: Sachin found Evernote's $100M+ ARR freemium model as analog for Notejoy → stopped researching business model dimension early.

#### Determining Conviction Levels

| Conviction | Meaning | Action |
|------------|---------|--------|
| **High** | Abundance of quality analogs | Lower priority for targeted validation |
| **Low** | More antilogs than analogs, or divergent evidence | Prioritize for targeted validation |

#### The Domino Effect

When multiple dimensions are low conviction, prioritize the one with **highest domino effect** — if it fails, how many other dimensions does it impact?

**Example — Connected:**
- Business model failure → impacts value prop + competitive advantage (high domino effect)
- Growth strategy failure → doesn't impact other dimensions (low domino effect)
- **Decision**: Business model is riskiest dimension

---

### 1.2 PMF Interviews

#### Why PMF Interviews Are Different

"Talking to someone who has never seen your product, who you don't have any interaction with or data about, is very different from talking to an existing user about feature improvement." — Behzod Sirjani

#### Three Phases of PMF Interviews

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│  PREPARE   │ ──▶ │  CONDUCT   │ ──▶ │  DEBRIEF   │
├────────────┤     ├────────────┤     ├────────────┤
│ • Plan     │     │ • Rapport  │     │ • First-   │
│ • Source   │     │ • Build    │     │   order    │
│ • Contact  │     │ • Peak     │     │   insights │
│ • Screen   │     │ • Wrap Up  │     │ • Second-  │
│            │     │            │     │   order    │
│ Validates: │     │ Validates: │     │   insights │
│ Target     │     │ Other 5    │     │ • Iterate  │
│ Audience   │     │ dimensions │     │            │
└────────────┘     └────────────┘     └────────────┘
```

#### Phase 1: Preparing for PMF Interviews

**Common pitfall**: Getting too narrow too quickly on who to talk to.

**Key principle**: Test ALL hypothesized customer segments, including "Future" markets — not just "Now" markets.

##### Recruiting Process

| Step | Activity | Details |
|------|----------|---------|
| **Plan** | Define participant types + quantity | 3-5 per segment; 30-50 total interviews |
| **Source** | Find participants | Own network → Short-term channels → Long-term channels |
| **Contact** | Craft outreach message | Brief, problem-led, conversation-focused (not sales) |
| **Screen** | Confirm fit | Questionnaire based on target audience attributes |

##### Sourcing Channels (in priority order)

1. **Own network** — highest response rate
2. **Short-term traction channels** — non-scalable but fast (e.g., local Nextdoor communities)
3. **Long-term growth channels** — scalable but slower to establish (e.g., Facebook ads, SEO)

**Difference for established orgs**: Can prioritize long-term channels earlier; larger existing customer database.

##### Contact Message Principles

- **Brevity**: Clear, easily comprehensible
- **Problem-led**: Center on hypothesized problem ("Your hit rate goes up as you get closer to a high-severity problem statement")
- **Conversation, not sales**: "We're not trying to sell you anything"

**Example (LinkedIn Sales Navigator):**
> "Hi [Name], we're contemplating a new product at LinkedIn dedicated to helping sales professionals improve sales prospecting. As a sales professional, would you be willing to share your experience with us? We're not trying to sell you a new product, just conducting customer interviews so we can build the best possible product for professionals like you."

---

#### Phase 2: Conducting PMF Interviews

**Time allocation**: 60-90 minutes per interview

| Phase | Time | Focus |
|-------|------|-------|
| Rapport | 5 min | Establish trust |
| Build | 10 min | Target audience + Problem to solve (shift attention to topic) |
| Peak | 40-70 min | Deep dive: Value prop, competitive advantage, growth strategy, business model |
| Wrap Up | 5 min | Ensure participant feels heard |

##### The Unaided → Aided → Stack Rank Approach

Ensures **depth** while avoiding confirmation bias:

```
1. UNAIDED QUESTION (open-ended)
   "What are the biggest problems you face in [job to be done]?"
                    ▼
2. FIRST STACK RANK
   "Here are the problems I heard... Am I missing anything?
    Rank from most to least challenging."
                    ▼
3. AIDED QUESTION (introduce hypotheses)
   "We've identified these additional problems...
    Do you experience any of these?"
                    ▼
4. FINAL STACK RANK (global)
   Rank ALL problems — unaided + aided — together
```

##### Right-Sizing the "Job to Be Done"

| Company | Too Broad | Right Size | Too Narrow |
|---------|-----------|------------|------------|
| Buffer | Managing a business | Managing social media | Scheduling tweets |
| Blue Apron | Eating out | Getting or preparing dinner | Cooking dinner |
| Airbnb | Traveling | Finding place to stay while traveling | Booking a hotel |

**Feedback signals:**
- Hypothesized problems consistently ranked bottom → scope too broad
- Can't probe deeper → scope too narrow

##### Dimension-Specific Questions

**Target Audience (Build phase):**
- B2B: "Tell us about your role and your company"
- B2C: "Tell us about yourself"
- Listen for: key attributes from target audience hypothesis

**Problem to Solve (Build → Peak):**
- If hypothesis matches participant's top problem: "Share a specific instance when you faced this problem. Describe the situation and consequences."
- If disconnect: "We thought our problems were interesting, but clearly not from your perspective. Help us understand why?"

**Value Proposition:**
- Focus on **benefits**, not features
- Example (LSN): "Incredible search engine" and "recommending good leads" = benefits; autocomplete, typo tolerance, personalization = features (file away for later)

**Competitive Advantage:**
- "How do you solve this problem today? What's not ideal about your current solution?"
- "Are you familiar with other solutions? Why or why not?"
- Often reveals clunky internal processes rather than competing products

**Growth Strategy:**
- "Where do you spend time online and offline?"
- Most helpful for zero-to-one startups; established orgs can leverage existing channels

**Business Model:**
- Problem ownership: "Who would benefit most from solving this problem?"
- Decision-making: "Who makes the purchase decision? How? Do they have budget?"
- B2B: Identify both decision-makers (executives) and end users
- Large B2C transactions: Include household decision dynamics

---

#### Phase 3: Debriefing PMF Interviews

**Three characteristics of great debriefs:**

| Characteristic | How to Achieve |
|----------------|----------------|
| **Insightful** | Zoom out to pattern match across interviews; extract first-order + second-order insights |
| **Iterative** | Modify interview script based on learnings; pivot quickly |
| **Unbiased** | Debrief immediately after; have 2+ team members attend and discuss |

##### First-Order vs. Second-Order Insights

| Type | Definition | Example |
|------|------------|---------|
| **First-order** | Obvious implications; where hypotheses rank in responses | "Our hypothesized problems ranked in top 3 for 8/10 participants" |
| **Second-order** | Deeper patterns; the "why" | "Participants skeptical about value prop feasibility because..." |

##### Debrief Template Prompts

1. **Takeaways by Dimension** — Where do hypotheses rank?
2. **New Insights** — What differs from current understanding? Why?
3. **Emerging Patterns** — Insights mentioned 2+ times
4. **Implications for Future Interviews** — Script modifications needed

##### When to Stop Interviewing

Two guardrails:
1. **Consistent themes** — hearing lots of repeated insights
2. **Sufficient coverage** — 3-5 people per customer segment (more if responses inconsistent)

---

### 1.3 Outcomes of Broad Validation

#### Outcome 1: Riskiest Dimension Identified

Look for:
- Greatest **divergence** in participant responses
- Responses **furthest from** initial hypotheses

**When broad techniques disagree**: Make informed judgment call by comparing evidence weight.

**Example — Connected:**
- Market research + expert advice → Business model riskiest
- PMF interviews → Business model AND value proposition equally risky
- **Decision**: Deprioritize value prop (conflicted with Mint analog + emerging auth standards) → Business model confirmed as riskiest

#### Outcome 2: Updated PMF Narrative

Three types of updates:

| Type | Definition | Scope |
|------|------------|-------|
| **Refinement** | Increase clarity/depth of existing hypothesis | Minor adjustment |
| **Pivot** | Significant adjustment to one or more dimensions | May cascade to other dimensions |
| **Reset** | Scrap and start over | Only antilogs found; dead end |

##### Refinement Examples

**LSN — Target Audience:**
- Original: VPs of Sales
- Refined: Added VPs of Sales Ops (referred by VPs of Sales; ultimate decision-makers for sales tools) + VPs of Marketing (support lead-gen budget)

**LSN — Value Proposition:**
- Original: 10 distinct user benefits
- Refined: Narrowed to 5 most important (via aided-unaided stack ranking)

##### Pivot Example

**Notejoy — Competitive Advantage:**
- Original: Position against document collaboration tools (Google Docs, Confluence)
- Pivot: Position against email/messaging apps (Gmail, Slack) for lightweight content sharing
- Cascading impact: Also modified problem and target audience dimensions

##### Reset Example

**SurveyMonkey — HIPAA-compliant survey product:**
- Hypothesis: Healthcare providers want HIPAA-compliant surveys
- PMF interviews revealed: Healthcare professionals use SurveyMonkey for non-medical purposes (ordering lunch, organizing offsites); separate teams manage health data with specialized software
- **Decision**: Reset to different PMF expansion idea entirely

**Key mindset**: "The end goal is not complete conviction; it's just more conviction than where you started."

---

## Part 2: Targeted Validation Techniques

### 2.1 The Targeted Risk Validation Menu

| Technique | Description | Best For Dimensions |
|-----------|-------------|---------------------|
| **Surveys** | Asynchronous feedback from potential users | Problem, Target Audience, Business Model |
| **Smoke Tests** | Clickthrough rates on non-functional pages | Problem, Value Prop, Growth Strategy |
| **Prototypes** | Lo-fi model of product | Value Prop, Competitive Advantage |
| **Pre-sales** | Pitch and advance sell before building | Problem, Value Prop, Business Model |
| **Product Tests** | Build and test MVP | Value Prop, Competitive Advantage, Business Model |
| **Growth Tests** | Measure growth channels against each other | Growth Strategy |

### 2.2 Selection Criteria

Evaluate each candidate technique on:

| Criterion | Consideration |
|-----------|---------------|
| **Speed** | How quickly can we get signal? |
| **Cost** | How much runway does it consume? |
| **Applicability** | How well does it address our specific riskiest hypothesis? |

**Critical insight**: It's not just about fastest or cheapest — must consider how applicable the technique is to the specific hypothesis being tested.

### 2.3 Example: Connected's Targeted Validation

**Riskiest dimension**: Business model
**Riskiest hypothesis**: Would individuals pay for a contact management app?

**Selection process:**
1. Narrow options via menu: Surveys, Pre-sales, Product Tests
2. Weigh speed/cost/applicability
3. **Decision**: Product test with intentional design

**Execution:**
- Launched at $9.99/month from day one
- 14-day free trial only (not indefinite free tier)
- Quickly validated willingness to pay and from whom

**Next iteration:**
- After de-risking business model, moved to growth strategy (another low-conviction dimension)
- Menu narrowed to: Growth tests
- Ran growth tests to validate channels

---

## Case Studies Summary

### Quibi (Cautionary Tale)

| Aspect | Details |
|--------|---------|
| **Context** | Mobile short-form video service (2018) |
| **Resources** | $1.8B raised; star-studded team (Katzenberg, Whitman) |
| **Mistake** | Jumped straight to MVP; invested $1B + 2 years building content |
| **Outcome** | 500K subscribers vs. 7M goal; shut down in 6 months |
| **Root cause** | Failed to validate value proposition — no differentiation vs. TikTok, YouTube, Netflix, Hulu |
| **Lesson** | Should have used broad validation first to identify value prop risk, then prototypes to test solutions |

### Spotify (Success Story)

| Aspect | Details |
|--------|---------|
| **Context** | Music streaming (contemporary of Anywhere.FM) |
| **Approach** | Objectively determined business model was riskiest dimension early |
| **Action** | Invested runway in business model experimentation (freemium + ads for free / no ads for paid) |
| **Outcome** | One of most successful streaming services |

### Iteratively (Deliberate PMF Interviews)

| Aspect | Details |
|--------|---------|
| **Context** | B2B analytics quality product |
| **Background** | Previous product failed — built without validating burning problem |
| **Approach** | 6 months of PMF interviews; 260+ people at 100+ companies |
| **Tactics** | Consistent script; sourced from target audience hypothesis; built research repository |
| **Outcome** | 6 letters of intent in 2 weeks using just solution deck; acquired by Amplitude (2021) |

### LinkedIn Sales Navigator (End-to-End Example)

| Phase | Activity |
|-------|----------|
| **Preparation** | 12 customer segments defined; sourced via Head of Sales network + LinkedIn InMail; problem-led outreach; screener on title/deal size/industry |
| **Conducting** | 60-90 min interviews; unaided→aided→stack rank across all dimensions |
| **Debriefing** | Discovered new attribute (tenure as sales rep); refined target audience (added VPs of Sales Ops, VPs of Marketing); narrowed value prop to 5 benefits |
| **Targeted validation** | Selected best-fit techniques based on menu |

---

## Key Mental Models

### 1. Runway as Strategic Resource

Every product team has limited runway (12-24 months typically). How you spend it determines success:

| Approach | Runway Efficiency |
|----------|-------------------|
| Jump to MVP | Low — expensive, slow, doesn't test all dimensions |
| Broad → Targeted | High — cheap/fast identification, precise targeted spend |

### 2. Validation is Learning, Not Confirming

- Don't ask: "Do you have this problem?" (leading, shallow)
- Do ask: "What are the biggest problems you face in [job to be done]?" then introduce hypotheses

### 3. The Domino Effect

When prioritizing among multiple low-conviction dimensions, choose the one that impacts the most other dimensions if it fails.

### 4. Refinement → Pivot → Reset Spectrum

| Update Type | Trigger | Example |
|-------------|---------|---------|
| Refinement | Evidence sharpens hypothesis | LSN: 10 benefits → 5 benefits |
| Pivot | Evidence contradicts hypothesis in one dimension | Notejoy: Docs tools → Messaging apps |
| Reset | Only antilogs across all dimensions | SurveyMonkey: HIPAA product → different idea |

---

## Action Items

### Immediate

- [ ] Map current product strategy against 6 PMF dimensions
- [ ] Identify whether you're using broad or targeted techniques (or neither)
- [ ] Audit recent validation efforts: Were they comprehensive or intuition-driven?

### For Broad Validation

- [ ] Create analog/antilog inventory using competitive landscape map
- [ ] Identify 3-5 experts from analog/antilog companies to interview
- [ ] Plan PMF interview recruiting: all segments (Now + Future), 30-50 total
- [ ] Draft problem-led outreach message
- [ ] Create screener questionnaire from target audience attributes
- [ ] Build debrief template for capturing first/second-order insights

### For Targeted Validation

- [ ] Determine riskiest dimension from broad validation synthesis
- [ ] Identify riskiest hypothesis within that dimension
- [ ] Use menu to narrow technique options
- [ ] Evaluate finalists on speed, cost, applicability
- [ ] Design validation to test specific hypothesis (not generic MVP)

---

## Templates & Resources

| Resource | Purpose |
|----------|---------|
| Market Research & Expert Advice Template | Track analogs/antilogs, conviction levels, domino effect |
| Preparing for PMF Interviews Template | Plan, source, contact, screen process |
| PMF Interview Script | Structured questions for all 6 dimensions |
| Debriefing PMF Interviews Template | First/second-order insights, implications |
| Targeted Validation Technique Template | Menu + speed/cost/applicability comparison |

---

## Source

Product Innovation Strategy Course — Module 3: Validating Riskiest Hypotheses
Program Creator: Sachin Rekhi (Notejoy, LinkedIn Sales Navigator)
Additional insights: Behzod Sirjani (User Insights for Product Decisions), Andy Johns (Scaling Product Delivery)
