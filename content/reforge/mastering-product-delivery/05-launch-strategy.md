# Launch Strategy: Collected Insights
> Reforge Program: Mastering Product Delivery | Module 5
> Instructors: Matt Greenberg (Credit Karma), Andy Johns (Wealthfront)

---

## Source

| Module | Format | Topics |
|--------|--------|--------|
| Launch Strategy | Reforge Course Module | Launch Prep, Post-Launch Prep, Post-Launch Management |

---

## Executive Summary

Launching big bet innovations differs fundamentally from shipping features. Like comparing a day hike to summiting Everest, big bets require different systems, coordination, and mental models. The launch itself is a false finish line—the real measure of success is what happens after.

This module presents a three-part system: **Launch Prep** (how/what/when to launch), **Post-Launch Prep** (measuring success, communication, disaster planning), and **Post-Launch Management** (shifting gears based on market response).

The core insight is that **missed value** comes from three failure modes: launching the wrong way (wrong audience/staging), launching the wrong thing (poor prioritization), and launching poor quality (insufficient testing). Each requires distinct countermeasures.

Post-launch, products shift into one of four "gears"—Accelerate, Improve, Restart, or Wind Down—each requiring fundamentally different leadership approaches. The challenge lies not in the extremes (clear success or failure) but in the ambiguous middle where signals are mixed.

---

## 1. The Launch Complexity Problem

### Core Metaphor: Day Hike vs. Everest

| Dimension | Feature (Day Hike) | Big Bet (Everest) |
|-----------|-------------------|-------------------|
| Path | Predictable, obvious | Strenuous, unpredictable |
| Preparation | Minimal, figure it out | Thorough, required for success |
| Post-summit | Easy descent | Complex, requires planning |
| Team | Small, junior capable | Large, experienced, skilled |
| Coordination | Self-contained | Cross-functional, multi-team |

### Why Big Bets Are Hard

1. **Novel decisions and tradeoffs** you haven't encountered before
2. **Significantly increased complexity** requiring thorough upfront preparation
3. **Unknowns persist after launch** requiring rapid reaction to challenges
4. **Larger teams with broader skill sets** creating coordination overhead

### The Three-Part System

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   LAUNCH PREP   │ →  │ POST-LAUNCH PREP │ →  │ POST-LAUNCH MGMT    │
├─────────────────┤    ├──────────────────┤    ├─────────────────────┤
│ How do we       │    │ How do we        │    │ What do we do next? │
│ launch?         │    │ measure success? │    │                     │
│                 │    │                  │    │ What can we do      │
│ What do we      │    │ How do we        │    │ better next time?   │
│ launch?         │    │ communicate?     │    │                     │
│                 │    │                  │    │                     │
│ When are we     │    │ What if we're    │    │                     │
│ ready?          │    │ not successful?  │    │                     │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

---

## 2. Launch Prep: Staging Strategies

### The Missed Value Framework

When launch prep fails, it creates **missed value**—the gap between potential impact and actual impact.

| Type | Definition | Example |
|------|------------|---------|
| **Wrong Way** | Launched to wrong users/sequence | CoSo IT rushed feature to premium customer (10% of revenue); took years to rebuild trust |
| **Wrong Thing** | Prioritized wrong features | Credit Karma Tax launched without audit protection; users wary despite free service |
| **Poor Quality** | Insufficient testing | Apple Maps wrong locations; years of perception as inferior product |

> "The missed value for CD Projekt [Cyberpunk 2077] was created by launching to majority of customers at once before testing, sacrificing anticipated features, and launching something barely playable."

### Three Staging Approaches

#### 1. Stage by % of Users

**Why:** Big bets have bugs you can't catch in testing. Starting small lets you "flush out the pipes."

**Process:**
1. Roll out to 1-5% of users initially
2. Monitor bug reports and customer service tickets
3. Address feedback until stable
4. Ramp up in tranches (10% → 25% → 50%) based on confidence

> **Wealthfront Example:** Portfolio Analysis Tool had verbose copy and feature-heavy UX. Less than 10% completed the experience. Launched to majority without time to learn from major pitfalls.

> **Twitter Example (2010):** Major newsfeed redesign rolled to all users at once. Within days, following was down 30%. For a network-effects company, double-digit decline in network creation is disastrous.

#### 2. Stage by Customer Segment

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Requirements** | User groups have different needs | B2B: Launch to SMBs first, build enterprise compliance later |
| **Geography** | Regulatory or market differences | Uber scooters: City-by-city based on regulations, population density |
| **Client Importance** | High-value accounts need protection | CoSo: Launch to low-impact clients first, prove functionality |
| **Representative Sample** | Large user base, want extrapolation | Facebook: Test in New Zealand/Australia, representative of tier 1 western markets |

