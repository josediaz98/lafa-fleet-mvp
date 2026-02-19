# UI Spec Framework

The analytical framework for producing premium UI specifications at LAFA. Three sections: design philosophy, 10 principles, and LAFA design system reference.

---

## Section 1: Design Philosophy

LAFA's UI is shaped by its operational context. These constraints are non-negotiable:

### Dark-First

Fleet ops run 24/7. Night shifts (7pm-7am) are half the business. Supervisors stare at dashboards for 8+ hours. Dark mode is not a toggle — it's the default and only mode.

- **Implication**: All color tokens start from `lafa-bg: #1B1A23`. Light-on-dark contrast must meet WCAG AA (4.5:1 minimum).
- **Anti-pattern**: Designing in light mode and "inverting" later. Colors don't invert cleanly.

### Information-Dense

Ops staff need data density, not decoration. A coordinator managing 30 vehicles at Vallejo needs to see all vehicle statuses, active shifts, and alerts on a single screen without scrolling.

- **Implication**: Compact tables, small type (text-xs/text-sm), minimal padding between data rows. Every pixel earns its place.
- **Anti-pattern**: Hero sections, decorative illustrations, generous whitespace between cards.

### The System Thinks for You

Inspired by Linear: "Flexible software creates chaos." LAFA's ops staff are not power users who want dashboards they can customize. The system should have opinions — pre-filter by center, pre-sort by urgency, pre-select the most common action.

- **Implication**: Supervisors see only their center's data. Default sort is by status urgency. The primary action button does the most common thing.
- **Anti-pattern**: "Customize your dashboard" features. Drag-and-drop layouts. User-configurable widgets.

### Bilingual, Spanish-First

Primary audience speaks Spanish. All UI copy, labels, status names, error messages, and empty states are in Spanish. Technical labels (HTTP status codes, API field names) can be English. The i18n system supports both, but Spanish is the default render.

- **Implication**: Copy sheet always starts with Spanish column. Button labels, toasts, dialogs — all Spanish.
- **Anti-pattern**: English-first copy with "we'll translate later." Copy is UI — it can't be an afterthought.

---

## Section 2: 10 Premium Design Principles

Each principle includes: what it means, why it matters for LAFA, how to apply it, and the anti-pattern to avoid.

### Principle 1: Speed as Trust

> "Performance is the product." — Linear

Users trust fast software. A 200ms response feels instant; 1s feels broken. In fleet ops, delays cost money — a slow check-in screen means a vehicle sits idle.

**Why it matters for LAFA**: Drivers check in at 5am. Supervisors manage 30+ vehicles. Every second of UI delay is a second a $400K asset isn't earning revenue.

**How to apply**:
- Optimistic updates for mutations (check-in, status change, assignment). Show the result immediately, reconcile with server in background.
- Skeleton screens that match the populated layout shape during loading. Never a blank page.
- Micro-interactions under 150ms (hover, focus, button press). Standard transitions at 200ms. Modal transitions at 250ms max.
- `REFRESH_INTERVAL = 60_000` (60s) for background data refresh — no manual reload needed.

**Anti-pattern**: Showing a full-screen spinner while waiting for an API response. Blocking the UI during a mutation. "Loading..." text instead of skeletons.

---

### Principle 2: Opinionated Defaults

> "Flexible software creates chaos." — Linear

Every decision the user has to make is cognitive load. Reduce decisions by having smart defaults.

**Why it matters for LAFA**: Supervisors are not analysts. They manage shifts, not configure software. The system should work correctly out of the box for their center, their shift type, their time window.

**How to apply**:
- Auto-filter by user's `centerId`. Supervisors never see other centers' data.
- Default sort: active shifts by check-in time (oldest first = needs attention). Vehicles by status priority.
- Pre-select current week in payroll. Pre-fill shift type based on time of day (before noon = diurno, after = nocturno).
- New check-in modal pre-filters vehicles to `disponible` status only.

**Anti-pattern**: "Choose your default view." Column reordering. Saved filter presets. Any feature that makes the user configure the tool instead of using it.

---

### Principle 3: Progressive Disclosure

> "Don't make me think — but give me power when I need it." — Slack

Show the minimum information needed to make the next decision. Reveal detail on demand.

**Why it matters for LAFA**: A dashboard with 30 vehicles, 15 active shifts, 3 alerts, and payroll totals would be overwhelming as a flat list. Layer it: summary → detail → history.

