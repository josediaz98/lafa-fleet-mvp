# Foundational Technical Concepts: Collected Insights
> Reforge Technical Foundations — Module 02 | PM-oriented technical literacy for product managers navigating established and emerging technology landscapes

## Sources

| # | Source | Type | Topics |
|---|--------|------|--------|
| 1 | Reforge Technical Foundations — Module 02: Foundational Technical Concepts | Course module | Technology classification, abstraction depth, 3-tier architecture |

## Executive Summary

This module addresses one of the most consequential judgment calls a product manager makes: how deeply to engage with the technology their team is building on. The answer, it turns out, depends not on the PM's personal technical aptitude or curiosity, but on the maturity of the technology itself. This distinction—between established and emerging technology—forms the central decision framework of the module and has cascading implications for how PMs allocate their attention, collaborate with engineers, and identify product opportunities.

The core thesis is that technology maturity determines abstraction stability, and abstraction stability determines how deep a PM needs to go. Established technologies have settled into clean, well-understood abstractions that a PM can treat as reliable building blocks. The conventional wisdom about what these technologies can and cannot do is largely accurate, which means the PM's primary leverage is in connecting business problems to engineering effort—optimizing the ratio of technical cost to business value. There is no strategic advantage in going deep when the territory is already well-mapped.

Emerging technologies invert this equation entirely. When abstractions are still forming, the conventional wisdom is unreliable or nonexistent. A PM who stays at the surface level risks either missing novel capabilities that haven't been explored yet, or making flawed assumptions based on analogies to established technologies that don't actually apply. The module uses Large Language Models as the canonical example: depending on which layer of abstraction you examine—chatbot, autocomplete engine, next-token predictor, matrix multiplication pipeline—you arrive at fundamentally different views of what the technology can do. Each view opens different product possibilities. The PM who only sees "chatbot" will design chatbot products; the PM who understands the inference mechanism will see opportunities the first PM cannot.

Beyond the classification framework, the module introduces the 3-tier architecture as the foundational mental model for understanding SaaS systems. This architecture—client, business logic, and storage—is presented not as an engineering concern but as a product-shaping force. The way data is structured constrains what the business logic layer can easily do, and the API surface exposed by the business logic layer constrains what the client can offer users. These are not merely technical realities; they are the physics of what makes features easy or hard to build, and understanding them gives PMs a structural vocabulary for technical conversations.

A particularly valuable insight is the module's reframing of emerging technology as a strategic lever for reopening "closed" problems—situations where a business had identified a real customer need but lacked a viable technical solution. Rather than chasing novelty for its own sake, the most productive use of emerging technology is to revisit these previously intractable problems with fresh technical capabilities. This reframe guards against the common failure mode of technology-driven product thinking, where teams build impressive technical demonstrations that don't solve real problems.

Finally, the module surfaces organizational design implications embedded in architectural choices. Whether engineering teams are organized within a single tier or across tiers is not a neutral staffing decision—it is a trade-off between engineering efficiency (same-tier teams share tooling and context) and product outcomes (cross-tier teams own the full user experience for a feature). This insight connects architecture directly to organizational strategy, a critical link for PMs who must navigate both.

---

## 1. Technology Classification: Established vs. Emerging

### Core Concept

The most important first step when engaging with any technology is to classify it: is this an established technology or an emerging one? This classification is not a label of quality or sophistication—it is a statement about the stability of the technology's abstraction boundaries. Established technologies have settled into clean, predictable layers that you can draw on a whiteboard and trust won't shift underneath you. Modern SaaS development, mobile development, and traditional web architectures all fall into this category. The patterns are well-documented, the trade-offs are well-understood, and the engineering community has a shared vocabulary for discussing them.

Emerging technologies, by contrast, are defined precisely by the fact that their abstraction boundaries are still being discovered. The technology exists and works, but the question of how to think about it—what the right conceptual layers are, where one capability ends and another begins—has not been settled. Large Language Models are the paradigmatic example: are they chatbots? Autocomplete engines? Next-token predictors? Mixture-of-experts systems? Each framing is technically accurate at a different level of abstraction, and each suggests a different set of product possibilities. The instability of these boundaries is not a flaw to be tolerated; it is the defining characteristic of the emerging phase, and it has direct implications for how PMs should engage.

