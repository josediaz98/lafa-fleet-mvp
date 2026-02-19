# UI Spec Examples

Two worked examples demonstrating the template at different scopes. Both use real LAFA data.

---

## Example 1: Page-Level — Vehicle Detail Page

A full-page spec showing how to handle a complex, data-heavy view with multiple data sources and progressive disclosure.

---

# UI Spec: Vehicle Detail Page
> Comprehensive vehicle view with status, assignment history, and maintenance tracking | 19 feb 2026 | Claude

## 1. Soul

Let ops coordinators understand a vehicle's complete situation — current status, who's driving it, and its recent history — without leaving the vehicle list.

## 2. Context

| Field | Value |
|-------|-------|
| Goal type | Core improvement |
| Appetite | Days |
| Primary user | Ops coordinator managing 30 vehicles at Vallejo (c1) |
| Key scenario | Coordinator notices a vehicle hasn't checked in today. Clicks to understand why: maintenance? Driver issue? Forgotten check-out? |
| Entry point | Click on vehicle row in Vehicles list page → SlidePanel opens from right |

### Dependencies
- **Data source**: `vehicles` table + `shifts` (filtered by vehicleId) + `drivers` (for assignment)
- **Types**: `Vehicle`, `Shift`, `Driver`
- **Existing components**: `SlidePanel`, `StatusBadge`, `EmptyState`, `ValidationIcon`

## 3. Layout

### Desktop (>=1024px)

This uses the existing SlidePanel pattern (right side, max-w-md = 448px). The vehicle list remains visible behind.

```
┌──────────────────────────────┬───────────────────────┐
│  Vehicle List (existing)     │  SlidePanel            │
│  ┌──────────────────────┐    │  ┌─────────────────┐   │
│  │ Filter bar           │    │  │ Header:          │   │
│  ├──────────────────────┤    │  │ Plate + Model    │   │
│  │ ABC-1234 Geometry C  │◄───│  │ OEM + Center     │   │
│  │ DEF-5678 Geometry C  │    │  │ Status badge     │   │
│  │ GHI-9012 E10X        │    │  ├─────────────────┤   │
│  │ JKL-3456 Aion S      │    │  │ Status Actions   │   │
│  │ ...                  │    │  │ [Pill buttons]   │   │
│  └──────────────────────┘    │  ├─────────────────┤   │
│                              │  │ Tabs:            │   │
│                              │  │ Info | Turnos    │   │
│                              │  ├─────────────────┤   │
│                              │  │ Tab content      │   │
│                              │  │ (scrollable)     │   │
│                              │  └─────────────────┘   │
└──────────────────────────────┴───────────────────────┘
```

### Tablet (768px–1023px)
SlidePanel overlays the list (same as desktop, list obscured by backdrop).

### Mobile (<768px)
SlidePanel becomes full-screen overlay. Close button (X) in top-right.

### Reference
Follows the existing VehicleDetailPanel pattern but adds tabs for shift history.

## 4. Components

### 4.1 VehicleDetailHeader

| Field | Value |
|-------|-------|
| Type | New (inline within SlidePanel, not standalone component) |
| Purpose | Show vehicle identity at a glance |

**Layout:**
```
ABC-1234                          [Edit] (admin only)
Geometry C · Geely
Vallejo                    ● Disponible
```

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | N/A — header always has vehicle data | Never triggers |
| Loading | Skeleton: 2 lines of text (w-32 h-5 + w-48 h-4) | Initial panel open |
| Error | N/A — if vehicle load fails, panel shows error | Fetch failure |
| Populated | Plate (text-lg font-semibold), model + OEM (text-sm secondary), center + status | Data available |
| Hover | N/A — header is not interactive | — |
| Disabled | N/A | — |

### 4.2 StatusActionPills

| Field | Value |
|-------|-------|
| Type | Existing pattern (from VehicleDetailPanel) |
| Purpose | Change vehicle status without opening a form |

