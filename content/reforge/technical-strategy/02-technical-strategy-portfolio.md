# The Technical Strategy Portfolio: Collected Insights
> Reforge Technical Strategy Program — Module 02 | Frameworks for balancing product, scale, and risk work to ascend the strategy spiral

## Sources

| # | Title | Type | Key Topics |
|---|-------|------|------------|
| 1 | The Limitations of Tech Debt | Course Lesson | Strategy Spiral, Strategy Stack, execution mindset trap |
| 2 | The Case for Scale Work | Course Lesson | Portfolio categorization, Goldilocks timing, Facebook mobile pivot |
| 3 | Customer Use Cases | Course Lesson | Use Case Map, Bullseye Approach, Skyscanner/Wise examples |
| 4 | Scale Work Outcomes | Course Lesson | Impact Matrix, direct/indirect impact, quantitative/qualitative |
| 5 | Scale Work Thresholds | Course Lesson | Credit Karma experiment, threshold setting, User Psych framework |
| 6 | The Case for Risk Work | Course Lesson | Operational/security/regulatory risk, Equifax, Black Swan events |
| 7 | Risk Work Outcomes | Course Lesson | Sliding scale vs binary, risk formula, Wise vendor risk |
| 8 | Risk Work Thresholds | Course Lesson | Customer/financial/resource constraints, escalation responsibility |
| 9 | Recap: The Technical Strategy Portfolio | Course Lesson | Full framework consolidation |

**Featured Practitioners:** Bryan Dove (CommerceHub CEO, ex-Skyscanner/AWS/Microsoft), Harsh Sinha (CTO Wise, ex-PayPal/eBay), Matt Greenberg (Reforge CTO, ex-Credit Karma), Darius Contractor (Head of Growth Airtable, ex-Dropbox)

---

## Executive Summary

Technical leaders face a paradox at the heart of their career trajectories. The very skills that propel them through early promotions — deep execution expertise, high-quality delivery, attention to craft — become insufficient at senior levels where strategic thinking is the price of admission. This module addresses that paradox head-on, providing a structured approach for technical leaders to participate in, and ultimately shape, strategic decisions about what to build and why.

The central thesis is deceptively simple: technical leaders lose strategic influence not because they lack intelligence or capability, but because they lack a shared vocabulary and structured frameworks for translating their deep technical knowledge into business-relevant terms. When an engineer says "we need to refactor the monolith," product leaders hear cost without benefit. When the same engineer says "this refactoring will let us ship features 30% faster, equivalent to adding 15 engineers to the team," everyone understands the stakes. The gap is not knowledge — it is translation.

The module introduces the Technical Strategy Portfolio as the primary reframing device: instead of the reductive binary of "product work vs. tech debt," all engineering work falls into three strategic categories — product work, scale work, and risk work. Each category has distinct mechanisms for creating value, different time horizons, and requires different approaches to prioritization. This three-part portfolio gives technical leaders a language that product and business stakeholders can engage with, because each category connects directly to customer and business outcomes.

Beneath this portfolio framework sits a rigorous methodology for getting non-product work prioritized. It begins with deeply understanding customer value through Use Case Maps, proceeds through identifying the right business outcomes for scale and risk initiatives, and culminates in setting measurable thresholds that make prioritization decisions almost mechanical. The approach is customer-centric by design — even the most "back-end" technical work is framed through its ultimate impact on customers.

What makes this framework particularly powerful is its emphasis on proactive advocacy. Technical leaders are closest to the systems that enable (or constrain) the business. They see scaling bottlenecks before they become customer-facing problems. They understand security vulnerabilities before they become headlines. The module argues that this proximity creates both an opportunity and a responsibility: technical leaders who can articulate these insights in business terms become indispensable strategic partners, while those who cannot are relegated to order-taking.

The frameworks presented here are not merely theoretical — they are illustrated through detailed case studies from Spotify, Facebook, Wise, Skyscanner, Credit Karma, Equifax, and others. Each example demonstrates how real companies navigated the tension between shipping new features and investing in the foundations that make sustainable growth possible. The recurring lesson: companies that get the balance right build compounding advantages, while those that don't accumulate hidden liabilities that eventually surface at the worst possible moment.

Finally, the module acknowledges that none of this is easy. Setting thresholds requires judgment, not just data. Communicating risk requires credibility, not just math. Balancing a portfolio requires saying no to good ideas in favor of better ones. But for technical leaders willing to develop these skills, the reward is significant: they ascend the strategy spiral from being seen as executors to being recognized as strategic architects of their company's future.

---

## 1. The Strategy Gap: Why Technical Leaders Get Stuck

### The Downward Strategy Spiral

**Core Concept**

The Downward Strategy Spiral describes a self-reinforcing trap that ensnares many mid-career technical leaders. It begins innocuously: engineers are promoted through early career stages primarily on the basis of excellent execution — writing clean code, shipping reliably, solving hard technical problems. These are genuine and valuable skills. The problem is that this success pattern creates an identity and a reputation centered entirely on execution, while strategic muscles atrophy from disuse.

