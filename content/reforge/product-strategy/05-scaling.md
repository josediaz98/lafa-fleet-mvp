# Scaling Strategy: Collected Insights
> Reforge Program | Product Leaders crossing from Senior PM to Director/VP

## Sources

| Source | Type | Creators |
|--------|------|----------|
| Reforge: Scaling | Course Module | Casey Winters (CPO Eventbrite), Fareed Mosavat (EIR Reforge) |
| Contributors | Expert Input | Matt Greenberg (CTO Reforge), Ravi Mehta (former CPO Tinder) |

---

## Executive Summary

Scaling is the fourth type of product work—making strategic investments in critical infrastructure to enable continued product success. While Feature, Growth, and PMF Expansion strategies directly create and capture value, Scaling ensures these strategies can operate effectively at increasing levels of complexity and user volume.

Product leaders must manage three types of scaling: Tech Scaling (adapting technology to incorporate new functionality), Process Scaling (redesigning development processes for increased throughput and quality), and User Scaling (identifying and managing unintended uses of your product). Each type addresses different constraints that emerge as products and organizations grow.

The critical insight for product leaders is that scaling issues often don't seem urgent until they become crises. Successful leaders proactively identify where scaling constraints will emerge and invest ahead of technical asymptotes, process breakdowns, and user behavior problems. The symptoms of scaling issues include strategic priorities constrained by capabilities, frequent predictable frustrations, significant unplanned work, ad hoc workaround processes, and declining user-facing indicators.

---

## 1. Introduction to Scaling

### The Role of Scaling in Product Strategy

Scaling complements the three value-creating types of product work:

| Strategic Lever | Purpose | How It Works |
|-----------------|---------|--------------|
| Feature Strategy | Enhance existing value prop | Add incremental value, extend to marginal users |
| Growth Strategy | Maximize existing value prop | Improve acquisition, retention, monetization |
| PMF Expansion | Add new value propositions | Adapt to new markets, add new products |
| **Scaling** | **Enable continued success** | **Invest in infrastructure, processes, user management** |

> "When you have something that works, all of a sudden a part of your job is to keep that thing working. The underlying infrastructure, tools and user experience need to get better."
> — Casey Winters, CPO Eventbrite

### Three Types of Scaling

**Tech Scaling**: Scaling technology to incorporate new functionality
- Platform and infrastructure work
- Debt management
- Modernization

**Process Scaling**: Scaling internal processes to handle increased scope
- Process improvement evaluation
- Value stream mapping

**User Scaling**: Evolving product to accommodate different user interactions
- Value-added use cases
- Under-served segments
- Bad behavior management

### Pinterest Evolution Example

| Scaling Type | Initiatives |
|--------------|-------------|
| Tech | Desktop → mobile shift; proprietary framework → React (30% faster); image ML capabilities |
| Process | Project kickoffs for alignment; experiment review boards; dependency mapping |
| User | Spam prevention team; warning labels on dangerous content |

### Indicators of Scaling Issues

1. **Strategic priorities constrained** by organizational or technical capabilities
2. **Frequent predictable frustrations** — teams fail to deliver on time/budget
3. **Significant unplanned work** — not included in initial roadmaps
4. **Ad hoc workaround processes** — tribal knowledge emerges
5. **Declining user-facing indicators** — NPS detractors, quality issues

### Why Product Leaders Avoid Scaling

- Scaling decisions often owned by other functions (engineering, design, operations)
- Can be complex—requires diving into other functions' domains
- Less attractive—not like shipping products or moving metrics
- Requires more storytelling to explain impact

> "If you are finding that certain strategic priorities are difficult to prioritize because of technical issues, there's probably a high leverage way to systemize that priority to make that possible."
> — Fareed Mosavat

---

## 2. Tech Scaling Foundations

### Why Tech Scaling Matters

**Two critical reasons:**

1. **Underinvesting leads to PMF degradation** through poor user experience
   - *Performance*: How fast users complete tasks vs. expectations
   - *Reliability*: How often actions accomplish expected outcomes

2. **Limits ability to do Growth, Feature, or PMF Expansion work**

**Performance Example**: Google vs. Yahoo
- Google: Simple site, fast loading
- Yahoo: Content-heavy homepage, slower interaction
- Better performance was primary reason Google won

