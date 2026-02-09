# LAFA AI Product Engineer: Real Work Roadmap (First 14 Months)

**Compiled: February 2026 | Updated post-interview with Levi Garcia**
**Proposal:** Reprioritized technical roadmap for the AI Product Engineer (Internal Tools) role at LAFA. Organized by **product track** (Foundation, DaE, LTO) with 16 projects covering architecture, MVP scope, stack, metrics, and competitive benchmarks.

---

## Context

LAFA is an early-scale startup (~150 EVs operating, target 2,000 by end of 2026, planned tech team of 3 people) that operates electric vehicles for gig drivers (Uber/DiDi) in CDMX. It operates **two products**: Driver-as-Employee (LAFA employs the driver) and Lease-to-Own (launched Dec 2025). It was named a strategic partner of DiDi Premier (Oct 2025). OEMs: **Geely, JAC, GAC**. Its competitors — OCN ($100M+ raised, 25K+ customers, AI underwriting) and VEMO ($500M+, 2K+ EVs, ZEE platform) — already have mature internal tools. LAFA needs to build its own from scratch to scale.

**Current tech state: "Everything is managed with spreadsheets."** There is no operational database, no dashboard, no automated tracking. This fundamentally changes prioritization: **infrastructure first, AI later.**

The AI Product Engineer is the first technical product hire, reporting directly to Levi Garcia (Head of Product). There is no established engineering team. This means: high impact, high ambiguity, and the need to prioritize ruthlessly.

**Three-track structure:** Projects are organized by which product they serve. **Track A (Foundation)** builds shared infrastructure used by both products. **Track B (DaE)** covers tools specific to the employment model. **Track C (LTO)** covers tools specific to the financial product. Mixed projects (P1, P3, P6) live in Foundation with DaE/LTO-specific scope sections inside each.

**Base tech stack:** Python (FastAPI) + PostgreSQL + Redis + AWS + WhatsApp Business API + Conekta/SPEI + Geotab/telematics + XGBoost + OpenAI/LangChain.

**Guiding principle:** Every tool must directly improve a financial metric (default rate, vehicle utilization, collection cost, onboarding time). We don't build tech for the sake of building tech.

---

## Executive Summary (BY PRODUCT TRACK)

### Track A: Foundation & Cross-Product Capabilities (~34 weeks)

| # | Project | Primary User | Mo | Effort | Impact |
|---|---------|-------------|-----|--------|--------|
| **P0.1** | **Operational Database** | **All teams** | **1-2** | **3-4 wk** | **Foundation — enables everything else** |
| **P0.2** | **Basic Dashboard (Metabase)** | **Head of Product, Stakeholders** | **1-2** | **1-2 wk** | **Transparency for stakeholders** |
| **P0.3** | **Maintenance Tracking** | **Fleet Ops Manager** | **1-2** | **2 wk** | **Asset protection (150→2,000 vehicles)** |
| **P0.5c** | **Incident Reporting** | **Fleet Ops Manager, Insurance Admin** | **2-3** | **2 wk** | **Structured data for insurance + ops** |
| **P0.5d** | **Insurance Module** | **Finance Lead, Fleet Ops Manager** | **2-3** | **2 wk** | **MXN $36-72M/yr in premiums untracked** |
| P1 | Driver Onboarding AI (lite) | Onboarding Coordinator | 3-5 | 4 wk | MXN $180K-300K (ops + fraud savings) |
| P4 | Battery Monitoring | Fleet Ops Manager, Finance Lead | 3-5 | 4 wk | MXN $1.6M-4.0M (residual value) |
| P3 | WhatsApp Collections Bot | Collections Specialist | 5-7 | 6 wk | MXN $460K-750K (collection savings) |
| P6 | Document Automation | Legal/Admin, Onboarding Coord. | 5-7 | 4 wk | MXN $48K-72K (admin savings) |
| P7 | Dashboard Enhanced | CEO, Head of Product, All | 9-13 | 4 wk | Enabler — real-time decision-making |
| P8 | Knowledge Bot (RAG) | All teams, Support | 11-14 | 4 wk | MXN $60K-240K (training savings) |

### Track B: Driver-as-Employee (DaE) (~8 weeks)

| # | Project | Primary User | Mo | Effort | Impact |
|---|---------|-------------|-----|--------|--------|
| **P0.4** | **Shift Dispatch (WhatsApp)** | **Fleet Ops Manager** | **1-2** | **1-2 wk** | **Shift coordination** |
| **P0.5a** | **HR/Payroll (Runa/Worky)** | **HR/Payroll Admin** | **2-3** | **2-3 wk** | **Compliance — nómina/IMSS at 500+** |
| P5 | Charging Ops (depot) | Fleet Ops Manager, Finance Lead | 5-7 | 4 wk | MXN $1.0M-3.2M (electricity savings) |

Cross-product features with DaE-specific scope: P1 (employment docs), P3 (payroll deduction + basic reminders), P6 (employment contracts + CFDI).

### Track C: Lease-to-Own (LTO) (~8 weeks)

| # | Project | Primary User | Mo | Effort | Impact |
|---|---------|-------------|-----|--------|--------|
| **P0.5b** | **LTO Account Statement** | **Customer Support Lead** | **2-3** | **1-2 wk** | **Trust/retention — reduces support 60-80%** |
| P2 | AI Credit Scoring | Finance Lead, Underwriting | 7-9 | 6 wk | MXN $255K-510K (defaults avoided) |

Cross-product features with LTO-specific scope: P1 (financial suitability + KYC), P3 (full graduated escalation + intent classification), P6 (lease contracts + promissory notes).

| | | | | **~50 wk** | **MXN $3.6M-9.1M/year** |

**Key change vs. original roadmap:** Same 8 AI projects, but with foundation infrastructure (P0.1-P0.4) and operational gap projects (P0.5a-d) added upfront. Total effort ~50 weeks over 14 months. **Infrastructure first, operations second, AI third.**

### Justification for Each Change

| Project | Change | Why |
|---------|--------|-----|
| **P0 (NEW)** | Add Foundation track infrastructure: DB + Dashboard + Maintenance | "Everything is spreadsheets" — without a database you can't build anything |
| **P0.5 (NEW)** | Add operational gaps: HR/Payroll, LTO Statements, Incidents, Insurance | Operational gaps that break before 500 vehicles. Buy or wire — no AI needed. |
| **P7 Dashboard** | From Month 9-12 to **Month 1** (as P0.2) | Levi asked for exactly this: "transparency for stakeholders, better decisions" |
| **P2 Credit Scoring** | From Month 1-3 to **Month 7-9** | Levi did NOT mention underwriting. Without historical payment data, there is no model. Wait 5-6 months for payment data |
| **P4 Battery** | From Month 3-6 to **Month 3-5** | LAFA maintains the vehicles — battery health is direct P&L. At 150 to 2,000, predictive maintenance is critical |
| **P5 Charging** | Modify scope | From "driver recommendations" to "internal depot charging optimization". LAFA pays for charging ($300/week per vehicle) |
| **P1 Onboarding** | Scope down | No MetaMap/Belvo initially. Just WhatsApp + OCR + dashboard. Speed > sophistication to reach 2,000 |
| **P3 Collections** | Slight shift | From "default recovery" to "consistent weekly enforcement". Adjust for two products (DaE + LTO) |
| **P8 RAG** | No change | Month 11-14. Needs indexable docs that don't exist yet |

