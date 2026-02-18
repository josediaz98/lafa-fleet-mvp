# Running Projects with Designers: Collected Insights
> Reforge Core Skills — Design Foundations, Module 3 | Tactical frameworks for PM/Designer collaboration on projects

## Sources

| # | Title | Type | Section |
|---|-------|------|---------|
| 1 | Framework for When to Involve Your Designer | Course Guide | Cagan's Four Risks |
| 2 | Practices to Establish Context | Course Guide | 6 Context-Setting Practices |
| 3 | Getting Iterations at a Good Pace | Course Guide | Pace Techniques |
| 4 | Providing Feedback to Designers | Course Guide | 4 Feedback Rules |
| 5 | Types of Criteria / Good Enough | Course Guide | Quality Evaluation |
| 6 | Why There May Be a Lack of Exploration | Course Guide | Exploration Diagnosis |
| 7 | Working Without a Full-Time Designer | Course Guide | Shared & Service Models |
| 8 | Course Wrap-Up | Course Guide | Summary & Resources |

**External resource:** Workbook PDF at brunobergher.com/design-for-pms/workbook.pdf

## Executive Summary

Module 3 of Reforge's Design Foundations course moves from the relational foundations of Modules 1 and 2 into the tactical reality of running projects alongside designers. Where the earlier modules asked "who is your designer and how do you build a relationship with them?", this module asks the operational question: "now that you're working together, how do you actually run projects well?" The answer, it turns out, is less about process and more about communication — specifically, about providing the right context at the right time, in the right way.

The central thesis is deceptively simple: most PM/Designer project friction comes from insufficient or poorly structured context. PMs know things they fail to communicate — the type of goal, the sequencing logic, what matters most, how much time something is worth, what's constraining the scope. Without this information, designers make reasonable but misaligned choices: over-investing in low-priority work, trying to get everything right in one pass, exploring in directions that don't serve the project's core need. The module argues that providing "extreme clarity about the problem while leaving openness to the solution" is the PM's primary job when working with designers on projects.

The frameworks here are deliberately lightweight and conversational rather than heavy-process. The appetite concept (borrowed from Shape Up) reframes time expectations from imposed deadlines into explicit expressions of value. The "soul of the project" concept gives designers a focusing anchor that MoSCoW prioritization doesn't provide. The feedback rules — check readiness, match fidelity, anchor to goals, don't prescribe — transform the most friction-prone interaction between PM and designer into a productive one. Together, these tools address the three most common complaints PMs have about working with designers: "they're moving too slow," "they're not exploring enough," and "we can't agree on what's good enough."

The module's most sophisticated insight is in its quality evaluation framework, which separates objective criteria (measurable against goals, standards, and feasibility) from subjective criteria (beauty, feel, pride) and argues that reducing the room for subjectivity — by systematically addressing everything that can be evaluated objectively first — is how you prevent the interminable "is this good enough?" debates that derail projects. When only genuine matters of taste remain, you can defer to your designer's expertise with confidence.

The closing sections address two real-world constraints: designers who aren't exploring broadly enough (with a diagnostic framework for the four root causes) and the increasingly common reality of working without a dedicated designer. Both sections maintain the module's core principle — context quality determines output quality — while adapting the techniques to harder conditions.

What the module leaves open is how these tactical frameworks compose with organizational dynamics — what happens when crits override PM-aligned feedback, when design system constraints conflict with appetite, or when multiple PMs compete for a shared designer's bandwidth. These are the messy realities that live between the clean frameworks, and they're where the relational foundations from Modules 1 and 2 become essential.

---

## 1. Timing Designer Involvement

### Cagan's Four Risks Model for Designer Engagement

**Core Concept**

Theoretically, a designer should be involved as early as possible in any project. The earlier they join — before research, during problem framing — the more shared context accumulates between PM and designer, which makes every subsequent conversation easier and faster. But this is impractical at scale: it can lead to duplicated effort (both attending the same research sessions and data reviews), and designers need focused maker-schedule time for their deliverables while PMs context-switch on a manager's schedule.

