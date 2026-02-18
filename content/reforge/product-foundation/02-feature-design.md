# Feature Design: Collected Insights
> Jiaona "JZ" Zhang | VP Product, Webflow | ex-Airbnb, Dropbox, WeWork

## Sources

| Source | Type | Key Examples |
|--------|------|--------------|
| PM Training Module 2 | Educational curriculum | Airbnb Host App, Gusto, Toast |
| JZ's Feature Design Methodology | Process framework | Constrained divergence, iterative convergence |
| Case Studies | Applied examples | Slack, ClassPass, StoryChief, Webflow |

---

## Executive Summary

Feature design is the journey from validated problem to buildable solution. It's the process where PMs and designers collaborate to translate user problems into prototypes ready for development. Without a structured approach, PMs fall into two failure modes: being too hands-off (letting designers work without context, leading to unimplementable ideas) or too prescriptive (anchoring on their own solutions, creating friction and lower quality designs).

JZ developed a three-stage methodology to find the sweet spot: **constrained divergence** (brainstorming within guardrails), **iterative convergence** (prioritizing and testing toward a single validated prototype), and **approval and alignment** (getting buy-in before development investment). The key insight is that constraints don't limit creativity—they focus it by eliminating areas not worth exploring.

The methodology emphasizes that solutions must satisfy three constraint types simultaneously: **desirability** (solves user problem in differentiated way), **viability** (aligns with strategy and drives business value), and **feasibility** (achievable given time, resources, and technology). Desirability constraints guide brainstorming; viability and feasibility constraints guide prioritization. The result is a validated, high-fidelity prototype with documented tradeoffs and flagged risks, ready for the engineering team.

---

## 1. The PM-Design Collaboration Spectrum

### The Problem

PMs aren't taught how to work effectively through feature design. They fall to extreme ends of a collaboration spectrum:

```
TOO HANDS-OFF ◄──────────────────────────────────────────► TOO PRESCRIPTIVE
      │                                                            │
      │  "Do your design magic"                    "Build what I   │
      │  PM expects designers to                    designed"      │
      │  come up with solutions                    PM directs      │
      │  to critique                               designers       │
      │                                                            │
      ▼                                                            ▼
┌─────────────────────────┐                    ┌─────────────────────────┐
│ CONSEQUENCES:           │                    │ CONSEQUENCES:           │
│ • No context provided   │                    │ • PM isn't a designer   │
│ • Solutions can't be    │                    │ • First ideas rarely    │
│   implemented           │                    │   best                  │
│ • Throwaway work        │                    │ • Creates friction      │
│ • Breakdown of trust    │                    │ • Lower quality output  │
└─────────────────────────┘                    └─────────────────────────┘
```

### The Figma Example (Hands-Off Failure)

**Scenario:** PM at Figma working on comment tracking feature asks design team to "come up with ideas."

**What happened:**
- Designers came back with solutions ranging from simple (add filters) to complex (new comment inbox)
- PM knew scope, time, and resources were limited but didn't communicate constraints
- Team explored rabbit holes of unfeasible ideas
- Designers frustrated they weren't told constraints upfront
- Trust breakdown affects future collaborations

### JZ's Sweet Spot Methodology

Three-stage process to avoid both extremes:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CONSTRAINED   │───▶│    ITERATIVE    │───▶│   APPROVAL &    │
│   DIVERGENCE    │    │   CONVERGENCE   │    │   ALIGNMENT     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   Define & communicate    Prioritize &         Design reviews
   constraints             prototype test       Update PRD
