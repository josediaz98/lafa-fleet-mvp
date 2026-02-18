# Lovable / Replit Agent / v0.dev Prompt — Fleet Intelligence & Payroll MVP

> **Usage:** Copy this entire file into Lovable, Replit Agent, or v0.dev as a single prompt. It is fully self-contained — no external files needed.

> **⚠️ PRIORITY: Render ALL 8 screens first.** This is a UI-first prototype. Build every screen with hardcoded mock data visible on page load. Do NOT spend time wiring auth, state management, or CRUD logic — just render the layouts, tables, cards, forms, and charts with static data. After all screens render correctly, we will wire Supabase (PostgreSQL + Auth + RLS) as the persistence layer in a second pass.

---

## 1. Project Overview

Build a **Fleet Intelligence & Payroll MVP** — an internal operations tool for LAFA, an electric vehicle fleet operator in Mexico City.

**What it does:**
1. **Fleet unit assignment** — supervisors assign vehicles to drivers per shift (check-in / check-out)
2. **Payroll calculation** — automated weekly payroll based on hours worked + DiDi billing data

**Who uses it:**
- **Admin (1 person):** Global visibility, payroll closure, CSV upload, CRUD everything
- **Supervisors (3 people):** Daily operations at their assigned center (Vallejo, Granada, or Roma)
- **Drivers (~30):** NOT system users — they are data records managed by Admin/Supervisor

**Tech Stack:**
- React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Row Level Security)
- Supabase handles auth (email/password), data persistence, and RBAC via RLS policies
- Mock data available for initial scaffolding; Supabase seed SQL for full stack
- Dark theme by default (internal tool aesthetic)

**One-shot goal:** Scaffold ALL 8 screens (Login, Dashboard, Shifts, CSV Upload, Payroll, Drivers, Vehicles, Users) in a single generation. Each screen should render with visible mock data (tables populated, cards with numbers, forms with dropdowns pre-filled). Prioritize visual completeness over working logic.

---

## 2. Brand Design Tokens

### Colors

```typescript
const COLORS = {
  // Core
  primaryDark: '#252B37',    // Dark blue-grey — text, card backgrounds
  accent: '#FF5A00',         // LAFA orange — buttons, links, active states
  background: '#1B1A23',     // Near-black — page background
  surface: '#2A2935',        // Slightly lighter — card/panel backgrounds
  surfaceHover: '#33323E',   // Hover state for cards
  border: '#3A394A',         // Subtle borders

  // Text
  textPrimary: '#F5F5F5',    // High-contrast white
  textSecondary: '#A0A0B0',  // Muted text
  textTertiary: '#6B6B7B',   // Placeholder / disabled

  // Status badges (semi-transparent backgrounds)
  statusGreen: 'rgba(34, 197, 94, 0.15)',    // Active, completed, goal met
  statusGreenText: '#22C55E',
  statusYellow: 'rgba(234, 179, 8, 0.15)',   // Pending, warning
  statusYellowText: '#EAB308',
  statusRed: 'rgba(239, 68, 68, 0.15)',      // Alert, review needed
  statusRedText: '#EF4444',
  statusGray: 'rgba(156, 163, 175, 0.15)',   // Inactive, disabled
  statusGrayText: '#9CA3AF',
} as const;
```

### Typography

- **Font:** Inter Tight (import from Google Fonts: `@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap')`)
- Apply `font-family: 'Inter Tight', system-ui, sans-serif` globally

### Spacing & Radius

- **Base spacing unit:** 4px (use multiples: 8, 12, 16, 24, 32, 48)
- **Border radius:** 8px (consistent rounded corners, not pill-shaped)
- **Card padding:** 16px or 24px
- **Page padding:** 24px or 32px

### Tailwind Config Extension

```javascript
// Add to tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        lafa: {
          dark: '#252B37',
          accent: '#FF5A00',
          bg: '#1B1A23',
          surface: '#2A2935',
          'surface-hover': '#33323E',
          border: '#3A394A',
        }
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      }
    }
  }
}
```

---

## 3. Authentication & RBAC

### Roles

| Role | Scope | Description |
|------|-------|-------------|
| **Admin** | Global (all 3 centers) | Full access. Creates supervisors, uploads DiDi CSVs, executes payroll closure, CRUD on all entities |
| **Supervisor** | Scoped to 1 center | Check-in/check-out drivers, assign vehicles from their center pool, view payroll (read-only), list drivers/vehicles of their center |

**Hierarchy:** Admin ⊃ Supervisor (Admin can do everything a Supervisor can).

### Demo Users (pre-seeded)

| Email | Password | Role | Center |
|-------|----------|------|--------|
| `admin@lafa.mx` | `admin123` | Admin | Global |
| `vallejo@lafa.mx` | `super123` | Supervisor | Vallejo |
| `granada@lafa.mx` | `super123` | Supervisor | Granada |
| `roma@lafa.mx` | `super123` | Supervisor | Roma |

### Auth Flow

