# 04 — Business Model

**VC Question:** "How does LAFA make money, and can it make enough?"

---

## Revenue Model: Two Streams

LAFA has two distinct revenue sources, each with a different risk profile and scalability:

### Stream 1: Driver-as-Employee (DaE) — "Payroll + Billing"
LAFA employs the driver, assigns them a vehicle and shift, and collects weekly billing. Revenue = driver billing - operating costs (payroll, charging, maintenance, insurance). LAFA captures the spread between what the driver generates and what it costs to operate them.

### Stream 2: Lease-to-Own (LTO) — "Financial Leasing"
LAFA leases the vehicle to the driver with a purchase option at 4 years. Revenue = weekly lease payments - depreciation - cost of capital - defaults. Margin depends on underwriting and collection efficiency.

**The DaE to LTO flywheel:** The best DaE drivers "graduate" to LTO — bringing with them 6+ months of payment and driving history that serve as a warm-start for credit scoring. This upgrade path is LAFA's most underrated competitive advantage.

---

## Legal Structure

**Latin America Future Automobile Mexico INC, S.A.P.I. de C.V.** The S.A.P.I. de C.V. structure is standard for VC-backed startups in Mexico, enabling drag-along/tag-along clauses and flexible governance for investors.

The platform labor reform (June 2025) explicitly classifies vehicle leasing as a **civil act**, separating it from the employment relationship. This protects the LTO product from reclassification as an employment relationship.

---

## Unit Economics: P&L per Vehicle/Month

DaE and LTO are fundamentally different businesses sharing the same asset (the vehicle). Blending them into one P&L obscures the real economics. Below they are shown separately.

### LTO P&L — Asset Finance Model

The driver leases the vehicle from LAFA. Revenue = lease payments + ancillary margins. LAFA does **not** pay for charging or employ the driver.

```
REVENUE
  Lease payments ............................ MXN $10,000-16,000 (~USD $500-800)   [tariff-analysis §5]
  Charging margin (depot markup) ............ MXN $500-1,500 (~USD $25-75)        [tariff-analysis §5]
  Insurance margin .......................... MXN $200-500 (~USD $10-25)           [tariff-analysis §5]
  ─────────────────────────────────────────
  Revenue total ............................. MXN $10,700-18,000 (~USD $535-900)

COSTS
  (-) Depreciation (48 months) .............. MXN $7,500-10,000 (~USD $375-500)   [tariff-analysis §5]
  (-) Insurance (all-risk) .................. MXN $1,500-3,000 (~USD $75-150)     [tariff-analysis §5]
  (-) Maintenance ........................... MXN $500-1,000 (~USD $25-50)        [tariff-analysis §5]
  (-) Charging infrastructure ............... MXN $200-500 (~USD $10-25)          [tariff-analysis §5]
  (-) GPS/telematics ........................ MXN $100-300 (~USD $5-15)            [tariff-analysis §5]
  (-) Admin/operations ...................... MXN $500-1,000 (~USD $25-50)        [tariff-analysis §5]
  (-) Cost of capital (debt) ................ MXN $1,000-2,000 (~USD $50-100)     [tariff-analysis §5]
  (-) Default provision (5% rate) ........... MXN $213 (~USD $11)                 [repossession §4]
  (-) Battery degradation reserve ........... included in residual                [battery-degradation §4]
  ─────────────────────────────────────────
  Cost total ................................ MXN $11,513-18,013 (~USD $576-901)

CONTRIBUTION MARGIN ......................... MXN -$813 to +$1,987 (~USD -$41 to +$99)
```

**Key:** No payroll (driver is independent). No charging cost (driver pays own energy). Default provision included — this is the LTO-specific risk.

### DaE P&L — Labor-Arbitrage Model

LAFA employs the driver, assigns a vehicle/shift, collects all DiDi billing. Revenue = billing collected. LAFA pays payroll, charging, and all operating costs.

