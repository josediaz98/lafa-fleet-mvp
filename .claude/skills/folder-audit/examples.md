# Folder Audit — Worked Examples

Three examples covering different project types. Each shows the before state, audit scorecard, findings, and proposed after state.

---

## Example 1: React SPA (Vite) — Layer-Based Anti-Pattern

### Context

A React + TypeScript + Vite SPA that grew from a small project to 200+ files. The original layer-based structure was never refactored. Team of 4 developers.

**Real-world references:** shadcn/ui uses kebab-case for all files. Cal.com uses feature-based structure (`apps/web/`, `packages/features/`) as the target pattern for large React SPAs.

### Before Tree

```
src/
├── components/           ← 80 files (god folder)
│   ├── LoginForm.tsx
│   ├── LoginButton.tsx
│   ├── DashboardHeader.tsx
│   ├── DashboardSidebar.tsx
│   ├── DashboardChart.tsx
│   ├── PaymentForm.tsx
│   ├── PaymentHistory.tsx
│   ├── PaymentReceipt.tsx
│   ├── UserProfile.tsx
│   ├── UserAvatar.tsx
│   ├── UserSettings.tsx
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   ├── ... (65 more)
├── hooks/                ← 25 files
│   ├── useAuth.ts
│   ├── useDashboard.ts
│   ├── usePayments.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── ... (20 more)
├── services/             ← 15 files
│   ├── authService.ts
│   ├── dashboardService.ts
│   ├── paymentService.ts
│   ├── userService.ts
│   ├── ... (11 more)
├── types/                ← 20 files
│   ├── auth.ts
│   ├── dashboard.ts
│   ├── payment.ts
│   ├── user.ts
│   ├── ... (16 more)
├── utils/                ← 30 files
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   ├── validateEmail.ts
│   ├── parseJWT.ts
│   ├── ... (26 more)
├── pages/                ← 12 files
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── PaymentsPage.tsx
│   └── ... (9 more)
├── context/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── PaymentContext.tsx
├── __tests__/            ← Mirrored test tree
│   ├── components/
│   │   ├── LoginForm.test.tsx
│   │   ├── PaymentForm.test.tsx
│   │   └── ... (15 more)
│   ├── hooks/
│   └── services/
├── App.tsx
└── main.tsx
```

### Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | React SPA (Vite) |
| Framework | React 18 + Vite |
| Language(s) | TypeScript |
| Organization Pattern | Layer-based |
| Total files | 210 |
| Total directories | 14 |
| Max depth | 3 levels |
| Dominant naming convention | PascalCase (components), camelCase (hooks/services) |

### Health Score: 7/18 — Needs Work

| # | Category | Score | Notes |
|---|----------|-------|-------|
| 1 | Architecture Alignment | 1/3 | Layer-based inappropriate for 200+ file project |
| 2 | Naming Consistency | 2/3 | Mostly consistent, camelCase services vs kebab-case expected |
| 3 | Organization Pattern | 1/3 | Layer-based with no feature boundaries; files from unrelated domains share directories |
| 4 | Colocation & Proximity | 0/3 | Mirrored `__tests__/`, types separated, hooks separated from features |
| 5 | Duplication & Waste | 1/3 | God folder (`components/` 80 files), `utils/` 30 files |
| 6 | Depth & Navigability | 2/3 | Max 3 levels, but navigating `components/` requires scrolling through 80 files |

### Findings

**Critical:**
- **[CRITICAL]** `src/components/` — 80 files in one directory. God folder mixing shared UI primitives with feature-specific components. Cannot find anything without search.
- **[CRITICAL]** `src/__tests__/` — Mirrored test tree. Tests are disconnected from source. When a file moves, its test silently breaks.

**Warning:**
- **[WARNING]** `src/utils/` — 30 files with no subdirectory structure. Mix of pure utilities (`formatDate`) and domain logic (`parseJWT` belongs in auth).
- **[WARNING]** `src/types/` — All types centralized. Feature-specific types should live with their features.
- **[WARNING]** `src/hooks/` — `useAuth.ts` and `useDashboard.ts` are feature-specific but live in a shared folder.
- **[WARNING]** `src/services/authService.ts` — camelCase file naming; React/TS convention is `kebab-case.ts` for non-component files.

**Info:**
- **[INFO]** `src/context/` — Only 3 files; could be colocated with their features.
- **[INFO]** No barrel files (`index.ts`) at feature boundaries — imports use deep paths.