---

## TRACK A — FOUNDATION & CROSS-PRODUCT

> Shared infrastructure and tools used by both products. These projects form the operating system that the DaE and LTO tracks depend on. Ordered chronologically by month.

---

### Project 0.1: Operational Database (PostgreSQL)

**Primary user:** All teams
**Internal tool type:** Core data infrastructure
**Products served:** Both (DaE + LTO)

**Business problem:**
There is no centralized database. Driver, vehicle, payment, maintenance, and charging information lives in scattered spreadsheets. This prevents any automation, analysis, or operational visibility. With 150 vehicles it's painful; with 2,000 it's impossible.

**Schema:**
```sql
-- Core entities
drivers (id, name, curp, rfc, phone, type [employee|lto], status, onboarded_at, ...)
vehicles (id, vin, oem [geely|jac|gac], model, plate, status, assigned_driver_id, ...)

-- Financial
payments (id, driver_id, amount, due_date, paid_date, method, status, product_type, ...)
contracts (id, driver_id, vehicle_id, type [employee|lto], start_date, weekly_rate, ...)

-- Operations
charging_events (id, vehicle_id, station, kwh, cost, start_time, end_time, soc_start, soc_end, ...)
maintenance_logs (id, vehicle_id, type, description, cost, date, next_service_km, ...)
shifts (id, driver_id, vehicle_id, date, start_time, end_time, status, ...)

-- Telematics (if available)
telematics (id, vehicle_id, timestamp, soc, odometer, lat, lon, battery_temp, ...)
```

**ETL from current sources:**
- Conekta/SPEI -> `payments` (automatic webhooks)
- Geotab -> `telematics` (API polling every 60s)
- Manual entry -> `maintenance_logs`, `charging_events` (simple web form)
- Migration from existing spreadsheets -> all tables

**Critical schema distinction:** `product_type` in payments and `type` in contracts/drivers distinguishes **Driver-as-Employee vs LTO**. This is fundamental because the two products have completely different operational flows.

**Effort:** 3-4 weeks
**Stack:** PostgreSQL + FastAPI + Alembic (migrations) + AWS RDS

**Benchmark:** Both VEMO (ZEE platform) and OCN built centralized operational databases as their first technical priority. LAFA at Stage 0 (spreadsheets) is the typical pre-scalability pattern.

---

### Project 0.2: Basic Dashboard (Metabase)

**Primary user:** Head of Product (Levi), CEO (JJ), Stakeholders
**Internal tool type:** Operational dashboard
**Products served:** Both (DaE + LTO)

**Business problem:**
Levi explicitly asked for: "transparency for stakeholders, better decisions." Today nobody can answer "how is the business doing?" without reviewing multiple spreadsheets. This slows decision-making and the ability to raise capital.

**Dashboard views:**
- **Fleet Overview:** cars online, weekly revenue, utilization %, breakdown by OEM (Geely/JAC/GAC)
- **Payment Status:** % on-time, defaults, collections pipeline, DaE vs LTO split
- **Vehicle Health:** battery %, downtime, pending maintenance (basic — no telematics yet)
- **Driver Status:** active, onboarding, delinquent, breakdown by product

**MVP:** Metabase open-source connected to PostgreSQL (P0.1). Pre-built dashboards in Metabase (no custom frontend required).

**Effort:** 1-2 weeks (after P0.1)
**Stack:** Metabase (open-source, self-hosted on AWS) + PostgreSQL

---

### Project 0.3: Maintenance Tracking

**Primary user:** Fleet Operations Manager
**Internal tool type:** Asset management system
**Products served:** Both (DaE + LTO)

**Business problem:**
LAFA maintains the vehicles (confirmed by Levi — especially for Driver-as-Employee). With 150 vehicles and growth to 2,000, manual maintenance tracking is unsustainable. A vehicle out of service = driver without income + vehicle not generating revenue.

**Features:**
- Simple CMS: service history, costs, next service, alerts
- Automatic alerts: "Vehicle LAF-042 needs service in 500 km"
- Dashboard in Metabase: vehicles with pending maintenance, accumulated cost per vehicle
- Downtime logging (to calculate actual vehicle utilization)

**Effort:** 2 weeks
**Stack:** FastAPI + PostgreSQL + WhatsApp (alerts)

---

### Project 0.5c: Incident Reporting (WhatsApp → DB)

**Primary user:** Fleet Operations Manager, Insurance Admin
**Internal tool type:** Incident management system
**Products served:** Both (DaE + LTO)

**Business problem:**
Accidents, theft, and mechanical failures are reported via ad-hoc WhatsApp group messages. There is no structured record, no tracking, no data for insurance claims. At 150 vehicles this is messy; at 2,000 it's unmanageable.

**Deliverable:**
- Structured WhatsApp form: driver triggers "Reporte" → guided flow (incident type, location, photos, description)
- Data stored in `incidents` table (new table in P0.1 database)
- Metabase dashboard: open incidents, resolution time, cost, trends by vehicle/driver/type
- Auto-notification to ops team + insurance contact

**Effort:** 2 weeks
**Stack:** WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + AWS S3 (photos)

**Benchmark:** Shipday: incident forms integrated into real-time tracking. VEMO: QHSE protocol with rapid-response C2 and photographic documentation.

---

### Project 0.5d: Insurance Module

**Primary user:** Finance Lead, Fleet Operations Manager
**Internal tool type:** Insurance management dashboard
**Products served:** Both (DaE + LTO)

**Business problem:**
With 150 vehicles at MXN $20K-40K/year per policy = **MXN $3M-6M/year in premiums today** (MXN $36-72M at 2,000 vehicles). Policy tracking, renewals, and claims are unstructured. A single missed renewal = uninsured vehicle on the road. A slow claim = vehicle sitting idle for weeks.

**Deliverable:**
- New tables: `insurance_policies` (vehicle, insurer, policy number, start/end dates, premium, coverage type) + `claims` (incident_id, policy_id, status, payout, dates)
- Metabase dashboard: policies expiring in 30/60/90 days, active claims, cost per vehicle, insurer performance
- Automatic renewal alerts (WhatsApp to ops team)
- Link to incident reporting (P0.5c) for seamless claim initiation

**Effort:** 2 weeks
**Stack:** FastAPI + PostgreSQL (P0.1) + Metabase + WhatsApp (alerts)

**Benchmark:** VEMO: insurance bundled into monthly rent ($3,500-4,000 MXN/month). Reference model for LAFA: bundle insurance with the lease.

---

### Project 1: Driver Onboarding AI System (Reduced Scope)

**Primary user:** Onboarding Coordinator
**Internal tool type:** Application processing pipeline
**Products served:** Both (DaE + LTO) — with product-specific scope below

**Business problem:**
Each new driver goes through a manual process: document collection (INE, license, proof of address, platform certificates), identity verification, human review. To reach 2,000 vehicles, LAFA needs to onboard ~150+ drivers/month. Without automation, this requires a dedicated team.

