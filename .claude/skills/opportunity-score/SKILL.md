---
name: opportunity-score
description: Evaluate a product opportunity against Strategic Fit, User Value, and Business Value using multi-lens scoring. Use when prioritizing features, validating ideas, or building roadmaps.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[opportunity-name]"
---

# Opportunity Score

Evaluate a product opportunity using the Feature Opportunity Validation framework combined with the 4D Roadmap portfolio allocation model.

A valid opportunity requires **three components working together**: Strategic Fit, User Value, and Business Value. Missing any one leads to failure.

## When to Use

- Prioritizing features for a roadmap
- Validating whether an idea is worth building
- Comparing multiple opportunities against each other
- Preparing product reviews or PRDs
- Building a balanced portfolio across Core / Adjacent / Transformational work

## Supporting Files

All framework knowledge, scoring rubrics, templates, and case studies are in this directory:

| File | Contents |
|------|----------|
| `framework.md` | Complete theoretical framework: 3-component model, 4D lenses, scoring rubrics, company stage weighting, portfolio allocation, certainty mapping |
| `template.md` | Copy-paste-ready markdown scorecard template with all sections |
| `examples.md` | Real-world case studies showing framework application (successes, failures, over-indexing) |

## Process

### Step 1: Define the Opportunity

If `$ARGUMENTS` is provided, use it as the opportunity name. Otherwise ask:

1. **What opportunity/feature are you evaluating?**
2. **Who proposed it?** (user request, leadership directive, team hypothesis, competitive response)
3. **What's the product/company context?**

If working within the LAFA project, read relevant files from `content/` for context. Check for existing strategy maps, driver trees, or PRDs.

### Step 2: Evaluate Strategic Fit (Score 0-3)

Does this opportunity align with where the company is going?

Read the **Strategic Fit** section in `framework.md` for the four-level ladder (Mission > Company Strategy > Product Strategy > Team Goals) and scoring rubric.

Key questions:
- Does this ladder to company mission/vision?
- Does this advance company strategy?
- Does this fit product strategy (which of the 6 strategic dimensions does it strengthen)?
- Does this serve team goals/OKRs?

### Step 3: Evaluate User Value (Score 0-3)

Does this solve a real problem for target users?

Read the **User Value** section in `framework.md` for the three sub-components (Problem Severity, Current Alternatives, Demand Signals) and the three customer lens filters.

Key questions:
- How painful is this problem? How frequently encountered?
- How do users solve this today? How effective are alternatives?
- Have users requested this? Is there behavioral evidence?
- Does this pass all 3 customer lens filters (not vocal minority, target user, optimal solution)?

### Step 4: Evaluate Business Value (Score 0-3)

Does this create measurable business impact?

Read the **Business Value** section in `framework.md` for the three sub-components (Funnel Impact, Revenue/Cost Impact, Measurability) and proxy metric guidance.

Key questions:
- Where in the funnel does this impact? What's the magnitude?
- Direct revenue potential? Cost savings? Indirect value?
- Can we measure success clearly? Do we have instrumentation?

### Step 5: Classify with 4D Lenses

Which of the four roadmap lenses does this opportunity serve?

Read the **4D Lens Classification** section in `framework.md` for lens definitions, company stage weighting, and over-indexing signals.

Key questions:
- Which lens(es): Strategy / Vision / Customer / Business?
- Is this a multi-lens opportunity? (Prioritize if yes)
- Does the lens mix match the company's current stage?

### Step 6: Portfolio and Certainty Classification

Read the **Portfolio Matrix** and **Certainty Assessment** sections in `framework.md`.

- Classify as Core (70%) / Adjacent (20%) / Transformational (10%)
- Assess certainty level: Research / Explore / Validate / Execute

### Step 7: Generate Opportunity Scorecard

Use the template from `template.md` to generate the final scorecard. Fill in all sections with the analysis from Steps 2-6.

**Recommendation thresholds:**
- **Go** (7-9/9): Strong across all three components
- **Conditional Go** (5-6/9): Strong in 2 components, moderate in third
- **Needs Research** (3-4/9): Promising but significant unknowns
- **No-Go** (<3/9 or any component at 0): Missing a critical component

### Step 8: Write File

Ask the user where to save, then write the markdown file.

## Key Principle

> A valid opportunity requires three components working together: **Strategic Fit** (aligns with where we're going), **User Value** (solves a real problem), and **Business Value** (creates measurable impact). Missing even one component leads to failure.

**Multi-lens opportunities** (serving 2+ of the 4D lenses) should be prioritized higher than single-lens opportunities. The best roadmaps balance across all four lenses, weighted by company stage.
