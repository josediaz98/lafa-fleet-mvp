# Folder Audit — Scoring Framework

6 categories x 0-3 points = **18 max**.

## Health Rating Scale

| Score | Rating |
|-------|--------|
| 15-18 | Excellent |
| 11-14 | Good |
| 7-10 | Needs Work |
| 0-6 | Critical |

---

## Category 1: Architecture Alignment (0-3)

*Does the folder structure match the project's detected architecture type?*

| Score | Criteria |
|-------|----------|
| 0 | Structure contradicts architecture (e.g., monorepo signals but flat layout, or domain folders in a Rails app) |
| 1 | Partial alignment — some conventions followed, major deviations |
| 2 | Mostly aligned — minor deviations from canonical pattern |
| 3 | Fully aligned with detected architecture's reference structure |

### Reference Structures by Architecture Type

#### Monorepo (Turborepo)

```
root/
├── apps/
│   ├── web/              ← Next.js or Vite app
│   │   ├── src/
│   │   └── package.json
│   └── api/              ← Backend service
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/               ← Shared component library (@org/ui)
│   ├── config-eslint/    ← Shared ESLint config
│   ├── config-ts/        ← Shared tsconfig
│   └── shared/           ← Shared utilities
├── turbo.json
├── pnpm-workspace.yaml
└── package.json          ← Root (workspaces defined here)
```

**Key signals:** Flat `apps/` + `packages/`, each with own `package.json`, `@org/` namespace scoping, no nested packages.

#### Next.js App Router

```
src/
├── app/
│   ├── layout.tsx        ← Root layout
│   ├── page.tsx          ← Home page
│   ├── (auth)/           ← Route group (no URL segment)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings/page.tsx
│   └── api/              ← API routes
│       └── users/route.ts
├── components/           ← Shared components
├── lib/                  ← Utilities, helpers
└── styles/               ← Global styles
```

**Key signals:** `app/` directory, `page.tsx` and `layout.tsx` at each route, route groups with `()`. Special files: `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx`. Components are Server Components by default — `'use client'` opt-in for interactivity.

#### Next.js Pages Router

```
src/
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── api/
│   └── dashboard/
│       └── index.tsx
├── components/
├── lib/
└── styles/
```

#### React SPA (Vite) — Feature-Based

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── dashboard/
│   └── payments/
├── shared/
│   ├── components/       ← Reusable UI (Button, Modal, etc.)
│   ├── hooks/            ← App-wide hooks
│   ├── lib/              ← Utilities, helpers
│   └── types/            ← Shared type definitions
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
├── main.tsx
└── vite-env.d.ts
```

**Key signals:** `src/` root, feature directories named after domain concepts, `shared/` for cross-cutting code, no god `components/` folder.

#### React SPA (Vite) — Layer-Based (Small Projects)

```
src/
├── components/           ← All UI components
├── hooks/                ← Custom hooks
├── services/             ← API calls
├── types/                ← TypeScript types
├── utils/                ← Helper functions
├── context/              ← React context providers
├── pages/                ← Route-level components
├── App.tsx
└── main.tsx
```

**Acceptable for:** Projects < 20 files. Becomes unwieldy at scale.

#### Angular

```
src/
├── app/
│   ├── core/             ← Singleton services, guards, interceptors
│   ├── shared/           ← Shared components, directives, pipes
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.component.ts
│   │   │   └── auth.service.ts
│   │   └── dashboard/
│   ├── app.module.ts
│   ├── app.component.ts
│   └── app-routing.module.ts
├── assets/
├── environments/
└── styles/
```

#### Go Standard Layout

```
project/
├── cmd/
│   └── myapp/
│       └── main.go       ← Entry point
├── internal/             ← Private application code
│   ├── auth/
│   ├── database/
│   └── handlers/
├── pkg/                  ← Public library code (optional)
├── api/                  ← API definitions (OpenAPI, proto)
├── configs/
├── scripts/
├── go.mod
└── go.sum
```

**Key signals:** `cmd/` for binaries, `internal/` for private code, no `src/` directory. Go projects do NOT use `src/`.

#### Python

```
project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       ├── core/
│       ├── api/
│       └── utils/
├── tests/
│   ├── conftest.py
│   ├── test_core/
│   └── test_api/
├── pyproject.toml
├── requirements.txt      ← or managed by pyproject.toml
└── README.md
```

**Alternative (flat):** Package at root without `src/`. Both are valid; `src/` layout prevents accidental imports.

#### Rails

```
app/
├── controllers/
├── models/
├── views/
├── helpers/
├── mailers/
├── jobs/
└── services/             ← Custom (not Rails default)
config/
├── routes.rb
├── database.yml
└── environments/
db/
├── migrate/
├── schema.rb
└── seeds.rb
lib/
├── tasks/
└── custom_code/
spec/ or test/
```

**Key signal:** Framework-driven structure — deviations from Rails conventions are almost always wrong.

#### Rust

```
project/
├── src/
│   ├── main.rs           ← Binary crate
│   ├── lib.rs            ← Library crate
│   └── modules/
│       ├── mod.rs
│       ├── auth.rs
│       └── database.rs
├── tests/                ← Integration tests
├── benches/              ← Benchmarks
├── examples/
├── Cargo.toml
└── Cargo.lock
```

#### Django

```
my_project/
├── manage.py
├── my_project/               ← Project config package
│   ├── __init__.py
│   ├── settings/
│   │   ├── base.py           ← Shared settings
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── users/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests/
│   └── payments/
│       ├── models.py
│       ├── views.py
│       └── tests/
├── templates/
├── static/
└── requirements/
    ├── base.txt
    ├── dev.txt
    └── prod.txt
