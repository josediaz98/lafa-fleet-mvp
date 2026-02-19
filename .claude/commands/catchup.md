Read the last 20 git commits with `git log --oneline --format="%h %ad %s" --date=format:"%m/%d %H:%M" -20`, then read uncommitted changes with `git diff` and `git status`. Summarize:

1. What changed recently (committed work)
2. What is in-progress (uncommitted changes)
3. What likely needs attention next

Use a table for commits with columns: Date, Hash, Message, Work Type.

Classify each commit into a Reforge work type based on the conventional commit prefix:
- feat → Feature | growth (if acquisition/activation/retention related)
- fix, test → Quality
- refactor, style, chore → Debt
- perf, ci, build → Scale
- docs → Knowledge

If the commit has a `Work-Type:` trailer, use that value directly.

Be concise.
