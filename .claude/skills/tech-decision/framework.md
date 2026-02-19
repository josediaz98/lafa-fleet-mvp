# Technical Decision Frameworks

Curated decision frameworks for architecture, build-vs-buy, infrastructure, scale, risk, and AI deployment decisions. Each section includes the framework, when to use it, and how to apply it.

---

## 1. Strategy Stack

### The 5-Layer Model

Every technical decision exists within a hierarchy of strategic context. Understanding where your decision sits prevents "locally optimal, globally wrong" choices.

| Layer | Question | Example |
|-------|----------|---------|
| **Mission** | What world do we want to create? | "Give a million artists the opportunity to live off their art" |
| **Company Strategy** | What's the executable plan to get there? | "Help users discover and listen to millions of songs across all devices" |
| **Functional Strategy** | What's our function's role in enabling that? | Product: "Enable the best mobile experience" / Technical: "Invest in encoding, buffering, and caching for mobile streaming" |
| **Roadmap** | What's the sequence of initiatives? | Q1: mobile caching layer, Q2: adaptive bitrate, Q3: offline sync |
| **Goals** | How do we measure progress? | Stream quality on 3G, buffer rate < 2%, mobile DAU growth |

### Key Insight: "What Else Is Possible?"

Technical strategy sits at the **same level** as product strategy — not below it. The distinction:
- **Product strategy** asks: "What should we build, and why?"
- **Technical strategy** asks: "What technology should we invest in, and what else is possible?"

That "what else is possible?" is the unique value strategic technical leaders bring. It reframes technology from a cost center into a generative force that expands what a company can do.

### The Downward Strategy Spiral (Diagnostic)

A self-reinforcing trap: underdeveloped strategy skills → execution-only reputation → exclusion from strategic conversations → further atrophy of strategic skills. Each stage feeds the next.

**How to diagnose:** When was the last time you were in a room where "What should we build?" was decided, not just "How should we build it?" If you can't recall, you may be deep in the spiral.

---

## 2. Technical Strategy Portfolio

### Three Categories of Technical Work

Replace the adversarial "product work vs. tech debt" binary with three categories that each have clear business value:

| Category | Creates Value By | Examples |
|----------|-----------------|----------|
| **Product Work** | Adding new value — features, value props, markets, distribution | New feature launch, market expansion, onboarding flow |
| **Scale Work** | Preserving value at growth — infrastructure that makes future product work cheaper, faster, higher quality | Experimentation platform, mobile optimization, monolith decomposition, dev tools |
| **Risk Work** | Protecting value — decreasing likelihood of financial or brand loss | Security patches, compliance, redundancy, disaster recovery |

### Key Insight: Define by Outcomes, Not Origins

"Tech debt" is defined by what it IS (accumulated shortcuts). The portfolio is defined by what work DOES (impact customers, enable growth, or prevent loss). This reframing gives technical leaders a language that product and business stakeholders can engage with.

### Use Case Map (Ground in Customer Value)

Before classifying work, understand the customer context:

| Component | Question | Example (Wise) |
|-----------|----------|-----------------|
| **Problem** | What does the customer need? (in their words) | "I want to exchange money without paying high fees" |
| **Persona** | Who faces this problem most acutely? | Individuals paid in one currency with bills in another |
| **Value Proposition** | Why do they choose us? | Cheaper, faster, more convenient than banks |
| **Alternatives** | How else could they solve this? | Traditional bank transfer, PayPal, Remitly |

---

## 3. Build vs Buy Scorecard

### The 4-Factor Evaluation

For any capability you're considering building in-house vs purchasing:

| Factor | Build Indicator | Buy Indicator | Weight |
|--------|----------------|---------------|--------|
| **Strategic Value** | Core to how you make money or differentiate | Need it to operate, but not how you win | **Highest** |
| **Available Resources** | Team has expertise + bandwidth | Team lacks expertise or is overcommitted | High |
| **Cost** (full lifecycle) | Build + maintain < vendor long-term | Vendor cost < build + indefinite maintenance | Medium |
| **Vendor Reliability** | No reliable vendors exist | Established vendors with proven track record | Medium |

### Differentiators vs MMRs

From venture capital analysis of successful products:

- **Differentiators** = Unique, strategically valuable capabilities that set you apart. **Build these.**
- **Minimum Market Requirements (MMRs)** = Basic features every customer expects. **Buy these.**

