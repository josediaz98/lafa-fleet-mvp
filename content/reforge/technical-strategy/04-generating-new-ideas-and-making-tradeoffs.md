# Generating New Ideas and Making Trade-Offs: Collected Insights
> Reforge Technical Strategy Program — Module 04 | The Solution Development Toolkit for divergent and convergent thinking

## Sources

| # | Title | Type | Key Topics |
|---|-------|------|------------|
| 1 | Introduction to Trade-Offs | Course Lesson | Solution Development Toolkit overview, divergent/convergent thinking, Wise investment product example |
| 2 | Prep for Divergent Thinking | Course Lesson | Four preconditions: fluency, trust, timing, stage-setting |
| 3 | Generate Divergent Technical Ideas | Course Lesson | Technical Idea Generation Guide, innovation spectrum, eBay Motors/Skyscanner examples |
| 4 | Diverge and Converge | Course Lesson | Three convergent tools overview: guiding principles, build/buy, scope-time-resources |
| 5 | Guiding Principles | Course Lesson | Vector Math of Teams, customer/development principles, Wise/CommerceHub/Amazon examples |
| 6 | Principle Trade-Offs | Course Lesson | Breaking vs. changing principles, Wise 2FA, Facebook motto evolution, Apple privacy |
| 7 | Build or Buy Trade-Offs | Course Lesson | Four-factor scorecard, differentiators vs. MMRs, H&R Block vs. Dropbox |
| 8 | Scope, Time, & Resource Trade-Offs | Course Lesson | Pressure-testing requirements, four scope levers, three time levers, resource realities |
| 9 | Recap | Course Lesson | Full framework consolidation |

**Featured Practitioners:** Bryan Dove (CommerceHub CEO, ex-Skyscanner/AWS/Microsoft), Harsh Sinha (CTO Wise, ex-PayPal/eBay), Matt Greenberg (Reforge CTO, ex-Credit Karma), Tomas Tunguz (Redpoint Ventures), Darius Contractor / Dharmesh Shah referenced

---

## Executive Summary

Technical leaders are often trained out of one of their most valuable capabilities. Years of execution-focused work — debugging, shipping, optimizing — condition engineers to think convergently by default. When presented with an idea, they instinctively assess feasibility, identify failure modes, and surface complexity. These are essential skills for building software that works. But they are the wrong skills for the moment when a team is trying to figure out what to build in the first place. This module addresses that mismatch directly, providing a structured toolkit for technical leaders to participate effectively in both the creative and evaluative phases of solution development.

The central insight is that the strategic value of a technical leader is maximized when they can operate in two distinct modes — divergent and convergent — and switch between them at the right time. Divergent thinking generates many possible solutions to a problem, prioritizing quantity and exploration over immediate feasibility. Convergent thinking evaluates those options against specific criteria to arrive at the best path forward. Most engineers default to convergent mode, which makes them seem like naysayers in early ideation. The improv comedy principle of "Yes, and..." captures the alternative: accept a premise and build on it, rather than immediately testing it to destruction.

But mindset alone is insufficient. The module argues convincingly that technical leaders must earn the right to be in the room where ideas are generated. This requires four preconditions: fluency with the business context (customer use cases and company strategy), trust built through reliable delivery, sensitivity to timing (diverging before decisions are locked), and deliberately creating the conditions for ideation. Without these foundations, even well-intentioned divergent thinking can backfire — producing technically clever ideas that ignore business reality, or breaching boundaries with product partners who feel their domain is being encroached upon.

Once in the room, technical leaders have three powerful convergent tools. Guiding principles align decision-making across teams by establishing shared criteria — what the company's customers value most, and what development standards the organization maintains. The Build or Buy framework provides a systematic way to evaluate whether a capability should be developed in-house or purchased from a vendor, countering the common engineering bias toward building everything. And the Scope-Time-Resource triad gives technical leaders a constructive language for navigating impossible requirements — transforming "we can't do that" into "here's what would need to be true for us to do that."

What unifies these tools is their orientation toward collaboration rather than gatekeeping. The traditional engineering posture in planning conversations is defensive: identifying risks, surfacing constraints, explaining why things are hard. The Solution Development Toolkit repositions the technical leader as a creative partner who expands the solution space during ideation and then applies rigorous criteria during evaluation. This dual capability — the ability to both generate and assess options — is what makes technical leaders indispensable in strategic conversations.

The frameworks are grounded in extensive real-world examples. Wise's journey from brainstorming investment products to launching a manual MVP demonstrates divergent and convergent thinking in sequence. eBay Motors' billion-permutation car parts matching problem shows technical innovation driven by customer need. Amazon's S3 language selection illustrates development principles in action. CommerceHub's decision to maintain dual platforms after an acquisition shows how customer principles guide counterintuitive choices. Together, these examples demonstrate that the best technical decisions are not the most technically elegant — they are the ones most aligned with strategic context.