**Reliability Example**: iPhone vs. Windows Phone
- Apple: Smooth, reliable experience
- Windows: Reliability issues, "blue screen of death"

**Capability Example**: Sketch vs. Figma
- Sketch: Built as desktop app, slow to add cloud features
- Figma: Cloud-native from start
- Tech complexity limited Sketch's ability to respond

### Three Tech Scaling Mistakes

**Mistake 1: Assuming engineering problems are not product problems**

> "If scaling work is not addressed, it can dramatically slow product development."
> — Fareed Mosavat

Product leaders must:
- Understand maintenance and scaling costs
- Know indicators for potential problems
- Co-evolve product priorities with engineering leadership

**Mistake 2: Not understanding tech as differentiator vs. enabler**

| Role | Adoption Stance | Example |
|------|-----------------|---------|
| Differentiator | Innovator/Early Adopter | Netflix recommendation engine |
| Enabler | Early/Late Majority | Database selection |

**Diffusion of Innovation Curve:**
Innovators → Early Adopters → Early Majority → Late Majority → Laggards

> "It's appropriate to either adopt as an innovator or try and invent when you think that's a core differentiator of your business. Whereas, when it's not a core differentiator, it's appropriate to be in the late majority or even laggard."
> — Matt Greenberg, CTO Reforge

**Mistake 3: Measuring tech success independently of product success**

> "What should the technical organization's OKRs look like? They're the business OKRs, because ultimately, we all get paid because the business is moving forward, not because we're building sweet technology."
> — Matt Greenberg

**Evernote Example**: Five clients on five code bases → Conduit (single code library) → ship faster

---

## 3. Platform & Infrastructure Work

### Purpose and Approach

**Purpose**: Enable teams to drive product strategy forward by investing in technological improvements.

> "A product team works on platform and infrastructure when it has product market fit and wants to allow the product engineers working on it to scale. This work requires understanding the technical architecture and the future roadmap of the product really well."
> — Casey Winters

### Technical Asymptotes

Technical asymptotes are ceilings that cap growth from a tech perspective—often difficult to predict and can cause stagnation if left unmanaged.

**Visualization**: Value creation over time eventually hits ceiling if infrastructure doesn't stay ahead.

### Three Strategies to Stay Ahead

**1. Incorporate platform work into product roadmap**

- Plan within scope of roadmap
- Avoid significant unplanned work derailing initiatives

**Snapchat Example**: Productized lens creation and deployment—tech behind lenses became essential to roadmap.

**Pinterest Example**: Built Copytune (notification/email experimentation tool) to scalably run experiments without new code each time.

> "While it's often difficult to make the case, product leaders should be willing to sacrifice progress against near-term goals to gain long-term improvements in scalability and execution."
> — Fareed Mosavat

**2. Leverage platforms to solve multiple problems**

Product leaders see multiple problems that individual PMs don't—identify where single platform investment solves multiple issues.

**Pinterest Example**: Acquired VisualGraph to improve image recognition → improved saving/pinning algorithm AND significantly increased SEO traffic.

**3. Make build vs. buy decisions for internal tools**

| Question | Build Indicator | Buy Indicator |
|----------|-----------------|---------------|
| How core is the tool to product strategy? | Differentiator | Enabler |
| How unique are internal user needs? | Highly unique | Standard/generic |
| How do costs compare? | Long-term cheaper | Lower upfront + integration |
| How aligned is vendor roadmap to future needs? | Unpredictable needs | Predictable needs |

**Slack Example (Build)**: Experimentation tool
- Differentiator in B2B space
- Unique needs (security, B2B metrics)
- Cost slightly higher but secondary factor
- Built in-house despite costs

**Eventbrite Example (Buy)**: Email transfer (Sparkpost)
- Enabler for scale, not differentiator
- Generic need (high volume)
- Much cheaper to buy
- Very predictable needs

---

## 4. Managing Technical Debt

### Sources of Technical Debt

| Source | Description |
|--------|-------------|
| Non-Roadmap Work | Anticipated but deprioritized work |
| Workarounds | Problems worked around, not fixed |
| Deprecating Tech | Existing tech becomes outdated |
| Unplanned Work | Unanticipated—security hacks, outages, priority shifts |

### The Burning House Metaphor

> "Scaling is all about living in a burning house. Everything around you is on fire all the time and you just have to be able to look at the stuff that's broken and make sure that you're fixing the most broken, most impactful stuff and not getting distracted by the fact that basically everything is broken."
> — Matt Greenberg

