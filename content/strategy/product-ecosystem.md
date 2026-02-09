# LAFA Product Ecosystem: Complete Map

**Compiled: February 2026 | Based on roadmap, interview with Levi, consolidated research**

LAFA operates two products (DaE and LTO) with 5 distinct user types, using only spreadsheets. The [current roadmap](ai-roadmap.md) covers 16 projects over 14 months organized by **product track** (Foundation, DaE, LTO), focusing on **internal tools**. This map expands the vision to identify EVERYTHING LAFA needs to build -- what the roadmap covers, what's missing, and what's future.

---

## 1. User Map

```
                         LAFA PRODUCT ECOSYSTEM
                         =======================

  INTERNAL                      DRIVERS                     EXTERNAL
  --------                      -------                     --------
  +---------------+      +------------------------+    +----------------+
  | Ops Team      |      |  DaE Drivers           |    | DiDi           |
  | (Levi, ops,   |      |  (LAFA employees,      |    | (partnership)  |
  |  future       |      |   assigned shifts,     |    +----------------+
  |  hires)       |      |   LAFA pays charging)  |    | OEMs           |
  +---------------+      +------------------------+    | (Geely, JAC,   |
  | Finance /     |      |  LTO Drivers           |    |  GAC)          |
  | Leadership    |      |  (independent,         |    +----------------+
  | (JJ, CFO,     |      |   weekly payment,      |    | Insurers       |
  |  investors)   |      |   equity building)     |    +----------------+
  +---------------+      +------------------------+    | SOFOM /        |
  | Legal /       |                                    | Debt Providers |
  | Compliance    |                                    +----------------+
  +---------------+                                    | CFE (charging) |
                                                       +----------------+
```

---

## 2. Products by User and Service Type

### A. INTERNAL OPS TEAM -- "LAFA's Operating System"

What the internal team needs to operate the fleet day to day.

| # | Product | DaE | LTO | Track | Roadmap | Status |
|---|---------|-----|-----|-------|---------|--------|
| 1 | **Centralized database** | Shared | Shared | A | P0.1 | Covered |
| 2 | **Operational dashboard** | Fleet, shifts, charging | Payments, delinquency, contracts | A | P0.2 + P7 | Covered |
| 3 | **Maintenance management** | LAFA maintains | LAFA maintains | A | P0.3 | Covered |
| 4 | **Shift dispatch** | Assign shifts + vehicles | N/A | B | P0.4 | Covered |
| 5 | **Driver onboarding pipeline** | Documents + verification | Documents + verification + credit | A | P1 | Covered (lite) |
| 6 | **Collections management** | Basic (nómina deduction) | Full (escalation tree) | A | P3 | Covered |
| 7 | **Battery fleet monitor** | Centralized monitoring | Centralized monitoring | A | P4 | Covered |
| 8 | **Charging depot optimizer** | LAFA controls charging | N/A (driver pays) | B | P5 | Covered |
| 9 | **Contract/document generator** | Employment contracts | Arrendamiento financiero (financial lease) | A | P6 | Covered |
| 10 | **Credit scoring engine** | N/A (low risk) | LTO underwriting | C | P2 | Covered (Mo 7-9) |
| 11 | **Knowledge base / RAG** | Shared | Shared | A | P8 | Covered (Mo 11-14) |
| 12 | **HR / Payroll system** | IMSS, nómina, vacation | N/A | B | P0.5a | Covered |
| 13 | **Incident reporting** | Structured WA flow | Structured WA flow | A | P0.5c | Covered |
| 14 | **Insurance management** | Claims, policies | Claims, policies | A | P0.5d | Covered |
| 15 | **LTO account statement** | N/A | Balance, payments, equity | C | P0.5b | Covered |
| 16 | **Operational CRM** | Driver management | Driver management | -- | -- | **GAP** |
| 17 | **Compliance reporting** | IMSS, SAT, CONDUSEF | SAT, CONDUSEF, NOM-151 | -- | -- | **GAP** |

### B. DaE DRIVERS -- "The Employee Driver"

The DaE driver is a LAFA employee. LAFA assigns the vehicle, shift, and pays for charging. The driver only drives.