```

---

## 2. Constrained Divergence

### Why Constraints Enable Creativity

> "Constraints focus brainstorming; they don't limit it. By blocking off areas that aren't worth exploring, you protect your design team from wasting energy. They can still brainstorm endless possibilities within the designated area."
> — JZ

**Common misconception:** Constraints limit brainstorming and disable creativity.
**Reality:** Constraints provide guardrails for confident brainstorming.

### The Three Constraints Framework

The best solutions are born at the intersection of all three:

```
                    ┌─────────────────┐
                    │  DESIRABILITY   │
                    │                 │
                    │ Solves user     │
                    │ problem in      │
                    │ differentiated  │
                    │ way             │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │      BEST SOLUTIONS         │
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         │                                       │
┌────────▼────────┐                   ┌─────────▼────────┐
│    VIABILITY    │                   │   FEASIBILITY    │
│                 │                   │                  │
│ Aligns with     │                   │ Achievable with  │
│ strategy &      │                   │ time, resources, │
│ business value  │                   │ technology       │
└─────────────────┘                   └──────────────────┘
```

### Constraint Type 1: Desirability

Desirability constraints come from **User Value** (the User Value Map from opportunity validation).

**Two components (Ice Cream Sundae Model):**

| Component | What It Is | Source |
|-----------|------------|--------|
| **Core Functionality** (the ice cream) | Bare minimum to solve the problem | User problem description + severity |
| **Differentiation** (the toppings) | What sets solution apart from alternatives | Alternative methods analysis |

**Defining core functionality constraints:**
- Imagine end state where user problem is solved
- What core functionality got them there?

**Gusto Example:**
| Problem | Core Functionality Constraint |
|---------|------------------------------|
| Companies make mistakes (missed deadlines, data entry errors) | Onboarding must be error-proof with deadline tracking |
| Data input across non-integrated tools | Feature must support every onboarding step, automate as much as possible |

**Defining differentiation constraints:**

Alternatives exist on a spectrum:

| Alternative Quality | Bar to Clear | Differentiation Approach |
|--------------------|--------------|--------------------------|
| **Limited/partial** | Low | More flexible constraints |
| **Robust** | High | May need delight/entertainment |

**Gusto Example:**
- Alternative: Spreadsheets for storing sensitive employee data
- Constraint: Safe, secure data storage (immediately differentiates)

### Constraint Type 2: Viability

Viability constraints come from **Strategic Fit** and **Business Value**.

| Source | Constraint Focus |
|--------|-----------------|
| Strategic Fit | What solution must accomplish to align with business/product/team goals |
| Business Value | What metrics the solution must drive, and by how much |

**Toast Example:**
| Viability Source | Constraint |
|-----------------|------------|
| **Strategic Fit** | Benefit entire restaurant ecosystem; guest profiles quick for guests, data easy for restaurants to analyze |
| **Business Value** | Drive ARR through guest data enabling rewards/promotions that increase return visits |

### Constraint Type 3: Feasibility

Feasibility constraints come from the **project itself**.

| Type | What to Consider | Example |
|------|------------------|---------|
| **Time** | Deadlines, runway | Series A/B with 12 months runway → deploy in 6 months |
| **Resources (Project)** | Your pod's designers/engineers | Limited team size, growth potential |
| **Resources (Shared)** | Specialists from other teams | NLP expert splitting time across teams |
| **Technology** | Technical infrastructure limits | Webflow can't support real-time collaboration without re-architecting |

**Key practice:** Always discuss technology constraints with engineering counterparts.

### Airbnb Full Constraint Example

**Feature Opportunity:** Enhance mobile app messaging for Hosts to increase app usage.

| Constraint Type | Constraint |
|----------------|------------|
| **Core Functionality** | Show sent messages; sync automatically with website |
| **Core Functionality** | Navigating to inbox must be intuitive and fast |
| **Differentiation** | Double down on reliability, security, user-friendliness (compete with WhatsApp) |
| **Viability (Strategic)** | Demonstrate Airbnb cares about Host experience |
| **Viability (Business)** | Increase Host mobile app usage from 50% to 70% (significant, visible revamp needed) |
| **Feasibility (Time)** | 6 months until Host conference launch |

---

## 3. Brainstorming with Constraints

### Three PM Responsibilities

| Phase | PM Action |
|-------|-----------|
| **Before** | Ask the right questions |
| **During** | Encourage divergent thinking |
| **After** | Cluster solutions |

### Step 1: Ask the Right Questions

**"How Might We" Question Template:**

```
How might we [address the desirability constraint] for the user
so that we [create the desired effect]?
```

**Key principles:**
- Anchor primarily on desirability constraints during divergence
- Save viability and feasibility for convergence/prioritization
- Focus on experience, not solution

**Airbnb "How Might We" Examples:**

| Constraint | How Might We Question |
|------------|----------------------|
| Show sent messages, auto-sync | "How might we make the mobile app display information more accurately for Hosts so that they use it regularly to interact with Guests?" |
| Easy to find inbox | "How might we make it easier to find the messaging feature so that Hosts can use it more efficiently?" |
| Differentiate from WhatsApp | "How might we make the Host experience uniquely reliable, secure, and delightful so that Hosts don't migrate conversations to alternatives?" |

**Best Practices:**

| Practice | What It Means |
|----------|---------------|
| Amp up the good | Push boundaries; reframe negatives as positives |
| Focus on experience | Center on experience created, not solution itself |
| Combine/nest similar | Group constraints around same experience |

> "We don't need to spend time thinking about how to make our feature delightful at this stage if the competitive landscape doesn't require it."
> — JZ

### Step 2: Encourage Divergent Thinking

**Crazy Eights Exercise:**
- Goal: 8 distinct solution ideas in 8 minutes per "How might we" question
- Available in Figma, Miro, Conceptboard
- Should be simple and fast

**Airbnb Crazy Eights Output (one question):**
1. Change placement of inbox on main screen
2. Build robust inbox search
3. Reorder inbox with most time-sensitive messages at top
4. Auto-sync messages to instantly update inbox
5. Build detailed push notifications with message info
6. Add ability to save auto-response templates
7. Enable access to guest reservations directly from inbox messages
8. Accept payments through inbox

### Step 3: Cluster Solutions

**Why cluster:**
1. Remove/consolidate redundant ideas
2. Provide logical structure for prioritization
3. Visualize areas with most/least robust solutions

**Three Common Clustering Methods:**

| Method | When to Use | Example |
|--------|-------------|---------|
| **Surface area** | Product has distinct pages/tabs | LinkedIn mobile app tabs (Home, Networks, Jobs) |
| **User type** | Different user segments | Slack: small teams/free users vs enterprise clients |
| **Funnel stage** | Ideas impact different journey stages | Gusto B2B: top of funnel acquisition vs free trial conversion |

**Airbnb Clustering Result (17 ideas → 6 clusters):**

| Cluster | Example Solutions |
|---------|------------------|
| **Information Architecture** | Default inbox to home, hamburger menu, 3-page layout with inbox center |
| **Inbox Performance** | Reduce load times, improve sync to instantly reflect activity |
| **Inbox Functionality** | Message templates, detailed push notifications, reorder inbox, enhanced search, attachments |
| **Calendar Functionality** | Mobile calendar view, calendar sync, edit reservations, bulk changes |
| **Inbox Integration** | Access reservation info from messages, accept payments through messages |
| **Statistics Page** | Multiple dashboards on one screen, highlight important dashboard |

---

## 4. Prioritization (Iterative Convergence Phase 1)

### Purpose

After brainstorming with desirability constraints, apply viability and feasibility to ensure solutions land at the intersection of all three.

### Two-Level Prioritization Process

```
┌─────────────────────────────────────────────────────────────┐
│                   CLUSTER-LEVEL                             │
│         Eliminate whole clusters that don't satisfy         │
│         viability or feasibility constraints                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               WITHIN/ACROSS CLUSTERS                        │
│         Eliminate individual solution ideas that are        │
│         least viable and feasible                           │
└─────────────────────────────────────────────────────────────┘
```

### Prioritization Questions

| Constraint | Question to Ask |
|------------|-----------------|
| **Viability** | Will this generate the business value we're targeting? Will it align with strategic goals? |
| **Feasibility** | Given time, resources, and technical capabilities, can this be implemented? |

**Key practice:** Involve engineering counterparts to understand feasibility view.

### Airbnb Prioritization Example

**Starting point:** 17 solution ideas in 6 clusters

**Cluster-level elimination:**

| Cluster | Decision | Reason |
|---------|----------|--------|
| Inbox Integration | Eliminate | Relies on fully functional inbox (doesn't exist); no time in 6 months |
| Statistics Page | Eliminate | Only small fraction of Hosts use this page; won't drive 20% usage increase |

**Remaining:** 4 clusters (Information Architecture, Inbox Performance, Inbox Functionality, Calendar Functionality)

**Further prioritization:**
- Information Architecture + Inbox Performance → All solutions prioritized (most viable)
- Engineering input: Only capacity for 3 more ideas
- Engineering flags: Enhanced search, attachments, reservation edits = particularly complicated
- **Final cut:** Message templates, mobile calendar view, calendar sync (differentiate from WhatsApp)

**Result:** Smaller set ready for prototype testing

---

## 5. Prototype Testing Fundamentals

### What Is a Prototype?

A representation of a feature design in physical form—from paper sketch to fully interactive UI.

### Three Benefits of Prototype Testing

| Benefit | Description |
|---------|-------------|
| **Evolve designs with user preferences** | Understand what solution ideas and design choices best fulfill desirability constraints |
| **PM-design collaboration avenue** | PMs well-poised to run/debrief tests given user understanding |
| **Early risk signals** | Valuable inputs for structuring development milestones |

### Four Testing Components

| Component | Definition |
|-----------|------------|
| **Audience** | Who tests the prototype (same as opportunity validation target) |
| **Fidelity** | How detailed and functional the prototype is |
| **Moderation** | How you guide audience through the test |
| **Synthesis** | How you translate results into actionable takeaways |

### The Fidelity Spectrum

```
LOW FIDELITY ◄──────────────────────────────────────────► HIGH FIDELITY
      │                                                        │
      │  Paper sketches              Fully interactive,        │
      │  Simple wireframes           clickable prototypes      │
      │  No interaction                                        │
      │                                                        │
      ▼                                                        ▼
