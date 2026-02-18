# Product Foundations W2: Feature Design & Constrained Divergence

> **Course:** Product Foundations | **Session:** Week 2 - Feature Design
> **Instructors:** JC (Laurel, ex-Webflow) & Rory (PMA at Anthropic, ex-Webflow)
> **Date:** January 17

---

## Source

| Type | Title | Speakers | Context |
|------|-------|----------|---------|
| Live Course | Product Foundations W2 | JC, Rory | Feature design phase with Webflow AI case study |

---

## Executive Summary

The feature design phase is where speed matters most—but speed without constraints leads to wasted effort. The central thesis of this session is that **constraints are not limitations; they are the mechanism that increases your probability of hitting the target**. While traditional design thinking emphasizes unconstrained divergence ("nothing is a no"), effective product design requires drawing a box around the solution space using three constraint types: desirability (user), feasibility (technology), and viability (business).

The session introduces the **nesting doll principle**: constraints operate at multiple levels of granularity. You start with broad strategic constraints, then refine them at each phase of prototyping. At every decision point, ask: "What is the constraint here for desirability? For feasibility? For viability?" This iterative refinement—not a single brainstorm—is how teams converge on solutions that actually ship.

The Webflow case study demonstrates these principles under competitive pressure. When ChatGPT launched and AI website builders flooded the market, Webflow faced an existential question: adapt or become obsolete. Their response—building an AI design assistant—required navigating technical unknowns (LLM feasibility), strategic positioning (enterprise quality vs. consumer speed), and resource constraints (small team). The result was a 10-15% relative improvement in activation rate, validating both the product decision and the constraint-driven process.

The key insight: **prototyping is not about building; it's about de-risking**. Every prototype should answer a specific question. The Palm Pilot team didn't build a computer to test size—they cut a block of wood. Today's AI tools make interactive prototyping faster than ever, but the principle remains: identify what you're de-risking, build the minimum thing to test it, learn, refine constraints, repeat.

---

## 1. The Design Process Diamond

### The Diverge-Converge Model

Traditional design process follows a diamond shape:
1. **Diverge** — Explore the space of possibilities
2. **Converge** — Narrow to the solution with most potential

> "It's so important to not just jump to the first thing that comes into your mind. It's really important to say, well, what are the space of possibilities and then converge to what we think has the most legs."

### Why Unconstrained Brainstorming Fails

Many design courses teach: "When you're in the design phase, diverge to your heart's content. Whatever you want, throw it on a wall. Nothing is a no."

**The problem:** This works for individual creative exercises but fails in team product development because:
- Without constraints, you're "shooting arrows anywhere in the world hoping to hit a bull's eye"
- Unconstrained brainstorming leads to solutions that are technically infeasible, strategically misaligned, or user-irrelevant
- Teams waste cycles debating solutions that were never viable

### The Box Metaphor

> "Imagine a world where we can say shoot anywhere in the world and hopefully you'll land on the bull's eye. The chances of that actually happening is very, very low. But instead if you said, look, I'm gonna draw a box and I know that the bull's eye is somewhere in the box... the chances that you'll hit your target is significantly higher."

**The PM's job in design:** Draw the box. Define the constraints. Then let the team diverge creatively *within* that box.

---

## 2. The Three Constraints Framework

### Desirability Constraints (User)

What do we know about users that limits the solution space?

- How they want to use the product
- Their daily workflows and context
- Their ability to adopt new technology
- Their preferences and pain points discovered in research

**Webflow example:**
- Users adverse to AI that "hallucinates" or produces unexpected results
- Enterprise users need polish, not just speed
- Users care more about outputs matching their design system than getting many options
- Flexibility and customization matter more than generation speed

### Feasibility Constraints (Technology)

What's technically possible given current capabilities and team composition?

- What technology exists today vs. 6 months from now
- Team expertise and ability to learn new tech
- Integration complexity with existing systems
- Non-deterministic AI outputs create new technical challenges

