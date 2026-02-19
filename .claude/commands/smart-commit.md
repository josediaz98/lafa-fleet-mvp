Review all staged and unstaged changes using `git diff` and `git diff --cached`, then `git status`.

Generate a conventional commit message following this format:
- Type: feat|fix|refactor|docs|style|test|chore|perf|ci|build
- Scope: the area of the codebase affected (e.g., fleet, site, payroll)
- Subject: imperative, lowercase, no period, under 72 chars
- Body (mandatory, 2-3 lines): provide relevant context — why this change was made, what problem it solves, and any important details (tradeoffs, scope decisions, dependencies). Always include a body — it feeds into `/catchup` reporting.

Classify the work using the Reforge product work taxonomy and add a `Work-Type` trailer:
- feature — new capabilities or user-facing functionality
- growth — acquisition, activation, engagement, or retention improvements
- scale — infrastructure, performance, CI/CD, deployment, reliability
- debt — refactoring, cleanup, code style, dependency updates
- quality — bug fixes, tests, error handling
- knowledge — documentation, research, READMEs

Stage all relevant files (exclude .env, credentials, large binaries) and create the commit.

End the commit message with:
Work-Type: <category>
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