The spiral accelerates at the inflection point where engineers move into senior IC roles or team leadership. Suddenly, they are expected to answer not just "How should we build it?" but "What should we build, and why?" These are fundamentally different questions requiring fundamentally different skills. The execution expert approaches strategy conversations with the same toolkit that served them well in implementation — focusing on feasibility, technical elegance, and build quality — while the conversation actually demands market understanding, customer empathy, and business model reasoning.

Because technical leaders feel less comfortable in these strategic conversations, they retreat to where they add obvious value: execution. This retreat reinforces their reputation as executors rather than strategists, which further excludes them from strategic discussions. The spiral tightens: underdeveloped strategy skills lead to an execution-focused reputation, which leads to exclusion from strategy conversations, which prevents development of strategy skills.

**Underlying Mechanism**

The spiral is driven by a feedback loop between identity, reputation, and opportunity. Organizations unconsciously sort people into "strategic thinkers" and "executors," and once you are in the executor category, the opportunities to demonstrate strategic capability become scarce. This is not malicious — it is a natural consequence of organizations allocating people to where they seem most effective. But it creates a vicious cycle that requires intentional effort to break.

The module uses an apt metaphor: a woodworker on a home remodeling crew who is suddenly expected to do the interior designer's job. The woodworker's expertise in cutting trim perfectly does not translate to knowing which archways to encase in trim. The skills are orthogonal, not progressive.

**Practical Application**

Breaking the spiral requires technical leaders to deliberately build strategic vocabulary, seek out strategic conversations (even when uncomfortable), and learn to connect their technical expertise to business outcomes. The rest of this module provides specific frameworks for doing exactly that. The key insight is that technical leaders are not starting from zero — their deep understanding of systems, constraints, and possibilities is a strategic asset. They simply need the translation layer to make that knowledge legible to non-technical stakeholders.

**Nuances & Limitations**

The spiral is not universal. Some organizations actively involve engineers in strategic discussions from early career stages. Some technical leaders naturally gravitate toward strategic thinking. The spiral is most dangerous in organizations with rigid role boundaries between "product decides what" and "engineering decides how" — a separation that, while common, is ultimately counterproductive.

> "I ask my team questions like 'Why is this important to build?' or 'How will this benefit the customer?' And too often I get answers like 'I don't know,' or 'The product person told me to do it.'" — Bryan Dove, CommerceHub CEO

---

### Three Consequences for the Individual

The spiral produces three cascading consequences for the technical leader. **Limited influence** comes first: when product and functional leaders make decisions without technical leaders in the room, engineers lose the ability to guide priorities based on what technology makes possible or advisable. **Limited impact** follows: strategic context from other functions is often necessary to maximize technical impact, and decisions made in isolation lack this context. **Limited scope** is the natural result: without demonstrated influence and impact, career advancement stalls.

### Three Consequences for the Organization

Organizations also pay a price. **Reduced defensibility** occurs when technical innovation — one of the strongest competitive moats — is not integrated into strategic planning. **Longer time to market** results from technical leaders who cannot evaluate trade-offs or sequence work effectively because they lack strategic context. **Degrading Product Market Fit** emerges when the wrong types of technical debt accumulate, preventing the team from maintaining a high-performing product with available resources.

---

## 2. The Strategy Stack: Where Technical Strategy Lives

### The Five-Layer Model

**Core Concept**

Strategy is not a single thing — it is a stack of interconnected layers, each serving a different purpose and operating at a different altitude. The module defines five layers, from most abstract to most concrete: Mission, Company Strategy, Functional Strategy (including Product and Technical Strategy), Functional Roadmap, and Functional Goals. Understanding this stack is essential because it reveals where technical strategy sits in relation to everything else, and more importantly, how it connects upward to company objectives and downward to daily execution.

The top two layers — Mission and Company Strategy — form the company's objectives. The mission is aspirational and often hard to quantify: it describes the world the company wants to create. The company strategy is the executable plan to achieve that mission. Technical leaders need to understand both, but their primary interaction is with the middle layer.

The middle layer, Functional Strategy, is where technical strategy lives alongside product strategy. This is the crucial insight: product strategy answers "What should we build, and why?" while technical strategy answers "What technology should we invest in to build it, and what else is possible?" The "what else is possible" component is particularly important — it represents the proactive, forward-looking dimension of technical strategy that distinguishes strategic technical leaders from reactive ones. Good technology strategists are constantly asking how to execute the product strategy faster or create capabilities that product strategy alone cannot envision.

**Underlying Mechanism**

The stack works because each layer constrains and enables the ones adjacent to it. Company strategy constrains what functional strategies are relevant. Functional strategies constrain what goes on the roadmap. But the relationship is not purely top-down: insights from lower layers — particularly technical feasibility and possibility — should flow upward to inform higher-level strategy. When this bidirectional flow works well, companies discover strategic options that pure business analysis would miss.

