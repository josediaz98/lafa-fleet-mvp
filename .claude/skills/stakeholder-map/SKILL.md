---
name: stakeholder-map
description: Map stakeholders for an initiative, diagnose each one's context and needs, and design per-stakeholder influence approaches. Use when planning buy-in campaigns, navigating cross-functional dependencies, or preparing for leadership reviews.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[initiative-name]"
---

# Stakeholder Influence Strategy Builder

Map every stakeholder who must be aligned for your initiative to succeed, diagnose their context and needs using the 5-dimension model, and design a per-stakeholder influence approach — from pre-sell method to trust-building actions.

## When to Use

- Preparing for a leadership review or pitch meeting
- Launching a cross-functional initiative with multiple dependencies
- Navigating a politically complex approval process
- Building a communication plan for a major product decision
- Any time you need buy-in from more than 2-3 people

**Upstream:** Use `/story-arc` first to build your persuasive narrative, then `/stakeholder-map` to plan who hears it and how to influence them.

**For vision-specific socialization:** `/vision-narrative` includes a lightweight Stakeholder-Forum-Style section. Use this full `/stakeholder-map` skill when you need deeper per-stakeholder analysis beyond what vision-narrative covers.

## Supporting Files

| File | Contents |
|------|----------|
| `framework.md` | Complete theoretical framework — Influence Landscape mapping, 5-Dimension Diagnostic, Pre-Sell Spectrum, Ownership Gradient, Trust Triangle, content adaptation, lifecycle communication |
| `template.md` | Copy-paste-ready markdown template with stakeholder roster, profiles, pre-sell plan, team engagement, and timeline |
| `examples.md` | 6 real-world case studies (GoDaddy, Stripe, Figma) plus anti-patterns |

## Process

### Step 1: Define the Initiative and Needs

If an argument is provided, use it as the initiative name. Otherwise ask the user:

1. **What initiative are you mapping stakeholders for?**
2. **What's the primary outcome you need?** (approval, resources, alignment, dependencies removed, team execution)
3. **What's the timeline?** (When does the decision need to happen?)

If working within the LAFA project, read relevant files from `content/strategy/` for context.

### Step 2: Map the Influence Landscape

Read `framework.md` Section 2 for the full mapping methodology.

Guide the user to identify every stakeholder:

**Leadership:** Ask: "Who are the most opinionated leaders who most directly control the approval and resourcing of this initiative?"
- Start with the org chart: direct management chain + leaders of dependent teams
- Identify gatekeepers vs. informed-only leaders

**Team:** Ask: "Who will directly do the work? Who must you work with daily?"
- List by function: engineering, design, research, product marketing, etc.

**Dependent Stakeholders:** Ask: "What do you need that you don't explicitly control?"
- Run dependency mapping: for each epic/workstream, which teams must contribute or unblock?
- Assign DACI roles across the landscape

### Step 3: Diagnose Each Stakeholder (5 Dimensions)

Read `framework.md` Section 4 for the full diagnostic model.

For each high-importance stakeholder, work through:

1. **Context** — What pressures are they under right now?
2. **Goals** — What are they trying to achieve this quarter?
3. **Relationship to Story** — Involved, Informed, or Invisible?
4. **Relationship to You** — Trust level? Working history? Existing tensions?
5. **Communication Style** — How do they prefer to receive information?

Also assess: **Current stance** — Supportive, Neutral, or Opposed?

For any dimension where the user is unsure, suggest the Watch-Research-Ask-Test methods from `framework.md`.

### Step 4: Design Pre-Sell Strategy

Read `framework.md` Section 5 for the Pre-Sell Spectrum.

For each leadership and key stakeholder:

| Factor | Options |
|--------|---------|
| Importance | High (gatekeeper) / Medium / Low (informed) |
| Current stance | Supportive / Neutral / Opposed |
| → Method | Co-creation / Feedback / Advice / Pre-read |

Design the pre-sell sequence — who do you talk to first, and how does each conversation build momentum for the next?

### Step 5: Plan Team Engagement

Read `framework.md` Section 3 (Teams) and `examples.md` for inception examples.

Ask the user:
- How much context does the team already have? (Involved / Informed / Invisible)
- Is this initiative large enough for a formal inception workshop?
- What does each function need to know to execute well?

Design the team engagement approach: inception workshop, team briefing, or 1:1 onboarding.

### Step 6: Adapt Content per Audience

Read `framework.md` Section 8 for content adaptation guidance.

Help the user customize the story emphasis for each audience type:
- **Leadership:** Lead with strategic alignment + quantified ask
- **Teams:** Lead with mission/purpose + execution impact
- **Stakeholders:** Lead with goal alignment + specific dependency ask

### Step 7: Build Trust Strategy

Read `framework.md` Section 7 for the Trust Triangle.

For each key stakeholder, identify:
- Trust direction: Upward (leadership), Lateral (team), or Outward (stakeholder)
- Trust currency: Competence, Authenticity, or Reciprocity
- Specific trust-building action

### Step 8: Generate Stakeholder Map Document

Use `template.md` as the structural foundation. Fill in all sections. Refer to `examples.md` for tone and depth.

Ensure the document includes:
- Complete stakeholder roster with DACI roles
- 5-dimension profiles for all high-importance stakeholders
- Pre-sell plan with sequencing
- Team engagement plan
- Content adaptation per audience
- Trust-building actions
- Engagement timeline

### Step 9: Write File

Ask the user where to save, then write the markdown file.

## Related Skills

- **`/story-arc`** — Build the persuasive narrative first, then map stakeholders
- **`/comms-plan`** — After mapping stakeholders, plan the delivery: format, channel, proactive mode, and sequence
- **`/vision-narrative`** — For vision-specific socialization, includes a lightweight Stakeholder-Forum-Style section

## Key Principle

> People naturally support ideas they believe are their own. Every engagement decision — from co-creation to pre-read, from inception to briefing — is a choice about how much ownership to create. More participation produces more ownership produces more committed support. Aim for the highest ownership level that time and relationship allow.