### After Tree (Proposed)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LoginForm.test.tsx
│   │   │   └── LoginButton.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── auth-service.ts
│   │   ├── auth-context.tsx
│   │   ├── types.ts
│   │   └── index.ts           ← Public API barrel
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── DashboardChart.tsx
│   │   ├── hooks/
│   │   │   └── use-dashboard.ts
│   │   ├── dashboard-service.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── payments/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── payment-service.ts
│   │   ├── payment-context.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   └── users/
│       ├── components/
│       ├── user-service.ts
│       ├── types.ts
│       └── index.ts
├── shared/
│   ├── components/            ← Only truly shared: Button, Modal, Table
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   ├── hooks/                 ← Only generic: useDebounce, useLocalStorage
│   │   ├── use-debounce.ts
│   │   └── use-local-storage.ts
│   ├── lib/                   ← Pure utilities
│   │   ├── format-date.ts
│   │   └── format-currency.ts
│   └── types/                 ← Only cross-feature types
│       └── api.ts
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── theme-context.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── PaymentsPage.tsx
├── main.tsx
└── vite-env.d.ts
```

### Refactoring Operations

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 1 | split | `components/` | `features/{auth,dashboard,payments,users}/components/` | Eliminates god folder |
| 2 | move | `__tests__/**/*.test.tsx` | Adjacent to source files | Colocates tests |
| 3 | split | `utils/` | `shared/lib/` + feature-specific files | Separates domain from utility |
| 4 | move | `types/*.ts` | `features/*/types.ts` + `shared/types/` | Colocates feature types |
| 5 | move | `hooks/useAuth.ts` | `features/auth/hooks/use-auth.ts` | Colocates + fixes naming |
| 6 | rename | `services/authService.ts` | `features/auth/auth-service.ts` | kebab-case + colocated |
| 7 | move | `context/AuthContext.tsx` | `features/auth/auth-context.tsx` | Colocates context |
| 8 | delete | `__tests__/` | (removed) | Tests now live with source |

---

## Example 2: Content/Markdown Repo — Flat Chaos

### Context

A documentation repo with 40+ markdown files. Grew organically — files added at the root level with no organizational structure. Single author.

### Before Tree

```
docs/
├── Getting Started.md        ← Space in filename
├── installation.md
├── API-Reference.md          ← Mixed case with hyphen
├── apiExamples.md            ← camelCase
├── configuration.md
├── Configuration Guide.md    ← Duplicate topic + space
├── deployment.md
├── deployment-aws.md
├── deployment-gcp.md
├── deployment-docker.md
├── architecture.md
├── Architecture Overview.md  ← Duplicate
├── data-model.md
├── dataModel-v2.md           ← Version in filename
├── troubleshooting.md
├── FAQ.md
├── faq-billing.md
├── faq-technical.md
├── changelog.md
├── CHANGELOG.md              ← Duplicate (different case)
├── contributing.md
├── security.md
├── auth-oauth.md
├── auth-jwt.md
├── auth-saml.md
├── performance-tuning.md
├── caching.md
├── monitoring.md
├── alerting.md
├── logging.md
├── testing.md
├── testing-e2e.md
├── testing-unit.md
├── migrating-v1-v2.md
├── migrating-v2-v3.md
├── plugin-system.md
├── plugin-development.md
├── plugin-api.md
├── theme-customization.md
├── i18n.md
└── README.md                 ← Only navigation aid
```

### Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | Content/docs repo |
| Framework | None |
| Language(s) | Markdown |
| Organization Pattern | None (flat) |
| Total files | 40 |
| Total directories | 1 |
| Max depth | 1 level |
| Dominant naming convention | Mixed (kebab-case 60%, spaces 15%, camelCase 10%, UPPER 5%, mixed 10%) |

### Health Score: 4/18 — Critical

| # | Category | Score | Notes |
|---|----------|-------|-------|
| 1 | Architecture Alignment | 0/3 | Content repo with zero subdirectories — no topic hierarchy |
| 2 | Naming Consistency | 0/3 | 5 different conventions: kebab, spaces, camelCase, UPPER, mixed |
| 3 | Organization Pattern | 0/3 | No pattern — 40 files dumped in root |
| 4 | Colocation & Proximity | 1/3 | Related files (auth-*, deployment-*) share prefixes but not folders |
| 5 | Duplication & Waste | 1/3 | 3 duplicate topics, versioned filenames instead of updating in place |
| 6 | Depth & Navigability | 2/3 | Flat is navigable for small repos, but 40 files exceed the threshold |

### Findings

**Critical:**
- **[CRITICAL]** Root directory — 40 files with no subdirectory structure. Exceeds the 30-file threshold for flat layout.
- **[CRITICAL]** Naming — 5 different conventions mixed: `Getting Started.md` (spaces), `API-Reference.md` (Title-Hyphen), `apiExamples.md` (camelCase), `FAQ.md` (UPPER), `data-model.md` (kebab). Must standardize.
- **[CRITICAL]** `Architecture Overview.md` + `architecture.md` — Duplicate topic, unclear which is canonical.

**Warning:**
- **[WARNING]** `Configuration Guide.md` + `configuration.md` — Likely duplicates with different naming.
- **[WARNING]** `CHANGELOG.md` + `changelog.md` — Same file, different case. Will cause issues on case-sensitive filesystems.
- **[WARNING]** `dataModel-v2.md` — Version in filename. Should update `data-model.md` in place and use git history for versions.

**Info:**
- **[INFO]** `auth-oauth.md`, `auth-jwt.md`, `auth-saml.md` — Related files using prefix convention. Would benefit from an `auth/` subdirectory.
- **[INFO]** README.md exists but likely outdated given the organizational chaos.

### After Tree (Proposed)

```
docs/
├── README.md                      ← Updated navigation index
├── guides/
│   ├── getting-started.md
│   ├── installation.md
│   ├── configuration.md
│   ├── deployment/
│   │   ├── README.md              ← Deployment overview
│   │   ├── aws.md
│   │   ├── gcp.md
│   │   └── docker.md
│   ├── migration/
│   │   ├── v1-to-v2.md
│   │   └── v2-to-v3.md
│   └── troubleshooting.md
├── reference/
│   ├── api.md
│   ├── api-examples.md
│   ├── configuration.md
│   ├── plugin-api.md
│   └── data-model.md
├── concepts/
│   ├── architecture.md
│   ├── auth/
│   │   ├── oauth.md
│   │   ├── jwt.md
│   │   └── saml.md
│   ├── plugin-system.md
│   └── i18n.md
├── operations/
│   ├── monitoring.md
│   ├── alerting.md
│   ├── logging.md
│   ├── caching.md
│   └── performance-tuning.md
├── development/
│   ├── contributing.md
│   ├── testing.md
│   ├── testing-e2e.md
│   ├── testing-unit.md
│   ├── plugin-development.md
│   └── theme-customization.md
├── security.md
├── faq.md                         ← Merged from faq-billing + faq-technical
└── changelog.md
```

### Refactoring Operations

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 1 | rename | `Getting Started.md` | `guides/getting-started.md` | Fixes spaces + moves to guides/ |
| 2 | rename | `API-Reference.md` | `reference/api.md` | Standardizes naming + categorizes |
| 3 | rename | `apiExamples.md` | `reference/api-examples.md` | kebab-case + categorized |
| 4 | merge | `Architecture Overview.md` + `architecture.md` | `concepts/architecture.md` | Eliminates duplicate |
| 5 | merge | `Configuration Guide.md` + `configuration.md` | `guides/configuration.md` | Eliminates duplicate |
| 6 | delete | `CHANGELOG.md` | (keep `changelog.md` only) | Removes case-conflict duplicate |
| 7 | delete | `dataModel-v2.md` | (merge into `reference/data-model.md`) | Removes versioned filename |
| 8 | merge | `faq-billing.md` + `faq-technical.md` | `faq.md` (sections within) | Consolidates FAQs |
| 9 | move | `deployment-*.md` | `guides/deployment/{aws,gcp,docker}.md` | Groups related files |
| 10 | move | `auth-*.md` | `concepts/auth/{oauth,jwt,saml}.md` | Groups auth docs |

---

## Example 3: Monorepo (Turborepo) — Improper Workspace Structure

### Context

A Turborepo monorepo with 3 apps and shared packages. The structure has drifted from Turborepo conventions — nested packages, missing namespace scoping, shared code in wrong locations.

**Real-world references:** Cal.com uses `apps/` + `packages/` with `workspace:*` protocol for internal dependencies. Supabase structures packages in dependency layers (database → auth → storage → edge-functions). Both enforce flat `packages/` — no nesting.

### Before Tree

```
root/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   ├── package.json       ← name: "web"
│   │   └── tsconfig.json
│   ├── api/
│   │   ├── src/
│   │   ├── package.json       ← name: "api"
│   │   └── tsconfig.json
│   └── admin/
│       ├── src/
│       ├── package.json       ← name: "admin"
│       └── tsconfig.json
├── packages/
│   ├── shared/
│   │   ├── utils/             ← Nested package!
│   │   │   ├── package.json   ← name: "utils"
│   │   │   └── src/
│   │   ├── types/             ← Nested package!
│   │   │   ├── package.json   ← name: "types"
│   │   │   └── src/
│   │   └── package.json       ← name: "shared" (wrapper with no code)
│   ├── ui/
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── theme.ts       ← Theme config mixed with components
│   │   │   ├── eslintConfig.js ← ESLint config in UI package!
│   │   │   └── tsconfig.base.json ← TS config in UI package!
│   │   └── package.json       ← name: "ui"
│   └── config/                ← Empty, configs are in ui/
│       └── package.json       ← name: "config"
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

