# Architecture Review Framework — 60+ Checkpoints

Systematic evaluation framework organized into 5 categories. Each checkpoint includes what to look for, how to detect violations, and severity guidance.

---

## Category 1: SOLID Principles (0-20 points)

### 1.1 Single Responsibility Principle (SRP)

> "A class/module should have one, and only one, reason to change."

**Checkpoints:**

- [ ] **File focus** — Each file addresses a single concern (UI, business logic, data access, configuration)
- [ ] **Function focus** — Functions do one thing; name accurately describes the full behavior
- [ ] **File size signal** — Files under 300 lines (warning at 300+, critical at 500+)
- [ ] **Mixed concerns** — No file mixes HTTP handling + business logic + database queries
- [ ] **Change frequency** — Related changes don't require modifying unrelated code in the same file
- [ ] **Naming clarity** — File/class names suggest a single purpose (not `utils.js`, `helpers.py`, `common.go`)

**Detection patterns:**
```
# Files likely violating SRP
- Files named: utils, helpers, common, misc, shared, general, manager, handler (without specificity)
- Files with multiple class/interface definitions unrelated to each other
- Functions longer than 50 lines
- Files importing from 5+ unrelated modules
```

**Severity:** Warning for oversized files; Critical when changes to one concern break another.

---

### 1.2 Open/Closed Principle (OCP)

> "Open for extension, closed for modification."

**Checkpoints:**

- [ ] **Switch/if-else chains** — No long conditional chains dispatching on type/status/category
- [ ] **Plugin points** — System supports new behavior without modifying existing code
- [ ] **Configuration-driven** — Behavior variations driven by config/data, not code branches
- [ ] **Strategy pattern opportunities** — Algorithms/behaviors that vary are encapsulated, not inlined

**Detection patterns:**
```
# OCP violation signals
- switch statements with 5+ cases on a type/category field
- if/else if chains checking instanceof or type discriminators
- Functions that must be modified every time a new variant is added
- Comments like "add new case here" or "extend this for new types"
```

**Severity:** Warning for 3-5 cases; Critical for 6+ cases or when new features always require modifying the same function.

---

### 1.3 Liskov Substitution Principle (LSP)

> "Subtypes must be substitutable for their base types."

**Checkpoints:**

- [ ] **No type checks on subtypes** — Code using a base type doesn't check for specific subtypes
- [ ] **Contract preservation** — Overridden methods maintain preconditions, postconditions, invariants
- [ ] **No empty overrides** — Subclasses don't override methods with no-ops or `throw NotImplemented`
- [ ] **Consistent return types** — Overridden methods return compatible types

**Detection patterns:**
```
# LSP violation signals
- instanceof / typeof checks after receiving a base type
- Methods that throw "not supported" or "not implemented"
- Subclasses that ignore or contradict parent behavior
- Type guards that narrow a union type immediately after receiving it
```

**Severity:** Warning for isolated cases; Critical when substitution failures cause runtime errors.

---

### 1.4 Interface Segregation Principle (ISP)

> "No client should be forced to depend on methods it does not use."

**Checkpoints:**

- [ ] **Focused interfaces** — Interfaces/types have 3-7 members (warning at 8+, critical at 15+)
- [ ] **No unused implementations** — Classes implementing an interface use all its methods
- [ ] **Role-based interfaces** — Interfaces named by role (Readable, Serializable) not entity (User, Order)
- [ ] **No optional overload** — Interfaces don't have many optional members as a workaround

**Detection patterns:**
```
# ISP violation signals
- Interfaces with 10+ methods
- Implementing classes with empty/stub methods
- Props interfaces with 15+ optional fields
- "God interfaces" that every class implements
```

**Severity:** Warning for bloated interfaces; Critical when implementors must stub multiple methods.

---

### 1.5 Dependency Inversion Principle (DIP)

> "Depend on abstractions, not concretions."

**Checkpoints:**

- [ ] **Constructor/parameter injection** — Dependencies passed in, not instantiated internally
- [ ] **No `new` in business logic** — Concrete instantiation happens at composition root or factory
- [ ] **Interface-based dependencies** — High-level modules reference abstractions, not implementations
- [ ] **Testability** — Dependencies can be replaced with mocks/stubs without modifying the module