**Change vs. original roadmap:** Reduced scope. No MetaMap/Belvo initially. Onboarding speed > verification sophistication. MetaMap and Belvo are added in a future iteration when volume justifies it.

**Financial impact:** Reduce onboarding time from 2-3 days to <4 hours. Save MXN $15,000-25,000/month in operational costs.

**Architecture (MVP Lite):**
```
[WhatsApp] -> Driver sends documents (INE, license, proof of address)
        |
[Document Classification] — GPT-4o Vision classifies document type
        |
[OCR + Data Extraction] — Extract fields: name, CURP, RFC, address, expiry
        |
[Rules Engine] — Minimum filters (age, license expiry, product type DaE/LTO)
        |
[Application Dashboard] — Panel in Metabase: approved, pending, rejected
        |
[WhatsApp Notification] — Result to driver
```

**DaE scope:** Employment document collection (INE, CURP, RFC, proof of address, bank account for nómina). Verification is lighter — LAFA controls the relationship. Output: approved driver ready for IMSS registration and shift assignment. No credit check needed.

**LTO scope:** Financial suitability screening in addition to identity verification. Collects platform earnings evidence (Uber/DiDi screenshots). Feeds into P2 (Credit Scoring) when available. Output: pre-qualified applicant ready for credit decision. Future iteration adds MetaMap (biometric KYC) and Belvo (open banking).

**What this MVP does NOT include (future iterations):**
- MetaMap (biometric INE/CURP/RFC verification) — add in Mo 5-6
- Belvo (open banking) — add together with credit scoring (Mo 7-9)
- Remote home visit video (like OCN) — add in Mo 7+

**MVP (Weeks 13-16):**
- Week 13-14: WhatsApp flow to receive documents + Document classification with GPT-4o Vision + OCR extraction
- Week 15-16: Basic rules engine + Applications dashboard in Metabase + WhatsApp notifications

**Stack:**
- WhatsApp Business API (via Twilio or Meta Cloud API)
- OpenAI GPT-4o Vision API (document classification + OCR)
- FastAPI backend + PostgreSQL (from P0.1)
- Metabase for operations dashboard (from P0.2)

**Success metrics:**
| KPI | Before | Target |
|-----|--------|--------|
| Average onboarding time | >48h | <4h |
| Documents processed without human intervention | 0% | >70% |
| Cost per onboarding | MXN $400-600 | MXN $150-250 |

**Dependencies:** P0.1 (database) + approved WhatsApp Business API account.

**Risks:** Quality of photos sent via WhatsApp (compression). Mitigation: clear instructions + automatic retry if quality is insufficient.

**Benchmark OCN:** 90 minutes from application to approval, including remote home visit video. LAFA MVP targets <4 hours without home visit video initially, adding it in a future iteration.

---

### Project 4: Battery Health Monitoring System

**Primary user:** Fleet Operations Manager, Finance Lead
**Internal tool type:** Asset health monitoring dashboard
**Products served:** Both (DaE + LTO)

**Why it's in Foundation:** LAFA maintains vehicles for both products. The battery represents 40-50% of the EV cost. Battery data feeds the dashboard (P0.2) and charging optimization (P5).

**Business problem:**
The battery represents 40-50% of an EV's cost (~MXN $150,000-200,000 of a MXN $400,000 vehicle). Without monitoring, LAFA doesn't know if a vehicle is degrading faster than expected. With 150 vehicles today and 2,000 by year-end, protecting batteries protects **MXN $60-80 million in assets** (at 2,000 vehicles).

**Financial impact:** Extend battery lifespan from 88% to 92% SOH at 4 years = MXN $16,000-40,000 additional residual value per vehicle. At 2,000 vehicles = **MXN $32-80 million preserved.** Plus: reduce corrective maintenance with preventive.

**Technical context — why CDMX is ideal:**
- LFP batteries (Geely/JAC/GAC) retain **88-92% SOH after 4 years** of intensive gig use (100,000 km/year)
- CDMX temperature 15-25C year-round = **near-optimal** for LFP (minimal degradation)
- Altitude 2,240m: **no negative effect** on batteries (even reduces aerodynamic drag)
- 3,000-5,000 cycle life for LFP vs 1,000-2,000 for NMC

**Architecture:**
```
[Vehicle Telematics] — Geotab / OBD-II / OEM API (Geely/JAC/GAC)
  -> Data every 30-60 seconds: SOC, voltage, temperature, current,
     charge rate, accumulated cycles, odometer
        |
[Data Pipeline] — AWS Kinesis or Kafka lite
  -> Real-time telemetry event ingestion
  -> Storage: TimescaleDB (PostgreSQL extension for time-series)
        |
[Battery Analytics Engine]
  -> SOH Estimation: model based on effective vs nominal capacity
  -> Degradation Curve Fitting: polynomial regression per vehicle
  -> Anomaly Detection: Isolation Forest to detect vehicles
     degrading faster than the expected curve
  -> Charge Pattern Analysis: classify charging patterns
        |
[Alert System]
  -> Alerts to ops team (via Metabase + WhatsApp):
     "Vehicle LAF-042 degrading 2x faster than average"
  -> Predictive maintenance alerts:
     "Battery of LAF-017 projected to 80% SOH in 8 months"
        |
[Fleet Battery Dashboard — in Metabase]
  -> SOH heatmap, degradation curves, alerts
  -> Vehicle ranking by degradation risk
  -> Residual value projection per vehicle
```

**MVP (Weeks 13-20, in parallel with P1):**
- Week 13-14: Integration with telematics provider (Geotab API or equivalent). Ingestion pipeline to TimescaleDB.
- Week 15-16: Battery health dashboard in Metabase: current SOC, charge history, accumulated cycles, temperature. Basic alerts (SOH <90%, temperature >40C).
- Week 17-20: Degradation curve model per vehicle. Anomaly detection. Proactive alerts to ops team.

**Stack:**
- Geotab SDK or OEM API (Geely/JAC/GAC telematics)
- TimescaleDB (PostgreSQL extension for time-series)
- Python: pandas, scipy (curve fitting), scikit-learn (Isolation Forest)
- Metabase (reuse from P0.2) + Grafana for real-time telematics
- FastAPI for alert APIs
- WhatsApp Business API for team notifications

**Success metrics:**
| KPI | Target |
|-----|--------|
| Fleet with active monitoring | 100% |
| Average SOH at 12 months | >96% |
| Batteries with anomalous degradation detected <30 days | 100% |
| Downtime due to battery issues | >50% reduction |

**Dependencies:** P0.1 (database). Access to telematic data (contract with Geotab or direct CAN bus access via OBD-II).

**Risks:** Some OEMs don't expose detailed battery data via standard API. Mitigation: aftermarket OBD-II + Geotab as universal fallback.

**Benchmark VEMO:** ZEE platform monitors battery health with ML on 900+ EVs, predicts degradation, optimizes charging. LAFA doesn't need ZEE's complexity initially — 20% of the features delivers 80% of the value (SOH tracking + anomaly detection).

---

### Project 3: WhatsApp Collections Bot

**Primary user:** Collections Specialist
**Internal tool type:** Automated collections workflow
**Products served:** Both (DaE + LTO) — with product-specific scope below