**Key insight**: Having responsible debt reflects appropriate prioritization.

| Approach | Problem |
|----------|---------|
| Overinvesting | Completing work as it arises without considering opportunity cost; more rework |
| Underinvesting | Always defaulting to highest ROI work; debt becomes bigger problem over time |

### Five Criteria for Prioritizing Debt

| Criterion | Question | Higher Priority When... |
|-----------|----------|------------------------|
| Confidence | Will this lead to significant problem? | High confidence problem will occur |
| Time | When will this become a problem? | Problem is near-term |
| Impact to User | Will this harm user experience? | High impact to users |
| Sequence | Will this prevent reaching milestones? | Blocks key initiatives |
| Accumulated Debt | How much existing debt unresolved? | Accumulated debt is high |

### Three Debt Patterns

**Systemic Debt**: Previous decisions create more work at organizational level
- Usually high confidence, near-term problem
- Solve if blocks sequencing; remedy if minimal impact

*Credit Karma Example*: Data model didn't match credit bureau data. Moderate impact, flexible timing—used workarounds until it blocked strategic initiatives.

**Extinction Event**: Unexpected event causing significant damage
- Very high confidence, critical timing, high user impact
- Resolve immediately—sequence and accumulated debt don't matter

*Chime Example*: Multi-day outage—dropped all prioritized work to resolve.

**Papercut Debt**: Low confidence, not time-sensitive
- Will not significantly harm business
- Deprioritize; solve ad hoc when bandwidth allows

*Credit Karma Example*: Revenue tracking inaccuracies. Moderate confidence, low urgency, low user impact—solved incrementally over time.

> "Modern product leaders who follow the ethos of fast iteration and lean techniques have fully embraced the benefits of technical debt. Unfortunately, if you accumulate too much of it, debt quickly has the opposite impact: slowing your team to a halt."
> — Fareed Mosavat

---

## 5. Modernization

### Definition and Purpose

**Modernization**: Incrementally redesigning your product to create and capture more value for users and product.

**Two types:**
- **Frontend redesign**: Modernizing UI/UX
- **Backend redesign**: Updating backend for functionality

**Objectives must be:**
- Improving product KPIs (acquisition, retention, monetization), OR
- Deploying new features/products/markets more quickly

**Slack Example**: Redesign improved discoverability of features (drafts, saved items) → higher engagement.

**Netflix Example**: Monolithic DVD architecture → cloud architecture + Chaos Monkey → improved performance and reliability.

### Why Modernizations Fail

**Two main reasons:**
1. **Breaking user habits** — Too much change too fast forces users to rebuild habits
2. **Lack of testing/iteration** — New product isn't optimized for user experience

### Two Common Misconceptions

**Misconception 1**: Modernizing automatically improves KPIs

> "Massive redesigns are often pitched as 'metric movers'. If we redesign it so customers understand it better, our metrics will automatically improve. But that's very rarely the case, especially because existing customers already have developed behaviors around the existing design."
> — Fareed Mosavat

*Digg Example*: Removed popular features, changed design → significant audience decrease.

**Misconception 2**: Old products need modernization

*Counter-examples*:
- Amazon: Never "redesigned" yet highly effective
- Google: Evolved through smaller iterations

> "In many ways, large modernization efforts are a mistake. They mean you failed to iterate on your design patterns over time."
> — Casey Winters

### When Modernization Makes Sense

1. **Grouped with major product updates** where redesign enables easier deployment or improved experience
   - *Jira Example*: Cloud shift + UX simplification for cross-functional collaboration

2. **Major shift in technology** leaves product vulnerable to disruption
   - Flash → JavaScript/React
   - Desktop → Mobile
   - On-premise → Cloud
   - Traditional → AI/ML

### Five Success Factors

| Factor | Description | Key Quote |
|--------|-------------|-----------|
| **1. Align with insights** | Pressure test assumptions with tech data, product data, user research | "Modernization is not a license to replace data with gut feel." — Ravi Mehta |
| **2. Define scope and objectives** | Specify which metrics will be impacted; define deployment/KPI goals | Modernize with future roadmap in mind |
| **3. Deconstruct and simplify** | Break into discrete user-centric iterations; each version must be functional | "Companies throw iterative development to the wind when it comes to redesigns." — Ravi Mehta |
| **4. Collaborate cross-functionally** | Align with key stakeholders; avoid form over function | "Modernizations are a vulnerable time when companies risk throwing the baby out with the bath water." — Ravi Mehta |
| **5. Balance user needs** | Trade off power user features vs. new user simplicity | Engage both groups to identify compromises |

