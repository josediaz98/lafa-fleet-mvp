# Product Strategy: Collected Insights
> Reforge Program | Product Leaders crossing from Senior PM to Director/VP

## Sources

| Module | Focus | Key Contributors |
|--------|-------|------------------|
| Leading Product Strategy | Transition framework, four work types | Casey Winters, Fareed Mosavat, Bangaly Kaba |
| Feature Strategy | TARS framework, feature evaluation | Casey Winters, Fareed Mosavat |
| Growth Strategy | Loops, retention, monetization | Casey Winters, Fareed Mosavat, Matt Greenberg |
| PMF Expansion Strategy | Saturation, expansion categories | Casey Winters, Fareed Mosavat, Ravi Mehta, Brandon Chu |
| Scaling | Tech, process, user scaling | Casey Winters, Fareed Mosavat, Matt Greenberg, Ravi Mehta |
| Product Workplan | Sequencing, communication | Casey Winters, Fareed Mosavat, Ravi Mehta |

---

## Executive Summary

The transition from Senior PM to Product Leader represents a fundamental shift—not an intensification of existing skills but the development of entirely new ones. This "Product Leader Canyon" requires abandoning the depth-first approach that created IC success and developing breadth across four distinct types of product work: Feature Strategy (enhancing value), Growth Strategy (maximizing value), PMF Expansion (adding new value), and Scaling (enabling infrastructure).

The critical insight running through all modules: **each work type requires different toolkits, metrics, and processes**. Applying a single approach across all four is the root cause of most product dysfunction. Great product strategy is distinguished by being targeted (makes trade-offs), having visibility (sees future constraints), achieving fluency (entire org can articulate it), and compounding (investments reinforce each other).

Growth thinking shifts from funnels to loops—systems where output becomes input, creating compounding returns. Retention decomposes into activation (new user habits), engagement (deepening usage), and resurrection (win-back). Monetization aligns four levers (scale, what, amount, when) with consumer perception of value.

Saturation is inevitable for successful products and manifests as market saturation, product saturation, or PMF degradation. Expansion should leverage existing PMF as a "head start" through adapted use cases (lowest risk), complementary use cases (medium risk), or new use cases (highest risk).

Scaling ensures other strategies can operate effectively through tech scaling (infrastructure ahead of growth), process scaling (handling increased complexity), and user scaling (managing unintended uses). The Product Workplan bridges strategy and roadmap through a sequencing matrix of impact × urgency.

---

## 1. The Product Leader Transformation

### The Canyon Metaphor

| Career Stage | Challenge Type |
|--------------|----------------|
| APM → PM → Senior PM | Steeper climbs (same muscles, harder problems) |
| Senior PM → Product Leader | Canyon crossing (entirely new skills required) |

**Two Required Transitions:**
1. **Depth → Breadth**: From expertise in one type of product work to capability across multiple types
2. **Outcomes → Strategy**: From influencing specific outcomes to influencing broader strategy

> "What got you here, won't get you there."

### T-Shaped Capability

Most PMs build deep expertise in one area (the I). Becoming a product leader means extending that into a T—sufficient breadth across all product work types.

**T-shaped means:**
- NOT becoming expert in everything
- YES gaining toolkit, mental models, and language to diagnose problems, communicate with clarity, and provide course corrections

> "The best feedback I've received as a manager was when someone asked how I could walk into a room with 30% of the context and identify what's wrong and help course correct. But this is the essence of the Product Lead role."
> — Bangaly Kaba, former Head of Growth at Instagram

### The Over-Reliance Trap

**Biggest mistake:** Over-relying on familiar tools for unfamiliar problem types.

**Symptoms of toolkit mismatch:**
- Lots of Version Zero, incomplete experiences
- All efforts measured by a single metric
- Team moving too slowly (surface area too large)
- MVP terminology used to cut time/scope
- Constantly fighting fires
- Work bogged down in technical debt

### Symptoms of Poor Strategy

- **Unmeaningful work** — Efforts that don't matter or are merely incremental
- **Randomness** — No common purpose or theme
- **Thrashing** — Goals change with the weather
- **Lack of purpose** — People don't understand how they fit in
- **Surprise ceilings** — Hit local maximums unexpectedly
- **Can't get buy-in** — Struggle to gain support

---

## 2. Four Types of Product Work

After achieving initial PMF, product leaders must orchestrate four distinct types of work:

### 2.1 Feature Strategy
**Purpose:** Enhance existing value proposition

- Enhance existing product features
- Develop new features
- Add incremental value
- Extend value proposition to marginal users