```

**Key signals:** `manage.py` at root, `apps/` with `models.py`/`views.py` per app, split settings for environments. Framework-driven — follow Django conventions strictly.

#### FastAPI

```
app/
├── main.py                   ← FastAPI() instance + lifespan
├── routers/
│   ├── users.py
│   ├── payments.py
│   └── auth.py
├── models/                   ← SQLAlchemy / ORM models
│   ├── user.py
│   └── payment.py
├── schemas/                  ← Pydantic request/response schemas
│   ├── user.py
│   └── payment.py
├── services/                 ← Business logic
│   ├── user_service.py
│   └── payment_service.py
├── core/
│   ├── config.py             ← Settings via pydantic-settings
│   ├── security.py
│   └── database.py
├── tests/
└── alembic/                  ← DB migrations
```

**Key signals:** `main.py` with `routers/` directory. Critical distinction: `models/` = ORM/database, `schemas/` = Pydantic validation. Never mix them.

#### React Native / Expo

```
app/                          ← Expo Router (file-based routing)
├── (tabs)/
│   ├── _layout.tsx           ← Tab navigator
│   ├── index.tsx             ← Home tab
│   └── settings.tsx
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── register.tsx
├── _layout.tsx               ← Root layout
└── +not-found.tsx
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api.ts
│   └── fleet/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── lib/
├── constants/
└── types/
app.json
```

**Key signals:** `app.json` + `expo` in dependencies, `_layout.tsx` files for Expo Router. Route files should be thin — delegate to feature components. Platform-specific files use `.ios.tsx`/`.android.tsx` suffixes.

#### Node.js REST API (Feature-Based)

```
src/
├── features/
│   ├── users/
│   │   ├── users.routes.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.model.ts
│   │   ├── users.validation.ts
│   │   ├── users.types.ts
│   │   └── users.test.ts
│   ├── payments/
│   └── auth/
├── middleware/
│   ├── auth.ts
│   ├── error-handler.ts
│   └── rate-limiter.ts
├── lib/
│   ├── database.ts
│   ├── logger.ts
│   └── config.ts
├── types/                    ← Shared types only
├── app.ts                    ← Express/Fastify setup
└── server.ts                 ← Entry point
```

**Key signals:** Each feature is self-contained with `routes/controller/service/model/validation/types/test`. Middleware at `src/` level is the one exception to feature colocation. Always separate `app.ts` from `server.ts` — enables importing the app for testing without starting an HTTP server.

#### Full-Stack Monolith

```
src/
├── app/                      ← Frontend (Next.js App Router or Vite SPA)
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/
├── server/                   ← Backend API
│   ├── routers/
│   ├── services/
│   └── db/
├── shared/                   ← Code shared between client and server
│   ├── types/
│   └── validation/           ← Zod schemas used by both sides
├── components/               ← Frontend UI components
├── lib/                      ← Frontend utilities
prisma/
├── schema.prisma
└── migrations/
```

**Key signals:** `src/app/` + `src/server/` in the same repo, shared validation schemas (Zod/Yup), single `prisma/` directory. The `shared/` folder is the bridge — types and validation must be isomorphic.

#### Content/Docs Repo

```
docs/
├── guides/               ← How-to guides (task-oriented)
│   ├── getting-started.md
│   └── deployment.md
├── reference/            ← API/config reference (information-oriented)
│   ├── api.md
│   └── configuration.md
├── concepts/             ← Explanations (understanding-oriented)
│   ├── architecture.md
│   └── data-model.md
├── tutorials/            ← Learning-oriented walkthroughs
└── README.md             ← Entry point / navigation
```

**Alternative:** Topic-based hierarchy for non-Diataxis projects. Key rule: consistent naming (kebab-case), no files in root, clear entry points with README.md.

#### Vanilla HTML/JS (Static Site)

```
site/
├── index.html            ← Main entry point
├── core/                 ← Shared assets (CSS, JS, config)
│   ├── shared.css
│   ├── shared.js
│   └── config.js
├── feature-a/
│   ├── index.html
│   └── feature-a.js
├── feature-b/
│   ├── index.html
│   └── feature-b.js
└── images/               ← or assets/
```

**Key signal:** No build tool, no `package.json` with bundler, CDN script tags. Structure follows page/feature directories.

### Assets Convention (General)

`public/` = served as-is (favicon, robots.txt, OG images). `src/assets/` = build-processed (hashed filenames, optimized). Use `public/` for URL-referenced files, `src/assets/` for code-imported files.

---

## Category 2: Naming Consistency (0-3)

*Do files and folders follow a single, language-appropriate naming convention?*

| Score | Criteria |
|-------|----------|
| 0 | 3+ conventions mixed in same directory, or conventions violate language standards |
| 1 | Dominant convention exists but 20%+ files deviate |
| 2 | Consistent within directories, minor cross-directory inconsistency |
| 3 | Single convention per file type, aligned with language/framework standard |

### Convention Reference Table

| Stack | Files | Components | Directories | Tests |
|-------|-------|-----------|-------------|-------|
| React/TS | `kebab-case.ts` | `PascalCase.tsx` | `kebab-case/` | `*.test.tsx` colocated |
| Vue | `PascalCase.vue` or `kebab-case.vue` | `PascalCase` | `kebab-case/` | `*.spec.ts` |
| Angular | `kebab-case.component.ts` | `PascalCase` | `kebab-case/` | `*.spec.ts` |
| Python | `snake_case.py` | `PascalCase` classes | `snake_case/` | `test_*.py` or `*_test.py` |
| Go | `snake_case.go` | `PascalCase` exported | `lowercase/` | `*_test.go` |
| Rust | `snake_case.rs` | `PascalCase` types | `snake_case/` | `#[test]` in same file or `tests/` |
| Markdown/content | `kebab-case.md` | N/A | `kebab-case/` | N/A |
| HTML/CSS/JS (vanilla) | `kebab-case.*` | N/A | `kebab-case/` | N/A |