The module leaves practitioners with a crucial meta-skill: the ability to pressure-test requirements constructively. Instead of accepting impossible constraints or rejecting them outright, great technical leaders ask "What if?" questions that reveal hidden flexibility in scope, timeline, or resources. This transforms the engineering role from order-taker or blocker into strategic collaborator — exactly the shift needed to ascend the strategy spiral.

---

## 1. Two Modes of Strategic Thinking

### Divergent and Convergent Thinking

**Core Concept**

Problem-solving in product development requires two fundamentally different cognitive modes, and the failure to distinguish between them is a primary reason technical leaders get excluded from strategic conversations. Divergent thinking is the process of generating many possible solutions to a problem — quantity matters more than quality, and the goal is to expand the solution space as widely as possible. Convergent thinking is the process of evaluating available options against specific criteria to select the best path forward — here, judgment, feasibility assessment, and trade-off analysis are the essential skills.

The distinction matters enormously because engineers are systematically trained in convergent thinking. Their entire career progression rewards the ability to identify what will not work, assess complexity accurately, and find the most efficient implementation path. These are indispensable capabilities — but they are deployed at the wrong moment when a team is still exploring what to build. The result is the stereotype of the engineer who pokes holes in every idea, earning a reputation as a naysayer rather than a creative partner.

Design thinking, the system that places end-users at the center of the design process, provides the vocabulary for this distinction. IDEO, the global design firm, describes divergence as "creating choices" — a process that can feel like getting further away from the solution. "This is the essence of creativity. Divergence needs to feel optimistic, exploratory, and experimental, but it often feels foggy to people who are more used to operating on a plan." For engineers accustomed to clear specifications and logical progression, this fogginess is deeply uncomfortable. But learning to tolerate it is the price of admission to the ideation phase.

**Underlying Mechanism**

The improv comedy principle of "Yes, and..." captures the essential mechanic of divergent thinking. When one player says "My mother is coming over for dinner!" the next player accepts the premise ("Yes") and builds on it ("and she's expecting a home-cooked meal but the turkey exploded in the oven!"). The alternative — "No, your mother can't come because the roads are closed" — kills the scene. In product ideation, engineers who respond to ideas with "That won't scale" or "The architecture doesn't support that" are playing "No, because..." when the moment calls for "Yes, and what if we also..."

The crucial insight is that great technical leaders know when to switch modes. Divergence is for the question "What should we build?" Convergence is for "How should we build it?" When done well, the engineer is such an effective divergent thinker that their product counterpart becomes the primary convergent thinker, deciding between many good options — a dramatic reversal of the typical dynamic where engineers narrow while product expands.

**Connections to Other Ideas**

This two-mode framework is the organizing structure for the entire module. Chapters 2-3 develop the divergent capability. Chapters 4-7 develop the convergent capability through three specific tools: guiding principles, build or buy analysis, and scope-time-resource trade-offs. The earlier modules in the program (the Strategy Stack, the Technical Strategy Portfolio, company strategy calibration) provide the knowledge foundation that makes effective divergence possible — you cannot generate strategically relevant ideas without understanding the business context.

**Practical Application**

The Wise investment product case demonstrates both modes in action. When customers began transferring money back and forth between Wise and traditional banks to earn returns, the team entered divergent mode: build a bank, build an investment account, partner with existing providers, buy a provider, explore non-banking rewards. Engineers added unique value by identifying possible integrations and understanding the technical trade-offs of each option. Then the team converged: the goal was an MVP to learn customer behavior, leading to a partnership with an existing investment API, limited early access, and initially managing investments manually over the phone. The manual approach — counterintuitive to engineers who want to build elegant systems — was the right convergent choice because it prioritized learning speed over technical sophistication.

> "Divergence needs to feel optimistic, exploratory, and experimental, but it often feels foggy to people who are more used to operating on a plan." — IDEO

---

## 2. Earning the Right to Ideate

### Four Preconditions for Effective Divergence

**Core Concept**

Willingness to think divergently is necessary but not sufficient. Technical leaders must meet four preconditions before their divergent contributions will be welcome and effective: building fluency, creating trust, finding the right timing, and setting the stage. These are not bureaucratic hurdles — they are the social and intellectual infrastructure that makes creative collaboration between engineering and product possible. Without them, even brilliant ideas from engineers will be dismissed, misunderstood, or resented.

The module is refreshingly honest about this dynamic. Engineers cannot simply announce that they want to participate in ideation and expect to be welcomed. They must earn the invitation through demonstrated competence in business context, reliability in delivery, and sensitivity to interpersonal dynamics. This may feel unfair to engineers who believe their ideas should be judged on merit alone, but it reflects the reality of how trust and influence work in organizations.

**Building Fluency**

Fluency has two components. First, customer use case knowledge: understanding what problem the product solves, for whom, against what alternatives. Matt Greenberg emphasizes that "Competitor details are important for the conversation. An engineer who generates ideas with this domain knowledge has a big leg up on someone who hasn't." Second, strategic fluency: understanding the company's acquisition, retention, and financial strategies well enough to propose ideas that make business sense, not just technical sense.