### Detection Summary

| Attribute | Value |
|-----------|-------|
| Architecture | Monorepo (Turborepo) |
| Framework | React (web, admin), Node.js (api) |
| Language(s) | TypeScript |
| Organization Pattern | Monorepo workspaces |
| Total files | 150 |
| Total directories | 28 |
| Max depth | 5 levels |
| Dominant naming convention | camelCase (files), lowercase (dirs) |

### Health Score: 6/18 — Critical

| # | Category | Score | Notes |
|---|----------|-------|-------|
| 1 | Architecture Alignment | 1/3 | Nested packages violate Turborepo convention; configs misplaced |
| 2 | Naming Consistency | 2/3 | Mostly consistent but no `@org/` namespace scoping |
| 3 | Organization Pattern | 1/3 | Confused boundaries — configs in UI, empty config package, nested packages |
| 4 | Colocation & Proximity | 1/3 | Shared code nested too deep; configs far from where they're used |
| 5 | Duplication & Waste | 0/3 | Empty `config/` package, wrapper `shared/` with no code, misplaced configs |
| 6 | Depth & Navigability | 1/3 | 5 levels deep due to nested packages; confusing to navigate |

### Findings

**Critical:**
- **[CRITICAL]** `packages/shared/utils/` and `packages/shared/types/` — Nested packages. Turborepo workspaces must be flat under `packages/`. Nested packages cause resolution issues and defeat caching.
- **[CRITICAL]** `packages/ui/src/eslintConfig.js` and `tsconfig.base.json` — Build configs mixed into UI component package. These should be in dedicated config packages.
- **[CRITICAL]** Package names lack namespace — `"name": "web"` instead of `"@acme/web"`. Causes naming collisions and makes dependency graph unclear.