| # | Product / Touchpoint | Channel | Track | Roadmap | Status |
|---|---------------------|---------|-------|---------|--------|
| 1 | **Shift notification** | WhatsApp | B | P0.4 | Covered |
| 2 | **Shift confirmation** | WhatsApp (reply OK/NO) | B | P0.4 | Covered |
| 3 | **Onboarding documents** | WhatsApp (send photos) | A | P1 | Covered |
| 4 | **Payroll receipt** | WhatsApp or email | A | P6 | Partial |
| 5 | **Incident reporting** | WhatsApp | A | P0.5c | Covered |
| 6 | **FAQ / support** | WhatsApp bot | A | P8 | Covered (Mo 11-14) |
| 7 | **Maintenance request** | WhatsApp | A | P0.3 | Partial (internal only today) |
| 8 | **Driver portal** (history, earnings, shifts) | Web/App | -- | -- | **GAP** |
| 9 | **EV training** (how to charge, battery care) | WhatsApp / video | -- | -- | **GAP** |

**Operational flow DaE:**
```
Onboarding -> [P1] Documents via WhatsApp -> Verification -> [P0.5a] IMSS registration
     |
Day-to-day -> [P0.4] Receives shift -> Confirms -> Drives -> LAFA charges vehicle
     |
Weekly -> Min $6K MXN billing -> [P0.5a] Payroll -> [P6] Receipt
     |
Incidents -> Accident -> [P0.5c] Structured WA report -> [P0.5d] Insurance claim
     |
Support -> [P8] FAQ bot (Mo 11+) -> Escalation to ops
```

### C. LTO DRIVERS -- "The Independent Driver"

The LTO driver leases the vehicle with a purchase option over 4 years. Pays weekly. Manages their own charging.

| # | Product / Touchpoint | Channel | Track | Roadmap | Status |
|---|---------------------|---------|-------|---------|--------|
| 1 | **Credit application** | WhatsApp + web form | A + C | P1 + P2 | Covered |
| 2 | **Onboarding documents** | WhatsApp (send photos) | A | P1 | Covered |
| 3 | **Account statement** (paid, pending, accumulated equity) | WhatsApp | C | P0.5b | Covered |
| 4 | **Payment reminder** | WhatsApp | A | P3 | Covered |
| 5 | **Payment negotiation / restructuring** | WhatsApp bot | A | P3 | Covered |
| 6 | **Digital contract** | WhatsApp + signature | A | P6 | Covered |
| 7 | **Maintenance request** | WhatsApp | A | P0.3 | Partial |
| 8 | **FAQ / support** | WhatsApp bot | A | P8 | Covered (Mo 11-14) |
| 9 | **Incident reporting** | WhatsApp | A | P0.5c | Covered |
| 10 | **Driver portal** (contract, equity, payment history) | Web/App | -- | -- | **GAP** |
| 11 | **Charging guide** (where to charge, costs, tips) | WhatsApp | -- | -- | **GAP** |

**Operational flow LTO:**
```
Application -> [P1] Documents -> [P2] Credit scoring -> Approval/Rejection
     |
Contract -> [P6] Digital arrendamiento financiero (financial lease) signature
     |
Day-to-day -> Driver manages own vehicle -> LAFA maintains -> Driver charges on own
     |
Weekly -> [P3] Payment reminder -> Driver pays -> [P0.5b] Account statement
     |
If delinquent -> [P3] Escalation tree -> GPS/kill switch -> [analysis/fintech/repossession]
     |
Incidents -> [P0.5c] Structured WA report -> [P0.5d] Insurance claim
     |
4 years -> Final payment -> Title transfer -> Driver owns vehicle
```

### D. FINANCIAL STAKEHOLDERS -- "The Investment Dashboard"

JJ (CEO), current/potential investors, fondeadores (debt providers for fleet).

| # | Product | Audience | Track | Roadmap | Status |
|---|---------|----------|-------|---------|--------|
| 1 | **Executive dashboard** (KPIs, P&L, growth) | JJ, investors | A | P7 | Covered (Mo 9-13) |
| 2 | **Investor data room** (metrics, cohorts, unit economics) | VCs, angels | A | P7 | Partial |
| 3 | **Loan book dashboard** (performance, defaults, recovery) | SOFOM, fondeadores | -- | -- | **GAP** |
| 4 | **Automated reports** (weekly/monthly PDF) | JJ, Levi | A | P7 | Covered |

### E. EXTERNAL PARTNERS -- "The External Ecosystem"