The resolution is to use Marty Cagan's Four Risks Model as a filter for when designer involvement becomes essential versus merely helpful. The four risks — value risk (will people want it?), usability risk (can people figure out how to use it?), feasibility risk (can engineering build it?), and business viability risk (does it work for the business?) — map naturally to designer engagement timing. Projects with high usability or value risk demand early designer involvement; projects dominated by feasibility or business viability risk can involve the designer later without significant cost.

**Underlying Mechanism**

The model works because it replaces a vague "involve them early" heuristic with a decision framework tied to the actual nature of the project. A compliance-driven feature with clear requirements and high technical complexity has a fundamentally different risk profile than a new onboarding flow where the core question is whether users can navigate it. The former needs engineering engagement early; the latter needs design engagement early. By making this explicit, PMs avoid two failure modes: involving the designer too late on usability-critical projects (leading to expensive redesigns) and involving them too early on projects where their contribution won't compound (leading to wasted bandwidth).

**Nuances & Limitations**

The module acknowledges that "always try to involve your designer as early as possible (or at least keep them up-to-date with what's happening)" remains the default — the Four Risks model is a pragmatic concession to bandwidth constraints, not an argument for exclusion. Keeping the designer informed even when they're not actively involved protects against the context gaps that create problems later.

> "When to involve your designer is mainly influenced by the nature of the risk of a given project."

---

## 2. Setting the Stage: Context as Foundation

### The Six Context-Setting Practices

**Core Concept**

The module's core argument is that most PM/Designer breakdowns during projects trace back to insufficient context. PMs bring "extreme clarity about the problem, while leaving openness to the solution" — but openness doesn't mean anything goes. It means that within the boundaries of goals and scope, there is deliberate space for compelling solutions to emerge. The module identifies six practices that, taken together, provide a designer with everything they need to operate effectively.

The first practice — **clarifying goal types** — addresses one of the subtlest context failures. Teams routinely work on projects with different goal types simultaneously: learning experiments, short-term band-aids, core improvements, and strategic bets. Without explicit labeling, a designer can dedicate three weeks of polish to what was meant to be a quick test, or underinvest in a foundational piece of the roadmap. Simply stating "this is a learning-oriented project" or "this is a strategic bet" at kickoff reframes the entire design approach.

The second practice — **providing visibility into sequencing** — addresses a trust problem rooted in experience. Designers have been burned by the promise of "we'll iterate on it later" that never materializes. Because of this, they may try to get everything right the first time or advocate for expanding scope to ensure holistic quality. Rather than fighting this instinct (which is reasonable), PMs can defuse it by sharing the actual sequence: what comes after this project, how multiple projects build toward a larger goal, and why the current scope is deliberately constrained. This transparency converts resistance into collaboration.

**Underlying Mechanism**

The third practice is the most conceptually rich: **identifying what matters most**, or finding the "soul" of the project. The module critiques the MoSCoW framework (must-have, should-have, could-have) as engineering-focused — it manages implementation effort but doesn't distinguish between "must-have" items that are merely necessary and "must-have" items that are the entire reason the project exists. Every project has a core: the key thing you're trying to accomplish, which every other part is there to support. This soul may be clear to the PM but invisible to the designer, even after reading a well-written PRD.

