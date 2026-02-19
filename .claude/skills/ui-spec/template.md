# UI Spec Template

Use this template for all UI specification outputs. Fill every section. If a section doesn't apply, write "N/A — [reason]" rather than omitting it.

---

```markdown
# UI Spec: {Feature Name}
> {One-line description} | {Date} | {Author}

## 1. Soul

{One sentence: the core thing this UI must accomplish. Everything in this spec serves this sentence.}

## 2. Context

| Field | Value |
|-------|-------|
| Goal type | {Learning / Quick fix / Core improvement / Strategic bet} |
| Appetite | {Hours / Days / Weeks} |
| Primary user | {Role + context, e.g., "ops coordinator managing 30 vehicles at Vallejo"} |
| Key scenario | {What they're trying to do when they reach this UI} |
| Entry point | {How do they get here? Sidebar nav / row click / URL / button} |

### Dependencies
- **Data source**: {Supabase table(s) / mock data / computed}
- **Types**: {TypeScript interfaces used, e.g., `Vehicle`, `Shift`, `Driver`}
- **Existing components**: {List reusable components from `ui/`}

## 3. Layout

### Desktop (>=1024px)

{ASCII layout or structured description}

```
┌─────────────────────────────────────────────┐
│ Header: Title + Filters + Action Button     │
├─────────────────────────────────────────────┤
│                                             │
│  [Main content area description]            │
│                                             │
├─────────────────────────────────────────────┤
│ Footer (if applicable)                      │
└─────────────────────────────────────────────┘
```

### Tablet (768px–1023px)
{What changes: column collapse, hidden elements, stacking}

### Mobile (<768px)
{What changes: full-width cards, bottom sheet modals, hidden columns}

### Reference
{Existing page this layout is closest to, e.g., "Follows Shifts page pattern: header + tabs + content"}

## 4. Components

### 4.1 {Component Name}

| Field | Value |
|-------|-------|
| Type | {New / Existing (`ui/ComponentName.tsx`)} |
| Purpose | {What it does in one line} |

**Variants:**
{List if applicable, e.g., default, compact, alert}

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ... | ... | ... | ... |

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | {Description} | {What data condition triggers this} |
| Loading | {Skeleton / spinner / pulse} | {During fetch} |
| Error | {Error message + retry action} | {Fetch failure} |
| Populated | {Normal rendering} | {Data available} |
| Hover | {Background change / border / elevation} | — |
| Disabled | {Opacity reduction + cursor change} | {When interaction is blocked} |

**Interactions:**
| Trigger | Action | Feedback |
|---------|--------|----------|
| Click | {What happens} | {Visual response, e.g., "row highlights with lafa-surface-hover"} |
| Hover | {What happens} | {Transition: 150ms ease-out} |
| Keyboard | {Tab/Enter/Escape behavior} | {Focus ring style} |

### 4.2 {Next Component}
{Repeat structure}

## 5. States & Transitions

### Page-Level States

| State | Trigger | Visual |
|-------|---------|--------|
| Loading | Initial mount / refresh | {Skeleton layout matching populated structure} |
| Empty | Zero results after filter | {EmptyState component: icon + title + description} |
| Error | API failure | {Error banner + retry button} |
| Populated | Data available | {Normal page rendering} |

### Transitions

| From → To | Duration | Easing | Property |
|-----------|----------|--------|----------|
| Loading → Populated | 200ms | ease-out | opacity |
| Tab switch | 150ms | ease-out | opacity + translateY |
| Modal open | 250ms | ease-out | opacity + scale |
| Modal close | 200ms | ease-in | opacity + scale |

### Optimistic Updates
{Which actions show immediate feedback before server confirmation?}

## 6. Copy Sheet

| Element | Spanish | English (if bilingual) | Notes |
|---------|---------|----------------------|-------|
| Page title | ... | ... | |
| Page subtitle | ... | ... | |
| Empty state title | ... | ... | |
| Empty state description | ... | ... | |
| Error message | ... | ... | |
| Loading text | ... | ... | {If visible, not skeleton} |
| CTA button | ... | ... | |
| Confirm dialog title | ... | ... | |
| Confirm dialog description | ... | ... | |
| Success toast | ... | ... | |
| {Labels} | ... | ... | |
| {Placeholders} | ... | ... | |
| {Tooltips} | ... | ... | |

### Copy Rules
- **Tone**: Professional, concise, never cutesy
- **Numbers**: Use `toLocaleString('es-MX')` for formatting
- **Currency**: Always prefix with `$` and suffix with `MXN` for amounts > $1,000
- **Dates**: `DD MMM YYYY` format (e.g., "19 feb 2026")
- **Times**: 24h format (e.g., "14:30")

## 7. Accessibility

### Tab Order
{Numbered list of focusable elements in order}

1. {First focusable element}
2. {Second focusable element}
3. ...

### Keyboard Shortcuts
| Key | Action | Scope |
|-----|--------|-------|
| `Escape` | {Close modal/panel/dropdown} | {When modal is open} |
| `Enter` | {Confirm / select} | {On focused item} |
| `Tab` | {Move focus forward} | {Global} |

### ARIA Labels
| Element | Attribute | Value |
|---------|-----------|-------|
| ... | `aria-label` | ... |
| ... | `role` | ... |

### Color Contrast
{Confirm all text meets WCAG AA (4.5:1 for normal, 3:1 for large text) against lafa-bg and lafa-surface backgrounds}

## 8. Open Questions

- [ ] {Unresolved decision 1}
- [ ] {Unresolved decision 2}
- [ ] ...

---

### Validation Checklist

Run before delivering:

- [ ] Speed as Trust — optimistic updates, skeleton screens, <200ms micro-interactions
- [ ] Opinionated Defaults — smart defaults, no unnecessary customization
- [ ] Progressive Disclosure — information layered, not all at once
- [ ] Typography-Driven Hierarchy — Inter Tight scale, weight/size not borders
- [ ] Restrained Color — `lafa.*` and `status.*` tokens only
- [ ] State Completeness — every element has 6 states
- [ ] Copy Precision — all text specified, Spanish-first
- [ ] Spatial Rhythm — 4px grid, consistent padding
- [ ] Keyboard Accessibility — tab order, focus management, shortcuts
- [ ] Content-First Chrome — data is the UI, minimal chrome
```