### Detection Method

1. Glob all files in the target directory
2. Classify each filename into convention bucket:
   - `kebab-case` — lowercase with hyphens (`my-component.ts`)
   - `camelCase` — lowercase start, uppercase word boundaries (`myComponent.ts`)
   - `PascalCase` — uppercase start, uppercase word boundaries (`MyComponent.tsx`)
   - `snake_case` — lowercase with underscores (`my_component.py`)
   - `SCREAMING_SNAKE` — uppercase with underscores (`MAX_RETRIES.ts`)
   - `lowercase` — single word, no separators (`utils.ts`)
   - `mixed` — multiple conventions in one name (`myComponent-helper.ts`)
3. Compute distribution per directory and per file extension
4. Flag directories where the minority convention exceeds 20%

### Folder Plural/Singular Rule

Use **plural for category folders** (`components/`, `hooks/`, `services/`) and **singular for feature folders** (`auth/`, `dashboard/`, `fleet/`). This mirrors the distinction: category folders contain many items of one type, feature folders contain everything for one domain.

Cited in: Cal.com, Supabase, shadcn/ui.

### Emerging Dominant: kebab-case

kebab-case is gaining dominance across the JS/TS ecosystem. Next.js, shadcn/ui, and Angular mandate it. **For new projects, default to kebab-case for files and directories.** PascalCase remains correct only for React component files (`.tsx`) where the component name must match the filename.