The fourth practice — **stating your appetite** — borrows from the Shape Up methodology. Rather than estimating how long something will take (which is the designer's domain), the PM expresses how long it's worth investing, and why. "This is critical to onboarding, take a couple of weeks if you need to" sends a fundamentally different signal than "Engineering needs this by Friday." Appetite is not an estimate and not a deadline — it's a value judgment expressed in time, and it prevents the most common pace mismatch: the PM silently expecting speed while the designer silently assumes thoroughness.

The fifth and sixth practices close the loop. **Clarifying what's shaping the scope** ensures designers don't perceive scope constraints as arbitrary or adversarial. The five common scope-shaping forces — technical feasibility, engineering staffing, downstream dependencies, internal deadlines, and external deadlines — are all things designers can understand and incorporate, but only if they're made explicit. And **making sure you've been understood** applies two specific techniques: "Playing it Back" (asking the designer to summarize goals in their own words, surfacing misunderstandings before work begins) and the "Open Questions Section" (a persistent section in project docs that acts as a forcing function for unresolved questions to be answered).

**Connections to Other Ideas**

These six practices are the operational expression of the Decider/Shaper model from Module 1: the PM decides the goals, constraints, and appetite (Decider), while leaving the solution space open for the designer to shape (Shaper). They also connect to the designer accountability framework — a designer can only be accountable for quality "within the time and level of effort agreed upon by all three" if that appetite has been explicitly communicated.

**Practical Application**

The strongest context-setting doesn't just inform — it defends. When a designer presents work in crit, strong goal alignment lets them defend decisions against peer critique by pointing to explicit project framing. This creates a virtuous cycle: the better your context-setting, the faster your designer moves through external feedback loops.

> "The way most designer/PM relationships break down is from insufficient context. It's your job as a PM to bring extreme clarity about the problem, while leaving openness to the solution."

> "Most software projects have a core, a most important part, a most risky part or, my favorite, a soul."

> "Don't ever dismiss questions about the 'why' of an initiative. If your designer isn't aligned with you on why you'll work on something, it's almost impossible for you to align on anything downstream."

---

## 3. Scope as Communication

### Making Constraints Legible

**Core Concept**

Designers' drive to think holistically and ensure quality across an entire experience can feel stifled by scope constraints that appear arbitrary. The reflexive PM response — "that's out of scope" — is technically correct but communicatively destructive. It feels antagonistic and authoritarian because it provides no reasoning, which means the designer can't internalize the constraint or incorporate it into their thinking. They can only comply with it or resist it, neither of which is productive.

The alternative is to make scope-shaping forces transparent. Five categories cover nearly all real-world scope constraints: technical feasibility (we can't do this or not at reasonable cost), engineering staffing (we can do it but aren't staffed for it), downstream dependencies (another team needs this done first), internal deadlines (a conference, a board meeting), and external deadlines (a customer go-live). Each of these is something a designer can understand, empathize with, and factor into their solution design. A designer who knows the scope is tight because of a customer go-live date will make fundamentally different tradeoff decisions than one who thinks the PM is simply being restrictive.

**Underlying Mechanism**

The mechanism is psychological: when people understand why a constraint exists, they process it as a shared problem to solve together rather than an external imposition to endure. This transforms the designer from someone working against arbitrary limits into someone creatively optimizing within understood parameters. The scope constraint doesn't change — but the designer's relationship to it does, and that relationship determines whether they produce resigned compliance or elegant constraint-driven solutions.

**Connections to Other Ideas**

This connects directly to the appetite concept: stating both how much time something is worth and why the scope is what it is gives the designer a complete picture of the project's value-to-constraint ratio. It also connects to the Module 1 insight about consistency pressure — sometimes the scope constraint is the design system itself, and naming that openly prevents the designer from feeling caught between unstated expectations.

> "It's all too common for PMs to react to ideas by just saying 'that's out of scope' without explaining why. That can feel antagonistic and authoritarian."

---

## 4. Driving Iteration Pace

### Diagnosing "Too Slow"

**Core Concept**

The most common PM complaint about designers is some variation of "they're moving too slow." Simply asking someone to go faster is rarely a solution — it's prescriptive, demoralizing, and ignores the underlying cause. The module identifies four reasons designers move slowly: they're spinning their wheels without gaining mental traction on any solution; they lack focus and are spreading effort across too wide a surface; they're unsure what deliverables would move the project forward next; or it's simply their natural pace, which is no different from variation in PM speed.

The first three causes are all addressable through better communication, not pressure. The module proposes three corresponding techniques. First, ensure shared understanding about goals and constraints — this addresses wheel-spinning by giving the designer clearer ground to push off from. Second, ask the designer to identify granular areas of exploration: "What do you plan on exploring in your next round?" This creates preemptive focus. If the PM disagrees about priority, the misalignment surfaces before time is invested, not after. Third, agree on deliverables and timelines: "By when can you share your next round?" This brings the overall project timeline into view and creates natural checkpoints.

**Underlying Mechanism**

The three techniques work because they replace invisible expectations with visible agreements. When a PM feels a designer is slow, it's almost always because the PM's mental timeline doesn't match the designer's — and neither has been articulated. By making exploration scope and delivery timing explicit, the gap either closes (they were actually aligned) or becomes actionable (they can negotiate scope, fidelity, or timeline).

**Practical Application**

A critical early warning sign: if a designer starts working on detailed screens before sharing a high-level plan for how things fit together, they may be headed toward frustration. The module advises pausing to align on a plan before diving into details, even when the work seems obvious or exciting. This one check — "show me your approach before your screens" — prevents the most expensive form of misalignment: discovering structural problems after detailed work is complete.

The designer's answer to "what will you explore next?" should ideally include the level of fidelity they plan to work at, which sets up the PM to provide feedback at the right level (connecting to the feedback chapter). And the timeline discussion is the right moment to surface external checkpoints like stakeholder reviews and crits, ensuring those obligations are planned for rather than scrambled toward.

> "The main complaint I hear from PMs regarding their design partners is some variation of 'they're moving too slow'. Simply asking someone to 'go faster' is rarely a solution."

> "While it may sound overly constraining at first, it's entirely OK to ask a designer what they will share and when, even if they don't know the exact shape it will take."

---

## 5. The Art of Feedback

### The Four Rules of Design Feedback

**Core Concept**

Good designers don't want to disappear into a cave and emerge with perfect solutions — they want feedback that helps them cover the solution space, then narrow and refine. But one of the most common PM/Designer friction points is designers feeling that PM feedback is authoritarian, prescriptive, or simply unhelpful. The module proposes four rules that transform feedback from a conflict point into a collaboration accelerator.

**Rule 1: Ensure the designer is ready for feedback.** No one appreciates drive-by comments on work in progress. Even if something looks complete enough for feedback, ask first. This takes five seconds and prevents the most emotionally charged feedback failures — those where a designer feels ambushed.

**Rule 2: Validate the level of fidelity.** As established in Module 1, designers work at intentional fidelity levels. Feedback must be proportional to the current fidelity. Commenting on button copy, heading colors, or icon shapes when the designer is still at wireframe stage is worse than unhelpful — it signals misunderstanding of the process and wastes both parties' attention. The question "What parts of this are ready for feedback? What should I ignore for now?" produces clear boundaries.

**Rule 3: Anchor to goals and scope.** Design solutions are never "correct" in an absolute sense — they can be better or worse, but never definitively right. This means subjectivity will always play a role in evaluation. The antidote is to anchor feedback to the project's shared framing rather than personal preference. Instead of an absolute scale from "good" to "bad," use one from "seems to meet goals/scope" to "doesn't seem to meet goals/scope." This elevates discussion from "this button is too small" (arbitrary) to "I'm not sure the primary users of this flow will notice this action" (goal-anchored).

**Rule 4: Don't be prescriptive.** Telling a designer what to do — "make the button bigger," "move this to the left," "use a dropdown here" — is demoralizing and by definition limits how much of their skills you can leverage. The alternative formula is: **start with why, then illustrate.** Share the motivation for your concern, then offer your idea as one possible direction, not a mandate. This gives the designer room to internalize your reasoning and potentially find a better solution than the one you imagined. Even if they take a different path, because you've aligned on the why, the outcome is more likely to meet the actual need.

**Underlying Mechanism**

The four rules work as a sequence, not independent tips. Checking readiness establishes psychological safety. Validating fidelity calibrates the conversation. Anchoring to goals provides shared criteria. And non-prescriptive framing preserves the designer's creative agency. Skip any step and the subsequent ones become harder or impossible — prescriptive feedback on unready work at the wrong fidelity level without goal-anchoring is a recipe for relationship damage.

**Connections to Other Ideas**

This feedback framework is the operational complement to the Decider/Shaper model. In the feedback conversation, the PM is shaping (providing input that helps refine the solution) while the designer is deciding (making the final UX and visual choices). The four rules ensure the PM stays in the Shaper lane during feedback, which is where they belong for solution-level decisions.

> "Telling someone how to do their job is obviously demoralizing and, by definition, limits how much of their specific skills one is able to leverage."

> "Even if they take a different direction than you suggested, because you've aligned on the why, the what is more likely to be good."

---

## 6. Evaluating Design Quality

### Objective vs. Subjective Criteria

**Core Concept**

The question of whether a design is "good enough" to move forward is one of the most persistent conflict points between PMs and designers. The module's approach is to systematically reduce the room for subjectivity by addressing everything that can be evaluated objectively first, then determining the weight of any criteria where there's disagreement, and finally narrowing in on what's genuinely subjective and using the established decision matrix (Decider/Shaper) to make the call.

Objective criteria are those where documents, standards, guidelines, or plans allow both PM and designer to assess quality against external references. Five questions cover the objective domain: Does it meet our stated goals? Does it fit with the overall product (design system, existing patterns)? Is it understandable by the people who'll use it (testable via user feedback)? Is it technically feasible within allotted resources? Does it conflict with future planned projects? Each of these can be evaluated against artifacts — project goals, design system documentation, user testing results, engineering estimates, and roadmaps.

Subjective criteria are what remains: Is it beautiful? Does it feel right? Is it pleasant? Does it make us proud? The module's advice is direct: it's probably wise to trust your designer on these. By the time you've systematically addressed all objective criteria, the remaining subjective space is genuinely within the designer's expertise domain. Insisting on overriding subjective design judgment after all objective criteria are met is the PM equivalent of a designer overriding the PM on which metrics to target.

**Underlying Mechanism**

The power of this framework lies in its sequencing. Most "is this good enough?" arguments conflate objective and subjective concerns, creating an undifferentiated mass of disagreement. By disaggregating the evaluation into separable criteria and addressing the measurable ones first, the module transforms a single intractable argument into a series of smaller, resolvable conversations plus a clearly bounded zone of subjective judgment.

**Connections to Other Ideas**

This framework is the quality-evaluation counterpart to goal-anchored feedback. Where the feedback rules help during the design process, the criteria framework helps at decision points — when something needs to be declared "done" or "ready to build." It also connects to the appetite concept: if a project was worth two days and it's been two days and the objective criteria are met, pushing for subjective refinement may not be worth the cost.

> "It's impossible to assert with 100% confidence that a design solution is correct. It can be better or worse, but it's never right."

---

## 7. Unlocking Broader Exploration

### Diagnosing Under-Exploration

**Core Concept**

When a designer isn't exploring broadly enough — settling on a first solution, not generating alternatives, not pushing into creative territory — the instinct is to simply ask for more options. But the module argues that intervention without diagnosis is likely to backfire. There are four distinct root causes, each requiring a different response.

**Lack of shared understanding:** When a designer doesn't fully understand the problem, it's hard to confidently generate ideas. The solution is to realign on goals and constraints and create opportunities for clarification — this is a context failure, not a creativity failure.

**Unspoken assumptions:** The designer may assume constraints that don't actually exist — perhaps they think a certain technology is off the table, or that a particular user segment must be served. The solution is to realign on actual constraints and reinforce the appetite, making clear what's genuinely fixed versus what's negotiable.

**Insecurity about sharing "crazy" ideas:** No one wants to be perceived as incompetent. If the relationship doesn't feel safe enough for creative risk-taking, exploration will be conservative. The solution requires assessing the relationship state, verbally creating a safe space for wild ideas, and reinforcing that the appetite allows for exploration time.

**Not seeing alternatives:** Sometimes the designer simply can't see other paths — not because of fear or misunderstanding, but because they're stuck. The solutions are more structural: set up a brainstorming session, agree on arbitrary deliverables as forcing functions (e.g., "5 different alternatives by end of week"), or ask if bringing other people into the project would help.

**Underlying Mechanism**

The diagnostic approach works because it treats under-exploration as a symptom, not a character trait. A designer who appears unimaginative on one project may have been brilliantly creative on the last one — the difference is the conditions, not the person. By identifying the specific blocker, the PM can address it precisely rather than applying generic pressure that may make the actual problem worse.

**Practical Application**

The forcing function technique — "5 different alternatives by end of week" — is worth special attention. It works because it separates the quality judgment from the generation phase. When a designer knows they need to produce a quantity of alternatives, they stop self-editing and start producing. Many of the alternatives will be bad, but the exercise itself breaks the pattern of premature convergence and often surfaces unexpected directions.

> "There are many reasons why designers might not be exploring as broadly as you would like. Use this framework to help assess and solve."

---

## 8. Adapting Without a Dedicated Designer

### Two Models of Constrained Design Partnership

**Core Concept**

The ideal — a dedicated designer working as a full-time member of the product trio — isn't always available. The module addresses two common alternatives: sharing a designer's bandwidth across multiple teams, and working with designers from a project-based service pool. Both require adapting the course's core practices while amplifying the one that matters most: context quality.

**The shared designer model** is manageable because you still have a persistent relationship. The key adaptations are: understand how much bandwidth you can count on (to allocate their time to the hardest or most valuable projects), schedule recurring 1:1s at whatever cadence is possible (using gap weeks for progress updates), write briefs with fewer assumptions about context (they're missing your team meetings), conduct live kickoff sessions rather than async (the risk of misunderstanding is too high), establish shared feedback cadences, and make yourself especially available for questions. The module notes something important about empathy: the designer in this model probably isn't happy about it either. Asking them what you can do to make their situation easier builds goodwill and often surfaces practical improvements.

**The design-as-service model** is the hardest short of having no designer at all. There's no persistent relationship, no accumulated context, and no guarantee of working with the same person again. The adaptations are more severe: de-emphasize relationship building (unfortunate but necessary given the timeframe), write briefs with almost zero contextual assumptions (eliminate jargon, explicitly connect to adjacent projects, assume nothing is obvious), always use live kickoffs, propose regular 15-30 minute check-ins throughout the project, and make yourself aggressively available for questions.

**Connections to Other Ideas**

Both models amplify the importance of every context-setting practice from Chapter 2. With a dedicated designer, context builds naturally over weeks and months. Without one, every project starts from near-zero, and the PM must compress all context-building into the kickoff. The appetite concept becomes even more critical in constrained models — a shared designer needs to know exactly how much time each PM's project is worth so they can allocate across competing demands.

> "When you're not able to count on a full-time design partner, adapt your approach while emphasizing context and communication."

> "Chances are the designer working with you in this model isn't happy about it either. Asking them about what you can do to make their life easier can be a great way to show you understand their situation."

---

## Connections Map

The eight themes in this module form a chronological arc — from before a project starts (timing involvement) through execution (context, pace, feedback, quality evaluation) to troubleshooting (under-exploration, constrained resources) — but the deeper structure is a single principle applied with increasing sophistication: **the quality of your context determines the quality of design output.**

Chapters 1 and 2 establish the principle directly. Knowing when to involve your designer (Chapter 1) and how to brief them (Chapter 2) are both forms of context delivery. The six practices in Chapter 2 — goal types, sequencing, what matters most, appetite, scope shaping, being understood — aren't independent techniques but facets of a single context object. Skip any one, and the designer is working with an incomplete picture.

Chapters 3 through 5 then show how context quality propagates through execution. Iteration pace (Chapter 3) is rarely a speed problem — it's an expectations alignment problem that better context resolves. Feedback quality (Chapter 4) depends on shared context — you can't anchor to goals if goals aren't clear, and you can't validate fidelity if you haven't agreed on the exploration plan. Quality evaluation (Chapter 5) is literally a test of how well the original context was set: does the output meet the stated goals, within the agreed constraints, at the agreed fidelity?

Chapters 6 and 7 address failure modes. Under-exploration (Chapter 6) is, in three out of four diagnosed causes, a context or safety failure. Working without a dedicated designer (Chapter 7) is fundamentally a context-delivery problem — you're doing the same thing, just harder and faster.

The meta-insight is that PM/Designer collaboration during projects is not primarily about process, tools, or even taste. It's about the PM's ability to be a clear, honest, empathetic communicator of context. The frameworks — appetite, Four Risks, soul of the project, Playing it Back, objective vs. subjective criteria — are all scaffolding for that core communication skill. A PM who internalizes the principle can improvise even without the specific frameworks. A PM who memorizes the frameworks without the principle will still struggle.

There is one productive tension in the module: between respecting the designer's process (don't prescribe, leave solution space open, trust subjective judgment) and maintaining accountability for pace and quality (set appetite, agree on timelines, evaluate against objective criteria). The resolution is that these aren't opposing forces — they're complementary. Clear constraints liberate creativity rather than limiting it. A designer who knows exactly what matters most, how much time it's worth, and why the scope is what it is can be far more creative within those parameters than one working in an ambiguous void.

---

## Action Items (Deduplicated)

### Immediate
- **Use goal-type labels at every project kickoff.** Explicitly state whether this is a learning experiment, short-term fix, core improvement, or strategic bet. Takes ten seconds, prevents weeks of misaligned effort. *Connects to Chapter 2: goal types.*
- **State your appetite for the next project you kick off.** Express value in time: "this is worth two days" or "take a couple of weeks if needed." Ensure your designer understands it's not an estimate or deadline. *Connects to Chapter 2: appetite.*
- **Start every feedback session with two questions:** "Are you ready for feedback?" and "What level of fidelity is this?" Then anchor all comments to goals, not preferences. *Connects to Chapter 5: feedback rules.*

### Short-term
- **Share your roadmap sequence with your designer.** Walk them through what comes after the current project and how pieces build toward a larger goal. Address the "we'll iterate later" trust gap proactively. *Connects to Chapter 2: sequencing visibility.*
- **Add an Open Questions section to your project docs.** Make it a persistent, visible section that acts as a forcing function for unresolved questions. Don't remove items until you've confirmed they've been answered. *Connects to Chapter 2: being understood.*
- **When you next feel a designer is "too slow," diagnose before intervening.** Ask: is this a context gap, an exploration-focus gap, or a deliverable-clarity gap? Apply the corresponding technique rather than generic pressure. *Connects to Chapters 4 and 7.*

### Strategic
- **Build the quality evaluation habit.** On your next project, explicitly walk through objective criteria before discussing subjective quality. Train yourself and your designer to systematically address goals, product fit, usability, feasibility, and roadmap conflicts before debating whether something "feels right." *Connects to Chapter 6.*
- **If you share a designer, negotiate bandwidth allocation.** Have an explicit conversation about how much of their time you can count on, and use that budget to route them toward the highest-risk, highest-value projects. Invest in a brief-writing discipline that compensates for their missing context. *Connects to Chapter 8.*
- **Practice "start with why, then illustrate" as your default feedback pattern.** Replace prescriptive feedback habits with the two-step: share your motivation, then offer your suggestion as one possible direction. Track whether the quality of design responses improves. *Connects to Chapter 5: non-prescriptive feedback.*

---

## Critical Gaps & Limitations

- **No treatment of async feedback.** The feedback rules assume synchronous or near-synchronous interaction. How do these translate to Figma comment threads, Slack messages, and written reviews? Async feedback lacks the ability to "check readiness" or "watch for nodding."
- **Appetite lacks calibration guidance.** The concept is powerful, but the module doesn't address how PMs develop the judgment to set appropriate appetites. What if you consistently under- or over-estimate value? What if your appetite doesn't match engineering's timeline?
- **No framework for competing appetites.** When a shared designer serves multiple PMs, each expressing appetite for their projects, how are conflicts resolved? The module addresses the shared-designer scenario but not the political dimension.
- **Objective criteria assume artifacts exist.** The evaluation framework depends on stated goals, design systems, user feedback, engineering estimates, and roadmaps. In practice, some of these artifacts may not exist, are outdated, or are contested — the framework doesn't address how to evaluate when the reference points themselves are unclear.
- **Under-exploration diagnosis is PM-initiated.** All four causes are diagnosed from the PM's perspective. The module doesn't consider that the designer may be exploring plenty — just not in directions the PM values. The "problem" may be a disagreement about what's worth exploring, not a deficit in exploration.
- **The "soul of the project" concept is suggestive but underdeveloped.** How do you identify the soul? What if PM and designer disagree about what it is? The concept gestures at something important but provides limited methodology for applying it.
- **Patrick Collison quote is inspiring but disconnected.** The closing quote about beauty and craftsmanship gestures at a deeper argument about design's intrinsic value, but the module doesn't develop this into a framework for when craft-for-its-own-sake should override utilitarian project goals.

---

## Appendix: Key Quotes

| Topic | Quote | Source Section |
|-------|-------|---------------|
| Context as foundation | "The way most designer/PM relationships break down is from insufficient context." | Practices to Establish Context |
| Openness to solutions | "Openness to the solution doesn't mean anything goes – it means that, within the lines of goals and scope you establish you should leave space for compelling solutions to emerge." | Practices to Establish Context |
| Soul of the project | "Most software projects have a core, a most important part, a most risky part or, my favorite, a soul." | Identify What Matters Most |
| Appetite concept | "State how long you think it makes sense to spend on it." | State Your Appetite |
| Scope communication | "It's all too common for PMs to react to ideas by just saying 'that's out of scope' without explaining why. That can feel antagonistic and authoritarian." | Clarify Scope |
| Alignment on why | "Don't ever dismiss questions about the 'why' of an initiative." | Being Understood |
| Nodding as signal | "One of the best tells that in a conversation someone is listening but not necessarily following along is the lack of nodding." | Being Understood |
| Designer pace | "The main complaint I hear from PMs regarding their design partners is some variation of 'they're moving too slow'." | Getting Iterations |
| Granular exploration | "By asking the designer 'What do you plan on exploring in your next round?', you create the opportunity to preemptively focus that effort." | Getting Iterations |
| Non-prescription | "Telling someone how to do their job is obviously demoralizing and, by definition, limits how much of their specific skills one is able to leverage." | Providing Feedback |
| Start with why | "Start with why, then illustrate." | Providing Feedback |
| Design correctness | "It's impossible to assert with 100% confidence that a design solution is correct. It can be better or worse, but it's never right." | Types of Criteria |
| Shared designer empathy | "Chances are the designer working with you in this model isn't happy about it either." | Working Without Full-Time Designer |
| Beauty as value | "Beauty is not a rivalrous good." — Patrick Collison | Course Wrap-Up |
