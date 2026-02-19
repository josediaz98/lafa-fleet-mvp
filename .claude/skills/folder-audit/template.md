# Folder Audit Report Template

Use this template to produce the final audit report. Replace all `{placeholders}` with actual values.

---

# Folder Audit: {target_path}

## Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | {detected_architecture} |
| Framework | {detected_framework} |
| Language(s) | {languages} |
| Organization Pattern | {feature-based / layer-based / hybrid / framework-driven / page-based} |
| Total files | {file_count} |
| Total directories | {dir_count} |
| Max depth | {max_depth} levels |
| Avg depth | {avg_depth} levels |
| Dominant naming convention | {convention} |

## Health Score: {total}/18 — {rating}

| # | Category | Score | Notes |
|---|----------|-------|-------|
| 1 | Architecture Alignment | {n}/3 | {one-line summary} |
| 2 | Naming Consistency | {n}/3 | {one-line summary} |
| 3 | Organization Pattern | {n}/3 | {one-line summary} |
| 4 | Colocation & Proximity | {n}/3 | {one-line summary} |
| 5 | Duplication & Waste | {n}/3 | {one-line summary} |
| 6 | Depth & Navigability | {n}/3 | {one-line summary} |

## Findings

### Critical

{List each critical finding. If none, write "None."}

- **[CRITICAL]** `{path}` — {description of the issue and why it matters}

### Warning

{List each warning. If none, write "None."}

- **[WARNING]** `{path}` — {description of the issue and why it matters}

### Info

{List each info finding. If none, write "None."}

- **[INFO]** `{path}` — {description and optional suggestion}

## Naming Convention Distribution

| Convention | Count | % | Expected For |
|------------|-------|---|-------------|
| kebab-case | {n} | {%} | {file types where expected} |
| PascalCase | {n} | {%} | {file types where expected} |
| camelCase | {n} | {%} | {file types where expected} |
| snake_case | {n} | {%} | {file types where expected} |
| other | {n} | {%} | — |

{Include per-directory breakdown only if there are inconsistencies worth noting.}

## Directory Size Distribution

| Directory | Files | Status |
|-----------|-------|--------|
| {path} | {n} | {Healthy / Monitor / Warning / Critical} |

{Only include directories with Warning or Critical status, or the top 5 largest.}

## Recommended Refactorings

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 1 | {rename/move/merge/split/delete} | `{current_path}` | `{proposed_path}` | {why this improves the structure} |
| 2 | ... | ... | ... | ... |

{Order by impact: critical fixes first, then quick wins, then larger restructuring.}

## Reference Structure

{Show the ideal directory tree for this project's detected architecture type. Use the reference from framework.md, adapted to this project's specific features/modules.}

```
{proposed_tree}
```

## Recommended Tooling

{Include only if the project would benefit from automated enforcement. Omit for content/docs repos.}

| Tool | Purpose | Setup |
|------|---------|-------|
| {tool} | {what it catches} | {one-line install/config} |

## Strengths

{List 2-5 things the project does well. Be specific and genuine — not filler.}

- {Strength 1}
- {Strength 2}
- {Strength 3}