### 2.2 Growth Strategy
**Purpose:** Maximize existing value proposition

- Improve acquisition
- Improve retention
- Improve monetization
- Remove barriers, increase distribution

### 2.3 PMF Expansion
**Purpose:** Add new value propositions

- Adapt products to new markets
- Add new complementary products
- Anticipate saturation (market, product, PMF degradation)

### 2.4 Scaling
**Purpose:** Enable continued product success

- Tech Scaling (infrastructure, debt, modernization)
- Process Scaling (throughput, quality, single points of failure)
- User Scaling (value-added uses, under-served segments, bad behavior)

### Portfolio Misalignment Patterns

> "One of the most common conflicts I've seen is when product leaders try to apply a single development process, measure of success or strategy, to all the different types of product work."
> — Fareed Mosavat

| Pattern | Result |
|---------|--------|
| Growth when you should do Features | Premature optimization; product isn't ready to scale |
| Features when you should do Growth | Over-expanded surface area; should get product to more people |
| Growth/Features when you should expand PMF | Hitting ceiling/local maximum |

**Pinterest Example:**
> "My first year of Pinterest, we built a Maps product and a Q&A product, neither of which had any material impact to the business and were later deleted. In year two though, we simply changed the 'Pin It' button to say 'Save' and we got a 15% increase in our activation rate just from that."
> — Casey Winters

---

## 3. Feature Product Fit & Evaluation

### Feature Product Fit

> Feature Product Fit is when features meaningfully contribute to a product's ability to create or capture value.

**Net effect principle:** Feature Product Fit isn't about a feature's single metric—it's about net effect on overall product value. A feature could increase monetization but decrease retention. If net effect is negative → no Feature Product Fit.

### TARS Framework

| Stage | Definition | Key Metric |
|-------|------------|------------|
| **Target** | Define who the feature is for | % of active users in target |
| **Adopted** | % of target who start using | Active Adopted / Active Target |
| **Retained** | % of adopted who continue using | Retention curve to steady state |
| **Satisfied** | % of retained who find it easy | Customer Effort Score adaptation |

### Target Population

| Segment | Definition | Strategy |
|---------|------------|----------|
| Core users | Feature specifically designed for them | Primary focus |
| Adjacent users | Get some value, but not designed for them | Expansion opportunity |
| Non-adjacent users | Don't use, wasn't designed for them | Ignore |

### Adoption Benchmarks

| Problem Severity | Target Adoption |
|------------------|-----------------|
| High | ~80% |
| Medium | ~50-60% |
| Low | ~30-40% |

**Low Adoption Causes:**
1. **Undersurfaced** — Awareness, discoverability, or friction issues
2. **Overscoped Target** — Defined too broadly
3. **Intentionally Scarce** — Value diminishes as more adopt (social products)

### Retention Analysis

**Universal retention problem sign:** Curve never stabilizes (no users build sustainable habit).

| Strategic Importance | Target Retention |
|---------------------|------------------|
| High | 50%+ |
| Medium | 25-35% |
| Low | 10-20% |

**Five causes of low retention:**
1. Buggy features
2. Novelty features (diminishing returns)
3. Cannibalized features
4. Dud features (obsolete, redundant, or incompatible)
5. Loss aversion trap (afraid to kill)

> "A lot of product leaders suffer from loss aversion when it comes to killing features."

### Hidden Detractors

> A Hidden Detractor is a feature that has good adoption and retention numbers, but is a frustrating experience.

**Examples:** Slack Threads, Craigslist search, Workday PTO requests

**Risk:** Leave you susceptible to disruption by someone who smooths the friction.

### S/T Score & Feature Matrix

**S/T Score** = Satisfied Users / Target Users

| Quadrant | Definition | Strategy |
|----------|------------|----------|
| **Liability** | High importance, low S/T | HIGHEST priority—iterate heavily |
| **Project** | Low importance, low S/T | Decide: invest or kill |
| **Core** | High importance, high S/T | Maintain + expand; capture more value |
| **Overperforming** | Low importance, high S/T | Monetize; capture more value |

> "Liability features require a lot of iteration and feedback to move up the gap. Many might not get there, but those that do often become the largest impact features."
> — Casey Winters

> "The question is no longer, should I kill this feature? Rather, now that I've killed this feature, what does it allow me to invest in?"
> — Fareed Mosavat

### New Feature Development

**Product leader's three roles:**
1. Pressure test the insight
2. Assess prioritization
3. Sense check the launch plan

