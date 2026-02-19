Read the last 10 git commits using:

```
git log --format="%h %ad %s" --date=format:"%m/%d %H:%M" -10
```

Then read uncommitted changes with `git diff` and `git status`.

## Output Format

### 1. Summary Header

Two plain lines — no box borders:

```
CATCHUP · {N} commits · {Mon DD}
{Type} ×{n} · {Type} ×{n} · ...
```

Order work-types by count descending. Omit types with zero commits.

### 2. Commit Table (newest first)

One line per commit in a fixed-width table:

```
  HASH     TIME   TYPE     CHANGE
  56249f9  03:59  Quality  Redesign login + forgot password flow
  f0c833c  03:59  Debt     Expand quality work-type for UX/UI
  ede55e8  03:53  Feature  Sidebar footer → Linear quiet pattern
```

- **HASH** — 7-char short hash
- **TIME** — HH:MM only (drop date if all commits are same day; show MM/DD HH:MM if multi-day)
- **TYPE** — Abbreviated: Feature, Growth, Quality, Debt, Scale, Know (5 chars max)
- **CHANGE** — Subject line without the `type(scope):` prefix. Trim to ~50 chars if needed.

Align columns with consistent spacing.

### 3. WIP Section

```
  ── WIP ──────────────────────────────────────────────
  • {file path} ({status: M/A/D/??})
```

Show uncommitted changed files from `git status` and `git diff`.

### 4. Next Section

```
  ── Next ─────────────────────────────────────────────
  1. {Inferred next step}
  2. {Inferred next step}
```

Infer 2-3 likely next actions from recent commits and WIP.

## Work-Type Classification

Classify each commit using conventional commit prefix:
- feat → Feature | Growth (if acquisition/activation/retention related)
- fix, test, style (UX/UI) → Quality
- refactor, style, chore → Debt
- perf, ci, build → Scale
- docs → Know

If the commit has a `Work-Type:` trailer, use that value directly.

Abbreviate for the TYPE column: Knowledge → Know. All others fit as-is.