The bottom two layers — Functional Roadmap and Functional Goals — form the delivery plan. The roadmap is the sequence of initiatives implementing the strategies, and the goals are the quarterly and day-to-day metrics measuring progress. Together, these five layers provide a complete picture of how high-level vision translates into daily work and measurable outcomes.

**Connections to Other Ideas**

The Strategy Stack directly connects to the Portfolio framework (Chapter 3) because it explains why framing technical work as "tech debt" is so damaging. Tech debt has no place in the strategy stack — it does not connect to mission, company strategy, or customer outcomes. The portfolio categories of product, scale, and risk work, by contrast, each have clear connections to every layer of the stack.

**Practical Application**

For any technical initiative you want to prioritize, trace it up through the strategy stack. Can you connect it to company strategy? If not, either the connection exists but you have not articulated it (most common), or the initiative genuinely is not strategic and should be deprioritized. The Spotify example below shows what this looks like in practice.

### The Spotify Example (2014-2015)

Spotify illustrates the strategy stack in action. Their **mission** was giving creative artists the opportunity to live off their art and fans the opportunity to enjoy it. The **company strategy** was helping users discover and listen to millions of songs across all devices. The **product strategy** was enabling the highest quality mobile experience in the market — a response to users shifting to mobile devices and new competitors (Apple, Google) entering the space.

The **technical strategy** then became investment in encoding, buffering, and caching to enable the highest quality mobile streaming experience. This was not generic "infrastructure improvement" — it was a direct response to the specific technical challenges of streaming music over spotty cellular connections. The **roadmap** included specific implementations and capability builds, and the **goals** included metrics like stream size versus bitrate quality and performance on 3G bandwidth.

The key lesson: the technical strategy was inseparable from the company and product strategy. You cannot talk about Spotify's buffering investment without understanding the mobile-first product bet, which you cannot understand without the competitive dynamics of the streaming market.

> Effective technical strategy cannot exist in isolation; it must support company objectives, align with product strategy, and be supported by delivery plans.

---

## 3. Reframing Tech Debt: The Technical Strategy Portfolio

### Product, Scale, and Risk Work

**Core Concept**

The single most damaging framing in engineering organizations is the binary of "product work vs. tech debt." This framing pits everything engineering wants to do against everything the business wants to do, creating an adversarial dynamic where technical work is seen as a tax on productivity rather than a strategic investment. The Technical Strategy Portfolio replaces this binary with three categories that each have clear business value.

**Product work** adds new value to a product by developing new features, maximizing an existing value proposition, removing barriers to access, increasing distribution, or adapting products for new markets. This is the category that product teams understand intuitively and prioritize naturally.

**Scale work** ensures that a product delivers the same or better quality of experience as it expands to more users. It involves strategic investment in critical infrastructure — building experimentation systems, implementing fraud detection, improving mobile experience for web-native products, refactoring architectures, upgrading developer tools. The crucial insight about scale work is that appropriate investment causes future product work to be delivered cheaper, faster, and at higher quality. It is not a cost — it is a multiplier.

**Risk work** decreases the likelihood that a company will suffer financial or brand loss due to incidents. Risk events stem from operational issues (bugs, vendor failures), security vulnerabilities, or regulatory non-compliance. Risk work, when addressed proactively, is critical for delivering company strategy — not merely a defensive activity.

**Underlying Mechanism**

The three-category portfolio works because it forces every piece of technical work to justify itself in terms of value creation (product), value preservation at growth (scale), or value protection (risk). "Tech debt" fails this test because it is defined by what it is (accumulated shortcuts) rather than what it does (impact customers, enable growth, or prevent loss). By reframing around outcomes rather than origins, technical leaders can participate as equals in prioritization conversations.

**Connections to Other Ideas**

The portfolio framework is the organizing structure for the rest of the module. Chapters 4-5 focus on making the business case for scale work. Chapters 6-7 focus on risk work. Chapter 8 covers the threshold-setting methodology that applies to both. The Strategy Stack (Chapter 2) provides the vertical context — where in the organization's strategic hierarchy this work sits — while the portfolio provides the horizontal context — what types of work compete for the same resources.

**Nuances & Limitations**

The three categories are not always clean. Some work is simultaneously scale and risk (e.g., migrating off a vendor that is both a scaling bottleneck and a single point of failure). Some product work has scale implications. The portfolio is a communication tool, not a rigid taxonomy — the goal is to ensure every piece of work has a clear connection to outcomes, not to enforce perfect categorization.

> "If you can't explain it to a six-year-old, you don't really understand it." — Richard Feynman (referenced in context of articulating the outcome of technical work)

---

## 4. Grounding in Customer Value: Use Case Maps and the Bullseye

### The Use Case Map

**Core Concept**

Every product has one primary purpose: to solve a problem for a user. All strategy stems from the choice of which problems to solve, for whom, and how. The Use Case Map is a structured tool for deepening this understanding by documenting four elements: the **Problem** (in the words of the user), the **Persona** (who faces the problem), the **Value Proposition** (why customers choose your product over alternatives), and the **Alternatives** (how else customers could solve the same problem).