**Asana Example**: Launched redesign incrementally in phases, optimized for learning from each release.

**Reddit Example**: Engaged moderators early; removed CSS customization but added template tools; communicated regularly with users about rollout.

---

## 6. Process Scaling Foundations

### Why Processes Need to Scale

As organizations grow:
1. **Organizational complexity increases** — communication and alignment harder
2. **User base grows** — processes must expand capability
3. **Tech undergoes major changes** — processes must adapt

### Definition

**Process**: A repeated collection of tasks or sub-processes that combine to create output or value.

**Example product team processes:**
- Collecting user feedback
- Designing new features
- Strategic planning
- Evaluating analytics
- Running QA
- Shipping products
- Onboarding new hires
- Budgeting
- Evaluating tools
- Internal/external reporting

### Five Approaches to Scale Processes

| Approach | Description | Trade-off |
|----------|-------------|-----------|
| **Standardize** | Document repeatable steps; minimize variability | May restrict creativity |
| **Delegate** | Train employees with less opportunity cost | Less experienced must learn |
| **Hire/Outsource** | Add employees or contractors | Training investment required |
| **Augment** | Build or adopt tools for automation | May miss functionality |
| **Redesign** | Structurally change process | May forget pieces during adaptation |

### The Implementation Dip

**Key insight**: All process scaling approaches start with lower quality/output before improving.

**Visualization**: Value dips during implementation before exceeding previous process value.

**Risk of short-term thinking**: Avoiding improvements to preserve current value leads to processes that don't scale—ultimately breaking altogether.

---

## 7. Process Improvement Evaluation

### Three Common Mistakes

**Mistake 1: Defaulting to building customized solutions**

> "Sense checking the math is about creating a simple conceptual model of how to compare different approaches to improving a process and seeing which create the most value with the least opportunity cost."
> — Matt Greenberg

**Example**: 4 junior PMs × 3 weeks/quarter = 48 PM-weeks/year
- Engineering solution: 4 engineers × 10 weeks = 40 weeks
- But 40 engineering weeks has different opportunity cost
- Alternative: Hire one FTE dedicated to the manual process

> "Leaders often overweigh emotions over logic when it comes to people and processes. They don't want to rely on processes requiring lots of menial, manual tasks. But this can lead to over-investment in sexy solutions to simple problems."
> — Matt Greenberg

**Mistake 2: Not planning for implementation**

Implementation creates value dip—poor planning creates larger dip, longer payback.

**Five implementation factors to identify:**
1. Who is involved in current process?
2. Who will be involved in new process?
3. What initial training/setup needed before implementation?
4. What ongoing support needed during implementation?
5. What backup plans for initial issues?

**Mistake 3: Over-investing in highly scalable processes**

The "perfect process" myth—long payback hoping it lasts forever.

**Better approach**: Get good at iterating on processes based on business needs.
- Lean into evolution over revolution
- Consistent incremental improvements
- Experiment with lightweight improvements vs. large redesigns

---

## 8. Value Stream Mapping

### Purpose

Identify bottlenecks in processes that are highest priority to scale.

**Adapted from operations management**: Illustrating, analyzing, and improving steps required to deliver a product or service.

### Three Types of Bottlenecks

| Type | Definition | How to Identify |
|------|------------|-----------------|
| **Throughput** | Limits volume/velocity of work | What steps slow the process? Which parallel step takes longest? |
| **Quality** | Creates low-quality outputs affecting downstream work | Work backwards from output quality to find where lapses started |
| **Single Point of Failure** | One person has requisite knowledge | List who's responsible and who can backup each step |

### Four-Step Process

1. **Map key steps** — Note parallel vs. sequential steps
2. **Identify throughput bottlenecks** — Hypothesis vs. actual time; big deltas indicate bottlenecks
3. **Identify quality bottlenecks** — Work backwards from output quality
4. **Identify single points of failure** — List responsible parties and backups

### Two Best Practices

**1. Focus on upstream bottlenecks first**