┌─────────────────────────┐              ┌─────────────────────────┐
│ FEEDBACK TYPE:          │              │ FEEDBACK TYPE:          │
│ • High-level on whole   │              │ • Specific UI/UX        │
│   solution              │              │   feedback              │
│ • Less about individual │              │ • Nuanced friction      │
│   design issues         │              │   points                │
│                         │              │                         │
│ COST: Low               │              │ COST: High              │
│ TIME: Fast              │              │ TIME: Slow              │
└─────────────────────────┘              └─────────────────────────┘
```

### Test Moderation Structure (All Tests)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     SETUP       │───▶│   INTERACTION   │───▶│      Q&A        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   Set context,          Users engage,         Questions about
   guidance,             observe               why they interacted
   assumptions           behaviors             in certain ways
```

### Two Test Objectives

| Objective | Purpose | When to Use |
|-----------|---------|-------------|
| **Design Exploration** | Test multiple solution ideas/design choices to determine most desirable | Still have multiple viable/feasible ideas after prioritization |
| **Design Validation** | Test, optimize, de-risk a given solution idea | Landed on a solution, need to refine and validate |

**Sequence:** Exploration → Validation (always in that order)

### Determining If Ready for Validation

Three questions to answer before skipping exploration:

1. "Of my solution ideas, which are more or less desirable?"
2. "Which design choices do users prefer?"
3. "Do users with different profiles differ in what they find desirable?"

