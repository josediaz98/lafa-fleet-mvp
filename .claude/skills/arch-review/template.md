# Architecture Review Report Template

Use this template to generate the final report. Replace all `{placeholders}` with actual content.

---

```markdown
# Architecture Review: {project_or_module_name}

**Date:** {YYYY-MM-DD}
**Scope:** {File | Module | Codebase} — `{path_reviewed}`
**Reviewer:** Claude (arch-review skill)
**Context:** {greenfield | prototype | production | legacy}

---

## 1. Overview

| Metric | Value |
|--------|-------|
| Files analyzed | {count} |
| Estimated LOC | {count} |
| Languages | {list} |
| Frameworks | {list} |
| Tech stack | {summary} |

**Scope description:** {1-2 sentences describing what was reviewed and why.}

---

## 2. Health Score

| Category | Score | Rating |
|----------|-------|--------|
| SOLID Principles | {0-20} | {Excellent/Good/Fair/Poor/Critical} |
| Design Principles | {0-20} | {Excellent/Good/Fair/Poor/Critical} |
| Architecture Patterns | {0-20} | {Excellent/Good/Fair/Poor/Critical} |
| Code Quality Signals | {0-20} | {Excellent/Good/Fair/Poor/Critical} |
| Modern Practices | {0-20} | {Excellent/Good/Fair/Poor/Critical} |
| **Overall** | **{0-100}** | **{Excellent/Good/Fair/Poor/Critical}** |

---

## 3. Architecture Diagram

{Text-based diagram showing component relationships, dependency direction, and layer boundaries. Mark problem areas with ⚠️.}

```
┌─────────────────────────────────┐
│         Presentation            │
│  {components, pages, routes}    │
├─────────────────────────────────┤
│       Application Logic         │
│  {services, controllers, hooks} │
├─────────────────────────────────┤
│          Domain/Core            │
│  {models, business rules}       │
├─────────────────────────────────┤
│        Infrastructure           │
│  {DB, APIs, external services}  │
└─────────────────────────────────┘
```

---

## 4. Findings

### Critical — Must Fix

{Repeat this block for each critical finding. Remove section if none.}

#### C{n}: {Finding title}

- **Principle:** {SOLID/DRY/YAGNI/KISS/SoC/etc.}
- **Location:** `{file_path}:{line_number}`
- **Description:** {What the violation is and why it's critical.}
- **Impact:** {What happens if not fixed — bugs, scaling issues, security, etc.}
- **Fix:** {Specific, actionable suggestion.}
- **Effort:** {S | M | L | XL}

---

### Warning — Should Fix

{Repeat this block for each warning finding. Remove section if none.}

#### W{n}: {Finding title}

- **Principle:** {principle violated}
- **Location:** `{file_path}:{line_number}`
- **Description:** {What the violation is.}
- **Impact:** {What worsens over time if not addressed.}
- **Fix:** {Specific suggestion.}
- **Effort:** {S | M | L | XL}

---

### Info — Nice to Fix

{Repeat this block for each info finding. Remove section if none.}

#### I{n}: {Finding title}

- **Principle:** {principle}
- **Location:** `{file_path}:{line_number}`
- **Description:** {What could be improved.}
- **Fix:** {Suggestion.}
- **Effort:** {S | M | L | XL}

---

## 5. Recommendations

Prioritized action items ordered by impact (critical first, then quick wins).

| # | Action | Severity | Effort | Finding | Expected Impact |
|---|--------|----------|--------|---------|-----------------|
| 1 | {action description} | {C/W/I} | {S/M/L/XL} | {C1, W2, etc.} | {what improves} |
| 2 | {action description} | {C/W/I} | {S/M/L/XL} | {ref} | {impact} |
| ... | | | | | |

### Quick Wins (Effort: S)

{List recommendations with effort S that can be done immediately.}

### Planned Improvements (Effort: M-L)

{List recommendations that should be scheduled into sprints.}

### Strategic Refactors (Effort: XL)

{List major architectural changes that need planning and phasing.}

---

## 6. Strengths

{Balanced review — what the codebase does well. 3-6 bullet points.}

- **{Strength 1}** — {description of what's done well and why it matters}
- **{Strength 2}** — {description}
- **{Strength 3}** — {description}

---

## 7. Summary

{2-3 sentence executive summary. Overall health, most critical issue, and recommended first action.}

The {project/module} scores **{score}/100 ({rating})** overall. {Key strength or positive note.} The most pressing issue is {critical finding summary}, which should be addressed {timeframe}. {Optional: forward-looking note about trajectory if recommendations are followed.}
```
