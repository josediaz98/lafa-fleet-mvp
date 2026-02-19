Review all staged and unstaged changes using `git diff` and `git diff --cached`, then `git status`.

Generate a conventional commit message following this format:
- Type: feat|fix|refactor|docs|style|test|chore
- Scope: the area of the codebase affected (e.g., fleet, site, payroll)
- Subject: imperative, lowercase, no period, under 72 chars
- Body: brief "why" explanation if the change isn't obvious

Stage all relevant files (exclude .env, credentials, large binaries) and create the commit.

End the commit message with:
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