### Environment File Hierarchy

The standard priority chain supported by Vite, Next.js, and CRA:

```
.env                    # Loaded always — committed
.env.local              # Loaded always — gitignored
.env.development        # Loaded in dev mode — committed
.env.development.local  # Loaded in dev mode — gitignored
.env.production         # Loaded in prod mode — committed
.env.production.local   # Loaded in prod mode — gitignored
```

Priority: `.env.[mode].local` > `.env.[mode]` > `.env.local` > `.env`. Flag projects that commit `.env.local` or store secrets in non-`.local` files.

### Interface Prefix Prohibition

Google TypeScript Style Guide prohibits `I` prefix on interfaces. `IUser` is wrong; `User` is correct. Same rule: never prefix types with `T` (`TPayment` → `Payment`). The type system already distinguishes types from values — prefixes add noise.

### Common Anti-Patterns

- `userService.ts` alongside `payment-service.ts` (camelCase vs kebab-case)
- `UserProfile.tsx` alongside `user-settings.tsx` (PascalCase vs kebab for components)
- `helpers/` alongside `utils/` alongside `lib/` (synonym folders)
- Folders with spaces or special characters
- Mixed `.js` and `.ts` files in the same directory (migration incomplete)

---

## Category 3: Organization Pattern (0-3)

*Is the chosen organization pattern (feature-based, layer-based, hybrid) applied consistently?*

| Score | Criteria |
|-------|----------|
| 0 | No discernible pattern — files scattered without logic |
| 1 | Pattern exists but frequently broken (e.g., feature-based with many files in wrong features) |
| 2 | Consistent pattern with 1-2 exceptions |
| 3 | Clean, consistent pattern — new contributor could predict where any file lives |

### Pattern Detection

- **Feature-based** (screaming architecture): Top-level dirs named after domain concepts (`auth/`, `payments/`, `drivers/`, `fleet/`)
- **Layer-based**: Top-level dirs named after technical roles (`controllers/`, `models/`, `services/`, `components/`, `hooks/`)
- **Hybrid**: Feature dirs internally organized by layers (`auth/{components,hooks,api}/`)
- **Framework-driven**: Structure dictated by framework conventions (Rails, Next.js, Angular, Django)
- **Page-based**: Top-level dirs named after routes/pages (`dashboard/`, `settings/`, `profile/`)

### Decision Matrix (for Recommendations)

| Project Size | Team Size | Recommended Pattern |
|-------------|-----------|---------------------|
| < 20 files | 1 person | Flat or layer-based |
| 20-100 files | 1-3 people | Feature-based or hybrid |
| 100+ files | 3+ people | Feature-based with strict boundaries |
| Multiple apps | Any | Monorepo with feature-based per app |
| Content/docs | Any | Topic-based hierarchy or Diataxis |

### Architecture Decision Flowchart

Three questions determine the right architecture:

1. **Team ≤ 5 and building an MVP?** → Monolith in a monorepo. Ship features, not architecture.
2. **Team 5–20, single product growing?** → Modular monolith in a monorepo (Turborepo/Nx). Start enforcing module boundaries.
3. **Team 20+, independent deployment cadences needed?** → Microservices in a monorepo (or polyrepo if teams use different stacks).

Uber started polyrepo, hit coordination nightmares, consolidated into a monorepo. Shopify chose a modular monolith over microservices (Rails Engines + Packwerk). **Monorepo is not the opposite of microservices — it is their best companion.**

### Detection Heuristic

1. List all top-level directories inside the target
2. Classify each as **domain concept** (auth, payments, fleet) or **technical role** (components, hooks, services)
3. If > 70% domain concepts → feature-based
4. If > 70% technical roles → layer-based
5. If domain concepts contain technical subdirectories → hybrid
6. If matches known framework convention → framework-driven