A crucial nuance is that even within an established technology space, company-specific emerging technologies can exist. A company building a standard SaaS product may still be experimenting with novel data architectures or integrating emerging AI capabilities. The classification is not binary at the organizational level—it applies technology by technology, component by component.

### Underlying Mechanism

The mechanism at work is abstraction stability as an information signal. When abstractions are stable, the information you need as a PM is already encoded in the shared vocabulary of your engineering team and the broader industry. You can trust the map. When abstractions are unstable, the map is being drawn in real time, and the territory may look different depending on who you ask and which layer they're examining. This is why the same underlying technology—a large neural network predicting tokens—can be simultaneously described as a chatbot, a writing assistant, an autocomplete engine, or a reasoning system. Each description is a different abstraction, and which one dominates will shape the products built on top of it.

### Connections to Other Ideas

This classification framework directly governs PM engagement depth (Chapter 2)—the depth at which a PM should operate in the technical stack is a function of where the technology falls on the established-emerging spectrum. It also connects to the strategic use of emerging technology (Chapter 3), because recognizing that you're working with an emerging technology is the prerequisite for leveraging it strategically rather than treating it as just another tool. And it provides context for the 3-tier architecture (Chapter 4): the 3-tier model is itself a product of established technology, a stable abstraction that PMs can rely on precisely because SaaS development has matured.

### Practical Application

When joining a new team or starting a new project, the first question to answer is: which technologies in our stack are established, and which are emerging? For the established ones, learn the standard vocabulary and focus your energy on business problems. For the emerging ones, prepare to go deeper. In practice, this might mean that the web frontend and database layers of your product are established (you can rely on standard React and PostgreSQL mental models), while the ML inference pipeline is emerging (you need to understand how models are serving predictions, what latency characteristics look like, and how prompt engineering affects output quality).

### Nuances & Limitations

The boundary between established and emerging is not always crisp, and technologies can transition from one category to the other. What matters is not getting the classification perfectly right, but using it as a heuristic for attention allocation. Also, a PM who classifies everything as "established" and stays high-level across the board will eventually be blindsided when a formerly stable abstraction shifts—which does happen, particularly during platform transitions or major version changes.

> "Established technologies are places where the abstraction boundaries are tidy and clear—you can usually draw them and assume they won't change." — Reforge, Module 02

> "Emerging technologies are places where the abstraction boundaries are being defined—that's part of figuring out the tech!" — Reforge, Module 02

---

## 2. PM Engagement Depth: Navigating the Abstraction Stack

### Core Concept

Once a PM has classified the technology they're working with, the natural next question is: how deep do I need to go? The module offers a clear prescription. For established technology, stay higher level. For emerging technology, go further down the abstraction stack. This is not a matter of personal preference or intellectual curiosity—it is a strategic allocation of a PM's most scarce resource: their attention.

In established technology spaces, the conventional wisdom about capabilities and limitations is largely accurate. The engineering team has a common language, and the PM can quickly learn enough to participate in technical conversations without needing to understand implementation details. The PM's primary value is at the intersection of business problems and engineering effort—understanding which features deliver the most business value relative to their engineering cost. Going deeper than necessary doesn't add strategic value; it consumes time that would be better spent on customer problems, market analysis, and prioritization.

In emerging technology spaces, staying at a high level is actively dangerous. Because the abstractions haven't stabilized, the conventional wisdom is unreliable. The PM who treats an emerging technology with the same "hands-off" approach appropriate for established tech will either miss opportunities that haven't been explored yet, or make flawed assumptions rooted in analogies that don't hold. The module explicitly identifies this as a "Common Mistake"—and a costly one, because the missed opportunities in emerging tech are often the most transformative.

### Underlying Mechanism

The mechanism is the reliability of shared mental models. In established tech, the shared mental models held by the industry are trustworthy proxies for reality—you can rely on them to make good decisions. In emerging tech, those shared mental models either don't exist yet or are actively misleading. The PM must build their own understanding from closer to first principles, which requires going deeper. The module frames this through the concept of the "Bridge Partner" and the "technical overlap zone"—suggesting that in emerging tech, the PM should work more closely with their engineering counterpart at the lower boundary of shared understanding, collaboratively defining the abstraction boundaries that will eventually become the stable interfaces the organization builds on.

