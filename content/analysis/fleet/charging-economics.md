# LAFA: Charging Economics

**Last updated:** February 6, 2026
**Scope:** CFE tariff modeling, Level 2 vs DC cost scenarios, fleet charging projections, installation costs, gig driver economics (EV vs ICE).

---

## 1. CFE Tarifa GDMTH (Commercial/Industrial Rate for Charging)

The GDMTH tariff applies to medium-voltage connections (1-35 kV), relevant for Level 2 and DC fast charging stations exceeding 25 kW demand.

**Time-of-Use Structure (Central Region / CDMX):**

| Period | Typical Hours | Rate (MXN/kWh) |
|--------|--------------|----------------|
| Base (off-peak) | 00:00-06:00 | $0.80-$1.20 |
| Intermedio (mid-peak) | 06:00-20:00 | $1.20-$1.80 |
| Punta (peak) | 20:00-22:00 | $2.20-$3.50 |
| **Blended average** | | **~$1.50-$2.00** |

**Demand charges (critical hidden cost):**
- Cargo por demanda (demand charge — a fixed monthly fee based on the maximum kW drawn at any moment, regardless of total energy consumed): ~MXN $200-350/kW/month
- A 60 kW DC charger pays ~MXN $16,500/month in demand charges **regardless of utilization**
- Demand charges represent **35-57%** of total electricity cost

## 2. Cost Models

**Scenario A: 4-Connector Level 2 Station (4 x 7.2 kW)**

| Metric | Value |
|--------|-------|
| Monthly energy delivered | 6,912 kWh |
| Electricity cost (blended $1.60/kWh) | MXN $11,059 |
| Demand charge (28.8 kW) | MXN $7,920 |
| Fixed charges | ~MXN $600 |
| **Total monthly electricity** | **MXN $19,579** |
| **Effective cost/kWh delivered** | **MXN $3.15** (incl. 10-12% losses) |
| CAPEX | MXN $450,000-880,000 |
| Break-even | 2.6 years (high util) to 7.2 years (low util) |

**Scenario B: DC Fast Charger (1 x 60 kW)**

| Metric | Value |
|--------|-------|
| Monthly energy delivered | 7,200 kWh |
| Electricity cost | MXN $11,520 |
| Demand charge (60 kW) | MXN $16,500 |
| Fixed charges | ~MXN $600 |
| **Total monthly electricity** | **MXN $28,620** |
| **Effective cost/kWh delivered** | **MXN $4.67** (incl. 15% DC losses) |
| CAPEX | MXN $1,260,000-2,430,000 |
| Break-even | 4.0 years (high util) to 62 years (low util — NOT viable) |

## 3. Public Charging Network Pricing (Reference)

| Network | Price/kWh (MXN) | Type |
|---------|----------------|------|
| Watts by VEMO | $4.50-$6.50 | Level 2 |
| ChargeNow (BMW/Shell) | $5.00-$7.00 | Mixed |
| Tesla Supercharger | $5.50-$8.50 | DC Fast |
| Blink Charging Mexico | $5.00-$7.00 | Mixed |

## 4. LAFA's Charging Advantage

With a captive fleet of 150 vehicles (growing to 2,000), LAFA can guarantee high utilization of depot charging at off-peak rates:

| Charging Method | Effective Cost/kWh | vs. Public Charging |
|----------------|-------------------|---------------------|
| Depot Level 2 (off-peak) | MXN $1.00-1.50 | 60-70% cheaper |
| Depot Level 2 (blended) | MXN $3.15 | 30-50% cheaper |
| Public Level 2 | MXN $4.50-6.50 | Baseline |
| Public DC Fast | MXN $6.00-15.00 | Most expensive |

**Fleet-wide cost projection:**
- At 150 vehicles x $300/week: MXN $180,000/month
- At 2,000 vehicles x $300/week: **MXN $2.4M/month**
- Smart charging optimization could save 30-40% = **MXN $720K-960K/month saved**

**Strategic implication:** LAFA's depot charging isn't a standalone business — it's an operational lever. Guaranteed fleet utilization at off-peak CFE rates creates real switching costs for drivers.

*→ For LAFA's current charging operations and future ecosystem vision, see [05-traction.md](../../thesis/05-traction.md).*

## 5. Installation Costs Summary

| Component | Level 2 (per connector) | DC Fast (60 kW) | DC Fast (150 kW) |
|-----------|------------------------|-----------------|------------------|
| Equipment | MXN $50K-87.5K | MXN $800K-1.5M | MXN $2M-4M |
| Electrical infrastructure | MXN $37.5K-75K | MXN $300K-600K | MXN $500K-1M |
| Civil works | MXN $12.5K-25K | MXN $80K-150K | MXN $100K-200K |
| Permitting/CFE | MXN $7.5K-20K | MXN $50K-120K | MXN $80K-200K |
| **Total** | **MXN $108K-208K** | **MXN $1.23M-2.37M** | **MXN $2.68M-5.4M** |

Note: Plan Mexico (2025-2026) offers 30% tax credit for public charging infrastructure.

---

## 6. Gig Economy & Driver Economics

*This section has been moved to its own file for standalone readability.*

*→ See [gig-driver-economics.md](../market/gig-driver-economics.md) for market size, driver EV vs ICE economics, and regulatory incentives.*

