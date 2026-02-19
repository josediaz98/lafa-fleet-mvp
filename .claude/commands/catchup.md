Read the last 20 git commits with full body using:

```
git log --format="──── %h %ad%n%s%n%b" --date=format:"%m/%d %H:%M" -20
```

Then read uncommitted changes with `git diff` and `git status`. Summarize:

1. What changed recently (committed work)
2. What is in-progress (uncommitted changes)
3. What likely needs attention next

Use a table for commits with columns: Date | Work Type | Hash | Key Updates | Description

- **Key Updates** = subject line without the type(scope): prefix (one-liner of what changed)
- **Description** = commit body (the 2-3 line context: why, tradeoffs, details). For older commits without a body, infer briefly from the subject or use "—".

Classify each commit into a Reforge work type based on the conventional commit prefix:
- feat → Feature | growth (if acquisition/activation/retention related)
- fix, test, style (UX/UI) → Quality
- refactor, style, chore → Debt
- perf, ci, build → Scale
- docs → Knowledge

If the commit has a `Work-Type:` trailer, use that value directly.

Be concise.