It may seem counterintuitive to start thinking about scale and risk work with questions about customer value — that is usually the starting point for product work. But this is precisely the point: starting with customer value helps identify the internal capabilities needed to deliver that value at scale, which is the foundation for prioritizing technical work. Without this grounding, technical leaders cannot answer the question "why does this matter?" in terms that resonate with business stakeholders.

The Use Case Map helps answer three questions that are prerequisites for everything else: What customer problem do we solve? How do we know our customers are receiving value? Why do customers choose us over competitors? From the answers, technical leaders can identify which outcomes matter most and what thresholds the organization should maintain.

**Practical Application**

The Problem should be articulated in the customer's voice, including what outcome they want and why. Skyscanner's customers say "I want to find a cheap flight quickly." Wise's customers say "I want to exchange money without paying high fees." These are not product descriptions — they are expressions of need.

The Persona uses the Bullseye Approach (detailed below) to narrow from a broad audience to the most specific target. The Value Proposition captures why customers choose you — Skyscanner shows all options in one place and offers unique ways to search for cheapest flights; Wise is cheaper, faster, and more convenient than traditional banks.

The Alternatives section is where many technical leaders have blind spots. Direct competitors are obvious, but **indirect alternatives** (other ways customers solve the problem outside your category) and **adjacent markets** (companies that could integrate into or compete with your solution) are equally important. Skyscanner competes not just with Expedia and Booking.com, but with the act of searching airline websites directly or calling a travel agency. Wise competes not just with Remitly and PayPal, but with traditional bank wire transfers.

### The Bullseye Approach

**Core Concept**

The Bullseye Approach is a method for identifying the narrowest relevant audience for your product. It works by progressively filtering a broad total addressable audience through concentric rings of increasing specificity, arriving at the center — the customers for whom your product is the best possible solution.

The outer ring is the total addressable audience (parallels Total Addressable Market from investor decks, but focused on user attributes rather than dollar size). Each successive ring narrows based on segments the product is particularly well-suited to serve. The center is the ideal customer profile.

**Practical Application**

For Skyscanner: all travelers → leisure travelers → budget-conscious leisure travelers. The product's price-comparison value proposition resonates most with this narrowest group. For Wise: all currency exchangers → frequent currency exchangers → individuals who frequently need to exchange currencies (e.g., paid in one currency, bills in another). Low-frequency travelers who exchange money once a year are not the core audience.

Defining the narrowest audience matters for technical strategy because it focuses scale and risk investments on the capabilities that matter most to the customers who matter most. Infrastructure investments that serve your bullseye persona are higher priority than those serving the outer rings.

> Understanding customer value is not a product team concern that engineers can delegate — it is the foundation on which all technical strategy decisions rest.

---

## 5. Scale Work: Strategic Infrastructure Investment

### The Goldilocks Decision

**Core Concept**

Scale work timing is a Goldilocks problem — companies must get it just right. Investing too early in scale work means losing capacity for the product work that wins markets. These companies build infrastructure for a population of users that never arrives while competitors capture market share with new features. Investing too late creates short-term growth spikes from all-product-work allocation, but leads to degrading performance as users grow, opening windows for competitors to outperform.

Companies that get the timing right capture maximum business value: they invest in high-impact product work while dedicating effort to long-term product viability. The challenge is that "just right" is hard to identify in the moment because the customer and business impact of scale work is not always immediately clear.

**Underlying Mechanism**

The difficulty stems from a fundamental asymmetry in how product work and scale work are perceived. Product work has clear, immediate metrics: new features launched, users acquired, conversion rates improved. Scale work has diffuse, delayed metrics: infrastructure that prevents a future problem, tools that make future development faster, systems that maintain quality as load increases. In sprint planning, the feature with measurable next-quarter impact will almost always win against the infrastructure investment with diffuse multi-year benefits. This short-term bias is rational at the individual decision level but irrational at the portfolio level.

### The Facebook Mobile Pivot (2011-2012)

Facebook nearly lost major market share in 2011 because it was not prioritizing mobile. The company had mobile apps built in HTML5 — good for webpages, bad for native app experiences. The result was buggy, slow, crash-prone apps that could not scale effectively as usage shifted to mobile devices.

In 2012, Zuckerberg redirected the entire company to focus on mobile. The rule became famously simple: if an employee presented a new product in a meeting without showing the mobile version first, the meeting was ended. This all-hands pivot to scale work closed the experience gap. Had Facebook delayed, its many mobile-first competitors would have captured the users.

The Facebook story illustrates two key principles: first, scale work that seems deferrable can become existential if delayed too long. Second, the indicators are usually visible before the crisis — the HTML5 apps were already buggy — but competing priorities obscure the urgency.

### The Impact Matrix: Direct and Indirect, Quantitative and Qualitative

**Core Concept**

To compare scale work with product work in prioritization conversations, technical leaders must categorize its impact across two dimensions.

**Direct customer impact** occurs when customers immediately see the result of completed scale work. Facebook's mobile improvement directly affected every user's experience. **Indirect customer impact** occurs when scale work enables greater efficiency or productivity internally, which eventually improves customer experience. Upgrading customer service tools does not change the product users see, but it changes how quickly and effectively their problems are resolved.