> "Your customers will likely give feedback to invest more in MMRs... This feedback is important, but it shouldn't be the majority of engineering effort."

### Decision Rules

- If it's a **Differentiator** → Strong bias to **Build** (even if harder)
- If it's an **MMR** → Strong bias to **Buy** (even if imperfect)
- If uncertain → Ask: "Would a competitor gain a meaningful advantage by building this in-house?"

### Common Trap: Engineer Build Bias

> "After 20 years of trying to build everything, I should have advocated buying way more often. I could have gotten so much more done with the same amount of time."

Engineers systematically underestimate in-house costs in two ways:
1. **Ignoring maintenance** — A team of 3 building for one quarter seems cheap, until you factor in indefinite maintenance
2. **Underestimating complexity** — Stripe took 2 years to develop payments. Your team won't replicate it in "a few months"

---

## 4. Innovation Spectrum

### Commodity ↔ Highly Innovative

Every solution sits on a spectrum from commodity (off-the-shelf, many options) to highly innovative (never been built before).

```
Commodity ◄──────────────────────────► Highly Innovative
Standard messaging    Custom ML pipeline    Autonomous vehicles
Off-the-shelf CRM    Novel data architecture    Quantum computing
```

### Decision Rule

**Innovate ONLY when:**
1. The capability is highly aligned with your core strategy, AND
2. The benefits far outweigh the costs (effort is high, outcome is uncertain)

### Application Examples

| Company | Capability | Decision | Why |
|---------|-----------|----------|-----|
| DocuSign | Identity verification | **BUILD** (innovate) | Core to agreement automation strategy — improves UX, deepens competitive moat |
| Goodreads | Identity verification | **BUY** (commodity) | Core is book discovery — innovating on ID verification provides zero competitive advantage |
| eBay Motors | Parts matching | **BUILD** (innovate) | Buyer-seller matching IS the business — billion-permutation problem worth solving uniquely |
| Skyscanner | Page load optimization | **BUY** (commodity) | Standard optimization, no innovation needed — just execute well |

---

## 5. Scale Work Timing — The Goldilocks Decision

### Too Early / Just Right / Too Late

| Timing | What Happens | Result |
|--------|-------------|--------|
| **Too Early** | Build infrastructure for users who never arrive | Competitors capture market with features while you build foundations |
| **Just Right** | Invest in product work AND long-term viability | Maximum business value — growth + sustainability |
| **Too Late** | Short-term growth spikes from all-product-work allocation | Degrading performance opens windows for competitors |

### Impact Matrix (2×2)

Categorize the impact of scale work to build a persuasive case:

|  | **Quantitative** | **Qualitative** |
|--|-------------------|-----------------|
| **Direct** (customer sees it) | Retention improvement, load time reduction, conversion lift | Better perceived quality, reduced frustration |
| **Indirect** (internal benefit) | Developer productivity gain, deployment frequency increase | Reduced burnout, faster onboarding for new engineers |

### The "1000 Engineers" Thought Experiment

If you have 1000 engineers and can invest in scale work that makes each 10% more effective, that equals 100 additional engineers. This makes the initiative almost always worth doing over anything but the most critical product work.

### Threshold-Setting

Thresholds convert subjective judgment ("Is this good enough?") into objective assessment ("Are we above or below the line?").

**Three tactics to identify where thresholds are needed:**

1. **Customer care** — What do customers value most? (from Use Case Map value prop)
2. **Manual fixes** — Where do we manually fix experience problems? (customer service, ops)
3. **User Psych** — Map each step of the journey as positive or negative motivation. High-friction negative moments = threshold candidates

**Three data inputs for setting threshold values:**

1. **Product data** — Actual performance, especially the **95th percentile** (not averages)
2. **Customer data** — Service inquiries, feedback, engagement patterns
3. **Competitor data** — "The last best experience anyone has anywhere becomes the minimum expectation everywhere"

**Two threshold levels:**
- **Target threshold** — Realistic improvement that drives meaningful change
- **Stretch threshold** — What's aspirationally possible

**Scope narrowing trick:** "99.99% uptime during US waking hours" delivers nearly the same benefit as 24/7 while leaving maintenance windows.

---

## 6. Risk Framework

### Three Types of Risk

| Type | Source | Example |
|------|--------|---------|
| **Operational** | Bugs, vendor failures, system outages | Database failure, payment processor downtime |
| **Security** | Vulnerabilities enabling malicious activity | Unpatched CVEs, data breach vectors |
| **Regulatory** | Non-compliance with laws or regulations | GDPR violation, missing PCI compliance |