| # | Product / Integration | Partner | Track | Roadmap | Status |
|---|----------------------|---------|-------|---------|--------|
| 1 | **DiDi driver performance API** | DiDi | -- | -- | **GAP** |
| 2 | **OEM warranty/parts portal** | Geely, JAC, GAC | -- | -- | **GAP** |
| 3 | **OEM telemetry integration** | Geely, JAC, GAC | A | P4 (via Geotab) | Partial |
| 4 | **Insurance claims workflow** | Insurers | A | P0.5d | Partial |
| 5 | **CFE billing reconciliation** | CFE | B | P5 | Partial |
| 6 | **Conekta/SPEI payment gateway** | Conekta | A | P0.1, P3 | Covered |
| 7 | **Circulo de Credito API** | Bureau | C | P2 | Covered (Mo 7-9) |
| 8 | **Belvo open banking** | Belvo | C | P2 | Covered (Mo 7-9) |
| 9 | **MetaMap KYC** | MetaMap | C | P2 | Covered (Mo 7-9) |

---

## 3. AI Agents & Automation Layer

The "agents" that operate behind the visible interfaces.

| # | Agent | Trigger | Action | Affected Users | Track | Roadmap |
|---|-------|---------|--------|----------------|-------|---------|
| 1 | **Document Classifier** | Driver sends photo via WA | Classifies document type (INE, license, etc.) with GPT-4o Vision | Ops, drivers | A | P1 |
| 2 | **OCR Extractor** | Document classified | Extracts fields (CURP, RFC, name, expiration) | Ops | A | P1 |
| 3 | **Collections Bot** | Payment overdue / upcoming | Graduated escalation: reminder -> negotiation -> escalation | LTO drivers, ops | A | P3 |
| 4 | **Battery Anomaly Detector** | Continuous telemetry | Isolation Forest detects anomalous degradation, alerts ops | Ops | A | P4 |
| 5 | **Charging Scheduler** | Vehicles arrive at depot | Linear programming: minimizes cost + demand charges | Ops (DaE) | B | P5 |
| 6 | **Contract Generator** | New driver approved | Generates personalized contract (DaE or LTO) from template | Ops, drivers | A | P6 |
| 7 | **Credit Scorer** | LTO application completed | XGBoost scoring + decision engine (Green/Yellow/Red) | Ops, LTO drivers | C | P2 |
| 8 | **Default Predictor** | Payment history | Logistic regression predicts default probability | Ops | A | P3 |
| 9 | **Knowledge Bot** | Question from employee or driver | RAG: retrieval + GPT-4o-mini with citations | All | A | P8 |
| 10 | **Claim Assistant** | Accident description | LLM generates structured incident report | Ops, drivers | A | P6 |
| 11 | **Report Generator** | Weekly/monthly cron | dbt aggregation + automatic PDF generation | Leadership | A | P7 |
| 12 | **Shift Optimizer** | Daily, night before | Assigns vehicles to DaE drivers by zone/availability | Ops, DaE drivers | B | P0.4 (basic) |

**Agents NOT covered by the current roadmap:**

| # | Potential Agent | Trigger | Value | Priority |
|---|----------------|---------|-------|----------|
| 13 | **Driver Churn Predictor** | Weekly behavior | Predict which drivers are about to leave | Medium |
| 14 | **Maintenance Predictor** | Telemetry + history | Predict failures before they happen (beyond battery) | Medium-High |
| 15 | **Dynamic Pricing Engine** | Fleet occupancy + demand | Adjust LTO prices based on market and risk | Low (post-scale) |
| 16 | **Route/Zone Optimizer** | DiDi/Uber trip data | Suggest optimal zones by time slot for DaE drivers | Low |
| 17 | **Insurance Risk Scorer** | Driving behavior | Negotiate better premiums with telematics data | Medium |

---

## 4. Layered Architecture

```
+-----------------------------------------------------------------------+
|                        INTERFACES (User-facing)                        |
|                                                                        |
|  WhatsApp          Metabase           Web Portal        Slack          |
|  (drivers)         (ops + leadership)  (drivers, Mo 12+) (internal)   |
+----------+---------------+-----------------+--------------+-----------+
           |               |                 |              |
+----------+---------------+-----------------+--------------+-----------+
|                     AI / AUTOMATION LAYER                              |
|                                                                        |
|  Doc Classifier | OCR | Collections Bot | Battery Anomaly | Credit    |
|  Scoring | Charging Scheduler | Contract Gen | Knowledge RAG | ...    |
+----------+---------------+-----------------+--------------------------+
           |               |                 |
+----------+---------------+-----------------+--------------------------+
|                       BUSINESS LOGIC (FastAPI)                         |
|                                                                        |
|  Driver Mgmt | Vehicle Mgmt | Payment Mgmt | Contract Mgmt |          |
|  Shift Mgmt | Maintenance | Charging | Collections | Onboarding       |
+----------+---------------+-----------------+--------------------------+
           |               |                 |
+----------+---------------+-----------------+--------------------------+
|                          DATA LAYER                                    |
|                                                                        |
|  PostgreSQL      TimescaleDB       pgvector          S3                |
|  (core data)     (telemetry)       (embeddings)      (documents)      |
+----------+---------------+-----------------+--------------------------+
           |               |                 |
+----------+---------------+-----------------+--------------------------+
|                      EXTERNAL INTEGRATIONS                             |
|                                                                        |
|  WhatsApp API | Conekta/SPEI | Geotab | Circulo | Belvo | MetaMap    |
|  OpenAI | CFE | DiDi | OEM APIs | Mifiel | IMSS                      |
+----------------------------------------------------------------------+
```