### Connections to Other Ideas

This chapter operationalizes the classification from Chapter 1 into a concrete behavioral prescription. It also sets up Chapter 3, because going deeper into emerging technology is what enables the PM to identify opportunities to reopen closed problems. Without depth, the PM cannot see what the technology actually makes possible. The engagement depth principle also connects to Chapter 5 (organizational implications): the degree to which PMs engage with technical details influences how engineering teams should be structured and how PM-engineering collaboration should work.

### Practical Application

For a PM on a standard SaaS product with established technology, the right engagement level is understanding the API contracts, data models, and performance characteristics well enough to make informed prioritization decisions. You should be able to answer: "Why is this feature harder to build than that one?" without needing to understand the code itself. For a PM working on an AI-powered feature, the right engagement level is significantly deeper—understanding how the model generates outputs, what its failure modes look like, how different prompting strategies affect quality, and where the boundaries of reliable performance lie. This depth is not optional; without it, you cannot make sound product decisions in the space.

### Nuances & Limitations

The prescription to "go deep" in emerging tech has practical limits. The module explicitly notes that a PM working with LLMs "probably doesn't need to know matrix multiplication." The goal is not to become an engineer, but to understand enough about the mechanism of the technology to recognize what it can actually do—as opposed to what surface-level analogies suggest. The right depth is the level at which you can distinguish genuine capabilities from misleading comparisons.

> "In an established technology, the key questions are about the business—not what the technology makes possible. As a PM, the value of understanding the technology is largely about min/maxing engineering effort to business value." — Reforge, Module 02

> "Treating an emerging technology in the same hands-off way you might treat an established technology means you'll either miss out on the new possibilities that haven't been explored yet, or that you'll make bad assumptions about what is or isn't possible based on bad comparisons." — Reforge, Module 02

> "In these emerging technology situations, going deep is really important because you're on the frontier, and you can't rely on conventional wisdom or consensus to tell you what the standard set of possibilities are." — Reforge, Module 02

---

## 3. Emerging Technology as Strategic Lever

### Core Concept

One of the module's most valuable insights is the reframing of emerging technology from a source of novelty to a strategic lever for solving previously unsolvable problems. The natural instinct when encountering a powerful new technology is to ask: "What new problems can this solve?" But the module inverts this question. The more productive frame is: "What old problems—ones we already know are important but couldn't solve—does this technology now make solvable?" This reframe is powerful because it anchors emerging technology to validated business needs rather than speculative possibilities.

Every product organization has a graveyard of "closed" problems—customer needs that were identified and validated but abandoned because no viable technical solution existed at the time. These represent latent demand with known business value. When an emerging technology appears, the highest-value move is not to dream up entirely new applications, but to revisit this graveyard and ask which problems can now be reopened. This approach has a built-in advantage: the business case is already partially validated. You know the problem is real because you encountered it before. What's changed is the solution space.

The module uses LLMs as an extended case study to illustrate how different levels of abstraction reveal different product possibilities. At the highest level, LLMs are chatbots—which suggests chatbot products. One level down, they are autocomplete engines—which suggests text completion features, inline suggestions, and generative interfaces. Deeper still, they are next-token predictors, which opens up applications in classification, summarization, and structured data extraction that have nothing to do with conversation. The product opportunities visible to a PM are directly proportional to the depth at which they understand the technology.

### Underlying Mechanism

The mechanism is that emerging technologies expand the solution space for known problems. Before the technology existed, certain problems had no efficient solution. The technology doesn't change the problem—it changes what's possible. The PM who is aware of both the problem history and the technology's capabilities is uniquely positioned to make this connection. The danger is the reverse: starting from the technology and searching for problems it might solve, which tends to produce impressive demos without business value.

### Connections to Other Ideas