**For initial build:** Skip auth logic entirely. Default the app to the Admin role with all screens accessible. Render the Login page as a static screen (the form exists but doesn't need to work yet). Show the sidebar with all 7 navigation items visible.

**For second pass (later):** Wire up the client-side auth check against `MOCK_USERS`, localStorage persistence, and role-based sidebar filtering.

### Route Protection & Sidebar Visibility

**Sidebar items by role:**

| Screen | Admin | Supervisor |
|--------|-------|------------|
| Dashboard | ✅ | ✅ |
| Shift Management | ✅ | ✅ |
| CSV Upload | ✅ | ❌ (hidden) |
| Payroll | ✅ | ✅ (read-only) |
| Drivers | ✅ | ✅ |
| Vehicles | ✅ | ✅ |
| Users | ✅ | ❌ (hidden) |

Non-accessible items are **hidden** from the sidebar (not disabled/grayed out). If a Supervisor navigates directly to `/csv-upload` or `/users`, redirect them to Dashboard.

---

## 4. Screen Specifications

### 4.0 Global UX Patterns

Apply these patterns across ALL screens:

**Empty States:**
- Every empty list/table shows: icon + contextual message + primary CTA button
- Example: "No hay turnos activos hoy" + `[+ Registrar check-in]` button

**Table Headers:**
- Consistent bar: Search input (left) + contextual action buttons (right)

**Tab Filtering with Count Badges:**
- Tabs show dynamic count: `Activos (12)` · `Completados (8)` · `Pendientes revisión (1)`
- Active tab gets accent underline (`#FF5A00`)

**Status Badges:**
- Use semi-transparent background + colored text (see COLORS above)
- Green = active/completed/goal met
- Yellow = pending/warning
- Red = alert/review needed
- Gray = inactive/disabled

**Toast Notifications:**
- Bottom-right position, auto-dismiss after 4 seconds
- Success (green border), Warning (yellow border), Error (red border)
- Examples: "Check-in registrado", "CSV cargado — 145 viajes", "Semana cerrada"

**Modals:**
- Forms use slide-up modal with backdrop overlay
- Confirmation dialogs for destructive actions: "Cerrar semana", "Re-ejecutar cierre", "Desactivar conductor", "Desactivar usuario"
- Confirmation text: "¿Estás seguro? Esta acción no se puede deshacer."
- Two buttons: `Cancelar` (outline) + `Confirmar` (red/accent solid)

**Sidebar Navigation:**
- Left sidebar, collapsed by default on mobile
- LAFA logo at top (orange accent on dark background)
- Show user name + role + center at bottom
- Logout button at very bottom

---

### 4.1 Login

**Route:** `/login`

**Layout:** Centered card on dark background. LAFA logo above form.

**Components:**
- Email input (placeholder: "tu@lafa.mx")
- Password input (with show/hide toggle)
- "Ingresar" button (full width, accent orange)
- Error state: red text below form "Credenciales inválidas"

**Logic (defer to second pass):** For now, render the login form visually. The app should default to logged-in as Admin and show the Dashboard. Auth wiring will be added later.

---

### 4.2 Dashboard

**Route:** `/dashboard`

**Description:** Operations overview. Admin sees all 3 centers; Supervisor sees only their center.

**Components:**

**A. KPI Cards (top row, 4 cards):**

| KPI | Value | Icon |
|-----|-------|------|
| Turnos activos | Count of shifts with `status = 'en_turno'` | Clock |
| Vehículos disponibles | `{available} / {total}` vehicles | Car |
| Alertas | Count of shifts open >12h without check-out | AlertTriangle |
| Facturación semana | Sum of `trips.cost` for current week, formatted as `$XX,XXX MXN` | DollarSign |

**B. Active Shifts List (compact cards):**
- Each card: Driver name, vehicle plate + model, check-in time, running duration (live timer)
- Sorted by check-in time (most recent first)
- Max 10 visible, "Ver todos →" link to Shift Management

**C. Alerts Section:**
- Shifts without check-out >12h (red badge)
- Drivers near $6,000 billing threshold (yellow badge: "Facturación: $5,800 — le faltan $200")

**D. Admin Filter:** Dropdown at top: `Todos` / `Vallejo` / `Granada` / `Roma`
**Supervisor:** No dropdown — auto-filtered by their `center_id`.

---

### 4.3 Shift Management (Fleet Unit Assignment) — CORE SCREEN

**Route:** `/shifts`

**Description:** The supervisor manages vehicle-to-driver assignments. Core flow: check-in (assign vehicle + start shift) and check-out (end shift + release vehicle).

**Layout:** 2 panels side-by-side.

**Admin:** Shows center selector dropdown at top that filters both panels.
**Supervisor:** No dropdown — auto-filtered by `center_id`.

**A. Left Panel (60%) — "Turnos"**

Tabbed list of shift cards:

| Tab | Content | Card Details |
|-----|---------|-------------|
| `Activos (n)` | Shifts in progress | Driver name, vehicle (plate + model), check-in time, running duration timer. Button: `Cerrar turno` |
| `Completados hoy (n)` | Shifts closed today | Driver name, vehicle, check-in → check-out times, total duration |
| `Pendientes revisión (n)` | Shifts open >12h without check-out (from ANY date) | Same as active + red alert badge |

Empty state per tab: "No hay turnos activos" + CTA `[+ Registrar check-in]`.

**B. Right Panel (40%) — "Nuevo check-in"**

Always-visible form (not a modal):
1. **Dropdown: Conductor** — Only drivers from this center with `status = 'activo'` and no active shift
2. **Dropdown: Vehículo** — Only vehicles from this center with `status = 'disponible'`
3. **Button: "Registrar check-in"**

**Initial render:** Show the Shifts screen with mock data already visible — a few active shift cards in the "Activos" tab, some completed shifts in "Completados hoy", and one alert in "Pendientes revisión". The check-in form should show populated dropdowns. The logic below is for the second pass.

**Check-in Logic:**
1. Add new shift object to React state: `{ driverId, vehicleId, checkIn: new Date(), status: 'en_turno' }`
2. Update vehicle object in state: `status = 'en_turno'`
3. Card appears in "Activos" tab
4. Toast: "Check-in registrado — {driver_name} en {vehicle_plate}"

**Check-out Logic (from "Cerrar turno" button):**
1. Update shift in state: `checkOut = new Date()`
2. Calculate `hoursWorked = (checkOut - checkIn)` in hours (decimal, 2 places)
3. Update shift in state: `status = 'completado'`
4. Update vehicle in state: `status = 'disponible'`
5. Card moves from "Activos" to "Completados hoy"
6. Toast: "Turno cerrado — {driver_name}, {hours_worked}h"

**Validations:**
- A driver cannot have 2 active shifts simultaneously
- A vehicle cannot be assigned to 2 drivers simultaneously
- Supervisor can only see drivers and vehicles from their center

**Shift Statuses:**

| Status | Meaning |
|--------|---------|
| `en_turno` | Driver is active with assigned vehicle |
| `completado` | Check-out done, hours calculated |
| `pendiente_revision` | Open >12h without check-out — alert supervisor |

---

### 4.4 CSV Upload (Admin Only)

**Route:** `/csv-upload`

**Description:** Admin uploads the DiDi CSV with trip data. 3-step wizard.

**Layout:** Horizontal stepper at top (Step 1 → 2 → 3), content below.

**Initial render:** Show Step 2 (Preview) as the default view with the sample CSV data pre-loaded in the preview table. Steps 1 and 3 should exist as navigable states. The upload/validation logic is for the second pass.

**Step 1: Upload**
- Drag-and-drop zone (dashed border, icon, "Arrastra tu archivo CSV aquí")
- Or file picker button: "Seleccionar archivo"
- Accepts only `.csv`
- Shows filename + file size once selected
- Button: "Siguiente →"

**Step 2: Preview + Validate**
- Preview table: first 10 rows + indicator "…y {N} filas más"
- Validation report with colored status per row:
  - ✅ Green: Valid row
  - ⚠️ Yellow: Warning (e.g., unusually high/low fare)
  - ❌ Red: Error (e.g., Driver ID not found in system)
- Summary above table: "{valid} válidos, {warnings} warnings, {errors} errores"
- Buttons: "← Atrás" + "Siguiente →" (enabled only if at least 1 valid row)

**Step 3: Confirm**
- Final summary: "145 viajes válidos de 28 conductores. Facturación total: $27,430 MXN. 3 warnings. 0 errores."
- Button: "Confirmar carga" (accent orange, prominent)
- On confirm: parse CSV client-side, add valid trips to React state, add upload record to state
- Toast: "CSV cargado — 145 viajes importados"

**Expected CSV Format:**

```
Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates
114958,11/02/2026,fd5g5h,4:56:00,5:41:00,$125.36,0,"19.394316, -99.166257","19.422497, -99.207150"
```

| Field | Format | Validation |
|-------|--------|-----------|
| Driver ID | Integer | Must exist in `drivers.didi_driver_id` |
| Date | DD/MM/YYYY | Must be valid date |
| Trip ID | Alphanumeric | Must be unique (no duplicate imports) |
| Initial time | H:MM:SS | Must be valid time |
| Final time | H:MM:SS | Must be after Initial time (except midnight crossings) |
| Cost | $NNN.NN | Must be positive number (strip `$` prefix) |
| Tip | Number | Non-negative number |
| Initial coordinates | "lat, lng" | Must be in CDMX range (~19.1-19.6, ~-99.4 to -98.9) |
| Final coordinates | "lat, lng" | Must be in CDMX range |

---

### 4.5 Payroll (Weekly Payroll) — CORE SCREEN

**Route:** `/payroll`

**Description:** Weekly payroll calculation view. Admin sees global + can execute closure. Supervisor sees their center, read-only.

**Initial render:** Show the Payroll table fully populated with `MOCK_PAYROLL` data (Section 7.5). The "Semana actual" tab should display the closed week's data. The AI Explanation panel should show a hardcoded example explanation for the first driver. Payroll calculation logic is for the second pass.

**Components:**

**A. Week Tabs:**

| Tab | Description |
|-----|-------------|
| `Semana actual (borrador)` | Current week — live calculations, auto-recalculated. Status: `borrador` |
| `Cerradas` | Past closed weeks — secondary dropdown to select which week. Status: `cerrado` or `superseded` |

**B. Payroll Table (9 columns):**

| Column | Description |
|--------|-------------|
| Conductor | Full name + DiDi ID in small text below |
| Centro | Vallejo / Granada / Roma |
| Horas trabajadas | Sum of closed shift durations for this week (decimal hours) |
| Facturación DiDi | Sum of `trips.cost` for this week (no tips). Format: `$X,XXX` |
| Meta cumplida | ✅ Sí / ❌ No (green/red badge). Both conditions: hours ≥ threshold AND billing ≥ threshold |
| Salario base | `$2,500` or `$0` |
| Bono productividad | `$100 × floor((billing - threshold) / 500)` or `$0` |
| Horas extra | `$50 × min(hours - threshold, 8)` — only if previous week ≥40h. Or `$0` |
| **Pago total** | Sum of components. If goal not met: `$1,000` (apoyo económico) |

Sortable by any column. Default sort: by Centro, then by Conductor name.

**C. Summary Panel (right sidebar or top cards):**
- Total payroll for the week: `$XX,XXX MXN`
- Drivers meeting goal: `{n} de {total}`
- Breakdown by component: pie chart or bar (Base / Bonos / Overtime / Apoyo económico)

**D. Admin Actions:**
- **"Cerrar semana"** button — Freezes calculations, sets status to `cerrado`. Requires confirmation dialog.
- **"Re-ejecutar cierre"** button (on closed weeks) — Re-calculates, creates new version, marks previous as `superseded`. Requires confirmation.
- **"Exportar CSV"** button — Downloads payroll table as CSV file

**E. AI Explanation Panel:**
When clicking on a driver row, a slide-in panel from the right shows a natural language explanation:

> "Carlos Mendoza trabajó 42.5 horas y facturó $7,230 MXN esta semana. Cumple ambas metas. Base: $2,500. Bono: $100 × 2 = $200 (excedente de $1,230 sobre meta, 2 bloques completos de $500). Overtime: $50 × 2.5h = $125 (semana anterior: 41h, eligible). **Total: $2,825.**"

Generate this explanation string using the payroll data — it doesn't need an LLM, just a template:
- Show each component with its calculation
- Flag edge cases: "Le faltaron $0.50 para la meta", "Primera semana — no eligible para overtime", "Prorrateada: 3 de 5 días"

**Supervisor View:**
- Same table filtered by their center
- No "Cerrar semana" / "Re-ejecutar" / "Exportar" buttons
- CAN click driver rows to see AI explanation

---

### 4.6 Drivers

**Route:** `/drivers`

**Description:** Driver registry. Admin has global CRUD; Supervisor sees their center's list (read-only).

**A. Table Columns:**

| Column | Description |
|--------|-------------|
| Nombre completo | First + last name |
| DiDi Driver ID | Numeric ID (for CSV matching) |
| Centro | Vallejo / Granada / Roma |
| Turno default | Diurno / Nocturno |
| Fecha de ingreso | Start date (for proration calculation) |
| Status | `activo` (green badge) / `inactivo` (gray badge) |

**B. Slide-in Detail Panel (click on row):**

Opens from the right with 2 tabs:

| Tab | Content |
|-----|---------|
| **Datos** | Full driver info. Admin: editable inline. Supervisor: read-only |
| **Nómina** | Mini-table: last 4 weeks history — week, hours, billing, goal met (✅/❌), total pay. Link to full payroll screen |

**C. Actions:**
- **Admin:** Create driver (modal form), edit (inline in detail panel), deactivate (confirmation dialog)
- **Supervisor:** View list filtered by their center. Read-only.

**Validations:**
- `didi_driver_id` must be unique
- Center must be one of the 3 existing centers
- Cannot deactivate a driver with an active shift

---

### 4.7 Vehicles

**Route:** `/vehicles`

**Description:** Vehicle registry. Admin has global CRUD; Supervisor sees their center pool.

**A. Table Columns:**

| Column | Description |
|--------|-------------|
| Placa | License plate (unique identifier) |
| Modelo | OEM + model name |
| Centro | Vallejo / Granada / Roma |
| Status | Badge with one of 5 statuses |

**Vehicle Statuses (5):**

| Status | Badge Color | Available for Assignment | Who Can Set |
|--------|-------------|------------------------|-------------|
| `disponible` | Green | ✅ Yes | System (after check-out), Supervisor, Admin |
| `en_turno` | Blue | ❌ No | System only (automatic on check-in/check-out) |
| `cargando` | Yellow | ❌ No | Supervisor, Admin |
| `mantenimiento` | Orange | ❌ No | Supervisor, Admin |
| `fuera_de_servicio` | Red | ❌ No | Admin only |

**B. Actions:**
- **Admin:** Create vehicle, edit, change any status (global)
- **Supervisor:** View their center pool. Change status between `disponible` ↔ `cargando` ↔ `mantenimiento` (operational day-to-day). Cannot set `fuera_de_servicio`.
- `en_turno` is AUTOMATIC — controlled only by check-in/check-out (screen 4.3)

**Validations:**
- Plate must be unique
- Cannot change to `disponible` if vehicle has an active shift
- Cannot delete a vehicle with an active shift

---

### 4.8 Users (Admin Only)

**Route:** `/users`

**Description:** User account management. Admin only.

**A. Table Columns:**

| Column | Description |
|--------|-------------|
| Nombre | User's display name |
| Email | Login credential |
| Rol | Admin / Supervisor (badge) |
| Centro asignado | Only for Supervisors. Admin shows "Global" |
| Status | `activo` (green) / `inactivo` (gray) |

**B. Actions:**
- Create supervisor: modal form (name, email, password, assign center)
- Edit user: inline or modal
- Deactivate account: confirmation dialog

**Validations:**
- Email must be unique
- Only 1 active supervisor per center
- Cannot deactivate the only Admin account

---

## 5. Business Logic: Payroll Formula

### Complete Payroll Calculation (TypeScript)

```typescript
interface PayrollInput {
  hoursWorked: number;       // From shifts: sum of (check_out - check_in) in hours
  totalBilled: number;       // From DiDi CSV: sum of Cost (NO tips)
  isFirstWeek: boolean;      // Driver's first week in the system
  workingDaysInWeek: number; // For proration: how many days they actually worked (1-5)
  previousWeekHours: number; // Previous week's hours_worked (0 if no previous week)
}

interface PayrollOutput {
  goalMet: boolean;
  baseSalary: number;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
  hoursThreshold: number;
  revenueThreshold: number;
  explanation: string;
}

function calculateWeeklyPay(input: PayrollInput): PayrollOutput {
  const {
    hoursWorked,
    totalBilled,
    isFirstWeek,
    workingDaysInWeek,
    previousWeekHours
  } = input;

  // Step 1: Determine thresholds (proration for new drivers)
  let hoursThreshold = 40;
  let revenueThreshold = 6000;

  if (isFirstWeek && workingDaysInWeek < 5) {
    hoursThreshold = 40 * (workingDaysInWeek / 5);
    revenueThreshold = 6000 * (workingDaysInWeek / 5);
  }

  // Step 2: Check weekly goal — BOTH conditions must be true (conjunctive)
  const goalMet = (hoursWorked >= hoursThreshold) && (totalBilled >= revenueThreshold);

  if (!goalMet) {
    return {
      goalMet: false,
      baseSalary: 0,
      productivityBonus: 0,
      overtimePay: 0,
      totalPay: 1000, // Economic support only
      hoursThreshold,
      revenueThreshold,
      explanation: generateExplanation(input, false, 0, 0, 0, 1000, hoursThreshold, revenueThreshold),
    };
  }

  // Step 3: Base salary
  const baseSalary = 2500;

  // Step 4: Productivity bonus — $100 per $500 above the revenue threshold
  let productivityBonus = 0;
  if (totalBilled > revenueThreshold) {
    const extraRevenue = totalBilled - revenueThreshold;
    const bonusUnits = Math.floor(extraRevenue / 500); // floor, not round
    productivityBonus = bonusUnits * 100;
  }

  // Step 5: Overtime — only if previous week had ≥40h
  // First week = NOT eligible (previousWeekHours defaults to 0)
  let overtimePay = 0;
  if (previousWeekHours >= 40) {
    const overtimeHours = Math.min(hoursWorked - hoursThreshold, 8); // cap at 8h
    if (overtimeHours > 0) {
      overtimePay = overtimeHours * 50;
    }
  }

  const totalPay = baseSalary + productivityBonus + overtimePay;

  return {
    goalMet: true,
    baseSalary,
    productivityBonus,
    overtimePay,
    totalPay,
    hoursThreshold,
    revenueThreshold,
    explanation: generateExplanation(input, true, baseSalary, productivityBonus, overtimePay, totalPay, hoursThreshold, revenueThreshold),
  };
}
```

### Edge Case Truth Table (8 cases)

| # | Hours | Billing | Prev Week Hrs | First Week? | Goal Met | Total Pay | Why |
|---|-------|---------|---------------|-------------|----------|-----------|-----|
| 1 | 40h | $5,999 | any | No | ❌ | $1,000 | Billing threshold missed by $1 |
| 2 | 39.5h | $8,000 | any | No | ❌ | $1,000 | Hours threshold missed |
| 3 | 42h | $7,230 | 41h | No | ✅ | $2,800 | Base $2,500 + Bonus floor((7230-6000)/500)=2 → $200 + OT min(42-40, 8)=2h × $50=$100 |
| 4 | 45h | $6,000 | 0 (first week) | Yes | ✅ | $2,500 | Goal met (exact threshold). No bonus (not above $6K). No OT (first week, prev=0) |
| 5 | 24h | $3,600 | 0 | Yes (3 days) | ✅ | $2,500 | Prorated: 40×3/5=24h, 6000×3/5=$3,600. Exactly meets prorated thresholds |
| 6 | 50h | $12,000 | 42h | No | ✅ | $3,900 | Base $2,500 + Bonus floor(6000/500)=12 → $1,200 + OT min(10,8)=8h × $50=$400 |
| 7 | 42h | $5,800 | 40h | No | ❌ | $1,000 | Hours pass but billing fails — conjunctive AND |
| 8 | N/A (open shift) | N/A | N/A | N/A | ⚠️ | excluded | Shift without check-out: marked `pendiente_revision`, excluded from calculation |

### Week Definition

- **Week starts:** Monday 00:00:00 CDMX (`America/Mexico_City`, UTC-6)
- **Week ends (close):** Sunday 20:00:00 CDMX
- **Trips crossing the close:** Assigned to the week where the trip STARTED. If `initial_time < Sunday 20:00` → current week.
- **Sunday 20:00 – Monday 00:00 gap:** Trips/shifts in this window are assigned to the NEXT week.

### Two Data Sources

| Data | Source | How Obtained |
|------|--------|-------------|
| `hours_worked` | Shift system | Sum of `(check_out - check_in)` for closed shifts in the week |
| `total_billed` | DiDi CSV | Sum of `Cost` field (NOT `Tip`) where trip date falls in the week |

---

## 6. Data Model (TypeScript Interfaces + Supabase Schema)

TypeScript interfaces define the client-side data shapes. The corresponding SQL schema lives in [`supabase-schema.sql`](supabase-schema.sql). Use these interfaces for type safety; Supabase tables mirror them exactly:

```typescript
// --- Types ---

type Role = 'admin' | 'supervisor';
type DriverStatus = 'activo' | 'inactivo';
type VehicleStatus = 'disponible' | 'en_turno' | 'cargando' | 'mantenimiento' | 'fuera_de_servicio';
type ShiftStatus = 'en_turno' | 'completado' | 'pendiente_revision';
type PayrollStatus = 'borrador' | 'cerrado' | 'superseded';
type DefaultShift = 'diurno' | 'nocturno';

// --- Interfaces ---

interface Center {
  id: string;
  name: 'Vallejo' | 'Granada' | 'Roma';
  address: string;
  lat: number;
  lng: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;          // Plain text — mock auth only
  role: Role;
  centerId: string | null;   // null for Admin (global scope)
  status: 'activo' | 'inactivo';
}

interface Driver {
  id: string;
  fullName: string;
  didiDriverId: number;      // Maps to DiDi CSV "Driver ID"
  centerId: string;
  defaultShift: DefaultShift;
  startDate: string;         // ISO date string, for first-week proration
  status: DriverStatus;
}

interface Vehicle {
  id: string;
  plate: string;
  model: string;             // e.g., 'Geometry C'
  oem: 'Geely' | 'JAC' | 'GAC';
  centerId: string;
  status: VehicleStatus;
}

interface Shift {
  id: string;
  driverId: string;
  vehicleId: string;
  checkIn: string;           // ISO datetime string
  checkOut: string | null;   // null while shift is active
  hoursWorked: number | null;
  status: ShiftStatus;
  createdBy: string;         // User ID who registered the check-in
}

interface CsvUpload {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  recordCount: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  status: 'procesado' | 'error';
}

interface Trip {
  id: string;
  driverId: string;
  didiTripId: string;        // From CSV "Trip ID"
  date: string;              // ISO date
  initialTime: string;       // "H:MM:SS"
  finalTime: string;
  cost: number;              // Fare without tip
  tip: number;
  initialLat: number;
  initialLng: number;
  finalLat: number;
  finalLng: number;
  uploadId: string;
}

interface WeeklyPayroll {
  id: string;
  driverId: string;
  weekStart: string;         // ISO date — Monday
  weekEnd: string;           // ISO date — Sunday
  hoursWorked: number;
  totalBilled: number;
  tipsTotal: number;
  hoursThreshold: number;
  revenueThreshold: number;
  goalMet: boolean;
  baseSalary: number;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
  status: PayrollStatus;
  version: number;
  aiExplanation: string;
  closedBy: string | null;
  closedAt: string | null;
}
```

### Data Filtering by Role

- **Admin:** Can read/write all data across all centers.
- **Supervisor:** Can only see records where `centerId` matches their assigned center.
- **Enforcement:** Supabase RLS policies enforce this at the database level. The frontend also filters for UX responsiveness, but security is server-side.

### Supabase Client Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Environment variables (`.env.local`):**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

### Auth Flow (Supabase Auth)

| Step | Current (mock) | New (Supabase) |
|------|---------------|----------------|
| Login | `simpleHash()` + compare with MOCK_USERS | `supabase.auth.signInWithPassword({ email, password })` |
| Session | localStorage manual | Supabase Auth session (automatic, JWT-based) |
| Route guard | Check localStorage | `supabase.auth.getSession()` |
| Role/center | Hardcoded in session object | Query `profiles` table: `supabase.from('profiles').select('role, center_id').eq('id', user.id)` |
| Logout | Clear localStorage | `supabase.auth.signOut()` |

---

## 7. Mock Data (Hardcoded TypeScript Constants)

All data below should be defined in a `mockData.ts` file as typed constants. The app initializes React state from these constants on first load. The equivalent seed SQL is in [`supabase-schema.sql`](supabase-schema.sql) — run it in the Supabase SQL Editor to populate the database with the same data.

### 7.1 Centers

```typescript
const MOCK_CENTERS: Center[] = [
  { id: "c1", name: "Vallejo", address: "Calz. Vallejo 1090, Gustavo A. Madero", lat: 19.4890, lng: -99.1465 },
  { id: "c2", name: "Granada", address: "Av. Ejército Nacional 453, Granada", lat: 19.4400, lng: -99.1900 },
  { id: "c3", name: "Roma",    address: "Av. Álvaro Obregón 286, Roma Norte",  lat: 19.4195, lng: -99.1620 },
];
```

### 7.2 Users

```typescript
const MOCK_USERS: User[] = [
  { id: "u1", name: "Jose Admin",    email: "admin@lafa.mx",   password: "admin123", role: "admin",      centerId: null, status: "activo" },
  { id: "u2", name: "Laura Reyes",   email: "vallejo@lafa.mx", password: "super123", role: "supervisor", centerId: "c1", status: "activo" },
  { id: "u3", name: "Miguel Torres", email: "granada@lafa.mx", password: "super123", role: "supervisor", centerId: "c2", status: "activo" },
  { id: "u4", name: "Patricia Vega", email: "roma@lafa.mx",    password: "super123", role: "supervisor", centerId: "c3", status: "activo" },
];
```

### 7.3 Drivers (30 total, 10 per center)

```typescript
const MOCK_DRIVERS: Driver[] = [
  // --- Vallejo (c1) ---
  { id: "d1",  fullName: "Carlos Mendoza",    didiDriverId: 114958, centerId: "c1", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // high
  { id: "d2",  fullName: "Roberto Hernández", didiDriverId: 114959, centerId: "c1", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d3",  fullName: "María García",      didiDriverId: 114960, centerId: "c1", defaultShift: "nocturno", startDate: "2025-11-15", status: "activo" }, // solid
  { id: "d4",  fullName: "Fernando López",    didiDriverId: 114961, centerId: "c1", defaultShift: "nocturno", startDate: "2025-12-01", status: "activo" }, // threshold
  { id: "d5",  fullName: "Andrea Martínez",   didiDriverId: 114962, centerId: "c1", defaultShift: "diurno",   startDate: "2025-12-01", status: "activo" }, // high
  { id: "d6",  fullName: "Luis Ramírez",      didiDriverId: 114963, centerId: "c1", defaultShift: "diurno",   startDate: "2026-01-06", status: "activo" }, // below
  { id: "d7",  fullName: "Diana Cruz",        didiDriverId: 114964, centerId: "c1", defaultShift: "nocturno", startDate: "2025-11-01", status: "activo" }, // high
  { id: "d8",  fullName: "Jorge Flores",      didiDriverId: 114965, centerId: "c1", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d9",  fullName: "Gabriela Ruiz",     didiDriverId: 114966, centerId: "c1", defaultShift: "nocturno", startDate: "2025-12-15", status: "activo" }, // threshold
  { id: "d10", fullName: "Alejandro Morales", didiDriverId: 114967, centerId: "c1", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // weekend_only

  // --- Granada (c2) ---
  { id: "d11", fullName: "Sofía Castillo",    didiDriverId: 114968, centerId: "c2", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // high
  { id: "d12", fullName: "Ricardo Jiménez",   didiDriverId: 114969, centerId: "c2", defaultShift: "nocturno", startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d13", fullName: "Valentina Ortiz",   didiDriverId: 114970, centerId: "c2", defaultShift: "diurno",   startDate: "2025-12-01", status: "activo" }, // high
  { id: "d14", fullName: "Eduardo Guzmán",    didiDriverId: 114971, centerId: "c2", defaultShift: "nocturno", startDate: "2025-11-15", status: "activo" }, // solid
  { id: "d15", fullName: "Camila Delgado",    didiDriverId: 114972, centerId: "c2", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // threshold
  { id: "d16", fullName: "Héctor Vargas",     didiDriverId: 114973, centerId: "c2", defaultShift: "nocturno", startDate: "2026-01-06", status: "activo" }, // below
  { id: "d17", fullName: "Isabel Medina",     didiDriverId: 114974, centerId: "c2", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d18", fullName: "Pablo Guerrero",    didiDriverId: 114975, centerId: "c2", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // high
  { id: "d19", fullName: "Natalia Peña",      didiDriverId: 114976, centerId: "c2", defaultShift: "nocturno", startDate: "2025-12-01", status: "activo" }, // below
  { id: "d20", fullName: "Óscar Salazar",     didiDriverId: 114977, centerId: "c2", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // weekend_only

  // --- Roma (c3) ---
  { id: "d21", fullName: "Daniela Rojas",     didiDriverId: 114978, centerId: "c3", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // high
  { id: "d22", fullName: "Antonio Navarro",   didiDriverId: 114979, centerId: "c3", defaultShift: "nocturno", startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d23", fullName: "Lucía Herrera",     didiDriverId: 114980, centerId: "c3", defaultShift: "diurno",   startDate: "2025-12-01", status: "activo" }, // solid
  { id: "d24", fullName: "Raúl Domínguez",    didiDriverId: 114981, centerId: "c3", defaultShift: "nocturno", startDate: "2025-11-15", status: "activo" }, // threshold
  { id: "d25", fullName: "Mariana Soto",      didiDriverId: 114982, centerId: "c3", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // high
  { id: "d26", fullName: "Sergio Ramos",      didiDriverId: 114983, centerId: "c3", defaultShift: "nocturno", startDate: "2025-11-01", status: "activo" }, // below
  { id: "d27", fullName: "Carolina Silva",    didiDriverId: 114984, centerId: "c3", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // solid
  { id: "d28", fullName: "Emilio Reyes",      didiDriverId: 114985, centerId: "c3", defaultShift: "diurno",   startDate: "2025-11-01", status: "activo" }, // threshold
  { id: "d29", fullName: "Paulina Ríos",      didiDriverId: 114986, centerId: "c3", defaultShift: "nocturno", startDate: "2025-12-15", status: "activo" }, // below
  { id: "d30", fullName: "Tomás Aguilar",     didiDriverId: 114987, centerId: "c3", defaultShift: "diurno",   startDate: "2026-02-12", status: "activo" }, // new_midweek
];
```

**Driver Tiers (for seed payroll data):**

| Tier | Count | Weekly Billing Range | Hours/Week | Payroll Outcome |
|------|-------|---------------------|------------|-----------------|
| high | 8 | $8,000–$12,000 | 42–48h | Base + bonus + possible overtime |
| solid | 8 | $6,200–$8,000 | 40–44h | Base + small bonus |
| threshold | 5 | $5,500–$6,500 | 38–42h | Some weeks pass, some fail |
| below | 4 | $3,500–$5,500 | 30–38h | Always $1,000 |
| weekend_only | 2 | $4,000–$6,000 | 20–24h | Low hours, decent billing |
| new_midweek | 1 | $2,000–$4,000 | 16–24h | Proration edge case (starts Wed, Week 2) |

### 7.4 Vehicles (15 total, 5 per center)

```typescript
const MOCK_VEHICLES: Vehicle[] = [
  { id: "v1",  plate: "ABC-123", model: "Geometry C",  oem: "Geely", centerId: "c1", status: "disponible" },
  { id: "v2",  plate: "ABC-124", model: "Geometry C",  oem: "Geely", centerId: "c1", status: "disponible" },
  { id: "v3",  plate: "DEF-201", model: "E10X",        oem: "JAC",   centerId: "c1", status: "en_turno" },
  { id: "v4",  plate: "DEF-202", model: "E10X",        oem: "JAC",   centerId: "c1", status: "cargando" },
  { id: "v5",  plate: "GHI-301", model: "Aion Y Plus", oem: "GAC",   centerId: "c1", status: "mantenimiento" },

  { id: "v6",  plate: "ABC-125", model: "Geometry C",  oem: "Geely", centerId: "c2", status: "disponible" },
  { id: "v7",  plate: "ABC-126", model: "Geometry C",  oem: "Geely", centerId: "c2", status: "disponible" },
  { id: "v8",  plate: "DEF-203", model: "E10X",        oem: "JAC",   centerId: "c2", status: "en_turno" },
  { id: "v9",  plate: "DEF-204", model: "E10X",        oem: "JAC",   centerId: "c2", status: "disponible" },
  { id: "v10", plate: "GHI-302", model: "Aion Y Plus", oem: "GAC",   centerId: "c2", status: "fuera_de_servicio" },

  { id: "v11", plate: "ABC-127", model: "Geometry C",  oem: "Geely", centerId: "c3", status: "disponible" },
  { id: "v12", plate: "ABC-128", model: "Geometry C",  oem: "Geely", centerId: "c3", status: "en_turno" },
  { id: "v13", plate: "DEF-205", model: "E10X",        oem: "JAC",   centerId: "c3", status: "disponible" },
  { id: "v14", plate: "DEF-206", model: "E10X",        oem: "JAC",   centerId: "c3", status: "cargando" },
  { id: "v15", plate: "GHI-303", model: "Aion Y Plus", oem: "GAC",   centerId: "c3", status: "disponible" },
];
```

### 7.5 Mock Payroll Data (1 closed week)

Pre-computed payroll for week Feb 3–9, 2026 (`status: 'cerrado'`). This gives the Payroll screen data to display immediately. The AI Explanation for each record should be generated using the `generateExplanation` function from Section 8.

```typescript
const MOCK_PAYROLL: WeeklyPayroll[] = [
  // --- Vallejo (10 drivers) ---
  { id: "p1",  driverId: "d1",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 42.5, totalBilled: 7230,  tipsTotal: 380,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 200,  overtimePay: 125, totalPay: 2825, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p2",  driverId: "d2",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 41.0, totalBilled: 6850,  tipsTotal: 200,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 100,  overtimePay: 50,  totalPay: 2650, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p3",  driverId: "d3",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.5, totalBilled: 6400,  tipsTotal: 150,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 0,    overtimePay: 0,   totalPay: 2500, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p4",  driverId: "d4",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 39.5, totalBilled: 5800,  tipsTotal: 100,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p5",  driverId: "d5",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 44.0, totalBilled: 9100,  tipsTotal: 500,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 600,  overtimePay: 200, totalPay: 3300, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p6",  driverId: "d6",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 32.0, totalBilled: 4200,  tipsTotal: 80,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p7",  driverId: "d7",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 45.0, totalBilled: 10500, tipsTotal: 620,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 900,  overtimePay: 250, totalPay: 3650, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p8",  driverId: "d8",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 41.5, totalBilled: 7100,  tipsTotal: 250,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 200,  overtimePay: 75,  totalPay: 2775, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p9",  driverId: "d9",  weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.0, totalBilled: 6000,  tipsTotal: 120,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 0,    overtimePay: 0,   totalPay: 2500, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p10", driverId: "d10", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 22.0, totalBilled: 5200,  tipsTotal: 180,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },

  // --- Granada (10 drivers) ---
  { id: "p11", driverId: "d11", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 46.0, totalBilled: 11200, tipsTotal: 700,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 1000, overtimePay: 300, totalPay: 3800, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p12", driverId: "d12", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 42.0, totalBilled: 6900,  tipsTotal: 220,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 100,  overtimePay: 100, totalPay: 2700, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p13", driverId: "d13", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 43.5, totalBilled: 8500,  tipsTotal: 400,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 500,  overtimePay: 175, totalPay: 3175, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p14", driverId: "d14", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.5, totalBilled: 6500,  tipsTotal: 160,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 100,  overtimePay: 0,   totalPay: 2600, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p15", driverId: "d15", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.0, totalBilled: 5999,  tipsTotal: 90,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p16", driverId: "d16", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 35.0, totalBilled: 4800,  tipsTotal: 60,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p17", driverId: "d17", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 41.0, totalBilled: 6300,  tipsTotal: 170,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 0,    overtimePay: 50,  totalPay: 2550, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p18", driverId: "d18", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 44.5, totalBilled: 9800,  tipsTotal: 480,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 700,  overtimePay: 225, totalPay: 3425, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p19", driverId: "d19", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 33.0, totalBilled: 4500,  tipsTotal: 70,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p20", driverId: "d20", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 21.0, totalBilled: 4900,  tipsTotal: 140,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },

  // --- Roma (10 drivers) ---
  { id: "p21", driverId: "d21", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 43.0, totalBilled: 8800,  tipsTotal: 450,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 500,  overtimePay: 150, totalPay: 3150, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p22", driverId: "d22", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 41.5, totalBilled: 7500,  tipsTotal: 300,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 300,  overtimePay: 75,  totalPay: 2875, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p23", driverId: "d23", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.5, totalBilled: 6200,  tipsTotal: 130,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 0,    overtimePay: 0,   totalPay: 2500, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p24", driverId: "d24", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 38.5, totalBilled: 5950,  tipsTotal: 110,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p25", driverId: "d25", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 47.0, totalBilled: 10800, tipsTotal: 550,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 900,  overtimePay: 350, totalPay: 3750, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p26", driverId: "d26", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 34.0, totalBilled: 4100,  tipsTotal: 50,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p27", driverId: "d27", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.0, totalBilled: 6700,  tipsTotal: 200,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 100,  overtimePay: 0,   totalPay: 2600, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p28", driverId: "d28", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 40.0, totalBilled: 6100,  tipsTotal: 140,  hoursThreshold: 40, revenueThreshold: 6000, goalMet: true,  baseSalary: 2500, productivityBonus: 0,    overtimePay: 0,   totalPay: 2500, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  { id: "p29", driverId: "d29", weekStart: "2026-02-03", weekEnd: "2026-02-09", hoursWorked: 36.0, totalBilled: 5100,  tipsTotal: 75,   hoursThreshold: 40, revenueThreshold: 6000, goalMet: false, baseSalary: 0,    productivityBonus: 0,    overtimePay: 0,   totalPay: 1000, status: "cerrado", version: 1, aiExplanation: "", closedBy: "u1", closedAt: "2026-02-09T20:00:00" },
  // Tomás Aguilar (d30) — not yet hired in week Feb 3-9 (start_date: 2026-02-12), so no payroll record
];
```

**Note:** The `aiExplanation` field is empty — generate it at runtime using the `generateExplanation` function from Section 8. The current week (Feb 10-16) should start as `status: 'borrador'` and be calculated live from shift/trip data in state.

### 7.6 Sample DiDi CSV (for testing CSV Upload)

Hardcode this as a string constant so the CSV Upload screen can be tested without a real file. Also useful as a fallback for demos.

```typescript
const SAMPLE_DIDI_CSV = `Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates
114958,16/02/2026,a1b2c3,6:32:00,7:18:00,$195.50,0,"19.489016, -99.146500","19.432500, -99.158000"
114958,16/02/2026,d4e5f6,7:35:00,8:12:00,$168.30,20,"19.431000, -99.159500","19.420000, -99.187000"
114958,16/02/2026,g7h8i9,8:30:00,9:25:00,$245.80,0,"19.421500, -99.185000","19.395000, -99.171000"
114959,16/02/2026,j1k2l3,6:45:00,7:22:00,$172.40,0,"19.488000, -99.147000","19.445000, -99.168000"
114959,16/02/2026,m4n5o6,7:40:00,8:35:00,$228.60,30,"19.444000, -99.169000","19.410000, -99.201000"
114968,16/02/2026,p7q8r9,6:20:00,7:05:00,$189.70,0,"19.440000, -99.190000","19.426000, -99.166000"
114978,16/02/2026,s1t2u3,6:50:00,7:45:00,$215.90,50,"19.419500, -99.162000","19.452000, -99.134000"
114960,16/02/2026,v1w2x3,18:05:00,18:52:00,$178.20,0,"19.489000, -99.146000","19.435000, -99.175000"
114971,16/02/2026,y4z5a6,18:20:00,19:10:00,$205.40,15,"19.440000, -99.190000","19.410000, -99.165000"
114979,16/02/2026,b7c8d9,18:15:00,19:00:00,$192.80,0,"19.419500, -99.162000","19.445000, -99.185000"`;
```

---

## 8. AI Explanation Generator

The "AI" payroll explanation is a **template-based string generator**, not an LLM call. Build a function that takes a payroll record and produces natural language:

```typescript
function generateExplanation(
  input: PayrollInput,
  goalMet: boolean,
  baseSalary: number,
  productivityBonus: number,
  overtimePay: number,
  totalPay: number,
  hoursThreshold: number,
  revenueThreshold: number
): string {
  const driverName = ''; // Pass in separately
  const parts: string[] = [];

  parts.push(
    `${driverName} trabajó ${input.hoursWorked.toFixed(1)} horas y facturó $${input.totalBilled.toLocaleString('es-MX')} MXN esta semana.`
  );

  if (!goalMet) {
    // Explain WHY goal was not met
    if (input.hoursWorked < hoursThreshold && input.totalBilled < revenueThreshold) {
      parts.push(`No cumple ninguna meta: horas (${input.hoursWorked.toFixed(1)} < ${hoursThreshold.toFixed(0)}h) y facturación ($${input.totalBilled.toLocaleString('es-MX')} < $${revenueThreshold.toLocaleString('es-MX')}).`);
    } else if (input.hoursWorked < hoursThreshold) {
      parts.push(`Facturación OK pero horas insuficientes: ${input.hoursWorked.toFixed(1)}h < ${hoursThreshold.toFixed(0)}h requeridas.`);
    } else {
      const diff = revenueThreshold - input.totalBilled;
      parts.push(`Horas OK pero facturación insuficiente: le faltaron $${diff.toFixed(2)} para llegar a $${revenueThreshold.toLocaleString('es-MX')}.`);
    }
    parts.push(`Recibe solo apoyo económico: **$1,000 MXN.**`);
  } else {
    parts.push(`Cumple ambas metas.`);
    parts.push(`Base: $2,500.`);

    if (productivityBonus > 0) {
      const excess = input.totalBilled - revenueThreshold;
      const units = Math.floor(excess / 500);
      parts.push(`Bono: $100 × ${units} = $${productivityBonus.toLocaleString('es-MX')} (excedente de $${excess.toFixed(0)} sobre meta, ${units} bloques de $500).`);
    }

    if (overtimePay > 0) {
      const otHours = Math.min(input.hoursWorked - hoursThreshold, 8);
      parts.push(`Overtime: $50 × ${otHours.toFixed(1)}h = $${overtimePay.toLocaleString('es-MX')} (semana anterior: ${input.previousWeekHours.toFixed(0)}h, eligible).`);
    } else if (input.previousWeekHours < 40) {
      if (input.isFirstWeek) {
        parts.push(`Sin overtime: primera semana, no eligible.`);
      } else {
        parts.push(`Sin overtime: semana anterior ${input.previousWeekHours.toFixed(0)}h (se requieren 40h).`);
      }
    }

    parts.push(`**Total: $${totalPay.toLocaleString('es-MX')} MXN.**`);
  }

  // Edge case flags
  if (input.isFirstWeek && input.workingDaysInWeek < 5) {
    parts.push(`📋 Prorrateada: ${input.workingDaysInWeek} de 5 días → umbrales ajustados a ${hoursThreshold.toFixed(0)}h y $${revenueThreshold.toLocaleString('es-MX')}.`);
  }

  return parts.join(' ');
}
```

---

## 9. App Structure & Routing

```
src/
├── App.tsx                    # Router setup
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx        # Role-based navigation
│   │   ├── Header.tsx         # Page title + center filter (Admin)
│   │   └── Layout.tsx         # Sidebar + main content wrapper
│   ├── ui/                    # shadcn/ui components
│   ├── dashboard/
│   │   ├── KPICards.tsx
│   │   ├── ActiveShiftsList.tsx
│   │   └── AlertsPanel.tsx
│   ├── shifts/
│   │   ├── ShiftTabs.tsx      # Activos / Completados / Pendientes
│   │   ├── ShiftCard.tsx
│   │   └── CheckInForm.tsx
│   ├── csv-upload/
│   │   ├── UploadStep.tsx
│   │   ├── PreviewStep.tsx
│   │   └── ConfirmStep.tsx
│   ├── payroll/
│   │   ├── WeekTabs.tsx
│   │   ├── PayrollTable.tsx
│   │   ├── SummaryPanel.tsx
│   │   └── ExplanationPanel.tsx
│   ├── drivers/
│   │   ├── DriversTable.tsx
│   │   └── DriverDetailPanel.tsx
│   ├── vehicles/
│   │   └── VehiclesTable.tsx
│   └── users/
│       └── UsersTable.tsx
├── hooks/
│   ├── useAuth.ts             # Auth state + role checking
│   ├── useCenter.ts           # Center filtering logic
│   └── usePayroll.ts          # Payroll calculation hook
├── lib/
│   ├── payroll.ts             # calculateWeeklyPay function
│   ├── explanation.ts         # generateExplanation function
│   ├── csvParser.ts           # DiDi CSV parsing + validation
│   ├── mockData.ts            # All hardcoded mock data (MOCK_CENTERS, MOCK_USERS, etc.)
│   └── store.ts               # React state management (context + reducers for all entities)
└── pages/
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── Shifts.tsx
    ├── CsvUpload.tsx
    ├── Payroll.tsx
    ├── Drivers.tsx
    ├── Vehicles.tsx
    └── Users.tsx
```

**Routes:**

```typescript
const routes = [
  { path: '/login',      component: Login,     auth: false },
  { path: '/dashboard',  component: Dashboard, auth: true,  roles: ['admin', 'supervisor'] },
  { path: '/shifts',     component: Shifts,    auth: true,  roles: ['admin', 'supervisor'] },
  { path: '/csv-upload', component: CsvUpload, auth: true,  roles: ['admin'] },
  { path: '/payroll',    component: Payroll,   auth: true,  roles: ['admin', 'supervisor'] },
  { path: '/drivers',    component: Drivers,   auth: true,  roles: ['admin', 'supervisor'] },
  { path: '/vehicles',   component: Vehicles,  auth: true,  roles: ['admin', 'supervisor'] },
  { path: '/users',      component: Users,     auth: true,  roles: ['admin'] },
];
// Default: redirect '/' to '/login'
// After login: redirect to '/dashboard'
// Unauthorized access: redirect to '/dashboard'
```

---

## 10. Implementation Priorities

### Pass 1: Render all screens (DO THIS FIRST)

Build ALL screens in a single generation with hardcoded mock data:

1. **Sidebar + Layout shell** — Dark theme, LAFA logo, all 7 nav items, user info at bottom
2. **All 8 page routes** — Each page renders with visible mock data:
   - Login: Static form (non-functional is OK)
   - Dashboard: 4 KPI cards with numbers, active shifts list, alerts section
   - Shifts: Tabbed list with shift cards + check-in form with populated dropdowns
   - CSV Upload: 3-step wizard, show Step 2 with preview table
   - Payroll: Table with 30 rows of mock payroll data, summary panel with totals
   - Drivers: Table with 30 rows, status badges
   - Vehicles: Table with 15 rows, status badges
   - Users: Table with 4 rows

Every table should be populated. Every card should show numbers. No empty states on first load.

### Pass 2: Add interactivity (LATER — separate prompt)

- Wire auth (login form → MOCK_USERS check → role-based sidebar)
- CRUD operations (check-in/check-out updates state, CSV upload parses file)
- Payroll calculation logic
- Form validations
- Toast notifications

---

## 11. Key Business Context

- **Architecture:** Full-stack MVP with **Supabase backend** (PostgreSQL + Auth + RLS). Auth via Supabase Auth (email/password). Data persisted in PostgreSQL. RBAC enforced via Row Level Security policies. Business logic (payroll calculation, CSV parsing, AI explanation) runs client-side.
- **Company:** LAFA (Latin America Future Automobile) — EV fleet operator in Mexico City
- **Fleet:** ~150 electric vehicles (Geely, JAC, GAC OEMs), targeting 2,000 by end 2026
- **Model:** Driver-as-Employee (DaE) — LAFA owns vehicles, hires drivers, partners with DiDi
- **Current state:** Everything runs on spreadsheets and WhatsApp ("Stage 0")
- **This MVP replaces:** Manual shift tracking + manual payroll calculation
- **Platform partner:** DiDi (Premier tier, launched Oct 2025)
- **Currency:** Mexican Pesos (MXN). Format: `$X,XXX.XX MXN`
- **Timezone:** America/Mexico_City (UTC-6 / UTC-5 during DST)
- **Language for UI labels:** Spanish (use Spanish for all button labels, table headers, navigation items, status badges, toast messages, and form fields)
