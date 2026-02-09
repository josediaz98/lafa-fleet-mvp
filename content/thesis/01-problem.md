# 01 -- The Problem

**VC Question:** "What problem does LAFA solve, and why hasn't it been solved before?"

---

## The Problem LAFA Solves

There are 658,000 registered platform workers in Mexico (including delivery and moto couriers). The vast majority cannot qualify for a traditional auto loan. An estimated 40-60% of ride-hailing car drivers lack vehicle access or depend on third-party vehicles (IDB-Uber LatAm survey: 47% don't personally own, but 22% use family vehicles). They drive gasoline cars that cost them MXN $7,360-11,200 per month in fuel, lose one day of income per week to driving restrictions (Hoy No Circula (driving restriction)), and have no IMSS (social security), aguinaldo (annual bonus), or vacation benefits.

LAFA gives them access to an electric vehicle -- either as a formal employee (DaE) or as a lessee with an option to purchase (LTO) -- eliminating the capital and credit barrier, and generating MXN $8,000-15,000 per month in savings vs a gasoline vehicle.

---

## Why This Problem Matters

### The Human Cost
A typical gig driver in Mexico works 10-12 hours per day, 6 days per week, in a vehicle they don't own, with fuel consuming 30-45% of their gross income. Full-time car drivers gross ~MXN $18,000-25,000/month before fuel and vehicle costs (DiDi CDMX, per Indeed/IMSS data). They lose ~MXN $3,000-5,000/month to Hoy No Circula. They have no formal credit history. Banks reject them. Used car dealers charge 40-60% annual interest. The Mexican financial system treats them as invisible.

The labor reform of June 2025 registered 1.26M platform workers under IMSS -- the first formal recognition of this population. But registration doesn't give them a car.

### The Economic Cost
~60% of the Mexican population is "thin file" or no-file at the credit bureau. For gig drivers, financial exclusion is not a bug -- it's the default state. Without access to credit, there's no access to a vehicle. Without owning a vehicle, there's no equity accumulation. Without equity, there's no economic mobility.

The addressable market is massive: in Mexico alone, 100K-300K ride-hailing car drivers need vehicle access and don't qualify for traditional credit. Mexico TAM: **$1.0-4.2 billion annually**; LatAm (adding Brazil and Colombia): **$3-10 billion/year**.

*--> For detailed market sizing, see [02-market.md](02-market.md).*

---

## Why This Problem Is Hard

The problem isn't that nobody has tried -- it's that the obvious solutions don't work:

| Obvious Solution | Why It Fails |
|------------------|--------------|
| **Traditional banks** | <3% of gig drivers qualify. 60% of Mexico is thin-file. Bank scoring models are designed for formal salaried workers, not the gig economy. |
| **OEMs selling direct** | An EV costs MXN $360-500K. The driver needs access, not ownership. Moreover, BYD/JAC/GAC don't want to manage fleets, collections, or maintenance. |
| **Used car market** | Used car lenders charge 40-60% annual interest. Used EVs are scarce in Mexico. Used cars don't solve the Hoy No Circula problem (depends on model year). |
| **Ride-hailing platforms (Uber, DiDi)** | They don't want to own vehicles or employ drivers. Uber invests in Moove to solve supply without taking on labor liability. DiDi uses ultra-low commissions (10-15% vs 25% Uber) as a competitive strategy. |
| **Traditional leasing** | Requires formal income verification, credit history, and a down payment. Excludes the same population. |

**What's needed is a vertically integrated operator** that combines: access to EV vehicles at competitive cost (OEM relationships), alternative financing (leasing without bureau), fleet operations (maintenance + charging), and a product adapted to the gig driver's weekly cash flow (weekly payments, not monthly). That's what LAFA builds.

---

## Why Now -- Three Converging Forces

### 1. IMSS Reform (June 2025) -- Drivers Become Visible

The platform labor reform registered 1.26M workers under IMSS. For the first time, gig drivers have tax records (SAT (tax authority)), formal employment history, and social security data. This transforms the credit scoring landscape: Belvo and SAT can now pull fiscal data for drivers who 12 months ago had **zero formal records**.

**Implication for LAFA:** The warm-start credit scoring strategy (Track C, P2 — Month 7-9 of the roadmap) becomes feasible. Data that didn't exist before is now being generated at scale. The timing to build an alternative scoring engine is exactly now.

### 2. 50% Tariff (January 2026) -- Window of Opportunity for Local OEMs

The 50% tariff on imported vehicles from countries without FTAs (effective January 2026) dramatically raises the cost of imported Chinese EVs. But JAC assembles in Hidalgo (CKD) and is exempt. This creates a temporary advantage for fleet operators like LAFA that work with JAC -- imported EVs (GAC, BYD) cost MXN $87K-116K more per unit.

**Implication for LAFA:** The cost window closes when other OEMs set up local assembly. Scaling now with JAC enables lock-in of fleet cost advantage.

*--> For detailed tariff analysis by OEM, see [tariff-analysis.md](../analysis/fleet/tariff-analysis.md).*

### 3. EV S-Curve (2.5% Penetration) -- Pre-Inflection Point

Mexico is at 2.5% EV penetration (96,636 units in 2025, +38% YoY). Historically, adoption accelerates after 5%. Chinese OEMs have collapsed the EV-to-ICE price premium from >100% to 25-50%. The TCO break-even for high-mileage drivers is 1.5-3 years.

**Implication for LAFA:** Building before the inflection is risky but grants first-mover advantage. The player who builds charging infrastructure and OEM relationships before the market moves has real switching costs when the acceleration comes.

*--> For EV market data and adoption trajectory, see [ev-market-latam.md](../analysis/market/ev-market-latam.md).*

---

## The Numbers That Define the Problem

- **658K** platform workers registered (2025 reform) -- **<3%** credit-eligible for auto loans
- **~60%** of the Mexican population is thin-file or no-file at the credit bureau
- **MXN $8,000-15,000/month** total EV vs ICE savings (fuel + Hoy No Circula)
- **2.5%** Mexico EV penetration 2025 (pre-inflection point)
- **1.26M** gig workers registered under IMSS post-reform

*--> For the full metrics table with sources, see [gig-driver-economics.md](../analysis/market/gig-driver-economics.md) and [02-market.md](02-market.md).*

---

*Problem statement based on data from the 2025 Mexican labor reform, AMIA/EMA market data, credit bureau statistics, and fuel prices as of Feb 2026.*
