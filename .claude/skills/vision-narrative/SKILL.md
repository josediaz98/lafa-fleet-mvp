---
name: vision-narrative
description: Create a product vision narrative using the Problem-Solution-Resolution arc. Use when defining product vision, aligning teams, or pitching product direction.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[product-or-feature]"
---

# Vision Narrative Builder

Create a vision narrative — not a one-line "vision statement," but a 1-2 page written story that functions as a **decision-making substrate**. If your team can't make decisions without you and leadership won't fund past 1-2 quarters, you don't have a functioning vision yet.

## When to Use

- Defining product or feature vision for a 3-5 year horizon
- Aligning a team around a shared destination so they can make autonomous decisions
- Pitching product direction to leadership to earn investment runway
- Reframing an incremental roadmap into a coherent long-term bet

## Supporting Files

All framework knowledge, templates, and examples live alongside this file:

| File | Contents |
|------|----------|
| `framework.md` | Complete theoretical framework — leverage sources, narrative structure, attributes, socialization, persuasion styles, failure modes |
| `template.md` | Copy-paste-ready markdown template with placeholders |
| `examples.md` | Real-world case studies (Netflix, LinkedIn, Blue Origin, Slack, Lyft, and more) |

## Process

### Step 1: Define Scope

If an argument is provided, use it as the scope. Otherwise ask the user:

1. **What scope is this vision for?** (entire product, feature area, team, platform)
2. **What's the time horizon?** (typically 3-5 years)
3. **Who needs to be persuaded?** (team, leadership, investors, cross-functional partners)

If working within the LAFA project, read relevant files from `content/strategy/` and `content/thesis/` for context.

### Step 2: Brainstorm Without Constraints

Temporarily escape the constraint gravity well. Planning systems (sprints, OKRs) keep you in near-term, highly constrained thinking. Vision work deliberately relaxes constraints.

Use these constraint-relaxation prompts with the user:
- What if we relaxed resources, timeline, and feasibility?
- What if adoption were massive (movement-level)?
- Where is the industry headed, and what does leading it look like?
- What would make this scope 10x better in 3-5 years?

**Critical:** Imagine the destination first, THEN return to constraints. If you start with constraints, you'll never generate a goal that requires overcoming them.

**Continuity principle:** Vision should extend your strategic edge, not require a personality transplant. It's "strategy with the time horizon turned up."

### Step 3: Build the Narrative Arc

Read `framework.md` for the full theoretical grounding on each phase.

#### Part 1: Paint an Aspirational Problem

**Start with:** "For [target audience], solving [problem] would be needle-moving because [reason]."

Then expand until it becomes vivid and emotionally experienced, not merely stated.

Ask the user:
- What's the most vivid way to describe this problem?
- Who suffers most? What does their day look like?
- Why is this problem getting worse (or why is the opportunity growing)?

#### Part 2: Explain a Detailed and Opinionated Solution

This is where most visions die — people confuse "vision" with "wish."

**Goal:** Describe a future state with enough specificity that teams can backchain strategies and roadmaps.

Ask the user:
- How specifically does the world work when this is solved?
- What's your opinionated bet on HOW to solve it?
- What architecture, data, capabilities, or partnerships must exist?
- What are you explicitly NOT doing?

#### Part 3: Close with a User-Centric Resolution

Not "everyone is happy" — a concrete description of how the world changes.

Ask the user:
- What does a user's day look like AFTER this vision is real?
- What can they do that they couldn't before?
- What disappears from their life?
- How would you describe this to an executive in sensory, concrete terms?

### Step 4: Validate Four Attributes

Check the narrative against all four (see `framework.md` for full tests and red flags):

| Attribute | Quick Test |
|-----------|-----------|
| **Aspirational** | Does it force bigger thinking than current sprint scope? |
| **Detailed** | Can multiple people build toward the same destination? |
| **Opinionated** | Does it stake a specific POV on the solution shape? |
| **User-Centric** | Does it anchor on user benefit, not company benefit? |

### Step 5: Create Socialization Plan

Solve buy-in like a product problem: identify users (stakeholders), distribution (forum), and messaging (style). See `framework.md` for the full Stakeholder-Forum-Style framework and 6 persuasion styles.

### Step 6: Generate Vision Narrative Document

Use the template from `template.md` to write the final document. Ensure it includes:
- Executive Abstract
- The Problem (1-2 pages, vivid and aspirational)
- The Solution (1-2 pages, detailed and opinionated)
- The Resolution (0.5-1 page, user-centric and sensory)
- Four-Attribute Check
- Implications
- Roadmap Bridge
- Socialization Plan
- Decision Heuristics
- Decision Spine (one-slide version)

### Step 7: Write File

Ask the user where to save, then write the markdown file.

## Key Principle

> If your team can't make high-quality decisions without you, and leadership won't fund foundational work past 1-2 quarters, you don't have a functioning scope vision yet.

Build it as a narrative (Problem -> Solution -> Resolution), brainstorm it outside near-term constraints, then earn the right to pursue it by repeatedly linking it to the roadmap in live stakeholder forums.