**Three insight sources:**
| Source | What It Answers |
|--------|-----------------|
| Strategic | If solved, how impactful for business? |
| User | What problem exists and why? |
| Data | How many people does it affect? |

**Four prioritization principles:**
1. Solve multiple problems with single feature
2. Broadly applicable > segment-specific
3. Recurring value > one-time value
4. Create value > capture value

**Launch methods by confidence:**
| Confidence | Ambiguity | Method |
|------------|-----------|--------|
| Not confident | High | Experimental |
| Medium | Medium | MVF (Minimum Viable Feature) |
| Very confident | Low | Phased |

---

## 4. Growth Loops & Retention Architecture

### From Funnels to Loops

The traditional AARRR funnel creates problems:
- Linear thinking misses compounding effects
- Siloed metrics create organizational dysfunction
- No connection between output and input

**Growth loop structure:**
1. **Input** — New users, content, or capital enters
2. **Action** — Users take core action generating value
3. **Output** — Action produces something reinvestable
4. **Reinvestment** — Output becomes new input

> "Loops are better than funnels because they capture the compounding nature of growth. What comes out goes back in."

### Acquisition Loop Categories

| Category | Mechanism | Key Constraint |
|----------|-----------|----------------|
| Viral | Users bring users | Network density |
| Content | Content brings users | Content production |
| Paid | Capital brings users | Unit economics |

**Viral loop types:**
1. Word of mouth (hardest to manufacture, most valuable)
2. Organic viral (built into product mechanics)
3. Casual contact (ambient visibility)
4. Incentivized viral (explicit rewards)

**Content loop permutations:**
| Creation | Distribution | Example |
|----------|--------------|---------|
| User Generated | User Distributed | TikTok, Twitter |
| User Generated | Company Distributed | Pinterest, Yelp |
| Company Generated | User Distributed | BuzzFeed |
| Company Generated | Company Distributed | HubSpot blog |

**Key insight:** User-generated, company-distributed loops scale best—creation scales with users while distribution is optimized centrally.

### Retention Architecture

Retention isn't a single metric—it's three distinct inputs:

| Input | Definition | Focus |
|-------|------------|-------|
| Activation | New users forming habits | First-time experience |
| Engagement | Active users deepening usage | Ongoing value delivery |
| Resurrection | Dormant users returning | Win-back mechanics |

**Retention equation:**
Retained = Activated + Engaged + Resurrected - Churned

### The Habit Moment

**Definition:** The point where a user has formed sufficient habit that retention probability significantly increases.

**Format:** X actions in Y time period (XaY)

| Product | Habit Moment |
|---------|--------------|
| Facebook | 7 friends in 10 days |
| Slack | 2,000 messages sent (team) |
| Dropbox | 1 file in 1 folder on 1 device |

**Finding your habit moment:**
1. Identify retained vs. churned user cohorts
2. Analyze behavior differences in first N days
3. Find the action that best predicts retention
4. Express as XaY metric

### Four Engagement Levers

1. **Frequency** — How often users perform core action
2. **Intensity** — Depth of each session
3. **Use Cases** — Number of problems solved
4. **Feature Spread** — Breadth of feature adoption

### Monetization Model

Four levers define any monetization model:

| Lever | Question | Examples |
|-------|----------|----------|
| **Scale** | How does price scale with value? | Per seat, per usage, flat rate |
| **What** | What features are charged for? | Core, add-ons, premium |
| **Amount** | What is the actual price? | $10/month, $0.05/transaction |
| **When** | When is payment collected? | Upfront, recurring, per transaction |

**Monetization triad alignment:**
1. Consumer view (how customers perceive value)
2. Growth loops (how monetization affects acquisition/retention)
3. Cost of revenue (cost to deliver value)

> "When our monetization model is aligned with these three, it generates maximum revenue. However, this alignment is not static."

### Customer States

| State | Definition | Objective |
|-------|------------|-----------|
| Potential | Haven't transacted yet | Convert to healthy |
| Existing Healthy | Paying with good engagement | Expand revenue |
| At-Risk | Engagement declining | Retain and restore |
| Churned | Stopped transacting | Resurrect and reactivate |

**Optimization equation:**
Perceived Value > Perceived Price + Transaction Friction

---

## 5. PMF Expansion & Saturation

### Understanding Saturation

**Saturation** is a barrier to continued expansion based on current product-market fit.

> "Saturation is a side effect of success. Every successful company will get there."
> — Fareed Mosavat

### Three Types of Saturation

