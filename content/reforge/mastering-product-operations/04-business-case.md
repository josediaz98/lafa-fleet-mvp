# Business Case for Product Infrastructure

> Course: Mastering Product Operations | Topic: ROI Analysis & Infrastructure Selection

---

## Executive Summary

Building a business case for product infrastructure requires balancing quantifiable metrics with cultural transformation goals. The core tension: infrastructure value is partially measurable (time savings, tool costs) but its deepest impact—improved decision-making and cultural change—resists precise calculation.

The recommended approach treats ROI calculations as **guidelines and guardrails**, not predictions. Focus first on understanding the problem deeply before evaluating solutions. A common mistake is conflating the HOW (specific tools or processes) with the WHAT (improving the product manager experience).

Two complementary processes form the complete methodology: (1) calculating potential value through cost savings and decision improvements, and (2) selecting infrastructure through structured rubrics that prevent vendor-driven bias. Success requires co-creation with stakeholders—not just to find better ideas, but to build ownership for the changes ahead.

Key calibration: A 3-5% improvement from new infrastructure would be transformative. A 1% improvement compounded across teams and years is a success. Most people overestimate infrastructure impact.

---

## 1. ROI Philosophy & Mindset

### Core Principles

**Solution-agnostic analysis**: Calculate the value of solving the problem, not the value of a specific solution. Understand the problem deeply before running numbers.

**Imperfect by design**: Calculating return on infrastructure is not scientific. You're trying to change product culture—a value that's challenging, if not impossible, to fully quantify.

**Guidelines, not predictions**: Use these calculations to create boundaries around your initiative, not as perfectly predictive models.

### The Four Value Sources

| Category | Type | Measurability |
|----------|------|---------------|
| Time Savings | Cost reduction | High |
| Tool Removal | Cost reduction | High |
| Decision Quality | Return/Value | Low |
| Unintended Bonuses | Return/Value | Variable |

### Common Mistakes

- **Trying to be exact**: Don't suck up time making precise projections. Work with finance partners if you need detailed models.
- **Being overly optimistic**: People assume improvements will be greater than they are. Calibrate expectations down.

---

## 2. Calculating Cost Savings

### Time Savings Framework

**Step 1: Identify current time sinks**
- Who is spending time handling the problem today?
- What workarounds exist? (manual updates, data pulls, unnecessary meetings)

**Step 2: Estimate time regained**
- Infrastructure rarely eliminates human intervention entirely
- Example: Manual documentation → automated with a few minutes for accuracy checks

**Step 3: Apply wage estimates**
Don't try too hard for accuracy—overestimates and underestimates balance out.

| Role | Hourly Rate (US) |
|------|------------------|
| Front line staff | $60/hr |
| Individual contributors | $100/hr |
| Managers | $150/hr |
| Executives | $200/hr |

**Step 4: Calculate annual savings**
```
Hours saved/month × Hourly wage × 12 = Annual savings
```

### Hidden Time Cost: Employee Retention

A healthier product culture leads to higher retention. Hiring new PMs is expensive in direct cost and ramp-up time. If the problem drives significant dissatisfaction, factor retention into the calculation.

### Tool Stack Removal

**When to calculate**: May be hard to predict early; return to this once a solution is decided.

**Process**:
1. Evaluate which software could be retired or downgraded
2. Find current costs (ask senior leaders or finance)
3. Engage procurement for spending visibility and timeline estimates

**Example**: Companies using Segment as CDP might realize savings by switching to Amplitude's CDP capabilities—consolidating tools.

---

## 3. Decision-Making Improvements

### The Dual Impact

Great infrastructure improves both:
- **Speed**: Faster access to information, reduced communication mishaps
- **Quality**: Better decisions → more successful feature launches

### Framework for Quantifying Decision Value

**Step 1: Understand how decisions will improve**
Create a narrative connecting infrastructure to decision-making. Tie it back to your ideal product culture definition.

**Step 2: Baseline current decision quality**
Explore:
- How frequently do feature launches miss expectations?
- How many product ideas are evaluated and rejected?
- How often do teams get blocked waiting on decisions elsewhere?

**Step 3: Estimate degree of improvement**
- Speed: How much capacity gets freed up?
- Quality: What KPIs would move faster with better solutions reaching market?

### Quantifying Speed Value

Two approaches:

| Approach | Method |
|----------|--------|
| Time-based | Calculate freed employee time + cost |
| Value-based | Review past year's shipped value → estimate acceleration impact → add additional shipped items |

### Quantifying Quality Value

Very time-consuming to do well (few companies document decisions or review them post-outcome).

**Simplified approach**: Assume no more than 2% lift in product-led business outcomes.

### Calibration Warning

> A 3-5% improvement from introducing one piece of new infrastructure would be transformative for a company. A 1% improvement, compounded across all the product teams and year-over-year, would be a raging success.

---

## 4. Unintended Bonuses

### Extensibility

Some infrastructure is generic and extendable. Look for other teams that might benefit—account for their improvements too.

### Bundled Software Discounts

When negotiating, vendors may offer discounts on existing software in exchange for adding new software.

### Example: SpotHero Session Replay

**Primary use case**: Accelerate user research, identify usability challenges.

**Discovered bonus**: QA could find and recreate bugs faster by seeing steps before a crash.

**ROI inclusion**: Both product/design benefit AND QA benefit.

---

## 5. Infrastructure Selection Process

### The Core Problem