**How to apply**:
- **Level 1 (Glance)**: KPI cards, status counts, alert badges. Answers "is everything OK?"
- **Level 2 (Scan)**: Table rows with key fields. Answers "which item needs attention?"
- **Level 3 (Focus)**: SlidePanel or detail view. Answers "what exactly is the situation?"
- **Level 4 (Act)**: Edit form, confirm dialog. Answers "what should I do about it?"

**Anti-pattern**: Showing all vehicle details in the table row. Putting edit forms on the list page. Modals inside modals.

---

### Principle 4: Typography-Driven Hierarchy

> Type size and weight are the primary navigation. — Notion

Use typography — not borders, colors, or boxes — as the primary tool for visual hierarchy.

**Why it matters for LAFA**: Dark interfaces lose contrast when you add borders everywhere. Typography hierarchy keeps the interface clean and scannable.

**How to apply**:
- **Font**: Inter Tight (system-ui fallback)
- **Scale**: text-2xl (page title, bold) → text-sm (section title, semibold) → text-sm (body, regular) → text-xs (caption, secondary color)
- **KPI pattern**: text-3xl bold for value, text-xs uppercase tracking-wider for label
- **Hierarchy through weight**: Bold (700) for headings, Semibold (600) for sub-sections, Regular (400) for body, paired with `lafa-text-primary` vs `lafa-text-secondary` color
- **Eyebrow pattern**: 12px semibold uppercase tracking-wider in `lafa-accent` for category labels

**Anti-pattern**: Using colored backgrounds to separate sections. Adding borders between every element. Using all-caps for emphasis instead of weight changes.

---

### Principle 5: Restrained Color

> Neutral base, semantic color only. — Linear, Slack, Notion

Color is a scarce resource. Use it only to communicate meaning: status, action, or error. Everything else is grayscale.

**Why it matters for LAFA**: The status system has 16 states with distinct colors. If the rest of the UI also uses color decoratively, status colors lose their signal value.

**How to apply**:
- **Base palette**: `lafa-bg`, `lafa-surface`, `lafa-surface-hover`, `lafa-border` — all neutral grays
- **Accent (orange)**: Only for primary CTAs, active filters, the LAFA brand mark
- **Status colors**: `status-active` (blue), `status-success` (green), `status-warning` (amber), `status-danger` (red), `status-info` (purple)
- **Status badge pattern**: 15% opacity background + solid text color (e.g., `rgba(34,197,94,0.15)` bg + `#22C55E` text)
- **Alert pattern**: Red border-left (2px) on rows needing attention (shifts >12h)

**Anti-pattern**: Color-coded sections. Gradient backgrounds. Colored icons for decoration. Using blue for non-status elements.

---

### Principle 6: State Completeness

> "Carrier-grade components." — Slack

Every component must handle every state. No "happy path only" designs. Users will encounter loading, errors, empty results, and disabled states — design for all of them.

**Why it matters for LAFA**: New centers start with zero vehicles. API calls fail on spotty mobile connections at depots. Filters can produce zero results. Every state must look intentional.

**How to apply**:

Every interactive element must specify these 6 states:

| State | Description | Visual Pattern |
|-------|-------------|---------------|
| **Empty** | No data matches criteria | `EmptyState` component: icon + title + description + optional action |
| **Loading** | Data being fetched | Skeleton matching populated layout shape. Pulse animation. |
| **Error** | Fetch or mutation failed | Red banner or inline message + retry button. Never silent failure. |
| **Populated** | Normal display with data | Standard rendering |
| **Hover** | Mouse over interactive element | `lafa-surface-hover` background, 150ms transition |
| **Disabled** | Interaction blocked | 50% opacity, `cursor-not-allowed`, no hover effects |

Additionally for form elements: **Focus** (ring outline, `lafa-accent` color) and **Validation** (error/warning/valid icons via `ValidationIcon`).

**Anti-pattern**: Designing only the populated state. Showing a blank screen during loading. Letting errors fail silently. Forgetting the empty state when all filters are active.

---

### Principle 7: Copy Precision

> "Copy is UI." — Reforge + Notion

Every piece of text in the interface is a design decision. Labels, placeholders, error messages, empty states, tooltips, confirmations — all must be deliberate.

**Why it matters for LAFA**: Ops staff are not tech-savvy. Ambiguous labels create support tickets. Precise copy reduces training time and errors.