**Webflow example:**
- Early 2023: Very few people had built with LLMs
- Needed engineer with specific ML/LLM experience
- Core question: Can we generate HTML/CSS that renders correctly in Webflow?
- Speed vs. quality vs. cost trade-offs unknown

> "Technical feasibility was a huge one here. This is very early. There were very few people anywhere that had built with this kind of nondeterministic technology."

### Viability Constraints (Business)

What business realities constrain the solution?

- Runway and budget
- Timeline pressures
- Team size and allocation
- Revenue model implications
- Strategic positioning

**Webflow example:**
- LLM API calls cost money—new marginal cost per feature use
- Must deliver enough value to justify investment
- Enterprise strategy: SaaS seats, not token-based freemium
- Small team (1 PM, 2 designers, 2 engineers) for company-critical initiative

> "The first question you just have to answer is: Am I building something that's useful that anyone cares about that is actually solving their problem? And then I get to answer the question of how we gonna justify cost here."

### Constraints as Decisions

Not all constraints should be held. Some should be changed:

1. **Articulate the constraint** — You can't change what you haven't named
2. **Decide: Hold or change?** — Small team might be a constraint to accept, or one to advocate changing
3. **Advocate if needed** — "This is so important for Webflow that I need to go advocate for a team that's triple the size"

---

## 3. The Nesting Doll Principle

### Constraints at Multiple Levels

Constraints operate like Russian nesting dolls—they get smaller and more refined at each phase:

```
Level 1: Strategic constraints (market, user segment, business model)
  └── Level 2: Solution constraints (interaction paradigm, technical approach)
        └── Level 3: Feature constraints (specific behaviors, UI patterns)
              └── Level 4: Implementation constraints (edge cases, polish)
```

### The Iterative Refinement Process

At each phase of design/prototyping:

1. **Start with constraints** from previous learnings
2. **Prototype** to test specific hypotheses
3. **Learn** what works and what doesn't
4. **Update constraints** for next phase
5. **Repeat** at higher fidelity

> "You continue to use constraints through your design process. At some point, Rory got to a constraint, but it's not the top level constraint. It's an inside constraint."

### Example: Webflow's Nesting

| Phase | Constraint Learned | Next Question |
|-------|-------------------|---------------|
| 1 | Users want to describe layouts in text | Does the tech work? |
| 2 | Tech works, but quality varies | What quality bar matters? |
| 3 | Matching design system > many options | How to surface in UI? |
| 4 | Right panel works best | How many iterations acceptable? |
| 5 | Max 2-3 prompts to satisfaction | Ship it |

> "At each point, you're basically refining the thing that you're trying to test while putting a stake down in the previous thing that you've learned."

---

## 4. Prototyping for De-risking

### The Purpose of Prototypes

**Prototypes are not about building—they're about de-risking.**

Every prototype should answer a specific question:
- Can users complete the core task?
- Does the technology work?
- Is the interaction intuitive?
- Does the output meet quality standards?

> "The whole point of all this—we're not prototyping for the sake of building prototypes. You're derisking. So what's the fastest way to derisk the question? That's the question you need to be asking yourself and the team all the time."

### The Palm Pilot Block of Wood

Classic example of minimum viable prototype:

**Context:** Palm Pilot team needed to determine optimal device size before investing in hardware development.

**Constraints identified:**
- Must fit in hand
- Must fit in men's pocket square (target customer)
- Size determines screen, battery, hardware specs—cascading decisions

**Solution:** Cut blocks of wood in different sizes. Had users carry them daily, walk around, put in pockets.

> "That is the absolute cheapest way to test that. It takes two seconds to literally cut a block of wood for many people and make them go through that."

**Principle:** What's the cheapest, fastest way to test the specific thing you need to learn?

### Modern Prototyping Speed

> "Never before have you been able to take your ideas and turn them into an image, an interactable prototype... A prototype says a thousand words."