**Warning:**
- **[WARNING]** `packages/config/` — Empty package (no source files). Either populate with actual configs or delete.
- **[WARNING]** `packages/shared/package.json` — Wrapper package with no code of its own. The nested packages should be promoted to top-level.
- **[WARNING]** `packages/ui/src/theme.ts` — Theme config mixed with UI components. Should be a separate package or in a `config-theme` package.

**Info:**
- **[INFO]** No `README.md` in individual packages — each package should document its public API.
- **[INFO]** No `.npmrc` or workspace protocol usage (`"@acme/ui": "workspace:*"`).

### After Tree (Proposed)

```
root/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   ├── package.json       ← name: "@acme/web"
│   │   └── tsconfig.json      ← extends @acme/config-ts
│   ├── api/
│   │   ├── src/
│   │   ├── package.json       ← name: "@acme/api"
│   │   └── tsconfig.json
│   └── admin/
│       ├── src/
│       ├── package.json       ← name: "@acme/admin"
│       └── tsconfig.json
├── packages/
│   ├── ui/                    ← Only UI components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   ├── package.json       ← name: "@acme/ui"
│   │   └── README.md
│   ├── utils/                 ← Promoted from nested
│   │   ├── src/
│   │   ├── package.json       ← name: "@acme/utils"
│   │   └── README.md
│   ├── types/                 ← Promoted from nested
│   │   ├── src/
│   │   ├── package.json       ← name: "@acme/types"
│   │   └── README.md
│   ├── config-eslint/         ← ESLint config extracted
│   │   ├── index.js
│   │   └── package.json       ← name: "@acme/config-eslint"
│   ├── config-ts/             ← TS config extracted
│   │   ├── base.json
│   │   ├── react.json
│   │   ├── node.json
│   │   └── package.json       ← name: "@acme/config-ts"
│   └── config-theme/          ← Theme extracted from UI
│       ├── src/
│       │   └── theme.ts
│       └── package.json       ← name: "@acme/config-theme"
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── .npmrc                     ← workspace protocol config
```

### Refactoring Operations

| # | Action | From | To | Impact |
|---|--------|------|----|--------|
| 1 | move | `packages/shared/utils/` | `packages/utils/` | Flatten nested package |
| 2 | move | `packages/shared/types/` | `packages/types/` | Flatten nested package |
| 3 | delete | `packages/shared/` | (removed) | Eliminate empty wrapper |
| 4 | move | `packages/ui/src/eslintConfig.js` | `packages/config-eslint/index.js` | Separate concerns |
| 5 | move | `packages/ui/src/tsconfig.base.json` | `packages/config-ts/base.json` | Separate concerns |
| 6 | move | `packages/ui/src/theme.ts` | `packages/config-theme/src/theme.ts` | Separate concerns |
| 7 | delete | `packages/config/` | (removed) | Empty package |
| 8 | rename | All `package.json` names | Add `@acme/` prefix | Namespace scoping |
