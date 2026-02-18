# Reforge Frameworks x LAFA Technical Challenge

> **Navigation:** [Challenge Brief](brief.md) | [PRD](prd.md) | [Assumptions Q&A](assumptions-qa.md) | [Data Generation](data-generation-plan.md) | [CLAUDE.md](CLAUDE.md)

Every Reforge framework that strengthens how Jose **justifies**, **presents**, or **solves** the Fleet Intelligence & Payroll MVP challenge — organized by use case.

---

## A. JUSTIFY — Strategic Framing ("Why build this, why build it this way")

### 1. Four Types of Product Work — Position the MVP correctly

**Source:** Mastering Product Management — Product Leadership Strategy

The challenge is **Scaling work** (infrastructure investment to enable future growth), not Feature Strategy or Growth. This distinction matters because:
- Scaling work is the **least glamorous** but most foundational
- LAFA at Stage 0 can't do Feature Strategy, Growth, or PMF Expansion without infrastructure
- Framing: *"This MVP is the infrastructure layer that unlocks every future product initiative. Without it, you can't measure, optimize, or automate anything."*

**Where to use:** Opening of the presentation. "Before I show you what I built, let me tell you what *type* of work this is."

### 2. OMG Framework (Outcome-Motivation-Gap) — Frame the problem

**Source:** Product Strategy Map — Dimension 2 (Problem)

| Component | Application |
|-----------|------------|
| **Outcome** | LAFA scales from 150 to 2,000 vehicles without proportionally scaling ops headcount |
| **Motivation** | Manual spreadsheets break at ~300 vehicles; every new center multiplies admin burden |
| **Gap** | No system of record — shifts tracked in WhatsApp, payroll calculated manually, no audit trail |

**Where to use:** Problem statement slide. Forces evaluators to see the *gap* between current state and ambition.

### 3. Product Culture Blueprint — Explain architectural decisions

**Source:** Mastering Product Operations — Eight Cultural Dimensions

Map LAFA's current culture to explain design choices:

