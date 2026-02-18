# Dynamic Delivery Plans: Collected Insights
> Module 03 from Mastering Product Delivery | Scaling innovative product delivery beyond Agile and Waterfall

## Sources

| Source | Type | Experts |
|--------|------|---------|
| Mastering Product Delivery - Module 03 | Course | Matt Greenberg (CTO, Reforge), Andy Johns (Partner, Unusual Ventures) |

## Executive Summary

**The core problem**: Shipping innovative products at scale requires making hard commitments (launch dates, resources, budget) while knowing that many assumptions will turn out to be wrong. Neither Agile nor Waterfall adequately addresses this paradox—Agile lacks foresight for long poles and external commitments, while Waterfall creates false precision and can't adapt to change.

**The solution**: Dynamic Delivery Plans capture critical planning details early but build in room to evolve. The methodology follows four phases: (1) Estimate effort through work breakdown structures and complexity assessment, (2) Sequence work through meaningful milestones and interim outputs, (3) Delegate details to core teams while managing alignment with dependencies and executives, and (4) Mitigate risks through validation work and early tradeoff negotiations.

**Key mechanism**: Rather than trying to eliminate uncertainty upfront (Waterfall) or defer all planning to sprints (Agile), dynamic delivery planning acknowledges uncertainty and builds validation checkpoints throughout the process. Leaders focus on where they add most value—orchestrating across teams and making tradeoff decisions—while delegating detailed planning to those closest to the work.

**Critical insight**: Most projects fail not from poor execution but from poor planning. Teams that make optimistic early estimates then "push through" create cascading firefighting cycles. The alternative is making difficult tradeoff decisions early—accepting that the right plan makes everyone disappointed, but not to their breaking point.

---

## 1. The Planning Paradox

### Why Big Bets Fail

Large-scale innovative product development faces a fundamental paradox: you need to make commitments while knowing many assumptions will be wrong.

**The stakes of mis-estimation**:
- **Overestimate**: Work may never start (seems too expensive), or projects expand to match resources instead of staying lean
- **Underestimate**: Forces difficult late-stage decisions—cut scope, negotiate for more resources, or push launch dates

**Real-world failures**:
- **Boeing 787 Dreamliner**: 3 years late, $17-23B in delays from delivery plan errors
- **Cyberpunk 2077**: Multiple delays, released with critical bugs, massive backlash

### Three Failing Archetypes

| Archetype | Approach | Result |
|-----------|----------|--------|
| **Hackers** | Avoid big bets entirely, only quick wins | Can never get benefits of larger-scale innovation |
| **Fixers** | Rough plans + "rockstar" individuals | Firefighting, behind schedule, limited by number of rockstars |
| **Visionaries** | Great ideas, poor execution plans | Lower quality than vision, late releases, late-stage blowups |

### Limitations of Existing Methodologies

**Agile limitations**:
| Area | Problem |
|------|---------|
| Estimation | Can't handle "long poles" that don't fit sprint cycles |
| Sequencing | Too short-term for external commitments and securing resources |
| Delegation | Requires all collaborators to adopt Agile structure |
| Risk | Relies on resolving risks through iteration—lacks tools for large-scale risk |

**Waterfall limitations**:
| Area | Problem |
|------|---------|
| Estimation | False precision—detailed models based on wrong assumptions |
| Sequencing | Too rigid—requires immense detail before starting |
| Delegation | Central ownership creates high overhead as things change |
| Risk | Too optimistic—assumes all risks mitigated before work begins |

> "Over the last 10+ years we've seen an overreliance on the orthodoxy of quick, iterative shipping in the religion of 'lean development' and Agile." — Andy Johns

