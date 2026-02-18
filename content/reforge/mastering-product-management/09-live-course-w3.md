# Roadmaps, Specs & Planning Strategy: Insights from Janine (Gather)
> Reforge Mastering Product Management - Week 3 Live Session | Jan 17

## Source

| Type | Title | Speaker | Context |
|------|-------|---------|---------|
| Live Course Session | Product Management Roadmap and Strategy | Sippy (Instructor) + Janine (Cofounder, Gather) | Week 3 of 4-week course on PM deliverables |

**About Janine:** Career product leader with experience at Deloitte Consulting → Oracle → Ning → Twitter (~8 years) → Gather (cofounder, 3.5 years). Currently leading product at Gather, a ~45-person company building virtual office software ("Zelda and Zoom had a baby").

**About Gather:** Virtual office platform with ~100,000 active users and thousands of paying customers. The product combines video conferencing with 8-bit game mechanics—spatial audio, customizable avatars, interactive environments. Mission: make remote work feel more human, make work feel like play.

---

## Executive Summary

This session explores how product roadmapping and specification practices must adapt to company stage, team composition, and the pace of technological change. Janine's experience spanning consulting, large public companies (Twitter), and now a 45-person startup provides a unique lens on how the same fundamental PM questions—what to build, for whom, and how to measure success—manifest differently across contexts.

The central thesis running through the conversation is that **roadmaps and specs are communication tools, not contracts**. Their value lies not in the artifact itself but in the conversations they force and the alignment they create. This is why Janine's team doesn't have a single spec template—the format should match the problem. A pricing change needs a detailed PRFAQ; a spatial audio improvement needs a playable prototype. The document is a means to an end, not the end itself.

A particularly valuable insight concerns **portfolio thinking as a prioritization unlock**. Rather than stack-ranking every project against every other project (which creates endless debates about whether tech debt is more important than feature X), teams allocate percentages of capacity to buckets first, then stack-rank within buckets. This transforms intractable philosophical arguments into scoped practical decisions.

The AI disruption thread is notable for its honesty about uncertainty. Pre-GPT-4, Janine's team would create "concept cars"—aspirational prototypes showing where the product could be in 18-24 months. Now, they struggle to predict three months out. The response isn't to abandon planning but to shorten cycles and increase comfort with throwing work away. When you can build a prototype in a day with new tools, the cost of being wrong drops dramatically—which should change how much certainty you require before starting.

The session also surfaces a fascinating tension around PM roles. Gather has almost no traditional PMs—instead, engineers and designers with strong product sensibilities do product work with Janine's support. Meanwhile, Sippy observes that engineers learning to use AI coding tools like Claude Code are essentially learning PM skills: defining problems clearly, breaking work into features, validating incrementally. The boundaries between roles are blurring in both directions.

Finally, the sunk cost discussion offers practical wisdom: the decision to continue or kill a project should be based on opportunity cost (is there something higher-priority we now know about?), not time invested. But it must also account for team morale—sometimes shipping something that tested neutral is worth it because the alternative demoralizes the people who built it.

---

## 1. Vision Communication: From Documents to Experiences

### The Evolution of Vision Artifacts

Janine describes a three-stage evolution in how she communicates product vision, each stage building on lessons from the previous one.

**Stage 1: Traditional Vision Documents.** The classic approach involves written documents that synthesize competitive analysis, market trends, customer feedback, and strategic recommendations. These documents answer important questions and sharpen thinking—forcing you to articulate your strategy in prose reveals logical gaps and unstated assumptions. However, Janine found they underserve a critical function: inspiring and rallying the team. A 15-page document explaining market dynamics doesn't make people excited to come to work.

**Stage 2: Concept Cars.** Borrowing from automotive industry practice, concept cars are intentionally fragile prototypes (often in Figma) that show what the product *could* become in 12-24 months. They're not meant to be bulletproof—they have obvious holes and unresolved questions. Their purpose is demonstration over documentation. When people can see and interact with a possible future, they understand it viscerally in a way that prose can't achieve. Janine calls this "probably the best tool in my PM toolkit."