This chapter depends on the engagement depth from Chapter 2—you can only leverage emerging technology strategically if you understand it deeply enough to see beyond surface-level applications. It also connects back to the classification framework in Chapter 1, because this strategic approach is specifically relevant to emerging technologies; for established technologies, the solution space is already well-explored. Additionally, the "closed problems" reframe is a practical guard against the common mistake identified in the module: letting engineering teams chase shiny technology without a clear business case.

### Practical Application

Maintain an explicit list of problems your organization has previously deprioritized or abandoned due to technical infeasibility. When a new technology capability emerges, systematically review this list. For example, if your product had previously attempted and failed to build real-time content moderation (too slow, too inaccurate), the emergence of fast LLM inference might make this problem worth reopening. The key discipline is starting from the problem, not from the technology.

### Nuances & Limitations

The module rightly warns against the opposite failure mode as well: becoming so enchanted by emerging technology that you lose sight of your core PM responsibility, which is solving for business value. An engineering team excited about a new technology will naturally want to build with it, and the PM must be the voice of discipline—ensuring that technical exploration is anchored to real user problems and business outcomes. The tension between encouraging technical exploration and maintaining business focus is one of the central challenges of PM work in emerging tech spaces.

> "Emerging technologies often allow you to reopen 'closed' problems where you didn't previously have a good technical solution—but now, with the new capabilities presented by the technology, new solutions might be possible. Rather than getting enchanted by an emerging technology and trying to find new problems to solve with it, ask what problems you couldn't previously solve—that you now can solve." — Reforge, Module 02

> "While emerging technologies are exciting and allow your team to build things you couldn't before, your core role as a PM is about solving for business value. Don't let your engineering team get over-eager about shiny technology if it doesn't solve any problems for you." — Reforge, Module 02

> "Each of these ways of looking at 'what is an LLM' is a different type of abstraction and a different way of looking at what an LLM is or can be, and each one provides a different set of affordances for PMs working in the space." — Reforge, Module 02

> "At some point, all of this will be sorted out, and there will be really clear answers—maybe we'll find that AI copilots that primarily focus on auto-completing text are the winning move, or maybe not. Until then, we're all still figuring out how to use them and how to conceptualize them, so understanding more of what is truly possible will matter!" — Reforge, Module 02

---

## 4. 3-Tier Architecture: The Physics of SaaS Products

### Core Concept

The 3-tier architecture is presented as the foundational structural model for understanding how most SaaS products are built. It consists of three layers: the client layer (what users interact with), the business logic layer (the server-side code that processes requests and enforces rules), and the storage layer (where data lives). This architecture is not merely an engineering convention—it is the structural reality that determines what is easy and hard to build in any SaaS product. For a PM, understanding the 3-tier architecture is like understanding gravity: you don't need to know the equations, but you absolutely need to understand that things fall down.

The three tiers are connected in a specific dependency chain. The client depends on the business logic layer to access shared data, and it accesses this data through an API. The business logic layer, in turn, depends on the storage layer to persist and retrieve data. This means that capabilities flow upward through the stack: what the storage layer can efficiently store and query constrains what the business logic layer can do, and what the business logic layer exposes through its API constrains what the client can offer to users. When a PM asks "why can't we build this feature?" the answer very often traces back to a constraint at a lower tier.

The critical insight for PMs is that data structures define feasibility. If the storage layer doesn't represent a particular relationship between entities, the business logic layer cannot easily reason about that relationship, and the client cannot expose it to users. This is why seemingly simple feature requests ("just show the user their most relevant items") can be engineering nightmares: "relevance" may not be something the current data structures can efficiently compute.

### Underlying Mechanism

The mechanism is dependency propagation through layers. Each tier constrains the tier above it. The storage layer's data model defines what queries are efficient, which determines what the business logic layer can compute in reasonable time, which determines what the API can expose, which determines what the client can display. This chain of dependencies means that certain features require changes at the lowest tier (data model changes), which cascade upward through the entire stack—making them expensive. Other features only require changes at the client tier, making them cheap. A PM who understands this dependency chain can predict engineering cost with surprising accuracy, even without reading code.

### Connections to Other Ideas

