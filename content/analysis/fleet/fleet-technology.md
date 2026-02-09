# LAFA: Fleet Technology Stack

**Last updated:** February 7, 2026
**Scope:** Telematics hardware, fleet management software, emerging technologies -- the full technology layer for EV fleet operations.

> *For route optimization and SoC-aware dispatch, see [route-optimization.md](route-optimization.md). For the build vs buy matrix at scale, see [../../strategy/tech-stack-scaling.md](../../strategy/tech-stack-scaling.md).*

---

## Part 1: Telematics & IoT Hardware

### 1.1 The EV Telematics Challenge

Every EV fleet operation begins with telematics -- the devices that provide real-time visibility into vehicle location, state of charge, driver behavior, and anti-theft capabilities. For a lease-to-own model, this layer is existential: **remote immobilization capability is non-negotiable**.

**The fundamental EV difference from ICE:** OBD-II was designed for emissions testing. Since BEVs produce zero tailpipe emissions, they are not legally required to support OBD-II, meaning each manufacturer (Tesla, BYD, Hyundai) uses proprietary diagnostic systems. This forces fleet operators to choose between reverse-engineering CAN bus data, negotiating OEM API access, or using specialized telematics devices that can decode proprietary protocols.

### 1.2 Hardware Tier Comparison for LatAm

| Provider | Device Cost | Monthly Fee | Key EV Features | LatAm Fit |
|----------|-----------|-------------|-----------------|-----------|
| **Teltonika FMC130** | ~$59/unit | $5-15 (SIM + platform) | CAN bus, SECO immobilizer, jamming detection, 4G LTE Cat 1 | Excellent -- LatAm frequency bands, strong distributor network |
| **Queclink GV53MG** | ~$75/unit | Varies by platform | AES-256, designed for auto financing/leasing, covert install | Excellent -- Mexico subsidiary, direct support |
| **Geotab GO9** | $80-120/unit | $25-40 via resellers | SoC/SoH monitoring, 22,700+ EV database, EV battery degradation tool | Good -- reseller network exists |
| **Samsara VG** | Included in subscription | $27-50/vehicle/month | Real-time SoC, charging history, AI dashcams, 1-sec GPS refresh | Limited -- primarily US-focused, 3-year lock-in |

### 1.3 Recommended: Dual-Tracker Strategy

For a VEMO-like operation, the optimal hardware strategy is a **dual-tracker setup**: a primary Teltonika FMC130 (hardwired with SECO immobilizer relay) plus a hidden backup tracker (Teltonika TAT140). This approach, proven in Guatemala leasing operations and expanded across Central America, costs approximately **$180-250/vehicle/year** -- 3-5x cheaper than Samsara or Geotab while maintaining critical anti-theft and immobilization capabilities.

### 1.4 VEMO's Approach: ZEE + 35South Acquisition

VEMO built its proprietary ZEE (Zero Emissions Ecosystem) platform, partly by acquiring 35South (an Argentina-based IoT platform company). ZEE integrates vehicle telematics, charging monitoring, and predictive maintenance, deployed across 900+ EVs in 8 cities. They supplement with AI cameras and panic buttons for safety. This acquisition-plus-build strategy allowed rapid capability development.

### 1.5 IoT Cloud Platforms

- **AWS IoT FleetWise:** ~$0.60/vehicle/month for the first 10,000 vehicles. Purpose-built vehicle data modeling with CAN database support. AWS launched a Mexico (Central) region in early 2025 with 3 availability zones -- the strongest choice for LatAm fleet operations.
- **Google Cloud IoT Core:** Discontinued in August 2023. No longer an option.

### 1.6 Mexico Connectivity

- **Telcel (America Movil):** ~65% market share with the most comprehensive nationwide coverage including rural areas. IoT SIMs cost $2-5/month for the low-bandwidth data that telematics devices require.
- **Red Compartida:** Wholesale network designed to reach 92% population coverage at 20-30% lower pricing. Entered bankruptcy proceedings -- a cautionary tale for relying on it as primary connectivity.

---

## Part 2: Fleet Management Software

### 2.1 The Hybrid Build-Buy Reality

No single SaaS platform covers the full value chain of a vertically integrated EV fleet-for-drivers business. Every company at scale -- VEMO, CaoCao, Moove -- has built custom platforms. The question is when to start building.

**The practical threshold:** Below 500 vehicles, buy SaaS. At 500-2,000, build custom modules atop SaaS. Above 2,000, build proprietary core systems.

At 2,000 vehicles paying $35/vehicle/month for commercial solutions, annual SaaS costs reach **$840K** -- enough to fund a custom platform build ($1.2M initial plus $500K/year maintenance) that provides competitive differentiation, data ownership, and lower marginal cost for growth.

### 2.2 Commercial FMS Options Ranked for EV Fleet-for-Drivers

**Fleetio ($4-10/vehicle/month)**
Best value for the maintenance and lifecycle management layer -- work orders, inspections, fuel/energy tracking, 33% maintenance cost reduction reported. Lacks native telematics hardware, serving as the "software layer" atop separate telematics. Splend (7,000 vehicles) uses Fleetio as its primary fleet management system.

**Geotab MyGeotab ($25-40/vehicle/month)**
Strongest EV-specific capabilities -- SoC/SoH monitoring, EV Battery Degradation Tool, IOX-KEYLESS for shared fleet digital key management, and an open API with 200+ marketplace integrations. Moove integrated Geotab for their 4,000+ European fleet, reporting **EUR 4M+ annual savings** and 30.79% improvement in emissions.