| Type | Definition | Indicator |
|------|------------|-----------|
| **Market Saturation** | Remaining market doesn't make sense to pursue | Cost to acquire > value captured |
| **Product Saturation** | Improvements yield diminishing returns | Incremental features don't move metrics |
| **PMF Degradation** | Competition or changing preferences erode fit | Market share loss, retention decline |

### PMF Degradation Mechanics

**1. Red Queen Effect**
> Any competitive situation where you need to innovate just to stay in the same place.
> — William Barnett, Stanford

**2. Over-optimizing for Power Users**
- **Feature creep** — Product complexity alienates casual users
- **Price creep** — New features increase prices, creating friction for new users

**Adobe Photoshop Example:** Features catered to power users added complexity, creating opportunity for Canva and Figma.

### Lagging Indicators of Saturation

By the time you detect these, saturation has already happened:
1. Volume metrics flat or declining
2. Stagnation in key metrics
3. Diminishing returns on effort
4. Stagnant TAM (for huge market share companies)

> "You should be building new markets and products to make sure growth doesn't flatline, because PMF expansion often requires time to ramp up."
> — Casey Winters

### Three Expansion Categories

| Category | Definition | Risk Level |
|----------|------------|------------|
| **Adapted Use Case** | Same problem, new market | Lowest |
| **Complementary Use Case** | New problem that reinforces existing | Medium |
| **New Use Case** | New problem, doesn't reinforce existing | Highest |

### Adapted Use Case Types

1. **Geographic Expansion** — Launch to new geographic market
2. **Tech Adaptation** — Same problem with technology change
3. **Unbundling** — Split use case into separate product

> "Adapted use case expansions can be some of the easiest ways to drive step changes. Frequently, a product is very close to unlocking a new audience if it just takes time to understand what is preventing that audience from being successful."
> — Casey Winters

### Complementary Use Case Types

1. **Horizontal Expansion** — New product for same market (customer or departmental cross-sell)
2. **Vertical Expansion** — New use case within existing product (category expansion, up/down market)
3. **Platform Expansion** — Developer platform, marketplace platform, or ad network

### New Use Case Types

1. **Strategic Sequence** — Positions for future complementary relationship
2. **Diversification** — Multiple bets across different use cases
3. **First and Best Customer** — Commercialize internal tools

### Evaluating Expansion Opportunities

**Five Macro Questions (from Profit from the Core):**
1. How much does this strengthen, protect, and reinforce the core?
2. What are the chances of becoming a leader?
3. Could this have defensive benefit against competitors?
4. Does this position us for stronger future adjacent moves?
5. Can we be certain of executing well?

**Micro Evaluation Dimensions:**

**Shared Capabilities:**
- Functional (technology, distribution, operations)
- Domain-specific (IP, industry knowledge, hard assets)
- Defensibility (network effects, brand, scale, embedding)

**Market Attractiveness:**
- Market size (vs. existing)
- Growth potential (vs. existing)
- Competitive density (open → fragmented → consolidated)

### PMF Expansion Map

Plot opportunities on 2x2:
| Quadrant | Recommendation |
|----------|----------------|
| High attractiveness, High capabilities | **Pursue** |
| High attractiveness, Low capabilities | **Build, partner, or acquire** capabilities |
| Low attractiveness, High capabilities | **Redefine market** (Blue Ocean) |
| Low attractiveness, Low capabilities | **Avoid** |

### Three Expansion Mistakes