```
REVENUE
  DiDi billing collected by LAFA ............ MXN $28,000-36,000 (~USD $1,400-1,800)
  ─────────────────────────────────────────
  Revenue total ............................. MXN $28,000-36,000 (~USD $1,400-1,800)
  Note: min billing = $6K/week ($24K/mo); range assumes typical productive drivers

COSTS
  (-) Driver payroll + benefits (est.) ...... MXN $10,000-14,000 (~USD $500-700)  ⚠️
  (-) Depreciation (48 months) .............. MXN $7,500-10,000 (~USD $375-500)   [tariff-analysis §5]
  (-) Insurance (all-risk) .................. MXN $1,500-3,000 (~USD $75-150)     [tariff-analysis §5]
  (-) Maintenance ........................... MXN $500-1,000 (~USD $25-50)        [tariff-analysis §5]
  (-) Charging (LAFA pays, ~$300/week) ...... MXN $1,200 (~USD $60)              [charging-economics §4]
  (-) Charging infrastructure ............... MXN $200-500 (~USD $10-25)          [tariff-analysis §5]
  (-) GPS/telematics ........................ MXN $100-300 (~USD $5-15)            [tariff-analysis §5]
  (-) Admin/operations ...................... MXN $500-1,000 (~USD $25-50)        [tariff-analysis §5]
  (-) Cost of capital (debt) ................ MXN $1,000-2,000 (~USD $50-100)     [tariff-analysis §5]
  (-) Battery degradation reserve ........... included in residual                [battery-degradation §4]
  ─────────────────────────────────────────
  Cost total ................................ MXN $23,000-33,000 (~USD $1,150-1,650)

CONTRIBUTION MARGIN ......................... MXN -$5,000 to +$13,000 (~USD -$250 to +$650)
  ⚠️ Payroll estimate: base salary ~$7-10K + IMSS/aguinaldo/vacaciones (~35-40%).
      Actual figure not disclosed — this is the #1 variable to validate.
```

**Key:** No default provision (employee model — no lease to default on). Charging is LAFA's cost. Payroll is the largest unique cost and the widest uncertainty band.

### Key Drivers to Improve Margin

```
  (+) OEM volume discounts (10-20%) ........ +MXN $750-2,000 (~USD $38-100)      [Both]     [tariff-analysis §5]
  (+) Smart charging optimization (30-40%) . +MXN $360-480/mo (~USD $18-24)      [DaE ↑↑ / LTO ↑] [charging-economics §4]
  (+) Utilization .......................... revenue multiplier                   [Both]     [repossession §5]
  (+) Default rate <5% ..................... -MXN $100+/mo (~USD $5+)             [LTO only] [repossession §4]
  (+) Tariff tailwind on residual values ... balance sheet boost                 [Both]     [battery-degradation §4]
```

- **Smart charging** impacts DaE directly (LAFA pays ~$1,200/mo per vehicle) and LTO indirectly (depot infrastructure margin).
- **Default rate** is LTO-only; DaE has no lease default risk but has employee turnover/absenteeism risk instead.
- **Utilization** measured differently: shifts filled per week (DaE) vs. days active per month (LTO).

### Bottom Line

**LTO** margins are tighter (MXN -$813 to +$1,987) but more predictable — it is a classic asset-finance business where risk is concentrated in default rate and residual value.

**DaE** margins have a wider range (MXN -$5,000 to +$13,000) because they depend on driver productivity and payroll costs. A productive driver generating $36K/mo billing is highly profitable; an underperforming one at $24K/mo with full payroll cost is deeply negative.

Both models require the same four execution levers to work at scale:
1. **JAC-heavy fleet mix** (avoids the 50% tariff)
2. **Smart charging** (saves MXN $360-480/mo, ~USD $18-24 — critical for DaE where LAFA pays)
3. **Utilization >90%** (2.5 drivers/vehicle for DaE; >25 active days/month for LTO)
4. **Defaults <5%** (LTO) / **Low turnover** (DaE)

**Failing on any two of these levers makes unit economics negative for that model.**

**DaE payroll cost is estimated; actual figure is the single most important item to validate with LAFA.**

*-> For detailed tariff modeling and scenarios, see [tariff-analysis.md](../analysis/fleet/tariff-analysis.md).*
*-> For charging costs and depot optimization, see [charging-economics.md](../analysis/fleet/charging-economics.md).*
*-> For default economics and recovery, see [repossession-collections.md](../analysis/fintech/repossession-collections.md).*

---

## Path to Profitability

*Note: The fleet is predominantly DaE today (~150 vehicles). LTO launched Dec 2025. Numbers below are blended fleet-level estimates.*