Each type of impact has both **quantitative** components (measurable metrics like retention, acquisition, response time) and **qualitative** components (sentiment, satisfaction, employee morale). The matrix of direct/indirect × quantitative/qualitative gives technical leaders a systematic way to articulate impact.

**Practical Application**

For any scale initiative, work through the matrix:
- **Direct quantitative:** Does it impact acquisition or retention? What supporting metric indicates customers are receiving value?
- **Direct qualitative:** What improvements might customers notice in their experience?
- **Indirect quantitative:** Does it improve productivity or efficiency? What metric captures this?
- **Indirect qualitative:** Does it improve employee experience, reduce burnout, increase satisfaction?

Consider the "1000 engineers" thought experiment: if you have 1000 engineers and can invest in scale work that makes each 10% more effective, that is equivalent to hiring 100 engineers. This makes the initiative almost always worth doing over anything but the most critical product work.

> "It's a false assumption that some technical work is not customer-facing. I don't buy it. Eventually, everything you do impacts customers." — Harsh Sinha, CTO at Wise

---

## 6. Risk Work: Proactive Defense of Strategy

### Black Swans and the Reactive Trap

**Core Concept**

Risk work focuses on three types of risk: **operational** (issues impacting product performance or availability), **security** (vulnerabilities enabling malicious activity), and **regulatory** (non-compliance with laws or regulations). The most common mistake organizations make with risk is adopting a reactive, post-incident approach instead of a proactive, preventive one.

This reactive bias exists because of a psychological distortion in how humans evaluate low-probability, high-consequence events. Nassim Taleb's Black Swan framework explains the dynamic: these events are low probability, highly consequential, and easy to predict in hindsight. Consider a security patch for a vulnerability with a 1% chance of exploitation. Ninety-nine out of 100 times, skipping the patch will seem like the right call — reinforcing the assumption that mitigation is unnecessary. But the hundredth time can be catastrophic.

**Underlying Mechanism**

The reactive trap is reinforced by a feedback loop: because most risk events do not occur in any given period, not investing in risk prevention appears vindicated. This creates organizational precedent and cultural norms around deprioritizing risk work. The pattern only breaks when an incident occurs — at which point the organization shifts to an equally dysfunctional overcorrection, pouring resources into the specific type of incident that just happened while still neglecting other risk categories.

**Practical Application**

A less dramatic but equally important indicator of under-prioritized risk work is the proportion of each sprint or quarter dedicated to reactive, unplanned work. When teams consistently spend significant time on unplanned fire-fighting, it is a red flag that risk work has been chronically under-prioritized and the organization is operating in reactive mode.

### The Equifax Case (2017)

Equifax failed to patch a widely known vulnerability, allowing attackers to steal personally identifying data affecting 147 million people. The incident resulted from the company's lax security posture, slow response to implementing a known patch, and malicious actors exploiting the window. The attackers were the Black Swan — the unlikely event that illuminated systemic risk management failure. The patch was known, the vulnerability was documented, and the fix was available. The failure was purely one of prioritization.

### The One Medical Case

One Medical, a membership-based healthcare company, depended on customer trust as a core element of its strategy. A data breach of electronic medical records would have directly undermined the company's positioning as a trusted, technology-forward healthcare provider. This makes data storage security not merely an IT concern but a strategic imperative — risk work in direct service of company strategy.

### Risk Outcomes: Sliding Scale vs. Binary

**Core Concept**

Risk outcomes take one of two forms. **Sliding scale** outcomes sit on a spectrum from tolerable to intolerable — most operational risks fall here, with financial impacts that can be estimated and compared. **Binary** outcomes are so severe that they will cripple or end the business if they occur — most security and regulatory risks fall here, making the calculation simpler: if the outcome is unaffordable, it must be prevented regardless of probability.

For sliding scale risks, impact is calculated as Risk = Likelihood × Impact. Likelihood is estimated as high, medium, or low (absolute precision is neither possible nor necessary). Impact is expressed in financial terms or number of customers affected, broken into effects on acquisition, retention, and costs.

For binary risks, identifying the single unaffordable outcome is sufficient — no probability calculation is needed because the answer is the same regardless: this risk must be mitigated.

> "Black Swan events are low probability, highly consequential, and easy to predict in hindsight." — Nassim Taleb

---

## 7. Setting Thresholds: The Decision-Making Standard

### Why Thresholds Matter

**Core Concept**

A threshold is a specific target for what result is acceptable for a particular metric. Average page load time under two seconds. Onboarding new customers within 24 hours. Code commit reviews within two business days. The specific numbers vary by business, industry, and context, but the act of picking a common yardstick ensures all stakeholders agree on what a good outcome looks like.

Without thresholds, every decision about scale or risk work must be argued from first principles, consuming time and political capital. With thresholds, prioritization becomes almost mechanical: if the metric has crossed the threshold, the work is prioritized. During quarterly planning, comparing "current performance of 3 days" against "agreed threshold of 24 hours" is vastly more efficient than making an ad hoc assessment each time.

