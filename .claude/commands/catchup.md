Read the last 20 git commits with full body using:

```
git log --format="──── %h %ad%n%s%n%b" --date=format:"%m/%d %H:%M" -20
```

Then read uncommitted changes with `git diff` and `git status`.

## Output Format

### 1. Summary Box

Count commits per work-type and render a bordered header:

```
╔══════════════════════════════════════════════════════════╗
║  CATCHUP · {N} commits · {Mon DD}                       ║
║  {Type} ×{n} · {Type} ×{n} · ...                        ║
╚══════════════════════════════════════════════════════════╝
```

Order work-types by count descending. Omit types with zero commits.

### 2. Commit Cards (newest first)

Each commit is a 3-line block separated by a blank line:

```
  {hash}  {MM/DD HH:MM}  {Work-Type}
  {Key Updates}
  ↳ {Description — 1-2 lines max, wrapped/indented}
```

- **Key Updates** = subject line without the `type(scope):` prefix
- **Description** = commit body (why, tradeoffs, details). For commits without a body, infer briefly from the subject or use "—". Cap at ~2 lines. No fluff.
- Keep lines under ~60 chars for narrow terminals

### 3. In-Progress Section

```
  ── In-Progress ──────────────────────────────────────────
  • {file path} ({status: M/A/D/??})
```

Show uncommitted changed files from `git status` and `git diff`.

### 4. Next Section

```
  ── Next ─────────────────────────────────────────────────
  1. {Inferred next step}
  2. {Inferred next step}
```

Infer 2-3 likely next actions from recent commits and in-progress work.

## Work-Type Classification

Classify each commit using conventional commit prefix:
- feat → Feature | Growth (if acquisition/activation/retention related)
- fix, test, style (UX/UI) → Quality
- refactor, style, chore → Debt
- perf, ci, build → Scale
- docs → Knowledge

If the commit has a `Work-Type:` trailer, use that value directly.

Be concise. Description is max 2 lines — focus on *why*, not *what*.