**Business problem:**
Collections is the most labor-intensive process. With weekly payments aligned to gig cash flow, there are 4 collection cycles per month per driver. At 2,000 vehicles = **8,000 monthly collection interactions.** Without automation: 8-10 people dedicated full-time to collections.

**Financial impact:** Reduce collections team from 8-10 people to 2-3 (savings of MXN $75,000-100,000/month at 2,000 scale). Reduce average days past due from 14 to 5 days. Prevent additional defaults.

**Architecture:**
```
[Payment Tracking System] — Conekta/SPEI webhooks -> PostgreSQL (P0.1)
        |
[Product Segmentation]
  -> Driver-as-Employee: standard reminder + automatic nomina (payroll) deduction
  -> LTO: full collections flow with escalation
        |
[Conversational Engine] — WhatsApp Business API + LangChain
  -> Proactive outreach (graduated response):
    - Day -2: "Friendly reminder: your MXN $X payment is due Friday"
    - Day 0: "Your payment is due today. Need help?"
    - Day +3: "You are 3 days past due. We can offer you a plan..."
    - Day +7: "Important: second notice. Contact your advisor."
    - Day +14: Automatic escalation to legal team
  -> Intent classification with LLM (excuses vs real emergencies)
  -> Dynamic restructuring offers
        |
[Agent Escalation] — For cases requiring a human
  -> Dashboard with full context in Metabase
        |
[Analytics] — Effectiveness metrics for each message/flow
```

**DaE scope:** Standard reminder flow + automatic nómina (payroll) deduction. Low complexity — LAFA controls the vehicle and employment relationship. Collections team only intervenes for repeated absences or billing shortfalls. The primary mechanism is payroll deduction, not payment collection.

**LTO scope:** Full graduated escalation (Day -2 → Day 0 → Day +3 → Day +7 → Day +14 → legal). Intent classification with LLM to distinguish excuses from real emergencies. Dynamic restructuring offers (extend term, reduce payment, grace period). Higher default risk because driver is independent. This is the heavy-lift side of collections — requires sophisticated conversational AI, payment plan negotiation, and seamless handoff to human agents for complex cases.

**MVP (Weeks 21-26):**
- Week 21-22: WhatsApp Business API integration. Automated reminder flows. Meta-approved templates.
- Week 23-24: Intent classification with LLM. Smart routing to predefined responses or human escalation.
- Week 25-26: Default prediction model v1 (logistic regression on payment history). Collections dashboard.

**Stack:**
- WhatsApp Business API (Meta Cloud API or Twilio)
- LangChain + OpenAI GPT-4o-mini (intent classification + response generation)
- Conekta webhooks for SPEI/card payment tracking
- FastAPI + PostgreSQL + Celery + Redis

**Success metrics:**
| KPI | Before | Target |
|-----|--------|--------|
| Collections resolved without human intervention | 0% | >60% |
| Average days past due | 14 | <5 |
| Collection cost per vehicle/month | MXN $750 | MXN $200 |
| Default rate improvement | — | -2-3 percentage points |

**Risks:** CONDUSEF (financial consumer protection) prohibits intimidation in collections. Mitigation: always empathetic tone, daily message limit, permitted hours (8am-9pm), visible opt-out option.

---

### Project 6: Contract & Document Automation

**Primary user:** Legal/Admin, Onboarding Coordinator
**Internal tool type:** Document generation and signing workflow
**Products served:** Both (DaE + LTO) — with product-specific scope below

**Business problem:**
Each new lease contract (LTO) or employment contract (DaE) requires customized legal documents. With two products, document complexity doubles. At 150+ onboardings/month to reach 2,000 vehicles = 150+ contracts/month.

**Financial impact:** Save 40+ hours/month of administrative work (MXN $8,000-12,000/month). Reduce contract errors.

**Architecture:**
```
[Template Engine]
  -> LTO contracts (financial lease)
  -> DaE contracts (formal employment)
  -> Promissory notes, delivery-acceptance letters
  -> Accident/insurance forms
        |
[LLM Layer — V2]
  -> Incident report generation via WhatsApp (integrates with P0.5c)
  -> Executive portfolio status summary for financiers
        |
[Digital Signing] — Mifiel/ISign (NOM-151)
        |
[Document Repository] — AWS S3 + metadata in PostgreSQL
```

**DaE scope:** Employment contracts (contrato individual de trabajo), IMSS registration forms, CFDI 4.0 payroll receipts, vehicle assignment letters. Templates are relatively standardized — main variable is driver info and vehicle assignment. Auto-generation on driver approval from P1.

**LTO scope:** Arrendamiento financiero (financial lease) contracts, pagarés (promissory notes), delivery-acceptance letters, equity calculation documents. Higher complexity — each contract has customized financial terms (weekly rate, duration, residual value, purchase option price). Requires NOM-151 compliant digital signatures. Future: automated contract amendments for restructured payments (from P3).

**MVP (Weeks 27-30):**
- Week 27-28: Jinja2 templates for LTO + DaE contracts. Auto-fill from database. PDF generation.
- Week 29-30: Basic electronic signature (Mifiel/ISign, NOM-151).

**Future scope (V2):** LLM-powered claim report assistant via WhatsApp (integrates with P0.5c Incident Reporting).

**Stack:** Jinja2 + WeasyPrint + OpenAI GPT-4o + Mifiel API + AWS S3 + FastAPI + PostgreSQL

**Success metrics:**
| KPI | Before | Target |
|-----|--------|--------|
| Contract generation time | 2 hours | <10 minutes |
| Contract errors | Frequent | >90% reduction |
| Digitally signed contracts | 0% | >90% |

---

### Project 7: Operations Dashboard Enhanced

**Primary user:** CEO (JJ), Head of Product (Levi), All teams
**Internal tool type:** Executive intelligence dashboard
**Products served:** Both (DaE + LTO)

**Business problem:**
The basic dashboard (P0.2) provides 4 static operational views. At 500+ vehicles with multiple business lines (DaE + LTO), the CEO and Head of Product need: real-time financial metrics (P&L per vehicle, unit economics per cohort), risk prediction (default ranking), intelligent alerts, and automated investor reports. This requires a transformation layer (dbt), advanced aggregations, and alerting infrastructure that P0.2 cannot support. Development in 4 concentrated weeks during Mo 7-8. Mo 9 = iteration based on stakeholder feedback + stabilization.

**Architecture:**
```
[Data Layer — built in Track A + B + C]
  -> PostgreSQL: drivers, contracts, scoring, payments
  -> TimescaleDB: telematics, battery
  -> S3: documents
        |
[Aggregation Layer]
  -> dbt for transformations and calculated metrics
  -> Models: revenue_per_vehicle, utilization_rate, default_risk_score,
     battery_health_fleet, collection_efficiency, cost_per_charge
        |
[Visualization Layer — Metabase Enhanced]
  -> Executive view: key KPIs + trends
  -> Financial view: P&L per vehicle, cohort analysis, unit economics
  -> Risk view: drivers ranked by default probability
  -> Battery view: SOH heatmap, degradation projections
  -> Fleet map in real-time with KPI overlay (integrates battery data from P4 as map layer)
  -> DaE vs LTO comparison (metrics by product)
        |
[Alerting Layer]
  -> Slack/WhatsApp alerts for anomalies
  -> Automated weekly/monthly PDF reports for stakeholders
```