---

## Category 4: Colocation & Proximity (0-3)

*Are related files close together? Tests, styles, types near their subjects?*

| Score | Criteria |
|-------|----------|
| 0 | Mirrored test directory, styles in global folder, types in separate `types/` dir |
| 1 | Some colocation, but tests or styles frequently separated |
| 2 | Most related files colocated; shared utilities properly extracted |
| 3 | Full colocation — components + tests + styles + types in same folder, shared code in `shared/` |

### Colocation Checklist

- [ ] Unit tests adjacent to source files (not mirrored `/tests/` tree)
- [ ] Component styles colocated (CSS modules, styled-components, or same-dir `.css`)
- [ ] TypeScript types/interfaces defined where used (not all in global `types/`)
- [ ] Feature-specific hooks in feature folder (not all in global `hooks/`)
- [ ] Feature-specific API calls in feature folder (not all in global `services/`)
- [ ] Integration/E2E tests at project root (exception — these belong separate)
- [ ] Shared/reusable code extracted to `shared/` or `lib/` (not duplicated across features)

### Type Placement Rules (TypeScript)

Apply Matt Pocock's 3 rules for type colocation:

1. **Type used in one file** → define in that file (inline)
2. **Type used across one module/feature** → `feature.types.ts` or `types.ts` within the feature folder
3. **Type used across modules** → `types/` directory at `shared/` or `src/` level

**Never** create a single massive `types.ts` at the project root. **Never** separate `interfaces/` from `types/` — they serve the same purpose. Prefer `types.ts` per feature over a global type dump.

### Test File Convention

Use `.test.ts` for Jest/Vitest (React ecosystem). Use `.spec.ts` for Angular, Playwright, and Cypress (BDD tradition). **Pick one convention per project and never mix them.**

### Shared Utilities Discipline

The `utils/` folder degenerates into a junk drawer without rules:

- **Domain-specific helper → put it in that domain** — `generatePassword()` belongs in `auth/`, not `utils/`
- **Split utils by concern:** `utils/date.ts`, `utils/string.ts` — never one `utils.ts` with 50 functions
- **Distinguish `utils/` from `lib/`:** `utils/` = small pure functions, `lib/` = infrastructure (API clients, loggers, DB)
- **Prefer duplication over coupling** for 3-line helpers — copying is cheaper than a shared dependency that creates coupling

### When Separation Is Correct

Not all colocation violations are bad. These separations are intentional:

- **Integration/E2E tests** in root `tests/` or `e2e/` — they span multiple features
- **Global styles/themes** in `styles/` — app-wide design tokens, resets
- **Shared types** for API contracts in `types/` — cross-feature data models
- **Config files** at project root — standard convention
- **Database migrations** in `db/` or `migrations/` — framework convention

### Scoring Adjustments

- If the project has no tests → colocation cannot be scored for tests; score based on other proximity factors
- If using CSS-in-JS → styles are inherently colocated (full marks for that sub-criterion)
- If using a framework that dictates separation (Rails, Django) → adjust expectations to framework convention

---

## Category 5: Duplication & Waste (0-3)

*Are there duplicate files, orphaned configs, god folders, or dead weight?*

| Score | Criteria |
|-------|----------|
| 0 | Multiple duplicates + god folders (50+ files) + orphaned configs |
| 1 | Some duplicates or 1 god folder or orphaned configs |
| 2 | No duplicates, minor waste (1-2 orphaned files) |
| 3 | Zero duplication, no orphaned configs, no god folders |

### Detection Patterns

| Pattern | Detection Method | Severity |
|---------|-----------------|----------|
| Same filename in multiple dirs | Glob `**/{name}`, check for duplicates | Warning |
| Similar names, different conventions | `userService.ts` + `user-service.ts` | Critical |
| Config without matching tool | `.babelrc` when using SWC, `.eslintrc` when using Biome | Warning |
| `utils/` or `helpers/` with 20+ files | Count files in common utility dirs | Warning |
| Any single directory with 50+ files | Count files per dir | Critical |
| Empty directories | Glob, check for dirs with 0 files | Info |
| Barrel file abuse (`index.ts` re-exporting in app code) | Grep for re-export patterns | Warning |
| Stale test files (source deleted) | Compare test files to source counterparts | Warning |
| Synonym directories | `utils/` + `helpers/` + `lib/` at same level | Warning |
| Unused dependencies in package.json | Cross-reference imports with declared deps | Info |

