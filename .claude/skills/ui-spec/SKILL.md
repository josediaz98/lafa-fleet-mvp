---
name: ui-spec
description: Generate a premium UI specification for a feature, page, or component. Anchored in LAFA's design system and Linear/Slack/Notion design principles.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[feature-or-component-name]"
---

# UI Spec — Premium UI Specification Writer

Generate a detailed, implementation-ready UI specification anchored in LAFA's design system tokens, existing components, and premium design principles from Linear, Slack, and Notion.

## Core Principle

**LAFA has no designer — Claude IS the designer.** The bottleneck is not reviewing existing UI but specifying with precision what to build before coding. This skill codifies premium design principles within LAFA's design system and produces specs that Claude can implement directly.

## When to Use

- Designing a new page or feature for fleet-intelligence
- Specifying a new component or component variant
- Redesigning an existing page or interaction flow
- Adding a significant UI section to an existing page
- Any work where "what should this look like and behave like?" needs answering before code

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | 10 premium design principles, LAFA design system reference, Reforge-adapted specification process |
| `template.md` | 8-section spec template with all required fields |
| `examples.md` | 2 worked examples — one page-level (Vehicle Detail Page), one component-level (Shift Assignment Card) |

## Process

### Step 1: Understand — Read Existing Codebase

Before designing anything, anchor in what exists:

1. **Design tokens** — Read `fleet-intelligence/tailwind.config.ts` for current color, spacing, typography tokens
2. **Existing components** — Glob `fleet-intelligence/src/components/ui/*.tsx` to know what's reusable
3. **Related pages** — Read any existing page in the same feature area (`fleet-intelligence/src/features/`)
4. **Types** — Read relevant type definitions (`fleet-intelligence/src/types/`) for data shape
5. **Status system** — Read `fleet-intelligence/src/lib/status-map.ts` for status colors and labels

Record: what components exist, what patterns are established, what data is available.

### Step 2: Soul — Define the Core Purpose

Ask (or derive from context): **What is the ONE thing this UI must accomplish?**

This is adapted from Reforge's "soul of the project." Write it as a single sentence. Everything in the spec must serve this sentence. If a component or section doesn't serve the soul, cut it.

Examples:
- "Let ops coordinators see which vehicles need attention right now"
- "Let admins close the weekly payroll with confidence in the numbers"
- "Let supervisors assign drivers to shifts in under 30 seconds"

### Step 3: Diverge — Sketch 2-3 Approaches

Generate 2-3 approaches as text descriptions (not wireframes). Each should be a fundamentally different take — not variations on the same layout.

For each approach, describe:
- Layout strategy (single page vs. tabs vs. master-detail)
- Information hierarchy (what's primary, secondary, tertiary)
- Key interaction pattern (direct manipulation, modal workflow, inline editing)

Spend ~10% of total effort here. The goal is to consider alternatives, not to polish them.

### Step 4: Converge — Select and Justify

Select one approach. Justify against the 10 premium principles from `framework.md`:
- Which principles does this approach best serve?
- Which principles require extra attention during specification?
- What trade-offs are we making and why?

If the choice is unclear, use AskUserQuestion to present the options to the user.

### Step 5: Specify — Fill the Template

Read `template.md` and fill every section:

1. **Soul** — From Step 2
2. **Context** — Goal type, appetite, primary user, key scenario
3. **Layout** — ASCII layout or structured description, responsive breakpoints
4. **Components** — Per component: type, variants, states, interactions
5. **States & Transitions** — Page-level states, transition specs
6. **Copy Sheet** — All text in Spanish (primary) + English (if bilingual)
7. **Accessibility** — Tab order, keyboard shortcuts, ARIA labels
8. **Open Questions** — Unresolved decisions

Reference existing components from `fleet-intelligence/src/components/ui/` when possible. Use `lafa.*` tokens for all colors. Use `status.*` tokens for all status colors.

Read `examples.md` for reference on depth and specificity.

### Step 6: Validate — Quality Gate

Run the spec through the 10-principle checklist from `framework.md`:

- [ ] **Speed as Trust** — Optimistic updates specified? Skeleton screens for loading?
- [ ] **Opinionated Defaults** — Smart defaults pre-configured? No unnecessary customization?
- [ ] **Progressive Disclosure** — Information layered? KPIs → detail → history?
- [ ] **Typography-Driven Hierarchy** — Inter Tight scale used? Weight/size for hierarchy, not borders?
- [ ] **Restrained Color** — Color only for status, actions, errors? `lafa.*` tokens used?
- [ ] **State Completeness** — Every element has: empty, loading, error, populated, hover, focus, disabled?
- [ ] **Copy Precision** — All labels, placeholders, errors, empty states specified? Spanish-first?
- [ ] **Spatial Rhythm** — 4px base grid? Consistent padding patterns?
- [ ] **Keyboard Accessibility** — Tab order defined? Focus management? Shortcuts for power users?
- [ ] **Content-First Chrome** — Data is the UI? Minimal sidebar/header weight?

Fix any failures before delivering.

### Step 7: Write File

Ask the user where to save the spec (suggest `content/strategy/ui-specs/` or a reasonable default), then write the final markdown file.

## Output

A complete UI specification in markdown format. The document should:

- Be implementable — Claude can build directly from this spec without further questions
- Be anchored — references real LAFA tokens, components, types, and data
- Be premium — passes the 10-principle checklist
- Be complete — every state, every label, every interaction specified
- Be scannable — tables, ASCII layouts, structured sections

## Quality Checklist

- [ ] Soul is one sentence that defines the core purpose
- [ ] Layout uses existing page patterns or justifies deviation
- [ ] All components reference existing `ui/` components or spec new ones completely
- [ ] Every component has 6 states: empty, loading, error, populated, hover, disabled
- [ ] Copy sheet has all labels in Spanish
- [ ] Color usage limited to `lafa.*` and `status.*` tokens
- [ ] 10-principle validation checklist passes
- [ ] Responsive behavior specified (desktop, tablet, mobile)