Thresholds also prevent over-investment. They ensure teams are not myopically chasing perfection on one metric when their time could create more value elsewhere. Once a threshold is met, capacity is freed for other priorities.

**Underlying Mechanism**

Thresholds work because they convert subjective judgment ("is this good enough?") into objective assessment ("are we above or below the line?"). This removes a significant source of friction from prioritization discussions — the debate about whether a problem is "bad enough" to warrant attention. It also gives technical leaders a standing invitation to the planning table: when a threshold is breached, the case for action is pre-approved.

### Three Tactics for Identifying Where Thresholds Are Needed

**Tactic 1: What do our customers care most about?** Using the Use Case Map's value proposition, identify the specific technical capabilities that deliver those valued attributes. If Wise's value proposition is speed, then thresholds are needed for time to set up an account, time to initiate a transfer, and time to complete a transfer.

**Tactic 2: Where do we manually fix experience problems?** Customer service tasks, onboarding processes, and account management workflows all indicate areas where technology-driven thresholds could improve service. Wise's customer service team supporting transfer inquiries represents an opportunity for response time and resolution time SLAs.

**Tactic 3: User Psych.** This framework, created by Darius Contractor (Airtable/Dropbox), maps user motivation along the product journey. "Psych" is a unit of measurement for motivation — it can be negative (consuming emotional fuel through boring or complicated tasks) or positive (creating excitement or reward). Mapping each step of the customer journey as positive or negative psych reveals where friction is tolerable and where it is dangerous.

In Wise's early days, the transfer journey had clear psych dynamics: initiating a transfer was positive (easy, convenient), waiting for money was negative (anxious), and receiving funds was positive. The negative psych of waiting revealed that transfer completion time was a prime threshold candidate — if the wait was too long, accumulated negative psych would overpower the convenience benefit.

### Three Data Inputs for Setting Threshold Values

**Product data** reveals actual current performance. The critical mistake is looking only at averages. Bryan Dove advocates examining the 95th percentile: "I like to look at data for the 95th percentile because it shows the worst-case outliers. I know that if I can make something work for our most challenging customers, the other 95% will have an amazing experience." Wise, for example, cut their transfer time data by geography, currency pairs, and transfer size to discover that region was the primary source of variation.

**Customer data** — service inquiries, feedback surveys, engagement patterns — reveals where actual performance falls short of expectations. Wise discovered that the most common customer service inquiry was "where is my money?" — directly confirming that transfer completion time needed a threshold. They also found regional differences in wait time tolerance, leading to different SLAs for different markets.

**Competitor data** sets the floor for customer expectations. As Bridget van Kralingen of IBM put it: "The last best experience that anyone has anywhere becomes the minimum expectation for the experience they want everywhere." If competitors can onboard users in a day, your three-day onboarding is already below threshold.

### The Credit Karma Experiment

Matt Greenberg's team at Credit Karma wanted to prioritize mobile web performance improvements but struggled to make the business case. They designed an experiment: intentionally slowing mobile page load time by 2 seconds using a "wait" call. The experiment demonstrated that page load time had a substantial impact on logins and revenue, providing credible data that a 2-second improvement would yield roughly equivalent gains. This experiment simultaneously set a new threshold for page load time and connected it to North Star metrics.

### The Art of Threshold Calibration

Thresholds must contain the right amount of aggressiveness. Being **too conservative** produces thresholds that are easily met but do not drive meaningful improvement. Harsh Sinha argues: "SLAs should not just reflect a good experience. They really need to be aspirational to have an impact." Teams should consider both a target threshold (realistic improvement) and a stretch threshold (what is possible).

Being **too aggressive** wastes resources on diminishing returns. Taking performance from 90% to 100% is exponentially more expensive than going from 80% to 90%. Helpful guardrails include narrowing the threshold scope: 99.99% uptime during US waking hours (for US-only customers) delivers nearly the same benefit as 24/7 while leaving maintenance windows. Similarly, 99.99% uptime on core features is more feasible than the same standard across all features.

> "Sense check math is about creating a simple conceptual model of how to compare different approaches to improving a process and seeing which creates the most value with the least opportunity cost." — Matt Greenberg, former VP of Engineering at Credit Karma

---

## 8. Translating Impact: From Systems Metrics to Business Outcomes

### The Translation Problem

**Core Concept**

The single skill that most differentiates strategic technical leaders from their peers is the ability to translate systems-level understanding into business-level language. Engineers can naturally articulate how their work impacts systems metrics — performance, reliability, development velocity, code quality. But these metrics are insufficient for strategic prioritization conversations. The gap between "we need to reduce API latency" and "reducing API latency will prevent $2M in annual customer churn" is the gap between being an executor and being a strategist.

