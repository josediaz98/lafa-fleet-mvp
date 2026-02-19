# shared/

Shared business rules consumed by both `fleet-intelligence/` (frontend) and `server/` (backend).

## Contract

| File | Format | Consumers |
|------|--------|-----------|
| `payroll-rules.js` | CommonJS (`module.exports`) | `server/payroll-close.js` via `require('../shared/payroll-rules')` |
| `payroll-rules.d.ts` | TypeScript declarations | `fleet-intelligence/` via `@shared/payroll-rules` (Vite alias) |

## Rules

1. **Pure functions only.** No I/O, no framework deps, no side effects.
2. **Primitive parameters.** Both TypeScript (frontend) and plain JS (backend) must be able to call every function.
3. **CommonJS format.** The backend (`server/`) uses `require()` — keep `module.exports`.
4. **Type declarations required.** Every exported function must have a corresponding `.d.ts` entry.

## How imports work

- **Frontend:** `@shared/` alias defined in `fleet-intelligence/vite.config.ts` and `fleet-intelligence/tsconfig.json`.
- **Backend:** Relative path `../shared/payroll-rules` from `server/`.