> **Key Insight:** Even if enterprise accounts are involved in roadmap, avoid launching brand new innovations to them first. Launch to lower impact clients and prove functionality before putting core business at risk.

#### 3. Stage by Technology Platform

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Customer Density** | Platform has majority of users | India: Launch Android first (majority penetration) |
| **Resource Constraints** | Team specializes in one platform | Clubhouse: Started iOS-only due to limited team |
| **Platform Compatibility** | Product aligns better with platform | Android more open for notifications; may launch there first |

### Combining Staging Strategies

**Constraint → Strategy Mapping:**

| Constraint | Recommended Strategies |
|------------|----------------------|
| Resource constraints | Platform staging, Requirements staging |
| Disparate customer needs | Customer density, Client importance, Requirements |
| Varying regulations | Geography, Industry |

**Example Combined Strategy (Blue Apron):**
- Platform: iOS first (resource constraint)
- Geography: Bay Area, LA, NYC, Boston (market requirements)
- Users: Existing users only, 3% rollout (risk mitigation)

> **Warning:** The more staging strategies combined, the slower the product reaches most users. Balance thoroughness with speed to value.

---

## 3. Launch Prep: Prioritization & Decision Making

### Step 1: Rebaseline Hypotheses

Before launch, revisit kick-off hypotheses. Products drift during development through:

| Drift Type | Description | Impact |
|------------|-------------|--------|
| **User Profile** | Demographics, psychographics changed | Affects moments of delight |
| **Moments of Delight** | Reprioritized through user testing | Affects feature choices |
| **Business Value** | Assumptions about value drivers changed | Affects impact model |

**The Domino Effect:** Changes don't happen in isolation. Updating any dimension changes the others.