The module illustrates this with a progression of three engineers advocating for the same infrastructure upgrade. Engineer #1 cannot define an outcome at all — they know the work is important but cannot articulate why in measurable terms. Engineer #2 identifies an internal metric (ticket volume) that improves, but this still does not communicate why the upgrade matters to the business. Engineer #3 connects the upgrade to monthly active users (MAU), a North Star metric that every function in the business prioritizes. Same technical work, three different levels of strategic communication, dramatically different likelihoods of getting on the roadmap.

**Underlying Mechanism**

The translation works by tracing a causal chain from technical change through intermediate effects to business outcomes. Refactoring a monolith does not directly improve retention — but it increases development velocity, which enables faster feature shipping, which improves product competitiveness, which improves retention. The chain may be long, but each link must be articulable. If you cannot trace the chain, either the connection does not exist (and the work should be deprioritized) or you do not yet understand it well enough (and more analysis is needed before advocating for it).

**Connections to Other Ideas**

This chapter synthesizes everything else in the module. The Strategy Stack (Chapter 2) provides the vertical chain to trace. The Portfolio framework (Chapter 3) ensures you are categorizing the work correctly. The Use Case Map (Chapter 4) grounds the business outcomes in customer value. The Impact Matrix (Chapter 5) structures the type of impact. The threshold methodology (Chapter 7) provides the quantitative standard. Translation is the skill that ties all frameworks together into a persuasive case.

**Practical Application**

For any technical initiative, prepare three things before entering a prioritization conversation:

1. **The outcome in business terms:** Not "reduce latency" but "prevent X customers from churning" or "enable Y% faster feature delivery."
2. **The threshold connection:** Not "this is important" but "we are currently at X, which is above/below our agreed threshold of Y."
3. **The sense check math:** A rough but credible estimate of the value created or loss prevented, using the Risk = Likelihood × Impact formula for risk work or the efficiency multiplier for scale work.

### Sense Check Math

Sense check math is Matt Greenberg's term for rough-but-useful quantitative reasoning. The purpose is not precision — it is to provide enough information to compare options and make prioritization decisions. Attempting exact calculations for inherently uncertain outcomes wastes time and creates false confidence. Estimating whether likelihood is high, medium, or low, and whether impact is in the thousands, millions, or tens of millions, is sufficient for most strategic conversations.

The Credit Karma page load experiment is a masterclass in sense check math: rather than building complex models of how load time affects revenue, they simply slowed the site down and measured what happened. The experiment cost minimal engineering time and produced data that was both credible and actionable.

> The savviest technical leaders know that speaking in the company's North Star metric — MAU, revenue, retention — is what makes technical work legible to every function in the business.

---

## Connections Map

The eight themes in this module form a coherent system rather than a collection of independent ideas. At the foundation sits the observation that technical leaders face a structural disadvantage in strategic conversations — the Strategy Gap (Chapter 1). The Strategy Stack (Chapter 2) provides the architectural context: understanding where technical strategy fits in the larger organizational hierarchy. The Portfolio framework (Chapter 3) provides the categorical context: a shared language for types of work that replaces the adversarial "product vs. tech debt" framing.

These three foundational chapters set the stage for the operational methodology. The Use Case Map and Bullseye (Chapter 4) ground everything in customer value — the one perspective that all stakeholders share. The scale work and risk work chapters (5 and 6) apply this customer grounding to the two non-product categories in the portfolio, showing how to identify impact and make the business case for each. The threshold chapter (7) provides the quantitative standard that makes prioritization decisions efficient and repeatable. The translation chapter (8) ties everything together into a communication skill.

There is an elegant recursion in the structure: the module itself models the behavior it teaches. It takes a technical concept (portfolio management of engineering work), grounds it in customer and business value (why this matters for organizations), provides frameworks for assessment (the specific tools and matrices), and sets measurable standards (the quality criteria for good strategic communication). A technical leader applying these frameworks is doing exactly what the frameworks describe: translating deep domain knowledge into language that enables better cross-functional decisions.

The tension between the frameworks is also instructive. The Goldilocks principle for scale work timing (Chapter 5) conflicts with the proactive imperative for risk work (Chapter 6). Scale work should be timed carefully — not too early, not too late. Risk work, by contrast, should almost always be addressed proactively because the cost of reactive response is asymmetrically high. This difference arises from the nature of the value each creates: scale work enables growth (timing matters because premature scaling wastes resources), while risk work prevents catastrophe (timing matters less because the downside of delay is unbounded).

---

## Action Items (Deduplicated)

### Immediate
- **Build your Use Case Map:** Document the Problem, Persona, Value Proposition, and Alternatives for your product or team's scope. Start with the customer's voice, not the product description. *This is the prerequisite for all subsequent frameworks.*
- **Audit current "tech debt" categorization:** Take your existing backlog of technical work and re-categorize each item as product, scale, or risk work. Identify items that lack a clear outcome.
- **Identify your North Star metric:** Determine the single metric the business cares most about and practice connecting your technical initiatives to it.