**MVP (Weeks 37-40):**
- Week 37-38: dbt models for calculated metrics. Advanced financial views.
- Week 39-40: Alert system. Automated PDF reports. Executive view for CEO.

**Stack:** Metabase + dbt + PostgreSQL + TimescaleDB + FastAPI

**Success metrics:**
| KPI | Before | Target |
|-----|--------|--------|
| Calculated metrics available | 4 operational views | 30+ metrics (operational + financial + risk) |
| Automated reports | 0 | 2/week (weekly + monthly PDF) |
| Data latency | T+1 day (manual) | <5 minutes (near real-time) |

**Benchmark:** Shipday: 9 report types segmented by stakeholder (Sales, Drivers, Performance, Heatmap, etc). OCN: executive dashboard with real-time portfolio metrics. LAFA P7: evolution from 4 basic views to 8+ segmented reports.

---

### Project 8: Internal Knowledge Bot (RAG)

**Primary user:** All teams, Customer Support Lead
**Internal tool type:** Knowledge management and support automation
**Products served:** Both (DaE + LTO)

**Business problem:**
As LAFA grows from 150 to 2,000 vehicles, the team needs to grow from ~5 to ~20-30 people. Operational knowledge today lives in the heads of 2-3 people. Without indexable documentation, each new employee takes weeks to become productive.

**Financial impact:** Reduce employee onboarding time from 4 weeks to 1 week. Scale driver support without linear headcount increase.

**Architecture:**
```
[Knowledge Base]
  -> Documents: operations manuals, policies, contracts, FAQs,
     vehicle specifications (Geely/JAC/GAC), regulations
        |
[RAG Pipeline]
  -> Chunking + Embeddings (OpenAI text-embedding-3-small)
  -> Vector Store: pgvector (PostgreSQL extension)
  -> Retrieval: cosine similarity top-k + reranking
        |
[LLM Response] — GPT-4o-mini with citations
        |
[Interfaces]
  -> Slack bot for internal team
  -> WhatsApp bot for drivers (FAQs)
```

**MVP (Weeks 45-48):**
- Week 45-46: Collect and structure documentation. RAG pipeline with LangChain + pgvector.
- Week 47-48: Internal Slack bot. WhatsApp FAQ bot for drivers (top 20 questions).

**Stack:** LangChain + pgvector + OpenAI + Slack SDK + WhatsApp Business API

**Success metrics:**
| KPI | Target |
|-----|--------|
| Queries answered correctly | >85% (resolved without human escalation) |
| Response time | <10 seconds |
| New employee onboarding time | From 4 to <2 weeks |

**Benchmark:** Slack AI: RAG over conversation history. Notion AI: semantic search over internal docs. LAFA: RAG over manuals, contracts, policies + WhatsApp FAQ bot for drivers.

---

## TRACK B — DRIVER-AS-EMPLOYEE (DaE)

> Tools specific to the employment model where LAFA hires drivers, assigns shifts, and controls charging. These projects only apply when LAFA is the employer.

---

### Project 0.4: Shift Dispatch (WhatsApp)

**Primary user:** Fleet Operations Manager
**Internal tool type:** Shift assignment and confirmation system
**Products served:** DaE only

**Business problem:**
For the Driver-as-Employee product, LAFA needs to assign shifts and vehicles. Without a system, this is manual coordination via group WhatsApp — error-prone, not scalable to 2,000 vehicles.