The 3-tier architecture is itself an example of an established technology abstraction (Chapter 1)—it is stable, well-understood, and unlikely to change. PMs working with standard SaaS products can rely on this model as a trustworthy map of their system's structure. It also connects to PM engagement depth (Chapter 2): for established architectures, understanding the tier model and its implications is usually sufficient—the PM doesn't need to understand the implementation within each tier. The organizational implications (Chapter 5) are also direct: how teams are organized relative to these tiers is a strategic choice with real trade-offs.

### Practical Application

When evaluating a feature request, mentally trace it through the three tiers. Ask: does the storage layer already have the data we need? Can the business logic layer efficiently compute what we want? Does the API already expose the right endpoints? If you hit a "no" at the storage layer, expect high cost and long timelines. If the gap is only at the client layer, expect lower cost. This mental model gives PMs a structured way to have early conversations with engineers about feasibility and scope, before detailed estimation begins.

A practical example: a PM wants to add a "recommended items" feature. If the storage layer doesn't track user behavior or item attributes in a way that supports recommendation algorithms, this feature requires foundational data model changes—a major effort. If the data already exists and the business logic layer already computes recommendations (perhaps for a different feature), then the work is primarily in the API and client layers—a much smaller effort. The PM who understands the tier model can ask the right questions immediately.

### Nuances & Limitations

The 3-tier model is a simplification. Real production systems have additional layers (caching, CDNs, message queues, microservices), and the boundaries between tiers can be blurry in practice. However, as a mental model for PM decision-making, the three-tier abstraction is remarkably durable and useful. The module also notes that whether data is available on the client or the server influences what is possible—this is a subtlety that matters for offline capabilities, real-time features, and performance-sensitive interactions.

> "The 3-tier architecture is the foundation of most SaaS designs—it consists of a client layer, a business logic layer on the server side, and a storage layer." — Reforge, Module 02

> "Your data structures define what is easy and hard to do in the business logic layer." — Reforge, Module 02

> "What is, or isn't, supported by the API defines what the client can do." — Reforge, Module 02

---

## 5. Organizational & Product Implications

### Core Concept

The module's treatment of the 3-tier architecture extends beyond technical understanding into organizational strategy. One of the most consequential decisions a product organization makes is how to structure engineering teams relative to the architectural tiers. The module identifies two fundamental approaches: organizing teams within a tier, or organizing teams across tiers. This is not merely a staffing decision—it is a strategic trade-off that shapes both engineering productivity and product quality.

Teams organized within a tier (a frontend team, a backend team, a data team) share deep technical context, tools, and expertise. They can be highly efficient at their specialized work, developing sophisticated solutions within their domain. However, they require coordination across teams to deliver any feature that spans multiple tiers—which, in practice, is most features. This coordination overhead can slow feature delivery and create handoff friction.

Teams organized across tiers (a "shopping cart team" that owns the feature from database to UI) can deliver end-to-end features with less cross-team coordination. They own the full stack for their product area, which means they can make integrated decisions about how data is stored, how logic is processed, and how the experience is presented. The trade-off is that they may lack the depth of specialized expertise that within-tier teams develop, and they may duplicate infrastructure work across teams.

### Underlying Mechanism

The mechanism is a classic organizational design trade-off between specialization efficiency and integration effectiveness. Conway's Law—the observation that system designs tend to mirror organizational structures—applies directly. Within-tier teams naturally produce well-optimized individual layers but may create integration seams between them. Cross-tier teams naturally produce well-integrated features but may create inconsistencies between how different features use the underlying infrastructure. Neither structure is universally superior; the right choice depends on whether the organization's primary bottleneck is technical quality within layers or feature delivery speed across layers.

### Connections to Other Ideas

This organizational dimension connects the 3-tier architecture (Chapter 4) to real-world product management. A PM working with within-tier teams will spend more time coordinating dependencies across teams—a project management challenge. A PM working with cross-tier teams will spend more time ensuring technical consistency across features—a standards and architecture challenge. The organizational model also interacts with the established vs. emerging technology framework (Chapter 1): cross-tier teams may be better suited for emerging technology work (where rapid end-to-end experimentation matters), while within-tier teams may be better suited for scaling established technology (where deep specialization matters).

### Practical Application