**Ridecell 360**
Purpose-built for fleet leasing orchestration -- digital key management, hot-seat driver models, automated lease management, remarketing workflows, and ride-hailing platform capabilities. Merchants Fleet (US) uses Ridecell 360. This is the closest commercial solution to what a VEMO-like operation needs for vehicle handover workflows.

### 2.3 What Operators Built Custom

| Company | Platform | Key Custom Components |
|---------|----------|----------------------|
| **VEMO** | ZEE (150 engineers) | Telematics, charging monitoring, predictive maintenance, route optimization |
| **CaoCao** | "CaoCao Brain" | AI-driven dispatch, pricing, driver allocation |
| **Moove** | Proprietary | Credit scoring embedded onto ride-hailing platforms using performance and revenue analytics |

**The pattern:** Credit scoring, driver management, and charging optimization are always built in-house because they represent the core competitive moat.

### 2.4 Mexico-Specific Compliance

SEMOVI licensing in Mexico City, verificacion vehicular, and Hoy No Circula exemptions cannot be handled by any off-the-shelf FMS, making custom modules mandatory even at small scale.

---

## Part 3: Emerging Technologies

### 3.1 Deploy Now

**Ravin AI -- Mobile Vehicle Inspection**
- AI-powered vehicle damage detection using standard mobile phones (no dedicated hardware)
- Detects dents, scratches, and chips; generates 360-degree condition reports
- $30M raised, TIME Best Invention 2022, already operates with Buggy (a mobility company in Mexico)
- **Use case for LAFA:** Check-in/check-out condition tracking at DaE shift changes and LTO vehicle handovers. Automates damage documentation, reduces driver disputes, creates audit trail.

*--> See [../fintech/insurance-risk.md](../fintech/insurance-risk.md) for full Ravin AI assessment alongside claims technology.*

### 3.2 Deploy at Scale (2,000+ Vehicles)

**Digital Twins for Battery Degradation Modeling**
- Platforms: Azure Digital Twins, AWS IoT TwinMaker
- Simulation-based modeling for lease residual pricing. At 2,000+ vehicles, the simulation value for predicting per-vehicle battery degradation under different usage patterns justifies the engineering investment.
- Prerequisite: Requires robust battery monitoring data and at least 12 months of historical degradation data across the fleet.

*--> See [battery-degradation.md](battery-degradation.md) for current degradation projections and analytics platforms.*

### 3.3 Monitor But Don't Invest Yet

**V2G (Vehicle-to-Grid)**
- Potential: $300-1,500/vehicle/year in revenue in mature markets
- Reality: Mexico's CFE grid has no formal demand response or ancillary services programs accessible to fleet operators
- Signal to watch: Nuvve (acquired Fermata Energy) launched a New Mexico subsidiary in March 2025
- Timeline: 3-5 years before Mexico has the regulatory framework for fleet V2G revenue

**Blockchain for Battery Passports**
- EU Battery Regulation takes effect February 2027, requiring digital battery passports for all EV batteries sold in the EU
- Not directly applicable to Mexico operations, but voluntary adoption could enhance residual values for vehicles with verified, auditable battery history
- Timeline: Monitor EU implementation; consider adoption only if LAFA pursues international fleet sales or EU-aligned financing

---

## Implications for LAFA

**Telematics:**
- **Start with Teltonika FMC130 + TAT140 dual-tracker** at $180-250/vehicle/year. At 2,000 vehicles: $360K-500K/year -- vs. $648K-1.2M/year for Geotab or Samsara.
- **Remote immobilization is table stakes for LTO.** The SECO relay on the primary tracker handles this. The hidden backup prevents circumvention.
- **AWS IoT FleetWise on the Mexico region** is the natural choice for telematics ingestion, especially if Track A foundation infrastructure is already on AWS.
- **Telcel is the only reliable connectivity option.** Do not depend on Red Compartida or secondary carriers for mission-critical vehicle tracking.

**Fleet Management Software:**
- **At 150 vehicles: buy Fleetio** ($4-10/vehicle/month = $7,200-18,000/year) for maintenance tracking. Supplement with custom driver management built during Track A foundation.
- **At 500+ vehicles: evaluate Geotab** for EV-specific analytics if internal battery monitoring isn't yet mature.
- **At 2,000 vehicles: the $840K/year SaaS cost justifies a custom build.** By this point, Track A foundation + the full 3-track roadmap should have built most of the core platform already.
- **Build driver management and credit scoring from day one** -- these are always custom, even at small scale.
- **SEMOVI compliance is a custom module regardless of scale.**

**Emerging Tech:**
- **Ravin AI is the only "deploy now" item.** Zero hardware cost (mobile phone only), proven in Mexico, directly applicable to LAFA's daily operations. Evaluate during Track A foundation.
- **Digital twins are a post-roadmap investment.** Require 12+ months of battery data and 2,000+ vehicles to justify the engineering cost.
- **V2G is 3-5 years away in Mexico.** Zero near-term revenue potential.
- **Battery passports are a non-issue for LAFA today.**

---

*Hardware pricing based on 2025-2026 distributor quotes. Software pricing based on publicly available tiers. Technology readiness assessments based on market maturity and Mexico regulatory environment.*