**Features:**
- Daily notification to driver: "Your shift is tomorrow 6am. Car: LAF-042. Battery: 95%"
- Vehicle assignment based on availability and zone
- Driver confirmation via WhatsApp (reply "OK" or "NO")
- Shift view in Metabase dashboard (who confirmed, who didn't)

**Future scope (+500 vehicles):** Visual Kanban board (Assigned Shifts | Available Vehicles) with drag-and-drop for rapid assignment (Shipday Dispatch pattern).

**Effort:** 1-2 weeks
**Stack:** WhatsApp Business API + FastAPI + PostgreSQL

---

### Project 0.5a: HR/Payroll Integration (Runa or Worky)

**Primary user:** HR/Payroll Admin
**Internal tool type:** Payroll and compliance automation
**Products served:** DaE only

**Business problem:**
LAFA has 150+ Driver-as-Employee workers on formal payroll (nómina). Mexican labor law requires biweekly payroll, IMSS registration, vacation tracking, aguinaldo, PTU, and CFDI 4.0 stamping. Today this is manual. At 500+ employees, manual payroll = compliance risk + errors + delays.

**Approach: Buy, don't build.** Runa (~MXN $99/employee/month) or Worky handle nómina, IMSS, CFDI 4.0, and vacation tracking out of the box. The work is integration, not construction.

**Deliverable:**
- Connect SaaS payroll (Runa/Worky) to P0.1 database via API
- Sync `drivers` table (employee type) with payroll system
- Automate: new hire registration, biweekly payroll run, IMSS alta/baja
- Dashboard view in Metabase: payroll cost per driver, IMSS status, upcoming obligations

**Effort:** 2-3 weeks
**Stack:** Runa/Worky API + FastAPI + PostgreSQL (P0.1)

**Benchmark:** Runa is the #1 payroll SaaS in Mexico for startups (5,000+ companies). Worky is an alternative for teams <100. The buy-not-build decision is standard.

---

### Project 5: Charging Operations (Internal Depot Optimization)

**Primary user:** Fleet Operations Manager, Finance Lead
**Internal tool type:** Charging cost optimization engine
**Products served:** DaE only (LAFA pays for charging)

**Change vs. original roadmap:** LAFA pays for charging ($300 MXN/week per vehicle, Driver-as-Employee). The scope changes from "driver recommendations" to **"internal depot charging optimization"**. LAFA controls where and when vehicles are charged.

**Business problem:**
With 150 vehicles charging at $300/week = MXN $180,000/month in electricity. At 2,000 vehicles = **MXN $2.4M/month.** Optimizing when and how charging occurs can save 30-40% of this cost. Impact includes: base rate savings (30-40%) + CFE demand charge reduction (>40%) + reduction of losses from inefficient charging.

| Charge type | Effective cost/kWh | Context |
|-------------|-------------------|---------|
| Overnight depot (CFE base rate) | MXN $1.00-1.50 | Off-peak, 00:00-06:00 |
| Mid-period depot | MXN $1.20-1.80 | Mid-peak, 06:00-20:00 |
| Peak depot | MXN $2.20-3.50 | Peak, 20:00-22:00 |

**Critical factor — demand charges:**
CFE GDMTH demand charges (MXN $200-350/kW/month) make simultaneous charging management critical. Without smart charging, 50 vehicles charging simultaneously at 7.2 kW generate 360 kW of demand = MXN $72,000-126,000/month in demand charges alone.

**Architecture (Depot-Focused):**
```
[Vehicle SOC Data] — Telematics from P4
        |
[Shift Schedule Data] — From P0.4
  -> Know which vehicles need to be ready by what time
        |
[Depot Optimization Engine]
  -> Input: current SOC, next shift time, charger capacity
  -> Constraint: vehicle at >80% SOC at shift start
  -> Objective: minimize total cost + minimize demand charges
  -> Algorithm: linear programming (PuLP/OR-Tools)
  -> Output: charging schedule per vehicle per hour
        |
[Load Management]
  -> Smart scheduling: stagger charge start to not exceed X kW simultaneous
  -> Prioritization: vehicles with lowest SOC or earliest shift charge first
  -> Peak shaving: stop charging if total demand approaches contracted limit
        |
[Ops Dashboard — Metabase]
  -> Real-time electrical demand vs contracted limit
  -> Charging cost per vehicle, per day, per week
  -> Monthly electricity bill projection
```

**MVP (Weeks 21-28, in parallel with P3):**
- Week 21-24: SOC data integration (from P4) + shift schedule (from P0.4). Basic scheduling algorithm.
- Week 25-28: Load management with peak shaving. Charging cost dashboard in Metabase.

**Stack:**
- Google OR-Tools or PuLP (linear programming)
- TimescaleDB for electrical consumption data
- Grafana for real-time demand monitoring
- FastAPI + PostgreSQL

**Success metrics:**
| KPI | Before | Target |
|-----|--------|--------|
| Charging on base rate (off-peak) | ~40% | >70% |
| Average charging cost per vehicle/week | MXN $300+ | >30% reduction (MXN $200) |
| Monthly depot demand charge | Unmanaged | >40% reduction |

**Benchmark:** VEMO: own charging stations with smart charge management. Tesla Autobidder: fleet-scale charge optimization with load management. LAFA: depot-first approach with OR-Tools.

### DaE Cross-Product Dependencies

These Foundation track projects have DaE-specific scope:

| Project | DaE Scope |
|---------|-----------|
| P1 Onboarding | Employment docs (INE, CURP, RFC, bank account). No credit check. Output: driver ready for IMSS + shift assignment. |
| P3 Collections | Standard reminders + automatic nómina deduction. Low complexity — LAFA controls vehicle and employment. |
| P6 Documents | Employment contracts, IMSS forms, CFDI payroll receipts, vehicle assignment letters. Standardized templates. |

---

## TRACK C — LEASE-TO-OWN (LTO)

> Tools specific to the financial product where drivers lease a vehicle with a purchase option over 4 years. Higher complexity due to credit risk, independent drivers, and financial compliance.

---

### Project 0.5b: LTO Account Statement (WhatsApp Bot)

**Primary user:** Customer Support Lead
**Internal tool type:** Self-service account visibility (reduces ~50 inbound support queries/month by 60-80%)
**Products served:** LTO only

**Business problem:**
LTO drivers pay up to MXN $40,000/month with **zero visibility** into their account. They don't know their balance, payment history, or next due date. This creates unnecessary support calls and erodes trust — exactly the opposite of what a financial product needs.

**Deliverable:**
- WhatsApp bot: driver sends "Estado de cuenta" → receives balance, last 5 payments, next due date, days remaining on contract
- Data source: `payments` + `contracts` tables (P0.1)
- Bilingual (Spanish primary)
- Proactive: monthly PDF statement sent automatically via WhatsApp

**Effort:** 1-2 weeks
**Stack:** WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + WeasyPrint (PDF)

---

### Project 2: AI Credit Scoring / Underwriting Engine

**Primary user:** Finance Lead, Underwriting
**Internal tool type:** Risk assessment and decision engine
**Products served:** LTO only

**Why it's in LTO track:** The Driver-as-Employee product has low credit risk (LAFA controls the vehicle and shifts). Credit scoring is specifically for LTO underwriting, where drivers are independent and default risk is higher.

**Why it's in Month 7-9:** Levi did not mention underwriting as a priority. Additionally, LAFA has no historical payment data — the model needs at least 5-6 months of payment data (collected in Foundation track) to train a meaningful model. LTO has only 2 months of operation.

**Business problem:**
60% of the Mexican population is "thin file". To scale LTO, LAFA needs to evaluate drivers without a traditional credit bureau. OCN solved this with AI underwriting and achieved single-digit default rates. **By Mo 7-9, LAFA will have ~6-7 months of payment data to train a real model.**

**Financial impact:** Reduce default rate from ~10-15% (without scoring) to <5% (with scoring). On 2,000 vehicles (LTO subset): avoid 50-100 defaults/year x MXN $51,000 = **MXN $2.5M-5.1M/year saved.**

**Architecture:**
```
[Post-Onboarding: verified identity (from P1)]
        |
[Layer 1: Bureau Check] — Circulo de Credito API
  -> bureau_score (0-999) | "thin_file" flag | payment history
        |
[Layer 2: Open Banking] — Belvo API
  -> Bank connection + SAT (tax authority) Fiscal + IMSS (social security)
  -> Gig platform data (Uber, Rappi via Belvo)
        |
[Layer 3: LAFA Internal Data] <- NEW (did not exist in original roadmap)
  -> Internal payment history (6-7 months accumulated from P0.1)
  -> Vehicle usage pattern (telematics from P4)
  -> Collections history (from P3)
  -> Performance as Driver-as-Employee (if applicable — upgrade to LTO)
        |
[Layer 4: Platform Data]
  -> Uber/DiDi screenshots processed in P1
  -> Features: rating, trips, tenure, earnings
        |
[Scoring Engine: XGBoost]
  -> Feature vector: ~40-60 combined features
  -> Output: lafa_risk_score (0-1000)
  -> Segmentation: Green/Yellow/Red
        |
[Decision Engine: Rules + ML]
  -> Green: automatic approval
  -> Yellow: additional conditions
  -> Red: rejection or manual review
```

**Advantage of the delay:** By Mo 7-9, LAFA will have:
- 6-7 months of payment data (P0.1)
- Collections history (P3)
- Telematics data (P4)
- Internal driver performance (upgrade path DaE -> LTO)

This transforms the cold start problem into a **warm start** — model v1 can be trained with real data, not synthetic.

**MVP (Weeks 31-36):**
- Week 31-32: Circulo de Credito API + Belvo (banking + SAT fiscal) integration. MetaMap for full KYC (upgrade from P1).
- Week 33-34: Feature engineering + XGBoost v1 model trained with real LAFA payment data + external features.
- Week 35-36: Scoring dashboard. Decision engine. A/B framework.

**Stack:**
- Circulo de Credito API (requires SOFOM or partner)
- Belvo Python SDK + MetaMap SDK
- scikit-learn + XGBoost + MLflow
- FastAPI + PostgreSQL

**Success metrics:**
| KPI | Target 6 months post-deploy | Target 12 months |
|-----|---------------------------|-----------------|
| Default rate (LTO) | <5% | <3% |
| Credit decision time | <15 min | <10 min |
| Model AUC | >0.80 (warm start!) | >0.85 |

**Benchmark:** OCN: <3% default rate with AI underwriting on 25K+ customers. CTO Ammar Naqvi (ex-Amazon, Microsoft, Zoom) built the platform on GCP. VEMO: scoring integrated into ZEE platform with data from 2K+ EVs. LAFA advantage: warm start with 6+ months of proprietary operational data (payments, telematics, collections) vs cold start competitors.

### LTO Cross-Product Dependencies

These Foundation track projects have LTO-specific scope:

| Project | LTO Scope |
|---------|-----------|
| P1 Onboarding | Financial suitability screening + platform earnings evidence. Feeds into P2 credit decision. Future: MetaMap KYC + Belvo open banking. |
| P3 Collections | Full graduated escalation (Day -2 → Day +14 → legal). Intent classification with LLM. Dynamic restructuring offers. Heavy-lift side of collections. |
| P6 Documents | Arrendamiento financiero contracts, pagarés, delivery-acceptance letters. Customized financial terms. NOM-151 digital signatures. |

---

## Visual Timeline (BY PRODUCT TRACK)

```
Month:  1    2    3    4    5    6    7    8    9    10   11   12   13   14
        ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤

TRACK A: FOUNDATION & CROSS-PRODUCT
P0.1: ████████████                                              Database
P0.2:      ████████                                             Dashboard
P0.3:      ████████                                             Maintenance
P0.5c:    ██████████                                            Incidents
P0.5d:         ████████                                         Insurance
P1:             ████████████                                    Onboarding AI
P4:             ████████████                                    Battery Monitor
P3:                       ████████████                          Collections
P6:                            ████████                         Documents
P7:                                           ████████          Dashboard+
P8:                                                ████████████ Knowledge Bot

TRACK B: DRIVER-AS-EMPLOYEE (DaE)
P0.4:          ████                                             Shift Dispatch
P0.5a:    ██████████                                            HR/Payroll
P5:                       ████████████                          Charging Ops

TRACK C: LEASE-TO-OWN (LTO)
P0.5b:         ████████                                         Account Statement
P2:                                 ████████████                Credit Scoring
```

---

## Effort Summary (BY TRACK)

| Track | Projects | Effort | Months |
|-------|----------|--------|--------|
| A: Foundation | P0.1, P0.2, P0.3, P0.5c, P0.5d, P1, P3, P4, P6, P7, P8 | ~34 wk | Mo 1-14 |
| B: DaE | P0.4, P0.5a, P5 | ~8 wk | Mo 1-7 |
| C: LTO | P0.5b, P2 | ~8 wk | Mo 2-9 |
| **TOTAL** | **16 projects** | **~50 wk** | **14 months** |

Same 8 AI projects, but with foundation infrastructure (P0.1-P0.4) and operational gap projects (P0.5a-d) added. Total effort ~50 weeks over 14 months. **Infrastructure first, operations second, AI third.**

---

## Alignment with Job Description

| JD Responsibility | Projects That Cover It | Primary User |
|-------------------|----------------------|-------------|
| **Identify Opportunities** | All — each project starts from a real operational pain point (confirmed by Levi) | Levi, JJ |
| **End-to-End Construction** | P0-P8: from design to deploy, APIs + ML + UI | All internal users |
| **Self-Management** | Roadmap with OKRs and metrics per project, weeks defined | Self |
| **Technical Evangelization** | P0.2 (dashboard adoption) + P8 (knowledge bot) = team-wide tool adoption | All teams |
| **Entrepreneurial Mindset** | NUMA as evidence; Track A foundation demonstrates pragmatic prioritization as a founder | — |
| **Hybrid PM/Engineer** | Each project has user stories + technical architecture | — |
| **Proven AI Experience** | P1 (Vision/OCR), P2 (XGBoost), P3 (LLM collections), P4 (anomaly detection), P5 (optimization), P8 (RAG) | — |
| **Backend architecture** | FastAPI + PostgreSQL + Redis + AWS throughout | — |

---

## Consolidated Stack

| Layer | Technology | Track | Used in |
|-------|-----------|-------|---------|
| **Backend** | Python + FastAPI | All | P0-P8 |
| **Relational database** | PostgreSQL | All | P0-P8 |
| **Time-series** | TimescaleDB (PG extension) | A, B | P4, P5, P7 |
| **Vector store** | pgvector (PG extension) | A | P8 |
| **Cache / Queue** | Redis + Celery | A | P1, P3 |
| **ML** | scikit-learn + XGBoost + MLflow | A, C | P2, P3, P4 |
| **LLM** | OpenAI API (GPT-4o, 4o-mini) + LangChain | A | P1, P3, P6, P8 |
| **HR/Payroll SaaS** | Runa or Worky API | B | P0.5a |
| **Communication** | WhatsApp Business API | All | P0.4, P0.5b, P0.5c, P0.5d, P1, P3, P4, P5, P8 |
| **KYC** | MetaMap SDK | C | P2 (Mo 7+) |
| **Credit bureau** | Circulo de Credito API | C | P2 |
| **Open banking** | Belvo Python SDK | C | P2 |
| **Telematics** | Geotab SDK / OBD-II | A, B | P4, P5 |
| **Payments** | Conekta / SPEI | A | P3 |
| **Dashboards** | Metabase + Grafana | All | P0.2, P0.5a, P0.5c, P0.5d, P4, P5, P7 |
| **Documents** | Jinja2 + WeasyPrint + S3 | A, C | P0.5b, P6 |
| **Data transforms** | dbt | A | P7 |
| **Electronic signature** | Mifiel / ISign | A | P6 |
| **Cloud** | AWS (EC2/RDS, S3, Kinesis) | All | P0-P8 |

---

## Internal User Roles

| Role | Description | Key Projects |
|------|------------|-------------|
| **Fleet Operations Manager** | Vehicle allocation, maintenance scheduling, charging, incidents | P0.3, P0.4, P0.5c, P0.5d, P4, P5 |
| **Collections Specialist** | Payment follow-up, escalation, restructuring | P3 |
| **Onboarding Coordinator** | New driver applications, document verification | P1 |
| **Finance Lead** | P&L, insurance, payments, unit economics, fundraising data | P0.5d, P2, P5, P7 |
| **HR/Payroll Admin** | Nómina, IMSS, CFDI, vacation tracking | P0.5a |
| **Legal/Admin** | Contracts, digital signatures, regulatory compliance | P6 |
| **Customer Support Lead** | Driver queries, incident triage, FAQ management | P0.5b, P8 |
| **Head of Product (Levi)** | Strategic decisions, stakeholder reporting, prioritization | P0.2, P7 |
| **CEO (JJ)** | Executive visibility, fundraising, OEM relationships | P7 |

---

## Impact Assumptions

The financial impact numbers in this roadmap depend on assumptions that must be validated as execution progresses:

| Assumption | Value used | Possible real range | If worse, what happens |
|------------|-----------|-------------------|----------------------|
| Fleet at end of 2026 | 2,000 vehicles | 500-2,000 | Impact scales linearly down. At 500 vehicles, everything is still justified except P8 (RAG). |
| Default rate without scoring | 10-15% | 5-20% | If <5%, P2 (credit scoring) is less urgent. If >15%, P2 moves up to Mo 4. |
| Smart charging savings | 30-40% | 15-40% | If <20%, P5 is still positive but ROI doubles in time. |
| DaE charging cost | $300 MXN/week | $200-500 | If >$400, P5 becomes more urgent and higher impact. |
| New onboardings/month | 150+ drivers | 50-200 | If <50/month, P1 (onboarding AI) can stay manual. |
| Levi full-time | Assumed for Mo 3+ | Indefinitely part-time possible | Without Levi full-time, prioritization falls 100% on Jose — greater autonomy, greater risk. |
| Tech hire #2 in Mo 4-6 | Assumed | May not arrive until Mo 8+ | Track B and C projects get compressed or degrade in quality. |
| Access to telematic data | Via Geotab or OEM API | OEMs may not expose data | Without telematics, P4 and P5 lose 60% of their value. Aftermarket OBD-II is fallback. |

**Decision rule:** If the fleet does not reach 500 vehicles by Mo 6, the roadmap should be reassessed. Below 500, spreadsheet complexity is manageable and the automation ROI does not justify the infrastructure investment.

---

## Impact by Fleet Scenario

The financial impact in the Executive Summary assumes 2,000 vehicles. Here's what changes at lower fleet sizes — every project's impact scales roughly linearly with fleet count:

| Project | 500 vehicles (pessimistic) | 1,000 vehicles (base) | 2,000 vehicles (target) |
|---------|--------------------------|----------------------|------------------------|
| P4 Battery Monitoring | MXN $400K-1.0M | MXN $800K-2.0M | MXN $1.6M-4.0M |
| P5 Charging Ops | MXN $250K-800K | MXN $500K-1.6M | MXN $1.0M-3.2M |
| P3 Collections | MXN $115K-188K | MXN $230K-375K | MXN $460K-750K |
| P2 Credit Scoring | MXN $64K-128K | MXN $128K-255K | MXN $255K-510K |
| P1 Onboarding | MXN $45K-75K | MXN $90K-150K | MXN $180K-300K |
| P6 Documents | MXN $12K-18K | MXN $24K-36K | MXN $48K-72K |
| P8 Knowledge Bot | MXN $15K-60K | MXN $30K-120K | MXN $60K-240K |
| **TOTAL** | **MXN $900K-2.3M/year** | **MXN $1.8M-4.5M/year** | **MXN $3.6M-9.1M/year** |

**Key takeaway:** Even at the pessimistic 500-vehicle scenario, the roadmap generates ~MXN $900K-2.3M/year in savings — more than enough to justify 1-2 engineering salaries. The only project that becomes questionable below 500 vehicles is P8 (RAG), where the training/knowledge-scaling benefit is minimal with a small team.

**Decision rule:** If fleet < 500 at Mo 6, reassess Track B + C priorities. Track A is justified at any fleet size (operational sanity). P1 is justified at 300+.

---

## Growth Milestones (Rojas Step Function)

Calendar months are estimates. What actually matters is **fleet size** — each growth threshold introduces new operational complexity that demands specific tech. Map deliverables to fleet milestones, not dates:

| Fleet Size | Milestone | Tech Required | What Breaks Without It |
|-----------|-----------|--------------|----------------------|
| **300 vehicles** | Track A foundation complete | DB operational. Dashboard live. Payroll automated. Incidents tracked. Insurance managed. Baseline KPIs established. | Spreadsheets start failing at ~200. Payroll errors multiply. No data for decisions. |
| **750 vehicles** | Track A+B operational | Second engineer hired. Battery monitoring active. Onboarding automated. Collections bot live. Charging optimized. Documents automated. | Manual onboarding requires 3+ FTEs. Collections team grows to 6+. Charging costs balloon without load management. |
| **1,500 vehicles** | Track C complete | Credit scoring v1 in production. LTO underwriting data-driven. DaE→LTO upgrade path clear. | Default rate creeps above 10% on LTO without scoring. Capital partners demand risk metrics. |
| **2,000 vehicles** | Full stack | All tracks complete. Enhanced dashboard for fundraising. Knowledge bot for team scaling. Ready for multi-city expansion. | Without P7: blind spots in fleet P&L. Without P8: every new hire takes 4 weeks to ramp. |

**How to use this table:** At each milestone review, ask: "Do we have the tech for the next step?" If the fleet is growing faster than the roadmap, compress timelines. If slower, extend and optimize existing tools before building new ones.

---

## Execution Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|------------|--------|------------|
| 1 | **Jose is the sole technical executor for 6+ months** | High | Critical — zero redundancy, zero peer review, bus factor = 1 | Negotiate hire #2 for Mo 3 max. If not, document everything obsessively. |
| 2 | **Levi remains part-time** | Medium | High — slow prioritization and feedback during Track A foundation | Establish fixed cadence (2x/week sync min). Document decisions async. |
| 3 | **No access to OEM telematic data** | Medium | High — P4 (battery) and P5 (charging) lose impact | Evaluate Geotab/OBD-II in week 1. If no data, reorder P4/P5 to the end. |
| 4 | **Spreadsheet migration fails or has dirty data** | High | Medium — P0.1 is delayed 2-4 weeks | Accept "good enough" data quality in v1. Clean iteratively. |
| 5 | **WhatsApp Business API approval takes >4 weeks** | Medium | Medium — blocks P0.4, P0.5b, P0.5c, P1, P3 | Request account in week 1. Use fallback (third-party API like Twilio). |
| 6 | **Growth stalls at <500 vehicles** | Low-Medium | High — ROI of the entire roadmap decreases | If fleet stalled at Mo 6, pivot to optimizing existing P&L instead of scaling infra. |
| 7 | **Insufficient capital for 2,000 vehicles** | Medium | Critical — without vehicles there is no business | Outside the AI Product Engineer's scope, but affects everything. Dashboard (P0.2) helps with fundraising. |
| 8 | **Dependency chain: P0.1 fails -> everything is delayed** | Low (controllable) | Critical — P0.1 is prerequisite for P0.2, P0.3, P0.4, and everything else | Prioritize P0.1 absolutely. Do not parallelize until DB is functional. |

**The most important risk Jose can control:** Documentation. In a team of 1 technical person, if Jose doesn't document architecture, decisions, and APIs, any future hire loses weeks understanding the system. Documenting is investing in redundancy.

---

## Cross-References

This roadmap is supported by the research documented in:
- `thesis/` — VC investment thesis (01-problem through 08-risks): overview, market, solution, model, traction, competition, team, risks
- `analysis/fleet/charging-economics.md` — CFE tariffs, depot models, fleet projections, gig driver economics
- `analysis/fleet/tariff-analysis.md` — 50% tariff by OEM, CKD cost advantage, unit economics
- `analysis/fleet/battery-degradation.md` — LFP in CDMX, SOH projections, residual value
- `analysis/fintech/credit-scoring.md` — MetaMap, Circulo, Belvo, MVP pipeline, warm-start
- `analysis/fintech/repossession-collections.md` — Arrendamiento financiero (financial lease), GPS/kill switch, default economics
- `analysis/market/competitive-landscape.md` — VEMO, OCN, Kovi/Moove, Splend, BYD, threats
- `hiring/README.md` — Job description, Jose's CV, timeline
- `hiring/interview-levi-2026-02-06.md` — Full transcript of interview with Levi Garcia

---

*Compiled as a proposal for the AI Product Engineer (Internal Tools) role at LAFA. February 2026. Reprioritized post-interview with Levi Garcia (Head of Product). Organized by product track (Foundation, DaE, LTO).*