```
User Profile → Moments of Delight → Features → Business Value
     ↑                                              ↓
     ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

> **Blue Apron Example:** Changed user profile to lower income threshold → cost moment of delight changes → shift from professional chefs to entry-level cooks → business becomes network-effect driven with focus on breadth over unit value.

### Step 2: The Burndown List

**Definition:** An itemized, prioritized list recording all work needed before launch.

**Scope:** Everything goes on the list—frontend work, security reviews, marketing copy, bugs, dependencies.

#### Three Categories

| Category | Definition | Framing Test |
|----------|------------|--------------|
| **Launch Blocker** | Cannot launch without this | "We aren't launching today because this isn't done" |
| **Critical** | Significantly affects user value | Product can ship, but value substantially reduced |
| **Non-Critical** | Future enhancement | Value delivery possible without this |

> **Matt Greenberg:** "Overuse of critical often means people might be working on slightly lower value items. If everything is the same priority, nothing is prioritized."

**Common Mistakes:**
1. Prioritizing too many things (team burnout)
2. Taking too long on tradeoff decisions (using up time)
3. Failing to check with dependency teams (painful surprises)

#### Capacity Management

**Key Principle:** Teams that push for every ounce of effort at launch run out of energy for post-launch.

> **Matt Greenberg:** "You need to use your judgment when trying to push a team to work unsustainably. It rarely works out to take out a mortgage against your future; almost every time I've done it, I needed that team at their best later and they weren't."

**Signals to Watch:**
- Capacity approaching 90%+ → move Critical to Non-Critical or add resources
- Blocker/Critical categories not decreasing as launch approaches → not making hard tradeoffs
- Most additions at this stage will be bugs → be comfortable prioritizing bugs over features

### Step 3: Speed of Decisions

In late stages, **time is an opportunity cost** in every decision. Bias toward speed.

> **Matt Greenberg:** "When faced with a choice between A and B, leaders want a way out. They want to be able to do both and they spend time looking for an optimal solution instead of making the choice. Choosing both at this stage often costs you both because of future tradeoffs. The better approach is to make the best decision you can and not hold the team back from moving forward."

**Mantra:** "A good decision today is better than a perfect decision tomorrow."

**Enablers:**
- Rebaselined hypotheses provide common guidelines for cross-functional tradeoffs
- Burndown lists show where every task stands relative to others

---

## 4. Launch Prep: Coordination & Quality Assurance

### The Runbook System

**Definition:** Systematized checklists for specific launches, converting loose mental processes into documented procedures.

> **Atul Gawande:** "Under conditions of complexity, not only are checklists a help, they are required for success."

**Hospital Parallel:** WHO surgical safety checklists (2008) drove significant decrease in mortality rates by ensuring things weren't forgotten or done in wrong order.

### Common Runbook Mistakes

**Most common mistake:** Runbooks only cover product and engineering, ignoring other functions.

**Downstream Effects:**
1. Mistakes during handoffs to dependency teams
2. Dependency teams can't support the product post-launch
3. Third-party integrations fail, agreements fall apart

### Critical Runbook Components

Each task needs four components:
1. **Owner:** Name of responsible person
2. **Description:** Detailed task description
3. **Success Outcome:** What success looks like
4. **Deadline:** When it must be done

### B2C Teams Often Missed

#### Marketing Runbook

| Critical Task | Description | Example Pitfall |
|--------------|-------------|-----------------|
| **Press Releases & Events** | Coordinate media channels, publications, messaging, release date | Credit Karma Tax: Landing page variant with "Tax" went to production early due to misaligned schedule |
| **QA Channel Messaging** | Test email, push, in-app messaging for new product | Credit Karma Tax: Needed completely different IP set for email with separate opt-out |
| **QA Performance Marketing** | Test attribution, promotions, referrals | Gojek: Free rides promo codes could be used multiple times; gave away 3x intended rides |

#### Customer Service Runbook

| Critical Task | Description | Example |
|--------------|-------------|---------|
| **Update FAQ** | Cover new product across platforms | Wealthfront Auto-Pilot: New FAQ sections prevented ticket overwhelm |
| **Training** | Reps understand product, how to provide support | Asana: Demo for support team including walkthroughs, timeline, known bugs, expected questions |
| **QA Ticket Platform** | Test tagging, routing, categorization | Wealthfront Financial Planning: New Zendesk tagging system for precise categorization |

### B2B Teams Often Missed

#### Sales Runbook

| Critical Task | Description | Example |
|--------------|-------------|---------|
| **Sales Materials** | Update pitch, articulate value with existing offering | Slack: Sales enablement materials 3-6 weeks before any major launch |
| **Feedback Channels** | Clear path for sales to communicate to core team | Asana: VoC 911 escalation process for substantial revenue loss risk |

> **CoSo Example:** Underestimated sales enablement for SMB product. Sales focused on enterprise deals they knew. Had to realign incentives top-down and build enablement post-launch, causing significant delay.

#### Customer Success Runbook

| Critical Task | Description | Example |
|--------------|-------------|---------|
| **QA Large Customer Environments** | Test before deploying to large customers | Asana: Large customers in special holdout group, involved in late-stage UXR |
| **Customer Onboarding** | Ensure customers don't self-implement poorly | Asana: "Train the trainer" model with enterprise CSMs |

> **Matt Greenberg:** "Engaging customer success early in launch prep took a lot of work and likely negative outcomes off the table for the core team, and gave us tons of confidence going into big releases."

### Facilitating Coordination

**The Coordination Loop:**
1. Run the task
2. Communicate results to relevant parties
3. Confirm across teams success/failure and next steps
4. Move to next task

**The War Room:** Centralized forum where teams run through checklists live together (like SpaceX launch control).

**Benefits:**
- Accelerate task execution (remove coordination time)
- Faster confirmation of completion
- All parties witness tests together, confirm parameters, coordinate quickly

### Third-Party Coordination

1. Identify primary point-of-contact with instant access (phone/Slack)
2. Generate internal runbooks AND request their runbooks
3. Coordinate weeks/months ahead: identify issues, align sequencing, align communication plan

---

## 5. Post-Launch Prep: Metrics & Instrumentation

### Why Teams Struggle

> **Andy Johns:** "Launching a big bet is like filing for an IPO. You need to prepare for the actual event, but you also need to have a plan for what comes after it. After you ring the bell, you still need to run the business."

**Problems when post-launch prep is skipped:**
1. Unable to measure success
2. Unprepared to communicate with executives
3. No plan when things go wrong

> **Tickle Example:** Built contact-loading feature for social network but never forced all users to do it. Lacked instrumentation to understand impact. Facebook copied it, identified impact through instrumentation, put it in core flow. Tickle couldn't read and react to their own good idea.

### Defining Metrics

#### Life Raft Metrics

**Definition:** Critical metrics tracking performance and health of the company as a whole.

| Company | Life Raft Metric | Driving KPI |
|---------|-----------------|-------------|
| Blue Apron | Recurring meal kit orders | Monthly active subscribers |
| Slack | Daily active seats (enterprise) | Users sending messages daily/weekly |

**Key Insight:** New products can negatively impact life raft metrics. Users might choose the new offering over the existing one.

**Threshold Setting:**
- Within acceptable threshold → give product time to mature
- Beyond threshold → make changes to address underperformance

#### Product Metrics

**Two Spectrums:**
- **Empathy:** How close signal comes from user
- **Scale:** How easy to gather large amount of signal

| Type | Empathy | Scale | Examples |
|------|---------|-------|----------|
| Quantitative | Lower | Higher | Input metrics, output metrics |
| Qualitative | Higher | Lower | Customer interviews, support tickets |

**Quantitative: Input vs. Output Metrics**

| Type | Timing | Purpose | Examples |
|------|--------|---------|----------|
| **Input** | Short-term, early signal | Leading indicators | New acquired users, engagement rates, WAU |
| **Output** | Long-term | Results/outcomes | ARR, retention, chef annual income |

> **Key Insight:** Input metrics are most important early on—they predict output metrics and indicate whether you'll hit goals. Align with execs on these upfront.

**Qualitative Sources:**
- **Customer interviews:** Holistic view, surfaces problems hard to see in quant data
- **Support tickets:** Easy to work with, good signal of problem areas

> **Andy Johns:** "A good baseline metric for complaints is that twenty times the number of users have a problem than file a ticket about it. If you have a few dozen tickets on a topic or more, chances are you have hundreds of users experiencing the same issue."

**Prioritization:** You won't have time to build instrumentation for everything. Create prioritized list, balance qualitative and quantitative, prioritize input metrics for early signal.

### Instrumentation Dimensions

**Problem:** Even tracking everything in a "data lake" isn't enough. You need systems to organize and make sense of data—planned in advance.

> "If you aren't measuring something when your product first launched, you just missed the most valuable tracking window for your product."

| Dimension | Purpose | Example |
|-----------|---------|---------|
| **Track New Actions** | Events for actions that didn't exist before | Airbnb Experiences: impressions, clicks to details, booking experiences |
| **Classification** | Understand sets of events together (funnels, rates) | Airbnb: Rate of impressions to completion, retention for experience users |
| **Track New User States** | Account for new user categories | Airbnb: Active user could now be experiences-only (no bookings) |

---

## 6. Post-Launch Prep: Stakeholder Communication

### Communication Failure Sources

| Failure Area | Description |
|--------------|-------------|
| **Audience** | Not understanding each audience's priorities |
| **Objective** | Unclear purpose for communication |
| **Approach** | Wrong content, channel, or cadence |

### Four Communication Objectives

| Objective | Purpose |
|-----------|---------|
| **Educate** | Communicate performance, set expectations |
| **Learn** | Understand their information, get feedback |
| **Influence** | Move, convince, motivate in a direction |
| **Decide** | Get specific decisions (prioritization, resources, strategy) |

### Audience: Core Team

**Priorities:**
- Understand how product is performing
- Determine what to ship next

**Objectives:** Educate + Decide

**Approach:**
- **Content:** Latest performance, learnings, tradeoff evaluation
- **Channel:** In-person for decisions, async (Slack) for education
- **Cadence:** Daily

> **Matt Greenberg (Credit Karma Tax):** "The core team had pushed so hard toward the finish line that we had not carefully planned our communication strategy post-launch. We quickly saw that each executive was playing telephone for bits and pieces of functional updates... We changed to daily standup checking on project status messaging and main data inputs. This saved tons of time because the team could now have consistent messaging."

**Key Insight:** Build internal alignment first—it sets foundation for engagement with dependency teams and executives.

### Audience: Dependency Teams

**Priorities:**
- Know about short-term changes impacting their team
- Share feedback on problems they see

**Objectives:** Educate + Learn

**Approach:**
- **Content:** Upcoming changes with reasoning (supported by data)
- **Channel:** In-person
- **Cadence:** Weekly

**Benefits:**
- Get buy-in on recommendations requiring their action
- Avoid being blindsided by issues they're experiencing

> **Matt Greenberg (Credit Karma Canada):** "Dependency teams were in a hurry to move onto other priorities... We went on a learning campaign to understand their perspective. We were able to persuade them that completing fast follows now would save them tons of time in the long run."

### Audience: Executive Team

**Priorities:**
- Understand product performance
- Understand deviations from plan

**Mindset Shift:** Execs move from hands-off during development to hands-on post-launch. Their reputation and jobs are on the line.

**Objectives:** All four—Educate + Learn + Influence + Decide

**Approach:**
- **Content:** Latest performance, learnings (technical and product), guidance requests
- **Channel:** In-person
- **Cadence:** Weekly

**Benefits:**
- Control narrative and information flow
- Give executives confidence in core team
- Give executives sense of agency when they're most nervous

> **Matt Greenberg (Credit Karma Tax):** "A few weeks after we launched, the forecast looked less and less likely to come in at or above expectations... Our main objectives became learning and influencing. We were meeting live at least once a week with the executive team to get them involved in ideation... We took those opportunities to create a shared experience with the executive team, to influence their impression that we were on top of the issue."

---

## 7. Post-Launch Prep: Failure Modes & Recovery

### Five Common Failure Modes

| Failure Mode | Description | Example |
|--------------|-------------|---------|
| **Negative Impact on Life Raft** | New product hurts core metrics | Twitter 2010: Following down 30% after newsfeed redesign |
| **Poor Leading Indicators** | Acquisition/engagement underperform | Facebook Places: Low adoption, removed and integrated into status updates |
| **Regulatory Failure** | Didn't meet requirements | Lime: Exploited loopholes, cities banned scooter-share programs |
| **Security Flaws** | Unknown vulnerabilities introduced | Zoom: No passwords, strangers could join any meeting |
| **Customer Backlash** | Poor reception from users | Slack external DM: Backlash over harassment potential, feature removed |

### Assessment Dimensions

| Dimension | Low | High |
|-----------|-----|------|
| **Severity** | Few users affected, low visibility | Many users, high visibility, core functionality |
| **Difficulty** | Solved with existing feature/small enhancement | Impacts core product, needs external parties |

### Four Corrective Strategies

```
                          HIGH SEVERITY
                               ↑
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        │   TEMPORARILY        │      ROLLBACK        │
        │      BLOCK           │                      │
        │                      │                      │