**Sources to check before running exploration tests:**

| Source | What It Reveals |
|--------|-----------------|
| User logs | How users solve problem with workarounds |
| Heatmaps/activity trackers | How users interact with specific screens |
| User feedback/support tickets | Past friction areas |
| Spot surveys/polls | Directional preferences (aggregated) |

---

## 6. Design Exploration Testing

### Objective

Answer three key questions:
1. Which solution ideas/elements are more or less desirable?
2. What design choices do users prefer?
3. Do user profiles differ in what they find desirable?

### Fidelity: Low (with selective high-fidelity elements)

Skew to lower fidelity for high-level feedback without heavy investment.

**Exception:** Create higher-fidelity functional elements for specific areas you want to test.

**Slack Sidebar Example:**
- Testing: How should users create sections? (right-click, "+" sign, or three dots)
- Overall prototype: Low fidelity (orient users to location/task)
- Specific elements: Higher fidelity for the three interaction options

### Moderation: Exploration-Specific

**Setup:**
- Set context around user problem (prime them to interact with problem in mind)
- Set tone: "We aren't looking for specific feedback on design quality. We only want high-level reaction to these concepts."
- Focus attention on parts needing feedback
- Provide clear assumptions to reduce cognitive load

**Slack Example Setup:**
- Populate with fake channels
- Tell users to assume they want to categorize into two sections
- Reduces cognitive load of figuring out what/how many categories