The penalty for lacking fluency is severe. Harsh Sinha puts it directly: "The best technical leaders get their ideas adopted because they 'read the room' to assess what is most important and reframe their ideas to support those priorities." The inverse is equally true: suggesting a massive infrastructure revamp when the company has three months of runway and everyone else is focused on revenue growth is a fast way to lose credibility and get uninvited from planning conversations.

**Creating Trust**

Trust is built through delivery, not through ideas. Being a trusted delivery partner is the foundation for becoming a trusted thought partner. The module identifies four trust-building behaviors: **reliability** (committing to less and completing 100% of planned work), **transparency** (proactively communicating when roadblocks prevent commitments from being met), **accountability** (sharing credit for successes and taking ownership of problems), and **respecting boundaries** (framing contributions as input rather than directives — "What if we did..." rather than "We should do...").

Matt Greenberg warns about the boundary issue specifically: "When engineers participate more in divergent thinking, they can breach boundaries pretty easily with product work. Jobs get blurry in these moments." The solution is not to avoid contributing but to frame contributions as input to product decisions rather than engineering directives.

**Finding the Right Timing**

Divergent thinking is welcome before decisions are locked, not after. Three diagnostic questions: Has a decision been made? Has it been communicated to leadership? Has the company invested significant time or money in a particular path? If most answers are "no," new ideas are likely to be welcomed. If not, the window for divergence has closed, and convergent contributions (optimization, risk identification, trade-off analysis) are more appropriate.

**Setting the Stage**

Divergence works best when everyone knows the group is in ideation mode. Practical tactics include dedicated recurring brainstorming sessions labeled clearly as "ideation," changing the physical or virtual environment to signal creative mode, and explicitly asking stakeholders "What role would you like me to play?" at the start of meetings. This last tactic is powerful because it surfaces whether the moment calls for idea generation, synthesis, or execution planning.

> "To climb out or avoid the strategy spiral, you need to shift perception. Rather than being an enemy beating up bad ideas, you want to be a problem-solving ally." — Matt Greenberg

---

## 3. Structured Idea Generation

### The Technical Idea Generation Guide

**Core Concept**

Divergent thinking, despite its creative nature, benefits enormously from structure. The Technical Idea Generation Guide provides a three-step process: **Define the Problem** (what do we need to solve?), **Analyze the Problem** (what do we know based on data?), and **Generate Solutions** (how might we solve it, and what additional capabilities do we need?). This structure prevents two common failure modes: jumping to solutions before understanding the problem, and generating ideas that are disconnected from customer and business reality.

Starting with the problem rather than the technology is the first discipline. New capabilities emerge constantly, and it is tempting to figure out how to apply the latest exciting thing to your product. Great technical leaders resist this temptation. The problem might be customer-facing ("How do we reduce friction during onboarding?") or technical ("How do we reduce dependencies between services?"), but in either case, starting with a clear problem statement focuses solutions on areas that will drive significant impact.

**Data-Grounded Analysis**

Before generating solutions, the guide calls for data discovery across three categories — the same three used for threshold-setting in the Portfolio module. **Product data** reveals problem areas through metrics like response time and uptime, with emphasis on evaluating outliers and segments rather than just averages. **Customer data** provides the user's perspective through service inquiries, interviews, and surveys. **Competitor data** reveals how others have solved similar problems, including who builds in-house, what vendor solutions exist, and what features differentiate them.

The competitor analysis is particularly valuable for technical leaders. Understanding how a problem is currently solved across the industry — through physical means, digital verification, vendor APIs, or in-house custom systems — widens the solution space dramatically. For identity verification, for example, the landscape includes physical ID checks, electronic ID verification, SMS authentication, knowledge-based authentication, biometric systems, and specialized vendors like ID.me and Jumio. Each represents a different point on the innovation spectrum.

### The Innovation Spectrum

**Core Concept**

As solutions are generated, each sits somewhere on a spectrum from commodity to highly innovative. Commodity solutions are easily built or integrated — think standard messaging capabilities with many off-the-shelf options. Highly innovative solutions are new capabilities that have never been built before — think quantum computing or autonomous vehicles. The spectrum is important because it determines the cost-benefit calculus of pursuing a particular solution.

Innovation has clear benefits: it can increase speed, improve user experience dramatically, and build competitive moats. But it also has clear costs: the effort is high and the outcome uncertain. For innovation to justify the investment, it must be highly aligned with company strategy, with benefits far outweighing costs.

**Practical Application**

DocuSign illustrates the build case for innovation: their strategy centers on automating agreement management, making ID verification a core capability that improves user experience and deepens their competitive moat. Goodreads illustrates the opposite: their strategy centers on book discovery and sharing, where innovating on ID verification would provide no competitive advantage. The same capability, different strategic contexts, opposite conclusions.