**Variants:** One pill per valid status transition. Current status is highlighted (lafa-accent).

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentStatus | string | yes | Current vehicle status |
| onStatusChange | (status: string) => void | yes | Callback on pill click |
| isAdmin | boolean | yes | Controls which statuses are available |

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | N/A — always has at least current status | — |
| Loading | Pill that was clicked shows spinner (16px) replacing text | During mutation |
| Error | Failed pill flashes red border, reverts to previous state | Mutation failure |
| Populated | Row of pills, active one in lafa-accent, others in lafa-border | Normal |
| Hover | Pill background → lafa-surface-hover, 150ms | Mouse over non-active pill |
| Disabled | Supervisor cannot change to `fuera_de_servicio` — pill hidden, not disabled | Role restriction |

**Interactions:**
| Trigger | Action | Feedback |
|---------|--------|----------|
| Click non-active pill | Optimistic status change + API call | Pill immediately becomes active (orange), ConfirmDialog for `fuera_de_servicio` |
| Hover | Background transition | 150ms ease-out |
| Keyboard (Tab + Enter) | Same as click | Focus ring on pill |

### 4.3 VehicleInfoTab

| Field | Value |
|-------|-------|
| Type | New (tab content) |
| Purpose | Show vehicle details in read/edit mode |

**Layout:** 2-column grid of field pairs:
```
Placa           Modelo
ABC-1234        Geometry C

OEM             Centro
Geely           Vallejo

Estado          Fecha alta
Disponible      15 oct 2025
```

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | N/A — vehicle always has these fields | — |
| Loading | Skeleton grid: 6 cells, each w-24 h-4 | During fetch |
| Error | Error banner + retry | Fetch failure |
| Populated | Label (text-xs secondary uppercase) + value (text-sm primary) pairs | Normal |
| Hover | N/A — read-only view | — |
| Disabled | N/A | — |

### 4.4 VehicleShiftsTab

| Field | Value |
|-------|-------|
| Type | New (tab content) |
| Purpose | Show recent shift history for this vehicle |

**Layout:** Compact list of recent shifts (last 10):
```
Carlos Mendoza    19 feb    En turno     3.5 hrs
Luis Hernández    18 feb    Completado   9.0 hrs
Miguel Torres     17 feb    Completado   8.5 hrs
```

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | EmptyState: Car icon, "Sin turnos registrados", "Este vehiculo no tiene historial de turnos." | No shifts for vehicle |
| Loading | 3 skeleton rows (w-full h-10) with pulse | Fetching shifts |
| Error | Inline error text + retry link | Fetch failure |
| Populated | List of ShiftRow items, most recent first | Shifts exist |
| Hover | Row background → lafa-surface-hover | Mouse over row |
| Disabled | N/A | — |

**Interactions:**
| Trigger | Action | Feedback |
|---------|--------|----------|
| Click row | No action (read-only history) | Row highlights |
| Hover | Background transition | 150ms ease-out |

## 5. States & Transitions

### Page-Level States

| State | Trigger | Visual |
|-------|---------|--------|
| Loading | Panel opens, vehicle data fetching | Skeleton header + skeleton tab content |
| Empty | N/A — panel only opens with a selected vehicle | Never triggers |
| Error | Vehicle fetch fails | Error message + close panel option |
| Populated | Data available | Full header + tabs + content |

### Transitions

| From → To | Duration | Easing | Property |
|-----------|----------|--------|----------|
| Panel closed → open | 250ms | ease-out | translateX(100% → 0) + opacity |
| Panel open → closed | 200ms | ease-in | translateX(0 → 100%) + opacity |
| Tab switch | 150ms | ease-out | opacity (fade out/in) |
| Status pill click | 150ms | ease-out | background-color (optimistic) |

### Optimistic Updates
- **Status change**: Pill becomes active immediately. If server rejects, revert after 200ms with red flash.
- **No other mutations** on this panel (edit is a separate flow via Modal).

## 6. Copy Sheet