### God Folder Thresholds

| Files in Directory | Status |
|-------------------|--------|
| 1-15 | Healthy |
| 16-30 | Monitor |
| 31-50 | Warning — consider splitting |
| 50+ | Critical — must split |

### Barrel File Guidance

Barrel files (`index.ts` that re-export from other files) are appropriate **only at library/package entry points**, never in application code. TkDodo documented that removing barrel files from a Next.js project reduced loaded modules from 11,000 to 3,500 (68% reduction). Next.js shipped `optimizePackageImports` specifically to work around barrel file overhead.

**Rule of thumb:** If an `index.ts` exists purely to enable shorter import paths within the same application, delete it and import directly.

### Recommended Audit Tooling

| Tool | Purpose | Key metric |
|------|---------|-----------|
| **Knip** | Unused files, exports, dependencies | Vercel deleted ~300K LOC using Knip |
| **madge** | Circular dependency visualization | Zero cycles target |
| **jscpd** | Duplicate code detection | Flag >5 identical lines |
| `unicorn/filename-case` | Naming consistency enforcement | ESLint rule |
| `max-lines` | File size limits | Warn >300 lines, error >500 |
| `import/no-cycle` | Circular import prevention | ESLint rule |

---

## Category 6: Depth & Navigability (0-3)

*Is nesting reasonable? Can a new contributor find what they need?*

| Score | Criteria |
|-------|----------|
| 0 | 6+ levels deep, or completely flat with 100+ files in root |
| 1 | 5 levels in some paths, or poor README/navigation aids |
| 2 | Max 4 levels, most paths 2-3 deep, reasonable discoverability |
| 3 | Max 3 levels for most paths, clear entry points, progressive disclosure |

### Metrics

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Max depth | <= 4 | 5 | 6+ |
| Average depth | <= 2.5 | 3-3.5 | 4+ |
| Max files per directory | <= 30 | 31-50 | 50+ |
| Files in root directory | <= 10 | 11-20 | 20+ |

### Navigability Signals

| Signal | Points |
|--------|--------|
| README.md at project root | +1 |
| README.md at major subdirectories (content repos) | +1 |
| `index.ts` or barrel file at package/feature roots | +1 |
| Consistent entry point pattern across features | +1 |
| Clear separation of public API vs internals | +1 |

### Anti-Patterns

- **Deep nesting for no reason:** `src/app/modules/auth/components/forms/LoginForm/LoginForm.tsx` (6 levels)
- **Flat dump:** 80 files in `src/` with no subdirectories
- **Single-file folders:** `components/Button/Button.tsx` with nothing else in `Button/` (unnecessary nesting)
- **Single-subfolder nesting:** `utils/helpers/` where `utils/` contains only `helpers/` — flatten to just `helpers/` or `utils/`
- **Inconsistent depth:** Feature A is 2 levels, Feature B is 5 levels for no architectural reason

---

## Common Anti-Patterns Compendium

Named anti-patterns with detection signals and fixes. Use as a quick-reference checklist during audits.

| Anti-Pattern | Signal | Fix |
|-------------|--------|-----|
| **Barrel export abuse** | `index.ts` re-exporting everything in app code | Remove barrels; import directly |
| **God files** | >500 lines in a single file | Split by responsibility |
| **God folders** | 50+ files in one directory | Create subdirectories at 10-15 files |
| **Generic folder names** | `stuff/`, `misc/`, `common/`, `data/`, `manager/` | Rename to semantic purpose |
| **Inconsistent casing** | Mixed conventions in same directory | Enforce with `unicorn/filename-case` |
| **Over-nesting** | 5+ levels from `src/` | Max 3-4 levels; flatten |
| **Premature abstraction** | Shared packages/utils before pattern repeats | Extract when pattern repeats 3+ times |
| **Circular dependencies** | Bidirectional imports between layers | Enforce unidirectional flow (UI → Services → Data) |