**Detection patterns:**
```
# DIP violation signals
- `new ConcreteClass()` inside business logic functions
- Direct imports of implementation modules in high-level code
- Hard-coded database clients, HTTP clients, or external service calls
- Untestable functions due to embedded dependencies
```

**Severity:** Warning for non-critical dependencies; Critical for core business logic with hard-coded infrastructure.

---

## Category 2: Design Principles (0-20 points)

### 2.1 DRY (Don't Repeat Yourself)

> "Every piece of knowledge must have a single, unambiguous representation."

**Checkpoints:**

- [ ] **No copy-paste blocks** — No 3+ line blocks duplicated across files
- [ ] **Rule of Three** — Code duplicated 3+ times is extracted into a shared function
- [ ] **Single source of truth** — Constants, config values, and business rules defined in one place
- [ ] **Consistent patterns** — Similar operations use the same approach (not 3 ways to make API calls)

**Detection patterns:**
```
# DRY violation signals
- Identical try/catch blocks across multiple handlers
- Same validation logic in multiple places
- Duplicated SQL queries or API call patterns
- Constants defined in multiple files with same values
```

**Severity:** Info for 2 occurrences; Warning for 3+; Critical for business logic duplication.

---

### 2.2 YAGNI (You Aren't Gonna Need It)

> "Don't implement something until it is necessary."

**Checkpoints:**

- [ ] **No dead code** — No commented-out code blocks, unused functions, unreachable branches
- [ ] **No premature abstraction** — No abstract classes/interfaces with a single implementation
- [ ] **No speculative generality** — No parameters, options, or config for features that don't exist
- [ ] **Justified complexity** — Every abstraction layer serves a current (not future) need

**Detection patterns:**
```
# YAGNI violation signals
- Abstract class or interface with exactly 1 implementation
- Function parameters that are always passed the same value
- Feature flags for features that were never built
- "TODO: will need this later" comments on unused code
- Configuration options that only have one valid value
```

**Severity:** Info for minor unused code; Warning for unnecessary abstractions; Critical for over-engineered architecture.

---

### 2.3 KISS (Keep It Simple, Stupid)

> "Most systems work best if kept simple rather than made complicated."

**Checkpoints:**

- [ ] **Comprehension test** — A competent developer can understand any function within 15 minutes
- [ ] **Minimal indirection** — No more than 3 levels of abstraction to trace a request end-to-end
- [ ] **Straightforward flow** — Control flow is linear where possible, no unnecessary callbacks/promises
- [ ] **Right tool** — No complex patterns where a simple approach works equally well

**Detection patterns:**
```
# KISS violation signals
- Custom event systems for simple parent-child communication
- Metaprogramming where direct code would suffice
- Generic frameworks for one-off operations
- Dependency injection containers in small applications
- Observable/reactive patterns for synchronous operations
```

**Severity:** Warning for unnecessary complexity; Critical when complexity prevents onboarding or debugging.

---

### 2.4 Separation of Concerns (SoC)

> "Each section of a program addresses a separate concern."

**Checkpoints:**

- [ ] **Layer separation** — Presentation, business logic, and data access in separate modules
- [ ] **No UI in business logic** — Business rules don't reference DOM, templates, or UI state
- [ ] **No business logic in UI** — Components/views don't contain calculations, rules, or queries
- [ ] **No data logic in transport** — Route handlers don't contain SQL or direct DB operations

**Detection patterns:**
```
# SoC violation signals
- SQL queries in route handlers or React components
- HTML/DOM manipulation in service/model files
- Business rules embedded in database migrations
- API response formatting mixed with data transformation
```

**Severity:** Warning for minor mixing; Critical when concerns are thoroughly entangled.

---

### 2.5 Law of Demeter

> "Only talk to your immediate friends."

**Checkpoints:**

- [ ] **No deep chains** — No `a.b.c.d` access patterns (3+ levels)
- [ ] **No reaching through** — Objects don't navigate through other objects' internal structure
- [ ] **Encapsulated access** — Data accessed through methods, not deep property traversal

**Detection patterns:**
```
# Law of Demeter violation signals
- Property chains: user.address.city.zipCode
- Method chains: obj.getA().getB().getC()
- Accessing internal collections: manager.team.members[0].name
```

**Severity:** Info for occasional chains; Warning for systematic pattern.

---

### 2.6 Principle of Least Astonishment (POLA)

> "Components should behave as most users would expect."

**Checkpoints:**