LOW     │──────────────────────┼──────────────────────│ HIGH
DIFFICULTY                     │                      DIFFICULTY
        │                      │                      │
        │   OPTIMIZE IN        │      THROTTLE        │
        │      PLACE           │                      │
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ↓
                          LOW SEVERITY
```

#### 1. Optimize in Place

**When:** Low-to-high severity + easy to solve

**Definition:** Address issue quickly without removing product from public.

> **Zoom Example:** Security issues were severe but fix was straightforward (existing password functionality). Series of immediate improvements until perception changed.

#### 2. Throttle

**When:** Low-to-medium severity + any difficulty

**Definition:** Minimize traffic by reducing visibility/merchandising. Keep product running while developing fix.

**Use Case:** Want to continue gathering data while optimizing.

**Limitation:** Targets top of funnel—users already in product will still see it.

> **Matt Greenberg:** "Throttle was our most leveraged strategy at Credit Karma because it gave us time to monitor lagging indicators as we improved issues in the launched product."

#### 3. Temporarily Block

**When:** High severity + can't throttle or optimize

**Definition:** Take product down temporarily while implementing solution.

**Cost:** Public acknowledgment damages reputation.

> **Robinhood Example:** Halted GME trading because platform couldn't handle volume. High severity, difficult to solve, forced to use blocking strategy. Created strong customer and media backlash.

#### 4. Rollback

**When:** High severity + difficult/no solution in sight

**Definition:** Take product down with no intention of redeploying. Last resort.

**Silver Lining:** Shows humility, willingness to listen. Frees resources for next thing.

> **Slack Example:** External DM feature rolled back after heavy backlash. No readily available solution. Acknowledged mistake to user community.

---

## 8. Post-Launch Management: Shifting Gears

### The Transition Challenge

> **Andy Johns:** "It can feel like the new product is your baby after working on development for so long. Your entire world revolves around keeping it alive."

This momentum becomes a blind spot—teams fail to see how their approach must shift.

### Build Gear vs. Post-Launch Gear

| Dimension | Build Gear | Post-Launch Gear |
|-----------|------------|------------------|
| Role | Visionary, crafting enthusiasm | Tactical, data-driven |
| Progress | Comfort in ambiguity, reduce unknowns | Draw insights from usage and feedback |
| Decisions | Strategic, measured in months | Tactical, faster cadence |

> **Matt Greenberg:** "Even though we've spent time building conviction, when the product is truly in the users' hands we can see the reality of all of our hypotheses at play. This reality can be harsh or delightful, but regardless of the outcome, you must transition out of the build gear."

### The Four Gears

#### 1. Accelerate

**Signals:**
- Problem is meaningful to large portion of users
- Product solves the problem
- Experience is delightful
- Reaching/exceeding short-term goals
- Meaningful contribution to life raft metrics
- Positive qualitative feedback, word of mouth

> **Wealthfront Financial Planning:** "A few weeks after launch, it was clear that the product was catching fire." Majority engaging at high rate, high volume feedback (both positive and feature requests), meaningful contribution to life raft metrics.

> **Peter Reinhardt (Segment CEO):** "Product market fit doesn't feel like vague idle interest... It really feels like everything in your business has gone totally haywire. There's a big rush of adrenaline from customers starting to adopt it and ripping it out of your hands."

**Backlog Priorities:**
1. **Growth work** - Remove barriers to access, increase distribution
2. **Fast-follow features** - Items removed from scope, user-requested features
3. **Infrastructure scaling** - Prep systems for 2X, 5X, 10X before they break
4. **Ongoing feedback** - Qualitative efforts, more instrumentation

**Leadership Shift:** From high-level vision → pragmatic narrative of what's working and why (with concrete insights). Focus on driving key metrics.

#### 2. Wind Down

**Signals:**
- Conviction hypotheses very wrong (despite good execution)
- Problem not meaningful enough
- Product doesn't solve the problem
- Missing success metrics by order of magnitude
- Negative or limited qualitative feedback

> **Andy Johns:** "Negative feedback is an important signal, but volume of feedback can be another telling indicator. Getting no customer feedback is even worse than getting a lot of negative feedback, because no feedback means the new product is insignificant to their experience."

> **Wealthfront 529:** Very low volume of customer feedback compared to prior launches. Customer support asked if product was even turned on. Low engagement despite directing users to it. No functional issues—users just didn't need it. User interviews revealed it solved a "veggie problem."

**Backlog Priorities:** Solve existential risks from infrastructure/instrumentation, then move on.

**Leadership Shift:** Focus on lessons learned, congratulate team on execution, transition to what's next.

#### 3. Improve

**Signals:**
- Clear painkiller problem exists
- Product as-is doesn't solve it
- Too much friction OR doesn't actually solve problem
- Some metrics at/above expectation, others substantially missing
- Realistic path to close the gap
- Usage data and feedback point to alternative solution

> **Credit Karma Tax:** Free wasn't delightful enough to overcome switching costs from TurboTax. But data from filing taxes was meaningful for other business units.

**Backlog Priorities:**
1. Solve existential risks
2. Stop development of fast-follows (based on old hypotheses)
3. Strategic reassessment of feature strategy (often needs new marketing/positioning)

**Leadership Shift:** Pragmatic narrative differentiating good from bad. Clearly communicate what's still promising.

> **Credit Karma Tax Response:** Launched audit protection for just uploading tax return (even from other company). Core team was pragmatic and balanced—humility about mistakes, confident optimism about remaining opportunities.

#### 4. Restart

**Signals:**
- Multiple core hypotheses incorrect
- Conviction that painkiller problem exists, but product won't meet potential
- Often: conviction that different team/approach could have succeeded
- Missing success metrics with no realistic path to close gap
- Dissatisfaction with solution itself (not indifference to problem)
- Evidence of poor execution/design
- Often: toxic team environment, collaboration challenges

**Backlog Priorities:** Solve existential risks, stop further development, start over from building conviction with lessons learned.

**Leadership Shift:** Make hard decisions to transition to clean slate.

> **Credit Karma Auto:** Original product focused on refinancing auto loans. Users could get better rates but too much friction to make the change. Restarted as "auto hub"—car value estimates, warranty info, recalls, insurance, Carvana integration.

### The Ambiguous Middle

> **Matt Greenberg:** "It's often clear what to do when there's a home run. And it's clear what to do when there's a strikeout. But there's a lot of complexity in the ambiguous zone of singles, doubles, and walk-ons, where it's unclear what is obviously good or bad."

---

## 9. Retrospectives at Scale

### Why Standard Retrospectives Fail for Big Bets

| Challenge | Description |
|-----------|-------------|
| **Outcome Bias** | Focus on outcome rather than process. Lack of context leads to "good outcomes = good process" |
| **Recency Bias** | Focus only on late-stage events, missing earlier learning opportunities |
| **Unclear Ownership** | No clear owner for implementing retrospective insights |
| **Procrastination** | No trigger to remind you; keeps getting pushed |
| **Missing Dependency Teams** | Forgetting to include teams essential to the process |

### Adjustments for Big Bets

| Adjustment | Purpose |
|------------|---------|
| Bring change log | Highlight decision notes for major pivot points |
| Structure around phases/milestones | Often helpful to work backwards |
| Include early visuals | Product reviews, kick-off themes |
| Assign facilitator + follow-up owners | Each major team needs someone to own implementing feedback |
| Use less-involved facilitator | If expecting challenging discussion |
| Schedule 2-4 weeks post-launch immediately | Easier to move than remember |
| Invite dependency teams | If they owned an output or milestone |
| Focus on highest ROI lessons | Better to implement few well than many poorly |

---

## Action Items & Checklists

### Pre-Launch Checklist

**Staging Strategy:**
- [ ] Identify constraint dimensions (Resources, Customer Needs, Regulatory)
- [ ] Select applicable staging strategies
- [ ] Define combined staging approach
- [ ] Document rollout stages and thresholds

**Burndown List:**
- [ ] List ALL remaining work (frontend, backend, marketing, bugs)
- [ ] Categorize: Blocker / Critical / Non-Critical
- [ ] Monitor capacity (alert at 90%+)
- [ ] Review and reprioritize daily
- [ ] Accept that most additions will be bugs

**Hypotheses Rebaseline:**
- [ ] Review original kick-off document
- [ ] Document changes to user profile
- [ ] Document changes to moments of delight
- [ ] Document changes to business value assumptions
- [ ] Communicate rebaselined hypotheses to all teams

**Runbooks:**
- [ ] Identify all impacted teams (not just product/engineering)
- [ ] Create runbooks for each team with: Owner, Description, Success Outcome, Deadline
- [ ] Coordinate with third parties (identify POC, share runbooks, align sequencing)
- [ ] Schedule war room for launch day
- [ ] Communicate schedule to executives and non-project teams

### Post-Launch Prep Checklist

**Metrics:**
- [ ] Define life raft metrics and acceptable impact thresholds
- [ ] Define input metrics (leading indicators)
- [ ] Define output metrics (lagging indicators)
- [ ] Plan qualitative feedback collection
- [ ] Prioritize metrics by importance

**Instrumentation:**
- [ ] Identify new actions to track
- [ ] Build classification logic for funnels/rates
- [ ] Account for new user states
- [ ] Build dashboards for daily actionability

**Communication Plan:**
- [ ] Define approach for core team (daily)
- [ ] Define approach for dependency teams (weekly)
- [ ] Define approach for executive team (weekly)
- [ ] Align on success metrics with execs upfront

**Disaster Planning:**
- [ ] Map potential failure modes
- [ ] Assess severity and difficulty for each
- [ ] Pre-plan corrective strategies
- [ ] Identify triggers for each strategy

### Post-Launch Checklist

**Gear Identification:**
- [ ] Monitor input metrics against expectations
- [ ] Track qualitative feedback volume and sentiment
- [ ] Assess life raft metric impact
- [ ] Determine which gear you're shifting into

**Retrospective:**
- [ ] Schedule for 2-4 weeks post-launch
- [ ] Invite dependency teams
- [ ] Bring change log with decision notes
- [ ] Assign facilitator and follow-up owners
- [ ] Create implementation plan for key learnings

---

## Key Quotes Reference

| Quote | Source | Topic |
|-------|--------|-------|
| "Launching a big bet is like filing for IPO. You need to prepare for the actual event, but you also need to have a plan for what comes after it." | Andy Johns | Post-Launch Prep |
| "Overuse of critical often means that you might have people working on an item of slightly lower value than they could be working on. If everything is the same priority, nothing is prioritized." | Matt Greenberg | Burndown Lists |
| "You need to use your judgment when trying to push a team to work unsustainably. It rarely works out to take out a mortgage against your future; almost every time I've done it, I needed that team at their best later and they weren't." | Matt Greenberg | Capacity Management |
| "When faced with a choice between A and B, leaders want a way out. They want to be able to do both... Choosing both at this stage often costs you both because of future tradeoffs." | Matt Greenberg | Decision Speed |
| "Under conditions of complexity, not only are checklists a help, they are required for success." | Atul Gawande | Runbooks |
| "Engaging customer success early in the process of launch prep took a lot of work and likely negative outcomes off the table for the core team, and gave us tons of confidence going into big releases." | Matt Greenberg | Customer Success |
| "A good baseline metric for complaints is that twenty times the number of users have a problem than file a ticket about it." | Andy Johns | Support Tickets |
| "Even though we've spent time building conviction, when the product is truly in the users' hands we can see the reality of all of our hypotheses at play. This reality can be harsh or delightful, but regardless of the outcome, you must transition out of the build gear." | Matt Greenberg | Shifting Gears |
| "Negative feedback is an important signal, but volume of feedback can be another telling indicator. Getting no customer feedback is even worse than getting a lot of negative feedback, because no feedback means the new product is insignificant to their experience." | Andy Johns | Wind Down |
| "Product market fit doesn't feel like vague idle interest... It really feels like everything in your business has gone totally haywire. There's a big rush of adrenaline from customers starting to adopt it and ripping it out of your hands." | Peter Reinhardt | Accelerate |
| "It's often clear what to do when there's a home run. And it's clear what to do when there's a strikeout. But there's a lot of complexity in the ambiguous zone of singles, doubles, and walk-ons." | Matt Greenberg | Ambiguous Middle |

---

## Case Studies Index

| Company | Product/Initiative | Lesson | Section |
|---------|-------------------|--------|---------|
| CD Projekt | Cyberpunk 2077 | All three types of missed value | Missed Value |
| CoSo IT | Premium customer feature | Don't rush to high-value clients first | Staging |
| Credit Karma | Tax product | Audit protection for trust; switching costs | Multiple |
| Apple | Maps | Quality issues create lasting perception problems | Quality |
| Twitter | 2010 Newsfeed redesign | 30% drop in following from staging failure | Staging |
| Wealthfront | Portfolio Analysis Tool | Staging failure exposed UX issues to majority | Staging |
| Wealthfront | Financial Planning | Accelerate gear example | Shifting Gears |
| Wealthfront | 529 College Savings | Wind Down gear; veggie problem | Shifting Gears |
| Wealthfront | Auto-Pilot | Marketing and FAQ coordination | Runbooks |
| Facebook | Places | Poor leading indicators → remove feature | Failure Modes |
| Facebook | Early testing | New Zealand/Australia as representative markets | Staging |
| Uber | Scooters/bikes | Geographic staging for regulations | Staging |
| Clubhouse | iOS app | Resource constraints drove platform staging | Staging |
| Airbnb | Experiences | New instrumentation dimensions | Instrumentation |
| Tickle | Contact loading | Failure to instrument led to missing opportunity | Instrumentation |
| Lime | City expansion | Regulatory failure from exploiting loopholes | Failure Modes |
| Zoom | Security features | Optimize in place corrective strategy | Corrective Strategies |
| Slack | External DM | Rollback after backlash | Corrective Strategies |
| Robinhood | GME trading | Temporarily block under pressure | Corrective Strategies |
| Gojek | Free rides promotion | QA performance marketing failure | Runbooks |
| Asana | Enterprise launches | Customer success coordination | Runbooks |
| Segment | PMF experience | "Market dragging you forward" | Accelerate |
| Credit Karma | Canada launch | Dependency team alignment | Communication |
| Credit Karma | Auto | Restart with auto hub pivot | Restart Gear |

---

## Frameworks Summary

| Framework | Purpose | Key Components |
|-----------|---------|----------------|
| **Day Hike vs. Everest** | Understand scale difference between features and big bets | Path, Preparation, Post-summit, Team, Coordination |
| **Missed Value** | Identify launch failure types | Wrong Way, Wrong Thing, Poor Quality |
| **Three-Part Launch System** | Structure launch process | Launch Prep, Post-Launch Prep, Post-Launch Management |
| **Staging Strategies** | Determine how to roll out | % of Users, Customer Segment, Technology Platform |
| **Burndown List** | Prioritize remaining work | Blocker, Critical, Non-Critical |
| **Runbook System** | Ensure coordination | Owner, Description, Success Outcome, Deadline |
| **Metrics Framework** | Measure success | Life Raft, Input, Output, Qualitative |
| **Instrumentation Dimensions** | Ensure data capture | New Actions, Classification, New User States |
| **Communication Framework** | Manage stakeholders | Audience, Objective, Approach |
| **Failure Mode Assessment** | Plan corrective action | Severity x Difficulty matrix |
| **Corrective Strategies** | Respond to failures | Optimize, Throttle, Block, Rollback |
| **Four Gears** | Navigate post-launch | Accelerate, Improve, Restart, Wind Down |
| **STARS Adaptation** | Leadership transition | Build Gear → Post-Launch Gear |

---

## Related Resources

- Reforge Launch Strategy Template
- Product Strategy Program (Growth work, Feature Strategy)
- STARS Transition Framework (Michael D. Watkins, "The First 90 Days")
- The Checklist Manifesto (Atul Gawande)