### Two Outcome Types

**Sliding Scale** — Impact exists on a spectrum from tolerable to intolerable. Most operational risks.

```
Risk = Likelihood × Impact
```

- Likelihood: High / Medium / Low (precision is neither possible nor necessary)
- Impact: Express in financial terms or customers affected (acquisition, retention, costs)

**Binary** — So severe it would cripple or end the business. Most security and regulatory risks.

- If the outcome is unaffordable, **mitigate immediately** — no probability calculation needed
- The calculation is the same regardless of probability: this must be prevented

### The Reactive Trap

Organizations default to reactive, post-incident approaches because of a psychological distortion: low-probability events that don't occur seem to vindicate not investing in prevention. This creates organizational precedent to deprioritize risk work — until the one time it hits catastrophically.

**Red flag indicator:** If teams consistently spend significant time on unplanned fire-fighting, risk work has been chronically under-prioritized.

---

## 7. Translation Framework

### From Systems Metrics to Business Outcomes

The skill that most differentiates strategic technical leaders: translating technical understanding into business language.

**Three-engineer comparison (same infrastructure upgrade, three different pitches):**

| Engineer | Pitch | Outcome |
|----------|-------|---------|
| #1 | "This is important but I can't define the outcome" | Rejected — no business case |
| #2 | "This reduces ticket volume by 30%" | Maybe — internal metric, unclear business impact |
| #3 | "This improves MAU by preventing X customer churning" | Prioritized — connects to North Star metric |

**The causal chain:**
```
Technical change → Intermediate effects → Business outcomes
Refactor monolith → Faster feature shipping → Better retention
```

### Sense Check Math

Rough-but-useful quantitative reasoning. The purpose is not precision — it's providing enough information to compare options.

**Method:** Estimate whether likelihood is high/medium/low, whether impact is in thousands/millions/tens of millions. Don't build complex models — design a small experiment or make a reasonable estimate.

**Example:** Rather than modeling how page load time affects revenue, intentionally slow the site by 2 seconds and measure what happens. Minimal cost, credible data, actionable result.

---

## 8. Guiding Principles

### Two Types

**Customer Principles** — Derived from the Use Case Map value proposition. What customers care about most.

Example (Wise): price, speed, convenience, security. Every engineering team must explain how their work impacts at least one of these factors.

**Development Principles** — Strategic decisions about how the organization builds software.

| Principle | Description | Example |
|-----------|------------|---------|
| **Responsible Maintenance** | Choose technologies that are viable (battle-tested), scalable (grow with product), and sustainable (maintainable long-term) | Amazon S3: chose a more widely known language over a more capable one for long-term maintainability |
| **High-Leverage Work** | Prioritize work reusable across teams for net positive productivity | Dev tools engineer: in 10-person team = 0.45 FTE value (not worth it); in 100-person team = 4.95 FTE value (clearly worth it) |
| **Autonomous Teams** | Teams own decisions, seek input but make final calls, minimize cross-team dependencies | Wise: weak code ownership, single language, accept some duplication over convergence delays |

### Three Attributes of Good Principles

1. **Foundational** — Simple and specific enough to influence decisions consistently
2. **Dynamic** — Updated as markets and organizations learn
3. **Pervasive** — Known by all team members through onboarding and continuous visibility

### When to Break vs Change a Principle

**Break** (make an exception for this case):
- Reason 1: The principle doesn't serve its purpose here (e.g., break autonomous teams when two teams are independently building the same complex system)
- Reason 2: Two principles conflict and you must choose (e.g., Wise: cost vs convenience when migrating to cloud)

**Change** (update for all future decisions) — only when a macro shift demands it:
- Product portfolio expansion (new product line changes risk profile)
- Customer behavior shift (privacy expectations change)
- Company maturity (startup speed → enterprise stability)
- Financial reality (runway constraints override maintenance standards)

### The Vector Math of Teams

Every decision is a vector with magnitude (impact) and direction (what it prioritizes). If all decisions point in the same direction → maximum output. If decisions scatter → effort is wasted. Guiding principles align the vectors.

---

## 9. Scope-Time-Resource Triad

### Pressure-Testing Requirements

When requirements exceed capacity, instead of "we can't do this" or avoiding the conversation, ask **"What if?"** questions that reveal hidden flexibility:

