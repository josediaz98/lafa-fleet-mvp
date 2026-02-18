# Implementing Product Operations Infrastructure: Synthesized Guide

> Source: Mastering Product Operations Course - Chapter 03

## Executive Summary

Implementing product operations infrastructure requires the same product mindset used for external features—discovery, ideation, execution, iteration, and measurement—but with a critical distinction: your customers are coworkers and your product is company culture. The implementation process itself is the primary opportunity to generate buy-in; enthusiasm directly correlates with adoption rates and results.

The framework follows six sequential steps: deeply understand the problem through discovery, define measurable success criteria, validate understanding with stakeholders, select appropriate infrastructure, prototype incrementally with expanding pilots, and evaluate against baseline metrics. Throughout, change management is as important as the solution itself—trust-building and incremental change outperform authoritarian mandates.

A key insight: measure outcomes, not tool usage. Someone logging into a new system doesn't mean the system solves their problem. Qualitative sentiment metrics are valid when changing culture and behavior.

---

## 1. Core Philosophy: Product Mindset for Internal Operations

### The Fundamental Reframe

| External Product | Internal Infrastructure |
|------------------|------------------------|
| Customers | Coworkers |
| Product | Company culture |
| Launch marketing | Change management |
| Feature adoption | Workflow adoption |

### Why This Matters

The implementation process is your **best opportunity to generate buy-in and enthusiasm**. High buy-in → high adoption → desired results. Treat every touchpoint as a chance to build support.

### Practical Application

Use the same tools and processes used for feature development:
- Same task tracking systems
- Same project management tools
- Same communication channels

Benefits:
- Builds empathy for PM experience at your company
- Makes your work legible to everyone
- Reduces tooling overhead

---

## 2. Discovery & Problem Definition

### Step 1: Identify the Problem to Solve

**Root it in strategy.** The problem should be prioritized through your strategic planning process. Have clear reasons for choosing this specific problem.

**Go deep.** High-level understanding isn't enough. Run thorough discovery:
- Identify all affected groups
- Understand their experience with the challenge
- Find the root cause
- Revisit causal mapping from strategy work
- Explore areas you couldn't examine earlier

#### User Research for Internal Customers

Your users are coworkers—this makes research straightforward:

| Technique | Application |
|-----------|-------------|
| Direct observation | Most powerful—hop on video calls or request screen recordings with voiceover |
| Surveys | Revisit initial research surveys; baseline metrics may already exist |
| Interviews | All standard techniques work; access is easier |

**Tip:** Research surveys may already contain your baseline metric in the responses, plus comments to guide discovery.

**Tip:** Treat discovery as part of gaining buy-in. The more colleagues feel changes are personalized to them, the more willing they'll be to change. Good research makes people feel listened to.

### Step 2: Define Success

**Craft a vision.** Make it clear how everyone will work differently once infrastructure is in place. Connect it to your broader product culture vision.

**Establish a baseline metric.** Identify the behavior change that indicates success. Measure that behavior today.

#### Example
- **Challenge:** Hard to schedule customer interviews
- **Metric:** Number of user interviews conducted per PM over past 30 days
- **Vision:** "Product managers never need to wait more than 5 days to test an assumption with users"

#### Metrics Philosophy

**Don't fear qualitative metrics.** When changing culture and behavior, sentiment is often the easiest and most meaningful thing to measure.

**Measure outcomes, not behavior.** This is the most common mistake—tracking tool usage instead of problem resolution.

| Wrong Metric | Right Metric |
|--------------|--------------|
| Logins to new tool | Problems solved using the tool |
| Documents created | Decisions improved by documents |
| Meeting attendance | Alignment achieved |

### Step 3: Validate Understanding

**Confirm the picture.** Connect back with colleagues and verify you understand the problem correctly. Ask clarifying questions. Demonstrate your research.

**Get agreement on metrics.** Ensure everyone agrees the metrics will actually show if you've addressed the problem.

**Tip:** Check in with stakeholders—product leadership and key stakeholders in other departments. They'll appreciate seeing your analysis.

**Do not skip this step.** It can save significant time from heading in the wrong direction.

---

## 3. Solution Design & Prototyping

### Step 4: Select Infrastructure

Choose solutions most likely to achieve your stated goals. Reference infrastructure options from earlier course materials. Combination solutions are valid.

### Step 5: Prototype and Expand

#### Prototyping Progression

Multiple prototypes at increasing fidelity:

```
Workflow diagram → Documentation → Manual process → Automation
```

Each stage tests different assumptions.

#### Process Mapping Prototype

Draw out how new infrastructure integrates with product development flows. Check for:
- Bottlenecks
- Redundancies
- New people needed in process
- Dead ends

This paper prototype is surprisingly powerful.

#### Higher-Fidelity Prototypes

Options based on infrastructure type:
- Sketch in spreadsheet
- Do the work manually for the team temporarily
- Design template and fill it in yourself