---

## 5. DaE vs LTO: Product Differences

| Dimension | DaE | LTO |
|-----------|-----|-----|
| **Onboarding** | Documents + IMSS (social security) registration | Documents + credit scoring + financial lease contract |
| **Vehicle** | LAFA assigns | LAFA assigns (fixed 4 years) |
| **Shifts** | LAFA assigns via dispatch | Driver decides |
| **Charging** | LAFA pays and controls (depot) | Driver pays and decides (public network + home) |
| **Payments** | Weekly nómina (payroll, employment) | Weekly payment (arrendamiento (lease)) |
| **Collections** | Low complexity | High complexity (escalation, restructuring, repo) |
| **Risk** | Low (LAFA controls everything) | High (independent, credit risk) |
| **Maintenance** | LAFA manages | LAFA manages |
| **Support** | FAQ + incidents | FAQ + incidents + account statement + equity |
| **End of contract** | Resignation/termination (labor) | Final payment -> title transfer |

**Product implication:** ~70% of infrastructure is shared in **Track A (Foundation)** — DB, dashboard, maintenance, onboarding, collections, documents, battery monitoring, FAQ. The remaining ~30% diverges into:
- **Track B (DaE only)**: Shift dispatch, depot charging, payroll/IMSS
- **Track C (LTO only)**: Credit scoring, account statement/equity, advanced collections scope, contract management, repossession workflow

---

## 6. Remaining Gaps (What the Roadmap Does NOT Cover)

The original 4 high-priority gaps (HR/payroll, LTO account statement, incident reporting, insurance management) are now covered by P0.5a-d in the roadmap. The remaining gaps are:

### MEDIUM Priority (needed in Mo 6-12)

| # | Gap | Why it matters | Suggested solution | Effort |
|---|-----|---------------|-------------------|--------|
| 1 | **Driver web portal** | WhatsApp works, but for complex queries (payment history, equity, documents) a web portal is better UX. Also enables onboarding without WA. | Simple web portal (Next.js or similar): login with CURP + phone. Views: account statement, history, documents, support. | 4-6 wks |
| 2 | **Loan book dashboard (fondeadores (debt providers))** | If LAFA raises debt to buy vehicles, fondeadores need to see portfolio performance in real-time. | Dedicated view in Metabase: default rate by cohort, portfolio aging, recovery rate, LTV. CSV/API export. | 2-3 wks |
| 3 | **Compliance reporting** | CONDUSEF (collections), SAT (invoicing), IMSS (DaE employees). At scale, manual reports = regulatory risk. | Automated report templates. Integration with invoicing systems (e.g., Facturapi). | 3-4 wks |
| 4 | **Maintenance predictor (beyond battery)** | Brakes, suspension, tires. At 2,000 vehicles, reactive maintenance = costly downtime. | Extension of P4 (Track A): prediction model per component using odometer + history. | 3 wks (on top of P4) |
| 5 | **Operational CRM** | Unified driver management across DaE and LTO. Today: spreadsheets. | Could be built on top of P0.1 database or integrated SaaS (HubSpot, custom). | 3-4 wks |

### LOW Priority (Mo 12+ or when there's scale)

| # | Gap | Context | Suggested solution |
|---|-----|---------|-------------------|
| 6 | **DiDi API integration** | Driver performance data. Today: manually processed screenshots. | Direct API if DiDi offers one; if not, automated OCR of screenshots (extension of P1) |
| 7 | **OEM parts/warranty portal** | With 3 Chinese OEMs, parts and warranties are complex. At scale: ordering system. | Simple module: parts inventory, purchase orders, warranty tracking by VIN |
| 8 | **Charging network management** | Future vision: LAFA charging centers (beyond depot). | Point of sale + station management + pricing. Build when there's a concrete plan |
| 9 | **Dynamic pricing** | Adjust LTO price based on risk, demand, OEM. | Post-credit scoring. Requires data from Mo 8+ |
| 10 | **Driver churn prediction** | Retaining good drivers = less onboarding. | Extension of analytics (P7). Requires 6+ months of data |

