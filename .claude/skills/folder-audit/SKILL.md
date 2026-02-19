---
name: folder-audit
description: Diagnose and improve file/folder organization against best-practice patterns.
allowed-tools: Read, Glob, Grep, AskUserQuestion, Task
argument-hint: "[target path or scope]"
---

# Folder Audit — File & Directory Organization Review

Analyze a target directory's file/folder structure, detect the project type and architecture, score organization quality across 6 categories, and propose concrete refactoring operations.

## Core Principle

**A well-organized codebase is a map — any engineer should be able to predict where a file lives without searching.** This skill makes structural quality visible by detecting the project's architecture pattern and scoring the folder layout against established conventions.

## When to Use

- Evaluating a new codebase you've joined or inherited
- Auditing folder structure before scaling the team
- Cleaning up after rapid prototyping
- Checking if a content/docs repo follows consistent conventions
- Preparing a directory restructuring proposal
- Reviewing monorepo workspace organization

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | 6 scoring categories (0-3 each, 18 max) with detection methods and reference structures per architecture type |
| `template.md` | Structured report template with detection summary, health score, findings, and refactoring table |
| `examples.md` | 3 worked examples — React SPA, Content repo, Monorepo — with before/after trees and scorecards |

## Process

### Phase 1: Detect — Identify Project Type

If an argument is provided, use it as the target path. Otherwise, ask the user what directory to audit.

Scan the target directory for config-file signals to detect the architecture:

| Signal | Architecture |
|--------|-------------|
| `turbo.json` or `pnpm-workspace.yaml` or `nx.json` or `lerna.json` | Monorepo |
| Multiple `package.json` in `apps/` + `packages/` | Monorepo (Turborepo/Nx) |
| `next.config.*` | Next.js (check App Router vs Pages Router) |
| `vite.config.*` + React plugin | Vite + React SPA |
| `angular.json` | Angular |
| `go.mod` + `cmd/` + `internal/` | Go standard layout |
| `Cargo.toml` + `src/lib.rs` or `src/main.rs` | Rust |
| `pyproject.toml` or `requirements.txt` | Python |
| `Gemfile` + `app/` + `config/` | Rails |
| `manage.py` + `apps/` or `myproject/settings.py` | Django |
| Python + `main.py` + `routers/` dir | FastAPI |
| `app.json` + `expo` in dependencies, or `_layout.tsx` | React Native / Expo |
| `next.config.*` or `vite.config.*` + `src/server/` alongside `src/app/` | Full-stack monolith |
| No framework config, only `.md` files | Content/docs repo |
| Only `.html` + `.js` + `.css`, no `package.json` with build tools | Vanilla HTML/JS (static site) |

Record: detected architecture, framework(s), language(s).

### Phase 2: Scan — Build Structural Profile

Use Glob to build the full file tree and collect metrics. This phase can use up to 2 parallel Explore agents for large directories (one for tree scan, one for naming analysis).

Collect:
- **File count per directory** — identify god folders (50+ files)
- **Max and average nesting depth** — flag paths > 4 levels deep
- **Naming convention distribution** — classify each file/folder name into kebab-case, camelCase, PascalCase, snake_case per extension type
- **Duplicate filenames** — same name appearing in multiple directories
- **Large files** — files > 500 lines (possible god files)
- **Orphaned configs** — config files for tools not in dependencies
- **Empty directories** — dirs with no files

### Phase 3: Audit — Score 6 Categories

Read `framework.md` and score each category 0-3 based on Phase 1 and Phase 2 data:

1. **Architecture Alignment** — Does the structure match the detected architecture type?
2. **Naming Consistency** — Do files/folders follow a single, language-appropriate convention?
3. **Organization Pattern** — Is the pattern (feature-based, layer-based, hybrid) applied consistently?
4. **Colocation & Proximity** — Are related files (tests, styles, types) close together?
5. **Duplication & Waste** — Are there duplicates, orphaned configs, god folders?
6. **Depth & Navigability** — Is nesting reasonable? Can a new contributor find things?

For each category, note specific findings with severity levels:
- **Critical** — Structural issues causing real friction or confusion
- **Warning** — Suboptimal patterns that will worsen with growth
- **Info** — Minor improvements, nice-to-haves

### Phase 4: Report — Generate Structured Report

Read `template.md` and produce the Folder Audit Report. Fill in all sections:
- Detection summary table
- Health score with per-category breakdown
- Findings grouped by severity
- Recommended refactorings table with specific rename/move/merge/split/delete operations
- Reference structure showing the ideal layout for this project type
- Strengths section (balanced assessment)

Read `examples.md` for reference on how to present findings clearly.

Ask the user where to save the report (suggest a reasonable default path), then write the final markdown file.

### Phase 5: Refactor — Propose Operations

Present the refactoring table to the user. Each operation is a concrete file system action:

| Action | Description |
|--------|-------------|
| `rename` | Change file/folder name to match convention |
| `move` | Relocate file/folder to correct location |
| `merge` | Combine two directories with overlapping purpose |
| `split` | Break a god folder into feature/topic subdirectories |
| `delete` | Remove orphaned, empty, or duplicate files |

**Do NOT execute any operations without explicit user approval.** Present the full table and wait for confirmation. The user may approve all, select specific operations, or modify the proposals.

## Output

A complete Folder Audit Report in markdown format. The document should:

- Start with detected architecture and framework context
- Score all 6 categories with specific evidence
- List findings by severity with exact paths
- Propose concrete refactoring operations (not vague suggestions)
- Include a reference structure for the detected project type
- Acknowledge strengths alongside weaknesses

## Quality Checklist

- [ ] Architecture type correctly detected from config signals
- [ ] All 6 categories scored with specific evidence
- [ ] Every finding has a severity level and exact path
- [ ] Naming convention analysis includes distribution percentages
- [ ] Refactoring table has concrete from/to paths
- [ ] Reference structure matches detected architecture type
- [ ] Strengths section included (balanced review)
- [ ] No operations executed without user approval

## Recommended Audit Cadence

| Frequency | Scope |
|-----------|-------|
| Per-PR | Automated Knip + lint (CI gate) |
| Weekly | Full Knip scan in CI — catch unused exports and dead files |
| Monthly | Folder depth + god files + naming drift review |
| Quarterly | Full audit — naming deep-dive, dependency freshness, dead code sweep |