| Dimension | LAFA Position | Design Implication |
|-----------|--------------|-------------------|
| Planning | Short-term (survival mode) | MVP scope, not grand vision |
| Pace | Fast iterations needed | Manual CSV > real-time API (ship now, upgrade later) |
| Risk | Conservative (payroll can't be wrong) | Idempotent weekly close, audit trail, re-execution |
| Decisions | Centralized (JJ + Levi) | Admin-only payroll closure, RBAC hierarchy |
| Measurement | Light to Heavy transition | Dashboard KPIs are the *first* metrics LAFA will ever have |

**Where to use:** When defending trade-offs. "I chose manual CSV over API because LAFA's culture is [conservative risk, fast pace] — we need reliability over speed."

### 4. Product Spine Concept — Connect MVP to company strategy

**Source:** Mastering Product Operations

Strategy to Roadmap to Goals, applied fractally:

```
LAFA Strategy: Scale to 2,000 EVs by end 2026
  +-- Product Strategy: Digitize operations (Phase 0)
        +-- Roadmap Item: Fleet & Payroll MVP
              +-- Feature: Weekly payroll closure
                    +-- Backlog: Idempotent re-execution, proration, edge cases
```

**Where to use:** "Every line of code I wrote traces back to the company's growth target."

### 5. Eight Infrastructure Categories — Justify what you're building

**Source:** Mastering Product Operations

The MVP addresses 5 of 8 categories LAFA is missing:

| Category | Current State | MVP Contribution |
|----------|-------------|-----------------|
| **Tools** | Spreadsheets | Web app with RBAC |
| **Templates** | None | CSV upload format, payroll report format |
| **Documentation** | None | Audit trail (who closed payroll, when, which data) |
| **Workflows** | WhatsApp + manual | Shift to CSV to Close to Export pipeline |
| **Automation** | Zero | Automated payroll calculation, vehicle pool management |

**Where to use:** "This isn't just a payroll calculator — it's five categories of operational infrastructure delivered in one MVP."

---

## B. PRESENT — Communication & Storytelling ("How to deliver the demo")

### 6. Minto Pyramid — Structure the entire presentation

**Source:** Mastering Product Management — Communication

**Answer first, then evidence, then implications:**

```
ANSWER:    "I built a working fleet management system that calculates payroll
            for 30 drivers across 3 centers, handles 22 edge cases correctly,
            and scales to 2,000 vehicles without architectural changes."

EVIDENCE:  Live demo of 8 screens + edge case walkthrough

IMPLICATIONS: "With this foundation, here's what we unlock next:
               battery monitoring, charging optimization, driver scoring."
```

**Where to use:** Literally the presentation structure. Don't start with "let me walk you through the architecture" — start with the answer.

### 7. Vision Narrative — Tell the Phase 0 to Phase N story

**Source:** Mastering Product Management — PM Deliverables

Frame the MVP as Chapter 1 of a multi-phase narrative:
- **Phase 0 (this MVP):** System of record — shifts, payroll, fleet status
- **Phase 1:** Intelligence layer — anomaly detection, CSV validation, trend alerts
- **Phase 2:** Optimization — shift scheduling, charging depot optimization, route intelligence
- **Phase 3:** Autonomy — automated dispatch, predictive maintenance, dynamic payroll

**Where to use:** Final slide. "Here's where this goes."

### 8. Value Delivery Chain — Demo flow

**Source:** Product Foundation — Pillar 3

Structure the demo around: **Discoverability to Usability to Utility**

| Stage | Demo Moment |
|-------|-------------|
| **Discoverability** | Show role-based routing (Admin sees everything, Supervisor sees their center) |
| **Usability** | Show shift check-in in 2 clicks, CSV upload drag-and-drop |
| **Utility** | Show payroll calculation with edge case breakdown, AI explanation |

**Where to use:** Demo walkthrough order. Don't show CRUD screens first — show the *value chain*.

### 9. Feature Performance Report — Pre-build the evaluation template

**Source:** Product Foundation — Pillar 4

Proactively present metrics for how you'd *measure* the MVP post-launch:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to close weekly payroll | <5 min (vs. ~2h manual) | Timer from CSV upload to closure |
| Payroll accuracy | 100% (zero manual corrections needed) | Error count in first 4 weeks |
| Shift registration speed | <30s per check-in/out | UX timing |
| Supervisor adoption | 3/3 supervisors using within Week 1 | Login frequency |

**Where to use:** "Here's how I'd measure whether this MVP is working."

### 10. TARS Framework — Define success metrics

**Source:** Product Foundation — Pillar 4

| TARS Component | Applied to MVP |
|---------------|---------------|
| **Target** | 4 users (1 Admin + 3 Supervisors), 150 vehicles, 300 drivers |
| **Adoption** | % of shifts registered digitally vs. still on WhatsApp |
| **Retention** | Weekly payroll closure completed on time (every Sunday) |
| **Satisfaction** | Admin time saved per week; error rate reduction |

**Where to use:** When asked "how would you measure success?"

---

## C. SOLVE — Building & Designing ("How to make better product decisions in the MVP")

### 11. Three Constraints Framework — Validate every feature

**Source:** Product Foundation — Pillar 2

For each of the 8 screens, check:

| Constraint | Question | Example (Payroll Screen) |
|-----------|---------|--------------------------|
| **Desirability** | Do users want this? | Admin currently spends 2h/week calculating manually — yes |
| **Viability** | Does it work for the business? | Correct payroll = legal compliance + driver retention |
| **Feasibility** | Can we build it in time? | Payroll logic is well-specified (22 edge cases documented) |

**Where to use:** Internal decision-making. If a feature fails any constraint, cut it.

### 12. Constrained Divergence — Feature design approach

**Source:** Product Foundation — Pillar 2

For the shift management screen (Gestion de Turnos):
- **Constraint:** Supervisor must register check-in + assign vehicle in <30s
- **Divergence:** Kanban board? Table view? Calendar view? Map view?
- **Decision:** Kanban (available / en turno / completado) because it's the most visual for real-time status

**Where to use:** Explain *why* you chose the UI pattern. "I explored 4 approaches, constrained by the 30-second registration target."

### 13. Milestone Planning — Break MVP into deliverable stages

**Source:** Product Foundation — Pillar 3

Instead of "I built everything at once," structure delivery:

| Milestone | What's Working | Value Delivered |
|-----------|---------------|----------------|
| **M1: Data Foundation** | DB schema + seed data + auth | System of record exists |
| **M2: Shift Management** | Check-in/out + vehicle assignment | Replace WhatsApp coordination |
| **M3: DiDi Integration** | CSV upload + parsing + validation | Billing data is digitized |
| **M4: Payroll Engine** | Calculation + edge cases + closure | Replace manual spreadsheet |
| **M5: Dashboard & Polish** | KPIs + role-based views + export | Admin has visibility |

**Where to use:** Architecture walkthrough. Shows you think in incremental value delivery, not waterfall.

### 14. Release Stages — Deployment strategy

**Source:** Product Foundation — Pillar 4

| Stage | Who | What | Duration |
|-------|-----|------|----------|
| **Alpha** | Jose + Levi | Validate payroll logic against real spreadsheet data | 1 week |
| **Beta** | 1 supervisor (Vallejo) | Register real shifts, compare with manual process | 1 week |
| **Partial** | All 3 supervisors | Full operation, Admin still runs parallel spreadsheet | 2 weeks |
| **GA** | Everyone | Spreadsheet retired | After 4 weeks |

**Where to use:** When asked "how would you roll this out?" Shows deployment maturity.

### 15. DRI Framework — Ownership model

**Source:** Product Foundation — Pillar 3

| DRI | Responsibility |
|-----|---------------|
| **Jose** | Architecture, payroll logic, data model, AI features |
| **Levi** | Requirements validation, edge case prioritization, stakeholder alignment |
| **Admin (ops)** | DiDi CSV upload, payroll closure execution, error reporting |
| **Supervisors** | Shift registration, vehicle status updates, ground truth validation |

**Where to use:** "Here's who owns what in production."

### 16. Lever Dashboards — Dashboard screen design

**Source:** Mastering Product Management — PM Deliverables

Design the Admin dashboard as a **lever dashboard**, not a vanity metrics board:

| Layer | Metrics | Why |
|-------|---------|-----|
| **Output (goal)** | Total weekly payroll cost; % drivers meeting goals | The business outcome |
| **Input (levers)** | Avg hours/driver; avg billing/driver; vehicle utilization % | What you can act on |
| **Granular (debug)** | Shifts with anomalies; CSV upload errors; overtime hours by center | For troubleshooting |

**Where to use:** Dashboard screen design. "I structured the dashboard as a lever dashboard — the top row is the outcome, the middle row is what you control, the bottom row is for debugging."

### 17. Four Causes of Low Adoption — Anticipate rollout risks

**Source:** Product Foundation — Pillar 4

| Cause | Risk for LAFA MVP | Mitigation |
|-------|-------------------|-----------|
| **Awareness** | Supervisors don't know system exists | Levi + Admin onboard directly |
| **Discoverability** | Can't find features in UI | Role-based routing shows only relevant screens |
| **Friction** | Check-in takes too long | Design for <30s, minimize clicks |
| **Value Prop** | "Why change from WhatsApp?" | Show real-time vehicle availability + payroll automation |

**Where to use:** Rollout plan discussion.

### 18. Architecture Diagrams (3 types) — Technical presentation

**Source:** Technical Foundations

Prepare all three:

1. **Layered Architecture:** Frontend / API / Business Logic / Database
2. **System Overview:** Auth service, Shift module, Payroll engine, CSV parser, Dashboard aggregator
3. **Data Flow (Payroll):** CSV upload / Parse / Match driver IDs / Aggregate by week / Apply business rules / Calculate pay / Store / Close

**Where to use:** Technical panel. Each diagram answers a different question.

### 19. Technical Concept X-Ray — Explain key technical choices

**Source:** Technical Foundations — Seven Questions

Apply to the **Payroll Engine**:

| Question | Answer |
|----------|--------|
| What does it do? | Calculates weekly driver compensation from shift hours + DiDi billing |
| Type of technology? | Business rules engine (deterministic calculation) |
| Where does it run? | Server-side (never client-side — security + auditability) |
| What problem does it solve? | Eliminates 2h/week of error-prone manual spreadsheet calculation |
| Inputs/outputs? | IN: shifts + trips aggregated by driver/week. OUT: payroll record with breakdown |
| Limitations? | Depends on correct CSV data; no real-time validation against DiDi API |
| Special context? | Mexican labor law (LFT) defines hours as "time at employer's disposal" |

**Where to use:** When the technical panel asks about any specific component.

### 20. Intelligent Router Framework — Information flow design

**Source:** Product Foundation — Pillar 3

Design RBAC as an information router:

```
All data flows through center_id filter:
  Admin: center_id = * (sees all)
  Supervisor: center_id = their_center (sees only theirs)

Payroll data flows through role filter:
  Admin: can execute/re-execute closure
  Supervisor: read-only view of their center's payroll
```

**Where to use:** RBAC architecture explanation.

### 21. Iteration Decision Matrix — Post-launch strategy

**Source:** Product Foundation — Pillar 4

For each feature post-launch:

| Signal | Action |
|--------|--------|
| Payroll accuracy <100% | **Optimize** — fix calculation bugs, improve CSV parsing |
| Supervisors bypass system (still use WhatsApp) | **Redesign** — UX friction too high, simplify check-in |
| Dashboard metrics not actionable | **Redesign** — wrong metrics, rebuild lever dashboard |
| Vehicle assignment rarely used | **Roll back** — maybe self-assignment works better |
| CSV upload errors >5% | **Optimize** — add validation rules, preview before import |

**Where to use:** "Here's my iteration playbook for the first month."

### 22. Product Ops Strategy Stack — Long-term infrastructure vision

**Source:** Mastering Product Operations

```
LAFA's Growth Target (2,000 vehicles)
  +-- Product Strategy: AI-powered fleet operations
        +-- Ops Strategy: Digitize > Measure > Optimize > Automate
              +-- MVP Roadmap: This challenge = "Digitize" phase
                    +-- Goals: 100% digital shift registration, 0% payroll errors
```

**Where to use:** "This MVP is the Digitize layer of a four-layer operations strategy."

### 23. Five Sources of PM Leverage — Frame Jose's contribution

**Source:** Mastering Product Management

| Leverage Source | How Jose Demonstrates It |
|----------------|------------------------|
| **Needle-Moving Work** | Built the highest-impact system (payroll + shifts = core ops) |
| **Team Empowerment** | RBAC lets supervisors self-serve without Admin bottleneck |
| **Leadership Buy-In** | Presentation strategy + Vision Narrative |
| **Product Intuition** | 25 assumptions resolved before building (not after) |
| **Focused Effort** | 8 screens, not 20. Phase 0, not Phase 3 |

**Where to use:** Self-positioning. "Here's how I think about leverage as a product builder."

### 24. Funnel Analysis + Proxy Metrics — Business case

**Source:** Product Foundation — Pillar 1

Build a business case for the MVP:

| Metric | Current (manual) | With MVP | Source |
|--------|-----------------|----------|--------|
| Payroll processing time | ~2h/week | <5 min | Admin time savings |
| Payroll errors | Unknown (no audit) | 0 (deterministic) | Edge case coverage |
| Vehicle utilization visibility | None | Real-time | Dashboard |
| Supervisor coordination | WhatsApp threads | Digital shift board | Shift management screen |
| Scaling cost per vehicle | Linear (more people) | Sublinear (same system) | Proxy: Vemo/Kovi benchmarks |

**Where to use:** ROI justification. "This MVP pays for itself in 4 weeks of Admin time savings alone."

### 25. Segment Attractiveness Scorecard — Justify RBAC scoping

**Source:** Product Strategy Map — Dimension 1

Score each user segment:

| Segment | Frequency | Pain | Impact | Priority |
|---------|-----------|------|--------|----------|
| Admin | Daily | Extreme (manual everything) | Highest (single point of failure) | P0 |
| Supervisor | Every shift | High (WhatsApp coordination) | High (3 people x 2 shifts/day) | P0 |
| Driver | N/A | Medium (paycheck clarity) | Low (not a system user) | P2 (future driver app) |

**Where to use:** "I designed for Admin and Supervisor first because they have the highest pain x frequency."

---

## D. BONUS — Meta-Frameworks for the Presentation Itself

### 26. Divergence/Convergence Cycle — Show your process

**Source:** Design Foundations

"I started divergent (explored 4 stack options, 3 UI patterns, 2 payroll interpretations), then converged on the simplest viable solution."

### 27. Fidelity Progression — Justify prototype level

**Source:** Design Foundations

"This is a mid-fidelity functional prototype. Not pixel-perfect, not wireframes — it's the right fidelity for validating business logic and UX flow before investing in polish."

### 28. Definition of Ready — Show operational maturity

**Source:** Product Foundation

"Before building, I wrote 25 assumptions, resolved all ambiguities, defined 22 edge cases, and designed the data model. The challenge was *ready* before I wrote the first line of code."

### 29. Retrospective Framework — Self-awareness

**Source:** Product Foundation

Proactively share what you'd do differently:
- "If I had more time, I'd add real-time CSV validation"
- "The shift management UX could be faster with drag-and-drop"
- "I'd want to A/B test the dashboard layout with real supervisors"

---

## Summary: Top 10 Most Impactful Frameworks

| # | Framework | Use | Impact |
|---|-----------|-----|--------|
| 1 | **Minto Pyramid** | Presentation structure | Answer-first = instant credibility |
| 2 | **Four Types of Product Work** | Strategic framing | "This is Scaling work" = shows PM maturity |
| 3 | **OMG Framework** | Problem statement | Forces evaluators to see the gap |
| 4 | **Lever Dashboards** | Dashboard design | Shows metrics thinking, not vanity metrics |
| 5 | **Milestone Planning** | Architecture walkthrough | Incremental value delivery |
| 6 | **TARS Framework** | Success metrics | Concrete measurement plan |
| 7 | **Release Stages** | Rollout strategy | Alpha to Beta to GA deployment maturity |
| 8 | **Product Spine** | Connect to company strategy | Every line of code traces to growth target |
| 9 | **Architecture Diagrams (3 types)** | Technical panel | Right diagram for right audience |
| 10 | **Five Sources of Leverage** | Self-positioning | "Here's how I think about impact" |

---

## Presentation Prep Checklist

- [ ] Open with Minto Pyramid: answer first, evidence second, implications third
- [ ] Frame as "Scaling work" (Four Types) in the first 2 minutes
- [ ] Use OMG framework for problem statement slide
- [ ] Structure demo as Value Delivery Chain: Discoverability / Usability / Utility
- [ ] Show Product Spine connecting every feature to 2,000-vehicle growth target
- [ ] Present dashboard as Lever Dashboard (output / input / debug layers)
- [ ] Have Milestone Planning ready for "how did you build this?" questions
- [ ] Have Release Stages ready for "how would you roll this out?" questions
- [ ] Have TARS metrics ready for "how would you measure success?" questions
- [ ] Use Technical Concept X-Ray format for technical panel deep-dives
- [ ] Close with Vision Narrative: Phase 0 to Phase N story
- [ ] Show self-awareness with Retrospective Framework: what you'd improve