#### Running Pilots

1. **Initial pilot:** One person or a few teams in production
2. **Get feedback:** What do participants think of potential to solve the challenge? What suggestions do they have?
3. **Expand:** Once ready, roll out to whole organization with communication strategy and rollout plan

**Tip:** Pilots can be very simple. For a new template, just fill it out together in working sessions. Run several times and iterate. No formality required.

---

## 4. Change Management

### The Trust Imperative

> The more your colleagues trust you, the more likely they are to adopt your new infrastructure. This also influences whether they support future infrastructure changes. That trust is precious—treat it with the utmost care.

### Adoption Strategies

**Never stop gaining buy-in.** Use every available method. Prototyping and piloting are the most critical phases for this.

**Encourage, don't force.** It's tempting to mandate adoption or have leaders "lay down the law." Encouragement always outperforms authoritarian approaches.

**Stay incremental.** There may be a lot to fix. Many small changes are easier on colleagues than big, complicated ones.

### Post-Launch Support

**Provide multiple learning paths.** Even simple changes require time and effort to learn. Support through change by:
- Offering different ways to learn new skills
- Helping people find time to learn

**Reference:** Lippitt-Knoster model for change management

---

## 5. Measurement & Evaluation

### Step 6: Evaluate

After the program runs for sufficient time:

**Check your metrics.**
- How has adoption been?
- For adopters, have they made progress against the benchmark?

**Measure customer satisfaction.**
- What's the perceived satisfaction with the new solution?
- Are they happy with the rollout methods?

This matters because it influences support for future changes.

**Share results.** Whether successful or not:
- Communicate lessons learned
- Share what you'll do differently
- Demonstrate colleagues' interests come first

### Example: Keoki Andrus at Hope Kit

**For deliverability predictability:**
- Track number and magnitude of schedule changes within X days of GA
- Changes far from ship date matter less
- Tracking raises awareness → more early active learning → less rework → more on-time releases

**For feature adoption by sales:**
Leading indicators tracked:
- Feature mentions in BDR calls
- Product/feature mentions in quotes or RFQs
- Partners including feature in bids
- Sales reps' ability to perform and demo features

### Timing Considerations

**Balance patience and urgency.** Strong desire to move quickly, but people need time to adjust workflows. Wait for adjustment before running evaluation.

---

## 6. Anti-Patterns: Mistakes to Avoid

### Discovery Phase

| Mistake | Consequence |
|---------|-------------|
| Forgetting people outside product team | Miss impacts on engineering, design, GTM teams |
| Assuming you understand the problem | Skip validation, build wrong solution |

### Metrics Phase

| Mistake | Consequence |
|---------|-------------|
| Measuring behavior instead of outcomes | Track tool usage, miss whether tool solves problems |
| Skipping validation step | Head in wrong direction, waste time |

### Implementation Phase

| Mistake | Consequence |
|---------|-------------|
| Being authoritarian | Lower adoption, damaged trust |
| Making big changes | Overwhelm colleagues |
| Insufficient post-launch support | People can't learn new skills |

---

## Action Items

### Before Starting
- [ ] Confirm problem is prioritized through strategic planning
- [ ] Review causal mapping from strategy work
- [ ] Check research surveys for existing baseline data

### During Discovery
- [ ] Talk to all affected groups (not just PMs)
- [ ] Use direct observation (video calls, screen recordings)
- [ ] Document root cause, not just symptoms

### Before Building
- [ ] Define outcome-based metric (not usage-based)
- [ ] Establish baseline measurement
- [ ] Validate understanding with stakeholders
- [ ] Get agreement on success metrics

### During Implementation
- [ ] Create workflow diagram prototype first
- [ ] Run small pilot before broad rollout
- [ ] Get feedback after pilot
- [ ] Develop communication strategy for expansion

### After Launch
- [ ] Provide multiple learning paths
- [ ] Help people find time to learn
- [ ] Wait appropriate time before evaluating
- [ ] Share results transparently (success or failure)

---

## Quick Reference: 6-Step Framework

| Step | Key Question | Output |
|------|--------------|--------|
| 1. Identify Problem | Why this problem? Who's affected? | Root cause analysis |
| 2. Define Success | What behavior change indicates success? | Baseline metric + vision |
| 3. Validate | Do stakeholders agree? | Confirmed understanding |
| 4. Select | Which infrastructure solves this? | Chosen solution |
| 5. Prototype & Expand | Does it work in practice? | Tested, rolled-out solution |
| 6. Evaluate | Did it achieve the goals? | Results + lessons learned |

---

## External References

- [Release calendars case study](opens in a new tab) - Simple solution found through comprehensive research
- [Process mapping for infrastructure](opens in a new tab) - Drawing out workflow integration
- [Lippitt-Knoster model](opens in a new tab) - Change management framework for post-launch support
- Keoki Andrus, Hope Kit - Example metrics for product ops infrastructure
