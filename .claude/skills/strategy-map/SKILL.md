---
name: strategy-map
description: Analyze a product's strategy across 6 dimensions — Audience, Problem, Value Prop, Competition, Channels, and Business Model. Use when defining or evaluating product strategy.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[product-name]"
---

# Strategy Map Skill

Analyze a product across six interlocking strategic dimensions. The core insight: product strategy is not a vision statement plus a roadmap — it is a **system of six choices that constrain and empower execution**.

## When to Use

- Defining or evaluating product strategy for a new or existing product
- Preparing for strategic reviews, investor conversations, or job evaluations
- Assessing product-market fit across multiple dimensions
- Identifying which strategic dimensions are "surface" vs "deep"

## The Six Dimensions

1. **Target Audience** — Who do we win hardest for?
2. **Problem** — What outcome do they truly want?
3. **Value Proposition** — What do we promise to deliver?
4. **Strategic Differentiation** — Why do we keep winning?
5. **Channel Strategy** — How does distribution compound?
6. **Monetization** — How does revenue align with value?

These form a cascade: Target Audience is the upstream constraint that shapes everything downstream.

## Process

### Step 1: Establish Scope

If an argument is provided, use it as the product name. Otherwise ask:

1. **What product/company are you analyzing?**
2. **What's your relationship to it?** (building it, evaluating it, competing with it)
3. **What stage is the company?** (pre-PMF, post-PMF scaling, mature)

If working within the LAFA project, read relevant files from `content/` for context.

### Step 2: Walk Through Each Dimension

For each dimension, assess whether current understanding is **Surface** or **Deep**, then work toward deep understanding through guided questions.

Use the frameworks in `framework.md` for each dimension:
- **Audience**: Bullseye Approach (3 steps + 5 attribute filters)
- **Problem**: Outcome-Motivation-Gap (OMG) framework
- **Value Prop**: Sub-Benefits Stack (functional/emotional/social layers)
- **Differentiation**: Full-Field Competition (3 buckets: direct/indirect/adjacent)
- **Channels**: Product-Channel Fit (4 loops: viral/content/paid/sales)
- **Monetization**: Product-Model Fit (ARPPU tiers from mass market to enterprise)

### Step 3: Validate the Cascade

Check system coherence:
- Does changing the audience definition force changes in other dimensions?
- Are any two dimensions pulling in opposite directions?
- Where is the system weakest? (Which dimension is most "surface"?)

### Step 4: Generate Strategy Map Document

Use `template.md` as the output format. Fill in all sections with analysis from Steps 2-3.

Refer to `examples.md` for real-world case studies that illustrate each dimension.

### Step 5: Write File

Ask the user where to save, then write the markdown file.

## Key Principle

> Deep strategy creates leverage because it becomes a **decision machine**: it helps you identify which initiatives to avoid (they violate the strategy) and which to over-invest in (they compound the strategy).

**The highest-leverage PM behavior is not prioritizing harder — it's preventing the team from building for the wrong user.**

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | Complete theoretical framework for all 6 dimensions |
| `template.md` | Copy-paste-ready output template |
| `examples.md` | Real-world case studies for each dimension |