At eBay Motors, the team faced a billion-permutation problem: matching car parts to specific makes, models, and years when buyers searched by vehicle description and sellers cataloged by model numbers. A commodity solution — adding compatible-car fields in listing footers — was available. But the more innovative route — purchasing and integrating vendor catalogs to build a comprehensive back-end mapping — was chosen because buyer-seller matching is core to eBay's business. At Skyscanner, by contrast, the problem of improving conversion through page load time required no innovation at all — just optimizing low-performing pages.

> "Competitor details are important for the conversation. An engineer who generates ideas with this domain knowledge has a big leg up on someone who hasn't." — Matt Greenberg

---

## 4. Decision Alignment: The Vector Math of Teams

### Guiding Principles as Strategic Alignment

**Core Concept**

In many organizations, different teams use different criteria to make decisions. Over time, these inconsistencies compound: individually reasonable choices don't work together as part of a larger system. The Vector Math of Teams, a framework from Dharmesh Shah building on an Elon Musk observation, captures this problem precisely. Every decision is a vector with both magnitude (level of impact) and direction (what the decision prioritizes). If every decision points in the same direction, the team maximizes output. If decisions point in different directions, effort is scattered and the organization faces constraints that are hard to overcome.

Guiding principles are the mechanism for aligning decision vectors. They are core ideas for your company or product strategy — not prescriptions for specific decisions, but yardsticks by which to measure individual decisions, recognize when work conflicts with strategic direction, and reconcile that conflict. Examples include "prioritize trust and safety above all else" or "only ship code to production that can be responsibly maintained."

The power of guiding principles lies in their ability to enable distributed decision-making. When hundreds of engineers make dozens of daily decisions about implementation, architecture, and prioritization, no centralized review process can keep them aligned. But if every engineer internalizes the same small set of principles, their independent decisions will naturally converge toward consistent outcomes.

**Two Types of Principles**

**Customer principles** reflect the capabilities that customers care about most — derived directly from the value proposition in the Use Case Map. At Wise, the principles are price, speed, convenience, and security. Harsh Sinha sets a high bar: "Every engineering team should be optimizing how to move money inexpensively, quickly, conveniently, and securely. Every person should be able to stand up in front of the entire company and explain how their work impacts one of these factors."

These principles both enable and constrain. They enable by clarifying what matters: a team working on onboarding can justify automation investments because they improve speed. They constrain by clarifying what doesn't matter: a customer request for cryptocurrency exchange features, if it doesn't dramatically improve price, speed, convenience, or security, can be deprioritized without debate.

**Development principles** reflect strategic decisions about how the organization builds software. Three examples illustrate the range:

**Responsible maintenance** means choosing technologies that are viable (battle-tested), scalable (work as the product grows), and sustainable (maintainable long-term). Bryan Dove shared how this principle drove the language selection for Amazon S3 — choosing a more widely known language over one that enabled more complex operations, because long-term maintainability by a wide population of developers trumped short-term capability. Wise applied the same principle when choosing Kafka over Artemis: despite Artemis having a short-term deployment advantage, Kafka's backing by high-profile companies indicated better long-term sustainability.

**High-leverage work** means prioritizing work that can be reused across teams for a net positive increase in productivity. The sense check math is straightforward: a dedicated developer tools engineer in a 10-person team produces 0.45 FTE of value (5% × 9 remaining engineers) at a cost of 1 FTE — not worth it. The same engineer in a 100-person team produces 4.95 FTE of value — clearly worth it.

**Autonomous, independent teams** is Wise's core development principle. Teams own their decisions, seek input but make final calls, and minimize cross-team dependencies. This principle cascades through many organizational decisions: weak code ownership (any team can change any code, not just their own), single programming language across the codebase (enabling weak code ownership), and acceptance of some duplication waste rather than slowing teams down to converge on shared solutions.

**Nuances & Limitations**

Guiding principles are not plug-and-play between companies. Autonomous teams work at Wise — they might not work at SpaceX, where specialized knowledge is deep and error costs are catastrophic. The three attributes of good principles are instructive: they must be **foundational** (simple and specific enough to influence decisions consistently), **dynamic** (updated as markets and organizations learn), and **pervasive** (known by all team members through onboarding and continuous visibility).

> "Every person in your company is a vector. Your progress is determined by the sum of all vectors." — Elon Musk

---

## 5. Navigating Principle Conflicts

### When to Break vs. When to Change

**Core Concept**

The most challenging aspect of guiding principles is knowing what to do when a compelling choice requires going against one. This is not a sign of bad principles — it is an inevitable consequence of operating in a complex environment where no simple rule can govern every situation. Technical leaders face three options: uphold the principle, break the principle (make an exception), or change the principle (update it for all future decisions). Choosing well between these options is a sophisticated strategic skill.

**Breaking the Principle**

