---
name: prd
description: Generate an empowering product spec using the 11-section framework (heavy context, minimal implementation). Use when writing PRDs, feature specs, or product requirements.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[feature-name]"
---

# PRD — Empowering Product Spec Writer

Generate a product requirements document using the Empowering Product Specs framework developed by Sachin Rekhi (LinkedIn/Notejoy), Fareed Mosavat (Slack/Pixar), and Ravi Mehta (Tinder).

## Core Principle

**Heavy Context Investment + Minimal Implementation Ownership.** PMs direct their product like film directors — setting overall direction and creating space for team creativity, not controlling every decision.

## When to Use

- Writing a PRD for a new feature, improvement, redesign, or platform initiative
- Creating a feature spec that empowers engineering and design to make smart trade-offs
- Documenting product requirements with enough context for autonomous team decision-making

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | Complete theoretical framework — the Empowering Principle, all 11 sections with empowering vs. failure-mode guidance, iterative writing process |
| `template.md` | Copy-paste-ready markdown template with all 11 sections and descriptive placeholders |
| `examples.md` | Full case studies from Notejoy, LinkedIn Sales Navigator, and TripAdvisor with anti-patterns |

## Process

### Step 1: Gather Context

If an argument is provided, use it as the feature name. Otherwise, ask the user:

1. **What feature/product are you writing a PRD for?**
2. **What's the scope?** (new feature, improvement, redesign, platform)
3. **What's the company/product context?** (or read from project files if available)
4. **Is there an existing strategy doc, driver tree, or vision narrative?** (check for related skill outputs in the project)

If working within the LAFA project, read relevant files from `content/` to gather context automatically.

### Step 2: Build Context Sections (Invest Heavily Here)

Read `framework.md` for the full theoretical backing. Guide the user through each Context section with targeted questions. For each section, explain what "empowering" looks like vs. the two failure modes (too prescriptive, too high-level).

**Section 1: Opportunity**
- What problem are we solving?
- **Why are we prioritizing it now?** Which strategic lens does it advance? (Strategy / Vision / Customer / Business)
- What happens if we don't solve it?

**Section 2: Target Audience**
- Who specifically is this for? (The specific sub-audience for THIS feature, not the general product audience)
- What distinguishes them from other user segments?
- How do their needs differ from adjacent segments?

**Section 3: Customer Insights**
- What have we learned from users? (interviews, support tickets, usage data)
- What's **counterintuitive** about what we've learned? (differs from default assumption)
- What's **material**? (significantly changes problem definition or implementation)

**Section 4: Competitive Insights**
- How do direct competitors solve this?
- What about indirect alternatives (different category, same job)?
- Where have competitors failed? (differentiation opportunities)
- Any inspiration from cutting-edge companies in other industries?

**Section 5: Success Metrics**
- **Prioritized metrics:** The narrow subset to optimize for
- **Deprioritized metrics:** What we explicitly don't care about affecting
- **Guardrail metrics:** What must NOT worsen

### Step 3: Build Implementation Sections (Essential Details Only)

Read `framework.md` for guidance on keeping implementation loose and empowering.

**Section 6: Scope** — Bullet-point functional requirements (what, not how). Phase as Now / Next / Later.

**Section 7: Experience** — State design goals, not specific UI details. Design team should own this section.

**Section 8: Implementation Details** — Only technical details that significantly alter user experience. Leave algorithm/architecture to engineering.

**Section 9: Launch Plan** — Roll-out strategy (A/B test, beta, soft launch, phased). Rough user counts per phase and duration.

**Section 10: Investigative Metrics** — Plan for future data needs across Usage, Functionality, and UX categories.

**Section 11: FAQ** — Document contentious decisions with rationale. Key trade-offs and why each was resolved.

### Step 4: Generate the PRD

Read `template.md` and use it as the structural foundation. Fill in all sections based on the conversation. Refer to `examples.md` for inspiration on tone and depth.

### Step 5: Validate

Before finalizing, check:

- [ ] Opportunity states which strategic lens (Strategy/Vision/Customer/Business) the feature advances
- [ ] Target Audience is the specific sub-audience, not the general product audience
- [ ] Customer Insights include counterintuitive + material findings
- [ ] Competitive Insights identify differentiation opportunities, not just feature lists
- [ ] Success Metrics are categorized (prioritized / deprioritized / guardrail)
- [ ] Scope uses bullet points with Now/Next/Later phasing
- [ ] Experience states goals, not pixel-level details
- [ ] Implementation Details only cover UX-impacting decisions
- [ ] Launch Plan specifies rollout strategy with phases
- [ ] Investigative Metrics plan for future data needs
- [ ] FAQ documents contentious decisions

### Step 6: Write File

Ask the user where to save the PRD (suggest a reasonable default path), then write the final markdown file.
