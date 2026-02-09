# LAFA: Competitive Landscape

**Last updated:** February 6, 2026

---

## 1. Direct Competitors in Mexico

### VEMO — The Vertically Integrated Giant ($500M+)

The most formidable competitor and the benchmark to beat (or learn from). Levi Garcia explicitly names VEMO as LAFA's closest reference: "exactamente como nosotros está VEMO" (Feb 2026).

| Metric | Value |
|--------|-------|
| Funding | $500M+ ($350M equity + $150M+ debt), incl. $250M from Vision Ridge (Sep 2025) |
| Fleet | 2,000+ EVs (mainly BYD D1, GAC AION ES) |
| Charging | 1,200+ connectors in 18 states; Watts app (45,000+ users) |
| Drivers | ~1,600 on payroll (VEMO Conduce) + 3,500+ enrolled (VEMO Impulso LTO) |
| Planned CAPEX | $1.5B over 5 years → 55,000 EVs + 23,000 connectors |
| Key metric | 100M+ electric kilometers driven |
| HQ | Mexico |

**Products:**
- **VEMO Conduce:** Fleet operated on Uber/DiDi, formally employed drivers (similar to LAFA DaE)
- **VEMO Impulso:** Lease-to-own for independent drivers. No credit history required, zero down payment, commissions from MXN $5,000. Drivers earn "20% more than combustion"
- **VEMO Flotas:** Fleet management for corporates (40+ clients)
- **ZEE Platform (SaaS):** Proprietary data intelligence platform — battery health monitoring (ML), charging optimization, driver behavior tracking, carbon footprint. Deployed across 900+ EVs in 8 cities. Offered as ZaaS (ZEE as a Service) to external fleet operators.

**LAFA vs. VEMO:**
- VEMO is 10-15x LAFA's size with 100x+ more capital
- VEMO's ZEE platform is what LAFA needs to build (80/20 version first)
- LAFA's dual model (DaE + LTO) mirrors VEMO's structure
- Key VEMO weakness: dependent on Chinese OEMs (BYD, GAC) that face tariff pressure

### OCN (OneCarNow) — The AI-First Fintech Rival ($100M+)

The most comparable competitor in model and philosophy.

| Metric | Value |
|--------|-------|
| Founded | 2021 by Mairon Sandoval (age 20) + Manuel Cangas |
| Funding | Series A $86M (Jul 2024) + Series B $13.5M (Feb 2025) + $150M investment announced (Jul 2025) |
| Fleet | 5,000+ vehicles, targeting 15,000 (triple by end of announced period) |
| Clients | 25,000+ active, 100,000+ on waitlist |
| Default rate | Single-digit, sustained 2+ years |
| Employees | ~90, growing to 150 |
| Presence | 22 states in Mexico + South Florida; expanding to Brazil + Texas |
| Profitability | Profitable since month 3 (per Sandoval) |
| HQ | Prolongacion Paseo de la Reforma 1015, Floor 140, Cuajimalpa, CDMX |
| Parent | OCN Holdings, McLean, VA |

**Technology (built fully in-house on GCP):**
- CTO: **Ammar Naqvi** (ex-Amazon, Delivery Hero, Microsoft, Zoom, Careem)
- Four platform pillars: customer experience, asset/vendor management, AI underwriting (crown jewel), payments ecosystem
- AI underwriting achieves <90 min approval: mobile form → KYC/OCR → bureau + open banking pulls → ML scoring → remote home visit → rules engine + human review
- Key stat: <3% of ride-hail drivers qualify for traditional auto loans; OCN's AI unlocks the other 97%

**LAFA vs. OCN:**
- OCN fleet is **mostly ICE** (only ~12-15% EV in late 2024, ~600 EVs of 5,000+). LAFA is 100% EV.
- OCN has no charging infrastructure — LAFA's vertical integration advantage holds
- OCN has 10-50x more capital and 25K+ proven clients
- OCN's AI underwriting is the gold standard LAFA should target *(→ see [credit-scoring.md](../fintech/credit-scoring.md) for LAFA's credit scoring framework)*
- LAFA advantage: EV focus + charging infrastructure as moat