There are two valid reasons to break a principle. The first is when the principle doesn't serve its purpose in a specific case. Wise's autonomous teams principle exists to increase speed. But when two regional teams in Brazil and India began independently building separate tax computation systems, leadership intervened and told them to centralize. The duplication was too complex and costly for the autonomy-speed tradeoff to hold. Similarly, a hypothetical Google might practice weak code ownership broadly but enforce strict code review for Search, where a small change could have outsized negative effects on hundreds of millions of users.

The responsible maintenance principle provides another example of purposeful breaking. If you are testing an MVP and want to get it in market quickly, you might deliberately overlook responsible maintenance — accepting technical debt with the explicit knowledge that it will need to be repaid if the product achieves product-market fit. The key word is "deliberately": breaking a principle accidentally is a failure; breaking it intentionally with clear reasoning is a strategic choice.

The second reason to break a principle is when two principles conflict and you must choose between them. When Wise migrated to the cloud, cost and convenience — two of their four customer principles — came into direct tension. Cloud infrastructure would provide more reliable uptime and availability (convenience), but at higher cost to the customer (price). The team resolved the conflict by choosing convenience and messaging the cost increase as an investment in better service, viable because the increase didn't exceed customer willingness to pay.

**Changing the Principle**

Changing a principle is a bigger decision because it applies to all future decisions, not just one. Companies typically do not change principles lightly, unless a macro shift in product, market, or company demands it.

**Product portfolio expansion** can trigger principle changes. Wise initially prioritized convenience over security, verifying phone numbers only after users created their first transfer — allowing exploration before negative psych. But when Wise launched its account product (where users hold money), the security stakes rose dramatically. The principle shifted: account creation now requires immediate phone verification and two-factor authentication.

**Shifts in customer behavior** can trigger principle changes. Apple's iPhone initially prioritized convenience and personalization. As customer preferences for data privacy intensified, Apple introduced robust opt-in messaging throughout the product — increasing friction but reflecting changed customer values.

**Company maturity** can trigger principle changes. Facebook's evolution from "Move Fast and Break Things" to "Move Fast and Break Things, But Not Privacy" to "Move Fast on Stable Infrastructure" traces a three-stage maturity arc. The original principle made sense for a startup grabbing market share. At scale, breaking things for billions of users was no longer acceptable.

**Financial reality** can trigger principle changes. A company with six months of runway might abandon responsible maintenance entirely, adopting a new principle: only work on product features and enhancements that increase active users and can be in market in less than one week.

**Connections to Other Ideas**

Principle conflicts connect directly to the risk work framework from Module 02. Breaking a principle is itself a risk decision — it trades short-term benefit for potential long-term cost. The sliding scale vs. binary risk analysis applies: some principle violations create manageable, recoverable technical debt (sliding scale), while others introduce existential risk (binary). Knowing the difference is the mark of strategic judgment.

> "Our guiding principles help us with future planning and clarity of communication across the organization. People are more aligned because our guiding principles exist." — Harsh Sinha

---

## 6. Build or Buy

### The Four-Factor Scorecard

**Core Concept**

One of the most consequential and recurring trade-offs in technical strategy is whether to build a capability in-house or purchase it from a vendor. Engineers are systematically biased toward building. Bryan Dove, after decades of leadership, confesses: "After 20 years of trying to build everything, I realized that I should have advocated buying way more often. I could have gotten so much more done with the same amount of time." The Build or Buy Scorecard provides a systematic framework for overcoming this bias by evaluating four factors: strategic value, available resources, cost, and vendor reliability.

**Strategic Value: Differentiators vs. MMRs**

This is the most important factor. A capability has high strategic value if it is central to how the company makes money or how the product is differentiated. Tomas Tunguz of Redpoint Ventures draws the distinction between "Differentiators" (unique, strategically valuable capabilities) and "Minimum Market Requirements" (MMRs — basic features every customer expects). His observation is pointed: "Your customers will likely give feedback to invest more in MMRs... This type of product feedback is important, but it shouldn't be the majority of engineering effort."

MMRs can be purchased off the shelf without affecting differentiation. Wise needs identity verification to operate, but it is not how they make money — an MMR, best purchased. Facebook's ad targeting algorithm, by contrast, is the core of their revenue model — a differentiator that must be built and owned. Even very large tech companies purchase Workday for payroll and Salesforce for CRM because these are MMRs, not differentiators, regardless of whether their engineers could build alternatives.

The implication is counterintuitive for engineers: "In a world overrun with SaaS products, it should feel like you're buying a lot of stuff. This requires tech leaders to shift their mindset from focusing on building things to focusing on solving customer problems and creating value for customers."

**Available Resources**

This factor has two parts: does the team have the expertise to build it, and can they prioritize it given other work? A common mistake is evaluating current availability without considering future maintenance. If a solution requires an obscure programming language that only one person knows, ongoing support depends entirely on that person remaining in their role — a fragile foundation.

**Cost**