- **"What if we didn't launch in 10 markets?"** → Tests scope flexibility
- **"What if we didn't launch this quarter?"** → Tests timeline flexibility
- **"What if we doubled team size?"** → Tests resource flexibility

### Four Scope Levers

| Lever | When It Works | Example |
|-------|--------------|---------|
| **Reduce features** | Core value survives with fewer features | Mobile game: cut social features, keep core gameplay |
| **Reduce complexity** | Simpler implementation still delivers value | Leverage backend of existing product, apply new UI |
| **Reduce user segments** | Serve fewer markets/devices initially | Launch single language, single OS → premium for best users |
| **Outsource/buy** | Low strategic value, reliable vendor exists | Use vendor for tax computation layer |

### Three Time Levers

| Lever | When It Works | When It Doesn't |
|-------|--------------|-----------------|
| **Move launch dates** | Product is not date-dependent (scope-driven milestones) | Seasonal business, compliance deadline |
| **Reduce QA/testing** | High-risk experiment that will change after launch | Customer delight requires quality; regulatory requirements |
| **Postpone instrumentation** | Low traffic at launch, can add measurement later | Marketing push drives concentrated initial traffic |

### When Adding Resources Does NOT Help

Adding people does NOT accelerate delivery when:
1. Work involves **shared surfaces** (iOS/Android writing same files)
2. Integration with **centralized systems** (everyone depends on same API)
3. **Late-stage** projects (no time to ramp)
4. **Highly specialized** domains (ramp cost exceeds contribution)
5. **Exploratory** work (nimbleness > headcount)

### Communication Frame

Instead of: "This can't be done"
Use: **"What would need to be true for us to do this?"** — then present the scope/time/resource options.

---

## 10. AI Deployment Framework

### 7-Step Process

| Step | Action | Key Question |
|------|--------|-------------|
| 1 | **Define the user problem** | What specific problem does this solve? (Not "let users access AI") |
| 2 | **Establish baselines** | What's possible without AI? (Rules-based, heuristics, manual) |
| 3 | **Identify where AI is the unlock** | Which specific sub-problem does AI solve? |
| 4 | **Define evaluation metrics** | What does "good" look like? (Precision vs recall tradeoff) |
| 5 | **Assess hallucination risk** | How likely and how dangerous are incorrect outputs? |
| 6 | **Factor in cost** | What are training and inference costs at scale? |
| 7 | **Iterate and improve** | Use the Optimization Hierarchy below |

### Performance Optimization Hierarchy

Ordered from simplest to most complex. **Start at Level 1 and only escalate when necessary:**

| Level | Technique | Cost | Durability | When to Use |
|-------|-----------|------|-----------|-------------|
| 1 | **Foundation model as-is** | Lowest | High | Test baseline — may be sufficient |
| 2 | **Prompt engineering** | Low | High (survives model upgrades) | First optimization to try |
| 3 | **Chain-of-thought reasoning** | Low | High | Complex multi-step problems, need explainability |
| 4 | **RAG** (Retrieval Augmented Generation) | Medium | High (knowledge base is external) | Need domain-specific or up-to-date information |
| 5 | **Fine-tuning** | High | **Low** (may need redo on new model) | Specialized tasks, domain-specific terminology |
| 6 | **Wait for next-gen models** | Zero | N/A | Current models insufficient, new release expected |
| 7 | **Build custom model** | Highest | Varies | Only if building a world-class AI company |

### Minimum Effective Intervention Principle

Each level up the hierarchy increases both capability AND cost. New foundation models regularly make previous optimization work obsolete. **Invest as little as possible in lower-level optimization while still meeting performance requirements.**

### Precision vs Recall for AI

- **High precision needed** → When you rely on the output to make a decision (medical diagnosis, financial advice). Better to say "I don't know" than be wrong.
- **High recall needed** → When making suggestions users can ignore (autocomplete, recommendations). Better to suggest something wrong than rarely suggest at all.

---

## 11. Architecture Fundamentals

### 3-Tier Architecture

The foundational model for understanding SaaS systems:

```
┌─────────────────────┐
│   Client Layer      │  ← What users interact with
│   (UI, frontend)    │
├─────────────────────┤
│   Business Logic    │  ← Rules, processing, APIs
│   (server-side)     │
├─────────────────────┤
│   Storage Layer     │  ← Where data lives
│   (databases)       │
└─────────────────────┘
```

