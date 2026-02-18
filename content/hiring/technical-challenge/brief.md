# Technical Challenge: Fleet Intelligence & Payroll

> **Status:** Active
> **Deadline:** Thursday (max)
> **From:** Levi Garcia (Head of Product)
> **Deliverables:** Live URL + Code/Architecture access

---

## Challenge Overview

Build a functional MVP that manages **fleet unit assignment** and **payroll calculation**, integrating business logic with AI capabilities.

LAFA is looking for "builders with product vision and backend technical capability" — not ticket executors.

---

## User Structure (RBAC, role based access control)

| Role | Permissions |
|------|-------------|
| **Administrator** | Full access. Can create and assign Supervisor role. |
| **Supervisor** | Daily operations. Registers driver check-in/check-out. Assigns available vehicles (assets) per shift. |

---

## Payroll Business Logic

### Weekly Goal
- **Requirements:** 40 hours worked **AND** $6,000 MXN billed (from DiDi CSV/API)
- **If NOT met:** Driver receives only $1,000 MXN economic support

### Compensation Structure

| Component | Amount | Condition |
|-----------|--------|-----------|
| **Base Salary** | $2,500 MXN | Once weekly goal is met |
| **Productivity Bonus** | +$100 MXN per $500 MXN | For each $500 MXN above the $6,000 goal |
| **Overtime** | $50 MXN/hr (max 8 hrs) | Only if driver worked 40 hrs the **previous week** |

### Payroll Formula (pseudocode)

```python
def calculate_weekly_pay(driver, current_week, previous_week):
    hours = current_week.hours_worked
    revenue = current_week.total_billed  # from DiDi

    # Check if goal is met
    goal_met = (hours >= 40) and (revenue >= 6000)

    if not goal_met:
        return 1000  # Economic support only

    # Base salary
    pay = 2500

    # Productivity bonus: $100 per $500 above goal
    if revenue > 6000:
        extra_revenue = revenue - 6000
        bonus_units = extra_revenue // 500
        pay += bonus_units * 100

    # Overtime: only if worked 40+ hrs previous week
    if previous_week.hours_worked >= 40:
        overtime_hours = min(hours - 40, 8)  # max 8 hrs
        if overtime_hours > 0:
            pay += overtime_hours * 50

    return pay
```

### Automatic Close
- **When:** Every Sunday at 8:00 PM
- **Output:** CSV or Dashboard

---

## Input Data: DiDi CSV Format

| Field | Example |
|-------|---------|
| Driver ID | 114958 |
| Date | 11/02/2026 |
| Trip ID | fd5g5h |
| Initial time | 4:56:00 |
| Final time | 5:41:00 |
| Cost | $125.36 |
| Tip | 0 |
| Initial coordinates | 19.394316, -99.166257 |
| Final coordinates | 19.422497, -99.207150 |

**Note:** Use this format to generate dummy data for the prototype.

---

## Suggested Tech Stack

| Layer | Options |
|-------|---------|
| **UI/Frontend** | v0.dev, Lovable, Retool |
| **Backend/Automation** | BuildShip, n8n, Python (Replit/Vercel) |
| **AI Focus** | Agents or LLMs for DiDi data cleaning, complex business rule validation |

---

## Deliverables

1. **Live URL** — Deployed, functional prototype
2. **Code Access / Architecture Diagram** — Repo or system design

---

## Evaluation Process

After submission, you'll be scheduled for a **Technical/Product Panel** session where you must:

1. Present your solution
2. Justify your stack choices
3. Defend your security and scalability logic

---

## Strategic Notes (for Jose)

### Why This Challenge Matters
This is exactly the kind of internal tool described in `content/strategy/ai-roadmap.md` — automating manual spreadsheet processes. The payroll system is currently Phase 0 (spreadsheets).

### AI Integration Opportunities
- **Data cleaning agent:** Parse DiDi CSVs, handle format inconsistencies, validate trip data
- **Rule validation:** Catch edge cases (driver worked 39.5 hrs, revenue at $5,999, etc.)
- **Anomaly detection:** Flag suspicious patterns (unusually low revenue, coordinate mismatches)

### Architecture Considerations
- **Scalability:** Design for 150 → 2,000 vehicles
- **Multi-tenancy:** RBAC foundation for future supervisor hierarchies
- **Audit trail:** Payroll calculations need full traceability

---

## Open Questions

- [ ] How many drivers currently? (affects data volume)
- [ ] Is the DiDi CSV the only input or are there other revenue sources?
- [ ] What's the current payroll process? (to understand pain points)
- [ ] Are there edge cases not covered? (partial weeks, vehicle breakdowns, etc.)
- [ ] Timezone for 8 PM close? (assume CDMX)