---

---

## Implications for LAFA

- **Demand charges are the hidden enemy.** At 2,000 vehicles charging simultaneously without management, demand charges alone could reach MXN $500,000-900,000/month. Smart charging (staggering charge start times, prioritizing off-peak base rates at night) is P5 (Track B) on the roadmap and should be one of the first optimizations after Track A foundation.
- **Never use DC fast charging for routine fleet operations.** The effective cost of DC ($4.67/kWh) is 3-4x more expensive than Level 2 depot ($1.00-1.50/kWh off-peak). DC is only justified for operational emergencies (vehicle needs immediate range to cover a shift).
- **The $300/week savings per vehicle assumes good practices.** If LAFA does not implement smart charging and charges during peak hours, the real cost could be $500-600/week per vehicle. The difference at 2,000 vehicles: MXN $1.6M-2.4M/month in avoidable cost.
- **Depot charging is the exit barrier for DaE drivers.** A DaE driver who leaves LAFA loses access to free charging and goes back to paying for gasoline ($1,200-1,500/week). This creates real switching costs without needing restrictive contract clauses.
- **Evaluate the CFE GDMTH contract carefully.** The contracted power level defines the fixed demand charge. Over-sizing means paying for unused demand. Under-sizing means penalties for exceeding capacity. As the fleet grows from 150 to 2,000, contracted power must be scaled every 3-6 months.

---

---

## 8. Charging Management Systems (CMS)

| Platform | Key Differentiator | LatAm Fit |
|----------|-------------------|-----------|
| **ChargePoint Next-Gen** (Nov 2025) | AI-powered optimization (energy supply, usage patterns, station health). Supports any OCPP-compatible charger. | Good -- hardware-agnostic |
| **Driivz** (Vontier, powers EVgo) | Most comprehensive billing parameters: TOU tariffs, fleet membership, multi-currency. OCPP 1.6 + 2.0.1 certified. Operates in 30+ countries. | Strong -- multi-country, fleet billing |
| **Ampcontrol** | Claims **up to 45% energy cost reduction** with AI algorithms. Recommends charger-to-vehicle ratios of 1:2 to 1:4 with smart scheduling. | Good -- cost optimization focus |
| **ChargeLab** | Created OpenOCPP (first pre-certified open-source OCPP stack). Partnered with ABB. | Good -- open-source option |

**VEMO's approach:** Uses Siemens as primary technology partner, deploying 160kW fast-charging stations. Their "multipurpose charging superhubs" across Mexico City serve ride-hailing drivers, corporate clients, and retail consumers simultaneously. The "Watts by VEMO" app (45,000+ registered users, 50,000+ charging events/month) represents Mexico's first comprehensive EV charging monetization platform.

---

## 9. OCPP 2.0.1 vs 1.6

OCPP 2.0.1 adds significant capabilities over 1.6 for fleet operators:

| Feature | OCPP 1.6 | OCPP 2.0.1 |
|---------|---------|------------|
| Security | Optional TLS | **Mandatory TLS encryption** |
| Dynamic charging | Basic profiles | **Real-time adjustment based on grid conditions** |
| Plug & Charge | Not supported | **Full ISO 15118 support** |
| V2G | Not supported | **V2G capability** |

**Recommendation:** New deployments should require OCPP 2.0.1. The CSMS must support both versions simultaneously for legacy hardware.

---

## 10. Charging Standards Fragmentation in Mexico

| Standard | Used By | Mexico Public Charger Share |
|---------|---------|---------------------------|
| **CCS1** | Most non-Chinese EVs | Majority |
| **GBT** | Chinese vehicles (BYD, Geely, JAC, GAC) | <2% of public chargers |
| **NACS (Tesla)** | Tesla, becoming North American standard | Growing -- expected standard by 2026-2027 |

**VEMO partnered with BYD specifically to address the GBT gap.** LAFA faces the same challenge with Geely, JAC, and GAC vehicles.

**Strategy:** Deploy multi-standard chargers (CCS1 + GBT + NACS adapter) at depot locations. This is both an operational necessity and a strategic asset if LAFA opens charging to other Chinese EV fleets.

---

## 11. Mexico Charging Market Outlook

- **Market size:** $253.8M in 2024, projected to **$3.3B by 2033** (30.5% CAGR)
- **Current infrastructure:** Only ~3,708 public stations nationwide
- **Solar opportunity:** Solar-plus-storage at depot sites offers 3-5 year payback given Mexico's excellent irradiance (1,500-1,800 kWh/kW-year) and 100% first-year tax deduction for renewable energy investments in charging stations

**Depot infrastructure cost scaling:**
| Fleet Size | Investment | Infrastructure |
|-----------|-----------|---------------|
| 100 vehicles | $500K-$2M | 50-100 L2 chargers + 5-10 DCFC |
| 1,000 vehicles | $8M-$25M | Multiple substations, utility upgrades |

**Utility coordination for multi-megawatt connections can take 2-5 years in Mexico**, making early infrastructure planning critical for the 2,000-vehicle target.

---

*All calculations use estimated midpoint values. Items originally marked [VERIFY] in the detailed technical document should be confirmed with current CFE rates and regulatory details. Tariff rates and electricity prices may change.*