**Interaction:**
- Let users interact with prototypes
- May use activities like card sorting or simulated buying
- Observe: Which option chosen, time to determine, time to complete

**Q&A:**
- Ask not just what they prefer, but **why**
- Example questions:
  - "Which of these are you more likely to use? Why?"
  - "What about this makes it seem more [reason they prefer it]?"
  - "When do you think you might use it? Why?"
  - "In what situation would you not use it? Why not?"
  - "I see you ranked [x] over [y]. Why is that?"

### Synthesis: Exploration-Specific

**Key Insights to Extract:**

| Question | How to Answer |
|----------|---------------|
| Which solution ideas most desirable? | Leverage Q&A preferences; explain WHY (how it solves problem, differentiates) |
| Which design choices preferred? | Explain why each choice was preferable |
| Variations across segments? | Look for patterns by firmographics, demographics, product behaviors |

**Slack Segment Variation Example:**
- **Team admins:** Many channels, want proactive management → prefer "+" option
- **Average members:** Fewer channels, reactive approach → prefer "right-click and create-section"
- **Decision:** Is it viable/feasible to develop different solutions for different segments?

**Design Output:**
- Validated low-fidelity prototype incorporating chosen solution ideas and design choices
- Annotate: Which elements are core functionality vs differentiation/delight
- Multiple variations if meaningful segment differences (depends on constraints)

---

## 7. Design Validation Testing

### Objective

Answer two key questions:
1. When we consider the entirety of solution idea and design choices, what issues emerge?
2. What are the areas of usability risk for feature development?

### Design Issues vs Usability Risks

| Type | Definition | Example |
|------|------------|---------|
| **Design Issues** | Specific UI/UX choices that block core functionality | Button language doesn't resonate, needs rewriting |
| **Usability Risks** | Friction when actually using core functionality | Feature mentally taxing, too many steps, requires too much personal info |

### Fidelity: High

- All user interfaces developed
- Interactive and clickable
- Ensures nuanced feedback on specific interactions and friction

**StoryChief Example:**
- High-fidelity prototype of onboarding questionnaire
- Step-by-step user flow, fully clickable
- User's choice in step 1 updates options in step 2

### Moderation: Validation-Specific

**Setup:**
- Introduce user problem and hypothetical scenario
- **Don't** provide too much context (simulate real-world environment)
- Explain goal and actions to take
- Let user navigate on their own

**Interaction:**
- Ask users to think out loud ("think-aloud testing")
- Share what they expect screen/button to do
- React to whether it matched expectations

**Q&A:**
- Focus on: Low-confidence areas, observed counterintuitive behaviors
- Example questions:
  - "I heard you said you expected something to do [x]. Why is that?"
  - "I noticed you were confused by [z]. Tell me more."
  - "What would you change about the prototype? Why?"