> "We moved away from a strong scrum model, and started to create something more flexible for executing at scale." — Matt Greenberg (on Credit Karma's evolution)

### The Four Critical Planning Questions

1. How much work is the project going to require?
2. In what sequence should the work be done?
3. How will we delegate and manage the work?
4. How can we mitigate risk in our plan?

---

## 2. Estimation

### The Estimation Challenge

Software estimation is notoriously difficult because:
1. Initial estimates assume optimal conditions
2. Unknown complications always arise during work
3. Commitments have large consequences
4. Conflict emerges between updating plans vs. "pushing through"

> "I can't commit to something if I don't know what it is yet." — Common engineering leader response

Yet estimation is essential for prioritization, staffing, work sequencing, and launch dates.

### Work Breakdown Structure (WBS)

A WBS identifies work by starting with large blocks, then breaking into component parts until reaching tasks of meaningful size.

**Why bottom-up, not top-down**:
> "A lot of people start with top-down work plans—they pick key delivery dates and fit the workplan to make those dates. However, this often results in teams developing unrealistic plans from the get-go." — Matt Greenberg

**Standard WBS categories**:
- **Core Product**: Front-end cross-platform + back-end business logic
- **Growth**: Features driving traffic to the product
- **Infrastructure**: Networking, databases, storage
- **Third-Party Integrations**: External organization requirements
- **Launch Readiness**: Admin panels, metrics, monitoring, QA
- **Non-Technical**: Marketing, legal, customer support, compliance, security

**Common WBS mistakes**:
1. Forgetting non-technical work (security, compliance, support, marketing, legal)
2. Forgetting launch-readiness work (QA, testing, admin panels, metrics)
3. Including too much scope (not all moments of delight need V1)
4. Building in isolation (product/engineering should deliberate together)
5. Leaving assumptions unstated (document them for later validation)

### Complexity Assessment

Use t-shirt sizing to categorize complexity:

| Level | Definition | Example |
|-------|------------|---------|
| **Straightforward** | We know how to do this / done before | CRUD operations |
| **Normal** | Done something similar with nuances | Language localization (new regions) |
| **Complicated** | Never done before, don't know anything | Hiring in new country |
| **Very Complicated** | No one has ever done this before | Novel technical integrations |

> "Anytime you use t-shirt sizing as an estimation tool, there's a tendency to choose the 'medium' option for all work. I like to use comparisons within each 'size' to sense check if the work is actually all a similar level." — Matt Greenberg

### Resource-Time Estimation

Estimate both **time** and **resources** needed—scope depends on both.

**Baseline units of value**:
- Projects > 1 quarter: no smaller than 1 person-month
- Projects < 1 quarter: no smaller than 1 person-week

**Why use baseline units**:
1. **Avoid false precision**: Early estimates contain many assumptions
2. **Avoid death by 1000 cuts**: Prevents negotiating away days without meaningful progress

### Complexity Factors

When comparing to historical examples, adjust for:

| Factor | Definition | Impact |
|--------|------------|--------|
| **Scale** | Users and segments using the product | 10K users vs 2M users on day one |
| **Stability** | Uptime/performance expectations | Financial transactions vs. checking scores |
| **Access** | Data availability and configuration | Existing data systems vs. new storage/permissions |
| **Magnitude** | Size of product change | Small aspect vs. whole new experience |

### Work That's Hard to Estimate

Four types consistently underestimated:
1. **Data**: Minor front-end changes can require massive back-end scope
2. **Infrastructure**: Large projects cross different systems, adding complexity
3. **Shared surfaces**: Multiple team ownership slows consensus and decisions
4. **3rd Party Integrations**: Too many unknowns outside your organization

### Estimation Principles

> "Very rarely does the first version meet the quality bar necessary to truly delight customers." — Andy Johns (include rework time)

> "Often people are optimizing their initial estimates for project approval. At this stage you should optimize for the most realistic estimates for delivering the scope." — Matt Greenberg (over-estimate, don't under-estimate)

---

## 3. Sequencing & Dependencies

### Why Sequencing Matters at Scale

Iterative work has short horizons, small teams, and few dependencies. Large-scale launches require:
- Longer time horizons with more moving pieces
- Orchestration across multiple teams (often outside your function)
- More dependencies creating complex relationships between tasks

**The Thanksgiving metaphor**: Like preparing a big meal where everything must come together warm at the same time. Your job is figuring out what to cook in what order.

### Setting Milestones

Milestones are intermediate points where work integrates for an output.

**Why milestones matter**:
- Provide objective visibility into tangible outputs (not subjective status updates)
- Create positive momentum for the team
- Uncover misaligned expectations with execs and dependency teams

> "There are unstated assumptions and expectations that everyone always has in every communication. Milestones are your way to bring those to the forefront as early as possible." — Matt Greenberg

> "Status updates are meaningless to me. I'd much rather see the progress demonstrated in a functional output than hear that the work is 'green.'" — Matt Greenberg

**Three qualities of meaningful milestones**:
1. **Demonstrate increasing fidelity**: Demo → Fishfood → Dogfood → Launch ready
2. **Obviously understandable**: External people can assess status without deep context
3. **Right level of detail**: Appropriate for exec or cross-functional audience

**Fidelity layers for technical work**:
| Layer | Definition |
|-------|------------|
| Demo ready | Project team can walk through for external feedback |
| Fishfood ready | Project team can test the output |
| Dogfood ready | Other company employees can test |
| Launch ready | Ready for customers |

**Non-technical milestones** (vary by function):
- **Partnership**: Partner chosen → terms defined → requirements met
- **Legal**: T&C drafted → website copy approved
- **Marketing**: Strategy defined → creative built → launch plan complete

### Interim Outputs

Interim outputs break milestones into smaller component outputs.

> "The outputs that give you the strongest signal on progress are those that demonstrate work from two separate teams integrated into one functional output." — Matt Greenberg

**Why teams underinvest in interim outputs**:
- Seems like net-new work (synthesizing, staging, getting sharable format)
- Reality: You'll integrate eventually—it's harder the longer you wait

> "If you skip integrating in staging and instead do it in production, you'll still have to integrate it. And it's usually harder to do—maybe the tools are more complicated, you have less access, or you have to reboot something and wait until a maintenance window." — Matt Greenberg

**Problems from skipping interim outputs**:
1. Lack leading indicators that milestones may be off track
2. Wait too long to integrate, creating late-cycle risk

### Identifying Dependencies

Dependencies are critical work that enables product development success.

**Five dependency sources**:

| Source | Definition | Example |
|--------|------------|---------|
| **Input-output** | One task must complete before another starts | Mock designs → front-end code |
| **Integrations** | Parallel work must come together for output | Data infrastructure + new model |
| **3P conditions** | External partner constraints | IRS testing windows for tax products |
| **Resources** | Limited team availability over periods | Android team only available March 1-April 15 |
| **Important dates** | Holidays, QBRs, board meetings, all hands | Reduces capacity, requires share-outs |

### Long Poles

Long poles require the longest time investment and fundamentally shape how you approach the rest of your work.

**The tent metaphor**: Where you place the longest pole changes the whole tent shape, where other poles go, and placement order.

> "Any time product development requires integration with a 3rd party, the 3rd party requirements are the long pole dependency in the project." — Matt Greenberg

**Two critical dependency types to watch**:
1. Teams you don't directly influence
2. Long poles in your development process

---

## 4. Delegation & Alignment

### Why Delegation Matters

Product and engineering leaders must focus on where they add most value.

**Waterfall approach**: Leaders own detailed master plans, leading to:
- Micromanaging (trying to know all details)
- False precision (assumptions about details)
- Problems multiply with cross-functional dependencies

**Agile approach**: Little central ownership, losing:
- Ability to drive accountability
- Ability to build alignment with other teams and execs

**Dynamic approach**: Focus on maximum value through:
1. **Delegate**: Give ownership to core team members to pressure test, add detail, surface risks
2. **Manage**: Confirm alignment with cross-functional teams and exec sponsors

### Delegating to Core Team Members

> "A common challenge new product and engineering leaders face is that they fail to grok the plan as a group, and end up missing a lot of necessary work early in the development process." — Matt Greenberg

> "A lot of product leaders take a passive role in pressure-testing the plan, leaving all assumptions for the engineering leader to validate. Actually, you want to be involved in pressure testing the plan. You want to know what will be hard and what is uncertain." — Andy Johns

**Why delegate the next level of detail**:
> "Leaders who get too deep in the details tend to break their brain. It's too much for one person to know and stay on top of as things inevitably change." — Matt Greenberg

**Three components of great delegation**:

| Component | What to Share |
|-----------|---------------|
| **Provide context** | Customer problem, priority user profiles, moments of delight, known tasks, effort estimates, milestones, interim outputs, dependencies, long poles |
| **Make clear request** | Add detail, validate assumptions, flag risks |
| **Give additive feedback** | Right interim outputs? Right milestones? Reasonable timing? What dependencies and risks? What open questions? |

### Managing Cross-Functional Dependencies

Not about creating a master plan for everyone. Objective is:
- Build alignment on critical outputs and dates
- Pressure test details with experts
- Identify remaining risks

**Questions for dependency teams**:
1. Who will own this from your team?
2. How will this show up in your OKRs?
3. How will we know if interim outputs/milestones are on track or off track?

### Managing Executive Sponsors

**The mistake**: Shying away from surfacing friction-causing assumptions to avoid early blow-ups.

**The reality**: Early blow-ups can be good—especially when validating unshared assumptions.

**Common sticking points** (all relate to constraints):

| Constraint | Common Challenge | Example |
|------------|------------------|---------|
| **Time** | Sponsor has strong date requirement | Partnership team can't launch during contract renewals |
| **Scope** | Exec has different moment of delight opinion | Another product line wants specific integration |
| **Resources** | Never enough, conflicting priorities | Infrastructure team spread too thin |

**Over-communicate**:
- Strategic assumptions (problem, delight moments, priority users)
- Changes to impact assessment (opportunity size, timing expectations)

**Done wrong**: Walking through whole plan when there's only one important piece

**Done well**:
- Put most important thing up front
- Explicitly state dates and outputs needed
- State the disagreement
- Find a compromise that makes everyone uncomfortable but not unsatisfied

> "Compromise is making no one more unhappy than they can tolerate being. The right plan makes everyone disappointed, but not to their breaking point." — Matt Greenberg

---

## 5. Risk Identification

### Assumptions and Risks

Throughout planning, you make assumptions to manage uncertainty. This is necessary but dangerous if left untested.

**The relationship**:
- **Assumptions**: Constraints on unknown questions that could materially affect your plan
- **Risks**: Manifest when answers to those questions are incorrect

> "Very rarely does the first version meet the quality bar necessary to truly delight customers." — Andy Johns

**The common mistake**: Leaving assumptions untested until bumping into them, then saying "how could anyone have known?"

**The dynamic approach**: Build in time to validate assumptions throughout development—it's your way of mitigating risk.

### Four Risk Types

**1. Customer Understanding**
- Original understanding of problem, user segments, moments of delight may be incorrect
- Learning evolves throughout the project
- Risk: Changes in scope that jeopardize shipping on time

**2. Technical Complexities**
Work takes more time/resources than estimated because:
- Tools/systems that worked for one product don't work for another
- Estimated effort assumed optimal capacity (holidays, maintenance erode time)
- Engineers and product teams are simply wrong about difficulty

Common sources: Data, Infrastructure, Shared Surfaces, 3rd Party Integrations

**3. Scope Expansion**
Unknown work not in original plan because:
- Plan built on "happy path" only (optimal user conditions)
- Product leaders add "small" things requiring heavy back-end lift
- Engineers don't plan for monitoring, admin panels, metrics
- Business decisions change work (e.g., partnership negotiations)
- Regulatory/compliance requirements

**4. Resource Dependencies**
Assumptions that may not hold:
- Access to specialized resources when needed
- Hired headcount starting by target date
- Promised future headcount
- Local hires for new market launches

> "This is where most Agile teams struggle as they start to scale to bigger, more complex projects, especially if their project was not given freedom to urgently pull people in and reprioritize their work." — Matt Greenberg

---

## 6. Risk Mitigation

### Validation Work

Validation work mitigates risks by verifying assumptions in your delivery plan.

Three types:
1. Add meta-tasks to the plan
2. Front-load adjustments
3. Pressure test failure states

### Meta-Tasks

Tasks that improve plan accuracy by getting more information about assumptions and risks. They don't produce product development work.

> "We had a PM at Wealthfront that started the project by listing all of the important questions that we didn't have answers to, and developed a plan for answering those questions. This was one of the most useful exercises in what made them successful at product development." — Andy Johns

**Questions to identify meta-tasks**:
- What assumptions do we need to validate?
- What information could validate our assumptions?
- What are the signals that a risk will materialize?

**Examples**:
| Risk | Meta-Task |
|------|-----------|
| Technical complexity | Check-in points to measure if work took as long as estimated |
| Resource (hiring) | Research outreach-to-acceptance timeline vs. industry norms |
| 3P integration | Contact companies who've integrated with this partner before |

### Front-Loading Adjustments

**The problem**: Teams wait for all requirements before starting next task to avoid rework. For large-scale work, most things won't finalize until late—pushing critical work to the end.

> "As a leader, you want to be involved in the most complex parts of the development process. If you plan for all of the complexity to happen at the end, you're setting yourself up to make mistakes, or at the very least, stretch yourself too thin right before launch." — Andy Johns

**The solution**: Bias toward front-loading work, even if it introduces rework possibility.

**Examples**:
- Deploy TensorFlow infrastructure the quarter before the model needs it
- Test value propositions with painted door tests before product is finalized

**Questions to identify front-loading opportunities**:
- What can we do now to gain certainty?
- What can we do now to reduce complexity later?

### Pressure Testing Failure States

Many projects scope only the "happy path"—the experience when users face no challenges.

**Three unhappy path types**:

| Type | Definition | Example |
|------|------------|---------|
| **Performance failures** | Service unavailable or slow | 3P API returns error for invalid phone number |
| **Application logic failures** | User state breaks experience | Two credit scores instead of one—pages don't know which to return |
| **Security/access failures** | Authentication issues | Password update logs users out of other devices |

> "Early on in my career, the way I asked questions about unhappy paths upset people. Though these are important conversations to have, they need to occur from a place of empathy." — Matt Greenberg

**How to approach**: "In the interest of being thorough, can we go through what work might be required in a few failure states? This will help me ensure we're fully prepared for likely risks."

**Questions for failure states**:
- How does the new product interact with other parts of the existing product?
- What can break the ideal experience?
- If this is live, what would we need to page Engineering or Product for?

> "The reality is, most product and engineering leaders think through failure states at some point in the development lifecycle, but it's often too late, and the work isn't scoped into your delivery plan yet." — Andy Johns

---

## 7. Tradeoffs

### The Firefighting Cycle

Leaders make optimistic early estimates, assuming they'll "make it happen" or "get more."

> "The mindset that we'll just overclock ourselves and get it done comes from a good place, but isn't sustainable for a large-scale project." — Andy Johns

**The cascading effect**:
1. Plan A asks for more time/resources
2. Plan A grabs from Plan B
3. Plan B grabs from Plan C
4. Plan C grabs from Plan A...

> "In many organizations, fire fighting is the development process. Thus, fire fighting is not a complement to a more structured approach to new product development, but is, instead, an organizational pathology that, left unchecked, can significantly degrade an organization's ability to create high-quality products." — MIT Center for Innovation in Product Development

### Making Tradeoffs Early

> "To achieve great things, two things are needed: a plan and not quite enough time." — Leonard Bernstein

**Why tradeoff decisions are hard**:
1. Leaders lack experience to draw from
2. Leaders lean on same tradeoffs regardless of context

**The system**: Anchor on three constraints—Scope, Time, Resources.

### Time Tradeoffs

**Option 1: Move launch dates**
- Works when: Product not date-dependent, timeline set around "gates" (conditions, not dates)
- Doesn't work when: Launch tied to customer needs (e.g., tax season)

**Option 2: Reduce QA and testing time**
- Works when: High-risk/experimental product likely to change after launch
- Doesn't work when: Customer delight depends on quality; regulated/security-conscious space

> "You hear things like, 'Oh, we'll just ramp to 1% of users and see what happens instead of doing QA.' What this means is that you're going to find issues but not be able to meaningfully clean them up." — Matt Greenberg

**Option 3: Shift tooling/instrumentation to post-launch**
- Works when: Low KPI expectations, not expecting high initial traffic
- Doesn't work when: Big press release planned, large marketing push, high KPI expectations

> "When you don't have things like tooling & instrumentation set up in advance, you're setting yourself up for failure when you have to run the business you just launched." — Matt Greenberg

### Scope Tradeoffs

> "MVP is not the easiest thing for you to ship and still solve the problem—instead it's the minimum needed to deliver at least one form of customer delight." — Andy Johns

**Option 1: Reduce number of features**
- Works when: Still delivers moments of delight with fewer features
- Doesn't work when: Delight requires all features; no capacity for fast-follow; too hard to add later

**Option 2: Reduce feature complexity**
- Works when: Delight achievable with simpler implementation
- Doesn't work when: Simpler version doesn't meet delight bar; can't follow up with more complexity

> "A big difference between senior and junior leaders is in their ability to find simple solutions that generate moments of delight. Each feature does not need to be complex to create delight, if it still meets a high quality bar." — Andy Johns

**Option 3: Reduce feature quality**
- Works when: High-risk product likely to be rebuilt; users still delighted with lower quality
- Doesn't work when: It erodes delight; no capacity to improve quality post-launch

> "It's easy to scope out all the bells and whistles. But oftentimes the bells are the things that make the product feel complete and good, and you're better off cutting features." — Andy Johns

**Option 4: Reduce user segments**
- Works when: A few segments represent bulk of early usage
- Doesn't work when: Unclear which segments will adopt; all segments are priority

> "Most often, it's better to have one premium experience for your most important user than a few average experiences." — Matt Greenberg

Examples: Fewer device formats, fewer geographic markets, fewer languages at launch

### Resource Tradeoffs

**Option: Add more people**
- Works when: Early in lifecycle; work is isolated (own file, own surface, own experience)
- Doesn't work when:
  - Work is across shared surfaces (iOS/Android shipping in one app)
  - Teams writing code in same files
  - Integrating with centralized dashboards/homepages/onboarding
  - Late in project (people assigned elsewhere)
  - Late in project (ramp-up time exceeds value)

---

## Action Items

### Immediate (Before Starting Any Big Bet)

1. Build a Work Breakdown Structure bottom-up—don't fit work to dates
2. Include non-technical and launch-readiness work in WBS
3. Document all assumptions explicitly
4. Identify long poles and dependency teams early
5. Set meaningful milestones at increasing fidelity levels

### During Planning

6. Use t-shirt sizing for complexity, then sense-check within each level
7. Estimate resource-time (not just time) using appropriate baseline units
8. Identify interim outputs that integrate work from multiple teams
9. Delegate detail work to core team members with clear context and requests
10. Build alignment with dependency teams on outputs and dates (not their process)

### Risk Mitigation

11. Add meta-tasks to validate critical assumptions
12. Front-load work that can reduce late-stage complexity
13. Pressure test failure states (performance, application logic, security) early
14. Make tradeoff decisions early—don't defer to end of project

### Executive Communication

15. Lead with the most important information, not the whole plan
16. Be explicit about disagreements and date/output needs
17. Find compromises that make everyone uncomfortable but not unsatisfied

---

## Critical Gaps & Limitations

### What This Framework Doesn't Address

1. **Team formation**: How to identify and assemble the right core team
2. **Cross-company dependencies**: When multiple products/companies must coordinate
3. **Ongoing operations**: How to transition from project to product maintenance
4. **Culture change**: How to shift organizations entrenched in Agile or Waterfall
5. **Remote/distributed teams**: Specific challenges for non-colocated development
6. **Regulatory-specific**: Deep guidance for heavily regulated industries

### Assumptions in This Framework

- Organization has some capacity to form dedicated project teams
- Leadership has authority to make tradeoff decisions
- Company has established launch processes (QA, dogfooding, etc.)
- Projects are "big bets" that justify this level of planning overhead

---

## Appendix: Key Quotes

| Topic | Quote | Speaker |
|-------|-------|---------|
| Agile limitations | "Over the last 10+ years we've seen an overreliance on the orthodoxy of quick, iterative shipping in the religion of 'lean development' and Agile." | Andy Johns |
| Bottom-up planning | "A lot of people start with top-down work plans—they pick key delivery dates and fit the workplan to make those dates. However, this often results in teams developing unrealistic plans from the get-go." | Matt Greenberg |
| Complexity assessment | "Anytime you use t-shirt sizing as an estimation tool, there's a tendency to choose the 'medium' option for all work." | Matt Greenberg |
| Rework time | "Very rarely does the first version meet the quality bar necessary to truly delight customers." | Andy Johns |
| Realistic estimates | "Often people are optimizing their initial estimates for project approval. At this stage you should optimize for the most realistic estimates for delivering the scope." | Matt Greenberg |
| Milestones | "Status updates are meaningless to me. I'd much rather see the progress demonstrated in a functional output than hear that the work is 'green.'" | Matt Greenberg |
| Milestones | "Ultimately, delivery plans are a communication tool. Milestones should give everyone a point of reference on whether the product development process is on track or off track." | Andy Johns |
| Integration timing | "If you skip integrating in staging and instead do it in production, you'll still have to integrate it. And it's usually harder to do." | Matt Greenberg |
| Signal quality | "The outputs that give you the strongest signal on progress are those that demonstrate work from two separate teams integrated into one functional output." | Matt Greenberg |
| Long poles | "Any time product development requires integration with a 3rd party, the 3rd party requirements are the long pole dependency in the project." | Matt Greenberg |
| Detail overload | "Leaders who get too deep in the details tend to break their brain. It's too much for one person to know and stay on top of as things inevitably change." | Matt Greenberg |
| Pressure testing | "A lot of product leaders take a passive role in pressure-testing the plan, leaving all assumptions for the engineering leader to validate. Actually, you want to be involved." | Andy Johns |
| Compromise | "Compromise is making no one more unhappy than they can tolerate being. The right plan makes everyone disappointed, but not to their breaking point." | Matt Greenberg |
| Meta-tasks | "We had a PM at Wealthfront that started the project by listing all of the important questions that we didn't have answers to." | Andy Johns |
| Front-loading | "As a leader, you want to be involved in the most complex parts of the development process. If you plan for all of the complexity to happen at the end, you're setting yourself up to make mistakes." | Andy Johns |
| Failure states | "Most product and engineering leaders think through failure states at some point in the development lifecycle, but it's often too late." | Andy Johns |
| Overcommitting | "The mindset that we'll just overclock ourselves and get it done comes from a good place, but isn't sustainable for a large-scale project." | Andy Johns |
| QA shortcuts | "You hear things like, 'Oh, we'll just ramp to 1% of users and see what happens instead of doing QA.' What this means is that you're going to find issues but not be able to meaningfully clean them up." | Matt Greenberg |
| MVP definition | "MVP is not the easiest thing for you to ship and still solve the problem—instead it's the minimum needed to deliver at least one form of customer delight." | Andy Johns |
| Simple solutions | "A big difference between senior and junior leaders is in their ability to find simple solutions that generate moments of delight." | Andy Johns |
| Quality tradeoffs | "It's easy to scope out all the bells and whistles. But oftentimes the bells are the things that make the product feel complete and good, and you're better off cutting features." | Andy Johns |
| Segment focus | "Most often, it's better to have one premium experience for your most important user than a few average experiences." | Matt Greenberg |