| Element | Spanish | English | Notes |
|---------|---------|---------|-------|
| Panel title | (plate number, e.g., "ABC-1234") | — | Dynamic |
| Tab: Info | Informacion | — | |
| Tab: Shifts | Turnos | — | |
| Info field: Plate | Placa | — | |
| Info field: Model | Modelo | — | |
| Info field: OEM | Fabricante | — | |
| Info field: Center | Centro | — | |
| Info field: Status | Estado | — | |
| Info field: Start date | Fecha alta | — | |
| Empty shifts title | Sin turnos registrados | — | |
| Empty shifts desc | Este vehiculo no tiene historial de turnos. | — | |
| Edit button | Editar | — | Admin only |
| Error message | No se pudo cargar el vehiculo. Intenta de nuevo. | — | |
| Status pill: disponible | Disponible | — | |
| Status pill: cargando | Cargando | — | |
| Status pill: mantenimiento | Mantenimiento | — | |
| Status pill: fuera_de_servicio | Fuera de servicio | — | Admin only |
| Confirm: fuera_de_servicio | Marcar vehiculo como fuera de servicio? | — | |
| Confirm: fuera_de_servicio desc | El vehiculo no estara disponible para asignacion. | — | |
| Shift row: hours | {n} hrs | — | e.g., "8.5 hrs" |

## 7. Accessibility

### Tab Order
1. Close button (X) in SlidePanel header
2. Edit button (if admin)
3. Status action pills (left to right)
4. Tab: Informacion
5. Tab: Turnos
6. Tab content (scrollable area)

### Keyboard Shortcuts
| Key | Action | Scope |
|-----|--------|-------|
| `Escape` | Close panel | When panel is open |
| `Tab` | Move focus through elements | Standard |
| `Enter` | Activate focused pill / switch tab | On pill or tab |
| `Arrow Left/Right` | Navigate between pills | When pills are focused |

### ARIA Labels
| Element | Attribute | Value |
|---------|-----------|-------|
| SlidePanel | `aria-label` | "Detalle del vehiculo {plate}" |
| Status pills | `role` | "radiogroup" |
| Each pill | `role` | "radio" |
| Each pill | `aria-checked` | "true/false" |
| Tab list | `role` | "tablist" |
| Each tab | `role` | "tab" |
| Tab content | `role` | "tabpanel" |