**StoryChief Example:**
- Setup: "Imagine you just signed up and want to create your first workspace. Go through this onboarding questionnaire. Share thoughts along the way."
- Observe: Where users spent longer than expected
- Q&A: Deep-dive into time-consuming areas

### Synthesis: Validation-Specific

**Key Insights to Extract:**

| Type | Source | Action |
|------|--------|--------|
| **Design Issues** | Observations during interaction + Q&A answers | Resolve before development |
| **Usability Risks** | Friction that can't be solved with design choices | Flag for development phase |

**StoryChief Example:**
- **Design Issue:** Language of options doesn't resonate → rewrite
- **Usability Risk:** Users spent long time on "what would you like to solve" because they wanted multiple options → flag for development

**Design Output:**
- Final prototype with all design issues resolved
- Annotated to call out usability risk areas
- Key input for defining development milestones (de-risk early)

---

## 8. Design Approval & PRD Update

### Design Review vs Product Review

| Aspect | Product Review | Design Review |
|--------|---------------|---------------|
| **When** | End of opportunity validation | End of feature design |
| **Primary Audience** | Product org leadership | Design leadership |
| **Secondary Audience** | Dependency team leadership | Product org leadership |
| **Objective** | Get clear green light | De-risk before development investment |
| **Iterations** | Usually one | Often 2-3 rounds |

### What Each Audience Looks For

| Audience | Focus |
|----------|-------|
| **Product Leadership** | Does design solve intended problems? (callback to strategic fit, user value, business value) |
| **Design Leadership** | What other choices considered? Tradeoffs made? How does it fit with product/brand? |

### Design Review Requirements

Three things to include:

| Requirement | Description |
|-------------|-------------|
| **Summary of feature opportunity** | Set context, enable better feedback |
| **Design principles** | Guiding principles the team followed; how they evaluated tradeoffs |
| **Design critique process** | Structured process for soliciting feedback |

**Airbnb Design Principle Example:**
"Ease of use for broad set of users over additional functionality for small audience subset"

### Three Feedback Categories

| Category | Urgency | Description | Action |
|----------|---------|-------------|--------|
| **Problem-Solution Fit** | High | Does solution address user problem? | Seriously refine or explore other solutions |
| **Solution-Product Fit** | Medium | Does design fit overall product branding/positioning? | Refine design to fit |
| **Subjective** | Low | Personal preferences of leadership | Use judgment; separate valuable from not |