As a PM, you may not control how teams are organized, but understanding the trade-off helps you work effectively within any structure. With within-tier teams, invest heavily in cross-team alignment and dependency management. With cross-tier teams, invest in shared standards and technical guidelines to prevent fragmentation. And when organizational restructuring is being discussed, this framework gives you a vocabulary to advocate for the structure that best serves your product's current needs.

### Nuances & Limitations

Most real organizations are hybrids—they have some within-tier platform teams and some cross-tier feature teams. The module presents the extremes as clean trade-offs, but in practice, the challenge is finding the right blend. Additionally, the "right" structure may change as the product matures: early-stage products often benefit from cross-tier teams that can move fast, while mature products may benefit from within-tier platform teams that can scale infrastructure.

> "Working within a tier is easier than working across a tier." — Reforge, Module 02

> "Within a tier optimizes for engineering efficiency. Across tiers optimizes for product outcomes." — Reforge, Module 02

---

## Connections Map

The five themes in this module form a coherent decision framework that flows from classification to action. The established vs. emerging technology classification (Chapter 1) is the entry point—it determines everything that follows. Once you know what type of technology you're dealing with, the engagement depth prescription (Chapter 2) tells you how deep to go in the technical stack. For established technologies, you stay high and focus on business value; for emerging technologies, you go deep to discover what's actually possible.

The strategic leverage of emerging technology (Chapter 3) is the payoff for going deep. Only by understanding an emerging technology at a mechanistic level can you identify opportunities to reopen previously closed problems—transforming technical novelty into business value. This chapter resolves the tension between "go deep into the technology" and "stay focused on business value" by showing that the two are not in conflict: deep technical understanding in emerging spaces is precisely how you find the highest-value business opportunities.

The 3-tier architecture (Chapter 4) provides the structural foundation for understanding established SaaS systems. It gives PMs a mental model for predicting engineering cost, understanding feature constraints, and having informed technical conversations. This is the kind of stable abstraction that PMs working in established technology can rely on—it embodies the principle that established tech has clean, trustworthy boundaries.

The organizational implications (Chapter 5) bring the architectural understanding back to the human level: how teams are structured relative to the architecture affects what they can build and how efficiently they can build it. This connects the technical framework to the organizational reality that PMs navigate daily.

The meta-insight across all five themes is that a PM's technical engagement should be calibrated, not maximized. The goal is not to know everything—it is to know the right things at the right depth, determined by the nature of the technology and the structure of the system. This calibration is what separates a PM who adds value in technical conversations from one who either disengages ("I'll leave that to engineering") or over-engages ("let me tell you about matrix multiplication").

---

## Action Items

### Immediate
- **Classify your current technologies:** For each major technology in your product stack, determine whether it is established or emerging. This classification should inform how you spend your learning time.
- **Learn the 3-tier architecture of your product:** Map out the client, business logic, and storage layers. Understand what data structures exist and what API surfaces are exposed. This is foundational knowledge for any SaaS PM.

### Short-term
- **Audit your "closed problems" list:** Identify customer needs or product opportunities that were previously abandoned due to technical infeasibility. Revisit them in light of any emerging technologies available to your team.
- **Calibrate your technical depth per technology:** For established components, learn the vocabulary and key constraints. For emerging components, schedule deeper learning sessions with your engineering team—particularly your Bridge Partner.

### Strategic
- **Evaluate your team structure against architectural tiers:** Understand whether your engineering teams are organized within tiers or across tiers, and how this affects your ability to deliver product outcomes. Advocate for the structure that matches your current strategic priorities.
- **Build an abstraction monitoring practice:** For emerging technologies your team uses, periodically reassess whether the abstraction boundaries are stabilizing. As they do, you can shift from deep engagement to higher-level management.
- **Develop the discipline of problem-first technology evaluation:** When new technologies emerge, resist the urge to search for applications. Instead, start with your backlog of unsolved problems and ask which ones the new technology might now make tractable.

---

## Critical Gaps & Limitations