Technical leaders systematically underestimate in-house costs in two ways. First, they evaluate initial development costs while ignoring ongoing maintenance. A team of three engineers building for one quarter seems cheaper than a $175K vendor contract — until you factor in indefinite maintenance costs. Second, they underestimate complexity for sophisticated capabilities. Stripe took two years of full-time focus to develop payment processing and continues to invest in evolving regulatory compliance. A team estimating they can replicate this in "a few months" is almost certainly wrong.

**Vendor Reliability**

Two questions: Will the vendor still exist tomorrow? (Cutting-edge vendors may not have achieved product-market fit.) And will they meet your needs? Bryan Dove warns against overestimating uniqueness: "I'm dubious when people say that their requirements are unique. More often than not, they haven't distinguished needs from nice-to-haves." The analogy is apt: companies write job descriptions for candidates who don't exist, when perfectly capable alternatives are available. The same overspecification happens with vendor evaluation.

**Practical Application**

The H&R Block vs. Dropbox comparison makes the framework concrete. For H&R Block considering cloud infrastructure: strategic value is low (tax filing is the core business, not infrastructure), resources are low (team is dedicated to expanding use cases), vendor cost is high, but vendor reliability is also high (established cloud providers). Verdict: buy, despite high costs.

For Dropbox considering the same infrastructure decision: strategic value is high (data storage is the core business), resources are high (infrastructure expertise is a core competency), with the same cost and reliability profile. Verdict: build — which is exactly what Dropbox did starting in 2013, constructing exabyte-scale proprietary storage.

> "After 20 years of trying to build everything, I realized that I should have advocated buying way more often. I could have gotten so much more done with the same amount of time." — Bryan Dove

---

## 7. The Scope-Time-Resource Triad

### Pressure-Testing Requirements

**Core Concept**

When requirements exceed capacity — which happens constantly — technical leaders face a choice about how to respond. They can shut the conversation down ("There's no way we can do this"). They can avoid conflict by letting stakeholders discover the timeline is impossible on their own. Or they can proactively explore how to adjust scope, timeline, or team size to make the project feasible. The third option is obviously correct but remarkably rare in practice, because under pressure, saying "no" or avoiding the issue requires less cognitive and political effort than constructive negotiation.

The Scope-Time-Resource triad transforms binary "Can we do it or not?" conversations into productive "What might we achieve?" conversations. Bryan Dove identifies this as a distinguishing capability: "Sometimes things just take longer or are harder than expected. Engineers who manage re-estimation conversations constructively, through the lens of the business, have a superpower."

The mechanism is pressure-testing: asking "What if?" questions that reveal which aspects of a project are truly fixed and which are flexible. "What if we didn't launch in 10 markets?" tests scope flexibility. "What if we didn't launch this quarter?" tests timeline flexibility. "What if we doubled our team size?" tests resource flexibility. The answers often surprise everyone — revealing that "requirements" are actually preferences, and "deadlines" are actually aspirations.

### Four Scope Levers

**Core Concept**

There is a widespread misconception that reducing scope means sacrificing quality. In practice, quality reduction is usually the least effective lever and should be a last resort. Four better options exist.

**Reduce the number of features.** This works when you can still deliver the core value proposition with fewer features. The test is whether removing a feature removes the reason customers choose your product. A mobile game launching at an Apple conference can cut social features (friending, trading) without undermining the core entertainment value — but cannot cut core gameplay. The caveat: this only works if you will have capacity to add features later and if the architecture does not make future addition prohibitively difficult.

**Reduce the complexity of features.** This works when a simpler implementation still delivers the core value. A mobile game team might leverage the backend of an existing game in the company portfolio and apply new artwork, rather than building from scratch.

**Reduce the number of priority user segments.** This means serving fewer markets, use cases, or device types initially. Launching in a single language or on a single operating system lets you deliver a premium experience for your best users rather than an average experience for everyone.

**Outsource some aspect of development.** When a capability has low strategic value, resources are scarce, outsourcing is cost-effective, and a reliable vendor exists, this can simultaneously reduce scope and increase speed to market.

### Three Time Levers

**Move launch dates.** This works when the product is not date-dependent and progress is measured by gates (business conditions to be met) rather than calendar dates. A SaaS collaboration tool has no hard date dependency; a tax product must launch before tax season. Understanding this distinction prevents the common mistake of treating all deadlines as equally rigid.

**Reduce QA and testing time.** This works for high-risk experimental products that will change dramatically after launch based on user input. Social networks sometimes release complex features in test markets rather than through rigorous internal QA. This does not work when customer delight depends on quality (file sharing must work better than email) or when regulatory/security requirements demand testing rigor (fintech, medtech).

**Postpone instrumentation and tooling.** This works when you have low traffic expectations at launch and can add measurement later. It does not work when a marketing push will drive concentrated initial traffic that must be captured.

### Resource Realities

The most common misconception about resources is that doubling team size halves delivery time. In reality, this relationship holds only when work consists of many isolated problems with few dependencies. Building separate modules for different user types (administrators, providers, lab technicians in a healthcare system) can benefit from additional engineers. Work on shared surfaces (iOS and Android writing to the same files), integration with centralized systems, late-stage projects (no time to ramp), highly specialized domains (ramp cost exceeds contribution), and exploratory work (where nimbleness matters more than headcount) all fail to benefit — and sometimes suffer — from adding resources.