### Short-term
- **Map customer journey with User Psych:** Walk through every step of your core use case, labeling each as positive or negative psych. Identify the highest-friction moments as threshold candidates.
- **Set 2-3 initial thresholds:** Using product data, customer data, and competitor data, propose specific thresholds for your most critical scale metrics. Present with both a target and stretch number.
- **Complete the Risk Worksheet:** Catalog operational, security, and regulatory risks. Classify each as sliding scale or binary. Calculate expected impact for sliding scale risks.
- **Run a Credit Karma-style experiment:** For one contested scale initiative, design a small experiment that demonstrates the business impact of the current state. Use the results to set or validate a threshold.

### Strategic
- **Establish recurring threshold reviews:** Integrate threshold assessment into quarterly planning so that breached thresholds automatically trigger prioritization conversations.
- **Build cross-functional vocabulary:** Practice presenting technical initiatives using the Impact Matrix (direct/indirect × quantitative/qualitative) in regular product-engineering discussions.
- **Create a risk register:** Develop a living document that tracks identified risks, their assessed impact, mitigation strategies, and accepted risk decisions. Ensure it is reviewed periodically, not just after incidents.
- **Advocate for portfolio balance:** Use the three-category portfolio framework in annual planning to ensure scale and risk work receive deliberate allocation, rather than only getting attention when crises force it.

---

## Critical Gaps & Limitations

**Organizational politics are underexplored.** The frameworks assume a reasonable organization where good data and clear communication lead to good decisions. In practice, prioritization is heavily influenced by organizational politics, executive preferences, and cultural norms. A technical leader with perfect frameworks may still lose prioritization battles to a product leader with stronger political relationships.

**The "how much" question remains subjective.** While the module provides excellent tools for deciding *what* scale and risk work to prioritize, the question of *how much* total capacity to allocate to non-product work is left largely to judgment. There are no benchmarks for "30% scale, 10% risk, 60% product" — and the module acknowledges this implicitly by focusing on individual initiative prioritization rather than portfolio allocation ratios.

**Early-stage companies face different dynamics.** The frameworks are most applicable to growth-stage and mature companies with established products and multiple competing priorities. For pre-PMF startups, the advice to invest in scale work is potentially dangerous — these companies may not survive long enough to benefit from infrastructure investments.

**Threshold-setting data may not exist.** The methodology relies on product data, customer data, and competitor data. Newer products, novel categories, or companies with poor data infrastructure may lack the inputs needed to set evidence-based thresholds. In these cases, thresholds become educated guesses, which may not carry the same persuasive weight in prioritization conversations.

**Risk assessment biases are acknowledged but not fully addressed.** The module correctly identifies the Black Swan problem but does not deeply explore the cognitive biases (availability heuristic, normalcy bias, optimism bias) that systematically distort risk assessment even when people try to be rigorous.

---

## Appendix: Key Quotes & References

| # | Topic | Source | Quote / Reference |
|---|-------|--------|-------------------|
| 1 | Strategy Gap | Bryan Dove, CommerceHub | "I ask my team questions like 'Why is this important to build?'... And too often I get answers like 'I don't know,' or 'The product person told me to do it.'" |
| 2 | Customer-facing work | Harsh Sinha, Wise | "It's a false assumption that some technical work is not customer-facing. I don't buy it. Eventually, everything you do impacts customers." |
| 3 | Sense check math | Matt Greenberg, Credit Karma | "Sense check math is about creating a simple conceptual model of how to compare different approaches... seeing which creates the most value with the least opportunity cost." |
| 4 | Customer expectations | Bridget van Kralingen, IBM | "The last best experience that anyone has anywhere becomes the minimum expectation for the experience they want everywhere." |
| 5 | Explaining outcomes | Richard Feynman | "If you can't explain it to a six-year-old, you don't really understand it." |
| 6 | Aspirational SLAs | Harsh Sinha, Wise | "SLAs should not just reflect a good experience. They really need to be aspirational to have an impact." |
| 7 | 95th percentile | Bryan Dove, CommerceHub | "I like to look at data for the 95th percentile because it shows the worst-case outliers." |
| 8 | Black Swan events | Nassim Taleb | "Black Swan events are low probability, highly consequential, and easy to predict in hindsight." |
| 9 | Spotify mobile strategy | Case Study (2014-2015) | Invested in encoding, buffering, and caching for mobile streaming; created competitive moat through superior on-the-go experience |
| 10 | Facebook mobile pivot | Case Study (2011-2012) | Nearly lost market share due to HTML5 mobile apps; Zuckerberg redirected entire company to mobile-first |
| 11 | Equifax breach | Case Study (2017) | Failed to patch known vulnerability; 147M people affected; systemic risk prioritization failure |
| 12 | Credit Karma experiment | Matt Greenberg | Slowed page load by 2 seconds to demonstrate business impact; connected performance to logins and revenue |
| 13 | Wise vendor risk | Harsh Sinha | Single US vendor dependency; used sense check math on transaction volume to quantify operational risk |
| 14 | Twitter Fail Whale | Case Study | Frequent outages led to iconic error icon; retired in 2013 coinciding with rapid user growth |
| 15 | Zappos tooling | Case Study | Without customer service tooling investment, even best agents cannot deliver timely value; internal tools are customer-facing |