**Key insight: Constraint flows UPWARD.** What the storage layer can efficiently store/query constrains what business logic can do, which constrains what the client can offer. This is why "simple" feature requests can be engineering nightmares — they may require changes at the lowest tier that cascade upward.

### Established vs Emerging Technology

| Aspect | Established | Emerging |
|--------|------------|----------|
| Abstraction boundaries | Tidy, clear, stable | Being defined — that's part of figuring it out |
| Conventional wisdom | Largely accurate | Unreliable or nonexistent |
| PM engagement depth | Stay higher level, focus on business value | Go deep — you can't rely on consensus |
| Strategic opportunity | Optimize cost-to-value ratio | Reopen "closed" problems — previously unsolvable needs |

### Conway's Law Implications

System designs mirror organizational structures. How teams are organized relative to architecture tiers is a strategic choice:

- **Within-tier teams** (frontend team, backend team) → Optimizes engineering efficiency, requires cross-team coordination for features
- **Cross-tier teams** (shopping cart team owns DB to UI) → Optimizes product outcomes, may duplicate infrastructure work

---

## 12. Speed & Execution

### Speed as Strategic Advantage

Three pillars:
1. **Time is the only truly inflexible constraint** — headcount and budget can adjust; hours cannot
2. **Small improvements compound** — 1% daily improvement = 37× improvement in a year
3. **Speed of iteration beats quality of iteration** — more deployments = more data points = better decisions

### Delivery Metrics

| Metric | What It Measures | Elite Benchmark |
|--------|-----------------|-----------------|
| **Deployment frequency** | Releases per period | 200× more than low performers |
| **Lead time** | PR creation to merge | Hours, not days |
| **Change-fail %** | Commits requiring rollback | Lower at higher deploy frequency |
| **MTTR** | Time to detect and fix issues | 2,000× faster than low performers |
| **Sprint pass rate** | Did the team complete 100% of planned work? | Binary: yes/no |

### Scope-Driven vs Date-Driven Milestones

- **Scope-driven** (preferred): Fix the scope (what must be done to learn what we need), let dates adjust
- **Date-driven** (when necessary): Seasonal business, compliance deadlines, contractual commitments

When forced into date-driven: offer stakeholders a choice between **transparent** (best estimates with visibility into slippage) and **predictable** (worst-case dates with high confidence).

### Tech Debt Management

| Type | System | How It Works |
|------|--------|-------------|
| **Acute** (small, well-defined) | **Time system** | One recovery week per quarter for focused debt paydown |
| **Systemic** (large, entangled) | **People system** | Dedicated resources until completion — can't be split into quarterly sprints |

---

## 13. Quick Reference: Decision Type → Frameworks

| Decision Type | Primary Frameworks | Red Flags |
|---------------|-------------------|-----------|
| **Architecture** | 3-Tier Architecture, Innovation Spectrum, Scope-Time-Resource, Conway's Law | Over-engineering for hypothetical scale; ignoring storage constraints |
| **Build vs Buy** | 4-Factor Scorecard, Differentiators vs MMRs, Innovation Spectrum | Build bias; underestimating maintenance; "our requirements are unique" |
| **Scale Work** | Goldilocks Decision, Impact Matrix, Threshold-Setting, Sense Check Math | Too early (building for users who never arrive); too late (degrading UX) |
| **Risk Work** | Sliding Scale vs Binary, Likelihood × Impact, Reactive Trap | Reactive-only posture; skipping patches; no risk register |
| **AI Deployment** | 7-Step Framework, Optimization Hierarchy, Precision/Recall | Starting from technology not problem; skipping baseline; jumping to fine-tuning |
| **Guiding Principles** | Vector Math, Customer/Development Principles, Break vs Change | Unspoken principles causing misalignment; never updating principles |

### Universal Red Flags Checklist

- [ ] Can't connect the decision to company strategy (missing Strategy Stack)
- [ ] All work is product work (portfolio imbalance — scale and risk neglected)
- [ ] "Tech debt" used as the only label for non-product work (no outcome framing)
- [ ] Building everything in-house (build bias overriding strategic analysis)
- [ ] Can't articulate business impact of technical work (translation gap)
- [ ] No thresholds set for critical metrics (subjective "good enough" decisions)
- [ ] Principles exist but nobody can name them (not pervasive)
- [ ] AI deployed without baseline comparison (technology-first thinking)