- **Bridge Partner and Technical Overlap Zone:** The module references these concepts but does not fully explain them—they are likely covered in other Reforge modules. A PM encountering these ideas for the first time would benefit from the expanded treatment.
- **3-tier architecture depth:** The treatment is deliberately high-level, appropriate for a foundations module but insufficient for PMs who need to understand specific patterns like microservices, event-driven architectures, or serverless computing. The module acknowledges this by noting that "common SaaS architectures" are covered elsewhere in the course.
- **Practical examples beyond LLMs:** While LLMs serve as an excellent case study for emerging technology, the module would benefit from examples of other emerging technologies (e.g., blockchain, AR/VR, quantum computing) to illustrate that the framework is general-purpose.
- **Transition dynamics:** The module presents established and emerging as somewhat static categories, but in practice, technologies transition between them. The dynamics of this transition—when to reclassify, how to adapt your engagement depth as a technology matures—are not addressed.
- **No discussion of technical debt:** The 3-tier architecture section doesn't address how accumulated technical debt within or across tiers affects PM decision-making, which is a major practical concern in real product organizations.

---

## Appendix: Key Quotes

| Topic | Quote | Source |
|-------|-------|--------|
| Established tech definition | "Established technologies are places where the abstraction boundaries are tidy and clear—you can usually draw them and assume they won't change." | Reforge, Module 02 |
| Emerging tech definition | "Emerging technologies are places where the abstraction boundaries are being defined—that's part of figuring out the tech!" | Reforge, Module 02 |
| Common mistake | "Treating an emerging technology in the same hands-off way you might treat an established technology means you'll either miss out on the new possibilities that haven't been explored yet, or that you'll make bad assumptions about what is or isn't possible based on bad comparisons." | Reforge, Module 02 |
| LLM failure modes | "LLMs both do things that have never been done before (computers that can pass the Turing Test) and make mistakes that don't match existing types of mistakes (making up completely wrong information but being very confident and compelling in presenting it)." | Reforge, Module 02 |
| Established tech PM role | "In an established technology, the key questions are about the business—not what the technology makes possible. As a PM, the value of understanding the technology is largely about min/maxing engineering effort to business value." | Reforge, Module 02 |
| Emerging tech depth | "PMs working on emerging tech must go further down the abstraction stack because the abstractions aren't stable yet, and the technical details may inform the right way to design a particular abstraction." | Reforge, Module 02 |
| LLM abstraction layers | "Each of these ways of looking at 'what is an LLM' is a different type of abstraction and a different way of looking at what an LLM is or can be, and each one provides a different set of affordances for PMs working in the space." | Reforge, Module 02 |
| Going deep matters | "In these emerging technology situations, going deep is really important because you're on the frontier, and you can't rely on conventional wisdom or consensus to tell you what the standard set of possibilities are." | Reforge, Module 02 |
| Reopening closed problems | "Emerging technologies often allow you to reopen 'closed' problems where you didn't previously have a good technical solution—but now, with the new capabilities presented by the technology, new solutions might be possible." | Reforge, Module 02 |
| Problem-first framing | "Rather than getting enchanted by an emerging technology and trying to find new problems to solve with it, ask what problems you couldn't previously solve—that you now can solve." | Reforge, Module 02 |
| Business value anchor | "Your core role as a PM is about solving for business value. Don't let your engineering team get over-eager about shiny technology if it doesn't solve any problems for you." | Reforge, Module 02 |
| 3-tier architecture | "The 3-tier architecture is the foundation of most SaaS designs—it consists of a client layer, a business logic layer on the server side, and a storage layer." | Reforge, Module 02 |
| Data structures as constraints | "Your data structures define what is easy and hard to do in the business logic layer." | Reforge, Module 02 |
| API as capability boundary | "What is, or isn't, supported by the API defines what the client can do." | Reforge, Module 02 |
| Cross-tier friction | "Working within a tier is easier than working across a tier." | Reforge, Module 02 |
| Team org trade-off | "Within a tier optimizes for engineering efficiency. Across tiers optimizes for product outcomes." | Reforge, Module 02 |
| Emerging tech temporality | "At some point, all of this will be sorted out, and there will be really clear answers—maybe we'll find that AI copilots that primarily focus on auto-completing text are the winning move, or maybe not." | Reforge, Module 02 |
