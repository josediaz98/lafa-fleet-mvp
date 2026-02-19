---
name: arch-review
description: Review codebase architecture and assess adherence to SWE principles (SOLID, DRY, YAGNI, KISS, etc.). Generates a structured report with findings, severity levels, and actionable recommendations.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[scope: file, module, or full codebase]"
---

# Arch Review — Architecture & SWE Principles Review

Analyze codebase architecture against software engineering principles and generate a structured report with findings classified by severity, a health score, and actionable recommendations.

## Core Principle

**Good architecture is invisible — you only notice it when it's wrong.** This skill makes architecture quality visible by systematically evaluating code against established SWE principles (SOLID, DRY, YAGNI, KISS, SoC, etc.) and producing an objective, balanced assessment.

## When to Use

- Reviewing a module or file before a major refactor
- Assessing overall codebase health before scaling the team
- Evaluating a new codebase you've inherited or joined
- Checking adherence to principles after rapid prototyping
- Preparing an architecture improvement roadmap
- Reviewing PR-level changes for architectural impact

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | 60+ checkpoints across 5 categories — SOLID, Design Principles, Architecture Patterns, Code Quality Signals, Modern Practices |
| `template.md` | Structured report template with severity classification, health scoring, and recommendation format |
| `examples.md` | Good vs bad architecture examples with code snippets, anti-patterns, and positive reference architectures |

## Process

### Step 1: Determine Scope

If an argument is provided, use it as the scope. Otherwise, ask the user:

1. **What do you want reviewed?**
   - **File** — Single file deep-dive (all 5 categories applied to one file)
   - **Module** — Directory/package review (inter-file relationships, module boundaries)
   - **Codebase** — Full architecture review (system-level patterns, cross-cutting concerns)

2. **Is there a specific concern?** (performance, maintainability, scaling readiness, onboarding difficulty)

3. **What's the context?** (greenfield, legacy, rapid prototype, production system)

### Step 2: Scan Structure

Use Glob and Grep to build a mental model of the codebase:

- **File organization** — directory structure, naming conventions, file count per directory
- **Entry points** — main files, index files, route definitions, exports
- **Tech stack** — package.json, requirements.txt, go.mod, Cargo.toml, etc.
- **Configuration** — env files, config patterns, build tools
- **Size signals** — largest files (potential God Objects), deepest nesting
- **Dependency graph** — imports/requires between modules

Record: total files, LOC estimate, languages detected, frameworks identified.

### Step 3: Apply 5-Category Checklist

Read `framework.md` and systematically evaluate the code against all 5 categories:

1. **SOLID Principles** — SRP, OCP, LSP, ISP, DIP
2. **Design Principles** — DRY, YAGNI, KISS, SoC, Law of Demeter, POLA
3. **Architecture Patterns** — layers, boundaries, cohesion, coupling, data flow
4. **Code Quality Signals** — complexity, coupling metrics, cohesion, code smells
5. **Modern Practices** — 12-Factor adherence, error handling, testing, dependencies

For each checkpoint, note:
- **Status** — Pass / Violation found / Not applicable
- **Location** — file:line where the violation occurs
- **Evidence** — specific code pattern that triggers the finding

### Step 4: Classify Findings

Group all violations by severity:

| Severity | Criteria | Action |
|----------|----------|--------|
| **Critical** | Causes bugs, data loss, security issues, or blocks scaling. Architectural debt that compounds. | Must fix — blocks progress |
| **Warning** | Reduces maintainability, increases cognitive load, slows development. Will become critical under growth. | Should fix — plan for next sprint |
| **Info** | Suboptimal but functional. Style issues, minor improvements, nice-to-haves. | Nice to fix — address opportunistically |

### Step 5: Generate Architecture Diagram

Create a text-based diagram showing:
- Component/module relationships
- Dependency direction (arrows)
- Layer boundaries
- Data flow paths
- Problem areas highlighted with markers

Use simple ASCII or markdown formatting — no external tools needed.

### Step 6: Produce Recommendations

For each finding, provide:
- **What to change** — specific, actionable description
- **Why it matters** — principle violated and consequence of not fixing
- **How to fix** — suggested approach (not full implementation)
- **Effort estimate** — S (< 1 hour), M (1-4 hours), L (4-16 hours), XL (> 16 hours)

Prioritize recommendations by: Critical first, then by effort (quick wins before large refactors).

### Step 7: Calculate Health Score

Score each category 0-20 based on checkpoint pass rate and severity of violations:

| Score | Rating | Meaning |
|-------|--------|---------|
| 16-20 | Excellent | Few or no violations, strong patterns |
| 12-15 | Good | Minor issues, solid foundation |
| 8-11 | Fair | Several warnings, some structural concerns |
| 4-7 | Poor | Critical violations, significant debt |
| 0-3 | Critical | Fundamental architecture problems |

**Overall Health = sum of 5 categories (0-100)**

| Overall | Rating |
|---------|--------|
| 80-100 | Excellent |
| 60-79 | Good |
| 40-59 | Fair |
| 20-39 | Poor |
| 0-19 | Critical |

### Step 8: Write Report

Read `template.md` and produce the Architecture Review Report. Include all sections. Read `examples.md` for reference on how to describe findings clearly.

Ask the user where to save the report (suggest a reasonable default path), then write the final markdown file.

## Output

A complete Architecture Review Report in markdown format. The document should:

- Be balanced — acknowledge strengths alongside weaknesses
- Be specific — every finding references a file:line location
- Be actionable — every recommendation includes a concrete fix suggestion
- Be prioritized — critical issues surface first, with effort estimates
- Include a health score for tracking improvement over time

## Quality Checklist

- [ ] Scope is clearly defined (file / module / codebase)
- [ ] All 5 categories evaluated with specific checkpoints
- [ ] Every finding has severity, location, and fix suggestion
- [ ] Architecture diagram shows component relationships
- [ ] Health score calculated with per-category breakdown
- [ ] Recommendations prioritized by severity then effort
- [ ] Strengths section included (balanced review)
- [ ] Report is self-contained and actionable