> One of the most common product operations mistakes I see is teams focusing on a particular tool or process instead of focusing on achieving a certain goal. They're mixing up the HOW (the infrastructure) with the WHAT (improving the product manager experience).

### Selection Process Overview

| Step | Purpose |
|------|---------|
| Create Selection Rubric | Define criteria before evaluating |
| Co-create & Ideate | Generate options with stakeholders |
| Evaluate Options | Score against rubric systematically |

---

## 6. Creating Selection Rubrics

### Process

**Step 1: Brainstorm capabilities**
- List everything you could imagine the solution doing
- Focus on what it enables, not features
- ❌ "OCR character recognition"
- ✅ "Can make handwritten notes computer-legible"

**Step 2: Separate must-haves from nice-to-haves**
- Must-haves: Directly correspond to success criteria
- Nice-to-haves: Capabilities that don't impact success criteria

**Step 3: Identify constraints**
- Available staff for support
- Security/compliance requirements
- Investment limits

**Step 4: Connect must-haves to strategy**
Check that requirements connect back to your strategy document.

### Requirement Categories

| Category | Examples |
|----------|----------|
| Financial | Price, ongoing maintenance |
| Technical | Setup complexity, integration capabilities, security, privacy |
| Strategic | Overlap with current tools, extensibility, configurability |
| User | Ease-of-use, customer experience |

### Critical Mistake: Vendor Conversations First

> Have you ever noticed that every comparison chart from a vendor has their tool with all the checkmarks, and competitors missing something? This is because they pick the categories that make them look most advantageous.

**Rule**: Create the rubric BEFORE talking to vendors.

---

## 7. Co-creation & Stakeholder Buy-in

### Purpose of Co-creation

Two goals:
1. Find the best ideas
2. Create shared ownership so people feel invested in the solution

### Process

1. Present research findings and selection rubric
2. Brainstorm together (workshops work well)
3. Select best idea(s) for evaluation based on constraints

### Infrastructure Types to Consider

For every problem, generate at least one idea for each type:

| Type | Description |
|------|-------------|
| Tools | Software solutions |
| Templates | Reusable formats |
| Documentation | Written guidance |
| Training | Skill building |
| People | Roles or responsibilities |
| Workflows | Process changes |
| Meetings | Communication structures |
| Automation | System integrations |

### Common Mistakes

- **Falling in love with your own idea**: Keep an open mind. Sometimes implementing someone else's idea creates a champion for change.
- **Using the first idea**: Even if excellent, explore multiple ideas to solve the right problem, gain buy-in, and find potentially better outcomes.

---

## 8. Evaluating Options

### Scoring Process

1. Enter best options into rubric
2. Score each one with comments explaining scores
3. First pass: Evaluate must-haves only
4. Eliminate options that fail must-haves
5. Use nice-to-haves as tiebreakers

### Scoring System

Keep it simple: 0-3 or 0-5 scale.

Simpler = faster agreement + faster scoring.

### Critical Mistakes

**Adding up scores blindly**
> There might be one option that scores higher than the rest, but if you choose purely based on total score you're assuming that every criterion is equally weighted. There are inevitably items that are far more important than others.

**Solution**: Discussion matters more than raw scores.

**Thinking you can only choose one**
- Prototyping multiple solutions may be worthwhile
- Best results often come from layering infrastructure:
  - Training + new tool
  - Template + streamlined process

**Letting cost drive selection**
> While it can be tempting to choose tools based on how much they cost, an inefficient workflow for your team will likely cost the company more.

**Rule**: Features and capabilities first, then price.

---

## Action Items

### When Building the Business Case

- [ ] Understand the problem deeply before calculating ROI
- [ ] Keep calculations solution-agnostic
- [ ] Calculate time savings with wage estimates
- [ ] Identify tools that could be retired or downgraded
- [ ] Estimate decision-making improvements (speed + quality)
- [ ] Look for unintended beneficiaries of the infrastructure
- [ ] Calibrate optimism: expect 1-3% improvements, not transformation

### When Selecting Infrastructure

- [ ] Create selection rubric BEFORE vendor conversations
- [ ] Separate must-haves from nice-to-haves
- [ ] Connect must-haves to strategy document
- [ ] Co-create with stakeholders to build ownership
- [ ] Generate ideas across all infrastructure types
- [ ] Use simple scoring (0-3 or 0-5)
- [ ] Discuss scores—don't just sum them
- [ ] Consider combining multiple infrastructure types

---

## Quick Reference: Value Calculation Formula

```
COST SAVINGS
├── Time Savings = (Hours saved/month × Wage × 12)
├── Tool Removal = Annual subscription costs eliminated
└── Retention Value = Reduced hiring costs (if applicable)

RETURN VALUE
├── Decision Speed = Freed capacity + Earlier value delivery
├── Decision Quality = ~1-2% lift in outcomes (conservative)
└── Unintended Bonuses = Extended use cases + Bundle discounts
```

---

## Key Quotes

> "The purpose of product operations isn't to automate for automation's sake or use a particular tool. The purpose is to improve how the product management team uses data and collaborates across the org."

> "It's impossible to perfectly predict the value of improved infrastructure... Nonetheless, it's worth a back-of-the-napkin attempt to quantify it."

> "Create a shared sense of ownership. The goal of co-creation isn't exclusively to find the best ideas. It's also to help the people who will be asked to change feel more invested in the solution."

---

## Source

**Course**: Mastering Product Operations
**Lesson**: 04 - Business Case (Determine Value + Select Infrastructure)