**How to apply**:
- **Labels**: Short, noun-based. "Placa" not "Número de placa del vehículo."
- **Placeholders**: Example values, not instructions. "ABC-1234" not "Ingrese la placa."
- **Error messages**: What went wrong + what to do. "No se pudo cerrar el turno. Intenta de nuevo." not "Error."
- **Empty states**: Explain why + suggest action. "No hay turnos activos. Crea un nuevo check-in." not "No hay datos."
- **Confirm dialogs**: Describe the consequence. "Se cerrará el turno de Carlos Mendoza (8.5 hrs). Esta acción no se puede deshacer." not "Confirmar?"
- **Tooltips**: Only when the label isn't self-explanatory. Never tooltip obvious things.
- **Numbers**: `toLocaleString('es-MX')`. Currency: "$9,200 MXN". Time: 24h format. Dates: "19 feb 2026".

**Anti-pattern**: Generic "Error occurred." Generic "No data." Placeholder text that repeats the label. Tooltips on every element.

---

### Principle 8: Spatial Rhythm

> "Reduced noise, increased density." — Linear

Consistent spacing creates rhythm. Rhythm creates scannability. Use a strict spacing system — not "what looks right."

**Why it matters for LAFA**: Dense data tables with inconsistent spacing feel chaotic. Consistent rhythm makes tables with 30+ rows scannable.