**Practical Application**

The EMEA launch scenario illustrates the triad in action. A product manager commits to launching in "Europe" this quarter. Once work begins, "Europe" becomes "EMEA" — 10 countries with 5 distinct tax codes, each more complex than estimated. The technical leader has three constructive responses: pressure-test scope (What if we launched in the 3 highest-value markets first?), pressure-test time (What if we phased the launch over two quarters?), or pressure-test resources (What if we engaged a vendor for the tax computation layer?). Each "what if" opens a negotiation rather than closing a door.

The key communication frame: instead of saying "This can't be done," assume you're going to move forward. Evaluate what combination of scope, time, and resource changes would make it feasible. Present these options to stakeholders as "what would need to be true" and let them evaluate which tradeoffs are worthwhile.

> "Every single company I've advised has made technical decisions they've regretted." — Bryan Dove

---

## Connections Map

The seven chapters form a complete arc from creative contribution to rigorous evaluation, addressing both the interpersonal and analytical dimensions of technical strategy.

The module opens with a psychological reframing (Chapter 1): engineers must learn to operate in two modes, not one. This connects directly to the Strategy Spiral from earlier modules — the default convergent mode is what traps technical leaders in the "executor" reputation. Learning to diverge is the mechanism for breaking free.

The preconditions chapter (Chapter 2) is the bridge between individual capability and organizational reality. It honestly acknowledges that technical leaders cannot simply declare themselves strategic partners — they must earn the role through demonstrated fluency, reliability, and interpersonal skill. This connects to the Strategy Stack: fluency means understanding mission, company strategy, and product strategy well enough to generate ideas that fit the strategic context. It also connects to the Portfolio framework: trust is built by reliably delivering across product, scale, and risk work.

The Idea Generation Guide (Chapter 3) and Guiding Principles (Chapter 4) are complementary tools operating at different time horizons. The Guide structures a specific ideation session — one problem, one data analysis, one set of solutions. Guiding principles structure ongoing organizational alignment — ensuring that the solutions generated in any individual session are consistent with the solutions generated in every other session. The Vector Math of Teams is the theoretical justification: misaligned vectors (decisions) waste organizational energy regardless of their individual magnitude (impact).

Principle conflicts (Chapter 5) introduce productive tension. The module does not present principles as rigid rules but as living standards that must adapt to changing circumstances — product portfolio expansion, customer behavior shifts, company maturity, financial pressures. Facebook's three-stage evolution of "Move Fast and Break Things" is the signature example: what works for a startup scaling rapidly is dangerous for a platform serving billions.

Build or Buy (Chapter 6) and Scope-Time-Resources (Chapter 7) are the most tactical tools, designed for the specific moments when convergent decisions must be made. They share a common structure: each provides a systematic framework for what would otherwise be ad hoc judgment calls. And both counter common engineering biases — the bias toward building everything in-house, and the bias toward saying "no" when requirements seem impossible. The meta-message is consistent: great technical leaders do not default to their most comfortable response. They apply structured analysis to find the response that creates the most value.

---

## Action Items (Deduplicated)