The concept car approach requires connecting with stakeholders across the organization to understand their motivations and concerns. When sales, support, and engineering all see their needs reflected in the vision (when it makes sense), they feel ownership of the direction. The artifact becomes a shared reference point rather than a top-down mandate.

**Stage 3: Short-Term Bets (AI Era).** The acceleration of AI capabilities has compressed planning horizons dramatically. When the technological landscape can shift in weeks, 18-month visions become exercises in fiction. Janine's current approach: maintain the mission-level direction, but plan concretely only 3 months out. Accept that work might be thrown away. Focus on learning velocity over prediction accuracy.

> "It's kinda hard to know what the world's gonna be like in two years. I think now what we're trying to do is... thinking much more short term. In a quarter, do we think will be true? And how can we capitalize on that?"

### Why Concept Cars Work

The power of concept cars lies in their multimodal communication. Humans process visual and interactive information differently than text. A concept car answers questions that readers didn't know they had—"oh, so *that's* how those features would work together." It also surfaces disagreements faster. When something is abstract, people project their own interpretations; when it's concrete, misalignments become visible.

Concept cars also democratize input. Not everyone can engage deeply with a strategy document, but most people can react to a prototype: "I love this part," "this feels confusing," "our customers would never do that." The barrier to contribution drops.

**Practical application:** You don't need a large team to create concept cars. One PM working with one designer can produce something meaningful. The investment is front-loaded (gathering input from across the organization) but the alignment payoff compounds.

---

## 2. Portfolio Allocation: The Prioritization Unlock

### The Problem with Pure Stack Ranking

Traditional prioritization asks: "of all possible projects, which is most important?" This creates debates that are nearly impossible to resolve. Is paying down tech debt more important than a new feature? Is regulatory compliance more important than growth experiments? These questions have no universal answer—they depend on context, risk tolerance, and strategic phase.

Janine describes how these debates become circular: "Hey, tech debt should be number one and this other thing should be number three." "No, it's inverted." Neither side is wrong; they're applying different frameworks.

### Portfolio Thinking as a Solution

The unlock is to stop ranking buckets against each other and instead allocate percentages first:

- 30% of capacity on core product improvements
- 10% on tech debt
- 50% on moonshot/new bets
- 10% on compliance/must-dos

Once allocation is set, you stack-rank *within* each bucket. The tech debt debate transforms from "is tech debt more important than features?" to "given we're spending 10% on tech debt, which tech debt items matter most?" This is a tractable question.

> "You stack rank within those buckets versus stack ranking the buckets themselves. So you don't have to have the argument about, 'Hey, tech debt should be number one.'"

### Scaling Down the Concept

This approach works at every level. Even a single team of 6-7 engineers can think in portfolio terms: "In our next six months, we want to spend X% of our time here, Y% here, Z% here." The specific percentages become a forcing function for honest conversations about what matters.

Sippy notes that at the leadership level, portfolio allocation often maps to headcount and team structure—these are the building blocks you can move. But at the team level, it maps to time allocation. Same principle, different substrate.

**Connection to other ideas:** Portfolio thinking connects to the "what we're NOT doing" slide (Section 4). Once you've allocated 10% to tech debt, everything that doesn't fit in that 10% goes on the "not doing" list with a clear rationale: "We're prioritizing X instead because of our portfolio allocation."

---

## 3. Top-Down vs. Bottom-Up: Finding the Balance

### The Spectrum of Approaches

Different companies and different moments call for different balances. When Janine joined Gather, the culture was "extraordinarily bottom-up"—engineers and designers proposed projects based on what excited them. This produced beloved features like go-kart racing on the virtual rooftop (complete with drift mechanics). It also meant the company hadn't built meeting recording.

Janine had to introduce more top-down direction: "Maybe we don't work on Drift Mechanics 3.0 and we build meeting recording." This felt like laying down the law to people who were used to creative freedom, but it was necessary for the business.

### A Practical Framework