- [ ] **No side effects in getters** — Functions named `get*`, `is*`, `has*` don't mutate state
- [ ] **Consistent naming** — Similar operations use similar names across the codebase
- [ ] **Predictable returns** — Functions return consistent types (not sometimes array, sometimes object)
- [ ] **No hidden mutations** — Functions that modify input are clearly named (e.g., `sort` vs `sorted`)

**Detection patterns:**
```
# POLA violation signals
- getName() that also logs analytics or modifies cache
- save() that also sends email notifications
- Inconsistent naming: fetchUser vs getUser vs loadUser for same operation
- Functions that return different types based on input
```

**Severity:** Warning for confusing naming; Critical for hidden side effects that cause bugs.

---

## Category 3: Architecture Patterns (0-20 points)

### 3.1 Layer Boundaries

- [ ] **Clear layers** — System has identifiable layers (presentation, application, domain, infrastructure)
- [ ] **Unidirectional dependencies** — Higher layers depend on lower layers, never the reverse
- [ ] **No layer skipping** — Presentation doesn't directly access infrastructure (e.g., UI → DB)

### 3.2 Component Cohesion

- [ ] **Related code together** — Files that change together live together
- [ ] **Feature-based organization** — Code grouped by feature/domain, not by technical type (preferred for apps)
- [ ] **Reasonable module size** — Modules have 3-15 files (warning at 20+, critical at 40+)

### 3.3 Component Coupling

- [ ] **Low coupling** — Modules have few dependencies on other modules
- [ ] **Stable dependencies** — Volatile modules don't depend on other volatile modules
- [ ] **No circular dependencies** — No A→B→C→A dependency cycles
- [ ] **Clear public API** — Modules export through index/barrel files, internal files are private

### 3.4 Data Flow

- [ ] **Predictable flow** — Data moves in one direction through the system (especially in UI)
- [ ] **Explicit data passing** — No implicit global state or ambient context for critical data
- [ ] **Transformation pipeline** — Data transformations are sequential and traceable

### 3.5 Error Boundaries

- [ ] **Defined boundaries** — Errors caught at appropriate levels, not everywhere or nowhere
- [ ] **No swallowed errors** — Empty catch blocks are justified or nonexistent
- [ ] **Graceful degradation** — Failures in one component don't cascade to unrelated components

### 3.6 State Management

- [ ] **Single source of truth** — Each piece of state has one canonical location
- [ ] **Minimal shared state** — Components own their state; shared state is intentional and documented
- [ ] **Predictable updates** — State changes through defined mechanisms, not ad-hoc mutations

### 3.7 Configuration

- [ ] **Externalized config** — Environment-specific values in env vars or config files, not in code
- [ ] **No hardcoded secrets** — API keys, passwords, tokens not in source code
- [ ] **Sensible defaults** — App works with minimal configuration; non-obvious settings documented

### 3.8 API Design

- [ ] **Consistent patterns** — Endpoints follow same naming, response format, error structure
- [ ] **Versioning strategy** — API has a versioning approach (if applicable)
- [ ] **Input validation** — All external input validated at the boundary

**Severity guide for Category 3:**
- Critical: Circular dependencies, secrets in code, no error boundaries
- Warning: Layer violations, high coupling, inconsistent APIs
- Info: Suboptimal organization, minor naming inconsistencies

---

## Category 4: Code Quality Signals (0-20 points)

### 4.1 Complexity Metrics

- [ ] **Cyclomatic complexity** — Functions have CC < 10 (warning at 10-15, critical at 15+)
- [ ] **Nesting depth** — No more than 4 levels of nesting (warning at 4, critical at 6+)
- [ ] **Parameter count** — Functions have < 4 parameters (warning at 4-5, critical at 6+)
- [ ] **File length** — Files under 300 lines (warning at 300-500, critical at 500+)
- [ ] **Function length** — Functions under 40 lines (warning at 40-80, critical at 80+)

### 4.2 Coupling Metrics

- [ ] **Import count** — Files import from < 10 modules (warning at 10-15, critical at 15+)
- [ ] **Fan-out** — Functions call < 7 other functions (warning at 7-10, critical at 10+)
- [ ] **Afferent coupling** — Core modules aren't depended on by everything (God Module signal)
- [ ] **Instability ratio** — Balance between afferent and efferent coupling

### 4.3 Cohesion Signals