AI tools (Claude, v0, Lovable, Replit) enable:
- Interactive prototypes in hours, not days
- Testing real interactions, not static mockups
- Building outside the main product for speed
- Rapid iteration based on feedback

**Webflow approach:** Built initial prototype outside Webflow entirely to answer core technical questions faster.

### Prototyping Phases

| Phase | Cadence | Focus |
|-------|---------|-------|
| Technical validation | Daily iteration | Does it work at all? |
| Concept validation | Daily-weekly | Do users understand/want it? |
| UX refinement | Weekly | Where should it live? How should it feel? |
| Polish | Weekly-monthly | Edge cases, quality bar |

> "In the beginning, you're maybe on a daily cadence iterating on that prototype. You then move into a phase where you've solidified on the concepts and now you're thinking about finer UX decisions."

---

## 5. Usability Testing with Tasks

### Task-Based Testing

**Don't ask:** "What do you think?"
**Do ask:** "Complete this specific task"

> "If you're just putting something in front of someone and you're like, what do you think? You're gonna get a lot of answers back. But if you're like, I need someone to go through this flow, and this is what I expect a user to do—this is my hypothesis—now I'm gonna see if that's true."

### Webflow's Task Design

Tasks mapped to real user jobs:
- Create a three-column layout
- Build a hero section
- Add a navigation bar

**Control vs. Prototype comparison:**
1. Have user complete task in current product (baseline)
2. Have user complete same task in prototype
3. Measure: completion rate, time, satisfaction, quality

### Measuring Convergence

**Quantitative signals:**
- Task completion rate (old vs. new)
- Time to completion
- Number of iterations/prompts needed

**Qualitative signals:**
- UMUX score (usability metric from survey)
- Sean Ellis score ("Would you be very disappointed if you could no longer use this?")

> "This is probably the most useful metric when you're building a prototype—survey the people that have tested it and ask would they be very disappointed if you could no longer use this product."

### Quality Rubrics for Non-Deterministic Outputs

When outputs vary (AI-generated content), build explicit rubrics:

| Criteria | Success | Partial | Failure |
|----------|---------|---------|---------|
| Layout matches prompt | Exact match | Close but off | Wrong layout |
| Uses design system | All styles applied | Some applied | None applied |
| Professional quality | Ship-ready | Needs editing | Unusable |

Track over time: What % successful, partial, failure?

> "Having kind of test cases that you actually wanna test against and make sure that the system is kind of working as designed."

### When to Watch vs. Remote Test

| Phase | Approach | Rationale |
|-------|----------|-----------|
| Early prototype | Sit with user, watch, ask questions | Need to understand *why*, not just *what* |
| Concept refined | Moderated remote sessions | Broader feedback, still interactive |
| Polish phase | Unmoderated (usertesting.com) | Scale, specific interactions |

> "Especially in that early prototype phase... the best thing that you can do is go and actually sit down with someone and watch them use the product."

---

## 6. AI Product Strategy: The Webflow Case

### The Problem: 7% Activation

Webflow's core challenge:
- Complex, powerful product (Photoshop-like for websites)
- Only 7% of signups activate
- Users say: "What do I even do here?" "I just want a button on this page"

> "Around 7% of people who sign up, activate on Webflow. So just imagine how many people actually reach the designer. They have really high intent. They're really interested in building a website. And only 7% of those users activate."

### The Disruption: ChatGPT Launches

Late 2022/early 2023: ChatGPT demonstrates LLMs can generate HTML/CSS.

**Market response:** Explosion of AI website builders (v0, Lovable, Bolt, Replit, dozens more).

> "Basically overnight, it's never been easier to build a pretty good website. And not only is it hard to do this in Webflow today, but now the way you can do this is using text."

### Strategic Positioning: Enterprise Quality

Webflow's strategic choice: Don't compete on speed/simplicity. Compete on **enterprise quality**.