The **Bullwhip Effect**: Small variations early in process create large variations in overall output.

> Small motions to handle of bullwhip cause large movements at end.

Improving upstream steps produces largest overall impact.

**2. Every bottleneck fix creates a new bottleneck**

Bottlenecks are relative—there will always be one.

Focus on most pressing bottlenecks, then identify what becomes the next bottleneck.

---

## 9. User Scaling Foundations

### Definition

**User Scaling**: Identifying and managing unintended uses of your product.

### Three Types of Unintended Use

| Type | Description | Approach |
|------|-------------|----------|
| **Value-Added Use Cases** | Unintended uses driving business outcomes | Treat as PMF expansion opportunity |
| **Under-Served Segments** | Segments unintentionally not optimized | Revisit growth strategy for segment |
| **Bad Behavior** | Uses with negative consequences | Policies, moderation, redesign |

### How to Identify Unintended Uses

**KPI Anomalies:**
- Track core metrics (acquisition, retention, monetization)
- Segment data—don't rely on averages

> "Breaking out of averages and thinking in terms of distributions and groups of people and how they behave becomes more and more important as you scale."
> — Fareed Mosavat

**User Research:**
- Proactively investigate outlier feedback
- Small problems amplify at scale

> "Early-stage companies should be focusing on nailing their existing use case, and only be thinking about the unexpected use cases that are presenting a stronger form of product-market fit if they threaten the original use case."
> — Casey Winters

### Four Types of Negative Consequences

| Type | Description | Example |
|------|-------------|---------|
| Dissatisfaction | Users can't use product as intended | Instacart tip-baiting |
| Brand Damage | Negative media or distrust | Romance scammers on Tinder |
| User Harm | Harm to individual users | Harassment, discrimination |
| Societal Harm | Harm beyond users | Misinformation spread |

---

## 10. Value-Added Use Cases & Under-Served Segments

### Value-Added Use Cases

**Definition**: Users using product in novel ways that drive new retention/monetization opportunities.

**Facebook Marketplace Example**: Users found workarounds for buying/selling in groups before infrastructure existed → led to Marketplace development.

**LinkedIn Sales Navigator Example**: Users found workarounds to identify and reach sales leads → productized into Sales Navigator.

**Key insight**: You have head start in PMF when users already engaging with product in new ways.

**Approach**: Treat as PMF expansion opportunities—often highest return, lowest risk because PMF already established.

### Under-Served Segments

**Definition**: Specific segments (demographic, geographic, behavioral) unintentionally not optimized.

**Why they matter**: Small problems with segments don't move high-level KPIs but can manifest into product-wide issues (brand damage, disruption, societal harm).

**Tinder/Bumble Example**: Female users had bad experience with overly eager males → Bumble created First Move feature requiring women to initiate → gained significant market share.

**Approach**: Revisit growth strategy for specific segment
1. Identify under-optimized segments
2. Build new use cases for that segment
3. Apply growth work to improve segment's KPIs