**If too much subjective feedback:** Signal that design team needs clearer expectations (remind audience it's a prototype, not polished design).

### Design Review Outcomes

- Normal to have 2-3 reviews before final approval
- Balance: Making changes vs maintaining speed
- Exit with: Approved design ready for development

### Updating the PRD

Three additions after design phase:

| Addition | Content | Purpose |
|----------|---------|---------|
| **Final Design Description** | What each component does, entry points, interactions, external integrations, prototype links | Engineering uses to build; collaborators understand intended function |
| **Iterative Convergence Documentation** | Solutions prototyped but deprioritized (with user feedback); solutions eliminated due to viability/feasibility | Empower team to make similar tradeoffs; feasibility ideas may become feasible later |
| **Outstanding Risks** | Usability risks from testing; utility risks (weak signals about solving user problem) | Address early in development |

> "The key to this section is to be succinct. Focus on the most important, difficult, or non-intuitive decisions, not a full summary of every decision you ever made."
> — JZ

**Airbnb Convergence Documentation Example:**
- Prototyped: Centralized message library vs saved personal messages
- Initial hypothesis: Centralized library better
- Research showed: Users wanted custom saved messages
- Important because: Disproved hypothesis

---

## Action Items

### For Constrained Divergence (Immediate)

- [ ] Define desirability constraints from User Value Map (core functionality + differentiation)
- [ ] Define viability constraints from strategic fit and business value
- [ ] Define feasibility constraints with engineering input (time, resources, technology)
- [ ] Translate desirability constraints into "How Might We" questions

### For Brainstorming & Clustering (Short-term)

- [ ] Facilitate Crazy Eights (8 ideas per question in 8 minutes)
- [ ] Cluster solutions by surface area, user type, or funnel stage
- [ ] Document all solution ideas before prioritization

### For Prioritization & Testing (Strategic)

- [ ] Apply viability/feasibility at cluster level first
- [ ] Get engineering input on remaining solutions
- [ ] Determine test objective (exploration vs validation)
- [ ] Build appropriate fidelity prototype
- [ ] Conduct design reviews (expect 2-3 rounds)
- [ ] Update PRD with design description, convergence documentation, risks

---

## Critical Gaps & Limitations

| Gap | Implication |
|-----|-------------|
| Templates referenced but not included | Need to source Constraint Template, PRD separately |
| Design team structure varies | Some companies have embedded designers; others shared resources |
| Prototype tooling not specified | Figma, Miro, Conceptboard mentioned but not compared |
| Think-aloud testing requires practice | Skill development needed for effective moderation |
| Design leadership culture varies | Some orgs more formal critique processes than others |
| Viability/feasibility estimates subjective | Engineering estimates vary; may need multiple opinions |

---

## Appendix: Key Quotes

| Quote | Source | Context |
|-------|--------|---------|
| "Constraints focus brainstorming; they don't limit it. By blocking off areas that aren't worth exploring, you protect your design team from wasting energy." | JZ | On why constraints enable creativity |
| "We don't need to spend time thinking about how to make our feature delightful at this stage if the competitive landscape doesn't require it." | JZ | On differentiation constraints |
| "The key to this section is to be succinct. Focus on the most important, difficult, or non-intuitive decisions." | JZ | On documenting convergence process |

---

## Appendix: Airbnb Host Messaging - Full Case Study

### Context
Airbnb wants to enhance the mobile app messaging experience for Hosts, increasing app usage from 50% to 70% before the annual Host conference (6-month deadline).

### Design Journey

| Phase | Action | Outcome |
|-------|--------|---------|
| **Constraints** | Defined all three types | Core: show sent messages, sync, intuitive navigation. Differentiation: reliability, security, delight (vs WhatsApp). Viability: demonstrate Host investment, significant visible revamp. Feasibility: 6 months. |
| **Brainstorming** | Crazy Eights on "How Might We" questions | 17 solution ideas generated |
| **Clustering** | Grouped by surface area and change type | 6 clusters: Info Architecture, Inbox Performance, Inbox Functionality, Calendar Functionality, Inbox Integration, Statistics Page |
| **Prioritization** | Cluster-level then solution-level | Eliminated Inbox Integration (no time) and Statistics (low impact). Engineering flagged complex builds. Final: 7 solutions across 4 clusters. |
| **Exploration Testing** | Low-fidelity prototypes | Tested options, identified preferred solutions |
| **Validation Testing** | High-fidelity clickable prototype | Resolved design issues, flagged usability risks |
| **Design Review** | Product + Design leadership | Saved personal messages preferred over centralized library (disproved initial hypothesis) |

### Key Decision Point
- **Hypothesis:** Centralized message library is better
- **Research finding:** Users wanted ability to save their own custom messages
- **Outcome:** Documented in PRD as important prioritization decision that disproved hypothesis

---

## Appendix: ClassPass Chat Feature Example

### Context
ClassPass developing chat feature to connect trainers with members. No clear design hypothesis yet.

### Exploration Phase

**Two prototypes tested:**

| Option | Description |
|--------|-------------|
| Option 1 | Lightweight pre-programmed chat; templated messages ("What time is class," "I'm running late"); only after connection |
| Option 2 | Members can search trainers and message; all interactions on separate chat portal |

**Test:** Put both options in front of trainers and members to evaluate desirability.

### Validation Phase

After converging on final chat design:
- Present high-fidelity clickable prototype
- Observe user interactions
- Note confusion points and navigation delays
- Inform final updates and flag development risks