| Consumer AI Builders | Webflow's Position |
|---------------------|-------------------|
| Fast generation | Polish and precision |
| Good enough | Pixel-perfect |
| Generic outputs | Matches your design system |
| Freemium/tokens | Enterprise SaaS |

**Key insight from testing:**
> "The biggest thing that customers cared about was matching the rest of the styles on their page. They cared less about speed, cared less about having a ton of different layout types."

### Why Enterprise?

Revenue sustainability:
- Freemium (Lovable model): High churn, token-based revenue
- Enterprise SaaS (Webflow model): Sticky, seat-based, sustained ARR

Customer requirements:
- Nike, Dropbox, NYT need pixel-perfect, not "pretty good"
- Security, compliance, scale requirements
- Design system consistency non-negotiable

> "What Webflow really wanted was sustained ARR... There's a very clear—we belong in this space and Lovable belongs in this space."

### The Shipped Solution

Final product: AI Design Assistant
- Opens in right panel
- User selects section type (hero, features, etc.)
- Multiple options generated
- Inherits project's design system
- Iterate via text prompts

**Result:** 10-15% relative improvement in activation rate

> "We ultimately set out to improve activation... There was a significant improvement. This improved our activation rate by 10 or 15% relatively speaking."

---

## 7. Team Composition for Zero-to-One

### Small, Dedicated Teams

Zero-to-one projects need:
- **Small:** 1 PM, 1-2 designers, 1-2 engineers
- **Dedicated:** 100% focused, not split across projects
- **Comfortable with ambiguity:** Building, throwing away, rebuilding

> "The team working on this was one product manager, myself, a couple of designers, one front end engineer and a back end engineer who had some experience building with large language models. But a very lean team, tasked with a pretty hefty goal."

### Hiring for New Technology

When technology is the key unknown, hire specialists:

**Webflow's approach:**
- Identified LLM expertise as critical gap
- Hired engineer from LLM startup with GPT-3 experience
- This single hire "accelerated our timeline by a large amount"

> "Webflow hired an engineer who had done a startup just before Webflow and had been building on a very early version—I think maybe on GPT-3—and had unique domain experience."

### Attributes Beyond Technical Skills

For zero-to-one teams, look for:
- Experience building in ambiguity
- Comfort with throwing away work
- Enjoys rapid prototyping
- Customer-centric mindset

> "Folks that had experience building zero to one products, operating in a lot of ambiguity, enjoying building prototypes, getting in front of customers, throwing it away, and the next day building something new."

### Advocate for Resources

PMs should advocate for team changes when constraints block progress:

> "As the PM, that is something that you should absolutely advocate for. If you're tasked with this is a problem we're trying to solve, when you get a sense of lay of the land, if you're like, hey, we're not equipped to do that with the people that we have—that's definitely something that you should strongly advocate for."

### 20% Time and Hackathons

Best ideas often come from unstructured exploration:

> "That 20% time that people just spend hacking on the side often becomes one of the most interesting products."

---

## Action Items

### For Current Projects

- [ ] **Articulate your constraints** — Write down desirability, feasibility, viability constraints for your current project
- [ ] **Draw the box** — Before next brainstorm, define the constraint boundaries for your team
- [ ] **Identify the de-risk question** — What's the single biggest unknown? Design a prototype to answer it
- [ ] **Create task-based tests** — Define 3-5 specific tasks users should complete with your prototype

### For Process Improvement

- [ ] **Build a quality rubric** — Especially for AI/non-deterministic outputs, define success/partial/failure criteria
- [ ] **Establish measurement baseline** — Run task completion tests on current product before testing new solutions
- [ ] **Schedule user sessions** — For early prototypes, watch users directly; don't rely on async feedback

### For Team/Org

- [ ] **Audit team composition** — Do you have the expertise needed for technical unknowns?
- [ ] **Advocate for focus** — Zero-to-one projects need dedicated people, not split attention
- [ ] **Create space for exploration** — 20% time or hackathons surface unexpected innovations