---

## 7. Extended Roadmap: 3 Horizons

```
HORIZON 1 (Mo 1-14): FOUNDATION + INTERNAL TOOLS (Current Roadmap)
===================================================================
16 projects across 3 tracks. ~50 weeks over 14 months.

  TRACK A (Foundation):
    Mo 1-2:  P0.1 (DB) + P0.2 (dashboard) + P0.3 (maintenance)
    Mo 2-3:  P0.5c (incidents) + P0.5d (insurance)
    Mo 3-5:  P1 (onboarding) + P4 (battery monitoring)
    Mo 5-7:  P3 (collections) + P6 (documents)
    Mo 9-13: P7 (enhanced dashboard)
    Mo 11-14: P8 (knowledge bot / RAG)

  TRACK B (DaE):
    Mo 1-2:  P0.4 (shift dispatch)
    Mo 2-3:  P0.5a (HR/payroll)
    Mo 5-7:  P5 (charging ops)

  TRACK C (LTO):
    Mo 2-3:  P0.5b (account statement)
    Mo 7-9:  P2 (credit scoring)

HORIZON 2 (Mo 12-24): DRIVER EXPERIENCE + PARTNER INTEGRATIONS
================================================================
  - Driver web portal (LTO: equity, payments; DaE: shifts, earnings)
  - DiDi API integration (bidirectional performance data)
  - OEM parts/warranty system
  - Maintenance predictor (brakes, suspension, tires)
  - Dynamic pricing engine (LTO)
  - Driver churn prediction
  - Driver training/certification platform (EV safety, charging)

HORIZON 3 (Mo 24+): ECOSYSTEM
================================
  - Charging network management (LAFA charging centers)
  - Maintenance shop system (third-party service)
  - Tire distribution management (tires for Chinese models)
  - Service marketplace for drivers (insurance, parts, tires)
  - White-label fleet management (sell the platform to other operators)
  - Public API for partners
```

---

## 8. Quantitative Summary

| Category | In current roadmap | Gaps identified | Total |
|----------|-------------------|----------------|-------|
| Internal ops products | 15 | 2 (CRM, compliance) | 17 |
| DaE driver touchpoints | 7 | 2 (portal, training) | 9 |
| LTO driver touchpoints | 9 | 2 (portal, charging guide) | 11 |
| Financial products | 3 | 1 (loan book) | 4 |
| External integrations | 7 | 2 (DiDi, OEM) | 9 |
| AI agents / automation | 12 | 5 (churn, maint predictor, pricing, route, insurance risk) | 17 |
| **Total** | **53** | **14** | **67** |

**Current roadmap coverage: ~79%** of what LAFA needs to scale to 2,000 vehicles (up from ~69% before P0.5 projects were added). The remaining ~21% consists mainly of:
- Support systems (CRM, compliance) that can be solved with SaaS integrations
- Driver experience (portal) that builds on top of Track A infrastructure
- Partner integrations that depend on external API availability

---

## 9. Recommendations

1. **The 3-track roadmap is complete for Horizon 1** -- Track A (Foundation) provides shared infrastructure, Track B (DaE) covers employment-specific tools, Track C (LTO) covers financial product tools. All original high-priority gaps are now covered by P0.5a-d.
2. **The driver web portal is Horizon 2** -- WhatsApp is sufficient for Mo 1-14 with 2,000 vehicles. Build web portal when driver experience becomes a friction point.
3. **Buy, don't build for HR/payroll** -- Runa, Worky, or Nomipaq cost ~MXN $50-100/employee/month. At 500 DaE employees = MXN $25K-50K/month vs weeks of development. (Already reflected in P0.5a approach.)
4. **DiDi and OEM integrations are opportunistic** -- they depend on those partners offering APIs. Do not plan until confirmed.
5. **Compliance reporting (gap #3) could slot into Track A Month 9-12** if regulatory pressure increases before 2,000 vehicles.

---

*Analysis based on: [AI Roadmap](ai-roadmap.md), [Investment Thesis](../thesis/), [Interview with Levi](../hiring/interview-levi-2026-02-06.md), [Hiring README](../hiring/README.md), [Team Assessment](../thesis/07-team.md). February 2026.*