### Immediate
- **Audit your default mode:** In your next three planning meetings, consciously observe whether you are diverging (generating ideas, building on others' contributions) or converging (poking holes, assessing feasibility). Track the ratio. *Most engineers will discover they converge 90%+ of the time — awareness is the first step to rebalancing.*
- **Map your product's Use Case Map:** If you haven't already (from Module 02), document the Problem, Persona, Value Proposition, and Alternatives. This is the fluency prerequisite for effective divergence.
- **Identify 2-3 unspoken guiding principles:** What criteria does your team actually use when making technical decisions? Document them explicitly and share with your product counterpart. *Unspoken principles cause misalignment; making them explicit enables discussion.*

### Short-term
- **Schedule recurring ideation time:** Propose a monthly brainstorming session with your product partner, labeled explicitly as "ideation" or "divergent thinking." Agree on ground rules: no feasibility assessment during divergence.
- **Complete a Build or Buy scorecard:** Pick one capability your team is considering building in-house. Score it across strategic value, available resources, cost (including maintenance), and vendor reliability. Challenge yourself to consider buying even if your instinct says build.
- **Practice pressure-testing:** The next time you face impossible requirements, prepare three "What if?" options — one for each dimension of scope, time, and resources — before responding. Present them as alternatives rather than rejections. *This single behavior change transforms the engineering role from gatekeeper to collaborator.*
- **Document your customer principles:** Identify the 3-4 attributes customers value most about your product. For each, identify one recent decision that aligned with the principle and one that didn't.

### Strategic
- **Establish development principles with your engineering org:** Propose and discuss principles like responsible maintenance, high-leverage work, or team autonomy. Include clear criteria for when exceptions are warranted. Review annually.
- **Build a vendor strategy:** For capabilities identified as MMRs (not differentiators), proactively evaluate vendor options before the build pressure arises. Having pre-researched alternatives changes the conversation from "should we build or buy?" to "which vendor best meets our needs?"
- **Create a principle conflict resolution process:** When two principles collide, the decision of which to prioritize should not be ad hoc. Establish a lightweight process for escalating and resolving conflicts, with documentation of the reasoning for future reference.

---

## Critical Gaps & Limitations

**The trust-building prerequisite is real but slow.** The module correctly identifies that technical leaders must earn the right to participate in ideation through reliable delivery and relationship building. But this process takes months or years, and the module offers no shortcuts for technical leaders who are new to an organization or who have inherited a poor reputation from predecessors. The implication is that ascending the strategy spiral is a long game, not a quick fix.

**Divergent thinking skills are assumed to be teachable.** The module provides structure (the Idea Generation Guide) and permission (the "Yes, and..." framing) but does not deeply address the possibility that some individuals may genuinely lack creative ideation capability. Not every excellent engineer is a natural divergent thinker, and the module does not explore whether this is a trainable skill or a personality trait.

**The Build or Buy framework oversimplifies vendor relationships.** Real vendor decisions involve contract negotiation, integration complexity, data sovereignty concerns, switching costs, and the risk of vendor lock-in. The four-factor scorecard is a useful starting point but does not capture the full complexity of enterprise procurement decisions.

**Scope reduction advice assumes product team openness.** The pressure-testing approach assumes that product managers and business stakeholders are receptive to questions about requirements flexibility. In organizations with top-down planning cultures, "What if we didn't launch in 10 markets?" may not be a welcome question regardless of how constructively it is framed.

**The module does not address failed ideation.** What happens when a technical leader invests in divergent thinking, generates ideas, and those ideas are consistently not adopted? The module focuses on how to generate and evaluate ideas but does not address the psychological and professional impact of contributing ideas that are rejected.

**Innovation spectrum lacks decision criteria.** The module introduces the commodity-to-innovative spectrum but provides limited guidance on where to target. The DocuSign vs. Goodreads examples help, but a more systematic framework for deciding how innovative a solution should be — beyond "it depends on strategic alignment" — would strengthen the toolkit.

---

## Appendix: Key Quotes & References

| # | Topic | Source | Quote / Reference |
|---|-------|--------|-------------------|
| 1 | Decision vectors | Elon Musk / Dharmesh Shah | "Every person in your company is a vector. Your progress is determined by the sum of all vectors." |
| 2 | Divergent thinking | IDEO | "Divergence needs to feel optimistic, exploratory, and experimental, but it often feels foggy to people who are more used to operating on a plan." |
| 3 | Reading the room | Harsh Sinha, Wise | "The best technical leaders get their ideas adopted because they 'read the room' to assess what is most important and reframe their ideas to support those priorities." |
| 4 | Perception shift | Matt Greenberg, Credit Karma | "To climb out or avoid the strategy spiral, you need to shift perception. Rather than being an enemy beating up bad ideas, you want to be a problem-solving ally." |
| 5 | Accountability | Bryan Dove, CommerceHub | "Part of being a great technical leader is sharing credit when things go well and taking blame they don't." |
| 6 | Customer principles | Harsh Sinha, Wise | "Every engineering team should be optimizing how to move money inexpensively, quickly, conveniently, and securely." |
| 7 | Parallel experimentation | Harsh Sinha, Wise | "I fundamentally believe that if I run more experiments in parallel than you, I will learn more quickly from my customers and get the input I need to win in the long run." |
| 8 | Build bias | Bryan Dove, CommerceHub | "After 20 years of trying to build everything, I realized that I should have advocated buying way more often." |
| 9 | Buying mindset | Bryan Dove, CommerceHub | "In a world overrun with SaaS products, it should feel like you're buying a lot of stuff." |
| 10 | Unique requirements | Bryan Dove, CommerceHub | "I'm dubious when people say that their requirements are unique. More often than not, they haven't distinguished needs from nice-to-haves." |
| 11 | MMRs vs Differentiators | Tomas Tunguz, Redpoint | "Your customers will likely give feedback to invest more in MMRs... This type of product feedback is important, but it shouldn't be the majority of engineering effort." |
| 12 | Re-estimation | Bryan Dove, CommerceHub | "Sometimes things just take longer or are harder than expected. Engineers who manage re-estimation conversations constructively, through the lens of the business, have a superpower." |
| 13 | Regret | Bryan Dove, CommerceHub | "Every single company I've advised has made technical decisions they've regretted." |
| 14 | Wise investment product | Case Study | Divergent brainstorm → convergent MVP: partnered with investment API, manual phone-based management, limited early access |
| 15 | eBay Motors car parts | Case Study (Harsh Sinha) | Billion-permutation matching problem; chose innovative catalog-based back-end map over commodity footer fields |
