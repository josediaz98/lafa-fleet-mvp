---
name: comms-plan
description: Design a communication delivery strategy — map each audience to the right format, channel, proactive mode, and sequence. Use when planning how, when, and where to deliver a pitch, launch, or initiative communication.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[initiative-name]"
---

# Communication Delivery Strategy Builder

Plan the tactical delivery of any PM communication — format (slides, written, video), channel (meeting, 1:1, Slack), proactive mode (pitch, pre-sell, inform, report, workshop), and sequencing across audiences. The output is a complete delivery playbook with reactive preparation.

## When to Use

- Planning how to deliver a pitch, proposal, or strategy to multiple audiences
- Preparing for a leadership review where format and channel choices matter
- Launching a cross-functional initiative that requires sequenced communication
- Navigating a company culture that constrains your tactical choices (meeting-heavy, written-first, async)
- Any time you've built a story and mapped stakeholders but need to plan the actual delivery

**Upstream:** Use `/story-arc` to build *what* you say, `/stakeholder-map` to determine *who* hears it and at what engagement level, then `/comms-plan` to determine *how, when, and where* you deliver it.

## Supporting Files

| File | Contents |
|------|----------|
| `framework.md` | Complete tactical framework — Five Format Types, Five Channel Types, Decision Matrices (Format × Goal × Audience, Channel × Goal × Audience), Five Proactive Modes, Reactive Storytelling, Confidence Building, Culture Navigation, Inception Framework |
| `template.md` | Copy-paste-ready markdown template with culture assessment, audience-delivery matrix, format/channel plans, pre-sell execution, reactive preparation, delivery timeline |
| `examples.md` | 6 real-world case studies (GoDaddy, PandaDoc, BILL, Spotify, Amazon) plus anti-patterns |

## Process

### Step 1: Define the Communication Objective

If an argument is provided, use it as the initiative name. Otherwise ask the user:

1. **What initiative are you planning communication for?**
2. **What outcome does this communication plan serve?** (approval, alignment, launch announcement, team mobilization)
3. **How many distinct audiences need to receive this?**

If working within the LAFA project, read relevant files from `content/strategy/` for context.

### Step 2: Diagnose Company Culture

Read `framework.md` Section 8 for culture archetypes and navigation strategy.

Ask the user to assess:

| Factor | Options |
|--------|---------|
| **Format norm** | Presentation-heavy / Written-first / Transitional / Async-heavy |
| **Meeting culture** | Meeting-heavy (decisions in meetings) / Meeting-light (async decisions) / Mixed |
| **Subculture notes** | Any function-specific preferences? |
| **Your credibility level** | New to org (conform strictly) / Established (can deviate strategically) |

Determine the culture strategy: conform, supplement, or strategically deviate.

### Step 3: Build the Audience-Delivery Matrix

Read `framework.md` Sections 2-4 for format, channel, and decision matrices.

For each audience segment (from `/stakeholder-map` if available, or identified here):

1. **Goal** — What do you need from this audience? (Inform / Decide / Approve / Review)
2. **Format** — Cross-reference the Format × Goal × Audience matrix
3. **Channel** — Cross-reference the Channel × Goal × Audience matrix
4. **Proactive Mode** — Match the initiative phase to mode (see Step 4)
5. **Timing** — When in the sequence does this audience hear the story?

### Step 4: Assign Proactive Modes

Read `framework.md` Section 5 for mode profiles and lifecycle mapping.

Help the user match the initiative's current phase to the right mode per audience:

| Phase | Mode |
|-------|------|
| Discovery (exploring the problem) | Workshop |
| Planning (need approval) | Pre-Sell → Pitch |
| Execution (on track) | Inform |
| Execution (need mid-course decision) | Pitch + Pre-Sell |
| Post-launch | Report |

For Pre-Sell mode specifically: the pre-sell *level* per stakeholder (co-creation, feedback, advice, pre-read) comes from `/stakeholder-map`. Here, plan the *delivery execution* — when, where, and with what format.

### Step 5: Plan Pre-Sell Execution

Read `framework.md` Section 5 (Pre-Sell as Most Versatile Tool).

For each stakeholder being pre-sold:
- **Method** — Co-creation / Feedback / Advice / Pre-read
- **Format** — What will you bring? (draft document, conversation, presentation excerpt)
- **Channel** — Where? (1:1 meeting, email, coffee chat)
- **Timing** — When, and in what order?
- **Intelligence goals** — What do you need to learn from this conversation?

Design the sequence rationale: why this order? How does each conversation build momentum for the next?

### Step 6: Prepare for Reactive Moments

Read `framework.md` Section 6 for reactive situations and skills.

Help the user build a story kit:

**Elevator Pitch (30 seconds):** Compress the PRAA into 4 sentences — Problem, Result, Action, Ask.

**Talking Points (3-5):** The key arguments that survive without slides or documentation.

**Q&A Bank:** Prepare answers for the 5 universal questions:
1. How does this impact company/org goals?
2. How did you validate the opportunity?
3. What other options did you evaluate?
4. Why do we need to do this now?
5. How does this impact other work?

Plus 3 initiative-specific questions the user anticipates.

### Step 7: Build Confidence Plan

Read `framework.md` Section 7 for the Prepare-Practice-Feedback loop.

Help the user plan:
- **Prepare** — When will the story outline, talking points, and Q&A be ready?
- **Practice** — Who will they practice with? When?
- **Feedback** — Who is a trusted colleague for honest critique?
- **Room of Supporters** — Which pre-sold stakeholders will be supportive in the formal meeting?

### Step 8: Generate Communication Plan Document

Use `template.md` as the structural foundation. Fill in all sections. Refer to `examples.md` for tone and depth.

Ensure the document includes:
- Culture assessment
- Audience-delivery matrix (format + channel + mode per audience)
- Format and channel plans with logistics
- Pre-sell execution plan with sequencing
- Reactive preparation (elevator pitch, talking points, Q&A)
- Confidence preparation
- Delivery sequence timeline
- Post-delivery follow-up plan
- Quality check

### Step 9: Write File

Ask the user where to save, then write the markdown file.

## Related Skills

- **`/story-arc`** — Build the persuasive narrative content first, then plan delivery with comms-plan
- **`/stakeholder-map`** — Map who needs to hear the story and at what engagement level, then use comms-plan for execution
- **`/vision-narrative`** — For vision-specific communication; comms-plan can wrap any vision-narrative output in a delivery strategy

## Key Principle

> A brilliant narrative delivered through the wrong medium, in the wrong setting, at the wrong moment falls flat just as easily as a poorly structured one. Format, channel, mode, and timing are strategic decisions disguised as logistical ones — each choice shapes how deeply the audience engages, whether they formulate objections before discussing with you, and whether you can read the room in real time.