- [ ] **LCOM indicators** — Methods in a class use the class's own data (not just pass-through)
- [ ] **No utility class proliferation** — Utility classes are rare and focused, not dumping grounds
- [ ] **Related functions together** — Functions in a file operate on the same data/concept

### 4.4 Code Smells (Fowler/Beck)

- [ ] **Long Method** — Functions doing too many things (> 40 lines)
- [ ] **Large Class** — Classes/modules with too many responsibilities (> 300 lines)
- [ ] **Feature Envy** — Function uses another module's data more than its own
- [ ] **Data Clumps** — Same group of parameters passed together repeatedly
- [ ] **Primitive Obsession** — Using primitives where a value object would add clarity (e.g., raw strings for email, phone)
- [ ] **Message Chains** — Long chains of method calls or property access
- [ ] **Inappropriate Intimacy** — Modules accessing each other's internal/private details
- [ ] **Divergent Change** — One module changed for many different reasons
- [ ] **Shotgun Surgery** — One change requires modifying many modules
- [ ] **Speculative Generality** — Abstractions created for anticipated but non-existent use cases
- [ ] **Dead Code** — Unreachable or unused code still in the codebase

**Severity guide for Category 4:**
- Critical: CC > 15, nesting > 6, functions > 100 lines
- Warning: CC 10-15, nesting 4-5, functions 40-80 lines, Feature Envy, Shotgun Surgery
- Info: Minor smells, Primitive Obsession, small Data Clumps

---

## Category 5: Modern Practices (0-20 points)

### 5.1 Twelve-Factor App Signals

- [ ] **Single codebase** — One repo per deployable, tracked in version control
- [ ] **Explicit dependencies** — All dependencies declared (package.json, requirements.txt, go.mod)
- [ ] **Config in environment** — Config varies by deploy, stored in env vars
- [ ] **Backing services as resources** — DBs, caches, queues treated as attached resources (URL-configured)
- [ ] **Port binding** — App self-contained, exports HTTP via port binding (not embedded in webserver)
- [ ] **Disposability** — Fast startup, graceful shutdown, no long-lived in-memory state critical to operation

### 5.2 Error Handling

- [ ] **Consistent error types** — Errors follow a consistent structure (code, message, details)
- [ ] **No swallowed errors** — Catch blocks always log, re-throw, or handle meaningfully
- [ ] **Error propagation strategy** — Clear pattern for how errors flow through layers
- [ ] **User-facing vs internal** — Error messages appropriate for their audience
- [ ] **Async error handling** — Promises/futures have catch handlers, no unhandled rejections

### 5.3 Testing Signals

- [ ] **Test structure** — Test directory mirrors source directory structure
- [ ] **Critical path coverage** — Core business logic has test files (doesn't need 100% coverage)
- [ ] **Behavior-focused** — Tests describe behavior, not implementation details
- [ ] **Test isolation** — Tests don't depend on each other or on external services
- [ ] **No test anti-patterns** — No testing implementation details, no brittle mocks of internal structure

### 5.4 Dependency Management

- [ ] **Lock file present** — package-lock.json, yarn.lock, poetry.lock, go.sum committed
- [ ] **No deprecated deps** — Major dependencies are maintained and not deprecated
- [ ] **Reasonable dep count** — Dependencies justified (not 50 npm packages for a simple app)
- [ ] **No vendored copies** — Dependencies managed by package manager, not copy-pasted

**Severity guide for Category 5:**
- Critical: No error handling, hardcoded config, no dependency declarations
- Warning: Inconsistent error handling, missing lock file, no tests for critical paths
- Info: Minor 12-Factor deviations, test structure imperfections

---

## Health Score Calculation

### Per-Category Scoring (0-20 each)

```
Points = 20 - (critical_count × 4) - (warning_count × 2) - (info_count × 0.5)
Minimum: 0
```

### Overall Score (0-100)

```
Total = SOLID + Design Principles + Architecture + Code Quality + Modern Practices
```

### Rating Scale

| Score | Rating | Description |
|-------|--------|-------------|
| 80-100 | Excellent | Production-ready, well-maintained, easy to extend |
| 60-79 | Good | Solid foundation with minor issues, suitable for team growth |
| 40-59 | Fair | Functional but accumulating debt, plan improvements before scaling |
| 20-39 | Poor | Significant issues, refactoring needed before adding features |
| 0-19 | Critical | Fundamental problems, major restructuring required |