### BYD Fleet Operations

- Launched **taxi program in Nuevo Leon** (Nov 2025): low down payment, insurance + maintenance included, Uber/DiDi compatible
- 50+ agencies in Mexico, targeting 80+
- ~40,000 units sold in 2024 — dominant EV seller in Mexico
- **Threat:** If BYD scales fleet operations nationally, it could disintermediate LAFA and similar operators
- **Mitigant:** 50% tariff makes BYD's own fleet model more expensive; BYD Mexico factory not yet operational *(→ see [tariff-analysis.md](../fleet/tariff-analysis.md) for tariff modeling)*

### DiDi Fleet Programs

- Target: 100,000 EVs on platform in Mexico by 2030
- Investment: ~MXN $1B (~USD $55M) announced late 2024
- Launched DiDi Premier (Oct 2025): 500 EVs, premium 100% electric
- DiDi is a **channel/partner** for LAFA, not a competitor (currently)
- Risk: DiDi could verticalize and operate its own fleet

---

## 2. LATAM Benchmarks

### Kovi/Moove (Combined Entity)

- **Moove acquired Kovi** in January 2025
- Combined: **$275M ARR (2024), 36,000+ vehicles**
- Presence: Africa, LatAm, expanding globally
- Kovi details: asset-light (rental from OEMs), 700 employees, IoT fleet integration, ML driver monitoring, verticalized maintenance, embedded fintech (driver's wallet)
- Moove details: Founded 2020 (Lagos), revenue-based financing, weekly payments linked to driver earnings, Uber partnership
- **Relevance to LAFA:** Creates global gig-economy vehicle platform with LatAm presence. Still primarily ICE-focused, lacks EV charging infrastructure.

### Splend (Australia/UK)

| Metric | Value |
|--------|-------|
| Fleet | ~7,000 vehicles, targeting 10K (2025) and 20K (2026) |
| Funding | $993M total (incl. $300M Macquarie debt, $40M Clean Energy Finance Corp) |
| IFM Investors | Significant growth investment (Jan 2025) |
| Platforms served | Uber, Ola, DoorDash |
| Utilization | Claims 95%+ at maturity |

---

## 3. LAFA's Differentiation

| Dimension | LAFA | VEMO | OCN |
|-----------|------|------|-----|
| **Fleet type** | 100% EV | 100% EV | Mostly ICE (~12-15% EV) |
| **Products** | DaE + LTO (dual) | Conduce + Impulso + Flotas | Subscription only |
| **Charging** | Depot (planned expansion) | 1,200+ public connectors | None |
| **Tech maturity** | Spreadsheets (Stage 0) | ZEE platform (ML) | Full in-house AI platform |
| **Capital** | Undisclosed (likely <$10M) | $500M+ | $100M+ |
| **Fleet size** | ~150 | 2,000+ | 5,000+ |
| **Chinese OEM access** | Direct (JJ works with China) | Through distributors | N/A (mostly ICE OEMs) |
| **Credit scoring** | Manual/none | Unknown | AI underwriting (<90 min) |
| **Geography** | CDMX only | 18 states + planned expansion | 22 states + US |

**LAFA's moat thesis:** Vertical integration of EV + charging infrastructure at a stage where charging is the ecosystem bottleneck. Whoever controls the charging network has real switching costs.

---

## 4. Threats

| Threat | Severity | Timeline | Mitigation |
|--------|----------|----------|------------|
| VEMO scaling to 55K vehicles | HIGH | 3-5 years | Differentiate on service quality, driver experience, and niche focus |
| OCN expanding EV fleet | MEDIUM | 1-2 years | Build charging moat that OCN lacks |
| BYD launching national fleet model | MEDIUM-HIGH | 1-3 years | 50% tariff raises BYD's cost; LAFA's local assembly (JAC) is cheaper |
| Uber/DiDi verticalizing fleet ops | MEDIUM | 2-5 years | Deep platform partnerships (already DiDi aliado) |
| Tariff changes favoring imports | LOW | Uncertain | Diversify OEM mix; JAC local assembly is hedge |
| New entrants (FAZT, SEV) | LOW | Ongoing | First-mover advantage in DaE + LTO combo |

---

## 5. Universal Gig Fleet Playbook

The winning formula across all successful gig fleet operators globally:

1. **Weekly payments** aligned with driver cash flow (not monthly)
2. **GPS + telematics** on every vehicle
3. **Alternative credit scoring** (platform data > bureau data)
4. **All-inclusive model** (insurance, maintenance, registration included)
5. **Graduated collections** (WhatsApp → call → restructure → recovery)

What separates winners: **underwriting quality** (OCN's single-digit defaults) and **operational efficiency** (VEMO's ZEE platform reducing idle time and extending battery life).

---

---

## 6. Platform Integrations

### Ride-Hailing Platform APIs

**Uber Fleet API**
- Provides driver payments data (earnings, net fare, earner info in MXN)
- Fleet portal access (minimum 5 vehicles, free)
- Real-time webhooks for driver/document/vehicle status changes
- Access requires registration as a fleet supplier and OAuth authentication

**DiDi**
- Fleet partnerships in Mexico but lacks publicly documented APIs
- Integration requires direct business relationships
- LAFA already has a DiDi Premier partnership (launched October 2025)

**Bolt / InDrive**
- Operate through partner portals rather than open APIs
- Less relevant for LAFA's current CDMX focus but worth monitoring for expansion

### Unified OEM API: Smartcar

**Smartcar** stands out as the unified OEM API aggregator: SOC 2 Type 2 compliant, hardware-free (connects via vehicle's embedded cellular modem), supports 40+ automakers across 30+ countries. For a multi-brand fleet, Smartcar eliminates hardware installation and provides tamper-proof data at usage-based pricing.

**Critical limitation:** BYD support remains nascent. Geely, JAC, and GAC support status is unknown -- a significant gap for Chinese OEM fleets in LatAm.

### Charging Network Interoperability: OCPI

**OCPI (Open Charge Point Interface)** enables charging network roaming -- fleet drivers can access any OCPI-connected network through a single integration. **Hubject** operates the world's largest eRoaming network. Relevant when LAFA drivers need to charge outside company-owned depots.

### Vehicle Registry: REPUVE

**REPUVE** (Registro Publico Vehicular) is Mexico's national vehicle registry. Provides stolen vehicle verification via third-party APIs (e.g., Zyla API Hub, Apitude). Useful for LTO onboarding verification and vehicle provenance checks.

### Platform Integration Implications for LAFA

- **Uber Fleet API is immediately actionable.** With 150+ vehicles, LAFA qualifies for fleet portal access. Integrating earnings data enables direct lease payment deductions from driver income -- near-zero default risk.
- **DiDi integration is relationship-based, not API-based.** LAFA's existing DiDi Premier partnership is the foundation. Push for programmatic data access as the fleet grows.
- **Smartcar is not viable for LAFA's current fleet** (Geely, JAC, GAC). Telematics hardware remains necessary. Monitor Smartcar's China OEM roadmap.
- **OCPI matters more at scale.** At 150 vehicles with depot charging, not urgent. At 2,000 vehicles with LTO drivers charging independently, OCPI roaming becomes valuable.
- **REPUVE integration belongs in the onboarding pipeline** for both new vehicles and driver background verification.

---

*Competitive data sourced from press coverage, public filings, podcasts (Startupeable, Semilla.VC), and industry reports. Some metrics are estimates based on disclosed ranges. Updated post-interview to correct BYD classification (competitor, not partner). Platform integration capabilities based on publicly available documentation as of 2025-2026.*