---

## Key Quotes

> "If you do not understand your constraints, you're not drawing the box in which you are brainstorming clearly enough to be able to increase your chances of hitting the target."

> "Words are really lossy. When I say X, what does that mean? People close their eyes and they imagine many, many different things."

> "The whole point of prototyping is picking the thing that you're trying to derisk. And then derisking that."

> "Never before has it been easier to take your ideas and turn them into an image, an interactable prototype... A prototype says a thousand words."

> "The biggest thing that customers cared about was matching the rest of the styles on their page. They cared less about speed."

> "The first question you just have to answer is: Am I building something that's useful that anyone cares about? And then I get to answer the question of how we gonna justify cost."

> "You ship it. You learn. You see the impact, and now you get some more insights about what you might need to invest further. The process doesn't really stop."

---

## Frameworks Summary

| Framework | Purpose | Application |
|-----------|---------|-------------|
| **Three Constraints** | Define solution space | Ask: What limits desirability, feasibility, viability? |
| **Nesting Doll** | Iterative refinement | Refine constraints at each prototype phase |
| **De-risk Prototyping** | Focus prototype work | Every prototype answers one key question |
| **Task-Based Testing** | Measure usability | Define specific tasks, measure completion |
| **Quality Rubric** | Assess non-deterministic outputs | Define success/partial/failure criteria |
| **Sean Ellis Score** | Measure product-market fit | "Would you be very disappointed if...?" |

---

## Appendix: Key Timestamps & Moments

| Topic | Context | Quote/Insight |
|-------|---------|---------------|
| Design diamond intro | Opening framework | Diverge-converge model, why constraints matter |
| Box metaphor | Core teaching | "Draw a box and the bull's eye is somewhere in the box" |
| Hands-off vs prescriptive | PM role spectrum | Neither extreme works; middle ground is constrained divergence |
| Palm Pilot story | Hardware prototyping example | Block of wood to test device size before manufacturing |
| Webflow intro | Case setup | No-code website builder, YC company, founded 2013 |
| 7% activation problem | Problem definition | Despite high intent, most users can't get started |
| Checklist experiment | First solution attempt | Modest impact but didn't solve core problem |
| Quick Stack feature | Second solution attempt | New building block, helped but users still struggled |
| ChatGPT disruption | Market shift | "Overnight it's never been easier to build a pretty good website" |
| AI builders landscape | Competitive context | Explosion of v0, Lovable, Bolt, Replit, etc. |
| Enterprise strategy | Strategic positioning | Webflow grew from <$20M to ~$300M via enterprise focus |
| Desirability constraints exercise | Interactive | Class identifies: accuracy, polish, design system matching |
| Feasibility constraints | Technical unknowns | LLM expertise rare, hired specialist engineer |
| Viability constraints | Business realities | LLM costs money per use—new constraint in software |
| Constraint as hypothesis | Clarification | Constraints start as hypotheses, become stakes in ground |
| First prototype | Technical validation | Built outside Webflow to test core feasibility |
| Task-based testing | Usability method | Compare task completion: old product vs. prototype |
| Control vs prototype video | User testing | Watching user struggle with layout in current Webflow |
| Quality rubric | Evaluation method | Score AI outputs: successful, partial, failure |
| Design system insight | Key learning | Users cared most about matching existing styles |
| Shipped product | Final solution | AI Design Assistant in right panel |
| Activation improvement | Business impact | 10-15% relative improvement |
| Team composition | Org design | Small, dedicated, comfortable with ambiguity |
| Specialist hiring | Resource advocacy | LLM-experienced engineer accelerated timeline significantly |
| 20% time | Innovation source | "Best ideas often come from hacking on the side" |
| Sit with users | Testing advice | Early phase: watch directly; later: unmoderated at scale |
| Process doesn't stop | Closing thought | Ship, learn, see impact, identify next investments |

---

*Synthesized from Product Foundations Week 2 live session*