### At 150 vehicles (today — mostly DaE)
- Estimated revenue: MXN $1.6-2.7M/month (~USD $80-135K)
- Tight margins — likely breakeven or negative after overhead
- Manageable with a small team and manual operations

### At 2,000 vehicles (2026 target — mixed DaE + LTO)
- Estimated revenue: MXN $21-36M/month (~USD $1.1-1.8M) / ~MXN $252-432M/year (~USD $12.6-21.6M)
- If average contribution margin = MXN $1,000/veh/month (~USD $50): MXN $24M/year (~USD $1.2M) in contribution
- Overhead (team, office, tech): estimated MXN $6-12M/year (~USD $300-600K)
- **Potential EBITDA: MXN $12-18M/year (~USD $600-900K)** (5-7% margin) — viable but tight
- If contribution margin drops to 0 or negative: scale amplifies the losses

### Critical Levers

| Lever | Model | Margin Impact | Controllable by LAFA? |
|-------|-------|---------------|-----------------------|
| Fleet mix (JAC vs GAC/Geely) | Both | +/- MXN $1,800-2,400/veh/month (~USD $90-120) | Partially (depends on OEMs) |
| Smart charging | DaE ↑↑ / LTO ↑ | +MXN $360-480/veh/month (~USD $18-24) | Yes (tech — Roadmap P5) |
| Utilization rate | Both | Revenue multiplier | Yes (ops + dispatch) |
| Default rate | LTO only | +/- MXN $100-500/veh/month (~USD $5-25) | Yes (credit scoring — Roadmap P2) |
| Driver productivity / turnover | DaE only | Revenue multiplier | Yes (ops + incentives) |
| OEM volume discounts | Both | +MXN $750-2,000/veh/month (~USD $38-100) | Partially (JJ negotiation) |

---

## Capital Requirements

The 2,000-vehicle target implies:

- **Vehicles:** ~1,850 additional x MXN $360-500K (~USD $18-25K) = **MXN $666M-925M (~USD $33-46M) in assets**
- **Charging infrastructure:** Depot expansion for 2,000 vehicles = **MXN $20-50M (~USD $1-2.5M)**
- **Working capital:** 3-6 months of operations = **MXN $30-60M (~USD $1.5-3M)**
- **Tech + team:** 12 months = **MXN $6-12M (~USD $300-600K)**
- **Estimated total: MXN $720M-1,050M (~USD $38-55M)**

### Likely Capital Structure
- **Debt (70-80%):** Vehicles as collateral. Candidates: NAFIN, Vision Ridge (VEMO model), sustainable real asset funds. Rate: 10-14% annual in Mexico.
- **Equity (20-30%):** Seed/Series A for tech, team, working capital. Estimated MXN $150-250M (~USD $8-13M).

**Comparison:** VEMO has $500M+ ($350M equity + $150M+ debt). OCN has $100M+. LAFA needs at least $40-55M USD to execute its plan — it cannot be bootstrapped.

---

## LTV / CAC (Basic Estimate)

| Metric | DaE | LTO |
|--------|-----|-----|
| **Lifetime** | ~2-3 years (employee turnover) | 4 years (contract duration) |
| **Revenue/veh/month** | MXN $28,000-36,000 (~USD $1,400-1,800) | MXN $10,700-18,000 (~USD $535-900) |
| **Contribution margin/month** | MXN ~$1,000-5,000 (~USD $50-250) | MXN ~$500-1,500 (~USD $25-75) |
| **LTV (contribution)** | MXN $24,000-180,000 (~USD $1,200-9,000) | MXN $24,000-72,000 (~USD $1,200-3,600) |
| **CAC (acquisition)** | Low (DiDi referral, word of mouth) | MXN $1,000-3,000 (~USD $50-150) |
| **LTV/CAC** | ~8-60x | ~8-24x |

**Caveat:** These are estimates based on ranges. DaE revenue is gross billing (costs are much higher than LTO). DaE contribution margin has the widest uncertainty band due to undisclosed payroll costs. LTV/CAC looks healthy but depends critically on contribution margin being positive.

---

*Unit economics based on estimates from tariff-analysis, charging-economics, battery-degradation, and repossession-collections. Actual revenue and margins not disclosed by LAFA.*