Janine's current approach involves three levels of top-down guidance:

1. **Clear goals**: What does success look like for the company? These are non-negotiable.
2. **Concept car / vision**: Where might the product go? This is inspirational rather than prescriptive.
3. **Portfolio allocation**: How much capacity goes to each area? This constrains scope.

Within those constraints, teams propose what to build. If leadership has strong opinions about specific projects, they just say so directly—no "hoping the team will guess what we want" games.

> "Sometimes it's been very top down. When I first joined, it was extraordinarily bottom up. I think a lot of the features that people love about Gather were totally bottom up—go kart, dancing, so many fun features."

### The Anti-Pattern: Hoping They'll Guess

Janine flags a dysfunctional pattern: leadership that "hopes you'll say SOC 2 compliance" instead of just telling you to build SOC 2 compliance. This creates a performance where PMs try to read minds and leadership avoids accountability for decisions. If something must be built, say so. Save bottom-up energy for decisions that genuinely have room for input.

**Nuance:** The right balance shifts over time. Early-stage products benefit from bottom-up creativity (you're still finding product-market fit). Scaling products need more top-down coordination (teams need to work together coherently). The ratio isn't fixed—it's a leadership judgment call that should be revisited regularly.

---

## 4. The Planning Deck: A Template for Alignment

### Structure and Purpose

Janine shared a planning deck template that teams complete for their areas. The deck isn't meant to be a comprehensive document—it's a forcing function for clear thinking and a starting point for conversations.

**Key slides:**

1. **Mission & Focus**: In a sentence, what is this team's long-term purpose? How do the next 6 months support that mission? Many teams discover they don't actually have a mission statement. The exercise of writing one is clarifying.

2. **Metrics**: If you had to pick three numbers to watch, what are they? These should be input metrics (things the team can directly influence), connecting to the driver tree work from Week 2.

3. **High-Priority Investment Areas**: Three big rocks maximum. For each: problem statement, proposed solution, target metrics, estimated timing (Q1, Q2—not specific dates), DRI (Directly Responsible Individual).

4. **Lower-Priority Items**: The smaller rocks. This prevents the big rocks list from becoming cluttered with every linear ticket.

5. **What We're NOT Doing**: Explicitly listing deprioritized projects. This slide often gets the most attention from stakeholders, especially sales and customer success. They want to know if their pet feature made it.

> "The 'not' list is kinda more interesting in a way. Sales and CX would go right to this slide. 'I just wanna know whether my favorite pet project that my client is asking for—did it make it or not?'"

### The Review Process

Once teams complete their decks, leadership reviews them—sometimes async (comments in the doc), sometimes synchronously. The conversation matters more than the artifact. Discussions surface misalignments: "Actually, this is too many big rocks." "You should pull this thing up, here's why." "Don't have enough people for this plan."

The deck gets messy during this process. That's fine. Its purpose is served once the conversations happen.

### Living Documentation

After planning, projects move to a Notion database (board view) with columns for status: Scoping/Planning → In Progress On Track → In Progress At Risk → Rolling Out → Launched. Teams write weekly updates in their cards.

The original planning deck becomes outdated quickly—sometimes within weeks. This is expected. The real planning lives in the Notion board and the ongoing investment reviews (monthly).

> "Pretty soon the deck becomes... you can trash it. It becomes so out of date in like two weeks because the world has changed."

---

## 5. Problem-Solution Certainty: A 2x2 for Choosing Approach

### The Framework

Janine introduced a 2x2 matrix that determines how to approach different types of work:

|  | Known Solution | Unknown Solution |
|--|----------------|------------------|
| **Known Problem** | High-fidelity spec (PRFAQ) | Prototype & test solutions |
| **Unknown Problem** | Validate problem first | Signal check → prototype |

### Quadrant Analysis

**Known Problem, Known Solution (top right):** This is execution territory. For something like a pricing model change, you know what problem you're solving (revenue, packaging) and you know generally what solutions look like (pricing pages exist everywhere). The work is in the details—edge cases, communication, implementation. A comprehensive PRFAQ or spec makes sense. "Let's not leave anything to chance."

**Known Problem, Unknown Solution (bottom right):** You understand the user pain but haven't cracked how to solve it. The spatial audio example fits here—people were experiencing audio that felt wrong (too loud, directionally confused), but the right solution required experimentation. Prototyping is the answer. The V0 prototype that let you drag virtual people around and hear how audio should behave became the spec.

**Unknown Problem, Known Solution (top left):** You have a solution pattern (like usage analytics dashboards) but aren't sure if customers actually need it. Validation research comes first. "We know we *could* solve it—is it worth actually doing?"

**Unknown Problem, Unknown Solution (bottom left):** This is new product territory. Janine's current project (a Slack fatigue solution) sits here. The approach: signal check first (landing page to test if the problem resonates), then cheap prototype, then iterate. Time-boxed investment (3 months) with clear learning milestones.

> "We're just like, what would be something that would work? Let's not overthink it too much. What we are overthinking is how much we're willing to give."

### Connection to Spec Format

This framework connects directly to why Gather doesn't have a single spec template. The appropriate artifact depends on the quadrant:

- Known/Known: PRFAQ, detailed requirements
- Known/Unknown: Prototypes, design explorations
- Unknown/Known: Research decks, customer interviews
- Unknown/Unknown: Landing pages, signal checks, time-boxed experiments

---

## 6. Spec Formats: Right Tool for the Job

### The Anti-Template Philosophy

Gather intentionally avoids a universal spec template. The reasoning: different problems require different communication modes. Forcing everything into the same format either bloats simple specs or constrains complex ones.

**Formats observed at Gather:**
- Traditional PRDs (problem, solution, requirements)
- Research decks (customer insights, competitive analysis)
- V0/Figma prototypes (interactive demonstrations)
- Loom videos (walkthroughs, explanations)
- Spreadsheets (P0/P1/P2 requirements matrices)
- Amazon-style PRFAQs (for major launches)

### Choosing the Right Format

The question isn't "which template?" but "what's the best way to communicate this idea?"

For spatial audio improvements, a designer built a V0 prototype where you could drag dots (representing people) around and hear how audio should respond based on position. The engineer receiving this understood immediately: "I get what vibe you're going for." No document could achieve this as efficiently—you literally have to hear the solution to evaluate it.

For pricing changes, a PRFAQ makes sense. You need to think through: Do existing customers get grandfathered? How do we communicate changes? What are the FAQ questions customers will ask? This requires detailed prose.

> "The best way to communicate an idea is through a video or a prototype; other times, the best way to do it is through a detailed spreadsheet of every single requirement."

### The Common Thread

Despite format variation, certain elements appear in every spec:
- What is the problem?
- Why is it important right now?
- How should we solve it?
- What level of investment are we making?

These questions get answered somewhere—maybe in the artifact itself, maybe in the planning deck that justified the project, maybe in the kickoff meeting notes. The format is flexible; the questions are not.

**Practical consideration:** The trade-off of format flexibility is discoverability. Without a central, consistently formatted spec repository, finding historical context is harder. Janine acknowledges this: "It's kind of a mess." Teams use Slack channel bookmarks and Notion links. It works for a 45-person company; it might not scale.

---

## 7. The DRI Concept: Clarity of Ownership

### What DRI Means

DRI (Directly Responsible Individual) is an Apple-originated concept. The DRI for a project is the single person accountable for its success or failure. They're not necessarily doing all the work, but they're responsible for:

- Knowing the project's status at all times
- Unblocking the team when stuck
- Providing clarity when people are confused
- Being the point person for questions

> "It doesn't mean that's the person who does all the work. It just means they're responsible for the project and making sure that if the team is blocked, they get them unblocked."

### Why It Matters

Without a clear DRI, accountability diffuses. When something goes wrong, everyone can point to someone else. When something needs a decision, meetings multiply to "align stakeholders."

Janine notes she previously underestimated DRI importance and has "really come around on that." Each project card in their planning deck explicitly names a DRI.

### Good DRI Behavior

A good DRI, when asked a question they don't know the answer to, doesn't make something up. They say "I don't know, I'm going to find out and come back to you." Sippy notes he's working with a DRI who tends to answer questions on the fly without actually knowing—this creates downstream confusion when the invented answers turn out to be wrong.

**Connection to DRIP framework:** Later in the session, Sippy mentions the DRIP framework (Decider, Recommender, Informed, Performer) as an alternative to RACI. It separates the person making the recommendation from the person making the final decision. This can be useful for giving junior team members ownership (as Recommender) without the full pressure of being the Decider.

---

## 8. Design Crit Structure: Balancing Critique with Support

### The Process

Gather runs weekly design crits that have evolved to include product review. Presenters share work-in-progress and specify:

1. What phase is this in? (Discovery, design, refinement)
2. What kind of feedback are you looking for?

This framing prevents mismatched feedback—you don't want polish critiques during early exploration, or fundamental challenges during refinement.

### The Two-Column Method

While presenting, attendees stay muted and write in a shared Google Doc with two columns:

1. **What do you like about this?**
2. **What are your questions or concerns?**

After the presentation, feedback gets grouped and discussed.

### Why "What Do You Like" Matters

Sippy highlights this as a psychological safety mechanism. The word "critique" implies finding problems. People think adding value means identifying flaws. But reinforcing what works is equally valuable—it tells the creator which instincts to trust.

> "We're so wired to find the problems in things. Sometimes adding value is about reinforcing the things that you think are actually gonna work and being really explicit about the why."

More subtly: it's easy to articulate why something won't work (specific failure modes) but hard to articulate why something will work (emergent positive qualities). Forcing people to try develops this muscle.

**Practical application:** Try adding "what's working" to any feedback format you use. Code reviews, document comments, 1:1s. The ratio of positive to constructive feedback affects how the message lands.

---

## 9. New Product Development: Signal Check to Prototype

### The Setup

Janine is incubating a new product addressing Slack fatigue—the exhaustion of constant notifications, the pressure to be responsive, the loss of deep work time. The team is ~3 people. The goal: within 3 months, know if the idea has legs.

### The Landing Page First Approach

Before building anything, Janine created a landing page describing the problem and proposed solution. This is a decades-old technique ("painted door test") but remains effective. The landing page forces you to articulate:

- How would you describe the problem in one sentence?
- What's the proposed solution?
- What would a testimonial say?
- What questions will people immediately ask?

Sharing the landing page with potential users generated instant signal. Everyone asked about privacy and security—revealing that the landing page needed a trust section. This learning came in a day, not weeks of development.

> "I sent this to a lot of people who I think would be a good fit for the app, they're immediately asking me about privacy and security. There's no security and privacy section on the home page. I'm like, great, I figured that out in a day."

### The Cheap Prototype

The prototype is intentionally hacky: a Slack app that sends AI-curated notifications summarizing important messages across channels. The irony isn't lost—solving Slack overload with more Slack notifications. But it's the cheapest way to test whether the AI ranking and summarization is actually useful.

Within two weeks, the internal prototype was running. Early users immediately provide signal: "Why am I seeing this message I already read?" "My boss wrote this, why isn't that weighted higher?" Each complaint is a learning about what matters.

> "The solution to my Slack problem is just more Slack notifications currently. Which is very funny, but that won't be true for the long term."

### Investment Framing

The team explicitly bounded their investment: 3 months. If there's no clear signal by then, they stop. This framing makes it easier to pursue uncertain ideas—you're not committing indefinitely, you're running a time-boxed experiment.

Clear milestones (X beta testers, strong internal adoption, external customer interest) replace vague "we'll know it when we see it" success criteria.

---

## 10. Sunk Cost and Killing Projects

### Two Stories

**Story 1 (Killed):** A pricing model change was estimated at 6 weeks. Six weeks in, the team realized it would take another 20 weeks. Janine stopped the project. She explained to the team why the estimation was wrong, took accountability, and reassigned people to higher-impact work. The company lost potential revenue gains but gained velocity elsewhere.

**Story 2 (Shipped):** An onboarding redesign tested exactly the same as control in A/B testing. No lift. Shipping it to production-ready state would take 2 more weeks. Janine shipped it anyway. Why? No obviously higher-priority alternative had emerged. The team would be demoralized seeing their work discarded. The new experience was qualitatively better even if metrics didn't move. Sometimes you invest in culture.

> "There's a real cost to thrashing a lot. That team would have been demoralized because they worked really hard on it."

### The Decision Framework

The question isn't "have we invested too much to stop?" (sunk cost fallacy). The question is: "Knowing what we know now, is there something higher-priority we should work on instead?"

If yes: stop, explain why, reallocate.
If no: finish, ship, learn.

**Nuance:** Psychology matters. People who feel their work is routinely discarded disengage or leave. "People don't leave jobs, they leave managers." A cold, purely rational approach to project killing damages the team over time. But constantly shipping low-value work to avoid hurt feelings isn't sustainable either. It's a judgment call case by case.

---

## 11. The Blurring of Roles

### Engineers Learning PM

Sippy makes a provocative observation: engineers learning to use AI coding tools like Claude Code are inadvertently learning product management. The techniques that make AI-assisted coding work—clearly defining problems, breaking work into discrete features, validating incrementally—are core PM skills.

> "What they're learning is how to be a PM... They're like, 'what you really need to do is describe the problem that you're trying to solve in really extensive detail, and then make sure that you have a plan that goes through and does one feature at a time.'"

### PMs Learning Design and Engineering

The flip side: PM tools (V0, Figma, prototyping platforms) let PMs create artifacts that used to require designers or engineers. The boundary of "PM work" expands into adjacent disciplines.

### Gather's Model: Product-Minded Engineers and Designers

Gather has almost no traditional PMs. Instead, engineers and designers with strong product sensibilities do product work with Janine's support. They fill out planning decks, propose solutions, run experiments. They're not "identifying as product manager" but they're doing the work.

The trade-off: product work is a full-time job. When someone is both an engineer and doing PM work, they can't go as deep on either craft. But with support, they can go surprisingly far—and it makes them better at their primary discipline by expanding their perspective.

> "I can scale the product management work through these excellent people, as long as I'm kind of the PM but they are doing a ton of the product work."

### Finding These People

Janine notes it took 3 years to find these product-minded non-PMs. They're rare. You can't just ask any engineer to do product work. But when you find them, the hybrid model can work well for small teams.

---

## 12. Estimation and Sandbagging

### The Two Failure Modes

**Eyes bigger than stomach:** Teams commit to far more than they can deliver. Optimism bias, desire to please, underestimating edge cases and scaling work.

**Sandbagging:** Teams commit to far less than they can deliver. Protection against uncertainty, desire to under-promise and over-deliver, political cover.

### Addressing Optimism

Historical data helps—you learn which teams habitually overcommit. In reviews, ask forcing questions: "If you could only do one of these, which would it be?" This reveals actual priorities and forces realistic scoping.

> "Your radar goes off in the review. You're like, 'oh, you're gonna get 50 things done? If you had to pick one, what is the one thing?'"

### Addressing Sandbagging

This requires leadership that genuinely understands the work. Technical leaders need to know when "this will take 6 months" actually means "this should take 6 weeks." Without that fluency, sandbagging is hard to detect.

In large organizations where you need to under-promise to sales, Janine used two dates: "market ready date" (when sales can mention it) and "ship date" (when it actually delivers). This preserves buffer for external commitments while maintaining ambitious internal targets.

### AI Complication

AI tools make estimation harder in both directions. You might ship in a day what used to take weeks. Or you might hit unexpected walls where AI can't help. The traditional estimation heuristics are breaking down. Janine's response: shorter planning cycles, higher comfort with throwing work away, focus on learning over prediction.

---

## Connections Map

The frameworks in this session interconnect in revealing ways.

**Portfolio allocation enables "what we're NOT doing."** Once you've decided to spend 10% on tech debt, everything that doesn't fit in that 10% has a clear explanation: it's not in our portfolio allocation. This transforms contentious prioritization debates into scoped decisions within pre-agreed constraints.

**The certainty 2x2 determines spec format.** Known-known problems get PRFAQs; unknown-unknown problems get landing pages and time-boxed experiments. The format isn't arbitrary—it matches the type of clarity needed.

**Concept cars serve both vision and alignment.** They communicate direction (what we're building toward) and generate buy-in (stakeholders see their needs reflected). The same artifact serves strategic and political purposes.

**DRI clarity enables psychological safety in crits.** When ownership is clear, feedback feels less threatening. The creator knows they're responsible but also knows who has their back if things go wrong.

**Sunk cost decisions depend on portfolio context.** Whether to kill a project depends on whether higher-priority alternatives have emerged—which connects back to the portfolio view of where capacity should go.

**The blurring of roles connects to spec format flexibility.** When engineers do product work, they might express specs as code prototypes. When PMs use V0, they might express specs as interactive demos. The formats follow from who's doing the work and what tools they use.

A meta-pattern: **communication > documentation.** The deck becomes outdated in weeks. The Notion board is a living artifact. The design crit is a ritual that creates shared understanding. In every case, the conversation matters more than the document that prompted it.

---

## Action Items

### Immediate (This Week)

**Create a "what we're NOT doing" artifact for your current roadmap.** Even if your organization doesn't use this format, having a personal list of deprioritized items with rationales sharpens your thinking and prepares you for stakeholder questions. Connect each item to what you're prioritizing instead.

**Audit your current spec in progress: what quadrant is it in?** Use the certainty 2x2 to evaluate whether your spec format matches your problem type. If you're writing detailed requirements for an unknown-problem project, you might be doing premature specification.

**Add "what's working" to your next feedback session.** Whether it's a design review, code review, or document comment, explicitly note positive elements before constructive critique. Observe whether this changes the dynamic.

### Short-Term (This Month)

**Draft a one-sentence mission statement for your team.** Many teams discover they don't have one. The exercise of writing it reveals whether there's shared understanding of the team's purpose. If it takes 30 minutes of debate, that's signal.

**Propose portfolio allocation percentages for your team's next planning cycle.** Even if leadership doesn't adopt the framework, articulating "we should spend X% on Y" clarifies your own thinking about priorities.

**Identify one product-minded non-PM on your team.** Who has strong taste, cares about users, and could take on more product work with support? This person might be your leverage for scaling PM impact.

### Strategic (This Quarter)

**Build a concept car for a medium-term vision.** Partner with a designer to create a clickable prototype showing where your product could be in 12-18 months. Share it with stakeholders and observe what resonates and what generates resistance.

**Implement the DRI model explicitly.** For each major project, name a single person accountable. Document it visibly. See whether clarity of ownership changes project dynamics.

**Run a time-boxed experiment on an uncertain idea.** Pick something in the unknown-unknown quadrant, give it explicit boundaries (3 weeks, 1 month), define success criteria upfront, and commit to stopping if milestones aren't hit.

---

## Critical Gaps & Limitations

**Scale limitations.** Gather is a 45-person company. Many techniques described (no spec template, product work by non-PMs, messy artifact storage) may not scale to larger organizations. The session doesn't address how these approaches change at 200 or 2000 people.

**Survivorship context.** Janine's career includes Twitter during its growth phase and now a funded startup. The pressure profiles and resource constraints differ from bootstrapped companies, enterprise software, or organizations in decline.

**Consumer vs. B2B.** Gather has consumer-product DNA (delight, play, creativity) in a B2B context. The balance of bottom-up creative features vs. top-down business requirements may look different in pure enterprise contexts.

**AI uncertainty acknowledged but unresolved.** The session honestly admits that AI makes planning harder, but doesn't offer a stable new framework—because one probably doesn't exist yet. This is intellectually honest but leaves practitioners without clear guidance.

**Metrics are mentioned but not deeply explored.** The planning deck includes a "three metrics" slide, but the session doesn't go deep on how to choose those metrics or what happens when they conflict.

---

## Appendix: Key Timestamps and Quotes

| Topic | Context | Quote |
|-------|---------|-------|
| Course position | Introduction | "This week we're talking about roadmaps and specs. Next week we're gonna talk about OKRs." |
| Vision evolution | Vision approaches | "I've actually really loosened up on [traditional vision docs]. That's one job of a vision doc, but another one is to really rally everyone and inspire everyone." |
| Concept cars | Vision artifacts | "We would put together what we call a concept car. A really fragile prototype, often in Figma, that shows what the application could evolve to." |
| AI planning impact | Planning horizons | "With AI stuff that's happening, it's kinda hard to know what the world's gonna be like in two years." |
| Portfolio thinking | Prioritization | "You stack rank within those buckets versus stack ranking the buckets themselves." |
| Top-down necessity | Balance | "Maybe we don't work on Drift Mechanics 3.0 and we build meeting recording." |
| Anti-pattern | Leadership games | "I've been on the other side where there's a dance with leadership where they hope you say SOC 2 compliance." |
| Planning deck purpose | Decks | "Decks, in a way, are kinda constrained because there's just not that much space. So it's like, in a sentence, describe your H1 focus." |
| Mission clarity | Team alignment | "You'll be pretty surprised. Even teams that have been around for a long time, they're like, 'oh man, we actually don't have a mission statement.'" |
| NOT doing slide | Stakeholder interest | "Sales and CX would go right to this slide. 'I just wanna know whether my favorite pet project made it or not.'" |
| DRI importance | Ownership | "I've always underestimated the importance of a DRI. I've really come around on that." |
| Spec flexibility | Format choice | "We don't actually have a one size fits all way of writing a spec at Gather. It's not required. In fact, would be an anti-goal." |
| Audio prototype | Right tool | "Instead of writing a set of problem statements, one of the designers used V0 and prototyped this thing." |
| Landing page first | New products | "I worked on the landing page first... to help articulate how would I very quickly describe the problem and the solution." |
| Privacy signal | User research | "They're immediately asking me about privacy and security. There's no security and privacy section on the home page. I figured that out in a day." |
| Prototype irony | Cheap validation | "The solution to my Slack problem is just more Slack notifications currently. Very funny, but that won't be true for the long term." |
| Crit structure | Psychological safety | "We have two boxes. One is what do you like about this? What are your questions or concerns?" |
| Positive feedback | Feedback dynamics | "We're so wired to find the problems. Sometimes adding value is about reinforcing the things that you think are actually gonna work." |
| Sunk cost decision | Killing projects | "We started to think about what is the cost of doing this versus not. And we decided to actually just stop it." |
| Shipping neutral | Culture investment | "There's a real cost to thrashing a lot. That team would have been demoralized." |
| Role blurring | AI and PM | "Engineers learning Claude Code are learning how to be PMs. 'Describe the problem in extensive detail, have a plan that goes one feature at a time.'" |
| Scaling PM work | Team model | "I can scale the product management work through these excellent people, as long as I'm kind of the PM but they're doing a ton of the product work." |
| Planning reality | Adaptation | "Everybody has a plan until they get punched in the mouth." (Mike Tyson, quoted by Sippy) |
| Estimation difficulty | AI impact | "It's really hard to know what you can make in six months. I'm surprised by what you can make in a day now." |
| Sandbagging detection | Leadership | "That actually just requires a good management leadership team that really knows their stuff." |
| Two dates | Sales management | "We had the market ready date and then the ship date... so they don't oversell something that doesn't exist." |

---

## Next Session Preview

Week 4 will cover OKRs with Michael Ducker (former VP Product at Mercury, the startup bank for startups). Mercury represents a different context—fintech with regulatory constraints—that will offer contrast to Gather's consumer-product-in-B2B-clothing approach.