**How to apply**:
- **Base unit**: 4px (Tailwind's default)
- **Card padding**: p-6 (24px) for standard cards, p-4 (16px) for compact/nested content
- **Section gaps**: gap-4 (16px) between cards, gap-3 (12px) within card sections
- **Table row padding**: py-3 px-4 (12px vertical, 16px horizontal)
- **Form field spacing**: space-y-4 (16px) between fields
- **Button padding**: px-4 py-2 (16px horizontal, 8px vertical) for standard, px-2.5 py-1 for pills
- **Whitespace as separator**: Prefer margin/gap between sections over border dividers

**Anti-pattern**: Mixing p-3 and p-4 in adjacent cards. Using borders when whitespace would suffice. Different padding inside similar components.

---

### Principle 9: Keyboard Accessibility

> Cmd+K, shortcuts in tooltips. — Linear

Power users (ops staff working 8 hrs/day) should be able to navigate without a mouse. Every action should be reachable via keyboard.

**Why it matters for LAFA**: Ops coordinators process 30+ check-ins and check-outs per shift. Mouse-only workflows add friction to repetitive tasks.

**How to apply**:
- **Tab order**: Logical flow — filters → table → action buttons. Never trap focus.
- **Focus management**: When a modal opens, focus the first input. When it closes, return focus to the trigger.
- **Escape**: Always closes the topmost overlay (modal → slide panel → dropdown).
- **Enter**: Confirms the focused action (select, submit, close shift).
- **Shortcuts**: For high-frequency actions. Show in tooltips: "Cerrar turno (Enter)".
- **Focus ring**: Visible outline (2px, `lafa-accent`) for keyboard navigation. Hidden for mouse clicks.

**Anti-pattern**: Click-only interactions with no keyboard alternative. Focus traps in modals. Hidden focus rings. Custom shortcuts that conflict with browser defaults.

---

### Principle 10: Content-First Chrome

> "Content IS the interface." — Notion

Minimize the weight of navigation, headers, and sidebar. The data — vehicles, drivers, shifts, payroll — IS the product. Chrome should be invisible.

**Why it matters for LAFA**: On a 1366px laptop screen (common in LATAM offices), every pixel given to sidebar/header is a pixel taken from the vehicle table. Data density wins.

**How to apply**:
- **Sidebar**: Collapsed by default on narrow screens. Minimal icons + labels. `lafa-sidebar: #16151E` — darker than page bg to recede.
- **Top header**: Single row. Page title + center filter + primary action. No breadcrumbs, no subtitle, no decorative elements.
- **Content area**: Full width minus sidebar (240px collapsed, none on mobile). The table/cards fill the remaining space.
- **Mobile**: Sidebar replaced by bottom navigation (40px z-index). Full-screen content area.
- **SlidePanel**: max-w-md (448px). Enough for detail, not so much that it obscures the list.

**Anti-pattern**: Multi-row headers. Breadcrumb navigation. "Welcome, Admin" greeting bars. Sidebar with expandable sub-menus. Content area with max-width constraint that wastes screen edges.

---

## Section 3: LAFA Design System Reference

Compact reference of the existing system. Always use these tokens — never hardcode values.

### Color Tokens

#### Brand
| Token | Value | Usage |
|-------|-------|-------|
| `lafa-bg` | `#1B1A23` | Page background |
| `lafa-surface` | `#252B37` | Card, panel, dropdown backgrounds |
| `lafa-surface-hover` | `#2D3444` | Hover state for surfaces |
| `lafa-sidebar` | `#16151E` | Sidebar background (darker to recede) |
| `lafa-border` | `#3A394A` | Borders, dividers, outlines |
| `lafa-accent` | `#FF5A00` | Primary CTA, active state, brand orange |
| `lafa-accent-hover` | `#E54E00` | Accent hover/pressed state |
| `lafa-text-primary` | `#F5F5F5` | Primary text, headings |
| `lafa-text-secondary` | `#9CA3AF` | Secondary text, captions, labels |

#### Status (Semantic)
| Token | Value | Usage | Badge BG (15% opacity) |
|-------|-------|-------|----------------------|
| `status-active` | `#3B82F6` | Active/in-progress states | `rgba(59,130,246,0.15)` |
| `status-success` | `#22C55E` | Success/available/completed | `rgba(34,197,94,0.15)` |
| `status-warning` | `#F59E0B` | Warning/pending/charging | `rgba(245,158,11,0.15)` |
| `status-danger` | `#EF4444` | Danger/error/out-of-service | `rgba(239,68,68,0.15)` |
| `status-info` | `#8B5CF6` | Info/admin/nocturno | `rgba(139,92,246,0.15)` |
| `status-alert` | `#EAB308` | Alert/invited | `rgba(234,179,8,0.15)` |

### Typography

- **Family**: Inter Tight, system-ui fallback
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

| Role | Classes | Usage |
|------|---------|-------|
| Page title | `text-2xl font-semibold` | h1, main page headers |
| Section title | `text-sm font-semibold` | h3, card/section headers |
| KPI value | `text-3xl font-bold` | Dashboard metric values |
| KPI label | `text-xs font-normal uppercase tracking-wider` | Dashboard metric labels |
| Body | `text-sm font-normal` | Default content text |
| Caption | `text-xs text-lafa-text-secondary` | Metadata, timestamps |
| Eyebrow | `text-xs font-semibold uppercase tracking-wider text-lafa-accent` | Category labels |

### Spacing

- **Base unit**: 4px (Tailwind default)
- **Card padding**: `p-6` (24px)
- **Compact padding**: `p-4` (16px)
- **Row padding**: `py-3 px-4`
- **Section gap**: `gap-4` (16px)
- **Form field gap**: `space-y-4`
- **Pill padding**: `px-2.5 py-1`

### Border Radius

| Element | Class | Value |
|---------|-------|-------|
| Cards | `rounded-xl` | 12px |
| Modals | `rounded-2xl` | 16px |
| Pills/Badges | `rounded-full` | 9999px |
| Buttons | `rounded` | 4px |
| Inputs | `rounded` | 4px |
| Avatars | `rounded-full` | 50% |

### Transitions

| Speed | Duration | Usage |
|-------|----------|-------|
| Micro | 150ms | Hover, focus, button press, tab switch |
| Standard | 200ms | Card hover, pill toggle, loading→populated |
| Modal | 250ms | Modal/panel open, toast appear, progress bar |
| Easing | `ease-out` | Default for all transitions |

### Z-Index Layers

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Bottom nav (mobile) | 40 | Mobile navigation |
| Sidebar backdrop | 45 | Mobile sidebar overlay |
| SlidePanel backdrop | 70 | Panel overlay |
| SlidePanel content | 71 | Panel foreground |
| Modal backdrop | 80 | Modal overlay |
| Modal content | 81 | Modal foreground |
| ConfirmDialog backdrop | 90 | Confirm overlay |
| ConfirmDialog content | 91 | Confirm foreground |

### Existing UI Components

Reference these before creating new ones:

| Component | Path | Key Props | Notes |
|-----------|------|-----------|-------|
| `StatusBadge` | `ui/StatusBadge.tsx` | `status`, `label?` | Maps to STATUS_CONFIG, rounded-md |
| `Modal` | `ui/Modal.tsx` | `open`, `onClose`, `title`, `children` | Escape closes, backdrop click closes, scale animation |
| `SlidePanel` | `ui/SlidePanel.tsx` | `open`, `onClose`, `title`, `children` | Right slide-in, max-w-md, sticky header, scrollable body |
| `EmptyState` | `ui/EmptyState.tsx` | `icon`, `title`, `description?` | Centered column, 12x12 icon circle |
| `ConfirmDialog` | `ui/ConfirmDialog.tsx` | via `useConfirmDialog()` hook | Promise-based, variant: 'danger' or 'default' |
| `SearchableSelect` | `ui/SearchableSelect.tsx` | `options`, `value`, `onChange`, `label?` | Search bar, sublabel support, max 48 items scroll |
| `CenterFilterDropdown` | `ui/CenterFilterDropdown.tsx` | `variant?: 'select' \| 'pills'` | Admin-only, auto-hides for supervisors |
| `ValidationIcon` | `ui/ValidationIcon.tsx` | `estado`, `msg?` | Check/Warning/X circle icons |
| `ErrorBoundary` | `ui/ErrorBoundary.tsx` | `children` | Catch + fallback + reset button |

### Status Map (16 statuses)

| Value | Label | Color | Use Case |
|-------|-------|-------|----------|
| `en_turno` | En turno | Blue | Active shift |
| `completado` | Completado | Green | Closed shift |
| `pendiente_revision` | Pend. revision | Yellow | Shift >12h open |
| `disponible` | Disponible | Green | Vehicle ready |
| `cargando` | Cargando | Yellow | Vehicle charging |
| `mantenimiento` | Mantenimiento | Orange | Vehicle in maintenance |
| `fuera_de_servicio` | Fuera de servicio | Red | Vehicle out of service |
| `activo` | Activo | Green | Active driver/user |
| `invitado` | Invitado | Yellow | Invited user |
| `inactivo` | Inactivo | Gray | Inactive driver/user |
| `admin` | Admin | Purple | Admin role |
| `supervisor` | Supervisor | Blue | Supervisor role |
| `diurno` | Diurno | Yellow | Day shift preference |
| `nocturno` | Nocturno | Purple | Night shift preference |
| `alerta` | Alerta | Red | Alert state |
| `cerrado` | Cerrado | Green | Payroll week closed |

### Icons

- **Library**: lucide-react
- **Sizes**: 14px (inline), 16px (badges/buttons), 20px (navigation), 24px (empty states)
- **Color**: Via Tailwind text color classes (monocolor, never multi-color)
- **Common icons**: ChevronDown, Search, X, CheckCircle, AlertTriangle, XCircle, Plus, Edit, Trash2, Clock, Car, User, Calendar

---

## Section 4: Specification Process (Reforge-Adapted)

Adapted from Reforge's product development process for the context where AI is both designer and implementer.

### Why This Process

Traditional design processes assume a human designer iterating in Figma. LAFA's context is different: Claude is both the designer (specifying the UI) and the implementer (writing the code). The spec must be precise enough that the same AI can implement it without ambiguity.

### Process Steps

| Step | Reforge Origin | AI Adaptation | Time % |
|------|---------------|---------------|--------|
| **Understand** | Context gathering | Read codebase: tokens, components, types, existing patterns | 15% |
| **Soul** | "Soul of the project" | One sentence: what must this UI accomplish? | 5% |
| **Diverge** | Double Diamond divergence | 2-3 text-described approaches (not wireframes) | 10% |
| **Converge** | Convergence + criteria | Select approach, justify against 10 principles | 10% |
| **Specify** | Fidelity progression | Fill template: layout → components → states → copy | 50% |
| **Validate** | Objective quality gate | 10-principle checklist — fix failures before delivery | 10% |

### Appetite Levels

Borrowed from Shape Up. Define upfront to prevent scope creep:

| Level | Time | Example |
|-------|------|---------|
| **Quick fix** | Hours | Add a tooltip to an existing button |
| **Core improvement** | Days | Redesign the shift close flow |
| **Strategic bet** | Weeks | Build the vehicle detail page from scratch |

The appetite determines spec depth: quick fixes need 2-3 template sections; strategic bets need all 8.

### Convergence Criteria

When choosing between approaches in Step 4, score each against:

1. Does it serve the Soul? (mandatory — disqualify if no)
2. Which premium principles does it best serve?
3. How much existing code/components can it reuse?
4. What's the implementation complexity vs. the appetite?
5. Does the primary user achieve their goal faster with this approach?

Select the approach that scores highest on criteria 1-2 while being feasible within criteria 3-4.