### Color Contrast
- `lafa-text-primary` (#F5F5F5) on `lafa-surface` (#252B37) = 10.2:1 (passes AA)
- `lafa-text-secondary` (#9CA3AF) on `lafa-surface` (#252B37) = 4.6:1 (passes AA)
- Status badge text on 15% opacity bg: all pass AA

## 8. Open Questions

- [ ] Should shift history show all-time or last 30 days? (Recommend: last 30 shifts, with "Ver mas" link)
- [ ] Should the panel show current driver assignment prominently in the header? (Recommend: yes, below status badge)
- [ ] Should edit mode be inline in the panel or open a Modal? (Recommend: Modal, matching existing pattern)

---

### Validation Checklist

- [x] Speed as Trust — optimistic status change, skeleton loading, 150-250ms transitions
- [x] Opinionated Defaults — panel opens on Info tab, shifts sorted newest-first
- [x] Progressive Disclosure — header (glance) → tabs (scan) → tab content (focus)
- [x] Typography-Driven Hierarchy — plate in text-lg semibold, model in text-sm secondary, labels in text-xs uppercase
- [x] Restrained Color — only StatusBadge and accent pills use color, rest is neutral
- [x] State Completeness — all 4 components have 6 states specified
- [x] Copy Precision — all labels in Spanish, error messages actionable, empty state descriptive
- [x] Spatial Rhythm — consistent p-4/p-6 padding, gap-3 between fields
- [x] Keyboard Accessibility — full tab order, escape closes, arrow keys for pills, ARIA roles
- [x] Content-First Chrome — no decorative elements, data fills the panel, minimal header

---

## Example 2: Component-Level — Shift Assignment Card

A component-level spec showing how to handle a self-contained interactive element with multiple workflow states.

---

# UI Spec: Shift Assignment Card
> Compact card showing a single active shift with driver, vehicle, and elapsed time | 19 feb 2026 | Claude

## 1. Soul

Let supervisors see at a glance whether an active shift needs attention — and close it in one click.

## 2. Context

| Field | Value |
|-------|-------|
| Goal type | Core improvement |
| Appetite | Hours |
| Primary user | Supervisor at Granada (c2), managing 10 active shifts per screen |
| Key scenario | Supervisor scans active shifts tab. Needs to spot: who's been driving too long (>12h), who just started, who needs closing. |
| Entry point | Rendered inside Shifts page → Activos tab, one card per active shift |

### Dependencies
- **Data source**: `shifts` table (status = 'en_turno')
- **Types**: `Shift` (id, driverId, driverName, vehicleId, plate, model, center, checkIn, status)
- **Existing components**: `StatusBadge` (for status), existing `ShiftRow` pattern as baseline

## 3. Layout

### Desktop (>=1024px)

Each card is a single row (flex, horizontal). Cards stack vertically in the Activos tab.

```
┌─────────────────────────────────────────────────────────────┐
│ ● Carlos Mendoza    Vallejo    ABC-1234    14:30    3h 25m  │ [Cerrar]
│   Geometry C                                        ▲alert  │
└─────────────────────────────────────────────────────────────┘
```

**Normal variant** (shift < 12h):
- Left: driver name (font-medium), center (text-xs secondary)
- Center: plate (font-mono), model (text-xs secondary)
- Right: check-in time, elapsed time (computed), close button

**Alert variant** (shift > 12h = SHIFT_WINDOW_MS):
- Red left border (2px, status-danger)
- Elapsed time in status-danger color
- StatusBadge shows "Pend. revision" instead of "En turno"

### Tablet (768px–1023px)
Hide center column. Plate and model merge into one cell.

### Mobile (<768px)
Two-line layout:
```
Line 1: ● Carlos Mendoza        3h 25m  [Cerrar]
Line 2:   ABC-1234 · Geometry C · 14:30
```

### Reference
Extends existing ShiftRow component in Shifts page.

## 4. Components

### 4.1 ShiftAssignmentCard

| Field | Value |
|-------|-------|
| Type | Existing (`ShiftRow` in Shifts feature — extend with new variant) |
| Purpose | Single active shift display with close action |

**Variants:**
- `default` — Normal active shift (< 12h)
- `alert` — Overdue shift (> 12h), red border + danger colors

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| shift | Shift | yes | The shift data object |
| onClose | (shiftId: string) => void | yes | Callback when close button clicked |
| variant | 'default' \| 'alert' | no | Auto-computed from elapsed time vs SHIFT_WINDOW_MS |

**States:**

| State | Visual | Data |
|-------|--------|------|
| Empty | N/A — card only renders when a shift exists | — |
| Loading | Single skeleton row: w-full h-14 rounded-xl pulse | Initial fetch |
| Error | N/A — error handled at page level, not per-card | — |
| Populated (default) | Neutral card, lafa-surface bg, standard text colors | Shift < 12h |
| Populated (alert) | Red left border, elapsed time in status-danger, badge = "Pend. revision" | Shift > 12h |
| Hover | Background → lafa-surface-hover, 150ms ease-out | Mouse over card |
| Disabled | Close button grayed out during mutation | While closing |

**Interactions:**
| Trigger | Action | Feedback |
|---------|--------|----------|
| Click close button | Open ConfirmDialog: "Cerrar turno de {driverName}?" | Button shows spinner during API call |
| Confirm close | Optimistic: card fades out (200ms) → moves to Completados tab | Toast: "Turno cerrado: {driverName}" |
| Reject close | Dialog closes, no change | — |
| Hover card | Background transition | 150ms ease-out to lafa-surface-hover |
| Hover close button | Button bg → lafa-accent-hover | 150ms ease-out |
| Tab to card → Enter | Same as click close (when close button focused) | Focus ring on button |

## 5. States & Transitions

### Page-Level States

N/A — this is a component spec. Page states are handled by the Shifts page.

### Transitions

| From → To | Duration | Easing | Property |
|-----------|----------|--------|----------|
| Loading → Populated | 200ms | ease-out | opacity |
| Populated → Closing (optimistic) | 200ms | ease-out | opacity + height (collapse) |
| Normal → Alert | Instant | — | Class swap (no animation — threshold is checked on render/refresh) |
| Hover in | 150ms | ease-out | background-color |
| Hover out | 150ms | ease-out | background-color |

### Optimistic Updates
- **Close shift**: Card immediately starts fade-out animation. If server rejects, card reappears with error toast.
- **Elapsed time**: Computed client-side from `checkIn` timestamp. Updates every 60s with `REFRESH_INTERVAL`.

## 6. Copy Sheet

| Element | Spanish | English | Notes |
|---------|---------|---------|-------|
| Close button | Cerrar | — | |
| Confirm title | Cerrar turno de {driverName}? | — | Dynamic name |
| Confirm desc | Se registraran {elapsed} horas trabajadas. Esta accion no se puede deshacer. | — | Dynamic hours |
| Confirm button | Cerrar turno | — | |
| Cancel button | Cancelar | — | |
| Success toast | Turno cerrado: {driverName} | — | |
| Error toast | No se pudo cerrar el turno. Intenta de nuevo. | — | |
| Elapsed format | {h}h {m}m | — | e.g., "3h 25m" or "14h 10m" |
| Alert tooltip | Turno abierto por mas de 12 horas | — | On alert badge hover |
| Check-in label | Entrada | — | Mobile layout |
| Status: normal | En turno | — | Via StatusBadge |
| Status: alert | Pend. revision | — | Via StatusBadge |

## 7. Accessibility

### Tab Order
1. Card container (focusable for screen readers)
2. Close button

### Keyboard Shortcuts
| Key | Action | Scope |
|-----|--------|-------|
| `Enter` | Trigger close action | When close button focused |
| `Escape` | Close ConfirmDialog | When dialog is open |
| `Tab` | Move to next card's close button | Between cards |

### ARIA Labels
| Element | Attribute | Value |
|---------|-----------|-------|
| Card container | `aria-label` | "Turno activo: {driverName}, {plate}, {elapsed}" |
| Close button | `aria-label` | "Cerrar turno de {driverName}" |
| Alert badge | `aria-live` | "polite" (announces when shift crosses 12h threshold) |
| Elapsed time | `aria-label` | "{hours} horas {minutes} minutos" (full text for screen readers) |

### Color Contrast
- Driver name (#F5F5F5) on lafa-surface (#252B37) = 10.2:1 (passes AA)
- Secondary text (#9CA3AF) on lafa-surface = 4.6:1 (passes AA)
- Alert elapsed (#EF4444) on lafa-surface = 5.2:1 (passes AA)
- Close button text (#F5F5F5) on lafa-accent (#FF5A00) = 4.5:1 (passes AA, borderline — use font-semibold)

## 8. Open Questions

- [ ] Should clicking anywhere on the card open a shift detail panel, or is the card self-contained? (Recommend: self-contained for Activos, clickable for Completados)
- [ ] Should alert cards auto-sort to the top of the list? (Recommend: yes, alert cards first, then sorted by check-in time ascending)

---

### Validation Checklist

- [x] Speed as Trust — optimistic close with fade animation, elapsed time computed client-side
- [x] Opinionated Defaults — alert variant auto-computed, no manual flagging needed
- [x] Progressive Disclosure — card shows summary; close action requires confirmation dialog
- [x] Typography-Driven Hierarchy — driver name (medium weight) > plate (mono) > center/model (xs secondary)
- [x] Restrained Color — only red border for alert + StatusBadge + orange for close button
- [x] State Completeness — 6 states specified, alert variant separately documented
- [x] Copy Precision — confirm dialog includes driver name + hours, error message is actionable
- [x] Spatial Rhythm — single row, consistent padding, mobile wraps predictably
- [x] Keyboard Accessibility — tab between cards, enter to close, escape for dialog, ARIA labels
- [x] Content-First Chrome — no decorative elements, driver/vehicle/time IS the card
