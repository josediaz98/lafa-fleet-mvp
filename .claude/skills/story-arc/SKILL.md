---
name: story-arc
description: Build a persuasive product story using the PRAA framework (Problem → Result → Action → Ask). Use when pitching initiatives, requesting resources, driving process changes, or gaining buy-in.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[initiative-name]"
---

# Persuasive Story Arc Builder

Build a structured persuasive story for any PM initiative — budget asks, process changes, adoption pushes, strategy pitches. The output is a validated, structured narrative ready for delivery to any audience.

## When to Use

- Pitching a new feature, product, or strategic direction to leadership
- Requesting budget, headcount, or engineering resources
- Proposing a process change that affects multiple teams
- Making the case for adoption of a tool, framework, or practice
- Packaging any initiative into a compelling narrative with a clear ask

**Distinct from `/vision-narrative`:** Vision narrative generates long-term 3-5yr directional content (Problem-Solution-Resolution arc). Story arc is the persuasive *delivery wrapper* for any initiative at any timescale. If your initiative is a 3-5yr product vision, use `/vision-narrative` to generate the content, then `/story-arc` to package it for influence.

## Supporting Files

| File | Contents |
|------|----------|
| `framework.md` | Complete theoretical framework — Three-Gate Validation, Context Matrix, PRAA structure, Story Archetypes, Content Pillars, failure modes |
| `template.md` | Copy-paste-ready markdown template with all sections and descriptive placeholders |
| `examples.md` | 6 real-world case studies (BILL, PandaDoc, GoDaddy, Shopify, Notion) plus anti-patterns |

## Process

### Step 1: Define the Initiative

If an argument is provided, use it as the initiative name. Otherwise ask the user:

1. **What initiative are you building a story for?** (feature, strategy, process change, budget ask, adoption push)
2. **What do you need from your audience?** (funding, headcount, approval, alignment, a dependency unlocked)
3. **Who is the primary audience?** (leadership, team, cross-functional stakeholders)

If working within the LAFA project, read relevant files from `content/strategy/` and `content/thesis/` for context.

### Step 2: Validate Through Three Gates

Before building the story, test it. Read `framework.md` Section 2 for full gate definitions.

Ask the user for each gate:

**Gate 1 — Interest:**
- How does this help the customer? (from THEIR perspective, not yours)
- How does this help the business? (frame as opportunity, not internal pain)

**Gate 2 — Alignment:**
- What company strategy, OKR, or leadership priority does this connect to?
- Can you name the specific strategic goal?

**Gate 3 — Feasibility:**
- Is there a plausible path to success?
- Does the technology exist or can it be built?
- Does it fit the brand and customer base?

If any gate fails, discuss with the user whether to reshape the story or address the gap before proceeding.

### Step 3: Assess Business Context

Read `framework.md` Section 3 for the Five-Dimension Context Matrix.

Ask the user to rate each dimension (1-5) and discuss implications:
- Business Success (missing budget ↔ exceeding budget)
- Business Lifecycle (early stage ↔ late stage)
- Market Situation (high competition ↔ low competition)
- Financial Situation (low on cash ↔ rolling in cash)
- Team Trust (low trust ↔ high trust)

Determine if the context is favorable, and if not, how to reshape the story to fit.

### Step 4: Select Story Archetype

Read `framework.md` Section 5 for archetype profiles.

Help the user identify the right archetype:
- **Strategy** — Setting direction for a product or feature
- **Process** — Changing how people work
- **Adoption** — Getting people to use something
- **Budget** — Changing how money is spent

Confirm the main character (must be a person, not an abstraction) and business framing.

### Step 5: Build the PRAA Arc

Read `framework.md` Section 4 for the full PRAA structure.

Guide the user through each component with discovery questions:

**Problem (Dual Track):**
- Customer: Who is the main character and what's their pain? Make it vivid and specific.
- Business: What is the company losing or missing? Frame as opportunity cost.

**Result (Dual Track):**
- Customer: What does their experience look like after? Use concrete, sensory language.
- Business: What strategic or financial outcome does this drive? Connect to company goals.

**Action:**
- How do we get from current to desired state?
- What's the phasing? Key milestones?
- What are we explicitly NOT doing?

**Ask:**
- What specific resources, decisions, or commitments do you need?
- Quantify where possible.

### Step 6: Audit Content Pillars

Read `framework.md` Section 6 for pillar definitions and evidence spectrum.

Check the story against all four pillars:

| Pillar | Quick Test |
|--------|-----------|
| **Tangible** | Can the audience *picture* the result? |
| **Emotional** | Does the audience *feel* the problem? |
| **Clear** | Does the audience *understand* how it fits their strategy? |
| **Believable** | Does the audience *trust* it can work? |

For any weak pillar, suggest specific evidence to gather (see evidence investment spectrum in `framework.md`).

### Step 7: Generate Story Arc Document

Use `template.md` as the structural foundation. Fill in all sections based on the conversation. Refer to `examples.md` for tone and depth calibration.

Ensure the document includes:
- Three-Gate Validation results
- Context Assessment
- Full PRAA arc with dual tracks
- Content Pillar audit
- Elevator pitch (30-second version)
- Quality check

### Step 8: Write File

Ask the user where to save, then write the markdown file.

## Related Skills

- **`/stakeholder-map`** — After building your story, map who needs to hear it and design per-stakeholder influence approaches
- **`/comms-plan`** — After mapping stakeholders, plan the delivery: format, channel, mode, and sequence for each audience
- **`/vision-narrative`** — If the initiative is a 3-5yr product vision, generate the content first with vision-narrative, then package it with story-arc

## Key Principle

> PM storytelling is a learnable, repeatable skill — not an innate talent. By following the Validate → Time → Structure → Content sequence and checking your work against the frameworks, you systematically increase the probability that your story gains traction. When a story fails to land, trace the failure back to a specific gap: wrong timing, missing pillar, weak gate, or absent ask.
