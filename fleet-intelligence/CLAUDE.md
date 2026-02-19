# Fleet Intelligence MVP

React 18 + TypeScript + Vite 6 SPA for fleet operations and payroll. See root CLAUDE.md for commands, env vars, and deployment. See `.claude/rules/fleet-intelligence.md` for strict coding rules (TypeScript, service layer, status enums, tokens).

## src/ Directory Roles

| Directory | Owns | Example |
|-----------|------|---------|
| `app/` | Entry point, App.tsx (router), providers (AppProvider, ToastProvider) | `App.tsx` defines all routes |
| `components/` | Shared UI: `layout/` (AppLayout, Sidebar) + `ui/` (Modal, StatusBadge, etc.) | Reusable UI components |
| `features/` | Feature modules — one dir per domain (8 total, singular names) | `payroll/`, `driver/`, `shift/` |
| `lib/` | Service layer, utils, hooks, Supabase client + queries/mutations | `actions/` (domain files + barrel) is the entry point |
| `types/` | Domain types, AppState, Action union — single source in `shared.ts` | Import types from `@/types` |
| `data/` | Business constants (`constants.ts`) + dev seed data (`dev-seed.ts`) | `CENTERS` used across app, seed only in AppProvider |

## Feature Module Pattern

Each feature in `features/` follows this structure:

```
feature-name/
├── FeatureNamePage.tsx      ← Main page component (default export)
├── components/              ← Feature-specific sub-components (optional)
├── lib/                     ← Business logic + tests (optional)
│   ├── logic.ts
│   └── __tests__/
└── index.ts                 ← Barrel: re-exports page + public functions
```

Barrel exports enable `import { PayrollPage, calculateWeeklyPay } from '@/features/payroll'`.

## Routing

React Router v6 with basename from `BASE_URL` (`/fleet-intelligence/` in production). Routes defined in `app/App.tsx`:

| Path | Feature | Guard |
|------|---------|-------|
| `/login` | auth | None |
| `/forgot-password` | auth | None |
| `/reset-password` | auth | None |
| `/accept-invite` | auth | None |
| `/dashboard` | dashboard | RequireAuth |
| `/shifts` | shift | RequireAuth |
| `/drivers` | driver | RequireAuth |
| `/vehicles` | vehicle | RequireAuth |
| `/payroll` | payroll | RequireAuth |
| `/csv-upload` | csv-upload | RequireAuth + RequireAdmin |
| `/users` | user | RequireAuth + RequireAdmin |

All routes except auth are nested inside `RequireAuth` via `AppLayout`. `RequireAdmin` wraps individual routes within that layout. `RequireAuth` redirects to `/login`. `RequireAdmin` redirects to `/dashboard`.

## Data Flow

```
Page → action*() (lib/actions/) → supabase/{queries/,mutations.ts} → Supabase
                                   ↘ dispatch() → AppState (context)
```

- **Never call dispatch or Supabase directly from pages** — always go through `action*()`.
- Actions handle: optimistic UI update → persist to Supabase → error toast on failure.
- `supabase/queries/` = read operations (hydrate, paginated, csv + barrel). `supabase/mutations.ts` = write operations (persist*).

## Adding a New Feature

1. Create `src/features/{name}/` with `{Name}Page.tsx` + `index.ts`
2. Add barrel export: `export { default as NamePage } from './NamePage'`
3. Add route in `app/App.tsx` inside the appropriate guard
4. Add sidebar link in `components/layout/Sidebar.tsx`
5. If it needs persistence: add `action*()` in `lib/actions/{domain}.ts` (re-export from barrel `index.ts`) + queries/mutations in `lib/supabase/`
6. If it has business logic: add `lib/` subfolder with tests