**Facebook India Example**: Only 24% of users were women (vs. 50%+ in US)
- Women felt unsafe sharing information
- Added Profile Picture Guard (can't download/screenshot)
- Added profile locking from non-friends
- Gave women more control, encouraging engagement

---

## 11. Bad Behavior Management

### Types of Bad Behavior

| Type | Description | Example |
|------|-------------|---------|
| **Scams** | Tricking users/company into actions | Instacart tip-baiting |
| **Harassment** | Negatively writing/speaking about users | Forza Horizon racist car designs |
| **Discrimination** | Treating users differently by demographics | Airbnb host rejections |
| **Misinformation** | Creating/spreading inaccurate information | Myanmar military on Facebook |

**Important**: Just because behavior isn't illegal doesn't mean it doesn't need fixing. Non-illegal behavior can still cause significant harm.

### Three Common Mistakes

**Mistake 1: Not feeling accountable**

> "Product leaders should play the role of the devil's advocate to uncover how their product could potentially harm users."
> — Casey Winters

Collaborate with legal, but don't exclusively listen to lawyers—they focus on minimizing risk, sometimes at expense of product/user value.

**Mistake 2: Only focusing on policies**

Three escalating levers:
1. **Policies** → 2. **Moderation** → 3. **Product Redesign**

**Mistake 3: Treating bad behavior as business decision**

Short-term: Maximize value by not managing bad behavior
Long-term: Minimize bad behavior for safe environment and societal benefit

### Three Management Levers

**Lever 1: Establish and Enforce Policies**

| Component | Purpose |
|-----------|---------|
| Articulate what constitutes bad behavior | Terms and Conditions |
| Lay out remedies | Temporary ban, permanent ban, fines |

*Tinder Example*:
- Instagram handle farming → Ban if fraudulent
- Catfishing → Ban
- Romance scams → First warning, then ban

**Lever 2: Moderate Content**

| Type | Description | Example |
|------|-------------|---------|
| **Passive** | Community members maintain norms | Reddit/Nextdoor volunteer moderators |
| **Active** | Tech automation or paid teams | Facebook contracted moderators; WhatsApp fact-checking |

> "As the content increases, you need to get better at keeping out the bad content, and making sure you get more of the right content to the right user at the right time."
> — Ravi Mehta

**Lever 3: Redesign Product**

Limit opportunities for bad behavior while maintaining good experience.

*Change user flow*:
- Greenhouse nudges recruiters about biases during hiring

*Add features*:
- Airbnb Instant Book removes host case-by-case bias

*Remove features*:
- Nextdoor removed "Forward to Police" due to racial profiling concerns

---

## Action Items

### For Tech Scaling

- [ ] Identify where you sit on differentiator vs. enabler for each technology
- [ ] Audit current technical debt using five prioritization criteria
- [ ] Map platform investments that could solve multiple problems
- [ ] Review build vs. buy decisions for internal tools
- [ ] Assess modernization needs—avoid misconceptions about automatic improvement

### For Process Scaling

- [ ] List key processes and their current scaling approach
- [ ] Sense check math on proposed process improvements
- [ ] Identify five implementation factors before any process change
- [ ] Value stream map critical processes to find bottlenecks
- [ ] Focus on upstream bottlenecks first

### For User Scaling

- [ ] Segment data to identify anomalies beyond averages
- [ ] Look for value-added use cases to treat as PMF expansion
- [ ] Identify under-served segments and revisit their growth strategy
- [ ] Audit product for bad behavior potential (scams, harassment, discrimination, misinformation)
- [ ] Ensure three management levers are in place (policies, moderation, redesign options)

---

## Key Frameworks Summary

| Framework | Purpose | Key Insight |
|-----------|---------|-------------|
| Three Types of Scaling | Categorize scaling work | Tech, Process, User—each has distinct strategies |
| Technical Asymptotes | Anticipate tech ceilings | Proactively invest before hitting growth caps |
| Build vs. Buy | Internal tool decisions | Four questions: role of tech, user needs, costs, long-term alignment |
| Debt Prioritization | Manage technical debt | Five criteria: confidence, time, impact, sequence, accumulated debt |
| Diffusion of Innovation | Tech adoption strategy | Be early for differentiators, late for enablers |
| Modernization Success Factors | Guide redesign efforts | Insights, scope, simplify, collaborate, balance users |
| Process Scaling Approaches | Scale internal processes | Standardize, delegate, hire, augment, redesign |
| Value Stream Mapping | Find process bottlenecks | Throughput, quality, single points of failure |
| Bullwhip Effect | Prioritize improvements | Fix upstream bottlenecks first—they compound |
| Bad Behavior Management | Handle negative use cases | Three escalating levers: policies, moderation, redesign |

---

## Critical Gaps & Limitations

**Not Covered:**
- Detailed organizational design for scaling
- Cross-functional alignment mechanisms
- Specific tooling recommendations
- Quantitative models for tech debt prioritization
- Legal frameworks for bad behavior management

**Assumptions:**
- Initial product-market fit achieved
- Organization large enough to face scaling challenges
- Product leader has some cross-functional influence

---

## Appendix: Expert Contributors

| Expert | Role | Background |
|--------|------|------------|
| Casey Winters | CPO, Eventbrite | Former Growth Lead at Pinterest, early marketer at GrubHub. Advises Tinder, Reddit, Canva |
| Fareed Mosavat | EIR, Reforge | Former Director of Product at Slack (growth/freemium). Previously Instacart, Zynga |
| Matt Greenberg | CTO, Reforge | Former VP Engineering at Credit Karma. Built growth team to 100 people |
| Ravi Mehta | Former CPO, Tinder | Product leadership across consumer products |