1. **Mistiming** — Too early (can't compete) or too late (saturated)
2. **Over-resourcing** — Too many people kills speed and iteration
3. **Jumping to growth** — Before expansion reaches PMF

**Three indicators of PMF reached:**
1. Stable retention (curve stabilizes)
2. Meaningful usage (not just light engagement)
3. Top line organic growth (people telling others)

---

## 6. Scaling Infrastructure

### Three Types of Scaling

| Type | Purpose | Key Areas |
|------|---------|-----------|
| **Tech Scaling** | Adapt technology for new functionality | Platform/infrastructure, debt management, modernization |
| **Process Scaling** | Handle increased scope | Standardize, delegate, hire, augment, redesign |
| **User Scaling** | Accommodate different user interactions | Value-added uses, under-served segments, bad behavior |

### Indicators of Scaling Issues

1. Strategic priorities constrained by capabilities
2. Frequent predictable frustrations
3. Significant unplanned work
4. Ad hoc workaround processes
5. Declining user-facing indicators

### Tech Scaling

**Two critical reasons:**
1. Underinvesting leads to PMF degradation (performance, reliability)
2. Limits ability to do Growth, Feature, or PMF Expansion work

**Technology adoption stance:**
| Role | Stance | Example |
|------|--------|---------|
| Differentiator | Innovator/Early Adopter | Netflix recommendation engine |
| Enabler | Early/Late Majority | Database selection |

> "It's appropriate to be an innovator when it's a core differentiator. When it's not, it's appropriate to be late majority or even laggard."
> — Matt Greenberg

### Managing Technical Debt

**Five prioritization criteria:**
| Criterion | Higher Priority When... |
|-----------|------------------------|
| Confidence | High confidence problem will occur |
| Time | Problem is near-term |
| Impact to User | High impact to users |
| Sequence | Blocks key initiatives |
| Accumulated Debt | Accumulated debt is high |

**Three debt patterns:**
- **Systemic Debt** — Previous decisions create organizational-level work
- **Extinction Event** — Unexpected event causing significant damage (resolve immediately)
- **Papercut Debt** — Low confidence, not time-sensitive (deprioritize)

> "Scaling is all about living in a burning house. Everything is on fire all the time. You just have to fix the most broken, most impactful stuff and not get distracted by the fact that basically everything is broken."
> — Matt Greenberg

### Modernization

**Two types:**
- Frontend redesign (UI/UX)
- Backend redesign (functionality)

**Why modernizations fail:**
1. Breaking user habits (too much change too fast)
2. Lack of testing/iteration

**When modernization makes sense:**
1. Grouped with major product updates
2. Major technology shift leaves product vulnerable (Flash → JS, Desktop → Mobile, On-premise → Cloud)

**Five success factors:**
1. Align with insights (pressure test with data)
2. Define scope and objectives
3. Deconstruct and simplify (discrete iterations)
4. Collaborate cross-functionally
5. Balance user needs (power users vs. new users)

> "In many ways, large modernization efforts are a mistake. They mean you failed to iterate on your design patterns over time."
> — Casey Winters

### Process Scaling

**Five approaches:**
| Approach | Description |
|----------|-------------|
| Standardize | Document steps; minimize variability |
| Delegate | Train employees with less opportunity cost |
| Hire/Outsource | Add capacity |
| Augment | Build or adopt automation tools |
| Redesign | Structurally change process |

**Implementation dip:** All approaches start with lower quality/output before improving.

### Value Stream Mapping

**Three types of bottlenecks:**
| Type | How to Identify |
|------|-----------------|
| Throughput | What steps slow the process? |
| Quality | Work backwards from output quality |
| Single Point of Failure | List who's responsible and who can backup |

**Bullwhip Effect:** Small variations early create large variations in output. Fix upstream bottlenecks first.

### User Scaling

**Three types of unintended use:**
| Type | Approach |
|------|----------|
| Value-Added Use Cases | Treat as PMF expansion opportunity |
| Under-Served Segments | Revisit growth strategy for segment |
| Bad Behavior | Policies, moderation, redesign |

**Four types of negative consequences:**
1. Dissatisfaction
2. Brand damage
3. User harm
4. Societal harm

**Three management levers (escalating):**
1. Establish and enforce policies
2. Moderate content (passive or active)
3. Redesign product

> "Product leaders should play the role of devil's advocate to uncover how their product could potentially harm users."
> — Casey Winters

---

## 7. Workplan Development & Communication

### The Product Workplan

**Purpose:** Bridge between abstract org strategy and tactical roadmap.

| Level | Problem When Overemphasized |
|-------|---------------------------|
| Org Strategy | Too abstract, not actionable |
| **Product Workplan** | **The missing bridge** |
| Product Roadmap | Optimizes short-term at expense of long-term |

> "Too often when you're focusing on the short-term instead of long-term value, you can optimize your way straight into a strategic brick wall."
> — Casey Winters

### Four Development Phases

| Phase | Output |
|-------|--------|
| 1. Identify Strategic Priorities | Strategic Priority Map (relevant, peripheral, tangential) |
| 2. Brainstorm Product Work | Ideation Board (all four types) |
| 3. Develop Workplan | Product Sequencing Matrix |
| 4. Communicate & Iterate | Living Document |

### Strategic Priority Map

| Category | Definition |
|----------|------------|
| **Relevant** | Within your sphere of influence—north star |
| **Peripheral** | Can influence but don't own—provide insight |
| **Tangential** | Explicitly outside influence—don't include |

**Priority clarification:**
- **Outcome** — Action priority focuses on
- **Criteria** — Direction + magnitude
- **Rationale** — Why this priority matters

### Charter Principles for Ideation

| Type | Question |
|------|----------|
| **Guardrails** | What could derail product work? (top-down) |
| **Lessons Learned** | What insights are critical? (bottom-up) |
| **Validated Capabilities** | What has succeeded to leverage? |

### Product Sequencing Matrix

| | High Urgency | Low Urgency |
|---|---|---|
| **High Impact** | **Cornerstone** (do first) | **Important but Flexible** (prep/validate) |
| **Low Impact** | **Supporting** (mitigate/queue) | **Non-Essential** (deprioritize) |

### Evaluating Impact

| Factor | Higher Impact When... |
|--------|----------------------|
| Upside | High reach + high value |
| Strategy Intersection | Supports 2+ priorities |
| Compounding | Returns compound over time |
| Differentiation | Novel approach or unique capability |

### Evaluating Urgency

| Factor | Higher Urgency When... |
|--------|------------------------|
| Sequencing | Prerequisite for cornerstone work |
| Competition | Near-term, severe threat |
| Leadership Expectations | Short deadline |

**Four types of sequencing:**
1. Learning (validate hypothesis first)
2. Technical (work X required before Z)
3. User Behavior (current → intermediate → target)
4. Asset (need content/data/resource first)

### Communication Direction

| Direction | Audience Needs | Emphasis |
|-----------|---------------|----------|
| **Up** | Execution confidence | **HOW** will we reach priorities? |
| **Down** | Alignment and context | **WHY** are we doing this work? |

**Iterative release:**
| Phase | Audience | Feedback Type |
|-------|----------|---------------|
| 1 | Direct supervisor, group leads | Detailed |
| 2 | CPO/exec, team leads | High-level |
| 3 | Full leadership, entire team | Clarifying |

### Workplan Trend Tracking

| Trend | Signal | Solution |
|-------|--------|----------|
| Firefighting | Most work in Cornerstone | Allocate to Important-but-Flexible |
| One-Dimensional | Same work type dominates | Diversify types |
| Stagnation | Work stays in quadrant 2+ periods | Reclassify or develop execution plan |

---

## Action Items (Deduplicated)

### Immediate: Assessment & Diagnosis

- [ ] Map current product work across the four types (Feature, Growth, PMF Expansion, Scaling)
- [ ] Audit current toolkit—which types are you strongest/weakest in?
- [ ] Identify if you're applying wrong toolkit to any area
- [ ] Evaluate strategy on four dimensions: targeted, visible, fluent, compounding
- [ ] Test fluency: Can everyone articulate strategy and their role?

### Short-term: Frameworks Implementation

**Feature Evaluation:**
- [ ] Define qualitative feature map for key features (target, user value, business value)
- [ ] Measure adoption against problem severity benchmarks
- [ ] Plot retention curves and identify steady states
- [ ] Calculate S/T scores; plot feature matrix
- [ ] Prioritize liability features; decide on project features

**Growth Architecture:**
- [ ] Map all acquisition loops by category (viral, content, paid)
- [ ] Identify primary loop—where does most growth come from?
- [ ] Define retention event and frequency based on natural use frequency
- [ ] Identify and quantify habit moment (XaY metric)
- [ ] Document monetization model (Scale, What, Amount, When)

**Saturation & Expansion:**
- [ ] Identify which saturation type threatens product
- [ ] Monitor lagging indicators (volume, metric stagnation, diminishing returns)
- [ ] Answer five macro questions for expansion opportunities
- [ ] Score shared capabilities and market attractiveness
- [ ] Plot opportunities on PMF Expansion Map

**Scaling:**
- [ ] Audit technical debt using five prioritization criteria
- [ ] Value stream map critical processes to find bottlenecks
- [ ] Segment user data to identify anomalies beyond averages
- [ ] Audit product for bad behavior potential

### Strategic: Workplan Development

- [ ] Map strategic priorities into relevant, peripheral, tangential
- [ ] Clarify each priority: outcome, criteria, rationale
- [ ] Prepare ideation session with charter principles
- [ ] Evaluate product work on impact and urgency factors
- [ ] Map to Product Sequencing Matrix
- [ ] Communicate up (how) and down (why)
- [ ] Track workplan trends quarterly

---

## Key Frameworks Summary

| Framework | Purpose | Key Insight |
|-----------|---------|-------------|
| Product Leader Canyon | Career transition | Senior PM → Leader requires new skills, not deeper existing ones |
| T-Shaped Toolkit | Capability model | Depth in one area + breadth across all four types |
| Four Types of Product Work | Portfolio categorization | Feature, Growth, PMF Expansion, Scaling—each needs different approach |
| Strategy Spectrum | Strategy quality | Targeted, Visible, Fluent, Compounding |
| Feature Product Fit | Feature success | Net positive contribution to product value |
| TARS Framework | Feature evaluation | Target → Adopted → Retained → Satisfied |
| S/T Score | Bundle metric | Satisfied Users / Target Users |
| Feature Matrix | Portfolio view | Core, Liability, Overperforming, Project quadrants |
| Growth Loops | Replace funnel thinking | Output becomes input—growth compounds |
| Habit Moment (XaY) | Predict retention | Action threshold that predicts retention |
| Retention Inputs | Decompose retention | Activation + Engagement + Resurrection - Churn |
| Monetization Model | Structure pricing | Scale × What × Amount × When |
| Monetization Triad | Align model | Consumer view, growth loops, cost of revenue |
| Customer States | Target optimization | Potential → Healthy → At-Risk → Churned |
| Three Saturations | Diagnose ceiling | Market, Product, PMF Degradation |
| PMF Expansion Categories | Classify opportunities | Adapted, Complementary, New—increasing risk |
| Shared Capabilities | Quantify "head start" | Functional, Domain-specific, Defensibility |
| PMF Expansion Map | Prioritize opportunities | 2x2 of capabilities vs. attractiveness |
| Technical Asymptotes | Anticipate tech ceilings | Invest before hitting growth caps |
| Build vs. Buy | Tool decisions | Role of tech, user needs, costs, alignment |
| Debt Prioritization | Manage debt | Confidence, time, impact, sequence, accumulated |
| Value Stream Mapping | Find bottlenecks | Throughput, quality, single points of failure |
| Bad Behavior Management | Handle negative use | Policies → Moderation → Redesign |
| Product Workplan | Bridge strategy/roadmap | Multi-period sequencing |
| Strategic Priority Map | Identify priorities | Relevant, peripheral, tangential |
| Product Sequencing Matrix | Categorize work | Impact × Urgency → 4 quadrants |

---

## Critical Gaps & Limitations

**Not Covered Across Modules:**
- Organizational design for portfolio balance
- Cross-functional alignment beyond communication
- Quantitative forecasting for impact/urgency
- Statistical methods for finding habit moment
- International/market-specific strategies in depth
- Tooling recommendations
- When to kill failing expansion
- Resource allocation between expansion and core

**Assumptions Throughout:**
- Initial product-market fit already achieved
- Reader has Senior PM-level experience
- Operating in context of established product organization
- Data infrastructure exists for measurement
- Sufficient user base for cohort analysis
- Leadership alignment on strategic priorities

---

## Appendix: Key Quotes

### On Transition & Leadership

> "What got you here, won't get you there."

> "The best feedback I've received as a manager was when someone asked how I could walk into a room with 30% of the context and identify what's wrong and help course correct. But this is the essence of the Product Lead role."
> — Bangaly Kaba

> "One of the most common conflicts I've seen is when product leaders try to apply a single development process, measure of success or strategy, to all the different types of product work."
> — Fareed Mosavat

> "Strategy is about making choices, trade-offs; it's about deliberately choosing to be different."
> — Michael Porter

### On Features

> "As a product leader, you no longer focus on one or two features, but rather have oversight over a bundle of several features."
> — Fareed Mosavat

> "Adoption is important but not sufficient. It helps show if a feature launch was successful, but not always whether or not the feature created sustained value for users."
> — Fareed Mosavat

> "Retention is one of the key measures of the quality of a feature. Do people who adopt it use it again? That is the best sign that it solves the user problem."
> — Fareed Mosavat

> "A lot of product leaders suffer from loss aversion when it comes to killing features."

> "The question is no longer, should I kill this feature? Rather, now that I've killed this feature, what does it allow me to invest in that I wouldn't otherwise be able to invest in?"
> — Fareed Mosavat

> "Often the best features come from a mix of customer feedback and data, which turns into talking to some customers to understand the problems they're facing."
> — Casey Winters

> "If I had asked people what they wanted, they would have said faster horses."
> — Henry Ford

> "Teams will sometimes redefine success after launch. You can't go back and change the goals after launch."
> — Casey Winters

### On Growth & Retention

> "Loops are better than funnels because they capture the compounding nature of growth. What comes out goes back in."

> "Spikes can be useful for testing or short-term goals, but they don't compound. Your growth strategy should be built on loops, not spikes."

> "Especially as you build more features, their problem frequency becomes less likely to be as prominent as the overall product frequency."
> — Casey Winters

### On PMF Expansion & Saturation

> "Saturation is a side effect of success. It's important to recognize saturation as every successful company will get there."
> — Fareed Mosavat

> "You should be building new markets and products to make sure that growth doesn't flatline or decline, because product/market fit expansion often requires time to ramp up to be meaningful growth driver at the aggregate level."
> — Casey Winters

> "The better a product market fit expansion opportunity can leverage our existing product market fit, the better the shortcut to the new product market fit ceiling will be."

> "Why are we better equipped to do this than anybody else?"
> — Fareed Mosavat

> "Product leaders should consider if they have permission from their users to launch this new product. That is, does the brand of your existing offering fulfill the needs of users for your new opportunity?"
> — Ravi Mehta

> "Instead of focusing on beating the competition, you focus on making the competition irrelevant by creating a leap in value for the buyer and your company."
> — Blue Ocean Strategy

> "You can accelerate the steps, but you can't skip any."

> "Adapted use case expansions can be some of the easiest ways to drive step changes in the usage of a product."
> — Casey Winters

> "Language localization usually isn't enough to grow in a new international market."
> — Fareed Mosavat

> "Many companies get comfortable doing what they have always done, making only incremental changes. This incrementalism leads to irrelevance over time."
> — Alphabet Annual Report

### On Scaling

> "When you have something that works, all of a sudden a part of your job is to keep that thing working. The underlying infrastructure, tools and user experience need to get better."
> — Casey Winters

> "If you are finding that certain strategic priorities are difficult to prioritize because of technical issues, there's probably a high leverage way to systemize that priority to make that possible."
> — Fareed Mosavat

> "What should the technical organization's OKRs look like? They're the business OKRs, because ultimately, we all get paid because the business is moving forward, not because we're building sweet technology."
> — Matt Greenberg

> "Scaling is all about living in a burning house. Everything around you is on fire all the time and you just have to fix the most broken, most impactful stuff."
> — Matt Greenberg

> "Modern product leaders who follow the ethos of fast iteration and lean techniques have fully embraced the benefits of technical debt. Unfortunately, if you accumulate too much of it, debt quickly has the opposite impact: slowing your team to a halt."
> — Fareed Mosavat

> "In many ways, large modernization efforts are a mistake. They mean you failed to iterate on your design patterns over time."
> — Casey Winters

> "Modernization is not a license to replace data with gut feel."
> — Ravi Mehta

> "Breaking out of averages and thinking in terms of distributions and groups of people and how they behave becomes more and more important as you scale."
> — Fareed Mosavat

> "Product leaders should play the role of the devil's advocate to uncover how their product could potentially harm users."
> — Casey Winters

> "As the content increases, you need to get better at keeping out the bad content, and making sure you get more of the right content to the right user at the right time."
> — Ravi Mehta

### On Workplan & Communication

> "Too often when you're focusing on the short-term instead of long-term value, you can optimize your way straight into a strategic brick wall."
> — Casey Winters

> "Product is often the most important lever a company has to achieve its strategy. As a result, product leaders play an essential role in a company's success."
> — Ravi Mehta

> "Too often, teams prioritize short-term results over long-term value creation. Like steroids, the short-term injections give the appearance of enduring strength, but weaken the patient over time."
> — Ravi Mehta

> "If you copy competitors, you will only build something worse than what they have and later than they have it. This isn't a winning strategy."
> — Helen Sims

> "Product is one of the most important levers executives have to achieve the company's strategy. Great product leaders don't just communicate their product strategy, they build confidence in it."
> — Ravi Mehta

> "While they shipped thousands of improvements and features at Slack over the last five years, most of Slack's success can be attributed to just a few key strategic initiatives."
> — Fareed Mosavat

---

## Appendix: Expert Contributors

| Expert | Role | Background |
|--------|------|------------|
| Casey Winters | CPO, Eventbrite | Former Growth Lead at Pinterest, early marketer at GrubHub. Advises Tinder, Reddit, Canva |
| Fareed Mosavat | EIR, Reforge | Former Director of Product at Slack (growth/freemium). Previously Instacart, Zynga |
| Bangaly Kaba | EIR, Reforge | Former Head of Growth at Instagram (grew to 1B MAU). Previously VP Product at Instacart |
| Matt Greenberg | CTO, Reforge | Former VP Engineering at Credit Karma. Built growth team to 100 people |
| Ravi Mehta | Former CPO, Tinder | Product leadership across consumer products |
| Brandon Chu | VP Product, Shopify | Product leadership, PMF expansion |
| Helen Sims | Product Leader | "Skating to where the puck is" metaphor |
| Alex Zhu | Founder, TikTok | "Focus on utility first, then community" |
